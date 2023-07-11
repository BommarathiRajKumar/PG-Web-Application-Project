import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/homePage';
import Login from './components/loginPage';
import Signup from "./components/signupPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
