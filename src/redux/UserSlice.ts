import {createSlice} from "@reduxjs/toolkit";

// 유저 로그인 초기 상태 정의 
const initialState = {
    email: "",
    nickName: ""
};

// 유저 로그인 상태 (액션 생성자 + 리듀서) 함수 정의
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setAll(state, action){
            state.email = action.payload.email;
            state.nickName = action.payload.nickName;
        },
        setEmail(state, action){
            state.email = action.payload.email;
        },
        setNickName(state, action){
            state.nickName = action.payload.nickName;
        },
        logout(state){
            state.email = "";
            state.nickName = "";
        }
    }
});

// 유저 로그인 상태에 따른 액션 생성자 함수 불러오고, export
export const setAll = userSlice.actions.setAll;
export const setEmail = userSlice.actions.setEmail;
export const setNickName = userSlice.actions.setNickName;
export const logout = userSlice.actions.logout;

// userSlice(액션 생성자 + 리듀서 함수) reducer export
export default userSlice;