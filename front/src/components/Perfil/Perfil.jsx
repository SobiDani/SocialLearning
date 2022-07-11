import React from 'react'
import LogedAprendiz from '../../pages/LogedAprendiz/LogedAprendiz'
import LogedMentor from '../../pages/LogedMentor/LogedMenot'

const Perfil = () => {
  return (
    <div>
      {localStorage.getItem("rol") === "Maestro"  ? (<LogedMentor />) : (<LogedAprendiz />)}
    </div>
  )
}

export default Perfil