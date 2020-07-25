import React from 'react'
import TableRow from "./TableRow";
import {TableSortLabel, Tooltip} from "@material-ui/core";
import {connect} from 'react-redux'
import {sortColumn} from "../../Redux/Actions/TableActions";
import PropTypes from 'prop-types'

function Table(props) {
    return (
            <table>
                <tbody>
                <tr>
                    {props.titles && props.titles.map((item, index) =>
                        <th key={index}>
                            <span>
                                {index > 0 &&
                                <Tooltip title={props.sortMethod === 'desc' ?
                                    'По убыванию' : 'По возрастанию'}>
                                    <TableSortLabel
                                        active={true}
                                        onClick={() =>
                                            props.sort(props.sortMethod, props.data, index)}
                                        direction={props.column === index ?
                                            (props.sortMethod === 'desc' ? 'asc' : 'desc')
                                            : props.sortMethod
                                        }/>
                                </Tooltip>
                                }
                            </span>
                            <span>{item}</span>
                        </th>
                    )}
                </tr>
                <TableRow handleTableDataClick={props.displayCellData}/>
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
    titles: PropTypes.array,
    direction: PropTypes.string,
    column: PropTypes.number,
    data: PropTypes.array,
    sortMethod: PropTypes.string,
    sort: PropTypes.func,
    displayCellData: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)