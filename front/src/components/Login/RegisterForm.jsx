import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../services/api";
import "./Login.scss";
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Figure from 'react-bootstrap/Figure'
import { Carousel } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


//STEP
const RegisterForm = () => {
  const navigate = useNavigate();

  const [indexStep, setindexStep] = useState(1);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setindexStep(indexStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = () => {
    setindexStep(indexStep - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  };

  const handleReset = () => {
    setActiveStep(0);
  };


  //FORM
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {


    formData.id_categoria = idRolSelect;

    console.log(formData)
    const clave = Math.floor((Math.random() * (9999 - 1000 + 1)) + 100);
    console.log(clave);
    //212.230.190.232
    fetch('http://192.168.1.222/MAIL/sms.php?titulo=Social&destino=' + formData.movil + '&text=El%20codigo%20de%20activacion%20es%20' + clave, {
      method: 'POST',
      mode: "no-cors"

    }).then((response) => {

      const MySwal = withReactContent(Swal)

      MySwal.fire({
        title: '<p>Recibiras un codigo de activacion a tu numero' + formData.movil + '</p>',
        html: '<label>Codigo:</label></br><input id="codigoMovil" type="text" placeholder="Introduce el codigo"/>',
        confirmButtonText: "Aceptar",
      }).then(() => {
        if (clave == document.getElementById("codigoMovil").value) {
          MySwal.fire({
            icon: 'success',
            title: <p>Confirmado</p>,
            confirmButtonText: "Cerrar",
          })
          API.post("users/register", formData).then((res) => {
            console.log("Respuesta del registro", res);
            navigate("/login");
          });

        } else {
          MySwal.fire({
            icon: 'error',
            title: <p>error vuelva a intentarlo</p>,
            confirmButtonText: "Cerrar",
          })
        }
      })
    });

    /* http://192.168.1.222/MAIL/sms.php?titulo=Social&destino=626011959&text=esto%20es%20un%20sms%20de%20activacion,%20url%20para%20confirmar */

  };

  //GET HERRAMIENTAS
  const [tecnology, setTecnology] = useState([]);

  useEffect(() => {
    const getTecnology = async () => {
      const usersAPI = await API.get(`/herramientas`);
      console.log(usersAPI);
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

  const [rolUser, setRolUser] = useState();

  const [idRolSelect, setIdRolSelect] = useState();

  const selectorFigure = (idselect) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      icon: 'success',
      title: <p>Seleccion {rolUser}</p>,
      html: <p>Seleccion Realizada</p>,
      confirmButtonText: "Cerrar",
    })
    setIdRolSelect(idselect);

  };

  return (
    <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Typography variant="caption">Paso 1</Typography>
            </StepLabel>
            <StepContent>
              <Typography>
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
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Número Movil:</Form.Label>
                  <Form.Control type="text" placeholder="Movil" {...register("movil", { required: true })} />
                </Form.Group>
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
                  </Button>
                  <Button
                    /*  disabled={true} */
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant="caption">Paso 2</Typography>
            </StepLabel>
            <StepContent>
              <Typography>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Check
                    name="custom-radio"
                    type="radio"
                    id="custom-radio"
                    label="Check this Alumno"
                    value="Alumno"
                    onClick={() => setRolUser("Alumno")}
                    {...register("rol")}
                  />

                  <Form.Check
                    name="custom-switch"
                    type="radio"
                    id="custom-switch"
                    label="Check this Maestro"
                    value="Maestro"
                    onClick={() => setRolUser("Maestro")}
                    {...register("rol")}
                  />
                </Form.Group>
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {true === false ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    /*  disabled={true} */
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant="caption">paso 3</Typography>
            </StepLabel>
            <StepContent>
              <Typography>

                <Form.Group className="mb-3" >
                  <Carousel className="caroselProyecto" >
                    {category.filter(rol => rol.rol === rolUser).map((rol) => (
                      <Carousel.Item key={rol._id}>
                        <div className="ImagenesCategoria">
                        <Figure>
                          <Figure.Image
                            width={171}
                            height={100}
                            alt={rol.name}
                            src={rol.imagen}
                            onClick={() => selectorFigure(rol._id)}
                          />
                          <Figure.Caption>
                            {rol.description}
                          </Figure.Caption>
                        </Figure>
                        </div>
                        
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <Form.Control type="hidden" placeholder="Nombre" id="id_categoria" value={idRolSelect} {...register("id_categoria", { value: idRolSelect }, { required: true })} />
                  <Form.Label>Añade una descripcion que te represente:</Form.Label>
                  <Form.Control as="textarea" rows={3} {...register("description")} />
                  {/*  */}
                </Form.Group>
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
                  </Button>
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant="caption">paso 4</Typography>
            </StepLabel>
            <StepContent>
              <Typography>

                {tecnology.map((tech) => (
                  <Form.Group className="mb-3" key={tech._id} controlId="formBasicswitch">
                    <div className="imregister">
                      <Form.Label><img className="imgHerramientas" src={tech.ico} alt={tech.name}></img></Form.Label>
                      <Form.Check
                        type="switch"
                        id="HerramientaSwitch"
                        label={tech.name + " " + tech.description}
                        value={tech._id}
                        {...register("id_herramientas")}
                      />
                    </div>
                  </Form.Group>
                ))}



              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {indexStep === 4 ? (<></>) : (<Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}> Continue </Button>)}
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
        <Paper square elevation={0} sx={{ p: 3 }}>
          {indexStep === 4 ? (<Button type="submit">Registrar</Button>) : (<></>)}


        </Paper>
      </Box>
    </form>



  );
};

export default RegisterForm;
