import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import Popup from "../util_components/Popup";
import axiosCustom from "../util_components/axiosCustom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setAll } from "../redux/UserSlice";

const Main_overlay = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #18181A;
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
    color: white;
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
    // 좌측 항목인 user 데이터 상태
    const [users, setUsers] = useState([]);
    // 좌측 회원 관리에서 유저를 클릭했는지에 대한 상태
    const [userclick, setUserclick] = useState({
        email: "",
        is_click: false
    });
    // 우측 항목인 user detail 상태
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
    const dispatch = useDispatch();

    // 관리자는 로그인 완료 후 수동으로 /admin 주소를 입력하여 계정 관리자 페이지에 진입 성공할 수 있음
    // 서버 검증을 통한 user의 is_admin 이 true 일 때 users 목록 데이터 상태를 셋팅함
    useEffect(() => {
        // 서버에서 로그인된 유저 정보를 가져와서 클라이언트 리덕스 상태에 저장함
        const getuser = async () => {
            const res = await axiosCustom.get('/users/getuser');
            // 서버 검증을 통해 로그인된 유저가 있을 때 클라이언트 리덕스 유저 상태에 데이터를 저장함
            if(res.data && res.data.code === 200 && res.data.data.is_admin){
                dispatch(setAll({email: res.data.data.email, nickName: res.data.data.name}));
                
                // 전체 user 목록 데이터도 users 상태에 저장 시킴
                // post 요청으로 직접 url 접근 차단
                const res2 = await axiosCustom.post('/users/alluserdata');
                setUsers(res2.data);

                // 관리자 임을 확인했으므로 관련 상태 업데이트
                setIsAdmin(true);
            } else {
                // 로그인 되어도 관리자가 아닐 경우 메인 페이지로 이동시킴
                alertOpenRef.current.handleOpenAlert("페이지 알림", "관리자 승인이 필요한 페이지입니다.");
                setIsAdmin(false);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
                return;
            }
        };
        // 해당 페이지에서는 새로고침이나 직접 url 접근 시 데이터를 초기화하지 않아야 하므로
        // 유저 정보를 불러와 저장시켜야 한다.
        getuser();
    },[reload])

    // 계정 전용 관리자가 로그아웃 시 메인페이지로 리다이렉트됨.
    const handleLogout = useCallback(() =>{
        // 서버 로그아웃 요청 (post 요청으로 직접 url 입력 시 -> not found page)
        axiosCustom.post('/users/logout')
        .then(res => {
            alertOpenRef.current.handleOpenAlert("로그아웃 알림", res.data.message);
            if(res.data && res.data.code === 200){
                dispatch(logout());
                setIsAdmin(false);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
            return;
        })
    });

    // 좌측 회원 관리에서 유저 클릭 시 상세 회원 정보에 내용을 출력 시키는 이벤트 함수
    const userItemClickHandle = useCallback((email, nickname, is_admin) => {
        // 좌측에서 유저 클릭 시 해당 아이템 항목은 배경색이 변화하도록 함
        setUserclick((current) => {
            const newClick = {...current};
            newClick.email = email;
            newClick.is_click = true;
            return newClick;
        });

        // 유저 클릭 시 해당 유저의 디테일한 정보고 우측에 출력되도록 함
        setDetail((current) => {
            const newDetail = {...current};
            newDetail.email = email;
            newDetail.nickname = nickname;
            newDetail.is_admin = is_admin;
            return newDetail;
        });
    });

    // 선택한 회원 탈퇴 콜백 함수
    const userOutCallback = useCallback((email) => {
        axiosCustom.post('/users/deleteByEmail',{email})
        .then(res => {
            alertOpenRef.current.handleOpenAlert("관리자 알림", res.data.message);
            // 삭제가 되고 reload 라는 상태를 반전시켜 줌으로써 유저들 목록 데이터를 다시 받아옴
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
