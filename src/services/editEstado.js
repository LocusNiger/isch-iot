import axios from "axios"
const endpoint = "https://iot3.ischdesign.com:8297"

export const addEstado = async (
  token,
  idSemaforo,
  idSecuencia,
  nuevoEstado
) => {
  try {
    const response = await axios.post(
      `${endpoint}/semaforos/${idSemaforo}/secuencias/${idSecuencia}/estados`,
      nuevoEstado,
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

export const deleteEstado = async (token, idSemaforo, idSecuencia) => {
  try {
    const response = await axios.delete(
      `${endpoint}/semaforos/${idSemaforo}/secuencias/${idSecuencia}/estados`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response.data)
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const addSalida = async (token, idSemaforo, idSecuencia) => {
  try {
    const response = await axios.post(
      `${endpoint}/semaforos/${idSemaforo}/secuencias/${idSecuencia}/salidas`,
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

export const deleteSalida = async (token, idSemaforo, idSecuencia) => {
  try {
    const response = await axios.delete(
      `${endpoint}/semaforos/${idSemaforo}/secuencias/${idSecuencia}/salidas`,
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
