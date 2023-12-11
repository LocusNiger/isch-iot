/* eslint-disable no-unused-vars */
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { getCfgTableros } from "../../../services/tableros";

const PAGINA_INICIAL = 1;
const ITEMS_POR_PAGINA = 10;

const TablaTableros = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const tableros = useSelector((state) => state.tableros.tableros);
  const [tablerosToUse, setTablerosToUse] = useState(null);
  const [items, setItems] = useState([...tableros].splice(0, ITEMS_POR_PAGINA));
  const [paginaActual, setPaginaActual] = useState(PAGINA_INICIAL);

  const getTableros = async () => {
    const [dataTableros, errorTableros] = await getCfgTableros(token);
    if (dataTableros) {
      setTablerosToUse(dataTableros);
      setPaginaActual(PAGINA_INICIAL);
    } else {
      console.error(errorTableros);
    }
  };

  useEffect(() => {
    if (tableros.length !== 0) {
      setTablerosToUse(tableros);
    } else {
      getTableros();
    }
  }, [tableros]);

  const calculateItemsToShow = (currentPage) => {
    const primerIndice = (currentPage - 1) * ITEMS_POR_PAGINA;
    return tablerosToUse.slice(primerIndice, primerIndice + ITEMS_POR_PAGINA);
  };

  setTimeout(() => {
    if (tableros.length !== 0) {
      setTablerosToUse(tableros);
    } else {
      getTableros();
    }
  }, 5000);

  const nextPage = () => {
    const totalElementos = tablerosToUse.length;
    const ultimaPagina = Math.ceil(totalElementos / ITEMS_POR_PAGINA);
    if (paginaActual >= ultimaPagina) return;
    setItems(calculateItemsToShow(paginaActual + 1));
    setPaginaActual(paginaActual + 1);
  };

  const prevPage = () => {
    if (paginaActual <= PAGINA_INICIAL) return;
    setItems(calculateItemsToShow(paginaActual - 1));
    setPaginaActual(paginaActual - 1);
  };

  const handleDetail = (id) => {
    navigate(`/tableros/${id}`);
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
                {items.map((tablero) => (
                  <tr className="" key={tablero.latitud}>
                    <td className="p-2.5 border-r border-b">{tablero.id}</td>
                    <td className="p-2.5 border-r border-b">
                      Nodo {tablero.nombre}
                    </td>
                    <td className="p-2.5 border-r border-b">
                      {tablero.descripcion}
                    </td>
                    <td className="flex items-center justify-center p-3 gap-2 border-b">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        onClick={() => handleDetail(tablero.id)}
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

export default TablaTableros;
