import React from "react";
import styled from "styled-components";

const Main_flex_div = styled.div`
    width: 100%;
    height: 2000px;
    margin-top: 100px;
    font-family: "Noto Sans KR", sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border: 1px solid white;
    user-select: none;
    opacity: 1;
    transition: all 3s;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`

const Body_3_element2 = () => {
    return (
        <Main_flex_div />

    )
}



export default Body_3_element2;