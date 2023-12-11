/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import DatosDelNodo from "./DatosDelNodo";
import ComandosDelNodo from "./ComandosDelNodo";
import {
  getEstadoSemaforoIdNodo,
  getNodoPorId,
} from "../../services/alumbrado";

const DetalleNodos = () => {
  const id = parseInt(useParams().id);
  const token = localStorage.getItem("token");
  const [detail, setDetail] = useState(null);
  const nodos = useSelector((state) => state.luminarias);
  const nodoEncontrado = nodos.find((nodo) => nodo.nodoId === id);

  const getNodo = async () => {
    let detail;
    const [dataCfg, error] = await getNodoPorId(token, id);
    if (dataCfg) {
      detail = dataCfg;
    } else console.error(error);
    const [data, error2] = await getEstadoSemaforoIdNodo(token, id);
    if (data) {
      detail.brillo = data.brillo;
      detail.encendido = data.encendido;
      detail.corriente = data.corriente;
      detail.tension = data.tension;
      detail.potencia = data.potencia;
      detail.estadoOpNormal = data.estadoOpNormal;
    } else console.error(error2);
    console.log(detail);
    await setDetail(detail);
  };

  useEffect(() => {
    if (nodoEncontrado !== undefined) {
      setDetail(nodoEncontrado);
    } else {
      getNodo();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col py-4 px-6">
        {detail !== null ? (
          <div className="flex flex-col gap-4">
            <DatosDelNodo detail={detail} />
            <ComandosDelNodo detail={detail} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default DetalleNodos;
