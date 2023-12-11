/* eslint-disable no-unused-vars */
import swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { edicionValorForzado } from "../../../services/alumbrado";
import { modificarValorForzadoAction } from "../../../features/luminarias/luminariasSlice";

const ComandoValorForzado = () => {
  const nodos = useSelector((state) => state.luminarias);
  const id = useParams().id;
  const nodoToUse = nodos.find((nodo) => nodo.nodoId === parseInt(id));
  const dispatch = useDispatch();
  const [forzado, setForzado] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {}, [nodoToUse]);

  const handleChangeValorForzado = (e) => {
    switch (e.target.name) {
      case "valorForzado":
        setForzado({ ...forzado, [e.target.name]: e.target.checked });
        break;
      case "porcentajeForzado":
        setForzado({ ...forzado, [e.target.name]: parseInt(e.target.value) });
        break;
      default:
        break;
    }
  };

  const handleSubmitValorForzado = async (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "Edición de valores de forzado",
        text: "¿Estás seguro que deseas modificar el valor de forzado del nodo?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          console.log(forzado);
          const [data, error] = await edicionValorForzado(
            token,
            nodoToUse.nodoId,
            forzado
          );
          if (data) {
            swal.fire({
              text: "Edición de valores de forzado realizada",
              icon: "success",
              timer: "2500",
            });
            dispatch(modificarValorForzadoAction(data));
          } else {
            console.error(error);
          }
        }
      });
    e.target.reset();
  };
  return (
    <div className="border border-gray-300 collapse collapse-arrow">
      <input type="checkbox" />
      <h3 className="text-xl collapse-title">Edición de valores de forzado</h3>
      <div className="collapse-content flex flex-col gap-3">
        <form
          className="flex gap-14 w-full"
          onSubmit={handleSubmitValorForzado}
        >
          <input
            type="number"
            name="porcentajeForzado"
            onChange={handleChangeValorForzado}
            placeholder="Porcentaje de brillo forzado"
            className="p-2 border w-4/12 text-center"
            min={0}
            max={100}
            required
          />
          <div className="flex flex-col items-center justify-between">
            <label htmlFor="valorForzado">Valor forzado</label>
            <input
              className="w-5 h-5"
              id="valorForzado"
              type="checkbox"
              name="valorForzado"
              onChange={handleChangeValorForzado}
              required
            />
          </div>
          <button className="px-6 hover:font-bold border uppercase border-black hover:bg-black hover:text-white transition-all ">
            Modificar valor de forzado
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComandoValorForzado;
