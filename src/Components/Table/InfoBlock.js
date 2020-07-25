import React from "react";
import styled from "styled-components";
import {connect} from 'react-redux'
import PropsTypes from 'prop-types'

const Container = styled.div`
    background-color: #F6F8FA;
    padding: 16px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 40%;
    margin-top: 30px;
    span {
      margin-top: 15px;
    }
`

function Info(props) {
    const {firstName, lastName, streetAddress, city, state, zip, description} = props.data
    return (
        <React.Fragment>
            <Container>
                {!props.status ? (
                    <React.Fragment>
                        <span>Выбран пользователь: <b>{firstName} {lastName}</b></span>
                        <span>Описание: <textarea>{description}</textarea></span>
                        <br/>
                        <span>Адрес проживания: <b>{streetAddress}</b></span>
                        <span>Город: <b>{city}</b></span>
                        <span>Провинция: <b>{state}</b></span>
                        <span>Индекс: <b>{zip}</b></span>
                    </React.Fragment>
                    ) : null
                }
            </Container>
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        status: state.table.infoBlockHidden,
        data: state.table.infoBlockContent
    }
}

Info.propTypes = {
    status: PropsTypes.bool,
    data: PropsTypes.array
}

export default connect(mapStateToProps)(Info)
