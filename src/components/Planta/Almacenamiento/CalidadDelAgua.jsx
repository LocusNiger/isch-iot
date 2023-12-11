import { useSelector } from "react-redux"
import ContainerCuerpo from "../Container/ContainerCuerpo"
import { getValor } from "../FalconYSavio/FalconYSavio"

const CalidadDelAgua = () => {
  const calidadDelAgua = useSelector(
    (state) => state.aguas.planta.estadoCalidadAgua
  )
  return (
    <div className="h-2/5 w-full">
      <ContainerCuerpo className="h-fit flex flex-col justify-center items-center gap-y-4 2xl:gap-y-8">
        <p className="text-base text-primary font-bold 2xl:text-lg">
          Calidad de Agua
        </p>
        {calidadDelAgua && (
          <div className="flex gap-x-16">
            <div className="flex flex-col text-center">
              <span>Nivel de PH</span>
              <span className="text-xl font-bold">
                {getValor(calidadDelAgua.ph)}
              </span>
            </div>
            <div className="flex flex-col text-center">
              <span>Temperatura</span>
              <span className="text-xl font-bold">
                {getValor(calidadDelAgua.temperatura)}
              </span>
            </div>
            <div className="flex flex-col text-center">
              <span>Cloro</span>
              <span className="text-xl font-bold">
                {getValor(calidadDelAgua.ppmCloro)}
              </span>
            </div>
          </div>
        )}
      </ContainerCuerpo>
    </div>
  )
}

export default CalidadDelAgua
