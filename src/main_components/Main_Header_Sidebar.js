import React,{useState, useCallback, useRef, useEffect} from 'react';
import styled from 'styled-components';
import youtubeFetch from '../datas/Header_sideBar_youtube';

// hamberger NEW youtube & twitter (1 x 10 grid x 2 라인)
const Hamburger_div = styled.div.attrs(props => ({
    style: {
        transform: props.clickburger === "true" ? "translateX(0%)" : "translateX(-100%)"
        }
}))`
    position: fixed;
    top: 0;
    width: 70%;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.5s ease-in-out;
    font-family: "Gamja Flower";
    // maximum
    z-index: 102;

    @media (max-width: 1000px) {
        width: 100%;
    }
`
// hamburger 내용물 부분
const Hamburger_head = styled.div`
    width: 100%;
    height: 65px;
    background-color: #121219;
    display: flex;
    justify-content: right;
    align-items: center;
`
const Hamburger_head_img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    cursor: pointer;
`
const Hamburger_main_div = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 95%;
`
// youtube burger
const Hamburger_youtube_div = styled.div`
    width: 48%;
    height: 100%;
    padding: 0 2% 0 2%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    // y축 보이는 scroll 작업
    overflow-x: hidden;
    overflow-y: auto;
    // modal scroll setting : 자식 태그 스크롤 할 때, 부모 태그에다가는 스크롤 막기
    overscroll-behavior: contain;
    background-color: white;

    @media (max-width: 1000px) {
        height: 98%;
    }
`
const Hamburger_youtube_guide = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border-bottom: 2px solid black;
    font-weight: bold;
    color: black;
    font-size: 33px;

    @media (max-width: 1000px) {
        font-size: 23px;
    }
`
const Hamburger_youtube_guide_img = styled.img`
    width: 48px;
    height: 48px;

    @media (max-width: 1000px) {
        width: 40px;
        height: 40px;
    }
`
const Hamburger_youtube_guide_reload = styled(Hamburger_youtube_guide_img)`
    cursor: pointer;

    /* 회전 애니메이션 */
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

    @media (max-width: 1000px) {
        width: 30px;
        height: 30px;
    }
`

const Hamburger_youtube_item = styled.div`
    // y축 scroll 작업 flex item 크기 고정 시키기
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 350px;

    width: 95%;
    height: 70%;
    background-color: #121219;
    border-radius: 20px;
    color: white;
    padding: 20px 10px 0 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media (max-width: 1000px) {
        flex-basis: 270px;
    }
`
const Hamburger_youtube_item_img = styled.img`
    width: 100%;
    height: 100%;
`
const Hamburger_youtube_item_a = styled.a`
    font-size: 20px;
    text-underline-offset: 5px;
    text-decoration: underline;
    color: white;
    @media (max-width: 1000px) {
        font-size: 17px;
    }
`
const Hamburger_youtube_item_p = styled.p`
    font-size: 18px;
    @media (max-width: 1000px) {
        font-size: 15px;
    }
`
const Hamburger_youtube_div2 = styled(Hamburger_youtube_div)`
`
const Hamburger_youtube_item2 = styled(Hamburger_youtube_item)`
`
const Hamburger_youtube_item_img2 = styled(Hamburger_youtube_item_img)`
`
const Hamburger_youtube_item_a2 = styled(Hamburger_youtube_item_a)`
`
const Hamburger_youtube_item_p2 = styled(Hamburger_youtube_item_p)`
`

const Main_Header_Sidebar = (props) => {
    const {clickBurger, handleHamburgerClick} = props;
    

    // youtube reload data state
    const [youtube, setYoutube] = useState([]);
    const [shorts, setShorts] = useState([]);
    useEffect(() => {
        // 훅에서 비동기 함수 사용할 때 함수 정의 후 비동기 함수 호출
        const fetch_data = async () => {
            const data = await youtubeFetch();
            setYoutube(data.youtube_data);
            setShorts(data.shorts_data);
        };
        fetch_data();
    },[])
    console.log(youtube);
    console.log(shorts);

    const youtubeRef = useRef([]);
    const handleYoutubeReload = useCallback(() => {
        // 훅에서 비동기 함수 사용할 때 함수 정의 후 비동기 함수 호출
        const fetch_data = async () => {
            const data = await youtubeFetch();
            setYoutube(data.youtube_data);
        };
        fetch_data();

        // 3바퀴
        youtubeRef.current[0].style.animation = "spin 1s 3 linear";
        setTimeout(() => {
            youtubeRef.current[0].style.animation = "none"
        }, 3000);
    });
    const handleShortsReload = useCallback(() => {
        // 훅에서 비동기 함수 사용할 때 함수 정의 후 비동기 함수 호출
        const fetch_data = async () => {
            const data = await youtubeFetch();
            setShorts(data.shorts_data);
        };
        fetch_data();

        // 3바퀴
        youtubeRef.current[1].style.animation = "spin 1s 3 linear";
        setTimeout(() => {
            youtubeRef.current[1].style.animation = "none"
        }, 3000);
    })

    return (
        <Hamburger_div clickburger={clickBurger}>
                <Hamburger_head>
                    <Hamburger_head_img src='/images/close.png' onClick={handleHamburgerClick}/>
                </Hamburger_head>
                <Hamburger_main_div>
                    <Hamburger_youtube_div>
                        <Hamburger_youtube_guide>
                            <p>New videos</p>
                            <Hamburger_youtube_guide_img src='/images/ham_youtube.png'/>
                            <Hamburger_youtube_guide_reload ref={element => youtubeRef.current[0] = element} onClick={handleYoutubeReload} src='/images/reload.png'/>
                        </Hamburger_youtube_guide>
                        
                            {youtube.map((v,i) => {
                                return (
                                    <Hamburger_youtube_item key={i} >
                                        <Hamburger_youtube_item_img src={v.image_url} alt={v.image_url} />
                                        <Hamburger_youtube_item_a href={v.video_url} target='_blank' title={v.title}>{v.title}</Hamburger_youtube_item_a>
                                        <Hamburger_youtube_item_p>{v.uploadTime}</Hamburger_youtube_item_p>
                                    </Hamburger_youtube_item>
                                );
                            })}
                    </Hamburger_youtube_div>
                    <Hamburger_youtube_div2>
                        <Hamburger_youtube_guide>
                            <p>New shorts</p>
                            <Hamburger_youtube_guide_img src='/images/shorts.png'/>
                            <Hamburger_youtube_guide_reload ref={element => youtubeRef.current[1] = element}onClick={handleShortsReload} src='/images/reload.png'/>
                        </Hamburger_youtube_guide>
                            {shorts.map((v,i) => {
                                return (
                                    <Hamburger_youtube_item2 key={i} >
                                        <Hamburger_youtube_item_img2 src={v.image_url} alt={v.image_url} />
                                        <Hamburger_youtube_item_a2 href={v.video_url} target='_blank' title={v.title}>{v.title}</Hamburger_youtube_item_a2>
                                        <Hamburger_youtube_item_p2>{v.uploadTime}</Hamburger_youtube_item_p2>
                                    </Hamburger_youtube_item2>
                                );
                            })}
                    </Hamburger_youtube_div2>
                </Hamburger_main_div>
            </Hamburger_div>
    );
}

export default Main_Header_Sidebar;