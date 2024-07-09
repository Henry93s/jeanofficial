import {createSlice} from "@reduxjs/toolkit";

// 유저 로그인 초기 상태 정의 
const initialState = {
    user: {
        email: "",
        nickName: "",
        token: ""
    }
};

// 유저 로그인 상태 (액션 생성자 + 리듀서) 함수 정의
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        login(state, action){
            state.user.email = action.payload.email;
            state.user.nickName = action.payload.nickName;
            state.user.token = action.payload.token;
        },
        logout(state, action){
            state.user.email = "";
            state.user.nickName = "";
            state.user.token = "";
        }
    }
});

// 유저 로그인 상태에 따른 액션 생성자 함수 불러오고, export
export const login = userSlice.actions.login;
export const logout = userSlice.actions.logout;

// userSlice(액션 생성자 + 리듀서 함수) reducer export
export default userSlice;