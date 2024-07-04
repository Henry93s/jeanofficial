import React,{useState, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {Link} from 'react-scroll';
import Main_Header_Sidebar from './Main_Header_Sidebar';

const Login_form = styled.form`
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
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 1s;
    border-radius: 20px;

    @keyframes backgroundAni {
        0%{background-color: black}
        50%{background-color: #0071E3}
        100%{background-color: black}
    }

    &:hover{
        background-color: #0071E3
    }

    @media (max-width: 1000px) {
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
const Concert_img = styled(Home_img)`
`
const Mypage_img = styled(Home_img)`
`
const Logout_img = styled(Home_img)`
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
    const [user, setUser] = useState({});
    const [clickedMenu, setClickedMenu] = useState({
        Home_a: "false",
        Board_a: "false",
        Concert_a: "false",
        Mypage_a: "false"
    });

    const is_logined = useMemo(() => {
        if(!user.email){
            return true;
        } else {
            return false;
        }
    });

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

    return (
        <>
            <Main_Header_Sidebar clickBurger={clickBurger} handleHamburgerClick={handleHamburgerClick}/>
            {is_logined 
            && <Logined_div>
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
                    <Concert_a clicked={clickedMenu.Concert_a} onClick={handleMenuClick} name="Concert" title='한정 굿즈 판매'>
                        <Concert_img src="/images/concert.png"  name="Concert"/>
                    </Concert_a>
                    </Link>
                    <Link to="scroll_3" spy={true} smooth={true}>
                        <Board_a clicked={clickedMenu.Board_a} onClick={handleMenuClick} name="Board" title='게시판'>
                            <Board_img src="/images/board.png" name="Board"/>
                        </Board_a>
                    </Link>
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