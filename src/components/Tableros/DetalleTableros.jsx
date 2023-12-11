/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { getCfgTableroPorId } from "../../services/tableros";
import DatosTablero from "./DatosTablero";
import ComandosDelTablero from "./ComandosDelTablero";

const DetalleTableros = () => {
  const id = parseInt(useParams().id);
  const token = localStorage.getItem("token");
  const [detail, setDetail] = useState(null);
  const tableros = useSelector((state) => state.tableros.tableros);
  const tableroEncontrado = tableros.find((tablero) => tablero.id === id);

  const getTablero = async () => {
    const [dataCfg, errorCfg] = await getCfgTableroPorId(token, id);
    if (dataCfg) {
      console.log(dataCfg);
      setDetail(dataCfg);
    } else {
      console.error(errorCfg);
    }
  };

  useEffect(() => {
    if (tableroEncontrado !== undefined) {
      setDetail(tableroEncontrado);
    } else {
      getTablero();
    }
  }, []);

  return (
    <div className="flex flex-col py-4 px-6">
      {detail === null ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          <DatosTablero detail={detail} />
          <ComandosDelTablero detail={detail} />
        </div>
      )}
    </div>
  );
};

export default DetalleTableros;
