  import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Components/Main/Main';
import "@progress/kendo-theme-default/dist/all.css";
import Classes  from  './Components/Classes/index'
import RegisterPage from './Components/Accounts/Register';
import LoginPage from './Components/Accounts/Login';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Main/>} />  
        <Route path="/Classes" element={<Classes/>} />  
        <Route path="/Signup" element={<RegisterPage/>} />
        <Route path="/Login" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;