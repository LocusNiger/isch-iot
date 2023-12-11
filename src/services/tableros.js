/* eslint-disable no-unused-vars */
import axios from "axios"
const endpoint = "https://iot3.ischdesign.com:8097"

export const getCfgTableros = async (token) => {
  try {
    const response = await axios.get(`${endpoint}/tableros/cfg`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response) {
      return [response.data, null]
    }
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const getCfgTableroPorId = async (token, idTablero) => {
  try {
    const response = await axios.get(`${endpoint}/tableros/cfg/${idTablero}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const edicionCfgTableroPorId = async (token, idTablero, nuevoModo) => {
  try {
    const response = await axios.put(
      `${endpoint}/tableros/cfg/${idTablero}`,
      {
        modo: nuevoModo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const tablaEstadoTableros = async (token, ids) => {
  try {
    const response = await axios.post(
      `${endpoint}/tableros/estados/tabla`,
      ids,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const getEstadoTableroPorId = async (token, idTablero) => {
  try {
    const response = await axios.get(
      `${endpoint}/tableros/estado/${idTablero}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const getMapaTableros = async (token) => {
  try {
    const response = await axios.get(`${endpoint}/tableros/mapa`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const getHistoricoTablero = async (token, idTablero, fechas) => {
  try {
    const response = await axios.post(
      `${endpoint}/tableros/historicos/${idTablero}`,
      fechas,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const getTiposEventosTableros = async (token) => {
  try {
    const response = await axios.get(`${endpoint}/tableros/eventos/tipos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const getEventosTablerosPorFecha = async (token, fechas) => {
  try {
    const response = await axios.post(`${endpoint}/tableros/eventos/`, fechas, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const getEventosTablerosPorId = async (token, idTablero, fechas) => {
  try {
    const response = await axios.post(
      `${endpoint}/tableros/eventos/${idTablero}`,
      fechas,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const tablerosComandoCalendario = async (token, data) => {
  try {
    const response = await axios.post(
      `${endpoint}/tableros/cmd/calendario`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const tablerosComandoForzado = async (token, data) => {
  try {
    const response = await axios.post(
      `${endpoint}/tableros/cmd/forzado`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}
