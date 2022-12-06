import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Components/Main/Main';
import "@progress/kendo-theme-default/dist/all.css";
import PickDateOfClass  from  './Components/Classes/Canlendar'

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Main/>} />  
      </Routes>
    </Router>
  );
}

export default App;