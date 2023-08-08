import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/homePage';
import Login from './components/loginPage';
import Signup from "./components/signupPage"
import Profile from './components/profilePage';
import Test from './components/test';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/profile" Component={Profile} />

        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
