import React, {useEffect, useState} from "react";
import {changeTablePage, fetchData, filterTable, toggleModal} from "../../Redux/Actions/TableActions";
import {connect} from "react-redux";
import {Loader} from "../../UI/Loader";
import {Tooltip, Button, withStyles, TextField} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {ArrowBackIos} from "@material-ui/icons";
import {Pagination} from '@material-ui/lab'
import Table from './Table'
import PropTypes from 'prop-types'
import Modal from "../../UI/Modal";
import ReactDOM from 'react-dom'
import Form from "./AddItemForm";
import InfoBlock from "./InfoBlock";
import '../Styles/TableContainer.scss'

const StyledButton = withStyles({
    root: {
        margin: '20px 25px'
    }
})(Button)

function TableContainer(props) {
    const [selectedElement, handleContent] = useState(null);
    const [filterContent, handleFilterContent] = useState("")
    const [filterError, handleFilterError] = useState(false);

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

    return (
        <React.Fragment>
            {props.isLoading ? <Loader/> :
                <>
                    <header className='table-container__header'>
                        <div>
                            <Tooltip title='На стартовую страницу' placement='bottom-end'>
                                <NavLink to='/'>
                                    <ArrowBackIos fontSize='large'/>
                                </NavLink>
                            </Tooltip>
                        </div>
                        <div className='table-container__container'>
                            <StyledButton variant="contained" color="primary"
                                          onClick={() => props.toggleModal(props.modalIsOpen)}>
                                Добавить новую запись в таблицу
                            </StyledButton>
                            <div>
                                <TextField label={'Шаблон фильтрации'} value={filterContent}
                                           onChange={(e) =>  {
                                               handleFilterContent(e.currentTarget.value);
                                               if (e.currentTarget.value)
                                                   handleFilterError(false);
                                           }}
                                           variant="outlined" required error={filterError}/>
                                <StyledButton onClick={() => {
                                    filterContent === "" ? handleFilterError(true) :
                                    props.filterContent(props.tableContent, filterContent)
                                }} variant='contained' color='primary'>
                                    Отфильтровать
                                </StyledButton>
                            </div>
                        </div>
                    </header>
                    <section className='table-container__wrapper'>
                        <div className='table-container__info'>
                            Текущая ячейка: {selectedElement}
                        </div>
                        <Table
                               titles={titles}
                               displayCellData={(val) => displayTestData(val)}/>
                    </section>
                    <footer className='table-container__footer'>
                        <Pagination count={Math.ceil(props.data.length / 20)}
                                    page={props.currentPage}
                                    onChange={(event, page) =>
                                        props.changePage(page)}/>
                        <InfoBlock/>
                    </footer>
                    {props.modalIsOpen && ReactDOM.createPortal(
                        <Modal>
                            <Form titles={titles.slice(1)}/>
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
        modalIsOpen: state.table.modalIsOpen,
        tableContent: state.table.tableContent
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: type => dispatch(fetchData(type)),
        changePage: page => dispatch(changeTablePage(page)),
        toggleModal: state => dispatch(toggleModal(!state)),
        filterContent: (template, content) => dispatch(filterTable(template, content))
    }
}


TableContainer.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array,
    error: PropTypes.string,
    currentPage: PropTypes.number,
    modalIsOpen: PropTypes.bool,
    tableContent: PropTypes.array,
    fetchData: PropTypes.func,
    changePage: PropTypes.func,
    toggleModal: PropTypes.func,
    filterTable: PropTypes.func,
    tableId: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer)