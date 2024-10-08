import React,{ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import axiosCustom from "../util_components/axiosCustom";

const Findpw_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업
    position: absolute;
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
    // -> top, left : 50%, transform: translate(-50%, -50%);
    /* c.f (추가 정리)
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
    // 원래는 center / center 지만 독립적으로 위치 지정을 하기 위함
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
const Findpw_code_div = styled(Findpw_email_div)`
`
const Findpw_code_span = styled(Findpw_email_span)`
`
const Findpw_code_input = styled(Findpw_email_input)`
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
// Link 컴포넌트의 경우 a 와 같이 기본 html 태그가 아니므로 함수형으로 선언해야 함!
const Findpw_underline_link = styled(Link)`
    text-decoration: none;
    color: #9061F9;
    font-weight: bold;
    transition: color 0.5s;

    &:hover{
        color: #A47CFB;
    }
`

const Findpw = () => {
    // input 상태 정의
    const [FindpwUser, setFindpwUser] = useState({
        email: "",
        secret: ""
    });
    // 인증 요청 후 직접 element 요소 접근을 위한 ref
    const emailInputRef = useRef<HTMLInputElement>(null);
    const verifyBtnRef = useRef<HTMLButtonElement>(null);
    // 알림 팝업 컴포넌트 접근을 위한 ref
    const alertOpenRef = useRef<{ handleOpenAlert: (title: string, message: string) => void }>(null);
    // 인증 성공 후 비밀번호 변경 페이지 이동을 위함
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
                    // alertOpenRef.current 가 null 이면 handleOpenAlert 호출하지 않음
                    alertOpenRef.current?.handleOpenAlert("비밀번호 찾기 알림", "이미 로그인한 유저입니다.");
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
    const handleVerifyButton = useCallback(() => {
        const {email} = FindpwUser;
        axiosCustom.post('/users/verify/findpw', {email})
        .then(res => {
            // 전송 완료 후 버튼 비활성화 적용 함수
            controlVerifyButton(res);
            // alertOpenRef.current 가 null 이면 handleOpenAlert 호출하지 않음
            alertOpenRef.current?.handleOpenAlert("비밀번호 찾기 알림", res.data.message);
            return;
        });
    },[FindpwUser]);

    // 인증번호 검사 요청
    const controlVerifyButton = useCallback((res: any) => {
        if(res.data && res.data.code === 200){
            if(verifyBtnRef.current && emailInputRef.current){
                // 정상적으로 요청했을 때에는 이메일 입력 비활성화 및 인증 요청 버튼 비활성화
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
    },[]);

    // 인증번호 검사 요청
    const handleFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        // form onsubmit 시 새로고침 방지
        e.preventDefault();

        const {email, secret} = FindpwUser;
        axiosCustom.post('/users/verify/confirm', {email, secret})
        .then(res => {
            // alertOpenRef.current 가 null 이면 handleOpenAlert 호출하지 않음
            alertOpenRef.current?.handleOpenAlert("비밀번호 찾기 알림", res.data.message);
            if(res.data && res.data.code === 200){
                // 비밀번호 변경 페이지로 이동
                // navigate 할 때 user 상태 넘겨줌(이메일 전달 위함)
                alertOpenRef.current?.handleOpenAlert("비밀번호 찾기 알림", "이메일 인증이 완료되었습니다.");
                setTimeout(() => {
                    navigate('/pwchange', {state: FindpwUser});
                }, 1500); 
            }
            return;
        });
    },[FindpwUser]);

    // email input 변동 시 실시간 상태 변화
    const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFindpwUser((current) => {
            const newFindpw = {...current};
            newFindpw.email = e.target.value;
            return newFindpw; 
        });
    },[]);

    // 코드 시크릿 input 변동 시 실시간 상태 변화
    const handlesecretChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFindpwUser((current) => {
            const newFindpw = {...current};
            newFindpw.secret = e.target.value;
            return newFindpw; 
        });
    },[]);

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
                            <Findpw_email_verify_button type="button" onClick={handleVerifyButton} ref={verifyBtnRef}>인증요청</Findpw_email_verify_button>
                        </Findpw_email_div>
                        <Findpw_code_div>
                            <Findpw_code_span>인증번호</Findpw_code_span>
                            <Findpw_code_input placeholder="6자리 인증코드 입력" onChange={handlesecretChange}/>
                        </Findpw_code_div>
                        <Findpw_submit_button type="submit">인증확인</Findpw_submit_button>
                        <Findpw_underline_span>or</Findpw_underline_span>
                        <Findpw_underline_signup>계정이 없으신가요?
                            <Findpw_underline_link to="/signup"> 회원가입</Findpw_underline_link>       
                        </Findpw_underline_signup>
                    </Findpw_main_form>
                </Findpw_Container_div>
            </Findpw_Overlay>
        </>
        
    );
}

export default Findpw;
