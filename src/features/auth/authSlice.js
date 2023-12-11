import { createSlice, createAction } from "@reduxjs/toolkit"
export const revertAll = createAction("REVERT_ALL")

const initialState = {
  username: null,
  token: null,
  email: null,
  nombre: null,
  apellido: null,
  telefono: null,
  permisos: null,
  nombreOrganizacion: null,
  isLogged: false,
  latitud: null,
  longitud: null,
  idUsuario: null,
  idOrganizacion: null,
}

export const authSlice = createSlice({
  name: "userAuth",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    loginAction: (state, action) => {
      const { data, isLogged } = action.payload
      state.username = data.user.username
      state.email = data.user.email
      state.nombre = data.user.nombre
      state.apellido = data.user.apellido
      state.telefono = data.user.telefono
      state.permisos = data.user.permisos
      state.token = data.token
      state.nombreOrganizacion = data.user.organizacion.nombre
      state.isLogged = isLogged
      state.latitud = data.user.organizacion.latitud
      state.longitud = data.user.organizacion.longitud
      state.idUsuario = data.user.id
      state.idOrganizacion = data.user.organizacion.id
      localStorage.setItem("token", data.token)
    },
    logoutAction: (state, action) => {
      const { isLogged } = action.payload
      state.username = null
      state.password = null
      state.token = null
      state.isLogged = isLogged
      localStorage.removeItem("token")
      localStorage.removeItem("tokenAguas")
    },
  },
})

export const { loginAction, logoutAction } = authSlice.actions
export default authSlice.reducer
