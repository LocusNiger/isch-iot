/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  bold,
  head,
  noMargin,
  popupContent,
  popupHead,
  popupState,
} from "../Map/popupStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

export const stateColor = (estado) => {
  switch (estado) {
    case "OP_NORMAL":
      return (
        <span style={bold}>
          En línea{" "}
          <FontAwesomeIcon icon={faCircle} className="text-green-400" />
        </span>
      )
    case "OFFLINE":
      return (
        <span style={bold}>
          Fuera de línea{" "}
          <FontAwesomeIcon icon={faCircle} className="text-red-500" />
        </span>
      )
    default:
      break
  }
}

export const handleTipoTablero = (tipoDeTablero) => {
  switch (tipoDeTablero) {
    case "COMPACTO":
      return "Compacto"
    case "FULL":
      return "Full"
    default:
      return "No definido"
  }
}

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const greyIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const MapaTableros = () => {
  const token = localStorage.getItem("token")
  const userAuth = useSelector((state) => state.userAuth)
  const tableros = useSelector((state) => state.tableros.mapaTableros)
  const [tablerosToUse, setTablerosToUse] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getMapaTableros = async () => {
    if (tableros.length === 0) {
      const [mapaTableros, errorTableros] = await getMapaTableros(token)
      if (mapaTableros) {
        setTablerosToUse(mapaTableros)
      } else console.error(errorTableros)
    } else {
      setTablerosToUse(tableros)
    }
  }

  useEffect(() => {
    console.log(tableros)
    getMapaTableros()
  }, [])

  const handleDetail = (id) => {
    navigate(`/tableros/${id}`)
  }

  return (
    <div>
      <div className="my-8 flex items-center justify-center flex-col">
        {tablerosToUse && (
          <MapContainer
            className="containerMap"
            center={[userAuth.latitud, userAuth.longitud]}
            zoom={14}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {tablerosToUse.map((tablero, index) => {
              return (
                <Marker
                  icon={tablero.simulacion === true ? greenIcon : greyIcon}
                  key={index}
                  position={[tablero.latitud, tablero.longitud]}
                >
                  <Popup>
                    <div style={popupContent}>
                      <div style={popupHead}>
                        <div style={head}>
                          <span>Nombre</span>
                          <span style={bold}>{tablero.nombre}</span>
                        </div>
                        <div style={head}>
                          <span style={noMargin}>Tipo de tablero</span>
                          <span style={bold}>
                            {handleTipoTablero(tablero.tipoTablero)}
                          </span>
                        </div>
                      </div>
                      <div style={popupState}>
                        <div style={head}>
                          <span style={noMargin}>Estado</span>
                          <span>{stateColor(tablero.estado)}</span>
                        </div>
                        <button
                          onClick={() => handleDetail(tablero.id)}
                          className="p-1 border shadow"
                        >
                          Detalles
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        )}
      </div>
    </div>
  )
}

export default MapaTableros
