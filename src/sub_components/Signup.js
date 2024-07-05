import React,{useRef, useState, useCallback} from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";

const Signup_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업, z-index : alert 띄우기(alert index: 200)
    position: absolute;
    z-index: 105;
    width: 100vw;
    height: 100vh;

    /* pc & mobile x scroll OFF~ (body overflow-x: clip) */
    overflow-x: clip;
    background-color: #18181A;
`

const Signup_Container_div = styled.div`
    width: 750px;
    height: 750px;
    
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

const Signup_main_form = styled.form`
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
const Signup_span = styled.span`
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

const Signup_email_div = styled.div`
    width: 80%;
    height: 12%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    @media (max-width: 1000px) {
        width: 90%;
    }
`
const Signup_email_span = styled.span`
    font-size: 15px;
    font-weight: bold;

    @media (max-width: 1000px) {
        font-size: 12px;
    }
`
const Signup_email_input = styled.input`
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
`
const Signup_email_verify_button = styled.button`
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
        width: 25%;
        font-size: 13px;
    }
`
const Signup_code_div = styled(Signup_email_div)`
`
const Signup_code_span = styled(Signup_email_span)`
`
const Signup_code_input = styled(Signup_email_input)`
`
const Signup_code_verify_button = styled(Signup_email_verify_button)`
    width: 22%;
`

const Signup_nickname_div = styled(Signup_email_div)`
`
const Signup_nickname_span = styled(Signup_email_span)`
`
const Signup_nickname_input = styled(Signup_email_input)`
    width: 65%;
`
const Signup_password_div = styled(Signup_nickname_div)`
`
const Signup_password_span = styled(Signup_nickname_span)`
`
const Signup_password_input = styled(Signup_nickname_input)`
`
const Signup_passwordConfirm_div = styled(Signup_nickname_div)`
`
const Signup_passwordConfirm_span = styled(Signup_nickname_span)`
`
const Signup_passwordConfirm_input = styled(Signup_nickname_input)`
`

const Signup_submit_button = styled.button`
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

const Signup = () => {
    const [addUser, setAddUser] = useState({
        email: "",
        code: "",
        nickname: "",
        password: "",
        passwordConfirm: ""
    });
    const alertOpenRef = useRef(null);
    const verifyBtnRef = useRef(null);
    const emailInputRef = useRef(null);

    const handleEmailVerifyGet = useCallback(() => {
        if(!/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(addUser.email)){
            alertOpenRef.current.handleOpenAlert("회원가입 알림","이메일 형식을 다시 확인해주세요.");
            return;
        }
        console.log("이메일 db 에 존재하는지 요청");

        console.log("인증번호가 정상 전송될 때 아래 막기 작업")
        verifyBtnRef.current.style.backgroundColor = "#1E1E20";
        verifyBtnRef.current.style.cursor = "default";
        verifyBtnRef.current.disabled = "true";
        emailInputRef.current.disabled = "true";
    });

    const handleEmailVerifyPost = useCallback(() => {
        console.log("인증번호가 맞는지 서버 확인 요청");
    });

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault();
        console.log("인증이 되었는지 확인 요청");
        console.log("닉네임 중복 확인 요청");

        if(addUser.password.length < 8){
            alertOpenRef.current.handleOpenAlert("회원가입 알림", "패스워드는 8자 이상으로 입력해주세요.");
            return;
        }
        else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&`~$^()_+])[A-Za-z\d@!%*#?&`~$^()_+]{8,}$/.test(addUser.password)){
            alertOpenRef.current.handleOpenAlert("회원가입 알림", "비밀번호는 영문 + 숫자 + 특수문자의 조합으로 설정해 주세요.");
            return;
        }
        if(addUser.password !== addUser.passwordConfirm) {
            alertOpenRef.current.handleOpenAlert("회원가입 알림", "비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        console.log("email, password, nickname 으로 db 추가 요청");
        
    });

    const handleEmailChange = useCallback((e) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.email = e.target.value;
            return newAddUser; 
        });
    });

    const handlePasswordChange = useCallback((e) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.password = e.target.value;
            return newAddUser; 
        });
    });
    const handlePasswordConfirmChange = useCallback((e) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.passwordConfirm = e.target.value;
            return newAddUser; 
        });
    });
    const handleNicknameChange = useCallback((e) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.nickname = e.target.value;
            return newAddUser; 
        });
    });
    const handleCodeChange = useCallback((e) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.code = e.target.value;
            return newAddUser; 
        });
    });

    return (
        <>
            <Alert ref={alertOpenRef} />
            <Signup_Overlay>
                <Signup_Container_div>
                    <Signup_main_form onSubmit={handleFormSubmit}>
                        <Signup_span>회원가입</Signup_span>
                        <Signup_email_div>
                            <Signup_email_span>이메일</Signup_email_span>
                            <Signup_email_input placeholder="your_email@email.com" ref={emailInputRef} onChange={handleEmailChange}/>
                            <Signup_email_verify_button type="button" ref={verifyBtnRef} onClick={handleEmailVerifyGet}>인증번호 받기</Signup_email_verify_button>
                        </Signup_email_div>
                        <Signup_code_div>
                            <Signup_code_span>인증번호</Signup_code_span>
                            <Signup_code_input placeholder="인증번호를 입력하세요." onChange={handleCodeChange}/>
                            <Signup_code_verify_button type="button" onClick={handleEmailVerifyPost}>인증번호 확인</Signup_code_verify_button>
                        </Signup_code_div>
                        <Signup_nickname_div>
                            <Signup_nickname_span>닉네임</Signup_nickname_span>
                            <Signup_nickname_input placeholder="12자 이내 닉네임 입력" maxLength='12' onChange={handleNicknameChange}/>
                        </Signup_nickname_div>
                        <Signup_password_div>
                            <Signup_password_span>비밀번호</Signup_password_span>
                            <Signup_password_input type="password" placeholder="영문 + 숫자 + 특수문자 8자 이상" onChange={handlePasswordChange}/>
                        </Signup_password_div>
                        <Signup_passwordConfirm_div>
                            <Signup_passwordConfirm_span>비밀번호 확인</Signup_passwordConfirm_span>
                            <Signup_passwordConfirm_input type="password" placeholder="위와 동일한 비밀번호 입력" onChange={handlePasswordConfirmChange}/>
                        </Signup_passwordConfirm_div>
                        <Signup_submit_button type="submit">가입하기</Signup_submit_button>
                    </Signup_main_form>
                </Signup_Container_div>
            </Signup_Overlay>
        </>
    );
}

export default Signup;
