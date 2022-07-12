import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Button from '@mui/material/Button';

const ButtonLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return <Button variant="outlined" color="error" onClick={logout}>Logout</Button>;
};

export default ButtonLogout;
