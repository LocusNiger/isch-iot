/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { agregarPendiente } from "../../../features/pendientes/pendientesSlice";
import { envioCfgFuncionamiento } from "../../../services/alumbrado";
import TablaPendientes from "../../../components/Pendientes/TablaPendientes";

const ComandoConfiguraciones = () => {
  const token = localStorage.getItem("token");
  const nodos = useSelector((state) => state.luminarias);
  const id = parseInt(useParams().id);
  const dispatch = useDispatch();
  const nodoToUse = nodos.find((nodo) => nodo.nodoId === id);
  const [enviado, setEnviado] = useState(false);

  const handleClickFuncionamiento = async (e) => {
    if (!enviado) {
      setEnviado(!enviado);
      const [data, error] = await envioCfgFuncionamiento(token, id);
      if (data) {
        const cuerpoProceso = {
          data,
          descripcion: "Envío de configuraciones de funcionamiento",
        };
        dispatch(agregarPendiente(cuerpoProceso));
        swal.fire({
          text: "Proceso creado con éxito",
          icon: "success",
          timer: "2500",
        });
      } else {
        swal.fire({
          text: "Ha ocurrido un error",
          icon: "warning",
          timer: "2500",
        });
        console.error(error.response.data);
      }
    } else {
      console.log();
    }
  };
  return (
    <div className="border border-gray-300 collapse collapse-arrow">
      <input type="checkbox" />
      <h3 className="text-xl collapse-title">
        Configuraciones de funcionamiento
      </h3>
      <div className="collapse-content flex flex-col gap-3">
        <div>
          {!enviado ? (
            <button
              className="p-3 hover:font-bold border uppercase border-black hover:bg-black hover:text-white transition-all"
              onClick={handleClickFuncionamiento}
            >
              Enviar configuraciones de funcionamiento
            </button>
          ) : (
            <TablaPendientes />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComandoConfiguraciones;
