import React from 'react';
import './App.css';
import Home from './Components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home}/>
    </Router>
  );
}

export default App;
