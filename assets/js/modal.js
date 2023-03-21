

export const abrirModal = ( idModal ) => {
    console.log(idModal)
    const modal = document.querySelector(idModal);
    modal.classList.add('modal--show')
}
export const cerrarModal = ( idModal) => {
    console.log(idModal)
    const modal = document.querySelector(idModal);
    modal.classList.remove('modal--show')
}
