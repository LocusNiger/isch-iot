/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modificarModoAction } from "../../../features/luminarias/luminariasSlice";
import swal from "sweetalert2";
import { editModoNodo } from "../../../services/alumbrado";
import { useParams } from "react-router-dom";

const ComandoModo = () => {
  const nodos = useSelector((state) => state.luminarias);
  const id = useParams().id;
  const nodoToUse = nodos.find((nodo) => nodo.nodoId === parseInt(id));
  const dispatch = useDispatch();
  const [modo, setModo] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {}, [nodoToUse]);

  const handleSelectChangeModo = (e) => {
    setModo({ modo: parseInt(e.target.value) });
  };

  const handleSubmitModo = async (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "Modificación de modo de funcionamiento de nodo",
        text: "¿Estás seguro que deseas modificar el modo de funcionamiento del nodo?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          const [data, error] = await editModoNodo(
            token,
            nodoToUse.nodoId,
            modo
          );
          if (data) {
            swal.fire({
              text: "Modificación de modo de funcionamiento realizada",
              icon: "success",
              timer: "2500",
            });
            dispatch(modificarModoAction(data));
          } else {
            console.error(error);
          }
        }
      });
  };
  return (
    <div className="border border-gray-300 collapse collapse-arrow">
      <input type="checkbox" />
      <h3 className="text-xl collapse-title">
        Modificación de modo de funcionamiento de nodo
      </h3>
      <div className="collapse-content flex flex-col gap-3">
        <p className="text-xs">
          Modo actual: <span className="font-bold">{nodoToUse.modo}</span>
        </p>
        <div className="flex gap-4 h-12 w-full">
          <form onSubmit={handleSubmitModo} className="flex gap-14 w-full">
            <select
              className="p-2 border w-4/12"
              onChange={handleSelectChangeModo}
              required
            >
              <option value="1">Fotocélula</option>
              <option value="2">Forzado</option>
              <option value="3">Estrategias</option>
            </select>
            <button
              type="button"
              className="px-6 hover:font-bold border uppercase border-black hover:bg-black hover:text-white transition-all"
            >
              Cambiar modo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComandoModo;
