import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction, revertAll } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const location = useLocation();
  const userState = useSelector((state) => state.userAuth.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(revertAll());
    dispatch(logoutAction({ isLogged: false }));
    navigate("/");
  };
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  if (location.pathname === "/inicio") return null;

  return (
    <header className="py-3 px-5 border-b border-gray-300">
      {userState ? (
        <div className="flex w-full justify-between">
          <ul className="flex justify-between items-center gap-3 ">
            <Link className="btn btn-ghost" to="/inicio">
              Inicio
            </Link>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost ">
                Semáforos
                <span>
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </span>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={handleClick}>
                  <Link
                    to="/map"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none  active:bg-gray-300"
                    activeclassname="active"
                  >
                    Mapa
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    to="/devices"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Dispositivos
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    to="/comandos"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Comandos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost ">
                Luminaria
                <span>
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </span>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={handleClick}>
                  <Link
                    to="/luminaria/mapa"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Mapa
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    to="/luminaria/nodos"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Dispositivos
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    to="/comandos"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Comandos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost ">
                Tableros
                <span>
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </span>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={handleClick}>
                  <Link
                    to="/tableros"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Tableros
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    to="/tableros/mapa"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Mapa
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost ">
                Aguas
                <span>
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </span>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={handleClick}>
                  <Link
                    to="/aguas/mapa"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Mapa
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    to="/aguas/controladores"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Controladores
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    to="/aguas/presiones"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Puntos de presión
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    to="/aguas/pozos"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Pozos
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    to="/aguas/cloacas"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Cloacas
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost ">
                Planta potabilizadora
                <span>
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </span>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={handleClick}>
                  <Link
                    to="/planta-potabilizadora/visualizacion"
                    className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
                    activeclassname="active"
                  >
                    Visualización
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
          <div>
            <NavLink
              onClick={handleLogOut}
              className="inline-block rounded p-3 hover:bg-red-300 focus:outline-none   active:bg-red-400 hover:text-white active:text-white"
              to="/"
            >
              Salir{"   "}
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <Link
            className="inline-block rounded p-3 hover:bg-gray-100 focus:outline-none   active:bg-gray-300"
            to="/"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Nav;
