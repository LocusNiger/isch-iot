export const Indicador = ({
  value,
  title,
  color,
  disableBackground,
  className,
}) => {
  return (
    <div className="">
      <p className="text-center xl:text-base">{title}</p>
      <div
        className={`py-2 2xl:text-xl xl:text-base text-white text-center ${
          !disableBackground &&
          (color === "green"
            ? "bg-green-700"
            : color === "red"
            ? "bg-red-700"
            : color === "gray"
            ? "bg-gray-700"
            : color === "blue"
            ? "bg-blue-500"
            : "bg-yellow-500")
        } ${className} rounded font-bold`}
      >
        <p className="m-0">
          {value === undefined || value === null ? "-" : value}
        </p>
      </div>
    </div>
  )
}
