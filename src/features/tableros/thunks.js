import { getCfgTableroPorId, getCfgTableros, getMapaTableros } from "../../services/tableros"
import { setMapaTablerosAction, setTablerosAction } from "./tablerosSlice"

export const setTablerosThunk = (token) => {
    return async (dispatch) => {
        let tableros = []
        const [dataTableros, errorTableros] = await getCfgTableros(token)
        if (dataTableros) {
            tableros = dataTableros
        } else console.error(errorTableros.message)

        tableros.forEach(async (tablero) => {
            const tableroToUse = tablero
            const [cfgIndividual, errorCfg] = await getCfgTableroPorId(token, tableroToUse.id)
            if (cfgIndividual) {
                tableroToUse.grupoWP = cfgIndividual.grupoWP
                tableroToUse.modoOp = cfgIndividual.modoOp
                tableroToUse.inicioEncendido = cfgIndividual.inicioEncendido
                tableroToUse.finEncendido = cfgIndividual.finEncendido
                tableroToUse.offsetInicio = cfgIndividual.offsetInicio
                tableroToUse.offsetFin = cfgIndividual.offsetFin
                tableroToUse.habForzado = cfgIndividual.habForzado
                tableroToUse.valorForzado = cfgIndividual.valorForzado
                tableroToUse.compacto = cfgIndividual.compacto
            } else console.error(errorCfg)
            await dispatch(setTablerosAction(tableroToUse))
        })
    }
}

export const setMapaTablerosThunk = (token) => {
    return async (dispatch) => {
        const [dataMapaTableros, errorMapaTableros] = await getMapaTableros(token)
        if (dataMapaTableros) {
            dataMapaTableros.forEach((mapaTablero) => {
                dispatch(setMapaTablerosAction(mapaTablero))
            })
        } else console.error(errorMapaTableros.message)    
    }
}