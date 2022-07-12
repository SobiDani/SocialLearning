import React from 'react'
import "./Portada.scss"
import image from "./engranaje1.png";
import image2 from "./engranaje2.png";
import image3 from "./fondo.png";
const Portada = () => {
  return (
    <div className='PortadaBack'>
        <img className="img1Portada rotate" src={image} alt="asd"  />
        <img className="img2Portada rotate" src={image2} alt="asd" />
        <img className="img3Portada" src={image3} alt="asd" />
    </div>
  )
}

export default Portada