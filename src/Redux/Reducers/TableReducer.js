import {
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR, FETCH_DATA_STARTED, TABLE_COLUMN_SORTED, TABLE_PAGE_CHANGED, TOGGLE_MODAL, TABLE_ADD_NEW_COLUMN
} from "../Actions/ActionTypes"

const initialState = {
    isLoading: false,
    data: [],
    error: null,
    sortedColumn: null,
    sortingDirection: null,
    currentPage: 1,
    tableContent: [],
    sortMethod: "asc",
    modalIsOpen: false
}

export default function tableReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_STARTED:
            return {
                ...state, isLoading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state, tableContent: action.data.slice(0, 20), isLoading: false, data: action.data
            }
        case FETCH_DATA_ERROR:
            return {
                ...state, isLoading: false,  error: action.error
            }
        case TABLE_COLUMN_SORTED:
            return {
                ...state, sortedColumn: action.column, tableContent: action.tableContent, sortMethod: action.sortMethod
            };
        case TABLE_PAGE_CHANGED:
            return {
                ...state, currentPage: action.currentPage, tableContent: state.data.slice(
                    action.currentPage * 20 - 20, action.currentPage * 20)
            }
        case TOGGLE_MODAL:
            return {
                ...state, modalIsOpen: action.modalIsOpen
            }
        case TABLE_ADD_NEW_COLUMN:
            const copy = state.data;
            copy.unshift(action.data)
            return {
                ...state, data: copy, modalIsOpen: action.modalIsOpen, tableContent: copy.slice(
                    action.currentPage * 20 - 20, action.currentPage * 20)
            }
        default:
            return state
    }

}