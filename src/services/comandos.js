import axios from "axios"
const endpoint = "https://iot3.ischdesign.com:8297"

export const setIntermitencia = async (token, valores) => {
  try {
    const response = await axios.post(
      `${endpoint}/semaforos/comandos/intermitencia`,
      valores,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const setSincronismo = async (token, valores) => {
  try {
    const response = await axios.post(
      `${endpoint}/semaforos/comandos/sincronismo`,
      valores,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const getEstadoProcesoPorId = async (token, idProceso) => {
  try {
    const response = await axios.get(
      `${endpoint}/semaforos/comandos/${idProceso}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const getHistorialDeProcesos = async (token) => {
  try {
    const response = await axios.get(
      `${endpoint}/semaforos/comandos/historial`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const getHistorialPorUsuario = async (token, idUsuario) => {
  try {
    const response = await axios.get(
      `${endpoint}/semaforos/comandos/historial/${idUsuario}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const modificarHorario = async (token, valores) => {
  try {
    const response = await axios.post(
      `${endpoint}/semaforos/comandos/horarios`,
      valores,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const modificarSecuencia = async (token, valores) => {
  try {
    const response = await axios.post(
      `${endpoint}/semaforos/comandos/secuencia`,
      valores,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}
