import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ReduxContainer from './redux/ReduxContainer';
import reportWebVitals from './reportWebVitals';

// 첫 앱 실행 시 App.jsx 컴포넌트 대신 ReduxContainer(redux - Provider) 를 불러오고,
// 리덕스 컨테이너 컴포넌트에서 App.jsx 컴포넌트를 감싸서 리턴처리함.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxContainer />
  </React.StrictMode>
);

reportWebVitals();
