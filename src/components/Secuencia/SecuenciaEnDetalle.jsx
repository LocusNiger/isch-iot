/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { faCircle, faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"

const Cell = ({
  children = null,
  noBorder = false,
  bold = false,
  className = "",
  ...otherProps
}) => (
  <div
    className={`w-full h-7 flex items-center justify-center px-2
      ${!noBorder && "border border-muted"} ${bold && "font-bold"}
      ${className}`}
    style={{ minWidth: "3rem" }}
    {...otherProps}
  >
    {children}
  </div>
)

const SecuenciaEnDetalle = ({ secuencia = null }) => {
  const { movimientos: cantMovimientos, estados, ciclo, id } = secuencia

  /* Parpadeo de intermitente */
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    /* Intervalo. C/300ms cambia E de false a true y viceversa */
    const interval = setInterval(
      () => setBlink((currentBlinkState) => !currentBlinkState),
      300
    )
    return () => {
      interval && clearInterval(interval)
    }
  }, [])

  if (!secuencia) {
    return null
  }
  return (
    <div className="flex gap-x-3">
      {/* Columna "Índice" */}
      <div className="w-fit">
        <Cell noBorder />
        <Cell bold>Índice</Cell>
        {estados.map(({ indice }) => (
          <Cell>{indice}</Cell>
        ))}
      </div>

      {/* Columna "Movimientos" */}
      {(() => {
        const arrayCantMovimientos = []
        for (
          let indexMovimiento = 0;
          indexMovimiento < cantMovimientos;
          indexMovimiento++
        ) {
          arrayCantMovimientos.push(indexMovimiento)
        } // Cargo movimientos en array y los muestro en pantalla
        return arrayCantMovimientos.map((indexMovimiento) => (
          <div className="w-2/6">
            <Cell noBorder bold>
              Movimiento {indexMovimiento + 1}
            </Cell>
            <div className="flex">
              <Cell bold>R</Cell>
              <Cell bold>A</Cell>
              <Cell bold>V</Cell>
            </div>
            {/* Recorro los estados y obtengo sus salidas */}
            {estados.map(({ salidas }) => {
              const indexOfTheFirstElement = indexMovimiento * 3
              const indexOfTheLastElement = indexOfTheFirstElement + 3
              return (
                <div className="flex">
                  {salidas
                    .slice(indexOfTheFirstElement, indexOfTheLastElement)
                    .map((salida, i) => (
                      <Cell className="gap-x-1">
                        {(() => {
                          if (
                            salida === 0 ||
                            ((salida === 2 || salida === 3) && blink === false)
                          ) {
                            return (
                              <FontAwesomeIcon
                                icon={faMinus}
                                style={{ color: "#323232" }}
                              />
                            )
                          }

                          const remainder = i % 3
                          if (remainder === 0)
                            return (
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="text-xl"
                                style={{ color: "#A31515" }}
                              />
                            )
                          if (remainder === 1)
                            return (
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="text-xl"
                                style={{ color: "#FFF500" }}
                              />
                            )

                          if (remainder === 2)
                            return (
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="text-xl"
                                style={{ color: "#30AA59" }}
                              />
                            )
                        })()}
                        {(salida === 2 || salida === 3) && `i${salida}`}
                      </Cell>
                    ))}
                </div>
              )
            })}
          </div>
        ))
      })()}

      {/* Columna "Tiempo" */}
      <div className="w-fit flex flex-col gap-y-3">
        <div>
          <Cell noBorder />
          <Cell bold>Tiempo</Cell>
          {estados.map(({ tiempo }) => (
            <Cell>{tiempo} s</Cell>
          ))}
        </div>

        {/* Columna "Ciclo" */}
        <div>
          <Cell bold>Ciclo</Cell>
          <Cell>{ciclo}</Cell>
        </div>
      </div>
    </div>
  )
}

export default SecuenciaEnDetalle
