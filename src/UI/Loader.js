import {CircularProgress} from "@material-ui/core";
import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Loader = () => (<Wrapper><CircularProgress/></Wrapper>)

export {Loader};