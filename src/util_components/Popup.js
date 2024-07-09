import React,{forwardRef, useImperativeHandle, useState, useRef} from "react";
import styled from "styled-components";
// callback 함수에서 요청할 수도 있음(axiosCustom)
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
    
    // 요소 중앙 완전 정렬
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

// 함수형 컴포넌트에 ref 사용 시 forwardRef 를 사용함
const Popup = forwardRef((props, ref) => {
    const [isPopup, setIsPopup] = useState(false);
    const [span, setSpan] = useState("");
    const [text, setText] = useState("");
    // 예 일 때 콜백 함수 실행 상태
    const [isOk, setIsOk] = useState(null);
    const alertOpenRef = useRef(null);

    // 함수형 컴포넌트 중 외부에서 호출할 메서드는 useImperativeHandle 로 사용함
    useImperativeHandle(ref, () => ({
        handleOpenPopup(span, text, callback) {
            setSpan(span);
            setText(text);
            // 콜백 함수 정의 추가
            setIsOk(callback);
            setIsPopup(true);
        },
    }));
    
    const handleOkPopup = () => {
        isOk(props.parameter);

        setIsPopup(false);
        setSpan("");
        setText("");
    };

    const handleCancelPopup = () => {
        setIsPopup(false);
        setSpan("");
        setText("");
    }

    return (
        <>  <Alert ref={alertOpenRef} />
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