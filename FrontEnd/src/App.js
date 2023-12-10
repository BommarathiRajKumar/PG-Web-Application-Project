import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/homePage';
import Login from './components/loginPage';
import Signup from "./components/signupPage"
import Profile from './components/profilePage';
import ForgotPassword from './components/forgotPasswordPage';
import ServerError from './components/serverErrorPage';
import ConnectionRefuse from './components/connectionRefusePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/profile" Component={Profile} />
        <Route path="/forgotPassword" Component={ForgotPassword} />
        <Route path="/serverError" Component={ServerError}/>
        <Route path="/connectionRefuse" Component={ConnectionRefuse}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
