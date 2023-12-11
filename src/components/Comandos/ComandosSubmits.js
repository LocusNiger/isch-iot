/* eslint-disable no-unused-vars */
import swal from "sweetalert2"
import { modificarHorario, modificarSecuencia } from "src/services/comandos"

export const handleSubmitHorarios = async (cuerpoRequest) => {
  const token = localStorage.getItem("token")
  swal
    .fire({
      title: "Modificación de horarios",
      text: "¿Estás seguro que deseas modificar el horario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
    })
    .then(async (respuesta) => {
      if (respuesta.isConfirmed) {
        console.log(cuerpoRequest)
        const [data, error] = await modificarHorario(token, cuerpoRequest)
        if (data) {
          const cuerpoProceso = {
            data,
            descripcion: "Modificación de horarios",
          }
          swal.fire({
            text: "Modificación de horarios solicitada",
            icon: "success",
            timer: "2500",
          })
          return [cuerpoProceso, null]
        } else {
          swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo realizar la modificación.",
          })
          return [null, error.response]
        }
      }
    })
}

export const handleSubmitSecuencias = async (cuerpoRequest) => {
  const token = localStorage.getItem("token")
  swal
    .fire({
      title: "Modificación de secuencias",
      text: "¿Estás seguro que deseas modificar la secuencia?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
    })
    .then(async (respuesta) => {
      if (respuesta.isConfirmed) {
        console.log(cuerpoRequest)
        const [data, error] = await modificarSecuencia(token, cuerpoRequest)
        if (data) {
          const cuerpoProceso = {
            data,
            descripcion: "Modificación de secuencia",
          }
          swal.fire({
            text: "Modificación de secuencia solicitada",
            icon: "success",
            timer: "2500",
          })
          return [cuerpoProceso, null]
        } else {
          swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo realizar la modificación.",
          })
          return [null, error.response]
        }
      }
    })
}
