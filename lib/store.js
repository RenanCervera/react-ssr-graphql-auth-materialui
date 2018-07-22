import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'


const exampleInitialState = {
    user: null,
    title: null
}

export const actionTypes = {
    SET_USER: 'SET_USER',
    SET_TITLE: 'SET_TITLE'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return Object.assign({}, state, {
                user: action.user
            })
        case actionTypes.SET_TITLE:
            return Object.assign({}, state, {
                title: action.title
            })
        default:
            return state
    }
}

// ACTIONS
export const setUser = (user) => dispatch => {
    return dispatch({ type: actionTypes.SET_USER, user: user })
}

export const setTitle = (title) => dispatch => {
    return dispatch({ type: actionTypes.SET_TITLE, title: title })
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
