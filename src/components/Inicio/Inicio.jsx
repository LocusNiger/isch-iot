/* eslint-disable no-unused-vars */
import {
  faDroplet,
  faLightbulb,
  faTrafficLight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GiWaterTank } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCloacasThunk,
  setLoraThunk,
  setPlantaThunk,
  setPozosThunk,
  setPuntosDePresionThunk,
  setUltralightThunk,
} from "../../features/aguas/thunks";
import { setLuminariasThunk } from "../../features/luminarias/thunks";
import { estadosThunk, semaforosThunk } from "../../features/semaforos/thunks";
import LogoISCH from "../../assets/SCH.png";
import Loader from "../Loader/Loader";
import {
  setMapaTablerosThunk,
  setTablerosThunk,
} from "../../features/tableros/thunks";

const Inicio = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const tokenAguas = localStorage.getItem("tokenAguas");
  const [cargado, setCargado] = useState(false);

  const luminariasRequest = () => {
    dispatch(setLuminariasThunk(token));
  };

  const semaforosRequest = () => {
    dispatch(semaforosThunk(token));
    dispatch(estadosThunk(token));
  };

  const aguasRequest = async () => {
    dispatch(setLoraThunk(tokenAguas));
    dispatch(setUltralightThunk(tokenAguas));
    dispatch(setPuntosDePresionThunk(tokenAguas));
    dispatch(setPozosThunk(tokenAguas));
    dispatch(setCloacasThunk(tokenAguas));
    dispatch(setPlantaThunk(tokenAguas));
    await setCargado(true);
  };

  const tablerosRequest = async () => {
    dispatch(setTablerosThunk(token));
    dispatch(setMapaTablerosThunk(token));
  };

  useEffect(() => {
    luminariasRequest();
    semaforosRequest();
    aguasRequest();
    tablerosRequest();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-center items-center h-1/5 lg:h-2/5 mt-10">
        <img
          src={LogoISCH}
          alt="Logo Ingeniería SCH"
          className="w-3/5 md:w-2/6 lg:w-1/6 h-auto hover:w-1/5 transition-all "
        />
      </div>
      {!cargado ? (
        <>
          <Loader />
          <p className="w-full text-center text-xl my-6">Cargando...</p>
        </>
      ) : (
        <div className="flex items-center justify-center gap-4 flex-wrap lg:gap-6 h-2/5 md:h-1/5 md:gap-10 lg:h-2/6">
          <Link to="/usuario">
            <div className="bg-red-500 hover:bg-red-600 active:bg-red-700 w-20 h-20 hover:w-24 hover:h-24 transition-all flex justify-center items-center rounded-full p-4 cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="text-white text-5xl" />
            </div>
          </Link>
          <Link to="/map">
            <div className="bg-green-500 hover:bg-green-600 active:bg-green-700 w-20 h-20 hover:w-24 hover:h-24 transition-all flex justify-center items-center rounded-full p-4 cursor-pointer">
              <FontAwesomeIcon
                icon={faTrafficLight}
                className="text-white text-6xl"
              />
            </div>
          </Link>
          <Link to="/luminaria/mapa">
            <div className="hover:w-24 hover:h-24 transition-all bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 w-20 h-20 flex justify-center items-center rounded-full p-4 cursor-pointer">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="text-white text-6xl"
              />
            </div>
          </Link>
          <Link to="/aguas/mapa">
            <div className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 hover:w-24 hover:h-24 transition-all w-20 h-20 flex justify-center items-center rounded-full p-4 cursor-pointer">
              <FontAwesomeIcon
                icon={faDroplet}
                className="text-white text-6xl"
              />
            </div>
          </Link>
          <Link to="/planta-potabilizadora/visualizacion">
            <div className="bg-orange-400 hover:bg-orange-500 active:bg-orange-600 hover:w-24 hover:h-24 transition-all w-20 h-20 flex justify-center items-center rounded-full p-4 cursor-pointer">
              <GiWaterTank className="text-white text-6xl" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Inicio;
