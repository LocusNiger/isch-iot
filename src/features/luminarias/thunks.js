/* eslint-disable no-unused-vars */
import {
  editCfgNodo,
  getCfgCompletaPorId,
  getEstadosNodos,
  nuevaCfgNodo,
} from "../../services/alumbrado"
import { editCfgAction, setLuminariasAction } from "./luminariasSlice"

export const setLuminariasThunk = (token) => {
  return async (dispatch) => {
    let nodos = []
    const [dataEstados, errorEstados] = await getEstadosNodos(token)
    if (dataEstados) {
      nodos = dataEstados
    } else console.error(errorEstados.message)

    nodos.forEach(async (nodo) => {
      const nodoToUse = nodo
      const [cfgIndividual, errorCfg] = await getCfgCompletaPorId(
        token,
        nodoToUse.nodoId
      )
      if (cfgIndividual) {
        nodoToUse.eui = cfgIndividual.eui
        nodoToUse.nombre = cfgIndividual.nombre
        nodoToUse.descripcion = cfgIndividual.descripcion
        nodoToUse.valorForzado = cfgIndividual.valorForzado
        nodoToUse.porcentajeForzado = cfgIndividual.porcentajeForzado
        nodoToUse.frecuenciaHeartbeat = cfgIndividual.frecuenciaHeartbeat
        nodoToUse.tasaVerificacionFecha = cfgIndividual.tasaVerificacionFecha
        nodoToUse.simulacion = cfgIndividual.simulacion
        nodoToUse.estrategias = cfgIndividual.estrategias
      } else console.error(errorCfg)
      await dispatch(setLuminariasAction(nodoToUse))
    })
  }
}

export const createNodoThunk = (token, cuerpoReq) => {
  return async () => {
    const [data, error] = await nuevaCfgNodo(token, cuerpoReq)
    if (data) {
      return [data, null]
    } else {
      return [null, error]
    }
  }
}

export const editCfgThunk = (token, id, cuerpoReq) => {
  return async (dispatch) => {
    const [data, error] = await editCfgNodo(token, id, cuerpoReq)
    if (data) {
      dispatch(editCfgAction(data))
      return [data, null]
    } else {
      return [null, error]
    }
  }
}
