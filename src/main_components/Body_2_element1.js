import React, {useRef, useEffect} from "react";
import styled from "styled-components";

const Main_flex_div = styled.div`
    width: 100%;
    height: 1000px;
    font-family: "Noto Sans KR", sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
    user-select: none;
    text-align: center;
    flex-grow: 0;
    border-bottom: 1px solid white;
    border-top: 1px solid white;

    @media (max-width: 1000px) {
        height: 2000px;
        flex-direction: column;
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
    gap: 20px;
`
const Flex_div_main1_div1 = styled.div`
    width: 100%;
    height: 70%;
    background: url('/images/supernatural_main1.png') no-repeat;
    background-size: contain;
    background-position: center;
    opacity: 0;
    transition: all 2s;

    @media (max-width: 1000px) {
        height: 50%;
    }
`

const Flex_div_main1_div2 = styled.div`
    width: 100%;
    height: 30%;
    opacity: 0;
    transition: all 3s;
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
    gap: 20px;
`

const Flex_div_sub_element1 = styled.div`
    width: 100%;
    height: 50%;
    opacity: 0;
    transition: all 3s;
`

const Flex_div_sub_element2 = styled(Flex_div_sub_element1)`
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
            threshold: 0.5
        });
        targetRef.current.forEach(v => {
            osv.observe(v);
        })
    },[]);

    return (
        <Main_flex_div >
            <Flex_div_main >
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
            <Flex_div_sub_div>
                <Flex_div_sub_element1 ref={element => targetRef.current[2] = element}>
                <p style={{color: "gray", fontSize: "18px"}}>[싱글]<br/></p>
                    <p style={{fontWeight: "bold", fontSize: "43px"}}>Supernatural<br /></p>
                    <p style={{fontSize: "33px", color: "green"}}>NewJeans<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매일     2024.06.21<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>장르     J-POP<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매사     YG PLUS<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>기획사     ADOR<br/></p>
                </Flex_div_sub_element1>
                <Flex_div_sub_element2 ref={element => targetRef.current[3] = element}>
                <p style={{color: "gray", fontSize: "18px"}}>[싱글]<br/></p>
                    <p style={{fontWeight: "bold", fontSize: "43px"}}>Supernatural<br /></p>
                    <p style={{fontSize: "33px", color: "green"}}>NewJeans<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매일     2024.06.21<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>장르     J-POP<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매사     YG PLUS<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>기획사     ADOR<br/></p>
                </Flex_div_sub_element2>
            </Flex_div_sub_div>

        </Main_flex_div>
    );
};

export default Body_2_element1;

