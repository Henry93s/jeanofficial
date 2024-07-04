import React, {useCallback, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './main_components/Main';
import Notfound from './util_components/Notfound';
import Login from './sub_components/Login';
import './App.css';

function App() {
  // goto Main goto Main_Header STATE (before using redux, 상태 전달 연습 완료 !)

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact="true" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
