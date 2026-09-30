import { Nodo } from "./nodo.modelo";

export class arbol_NArio {
    raiz: Nodo;

    constructor(titulo: string = 'Raiz') {
        this.raiz = new Nodo({ titulo });
    }
}