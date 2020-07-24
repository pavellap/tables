import React, {useEffect, useState} from "react";
import {changeTablePage, fetchData, toggleModal} from "../Redux/Actions/TableActions";
import {connect} from "react-redux";
import {Loader} from "../UI/Loader";
import {Tooltip, Button, withStyles} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {ArrowBackIos} from "@material-ui/icons";
import styled from "styled-components";
import {Pagination} from '@material-ui/lab'
import Table from './Table'
import PropTypes from 'prop-types'
import Modal from "../UI/Modal";
import ReactDOM from 'react-dom'
import Form from "./AddItemForm";


const StyledButton = withStyles({
    root: {
        margin: "20px auto"
    }
})(Button)



const Header = styled.header`
    padding: 15px 0 0 20px;
    a {
        color: #111;
    }
    h2 {
        font-weight: normal;
        text-align: center;
    }
`

const Wrapper = styled.section`
    width: 80%;
    margin: 0 auto;
    border: 1px solid whitesmoke;
    th {
        padding: 3px 20px;
        text-align: center;
        border: 1px solid #ccc;
        background-color: #F6FAFB;
        text-transform: uppercase;
        font-weight: normal;
    }
`

const Footer = styled.footer`
    display: flex;
    justify-content: center;
    padding-top: 35px;
`

const Info = styled.div`
  padding: 7px 20px;
  border-bottom: 1px solid gainsboro;
  height: 30px
`

function TableContainer(props) {
    const [selectedElement, handleContent] = useState(null);
    console.log("Main:", props.data)
    const displayTestData = data => handleContent(data)

    useEffect(() => {
        props.fetchData(props.tableId);
        // eslint-disable-next-line
    }, [])

    let titles;
    if (props.data[0])
        titles = Object.keys(props.data[0])
    // формируем пустую ячейку для левого-верхнего элемента
    if (titles)
        titles.unshift("")

    console.log("Test props:", props)

    return (
        <React.Fragment>
            {props.isLoading ? <Loader/> :
                <>
                    <Header>
                        <div>
                            <Tooltip title='На стартовую страницу' placement='bottom-end'>
                                <NavLink to='/'>
                                    <ArrowBackIos fontSize='large'/>
                                </NavLink>
                            </Tooltip>
                        </div>
                        <StyledButton variant="contained" color="primary" onClick={() => props.toggleModal(props.modalIsOpen)}>
                            Добавить новую запись в таблицу
                        </StyledButton>
                    </Header>
                    <Wrapper>
                        <Info>
                            Текущая ячейка: {selectedElement}
                        </Info>
                        <Table
                               titles={titles}
                               displayCellData={(val) => displayTestData(val)}/>
                    </Wrapper>
                    <Footer>
                        <Pagination count={Math.ceil(props.data.length / 20)}
                                    page={props.currentPage}
                                    onChange={(event, page) => props.changePage(page)}/>
                    </Footer>
                    {props.modalIsOpen && ReactDOM.createPortal(
                        <Modal>
                            <Form titles={titles.slice(1)}>

                            </Form>
                        </Modal>, document.getElementById('modal'))}
                </>
            }
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        isLoading: state.table.isLoading,
        data: state.table.data,
        error: state.table.error,
        currentPage: state.table.currentPage,
        modalIsOpen: state.table.modalIsOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: type => dispatch(fetchData(type)),
        changePage: page => dispatch(changeTablePage(page)),
        toggleModal: state => dispatch(toggleModal(!state))
    }
}

TableContainer.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array,
    error: PropTypes.string,
    currentPage: PropTypes.number,
    fetchData: PropTypes.func,
    changePage: PropTypes.func,
    tableId: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.instanceOf(null)
        ])
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer)