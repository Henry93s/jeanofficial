import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    font-size: 20px;
    text-align: center;
    color: #9061F9;
`

const Notfound = () => {
    return (
        <div>
            <Title>404 Not Found : 페이지를 찾을 수 없습니다.</Title>
        </div>
    )
}

export default Notfound;