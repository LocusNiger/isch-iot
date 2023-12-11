import { useSelector } from "react-redux"

const DatosControladores = ({ detail, tipoControlador }) => {
  const organizacion = useSelector((state) => state.userAuth.nombreOrganizacion)
  return (
    <>
      <div
        tabIndex={0}
        className="border border-base-300 bg-base-100 rounded-box w-5/6 collapse collapse-arrow"
      >
        <input type="checkbox" />

        <div className="collapse-title text-xl font-medium">
          Datos del controlador {tipoControlador}
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
              Organización: <span className="font-normal">{organizacion}</span>
            </p>
            <p className="font-semibold">
              Descripción: <span className="font-normal"></span>
            </p>
          </div>
          <div className="flex flex-col"></div>
        </div>
      </div>
    </>
  )
}

export default DatosControladores
