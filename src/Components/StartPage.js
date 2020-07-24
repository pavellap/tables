import React from "react";
import {NavLink} from 'react-router-dom'
import {Container, Header, NavItem} from "./StyledComponents";


const navData = [
    {
        title: "Большая таблица",
        date: new Date().toDateString(),
    },
    {
        title: "Маленькая таблица",
        date: new Date().toDateString(),
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
                    <NavLink to={'/table'}>
                        <span>{item.title}</span>
                        <span>{item.date}</span>
                    </NavLink>
                </NavItem>
            )}
        </Container>
    )
}





export default StartPage