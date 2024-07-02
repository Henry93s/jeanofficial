import React, {useRef, useEffect} from "react";
import styled from "styled-components";
import {Main_flex_div, Flex_div_main, Flex_div_main1_div1, Flex_div_main1_div2, Flex_div_sub_div,Flex_div_sub_element1,
    Flex_div_sub_element2, Flex_div_sub_element2_a, Flex_div_sub_element2_a_p1, Flex_div_sub_element2_a_p2,
    Flex_div_sub_element2_a_p3, Flex_div_sub_element2_a_p4} from './Body_album_elementStyled';

const New_Flex_div_main1_div1 = styled(Flex_div_main1_div1)`
    background: url('/images/howsweet_main2.jpeg') no-repeat;
    background-size: contain;
    background-position: center;
`

const New_Flex_div_sub_element1 = styled(Flex_div_sub_element1)`
    background: url('/images/card-thumb-3.jpeg') no-repeat;
    background-size: cover;
    background-position: center;
`

const Body_4_element3 = () => {
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
                <New_Flex_div_main1_div1 ref={element => targetRef.current[0] = element} />
                <Flex_div_main1_div2 ref={element => targetRef.current[1] = element}>
                    <p style={{color: "gray", fontSize: "18px"}}>[싱글]<br/></p>
                    <p style={{fontWeight: "bold", fontSize: "43px"}}>How Sweet<br /></p>
                    <p style={{fontSize: "33px", color: "green"}}>NewJeans<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매일     2024.05.24<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>장르     댄스<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매사     YG PLUS<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>기획사     ADOR<br/></p>
                </Flex_div_main1_div2>
            </Flex_div_main>
            <Flex_div_sub_div ref={element => targetRef.current[2] = element}>
                <New_Flex_div_sub_element1 />
                <Flex_div_sub_element2>
                    <Flex_div_sub_element2_a href="https://www.youtube.com/playlist?list=PLNy-PdPlJT7HexeauYzOFddSFueyG_HbA" target="_blank" style={{textDecoration: "none"}}>
                        <Flex_div_sub_element2_a_p1>New Video<br/></Flex_div_sub_element2_a_p1>
                        <Flex_div_sub_element2_a_p2>How Sweet, NewJeans! 🍬<br /></Flex_div_sub_element2_a_p2>
                        <Flex_div_sub_element2_a_p3>신곡과 함께 뉴진스 멤버들의 새로운 영상을<br/></Flex_div_sub_element2_a_p3>
                        <Flex_div_sub_element2_a_p4>확인하세요.<br/></Flex_div_sub_element2_a_p4>
                    </Flex_div_sub_element2_a>
                </Flex_div_sub_element2>
            </Flex_div_sub_div>

        </Main_flex_div>
    );
};

export default Body_4_element3;