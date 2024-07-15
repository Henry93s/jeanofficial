import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import Popup from "../util_components/Popup";
import axiosCustom from "../util_components/axiosCustom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/UserSlice";

const Main_overlay = styled.div`
    width: 100%;
    height: 100vh;

    background-color: white;
`
const Main_container = styled.div`
    // 주요 element component PC 가운데 정렬(margin 0 auto) + 너비 80%( / 100vw )
    width: 90%;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    gap: 10px;

    @media (max-width: 1000px) {
        display: block;
    }
`
const Admin_logout_button = styled.button`
    width: 120px;
    height: 50px;
    margin-right: 20px;

    border: none;
    border-radius: 20px;
    background-color: #9061F9;
    color: white;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 1s;

    &:hover{
        background-color: #A47CFB;
    }
    @media (max-width: 1000px) {
        font-size: 22px;
        height: 30px;
    }
`
const Admin_user_div = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border: 3px solid #A47CFB;
    border-radius: 10px;
    @media (max-width: 1000px) {
        width: 100%;
        height: 50%;
    }
`
const Admin_user_div_title = styled.div`
    width: 100%;
    height: 70px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 40px;
    font-weight: bold;

    color: #A47CFB;
    border-bottom: 3px solid #A47CFB;

    @media (max-width: 1000px) {
        font-size: 20px;
        height: 40px;
    }
`
const Admin_user_item = styled.div`
    width: 100%;
    height: 60px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    color: #9061F9;
    font-size: 20px;
    transition: color, background-color 1s;
    cursor: pointer;

    &:hover{
        color: white;
        background-color: #9061F9;
    }

    @media (max-width: 1000px) {
        font-size: 13px;
        height: 40px;
    }
`
const Admin_user_detail_div = styled.div`
    width: 70%;

    display: flex;
    flex-direction: column;

    border: 3px solid #A47CFB;
    border-radius: 10px;

    @media (max-width: 1000px) {
        width: 100%;
        height: 50%;
    }
`

const Admin_user_detail_div_item = styled.div`
    width: 90%;
    height: 70vh;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    @media (max-width: 1000px) {
        width: 100%;
        height: 100vh;
    }
`

const Admin_user_detail_item_group = styled.div`
    width: 100%;
    height: 60px;
    
    display: flex;
    justify-content: center;
    align-items: center;
`
const Admin_user_detail_item_span = styled.span`
    width: 40%;
    height: 50px;
    font-size: 32px;
    color: black;
    font-weight: 500;

    @media (max-width: 1000px) {
        font-size: 15px;
    }
`
const Admin_user_detail_item_input = styled.input`
    width: 45%;
    height: 50px;
    font-size: 20px;
    color: white;
    font-weight: 500;
    text-align: center;

    border-radius: 10px;
    border: none;
    background-color: #A47CFB;

    @media (max-width: 1000px) {
        font-size: 12px;
    }
`
const Admin_user_detail_out_button = styled.button`
    width: 20%;
    height: 60px;

    color: white;
    font-weight: 500;
    font-size: 23px;
    background-color: #A47CFB;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.5s;

    &:hover{
        background-color: #9061F9;
    }
    @media (max-width: 1000px) {
        width: 25%;
        height: 30px;
        font-size: 15px;
    }
`

const Body_0_admin = () => {
    // admin 체크 상태
    const [isAdmin, setIsAdmin] = useState(false);
    // user 데이터 상태
    const [users, setUsers] = useState([]);
    // 좌측 회원 관리에서 유저를 클릭했는지에 대한 상태
    const [userclick, setUserclick] = useState({
        email: "",
        is_click: false
    });
    // user detail 상태
    const [detail, setDetail] = useState({
        email: "",
        nickname: "",
        is_admin: false
    });
    // 강제 reload 상태 유도
    const [reload, setReload] = useState(false);
    // 팝업, 알림 컴포넌트 조작 ref
    const popupOpenRef = useRef(null);
    const alertOpenRef = useRef(null);
    // 이벤트 함수에서 리다이렉트 시 navigate
    const navigate = useNavigate();
    // 리덕스 스토어에서 user 상태 가져옴
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    // user 상태 확인 시 is_admin 이 true 일 때 users 데이터 상태를 셋팅함
    useEffect(() => {
        if(user.is_admin){
            setIsAdmin(true);
            axiosCustom.get('/users')
            .then(res => {
                setUsers(res.data);
            })
        } else {
            setIsAdmin(false);
            alertOpenRef.current.handleOpenAlert("페이지 알림", "관리자 접근이 필요한 페이지입니다.");
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
        return;
    },[user, reload])

    // 계정 전용 관리자가 로그아웃 시 메인페이지로 리다이렉트됨.
    const handleLogout = useCallback(() =>{
        // 원래 실제 로그아웃 요청하고 문제없을 시 진행하여야 함
        const token = document.cookie.split("=")[1];
        if(token && token.length > 0){
            axiosCustom.get('/logout')
            .then(res => {
                dispatch(logout());
                alertOpenRef.current.handleOpenAlert("관리자 알림", "계정 관리자를 로그아웃했습니다.");
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            })
        }
    });

    // 좌측 회원 관리에서 유저 클릭 시 상세 회원 정보에 내용을 출력 시키는 이벤트 함수
    const userItemClickHandle = useCallback((email, nickname, is_admin) => {
        setUserclick((current) => {
            const newClick = {...current};
            newClick.email = email;
            newClick.is_click = true;
            return newClick;
        });

        setDetail((current) => {
            const newDetail = {...current};
            newDetail.email = email;
            newDetail.nickname = nickname;
            newDetail.is_admin = is_admin;
            return newDetail;
        });
    });

    console.log(detail)

    // 선택한 회원 탈퇴 콜백 함수
    const userOutCallback = useCallback((email) => {
        axiosCustom.post('/users/deleteByEmail',{email})
        .then(res => {
            alertOpenRef.current.handleOpenAlert("관리자 알림", res.data.message);
            setReload(!reload);
            return;
        })
    });

    // 선택한 회원 탈퇴 시키기
    const userOutHandle = useCallback(() => {
        if(detail.is_admin){
            alertOpenRef.current.handleOpenAlert("관리자 알림", "계정 관리자는 탈퇴시킬 수 없습니다.");
            return;
        }
        popupOpenRef.current.handleOpenPopup("관리자 알림", "회원 탈퇴를 진행시키겠습니까? 해당 회원의 글도 모두 삭제됩니다.", () => userOutCallback);
        return;
    });

    return (
        <Main_overlay>
            <Popup parameter={detail.email} ref={popupOpenRef} />
            <Alert ref={alertOpenRef} />
            {isAdmin &&
            <Main_container>
                <Admin_logout_button onClick={handleLogout}>Logout</Admin_logout_button>
                <Admin_user_div>
                    <Admin_user_div_title>회원 관리</Admin_user_div_title>
                    {users.map((v) => {
                                return (
                                    <Admin_user_item onClick={() => userItemClickHandle(v.email, v.name, v.is_admin)} 
                                        style={userclick.email === v.email && { color: "white", backgroundColor: "#9061F9"} 
                                            || { color: "#9061F9", backgroundColor: "white"}}>
                                        {v.email} <br/> {"(" + v.name + ")"}
                                    </Admin_user_item>
                                );
                            })
                    }
                </Admin_user_div>
                {userclick.is_click &&
                <Admin_user_detail_div>
                    <Admin_user_div_title>상세 회원 정보</Admin_user_div_title>
                    <Admin_user_detail_div_item>
                        <Admin_user_detail_item_group>
                            <Admin_user_detail_item_span>이메일 : </Admin_user_detail_item_span>
                            {/* input value 를 더 이상 수정하지 않고 state 에 따라 값을 변경 시킬 때는 value 를 사용한다 ! */}
                            <Admin_user_detail_item_input disabled value={detail.email}/>
                        </Admin_user_detail_item_group>
                        <Admin_user_detail_item_group>
                        <Admin_user_detail_item_span>닉네임 : </Admin_user_detail_item_span>
                            <Admin_user_detail_item_input disabled value={detail.nickname}/>
                        </Admin_user_detail_item_group>
                        <Admin_user_detail_item_group>
                            <Admin_user_detail_item_span>관리자 여부 : </Admin_user_detail_item_span>
                            <Admin_user_detail_item_input disabled value={detail.is_admin}/>
                        </Admin_user_detail_item_group>
                        <Admin_user_detail_item_group>
                            <Admin_user_detail_out_button onClick={userOutHandle}>추방하기</Admin_user_detail_out_button>
                        </Admin_user_detail_item_group>
                    </Admin_user_detail_div_item>
                </Admin_user_detail_div>
                }
            </Main_container>
            }
        </Main_overlay>
    )
}

export default Body_0_admin;
