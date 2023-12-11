/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEstadoAction,
  editSecuenciaAction,
  deleteEstadoAction,
} from "../../features/semaforos/semaforosSlice";
import {
  addEstadoThunk,
  addSalidaThunk,
  deleteSalidaThunk,
  secuenciaThunk,
} from "../../features/semaforos/thunks";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import ModalEstado from "../Modal/ModalEstado";
import swal from "sweetalert2";
import { deleteEstado } from "../../services/editEstado";
import { getSecuenciaPorId } from "../../services/getSemaforos";

const Secuencia = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const semaforoId = parseInt(useParams().id);
  const secuenciaId = parseInt(useParams().secuenciaId);
  const allSemaforos = useSelector((state) => state.semaforos);
  const semaforoToUse = allSemaforos.filter(
    (semaforo) => semaforo.configuracion.id === semaforoId
  );
  const allSecuencias = semaforoToUse[0].configuracion.secuencias;

  const [secuenciaToUse, setSecuenciaToUse] = useState(null);

  const [estadosToUse, setEstadosToUse] = useState(null);
  const [salidasToUse, setSalidasToUse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEstado, setIsOpenEstado] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState(null);

  const cargarSecuencia = async () => {
    const foundSecuencia = allSecuencias.find(
      (secuencia) => secuencia.id === secuenciaId
    );
    if (foundSecuencia) {
      setSecuenciaToUse(foundSecuencia);
      setEstadosToUse(foundSecuencia.estados);
      setNuevoEstado({
        salidas: foundSecuencia.estados[0].salidas,
        tiempo: foundSecuencia.estados[0].tiempo,
      });
      const salidasTemp = [];
      foundSecuencia.estados.forEach((estado) => {
        if (salidasTemp.length <= foundSecuencia.estados.length) {
          salidasTemp.push(estado.salidas);
        }
      });
      setSalidasToUse(salidasTemp);
    } else {
      const [data, error] = await getSecuenciaPorId(
        token,
        semaforoId,
        secuenciaId
      );
      if (data) {
        setSecuenciaToUse(data);
        setEstadosToUse(data.estados);
        setNuevoEstado({
          salidas: data.estados[0].salidas,
          tiempo: data.estados[0].tiempo,
        });
        const salidasTemp = [];
        data.estados.forEach((estado) => {
          if (salidasTemp.length <= data.estados.length) {
            salidasTemp.push(estado.salidas);
          }
        });
        setSalidasToUse(salidasTemp);
      }
    }
  };

  useEffect(() => {
    cargarSecuencia();
  }, [secuenciaToUse]);

  const handleClickModal = () => {
    setIsOpen(!isOpen);
  };

  const actualizarSalida = (nuevaSalida, indice) => {
    const salidasTemp = [...salidasToUse];
    salidasTemp[indice] = nuevaSalida;
    setSalidasToUse(salidasTemp);
  };

  const actualizarEstado = (nuevaSalida, estadoId) => {
    setEstadosToUse(
      estadosToUse.map((estado) =>
        estado.id === estadoId
          ? {
              ...estado,
              salidas: nuevaSalida,
            }
          : {
              ...estado,
            }
      )
    );
  };

  const actualizarTiempo = (nuevoTiempo, estadoId) => {
    setEstadosToUse(
      estadosToUse.map((estado) =>
        estado.id === estadoId
          ? {
              ...estado,
              tiempo: nuevoTiempo,
            }
          : {
              ...estado,
            }
      )
    );
  };

  const handleInputChange = (e, index, estadoIndice, estadoId) => {
    estadoIndice = estadoIndice - 1;
    const salidaIndice = parseInt(index);
    const salidaValue = parseInt(e.target.value);
    const tempSalida = [...salidasToUse[estadoIndice]];
    tempSalida[salidaIndice] = salidaValue;
    actualizarSalida(tempSalida, estadoId);
    actualizarEstado(tempSalida, estadoId);
  };

  const handleTiempoChange = (e, estadoId) => {
    const tiempo = parseInt(e.target.value);
    actualizarTiempo(tiempo, estadoId);
  };

  const handleSubmit = async () => {
    const { id } = secuenciaToUse;
    const tempSecuencia2 = {
      sincronismo: 0,
      estados: estadosToUse,
    };
    const data = await dispatch(
      secuenciaThunk(token, semaforoId, id, tempSecuencia2)
    );
    const tempSemaforo = { semaforoId, nuevaSecuencia: data };
    dispatch(editSecuenciaAction(tempSemaforo));
    setSecuenciaToUse(data);
    setIsOpen(!isOpen);
  };

  const handleAddEstado = () => {
    setIsOpenEstado(!isOpenEstado);
  };
  const handleInputChangeEstado = (e, index) => {
    const salidaIndice = parseInt(index);
    const salidaValue = parseInt(e.target.value);
    const estadoTemp = [...nuevoEstado.salidas];
    estadoTemp[salidaIndice] = salidaValue;
    setNuevoEstado({ ...nuevoEstado, salidas: estadoTemp });
  };
  const handleTiempoChangeEstado = (e) => {
    const tiempoValue = parseInt(e.target.value);
    setNuevoEstado({ ...nuevoEstado, tiempo: tiempoValue });
  };
  const handleSubmitEstado = async () => {
    const secuenciaId = secuenciaToUse.id;
    const data = await dispatch(
      addEstadoThunk(token, semaforoId, secuenciaId, nuevoEstado)
    );
    const tempSemaforo = { semaforoId, secuenciaId, estadoParaRedux: data };
    const estadosTemp = [...secuenciaToUse.estados];
    estadosTemp.push(data);
    dispatch(addEstadoAction(tempSemaforo));
    setSecuenciaToUse({ ...secuenciaToUse, estados: estadosTemp });
    setIsOpenEstado(!isOpenEstado);
  };
  const tableToStatus = nuevoEstado !== null && (
    <table className="border-collapse shadow rounded-md overflow-hidden box-border w-full">
      <thead>
        <tr>
          <th style={{ border: "1px solid black" }} className="w-5/6">
            Salidas
          </th>
          <th style={{ border: "1px solid black" }} className="w-1/6">
            Tiempo
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center border w-full flex justify-evenly">
            {nuevoEstado.salidas.map((salida, index) => (
              <input
                className="text-center border"
                key={index}
                type="number"
                min="0"
                max="3"
                defaultValue={salida}
                name="salida"
                onChange={(e) => handleInputChangeEstado(e, index)}
              />
            ))}
          </td>
          <td>
            <input
              className="text-center border"
              type="number"
              name="tiempo"
              defaultValue={nuevoEstado.tiempo}
              min="1"
              onChange={(e) => handleTiempoChangeEstado(e)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const handleDeleteEstado = () => {
    swal
      .fire({
        title: "Eliminar estado",
        text: "¿Estás seguro que deseas eliminar el último estado?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      })
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          swal.fire({
            text: "Estado eliminado con éxito",
            icon: "success",
            timer: "2500",
          });
          const secuenciaId = secuenciaToUse.id;
          deleteEstado(token, semaforoId, secuenciaId);
          const temp = { semaforoId, secuenciaId };
          dispatch(deleteEstadoAction(temp));
          const estadosTemp = [...secuenciaToUse.estados];
          estadosTemp.pop();
          setSecuenciaToUse({ ...secuenciaToUse, estados: estadosTemp });
        }
      });
  };

  const handleAddSalida = () => {
    if (secuenciaToUse.estados[0].salidas.length >= 24) {
      swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pueden agregar más salidas",
      });
    } else {
      swal
        .fire({
          title: "Agregar salida",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Agregar",
          cancelButtonText: "Cancelar",
        })
        .then(async (respuesta) => {
          if (respuesta.isConfirmed) {
            const secuenciaId = secuenciaToUse.id;
            const data = await dispatch(
              addSalidaThunk(token, semaforoId, secuenciaId)
            );
            const tempSemaforo = { semaforoId, nuevaSecuencia: data };
            dispatch(editSecuenciaAction(tempSemaforo));
            setSecuenciaToUse(data);
            swal.fire({
              text: "Salida agregada con éxito",
              icon: "success",
              timer: "2500",
            });
          }
        });
    }
  };

  const handleDeleteSalida = async () => {
    swal
      .fire({
        title: "Eliminar salida",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          swal.fire({
            text: "Salida eliminada con éxito",
            icon: "success",
            timer: "2500",
          });
          const secuenciaId = secuenciaToUse.id;
          const data = await dispatch(
            deleteSalidaThunk(token, semaforoId, secuenciaId)
          );
          const tempSemaforo = { semaforoId, nuevaSecuencia: data };
          dispatch(editSecuenciaAction(tempSemaforo));
          setSecuenciaToUse(data);
        }
      });
  };

  // Datos que le mando al modal p/ render
  const tableToEdit = !secuenciaToUse ? (
    <div>Cargando..</div>
  ) : (
    <>
      <table className="border-collapse shadow rounded-md overflow-hidden box-border w-full">
        <thead>
          <tr>
            <th className="w-1/12 border">Índice</th>
            <th className="w-9/12 border">Salidas</th>
            <th className="w-1/12 border text-center">Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {!secuenciaToUse ? (
            <div>Cargando..</div>
          ) : (
            secuenciaToUse.estados.map((estado) => (
              <tr key={estado.id}>
                <td className="text-center border">{estado.indice}</td>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr className="w-full flex justify-evenly border">
                      {estado.salidas.map((salida, index) => (
                        <input
                          className="text-center"
                          name="salida"
                          key={index}
                          type="number"
                          min="0"
                          max="3"
                          defaultValue={salida}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              index,
                              estado.indice,
                              estado.id
                            )
                          }
                        />
                      ))}
                    </tr>
                  </tbody>
                </table>
                <td className="text-center ">
                  <input
                    className="w-full text-center border"
                    type="number"
                    name="tiempo"
                    defaultValue={estado.tiempo}
                    min="1"
                    onChange={(e) => handleTiempoChange(e, estado.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );

  return secuenciaToUse === null ? (
    <Loader />
  ) : (
    <div className="flex flex-col py-4 px-2">
      <h1 className="font-bold p-2">Secuencia {secuenciaToUse.id}</h1>
      <div className="px-2 py-1 flex gap-4" key={secuenciaToUse.id}>
        <div className="flex flex-col">
          <p>Id: {secuenciaToUse.id}</p>
          <p>Índice: {secuenciaToUse.indice}</p>
          <p>Movimientos: {secuenciaToUse.movimientos}</p>
        </div>
        <div className="flex flex-col">
          <p>Ciclo: {secuenciaToUse.ciclo}</p>
          <p>Sincronismo: {secuenciaToUse.sincronismo}</p>
          <p>Cantidad de estados: {secuenciaToUse.estados.length}</p>
        </div>
      </div>
      <div className="mt-4">
        <table className="border-collapse shadow rounded-md overflow-hidden box-border w-full">
          <thead>
            <tr>
              <th className="w-1/12 border">Índice</th>
              <th className="border w-9/12">Salidas</th>
              <th className="w-1/12 border">Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {secuenciaToUse.estados.map((estado) => (
              <tr key={estado.id}>
                <td className="border text-center">{estado.indice}</td>
                <table className="w-full">
                  <tbody>
                    <tr className="w-full flex justify-evenly border">
                      {estado.salidas.map((salida, index) => (
                        <td key={index}>{salida}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <td className="border text-center">{estado.tiempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex py-4 w-full justify-center gap-6 mt-4">
        <button
          style={{ cursor: "pointer" }}
          className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Atrás
        </button>
        <button
          style={{ cursor: "pointer" }}
          className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
          onClick={handleClickModal}
        >
          Editar secuencia
        </button>
        <button
          style={{ cursor: "pointer" }}
          className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
          onClick={handleAddEstado}
        >
          Añadir estado
        </button>
        <button
          style={{ cursor: "pointer" }}
          className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
          onClick={handleDeleteEstado}
        >
          Eliminar estado
        </button>
        <button
          style={{ cursor: "pointer" }}
          className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
          onClick={handleAddSalida}
        >
          Agregar salida
        </button>
        <button
          style={{ cursor: "pointer" }}
          className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
          onClick={handleDeleteSalida}
        >
          Eliminar salida
        </button>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle={`Editar secuencia ${secuenciaToUse.id}`}
          modalData={tableToEdit}
          handleSubmit={handleSubmit}
        />
        <ModalEstado
          isOpen={isOpenEstado}
          setIsOpen={setIsOpenEstado}
          modalTitle={`Nuevo estado - Secuencia ${secuenciaToUse.id}`}
          modalData={tableToStatus}
          handleSubmit={handleSubmitEstado}
        />
      </div>
    </div>
  );
};

export default Secuencia;
