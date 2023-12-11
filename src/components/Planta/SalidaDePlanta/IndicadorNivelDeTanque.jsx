/* eslint-disable no-unused-vars */
import { getValor } from "../FalconYSavio/FalconYSavio"
import { useState, useEffect } from "react"
import { Indicador } from "../Captacion/Indicador"
import "./styles.css"
import { useSelector } from "react-redux"

const IndicadorNivelDeTanque = () => {
  const nivelDeTanque = useSelector((state) => state.aguas.planta.niveles[1])
  const { descripcion, nivelAbs, nivelRel } = nivelDeTanque

  return (
    <div className="w-full flex gap-x-4 h-full">
      <div className="w-full flex flex-col text-center gap-y-1">
        {descripcion && (
          <span className="text-sm 2xl:text-base text-muted">
            {descripcion}
          </span>
        )}
        <div className="w-full h-full flex flex-col">
          <div className="h-4 bg-tank rounded-sm" />
          <div className="h-full mx-1.5 pl-2 bg-tank shadow-tank">
            <div
              className="bg-white w-8 h-full rounded-sm"
              style={{ transform: "rotate(180deg)" }}
            >
              <div
                className="bg-primary transition-all"
                style={{ height: `${nivelAbs.valor}%` }}
              />
            </div>
          </div>
          <div className="h-4 bg-tank rounded-sm" />
        </div>
        <div className="flex justify-around items-center gap-x-2 text-sm">
          {nivelRel && (
            <span className="2xl:text-xl whitespace-nowrap">
              {getValor(nivelRel)}
            </span>
          )}
          {nivelAbs && (
            <span className="2xl:text-xl whitespace-nowrap">
              {getValor(nivelAbs)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-around">
        <Indicador value={"A"} color="gray" className={`px-2`} />
        <Indicador value={"B"} color={"blue"} />
      </div>
    </div>
  )
}

export default IndicadorNivelDeTanque
