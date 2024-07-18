import React from 'react';
import styled from 'styled-components';

// video div
const Main = styled.div`
    width: 100%;
    height: 750px;
    position: relative;
    overflow: hidden;
    margin-top: -200px;
    @media (max-width: 1000px) {
        margin-top: -70px;
        height: 330px;
    }
`

// supernatural video(youtube embed query)
const Video = styled.iframe`
    top: 10%;
    // 동영상 iframe 의 크기를 확대시킴
    transform: scale(2.75, 1.85);
    width: 100%;
    height: 100%;
    // 동영상 iframe 의 마우스 이벤트 제거
    pointer-events: none;
    // absolute 일 때 position 이 relative or fixed or sticky or absolute 인 가까운 부모 기준
    // 으로 위치 가 설정되며, 기준에 맞는 부모가 없을 때는 viewport 기분으로 위치가 지정됨
    position: absolute;
    @media (max-width: 1000px) {
        top: -3.5%;
        border-radius: 350px;
        transform: scale(1.35, 1.5);
        pointer-events: all;
    }
`

// x, insta, facebook icon
const Icon_div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 400px;
    height: 100px;
    gap: 50px;
    margin-top: 5rem;

    @media (max-width: 1000px) {
        margin-top: 3rem;
    }
`
{/* 외부 링크는 a 태그 사용하여야 함
    (추가) 내부 react-route 링크의 경우 Link(router-dom) or Route path 컴포넌트 사용
    */}
const Icon_youtube = styled.a`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1000px) {
        width: 30px;
        height: 30px;
    }
`
const Icon_x = styled(Icon_youtube)`
`
const Icon_insta = styled(Icon_youtube)`
`
const Icon_facebook = styled(Icon_youtube)`
`

const Body_1_video = () => {
    return (
        <>
            <Main>
                <Video allowFullScreen allow="autoplay;" 
                src="https://www.youtube.com/embed/ZncbtRo7RXs?autoplay=1&mute=1&playlist=ZncbtRo7RXs&rel=0&loop=1&modestbranding=1&controls=0&disablekb=1&vq=hd1440"> 
                </Video>
            </Main>
            <Icon_div>
                <Icon_x href='https://twitter.com/NewJeans_ADOR' target='_blank'><img src="/images/x.png" alt="x" style={{width: "100%", height: "100%"}}/></Icon_x>
                <Icon_insta href='https://www.instagram.com/newjeans_official/' target='_blank'><img src="/images/insta.png" alt="insta" style={{width: "100%", height: "100%"}}/></Icon_insta>
                <Icon_facebook href='https://www.facebook.com/official.newjeans' target='_blank'><img src="/images/facebook.png" alt="facebook" style={{width: "100%", height: "100%"}}/></Icon_facebook>
            </Icon_div>
        </>

    )
}


export default Body_1_video;