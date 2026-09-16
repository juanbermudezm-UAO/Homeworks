// numeroPar con funcion regular
function numeroPar(numero) {
    if (numero % 2 === 0) {
        console.log("El numero insertado es par")
    } else {
        console.log("El numero insertado es impar")
    }
}

numeroPar(3)

// numPar con funcion flecha
const numPar = (numero) => {
    numero % 2 === 0 ? console.log('El numero insertado es par') : console.log("El numero insertado es impar");
}