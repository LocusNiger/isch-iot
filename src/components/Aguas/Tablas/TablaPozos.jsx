/* eslint-disable no-unused-vars */
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listaPozos } from "../../../services/aguas";
import Loader from "../../Loader/Loader";

const PAGINA_INICIAL = 1;
const ITEMS_POR_PAGINA = 10;

const TablaPozos = () => {
  const tokenAguas = localStorage.getItem("tokenAguas");
  const navigate = useNavigate();
  const pozos = useSelector((state) => state.aguas.pozos);
  const [pozosToUse, setPozosToUse] = useState(null);
  const [items, setItems] = useState([...pozos].splice(0, ITEMS_POR_PAGINA));
  const [paginaActual, setPaginaActual] = useState(PAGINA_INICIAL);

  const getPozos = async () => {
    const [dataPozos, errorPozos] = await listaPozos(tokenAguas);
    if (dataPozos) {
      setPozosToUse(dataPozos);
    } else console.error(errorPozos);
  };

  useEffect(() => {
    if (pozos.length !== 0) {
      setPozosToUse(pozos);
    } else {
      getPozos();
    }
  }, [pozos]);

  setTimeout(() => {
    if (pozos.length !== 0) {
      setPozosToUse(pozos);
    } else {
      getPozos();
    }
  }, 5000);

  const nextPage = () => {
    const totalElementos = pozosToUse.length;
    const primerIndice = paginaActual * ITEMS_POR_PAGINA;
    if (primerIndice >= totalElementos) return;
    setItems([...pozosToUse].splice(primerIndice, ITEMS_POR_PAGINA));
    setPaginaActual(paginaActual + 1);
  };

  const prevPage = () => {
    const paginaAnterior = paginaActual - 1;
    if (paginaAnterior === 0) return;
    const primerIndice = paginaAnterior * ITEMS_POR_PAGINA - ITEMS_POR_PAGINA;
    setItems([...pozosToUse].splice(primerIndice, ITEMS_POR_PAGINA));
    setPaginaActual(paginaAnterior);
  };

  const handleDetail = (id) => {
    navigate(`/aguas/pozos/detalle/${id}`);
  };

  return (
    <>
      {items !== null ? (
        <div id="table" className="flex justify-center items-center flex-col">
          <div className="my-8 flex items-center justify-center flex-col w-4/5">
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
                    <td className="flex items-center justify-center p-3 gap-2 border-b">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        onClick={() => handleDetail(lora.id)}
                        style={{ cursor: "pointer" }}
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

export default TablaPozos;
