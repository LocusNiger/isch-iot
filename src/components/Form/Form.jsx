import { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { editSemaforo } from "../../services/editSemaforo";
import { useDispatch, useSelector } from "react-redux";
import { editSemaforoAction } from "../../features/semaforos/semaforosSlice"; //eslint-disable-line
import { getConfiguracionSemaforo } from "../../services/getSemaforos";
import swal from "sweetalert2";
import Loader from "../Loader/Loader";
import { actualizarEstadoAction } from "../../features/estadosSemaforos/estadosSemaforosSlice";
import { createSemaforoThunk } from "../../features/semaforos/thunks";
import { agregarPendiente } from "../../features/pendientes/pendientesSlice";

const Form = () => {
  const token = localStorage.getItem("token");
  const id = parseInt(useParams().id);
  const semaforos = useSelector((state) => state.semaforos);
  const foundSemaforo = semaforos.find((semaforo) => semaforo.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataInput, setDataInput] = useState({});

  const getData = async () => {
    const [data, error] = await getConfiguracionSemaforo(token, id);
    if (data) {
      setDataInput(data);
    } else console.error(error);
  };

  useEffect(() => {
    if (id && foundSemaforo !== undefined) {
      setDataInput(foundSemaforo);
    } else if (id && foundSemaforo === undefined) {
      getData();
    } else {
      console.log("Crear semáforo");
    }
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === "simulacion") {
      setDataInput({
        ...dataInput,
        [e.target.name]: e.target.checked,
      });
    } else {
      setDataInput({
        ...dataInput,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (id) {
      swal
        .fire({
          title: "Editar semáforo",
          text: "¿Estás seguro que deseas actualizar la configuración?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Guardar cambios",
          cancelButtonText: "Cancelar",
        })
        .then(async (respuesta) => {
          if (respuesta.isConfirmed) {
            const [data, error] = await editSemaforo(token, id, dataInput);
            if (data) {
              await dispatch(editSemaforoAction(dataInput));
              await dispatch(actualizarEstadoAction(dataInput));
              swal.fire({
                text: "Configuración actualizada con éxito",
                icon: "success",
                timer: "2500",
              });
              navigate("/devices");
            } else {
              swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible actualizar la configuración",
              });
              console.error(error);
            }
          }
        });
    } else {
      swal
        .fire({
          title: "Añadir semáforo",
          text: "¿Estás seguro que deseas añadir un nuevo semáforo?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Añadir",
          cancelButtonText: "Cancelar",
        })
        .then(async (respuesta) => {
          if (respuesta.isConfirmed) {
            const cuerpoReq = {
              eui: dataInput.eui,
              ip: dataInput.ip,
              latitud: dataInput.latitud,
              longitud: dataInput.longitud,
              nombre: dataInput.nombre,
              descripcion: dataInput.descripcion,
              simulacion: dataInput.simulacion,
            };
            const [data, error] = await dispatch(
              createSemaforoThunk(token, cuerpoReq)
            );
            if (data) {
              const cuerpoProceso = {
                data,
                descripcion: "Alta de semáforo",
              };
              dispatch(agregarPendiente(cuerpoProceso));
              swal.fire({
                text: "Proceso creado con éxito",
                icon: "success",
                timer: "2500",
              });
              navigate("/devices");
            } else {
              swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible crear el semáforo",
              });
              console.error(error.response.data);
            }
          }
        });
    }
  };

  return dataInput !== undefined ? (
    <div>
      <div className="flex flex-col items-center justify-center m-t-20 mb-10 w-full h-full">
        <h1 className="text-2xl my-8 font-semibold">
          {id ? `Editar dispositivo - ID: ${id}` : `Agregar semáforo`}
        </h1>
        <form className="flex flex-col items-center justify-center w-4/5 lg:w-1/2 p-5 border-2 rounded-md shadow gap-5">
          <label
            htmlFor="eui"
            className="w-4/5 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              placeholder="Eui"
              onChange={handleInputChange}
              name="eui"
              required="required"
              value={dataInput.eui}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              EUI
            </span>
          </label>
          <label
            htmlFor="ip"
            className="w-4/5 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              placeholder="Ip"
              onChange={handleInputChange}
              name="ip"
              required="required"
              value={dataInput.ip}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              IP
            </span>
          </label>
          <label
            htmlFor="latitud"
            className="w-4/5 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              placeholder="Latitud"
              onChange={handleInputChange}
              name="latitud"
              required="required"
              value={dataInput.latitud}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              Latitud
            </span>
          </label>
          <label
            htmlFor="longitud"
            className="w-4/5 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              placeholder="Longitud"
              onChange={handleInputChange}
              name="longitud"
              required="required"
              value={dataInput.longitud}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              Longitud
            </span>
          </label>
          <label
            className="w-4/5 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            htmlFor="nombre"
          >
            <input
              type="text"
              placeholder="Nombre"
              onChange={handleInputChange}
              name="nombre"
              required="required"
              value={dataInput.nombre}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              Nombre
            </span>
          </label>

          <label
            htmlFor="descripcion"
            className="w-4/5 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              placeholder="Descripción"
              onChange={handleInputChange}
              name="descripcion"
              required="required"
              value={dataInput.descripcion}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              Descripción
            </span>
          </label>
          <div className="flex gap-2">
            <label>Simulación</label>
            <input
              type="checkbox"
              name="simulacion"
              onChange={handleInputChange}
              checked={dataInput.simulacion}
            />
          </div>
          <div className="w-full flex justify-evenly">
            <button
              className="w-2/5 rounded-md border p-2.5 mt-1.5 hover:bg-red-200"
              onClick={() => navigate("/devices")}
            >
              Atrás
            </button>
            <button
              className="w-2/5 rounded-md border p-2.5 mt-1.5 hover:bg-blue-200"
              onClick={handleSubmitForm}
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Form;
