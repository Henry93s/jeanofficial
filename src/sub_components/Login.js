import React,{useState} from "react";
import styled from "styled-components";

const Login_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: #18181A;
`

const Login_Container_div = styled.div`
    width: 700px;
    height: 700px;
    
    // 요소 중앙 완전 정렬
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
    }
`

const Login_main_form = styled.form`
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
`
const Login_span = styled.span`
    justify-self: flex-start;
    align-self: flex-start;
    margin-left: 10%;

    font-size: 25px;
    color: white;
    font-weight: bold;
`

const Login_email_div = styled.div`
    width: 80%;
    height: 15%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
`
const Login_email_span = styled.span`
    font-size: 15px;
    font-weight: bold;
`
const Login_email_input = styled.input`
    margin: 0 auto;
    width: 95%;
    height: 50%;

    color: white;
    background-color: #181619;
    font-size: 17px;
    border-radius: 5px;
    border: 1px solid #2C2C2D;

    padding-left: 10px;

    &:focus {
        border-color: #9061F9;
        // input focus 시 테두리 지우기
        outline: none;
    }
`
const Login_password_div = styled(Login_email_div)`
`
const Login_password_span = styled(Login_email_span)`
`
const Login_password_input = styled(Login_email_input)`
`
const Login_submit_button = styled.button`
    width: 80%;
    height: 10%;

    background-color: #9061F9;
    border: none;
    border-radius: 15px;

    font-size: 17px;
    font-weight: 600;
    color: white;

    font-family: "Inter";
    cursor: pointer;

    transition: background-color 0.5s;

    &:hover{
        background-color: #A47CFB;
    }
`

const Login_underline_span = styled.span`
    width: 80%;
    color: #5F5F61;
    text-align: center;
    font-size: 15px;
`
const Login_underline_signup = styled(Login_underline_span)`
`
const Login_underline_findpw = styled(Login_underline_span)`
`
const Login_underline_link = styled.a`
    text-decoration: none;
    color: #9061F9;
    font-weight: bold;

    transition: color 0.5s;

    &:hover{
        color: #A47CFB;
    }
`

const Login = () => {
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });


    const handleFormSubmit = (e) => {
        e.preventDefault();
        
    }

    const handleEmailChange = (e) => {
        setLoginUser((current) => {
            const newLogin = {...current};
            newLogin.email = e.target.value;
            return newLogin; 
        });
    };
    const handlePasswordChange = (e) => {
        setLoginUser((current) => {
            const newLogin = {...current};
            newLogin.password = e.target.value;
            return newLogin; 
        });
    };

    return (
        <Login_Overlay>
            <Login_Container_div>
                <Login_main_form onSubmit={handleFormSubmit}>
                    <Login_span>로그인 🍭</Login_span>
                    <Login_email_div>
                        <Login_email_span>이메일</Login_email_span>
                        <Login_email_input onChange={handleEmailChange}/>
                    </Login_email_div>
                    <Login_password_div>
                        <Login_password_span>비밀번호</Login_password_span>
                        <Login_password_input type="password" onChange={handlePasswordChange}/>
                    </Login_password_div>
                    <Login_submit_button type="submit">Continue</Login_submit_button>
                    <Login_underline_span>or</Login_underline_span>
                    <Login_underline_signup>계정이 없으신가요?
                        <Login_underline_link href="/signup"> 회원가입</Login_underline_link>       
                    </Login_underline_signup>
                    <Login_underline_findpw>비밀번호를 잊어버렸어요! 
                        <Login_underline_link href="/findpw"> 비밀번호 찾기</Login_underline_link>
                    </Login_underline_findpw>
                </Login_main_form>
            </Login_Container_div>
        </Login_Overlay>
    );
}

export default Login;
