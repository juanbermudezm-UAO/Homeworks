import { Nodo } from "./nodo.modelo";

export class ArbolBinario {
    raiz: Nodo | null = null;

    constructor() {
        this.raiz = null;
    }

    insertar(valor: number) {
        const nuevoNodo = new Nodo(valor);

        if (!this.raiz) {
            this.raiz = nuevoNodo;
            return;
        }

        let actual = this.raiz;
        while (true) {
            if (valor < actual.valor) {
                if (!actual.izquierda) {
                    actual.izquierda = nuevoNodo;
                    return;
                }
                actual = actual.izquierda;
            } else if (valor > actual.valor) {
                if (!actual.derecha) {
                    actual.derecha = nuevoNodo;
                    return;
                }
                actual = actual.derecha;
            } else {
                console.log("el valor ya existe en el arbol")
                return;
            }
        }
    }

    preorden(nodo: Nodo | null = this.raiz) {
        if (!nodo) return
        console.log(nodo.valor)
        this.preorden(nodo.izquierda)
        this.preorden(nodo.derecha)
    }

    inorden(nodo: Nodo | null = this.raiz) {
        if (!nodo) return
        this.preorden(nodo.izquierda)
        console.log(nodo.valor)
        this.preorden(nodo.derecha)
    }

    postorden(nodo: Nodo | null = this.raiz) {
        if (!nodo) return
        this.preorden(nodo.izquierda)
        this.preorden(nodo.derecha)
        console.log(nodo.valor)
    }

    buscar(valor: number, nodo: Nodo | null = this.raiz): boolean {
        if (!nodo) return false
        if (valor === nodo.valor) return true;

        if (valor < nodo.valor) {
            return this.buscar(valor, nodo.izquierda)
        } else {
            return this.buscar(valor, nodo.derecha)
        }
    }
    
    obtenerEstructuraD3(nodo: Nodo | null = this.raiz): any {
        if (!nodo) return null;

        const hijos = [];
        if (nodo.izquierda) hijos.push(this.obtenerEstructuraD3(nodo.izquierda));
        if (nodo.derecha) hijos.push(this.obtenerEstructuraD3(nodo.derecha));

        return {
            name: nodo.valor.toString(),
            children: hijos.length > 0 ? hijos : undefined
        };
    }
}