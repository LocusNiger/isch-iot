import { BiTime } from "react-icons/bi"

export const Boton = ({ text, outline, onclick, icon }) => {
  return (
    <button
      className={`${
        outline
          ? "bg-transparent border border-primary text-primary"
          : "bg-primary"
      } text-white text-base px-button py-2.5 rounded-xl hover:bg-hoverBtn whitespace-nowrap`}
      onClick={onclick}
    >
      {icon ? (
        <p className="flex items-center gap-x-2">
          {text} <BiTime />
        </p>
      ) : (
        text
      )}
    </button>
  )
}
