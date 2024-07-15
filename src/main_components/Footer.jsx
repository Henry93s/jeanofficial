import React from "react";
import styled from "styled-components";

const Footer_container = styled.div`
    width: 100%;
    height: 130px;
    margin-top: 200px;
    border-top: 1px solid white;
    background-color: #2D2C2D;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1000px) {
        height: 80px;
    }
`

const Footer_span = styled.span`
    font-size: 22px;
    font-family: "Gamja Flower";

    @media (max-width: 1000px) {
        font-size: 15px;
    }
`

const Footer = () => {
    return (
        <Footer_container>
            <Footer_span>
                ©2024 ADOR. All Rights Reserved.
            </Footer_span>
        </Footer_container>
    )
}

export default Footer;