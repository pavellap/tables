import {
    FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, FETCH_DATA_STARTED,
    TABLE_COLUMN_SORTED, TABLE_PAGE_CHANGED, TOGGLE_MODAL,
    TABLE_ADD_NEW_COLUMN, FILTER_TABLE_CONTENT, TABLE_DATA_CLICKED
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
    modalIsOpen: false,
    infoBlockHidden: true,
    infoBlockContent: []
}

export default function tableReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_STARTED:
            return {
                ...state, isLoading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state, tableContent: action.data.slice(0, 20), isLoading: false,
                data: action.data
            }
        case FETCH_DATA_ERROR:
            return {
                ...state, isLoading: false,  error: action.error
            }
        case TABLE_COLUMN_SORTED:
            /*
             * Для ререндера дочернего компонента редакс сравнивает объекты
             * Сравнение отсортированного объекта с предыдущим состоянием всегда выдаёт true
             * Для этого создаём копию с новой ссылкой для избежания такой ситуации
             * При рендере костыль (первый элемент массива) удаляется
             */
            const handleReduxBug = action.tableContent.slice();
            handleReduxBug.unshift("bugFixed")
            return {
                ...state, sortedColumn: action.column, tableContent: handleReduxBug,
                sortMethod: action.sortMethod
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
                ...state, data: copy, modalIsOpen: action.modalIsOpen, tableContent:
                    copy.slice(state.currentPage * 20 - 20, state.currentPage * 20)
            }
        case  FILTER_TABLE_CONTENT:
            return {
                ...state, tableContent: action.data
            }
        case TABLE_DATA_CLICKED:
            return {
                ...state, infoBlockHidden: false, infoBlockContent: action.data
            }
        default:
            return state
    }

}