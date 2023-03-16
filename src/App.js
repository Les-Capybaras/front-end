import React from 'react';
import  './assets/style/main.scss';
import Layout from './layout/layout';
import Auth from './pages/auth';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/index';
import History from './pages/history/index'
import Road from './pages/road/index'

import AuthService from './services/auth.service';
import { useEffect, useState } from 'react';
import EventBus from './common/EventBus';


function App() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <>
      {!currentUser
      ? <Layout currentUser={currentUser} />  
      : <Auth/>
      } 

      <Routes>
        <Route>
          <Route path="/" element={<Dashboard />} exact />
          <Route path="/history" element={<History />} />
          <Route path="/road" element={<Road />} />
        </Route>
      </Routes>
    </>
    
  )
}
export default App;
