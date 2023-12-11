import { createSlice } from "@reduxjs/toolkit"
import { revertAll } from "../auth/authSlice"

const initialState = []

export const semaforosSlice = createSlice({
  name: "semaforos",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setSemaforosAction: (state, action) => {
      const semaforos = action.payload
      if (state.length === 0) {
        semaforos.map((semaforo) => state.push(semaforo))
      } else {
        state = semaforos
      }
    },
    addSemaforoAction: (state, action) => {
      const nuevoSemaforo = action.payload
      state.push(nuevoSemaforo)
    },
    deleteSemaforoAction: (state, action) => {
      const semaforoToDelete = state.find(
        (semaforo) => semaforo.configuracion.id === action.payload
      )
      if (semaforoToDelete) {
        state.splice(state.indexOf(semaforoToDelete), 1)
      }
    },
    editSemaforoAction: (state, action) => {
      const nuevaConfiguracion = action.payload
      const foundSemaforo = state.find(
        (semaforo) => semaforo.configuracion.id === nuevaConfiguracion.id
      )
      if (foundSemaforo) {
        foundSemaforo.configuracion.descripcion = nuevaConfiguracion.descripcion
        foundSemaforo.configuracion.eui = nuevaConfiguracion.eui
        foundSemaforo.configuracion.ip = nuevaConfiguracion.ip
        foundSemaforo.configuracion.latitud = nuevaConfiguracion.latitud
        foundSemaforo.configuracion.longitud = nuevaConfiguracion.longitud
        foundSemaforo.configuracion.nombre = nuevaConfiguracion.nombre
        foundSemaforo.configuracion.simulacion = nuevaConfiguracion.simulacion
      }
      if (nuevaConfiguracion.simulacion === true)
        foundSemaforo.estadoDispositivo = "EN_LINEA"
      else foundSemaforo.estadoDispositivo = "FUERA_DE_LINEA"
    },
    editSecuenciaAction: (state, action) => {
      const { semaforoId, nuevaSecuencia } = action.payload
      const foundSemaforo = state.find(
        (semaforo) => semaforo.configuracion.id === semaforoId
      )
      if (foundSemaforo) {
        foundSemaforo.configuracion.secuencias.forEach((secuencia) => {
          if (secuencia.id === nuevaSecuencia.id) {
            secuencia.estados = []
            nuevaSecuencia.estados.forEach((estado) =>
              secuencia.estados.push(estado)
            )
          }
        })
      }
    },
    addEstadoAction: (state, action) => {
      const { semaforoId, secuenciaId, estadoParaRedux } = action.payload
      const foundSemaforo = state.find(
        (semaforo) => semaforo.configuracion.id === semaforoId
      )
      if (foundSemaforo) {
        foundSemaforo.configuracion.secuencias.forEach((secuencia) => {
          if (secuencia.id === secuenciaId) {
            secuencia.estados.push(estadoParaRedux)
          }
        })
      }
    },
    deleteEstadoAction: (state, action) => {
      const { semaforoId, secuenciaId } = action.payload
      const foundSemaforo = state.find(
        (semaforo) => semaforo.configuracion.id === semaforoId
      )
      if (foundSemaforo) {
        foundSemaforo.configuracion.secuencias.forEach((secuencia) => {
          if (secuencia.id === secuenciaId) {
            secuencia.estados.pop()
          }
        })
      }
    },
    editHorarioAction: (state, action) => {
      const { idSemaforo, idHorario, nuevoHorario } = action.payload
      const foundSemaforo = state.find(
        (semaforo) => semaforo.configuracion.id === idSemaforo
      )
      if (foundSemaforo) {
        console.log("Semaforo encontrado")
        foundSemaforo.configuracion.horarios_periodicos.forEach(
          (horario, index) => {
            if (horario.id === idHorario) {
              foundSemaforo.configuracion.horarios_periodicos.splice(index, 1)
              foundSemaforo.configuracion.horarios_periodicos.push(nuevoHorario)
            }
          }
        )
      }
    },
    editHorarioParticularAction: (state, action) => {
      const { idSemaforo, idHorario, nuevoHorario } = action.payload
      const foundSemaforo = state.find(
        (semaforo) => semaforo.configuracion.id === idSemaforo
      )
      if (foundSemaforo) {
        foundSemaforo.configuracion.horarios_particulares.forEach((horario) => {
          if (horario.id === idHorario) {
            horario = {}
            horario = nuevoHorario
          }
        })
      }
    },
  },
})

export const {
  setSemaforosAction,
  addSemaforoAction,
  deleteSemaforoAction,
  editSemaforoAction,
  editSecuenciaAction,
  addEstadoAction,
  deleteEstadoAction,
  editHorarioAction,
  editHorarioParticularAction,
} = semaforosSlice.actions
export default semaforosSlice.reducer
