import React,{useState, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Login_form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
`
const Login_email = styled.input`
    width: 300px;
    height: 40px;
    border-radius: 20px;
    font-family: "Gamja Flower";
    font-size: 24px;

    @media (max-width: 1000px) {
        width: 150px;
        font-size: large;
    }
`
const Login_pw = styled.input`
    width: 200px;
    height: 40px;
    border-radius: 20px;
    font-size: 24px;
    font-family: "Gamja Flower";

    @media (max-width: 1000px) {
        width: 100px;
        font-size: large;
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
`

const Freeboard_a = styled.a`
    width: 150px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: white;
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

const Store_a = styled.a`
    width: 150px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: white;
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

const Mypage_a = styled.a`
    width: 150px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: white;
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

const Logout_a = styled.a`
    width: 150px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: white;
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

//
const Main_Login = () => {
    const [user, setUser] = useState({});
 
    const is_logined = useMemo(() => {
        if(!user.email){
            return true;
        } else {
            return false;
        }
    });

    return (
        <>
            {is_logined 
            && <Logined_div>
                    <Freeboard_a>Board</Freeboard_a>
                    <Store_a>Store</Store_a>
                    <Mypage_a>My-Page</Mypage_a>
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