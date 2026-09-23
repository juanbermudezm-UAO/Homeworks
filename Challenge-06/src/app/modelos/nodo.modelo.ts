export class Nodo {
    valor : number
    izquierda: Nodo|null = null
    derecha: Nodo|null = null

    constructor(valor: number) {
        this.valor = valor;
    }

    esHoja(): boolean {
        return (this.izquierda === null && this.derecha === null);
    }
}