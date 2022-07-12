import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { API } from "../../services/api";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import SendIcon from '@mui/icons-material/Send';
import ButtonLogout from '../../components/Login/ButtonLogout'


import './LogedAprendiz.scss';

const LogedAprendiz = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {



    console.log(formData)
    API.patch("users/" + localStorage.getItem("idUser"), formData).then((res) => {
      console.log(res);
      localStorage.setItem("user", formData.username);
      localStorage.setItem("name", formData.name);
      //localStorage.setItem("herramientas", JSON.stringify(formData.id_herramientas));
      localStorage.setItem("description", formData.description);
      localStorage.setItem("imagen", formData.img);
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        icon: 'success',
        title: <p>Cambios Realizados</p>,
        html: <p>Los cambios se realizaron correctamente sobre tu cuenta</p>,
        confirmButtonText: "Cerrar",
      })
    });
  };

  const [tecnology, setTecnology] = useState([]);

  const [herraientasLogin/* , setHerraientasLogin */] = useState(JSON.parse(localStorage.getItem("herramientas")));

  useEffect(() => {
    const getTecnology = async () => {
      const usersAPI = await API.get(`/herramientas`);

      for (const herraientaLogin of herraientasLogin) {
        for (const herramienta of usersAPI.data.Herramientas) {
          if (herramienta._id === herraientaLogin._id) {
            /* console.log(herramienta._id + "---" + herraientaLogin._id);
            console.log(true); */
            herramienta.hability = true
          } else {
            /* console.log(false); */
          }
        }
      }

      console.log(usersAPI.data.Herramientas);
      setTecnology(usersAPI.data.Herramientas);

    };
    getTecnology();
  }, []);

  const [/* category */, setCategory] = useState([]);

  useEffect(() => {
    const getCategoria = async () => {
      const categoriaAPI = await API.get(`/categorias`);
      console.log(categoriaAPI);
      setCategory(categoriaAPI.data.Categorias);

    };
    getCategoria();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container fluid="md" className="container">
        <Row className="container_Row">
          <Col className="container_Row_Col"><h1>{localStorage.getItem("name")}</h1></Col>
          <Col className="container_Row_Col"></Col>
          <Col className="container_Row_Col"><p>Alumno</p></Col>
        </Row>
        <Row className="container_Row">
          <Col xs={8} md={8} className="container_Row_Col">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripcion:</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("description", { value: localStorage.getItem("description") })} />
            </Form.Group>
          </Col>
          <Col><img className="container_Row_Col_imgPerfil" src={localStorage.getItem("imagen")} alt="imagen"></img></Col>
        </Row>
        <Row className="container_Row">
          <Col className="container_Row_Col">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" {...register("username", { value: localStorage.getItem("username") }, { required: true })} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="container_Row">
          <Col className="container_Row_Col">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="container_Row">
          <Col className="container_Row_Col">
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control type="text" placeholder="Nombre"  {...register("name", { value: localStorage.getItem("name") }, { required: true })} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="container_Row">
          <Col className="container_Row_Col">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Imagen:</Form.Label>
              <Form.Control type="text" placeholder="Enter Image" {...register("img", { value: localStorage.getItem("imagen") }, { required: true })} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="container_Row">
          {tecnology.map((tech) => (
            <Form.Group className="mb-3" key={tech._id} controlId="formBasicswitch">
              <Form.Check
                isValid={tech.hability}
                type="switch"
                label={tech.name + " " + tech.description}
                value={tech._id}
                {...register("id_herramientas")}
              />
              {/* <img style="width: 1rem;" ClassName="imgHerramientas" src={tech.ico} alt={tech.name}></img> */}
            </Form.Group>
          ))}
        </Row>
        <Row className="container_Row">
          <Col className="container_Row_Col boton">
            <Button size="large" variant="contained" endIcon={<SendIcon />} type="submit">Guardar</Button>
            <ButtonLogout>Log out</ButtonLogout>
          </Col>
        </Row>
      </Container>
    </form>
  )
}

export default LogedAprendiz