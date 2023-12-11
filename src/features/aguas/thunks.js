/* eslint-disable no-unused-vars */
import {
  cfgCloacaPorId,
  cfgLoraPorId,
  cfgPozoPorId,
  cfgPuntoDePresionPorId,
  cfgUltralightPorId,
  estadoPlantaPotabilizadora,
  listaCloacas,
  listaControladoresLora,
  listaPozos,
  listaPuntosDePresion,
  listaUltralight,
} from "../../services/aguas"
import {
  setLoraAction,
  setPresionAction,
  setUltraAction,
  setCloacaAction,
  setPozoAction,
  setPlantaAction,
} from "./aguasSlice"

export const setLoraThunk = (tokenAguas) => {
  return async (dispatch) => {
    let controladoresLora = []
    const [dataLora, errorLora] = await listaControladoresLora(tokenAguas)
    if (dataLora) {
      controladoresLora = dataLora
    } else console.error(errorLora.message)
    controladoresLora.forEach(async (lora) => {
      const loraToUse = lora
      const [cfgLoraIndividual, errorCfgLora] = await cfgLoraPorId(
        tokenAguas,
        loraToUse.id
      )
      if (cfgLoraIndividual) {
        loraToUse.canalesAnalogEntrada = cfgLoraIndividual.canalesAnalogEntrada
        loraToUse.canalesAnalogSalida = cfgLoraIndividual.canalesAnalogSalida
        loraToUse.canalesDigSalida = cfgLoraIndividual.canalesDigSalida
        loraToUse.canalesDigEntrada = cfgLoraIndividual.canalesDigEntrada
        loraToUse.controlador = "LORA"
      } else console.error(errorCfgLora)
      await dispatch(setLoraAction(loraToUse))
    })
  }
}

export const setUltralightThunk = (tokenAguas) => {
  return async (dispatch) => {
    let controladoresUltralight = []
    const [dataUltra, errorUltra] = await listaUltralight(tokenAguas)
    if (dataUltra) {
      controladoresUltralight = dataUltra
    } else console.error(errorUltra.message)
    controladoresUltralight.forEach(async (ultra) => {
      const ultraToUse = ultra
      const [cfgUltraIndividual, errorCfgUltra] = await cfgUltralightPorId(
        tokenAguas,
        ultraToUse.id
      )
      if (cfgUltraIndividual) {
        ultraToUse.analogInputs = cfgUltraIndividual.analogInputs
        ultraToUse.analogOutputs = cfgUltraIndividual.analogOutputs
        ultraToUse.digitalInputs = cfgUltraIndividual.digitalInputs
        ultraToUse.digitalOutputs = cfgUltraIndividual.digitalOutputs
        ultraToUse.controlador = "ULTRALIGHT"
      } else console.error(errorCfgUltra)
      await dispatch(setUltraAction(ultraToUse))
    })
  }
}

export const setPuntosDePresionThunk = (tokenAguas) => {
  return async (dispatch) => {
    let puntosDePresion = []
    const [dataPuntos, errorPuntos] = await listaPuntosDePresion(tokenAguas)
    if (dataPuntos) {
      puntosDePresion = dataPuntos
    } else console.error(errorPuntos.message)
    puntosDePresion.forEach(async (punto) => {
      const presionToUse = punto
      const [cfgPuntoIndividual, errorCfgPunto] = await cfgPuntoDePresionPorId(
        tokenAguas,
        punto.id
      )
      if (cfgPuntoIndividual) {
        presionToUse.variablePresion = cfgPuntoIndividual.variablePresion
      } else console.error(errorCfgPunto)
      await dispatch(setPresionAction(punto))
    })
  }
}

export const setPozosThunk = (tokenAguas) => {
  return async (dispatch) => {
    let pozos = []
    const [dataPozos, errorPozos] = await listaPozos(tokenAguas)
    if (dataPozos) {
      pozos = dataPozos
    } else console.error(errorPozos.message)
    pozos.forEach(async (pozo) => {
      const pozoToUse = pozo
      const [cfgPozoIndividual, errorCfgPozo] = await cfgPozoPorId(
        tokenAguas,
        pozo.id
      )
      if (cfgPozoIndividual) {
        pozoToUse.variablePresion = cfgPozoIndividual.variablePresion
        pozoToUse.variableCaudal = cfgPozoIndividual.variableCaudal
        pozoToUse.motorOn = cfgPozoIndividual.motorOn
        pozoToUse.cloradorOn = cfgPozoIndividual.cloradorOn
        pozoToUse.ir = cfgPozoIndividual.ir
        pozoToUse.is = cfgPozoIndividual.is
        pozoToUse.it = cfgPozoIndividual.it
        pozoToUse.vr = cfgPozoIndividual.vr
        pozoToUse.vs = cfgPozoIndividual.vs
        pozoToUse.vt = cfgPozoIndividual.vt
        pozoToUse.idTempMotor = cfgPozoIndividual.idTempMotor
        pozoToUse.idVelSalida = cfgPozoIndividual.idVelSalida
      } else console.error(errorCfgPozo)
      await dispatch(setPozoAction(pozo))
    })
  }
}

export const setCloacasThunk = (tokenAguas) => {
  return async (dispatch) => {
    let cloacas = []
    const [dataCloacas, errorCloacas] = await listaCloacas(tokenAguas)
    if (dataCloacas) {
      cloacas = dataCloacas
    } else console.error(errorCloacas.message)
    cloacas.forEach(async (cloaca) => {
      const cloacaToUse = cloaca
      const [cfgCloacaIndividual, errorCfgCloaca] = await cfgCloacaPorId(
        tokenAguas,
        cloaca.id
      )
      if (cfgCloacaIndividual) {
        cloacaToUse.variablePresion = cfgCloacaIndividual.variablePresion
        cloacaToUse.variableCaudal = cfgCloacaIndividual.variableCaudal
        cloacaToUse.motorOn = cfgCloacaIndividual.motorOn
        cloacaToUse.ir = cfgCloacaIndividual.ir
        cloacaToUse.is = cfgCloacaIndividual.is
        cloacaToUse.it = cfgCloacaIndividual.it
        cloacaToUse.vr = cfgCloacaIndividual.vr
        cloacaToUse.vs = cfgCloacaIndividual.vs
        cloacaToUse.vt = cfgCloacaIndividual.vt
        cloacaToUse.idTempMotor = cfgCloacaIndividual.idTempMotor
        cloacaToUse.idNivel = cfgCloacaIndividual.idNivel
      } else console.error(errorCfgCloaca)
      await dispatch(setCloacaAction(cloaca))
    })
  }
}

export const setPlantaThunk = (tokenAguas) => {
  return async (dispatch) => {
    const [dataPlanta, errorPlanta] = await estadoPlantaPotabilizadora(
      tokenAguas
    )
    if (dataPlanta) {
      await dispatch(setPlantaAction(dataPlanta))
    } else console.error(errorPlanta.message)
  }
}
