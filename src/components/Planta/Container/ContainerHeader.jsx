const ContainerHeader = ({ numero, titulo }) => {
  return (
    <div className="uppercase font-bold flex items-center gap-2 text-xs 2xl:text-base ">
      {numero && (
        <div className="w-4 h-4 2xl:w-7 2xl:h-7 p-3 rounded-full flex justify-center items-center border-2 border-white text-white">
          <span>{numero}</span>
        </div>
      )}
      {titulo && <span className="text-white">{titulo}</span>}
    </div>
  )
}

export default ContainerHeader
