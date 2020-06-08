import React from 'react';
import './App.css';
import Home from './Components/Home';
import NewProjectForm from './Components/NewProjectForm';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home}/>
      <Route exact path='/projects/new' component={NewProjectForm}/>
    </Router>
  );
}

export default App;
