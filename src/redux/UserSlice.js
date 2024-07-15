import {createSlice} from "@reduxjs/toolkit";

// 유저 로그인 초기 상태 정의 
const initialState = {
    email: "",
    nickName: "",
    is_admin: false,
    token: ""
};

// 유저 로그인 상태 (액션 생성자 + 리듀서) 함수 정의
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setEmail(state, action){
            state.email = action.payload.email;
        },
        setNickName(state, action){
            state.nickName = action.payload.nickName;
        },
        setToken(state, action){
            state.token = action.payload.token;
        },
        setIsAdmin(state, action){
            state.is_admin = action.payload.is_admin;
        },
        logout(state, action){
            state.email = "";
            state.nickName = "";
            state.token = "";
            state.is_admin = false
        }
    }
});

// 유저 로그인 상태에 따른 액션 생성자 함수 불러오고, export
export const setEmail = userSlice.actions.setEmail;
export const setNickName = userSlice.actions.setNickName;
export const setToken = userSlice.actions.setToken;
export const setIsAdmin = userSlice.actions.setIsAdmin;
export const logout = userSlice.actions.logout;

// userSlice(액션 생성자 + 리듀서 함수) reducer export
export default userSlice;