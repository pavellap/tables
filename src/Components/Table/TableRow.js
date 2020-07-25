import React, {useState} from 'react'
import styled from "styled-components";
import {normalizeString} from '../../Utils/utils'
import {connect} from 'react-redux'
import {attachRow} from "../../Redux/Actions/TableActions";
import PropTypes from 'prop-types'

const Row = styled.tr`
  td {
      padding: 5px;
      text-align: left;
      border: 1px solid #ccc;
      &:first-child {
          background-color: #F6FAFB
      }
  }
`
const isActive = {
    outline: "3px solid blue"
}

function TableRow(props) {

    if (props.data[props.data.length - 1] === 'bugFixed')
        props.data.pop();
    const [activeItem, handleActiveItem] = useState([0, 0])
    return (
        <React.Fragment>
            {props.data && props.data.map((item, index) =>
                    <Row key={index}>
                        <td style={(activeItem && index === activeItem[0]
                            &&  null === activeItem[1]) ? isActive : null}
                            onClick={() => {
                            handleActiveItem([index, null])
                            props.handleTableDataClick(index + 1)
                        }}>
                            {index + 1}
                        </td>
                        {Object.values(item).map((data, id) =>
                            <td key={id}
                                style={(activeItem && index === activeItem[0]
                                    && id === activeItem[1]) ? isActive : null}
                                onClick={() => {
                                props.handleTableDataClick(data);
                                handleActiveItem([index, id]);
                                props.highlightRow(item)
                            }}>
                                {normalizeString(data)}
                            </td>
                        )}
                    </Row>)}

        </React.Fragment>
    )
}

function mapStateToProps(state) {
    /*
     * См. src/Redux/Reducers/TableReducer TABLE_COLUMN_SORTED
     */
    const HANDLE_REDUX_BUG = state.table.tableContent;
    if (HANDLE_REDUX_BUG[0] === 'bugFixed')
        HANDLE_REDUX_BUG.shift();
    else
        HANDLE_REDUX_BUG.push('bugFixed')
    return {
        data: HANDLE_REDUX_BUG
    }
}

function mapDispatchToProps(dispatch) {
    return {
        highlightRow: (row) => dispatch(attachRow(row))
    }
}

TableRow.propTypes = {
    data: PropTypes.array,
    handleTableDataClick: PropTypes.func,
    highlightRow: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow)