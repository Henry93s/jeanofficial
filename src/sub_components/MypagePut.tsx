import React,{useRef, useState, useCallback, useEffect, ChangeEvent, FormEvent} from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import Popup from '../util_components/Popup';
import { useLocation, Link, useNavigate } from "react-router-dom";
import axiosCustom from "../util_components/axiosCustom";
import { useDispatch, useSelector } from 'react-redux';
import { setNickName, logout } from '../redux/UserSlice';
import { State } from "../redux/Store";

const MypagePut_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업
    position: absolute;
    z-index: 105;
    width: 100vw;
    height: 100vh;

    /* pc & mobile x scroll OFF~ (body overflow-x: clip) */
    overflow-x: clip;
    background-color: #18181A;
`

const MypagePut_Container_div = styled.div`
    width: 650px;
    height: 650px;
    
    // absolute div 요소 중앙 완전 정렬
    // -> top, left : 50%, transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Noto Sans KR";

    @media (max-width: 1000px) {
        width: 400px;
        height: 100%;
    }
`

const MypagePut_main_form = styled.form`
    width: 80%;
    height: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0px;

    border: 1px solid #2C2C2D;
    border-radius: 15px;
    background-color: #1E1E20;

    @media (max-width: 1000px) {
        width: 90%;
    }
`
const MypagePut_span = styled.span`
    // 원래는 center / center 지만 독립적으로 위치 지정을 하기 위함
    justify-self: flex-start;
    align-self: flex-start;
    margin-left: 10%;
    margin-bottom: 7%;

    font-size: 25px;
    color: white;
    font-weight: bold;

    @media (max-width: 1000px) {
        font-size: 20px;
        margin-left: 5%;
    }
`

const MypagePut_email_div = styled.div`
    width: 80%;
    height: 15%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    @media (max-width: 1000px) {
        width: 90%;
    }
`
const MypagePut_email_span = styled.span`
    font-size: 15px;
    font-weight: bold;

    @media (max-width: 1000px) {
        font-size: 12px;
    }
`
const MypagePut_email_input = styled.input`
    width: 65%;
    height: 50%;

    color: white;
    background-color: #181619;
    font-size: 17px;
    border-radius: 5px;
    border: 1px solid #2C2C2D;

    padding-left: 15px;

    &:focus {
        border-color: #9061F9;
        // input focus 시 테두리 지우기
        outline: none;
    }
`

const MypagePut_name_div = styled(MypagePut_email_div)`
`
const MypagePut_name_span = styled(MypagePut_email_span)`
`
const MypagePut_name_input = styled(MypagePut_email_input)`
    width: 65%;
`
const MypagePut_password_div = styled(MypagePut_name_div)`
`
const MypagePut_password_span = styled(MypagePut_name_span)`
`
const MypagePut_password_input = styled(MypagePut_name_input)`
`
const MypagePut_passwordConfirm_div = styled(MypagePut_name_div)`
`
const MypagePut_passwordConfirm_span = styled(MypagePut_name_span)`
`
const MypagePut_passwordConfirm_input = styled(MypagePut_name_input)`
`

const MypagePut_submit_button = styled.button`
    width: 80%;
    height: 10%;

    background-color: #9061F9;
    border: none;
    border-radius: 15px;

    font-size: 18px;
    font-weight: 600;
    color: white;

    font-family: "Inter";
    cursor: pointer;

    transition: background-color 0.5s;

    &:hover{
        background-color: #A47CFB;
    }

    @media (max-width: 1000px) {
        font-size: 15px;
    }
`
const MypagePut_underline_div = styled.div`
    width: 90%;
    margin-bottom: 3%;
    display: flex;
    justify-content: space-between;
`
const MypagePut_underline_a = styled.a`
    text-decoration: none;
    color: #9061F9;
    font-weight: bold;

    transition: color 0.5s;
    cursor: pointer;

    &:hover{
        color: #A47CFB;
    }
`
const MypagePut_underline_link = styled(Link)`
    text-decoration: none;
    color: #9061F9;
    font-weight: bold;

    transition: color 0.5s;
    cursor: pointer;

    &:hover{
        color: #A47CFB;
    }   
`

const MypagePut = () => {
    // 수정될 예정인 입력 값 상태
    const [putUser, setputUser] = useState({
        name: "",
        password: "",
        passwordConfirm: ""
    });
    // 알림, 팝업 컴포넌트 호출을 위한 ref
    const alertOpenRef = useRef<{ handleOpenAlert: (title: string, message: string) => void }>(null);
    const popupOpenRef = useRef<{ handleOpenPopup: (span: string, text: string, callback: () => void) => void }>(null);

    // 회원 탈퇴 시 메인 페이지로 navigate 시키기 위함
    const navigate = useNavigate();

    // main 에서 개인정보 수정할 때 보내온 user 전역 state 를 location 객체에서 불러옴
    const location = useLocation();
    // 직접 url 접근이나 새로고침으로 location state 를 받아오지 못했을 때를 대비해 
    // email, nickName 프로퍼티가 없을 때, 에러가 아닌 undefined 를 반환하는 optional chaining 을 적용함
    const email = location.state?.email;
    const nickName = location.state?.nickName;

    console.log(email, nickName)

    // 리덕스 user 전역 상태를 확인하여 새로고침이나 직접 url 접근을 통해 페이지에 들어왔는지 검사하기 위함
    const user = useSelector((state: State) => state.user);

    // 리덕스 user 전역 상태가 초기화 됐는지 검사하여
    // useEffect 를 이용하여 민감한 페이지의 직접 url 입력이나, 새로고침 시 페이지 접근을 차단함
    /* (추가) state 는 기본적으로 직접 url 접근이나 새로고침 시 초기화된다.
    따라서 직접 url 접근이나 새로고침 시 접근을 차단시킬 수도 있고,
    데이터를 유지하려면 다시 전역 상태에 포함하거나 로컬, 세션 스토리지 등을 이용한다.
    */ 
    useEffect(() => {
        if(user.email.length < 1){
            alertOpenRef.current?.handleOpenAlert("개인정보 수정 알림", "잘못된 경로로 페이지에 접근하였습니다.");
            // (추가) Link & Route path vs navigate
            // - Link & Route path 는 컴포넌트에서 직접적으로 반환할 때 UI 요소로써 동작하고,
            // - navigate 는 컴포넌트의 함수 안에서 프로그래밍 제어 요소로써 동작한다.
            setTimeout(() => {
                navigate('/')
            }, 1000);
            return;
        }
    }, []);

    // 리덕스 리듀서에 액션 객체를 보낼 dispatch 선언
    // 수정된 nickName 을 리덕스 user 전역 상태 정보에 저장하기 위함
    const dispatch = useDispatch();

    // onsubmit 시 데이터 유효성 검사 및 수정 작업 요청
    const handleFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        // form onsubmit 으로 인한 새로고침 현상 방지
        e.preventDefault();

        if(putUser.name.length < 2 && putUser.password.length < 8){
            alertOpenRef.current?.handleOpenAlert("개인정보 수정 알림", "수정할 닉네임 또는 비밀번호를 입력해주세요.");
            return;
        }
        if(putUser.password.length >= 1 && putUser.password.length < 8){
            alertOpenRef.current?.handleOpenAlert("개인정보 수정 알림", "수정할 비밀번호를 8자 이상 입력해주세요.");
            return;
        }
        if(putUser.password.length >= 8 && 
            !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&`~$^()_+])[A-Za-z\d@!%*#?&`~$^()_+]{8,}$/.test(putUser.password))
        {
            alertOpenRef.current?.handleOpenAlert("개인정보 수정 알림", "비밀번호는 영문 + 숫자 + 특수문자의 조합으로 설정해 주세요.");
            return;
        }
        if(putUser.password !== putUser.passwordConfirm) {
            alertOpenRef.current?.handleOpenAlert("개인정보 수정 알림", "비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        // 개인 정보 수정 데이터를 bodyData 에 담아 보냄 (password or name)
        const bodyData = {email: email};
        if(putUser.name.length >= 2){
            bodyData["name"] = putUser.name;
        }
        if(putUser.password.length >= 8){
            bodyData["password"] = putUser.password;
        }
        axiosCustom.put('/users', bodyData)
        .then(res => {
            alertOpenRef.current?.handleOpenAlert("개인정보 수정 알림", res.data.message);

            // 수정된 nickName 을 user 전역 상태 정보에 저장함.
            if(res.data && res.data.code === 200){
                dispatch(setNickName({nickName: putUser.name}));
            }
            return;
        });
    },[putUser]);

    // 패스워드 input 변동 시 상태 값 변화
    const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setputUser((current) => {
            const newputUser = {...current};
            newputUser.password = e.target.value;
            return newputUser; 
        });
    },[]);
    // 패스워드 확인 input 변동 시 상태 값 변화
    const handlePasswordConfirmChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setputUser((current) => {
            const newputUser = {...current};
            newputUser.passwordConfirm = e.target.value;
            return newputUser; 
        });
    },[]);
    // 닉네임 input 변동 시 상태 값 변화
    const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setputUser((current) => {
            const newputUser = {...current};
            newputUser.name = e.target.value;
            return newputUser; 
        });
    },[]);

    // 회원 탈퇴 콜백함수
    const userOut = useCallback((email: string) => {
        axiosCustom.post('/users/deleteByEmail',{email})
        .then(res => {
            alertOpenRef.current?.handleOpenAlert("개인정보 수정 알림", res.data.message);

            // 정상 탈퇴 시 기존 로그인된 정보를 비우고 로그아웃 하여야 함
            if(res.data && res.data.code === 200){
                // 서버 로그아웃 요청 (post 요청으로 직접 url 입력 시 -> not found page)
                axiosCustom.post('/users/logout')
                .then(res => {
                    // 전역 user 상태 로그아웃 액션 요청
                    dispatch(logout());
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                })
            }
            return;
        })
    },[]);
    // 회원 탈퇴 진행 요청(popup 호출 -> popup 에서 "예" 클릭 시 회원 탈퇴 콜백함수가 동작함)
    // 콜백 함수를 파라미터로 넘김! =>  () => "콜백함수명"
    const handleOutUser = useCallback(() => {
        popupOpenRef.current?.handleOpenPopup("개인정보 수정 알림", "회원 탈퇴를 진행하시겠습니까? 회원 정보 및 작성글이 모두 삭제됩니다.", () => userOut);
        return;
    },[]);

    return (
        <>
            <Popup parameter={email} ref={popupOpenRef} />
            <Alert ref={alertOpenRef} />
            <MypagePut_Overlay>
                <MypagePut_Container_div>
                    <MypagePut_main_form onSubmit={handleFormSubmit}>
                        <MypagePut_span>개인정보 수정</MypagePut_span>
                        <MypagePut_email_div>
                            <MypagePut_email_span>이메일</MypagePut_email_span>
                            <MypagePut_email_input disabled value={email}/>
                        </MypagePut_email_div>
                        <MypagePut_name_div>
                            <MypagePut_name_span>닉네임</MypagePut_name_span>
                            <MypagePut_name_input placeholder="12자 이내 닉네임 입력" maxLength={12} defaultValue={nickName} onChange={handleNameChange}/>
                        </MypagePut_name_div>
                        <MypagePut_password_div>
                            <MypagePut_password_span>비밀번호</MypagePut_password_span>
                            <MypagePut_password_input type="password" placeholder="영문 + 숫자 + 특수문자 8자 이상" onChange={handlePasswordChange}/>
                        </MypagePut_password_div>
                        <MypagePut_passwordConfirm_div>
                            <MypagePut_passwordConfirm_span>비밀번호 확인</MypagePut_passwordConfirm_span>
                            <MypagePut_passwordConfirm_input type="password" placeholder="위와 동일한 비밀번호 입력" onChange={handlePasswordConfirmChange}/>
                        </MypagePut_passwordConfirm_div>
                        <MypagePut_underline_div>
                            <MypagePut_underline_link to="/">HOME</MypagePut_underline_link>
                            <MypagePut_underline_a onClick={handleOutUser}>탈퇴하기</MypagePut_underline_a>
                        </MypagePut_underline_div>
                        <MypagePut_submit_button type="submit">수정하기</MypagePut_submit_button>
                    </MypagePut_main_form>
                </MypagePut_Container_div>
            </MypagePut_Overlay>
        </>
    );
}

export default MypagePut;
