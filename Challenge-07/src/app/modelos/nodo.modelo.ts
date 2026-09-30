export class Nodo {
    valor: {
        titulo: string,
        link?: string,
        componente?: any
    };
    hijos: Nodo[]
    desplegado? : boolean

    constructor(valor: {titulo: string, link?: string, componente?: any}) {
        this.valor = valor;
        this.hijos = [];
        this.desplegado = false;
    }

    agregarHijos(nodo: Nodo) {
        this.hijos.push(nodo);
    }
}