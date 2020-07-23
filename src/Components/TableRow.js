import React from 'react'
import styled from "styled-components";

const Row = styled.tr`
  td {
      padding: 6px 20px;
      text-align: left;
      border: 1px solid #ccc;
  }
`


function TableRow(props) {

    return (
        <React.Fragment>
            {props.data.map((item, index) =>
                <Row key={index}>
                    {item.map((data, index) =>
                        <td key={index}>{data}</td>
                    )}
                </Row>)}
        </React.Fragment>
    )
}

export default TableRow