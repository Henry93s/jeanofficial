import React,{useRef, useState, useCallback, useEffect} from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import axiosCustom from "../util_components/axiosCustom";

const PasswordChange_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업
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
    // 패스워드 찾기 컴포넌트로부터 navigate 될 때 전달 받은 이메일을 받기 위해 location 객체 사용
    const location = useLocation();
    // 직접 url 접근이나 새로고침으로 location state 를 받아오지 못했을 때를 대비해 
    // email 프로퍼티가 없을 때, 에러가 아닌 undefined 를 반환하는 optional chaining 을 적용함
    const email = location.state?.email;
    // 성공적으로 패스워드 변경이 되었을 때 로그인 페이지로 이동하기 위함
    const navigate = useNavigate();

    // 패스워드 input 값 상태 정의
    const [password, setPassword] = useState({
        password: "",
        passwordConfirm: ""
    });
    // 알림 컴포넌트 요소 직접 접근을 위한 ref
    const alertOpenRef = useRef(null);

    // 비밀번호 변경 페이지에서는 리덕스 user 전역 상태가 아니라 !(로그인 안된 채 페이지가 넘어가는 경우이므로)
    // const email = location.state?.email; location 객체에서 가져온 email 이 undefined 인지 검사
    // 후 useEffect 를 이용하여 민감한 페이지의 직접 url 입력이나, 새로고침 시 페이지 접근을 차단함
    useEffect(() => {
        if(email === undefined){
            alertOpenRef.current.handleOpenAlert("비밀번호 변경 알림", "잘못된 경로로 페이지에 접근하였습니다.");
            setTimeout(() => {
                navigate('/')
            }, 1000);
            return;
        }
    }, []);

    // form onsubmit 동작 시 유효성 검사 및 패스워드 수정 요청
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
        axiosCustom.put('/users',{email, password: password.password})
        .then(res => {
            alertOpenRef.current.handleOpenAlert("비밀번호 변경 알림", res.data.message);
            if(res.data && res.data.code === 200){
                // 로그인 페이지로 이동
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            return;
        })
    });

    // 실시간 패스워드 상태 값 수정
    const handlePasswordChange = useCallback((e) => {
        setPassword((current) => {
            const newPasswordChange = {...current};
            newPasswordChange.password = e.target.value;
            return newPasswordChange; 
        });
    });
    // 실시간 패스워드 확인 상태 값 수정
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
