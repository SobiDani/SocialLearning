import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import { Context } from "../../context/LoginStatus";
import Form from 'react-bootstrap/Form';
import "./Login.scss";
const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { setLoginStatus } = useContext(Context);

  const navigate = useNavigate();

  const onSubmit = (formData) => {
    

    API.post("users/login", formData).then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user.username);

      setLoginStatus(true);
      navigate("/");
    });

    /* fetch('http://localhost:8700/users/login', {
            method: 'POST',
            body: formData,

        }).then((response) => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user.username);
    
          setLoginStatus(true);
          navigate("/");
          })
 */

    
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
