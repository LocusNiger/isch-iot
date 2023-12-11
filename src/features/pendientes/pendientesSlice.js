import { createSlice } from "@reduxjs/toolkit"
import { revertAll } from "../auth/authSlice"

const initialState = []

export const pendientes = createSlice({
  name: "pendientes",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    agregarPendiente: (state, action) => {
      const { data, descripcion } = action.payload
      let procesoPendiente
      switch (descripcion) {
        case "Alta de semáforo":
        case "Eliminación de semáforo":
          procesoPendiente = {
            idProceso: data.id_proceso,
            estado: data.estado,
            accion: data.accion,
            emision: data.timestamp_emision,
            linkProceso: data.href_proceso,
            descripcion,
          }
          state.push(procesoPendiente)
          break
        case "Cambio de intermitencia":
        case "Modificación de sincronismo":
        case "Modificación de horarios":
        case "Modificación de secuencia":
          procesoPendiente = {
            idProceso: data.id,
            estadosComunicacion: data.estados_comunicacion,
            errores: data.errores,
            descripcion,
          }
          state.push(procesoPendiente)
          break
        case "Envío de configuraciones de funcionamiento":
          procesoPendiente = {
            idProceso: data.idProceso,
            idNodo: data.idNodo,
            proceso: data.proceso,
            estado: data.estado,
            hrefProceso: data.hrefProceso,
            descripcion,
          }
          state.push(procesoPendiente)
          break
        default:
          break
      }
    },
    eliminarPendiente: (state, action) => {
      const idProcesoAEliminar = action.payload
      const foundProceso = state.find(
        (proceso) => proceso.idProceso === idProcesoAEliminar
      )
      if (foundProceso) {
        state.splice(state.indexOf(foundProceso), 1)
      }
    },
  },
})

export const { agregarPendiente, eliminarPendiente } = pendientes.actions
export default pendientes.reducer
