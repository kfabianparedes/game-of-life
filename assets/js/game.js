import { Celda } from './celda.js';

const tamanioCelda = 50;
let divCeldasCuadrilla = [];
let matrizDeCeldas = [];
let listaDeClasesCelda = [];
let indiceDeCeldaEn = 0;
let inGame = false;
let stopGame = false;

const main = () => {
    setTimeout( function init(){
        if(stopGame){
            return;
        }else{
            aplicarReglas();
            pintarCeldasEnPantalla();
            main();
        }
    },1000);
}

//Limpiar listas o matrices
const limpiarMatrizDeCeldas = () => {
    matrizDeCeldas = new Array(tamanioCelda).fill("").map(() => Array(tamanioCelda).fill(""));
}

const inicializarCeldasAleatorias = () => {
    console.log('matriz de celdas: ',matrizDeCeldas)
    matrizDeCeldas.forEach((filas, indiceX) => {
        filas.forEach((_columnas, indiceY) => {
            matrizDeCeldas[indiceX][indiceY] = Math.random() < 0.5 ? false: true ;
            const celdaClase = new Celda(matrizDeCeldas[indiceX][indiceY], indiceDeCeldaEn , indiceX,indiceY);
            indiceDeCeldaEn++;
            listaDeClasesCelda.push(celdaClase);
        })
    });
}

export const crearCeldasEnMatriz =  ( ) => {
    /*
    * Crear celdas de una matriz cuadrada de tamaño: 'tamanioMatriz'
    */
    // let divCuadricula = document.querySelector('.cuadricula');
    // let divCuadricula = null;
    // let divCuadricula;
    let divCuadricula = document.querySelector('.cuadricula');
    if(divCuadricula == null || divCuadricula == undefined){
        divCuadricula = document.createElement('div');
        divCuadricula.className = 'cuadricula';//classList.add('cuadricula'); 
    }
    console.log('clase nueva: ' , divCuadricula);
    const tamanioMatriz = tamanioCelda;
    for(let i=0 ; i< tamanioMatriz ; i++){
        for(let j= 0 ; j < tamanioMatriz ; j++){
            
            const divCelda = document.createElement('div');
            /*
            * Agregar clase celda al div dentro de la cuadrilla 
            */
            divCelda.classList.add('celda'); 
            divCuadricula.append(divCelda);
        }
    }
    console.log('celdas? ',document.querySelectorAll('.celda'));
    stopGame = false;
}

const pintarCeldasEnPantalla = () => {
    const divCuadricula = document.querySelector('.cuadricula');
    console.log(divCuadricula);
    const divCeldasCuadrilla = document.querySelectorAll('.celda');
    listaDeClasesCelda.forEach((celda)=> {
        const indice = celda.numeroCelda;
        const celdaDOM = divCeldasCuadrilla[indice];
        console.log(celdaDOM);
        if(celda.celdaPintada ){
            celdaDOM.classList.add('celda--active');
            celdaDOM.classList.remove('celda--inactive');
        }else{
            celdaDOM.classList.add('celda--inactive');
            celdaDOM.classList.remove('celda--active');
        }
    });
}

const aplicarReglas = () => {
    // console.log('matrizDeCeldas antes',matrizDeCeldas);
    let matrizDeCeldasAuxiliares = new Array(tamanioCelda).fill("").map(() => Array(tamanioCelda).fill(false));
    // console.log('matrizDeCeldas matrizDeCeldasAuxiliares',matrizDeCeldasAuxiliares);
    let contadorMatriz = 0;
    matrizDeCeldas.forEach((filas, coordX, _matriz) => {
        filas.forEach((_columnas, coordY) => {
            let contadorVecinos = 0;
            //1
            if(coordX>0 && coordY>0){
                if(matrizDeCeldas[coordX-1][coordY-1]) {
                    contadorVecinos++;
                }
            }
            //2
            if(coordY > 0)
                if(matrizDeCeldas[coordX][coordY-1])
                    contadorVecinos++;

            //3
            if(coordX < tamanioCelda - 1 && coordY > 0)
                if(matrizDeCeldas[coordX + 1][coordY - 1])
                    contadorVecinos++;

            //4
            if(coordX > 0)
                if(matrizDeCeldas[coordX - 1][coordY])
                    contadorVecinos++;
            
            //5
            if(coordX < tamanioCelda - 1)
                if(matrizDeCeldas[coordX + 1][coordY])
                    contadorVecinos++;
            
            //6
            if(coordX > 0 && coordY < tamanioCelda - 1)
                if(matrizDeCeldas[coordX - 1][coordY + 1])
                    contadorVecinos++;

            //7
            if(coordY < tamanioCelda - 1)
                if(matrizDeCeldas[coordX][coordY + 1])
                    contadorVecinos++;

            //8
            if(coordX < tamanioCelda - 1 && coordY < tamanioCelda - 1)
                if(matrizDeCeldas[coordX + 1][coordY + 1])
                    contadorVecinos++;
            
            if(matrizDeCeldas[coordX][coordY]){
                matrizDeCeldasAuxiliares[coordX][coordY] = (contadorVecinos == 2 || contadorVecinos == 3) ? true : false;
                listaDeClasesCelda[contadorMatriz].celdaPintada = (contadorVecinos == 2 || contadorVecinos == 3) ? true : false;
            }else{
                matrizDeCeldasAuxiliares[coordX][coordY] = contadorVecinos == 3 ? true : false;
                listaDeClasesCelda[contadorMatriz].celdaPintada = contadorVecinos == 3 ? true : false;
            }

            contadorMatriz++;
        })
    });
    matrizDeCeldas = [...matrizDeCeldasAuxiliares];

}

const limpiarCuadrilla = ( list ) =>{
    list.replaceChildren();
    console.log(list); // Ver eliminados
}

export const reiniciarJuego = () => {
    console.log('restart');
    stopGame = true;
    const cuadrilla = document.querySelector('.cuadricula');
    const cuadrillaContainer = document.querySelector('.container__grid__body');
    cuadrillaContainer.remove();
    main();
}

export const iniciarJuego = () =>  {
    console.log('start');
    main();
    // limpiarCeldasDelTablero();
    // // if( !inGame ){
    //     inGame = true;
    //     stopGame = false;
    //     main();
    // // }else{
    //     // reiniciarJuego();
    // // }
    
}

export const startRandomGame = () => {
    console.log('start random game');
    limpiarMatrizDeCeldas();
    inicializarCeldasAleatorias();
    crearCeldasEnMatriz();
    main();
}











