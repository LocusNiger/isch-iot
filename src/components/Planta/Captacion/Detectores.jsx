import React from "react"
import { BsFillCircleFill } from "react-icons/bs"

const Detectores = ({
  avisoIncendio,
  detectHidrocarburo,
  fallaDeSistemaElectrico,
  preAvisoIncendio,
}) => {
  return (
    <div className="w-full text-sm flex flex-col gap-y-3 2xl:text-base ">
      <span className="text-base text-primary font-bold 2xl:text-lg text-center">
        Detectores
      </span>
      <div className="flex justify-between items-center">
        <div className="2xl:w-24 text-muted">
          <p>Detector de hidrocarburo</p>
        </div>
        <div className="w-5 h-5 2xl:w-8 2xl:h-8">
          {detectHidrocarburo === true ? (
            <BsFillCircleFill className="w-full h-full text-red-indicator" />
          ) : detectHidrocarburo === false ? (
            <BsFillCircleFill className="w-full h-full text-gray-500" />
          ) : (
            <BsFillCircleFill className="w-full h-full text-yellow-1" />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="2xl:w-24 text-muted">
          <span>Pre aviso de Incendio</span>
        </div>
        <div className="w-5 h-5 2xl:w-8 2xl:h-8">
          {preAvisoIncendio === true ? (
            <BsFillCircleFill className="w-full h-full text-red-indicator" />
          ) : preAvisoIncendio === false ? (
            <BsFillCircleFill className="w-full h-full text-gray-500" />
          ) : (
            <BsFillCircleFill className="w-full h-full text-yellow-1" />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className=" 2xl:w-24 text-muted">
          <span>Aviso de Incendio</span>
        </div>
        <div className="w-5 h-5 2xl:w-8 2xl:h-8">
          {avisoIncendio === true ? (
            <BsFillCircleFill className="w-full h-full text-red-indicator" />
          ) : avisoIncendio === false ? (
            <BsFillCircleFill className="w-full h-full text-gray-500" />
          ) : (
            <BsFillCircleFill className="w-full h-full text-yellow-1" />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="2xl:w-24 text-muted">
          <span className="w-full">Falla en sistema eléctrico</span>
        </div>
        <div className="w-5 h-5 2xl:w-8 2xl:h-8">
          {fallaDeSistemaElectrico === true ? (
            <BsFillCircleFill className="w-full h-full text-red-indicator" />
          ) : fallaDeSistemaElectrico === false ? (
            <BsFillCircleFill className="w-full h-full text-gray-500" />
          ) : (
            <BsFillCircleFill className="w-full h-full text-yellow-1" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Detectores
