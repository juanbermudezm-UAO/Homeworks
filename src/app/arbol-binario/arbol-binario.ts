import { Component, ElementRef, ViewChild } from "@angular/core";
import * as d3 from 'd3';

class Nodo {
    valor: number
    izquierda: Nodo | null = null
    derecha: Nodo | null = null

    constructor(valor: number) {
        this.valor = valor;
    }

    esHoja(): boolean {
        return (this.izquierda === null && this.derecha === null);
    }
}



@Component({
    imports: [],
    selector: 'app-arbol-binario',
    styleUrl: './arbol-binario.css',
    templateUrl: './arbol-binario.html'
})
export class ArbolBinario {
    @ViewChild('treeContainer', { static: true }) treeContainer!: ElementRef<HTMLDivElement>;
    raiz: Nodo | null = null;

    insertar(valor: number) {
        if (isNaN(valor)) return;

        const nuevoNodo = new Nodo(valor);

        if (!this.raiz) {
            this.raiz = nuevoNodo;
            this.dibujar();
            return;
        }

        let actual = this.raiz;
        while (true) {
            if (valor < actual.valor) {
                if (!actual.izquierda) {
                    actual.izquierda = nuevoNodo;
                    break;
                }
                actual = actual.izquierda;
            } else if (valor > actual.valor) {
                if (!actual.derecha) {
                    actual.derecha = nuevoNodo;
                    break;
                }
                actual = actual.derecha;
            } else {
                console.log("el valor ya existe en el arbol");
                return;
            }
        }
        this.dibujar();
    }

    dibujar() {
        const contenedor = this.treeContainer.nativeElement;
        d3.select(contenedor).selectAll("*").remove();

        const datos = this.obtenerEstructuraD3();
        if (!datos) return;

        const ancho = 800, alto = 400;
        const svg = d3.select(contenedor)
            .append("svg")
            .attr("width", ancho)
            .attr("height", alto);

        const jerarquia = d3.hierarchy(datos);
        d3.tree<any>().size([ancho - 40, alto - 80])(jerarquia);

        const g = svg.append("g").attr("transform", "translate(20,40)");

        g.selectAll("line")
            .data(jerarquia.links())
            .enter().append("line")
            .attr("x1", d => d.source.x!).attr("y1", d => d.source.y!)
            .attr("x2", d => d.target.x!).attr("y2", d => d.target.y!)
            .attr("stroke", "#999");

        const nodos = g.selectAll("g.nodo")
            .data(jerarquia.descendants())
            .enter().append("g")
            .attr("class", "nodo")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        nodos.append("circle").attr("r", 16).attr("fill", "#4f8ef7");
        nodos.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("fill", "white")
            .text(d => d.data.name);
    }

    preorden(nodo: Nodo | null = this.raiz) {
        if (!nodo) return
        console.log(nodo.valor)
        this.preorden(nodo.izquierda)
        this.preorden(nodo.derecha)
    }

    inorden(nodo: Nodo | null = this.raiz) {
        if (!nodo) return
        this.inorden(nodo.izquierda)
        console.log(nodo.valor)
        this.inorden(nodo.derecha)
    }

    postorden(nodo: Nodo | null = this.raiz) {
        if (!nodo) return
        this.postorden(nodo.izquierda)
        this.postorden(nodo.derecha)
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
    resultadoBusqueda = '';

    buscarValor(valor: number) {
        if (isNaN(valor)) return;
        this.resultadoBusqueda = this.buscar(valor)
            ? `El valor ${valor} existe en el árbol`
            : `El valor ${valor} NO existe`;
    }
}