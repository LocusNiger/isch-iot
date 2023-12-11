import { createSlice } from "@reduxjs/toolkit"
import { revertAll } from "../auth/authSlice"
const initialState = []

export const estadosSemaforosSlice = createSlice({
  name: "estadosSemaforos",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setEstadosAction: (state, action) => {
      const data = action.payload
      if (state.length === 0) {
        data.map((semaforo) => state.push(semaforo))
      } else if (state.length < data.length || state.length > data.length) {
        state.splice(0, state.length)
        data.map((semaforo) => state.push(semaforo))
      }
    },
    actualizarEstadoAction: (state, action) => {
      const nuevaConfiguracion = action.payload
      const foundSemaforo = state.find(
        (semaforo) => semaforo.id === nuevaConfiguracion.id
      )
      if (foundSemaforo && nuevaConfiguracion.simulacion === true) {
        foundSemaforo.estadoDispositivo = "EN_LINEA"
      } else if (foundSemaforo && nuevaConfiguracion.simulacion === false) {
        foundSemaforo.estadoDispositivo = "FUERA_DE_LINEA"
      }
    },
    deleteEstadoAction: (state, action) => {
      const semaforoToDelete = state.find(
        (semaforo) => semaforo.id === action.payload
      )
      if (semaforoToDelete) {
        state.splice(state.indexOf(semaforoToDelete), 1)
      }
    },
  },
})

export const { setEstadosAction, actualizarEstadoAction, deleteEstadoAction } =
  estadosSemaforosSlice.actions
export default estadosSemaforosSlice.reducer
