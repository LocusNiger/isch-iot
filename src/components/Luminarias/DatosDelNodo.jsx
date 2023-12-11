const DatosDelNodo = ({ detail }) => {
  return (
    <div
      tabIndex={0}
      className="border border-base-300 bg-base-100 rounded-box w-5/6 collapse collapse-arrow"
    >
      <input type="checkbox" />

      <div className="collapse-title text-xl font-medium">Datos del nodo</div>
      <div className="collapse-content flex gap-8">
        <div className="flex flex-col">
          <p className="font-semibold">
            ID: <span className="font-normal">{detail.nodoId}</span>
          </p>
          <p className="font-semibold">
            EUI: <span className="font-normal">{detail.eui}</span>
          </p>
          <p className="font-semibold">
            Modo: <span className="font-normal">{detail.modo}</span>
          </p>
          <p className="font-semibold">
            Estado: <span className="font-normal">{detail.estadoOpNormal}</span>
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">
            Descripción:{" "}
            <span className="font-normal">{detail.descripcion}</span>
          </p>
          <p className="font-semibold">
            Tensión: <span className="font-normal">{detail.tension}</span>
          </p>
          <p className="font-semibold">
            Brillo: <span className="font-normal">{detail.brillo}</span>
          </p>
          <p className="font-semibold">
            Corriente: <span className="font-normal">{detail.corriente}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DatosDelNodo
