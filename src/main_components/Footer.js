import React from "react";
import styled from "styled-components";

const Footer_container = styled.div`
    width: 100%;
    height: 250px;
    margin-top: 200px;
    border-top: 1px solid white;
    background-color: #2D2C2D;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Footer_span = styled.span`
    font-size: 24px;
    font-family: "Gamja Flower";
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