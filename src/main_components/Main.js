import React from 'react';
import Title_Header from './Title_Header';
import Main_Header from './Main_Header';
import Body_1_video from './Body_1_video';
import Body_2_element1 from './Body_2_element1';
import Body_3_element2 from './Body_3_element2';
import Body_4_element3 from './Body_4_element3';
import Body_5_element4 from './Body_5_element4';
import Body_6_map from './Body_6_map';

const Main = (props) => {

    return (
        // Link to : home header 버튼
        <div id="scroll_1">
            <Main_Header />
            <Title_Header />
            <Body_1_video />
            <Body_2_element1 />
            <Body_3_element2 />
            <Body_4_element3 />
            <Body_5_element4 />
            <Body_6_map />
        </div>
    );
}

export default Main;