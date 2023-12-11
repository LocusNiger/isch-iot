import { createSlice } from "@reduxjs/toolkit"
import { revertAll } from "../auth/authSlice"
const initialState = []

export const luminariasSlice = createSlice({
  name: "luminarias",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setLuminariasAction: (state, action) => {
      const nuevoNodo = action.payload
      let nodoEncontrado = state.find(
        (nodo) => nodo.nodoId === nuevoNodo.nodoId
      )
      if (nodoEncontrado) {
        nodoEncontrado = nuevoNodo
      } else {
        state.push(nuevoNodo)
      }
    },
    createNodoAction: (state, action) => {
      const nuevoNodo = action.payload
      state.push(nuevoNodo)
    },
    editCfgAction: (state, action) => {
      const nuevaCfg = action.payload
      const foundNodo = state.find((nodo) => nodo.nodoId === nuevaCfg.id)
      if (foundNodo) {
        foundNodo.eui = nuevaCfg.eui
        foundNodo.longitud = nuevaCfg.longitud
        foundNodo.latitud = nuevaCfg.latitud
        foundNodo.nombre = nuevaCfg.nombre
        foundNodo.descripcion = nuevaCfg.descripcion
        foundNodo.modo = nuevaCfg.modo
        foundNodo.habilitacionForzado = nuevaCfg.habilitacionForzado
        foundNodo.valorForzado = nuevaCfg.valorForzado
        foundNodo.porcentajeForzado = nuevaCfg.porcentajeForzado
        foundNodo.frecuenciaHeartBeat = nuevaCfg.frecuenciaHeartBeat
        foundNodo.tasaVerificacionFecha = nuevaCfg.tasaVerificacionFecha
      }
    },
    deleteNodoAction: (state, action) => {
      const nodoToDelete = state.find((nodo) => nodo.nodoId === action.payload)
      if (nodoToDelete) {
        state.splice(state.indexOf(nodoToDelete), 1)
      }
    },
    modificarModoAction: (state, action) => {
      const nuevoModo = action.payload
      console.log(nuevoModo)
      const foundNodo = state.find((nodo) => nodo.nodoId === nuevoModo.id)
      if (foundNodo) {
        console.log("Modo anterior: " + foundNodo.modo)
        foundNodo.modo = nuevoModo.modo
      }
    },
    modificarHeartbeatAction: (state, action) => {
      const nuevoHeartbeat = action.payload
      console.log(nuevoHeartbeat)
      const foundNodo = state.find((nodo) => nodo.nodoId === nuevoHeartbeat.id)
      if (foundNodo) {
        console.log("Heartbeat anterior: " + foundNodo.frecuenciaHeartbeat)
        foundNodo.frecuenciaHeartbeat = nuevoHeartbeat.frecuenciaHeartbeat
      }
    },
    modificarValorForzadoAction: (state, action) => {
      const nuevoValor = action.payload
      console.log(nuevoValor)
      const foundNodo = state.find((nodo) => nodo.nodoId === nuevoValor.id)
      if (foundNodo) {
        foundNodo.valorForzado = nuevoValor.valorForzado
        foundNodo.porcentajeForzado = nuevoValor.porcentajeForzado
        console.log("Valor forzado actualizado")
      }
    },
    modificarEstrategiaAction: (state, action) => {
      const nuevosDatos = action.payload
      const foundNodo = state.find((nodo) => nodo.nodoId === nuevosDatos.id)
      if (foundNodo) {
        const foundEstrategia = foundNodo.estrategias.find(
          (estrategia) => estrategia.id === nuevosDatos.data.id
        )
        if (foundEstrategia) {
          foundEstrategia.brillo = nuevosDatos.data.brillo
          foundEstrategia.encendido = nuevosDatos.data.encendido
          foundEstrategia.hora = nuevosDatos.data.hora
        }
        console.log(
          `Estrategia n${foundEstrategia.numeroEstrategia} actualizada`
        )
      }
    },
  },
})

export const {
  setLuminariasAction,
  editCfgAction,
  createNodoAction,
  deleteNodoAction,
  modificarModoAction,
  modificarHeartbeatAction,
  modificarValorForzadoAction,
  modificarEstrategiaAction,
} = luminariasSlice.actions
export default luminariasSlice.reducer
