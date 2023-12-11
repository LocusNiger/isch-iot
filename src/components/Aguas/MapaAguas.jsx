/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  bold,
  head,
  noMargin,
  popupContent,
  popupHead,
  popupState,
} from "../Map/popupStyles";
import iconoPresion2 from "../../assets/presion2.png";
import pozosIcono from "../../assets/pozos.png";
import cloacasIcono from "../../assets/cloacas.png";
import {
  mapaCloacas,
  mapaPozos,
  mapaPuntosDePresion,
} from "../../services/aguas";

const presionIcon = new L.Icon({
  iconUrl: iconoPresion2,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const pozosIcon = new L.Icon({
  iconUrl: pozosIcono,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const cloacasIcon = new L.Icon({
  iconUrl: cloacasIcono,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const popupPresion = ({ nombre, alarma, presion }) => {
  return (
    <Popup>
      <div style={popupContent}>
        <div style={popupHead}>
          <div style={head}>
            <span>Nombre</span>
            <span style={bold}>{nombre}</span>
          </div>
          <div style={head}>
            <span style={noMargin}>Alarma</span>
            <span style={bold}>{alarma === true ? "Activa" : "Inactiva"}</span>
          </div>
        </div>
        <div style={popupState}>
          <div style={head}>
            <span style={noMargin}>Presión</span>
            <span>{presion.valor}</span>
          </div>
        </div>
      </div>
    </Popup>
  );
};
const popupPozo = ({ nombre, estadoNodo, alarma, presion, estadoMotor }) => {
  return (
    <Popup>
      <div style={popupContent}>
        <div style={popupHead}>
          <div style={head}>
            <span>Nombre</span>
            <span style={bold}>{nombre}</span>
          </div>
          <div style={head}>
            <span style={noMargin}>Alarma</span>
            <span style={bold}>{alarma ? "Activa" : "Inactiva"}</span>
          </div>
        </div>
        <div style={popupState}>
          <div style={head}>
            <span style={noMargin}>Presión</span>
            <span>{/* {presion.valor} {presion.unidad} */}-</span>
          </div>
          <div style={head}>
            <span style={noMargin}>Estado</span>
            <span>
              {estadoNodo === "EN_LINEA" ? "En línea" : "Fuera de línea"}
            </span>
          </div>
          <div style={head}>
            <span style={noMargin}>Estado de motor</span>
            <span style={bold}>{estadoMotor ? "ON" : "OFF"}</span>
          </div>
        </div>
      </div>
    </Popup>
  );
};
const popupCloaca = ({ id, nombre, estadoNodo, alarma }) => {
  return (
    <Popup>
      <div style={popupContent}>
        <div style={popupHead}>
          <div style={head}>
            <span style={noMargin}>ID</span>
            <span style={bold}>{id}</span>
          </div>
          <div style={head}>
            <span>Nombre</span>
            <span style={bold}>{nombre}</span>
          </div>
        </div>
        <div style={popupState}>
          <div style={head}>
            <span style={noMargin}>Alarma</span>
            <span style={bold}>{alarma ? "Activa" : "Inactiva"}</span>
          </div>
          <div style={head}>
            <span style={noMargin}>Estado</span>
            <span>
              {estadoNodo === "EN_LINEA" ? "En línea" : "Fuera de línea"}
            </span>
          </div>
        </div>
      </div>
    </Popup>
  );
};

const MapaAguas = () => {
  const tokenAguas = localStorage.getItem("tokenAguas");
  const userAuth = useSelector((state) => state.userAuth);
  const [presionToUse, setPresionToUse] = useState(null);
  const [pozosToUse, setPozosToUse] = useState(null);
  const [cloacasToUse, setCloacasToUse] = useState(null);
  const [itemsMapa, setItemsMapa] = useState();
  const [icon, setIcon] = useState(presionIcon);
  const navigate = useNavigate();

  useEffect(() => {
    mapasRequest();
  }, []);

  const mapasRequest = async () => {
    const [dataMapaPresion, errorMapaPresion] = await mapaPuntosDePresion(
      tokenAguas
    );
    if (dataMapaPresion) {
      setPresionToUse(dataMapaPresion);
      setItemsMapa(dataMapaPresion);
    } else console.error(errorMapaPresion);
    const [dataMapaPozos, errorMapaPozos] = await mapaPozos(tokenAguas);
    if (dataMapaPozos) {
      setPozosToUse(dataMapaPozos);
    } else console.error(errorMapaPozos);
    const [dataMapaCloacas, errorMapaCloacas] = await mapaCloacas(tokenAguas);
    if (dataMapaCloacas) {
      setCloacasToUse(dataMapaCloacas);
    } else console.error(errorMapaCloacas);
  };

  const handleSelectItems = (e) => {
    switch (e.target.value) {
      case "presion":
        setItemsMapa(presionToUse);
        setIcon(presionIcon);
        break;
      case "pozos":
        setItemsMapa(pozosToUse);
        setIcon(pozosIcon);
        break;
      case "cloacas":
        setItemsMapa(cloacasToUse);
        setIcon(cloacasIcon);
        break;
      default:
        break;
    }
  };

  const handleDetail = (id) => {
    // navigate(`/luminaria/nodos/detalle/${id}`)
  };

  const handlePopup = (item) => {
    switch (icon) {
      case presionIcon:
        return popupPresion(item);
      case pozosIcon:
        return popupPozo(item);
      case cloacasIcon:
        return popupCloaca(item);
      default:
        break;
    }
  };

  return (
    <div>
      <div className="mt-4 w-full flex justify-center">
        <select
          onChange={handleSelectItems}
          className="border border-gray-500 p-2.5 w-2/5"
        >
          <option value="presion">Puntos de presión</option>
          <option value="pozos">Pozos</option>
          <option value="cloacas">Cloacas</option>
        </select>
      </div>
      <div className="my-8 flex items-center justify-center flex-col">
        {presionToUse && pozosToUse && cloacasToUse && (
          <MapContainer
            className="containerMap"
            center={[userAuth.latitud, userAuth.longitud]}
            zoom={14}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {itemsMapa.map((item, index) => {
              return (
                <Marker
                  icon={icon}
                  key={index}
                  position={[item.latitud, item.longitud]}
                >
                  {handlePopup(item)}
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default MapaAguas;
