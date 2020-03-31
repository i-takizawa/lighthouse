import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppNavbar from './components/AppNavbar';
import ImagesList from './components/ImagesList';
import Dashboard from './components/Dashboard';
import NameForm from './components/NameForm';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Route path="/" exact component={Dashboard} />
        <Route path="/images" exact component={ImagesList} />
        <Route path="/login" exact component={NameForm} />
      </div>
    </Router>
  );
}