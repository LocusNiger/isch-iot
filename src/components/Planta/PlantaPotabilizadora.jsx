import Almacenamiento from "./Almacenamiento/Almacenamiento"
import Captacion from "./Captacion/Captacion"
import Clarificacion from "./Clarificacion/Clarificacion"
import FalconYSavio from "./FalconYSavio/FalconYSavio"
import Filtracion from "./Filtracion/Filtracion"
import SalidaDePlanta from "./SalidaDePlanta/SalidaDePlanta"
import "./styles.css"

const Fila = ({ children, className = null }) => {
  return <div className={`flex ${className}`}>{children}</div>
}
const Columna = ({ children, className = null }) => {
  return <div className={className}>{children}</div>
}
function PlantaPotabilizadora() {
  const colsWidth = {
    primera: "w-3/5",
    segunda: "w-2/5",
  }
  const filasHeight = {
    primera: "h-2/5 2xl:h-7/20",
    segunda: "h-3/5 2xl:h-13/20",
    tercera: "h-11/12 2xl: h-full",
  }

  return (
    <>
      <div className="container flex flex-col p-2 gap-y-2">
        <Fila className={`${filasHeight.primera} gap-x-2`}>
          <Columna className={colsWidth.primera}>
            <Captacion />
          </Columna>
          <Columna className={colsWidth.segunda}>
            <Fila className="h-full gap-x-2">
              <Columna className="h-full">
                <Clarificacion />
              </Columna>
              <Columna className="w-7/10">
                <Filtracion />
              </Columna>
            </Fila>
          </Columna>
        </Fila>

        <Fila className={`${filasHeight.tercera} gap-x-2`}>
          <Columna className={`${colsWidth.primera} flex flex-col gap-y-2`}>
            <Fila className="h-56 gap-x-2">
              <Columna className="w-2/5">
                <FalconYSavio />
              </Columna>
              <Columna className="w-8/12">
                <SalidaDePlanta />
              </Columna>
            </Fila>
          </Columna>
          <Columna className={colsWidth.segunda}>
            <Almacenamiento />
          </Columna>
        </Fila>
      </div>
    </>
  )
}

export default PlantaPotabilizadora
