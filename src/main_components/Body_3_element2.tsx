import React, {useRef, useEffect, useState, useCallback} from "react";
import Body_3_supernatural from "../datas/Body_3_supernatural";
import {Main_flex_div, Main_flex_div_p, Card_Carousel_div, Card_Carousel_item, Card_Carousel_item_img,
    Card_Carousel_right, Card_Carousel_left, Carousel_Swipe_Guide, Carousel_Swipe_Guide_img, Carousel_Swipe_Guide_p,
    Modal_Overlay, Modal_Contents
} from './Body_carousel_elementStyled';
// album_style 과 carousel style 은 앱에서 두 번씩 똑같이 사용되므로 외부 컴포넌트 스타일을 불러와서 적용함

const Body_3_element2 = () => {
    // 캐러셀 인덱스 state (좌우버튼 클릭)
    const [carouselIndex, setCarouselIndex] = useState({
        index: 0,
        direction: "right",
        translateValue: 0
    });
    // 사진 데이터 state
    const [supernatural, setSupernatural] = useState(Body_3_supernatural);
    
    // IntersectionObserver 를 생성하여 targetRef 가 관찰될 때(.isIntersecting) 투명도를 n 초동안 높이기 위함
    // useRef [] 배열로 관리하기 !
    const targetRef = useRef<HTMLDivElement []| null []>([]);
    // scroll animation 동작 구현
    useEffect(() => {
        const osv = new IntersectionObserver((e) => {
            e.forEach(entry => {
                // entry.target 강제 타입 선언
                const target = entry.target as HTMLElement;
                if(entry.isIntersecting){
                    target.style.opacity = "1";
                } else {
                    target.style.opacity = "0";
                }
            })
        },{
            threshold: 0.25
        });

        targetRef.current.forEach(v => {
            osv.observe(v);
        })
    },[]);

    // 캐러셀 드래그 states, 캐러셀 items Ref
    const cardRef = useRef<HTMLDivElement []| null []>([]);
    // 마우스 클릭 state
    const [isMouseDown, setIsMouseDown] = useState(false);
    // 첫 마우스 위치 state
    const [startX, setStartX] = useState(0);
    // x 스크롤 위치 state
    const [scrollLeft, setScrollLeft] = useState(0);
    // 마우스 클릭 handler
    // 모든 마우스 이벤트마다 e.preventDefault() 적용(새로고침 방지) 처리

    // 캐러셀 사진 아이템을 감싸는 div 에 마우스를 누르고 있을 때 
    const handleIsMouseDown = (e: React.MouseEvent<HTMLDivElement>) =>{
        e.preventDefault();
        setIsMouseDown(true);

        if(targetRef.current[1]){
            setStartX(e.pageX - targetRef.current[1].offsetLeft);
            setScrollLeft(targetRef.current[1].scrollLeft);
        }
    };
    // 캐러셀 사진 아이템을 감싸는 div 에서 마우스가 벗어났을 때
    const handleIsMouseLeave = (e: React.MouseEvent<HTMLDivElement>) =>{
        e.preventDefault();
        setIsMouseDown(false);
    };
    // 캐러셀 사진 아이템을 감싸는 div 에 누르고 있던 마우스를 땠을 때
    const handleIsMouseUp = (e: React.MouseEvent<HTMLDivElement>) =>{
        e.preventDefault();
        setIsMouseDown(false);
    };
    // 캐러셀 사진 아이템을 감싸는 div 에 마우스를 누르고 있는 상태에서 마우스를 움직였을 때(즉 드래그)
    const handleIsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if(!isMouseDown){
            return;
        } else {
            e.preventDefault();
            if(targetRef.current[1]){
                    const x = e.pageX - targetRef.current[1].offsetLeft;
                    const walk = x - startX;
                // console.log(scrollLeft - walk);
                if(scrollLeft - walk > 0){ // 우측에서 좌측으로 쓸어넘긴 경우 -> next
                    setCarouselIndex((current) => {
                        const newCarouselIndex = {...current};
                        newCarouselIndex.index = carouselIndex.index + 1;
                        newCarouselIndex.direction = "right";
                        // const move 로 실제 translate value 를 계산
                        // gap(20px) + width(flex-basis (550px)) = 570 px
                        // 570 / n 으로 드래그에 따른 translateX 값 조절
                        const move = newCarouselIndex.translateValue - (570 / 4.5);
                        // 드래그 다음 제한 설정 추가
                        if(Math.abs(move) > 570 * (supernatural.length - 1)){
                            newCarouselIndex.translateValue = (570 * (supernatural.length - 1)) * (-1);
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
                        // const move 로 실제 translate value 를 계산
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
        }
    };
    
     
    // 사진 아이템이 클릭됐는지 상태 정의하여 모달 창을 불러올 것인지 판단하는 상태 정의
    const [isModal, setIsModal] = useState(false);
    // 어떤 사진 아이템 src 가 클릭되었는지에 대한 상태 정의
    const [cardSrc, setCardSrc] = useState('');
    // 캐러셀 사진 전체 화면 모달 창 호출 이벤트 핸들러
    const handleCardClick = useCallback((value: string) => {
        setIsModal(true);
        setCardSrc(value);
    },[]);
    // 모달을 클릭하면 모달 창 비활성화 시킴
    const handleModalClick = useCallback(() => {
        setIsModal(false);
    },[]);

    // 좌우 버튼 시 캐러셀 내부 x 스크롤 이동 동작 명령 (css props - move(translate value 값) 전달)
    const handleCarouselClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        // prev 클릭 시의 동작
        // e.target 강제 타입 선언
        const target = e.target as HTMLImageElement;
        if(target.id === "leftClick"){
            setCarouselIndex((current) => {
                const newCarouselIndex = {...current};
                newCarouselIndex.index = carouselIndex.index - 1;
                newCarouselIndex.direction = "left";
                // const move 로 실제 translate value 를 계산
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
        } else { // next 클릭 시의 동작
            setCarouselIndex((current) => {
                const newCarouselIndex = {...current};
                newCarouselIndex.index = carouselIndex.index + 1;
                newCarouselIndex.direction = "right";
                // const move 로 실제 translate value 를 계산
                // gap(20px) + width(flex-basis (550px)) = 570 px
                const move = newCarouselIndex.translateValue - (570);
                // 최대 다음 클릭 제한 설정 추가
                if(Math.abs(move) > 570 * (supernatural.length - 1)){
                    newCarouselIndex.translateValue = (570 * (supernatural.length - 1)) * (-1);
                } else {
                    newCarouselIndex.translateValue = move;
                }
                // console.log("pc click " + newCarouselIndex.translateValue)
                return newCarouselIndex;
            });
        }
    },[]);

    return (
        <>
            <Modal_Overlay onClick={handleModalClick} ismodal={isModal}>
                        <Modal_Contents src={cardSrc} alt={cardSrc} />
            </Modal_Overlay>
            <Main_flex_div>
                <Main_flex_div_p ref={element => targetRef.current[0] = element}>Supernatural 🍩<br/>Photo</Main_flex_div_p>
                <Card_Carousel_left><img src="/images/left.png" alt="left" onClick={handleCarouselClick} id="leftClick"/></Card_Carousel_left>
                <Card_Carousel_right><img src="/images/right.png" alt="right" onClick={handleCarouselClick} id="rightClick"/></Card_Carousel_right>
                <Card_Carousel_div ref={element => targetRef.current[1] = element}
                        onMouseDown={handleIsMouseDown}
                        onMouseLeave={handleIsMouseLeave}
                        onMouseUp={handleIsMouseUp}
                        onMouseMove={handleIsMouseMove}
                    >
                    {supernatural.map((v: any,i: number) => {
                        return (
                            <Card_Carousel_item carouselindex={carouselIndex} ref={v => cardRef.current[i] = v} key={v.key}>
                                {/* 매개변수가 있는 이벤트 핸들러 함수 등은 익명함수로 onClick 등에 반영해야 함! (아니면 렌더링될 때마다 바로 호출해버림) */}
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


export default Body_3_element2;