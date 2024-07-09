import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userSlice from "./UserSlice";

// 여러 개의 slice(reducer) 를 가진 리덕스 store 구성하기(user, post 예정)
const combineReducer = combineReducers({
    user: userSlice.reducer,
    // post 예정 추가 후 combineReducer 로 바꾸기(store - reducer)
});

const store = configureStore({
    reducer: userSlice.reducer,
});

export default store;