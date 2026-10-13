import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../auth';

export class Nodo {
    valor: {
        titulo: string,
        link?: string,
        componente?: any
    };
    hijos: Nodo[];
    desplegado?: boolean;

    constructor(valor: { titulo: string, link?: string, componente?: any }) {
        this.valor = valor;
        this.hijos = [];
        this.desplegado = false;
    }

    agregarHijos(nodo: Nodo) {
        this.hijos.push(nodo);
    }
}

export class ArbolNario {
    raiz: Nodo;

    constructor(titulo: string = 'Raiz') {
        this.raiz = new Nodo({ titulo });
    }
}

@Component({
    selector: 'app-arbol-nario',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './arbol-nario.html',
    styleUrl: './arbol-nario.css'
})

export class ArbolNarioComponent {
    protected readonly auth = inject(Auth);
    protected readonly router = inject(Router);

    salir() {
        this.auth.salir();
        this.router.navigate(["/login"])
    }
    arbolMenu = new ArbolNario('Menú Principal');

    constructor() {
        this.inicializarArbol();
    }

    inicializarArbol() {
        const nodoEstructuras = new Nodo({ titulo: 'Estructuras de Datos' });
        nodoEstructuras.agregarHijos(new Nodo({ titulo: 'Árbol Binario', link: '/arbol-binario' }));
        nodoEstructuras.agregarHijos(new Nodo({ titulo: 'Árbol N-Ario', link: '/arbol-nario' }));

        const nodoCuenta = new Nodo({ titulo: 'Cuenta' });

        this.arbolMenu.raiz.agregarHijos(nodoEstructuras);
        this.arbolMenu.raiz.agregarHijos(nodoCuenta);
    }

    toggleMenu(nodo: Nodo) {
        nodo.desplegado = !nodo.desplegado;
    }
}