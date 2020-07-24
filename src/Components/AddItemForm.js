import React, {useState} from "react";
import styled from "styled-components";
import {TextField, Button} from "@material-ui/core";
import {connect} from 'react-redux'
import {addTableEntry} from "../Redux/Actions/TableActions";

const ModalBlock = styled.div`
    padding: 40px 20px;
    width: 25%;
    background-color: #fff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3 {
        font-weight: normal;
        text-align: center;
    }
`


function Form(props) {

    const [formsContent, handleFormsContent] = useState(props.titles.reduce((o, key) => ({ ...o, [key]: ""}), {}))
    const [error, handleFieldError] = useState(props.titles.reduce((o, key) => ({ ...o, [key]: false}), {}))


    const validateForm = () => {
        let status = true;
        for (const [key, value] of Object.entries(formsContent)) {
            const copy = handleFieldError;
            if (value === "") {
                status = false
                copy[key] = true;
            }

            handleFieldError(prevState => {
                return {...prevState, ...copy}
            })
        }
        console.log("Status before submit:", status)
        if (status)
            props.submit(formsContent)
    }

    return (
        <ModalBlock>
            <h3>Добавление новой записи</h3>
            {props.titles.map((item, index) =>
                <TextField key={index} error={error[item]} onChange={(e) => {
                    const copy = formsContent;
                    copy[item] = e.currentTarget.value;
                    // prevent issue with updating object properties via callback
                    handleFormsContent(prevState => {
                        return {...prevState, ...copy}
                    });
                }}
                    value={formsContent[item]}  label={item}  variant="outlined" required/>
            )}
            <Button onClick={validateForm} variant='contained' color='primary'>Добавить запись</Button>
        </ModalBlock>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        submit: data => dispatch(addTableEntry(data))
    }
}

export default connect(null, mapDispatchToProps)(Form);