/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux"
import { Indicador } from "../Captacion/Indicador"
import Container from "../Container/Container"
import ContainerCuerpo from "../Container/ContainerCuerpo"
import { getValor } from "../FalconYSavio/FalconYSavio"
import IndicadorNivelDeTanque from "./IndicadorNivelDeTanque"

const SalidaDePlanta = () => {
  const caudal = useSelector((state) => state.aguas.planta.caudal)
  const pieDeTanque = useSelector((state) => state.aguas.planta.pieDeTanque)
  return (
    <Container numero="5" titulo="Salida de planta">
      <ContainerCuerpo className="h-fit flex gap-x-3">
        <div className="w-4/6 2xl:px-8 2xl:py-2">
          <IndicadorNivelDeTanque />
        </div>
        <div className="w-2/6 flex flex-col justify-center items-center gap-y-5 2xl:gap-y-8">
          <Indicador
            title="Caudal"
            value={getValor(caudal)}
            disableBackground
          />
          <Indicador
            title="Pie de tanque"
            value={getValor(pieDeTanque)}
            disableBackground
          />
        </div>
      </ContainerCuerpo>
    </Container>
  )
}

export default SalidaDePlanta
