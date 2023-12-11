/* eslint-disable no-unused-vars */
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import SecuenciaEnDetalle from "./SecuenciaEnDetalle"

const SecuenciaPrueba = ({ detail }) => {
  const id = parseInt(useParams().id)
  const [seleccionSecuenciaMenu, setSeleccionSecuenciaMenu] = useState(1)
  const [secuenciaId, setSecuenciaId] = useState(
    detail.configuracion.secuencias[0].id
  )

  const semaforoSecuencias = useMemo(() => {
    if (detail) {
      const { secuencias } = detail?.configuracion
      return secuencias
    }
    return null
  }, [detail])

  const handleSelectSecuencia = (e) => {
    setSeleccionSecuenciaMenu(parseInt(e.target.value))
    const secuenciaId = semaforoSecuencias.find(
      (secuencia) => secuencia.indice === parseInt(e.target.value)
    )
    setSecuenciaId(secuenciaId.id)
  }
  return (
    <div className="py-4 w-full flex flex-col gap-5 flex-nowrap justify-around">
      <div className="flex w-2/6 gap-12">
        <select
          className="w-fit bg-transparent border border-muted-line rounded-lg px-2 py-2 cursor-pointer"
          onChange={(e) => {
            handleSelectSecuencia(e)
          }}
        >
          {semaforoSecuencias.map((secuencia) => (
            <option
              label={`Secuencia ${secuencia.indice}`}
              key={secuencia.id}
              value={secuencia.indice}
              className="bg-bck-secondary"
            />
          ))}
        </select>
        <Link
          className="border p-2 cursor-pointer rounded round-xl hover:bg-gray-100 transition-all"
          to={`/detail/${id}/secuencia/${secuenciaId}`}
          state={detail}
        >
          Ver detalles <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <SecuenciaEnDetalle
        secuencia={semaforoSecuencias.find(
          ({ indice }) => seleccionSecuenciaMenu === indice
        )}
      />
    </div>
  )
}

export default SecuenciaPrueba
