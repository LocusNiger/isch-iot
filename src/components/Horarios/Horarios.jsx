/* eslint-disable react/prop-types */
import { editHorarioEspecifico } from "../../services/horarios";
import { useState } from "react";
import {
  editHorarioAction,
  editHorarioParticularAction,
} from "../../features/semaforos/semaforosSlice";
import swal from "sweetalert2";
import { editHorarioPeriodicoThunk } from "../../features/semaforos/thunks";
import { useDispatch } from "react-redux";
import ModalHorario from "../Modal/ModalHorario";
import ModalHorarioParticular from "../Modal/ModalHorarioParticular";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const Horarios = ({ detail }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const id = parseInt(useParams().id);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenParticular, setIsOpenParticular] = useState(false);
  const [horaInicioEntera, setHoraInicioEntera] = useState([]);
  const [horaFinEntera, setHoraFinEntera] = useState([]);
  const [fechaInicioParticular, setFechaInicioParticular] = useState("");
  const [fechaFinParticular, setFechaFinParticular] = useState("");
  const [horario, setHorario] = useState(null);
  const [horarioParticular, setHorarioParticular] = useState(null);
  const [diasEspecificacion, setDiasEspecificacion] = useState([]);
  const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const diasToArray = (especificacion) => {
    const arrayDias = Object.values(especificacion);
    setDiasEspecificacion(arrayDias);
  };

  const handleSelectHorario = (e) => {
    const idHorario = parseInt(e.target.value);
    let foundHorario;
    switch (e.target.name) {
      case "horarioPeriodico":
        foundHorario = detail.configuracion.horarios_periodicos.find(
          (horario) => horario.id === idHorario
        );
        if (foundHorario) {
          setHorario(foundHorario);
          setHoraInicioEntera(foundHorario.hora_inicio.split(":"));
          setHoraFinEntera(foundHorario.hora_fin.split(":"));
          diasToArray(foundHorario.especificacion);
        } else console.log("No se encontró horario");
        break;
      case "horarioParticular":
        foundHorario = detail.configuracion.horarios_particulares.find(
          (horario) => horario.id === idHorario
        );
        if (foundHorario) {
          setHorarioParticular(foundHorario);
          setFechaInicioParticular(foundHorario.fecha_inicio);
          setFechaFinParticular(foundHorario.fecha_fin);
        } else console.log("No se encontró horario");
        break;
      default:
        break;
    }
  };

  const handleEditHorario = (e) => {
    switch (e.target.name) {
      case "botonPeriodico":
        setIsOpen(!isOpen);
        break;
      case "botonParticular":
        setIsOpenParticular(!isOpenParticular);
        break;
      default:
        break;
    }
  };

  const selectPrioridad = (e) => {
    const prioridadValue = parseInt(e.target.value);
    switch (e.target.name) {
      case "prioridadPeriodico":
        setHorario({ ...horario, prioridad: prioridadValue });
        break;
      case "prioridadParticular":
        setHorarioParticular({
          ...horarioParticular,
          prioridad: prioridadValue,
        });
        break;
      default:
        break;
    }
  };

  const modificarFecha = (e) => {
    const value = e.target.value;
    let tempHorario;
    switch (e.target.name) {
      case "fechaInicioParticular":
        tempHorario = `${value}:00`;
        setHorarioParticular({
          ...horarioParticular,
          fecha_inicio: tempHorario,
        });
        setFechaInicioParticular(tempHorario);
        break;
      case "fechaFinParticular":
        tempHorario = `${value}:00`;
        setHorarioParticular({
          ...horarioParticular,
          fecha_fin: tempHorario,
        });
        setFechaFinParticular(tempHorario);
        break;
      default:
        break;
    }
  };

  const modificarHora = (e) => {
    let value;
    if (e.target.value.length === 1) {
      value = `0${e.target.value}`;
    } else {
      value = e.target.value;
    }
    let tempHorario;
    switch (e.target.name) {
      case "horaInicio":
      case "minutosInicio":
      case "segundosInicio":
        tempHorario = horaInicioEntera; //eslint-disable-line
        break;
      case "horaFin":
      case "minutosFin":
      case "segundosFin":
        tempHorario = horaFinEntera; //eslint-disable-line
        break;
      default:
        break;
    }
    switch (e.target.name) {
      case "horaInicio":
      case "horaFin":
        tempHorario = `${value}:${tempHorario[1]}:${tempHorario[2]}`;
        if (e.target.name === "horaInicio") {
          const temp = horaInicioEntera.slice();
          temp[0] = value;
          setHoraInicioEntera(temp);
          setHorario({ ...horario, hora_inicio: tempHorario });
        } else {
          const temp = horaFinEntera.slice();
          temp[0] = value;
          setHoraFinEntera(temp);
          setHorario({ ...horario, hora_fin: tempHorario });
        }

        break;
      case "minutosInicio":
      case "minutosFin":
        tempHorario = `${tempHorario[0]}:${value}:${tempHorario[2]}`;
        if (e.target.name === "minutosInicio") {
          const temp = horaInicioEntera.slice();
          temp[1] = value;
          setHoraInicioEntera(temp);
          setHorario({ ...horario, hora_inicio: tempHorario });
        } else {
          const temp = horaFinEntera.slice();
          temp[1] = value;
          setHoraFinEntera(temp);
          setHorario({ ...horario, hora_fin: tempHorario });
        }

        break;
      case "segundosInicio":
      case "segundosFin":
        tempHorario = `${tempHorario[0]}:${tempHorario[1]}:${value}`;
        if (e.target.name === "segundosInicio") {
          const temp = horaInicioEntera.slice();
          temp[2] = value;
          setHoraInicioEntera(temp);
          setHorario({ ...horario, hora_inicio: tempHorario });
        } else {
          const temp = horaFinEntera.slice();
          temp[2] = value;
          setHoraFinEntera(temp);
          setHorario({ ...horario, hora_fin: tempHorario });
        }
        break;
      default:
        break;
    }
  };

  const handleChangeCheckboxDia = (e) => {
    const diaAEditar = e.target.name;
    const checkedValue = e.target.checked;
    const tempDias = { ...horario.especificacion };
    for (const dia in tempDias) {
      if (dia === diaAEditar) {
        tempDias[dia] = checkedValue;
      }
    }
    setHorario({ ...horario, especificacion: tempDias });
  };

  const handleSubmitHorario = async () => {
    swal
      .fire({
        title: "Editar horario",
        text: "¿Estás seguro que deseas actualizar el horario?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar cambios",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          const horarioAEnviar = {
            indice: horario.indice,
            prioridad: horario.prioridad,
            indice_secuencia: horario.indice_secuencia,
            hora_inicio: horario.hora_inicio,
            hora_fin: horario.hora_fin,
            especificacion: horario.especificacion,
          };
          const [data, error] = await dispatch(
            editHorarioPeriodicoThunk(token, id, horario.id, horarioAEnviar)
          );
          if (data) {
            console.log(data);
            const tempHorario = {
              idSemaforo: id,
              idHorario: horario.id,
              nuevoHorario: data,
            };
            dispatch(editHorarioAction(tempHorario));
            swal.fire({
              text: "Horario actualizado con éxito",
              icon: "success",
              timer: "2500",
            });
          } else {
            swal.fire({
              icon: "error",
              title: "Error",
              text: "No fue posible actualizar el horario seleccionado",
            });
            console.error(error);
          }
          setIsOpen(!isOpen);
        }
      });
  };

  const handleSubmitHorarioParticular = async () => {
    swal
      .fire({
        title: "Editar horario",
        text: "¿Estás seguro que deseas actualizar el horario?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar cambios",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          const horarioAEnviar = {
            fecha_inicio: horarioParticular.fecha_inicio,
            fecha_fin: horarioParticular.fecha_fin,
            indice_secuencia: 1,
            prioridad: horarioParticular.prioridad,
          };
          console.log(horarioAEnviar);
          const [data, error] = await editHorarioEspecifico(
            token,
            id,
            horarioParticular.id,
            horarioAEnviar
          );
          if (data) {
            console.log(data);
            const tempHorario = {
              idSemaforo: id,
              idHorario: horarioParticular.id,
              nuevoHorario: data,
            };
            dispatch(editHorarioParticularAction(tempHorario));
            swal.fire({
              text: "Horario actualizado con éxito",
              icon: "success",
              timer: "2500",
            });
          } else {
            swal.fire({
              icon: "error",
              title: "Error",
              text: "No fue posible actualizar el horario seleccionado",
            });
            console.error(error);
          }
          setIsOpenParticular(!isOpenParticular);
        }
      });
  };

  const tablaEdicionHorario = (
    <div className="border-collapse shadow rounded-md overflow-hidden box-border">
      <div className="flex justify-start px-5 gap-3">
        <label htmlFor="prioridad" className="font-semibold self-start">
          Prioridad
        </label>
        <select onChange={selectPrioridad} name="prioridadPeriodico" required>
          <option selected={true} disabled="disabled">
            Selecciona la prioridad
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-start px-5 gap-3">
          <p className="font-semibold self-start">Hora de inicio</p>
          <label htmlFor="horaInicio">Hora</label>
          <input
            className="border text-center"
            id="horaInicio"
            name="horaInicio"
            type="number"
            value={horaInicioEntera[0]}
            min={0}
            max={24}
            onChange={modificarHora}
          />
          <label htmlFor="minutosInicio">Minutos</label>
          <input
            className="border text-center"
            id="minutosInicio"
            name="minutosInicio"
            type="number"
            value={horaInicioEntera[1]}
            min={0}
            max={60}
            onChange={modificarHora}
          />
          <label htmlFor="segundosInicio">Segundos</label>
          <input
            className="border text-center"
            id="segundosInicio"
            name="segundosInicio"
            type="number"
            value={horaInicioEntera[2]}
            min={0}
            max={60}
            onChange={modificarHora}
          />
        </div>
        <div className="flex justify-start px-5 gap-3">
          <p className="font-semibold self-start">Hora de finalización</p>
          <label htmlFor="horaFin">Hora</label>
          <input
            className="border text-center"
            id="horaFin"
            name="horaFin"
            type="number"
            value={horaFinEntera[0]}
            min={0}
            max={24}
            onChange={modificarHora}
          />
          <label htmlFor="minutosFin">Minutos</label>
          <input
            className="border text-center"
            id="minutosFin"
            name="minutosFin"
            type="number"
            value={horaFinEntera[1]}
            min={0}
            max={60}
            onChange={modificarHora}
          />
          <label htmlFor="segundosFin">Segundos</label>
          <input
            className="border text-center"
            id="segundosFin"
            name="segundosFin"
            type="number"
            value={horaFinEntera[2]}
            min={0}
            max={60}
            onChange={modificarHora}
          />
        </div>
      </div>
      <div>
        <form
          className="flex justify-evenly"
          onChange={(e) => handleChangeCheckboxDia(e)}
        >
          <label htmlFor="lunes" className="font-semibold">
            Lunes
          </label>
          <input type="checkbox" name="lunes" id="checkboxLun" />
          <label htmlFor="martes" className="font-semibold">
            Martes
          </label>
          <input type="checkbox" name="martes" id="checkboxMar" />
          <label htmlFor="miercoles" className="font-semibold">
            Miércoles
          </label>
          <input type="checkbox" name="miercoles" id="checkboxMie" />
          <label htmlFor="jueves" className="font-semibold">
            Jueves
          </label>
          <input type="checkbox" name="jueves" id="checkboxJue" />
          <label htmlFor="viernes" className="font-semibold">
            Viernes
          </label>
          <input type="checkbox" name="viernes" id="checkboxVie" />
          <label htmlFor="sabado" className="font-semibold">
            Sábado
          </label>
          <input type="checkbox" name="sabado" id="checkboxSab" />
          <label htmlFor="domingo" className="font-semibold">
            Domingo
          </label>
          <input type="checkbox" name="domingo" id="checkboxDom" />
        </form>
      </div>
    </div>
  );

  const tablaParticular = (
    <div className="border-collapse shadow rounded-md overflow-hidden box-border">
      <div className="flex justify-between px-5 gap-3">
        <label htmlFor="prioridad" className="font-semibold self-start">
          Prioridad
        </label>
        <select onChange={selectPrioridad} name="prioridadParticular" required>
          <option selected={true} disabled="disabled">
            Selecciona la prioridad
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
      </div>
      <div>
        <div className="flex justify-between px-5 gap-3 w-full">
          <p className="font-semibold">Fecha de inicio</p>
          <input
            className="text-center border self-end"
            type="datetime-local"
            name="fechaInicioParticular"
            value={fechaInicioParticular}
            onChange={modificarFecha}
          />
        </div>
        <div className="flex justify-between px-5 gap-3">
          <p className="font-semibold">Fecha de finalización</p>
          <input
            className="text-center border"
            type="datetime-local"
            name="fechaFinParticular"
            value={fechaFinParticular}
            onChange={modificarFecha}
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className="py-4">
      <h3 className="font-semibold underline">Horarios periódicos:</h3>
      <div className="flex flex-col lg:flex-row justify-between py-4 w-5/6">
        <div className="flex flex-col w-full lg:w-2/5 gap-2">
          <label htmlFor="horarioSelect">Seleccionar horario:</label>
          <select
            name="horarioPeriodico"
            id="horarioSelect"
            size={5}
            onChange={(e) => handleSelectHorario(e)}
            className="border p-2 lg:p-0"
          >
            {detail.configuracion.horarios_periodicos.map(
              (horarioPeriodico) => (
                <option
                  key={horarioPeriodico.id}
                  value={horarioPeriodico.id}
                  className="py-1"
                >{`Horario ${horarioPeriodico.indice + 1}`}</option>
              )
            )}
          </select>
          {horario !== null ? (
            <button
              onClick={handleEditHorario}
              name="botonPeriodico"
              className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none active:bg-blue-500 cursor-pointer w-2/5 self-center"
            >
              Editar horario
            </button>
          ) : null}
        </div>
        <div>
          {horario === null ? (
            <h4>Seleccione un horario</h4>
          ) : (
            <div className="flex flex-col mt-6 lg:m-0 lg:flex-row gap-4 lg:gap-8 justify-between">
              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h4 className="font-semibold">
                  Detalles del horario seleccionado
                </h4>
                <p>Índice: {horario.indice}</p>
                <p>Prioridad: {horario.prioridad}</p>
                <p>Inicio: {horario.hora_inicio}</p>
                <p>Finalización: {horario.hora_fin}</p>
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h4 className="font-semibold">Días especificación</h4>
                {dias.map((dia, index) => {
                  return (
                    <p key={index}>
                      {dia}:{" "}
                      {diasEspecificacion[index] ? (
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-green-500 text-xs"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-red-400 text-xs"
                        />
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <h3 className="font-semibold underline">Horarios particulares:</h3>
      <div className="flex flex-col lg:flex-row justify-between py-4 w-11/12">
        <div className="flex flex-col gap-2 w-full lg:w-2/5">
          <label htmlFor="horarioSelect" className="font-semibold">
            Seleccionar horario
          </label>
          <select
            name="horarioParticular"
            id="horarioParticularSelect"
            size={2}
            onChange={(e) => handleSelectHorario(e)}
            className="border p-2 lg:p-0"
          >
            {detail.configuracion.horarios_particulares.map(
              (horarioParticular) => (
                <option
                  key={horarioParticular.id}
                  value={horarioParticular.id}
                  className="py-1"
                >{`Horario ${horarioParticular.indice}`}</option>
              )
            )}
          </select>
          {horarioParticular !== null ? (
            <button
              onClick={handleEditHorario}
              className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none active:bg-blue-500 cursor-pointer w-2/5 self-center"
              name="botonParticular"
            >
              Editar horario
            </button>
          ) : null}
        </div>
        <div className="flex gap-8 justify-between ">
          {horarioParticular === null ? (
            <h4>Seleccione un horario</h4>
          ) : (
            <div className="flex justify-between lg:ml-8 lg:px-8 mt-6 lg:flex-row gap-4 lg:gap-8">
              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h4 className="font-semibold">
                  Detalles del horario seleccionado
                </h4>
                <p>Índice: {horarioParticular.indice}</p>
                <p>Prioridad: {horarioParticular.prioridad}</p>
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <p>Fecha de inicio: {horarioParticular.fecha_inicio}</p>
                <p>Fecha de finalización: {horarioParticular.fecha_fin}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalHorario
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle={`Editar horario periódico`}
        modalData={tablaEdicionHorario}
        handleSubmit={handleSubmitHorario}
      />
      <ModalHorarioParticular
        isOpenParticular={isOpenParticular}
        setIsOpenParticular={setIsOpenParticular}
        modalTitle={`Editar horario particular`}
        modalData={tablaParticular}
        handleSubmit={handleSubmitHorarioParticular}
      />
    </div>
  );
};

export default Horarios;
