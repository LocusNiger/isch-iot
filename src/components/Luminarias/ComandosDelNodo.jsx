import ComandoHeartbeat from "./comandosLuminaria/ComandoHeartbeat"
import ComandoModo from "./comandosLuminaria/ComandoModo"
import ComandoValorForzado from "./comandosLuminaria/ComandoValorForzado"
import ComandoEstrategia from "./comandosLuminaria/ComandoEstrategia"
import ComandoConfiguraciones from "./comandosLuminaria/ComandoConfiguraciones"

const ComandosDelNodo = () => {
  return (
    <div
      tabIndex={0}
      className="border border-base-300 bg-base-100 rounded-box w-5/6 collapse collapse-arrow"
    >
      <input type="checkbox" />
      <h2 className="p-4 text-xl collapse-title">Comandos del nodo</h2>
      <div className="collapse flex flex-col gap-4 collapse-arrow collapse-content">
        <ComandoModo />
        <ComandoHeartbeat />
        <ComandoValorForzado />
        <ComandoEstrategia />
        <ComandoConfiguraciones />
      </div>
    </div>
  )
}

export default ComandosDelNodo
