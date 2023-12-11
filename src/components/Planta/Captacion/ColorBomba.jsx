import bomba from "../../../assets/iconos-planta/bomba.png"
import bombaAmarilla from "../../../assets/iconos-planta/bombaAmarilla.png"
import bombaRoja from "../../../assets/iconos-planta/bombaRoja.png"
import bombaVerde from "../../../assets/iconos-planta/bombaVerde.png"

export const ColorBomba = ({ estado, className }) => {
  return (
    <div className={className}>
      <img
        src={
          estado === "green"
            ? bombaVerde
            : estado === "red"
            ? bombaRoja
            : estado === "gray"
            ? bomba
            : bombaAmarilla
        }
        alt="icono bomba de agua"
      />
    </div>
  )
}
