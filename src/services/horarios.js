import axios from "axios"
const endpoint = "https://iot3.ischdesign.com:8297"

// Lectura de horarios periódicos por id de semáforo
export const getHorariosPeriodicos = async (token, idSemaforo) => {
  try {
    const response = await axios.get(
      `${endpoint}/semaforos/${idSemaforo}/horarios/periodicos`,
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

// Lectura de horario periódico por id de horario
export const getHorarioPorId = async (token, idSemaforo, idHorario) => {
  try {
    const response = await axios.get(
      `${endpoint}/semaforos/${idSemaforo}/horarios/periodicos/${idHorario}`,
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

// Lectura de horario específico por id de semáforo
export const getHorarioEspecificoPorId = async (token, idSemaforo) => {
  try {
    const response = await axios.get(
      `${endpoint}/semaforos/${idSemaforo}/horarios/particulares`,
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

// Edición de horario periódico
export const editHorarioPeriodico = async (
  token,
  idSemaforo,
  idHorario,
  nuevoHorario
) => {
  try {
    const response = await axios.put(
      `${endpoint}/semaforos/${idSemaforo}/horarios/periodicos/${idHorario}`,
      nuevoHorario,
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

// Edición de horario específico
export const editHorarioEspecifico = async (
  token,
  idSemaforo,
  idHorario,
  nuevoHorario
) => {
  try {
    const response = await axios.put(
      `${endpoint}/semaforos/${idSemaforo}/horarios/particulares/${idHorario}`,
      nuevoHorario,
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
