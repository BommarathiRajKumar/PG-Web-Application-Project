import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WellCome from './components/wellComePage';
import Home from './components/homePage';
import Login from './components/loginPage';
import Signup from "./components/signupPage"
import Profile from './components/profilePage';
import ForgotPassword from './components/forgotPasswordPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wellCome" Component={WellCome} />
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/profile" Component={Profile} />
        <Route path="/forgotPassword" Component={ForgotPassword} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
