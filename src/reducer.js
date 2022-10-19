import { SEND_SMS, CLEAR_SMS, SAVE_CHAT_NAME } from './actions'

function reducer(state, action) {
    let mesagesData = []
    if (action.type === SEND_SMS) {
        if (action.payload) {
            let messagestore = JSON.parse(localStorage.getItem('messageData'))

            mesagesData = [...messagestore, action.payload]
        }
        localStorage.setItem('messageData', JSON.stringify(mesagesData))
        return {...state, mesagesData: mesagesData }
    }

    if (action.type === CLEAR_SMS) {
        localStorage.setItem('messageData', JSON.stringify([]))
        mesagesData = []
        return {...state, mesagesData: mesagesData }
    }

    if (action.type === SAVE_CHAT_NAME) {
        console.log('gggggggggggg', action.payload)
        return {...state, CurrentUser: action.payload }
    }
    return state
}

export default reducer