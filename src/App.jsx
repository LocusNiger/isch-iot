import { Routes, Route } from "react-router-dom";
import Map from "./components/Map/Map";
import Devices from "./components/Devices/Devices";
import Form from "./components/Form/Form";
import Login2 from "./components/Login/Login2";
import Detail from "./components/Detail/Detail";
import Secuencia from "./components/Secuencia/Secuencia";
import EdicionSecuencia from "./components/EdicionSecuencia/EdicionSecuencia";
import Comandos from "./components/Comandos/Comandos";
import Inicio from "./components/Inicio/Inicio";
import TablaNodos from "./components/Luminarias/TablaNodos";
import DetalleNodos from "./components/Luminarias/DetalleNodos";
import EditarNodo from "./components/Luminarias/EditarNodo";
import MapaLuminaria from "./components/Luminarias/MapaLuminaria";
import { RutaProtegida } from "./components/RutaProtegida/RutaProtegida";
import { useSelector } from "react-redux";
import Usuario from "./components/Usuario/Usuario";
import MapaAguas from "./components/Aguas/MapaAguas";
import AltaControlador from "./components/Aguas/AltaControlador";
import TablaControladores from "./components/Aguas/Tablas/TablaControladores";
import TablaPresion from "./components/Aguas/Tablas/TablaPresion";
import TablaPozos from "./components/Aguas/Tablas/TablaPozos";
import TablaCloacas from "./components/Aguas/Tablas/TablaCloacas";
import DetallePresion from "./components/Aguas/Detalles/DetallePresion";
import DetalleCloacas from "./components/Aguas/Detalles/DetalleCloacas";
import DetallesPozos from "./components/Aguas/Detalles/DetallesPozos";
import DetalleControladores from "./components/Aguas/Detalles/DetalleControladores";
import PlantaPotabilizadora from "./components/Planta/PlantaPotabilizadora";
import TablaTableros from "./components/Tableros/Tablas/TablaTableros";
import MapaTableros from "./components/Tableros/MapaTableros";
import DetalleTableros from "./components/Tableros/DetalleTableros";
import "./App.css";
import Nav from "./components/NavBar/Navbar";

function App() {
  const token = useSelector((state) => state.userAuth.token);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Login2 />} />
        <Route element={<RutaProtegida token={token} />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="map" element={<Map />} />
          <Route path="devices" element={<Devices />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="form/:id" element={<Form />} />
          <Route path="/semaforos/crear" element={<Form />} />
          <Route
            path="detail/:id/secuencia/:secuenciaId"
            element={<Secuencia />}
          />
          <Route path="edit/:id/" element={<EdicionSecuencia />} />
          <Route path="comandos" element={<Comandos />} />
          <Route path="/luminaria/nodos" element={<TablaNodos />} />
          <Route path="/luminaria/mapa" element={<MapaLuminaria />} />
          <Route
            path="/luminaria/nodos/detalle/:id"
            element={<DetalleNodos />}
          />
          <Route path="/luminaria/nodos/crear" element={<EditarNodo />} />
          <Route path="/luminaria/nodos/editar/:id" element={<EditarNodo />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/aguas/controladores" element={<TablaControladores />} />
          <Route
            path="/aguas/controladores/detalle/:controlador/:id"
            element={<DetalleControladores />}
          />
          <Route
            path="/aguas/controladores/crear"
            element={<AltaControlador />}
          />
          <Route path="/aguas/presiones" element={<TablaPresion />} />
          <Route
            path="/aguas/presiones/detalle/:id"
            element={<DetallePresion />}
          />
          <Route path="/aguas/pozos" element={<TablaPozos />} />
          <Route path="/aguas/pozos/detalle/:id" element={<DetallesPozos />} />
          <Route path="/aguas/cloacas" element={<TablaCloacas />} />
          <Route
            path="/aguas/cloacas/detalle/:id"
            element={<DetalleCloacas />}
          />
          <Route path="/aguas/mapa" element={<MapaAguas />} />
          <Route
            path="/planta-potabilizadora/visualizacion"
            element={<PlantaPotabilizadora />}
          />
          <Route path="/tableros" element={<TablaTableros />} />
          <Route path="/tableros/:id" element={<DetalleTableros />} />
          <Route path="/tableros/mapa" element={<MapaTableros />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
