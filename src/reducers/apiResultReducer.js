import { useReducer } from "react";

export const ACTIONS = {
    BEGIN_DOWNLOAD: 'begin-download',
    SUCCESS: 'success',
    ERROR: 'error',
    HIDE_MODAL: 'hide_modal'
}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    showResultModal: false,
    title: '',
    message: ''
}

const apiResultReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.BEGIN_DOWNLOAD: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ACTIONS.SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                showResultModal: true,
                title: action.status,
                message: action.message
            }
        }
        case ACTIONS.ERROR: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                showResultModal: true,
                title: action.status,
                message: action.message
            }
        }
        case ACTIONS.HIDE_MODAL: {
            return {
                ...state,
                showResultModal: false
            }
        }
    }
}


export const useApiResultReducer = (initState = initialState) => useReducer(apiResultReducer, initState);