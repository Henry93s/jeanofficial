import React from "react";
import App from "../App";
// redux Provider import
import { Provider } from "react-redux";
import store from "./Store";

// 리덕스 store 를 불러와서 전체 앱을 리덕스 Provider 로 감싸 전역 상태를 적용함
const ReduxContainer = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default ReduxContainer;