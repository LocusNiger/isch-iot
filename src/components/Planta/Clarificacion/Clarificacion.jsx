import Container from "../Container/Container"
import ContainerCuerpo from "../Container/ContainerCuerpo"
import clarificacionImg from "../../../assets/iconos-planta/clarificacion.png"

const Clarificacion = () => {
  return (
    <Container numero="2" titulo="Clarificación">
      <ContainerCuerpo className="flex flex-col items-center justify-center gap-y-3">
        <span className="text-muted">Sin información</span>
        <img src={clarificacionImg} alt="clarificación" />
      </ContainerCuerpo>
    </Container>
  )
}

export default Clarificacion
