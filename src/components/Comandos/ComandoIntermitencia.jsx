/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarPendiente } from "../../features/pendientes/pendientesSlice";
import { setIntermitencia } from "../../services/comandos";
import swal from "sweetalert2";

const ComandoIntermitencia = () => {
  const seleccionados = useSelector(
    (state) => state.seleccionados.semaforosSeleccionados
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [toggle, setToggle] = useState(false);

  const handleClickIntermitencia = () => {
    let solicitud;
    if (toggle) {
      solicitud = {
        ids_semaforos: seleccionados,
        valor: parseInt(1),
      };
    } else {
      solicitud = {
        ids_semaforos: seleccionados,
        valor: parseInt(0),
      };
    }
    swal
      .fire({
        title: "Forzar intermitencia",
        text: "¿Estás seguro que deseas forzar la intermitencia?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          const [data, error] = await setIntermitencia(token, solicitud);
          if (data) {
            console.log(data);
            const cuerpoProceso = {
              data,
              descripcion: "Cambio de intermitencia",
            };
            dispatch(agregarPendiente(cuerpoProceso));

            swal.fire({
              text: "Modificación de intermitencia solicitada",
              icon: "success",
              timer: "2500",
            });
          } else {
            swal.fire({
              icon: "error",
              title: "Error",
              text: "No fue posible modificar la intermitencia",
            });
            console.error(error.response);
          }
        }
      });
  };

  return (
    <div className="gap-4 flex flex-col items-center mb-2">
      <h3 className="pb-1 text-xl font-semibold">Forzar intermitencia</h3>
      <label
        htmlFor="AcceptConditions"
        className="relative h-8 w-14 cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <input type="checkbox" id="AcceptConditions" className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500" />
        <span className="absolute inset-0 m-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-6" />
      </label>
      <button
        className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
        onClick={handleClickIntermitencia}
        disabled={seleccionados.length === 0}
      >
        Enviar
      </button>
    </div>
  );
};

export default ComandoIntermitencia;
