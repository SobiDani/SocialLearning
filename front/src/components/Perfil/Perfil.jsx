import React from 'react'
import LogedAprendiz from '../../pages/LogedAprendiz/LogedAprendiz'
import LogedMentor from '../../pages/LogedMentor/LogedMenot'
import './Perfil.scss';

const Perfil = () => {
  return (
    <div className="PerfilUser">
      {localStorage.getItem("rol") === "Maestro"  ? (<LogedMentor />) : (<LogedAprendiz />)}
    </div>
  )
}

export default Perfil