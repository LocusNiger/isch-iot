import Container from "../Container/Container"
import ContainerCuerpo from "../Container/ContainerCuerpo"
import filtracionImg from "../../../assets/iconos-planta/filtracion.png"

const Filtracion = () => {
  return (
    <Container numero="3" titulo="Filtración">
      <ContainerCuerpo className="flex flex-col items-center justify-center gap-y-3">
        <span className="text-muted">Sin información</span>
        <img
          src={filtracionImg}
          className="w-4/5 2xl:w-7/10"
          alt="filtración"
        />
      </ContainerCuerpo>
    </Container>
  )
}

export default Filtracion
