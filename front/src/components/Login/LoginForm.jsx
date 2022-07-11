import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import Form from 'react-bootstrap/Form';
import { Context } from "../../context/LoginStatus"

import "./Login.scss";
const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  ;
  const {setLoginStatus} = React.useContext(Context);
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    
    console.log(formData);
    API.post("users/login", formData).then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user.username);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("rol", res.data.user.rol);
      localStorage.setItem("idUser", res.data.user._id);
      localStorage.setItem("imagen", res.data.user.id_categoria.imagen);
      localStorage.setItem("herramientas", JSON.stringify(res.data.user.id_herramientas));
      localStorage.setItem("description", res.data.user.description);

      /* console.log(JSON.parse(localStorage.herramientas)) */
      setLoginStatus(res.data.token);
      navigate("/");
    });

   

    
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("username", { required: true })} />
        <Form.Text className="text-muted">
         Recuerde que tiene que ser un email Valido.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />
      </Form.Group>
      <button type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
