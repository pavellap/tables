import Axios from "axios";
import {
    FETCH_DATA_SUCCESS, FETCH_DATA_ERROR,
    FETCH_DATA_STARTED, TABLE_COLUMN_SORTED,
    TABLE_PAGE_CHANGED, TOGGLE_MODAL,
    TABLE_ADD_NEW_COLUMN, FILTER_TABLE_CONTENT, TABLE_DATA_CLICKED
} from "./ActionTypes";
import {URL_SMALL_DATA, URL_BIG_DATA} from "../../Utils/config";
import {normalizeObject} from "../../Utils/utils";



export function toggleModal(state) {
    return dispatch => {
        dispatch({
            type: TOGGLE_MODAL,
            modalIsOpen: state
        })
    }
}

export function attachRow(data) {
    return dispatch => {
        dispatch({
            type: TABLE_DATA_CLICKED,
            data: data
        })
    }
}

export function filterTable(currentContent, template) {
    /*
     Cоздаём регулярку, которая  ищет подстроки
     */
    const re = new RegExp(template, 'i')
    const result = [];
    currentContent.forEach(item => {
        for (let value of Object.values(item)) {
            if (Number.isInteger(value))
                value = value.toString();
            if (re.test(value)) {
                result.push(item)
                return;
            }
        }
    })
    return dispatch => {
        dispatch({
            type: FILTER_TABLE_CONTENT,
            data: result
        })
    }
}

export function addTableEntry(data) {
    return dispatch => {
        dispatch({
            type: TABLE_ADD_NEW_COLUMN,
            data,
            modalIsOpen: false
        })
    }
}

export function fetchData(type) {
    // при перезагрузке страницы по умолчанию рендерится маленькая таблица
    const url = type === 'big' ? URL_BIG_DATA : URL_SMALL_DATA;
    return async dispatch => {
        dispatch(fetchDataStart()) // начали грузить данные
        try {
            const response = await Axios.get(url)
            const data = normalizeObject(response.data)
            dispatch(fetchDataSuccess(data))
        } catch (e) {
            console.log("Произошла ошибка:", e)
            dispatch(fetchDataError(e))
        }
    }
}

export function changeTablePage(page) {
    return dispatch => {
        dispatch({
            type: TABLE_PAGE_CHANGED,
            currentPage: page,
        })
    }
}

export function sortColumn(method, data, columnIndex) {
    const sortKey = Object.keys(data[0])[columnIndex - 1]
    if (method === "asc")
        // здесь сортируем колонку
        data.sort((a, b) => {
            if (Number.isInteger(a[sortKey]))
                return  a[sortKey] - b[sortKey];
            else {
                b[sortKey] = b[sortKey].toString();
                return a[sortKey].localeCompare(b[sortKey])
            }
        })

    else
        data.sort((a, b) => {
            if (Number.isInteger(a[sortKey]))
                return  b[sortKey] - a[sortKey];
            else {
                /* Casting b to string to prevent case, when we add new node
                    to table from form, and this value is string by default
                * */
                b[sortKey] = b[sortKey].toString();
                return b[sortKey].localeCompare(a[sortKey])
            }

        })

    return dispatch => {
        dispatch({
            type: TABLE_COLUMN_SORTED,
            column: columnIndex,
            tableContent: data,
            sortMethod: method === 'desc' ? 'asc' : 'desc'
        })
    }
}

function fetchDataStart() {
    return {
        type: FETCH_DATA_STARTED
    }
}

function fetchDataSuccess(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        data,
    }
}

function fetchDataError(e) {
    return {
        type: FETCH_DATA_ERROR,
        error: e
    }
}