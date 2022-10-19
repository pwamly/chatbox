"use strict";
import { createStore } from "redux";
import reducer from "./reducer";

let store;
let messageData = JSON.parse(localStorage.getItem('messageData')) || []

const initstore = {
    mesagesData: messageData || [],
    CurrentUser: '',
}
if (!store) {
    store = createStore(reducer, initstore);
}

export { store };