import { Celda } from './celda.js';

const tamanioCelda = 50;
const gameMode = { RANDOM: 1 , CUSTOM : 2}
let mode;
let matrizDeCeldas = [];
let stopGame = false;

const main = () => {
    setTimeout( function init(){
        if(stopGame){
            return;
        }else{
            if(mode == gameMode.CUSTOM){
                aplicarReglas();
                pintarCeldasEnPantalla();
            }else{
                pintarCeldasEnPantalla();
                aplicarReglas();
            }
            main();
        }
    },500);
}

const inicializarCeldas = ( tipoDeJuego ) => {
    /*
    * Crear celdas de una matriz cuadrada de tamaño: 'tamanioMatriz'
    */
    const divCuadricula = document.querySelector('.cuadricula');
    const tamanioMatriz = tamanioCelda;
    for(let indiceX=0 ; indiceX< tamanioMatriz ; indiceX++){
        const columnasMatriz = [];
        for(let indiceY= 0 ; indiceY < tamanioMatriz ; indiceY++){
            /*
            * Agregar clase celda al div dentro de la cuadrilla 
            */
            let celdaState = false;
            if(tipoDeJuego === gameMode.RANDOM){
                celdaState = Math.random() < 0.5 ? false: true ;
            }
            const celdaElement = newCelda();
            celdaElement.onclick = x => changeState(x, indiceX, indiceY);
            const celdaClase = new Celda(celdaState, indiceX, indiceY, celdaElement);
            divCuadricula.append(celdaElement);
            columnasMatriz.push(celdaClase);
        }
        matrizDeCeldas.push(columnasMatriz);

    }
    stopGame = false;
}

const newCelda = () =>{
    const celdaElement = document.createElement('div');
    celdaElement.classList.add('celda'); 
    celdaElement.classList.remove('celda--active');
    return celdaElement;
}

const changeState = (event, indiceX, indiceY) => {
    
    matrizDeCeldas[indiceX][indiceY].celdaPintada = matrizDeCeldas[indiceX][indiceY].celdaPintada?false:true;

    const cell = event.target || event;
    if(cell.classList.contains('celda--active')){
        cell.classList.remove('celda--active');
    }else{
        cell.classList.add('celda--active');
    }
}

const pintarCeldasEnPantalla = () => {
    matrizDeCeldas.forEach((filas, coordX, _matriz) => {
        filas.forEach((_columnas, coordY) => {
            if(matrizDeCeldas[coordX][coordY].celdaPintada ){
                matrizDeCeldas[coordX][coordY].element.classList.add('celda--active');
            }
            else{
                matrizDeCeldas[coordX][coordY].element.classList.remove('celda--active');
            }
        });
    });
}

const aplicarReglas = () => {
    matrizDeCeldas.forEach((filas, coordX, _matriz) => {
        filas.forEach((_columnas, coordY) => {
            let contadorVecinos = 0;
            //1
            if(coordX>0 && coordY>0){
                if(matrizDeCeldas[coordX-1][coordY-1].celdaPintada) {
                    contadorVecinos++;
                }
            }
            //2
            if(coordY > 0){
                if(matrizDeCeldas[coordX][coordY-1].celdaPintada){
                    contadorVecinos++;
                }
            }
            //3
            if(coordX < tamanioCelda - 1 && coordY > 0){
                if(matrizDeCeldas[coordX + 1][coordY - 1].celdaPintada){
                    contadorVecinos++;
                }
            }
            //4
            if(coordX > 0){
                if(matrizDeCeldas[coordX - 1][coordY].celdaPintada){
                    contadorVecinos++;
                }
            }
            //5
            if(coordX < tamanioCelda - 1){
                if(matrizDeCeldas[coordX + 1][coordY].celdaPintada){
                    contadorVecinos++;
                }
            }
            //6
            if(coordX > 0 && coordY < tamanioCelda - 1){
                if(matrizDeCeldas[coordX - 1][coordY + 1].celdaPintada){
                    contadorVecinos++;
                }
            }
            //7
            if(coordY < tamanioCelda - 1){
                if(matrizDeCeldas[coordX][coordY + 1].celdaPintada){
                    contadorVecinos++;
                }
            }
            //8
            if(coordX < tamanioCelda - 1 && coordY < tamanioCelda - 1){
                if(matrizDeCeldas[coordX + 1][coordY + 1].celdaPintada){
                    contadorVecinos++;
                }
            }

            if(matrizDeCeldas[coordX][coordY].celdaPintada){
                matrizDeCeldas[coordX][coordY].celdaPintada = (contadorVecinos == 2 || contadorVecinos == 3) ? true : false;
            }else{
                matrizDeCeldas[coordX][coordY].celdaPintada = contadorVecinos == 3 ? true : false;
            }
        })
    });
}

export const reiniciarJuego = () => {
    console.log('restart');
    stopGame = true;
    const cuadrilla = document.querySelector('.cuadricula');
    cuadrilla.innerHTML = '';
    matrizDeCeldas = [];
    main();
}

export const startCustomGame = () =>  {
    console.log('start custom game');
    mode = gameMode.CUSTOM;
    inicializarCeldas(mode);
    setTimeout(function () {
        console.log('esperar 5 sec')
        main();
    }, 5000);
}

export const startRandomGame = () => {
    console.log('start random game');
    mode = gameMode.RANDOM;
    inicializarCeldas(mode);
    main();
}













