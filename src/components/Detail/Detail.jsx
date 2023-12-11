/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getSemaforoDetail } from "../../services/getSemaforos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

import Loader from "../Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import Horarios from "../Horarios/Horarios";
import { stateColor } from "../Map/Map";
import { agregarPendiente } from "../../features/pendientes/pendientesSlice";
import { modificarHorario, modificarSecuencia } from "../../services/comandos";
import swal from "sweetalert2";
import TablaPendientes from "../Pendientes/TablaPendientes";
import SecuenciaEnDetalle from "../Secuencia/SecuenciaEnDetalle";
import SecuenciaPrueba from "../Secuencia/SecuenciaPrueba";

export default function Detail() {
  const id = parseInt(useParams().id);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [horarioView, setHorarioView] = useState(false);
  const [datosView, setDatosView] = useState(false);
  const [secuenciaView, setSecuenciaView] = useState(false);
  const [comandosView, setComandosView] = useState(false);
  const [horarioSelect, setHorarioSelect] = useState();
  const [secuenciaSelect, setSecuenciaSelect] = useState();
  const [seleccionSecuenciaMenu, setSeleccionSecuenciaMenu] = useState(1);
  const [secuenciaId, setSecuenciaId] = useState(null);
  const semaforos = useSelector((state) => state.semaforos);
  const semaforoEncontrado = semaforos.find(
    (semaforo) => semaforo.configuracion.id === id
  );

  const getSemaforo = async () => {
    const [data, error] = await getSemaforoDetail(token, id);
    if (data) {
      setDetail(data);
      setSecuenciaId(data.configuracion.secuencias[0].id);
    } else console.error(error);
  };

  useEffect(() => {
    if (semaforoEncontrado !== undefined) {
      setDetail(semaforoEncontrado);
      setSecuenciaId(semaforoEncontrado.configuracion.secuencias[0].id);
    } else {
      getSemaforo();
    }
  }, [id]);

  const handleSelectIndice = (e) => {
    const indice = parseInt(e.target.value);
    switch (e.target.name) {
      case "comandoHorario":
        setHorarioSelect(indice);
        break;
      case "comandoSecuencia":
        setSecuenciaSelect(indice);
        break;
      default:
        break;
    }
    console.log(indice);
  };

  const handleSubmitModificarComando = async (e) => {
    let cuerpoRequest;
    if (e.target.name === "comandoHorario") {
      cuerpoRequest = {
        id_semaforo: id,
        indice_horario: horarioSelect,
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
            console.log(cuerpoRequest);
            const [data, error] = await modificarHorario(token, cuerpoRequest);
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
              console.error(error.response);
            }
          }
        });
    } else {
      cuerpoRequest = {
        id_semaforo: id,
        indice_secuencia: secuenciaSelect,
      };
      swal
        .fire({
          title: "Modificación de secuencias",
          text: "¿Estás seguro que deseas modificar la secuencia?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Enviar",
          cancelButtonText: "Cancelar",
        })
        .then(async (respuesta) => {
          if (respuesta.isConfirmed) {
            console.log(cuerpoRequest);
            const [data, error] = await modificarSecuencia(
              token,
              cuerpoRequest
            );
            if (data) {
              const cuerpoProceso = {
                data,
                descripcion: "Modificación de secuencia",
              };
              dispatch(agregarPendiente(cuerpoProceso));
              swal.fire({
                text: "Modificación de secuencia solicitada",
                icon: "success",
                timer: "2500",
              });
            } else {
              swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo realizar la modificación.",
              });
              console.error(error.response);
            }
          }
        });
    }
  };

  const semaforoSecuencias = useMemo(() => {
    if (detail) {
      const { secuencias } = detail?.configuracion ?? {};
      return secuencias;
    }
    return null;
  }, [detail]);

  const handleSelectSecuencia = (e) => {
    setSeleccionSecuenciaMenu(parseInt(e.target.value));
    const secuenciaId = semaforoSecuencias.find(
      (secuencia) => secuencia.indice === parseInt(e.target.value)
    );
    setSecuenciaId(secuenciaId.id);
  };

  return (
    <>
      <div className="flex flex-col py-2 px-6">
        {detail !== null ? (
          <div>
            <div className="flex w-full lg:w-1/6 items-center gap-4 justify-start">
              <button
                className="border-r border-grey-400 p-2 cursor-pointer hover:bg-gray-100 transition-all"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2 " />
                Volver
              </button>
            </div>
            <div
              className="flex items-center justify-between w-full lg:w-2/5 cursor-pointer border-b py-2 transition-all"
              onClick={() => setDatosView(!datosView)}
            >
              <h3 className="font-bold text-normal">Datos del semáforo</h3>
              <FontAwesomeIcon
                icon={!datosView ? faCaretDown : faCaretUp}
                className="text-xl text-blue-600"
              />
            </div>
            {datosView === false ? null : (
              <div className="py-4 w-full lg:w-3/5 flex gap-10">
                <div className="flex flex-col w-1/2">
                  <p className="font-semibold">
                    ID:{" "}
                    <span className="font-normal">
                      {detail.configuracion.id}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Nombre:{" "}
                    <span className="font-normal">
                      {detail.configuracion.nombre}
                    </span>
                  </p>
                  <p className="font-semibold">
                    IP:{" "}
                    <span className="font-normal">
                      {detail.configuracion.ip}
                    </span>
                  </p>
                  <p className="font-semibold">
                    EUI:{" "}
                    <span className="font-normal">
                      {detail.configuracion.eui}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Estado: {stateColor(detail.estadoDispositivo)}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">
                    Descripción:{" "}
                    <span className="font-normal">
                      {detail.configuracion.descripcion}
                    </span>
                  </p>

                  <p className="font-semibold">
                    Latitud:{" "}
                    <span className="font-normal">
                      {detail.configuracion.latitud}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Longitud:{" "}
                    <span className="font-normal">
                      {detail.configuracion.longitud}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Simulación:{" "}
                    <span className="font-normal">
                      {detail.configuracion.simulacion.toString()}
                    </span>
                  </p>
                </div>
              </div>
            )}
            <div
              className="flex items-center justify-between w-full lg:w-2/5 cursor-pointer border-y py-2"
              onClick={() => setHorarioView(!horarioView)}
            >
              <h3 className="font-bold">Horarios</h3>
              <FontAwesomeIcon
                icon={!horarioView ? faCaretDown : faCaretUp}
                className="text-xl text-blue-600"
              />
            </div>
            {horarioView === false ? null : <Horarios detail={detail} />}
            <div
              className="flex items-center justify-between w-full lg:w-2/5 cursor-pointer border-y py-2"
              onClick={() => setSecuenciaView(!secuenciaView)}
            >
              <h3 className="font-bold">Secuencias</h3>
              <FontAwesomeIcon
                icon={!secuenciaView ? faCaretDown : faCaretUp}
                className="text-xl text-blue-600"
              />
            </div>
            {secuenciaView === false ? null : (
              <SecuenciaPrueba detail={detail} />
            )}
            <div
              className="flex items-center justify-between w-full lg:w-2/5 cursor-pointer border-y py-2"
              onClick={() => setComandosView(!comandosView)}
            >
              <h3 className="font-bold">Comandos</h3>
              <FontAwesomeIcon
                icon={!comandosView ? faCaretDown : faCaretUp}
                className="text-xl text-blue-600"
              />
            </div>
            {comandosView === false ? null : (
              <>
                <div className="py-4 w-full lg:w-2/5 flex flex-col gap-5 flex-nowrap justify-between ">
                  <h3 className="font-semibold underline">
                    Modificación de horarios:
                  </h3>
                  <div className="flex justify-start gap-20">
                    <select
                      name="comandoHorario"
                      id="horarioSelect"
                      size={5}
                      onChange={(e) => handleSelectIndice(e)}
                      className="border w-2/5 border-gray-400"
                    >
                      {detail.configuracion.horarios_periodicos.map(
                        (horarioPeriodico) => (
                          <option
                            key={horarioPeriodico.id}
                            value={horarioPeriodico.indice}
                            className="py-1 text-center"
                          >{`Horario ${horarioPeriodico.indice + 1}`}</option>
                        )
                      )}
                    </select>
                    <button
                      className="h-min self-center inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
                      style={{ cursor: "pointer" }}
                      name="comandoHorario"
                      onClick={(e) => handleSubmitModificarComando(e)}
                    >
                      Modificar
                    </button>
                  </div>
                </div>
                <div className="py-4 w-full lg:w-2/5 flex flex-col gap-5 flex-nowrap justify-between">
                  <h3 className="font-semibold underline">
                    Modificación de secuencia:
                  </h3>
                  <div className="flex justify-start gap-20">
                    <select
                      name="comandoSecuencia"
                      id="secuenciaSelect"
                      size={5}
                      onChange={(e) => handleSelectIndice(e)}
                      className="border w-2/5 border-gray-400"
                    >
                      {detail.configuracion.secuencias.map((secuencia) => (
                        <option
                          key={secuencia.id}
                          value={secuencia.indice}
                          className="py-1 text-center"
                        >{`Secuencia ${secuencia.indice}`}</option>
                      ))}
                    </select>
                    <button
                      className="h-min self-center inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
                      style={{ cursor: "pointer" }}
                      name="comandoSecuencia"
                      onClick={(e) => handleSubmitModificarComando(e)}
                    >
                      Modificar
                    </button>
                  </div>
                </div>
              </>
            )}
            <div className="p-4 w-3/12 flex justify-evenly items-center"></div>
            <TablaPendientes />
          </div>
        ) : (
          <>
            <Loader />
            <button
              className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
              style={{ cursor: "pointer", width: "10%", padding: ".1rem" }}
              onClick={() => navigate(-1)}
            >
              Atrás
            </button>
          </>
        )}
      </div>
    </>
  );
}
