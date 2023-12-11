/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarPendiente } from "../../features/pendientes/pendientesSlice";
import { modificarHorario } from "../../services/comandos";
import swal from "sweetalert2";

const ComandoSecuencias = () => {
  const dispatch = useDispatch();
  const semaforos = useSelector((state) => state.estadosSemaforos);
  const procesos = useSelector((state) => state.seleccionados.procesos);
  const seleccionados = useSelector(
    (state) => state.seleccionados.semaforosSeleccionados
  );
  const [arrayHorarios, setArrayHorarios] = useState([]);
  const [procesosTemp, setProcesosTemp] = useState(null);
  const token = localStorage.getItem("token");

  const semaforoDescripcion = (id) => {
    const foundSemaforo = semaforos.find(
      (semaforo) => semaforo.id === parseInt(id)
    );
    if (foundSemaforo) return foundSemaforo.descripcion;
    else return null;
  };

  const handleInputChange = (e, id) => {
    const existe = arrayHorarios.find((comando) => comando.id_semaforo === id);
    if (existe) {
      const indice = arrayHorarios.indexOf(existe);
      const temp = [...arrayHorarios];
      if (e.target.name === "indice_horario") {
        temp[indice].indice_horario = parseInt(e.target.value);
      }
      setArrayHorarios(temp);
    } else {
      setArrayHorarios([
        ...arrayHorarios,
        {
          id_semaforo: id,
          [e.target.name]: parseInt(e.target.value),
        },
      ]);
    }
  };

  const handleSubmitSecuencias = async (e) => {
    e.preventDefault();
    const solicitud = {
      comandos: arrayHorarios,
    };
    swal
      .fire({
        title: "Modificación de horarios",
        text: "¿Estás seguro que deseas modificar el horario?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          console.log(solicitud);
          setArrayHorarios([]);
          const [data, error] = await modificarHorario(token, solicitud);
          if (data) {
            console.log(data);
            const cuerpoProceso = {
              data,
              descripcion: "Modificación de horarios",
            };
            dispatch(agregarPendiente(cuerpoProceso));
            swal.fire({
              text: "Modificación de horarios solicitada",
              icon: "success",
              timer: "2500",
            });
          } else {
            swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo realizar la modificación.",
            });
            setArrayHorarios([]);
            console.error(error.response);
          }
          e.target.reset();
        }
      });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center border-t border-black">
        <h3 className="pb-4 font-semibold text-xl pt-4">
          Modificar secuencias
        </h3>
        <form
          onSubmit={(e) => handleSubmitSecuencias(e)}
          className="flex flex-col gap-3"
        >
          {seleccionados.map((seleccion) => (
            <>
              <p className="font-semibold">
                Semáforo: {semaforoDescripcion(seleccion)}
              </p>
              <div className="flex justify-between w-full m-b-4">
                <div className="flex justify-center w-full">
                  <label
                    htmlFor="indice_secuencia"
                    className="relative block overflow-hidden rounded-md border border-gray-400 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 w-4/5"
                  >
                    <input
                      type="number"
                      name="indice_secuencia"
                      onChange={(e) => handleInputChange(e, seleccion)}
                      min={1}
                      max={5}
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent text-center focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      required
                    />
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Índice horario
                    </span>
                  </label>
                </div>
              </div>
            </>
          ))}
          <button
            disabled={seleccionados.length === 0}
            className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default ComandoSecuencias;
