/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { eliminarNodo, getConfiguracionNodos } from "../../services/alumbrado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { stateColor } from "../Map/Map";
import { deleteNodoAction } from "../../features/luminarias/luminariasSlice";

const TablaNodos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nodos = useSelector((state) => state.luminarias);
  const [nodosToUse, setNodosToUse] = useState(null);
  const token = localStorage.getItem("token");

  const getNodos = async () => {
    const [data, error] = await getConfiguracionNodos(token);
    if (data) {
      setNodosToUse(data);
    } else console.error(error);
  };

  useEffect(() => {
    if (nodos.length !== 0) {
      setNodosToUse(nodos);
    } else {
      getNodos();
    }
  }, [nodos]);

  setTimeout(() => {
    if (nodos.length !== 0) {
      setNodosToUse(nodos);
    } else {
      getNodos();
    }
  }, 5000);

  const handleDetail = (id) => {
    navigate(`/luminaria/nodos/detalle/${id}`);
  };

  const handleDelete = async (id) => {
    swal
      .fire({
        title: "Eliminar nodo",
        text: `¿Estás seguro que deseas eliminar el nodo ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          const [data, error] = await eliminarNodo(token, id);
          if (error) {
            swal.fire({
              text: "Ha ocurrido un error",
              icon: "warning",
              timer: "2500",
            });
            console.error(error.response.data);
          } else {
            await dispatch(deleteNodoAction(id));
            swal.fire({
              text: "Nodo eliminado con éxito",
              icon: "success",
              timer: "2500",
            });
          }
        }
      });
  };
  const handleAddNodo = () => {
    navigate("/luminaria/nodos/crear");
  };

  return (
    <>
      {nodosToUse !== null ? (
        <div id="table" className="flex justify-center ">
          <div className="my-8 flex items-center justify-center flex-col w-4/5">
            <div className="flex w-full justify-between items-center mb-7">
              <div className="w-full">
                <h1 className="text-2xl font-semibold text-center">Nodos</h1>
              </div>
              <div
                className="badge badge-primary py-3 cursor-pointer w-1/5 hover:bg-blue-700"
                onClick={() => handleAddNodo()}
              >
                Agregar nodo <span className="font-bold text-2xl ml-1">+</span>
              </div>
            </div>
            <table className="min-w-full border-collapse shadow rounded-md overflow-hidden box-border">
              <thead>
                <tr>
                  <th className="p-2.5 bg-gray-50">#</th>
                  <th className="p-2.5 bg-gray-50">Nombre</th>
                  <th className="p-2.5 bg-gray-50">Descripción</th>
                  <th className="p-2.5 bg-gray-50">Estado</th>
                  <th className="p-2.5 bg-gray-50">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {nodosToUse.map((nodo) => (
                  <tr className="text-center" key={nodo.latitud}>
                    <td className="p-2.5 ">{nodo.nodoId}</td>
                    <td className="p-2.5 ">Nodo {nodo.nombre}</td>
                    <td className="p-2.5 ">{nodo.descripcion}</td>
                    <td className="p-2.5 ">{stateColor(nodo.simulacion)}</td>
                    <td className="flex items-center justify-evenly p-2.5 gap-2">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        onClick={() => handleDetail(nodo.nodoId)}
                        style={{ cursor: "pointer" }}
                      />
                      <Link
                        to={`/luminaria/nodos/editar/${nodo.nodoId}`}
                        state={nodo}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Link>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleDelete(parseInt(nodo.nodoId))}
                        style={{ cursor: "pointer" }}
                        className="hover:text-xl transition-all"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TablaNodos;
