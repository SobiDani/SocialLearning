import React from "react";
import { useForm } from "react-hook-form";
import { API } from "../../services/api";
import "./Login.scss";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Form'
const RegisterForm = () => {
  //Estas dos funcionalidades vienen por defecto en useForm
  //register no es que registre en la base de datos si no que recoge la informacion de un formulario y la podemos implementar en cualquier funcionalidad del back
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    alert("holaaa");
    console.log(formData)
    API.post("users/register", formData).then((res) => {
      console.log(res);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("username", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control type="text" placeholder="Nombre" {...register("name", { required: true })} />
      </Form.Group>
      <button type="submit">
        Register
      </button>
    </form>


  );
};

export default RegisterForm;
