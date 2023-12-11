import ComandoCalendario from "./Comandos/ComandoCalendario"
import ComandoModoTablero from "./Comandos/ComandoModoTablero"

const ComandosDelTablero = ({ detail }) => {
  return (
    <div
      tabIndex={0}
      className="border border-base-300 bg-base-100 rounded-box w-5/6 collapse collapse-arrow"
    >
      <input type="checkbox" />
      <h2 className="p-4 text-xl collapse-title">Comandos del tablero</h2>
      <div className="collapse flex flex-col gap-4 collapse-arrow collapse-content">
        <ComandoModoTablero detail={detail} />
        <ComandoCalendario detail={detail} />
      </div>
    </div>
  )
}

export default ComandosDelTablero
