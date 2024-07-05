import React,{useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Alert from "../util_components/Alert";

const Findpw_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업, z-index : alert 띄우기(alert index: 200)
    position: absolute;
    z-index: 105;
    width: 100vw;
    height: 100vh;

    /* pc & mobile x scroll OFF~ (body overflow-x: clip) */
    overflow-x: clip;
    background-color: #18181A;
`

const Findpw_Container_div = styled.div`
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

const Findpw_main_form = styled.form`
    width: 80%;
    height: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    border: 1px solid #2C2C2D;
    border-radius: 15px;
    background-color: #1E1E20;

    @media (max-width: 1000px) {
        width: 90%;
    }
`
const Findpw_span = styled.span`
    justify-self: flex-start;
    align-self: flex-start;
    margin-left: 10%;
    margin-bottom: 5%;

    font-size: 25px;
    color: white;
    font-weight: bold;

    @media (max-width: 1000px) {
        font-size: 20px;
        margin-left: 5%;
    }
`

const Findpw_email_div = styled.div`
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
const Findpw_email_span = styled.span`
    font-size: 15px;
    font-weight: bold;

    @media (max-width: 1000px) {
        font-size: 12px;
    }
`
const Findpw_email_input = styled.input`
    width: 50%;
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

    @media (max-width: 1000px) {
        width: 40%;
    }
`
const Findpw_email_verify_button = styled.button`
    width: 25%;
    height: 50%;

    background-color: #9061F9;
    border: none;
    border-radius: 15px;

    font-size: 15px;
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
const Findpw_password_div = styled(Findpw_email_div)`
`
const Findpw_password_span = styled(Findpw_email_span)`
`
const Findpw_password_input = styled(Findpw_email_input)`
    width: 80%;
    @media (max-width: 1000px) {
        width: 70%;
    }
`


const Findpw_submit_button = styled(Findpw_email_verify_button)`
    font-size: 18px;
    width: 80%;
    height: 10%;
`

const Findpw_underline_span = styled.span`
    width: 80%;
    color: #5F5F61;
    text-align: center;
    font-size: 15px;
`
const Findpw_underline_signup = styled(Findpw_underline_span)`
`
const Findpw_underline_findpw = styled(Findpw_underline_span)`
`
const Findpw_underline_link = styled.a`
    text-decoration: none;
    color: #9061F9;
    font-weight: bold;
    transition: color 0.5s;

    &:hover{
        color: #A47CFB;
    }
`

const Findpw = () => {
    const [FindpwUser, setFindpwUser] = useState({
        email: "",
        verifyCode: ""
    });
    const emailInputRef = useRef(null);
    const verifyBtnRef = useRef(null);
    const alertOpenRef = useRef(null);
    const navigate = useNavigate();

    const handleVerifyButton = () => {
        if(!/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(FindpwUser.email)){
            alertOpenRef.current.handleOpenAlert("비밀번호 찾기 알림","이메일 형식을 다시 확인해주세요.");
            return;
        }
        console.log("이메일 db 에 존재하는지 요청");


        verifyBtnRef.current.style.backgroundColor = "#1E1E20";
        verifyBtnRef.current.style.cursor = "default";
        verifyBtnRef.current.disabled = "true";
        emailInputRef.current.disabled = "true";
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        console.log("인증번호 검사 요청")
        console.log("비밀번호 변경 페이지로 이동")
        // navigate 할 때 user 상태 넘겨줌(이메일 전달 위함)
        
        navigate('/pwchange', {state: FindpwUser});
    }

    const handleEmailChange = (e) => {
        setFindpwUser((current) => {
            const newFindpw = {...current};
            newFindpw.email = e.target.value;
            return newFindpw; 
        });
    };
    const handleVerifyCodeChange = (e) => {
        setFindpwUser((current) => {
            const newFindpw = {...current};
            newFindpw.verifyCode = e.target.value;
            return newFindpw; 
        });
    };



    return (
        <>
            <Alert ref={alertOpenRef} />
            <Findpw_Overlay>
                <Findpw_Container_div>
                    <Findpw_main_form onSubmit={handleFormSubmit}>
                        <Findpw_span>비밀번호 찾기</Findpw_span>
                        <Findpw_email_div>
                            <Findpw_email_span>이메일</Findpw_email_span>
                            <Findpw_email_input ref={emailInputRef} placeholder="your_email@email.com" onChange={handleEmailChange}/>
                            <Findpw_email_verify_button type="button" onClick={handleVerifyButton} ref={verifyBtnRef}>인증번호 받기</Findpw_email_verify_button>
                        </Findpw_email_div>
                        <Findpw_password_div>
                            <Findpw_password_span>인증번호</Findpw_password_span>
                            <Findpw_password_input placeholder="6자리 인증코드 입력" onChange={handleVerifyCodeChange}/>
                        </Findpw_password_div>
                        <Findpw_submit_button type="submit">인증번호 확인</Findpw_submit_button>
                        <Findpw_underline_span>or</Findpw_underline_span>
                        <Findpw_underline_signup>계정이 없으신가요?
                            <Findpw_underline_link href="/signup"> 회원가입</Findpw_underline_link>       
                        </Findpw_underline_signup>
                    </Findpw_main_form>
                </Findpw_Container_div>
            </Findpw_Overlay>
        </>
        
    );
}

export default Findpw;
