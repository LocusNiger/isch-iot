/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import Container from "../Container/Container";
import ContainerCuerpo from "../Container/ContainerCuerpo";
import Bombas from "./Bombas";
import Detectores from "./Detectores";
import Tension from "./Tension";

const Captacion = () => {
  const tension = useSelector(
    (state) => state?.aguas?.planta?.tensionesEntrada
  );
  const corrientes = useSelector((state) => state?.aguas?.planta?.bombas);
  const alarmas = useSelector((state) => state?.aguas?.planta?.alarmas);
  return (
    <Container numero="1" titulo="Captación" className="flex gap-x-2">
      <ContainerCuerpo className="w-1/3 2xl:py-2 2xl:px-4 h-fit">
        {tension && <Tension tension={tension} />}
      </ContainerCuerpo>
      <ContainerCuerpo className="w-2/3 2xl:py-2 2xl:px-4 h-fit">
        {corrientes && <Bombas corrientes={corrientes} />}
      </ContainerCuerpo>
      <ContainerCuerpo className="w-1/3 2xl:py-2 2xl:px-4 h-fit">
        {alarmas && (
          <Detectores
            avisoIncendio={alarmas.avisoIncendio}
            detectHidrocarburo={alarmas.detectorHidrocarburo}
            fallaDeSistemaElectrico={alarmas.fallaDeSistemaElectrico}
            preAvisoIncendio={alarmas.preAvisoIncendio}
          />
        )}
      </ContainerCuerpo>
    </Container>
  );
};

export default Captacion;
