import { iniciarJuego , reiniciarJuego, startRandomGame } from './game.js';
import { abrirModal , cerrarModal } from './modal.js';

    // Referencias del HTML
    const btnStart  = document.querySelector('#btnStart');
    const btnRules  = document.querySelector('#btnRules');
    const btnRestart   = document.querySelector('#btnRestart');

    //Botones dentro del modal pop-up
    const btnNewRandomGame = document.querySelector('#start-random-game');
    const btnNewCustomGame = document.querySelector('#start-custom-game');
    const btnCloseModalStart   = document.querySelector('#close-modal-start');
    const btnCloseModalRules   = document.querySelector('#close-modal-rules');

    /*
    * 1. Variables de inicio del juego
    * 2. Cargar juego
    */
    btnRestart.disabled = true;

    /*
    * 1. Evento abrir el modal de Inicio
    * 2. Evento para reiniciar el juego
    * 3. Evento para abrir el modal de instrucciones del juego
    */
    btnStart.addEventListener('click', (event) => {
        event.preventDefault();
        abrirModal('#modal-start');
        btnRestart.disabled = true;
    });

    btnRestart.addEventListener('click' , () => {
        reiniciarJuego();
        btnStart.disabled = false;
    });

    btnRules.addEventListener('click' , (event) => {
        event.preventDefault();
        abrirModal('#modal-rules');
    });
    
    /*
    * 1. Evento para iniciar el juego
    * 2. Evento para cerrar el modal pop-up de inicio de juego
    * 3. Evento para cerrar el modal pop-up de instrucciones del juego
    */
    
    btnNewRandomGame.addEventListener('click', (event)=>{
        event.preventDefault();
        cerrarModal('#modal-start');
        btnStart.disabled = true;
        btnRestart.disabled = false;
        startRandomGame();
    })

    btnNewCustomGame.addEventListener('click', (event)=>{
        event.preventDefault();
        cerrarModal('#modal-start');
        btnStart.disabled = true;
        btnRestart.disabled = false;
        iniciarJuego();
    })

    btnCloseModalStart.addEventListener('click', (event)=>{
        event.preventDefault();
        cerrarModal('#modal-start');
    })

    btnCloseModalRules.addEventListener('click', (event)=>{
        event.preventDefault();
        cerrarModal('#modal-rules');
    })

