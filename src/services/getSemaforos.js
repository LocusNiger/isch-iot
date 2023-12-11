import axios from "axios"
const endpoint = "https://iot3.ischdesign.com:8297"

// Configuración de semáforos
export const getSemaforos = async (token) => {
  try {
    const response = await axios(`${endpoint}/semaforos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const getConfiguracionSemaforo = async (token, id) => {
  try {
    const response = await axios(`${endpoint}/semaforos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

// Configuración completa de un semáforo
export const getSemaforoDetail = async (token, id) => {
  try {
    const response = await axios(`${endpoint}/semaforos/${id}/completo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

// Estados de todos los semáforos
export const getEstadosSemaforos = async (token) => {
  try {
    const response = await axios(`${endpoint}/semaforos/estados`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

// Estado individual de un semáforo
export const getEstado = async (token, id) => {
  try {
    const response = await axios(`${endpoint}/semaforos/estados/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const addSemaforo = async (token, cuerpoReq) => {
  try {
    const response = await axios.post(`${endpoint}/semaforos`, cuerpoReq, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const eliminarSemaforo = async (token, idSemaforo) => {
  try {
    const response = await axios.delete(`${endpoint}/semaforos/${idSemaforo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const consultarEstadoProceso = async (token, idProceso) => {
  try {
    const response = await axios(
      `${endpoint}/semaforos/procesos/${idProceso}`,
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

export const getSecuenciaPorId = async (token, idSemaforo, idSecuencia) => {
  try {
    const response = await axios(
      `${endpoint}/semaforos/${idSemaforo}/secuencias/${idSecuencia}`,
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
