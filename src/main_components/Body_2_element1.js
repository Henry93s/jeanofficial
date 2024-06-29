import React, {useRef, useEffect} from "react";
import styled from "styled-components";

const Main_flex_div = styled.div`
    width: 100%;
    height: 1000px;
    font-family: "Inter", "Noto Sans KR", sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    flex-grow: 0;
    margin-top: 600px;
    @media (max-width: 1000px) {
        height: 1700px;
        flex-direction: column;
        margin-top: 150px;
    }
`
const Flex_div_main = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    text-align: center;
    line-height: 0.5;
`
const Flex_div_main1_div1 = styled.div`
    width: 100%;
    height: 70%;
    background: url('/images/supernatural_main1.png') no-repeat;
    background-size: contain;
    background-position: center;
    opacity: 0;
    transition: opacity 3s;

    @media (max-width: 1000px) {
        height: 50%;
    }
`

const Flex_div_main1_div2 = styled.div`
    width: 100%;
    height: 30%;
    opacity: 0;
    transition: opacity 4s;
    @media (max-width: 1000px) {
        height: 50%;
        padding-top: 30%;
    }
`

const Flex_div_sub_div = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 5s;
`

const Flex_div_sub_element1 = styled.div`
    width: 100%;
    height: 65%;
    background: url('/images/card-thumb-2.jpg') no-repeat;
    background-position: center;
    box-shadow: inset 0 0 20px gray;
    border-radius: 20px;

    @media (max-width: 1000px) {
        height: 75%;
        background-size: cover;
    }
`

const Flex_div_sub_element2 = styled(Flex_div_sub_element1)`
    height: 35%;
    background: none;
    background-color: white;
    box-shadow: none;
    // row text 간격
    line-height: 1;

    @media (max-width: 1000px) {
        height: 25%;
        line-height: 0.7;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`
const Flex_div_sub_element2_a = styled.a`
   text-decoration: none;
   color: black;
`
const Flex_div_sub_element2_a_p1 = styled.p`
    color: gray;
    font-size: 28px;

    @media (max-width: 1000px) {
        font-size: 20px;
    }
`
const Flex_div_sub_element2_a_p2 = styled.p`
    font-weight: bold;
    font-size: 43px;

    @media (max-width: 1000px) {
        font-size: 22px;
    }
`
const Flex_div_sub_element2_a_p3 = styled.p`
    font-size: 33px;

    @media (max-width: 1000px) {
        font-size: 20px;
    }
`
const Flex_div_sub_element2_a_p4 = styled(Flex_div_sub_element2_a_p3)`
`

const Body_2_element1 = () => {
    // useRef [] 배열로 관리하기 !
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
            threshold: 0.25
        });
        targetRef.current.forEach(v => {
            osv.observe(v);
        })
    },[]);

    return (
        <Main_flex_div >
            <Flex_div_main>
                <Flex_div_main1_div1 ref={element => targetRef.current[0] = element} />
                <Flex_div_main1_div2 ref={element => targetRef.current[1] = element}>
                    <p style={{color: "gray", fontSize: "18px"}}>[싱글]<br/></p>
                    <p style={{fontWeight: "bold", fontSize: "43px"}}>Supernatural<br /></p>
                    <p style={{fontSize: "33px", color: "green"}}>NewJeans<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매일     2024.06.21<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>장르     J-POP<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매사     YG PLUS<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>기획사     ADOR<br/></p>
                </Flex_div_main1_div2>
            </Flex_div_main>
            <Flex_div_sub_div ref={element => targetRef.current[2] = element}>
                <Flex_div_sub_element1>
                </Flex_div_sub_element1>
                <Flex_div_sub_element2>
                    <Flex_div_sub_element2_a href="https://www.youtube.com/watch?v=ZncbtRo7RXs" target="_blank" style={{textDecoration: "none"}}>
                        <Flex_div_sub_element2_a_p1>New Album<br/></Flex_div_sub_element2_a_p1>
                        <Flex_div_sub_element2_a_p2>'Supernatural' 발매!<br /></Flex_div_sub_element2_a_p2>
                        <Flex_div_sub_element2_a_p3>My feeling's getting deeper<br/></Flex_div_sub_element2_a_p3>
                        <Flex_div_sub_element2_a_p4>'Supernatural' Music Video 보러 가기!<br/></Flex_div_sub_element2_a_p4>
                    </Flex_div_sub_element2_a>
                </Flex_div_sub_element2>
            </Flex_div_sub_div>

        </Main_flex_div>
    );
};

export default Body_2_element1;

