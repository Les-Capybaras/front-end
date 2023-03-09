import React from 'react';
import  './assets/style/main.scss';
import Layout from './layout/layout';
import Auth from './pages/auth';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/index';
import History from './pages/history/index'
import Road from './pages/road/index'

function App() {
  return (
    <>
        {/* <Layout/> */}
        <Auth/>   

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
