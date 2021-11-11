import *as React from 'react';
import {addLastPriceTickers, getTickers} from "../../store/tickers/actions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {BarSeries, Chart, LineSeries, ValueAxis} from '@devexpress/dx-react-chart-material-ui';
import Paper from "@mui/material/Paper";



const Graph=({
                   tickers,
                   addLastPriceTickers,
                   chartName,
                   height,
                   width,
                   rotated,
               }: any)=> {
    const [pricesTickers, setPricesTickers] = useState([]);
    const [chartData, setChartData] = useState([{argument: 0, value: 0}]);

    const createNewPrices=(pricesTickers: any)=> {
        let data = tickers.map((item: any) => {
            let name = item.ticker;
            let price = item.price;
            return {[name]: [Number(price)]};
        });
        return data;
    }

    const addNewItemToPrices=(prevPriceTickers: any)=> {
        let data = tickers.map((item: any, index: any) => {
            let name = item.ticker;
            let price = item.price;
            let currentPrevTicker = prevPriceTickers[index];
            let currentPrevPriceArray = currentPrevTicker[name];
            let newPriceArray = [...currentPrevPriceArray, Number(price)];
            return {[name]: newPriceArray};
        });
        return data;
    }

    useEffect(() => {
        createChartData(pricesTickers, chartName);
    }, [pricesTickers]);

    useEffect(() => {
        if (pricesTickers.length === 0) {
            let firstItemPrice = createNewPrices(pricesTickers);
            setPricesTickers(firstItemPrice);
        } else if (pricesTickers.length >= 1) {
            setPricesTickers((prevPriceTickers) => {
                return addNewItemToPrices(prevPriceTickers);
            });
        }
        addLastPriceTickers(pricesTickers);
    }, [tickers]);

    const createChartData=(pricesTickers: any, chartName: any)=> {
        if (pricesTickers.length > 0) {
            let currentTicker = pricesTickers.filter(
                (item: any) => chartName === Object.keys(item)[0]
            );
            let objValues = currentTicker[0];
            let arrValues = objValues[chartName];
            let values = arrValues.map((item: any, idx: any) => {
                return {argument: idx + 1, value: item};
            });
            setChartData(values);
        } else {
            return setChartData([{argument: 0, value: 0}]);
        }
    }

    return (
        <Paper>
            <Chart data={chartData} height={height} width={width} rotated={rotated}>
                {rotated === true ? <ValueAxis/> : null}
                <LineSeries valueField="value" argumentField="argument" color="blue"/>
                <BarSeries valueField="value" argumentField="argument" color="red"/>
            </Chart>
        </Paper>
    );
}

const mapStateToProps = (state: any) => ({
    tickers: state.tickers.tickers
});

const mapDispatchToProps = {
    getTickers,
    addLastPriceTickers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);