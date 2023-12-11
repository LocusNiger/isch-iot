/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { Boton } from "./Boton"
import { Indicador } from "./Indicador"
import { AiFillThunderbolt } from "react-icons/ai"

const Tension = ({ tension }) => {
  return (
    <>
      <div className="text-center mb-3">
        <p className="text-base 2xl:text-lg whitespace-nowrap text-blue-600 font-bold">
          Tensión EDEN [VCA]
          <AiFillThunderbolt
            className="xl:text-sm 2xl:text-xl inline shadow-lg"
            color="#ffeb33"
          />
        </p>
      </div>
      <div>
        <div className="flex justify-between 2xl:justify-around">
          <Indicador
            value={tension.vr.valor}
            title={"Fase R"}
            color={"green"}
          />
          <Indicador
            value={tension.vs.valor}
            title={"Fase S"}
            color={"green"}
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-3 gap-y-2">
          <Indicador
            value={tension.vt.valor}
            title={"Fase T"}
            color={"green"}
          />
        </div>
      </div>
    </>
  )
}

export default Tension
