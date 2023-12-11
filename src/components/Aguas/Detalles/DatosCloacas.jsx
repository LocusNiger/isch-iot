import { useSelector } from "react-redux"

const DatosCloacas = ({ detail }) => {
  const organizacion = useSelector((state) => state.userAuth.nombreOrganizacion)
  return (
    <>
      <div
        tabIndex={0}
        className="border border-base-300 bg-base-100 rounded-box w-5/6 collapse collapse-arrow"
      >
        <input type="checkbox" />

        <div className="collapse-title text-xl font-medium">
          Datos de la cloaca
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
              ID temperatura del motor:{" "}
              <span className="font-normal">
                {detail.idTempMotor === null ? "-" : detail.idTempMotor}{" "}
              </span>
            </p>
            <p className="font-semibold">
              Id nivel:{" "}
              <span className="font-normal">
                {detail.idNivel === null ? "-" : detail.idNivel}
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

export default DatosCloacas
