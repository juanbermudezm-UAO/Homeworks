import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Nodo } from '../modelos/nodo.modelo';
import { Auth } from '../auth';

@Component({
  selector: 'app-arbol-nario',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './arbol-nario.html',
  styleUrl: './arbol-nario.css'
})
export class ArbolNario {
  protected readonly auth = inject(Auth);

  paginaSeleccionada: string | null = null;

  arbolMenu = {
    raiz: new Nodo({ titulo: 'Raíz Menú' })
  };

  constructor() {
    this.inicializarArbol();
  }

  inicializarArbol() {
    const nodoEstructuras = new Nodo({ titulo: 'Estructuras de Datos' });
    nodoEstructuras.agregarHijos(new Nodo({ titulo: 'Árbol Binario', link: '/arbol-binario' }));
    nodoEstructuras.agregarHijos(new Nodo({ titulo: 'Árbol N-Ario (Vista)', link: 'nario-detalle' }));

    const nodoSesion = new Nodo({ titulo: 'Información del Sistema' });
    nodoSesion.agregarHijos(new Nodo({ titulo: 'Acerca del Challenge 08', link: 'info' }));

    this.arbolMenu.raiz.agregarHijos(nodoEstructuras);
    this.arbolMenu.raiz.agregarHijos(nodoSesion);
  }

  toggleMenu(nodo: Nodo) {
    nodo.desplegado = !nodo.desplegado;
  }

  seleccionarPagina(pagina: string) {
    this.paginaSeleccionada = pagina;
  }

  volverAlMenu() {
    this.paginaSeleccionada = null;
  }
}