import React from 'react';
import Title_Header from './Title_Header';
import Main_Header from './Main_Header';
import Body_1_video from './Body_1_video';
import Body_2_element1 from './Body_2_element1';
import Body_3_element2 from './Body_3_element2';

const Main = (props) => {

    return (
        <>
            <Title_Header />
            <Main_Header />
            <Body_1_video />
            <Body_2_element1 />
            <Body_3_element2 />
        </>
    );
}

export default Main;