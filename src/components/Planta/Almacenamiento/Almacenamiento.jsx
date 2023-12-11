/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux"
import Container from "../Container/Container"
import ContainerCuerpo from "../Container/ContainerCuerpo"
import IndicadorNivelCisterna from "./IndicadorNivelCisterna"

const Almacenamiento = () => {
  const nivelCisterna = useSelector((state) => state.aguas.planta.niveles[0])

  return (
    <Container
      numero="4"
      titulo="Almacenamiento"
      className="h-full flex flex-col gap-y-2"
    >
      <div className="flex h-full">
        <div className="w-full">
          <ContainerCuerpo className="flex justify-center items-center xl:gap-x-5 2xl:gap-x-10">
            <div className="w-1/2  h-full">
              {nivelCisterna && <IndicadorNivelCisterna data={nivelCisterna} />}
            </div>
          </ContainerCuerpo>
        </div>
      </div>
    </Container>
  )
}

export default Almacenamiento
