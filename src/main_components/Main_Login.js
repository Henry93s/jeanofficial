import React,{useState, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Login_form = styled.form`
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

const Home_a = styled.a`
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    background-color: ${(props) => props.clicked === "true" ? "#0071E3" : "black"};
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

const Main_Login = () => {
    const [user, setUser] = useState({});
    const [clickedMenu, setClickedMenu] = useState({
        Home_a: "true",
        Freeboard_a: "false",
        Store_a: "false",
        Mypage_a: "false"
    });
 
    const is_logined = useMemo(() => {
        if(!user.email){
            return true;
        } else {
            return false;
        }
    });

    const handleMenuClick = (e) => {
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
    }

    return (
        <>
            {is_logined 
            && <Logined_div>
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
                    <Login_email placeholder="이메일"/>
                    <Login_pw placeholder="패스워드" type='password'/>
                    <Login_button>LOGIN</Login_button>
                </Login_form>
            }
        </>
    );
}

export default Main_Login;