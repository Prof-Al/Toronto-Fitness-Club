import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Components/Main/Main';
import "@progress/kendo-theme-default/dist/all.css";
import Classes  from  './Components/Classes/index'

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Main/>} />  
        <Route path="/Classes" element={<Classes/>} />  
      </Routes>
    </Router>
  );
}

export default App;