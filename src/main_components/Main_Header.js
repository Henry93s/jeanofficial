import React,{useState, useCallback, useMemo, useEffect} from 'react';
import styled from 'styled-components';
import Main_Header_Sidebar from './Main_Header_Sidebar';
// scrollLink 로도 Link 를 사용하기 위해서 별칭 as 사용 !
import {Link as ScrollLink} from 'react-scroll';
import { useNavigate, Link } from 'react-router-dom';
// redux 에서 user 상태를 가져오기 위한 useSelector
import { useSelector, useDispatch } from 'react-redux';
import { setNickName, setToken, logout, setEmail } from '../redux/UserSlice';
import axiosCustom from '../util_components/axiosCustom';

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
const Home_div = styled.div.attrs(props => ({
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

const Board_div = styled(Home_div)`
`

const Concert_div = styled(Home_div)`
`

const Mypage_div = styled(Home_div)`
`

const Logout_link = styled(Link)`
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

const Login_link = styled(Logout_link)`
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

// hamburger 버튼 부분
const Hamburger_link = styled(Link)`
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
    // build 후 서버에서 체크하기 !
    // 페이지 진입 시 로그인 또는 로그아웃 되었는지 체크함(user)
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    console.log(user)
    const [isLogined, setIsLogined] = useState(false);
    // 로그인 후(navigate 되었을 때) 리렌더링 시 서버에서 보내진 토큰(쿠키 안)에 값이 있을 때, 
    // 로그인되었으므로 토큰을 저장하고, 현재 로그인된 email, nickName 을 찾아서 저장함.
    // 이후에도 user 정보가 변화할 때(개인정보수정-닉네임) 다시 email, nickName 을 찾아서 저장함.
    useEffect(() => {
        const token = document.cookie.split("=")[1];
        if(token && token.length > 0){
            // token 을 저장하고, 현재 로그인된 email, nickName 을 찾아서 저장함.
            dispatch(setToken({token: token}));
            const getuser = async () => {
                const res = await axiosCustom.get('/getuser');
                // console.log("getuser res.data.email ", res.data.email);
                dispatch(setEmail({email: res.data.email}));
            }
            getuser();
            const getNickName = async () => {
                const res = await axiosCustom.post('/users/email', {email: user.email});
                // console.log("getNickName res.data.data.name ", res.data.data.name);
                dispatch(setNickName({nickName: res.data.data.name}));
            }
            getNickName();
            setIsLogined(true);
        }
    }, [user]);

    const handleLogout = useCallback(() =>{
        // 원래 실제 로그아웃 요청하고 문제없을 시 진행하여야 함
        const token = document.cookie.split("=")[1];
        if(token && token.length > 0){
            axiosCustom.get('/logout')
            .then(res => {
                dispatch(logout());
                setIsLogined(false);
            })
        }
    });
    //


    const [clickedMenu, setClickedMenu] = useState({
        Home_div: "false",
        Board_div: "false",
        Concert_div: "false",
        Mypage_div: "false"
    });
    const navigate = useNavigate();

    const handleMenuClick = useCallback((e) => {
        setClickedMenu((current) => {
            const newClickedMenu = {...current};
            const target = e.target.name + "_div";
            newClickedMenu[target] = "true";
            return newClickedMenu;
        })
        setTimeout(() => {
            setClickedMenu((current) => {
                const newClickedMenu = {...current};
                const target = e.target.name + "_div";
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
        navigate('/mypage', {state: {email: user.email} });
    });

    return (
        <>
            <Main_Header_Sidebar clickBurger={clickBurger} handleHamburgerClick={handleHamburgerClick}/>
            <Container_div>
                    <Hamburger_link>
                        <Hamburger_Button_img src='/images/hamburger.png' alt='hamburger_button' onClick={handleHamburgerClick} title='최신 youtube 소식'/>
                    </Hamburger_link>
                    {/* div 태그에 Link 컴포넌트를 감싸서 id="" 로 스크롤 이동하기 위함, Link(scroll) 사용 시 Link(Route) 와 중첩되면 안돼서 div 로 함! */}
                    <ScrollLink to="scroll_1" spy={true} smooth={true}>
                        <Home_div clicked={clickedMenu.Home_div} onClick={handleMenuClick} name="Home" title='홈'>
                            <Home_img src="/images/home.svg" name="Home"/>
                        </Home_div>
                    </ScrollLink>
                    <ScrollLink to="scroll_2" spy={true} smooth={true}>
                    <Concert_div clicked={clickedMenu.Concert_div} onClick={handleMenuClick} name="Concert" title='콘서트'>
                        <Concert_img src="/images/concert.png"  name="Concert"/>
                    </Concert_div>
                    </ScrollLink>
                    <ScrollLink to="scroll_3" spy={true} smooth={true}>
                        <Board_div clicked={clickedMenu.Board_div} onClick={handleMenuClick} name="Board" title='게시판'>
                            <Board_img src="/images/board.png" name="Board"/>
                        </Board_div>
                    </ScrollLink>
                    {isLogined &&
                        <>
                            <Mypage_div clicked={clickedMenu.Mypage_div} onClick={handleMypageNav} name="Mypage" title='개인 정보 수정'>
                                <Mypage_img src="/images/human.png" name="Mypage"/>
                            </Mypage_div>
                            <Logout_link onClick={handleLogout}>
                                로그아웃
                            </Logout_link>
                        </> 
                        ||
                        <>
                            <Login_link to="/login">
                                로그인
                            </Login_link>
                        </>
                    }
            </Container_div>
        </>
    );
}

export default Main_Header;