/* eslint-disable no-unused-vars */
import axios from "axios"
const endpoint = "https://iot3.ischdesign.com:8197"
const authUrl = "https://iot1.ischdesign.com:8195/api/auth/signin"

export const loginAguas = async () => {
  try {
    const response = await axios.post(authUrl, {
      username: "superadmin",
      password: "mP9!T#gG%7*zC!sI",
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const listaControladoresLora = async (tokenAguas) => {
  try {
    const response = await axios.get(`${endpoint}/controlador/lora/cfg`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const cfgLoraPorId = async (tokenAguas, idControlador) => {
  try {
    const response = await axios.get(
      `${endpoint}/controlador/lora/cfg/${idControlador}`,
      {
        headers: {
          Authorization: `Bearer ${tokenAguas}`,
        },
      }
    )
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const altaControladorLora = async (tokenAguas, cuerpoReq) => {
  try {
    const response = await axios.post(
      `${endpoint}/controlador/lora/cfg`,
      cuerpoReq,
      {
        headers: {
          Authorization: `Bearer ${tokenAguas}`,
        },
      }
    )
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const altaAnalogicoDeEntrada = async (tokenAguas, cuerpoReq) => {
  try {
    const response = await axios.post(
      `${endpoint}/controlador/lora/entrada/analogica`,
      cuerpoReq,
      {
        headers: {
          Authorization: `Bearer ${tokenAguas}`,
        },
      }
    )
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const listaUltralight = async (tokenAguas) => {
  try {
    const response = await axios.get(`${endpoint}/controlador/ultralight/cfg`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const cfgUltralightPorId = async (tokenAguas, idControlador) => {
  try {
    const response = await axios.get(
      `${endpoint}/controlador/ultralight/cfg/${idControlador}`,
      {
        headers: {
          Authorization: `Bearer ${tokenAguas}`,
        },
      }
    )
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const altaUltralight = async (tokenAguas, cuerpoReq) => {
  try {
    const response = await axios.post(
      `${endpoint}/controlador/ultralight/cfg`,
      cuerpoReq,
      {
        headers: {
          Authorization: `Bearer ${tokenAguas}`,
        },
      }
    )
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const listaVariables = async (
  tokenAguas,
  tipo1,
  valor1,
  tipo2,
  valor2
) => {
  try {
    /* ejemplo endpoint: <host>:<port>/variables?entrada=true&analogica=true */
    const response = await axios.get(
      `${endpoint}/variables?${tipo1}=${valor1}&${tipo2}=${valor2}`,
      {
        headers: {
          Authorization: `Bearer ${tokenAguas}`,
        },
      }
    )
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const mapaPuntosDePresion = async (tokenAguas) => {
  try {
    const response = await axios.get(`${endpoint}/presion/mapa`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const listaPuntosDePresion = async (tokenAguas) => {
  try {
    const response = await axios.get(`${endpoint}/presion/cfg`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const cfgPuntoDePresionPorId = async (tokenAguas, idPuntoDePresion) => {
  try {
    const response = await axios.get(
      `${endpoint}/presion/cfg/${idPuntoDePresion}`,
      {
        headers: {
          Authorization: `Bearer ${tokenAguas}`,
        },
      }
    )
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const altaPuntoDePresion = async (tokenAguas, cuerpoReq) => {
  try {
    const response = await axios.post(`${endpoint}/presion/cfg`, cuerpoReq, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const edicionPuntoDePresion = async (tokenAguas, cuerpoReq) => {
  try {
    const response = await axios.put(`${endpoint}/presion/cfg`, cuerpoReq, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const mapaPozos = async (tokenAguas) => {
  try {
    const response = await axios.get(`${endpoint}/pozo/mapa`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const listaPozos = async (tokenAguas) => {
  try {
    const response = await axios.get(`${endpoint}/pozo/cfg`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const cfgPozoPorId = async (tokenAguas, idPozo) => {
  try {
    const response = await axios.get(`${endpoint}/pozo/cfg/${idPozo}`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const mapaCloacas = async (tokenAguas) => {
  try {
    const response = await axios.get(`${endpoint}/cloaca/mapa`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const listaCloacas = async (tokenAguas) => {
  try {
    const response = await axios.get(`${endpoint}/cloaca/cfg`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const cfgCloacaPorId = async (tokenAguas, idCloaca) => {
  try {
    const response = await axios.get(`${endpoint}/cloaca/cfg/${idCloaca}`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const estadoPlantaPotabilizadora = async (tokenAguas) => {
  try {
    const response = await axios.get(`${endpoint}/plantapot/estado`, {
      headers: {
        Authorization: `Bearer ${tokenAguas}`,
      },
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}
