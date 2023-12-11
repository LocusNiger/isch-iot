import { addEstado, addSalida, deleteSalida } from "../../services/editEstado"
import { editSecuencia, editSemaforo } from "../../services/editSemaforo"
import {
  getEstadosSemaforos,
  getSemaforos,
  getSemaforoDetail,
  addSemaforo,
  eliminarSemaforo,
} from "../../services/getSemaforos"
import {
  editHorarioEspecifico,
  editHorarioPeriodico,
} from "../../services/horarios"
import {
  actualizarEstadoAction,
  setEstadosAction,
} from "../estadosSemaforos/estadosSemaforosSlice"
import { editSemaforoAction, setSemaforosAction } from "./semaforosSlice"

export const semaforosThunk = (token) => {
  return async (dispatch) => {
    const ids = []
    const semaforos = []
    const [dataSemaforos, error] = await getSemaforos(token)
    if (dataSemaforos) {
      dataSemaforos.map((semaforo) => ids.push(semaforo.id))
    } else console.error(error)
    await Promise.all(
      ids.map(async (id) => {
        const [data, error] = await getSemaforoDetail(token, id)
        if (data) {
          semaforos.push(data)
        } else console.error(error)
      })
    )
    dispatch(setSemaforosAction(semaforos))
    return dataSemaforos
  }
}

export const createSemaforoThunk = (token, cuerpoReq) => {
  return async () => {
    const [data, error] = await addSemaforo(token, cuerpoReq)
    if (data) {
      return [data, null]
    } else {
      return [null, error]
    }
  }
}

export const deleteSemaforoThunk = (token, idSemaforo) => {
  return async () => {
    const [data, error] = await eliminarSemaforo(token, idSemaforo)
    if (data) {
      return [data, null]
    } else {
      return [null, error]
    }
  }
}

export const editCfgSemaforoThunk = (token, idSemaforo, nuevaConfiguracion) => {
  return async (dispatch) => {
    const [data, error] = await editSemaforo(
      token,
      idSemaforo,
      nuevaConfiguracion
    )
    if (data) {
      dispatch(editSemaforoAction(nuevaConfiguracion))
      dispatch(actualizarEstadoAction(nuevaConfiguracion.simulacion))
      return [data, null]
    } else return [null, error]
  }
}

export const estadosThunk = (token) => {
  return async (dispatch) => {
    const [data, error] = await getEstadosSemaforos(token)
    if (data) {
      dispatch(setEstadosAction(data))
      return [data, null]
    } else return [null, error]
  }
}

export const secuenciaThunk = (
  token,
  idSemaforo,
  idSecuencia,
  nuevaSecuencia
) => {
  return async () => {
    const [data, error] = await editSecuencia(
      token,
      idSemaforo,
      idSecuencia,
      nuevaSecuencia
    )
    if (data) {
      return data
    } else console.error(error)
  }
}

export const addEstadoThunk = (token, idSemaforo, idSecuencia, nuevoEstado) => {
  return async () => {
    const [data, error] = await addEstado(
      token,
      idSemaforo,
      idSecuencia,
      nuevoEstado
    )
    if (data) return data
    else console.error(error)
  }
}

export const addSalidaThunk = (token, idSemaforo, idSecuencia) => {
  return async () => {
    const [data, error] = await addSalida(token, idSemaforo, idSecuencia)
    if (data) return data
    else console.error(error)
  }
}

export const deleteSalidaThunk = (token, idSemaforo, idSecuencia) => {
  return async () => {
    const [data, error] = await deleteSalida(token, idSemaforo, idSecuencia)
    if (data) return data
    else console.error(error)
  }
}

export const editHorarioPeriodicoThunk = (
  token,
  idSemaforo,
  idHorario,
  nuevoHorario
) => {
  return async () => {
    const [data, error] = await editHorarioPeriodico(
      token,
      idSemaforo,
      idHorario,
      nuevoHorario
    )
    if (data) return [data, null]
    else return [null, error]
  }
}
export const editHorarioParticularThunk = (
  token,
  idSemaforo,
  idHorario,
  nuevoHorario
) => {
  return async () => {
    const [data, error] = await editHorarioEspecifico(
      token,
      idSemaforo,
      idHorario,
      nuevoHorario
    )
    if (data) return [data, null]
    else return [null, error]
  }
}
