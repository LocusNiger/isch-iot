import "./styles.css"

const ModalHorario = ({
  isOpen,
  modalTitle,
  modalData,
  setIsOpen,
  handleSubmit,
}) => {
  if (!isOpen) return null

  return (
    <div className="containerOverlay">
      <div className="containerModal">
        <div>
          <h3 className="mb-3 text-xl font-bold">{modalTitle}</h3>
        </div>
        <div className="containerData">{modalData}</div>
        <div className="flex w-full justify-center gap-4">
          <button
            style={{ cursor: "pointer" }}
            name="submitHorarioPeriodico"
            onClick={handleSubmit}
            className="inline-block rounded border border-black px-2.5 py-2 font-semibold text-black hover:bg-gray-800 hover:text-white focus:outline-none cursor-pointer"
          >
            Guardar cambios
          </button>
          <button
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

export default ModalHorario
