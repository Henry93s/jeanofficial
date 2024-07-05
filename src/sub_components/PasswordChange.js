import React,{useRef, useState, useCallback} from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import { useLocation } from "react-router-dom";

const PasswordChange_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업, z-index : alert 띄우기(alert index: 200)
    position: absolute;
    z-index: 105;
    width: 100vw;
    height: 100vh;

    /* pc & mobile x scroll OFF~ (body overflow-x: clip) */
    overflow-x: clip;
    background-color: #18181A;
`

const PasswordChange_Container_div = styled.div`
    width: 700px;
    height: 700px;
    
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

const PasswordChange_main_form = styled.form`
    width: 80%;
    height: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;

    border: 1px solid #2C2C2D;
    border-radius: 15px;
    background-color: #1E1E20;

    @media (max-width: 1000px) {
        width: 90%;
    }
`
const PasswordChange_span = styled.span`
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

const PasswordChange_email_div = styled.div`
    width: 80%;
    height: 15%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    @media (max-width: 1000px) {
        justify-content: space-between;

        width: 90%;
    }
`
const PasswordChange_email_span = styled.span`
    font-size: 15px;
    font-weight: bold;

    @media (max-width: 1000px) {
        font-size: 12px;
    }
`
const PasswordChange_email_input = styled.input`
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

const PasswordChange_password_div = styled(PasswordChange_email_div)`
`
const PasswordChange_password_span = styled(PasswordChange_email_span)`
`
const PasswordChange_password_input = styled(PasswordChange_email_input)`
`
const PasswordChange_passwordConfirm_div = styled(PasswordChange_email_div)`
`
const PasswordChange_passwordConfirm_span = styled(PasswordChange_email_span)`
`
const PasswordChange_passwordConfirm_input = styled(PasswordChange_email_input)`
`

const PasswordChange_submit_button = styled.button`
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
        width: 30%;
        font-size: 13px;
    }
`

const PasswordChange = () => {
    // 전달 받은 이메일을 받기 위해 location.state 객체 사용
    const location = useLocation();
    const email = location.state.email;

    const [password, setPassword] = useState({
        password: "",
        passwordConfirm: ""
    });
    const alertOpenRef = useRef(null);

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault();
        if(password.password.length < 8){
            alertOpenRef.current.handleOpenAlert("비밀번호 변경 알림", "패스워드는 8자 이상으로 입력해주세요.");
            return;
        }
        else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&`~$^()_+])[A-Za-z\d@!%*#?&`~$^()_+]{8,}$/.test(password.password)){
            alertOpenRef.current.handleOpenAlert("비밀번호 변경 알림", "비밀번호는 영문 + 숫자 + 특수문자의 조합으로 설정해 주세요.");
            return;
        }
        if(password.password !== password.passwordConfirm) {
            alertOpenRef.current.handleOpenAlert("비밀번호 변경 알림", "비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        console.log("email, password 로 db 수정 요청");
        
    });

    const handlePasswordChange = useCallback((e) => {
        setPassword((current) => {
            const newPasswordChange = {...current};
            newPasswordChange.password = e.target.value;
            return newPasswordChange; 
        });
    });
    const handlePasswordConfirmChange = useCallback((e) => {
        setPassword((current) => {
            const newPasswordChange = {...current};
            newPasswordChange.passwordConfirm = e.target.value;
            return newPasswordChange; 
        });
    });



    return (
        <>
            <Alert ref={alertOpenRef} />
            <PasswordChange_Overlay>
                <PasswordChange_Container_div>
                    <PasswordChange_main_form onSubmit={handleFormSubmit}>
                        <PasswordChange_span>비밀번호 변경</PasswordChange_span>
                        <PasswordChange_email_div>
                            <PasswordChange_email_span>이메일</PasswordChange_email_span>
                            <PasswordChange_email_input disabled value={email} />
                        </PasswordChange_email_div>
                        <PasswordChange_password_div>
                            <PasswordChange_password_span>비밀번호</PasswordChange_password_span>
                            <PasswordChange_password_input type="password" placeholder="영문 + 숫자 + 특수문자 8자 이상" onChange={handlePasswordChange}/>
                        </PasswordChange_password_div>
                        <PasswordChange_passwordConfirm_div>
                            <PasswordChange_passwordConfirm_span>비밀번호 확인</PasswordChange_passwordConfirm_span>
                            <PasswordChange_passwordConfirm_input type="password" placeholder="위와 동일한 비밀번호 입력" onChange={handlePasswordConfirmChange}/>
                        </PasswordChange_passwordConfirm_div>
                        <PasswordChange_submit_button type="submit">변경하기</PasswordChange_submit_button>
                    </PasswordChange_main_form>
                </PasswordChange_Container_div>
            </PasswordChange_Overlay>
        </>
    );
}

export default PasswordChange;
