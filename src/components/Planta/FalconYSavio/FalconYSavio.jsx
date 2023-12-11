import { useSelector } from "react-redux"
import { Indicador } from "../Captacion/Indicador"
import Container from "../Container/Container"
import ContainerCuerpo from "../Container/ContainerCuerpo"

export const getValor = (nivel) => {
  let valor = nivel?.valor
  let unidad = nivel?.unidad

  switch (valor) {
    case undefined:
    case null:
      valor = "-"
      break
    default: {
      valor = +valor
      valor = +valor.toFixed(2)
    }
  }

  if (unidad?.toLowerCase) {
    unidad = unidad.toLowerCase()
  }

  return `${valor} ${unidad || ""}`
}

const FalconYSavio = () => {
  const falconYSavio = useSelector((state) => state.aguas.planta.falconYSavio)
  return (
    <Container numero="6" titulo="Falcon y Savio (TANQUE)">
      <ContainerCuerpo className="h-fit">
        {falconYSavio && (
          <div className=" mt-3 w-3/5 mx-auto flex flex-col justify-center items-center gap-y-1 2xl:gap-y-5">
            <div className="flex flex-col  justify-center items-center gap-y-1">
              <span className="text-muted text-base text-center xl:text-sm 2xl:text-base">
                Presion de Tanque
              </span>
              <span className="font-semibold xl:text-lg 2xl:text-3xl">
                {getValor(falconYSavio.presionDeTanque)}
              </span>
              <div>
                <Indicador
                  value={getValor(falconYSavio.presionDePlanta)}
                  title="Presión de Planta"
                  className="flex justify-center gap-x-3"
                />
              </div>
            </div>
          </div>
        )}
      </ContainerCuerpo>
    </Container>
  )
}

export default FalconYSavio
