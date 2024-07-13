import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userSlice from "./UserSlice";

const store = configureStore({
    reducer: {user: userSlice.reducer},
});

export default store;