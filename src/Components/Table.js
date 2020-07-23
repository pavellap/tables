import React, {useEffect} from 'react'
import styled from "styled-components";
import TableRow from "./TableRow";


const Wrapper = styled.section`
    width: 80%;
    margin: 0 auto;
    border: 1px solid whitesmoke;
`

const hardcode = [['1', 'Hardodim', 'Data', 'Hahaha'], ['2', 'Hardodim', 'Data', 'Hahaha']]

function Table(props) {


    const displayTestData = data => console.log(data);

    return (
        <Wrapper>
            <table>
                <tbody>
                    <TableRow handleTableDataClick={displayTestData} data={hardcode}/>
                </tbody>
            </table>
        </Wrapper>
    )
}

export default Table