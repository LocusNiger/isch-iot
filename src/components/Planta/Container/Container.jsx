import ContainerHeader from "./ContainerHeader"

const Container = ({ numero, titulo, children, className }) => {
  return (
    <div
      className={`h-full bg-gray-600 flex flex-col rounded-lg p-1.5 2xl:p-4 gap-y-1.5 2xl:gap-y-2.5`}
    >
      {(numero || titulo) && (
        <ContainerHeader numero={numero} titulo={titulo} />
      )}
      {children && (
        <div
          className={`h-full overflow-y-auto overflow-x-hidden custom-scroll-bar ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Container
