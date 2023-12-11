const ContainerCuerpo = ({ children, className }) => {
  return (
    <div
      className={`h-full border border-gray-300 bg-gray-200 p-2 rounded-lg ${
        !children ? "flex justify-center items-center" : ""
      } ${className}`}
      style={{ minHeight: "100%" }}
    >
      {children || <span>Sin información</span>}
    </div>
  )
}

export default ContainerCuerpo
