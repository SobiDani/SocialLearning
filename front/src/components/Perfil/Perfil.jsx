import React from 'react'
import LogedAprendiz from '../../pages/LogedAprendiz/LogedAprendiz'
import LogedMentor from '../../pages/LogedMentor/LogedMenot'

const Perfil = () => {
  return (
    <div>
      <h1>Perfil</h1>
      {localStorage.getItem("rol") === "Maestro"  ? (<LogedMentor />) : (<LogedAprendiz />)}
    </div>
  )
}

export default Perfil