/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Login } from "../../services/auth";
import "./styles.css";
import { loginAction } from "../../features/auth/authSlice";
import { loginAguas } from "../../services/aguas";

const Login2 = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordView, setPasswordView] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const [data, error] = await Login(username, password);
    const [dataAguas, errorAguas] = await loginAguas();
    if (data) {
      dispatch(
        loginAction({
          data,
          isLogged: true,
        })
      );
      if (dataAguas) {
        localStorage.setItem("tokenAguas", dataAguas.token);
      }
      navigate("/inicio");
    } else {
      console.error(error);
      console.error(errorAguas);
      switch (error.response.status) {
        case 401:
          return alert("Credenciales inválidas");
        case 400:
          return alert("Usuario y/o contraseña incorrecto");
        default:
          break;
      }
    }
  };

  const handleViewPassword = () => {
    setPasswordView(!passwordView);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Iniciar sesión</h1>
        </div>
        <form
          className="mx-auto mt-8 mb-0 max-w-md space-y-4"
          onSubmit={handleSubmitForm}
        >
          <div>
            <label htmlFor="username" className="sr-only">
              Usuario
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Usuario"
                onChange={handleInputChange}
                name="username"
                required="required"
              />
              <span className="absolute inset-y-0 right-4 inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="contraseña" className="sr-only">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={!passwordView ? "password" : "text"}
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Contraseña"
                onChange={handleInputChange}
                name="password"
                required="required"
              />
              <span className="absolute inset-y-0 right-4 inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => handleViewPassword()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login2;
