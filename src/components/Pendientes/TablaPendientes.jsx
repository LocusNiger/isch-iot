/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { deleteEstadoAction } from "../../features/estadosSemaforos/estadosSemaforosSlice";
import { eliminarPendiente } from "../../features/pendientes/pendientesSlice";
import {
  addSemaforoAction,
  deleteSemaforoAction,
} from "../../features/semaforos/semaforosSlice";
import { consultarProcesoCfgFuncionamiento } from "../../services/alumbrado";
import { getEstadoProcesoPorId } from "../../services/comandos";
import {
  consultarEstadoProceso,
  getSemaforoDetail,
} from "../../services/getSemaforos";
import Swal from "sweetalert2";

const TablaPendientes = () => {
  const token = localStorage.getItem("token");
  const [pendientes, setPendientes] = useState(null);
  const [procesosToUse, setProcesosToUse] = useState(null);
  const pendientesRedux = useSelector((state) => state.pendientes);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = useParams().id;

  const filtrarPendientes = (pendientes) => {
    switch (location.pathname) {
      case "/devices":
        setProcesosToUse(
          pendientes.filter((proceso) => {
            return (
              proceso.descripcion === "Alta de semáforo" ||
              proceso.descripcion === "Eliminación de semáforo"
            );
          })
        );
        break;
      case "/comandos":
        setProcesosToUse(
          pendientes.filter((proceso) => {
            return (
              proceso.descripcion === "Cambio de intermitencia" ||
              proceso.descripcion === "Modificación de sincronismo"
            );
          })
        );
        break;
      case `/detail/${id}`:
        setProcesosToUse(
          pendientes.filter((proceso) => {
            return (
              proceso.descripcion === "Modificación de horarios" ||
              proceso.descripcion === "Modificación de secuencia"
            );
          })
        );
        break;
      case `/luminaria/nodos/detalle/${id}`:
        setProcesosToUse(
          pendientes.filter((proceso) => {
            return (
              proceso.descripcion ===
              "Envío de configuraciones de funcionamiento"
            );
          })
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setPendientes(pendientesRedux);
    if (pendientesRedux !== null && pendientesRedux.length > 0) {
      filtrarPendientes(pendientesRedux);
    }
  }, [pendientesRedux]);

  const consultarEstado = async (proceso) => {
    const PROCESOS = {
      "Alta de semáforo": async () => {
        const [data, error] = await consultarEstadoProceso(
          token,
          proceso.idProceso
        );
        if (data && data.estado === "PROCESADO_CORRECTAMENTE") {
          const [dataNuevo, errorNuevo] = await getSemaforoDetail(
            token,
            data.id_semaforo
          );
          dispatch(addSemaforoAction(dataNuevo));
          dispatch(eliminarPendiente(proceso.idProceso));
          Swal.fire({
            text: "Semáforo creado con éxito",
            icon: "success",
            timer: "2500",
          });
        } else console.error(error.response.data);
      },

      "Eliminación de semáforo": async () => {
        const [data, error] = await consultarEstadoProceso(
          token,
          proceso.idProceso
        );
        if (data && data.estado === "PROCESADO_CORRECTAMENTE") {
          dispatch(eliminarPendiente(proceso.idProceso));
          dispatch(deleteSemaforoAction(data.id_semaforo));
          dispatch(deleteEstadoAction(data.id_semaforo));
          Swal.fire({
            text: "Semáforo eliminado",
            icon: "success",
            timer: "2500",
          });
        } else if (error) {
          dispatch(eliminarPendiente(proceso.idProceso));
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No fue posible eliminar el semáforo",
          });
        }
      },

      "Cambio de intermitencia": async () => {
        const [data, error] = await getEstadoProcesoPorId(
          token,
          proceso.idProceso
        );
        if (data) {
          console.log(data);
          if (data.estado_proceso === "ERROR_PROCESO") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No fue posible modificar la intermitencia",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estadoProceso === "PROCESO_OK") {
            Swal.fire({
              text: "Modificación de intermitencia realizada",
              icon: "success",
              timer: "2500",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estado_proceso === "PROCESANDO") {
            Swal.fire({
              text: "La solicitud se está procesando",
              timer: "2500",
            });
          }
        } else {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No fue posible modificar la intermitencia",
          });
        }
      },

      "Modificación de sincronismo": async () => {
        const [data, error] = await getEstadoProcesoPorId(
          token,
          proceso.idProceso
        );
        if (data) {
          console.log(data);
          if (data.estado_proceso === "ERROR_PROCESO") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No fue posible modificar el sincronismo",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estadoProceso === "PROCESO_OK") {
            Swal.fire({
              text: "Modificación de sincronismo realizada",
              icon: "success",
              timer: "2500",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estado_proceso === "PROCESANDO") {
            Swal.fire({
              text: "La solicitud se está procesando",
              timer: "2500",
            });
          }
        } else {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No fue posible modificar el sincronismo",
          });
        }
      },

      "Modificación de horarios": async () => {
        const [data, error] = await getEstadoProcesoPorId(
          token,
          proceso.idProceso
        );
        if (data) {
          console.log(data);
          if (data.estado_proceso === "ERROR_PROCESO") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No fue posible modificar el horario",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estadoProceso === "PROCESO_OK") {
            Swal.fire({
              text: "Modificación de horario realizada",
              icon: "success",
              timer: "2500",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estado_proceso === "PROCESANDO") {
            Swal.fire({
              text: "La solicitud se está procesando",
              timer: "2500",
            });
          }
        } else {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No fue posible modificar el horario",
          });
        }
      },
      "Modificación de secuencia": async () => {
        const [data, error] = await getEstadoProcesoPorId(
          token,
          proceso.idProceso
        );
        if (data) {
          console.log(data);
          if (data.estado_proceso === "ERROR_PROCESO") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No fue posible modificar la secuencia",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estadoProceso === "PROCESO_OK") {
            Swal.fire({
              text: "Modificación de secuencia realizada",
              icon: "success",
              timer: "2500",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estado_proceso === "PROCESANDO") {
            Swal.fire({
              text: "La solicitud se está procesando",
              timer: "2500",
            });
          }
        } else {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No fue posible modificar la secuencia",
          });
        }
      },

      "Envío de configuraciones de funcionamiento": async () => {
        const [data, error] = await consultarProcesoCfgFuncionamiento(
          token,
          proceso.hrefProceso
        );
        if (data) {
          console.log(data);
          if (data.estado === "ERROR_PROCESO") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No fue posible enviar las configuraciones de funcionamiento",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estado === "PROCESO_OK") {
            Swal.fire({
              text: "Envío de configuraciones de funcionamiento realizado",
              icon: "success",
              timer: "2500",
            });
            dispatch(eliminarPendiente(proceso.idProceso));
          } else if (data.estado === "EN_PROCESO") {
            Swal.fire({
              text: "La solicitud se está procesando",
              timer: "2500",
            });
          }
        } else {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No fue posible enviar las configuraciones de funcionamiento",
          });
        }
      },
    };
    PROCESOS[proceso.descripcion]
      ? PROCESOS[proceso.descripcion]()
      : console.log("Something");
  };

  const textoProceso = (estado) => {
    switch (estado) {
      case "EN_PROCESO":
        return "En proceso";
      case "PROCESADO_CORRECTAMENTE":
        return "Procesado correctamente";
      default:
        break;
    }
  };

  return (
    <>
      {procesosToUse !== null && procesosToUse.length > 0 ? (
        <div id="table" className="flex justify-center ">
          <div className="my-8 flex items-center justify-center flex-col w-4/5">
            <div className="flex w-full justify-between items-center mb-7">
              <h1 className="text-2xl font-semibold text-center">
                Procesos pendientes
              </h1>
            </div>
            <table className="min-w-full border-collapse shadow rounded-md overflow-hidden box-border">
              <thead>
                <tr>
                  <th className="p-2.5 bg-gray-200">Descripción</th>
                  <th className="p-2.5 bg-gray-200">Estado</th>
                  <th className="p-2.5 bg-gray-200">Consultar</th>
                </tr>
              </thead>
              <tbody>
                {procesosToUse.map((proceso) => (
                  <tr className="text-center" key={proceso.idProceso}>
                    <td className="p-2.5 ">{proceso.descripcion}</td>
                    <td className="p-2.5">{textoProceso(proceso.estado)}</td>
                    <td className="flex items-center justify-evenly p-2.5">
                      <button
                        className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-all "
                        onClick={() => consultarEstado(proceso)}
                      >
                        Consultar estado
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h3 className="font-semibold">No existen procesos pendientes</h3>
        </div>
      )}
    </>
  );
};

export default TablaPendientes;
