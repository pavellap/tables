import React, {useEffect, useState} from 'react';
import Table from "./Components/Table";
import {Route, Switch} from "react-router";
import './App.scss'
import Axios from "axios";
import StartPage from "./Components/StartPage";
import {connect} from 'react-redux'
import {fetchData} from "./Redux/Actions/tables";
import {Loader} from "./UI/Loader";
import styled from "styled-components";
import {tableMatch} from './config'


/*
* TODO: Приложение подружает данные, когда заходим в определённую секцию
*
 */
function App(props) {
    /*
     * Логика хранения достаточно проста, чтобы использовать стейт вместо редакса
     */
    const [currentTable, handleTableChange] = useState(null);
    useEffect(() => {
        props.fetchData('big')
    }, [])


    console.log(props.isLoading)

    return (
        <section>
            {console.log("is Loading", props.isLoading)}
            {props.isLoading && <Loader/>}
            <Switch>
                <Route exact path='/'>
                    <StartPage handleClick={(tableId) => handleTableChange(tableMatch[tableId])}/>
                </Route>
                <Route path='/big' component={Table}/>
                <Route path='/small' component={Table}/>
            </Switch>
        </section>
    )
}

function mapStateToProps(state) {
    return {
        isLoading: state.table.isLoading,
        data: state.table.data,
        error: state.table.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: type => dispatch(fetchData(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
