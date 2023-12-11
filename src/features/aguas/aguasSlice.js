import { createSlice, createAction } from "@reduxjs/toolkit"
export const revertAll = createAction("REVERT_ALL")

const controladoresLora = []
const controladoresUltralight = []
const puntosDePresion = []
const pozos = []
const cloacas = []
const planta = null

const initialState = {
  controladoresLora,
  controladoresUltralight,
  puntosDePresion,
  pozos,
  cloacas,
  planta,
}

export const aguasSlice = createSlice({
  name: "aguas",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setLoraAction: (state, action) => {
      const nuevoLora = action.payload
      let loraEncontrado = state.controladoresLora.find(
        (lora) => lora.id === nuevoLora.id
      )
      if (loraEncontrado) {
        loraEncontrado = nuevoLora
      } else {
        state.controladoresLora.push(nuevoLora)
      }
    },
    setUltraAction: (state, action) => {
      const nuevoUltra = action.payload
      let ultraEncontrado = state.controladoresUltralight.find(
        (ultra) => ultra.id === nuevoUltra.id
      )
      if (ultraEncontrado) {
        ultraEncontrado = nuevoUltra
      } else {
        state.controladoresUltralight.push(nuevoUltra)
      }
    },
    setPresionAction: (state, action) => {
      const nuevoPresion = action.payload
      let presionEncontrado = state.puntosDePresion.find(
        (presion) => presion.id === nuevoPresion.id
      )
      if (presionEncontrado) {
        presionEncontrado = nuevoPresion
      } else {
        state.puntosDePresion.push(nuevoPresion)
      }
    },
    setPozoAction: (state, action) => {
      const nuevoPozo = action.payload
      let pozoEncontrado = state.pozos.find((pozo) => pozo.id === nuevoPozo.id)
      if (pozoEncontrado) {
        pozoEncontrado = nuevoPozo
      } else {
        state.pozos.push(nuevoPozo)
      }
    },
    setCloacaAction: (state, action) => {
      const nuevoCloaca = action.payload
      let cloacaEncontrado = state.cloacas.find(
        (cloaca) => cloaca.id === nuevoCloaca.id
      )
      if (cloacaEncontrado) {
        cloacaEncontrado = nuevoCloaca
      } else {
        state.cloacas.push(nuevoCloaca)
      }
    },
    setPlantaAction: (state, action) => {
      state.planta = action.payload
    },
  },
})

export const {
  setLoraAction,
  setUltraAction,
  setPresionAction,
  setPozoAction,
  setCloacaAction,
  setPlantaAction,
} = aguasSlice.actions
export default aguasSlice.reducer
