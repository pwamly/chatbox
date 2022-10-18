import { EXIT_ADD_FORM } from './actions'
// import { removeUser, registerUser } from "./client/";
let removeUser, registerUser

function reducer(state, action) {
    /*forms*/
    if (action.type === EXIT_ADD_FORM) {
        return {...state, adduser: false }
    }

    return state
}

export default reducer