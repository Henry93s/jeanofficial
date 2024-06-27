import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
    width: 100%;
    height: 700px;
    position: relative;
    overflow: hidden;

    @media (max-width: 1000px) {
        height: 250px;
    }
`

const Video = styled.iframe`
    transform: scale(2.75, 1.85);
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    @media (max-width: 1000px) {
        border-radius: 350px;
        transform: scale(1.35, 1.5);
    }
`

const Body_1_video = () => {
    return (
        <Main>
            <Video playsInline allowFullScreen allow="autoplay;" 
            src="https://www.youtube.com/embed/ZncbtRo7RXs?autoplay=1&mute=1&playlist=ZncbtRo7RXs&rel=0&loop=1&modestbranding=1&controls=0&disablekb=1&vq=hd1080" 
            />
        </Main>
    )
}


export default Body_1_video;