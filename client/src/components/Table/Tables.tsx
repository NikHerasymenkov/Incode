import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {addLastPriceTickers, getTickers} from "../../store/tickers/actions";
import {connect} from "react-redux";
import Graph from "../Graph/Graph";
import {makeStyles} from "@mui/styles";


const useRowStyles = makeStyles({
    root: {
        "*": {
            heigth: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        "& > *": {
            borderBottom: "unset",
            heigth: "10px",
        },
    },

    priceUp: {
        background: "#3B69DE93",
        textAlign: "center",
        fontSize: "14px",
    },

    priceDown: {
        background: "#DA6C6CBF",
        textAlign: "center",
        fontSize: "14px",
    },

    chart: {
        maxWidth: "250px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    bigchart: {
        maxWidth: "900",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
});


const createData = ({...ticker}) => {
    return {
        ...ticker,
    };
}

const displayDate = (dateString: string) => {
    let date = dateString.slice(0, 10);
    let time = dateString.slice(11, 19);
    return (
        <>
            <span>{date}</span> <span>{time}</span>
        </>
    );
}

const Row = (props: any) => {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell
                    className={props.colorSelectorUpDownPriceLine(row, classes)}
                    component="th"
                    scope="row"
                >
                    {row.ticker}
                </TableCell>
                <TableCell align="right">{row.exchange}</TableCell>
                <TableCell
                    className={props.colorSelectorUpDownPriceLine(row, classes)}
                    align="right"
                >
                    {row.price}
                </TableCell>
                <TableCell align="right">{row.change}</TableCell>
                <TableCell align="right">{row.change_percent}</TableCell>
                <TableCell align="right">{row.dividend}</TableCell>
                <TableCell align="right">{row.yield}</TableCell>
                <TableCell className={classes.chart} align="right">
                    <>
                        <Graph
                            key={`little-chart-${row.ticker}`}
                            chartName={row.ticker}
                            height={50}
                            width={250}
                        />
                    </>
                </TableCell>
                <TableCell align="right">{displayDate(row.last_trade_time)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography align={"center"} variant="h6" gutterBottom component="div">
                                {row.ticker}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead></TableHead>
                                <TableBody>
                                    <TableRow className={classes.bigchart}>
                                        <Graph
                                            key={`big-chart-${row.ticker}`}
                                            chartName={row.ticker}
                                            height={150}
                                            width={900}
                                        />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
let rows = [];
const createRows = (tickers: []) => {
    return tickers.map((ticker: []) => {
        return createData(ticker);
    });
}
const CollapsibleTable = ({tickers, addLastPrice}: any) => {
    const colorSelectorUpDownPriceLine = (row: any, classes: any) => {
        let curElem = addLastPrice.filter(
            (item: []) => Object.keys(item)[0] === row.ticker
        );
        let pricesObj = curElem[0];
        let pricesArr: any;
        if (curElem.length !== 0) {
            pricesArr = Object.values(pricesObj)[0];
            let endPrice = pricesArr[pricesArr.length - 1];
            if (endPrice < row.price) {
                return classes.priceUp;
            } else {
                return classes.priceDown;
            }
        }
    }
    rows = createRows(tickers);
    return (
        <TableContainer
            style={{boxShadow: '0px 0px 10px 10px rgb(10 10 10 / 30%), ' +
                    '5px 10px 10px 5px rgb(10 10 10 / 30%), ' +
                    '5px 10px 10px 5px rgb(10 10 10 / 30%)'}}
            component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Exchange</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Change</TableCell>
                        <TableCell align="right">Change,%</TableCell>
                        <TableCell align="right">Dividend</TableCell>
                        <TableCell align="right">Yield</TableCell>
                        <TableCell align="center">Chart</TableCell>
                        <TableCell align="right">Last trade time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any) => {
                        return (
                            <Row
                                colorSelectorUpDownPriceLine={colorSelectorUpDownPriceLine}
                                key={row.ticker}
                                row={row}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


const mapStateToProps = (state: any) => ({
    tickers: state.tickers.tickers,
    addLastPrice: state.addLastPrice.lastPrice
});

const mapDispatchToProps = {
    getTickers,
    addLastPriceTickers
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleTable)