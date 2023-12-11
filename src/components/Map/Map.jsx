/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { estadosThunk, semaforosThunk } from "../../features/semaforos/thunks";
import {
  bold,
  head,
  noMargin,
  popupContent,
  popupHead,
  popupState,
} from "./popupStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export const stateColor = (estado) => {
  switch (estado) {
    case "EN_LINEA":
    case "ONLINE":
    case true:
      return (
        <span style={bold}>
          En línea{" "}
          <FontAwesomeIcon icon={faCircle} className="text-green-400" />
        </span>
      );
    case "FUERA_DE_LINEA":
    case false:
    case null:
      return (
        <span style={bold}>
          Fuera de línea{" "}
          <FontAwesomeIcon icon={faCircle} className="text-red-500" />
        </span>
      );
    case "FALLA":
      return <span style={bold}>Falla</span>;

    default:
      break;
  }
};

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greyIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
  const userAuth = useSelector((state) => state.userAuth);
  const semaforosRedux = useSelector((state) => state.semaforos);
  const estadosSemaforosRedux = useSelector((state) => state.estadosSemaforos);
  const [semaforos, setSemaforos] = useState(null);
  const [estadosSemaforos, setEstadosSemaforos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSemaforos = async () => {
    const dataSemaforos = await dispatch(semaforosThunk(userAuth.token));
    const [dataEstados, error] = await dispatch(estadosThunk(userAuth.token));
    setSemaforos(dataSemaforos);
    setEstadosSemaforos(dataEstados);
  };

  useEffect(() => {
    if (semaforosRedux.length !== 0) {
      setSemaforos(semaforosRedux);
      setEstadosSemaforos(estadosSemaforosRedux);
    } else {
      getSemaforos();
    }
  }, [semaforos]);

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="my-8 flex items-center justify-center flex-col">
      <MapContainer
        className="containerMap"
        center={[userAuth.latitud, userAuth.longitud]}
        zoom={14}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {estadosSemaforos.map((semaforo, index) => {
          return (
            <Marker
              icon={
                semaforo.estadoDispositivo === "EN_LINEA" ? greenIcon : greyIcon
              }
              key={index}
              position={[semaforo.latitud, semaforo.longitud]}
            >
              <Popup>
                <div style={popupContent}>
                  <div style={popupHead}>
                    <div style={head}>
                      <span>Descripción</span>
                      <span style={bold}>{semaforo.descripcion}</span>
                    </div>
                    <div style={head}>
                      <span style={noMargin}>ID</span>
                      <span style={bold}>{semaforo.id}</span>
                    </div>
                  </div>
                  <div style={popupState}>
                    <div style={head}>
                      <span style={noMargin}>Estado</span>
                      <span>{stateColor(semaforo.estadoDispositivo)}</span>
                    </div>
                    <button
                      onClick={() => handleDetail(semaforo.id)}
                      className="p-1 border shadow"
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
