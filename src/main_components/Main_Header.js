import React,{useState, useCallback, useMemo, useRef, useEffect} from 'react';
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
    width: 50%;
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
    height: 96%;
`
// youtube burger
const Hamburger_youtube_div = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 2% 0 2%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    // y축 보이는 scroll 작업
    overflow-x: hidden;
    overflow-y: auto;
    // modal scroll setting : 자식 태그 스크롤 할 때, 부모 태그에다가는 스크롤 막기
    overscroll-behavior: contain;
    // 스크롤 시 하나씩 넘기기	
	scroll-snap-type: y mandatory;
    background-color: white;
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
    // 스크롤 시 하나씩 넘기기(아이템)
    scroll-snap-align: start;

    @media (max-width: 1000px) {
        font-size: 23px;
    }
`
const Hamburger_youtube_guide_img = styled.img`
    width: 50px;
    height: 50px;

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
const Hamburger_youtube_item_container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
`

const Hamburger_youtube_item = styled.div`
    // y축 scroll 작업 flex item 크기 고정 시키기
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 350px;
    // 스크롤 시 하나씩 넘기기(아이템)
    scroll-snap-align: start;

    width: 33%;
    height: 40%;
    background-color: #121219;
    border-radius: 20px;
    color: white;
    padding: 20px 10px 0 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media (max-width: 1000px) {
        height: 60%;
        flex-basis: 300px;
    }
`
const Hamburger_youtube_item_img = styled.img`
    width: 100%;
    height: 96%;
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

// hamburger 버튼 부분
const Hamburger_a = styled.a`
    width: 150px;
    height: 40px;
    // 혼자 어느정도 왼쪽에 놓기 위한 flex-grow 설정
    flex-grow: 0.5;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    cursor: default;
    background-color: transparent;
    border: none;

    @media (max-width: 1000px) {
        flex-grow: 0.2;
        width: 50px;
    }
`
const Hamburger_Button_img = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;

    @media (max-width: 1000px) {
        width: 40px;
        height: 40px;
    }
`


const Login_form = styled.form`
    // sticky header
    position: sticky;
    width: 100%;
    top: 0px;
    height: 65px;
    background-color: #121219;
    z-index: 101;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
`
const Login_email = styled.input`
    width: 300px;
    height: 40px;
    border-radius: 20px;
    font-size: 15px;
    text-align: center;
    border: none;
    // placeholder icon setting
    background-image: url('/images/id.png');
    background-repeat: no-repeat;
    background-position: left;
    background-position-x: 15px;

    @media (max-width: 1000px) {
        width: 110px;
        background-size: 20px;
        font-size: 12px;
        height: 25px;
        background-position-x: 3px;
    }
`

const Login_pw = styled(Login_email)`
    width: 200px;
    background-image: url('/images/password.png');

    @media (max-width: 1000px) {
        width: 90px;
    }
`

const Login_button = styled.button`
    width: 60px;
    height: 50px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
`
const Login_button_img = styled.img`
    width: 100%;
    height: 100%;

    @media (max-width: 1000px) {
        height: 80%;
    }
`

//
const Logined_div = styled.div`
    // sticky header
    position: sticky;
    width: 100%;
    top: 0px;
    height: 65px;
    background-color: black;
    z-index: 101;


    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

// props 로 스타일에 지속적으로 변화가 필요할 때는 styled.attrs 프로퍼티를 이용한다!
// 그렇지 않을 경우 계속 초기화되나, attrs 적용 시 props 부분만 지속적으로 업데이트가 가능해짐
/* styled.attrs 문법 참고
const Card_Carousel_item = styled.div.attrs(props => ({
    // 좌우 버튼 시 캐러셀 내부 x 스크롤 이동 동작 명령 (css props 받음 -> carouselIndex {index, direction})
    style: {
        transform: `translateX(${props.carouselindex.translateValue}px)`
    },
}))`
~ 정의
`
*/
const Home_a = styled.a.attrs(props => ({
    style: {
        backgroundColor: props.clicked === "true" ? "#0071E3" : "black"
    },
}))`
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    
    border-radius: 300px;
    transition: background-color 1s;

    &:hover {
        background-color: #0071E3;
    }

    @media (max-width: 1000px) {
        font-size: 13px;
    }
`

const Board_a = styled(Home_a)`
`

const Store_a = styled(Home_a)`
`

const Mypage_a = styled(Home_a)`
`

const Logout_a = styled(Home_a)`
`

const Home_img = styled.img`
    width: 40px;
    height: 40px;

    @media (max-width: 1000px){
        width: 25px;
        height: 25px;
    }
`
const Board_img = styled(Home_img)`
`
const Store_img = styled(Home_img)`
`
const Mypage_img = styled(Home_img)`
`
const Logout_img = styled(Home_img)`
`


const Main_Header = (props) => {
    const [user, setUser] = useState({});
    const [clickedMenu, setClickedMenu] = useState({
        Home_a: "true",
        Freeboard_a: "false",
        Store_a: "false",
        Mypage_a: "false"
    });
    // hamberger clicked state (app.js props(before using redux))
    const [clickBurger, setClickBurger] = useState("false");
    const handleHamburgerClick = useCallback(() => {
        setClickBurger(() => {
          if(clickBurger === "true"){
            return "false";
          } else {
            return "true";
          }
        });
    });

    // youtube reload data state
    const [youtube, setYoutube] = useState([]);
    useEffect(() => {
        // 훅에서 비동기 함수 사용할 때 함수 정의 후 비동기 함수 호출
        const fetch_data = async () => {
            const data = await youtubeFetch();
            setYoutube(data);
        };
        fetch_data();
    },[])

    const youtubeRef = useRef(null);
    const handleYoutubeReload = useCallback(() => {
        // 훅에서 비동기 함수 사용할 때 함수 정의 후 비동기 함수 호출
        const fetch_data = async () => {
            const data = await youtubeFetch();
            setYoutube(data);
        };
        fetch_data();

        // 3바퀴
        youtubeRef.current.style.animation = "spin 1s 3 linear";
        setTimeout(() => {
            youtubeRef.current.style.animation = "none"
        }, 3000);
    });

    const is_logined = useMemo(() => {
        if(user.email){
            return true;
        } else {
            return false;
        }
    });

    const handleMenuClick = useCallback((e) => {
        setClickedMenu((current) => {
            const newClickedMenu = {
                Home_a: "false",
                Board_a: "false",
                Store_a: "false",
                Mypage_a: "false"
            };
            const target = e.target.name + "_a";
            newClickedMenu[target] = "true";
            return newClickedMenu;
        })
    });

    return (
        <>
            <Hamburger_div clickburger={clickBurger}>
                <Hamburger_head>
                    <Hamburger_head_img src='/images/close.png' onClick={handleHamburgerClick}/>
                </Hamburger_head>
                <Hamburger_main_div>
                    <Hamburger_youtube_div>
                        <Hamburger_youtube_guide>
                            <p>New videos</p>
                            <Hamburger_youtube_guide_img src='/images/ham_youtube.png'/>
                            <Hamburger_youtube_guide_reload ref={youtubeRef} onClick={handleYoutubeReload} src='/images/reload.png'/>
                        </Hamburger_youtube_guide>
                        <Hamburger_youtube_item_container>
                            {youtube.map((v,i) => {
                                return (
                                    <Hamburger_youtube_item key={i} >
                                        <Hamburger_youtube_item_img src={v.image_url} alt={v.image_url} />
                                        <Hamburger_youtube_item_a href={v.video_url} target='_blank' title={v.title}>{v.title}</Hamburger_youtube_item_a>
                                        <Hamburger_youtube_item_p>{v.uploadTime}</Hamburger_youtube_item_p>
                                    </Hamburger_youtube_item>
                                );
                            })}
                        </Hamburger_youtube_item_container>
                    </Hamburger_youtube_div>
                </Hamburger_main_div>
            </Hamburger_div>
            {is_logined 
            && <Logined_div>
                    <Hamburger_a>
                        <Hamburger_Button_img src='/images/hamburger.png' alt='hamburger_button' onClick={handleHamburgerClick} title='최신 소식 보기'/>
                    </Hamburger_a>
                    <Home_a clicked={clickedMenu.Home_a} onClick={handleMenuClick} name="Home" title='홈'>
                        <Home_img src="/images/home.svg" name="Home"/></Home_a>
                    <Board_a clicked={clickedMenu.Board_a} onClick={handleMenuClick} name="Board" title='게시판'>
                        <Board_img src="/images/board.png" name="Board"/>
                    </Board_a>
                    <Store_a clicked={clickedMenu.Store_a} onClick={handleMenuClick} name="Store" title='한정 굿즈 판매'>
                        <Store_img src="/images/store.png"  name="Store"/>
                    </Store_a>
                    <Mypage_a clicked={clickedMenu.Mypage_a} onClick={handleMenuClick} name="Mypage" title='마이 페이지'>
                        <Mypage_img src="/images/human.png" name="Mypage"/>
                    </Mypage_a>
                    <Logout_a>
                        <Logout_img src="/images/logout.png" name="Logout" title='로그아웃'/>
                    </Logout_a>
                </Logined_div>
            ||  <Login_form>
                    <Hamburger_a>
                    <Hamburger_Button_img src='/images/hamburger.png' alt='hamburger_button' onClick={handleHamburgerClick} title='최신 소식 보기'/>
                    </Hamburger_a>
                    <Login_email placeholder="이메일" />
                    <Login_pw placeholder="패스워드" type='password' />
                    <Login_button>
                        <Login_button_img src='/images/login.png' />
                    </Login_button>
                </Login_form>
            }
        </>
    );
}

export default Main_Header;