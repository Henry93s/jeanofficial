import React,{useRef, useState, useCallback} from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import Popup from '../util_components/Popup';
import { useLocation, Link } from "react-router-dom";
import axiosCustom from "../util_components/axiosCustom";

const MypagePut_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업, z-index : alert 띄우기(alert index: 200)
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
    /* c.f
        + div 수평 중앙 정렬 -> margin: 0 auto;
        + text 수평 중앙 정렬 -> text-align: center;
    */
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

const MypagePut_nickname_div = styled(MypagePut_email_div)`
`
const MypagePut_nickname_span = styled(MypagePut_email_span)`
`
const MypagePut_nickname_input = styled(MypagePut_email_input)`
    width: 65%;
`
const MypagePut_password_div = styled(MypagePut_nickname_div)`
`
const MypagePut_password_span = styled(MypagePut_nickname_span)`
`
const MypagePut_password_input = styled(MypagePut_nickname_input)`
`
const MypagePut_passwordConfirm_div = styled(MypagePut_nickname_div)`
`
const MypagePut_passwordConfirm_span = styled(MypagePut_nickname_span)`
`
const MypagePut_passwordConfirm_input = styled(MypagePut_nickname_input)`
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

const MypagePut_underline_a = styled.a`
    text-decoration: none;
    color: #9061F9;
    font-weight: bold;

    // custom
    align-self: flex-end;
    margin-right: 5%;
    margin-bottom: 2%;

    transition: color 0.5s;
    cursor: pointer;

    &:hover{
        color: #A47CFB;
    }
`

const MypagePut = () => {
    const [putUser, setputUser] = useState({
        nickname: "",
        password: "",
        passwordConfirm: ""
    });
    const alertOpenRef = useRef(null);
    const popupOpenRef = useRef(null);
    // main 에서 개인정보 수정할 때 보내온 state 를 location 객체에서 불러옴
    const location = useLocation();
    const email = location.state.email;

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault();
        console.log("닉네임 중복 확인 요청");

        if(putUser.password.length < 8){
            alertOpenRef.current.handleOpenAlert("개인정보 수정 알림", "패스워드는 8자 이상으로 입력해주세요.");
            return;
        }
        else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&`~$^()_+])[A-Za-z\d@!%*#?&`~$^()_+]{8,}$/.test(putUser.password)){
            alertOpenRef.current.handleOpenAlert("개인정보 수정 알림", "비밀번호는 영문 + 숫자 + 특수문자의 조합으로 설정해 주세요.");
            return;
        }
        if(putUser.password !== putUser.passwordConfirm) {
            alertOpenRef.current.handleOpenAlert("개인정보 수정 알림", "비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        console.log("email 을 기준으로 password, nickname 으로 db 수정 요청");
        
    });

    const handlePasswordChange = useCallback((e) => {
        setputUser((current) => {
            const newputUser = {...current};
            newputUser.password = e.target.value;
            return newputUser; 
        });
    });
    const handlePasswordConfirmChange = useCallback((e) => {
        setputUser((current) => {
            const newputUser = {...current};
            newputUser.passwordConfirm = e.target.value;
            return newputUser; 
        });
    });
    const handleNicknameChange = useCallback((e) => {
        setputUser((current) => {
            const newputUser = {...current};
            newputUser.nickname = e.target.value;
            return newputUser; 
        });
    });

    const userOut = useCallback((email) => {
        axiosCustom.post('http://localhost:3002/users/deleteByEmail',{email})
        .then(res => {
            alertOpenRef.current.handleOpenAlert("개인정보 수정 알림", res.data.message);
            return;
        })
    });
    // 콜백 함수를 파라미터로 넘기기 !!! =>  () => "콜백함수명"
    const handleOutUser = useCallback(() => {
        popupOpenRef.current.handleOpenPopup("개인정보 수정 알림", "회원 탈퇴를 진행하시겠습니까? 회원 정보 및 작성글, 댓글 모두 삭제됩니다.", () => userOut);
        return;
    });

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
                        <MypagePut_nickname_div>
                            <MypagePut_nickname_span>닉네임</MypagePut_nickname_span>
                            <MypagePut_nickname_input placeholder="12자 이내 닉네임 입력" maxLength='12' onChange={handleNicknameChange}/>
                        </MypagePut_nickname_div>
                        <MypagePut_password_div>
                            <MypagePut_password_span>비밀번호</MypagePut_password_span>
                            <MypagePut_password_input type="password" placeholder="영문 + 숫자 + 특수문자 8자 이상" onChange={handlePasswordChange}/>
                        </MypagePut_password_div>
                        <MypagePut_passwordConfirm_div>
                            <MypagePut_passwordConfirm_span>비밀번호 확인</MypagePut_passwordConfirm_span>
                            <MypagePut_passwordConfirm_input type="password" placeholder="위와 동일한 비밀번호 입력" onChange={handlePasswordConfirmChange}/>
                        </MypagePut_passwordConfirm_div>
                        <MypagePut_underline_a onClick={handleOutUser}>탈퇴하기</MypagePut_underline_a>
                        <MypagePut_submit_button type="submit">수정하기</MypagePut_submit_button>
                    </MypagePut_main_form>
                </MypagePut_Container_div>
            </MypagePut_Overlay>
        </>
    );
}

export default MypagePut;
