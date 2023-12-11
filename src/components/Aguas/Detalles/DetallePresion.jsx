/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DatosPresion from "./DatosPresion";
import Loader from "../../Loader/Loader";
import { cfgPuntoDePresionPorId } from "../../../services/aguas";

const DetallePresion = () => {
  const id = parseInt(useParams().id);
  const tokenAguas = localStorage.getItem("tokenAguas");
  const [detail, setDetail] = useState(null);
  const presiones = useSelector((state) => state.aguas.puntosDePresion);
  const presionEncontrada = presiones.find((presion) => presion.id === id);

  const getPresion = async () => {
    let detail;
    const [dataCfg, error] = await cfgPuntoDePresionPorId(tokenAguas, id);
    if (dataCfg) {
      detail = dataCfg;
    } else console.error(error);
    await setDetail(detail);
  };

  useEffect(() => {
    if (presionEncontrada !== undefined) {
      setDetail(presionEncontrada);
    } else {
      getPresion();
    }
  }, []);

  return (
    <div className="flex flex-col py-4 px-6">
      {detail !== null ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold ml-1">{detail.descripcion}</h1>
          <DatosPresion detail={detail} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DetallePresion;
