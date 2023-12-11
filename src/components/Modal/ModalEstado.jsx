import "./styles.css"

const Modal = ({ isOpen, modalTitle, modalData, setIsOpen, handleSubmit }) => {
  if (!isOpen) return null

  return (
    <div className="containerOverlay">
      <div className="containerModal">
        <div>
          <h3>{modalTitle}</h3>
        </div>
        <div className="containerData">{modalData}</div>
        <div className="flex w-full justify-center gap-4">
          <button
            style={{ cursor: "pointer" }}
            className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
            onClick={handleSubmit}
          >
            Añadir estado
          </button>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(!isOpen)}
            className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-red-600 hover:border-red-700 hover:text-white focus:outline-none cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
