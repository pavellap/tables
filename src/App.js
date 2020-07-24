import React, {useState} from 'react';
import {Route, Switch} from "react-router";
import './App.scss'
import StartPage from "./Components/StartPage";
import {tableMatch} from './config'
import TableContainer from "./Components/TableContainer";
import {connect} from 'react-redux'
import ErrorBlock from "./Components/ErrorBlock";

/*
* TODO: Приложение подружает данные, когда заходим в определённую секцию
*   1. Фильтрация
*   4. Обработка неудавшегося запроса
*
 */
function App(props) {
    /*
     * Логика хранения достаточно проста, чтобы использовать стейт вместо редакса
     * TODO:
     *  1. Сделать добавление новых столбцов
     *  2. Сделать поиск по фильтру
     *
     */
    const [currentTable, handleTableChange] = useState(null);

    return (
        <section>
            {props.error ? <ErrorBlock/> :
                <Switch>
                    <Route exact path='/'>
                        <StartPage handleClick={(tableId) => handleTableChange(tableMatch[tableId])}/>
                    </Route>
                    <Route path='/table'>
                        <TableContainer tableId={currentTable}/>
                    </Route>
                </Switch>
            }
            </section>

    )
}

function mapStateToProps(state) {
    return {
        error: state.table.error
    }
}

export default connect(mapStateToProps)(App);
