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
    case true:
      return (
        <span style={bold}>
          En línea{" "}
          <FontAwesomeIcon icon={faCircle} className="text-green-400" />
        </span>
      )
    case false:
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

const MapaLuminaria = () => {
  const userAuth = useSelector((state) => state.userAuth)
  const nodos = useSelector((state) => state.luminarias)
  const [nodosToUse, setNodosToUse] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setNodosToUse(nodos)
  }, [])

  const handleDetail = (id) => {
    navigate(`/luminaria/nodos/detalle/${id}`)
  }

  return (
    <div>
      <div className="my-8 flex items-center justify-center flex-col">
        {nodosToUse && (
          <MapContainer
            className="containerMap"
            center={[userAuth.latitud, userAuth.longitud]}
            zoom={14}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {nodosToUse.map((nodo, index) => {
              return (
                <Marker
                  icon={nodo.simulacion === true ? greenIcon : greyIcon}
                  key={index}
                  position={[nodo.latitud, nodo.longitud]}
                >
                  <Popup>
                    <div style={popupContent}>
                      <div style={popupHead}>
                        <div style={head}>
                          <span>Descripción</span>
                          <span style={bold}>{nodo.descripcion}</span>
                        </div>
                        <div style={head}>
                          <span style={noMargin}>ID</span>
                          <span style={bold}>{nodo.nodoId}</span>
                        </div>
                      </div>
                      <div style={popupState}>
                        <div style={head}>
                          <span style={noMargin}>Estado</span>
                          <span>{stateColor(nodo.simulacion)}</span>
                        </div>
                        <button
                          onClick={() => handleDetail(nodo.nodoId)}
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

export default MapaLuminaria
