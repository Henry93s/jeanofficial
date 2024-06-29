import React,{useState, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import axios from 'axios';


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
    background-color: black;
    display: flex;
    justify-content: right;
    align-items: center;
`
const Hamburger_head_p = styled.p`
    font-size: 48px;
    margin-right: 10px;
    cursor: pointer;
`
const Hamburger_main_div = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`
// youtube burger
const Hamburger_youtube_div = styled.div`
    width: 50%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: red;
    // 자식 태그 스크롤할 때 부모 태그 스크롤 막기
    overscroll-behavior: contain;
`
// twitter(x) burger
const Hamburger_x_div = styled(Hamburger_youtube_div)`
    background-color: blue;
`

// hamburger 버튼 부분
const Hamburger_a = styled.a`
    width: 150px;
    height: 40px;
    // 혼자 어느정도 왼쪽에 놓기 위한 flex-grow 설정
    flex-grow: 0.5;
    
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: default;
    background-color: transparent;
    border: none;
`
const Hamburger_Button_img = styled.img`
    cursor: pointer;
`


const Login_form = styled.form`
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
const Login_email = styled.input`
    width: 300px;
    height: 40px;
    border-radius: 20px;
    font-family: "Gamja Flower";
    font-size: 24px;
    text-align: center;

    @media (max-width: 1000px) {
        width: 150px;
        font-size: large;
    }
`
const Login_pw = styled(Login_email)`
    width: 200px;

    @media (max-width: 1000px) {
        width: 100px;
    }
`
const Login_button = styled.button`
    width: 200px;
    height: 40px;
    border-radius: 20px;
    font-size: large;
    font-weight: bold;
    cursor: pointer;
    background-color: white;
    color: black;
    transition: background-color 1s;

    &:hover {
        background-color: #0071E3;
        color: white;
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


//

const Main_Header = () => {
    const [user, setUser] = useState({});
    const [clickedMenu, setClickedMenu] = useState({
        Home_a: "true",
        Freeboard_a: "false",
        Store_a: "false",
        Mypage_a: "false"
    });
    // hamberger clicked state
    const [clickBurger, setClickBurger] = useState("false");
 
    const is_logined = useMemo(() => {
        if(!user.email){
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

    // hamberger control handler
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
            <Hamburger_div clickburger={clickBurger}>
                <Hamburger_head>
                    <Hamburger_head_p onClick={handleHamburgerClick}>X</Hamburger_head_p>
                </Hamburger_head>
                <Hamburger_main_div>
                    <Hamburger_youtube_div></Hamburger_youtube_div>
                    <Hamburger_x_div></Hamburger_x_div>
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
                    <Login_email placeholder="이메일"/>
                    <Login_pw placeholder="패스워드" type='password'/>
                    <Login_button>LOGIN</Login_button>
                </Login_form>
            }
        </>
    );
}

export default Main_Header;