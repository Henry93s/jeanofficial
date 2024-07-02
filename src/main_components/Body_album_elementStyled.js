import styled from "styled-components";

const Main_flex_div = styled.div`
    // 주요 element component PC 가운데 정렬 + 너비 70%( / 100vw )
    width: 70%;
    margin: 0 auto;

    height: 1000px;
    font-family: "Inter", "Noto Sans KR", sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-grow: 0;
    margin-top: 600px;
    @media (max-width: 1000px) {
        // 주요 element component mobile은 100% 유지
        width: 100%;
        height: 1700px;
        flex-direction: column;
        margin-top: 150px;
    }
`
const Flex_div_main = styled.div`
    width: 48%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    text-align: center;
    line-height: 0.5;

    @media (max-width: 1000px) {
        // 주요 element component mobile은 100% 유지
        width: 100%;
    }
`
const Flex_div_main1_div1 = styled.div`
    width: 100%;
    height: 70%;
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
    width: 48%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 5s;

    @media (max-width: 1000px) {
        // 주요 element component mobile은 100% 유지
        width: 100%;
    }
`

const Flex_div_sub_element1 = styled.div`
    width: 100%;
    height: 65%;
    box-shadow: inset 0 0 20px gray;
    border-radius: 20px;

    @media (max-width: 1000px) {
        height: 75%;
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
    text-shadow: 3px 2px 2px gray;

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

export {Main_flex_div, Flex_div_main, Flex_div_main1_div1, Flex_div_main1_div2, Flex_div_sub_div,Flex_div_sub_element1,
    Flex_div_sub_element2, Flex_div_sub_element2_a, Flex_div_sub_element2_a_p1, Flex_div_sub_element2_a_p2,
    Flex_div_sub_element2_a_p3, Flex_div_sub_element2_a_p4}