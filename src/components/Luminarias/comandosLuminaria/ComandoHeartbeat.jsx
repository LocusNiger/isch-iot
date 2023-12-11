/* eslint-disable no-unused-vars */
import swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { edicionHeartbeat } from "../../../services/alumbrado";
import { modificarHeartbeatAction } from "../../../features/luminarias/luminariasSlice";

const ComandoHeartbeat = () => {
  const nodos = useSelector((state) => state.luminarias);
  const id = useParams().id;
  const nodoToUse = nodos.find((nodo) => nodo.nodoId === parseInt(id));
  const dispatch = useDispatch();
  const [heartbeat, setHeartbeat] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {}, [nodoToUse]);

  const handleChangeHeartbeat = (e) => {
    const nuevoValor = parseInt(e.target.value);
    if (nuevoValor) setHeartbeat({ intervalo: nuevoValor });
  };

  const handleSubmitHeartbeat = async (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "Edición de intervalo de heartbeat",
        text: "¿Estás seguro que deseas modificar el intervalo de heartbeat?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          const [data, error] = await edicionHeartbeat(
            token,
            nodoToUse.nodoId,
            heartbeat
          );
          if (data) {
            swal.fire({
              text: "Edición de intervalo de heartbeat realizada",
              icon: "success",
              timer: "2500",
            });
            dispatch(modificarHeartbeatAction(data));
          } else {
            console.error(error);
          }
        }
      });
    e.target.reset();
  };
  return (
    <div className="border border-gray-300 collapse collapse-arrow ">
      <input type="checkbox" />
      <h3 className="text-xl collapse-title">
        Edición de intervalo de heartbeat
      </h3>
      <div className="collapse-content">
        <form className="flex gap-14 w-full " onSubmit={handleSubmitHeartbeat}>
          <input
            type="number"
            onChange={handleChangeHeartbeat}
            placeholder="Ingrese el valor en segundos"
            className="text-center p-2 border w-4/12"
            min={60}
            max={300}
            required
          />
          <button className="px-6 hover:font-bold border uppercase border-black hover:bg-black hover:text-white transition-all ">
            Modificar heartbeat
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComandoHeartbeat;
