

export const abrirModal = ( idModal ) => {
    const modal = document.querySelector(idModal);
    modal.classList.add('modal--show')
}
export const cerrarModal = ( idModal) => {
    const modal = document.querySelector(idModal);
    modal.classList.remove('modal--show')
}
export const playModal = ( idModal ) => {
    const modal = document.querySelector(idModal);
    modal.classList.add('modal__play--show')
}
export const cerrarPlayModal = ( idModal) => {
    const modal = document.querySelector(idModal);
    modal.classList.remove('modal__play--show')
}