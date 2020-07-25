import React, {useState} from 'react';
import {Route, Switch} from "react-router";
import './Components/Styles/App.scss'
import StartPage from "./Components/StartPage/StartPage";
import {tableMatch} from './Utils/config'
import TableContainer from "./Components/Table/TableContainer";
import {connect} from 'react-redux'
import ErrorBlock from "./UI/ErrorBlock";
import PropsTypes from 'prop-types'

function App(props) {
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

App.propTypes = {
    error: PropsTypes.object
}

function mapStateToProps(state) {
    return {
        error: state.table.error
    }
}

export default connect(mapStateToProps)(App);
