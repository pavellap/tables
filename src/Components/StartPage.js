import React from "react";
import styled from "styled-components";
import {NavLink} from 'react-router-dom'
import {Container, Header, NavItem} from "./StyledComponents";
import {connect} from 'react-redux'

// хардкодим пока что
const navData = [
    {
        title: "Большая таблица",
        date: new Date().toDateString(),
        link: '/big'
    },
    {
        title: "Маленькая таблица",
        date: new Date().toDateString(),
        link: '/small'
    }
    ]

function StartPage(props) {
    return (
        <Container>
            <h1>Панель управления таблицами</h1>
            <Header>
                <span>Название</span>
                <span>Дата создания</span>
            </Header>
            {navData.map((item, index) =>
                <NavItem key={index} onClick={() => props.handleClick(index)}>
                    <NavLink to={item.link}>
                        <span>{item.title}</span>
                        <span>{item.date}</span>
                    </NavLink>
                </NavItem>
            )}
        </Container>
    )
}





export default StartPage