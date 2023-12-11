/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { cfgLoraPorId, cfgUltralightPorId } from "../../../services/aguas";
import DatosControladores from "./DatosControladores";

const DetalleControladores = () => {
  const id = parseInt(useParams().id);
  const tipoControlador = useParams().controlador;
  const tokenAguas = localStorage.getItem("tokenAguas");
  const [detail, setDetail] = useState(null);
  const ultraLight = useSelector(
    (state) => state.aguas.controladoresUltralight
  );
  const controladoresLora = useSelector(
    (state) => state.aguas.controladoresLora
  );
  const loraEncontrado = controladoresLora.find((lora) => lora.id === id);
  const ultraEncontrado = ultraLight.find((ultra) => ultra.id === id);

  const getControlador = async () => {
    let detail;
    if (tipoControlador === "LORA") {
      const [dataCfg, error] = await cfgLoraPorId(tokenAguas, id);
      if (dataCfg) {
        detail = dataCfg;
      } else console.error(error);
      await setDetail(detail);
    } else {
      const [dataCfg, error] = await cfgUltralightPorId(tokenAguas, id);
      if (dataCfg) {
        detail = dataCfg;
      } else console.error(error);
      await setDetail(detail);
    }
  };

  const params = useParams();

  useEffect(() => {
    if (tipoControlador === "LORA") {
      if (loraEncontrado !== undefined) {
        setDetail(loraEncontrado);
      } else {
        getControlador();
      }
    } else {
      if (ultraEncontrado !== undefined) {
        setDetail(ultraEncontrado);
      } else {
        getControlador();
      }
    }
  }, []);
  return (
    <div className="flex flex-col py-4 px-6">
      {detail !== null ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold ml-1">{detail.descripcion}</h1>
          <DatosControladores detail={detail} controlador={tipoControlador} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DetalleControladores;
