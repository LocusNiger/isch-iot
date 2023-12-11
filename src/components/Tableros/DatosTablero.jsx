export const handleModoOp = (modoOp) => {
  switch (modoOp) {
    case 1:
      return "Fotocélula"
    case 2:
      return "Calendario"
    case 3:
      return "Forzado"
    default:
      return "Calendario solar"
  }
}
const DatosTablero = ({ detail }) => {
  return (
    <>
      <div
        tabIndex={0}
        className="border border-base-300 bg-base-100 rounded-box w-5/6 collapse collapse-arrow"
      >
        <input type="checkbox" />

        <div className="collapse-title text-xl font-medium">
          Datos del tablero
        </div>
        <div className="collapse-content flex gap-8">
          <div className="flex flex-col">
            <p className="font-semibold">
              ID: <span className="font-normal">{detail.id}</span>
            </p>
            <p className="font-semibold">
              Nombre: <span className="font-normal">{detail.nombre}</span>
            </p>
            <p className="font-semibold">
              Inicio de encendido:
              <span className="font-normal"> {detail.inicioEncendido}</span>
            </p>
            <p className="font-semibold">
              Modo de operación:{" "}
              <span className="font-normal">{handleModoOp(detail.modoOp)}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">
              EUI: <span className="font-normal">{detail.eui}</span>
            </p>
            <p className="font-semibold">
              Descripción:{" "}
              <span className="font-normal">{detail.descripcion}</span>
            </p>

            <p className="font-semibold">
              Fin de encendido:{" "}
              <span className="font-normal"> {detail.finEncendido}</span>
            </p>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        className="border border-base-300 bg-base-100 rounded-box w-5/6 collapse collapse-arrow"
      >
        <input type="checkbox" />

        <div className="collapse-title text-xl font-medium">Estados</div>
        <div className="collapse-content flex flex-col">
          <p className="font-semibold">
            Alarma:{" "}
            <span className="font-normal">
              {detail.activaAlarma ? "Activa" : "Inactiva"}
            </span>
          </p>
          <p className="font-semibold">
            Habilitación forzado:{" "}
            <span className="font-normal">
              {detail.habForzado ? "Habilitado" : "Inhabilitado"}
            </span>
          </p>
          <p className="font-semibold">
            Valor forzado:{" "}
            <span className="font-normal">
              {detail.valorForzado ? "Forzado" : "No forzado"}
            </span>
          </p>
          <p className="font-semibold">
            Compacto:{" "}
            <span className="font-normal">{detail.compacto ? "Sí" : "No"}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default DatosTablero
