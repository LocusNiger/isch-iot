/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { altaControladorLora, altaUltralight } from "../../services/aguas";
import { setLoraAction, setUltraAction } from "../../features/aguas/aguasSlice";

const AltaControlador = () => {
  const tokenAguas = localStorage.getItem("tokenAguas");
  const tipoControlador = useLocation().state.select;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataInput, setDataInput] = useState({});

  const handleInputChange = (e) => {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "Alta controlador",
        text: "¿Estás seguro que deseas dar de alta un controlador?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Crear",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          if (tipoControlador === "LORA") {
            const cuerpoReq = {
              eui: dataInput.eui,
              nombre: dataInput.nombre,
              descripcion: dataInput.descripcion,
            };
            console.log(cuerpoReq);
            const [dataLora, errorLora] = await altaControladorLora(
              tokenAguas,
              cuerpoReq
            );
            if (dataLora) {
              console.log(dataLora);
              swal.fire({
                text: "Controlador creado con éxito",
                icon: "success",
                timer: "2500",
              });
              await dispatch(setLoraAction(dataLora));
              navigate("/aguas/controladores");
            } else {
              swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible crear el nodo",
              });
              console.error(errorLora);
            }
          } else {
            const cuerpoReq = {
              nombre: dataInput.nombre,
              descripcion: dataInput.descripcion,
              topicoMQTT: dataInput.topico,
            };
            console.log(cuerpoReq);
            const [dataUltra, errorUltra] = await altaUltralight(
              tokenAguas,
              cuerpoReq
            );
            if (dataUltra) {
              console.log(dataUltra);
              swal.fire({
                text: "Controlador creado con éxito",
                icon: "success",
                timer: "2500",
              });
              await dispatch(setUltraAction(dataUltra));
              navigate("/aguas/controladores");
            } else {
              swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible crear el nodo",
              });
              console.error(errorUltra);
            }
          }
        }
      });
  };

  return (
    <>
      <h1>Alta de controlador {tipoControlador}</h1>

      {tipoControlador === "LORA" ? (
        <form className="flex flex-col items-center justify-center w-1/2 p-5 border-2 rounded-md shadow gap-5">
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
          <div className="w-full flex justify-evenly">
            <button
              className="w-2/5 rounded-md border p-2.5 mt-1.5 hover:bg-red-200"
              onClick={() => navigate("/aguas/controladores")}
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
      ) : (
        <form className="flex flex-col items-center justify-center w-1/2 p-5 border-2 rounded-md shadow gap-5">
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
          <label
            htmlFor="topico"
            className="w-4/5 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              placeholder="Tópico MQTT"
              onChange={handleInputChange}
              name="topico"
              required="required"
              value={dataInput.topico}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              Tópico MQTT
            </span>
          </label>
          <div className="w-full flex justify-evenly">
            <button
              className="w-2/5 rounded-md border p-2.5 mt-1.5 hover:bg-red-200"
              onClick={() => navigate("/aguas/controladores")}
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
      )}
    </>
  );
};

export default AltaControlador;
