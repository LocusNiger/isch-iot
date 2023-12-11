/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  addSemaforos,
  deleteSemaforo,
} from "../../features/seleccionados/seleccionadosSlice";
import { stateColor } from "../Map/Map";
import TablaPendientes from "../Pendientes/TablaPendientes";
import ComandoIntermitencia from "./ComandoIntermitencia";
import ComandoSincronismo from "./ComandoSincronismo";
import ComandoHorarios from "./ComandoHorarios";
import ComandoSecuencias from "./ComandoSecuencias";

const Comandos = () => {
  const semaforos = useSelector((state) => state.estadosSemaforos);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const seleccionados = useSelector(
    (state) => state.seleccionados.semaforosSeleccionados
  );

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  /* Semáforos seleccionados */
  const handleCheckbox = (e) => {
    const semaforoId = parseInt(e.target.name);
    if (e.target.checked === true) {
      dispatch(addSemaforos(semaforoId));
    } else {
      dispatch(deleteSemaforo(semaforoId));
    }
  };

  return (
    <>
      <div className="my-8 flex flex-col items-center lg:items-start gap-4 lg:flex-row lg:justify-evenly">
        <div className="w-11/12 lg:p-4 lg:w-2/5 ">
          <table className="border-collapse shadow rounded-md overflow-hidden box-border w-full">
            <thead>
              <tr>
                <th className="p-2.5 bg-gray-50">Nombre</th>
                <th className="p-2.5 bg-gray-50">Estado</th>
                <th className="p-2.5 bg-gray-50">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {semaforos.map((semaforo) => (
                <tr key={semaforo.latitud} className="text-center border">
                  <td className="p-3.5 flex flex-col border-r-1 h-full">
                    {semaforo.descripcion}
                    <input
                      type="checkbox"
                      name={semaforo.id}
                      onChange={handleCheckbox}
                      checked={!!seleccionados.find((id) => id === semaforo.id)}
                    />
                  </td>
                  <td>{stateColor(semaforo.estadoDispositivo)}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      onClick={() => handleDetail(semaforo.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-4/5 lg:w-2/5 flex flex-col p-4 gap-4 ">
          <ComandoIntermitencia />
          <ComandoSincronismo />
        </div>
      </div>
      <TablaPendientes />
    </>
  );
};

export default Comandos;
