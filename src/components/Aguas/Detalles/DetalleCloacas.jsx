/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import DatosCloacas from "./DatosCloacas";
import { cfgCloacaPorId } from "../../../services/aguas";

const DetalleCloacas = () => {
  const id = parseInt(useParams().id);
  const tokenAguas = localStorage.getItem("tokenAguas");
  const [detail, setDetail] = useState(null);
  const cloacas = useSelector((state) => state.aguas.cloacas);
  const cloacaEncontrada = cloacas.find((cloaca) => cloaca.id === id);

  const getCloaca = async () => {
    let detail;
    const [dataCfg, error] = await cfgCloacaPorId(tokenAguas, id);
    if (dataCfg) {
      detail = dataCfg;
    } else console.error(error);
    await setDetail(detail);
  };

  useEffect(() => {
    if (cloacaEncontrada !== undefined) {
      setDetail(cloacaEncontrada);
    } else {
      getCloaca();
    }
  }, []);

  return (
    <div className="flex flex-col py-4 px-6">
      {detail !== null ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold ml-1">{detail.descripcion}</h1>
          <DatosCloacas detail={detail} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DetalleCloacas;
