import React,{useState, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Login_form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 1px solid white;
    margin-bottom: 20px;
    position: relative;
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
        background-color: black;
        color: white;
    }
`

//
const Logined_div = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
`

const Home_a = styled.a`
    width: 150px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: ${(props) => props.clicked === "true" ? "black" : "white"};
    background-color: ${(props) => props.clicked === "true" ? "white" : "black"};
    border-radius: 300px;
    transition: background-color 1s;

    &:hover {
        background-color: white;
        color: black;
    }

    @media (max-width: 1000px) {
        font-size: 20px;
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
            const target = e.target.text + "_a";
            newClickedMenu[target] = "true";
            return newClickedMenu;
        })
    }

    return (
        <>
            {is_logined 
            && <Logined_div>
                    <Home_a clicked={clickedMenu.Home_a} onClick={handleMenuClick}>Home</Home_a>
                    <Board_a clicked={clickedMenu.Board_a} onClick={handleMenuClick}>Board</Board_a>
                    <Store_a clicked={clickedMenu.Store_a} onClick={handleMenuClick}>Store</Store_a>
                    <Mypage_a clicked={clickedMenu.Mypage_a} onClick={handleMenuClick}>Mypage</Mypage_a>
                    <Logout_a>Logout</Logout_a>
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