import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Form from 'react-bootstrap/Form'

import { useForm } from "react-hook-form";
import { API } from "../../services/api";

import './LogedMenot.scss';

const LogedMenot = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {

    
    
    console.log(formData)
    API.post("users/register", formData).then((res) => {
      console.log(res);
    });
  };

  const [tecnology, setTecnology] = useState([]);

  const [herraientasLogin, setHerraientasLogin] = useState(JSON.parse(localStorage.getItem("herramientas")));

  useEffect(() => {
    const getTecnology = async () => {
      const usersAPI = await API.get(`/herramientas`);
      const HerramientasLoginValues = [];
      for (const herramienta of usersAPI.data.Herramientas) {
        for (const herraientaLogin of herraientasLogin) {
          console.log(herramienta._id, herraientaLogin._id);
          if(herramienta._id === herraientaLogin._id){
            console.log(true);
            herramienta.hability = "1"
          }else{
            herramienta.hability = "0"
          }
        } 
      }
      console.log(usersAPI.data.Herramientas);
      setTecnology(usersAPI.data.Herramientas);

    };
    getTecnology();
  }, []);

  const [category, setCategory] = useState([]);

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
          <Col className="container_Row_Col"><p>{localStorage.getItem("name")}</p></Col>
          <Col className="container_Row_Col"><p>Maestro</p></Col>
          <Col className="container_Row_Col"><img className="container_Row_Col_imgPerfil" src={localStorage.getItem("imagen")} alt="imagen"></img></Col>
        </Row>
        <Row className="container_Row">
          <Col className="container_Row_Col">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" {...register("username", { required: true })} />
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
              <Form.Control type="text" placeholder="Nombre" {...register("name", { required: true })} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="container_Row">
          {tecnology.map((tech) => (
                  <Form.Group className="mb-3" key={tech._id} controlId="formBasicswitch">
                    <Form.Check
                      type="switch"
                      id="HerramientaSwitch"
                      label={tech.name + " " + tech.description}
                      value={tech._id}
                      {...register("id_herramientas")}
                    />
                    {/* <img style="width: 1rem;" ClassName="imgHerramientas" src={tech.ico} alt={tech.name}></img> */}
                  </Form.Group>
                ))}
        </Row>
      </Container>
    </form>
  )
}

export default LogedMenot