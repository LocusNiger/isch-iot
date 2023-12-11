/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  edicionCfgTableroPorId,
  getCfgTableroPorId,
} from "../../../services/tableros";

const ComandoCalendario = ({ detail }) => {
  const tableros = useSelector((state) => state.tableros.tableros);
  const id = useParams().id;
  const tableroToUse = tableros.find((tablero) => tablero.id === parseInt(id));
  const [tablero, setTablero] = useState(null);
  const [datosEdicion, setDatosEdicion] = useState(null);
  const token = localStorage.getItem("token");

  const getTablero = async () => {
    console.log(tableroToUse);
    console.log(detail);
    if (tableroToUse !== undefined) {
      setTablero(tableroToUse);
      const tempDatos = {
        id: parseInt(tableroToUse.id),
        modo: tableroToUse.modoOp,
        inicio: tableroToUse.inicioEncendido,
        fin: tableroToUse.finEncendido,
        offsetInicio: tableroToUse.offsetInicio,
        offsetFin: tableroToUse.offsetFin,
      };
      setDatosEdicion(tempDatos);
    } else {
      const [dataTablero, errorTablero] = getCfgTableroPorId(token, id);
      if (dataTablero) {
        setTablero(dataTablero);
        const tempDatos = {
          id: parseInt(dataTablero.id),
          modo: dataTablero.modoOp,
          inicio: dataTablero.inicioEncendido,
          fin: dataTablero.finEncendido,
          offsetInicio: dataTablero.offsetInicio,
          offsetFin: dataTablero.offsetFin,
        };
        setDatosEdicion(tempDatos);
      } else {
        console.error(errorTablero);
      }
    }

    useEffect(() => {
      getTablero();
    }, []);

    const handleChangeModo = (e) => {
      const nuevoValor = parseInt(e.target.value);
      if (nuevoValor) setDatosEdicion({ ...datosEdicion, modo: nuevoValor });
    };

    const handleChangeHoraInicio = (e) => {};

    const handleSubmitChangeModo = async (e) => {
      e.preventDefault();
      swal
        .fire({
          title: "Edición de modo de tablero",
          text: "¿Estás seguro que deseas modificar el modo del tablero?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí",
          cancelButtonText: "Cancelar",
        })
        .then(async (respuesta) => {
          if (respuesta.isConfirmed) {
            console.log(tablero);
            const [data, error] = await edicionCfgTableroPorId(
              token,
              id,
              tablero
            );
            if (data) {
              swal.fire({
                text: "Edición del modo del realizada",
                icon: "success",
                timer: "2500",
              });
              console.log(data);
            } else {
              console.error(error);
            }
          }
        });
      e.target.reset();
    };
    return (
      <div className="border border-gray-300 collapse collapse-arrow">
        <input type="checkbox" />
        <h3 className="text-xl collapse-title">Comando calendario</h3>
        <div className="collapse-content">
          <div>
            <select
              name="modo"
              onChange={handleChangeModo}
              className="p-2 border w-4/12"
              required
            >
              <option value={0}>Fotocélula</option>
              <option value={1}>Calendario</option>
              <option value={2}>Forzado de tablero externo</option>
              <option value={3}>Calendario solar</option>
            </select>
            <button className="px-6 hover:font-bold border uppercase border-black hover:bg-black hover:text-white transition-all">
              Modificar el modo
            </button>
          </div>
          <div>
            <input
              type="time"
              value={datosEdicion?.inicio}
              onChange={handleChangeHoraInicio}
            />
          </div>
        </div>
      </div>
    );
  };
};

export default ComandoCalendario;
