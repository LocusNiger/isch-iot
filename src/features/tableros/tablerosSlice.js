import { createSlice } from "@reduxjs/toolkit"
import { revertAll } from "../auth/authSlice"
const initialState = {
  tableros: [],
  mapaTableros: [],
}

export const tablerosSlice = createSlice({
  name: "tableros",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setTablerosAction: (state, action) => {
      const nuevoTablero = action.payload
      let tableroEncontrado = state.tableros.find(
        (tablero) => tablero.id === nuevoTablero.id
      )
      if (tableroEncontrado) {
        tableroEncontrado = nuevoTablero
      } else {
        state.tableros.push(nuevoTablero)
      }
    },
    setMapaTablerosAction: (state, action) => {
      const nuevoTablero = action.payload
      let tableroEncontrado = state.mapaTableros.find(
        (tablero) => tablero.id === nuevoTablero.id
      )
      if (tableroEncontrado) {
        tableroEncontrado = nuevoTablero
      } else {
        state.mapaTableros.push(nuevoTablero)
      }
    },
  },
})

export const { setTablerosAction, setMapaTablerosAction } = tablerosSlice.actions
export default tablerosSlice.reducer
