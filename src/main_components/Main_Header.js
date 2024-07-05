import React,{useState, useCallback, useMemo, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-scroll';
import Main_Header_Sidebar from './Main_Header_Sidebar';
import { useNavigate } from 'react-router-dom';

//
const Container_div = styled.div`
    // sticky header
    position: sticky;
    width: 100%;
    top: 0px;
    height: 65px;
    background-color: #121219;
    border-bottom: 1px solid white;
    z-index: 101;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
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
const Home_a = styled.div.attrs(props => ({
    style: {
        animation: props.clicked === "true" ? "backgroundAni 1s ease-in-out" : "none"
    },
}))`
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    transition: background-color 1s;
    border-radius: 20px;

    @keyframes backgroundAni {
        0%{background-color: black}
        50%{background-color: #9061F9}
        100%{background-color: black}
    }

    &:hover{
        background-color: #9061F9
    }

    @media (max-width: 1000px) {
        border-radius: 10px;
        width: 50px;
        font-size: 13px;
    }
`

const Board_a = styled(Home_a)`
`

const Concert_a = styled(Home_a)`
`

const Mypage_a = styled(Home_a)`
`

const Logout_a = styled.a`
    width: 150px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;

    color: #9061F9;
    font-size: 20px;
    font-weight: bold;
    font-family: 'Noto Sans KR';

    border-radius: 20px;
    cursor: pointer;

    transition: background-color 1s;

    &:hover{
        background-color: white;
    }

    @media (max-width: 1000px) {
        border-radius: 10px;
        width: 50px;
        font-size: 13px;
    }
`

const Login_a = styled(Logout_a)`
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
const Concert_img = styled(Home_img)`
`
const Mypage_img = styled(Home_img)`
`
const Logout_img = styled(Home_img)`
`
const Login_img = styled(Home_img)`
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

const Main_Header = (props) => {
    const [user, setUser] = useState({
        logined: false,
        email: ""
    });
    const [clickedMenu, setClickedMenu] = useState({
        Home_a: "false",
        Board_a: "false",
        Concert_a: "false",
        Mypage_a: "false"
    });
    const navigate = useNavigate();

    const is_logined = useMemo(() => {
        if(user.logined){
            return true;
        } else {
            return false;
        }
    });

    // 페이지 진입 시 로그인 또는 로그아웃 되었는지 체크 effect
    // 잠시 임시로 셋팅함
    useEffect(() => {
        setUser((current) => {
            const newUser = {...current};
            newUser.logined = true;
            newUser.email = "gudrjsdn8825@naver.com";
            return newUser;
        });
    },[]);

    const handleMenuClick = useCallback((e) => {
        setClickedMenu((current) => {
            const newClickedMenu = {...current};
            const target = e.target.name + "_a";
            newClickedMenu[target] = "true";
            return newClickedMenu;
        })
        setTimeout(() => {
            setClickedMenu((current) => {
                const newClickedMenu = {...current};
                const target = e.target.name + "_a";
                newClickedMenu[target] = "false";
                return newClickedMenu;
            })
        }, 1100);
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

    const handleMypageNav = useCallback(() => {
        // 원래 로그인 되어 있는 이메일을 넘겨줘야 함
        // navigate 할 때 user email 넘겨줌(이메일 전달 위함)
        navigate('/mypage', {state: user});
    });

    const handleLogout = useCallback(() =>{
        // 원래 실제 로그아웃 요청하고 문제없을 시 진행하여야 함
        setUser((current) => {
            const newUser = {...current};
            newUser.logined = false;
            newUser.email = "";
            return newUser;
        });
    });

    return (
        <>
            <Main_Header_Sidebar clickBurger={clickBurger} handleHamburgerClick={handleHamburgerClick}/>
            <Container_div>
                    <Hamburger_a>
                        <Hamburger_Button_img src='/images/hamburger.png' alt='hamburger_button' onClick={handleHamburgerClick} title='최신 youtube 소식'/>
                    </Hamburger_a>
                    {/* div 태그에 Link 컴포넌트를 감싸서 id="" 로 스크롤 이동하기 위함 */}
                    <Link to="scroll_1" spy={true} smooth={true}>
                        <Home_a clicked={clickedMenu.Home_a} onClick={handleMenuClick} name="Home" title='홈'>
                            <Home_img src="/images/home.svg" name="Home"/>
                        </Home_a>
                    </Link>
                    <Link to="scroll_2" spy={true} smooth={true}>
                    <Concert_a clicked={clickedMenu.Concert_a} onClick={handleMenuClick} name="Concert" title='콘서트'>
                        <Concert_img src="/images/concert.png"  name="Concert"/>
                    </Concert_a>
                    </Link>
                    <Link to="scroll_3" spy={true} smooth={true}>
                        <Board_a clicked={clickedMenu.Board_a} onClick={handleMenuClick} name="Board" title='게시판'>
                            <Board_img src="/images/board.png" name="Board"/>
                        </Board_a>
                    </Link>
                    {is_logined &&
                        <>
                            <Mypage_a clicked={clickedMenu.Mypage_a} onClick={handleMypageNav} name="Mypage" title='개인 정보 수정'>
                                <Mypage_img src="/images/human.png" name="Mypage"/>
                            </Mypage_a>
                            <Logout_a onClick={handleLogout}>
                                로그아웃
                            </Logout_a>
                        </> 
                        ||
                        <>
                            <Login_a href="/login">
                                로그인
                            </Login_a>
                        </>
                    }
            </Container_div>
        </>
    );
}

export default Main_Header;