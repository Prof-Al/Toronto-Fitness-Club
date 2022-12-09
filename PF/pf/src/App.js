import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Components/Main/Main';
import Studios from './Components/Studios/Studio_All';
import Studio from './Components/Studios/Studio_Detail';
import Maps from './Components/Globalcomponents/Maps';
import "@progress/kendo-theme-default/dist/all.css";
import PickDateOfClass from  './Components/Classes/Canlendar'
import RegisterPage from './Components/Accounts/Register';
import LoginPage from './Components/Accounts/Login';
import ProfilePage from './Components/Accounts/Profile';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/Studios" element={<Studios />} />
        <Route path="/Studio/:studio_id" element={<Studio />} />
        <Route path="/Maps" element={<Maps />} />

        <Route path="/Date/:studio_id" element={<PickDateOfClass/>} />

        <Route path="/Signup" element={<RegisterPage/>} />
        <Route path="/Login" element={<LoginPage/>} />
        <Route path="/Profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}

export default App;