"use strict";
import { createStore } from "redux";
import reducer from "./reducer";

let store;
const initstore = {
    mesagesData: [],
    CurrentUser: '',
}
if (!store) {
    store = createStore(reducer, initstore);
}

export { store };