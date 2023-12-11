/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import DatosPozo from "./DatosPozos";
import { cfgCloacaPorId } from "../../../services/aguas";

const DetallePozos = () => {
  const id = parseInt(useParams().id);
  const tokenAguas = localStorage.getItem("tokenAguas");
  const [detail, setDetail] = useState(null);
  const pozos = useSelector((state) => state.aguas.pozos);
  const pozoEncontrado = pozos.find((pozo) => pozo.id === id);

  const getPozo = async () => {
    let detail;
    const [dataCfg, error] = await cfgCloacaPorId(tokenAguas, id);
    if (dataCfg) {
      detail = dataCfg;
    } else console.error(error);
    await setDetail(detail);
  };

  useEffect(() => {
    if (pozoEncontrado !== undefined) {
      setDetail(pozoEncontrado);
    } else {
      getPozo();
    }
  }, []);

  return (
    <div className="flex flex-col py-4 px-6">
      {detail !== null ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold ml-1">{detail.descripcion}</h1>
          <DatosPozo detail={detail} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DetallePozos;
