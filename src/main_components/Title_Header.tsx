import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
    // 주요 element component PC 가운데 정렬 + 너비 80%( / 100vw )
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-family: "Lilita One", sans-serif;
    font-size: 200px;
    font-weight: 700;
    margin-top: -200px;

    gap: 5px;
    margin-bottom: 10px;


    @media (max-width: 1000px) {
        background-position-y: 0px;
        font-size: 60px;
        margin-top: -80px;
        gap: 1px;
    }
`
const N_color = styled.p`
    color: #4F419C;
`
const E_color = styled.p`
    color: #BF489B;
`
const W_color = styled.p`
    color: #FF4F9C;
`
const J_color = styled.p`
    color: #FF552D;
`
const E2_color = styled.p`
    color: #FF912D;
`
const A_color = styled.p`
    color: #FFC826;
`
const N2_color = styled.p`
    color: #FFF400;
`
const S_color = styled.p`
    color: #98D045;
`

const Title_Header = () => {
    return (
        <>
            <Main>
                <N_color>N</N_color>
                <E_color>E</E_color>
                <W_color>W</W_color>
                <J_color>J</J_color>
                <E2_color>E</E2_color>
                <A_color>A</A_color>
                <N2_color>N</N2_color>
                <S_color>S</S_color>
            </Main>
        </>
    );
};

export default Title_Header;