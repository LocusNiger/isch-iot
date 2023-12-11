import { createSlice } from "@reduxjs/toolkit"
import { revertAll } from "../auth/authSlice"

const initialState = {
  semaforosSeleccionados: [],
  procesos: [],
}

export const seleccionados = createSlice({
  name: "seleccionados",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    addSemaforos: (state, action) => {
      const semaforoId = action.payload
      const repetido = state.semaforosSeleccionados.find(
        (id) => id === semaforoId
      )
      if (!repetido) state.semaforosSeleccionados.push(semaforoId)
    },
    deleteSemaforo: (state, action) => {
      const semaforoId = action.payload
      const foundSemaforo = state.semaforosSeleccionados.find(
        (id) => id === semaforoId
      )
      if (foundSemaforo) {
        state.semaforosSeleccionados.splice(
          state.semaforosSeleccionados.indexOf(foundSemaforo),
          1
        )
      }
    },
    addProcesos: (state, action) => {
      const nuevoProceso = action.payload
      const repetido = state.procesos.find(
        (proceso) => proceso.id === nuevoProceso.id
      )
      if (!repetido) state.procesos.push(nuevoProceso)
    },
  },
})

export const { addSemaforos, deleteSemaforo, addProcesos } =
  seleccionados.actions
export default seleccionados.reducer
