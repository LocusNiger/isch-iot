/* eslint-disable no-unused-vars */
import {
  faCircleInfo,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  listaControladoresLora,
  listaUltralight,
} from "../../../services/aguas";
import Loader from "../../Loader/Loader";

const PAGINA_INICIAL = 1;
const ITEMS_POR_PAGINA = 10;

const TablaControladores = () => {
  const tokenAguas = localStorage.getItem("tokenAguas");
  const navigate = useNavigate();

  const LORA = useSelector((state) => state.aguas.controladoresLora);
  const ULTRALIGHT = useSelector(
    (state) => state.aguas.controladoresUltralight
  );
  const [loraToUse, setLoraToUse] = useState(null);
  const [ultraToUse, setUltraToUse] = useState(null);
  const [select, setSelect] = useState("LORA");
  const [items, setItems] = useState([...LORA].splice(0, ITEMS_POR_PAGINA));
  const [paginaActual, setPaginaActual] = useState(PAGINA_INICIAL);

  const getLora = async () => {
    const [dataLora, errorLora] = await listaControladoresLora(tokenAguas);
    if (dataLora) {
      setLoraToUse(dataLora);
    } else console.error(errorLora);
  };

  const getUltra = async () => {
    const [dataUltra, errorUltra] = await listaUltralight(tokenAguas);
    if (dataUltra) {
      setUltraToUse(dataUltra);
    } else console.error(errorUltra);
  };

  useEffect(() => {
    if (LORA.length !== 0 && ULTRALIGHT.length !== 0) {
      setLoraToUse(LORA);
      setUltraToUse(ULTRALIGHT);
    } else {
      getLora();
      getUltra();
    }
  }, [LORA, ULTRALIGHT]);

  setTimeout(() => {
    if (LORA.length !== 0 && ULTRALIGHT.length !== 0) {
      setLoraToUse(LORA);
      setUltraToUse(ULTRALIGHT);
    } else {
      getLora();
      getUltra();
    }
  }, 5000);

  const nextPage = () => {
    let totalElementos;
    if (select === "LORA") {
      totalElementos = loraToUse.length;
      const primerIndice = paginaActual * ITEMS_POR_PAGINA;
      if (primerIndice >= totalElementos) return;
      setItems([...loraToUse].splice(primerIndice, ITEMS_POR_PAGINA));
      setPaginaActual(paginaActual + 1);
    } else {
      totalElementos = ultraToUse.length;
      const primerIndice = paginaActual * ITEMS_POR_PAGINA;
      if (primerIndice >= totalElementos) return;
      setItems([...ultraToUse].splice(primerIndice, ITEMS_POR_PAGINA));
      setPaginaActual(paginaActual + 1);
    }
  };

  const prevPage = () => {
    if (select === "LORA") {
      const paginaAnterior = paginaActual - 1;
      if (paginaAnterior === 0) return;
      const primerIndice = paginaAnterior * ITEMS_POR_PAGINA - ITEMS_POR_PAGINA;
      setItems([...loraToUse].splice(primerIndice, ITEMS_POR_PAGINA));
      setPaginaActual(paginaActual - 1);
    } else {
      const paginaAnterior = paginaActual - 1;
      if (paginaAnterior === 0) return;
      const primerIndice = paginaAnterior * ITEMS_POR_PAGINA - ITEMS_POR_PAGINA;
      setItems([...ultraToUse].splice(primerIndice, ITEMS_POR_PAGINA));
      setPaginaActual(paginaActual - 1);
    }
  };

  const handleSelectControlador = (e) => {
    if (e.target.value === "LORA") {
      setSelect("LORA");
      setItems([...LORA].splice(0, ITEMS_POR_PAGINA));
      setPaginaActual(PAGINA_INICIAL);
    } else {
      setSelect("ULTRALIGHT");
      setItems([...ULTRALIGHT].splice(0, ITEMS_POR_PAGINA));
      setPaginaActual(PAGINA_INICIAL);
    }
  };

  const handleAddControlador = () => {
    navigate("/aguas/controladores/crear", { state: select });
  };

  const handleDetail = (id) => {
    navigate(`/aguas/controladores/detalle/${select}/${id}`);
  };
  return (
    <>
      {items !== null ? (
        <div id="table" className="flex justify-center items-center flex-col">
          <div className="my-8 flex items-center justify-center flex-col w-4/5">
            <div className="flex w-full justify-between items-center mb-7">
              <div className="w-full">
                <select
                  onChange={handleSelectControlador}
                  className="border p-2.5 w-2/5"
                >
                  <option value="LORA">Controladores Lora</option>
                  <option value="ULTRALIGHT">Controladores UltraLight</option>
                </select>
              </div>
              <div
                className="badge badge-primary py-3 cursor-pointer w-3/12 hover:bg-blue-700"
                onClick={() => handleAddControlador()}
              >
                Agregar controlador{" "}
                <span className="font-bold text-2xl ml-1">+</span>
              </div>
            </div>

            <table className="min-w-full border-collapse shadow rounded-md overflow-hidden box-border ">
              <thead>
                <tr>
                  <th className="p-2.5 bg-gray-50">#</th>
                  <th className="p-2.5 bg-gray-50">Nombre</th>
                  <th className="p-2.5 bg-gray-50">Descripción</th>
                  <th className="p-2.5 bg-gray-50">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {items.map((lora) => (
                  <tr className="" key={lora.latitud}>
                    <td className="p-2.5 border-r border-b">{lora.id}</td>
                    <td className="p-2.5 border-r border-b">
                      Nodo {lora.nombre}
                    </td>
                    <td className="p-2.5 border-r border-b">
                      {lora.descripcion}
                    </td>
                    <td className="flex items-center justify-evenly p-2.5 gap-2 border-b">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        onClick={() => handleDetail(lora.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <Link
                        // to={`/luminaria/nodos/editar/${nodo.nodoId}`}
                        state={lora}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Link>
                      <FontAwesomeIcon
                        icon={faTrash}
                        // onClick={() => handleDelete(parseInt(nodo.nodoId))}
                        style={{ cursor: "pointer" }}
                        className="hover:text-xl transition-all"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ol className="flex justify-center gap-1 font-medium mt-5">
              <li>
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-400"
                  onClick={() => prevPage()}
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <span className="block h-8 w-8 rounded border border-gray-100 text-center leading-8">
                  {paginaActual}
                </span>
              </li>

              <li>
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-400"
                  onClick={() => nextPage()}
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ol>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TablaControladores;
