import { useSelector } from "react-redux"

const DatosPresion = ({ detail }) => {
  const organizacion = useSelector((state) => state.userAuth.nombreOrganizacion)
  return (
    <>
      <div
        tabIndex={0}
        className="border border-base-300 bg-base-100 rounded-box w-5/6 collapse collapse-arrow"
      >
        <input type="checkbox" />

        <div className="collapse-title text-xl font-medium">
          Datos del punto de presión
        </div>
        <div className="collapse-content flex gap-8">
          <div className="flex flex-col">
            <p className="font-semibold">
              ID: <span className="font-normal">{detail.id}</span>
            </p>
            <p className="font-semibold">
              ID Lora: <span className="font-normal">{detail.idLora}</span>
            </p>
            <p className="font-semibold">
              Nombre: <span className="font-normal">{detail.nombre}</span>
            </p>
            <p className="font-semibold">
              Origen de datos:{" "}
              <span className="font-normal">{detail.origenDatos}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">
              Descripción:{" "}
              <span className="font-normal">{detail.descripcion}</span>
            </p>
            <p className="font-semibold">
              Organización: <span className="font-normal">{organizacion}</span>
            </p>
            <p className="font-semibold">
              Presión mín/máx:{" "}
              <span className="font-normal">{detail.presionMin} mca/</span>
              <span className="font-normal">{detail.presionMax} mca</span>
            </p>
            <p className="font-semibold">
              Magnitud:{" "}
              <span className="font-normal">
                {detail.variablePresion.unidad}
              </span>
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
            Simulación:{" "}
            <span className="font-normal">
              {detail.simulacion ? "Activa" : "Inactiva"}
            </span>
          </p>
          <p className="font-semibold">
            Alarma:{" "}
            <span className="font-normal">
              {detail.activaAlarma ? "Activa" : "Inactiva"}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default DatosPresion
