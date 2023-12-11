/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleInfo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { stateColor } from "../Map/Map";
import TablaPendientes from "../Pendientes/TablaPendientes";
import swal from "sweetalert2";
import { deleteSemaforoThunk } from "../../features/semaforos/thunks";
import { agregarPendiente } from "../../features/pendientes/pendientesSlice";

const Devices = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const semaforos = useSelector((state) => state.semaforos);
  const [semaforosToUse, setSemaforosToUse] = useState(null);

  useEffect(() => {
    setSemaforosToUse(semaforos);
  }, [semaforos]);

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleAddSemaforo = () => {
    navigate("/semaforos/crear");
  };

  const handleDelete = (id, e) => {
    swal
      .fire({
        title: "Eliminar semáforo",
        text: `¿Estás seguro que deseas eliminar el semáforo ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          const fila = e.target.parentElement.parentElement.parentElement;
          const [data, error] = await dispatch(deleteSemaforoThunk(token, id));
          if (data) {
            const cuerpoProceso = {
              data,
              descripcion: "Eliminación de semáforo",
            };
            dispatch(agregarPendiente(cuerpoProceso));
            fila.setAttribute("style", "display: none");
            swal.fire({
              text: "Proceso creado con éxito",
              icon: "success",
              timer: "2500",
            });
          } else {
            swal.fire({
              text: "Ha ocurrido un error",
              icon: "warning",
              timer: "2500",
            });
            console.error(error.response.data);
          }
        }
      });
  };

  return (
    <>
      {semaforosToUse !== null ? (
        <>
          <div id="table" className="flex justify-center ">
            <div className="my-8 flex items-center justify-center flex-col w-11/12 lg:w-4/5">
              <div className="flex w-full justify-between items-center mb-7">
                <div className="w-full">
                  <h1 className="text-2xl font-semibold text-center">
                    Dispositivos
                  </h1>
                </div>
                <div
                  className="badge badge-primary py-5 lg:py-3 cursor-pointer lg:w-1/5 hover:bg-blue-700"
                  onClick={() => handleAddSemaforo()}
                >
                  Agregar semáforo{" "}
                  <span className="font-bold text-2xl ml-1">+</span>
                </div>
              </div>
              <table className="min-w-full border-collapse shadow rounded-md overflow-hidden box-border">
                <thead>
                  <tr>
                    <th className="p-2.5 bg-gray-50">#</th>
                    <th className="p-2.5 bg-gray-50">Descripción</th>
                    <th className="p-2.5 bg-gray-50">Estado</th>
                    <th className="p-2.5 bg-gray-50">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {semaforosToUse.map((semaforo) => (
                    <tr className="text-center" key={semaforo.configuracion.id}>
                      <td className="p-2.5 ">{semaforo.configuracion.id}</td>
                      <td className="p-2.5">
                        {semaforo.configuracion.descripcion}
                      </td>
                      <td className="p-2.5">
                        {stateColor(semaforo.estadoDispositivo)}
                      </td>
                      <td className="flex items-center justify-evenly p-2.5">
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          className="hover:text-2xl transition-all"
                          onClick={() =>
                            handleDetail(semaforo.configuracion.id)
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <Link
                          to={`/form/${semaforo.configuracion.id}`}
                          state={semaforo}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="hover:text-xl transition-all"
                          />
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={(e) =>
                            handleDelete(parseInt(semaforo.configuracion.id), e)
                          }
                          style={{ cursor: "pointer" }}
                          className="hover:text-2xl transition-all"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <TablaPendientes />
        </>
      ) : (
        <>
          <Loader />
          <TablaPendientes />
        </>
      )}
    </>
  );
};

export default Devices;
