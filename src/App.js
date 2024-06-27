import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './main_components/Main';
import Notfound from './supply_components/Notfound';
import './App.css';

function App() {


  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact="true" element={<Main />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
