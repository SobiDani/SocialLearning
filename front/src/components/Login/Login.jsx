import React from "react";
import LoginForm from "./LoginForm";
/* import { Link } from "react-router-dom"; */
import "./Login.scss";

const Login = (setLoginStatus) => {
  return (
      <figure className="divForm">
      <h2>Login</h2>
      <LoginForm setLoginStatus={setLoginStatus}/>
    </figure>
    
  );
};

export default Login;
