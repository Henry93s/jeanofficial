/* eslint-disable react/jsx-pascal-case */
import React,{useState, useCallback, useRef, useEffect} from 'react';
import styled from 'styled-components';
import youtubeFetch from '../datas/Header_sideBar_youtube';

// Hamburger_div 의 props 타입 정의
interface Hamburger_div_Props {
    clickBurger: boolean;
};

// hamberger NEW youtube & 숏츠 (1 x n flex 가 2 라인)
const Hamburger_div = styled.div.attrs<Hamburger_div_Props>(props => ({
    // 햄버거 버튼이 클릭 되었을 때는 translateX 를 0% 로 설정하여 슬라이드바 내용이 보이도록 함
    // (추가) 또는 return 시 컴포넌트에 state 값을 이용해 inline style 로도 변경시킬 수 있다.
    style: {
        transform: props.clickBurger ? "translateX(0%)" : "translateX(-100%)"
        }
}))`
    position: fixed;
    top: 0;
    width: 70%;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.5s ease-in-out;
    font-family: "Gamja Flower";
    // 슬라이드바 내용의 우선순위를 높임
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
    // 자식 태그 스크롤 할 때, 부모 태그의 스크롤 동작을 막기
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
/* 외부 링크는 a 태그 사용하여야 함 */
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

// Main_Header_Sidebar 의 props 타입 정의
interface Main_Header_Sidebar_Props {
    clickBurger: boolean;
    handleHamburgerClick: () => void;
};

const Main_Header_Sidebar = (props: Main_Header_Sidebar_Props) => {
    // Main_header 에서 clickBurger 상태를 props 로 받음
    // 이후 x 버튼을 클릭하면 클릭 이벤트에 따라 clickBurger 의 상태가 false 로 되며 사이드바가 비활성화됨
    const {clickBurger, handleHamburgerClick} = props;

    // youtube, shorts 의 타입 정의 VideoData[]
    interface VideoData {
        title: string;
        image_url: string;
        video_url: string;
        uploadTime: string;
    };

    // 유튜브 api fetch 한 데이터 상태 정의
    const [youtube, setYoutube] = useState<VideoData[]>([]);
    // 숏츠(유튜브 api fetch 에서 params 만 변경됨) 데이터 상태 정의
    const [shorts, setShorts] = useState<VideoData[]>([]);
    useEffect(() => {
        // 훅에서 비동기 함수 사용할 때 함수 정의 후 비동기 함수 호출 가능
        // (추가) 또는 추가적인 비동기 함수 호출이 없을 경우 promise -> then 형태로 구성도 가능함 !
        // youtubeFetch 외부 함수를 불러와서 호출하고 데이터 적용
        const fetch_data = async () => {
            const data = await youtubeFetch();
            setYoutube(data.youtube_data);
            setShorts(data.shorts_data);
        };
        fetch_data();
    },[])
    console.log(youtube);
    console.log(shorts);

    // 리로드 이미지를 회전 시키기 위한 ref 설정
    const youtubeRef = useRef<HTMLImageElement []| null []>([]);
    // 유튜브 리로드 버튼을 클릭했을 때 유튜브 상태 업데이트를 위한 이벤트 함수
    const handleYoutubeReload = useCallback(() => {
        const fetch_data = async () => {
            const data = await youtubeFetch();
            setYoutube(data.youtube_data);
        };
        fetch_data();
        // youtubeRef.current[0] 강제 타입 선언
        const target = youtubeRef.current[0] as HTMLElement;
        // 3바퀴
        target.style.animation = "spin 1s 3 linear";
        setTimeout(() => {
            target.style.animation = "none"
        }, 3000);
    },[]);
    // 숏츠 리로드 버튼을 클릭했을 때 숏츠 상태 업데이트를 위한 이벤트 함수
    const handleShortsReload = useCallback(() => {
        const fetch_data = async () => {
            const data = await youtubeFetch();
            setShorts(data.shorts_data);
        };
        fetch_data();

        // youtubeRef.current[1] 강제 타입 선언
        const target = youtubeRef.current[1] as HTMLElement;
        // 3바퀴
        target.style.animation = "spin 1s 3 linear";
        setTimeout(() => {
            target.style.animation = "none"
        }, 3000);
    },[])

    return (
        <Hamburger_div clickBurger={clickBurger}>
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
                                        {/* 외부 링크는 a 태그 사용하여야 함 */}
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
                            <Hamburger_youtube_guide_reload ref={element => youtubeRef.current[1] = element} onClick={handleShortsReload} src='/images/reload.png'/>
                        </Hamburger_youtube_guide>
                            {shorts.map((v,i) => {
                                return (
                                    <Hamburger_youtube_item2 key={i} >
                                        <Hamburger_youtube_item_img2 src={v.image_url} alt={v.image_url} />
                                        {/* 외부 링크는 a 태그 사용하여야 함 */}
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