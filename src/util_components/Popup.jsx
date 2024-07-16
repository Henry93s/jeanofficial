import React,{forwardRef, useImperativeHandle, useState, useRef} from "react";
import styled from "styled-components";
// callback 함수에서 요청할 수 있기 때문에 import (axiosCustom)
import axiosCustom from "./axiosCustom";
import Alert from "./Alert";

const Popup_Overlay = styled.div`
    // 메인 페이지와 배경색을 달리 하기 위한 오버레이 div 작업
    // 외부 컴포넌트와 겹치므로 overlay position absolute, 외부 컴포넌트보다 z-index 우선순위 up
    position: absolute;
    z-index: 200;
    width: 100vw;
    height: 100vh;

    /* pc & mobile x scroll OFF~ (body overflow-x: clip) */
    overflow-x: clip;
    background-color: #18181A;
`

const Popup_container_div = styled.div`
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
const Popup_span = styled.span`
    // 원래는 center / center 지만 독립적으로 위치 지정을 하기 위함
    justify-self: flex-start;
    align-self: flex-start;
    margin-left: 5%;

    font-size: 22px;
    color: white;
    font-weight: bold;
`
const Popup_span_text = styled(Popup_span)`
    margin-left: 5%;
    font-size: 15px;
    font-weight: 400;
`
const Popup_button_div = styled.div`
    width: 50%;
    height: 30%;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`
const Popup_button = styled.button`
    width: 40%;
    height: 60%;

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
const Popup = forwardRef((props, ref) => {
    // 외부 컴포넌트에서 ref 를 통해 직접 접근하여 handleOpenPopup 메서드를 호출할 때 팝업 컴포넌트 전체가 활성화하기 위함
    const [isPopup, setIsPopup] = useState(false);
    // handleOpenPopup 메서드의 파라미터로 들어오는 팝업 컴포넌트 타이틀 상태 값
    const [span, setSpan] = useState("");
    // handleOpenPopup 메서드의 파라미터로 들어오는 팝업 컴포넌트 내용 상태 값
    const [text, setText] = useState("");
    // handleOpenPopup 메서드의 파라미터로 들어오는 팝업 컴포넌트 콜백 함수 상태 값
    const [isOk, setIsOk] = useState(null);

    // 함수형 컴포넌트 중 외부에서 호출할 메서드는 useImperativeHandle 로 정의함
    // 외부에서 ref 를 통해 팝업 컴포넌트 메서드 호출
    useImperativeHandle(ref, () => ({
        handleOpenPopup(span, text, callback) {
            setSpan(span);
            setText(text);
            // 콜백 함수를 상태 값에 반영
            setIsOk(callback);
            setIsPopup(true);
        },
    }));
    
    const handleOkPopup = () => {
        // "예" 클릭 시 props 로 들어온 parameter 를 인자로 콜백함수를 실행
        isOk(props.parameter);

        // 이후 동작은 콜백함수에서 컨트롤되므로 나머지 상태를 초기화
        setIsPopup(false);
        setSpan("");
        setText("");
    };

    // "아니오" 클릭 시 팝업 컴포넌트 비활성화 처리
    const handleCancelPopup = () => {
        setIsPopup(false);
        setSpan("");
        setText("");
    }

    return (
        <> 
            {isPopup &&
                <Popup_Overlay>
                    <Popup_container_div style={isPopup ? {animation: "popup 1s"} : {animation: "none"}}>
                        <Popup_span>{span}</Popup_span>
                        <Popup_span_text>{text}</Popup_span_text>
                        <Popup_button_div>
                            <Popup_button onClick={handleOkPopup}>예</Popup_button>
                            <Popup_button onClick={handleCancelPopup}>아니오</Popup_button>
                        </Popup_button_div>
                    </Popup_container_div>
                </Popup_Overlay>
            }
        </>
    )
});

export default Popup;