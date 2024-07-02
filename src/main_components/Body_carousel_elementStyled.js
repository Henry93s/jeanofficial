import styled from "styled-components";

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
    padding-left: 20px;
    font-size: 48px;
    font-weight: 600;
    opacity: 0;
    transition: opacity 3s;
    text-shadow: 2px 2px 2px gray;

    @media (max-width: 1000px) {
        font-size: 40px;
    }
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
    // oneline
    flex-wrap: nowrap;
    // 스크롤 시 하나씩 넘기기	
	scroll-snap-type: x mandatory;
    opacity: 0;
    transition: opacity 3s;
    // 하단 swipe 드래그 공간을 위한 relative
    position: relative;
    /* 끝에서 바운스 되도록 */
    -webkit-overflow-scrolling: touch;

    @media (max-width: 1000px) {
        height: 500px;
        overflow-x: auto;
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
    right: 20px;
    cursor: pointer;
    background-color: gray;
    opacity: 0.65;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s;
    transform: translate(0px, 600px);
    z-index: 2;

    &:hover {
        opacity: 0.85;
    }

    @media (max-width: 1000px) {
        // 모바일 캐러셀에는 x 축 드래그 기본 동작 사용이 가능하므로 좌우 버튼 제거 처리
        display: none;
    }
`

const Card_Carousel_left = styled(Card_Carousel_right)`
    left: 20px;
`

// 하단 swipe 드래그 공간
const Carousel_Swipe_Guide = styled.div`
    // 하단 swipe 드래그 공간을 위한 absolute - Card_Carousel_div(relative 설정)
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;

    @media (max-width: 1000px) {
        display: none;
    }
`
const Carousel_Swipe_Guide_img = styled.img`
    width: 50px;
    height: 50px;
`
const Carousel_Swipe_Guide_p = styled.p`
    font-size: bold;
`

// 모달 오버레이
const Modal_Overlay = styled.div.attrs(props => ({
    style: {
        display: props.ismodal === "true" ? "block" : "none"
    }
}))`
    position: fixed;
    background-image: url('/images/modal_overlay.png');
    top: 65px;
    width: 100%;
    height: 100%;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: flex-end;

    animation: opacityAni 0.5s;

    @keyframes opacityAni {
        from{opacity: 0};
        to{opacity: 1};
    }
`
// 모달 컨텐츠
const Modal_Contents = styled.img`
    position: fixed;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    width: 900px;
    height: 95%;
    z-index: 101;
    scrollbar-width: none;
    @media (max-width: 1000px) {
        width: 100%;
        top: 55%;
        height: 85%;
        max-width: 900px;
    }
`

export {Main_flex_div, Main_flex_div_p, Card_Carousel_div, Card_Carousel_item, Card_Carousel_item_img,
    Card_Carousel_right, Card_Carousel_left, Carousel_Swipe_Guide, Carousel_Swipe_Guide_img, Carousel_Swipe_Guide_p,
    Modal_Overlay, Modal_Contents
};