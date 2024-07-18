import React,{useState, useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Main_Header_Sidebar from './Main_Header_Sidebar';
// Link 는 react-router-dom 에서 사용하고 있으므로, react-scroll 로도 Link 를 사용하기 위해서 별칭 as 사용 !
import {Link as ScrollLink} from 'react-scroll';
import { useNavigate, Link } from 'react-router-dom';
// redux 에서 user 상태를 가져오기 위한 useSelector
import { useSelector, useDispatch } from 'react-redux';
import { logout, setAll } from '../redux/UserSlice';
import axiosCustom from '../util_components/axiosCustom';
import Alert from '../util_components/Alert';
import { State } from '../redux/Store';

// 헤더는 마우스 스크롤이 내려도 계속 상단에 유지시키기 위해 position sticky, top:0px 을 설정함.
// z-index 는 높은 수치로 설정하나, 펼쳐질 수 있는 사이드바 z-index 보다는 작게 설정함. 
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

// props 로 스타일에 지속적으로 변화가 필요할 때는 styled.attrs 프로퍼티를 이용할 수 있다.
// attrs 적용 시 props 부분만 지속적으로 업데이트가 가능해짐
// (추가) 또는 return 시 컴포넌트에 state 값을 이용해 inline style 로도 변경시킬 수 있다.

/* (추가) styled.attrs 문법 예시
const Card_Carousel_item = styled.div.attrs(props => ({
    - 좌우 버튼 시 캐러셀 내부 x 스크롤 이동 동작 명령 (css props 받음 -> carouselIndex {index, direction})
    style: {
        transform: `translateX(${props.carouselindex.translateValue}px)`
    },
}))`
~ 에서 나머지 css 작성
`
*/

// Home_div 의 props 타입 정의
interface Home_div_Props {
    clicked: string
};

const Home_div = styled.div.attrs<Home_div_Props>(props => ({
    // 상단 아이콘에서 클릭된 아이콘은 backgroundAni 가 동작하여 버튼 아이콘 배경색이 변화되었다고 돌아오는 효과
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

const Logout_link = styled.div`
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

const Login_link = styled(Link)`
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
const Hamburger_link = styled.div`
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

const Main_Header = () => {
    // build 시 서버 루트 디렉토리 build 폴더에도 복사되므로 서버에서 동작 체크하기(모바일도 같이 확인하기 위함)
    // 메인 페이지 진입 시 유저 로그인 상태 확인 및 로그인 상태 반영을 위해 리덕스 user 전역 상태를 가져옴
    const user = useSelector((state: State) => state.user);
    // 리덕스 리듀서에 액션 객체를 보낼 dispatch 선언
    const dispatch = useDispatch();
    // 알림 컴포넌트에 직접 접근하기 위한 ref 정의
    const alertOpenRef = useRef<{ handleOpenAlert: (title: string, message: string) => void }>(null);
    console.log(user)
    // 로그인 상태 값 정의(true or false 일 경우 상단 header 의 아이콘 정렬이 다름)
    const [isLogined, setIsLogined] = useState(false);
    // 상단 아이콘 버튼들(div) 중 어떤 버튼을 클릭했는지에 대한 상태 정의
    const [clickedMenu, setClickedMenu] = useState({
        Home_div: "false",
        Board_div: "false",
        Concert_div: "false",
        Mypage_div: "false"
    });
    // 이벤트 함수에서 페이지 이동 시 사용하기 위한 navigate 변수 선언
    const navigate = useNavigate();

    // 로그인 후(navigate 되었을 때) 리렌더링 시 서버 검증 후 리덕스 유저 상태에 데이터 저장
    useEffect(() => {
        /* (추가) 세션 스토리지 와 로컬 스토리지 차이
            - 세션 스토리지는 브라우저 세션 동안만 데이터를 저장하여, 브라우저 탭이나 창을 닫으면 자동 삭제됨 
            - 로컬 스토리지는 기본적으로 브라우저 세션과 상관없이 데이터가 유지됨 
            => 상태 state 는 새로고침이나 직접 url 접근 시 초기화되므로, 새로고침 / 직접 url 접근 시 데이터를 
            유지하려면 세션 또는 로컬 스토리지를 이용할 수 있다.
        */

        // 서버에서 로그인된 유저 정보를 가져와서 클라이언트 리덕스 상태에 저장함
        const getuser = async () => {
            axiosCustom.get('/users/getuser')
            .then(res => {
                // 서버 검증을 통해 로그인된 유저가 있을 때 클라이언트 리덕스 유저 상태에 데이터를 저장함
                if(res.data && res.data.code === 200){
                    console.log("로그인 검증")
                    dispatch(setAll({email: res.data.data.email, nickName: res.data.data.name}));
                    setIsLogined(true);
                } else {
                    setIsLogined(false);
                }
            })
        };
        // 해당 페이지에서는 새로고침이나 직접 url 접근 시 데이터를 초기화하지 않아야 하므로
        // 유저 정보를 불러와 저장시켜야 한다.
        getuser();
    }, []);

    const handleLogout = useCallback(() =>{
        // 서버 로그아웃 요청 (post 요청으로 직접 url 입력 시 -> not found page)
        axiosCustom.post('/users/logout')
        .then(res => {
            // alertOpenRef.current 가 null 이면 handleOpenAlert 호출하지 않음
            alertOpenRef.current?.handleOpenAlert("로그아웃 알림", res.data.message);
            if(res.data && res.data.code === 200){
                dispatch(logout());
                setIsLogined(false);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
            return;
        })
    },[]);

    // 상단 아이콘 버튼(div) 클릭 시 발생하는 이벤트 함수 정의
    const handleMenuClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        // 클릭된 아이콘 버튼(div)은 백그라운드 색이 바뀌는 애니매이션 효과가 발생하도록 함
        setClickedMenu((current) => {
            const newClickedMenu = {...current};
            // e.target 강제 타입 선언
            const etarget = e.target as HTMLDivElement;
            const target = etarget.id + "_div";
            newClickedMenu[target] = "true";
            return newClickedMenu;
        })
        // 클릭된 아이콘 버튼(div)이 일정 시간 흐르고 나서 다시 원상태로 돌아오도록 함
        setTimeout(() => {
            setClickedMenu((current) => {
                const newClickedMenu = {...current};
                // e.target 강제 타입 선언
                const etarget = e.target as HTMLDivElement;
                const target = etarget.id + "_div";
                newClickedMenu[target] = "false";
                return newClickedMenu;
            })
        }, 1100);
    },[]);

    // 햄버거 버튼 클릭 상태 정의
    const [clickBurger, setClickBurger] = useState<boolean>(false);
    // 햄버거 버튼을 클릭했을 때 상태를 true 로 변경 후 사이드바 컴포넌트에 전달 예정
    // 사이드바 컴포넌트에서 x 버튼을 클릭 시 상태가 false 로 변경되어 사이드바가 비활성화됨
    const handleHamburgerClick = () => {
        setClickBurger(!clickBurger);
    };

    // 마이페이지 버튼(div)을 클릭했을 때 이벤트 함수 정의
    const handleMypageNav = useCallback(() => {
        // 로그인 되어 있는 이메일을 넘겨줘야 함
        // navigate 할 때 user 리덕스 전역 상태에서 email, nickname 값 전달
        navigate('/mypage', {state: {email: user.email, nickName: user.nickName} });
    },[]);

    return (        
        <>
            <Alert ref={alertOpenRef} />
            <Main_Header_Sidebar clickBurger={clickBurger} handleHamburgerClick={handleHamburgerClick}/>
            <Container_div>
                    <Hamburger_link>
                        <Hamburger_Button_img src='/images/hamburger.png' alt='hamburger_button' onClick={handleHamburgerClick} title='최신 youtube 소식'/>
                    </Hamburger_link>
                    {/* ScrollLink : div 태그에 Link(router-scroll) 컴포넌트를 감싸서,
                        감싸진 컴포넌트 중 element id="" 가 to="" 과 같은 위치로 스크롤을 이동하기 위함
                        (추가) Link(scroll) 사용 시 a, Link(Route) 와 중첩되면 안돼서 div 로 함! */}
                    <ScrollLink to="scroll_1" spy={true} smooth={true}>
                        <Home_div clicked={clickedMenu.Home_div} onClick={handleMenuClick} id="Home" title='홈'>
                            <Home_img src="/images/home.svg" id="Home"/>
                        </Home_div>
                    </ScrollLink>
                    <ScrollLink to="scroll_2" spy={true} smooth={true}>
                    <Concert_div clicked={clickedMenu.Concert_div} onClick={handleMenuClick} id="Concert" title='콘서트'>
                        <Concert_img src="/images/concert.png"  id="Concert"/>
                    </Concert_div>
                    </ScrollLink>
                    <ScrollLink to="scroll_3" spy={true} smooth={true}>
                        <Board_div clicked={clickedMenu.Board_div} onClick={handleMenuClick} id="Board" title='게시판'>
                            <Board_img src="/images/board.png" id="Board"/>
                        </Board_div>
                    </ScrollLink>
                    {isLogined &&
                        <>
                            <Mypage_div clicked={clickedMenu.Mypage_div} onClick={handleMypageNav} id="Mypage" title='개인 정보 수정'>
                                <Mypage_img src="/images/human.png" id="Mypage"/>
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