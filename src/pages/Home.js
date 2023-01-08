import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import NavBar from "../component/NavBar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Content from "../component/Content";
import Login from "../component/Login";
import Register from "../component/Register";
import { useState } from "react";



function Home() {
    const [loginForm, setLoginForm] = useState(false);
    const [registerForm, setRegisterForm] = useState(false);
    return (
        <>
      <NavBar
        setLoginForm={setLoginForm}
        setRegisterForm={setRegisterForm}
      />
      <Login
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        setRegisterForm={setRegisterForm}
      />
      <Register
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        setLoginForm={setLoginForm}
  
      />
        <Header />
        <Content />
      <Footer />
    </>
  )
}

export default Home
