import React from "react";
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux'
import {toggleModal} from "../Redux/Actions/TableActions";


const Container = styled.section`
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .4);
`

const Wrapper = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
`

function Modal(props) {
    return (
        <Container>
            <Wrapper>
                <CloseIcon fontSize='large' cursor='pointer' onClick={props.close}/>
            </Wrapper>
            {props.children}
        </Container>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        close: () => dispatch(toggleModal(false))
    }
}

export default connect(null, mapDispatchToProps)(Modal)