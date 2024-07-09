import React from "react";
import App from "../App";
// redux Provider import
import { Provider } from "react-redux";
import store from "./Store";

const ReduxContainer = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default ReduxContainer;