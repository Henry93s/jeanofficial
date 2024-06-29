import React, {useCallback, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './main_components/Main';
import Notfound from './supply_components/Notfound';
import './App.css';

function App() {
  // goto Main goto Main_Header STATE (before using redux, 상태 전달 연습해보기 !)
  const [clickBurger, setClickBurger] = useState("false");
  const handleHamburgerClick = useCallback(() => {
      setClickBurger(() => {
        if(clickBurger === "true"){
          // html 요소 가져와서 수정하기(모달 on 일 때 외부 스크롤 막기)
          // visible : default
          document.documentElement.style = "overflow:visible";
          document.documentElement.style = "overflow-x:hidden";
          // modal 을 나오는 작업 -> 기존 html, body 스크롤 최상단으로 이동
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
          return "false";
        } else {
          // html 요소 가져와서 수정하기(모달 on 일 때 외부 스크롤 막기)
          document.documentElement.style = "overflow:hidden";
          document.documentElement.style = "overflow-x:hidden";
          return "true";
        }
      });
  });


  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact="true" element={<Main clickBurger={clickBurger} handleHamburgerClick={handleHamburgerClick}/>} />
            <Route path="*" element={<Notfound />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
