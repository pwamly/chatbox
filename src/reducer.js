import { SEND_SMS } from './actions'
let removeUser, registerUser

function reducer(state, action) {
    if (action.type === SEND_SMS) {
        let mesagesData = []

        if (action.payload) {
            mesagesData = [...state.mesagesData, action.payload]
        }

        return {...state, mesagesData: mesagesData }
    }

    return state
}

export default reducer