import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Content = styled.div`
    height: 300px;
    padding: 40px 20px;
    border-radius: 12px;
`

export default function () {
    return (
        <Container>
            <Content>
                <h1>Произошла ошибка на сервере, попробуйте позже</h1>
            </Content>
        </Container>
    )
}