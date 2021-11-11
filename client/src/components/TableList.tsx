import React, {useEffect} from 'react';
import {io} from "socket.io-client";
import {getTickers} from "../store/tickers/actions";
import {connect} from "react-redux";
import CollapsibleTable from "./Table/Tables";

const TableList = ({getTickers}:any) => {
    const socket = io("http://localhost:4000");
    socket.emit("start");
    useEffect(() => {
        socket.on("ticker", (response) => {
            getTickers(response);
        });
    }, []);
    return (
        <section>
            <h2 style={{display:"flex",justifyContent:"center"}}>TickersList</h2>
            <CollapsibleTable />
        </section>
    );
};
const mapStateToProps = (state:any) => ({
    tickers:state.tickers.tickers
});

const mapDispatchToProps ={
    getTickers,
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList)