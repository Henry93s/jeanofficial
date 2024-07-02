import React, {useRef, useEffect, useState, useCallback} from "react";
import Body_4_howsweet from "../datas/Body_4_howsweet";
import {Main_flex_div, Main_flex_div_p, Card_Carousel_div, Card_Carousel_item, Card_Carousel_item_img,
    Card_Carousel_right, Card_Carousel_left, Carousel_Swipe_Guide, Carousel_Swipe_Guide_img, Carousel_Swipe_Guide_p,
    Modal_Overlay, Modal_Contents
} from './Body_carousel_elementStyled';

const Body_5_element4 = () => {
    // 캐러셀 인덱스 state (좌우버튼 클릭)
    const [carouselIndex, setCarouselIndex] = useState({
        index: 0,
        direction: "right",
        translateValue: 0
    });
    // 사진 데이터 state
    const [howsweet, setHowsweet] = useState(Body_4_howsweet);
    
    // 캐러셀 드래그 states, 캐러셀 items Ref
    const cardRef = useRef([]);
    // 마우스 클릭 state
    const [isMouseDown, setIsMouseDown] = useState(false);
    // 첫 마우스 위치 state
    const [startX, setStartX] = useState(0);
    // x 스크롤 위치 state
    const [scrollLeft, setScrollLeft] = useState(0);
    // 마우스 클릭 handler
    // 모든 마우스 이벤트마다 e.preventDefault() 적용 처리
    const handleIsMouseDown = useCallback((e) =>{
        e.preventDefault();
        setIsMouseDown(true);
        setStartX(e.pageX - targetRef.current[1].offsetLeft);
        setScrollLeft(targetRef.current[1].scrollLeft);
    });
    const handleIsMouseLeave = useCallback((e) =>{
        e.preventDefault();
        setIsMouseDown(false);
    });
    const handleIsMouseUp = useCallback((e) =>{
        e.preventDefault();
        setIsMouseDown(false);
    });
    const handleIsMouseMove = useCallback((e) => {
        if(!isMouseDown){
            return;
        } else {
            e.preventDefault();
            const x = e.pageX - targetRef.current[1].offsetLeft;
            const walk = x - startX;
            // console.log(scrollLeft - walk);
            if(scrollLeft - walk > 0){ // 우측에서 좌측으로 쓸어넘긴 경우 -> next
                setCarouselIndex((current) => {
                    const newCarouselIndex = {...current};
                    newCarouselIndex.index = carouselIndex.index + 1;
                    newCarouselIndex.direction = "right";
                    // const move 로 실제 translate value 를 계산해버리므로 index 까지 고려하지 않아도 문제 없음
                    // gap(20px) + width(flex-basis (550px)) = 570 px
                    // 570 / n 으로 드래그에 따른 translateX 값 조절
                    const move = newCarouselIndex.translateValue - (570 / 4.5);
                    // 드래그 다음 제한 설정 추가
                    if(Math.abs(move) > 570 * (howsweet.length - 1)){
                        newCarouselIndex.translateValue = (570 * (howsweet.length - 1)) * (-1);
                    } else {
                        newCarouselIndex.translateValue = move;
                    }
                    // console.log("pc drag " + newCarouselIndex.translateValue)
                    return newCarouselIndex;
                });
            } else { // 좌측에서 우측으로 쓸어넘긴 경우 -> prev
                setCarouselIndex((current) => {
                    const newCarouselIndex = {...current};
                    newCarouselIndex.index = carouselIndex.index - 1;
                    newCarouselIndex.direction = "left";
                    // const move 로 실제 translate value 를 계산해버리므로 index 까지 고려하지 않아도 문제 없음
                    // gap(20px) + width(flex-basis (550px)) = 570 px
                    // 570 / n 으로 드래그에 따른 translateX 값 조절
                    const move = newCarouselIndex.translateValue + (570 / 4.5);
                    // 드래그 이전 제한 설정 추가
                    if(move > 0){
                        newCarouselIndex.translateValue = 0;
                    } else {
                        newCarouselIndex.translateValue = move;
                    }
                    // console.log("pc drag " + newCarouselIndex.translateValue)
                    return newCarouselIndex;
                });
            }
        }
    })

    // useRef [] 배열로 관리하기 ! (element scroll animation)
    const targetRef = useRef([]);
    // scroll animation 동작 구현
    useEffect(() => {
        const osv = new IntersectionObserver((e) => {
            e.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.style.opacity = 1;
                } else {
                    entry.target.style.opacity = 0;
                }
            })
        },{
            threshold: 0.3
        });
        targetRef.current.forEach(v => {
            osv.observe(v);
        })
    },[]);
     
    // 캐러셀 사진 전체 화면 모달 창 호출 이벤트 핸들러
    const [isModal, setIsModal] = useState("false");
    const [cardSrc, setCardSrc] = useState('');
    const handleCardClick = useCallback((value) => {
        setIsModal("true");
        setCardSrc(value);
    });
    const handleModalClick = useCallback(() => {
        setIsModal("false");
    });

    // 좌우 버튼 시 캐러셀 내부 x 스크롤 이동 동작 명령 (css props - move(translate value 값) 전달)
    const handleCarouselClick = useCallback((e) => {
        // prev
        if(e.target.name === "leftClick"){
            setCarouselIndex((current) => {
                const newCarouselIndex = {...current};
                newCarouselIndex.index = carouselIndex.index - 1;
                newCarouselIndex.direction = "left";
                // const move 로 실제 translate value 를 계산해버리므로 index 까지 고려하지 않아도 문제 없음
                // gap(20px) + width(flex-basis (550px)) = 570 px
                const move = newCarouselIndex.translateValue + (570);
                // 최대 이전 클릭 제한 설정 추가
                if(move > 0){
                    newCarouselIndex.translateValue = 0;
                } else {
                    newCarouselIndex.translateValue = move;
                }
                // console.log("pc click " + newCarouselIndex.translateValue)
                return newCarouselIndex;
            });
        } else { // next
            setCarouselIndex((current) => {
                const newCarouselIndex = {...current};
                newCarouselIndex.index = carouselIndex.index + 1;
                newCarouselIndex.direction = "right";
                // const move 로 실제 translate value 를 계산해버리므로 index 까지 고려하지 않아도 문제 없음
                // gap(20px) + width(flex-basis (550px)) = 570 px
                const move = newCarouselIndex.translateValue - (570);
                // 최대 다음 클릭 제한 설정 추가
                if(Math.abs(move) > 570 * (howsweet.length - 1)){
                    newCarouselIndex.translateValue = (570 * (howsweet.length - 1)) * (-1);
                } else {
                    newCarouselIndex.translateValue = move;
                }
                // console.log("pc click " + newCarouselIndex.translateValue)
                return newCarouselIndex;
            });
        }
    });

    return (
        <>
            <Modal_Overlay onClick={handleModalClick} ismodal={isModal}>
                        <Modal_Contents src={cardSrc} alt={cardSrc} />
            </Modal_Overlay>
            <Main_flex_div>
                <Main_flex_div_p ref={element => targetRef.current[0] = element}>How sweet<br/>Photo</Main_flex_div_p>
                <Card_Carousel_left><img src="/images/left.png" alt="left" onClick={handleCarouselClick} name="leftClick"/></Card_Carousel_left>
                <Card_Carousel_right><img src="/images/right.png" alt="right" onClick={handleCarouselClick} name="rightClick"/></Card_Carousel_right>
                <Card_Carousel_div ref={element => targetRef.current[1] = element}
                        onMouseDown={handleIsMouseDown}
                        onMouseLeave={handleIsMouseLeave}
                        onMouseUp={handleIsMouseUp}
                        onMouseMove={handleIsMouseMove}
                    >
                    {howsweet.map((v,i) => {
                        return (
                            <Card_Carousel_item carouselindex={carouselIndex} ref={v => cardRef.current[i] = v} key={v.key}>
                                {/* 매개변수가 있는 이벤트 핸들러 함수 등은 익명함수로 넣어야 함!!! (아니면 렌더링될 때마다 바로 호출해버림) */}
                                <Card_Carousel_item_img src={v.value} alt={v.value} onClick={() => handleCardClick(v.value)}/>
                            </Card_Carousel_item>
                        );
                    })}
                    <Carousel_Swipe_Guide>
                        <Carousel_Swipe_Guide_img src="/images/move-left.png" alt="move-left" />
                        <Carousel_Swipe_Guide_p>이곳에서 좌우로 SWIPE 하세요.</Carousel_Swipe_Guide_p>
                        <Carousel_Swipe_Guide_img src="/images/move-right.png" alt="move-right" />
                    </Carousel_Swipe_Guide>
                </Card_Carousel_div>
                
            </Main_flex_div>
        </>
    )
}


export default Body_5_element4;