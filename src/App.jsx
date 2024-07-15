import React, {useCallback, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './main_components/Main';
import Notfound from './util_components/Notfound';
import Login from './sub_components/Login';
import Findpw from './sub_components/Findpw';
import PasswordChange from './sub_components/PasswordChange';
import Signup from './sub_components/Signup';
import MypagePut from './sub_components/MypagePut';
import Body_0_admin from './main_components/Body_0_admin';
import './App.css';


function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact="true" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findpw" element={<Findpw />} />
            <Route path="/pwchange" element={<PasswordChange />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/mypage' element={<MypagePut />} />
            <Route path='/admin' element={<Body_0_admin />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
