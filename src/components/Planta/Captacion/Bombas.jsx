/* eslint-disable no-unused-vars */
import { ColorBomba } from "./ColorBomba"
import { Indicador } from "./Indicador"

const Bombas = ({ corrientes }) => {
  const bomba1 = corrientes[0]
  const bomba2 = corrientes[1]
  const bomba3 = corrientes[2]

  return (
    <div>
      <div className="text-center flex flex-col gap-y-1">
        <span className="text-base text-primary font-bold 2xl:text-lg">
          Bombas de Río
        </span>
        <span className="2xl:text-lg mb-2">Corriente de bomba [A]</span>
      </div>
      <div className="flex justify-between">
        <div
          className={`flex flex-col items-center border-2 border-yellow-700 rounded-md py-1 px-1.5 `}
        >
          <Indicador
            title="Bomba 1"
            value={corrientes[0]?.corrientes?.ir?.valor.toFixed(2)}
          />
          <ColorBomba className="mt-1" />
        </div>

        <div
          className={`flex flex-col items-center border-2 rounded-md p-1 border-yellow-700`}
        >
          <Indicador
            title="Bomba 2"
            value={corrientes[1]?.corrientes?.ir?.valor.toFixed(2)}
          />
          <ColorBomba className="mt-1" />
        </div>
        <div
          className={`flex flex-col items-center border-2 border-yellow-700 rounded-md p-1 `}
        >
          <Indicador
            title="Bomba 3"
            value={corrientes[2]?.corrientes?.ir?.valor.toFixed(2)}
          />
          <ColorBomba className="mt-1" />
        </div>
      </div>
    </div>
  )
}

export default Bombas
