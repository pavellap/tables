import React from 'react'
import TableRow from "./TableRow";
import {TableSortLabel, Tooltip} from "@material-ui/core";
import {connect} from 'react-redux'
import {sortColumn} from "../Redux/Actions/TableActions";
import PropTypes from 'prop-types'

function Table(props) {
    console.log("Rerendering table:", props.data)
    return (
            <table>
                <tbody>
                <tr>
                    {props.titles && props.titles.map((item, index) =>
                        <th key={index}>
                            {index > 0 &&
                            <Tooltip title={props.sortMethod === 'desc' ? 'По убыванию' : 'По возрастанию'}>
                                <TableSortLabel
                                    active={true}
                                    onClick={() => props.sort(props.sortMethod, props.data, index)}
                                    direction={props.column === index ? (props.sortMethod === 'desc' ? 'asc' : 'desc')
                                        : props.sortMethod
                                        }/>
                            </Tooltip>
                            }
                            {item}
                        </th>
                    )}
                </tr>
                <TableRow handleTableDataClick={props.displayCellData} data={props.data}/>
                </tbody>
            </table>
    )
}

function mapStateToProps(state) {
    return {
        direction: state.table.direction,
        column: state.table.sortedColumn,
        data: state.table.tableContent,
        sortMethod: state.table.sortMethod
    }
}
function mapDispatchToProps(dispatch) {
    return {
        sort: (method, data, columnIndex) => dispatch(sortColumn(method, data, columnIndex))
    }
}

Table.propTypes = {
    direction: PropTypes.string,
    column: PropTypes.number,
    data: PropTypes.array,
    sortMethod: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)