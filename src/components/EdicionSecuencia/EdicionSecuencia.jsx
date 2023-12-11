import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { editSecuenciaAction } from "../../features/semaforos/semaforosSlice"; //eslint-disable-line
import "./EdicionSecuenciaStyles.css";

const EdicionSecuencia = () => {
  const dispatch = useDispatch(); //eslint-disable-line
  const navigate = useNavigate();
  const semaforoId = parseInt(useParams().id);
  const allSemaforos = useSelector((state) => state.semaforos);
  const semaforoToUse = allSemaforos.filter(
    (semaforo) => semaforo.configuracion.id === semaforoId
  );
  const allSecuencias = semaforoToUse[0].configuracion.secuencias;
  const [secuenciaToUse, setSecuenciaToUse] = useState(allSecuencias[0]);
  const handleStatus = (estado) => {
    switch (estado) {
      case "EN_LINEA":
        return "En línea";
      case "FUERA_DE_LINEA":
        return "Fuera de línea";
      case "FALLA":
        return "Falla";
      default:
        break;
    }
  };
  const [estadosToUse, setEstadosToUse] = useState(secuenciaToUse.estados);
  const [salidasToUse, setSalidasToUse] = useState([]);

  const actualizarSalida = (nuevaSalida, indice) => {
    const salidasTemp = [...salidasToUse];
    salidasTemp[indice] = nuevaSalida;
    setSalidasToUse(salidasTemp);
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

  const actualizarEstado = (nuevaSalida, estadoId) => {
    console.log(estadosToUse);
    console.log(estadoId);
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

  const handleInputChange = (e, index, estadoIndice, estadoId) => {
    estadoIndice = estadoIndice - 1;
    const salidaIndice = parseInt(index); //eslint-disable-line
    const salidaValue = parseInt(e.target.value); //eslint-disable-line
    const tempSalida = [...salidasToUse[estadoIndice]];
    tempSalida[salidaIndice] = salidaValue;
    actualizarSalida(tempSalida, estadoId);
    actualizarEstado(tempSalida, estadoId);
  };

  const handleTiempoChange = (e, estadoId) => {
    const tiempo = parseInt(e.target.value);
    actualizarTiempo(tiempo, estadoId);
  };

  const handleSelectSecuencia = (e) => {
    const foundSecuencia = allSecuencias.find(
      (secuencia) => secuencia.id === parseInt(e.target.value)
    );
    setSecuenciaToUse(foundSecuencia);
  };

  const handleSubmit = () => {
    const tempSecuencia = { ...secuenciaToUse };
    tempSecuencia.estados = estadosToUse;
    const tempSemaforo = { semaforoId, nuevaSecuencia: tempSecuencia };
    dispatch(editSecuenciaAction(tempSemaforo));
    setSecuenciaToUse(tempSecuencia);
    navigate(-2);
  };

  return (
    <div className="containerEdicion">
      {semaforoToUse !== undefined ? (
        <div className="containerDatos">
          <div className="semaforoDatos">
            <h2>Datos del semáforo:</h2>
            <p>Id: {semaforoId}</p>
            <p>
              Estado de dispositivo:{" "}
              {handleStatus(semaforoToUse[0].estadoDispositivo)}
            </p>
          </div>
          <div>
            <label htmlFor="secuencia-select">Seleccionar secuencia</label>
            <select
              name="secuencias"
              id="secuencia-select"
              onChange={handleSelectSecuencia}
            >
              {semaforoToUse[0].configuracion.secuencias.map((secuencia) => (
                <option key={secuencia.id} value={secuencia.id}>
                  {secuencia.id}
                </option>
              ))}
            </select>
          </div>
          {secuenciaToUse !== undefined ? (
            <div className="containerSecuencia">
              <h1>Secuencia {secuenciaToUse.id}</h1>
              <div className="secuenciaDetail" key={secuenciaToUse.id}>
                <p>Id: {secuenciaToUse.id}</p>
                <p>Índice: {secuenciaToUse.indice}</p>
                <p>Movimientos: {secuenciaToUse.movimientos}</p>
                <p>Ciclo: {secuenciaToUse.ciclo}</p>
                <p>Sincronismo: {secuenciaToUse.sincronismo}</p>
                <p>Cantidad de estados: {secuenciaToUse.cant_estados}</p>
              </div>
              <div className="estadosContainer">
                <h2>Estados:</h2>
                <table className="estadosTabla">
                  <thead>
                    <tr>
                      <th>Índice</th>
                      <th>Salidas</th>
                      <th>Tiempo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!secuenciaToUse ? (
                      <div>Cargando..</div>
                    ) : (
                      secuenciaToUse.estados.map((estado) => (
                        <tr key={estado.id}>
                          <td>{estado.indice}</td>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              <tr>
                                {estado.salidas.map((salida, index) => (
                                  <input
                                    name="salida"
                                    key={index}
                                    type="number"
                                    min="0"
                                    max="3"
                                    defaultValue={salida}
                                    onChange={(e) =>
                                      handleInputChange(e, index, estado.indice)
                                    }
                                  />
                                ))}
                              </tr>
                            </tbody>
                          </table>
                          <td>
                            <input
                              type="number"
                              name="tiempo"
                              defaultValue={estado.tiempo}
                              onChange={(e) =>
                                handleTiempoChange(e, estado.indice)
                              }
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      ) : (
        <Loader />
      )}
      <div>
        <button style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
          Atrás
        </button>
        <button onClick={handleSubmit}>Guardar</button>
      </div>
    </div>
  );
};

export default EdicionSecuencia;
