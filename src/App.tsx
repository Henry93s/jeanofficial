import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './main_components/Main';
import Notfound from './util_components/Notfound';
import Login from './sub_components/Login';
import Findpw from './sub_components/Findpw';
import PasswordChange from './sub_components/PasswordChange';
import Signup from './sub_components/Signup';
import MypagePut from './sub_components/MypagePut';
import Body_0_admin from './main_components/Body_0_admin';


const App: React.FC = () => {
  return (
    // App.jsx 에서는 각 컴포넌트 별로 라우터를 지정하여 BrowserRouter 로 감쌈(front 에서 라우팅 진행)
    <div className="App">
        <BrowserRouter>
          <Switch>
            {/* types 에서 v5 router 이므로 
              Routes -> Switch
              exact="true" -> exact path~, 
              element={<componame />} -> component={componame} 으로 수정 */}
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/findpw" component={Findpw} />
            <Route path="/pwchange" component={PasswordChange} />
            <Route path='/signup' component={Signup} />
            <Route path='/mypage' component={MypagePut} />
            <Route path='/admin' component={Body_0_admin} />
            <Route path="*" component={Notfound} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
