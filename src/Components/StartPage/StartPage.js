import React from "react";
import {NavLink} from 'react-router-dom'
import '../Styles/StartPage.scss'
import PropsTypes from 'prop-types'

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
        <section className='start-page__container'>
            <h1>Панель управления таблицами</h1>
            <header className='start-page__header'>
                <span>Название</span>
                <span>Дата создания</span>
            </header>
            {navData.map((item, index) =>
                <div key={index} onClick={() => props.handleClick(index)}>
                    <NavLink to={'/table'}>
                        <span>{item.title}</span>
                        <span>{item.date}</span>
                    </NavLink>
                </div>
            )}
        </section>
    )
}

StartPage.propTypes = {
    handleClick: PropsTypes.func
}

export default StartPage