import React from 'react';
import  './assets/style/main.scss';
import Layout from './layout/layout';
import Auth from './pages/auth';
import AppContext from "./context";

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
      {currentUser
        ? (
          <AppContext.Provider value={{ currentUser, setCurrentUser }}>
            <Layout />
            <Routes>  
              <Route>
                <Route path="/dashboard" element={<Dashboard />} exact />
                <Route path="/history" element={<History />} />
                <Route path="/road" element={<Road />} />
              </Route>
            </Routes>
          </AppContext.Provider>
        ) : (
          <Routes>  
            <Route>
              <Route path="/auth" element={<Auth/>} exact />
            </Route>
          </Routes>
        )
      } 
    </>
  )
}
export default App;
