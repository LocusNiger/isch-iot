import axios from "axios"
const endpoint = "https://iot3.ischdesign.com:8297"

export const editSemaforo = async (token, id, newValues) => {
  try {
    const response = await axios.put(`${endpoint}/semaforos/${id}`, newValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export const editSecuencia = async (
  token,
  idSemaforo,
  idSecuencia,
  nuevaSecuencia
) => {
  try {
    const response = await axios.put(
      `${endpoint}/semaforos/${idSemaforo}/secuencias/${idSecuencia}`,
      nuevaSecuencia,
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
