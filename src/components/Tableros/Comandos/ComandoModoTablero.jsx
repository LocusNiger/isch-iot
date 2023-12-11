/* eslint-disable no-unused-vars */
import swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { edicionCfgTableroPorId } from "../../../services/tableros";
import { handleModoOp } from "../DatosTablero";

const ComandoModoTablero = () => {
  const tableros = useSelector((state) => state.tableros.tableros);
  const id = useParams().id;
  const tableroToUse = tableros.find((tablero) => tablero.id === parseInt(id));
  const dispatch = useDispatch();
  const [tablero, setTablero] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {}, [tableroToUse]);

  const handleChangeModo = (e) => {
    const nuevoValor = parseInt(e.target.value);
    if (nuevoValor) setTablero({ modo: nuevoValor });
    console.log(tablero);
  };

  const handleSubmitChangeModo = async (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "Edición de modo de tablero",
        text: "¿Estás seguro que deseas modificar el modo del tablero?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          console.log(tablero);
          const [data, error] = await edicionCfgTableroPorId(
            token,
            id,
            tablero
          );
          if (data) {
            swal.fire({
              text: "Edición del modo del realizada",
              icon: "success",
              timer: "2500",
            });
            console.log(data);
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
      <h3 className="text-xl collapse-title">Edición del modo del tablero</h3>
      <div className="collapse-content">
        <p className="text-xs">
          Modo actual:{" "}
          <span className="font-bold">{handleModoOp(tableroToUse.modoOp)}</span>
        </p>
        <form className="flex gap-14 w-full " onSubmit={handleSubmitChangeModo}>
          <select
            name="modo"
            onChange={handleChangeModo}
            className="p-2 border w-4/12"
            required
          >
            <option value={0}>Fotocélula</option>
            <option value={1}>Calendario</option>
            <option value={2}>Forzado de tablero externo</option>
            <option value={3}>Calendario solar</option>
          </select>
          <button className="px-6 hover:font-bold border uppercase border-black hover:bg-black hover:text-white transition-all">
            Modificar el modo
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComandoModoTablero;
