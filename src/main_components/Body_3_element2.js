import React, {useRef, useEffect, useState, useCallback} from "react";
import styled from "styled-components";
import Body_3_supernatural from "./Body_3_supernatural";

const Main_flex_div = styled.div`
    width: 100%;
    height: 1200px;
    margin-top: 600px;
    font-family: "Inter", "Noto Sans KR", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: left;
    border-bottom: 1px solid white;
    // carousel prev, next 버튼의 ancestor 이므로 relative
    position: relative;

    @media (max-width: 1000px) {
        height: 700px;
        margin-top: 150px;
    }
`
const Main_flex_div_p = styled.p`
    margin-left: 20px;
    font-size: 48px;
    font-weight: 600;
    opacity: 0;
    transition: all 3s;
`
const Card_Carousel_div = styled.div`
    width: 96%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: left;
    align-items: flex-start;
    gap: 20px;
    // x축 scroll 작업
    overflow-x: hidden;
    flex-wrap: nowrap;
    // 스크롤 시 하나씩 넘기기	
	scroll-snap-type: x mandatory;
    opacity: 0;
    transition: all 3s;

    @media (max-width: 1000px) {
        height: 500px;
        /* mobile 끝에서 바운스 되도록 */
        -webkit-overflow-scrolling: touch;
        overflow-x: scroll;
    }
`
const Card_Carousel_item = styled.div.attrs(props => ({
    // 좌우 버튼 시 캐러셀 내부 x 스크롤 이동 동작 명령 (css props 받음 -> carouselIndex {index, direction})
    style: {transform: `translateX(${props.carouselindex.translateValue}px)`},
}))`
    width: 40%;
    height: 90%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 32px;
    z-index: 1;
    // 스크롤 시 하나씩 넘기기(아이템)
    scroll-snap-align: start;
    // x축 scroll 작업  
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 550px;
    transition: transform 1s;

    // 모바일 캐러셀에는 드래그 기본 동작 사용으로 트랜스폼 transition 제거 처리
    @media (max-width: 1000px) {
        transition: none;
        width: 40%;
        flex-basis: 300px;
    }
`

const Card_Carousel_item_img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        // hover 시 이미지 커졌다가 작아지는 효과
        animation: imagebigger 1s ease-in-out;
    }
    // hover 시 이미지 커졌다가 작아지는 효과 애니매이션 구현
    @keyframes imagebigger {
        0% {transform: scale(1)};
        50% {transform: scale(1.025)};
        100% {transform: scale(1)};
    }
`

const Card_Carousel_right = styled.div`
    width: 70px;
    height: 70px;
    // Main_flex_div 에 상대적으로 위치하여야므로 absolute
    position: absolute;
    background-color: transparent;
    border-radius: 50px;
    font-size: 50px;
    right: 2px;
    cursor: pointer;
    background-color: gray;
    opacity: 0.65;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    transform: translate(0px, 600px);
    z-index: 2;

    &:hover {
        opacity: 0.85;
    }

    @media (max-width: 1000px) {
        width: 60px;
        height: 60px;
        transform: translate(0px, 400px);
        // 모바일 캐러셀에는 x 축 드래그 기본 동작 사용이 가능하므로 좌우 버튼 제거 처리
        display: none;
    }
`

const Card_Carousel_left = styled(Card_Carousel_right)`
    left: 2px;
`


const Body_3_element2 = () => {
    // 캐러셀 인덱스 state (좌우버튼 클릭)
    const [carouselIndex, setCarouselIndex] = useState({
        index: 0,
        direction: "right",
        translateValue: 0
    });
    // 사진 데이터 state
    const [supernatural, setSupernatural] = useState(Body_3_supernatural);
    
    // 캐러셀 드래그 states, 캐러셀 items Ref
    const cardRef = useRef([]);
    // 마우스 클릭 state
    const [isMouseDown, setIsMouseDown] = useState(false);
    // 첫 마우스 위치 state
    const [startX, setStartX] = useState(0);
    // x 스크롤 위치 state
    const [scrollLeft, setScrollLeft] = useState(0);
    // 마우스 클릭 handler
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
                    const move = newCarouselIndex.translateValue - (570);
                    // 드래그 다음 제한 설정 추가
                    if(Math.abs(move) > 570 * (Body_3_supernatural.length - 1)){
                        newCarouselIndex.translateValue = (570 * (Body_3_supernatural.length - 1)) * (-1);
                    } else {
                        newCarouselIndex.translateValue = move;
                    }
                    console.log("pc drag " + newCarouselIndex.translateValue)
                    return newCarouselIndex;
                });
            } else { // 좌측에서 우측으로 쓸어넘긴 경우 -> prev
                setCarouselIndex((current) => {
                    const newCarouselIndex = {...current};
                    newCarouselIndex.index = carouselIndex.index - 1;
                    newCarouselIndex.direction = "left";
                    // const move 로 실제 translate value 를 계산해버리므로 index 까지 고려하지 않아도 문제 없음
                    // gap(20px) + width(flex-basis (550px)) = 570 px
                    const move = newCarouselIndex.translateValue + (570);
                    // 드래그 이전 제한 설정 추가
                    if(move > 0){
                        newCarouselIndex.translateValue = 0;
                    } else {
                        newCarouselIndex.translateValue = move;
                    }
                    console.log("pc drag " + newCarouselIndex.translateValue)
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
    
    // 사진 전체 화면으로 모달 창 띄울 예정
    const handleCardClick = useCallback((i) => {
        // console.log(i);
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
                console.log("pc click " + newCarouselIndex.translateValue)
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
                if(Math.abs(move) > 570 * (Body_3_supernatural.length - 1)){
                    newCarouselIndex.translateValue = (570 * (Body_3_supernatural.length - 1)) * (-1);
                } else {
                    newCarouselIndex.translateValue = move;
                }
                console.log("pc click " + newCarouselIndex.translateValue)
                return newCarouselIndex;
            });
        }
    });

    return (
        <Main_flex_div>
            <Main_flex_div_p ref={element => targetRef.current[0] = element}>Supernatural<br/>Photo</Main_flex_div_p>
            <Card_Carousel_left><img src="/images/left.png" alt="left" onClick={handleCarouselClick} name="leftClick"/></Card_Carousel_left>
            <Card_Carousel_right><img src="/images/right.png" alt="right" onClick={handleCarouselClick} name="rightClick"/></Card_Carousel_right>
            <Card_Carousel_div ref={element => targetRef.current[1] = element}
                    onMouseDown={handleIsMouseDown}
                    onMouseLeave={handleIsMouseLeave}
                    onMouseUp={handleIsMouseUp}
                    onMouseMove={handleIsMouseMove}
                >
                {supernatural.map((v,i) => {
                    return (
                        <Card_Carousel_item carouselindex={carouselIndex} ref={v => cardRef.current[i] = v} key={v.key} className={v.is_focused}>
                            {/* 매개변수가 있는 이벤트 핸들러 함수 등은 익명함수로 넣어야 함!!! (아니면 렌더링될 때마다 바로 호출해버림) */}
                            <Card_Carousel_item_img src={v.value} alt={v.value} onClick={() => handleCardClick(i)}/>
                        </Card_Carousel_item>
                    );
                })}
            </Card_Carousel_div>
            
        </Main_flex_div>

    )
}



export default Body_3_element2;