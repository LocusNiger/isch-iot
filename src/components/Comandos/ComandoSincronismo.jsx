/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarPendiente } from "../../features/pendientes/pendientesSlice";
import { setSincronismo } from "../../services/comandos";
import swal from "sweetalert2";

const ComandoSincronismo = () => {
  const dispatch = useDispatch();
  const semaforos = useSelector((state) => state.estadosSemaforos);
  const procesos = useSelector((state) => state.seleccionados.procesos);
  const seleccionados = useSelector(
    (state) => state.seleccionados.semaforosSeleccionados
  );
  const [arraySincronismo, setArraySincronismo] = useState([]);
  const [procesosTemp, setProcesosTemp] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setProcesosTemp(procesos);
  }, []);

  const semaforoDescripcion = (id) => {
    const foundSemaforo = semaforos.find(
      (semaforo) => semaforo.id === parseInt(id)
    );
    if (foundSemaforo) return foundSemaforo.descripcion;
    else return null;
  };

  const handleInputChange = (e, id) => {
    const existe = arraySincronismo.find(
      (comando) => comando.id_semaforo === id
    );
    if (existe) {
      const indice = arraySincronismo.indexOf(existe);
      const temp = [...arraySincronismo];
      if (e.target.name === "indice_secuencia") {
        temp[indice].indice_secuencia = parseInt(e.target.value);
      } else {
        temp[indice].valor = parseInt(e.target.value);
      }
      setArraySincronismo(temp);
    } else {
      setArraySincronismo([
        ...arraySincronismo,
        {
          id_semaforo: id,
          [e.target.name]: parseInt(e.target.value),
        },
      ]);
    }
  };

  const handleSubmitSincronismo = async (e) => {
    e.preventDefault();
    const solicitud = {
      comandos: arraySincronismo,
    };
    swal
      .fire({
        title: "Modificación de sincronismo",
        text: "¿Estás seguro que deseas modificar el sincronismo?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          const [data, error] = await setSincronismo(token, solicitud);
          if (data) {
            console.log(data);
            const cuerpoProceso = {
              data,
              descripcion: "Modificación de sincronismo",
            };
            dispatch(agregarPendiente(cuerpoProceso));
            swal.fire({
              text: "Modificación de sincronismo solicitada",
              icon: "success",
              timer: "2500",
            });
          } else {
            swal.fire({
              icon: "error",
              title: "Error",
              text: "No fue posible modificar el sincronismo",
            });
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
          Modificar sincronismo
        </h3>
        <form
          onSubmit={(e) => handleSubmitSincronismo(e)}
          className="flex flex-col gap-3"
        >
          {seleccionados.map((seleccion) => (
            <>
              <p className="font-semibold">
                Semáforo: {semaforoDescripcion(seleccion)}
              </p>
              <div className="flex justify-between w-full m-b-4">
                <div className="flex flex-col w-2/5">
                  <label
                    htmlFor="indice_secuencia"
                    className="relative block overflow-hidden rounded-md border border-gray-400 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
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
                      Secuencia
                    </span>
                  </label>
                </div>
                <div className="flex flex-col w-2/5">
                  <label
                    htmlFor="valor"
                    className="relative block overflow-hidden rounded-md border border-gray-400 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      type="number"
                      onChange={(e) => handleInputChange(e, seleccion)}
                      name="valor"
                      id="valor"
                      min={1}
                      max={90}
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent text-center focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      required
                    />
                    <span className="absolute left-2 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs ">
                      Sincronismo
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

export default ComandoSincronismo;
