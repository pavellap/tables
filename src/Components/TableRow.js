import React, {useState} from 'react'
import styled from "styled-components";
import {normalizeString} from '../utils'


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
    const [activeItem, handleActiveItem] = useState([0, 0])

    return (
        <React.Fragment>
            {props.data && props.data.map((item, index) =>
                    <Row key={index}>
                        <td style={(activeItem && index === activeItem[0] &&  null === activeItem[1]) ? isActive : null}
                            onClick={() => {
                            handleActiveItem([index, null])
                            props.handleTableDataClick(index + 1)
                        }}>
                            {index + 1}
                        </td>
                        {Object.values(item).map((data, id) =>
                            <td key={id}
                                style={(activeItem && index === activeItem[0] && id === activeItem[1]) ? isActive : null}
                                onClick={() => {
                                props.handleTableDataClick(data);
                                handleActiveItem([index, id])
                            }}>
                                {normalizeString(data)}
                            </td>
                        )}
                    </Row>)}

        </React.Fragment>
    )
}


export default TableRow