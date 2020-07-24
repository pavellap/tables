import Axios from "axios";
import {
    FETCH_DATA_SUCCESS, FETCH_DATA_ERROR,
    FETCH_DATA_STARTED, TABLE_COLUMN_SORTED,
    TABLE_PAGE_CHANGED, TOGGLE_MODAL, TABLE_ADD_NEW_COLUMN
} from "./ActionTypes";
import {URL_SMALL_DATA, URL_BIG_DATA} from "../../config";
import {normalizeObject} from "../../utils";


export function addNewNote() {

}

export function toggleModal(state) {
    console.log("Тест:", state)
    return dispatch => {
        dispatch({
            type: TOGGLE_MODAL,
            modalIsOpen: state
        })
    }
}

export function addTableEntry(data) {
    console.log("Got new data:", data)
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
    // TODO: посмотреть, можно ли загружать данные частями, для более быстро рендера
    return async dispatch => {
        dispatch(fetchDataStart()) // начали грузить данные
        try {
            const response = await Axios.get(url)
            const data = normalizeObject(response.data)
            // парсим response.data

            dispatch(fetchDataSuccess(data))
        } catch (e) {
            console.log("Произошёл взлом:", e)
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
            else
                return a[sortKey].localeCompare(b[sortKey])
        })

    else
        data.sort((a, b) => {
            if (Number.isInteger(a[sortKey]))
                return  b[sortKey] - a[sortKey];
            else
                return b[sortKey].localeCompare(a[sortKey])
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

export function fetchDataStart() {
    return {
        type: FETCH_DATA_STARTED
    }
}

export function fetchDataSuccess(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        data,
    }
}

export function fetchDataError(e) {
    return {
        type: FETCH_DATA_ERROR,
        error: e
    }
}