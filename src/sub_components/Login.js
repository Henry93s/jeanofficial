import React,{useState, useRef, useCallback} from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import { Link, useNavigate } from "react-router-dom";
import axiosCustom from "../util_components/axiosCustom";
// redux 상태 관리 사용
import { useDispatch } from "react-redux";

const Login_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업
    position: absolute;
    width: 100vw;
    height: 100vh;

    /* pc & mobile x scroll OFF~ (body overflow-x: clip) */
    overflow-x: clip;
    background-color: #18181A;
`

const Login_Container_div = styled.div`
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
    width: 95%;
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
// Link 컴포넌트의 경우 a 와 같이 기본 태그가 아니므로 함수형으로 styled 해야 함!!!
const Login_underline_link = styled(Link)`
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
    const alertOpenRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 로그인 요청
    // 이메일 형식, 이메일 또는 패스워드 입력 여부 사전 체크 server 진행
    const handleFormSubmit = useCallback((e) => {
        e.preventDefault();
        axiosCustom.post('/login/auth',{email: loginUser.email, password: loginUser.password})
        .then(res => {
            // 에러시 알림 팝업 발생함.
            alertOpenRef.current.handleOpenAlert("로그인 알림", res.data.message);
            if(res.data && res.data.code === 200){
                // 메인 페이지로 이동
                // navigate 는 컴포넌트 리렌더링이 동작함 !
                navigate('/');
            }
            return;
        });
    });

    const handleEmailChange = useCallback((e) => {
        setLoginUser((current) => {
            const newLogin = {...current};
            newLogin.email = e.target.value;
            return newLogin; 
        });
    });
    const handlePasswordChange = useCallback((e) => {
        setLoginUser((current) => {
            const newLogin = {...current};
            newLogin.password = e.target.value;
            return newLogin; 
        });
    });

    return (
        <>
            <Alert ref={alertOpenRef} />
            <Login_Overlay>
                <Login_Container_div>
                    <Login_main_form onSubmit={handleFormSubmit}>
                        <Login_span>로그인 🍭</Login_span>
                        <Login_email_div>
                            <Login_email_span>이메일</Login_email_span>
                            <Login_email_input placeholder="your_email@email.com" onChange={handleEmailChange}/>
                        </Login_email_div>
                        <Login_password_div>
                            <Login_password_span>비밀번호</Login_password_span>
                            <Login_password_input type="password" placeholder="영문 + 숫자 + 특수문자 8자 이상" onChange={handlePasswordChange}/>
                        </Login_password_div>
                        <Login_submit_button type="submit">Continue</Login_submit_button>
                        <Login_underline_span>or</Login_underline_span>
                        <Login_underline_signup>계정이 없으신가요?
                            <Login_underline_link to="/signup"> 회원가입</Login_underline_link>       
                        </Login_underline_signup>
                        <Login_underline_findpw>비밀번호를 잊어버렸어요! 
                            <Login_underline_link to="/findpw"> 비밀번호 찾기</Login_underline_link>
                        </Login_underline_findpw>
                    </Login_main_form>
                </Login_Container_div>
            </Login_Overlay>
        </>
    );
}

export default Login;
