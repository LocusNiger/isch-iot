/* eslint-disable no-unused-vars */
import swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getEstrategiasNodos,
  editEstrategia,
} from "../../../services/alumbrado";
import Loader from "../../Loader/Loader";
import { modificarEstrategiaAction } from "../../../features/luminarias/luminariasSlice";

const ComandoEstrategia = () => {
  const token = localStorage.getItem("token");
  const nodos = useSelector((state) => state.luminarias);
  const id = parseInt(useParams().id);
  const nodoToUse = nodos.find((nodo) => nodo.nodoId === id);
  const dispatch = useDispatch();
  const [estrategias, setEstrategias] = useState(null);
  const [cuerpoReq, setCuerpoReq] = useState(null);
  const [estrategiaId, setEstrategiaId] = useState(null);

  const getEstrategias = async () => {
    const [data, error] = await getEstrategiasNodos(token, id);
    if (data) setEstrategias(data);
    else console.error(error);
  };

  useEffect(() => {
    getEstrategias();
  }, [nodoToUse]);

  const handleChangeEstrategia = (e) => {
    switch (e.target.name) {
      case "encendido":
        setCuerpoReq({ ...cuerpoReq, [e.target.name]: e.target.checked });
        break;
      case "brillo":
        setCuerpoReq({
          ...cuerpoReq,
          [e.target.name]: parseInt(e.target.value),
        });
        break;
      case "hora":
        setCuerpoReq({
          ...cuerpoReq,
          [e.target.name]: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const handleSelectEstrategias = (e) => {
    setEstrategiaId(parseInt(e.target.value));
  };

  const handleSubmitEstrategia = async (e) => {
    e.preventDefault();
    swal
      .fire({
        title: `Edición de estrategia`,
        text: "¿Estás seguro que deseas modificar la estrategia?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
      })
      .then(async (respuesta) => {
        if (respuesta.isConfirmed) {
          console.log(cuerpoReq);
          const [data, error] = await editEstrategia(
            token,
            id,
            estrategiaId,
            cuerpoReq
          );
          if (data) {
            swal.fire({
              text: "Edición de estrategia realizada",
              icon: "success",
              timer: "2500",
            });
            const nuevosDatos = { data, id };
            dispatch(modificarEstrategiaAction(nuevosDatos));
          } else {
            console.error(error);
          }
        }
      });
    e.target.reset();
  };
  return estrategias !== null ? (
    <div className="border border-gray-300 collapse collapse-arrow">
      <input type="checkbox" />
      <h3 className="text-xl collapse-title">Edición de estrategia</h3>
      <div className="collapse-content flex flex-col gap-2">
        <form className="flex gap-8 w-full" onSubmit={handleSubmitEstrategia}>
          <select
            onChange={(e) => handleSelectEstrategias(e)}
            className="p-2 border w-3/12"
            required
          >
            {estrategias.map((estrategia) => (
              <option value={estrategia.id} key={estrategia.id}>
                Estrategia {estrategia.numeroEstrategia}
              </option>
            ))}
          </select>
          <div className="flex flex-col items-center justify-between">
            <label htmlFor="encendido">Encendido</label>
            <input
              className="w-5 h-5"
              id="encendido"
              type="checkbox"
              name="encendido"
              onChange={handleChangeEstrategia}
              required
            />
          </div>
          <input
            type="number"
            name="brillo"
            onChange={handleChangeEstrategia}
            placeholder="% de brillo"
            className="w-1/6 text-center border"
            min={0}
            max={100}
            required
          />
          <input
            className="w-1/6 text-center border"
            type="time"
            name="hora"
            step="1"
            onChange={handleChangeEstrategia}
            required
          />
          <button className="hover:font-bold border uppercase border-black hover:bg-black hover:text-white transition-all ">
            Modificar estrategia
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default ComandoEstrategia;
