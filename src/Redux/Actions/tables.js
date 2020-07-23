import Axios from "axios";
import {FETCH_DATA_BIG, FETCH_DATA_SUCCESS,
    FETCH_DATA_SMALL, FETCH_DATA_ERROR, FETCH_DATA_STARTED} from "./ActionTypes";
import {URL_SMALL_DATA, URL_BIG_DATA} from "../../config";

export function fetchData(type) {

    const url = type === 'big' ? URL_BIG_DATA : URL_SMALL_DATA;

    return async dispatch => {
        dispatch(fetchDataStart()) // начали грузить данные
        try {
            console.log("Я тут тоже!")

            const response = await Axios.get(url)

            const data = response.data
            // парсим response.data
            console.log("Tables:", data)

            dispatch(fetchDataSuccess(data))
        } catch (e) {
            console.log("Произошёл взлом:", e)
            dispatch(fetchDataError(e))
        }
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
        data
    }
}

export function fetchDataError(e) {
    return {
        type: FETCH_DATA_ERROR,
        error: e
    }
}