import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./UserSlice";

// userSlice(액션 생성자 + 리듀서 함수) reducer 를 불러오고,
// 전역 상태를 관리할 리덕스 store 를 생성해 리턴함
const store = configureStore({
    reducer: {user: userSlice.reducer},
});

export type State = ReturnType<typeof store.getState>;
export default store;