import axios from "axios"
const endpoint = "https://iot3.ischdesign.com:8098"

export const getEstadosNodos = async (token) => {
  try {
    const response = await axios.get(`${endpoint}/luminarias/estados`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const getEstadoSemaforoIdNodo = async (token, idNodo) => {
  try {
    const response = await axios.get(
      `${endpoint}/luminarias/estados/${idNodo}`,
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

export const getConfiguracionNodos = async (token) => {
  try {
    const response = await axios.get(`${endpoint}/luminarias/cfg`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const getNodoPorId = async (token, idNodo) => {
  try {
    const response = await axios.get(`${endpoint}/luminarias/cfg/${idNodo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const getCfgCompletaPorId = async (token, idNodo) => {
  try {
    const response = await axios.get(
      `${endpoint}/luminarias/cfg/${idNodo}/completa`,
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

export const editCfgNodo = async (token, idNodo, valores) => {
  try {
    const response = await axios.put(
      `${endpoint}/luminarias/cfg/${idNodo}`,
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

export const nuevaCfgNodo = async (token, valores) => {
  try {
    const response = await axios.post(`${endpoint}/luminarias/cfg`, valores, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const eliminarNodo = async (token, idNodo) => {
  try {
    const response = await axios.delete(
      `${endpoint}/luminarias/cfg/${idNodo}`,
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

export const editModoNodo = async (token, idNodo, valores) => {
  try {
    const response = await axios.put(
      `${endpoint}/luminarias/cfg/modo/${idNodo}`,
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

export const getEstrategiasNodos = async (token, idNodo) => {
  try {
    const response = await axios.get(
      `${endpoint}/luminarias/cfg/${idNodo}/estrategias`,
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

export const getEstrategiaPorId = async (token, idNodo, idEstrategia) => {
  try {
    const response = await axios.get(
      `${endpoint}/luminarias/cfg/${idNodo}/estrategias/${idEstrategia}`,
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

export const editEstrategia = async (token, idNodo, idEstrategia, valores) => {
  try {
    const response = await axios.put(
      `${endpoint}/luminarias/cfg/${idNodo}/estrategias/${idEstrategia}`,
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

export const forzarEncendidoNodo = async (token, valores) => {
  try {
    const response = await axios.post(
      `${endpoint}/luminarias/forzado/encendido`,
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

export const forzarBrilloNodo = async (token, valores) => {
  try {
    const response = await axios.post(
      `${endpoint}/luminarias/forzado/brillo`,
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

export const seteoHeartbeat = async (token, valores, idNodo) => {
  try {
    const response = await axios.post(
      `${endpoint}/luminarias/comando/heartbeat/${idNodo}`,
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

export const getConfiguracionForzado = async (token, idNodo) => {
  try {
    const response = await axios.get(
      `${endpoint}/luminarias/forzado/${idNodo}`,
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

export const getEstadoMaquinaDeComunicacion = async (token, idNodo) => {
  try {
    const response = await axios.get(
      `${endpoint}/luminarias/comandos/${idNodo}`,
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

export const edicionHeartbeat = async (token, idNodo, valores) => {
  try {
    const response = await axios.put(
      `${endpoint}/luminarias/cfg/heartbeat/${idNodo}`,
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

export const edicionValorForzado = async (token, idNodo, valores) => {
  try {
    const response = await axios.put(
      `${endpoint}/luminarias/cfg/forzado/${idNodo}`,
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

export const envioCfgFuncionamiento = async (token, idNodo) => {
  try {
    const response = await axios.post(
      `${endpoint}/luminarias/comandos/cfg/${idNodo}`,
      null,
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

export const consultarProcesoCfgFuncionamiento = async (token, hrefProceso) => {
  try {
    const response = await axios.get(`${endpoint}${hrefProceso}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}
