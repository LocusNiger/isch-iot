import { configureStore } from "@reduxjs/toolkit"
import userAuthReducer from "../features/auth/authSlice"
import semaforosReducer from "../features/semaforos/semaforosSlice"
import estadosSemaforosReducer from "../features/estadosSemaforos/estadosSemaforosSlice"
import seleccionadosReducer from "../features/seleccionados/seleccionadosSlice"
import luminariasReducer from "../features/luminarias/luminariasSlice"
import pendientesReducer from "../features/pendientes/pendientesSlice"
import aguasReducer from "../features/aguas/aguasSlice"
import tablerosReducer from "../features/tableros/tablerosSlice"

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    semaforos: semaforosReducer,
    estadosSemaforos: estadosSemaforosReducer,
    luminarias: luminariasReducer,
    aguas: aguasReducer,
    seleccionados: seleccionadosReducer,
    pendientes: pendientesReducer,
    tableros: tablerosReducer,
  },
})
