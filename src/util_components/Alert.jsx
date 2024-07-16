import React,{forwardRef, useImperativeHandle, useState} from "react";
import styled from "styled-components";

const Alert_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업
    // 외부 컴포넌트와 겹치므로 overlay position absolute, 외부 컴포넌트보다 z-index 우선순위 up
    position: absolute;
    z-index: 200;
    width: 100%;
    height: 100%;

    /* pc & mobile x scroll OFF~ (body overflow-x: clip) */
    overflow-x: clip;
    background-color: #18181A;
`

const Alert_container_div = styled.div`
    width: 500px;
    height: 250px;
    
    // absolute div 요소 중앙 완전 정렬
    // -> top, left : 50%, transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    border: 1px solid #2C2C2D;
    border-radius: 15px;
    color: white;
    background-color: #1E1E20;

    // 알림 컴포넌트 활성화 상태일 때 style 에 애니메이션 이 추가될 예정으로 keyframes 를 정의함
    @keyframes popup {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }

    @media (max-width: 1000px) {
        width: 350px;
        height: 250px;
    }
`
const Alert_span = styled.span`
    // 원래는 center / center 지만 독립적으로 위치 지정을 하기 위함
    justify-self: flex-start;
    align-self: flex-start;
    margin-left: 10%;

    font-size: 22px;
    color: white;
    font-weight: bold;
`
const Alert_span_text = styled(Alert_span)`
    margin-left: 10%;
    font-size: 15px;
    font-weight: 400;
`
const Alert_button = styled.button`
    width: 25%;
    height: 20%;

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
`

// 함수형 컴포넌트에 직접 접근하기 위해서는 ref 중에서 forwardRef 를 사용함
const Alert = forwardRef((props, ref) => {
    // 외부 컴포넌트에서 ref 를 통해 직접 접근하여 handleOpenAlert 메서드를 호출할 때 알림 컴포넌트 전체가 활성화하기 위함
    const [isAlert, setIsAlert] = useState(false);
    // handleOpenAlert 메서드의 파라미터로 들어오는 알림 컴포넌트 타이틀 상태 값
    const [span, setSpan] = useState("");
    // handleOpenAlert 메서드의 파라미터로 들어오는 알림 컴포넌트 내용 상태 값
    const [text, setText] = useState("");

    // 함수형 컴포넌트 중 외부에서 호출할 메서드는 useImperativeHandle 로 정의함
    // 외부에서 ref 를 통해 알림 컴포넌트 메서드 호출
    useImperativeHandle(ref, () => ({
        handleOpenAlert(span, text) {
            setSpan(span);
            setText(text);
            setIsAlert(true);
        },
    }));
    
    // 알림 컴포넌트에서 "확인" 버튼을 누를 때 다시 알림 컴포넌트가 비활성화됨
    const handleCloseAlert = () => {
        setIsAlert(false);
        setSpan("");
        setText("");
    };

    return (
        <>
            {isAlert &&
                <Alert_Overlay>
                    <Alert_container_div style={isAlert ? {animation: "popup 1s"} : {animation: "none"}}>
                        <Alert_span>{span}</Alert_span>
                        <Alert_span_text>{text}</Alert_span_text>
                        <Alert_button onClick={handleCloseAlert}>확인</Alert_button>
                    </Alert_container_div>
                </Alert_Overlay>
            }
        </>
    )
});

export default Alert;