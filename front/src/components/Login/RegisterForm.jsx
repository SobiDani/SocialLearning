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



/* const steps = [
  {
    label: 'Alumno - Maestro',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];
 */


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
    /* alert("holaaa"); */
    console.log(formData)
    API.post("users/register", formData).then((res) => {
      console.log(res);
      navigate("/login");
    });
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


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("rol")}
                  />

                  <Form.Check
                    name="custom-switch"
                    type="radio"
                    id="custom-switch"
                    label="Check this Maestro"
                    value="Maestro"
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Añade una descripcion que te represente:</Form.Label>
                  <Form.Control as="textarea" rows={3} {...register("description")} />
                  {/* <img style="width: 1rem;" ClassName="imgHerramientas" src={tech.ico} alt={tech.name}></img> */}
                </Form.Group>
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {indexStep === 4 ? (<Button type="submit">Registrar</Button>) : (<Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}> Continue </Button>)}
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



              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {indexStep === 4 ? (<Button type="submit">Registrar</Button>) : (<Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}> Continue </Button>)}
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
          {indexStep === 4 ? (<></>) : (<Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>Reset</Button>)}


        </Paper>
      </Box>
    </form>



  );
};

export default RegisterForm;
