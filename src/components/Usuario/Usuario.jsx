/* eslint-disable no-unused-vars */
import React from "react"
import { useSelector } from "react-redux"

const Usuario = () => {
  const usuario = useSelector((state) => state.userAuth)

  return (
    <>
      <div className="flex flex-col py-4 px-6">
        <div
          tabIndex={0}
          className="border border-base-300 bg-base-100 rounded-box w-5/6 collapse collapse-arrow"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-medium">
            Datos del usuario
          </div>
          <div className="collapse-content flex gap-8">
            <div className="flex flex-col">
              <p className="font-semibold">
                Nombre de usuario:{" "}
                <span className="font-normal">{usuario.username}</span>
              </p>
              <p className="font-semibold">
                Correo electrónico:{" "}
                <span className="font-normal">{usuario.email}</span>
              </p>
              <p className="font-semibold">
                Nombre: <span className="font-normal">{usuario.nombre}</span>
              </p>
              <p className="font-semibold">
                Apellido:{" "}
                <span className="font-normal">{usuario.apellido}</span>
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">
                Teléfono:{" "}
                <span className="font-normal">{usuario.telefono}</span>
              </p>
              <p className="font-semibold">
                Empresa:{" "}
                <span className="font-normal">
                  {usuario.nombreOrganizacion}
                </span>
              </p>
              <p className="font-semibold">
                Rol: <span className="font-normal"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Usuario
