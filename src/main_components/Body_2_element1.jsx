import React, {useRef, useEffect} from "react";
import styled from "styled-components";
import {Main_flex_div, Flex_div_main, Flex_div_main1_div1, Flex_div_main1_div2, Flex_div_sub_div,Flex_div_sub_element1,
    Flex_div_sub_element2, Flex_div_sub_element2_a, Flex_div_sub_element2_a_p1, Flex_div_sub_element2_a_p2,
    Flex_div_sub_element2_a_p3, Flex_div_sub_element2_a_p4} from './Body_album_elementStyled';
// album_style 과 carousel style 은 앱에서 두 번씩 똑같이 사용되므로 외부 컴포넌트 스타일을 불러와서 적용함

const New_Flex_div_main1_div1 = styled(Flex_div_main1_div1)`
    background: url('/images/supernatural_main1.png') no-repeat;
    background-size: contain;
    background-position: center;
`

const New_Flex_div_sub_element1 = styled(Flex_div_sub_element1)`
    background: url('/images/card-thumb-2.jpg') no-repeat;
    background-size: cover;
    background-position: center;
`

const Body_2_element1 = () => {
    // IntersectionObserver 를 생성하여 targetRef 가 관찰될 때(.isIntersecting) 투명도를 n 초동안 높이기 위함
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
                    <p style={{fontWeight: "bold", fontSize: "43px"}}>Supernatural<br /></p>
                    <p style={{fontSize: "33px", color: "green"}}>NewJeans<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매일     2024.06.21<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>장르     J-POP<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>발매사     YG PLUS<br/></p>
                    <p style={{color: "gray", fontSize: "15px"}}>기획사     ADOR<br/></p>
                </Flex_div_main1_div2>
            </Flex_div_main>
            <Flex_div_sub_div ref={element => targetRef.current[2] = element}>
                <New_Flex_div_sub_element1 />
                <Flex_div_sub_element2>
                    {/* 외부 링크는 a 태그 사용하여야 함 */}
                    <Flex_div_sub_element2_a href="https://www.youtube.com/watch?v=ZncbtRo7RXs" target="_blank" style={{textDecoration: "none"}}>
                        <Flex_div_sub_element2_a_p1>New Album<br/></Flex_div_sub_element2_a_p1>
                        <Flex_div_sub_element2_a_p2>'Supernatural' 발매! 🐰<br /></Flex_div_sub_element2_a_p2>
                        <Flex_div_sub_element2_a_p3>My feeling's getting deeper<br/></Flex_div_sub_element2_a_p3>
                        <Flex_div_sub_element2_a_p4>'Supernatural' Music Video 보러 가기!<br/></Flex_div_sub_element2_a_p4>
                    </Flex_div_sub_element2_a>
                </Flex_div_sub_element2>
            </Flex_div_sub_div>
        </Main_flex_div>
    );
};

export default Body_2_element1;

