import {FETCH_DATA_BIG, FETCH_DATA_SUCCESS,
    FETCH_DATA_SMALL, FETCH_DATA_ERROR, FETCH_DATA_STARTED} from "../Actions/ActionTypes"

const initialState = {
    isLoading: false,
    data: [],
    error: null,
}

export default function tableReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_STARTED:
            return {
                ...state, isLoading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state, isLoading: false, data: action.data
            }
        case FETCH_DATA_ERROR:
            return {
                ...state, isLoading: false,  error: action.error
            }
        default:
            return state
    }

}