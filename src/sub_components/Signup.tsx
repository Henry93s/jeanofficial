import React, {RefObject, useRef, useState, useCallback, useEffect, FormEvent, ChangeEvent} from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import axiosCustom from '../util_components/axiosCustom';
import { useNavigate } from "react-router-dom";

const Signup_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업
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
const Signup_secret_div = styled(Signup_email_div)`
`
const Signup_secret_span = styled(Signup_email_span)`
`
const Signup_secret_input = styled(Signup_email_input)`
`
const Signup_secret_verify_button = styled(Signup_email_verify_button)`
    width: 22%;
`

const Signup_name_div = styled(Signup_email_div)`
`
const Signup_name_span = styled(Signup_email_span)`
`
const Signup_name_input = styled(Signup_email_input)`
    width: 65%;
`
const Signup_password_div = styled(Signup_name_div)`
`
const Signup_password_span = styled(Signup_name_span)`
`
const Signup_password_input = styled(Signup_name_input)`
`
const Signup_passwordConfirm_div = styled(Signup_name_div)`
`
const Signup_passwordConfirm_span = styled(Signup_name_span)`
`
const Signup_passwordConfirm_input = styled(Signup_name_input)`
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
    // input 상태 값 정의
    const [addUser, setAddUser] = useState({
        email: "",
        secret: "",
        name: "",
        password: "",
        passwordConfirm: ""
    });
    // 알림 컴포넌트 직접 접근을 위함
    const alertOpenRef = useRef<{ handleOpenAlert: (title: string, message: string) => void }>(null);
    // 인증번호가 정상 요청되었을 때 비활성화를 위해 각 element 요소에 직접 접근을 위함
    const verifyBtnRef = useRef<HTMLButtonElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    // 회원가입 성공 시 로그인 페이지로 이동하기 위함
    const navigate = useNavigate();

    // 로그인 되어 있는 상태일 경우 올 수 없는 페이지라서 
    // 로그인 후 강제로 접근 했을 때 다시 navigate 시킬 effect
    useEffect(() => {
        // 서버에서 로그인된 유저 정보를 가져옴
        const getuser = async () => {
            axiosCustom.get('/users/getuser')
            .then(res => {
                // 서버 검증을 통해 로그인된 유저면 다시 메인 페이지로 이동 시킴
                if(res.data && res.data.code === 200){
                    alertOpenRef.current?.handleOpenAlert("회원가입 알림", "이미 로그인한 유저입니다.");
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                    return;
                }
            })
        };
        getuser();
    }, []);

    // 인증번호 전송 요청 - 이메일 형식, 이메일 가입 여부도 체크해줌.
    const handleEmailVerifyGet = useCallback(() => {
        const {email} = addUser;
        axiosCustom.post('/users/verify', {email})
        .then(res => {
            // 요청 성공으로 인증 요청 버튼과 이메일 input 비활성화 처리 함수
            controlVerifyButton(res);
            alertOpenRef.current?.handleOpenAlert("회원가입 알림", res.data.message);
            return;
        });
    },[addUser]);
    const controlVerifyButton = useCallback((res: any) => {
        if(res.data && res.data.code === 200){
            if(verifyBtnRef.current && emailInputRef.current){
                // 정상적으로 요청했을 때에는 이메일 비활성화 및 인증번호 받기 버튼 비활성화
                verifyBtnRef.current.style.backgroundColor = "#1E1E20";
                verifyBtnRef.current.style.cursor = "default";
                verifyBtnRef.current.disabled = true;
                emailInputRef.current.disabled = true;
            }
        } else {
            if(verifyBtnRef.current && emailInputRef.current){
                verifyBtnRef.current.style.backgroundColor = "#9061F9";
                verifyBtnRef.current.style.cursor = "pointer";
                verifyBtnRef.current.removeAttribute('disabled');
                emailInputRef.current.removeAttribute('disabled');
            }
        }
    }, []);

    // 인증번호가 맞는지 서버 확인 요청
    const handleEmailVerifyPost = useCallback(() => {
        const {email, secret} = addUser;
        axiosCustom.post('/users/verify/confirm', {email, secret})
        .then(res => {
            alertOpenRef.current?.handleOpenAlert("회원가입 알림", res.data.message);
            return;
        });
    }, [addUser]);

    // 회원가입 요청 - 이메일 인증 요청 유무, 이메일 인증 유무, 닉네임 중복 체크
    const handleFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(addUser.password.length < 8){
            alertOpenRef.current?.handleOpenAlert("회원가입 알림", "패스워드는 8자 이상으로 입력해주세요.");
            return;
        }
        else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&`~$^()_+])[A-Za-z\d@!%*#?&`~$^()_+]{8,}$/.test(addUser.password)){
            alertOpenRef.current?.handleOpenAlert("회원가입 알림", "비밀번호는 영문 + 숫자 + 특수문자의 조합으로 설정해 주세요.");
            return;
        }
        if(addUser.password !== addUser.passwordConfirm) {
            alertOpenRef.current?.handleOpenAlert("회원가입 알림", "비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        if(addUser.name.length < 2) {
            alertOpenRef.current?.handleOpenAlert("회원가입 알림", "닉네임을 2자리 이상 입력해주세요.");
            return;
        }
        // email, password, name 으로 db 추가 요청
        const {email, password, name} = addUser;
        axiosCustom.post('/users', {email, password, name})
        .then(res => {
            alertOpenRef.current?.handleOpenAlert("회원가입 알림", res.data.message);
            if(res.data.code === 200){
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            return;
        });
    }, [addUser]);

    // 이메일 input 변동 시 상태 값 변화
    const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.email = e.target.value;
            return newAddUser; 
        });
    }, []);
    // 패스워드 input 변동 시 상태 값 변화
    const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.password = e.target.value;
            return newAddUser; 
        });
    }, []);
    // 패스워드 확인 input 변동 시 상태 값 변화
    const handlePasswordConfirmChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.passwordConfirm = e.target.value;
            return newAddUser; 
        });
    }, []);
    // 닉네임 input 변동 시 상태 값 변화
    const handlenameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.name = e.target.value;
            return newAddUser; 
        });
    }, []);
    // 인증코드 input 변동 시 상태 값 변화
    const handlesecretChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAddUser((current) => {
            const newAddUser = {...current};
            newAddUser.secret = e.target.value;
            return newAddUser; 
        });
    }, []);

    return (
        <>
            <Alert ref={alertOpenRef}/>
            <Signup_Overlay>
                <Signup_Container_div>
                    <Signup_main_form onSubmit={handleFormSubmit}>
                        <Signup_span>회원가입</Signup_span>
                        <Signup_email_div>
                            <Signup_email_span>이메일</Signup_email_span>
                            <Signup_email_input placeholder="your_email@email.com" ref={emailInputRef} onChange={handleEmailChange}/>
                            <Signup_email_verify_button type="button" ref={verifyBtnRef} onClick={handleEmailVerifyGet}>인증요청</Signup_email_verify_button>
                        </Signup_email_div>
                        <Signup_secret_div>
                            <Signup_secret_span>인증번호</Signup_secret_span>
                            <Signup_secret_input placeholder="인증번호를 입력하세요." onChange={handlesecretChange}/>
                            <Signup_secret_verify_button type="button" onClick={handleEmailVerifyPost}>인증확인</Signup_secret_verify_button>
                        </Signup_secret_div>
                        <Signup_name_div>
                            <Signup_name_span>닉네임</Signup_name_span>
                            <Signup_name_input placeholder="12자 이내 닉네임 입력" maxLength={12} onChange={handlenameChange}/>
                        </Signup_name_div>
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
