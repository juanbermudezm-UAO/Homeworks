import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';
import { Nodo } from '../modelos/nodo.modelo';

@Component({
  selector: 'app-arbol-binario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './arbol-binario.html',
  styleUrl: './arbol-binario.css'
})
export class ArbolBinario {
  protected readonly auth = inject(Auth);

  raiz: Nodo | null = null;
  nuevoValor: string = '';
  recorridoResultado: string[] = [];

  insertarNodo() {
    if (!this.nuevoValor.trim()) return;

    const nuevoNodo = new Nodo({ titulo: this.nuevoValor });

    if (!this.raiz) {
      this.raiz = nuevoNodo;
    } else {
      this.insertarRecursivo(this.raiz, nuevoNodo);
    }

    this.nuevoValor = '';
  }

  private insertarRecursivo(actual: Nodo, nuevo: Nodo) {
    if (!actual.hijos[0]) {
      actual.hijos[0] = nuevo;
    } else if (!actual.hijos[1]) {
      actual.hijos[1] = nuevo;
    } else {
      this.insertarRecursivo(actual.hijos[0], nuevo);
    }
  }

  recorridoInorden(nodo: Nodo | null = this.raiz) {
    this.recorridoResultado = [];
    this.ejecutarInorden(nodo);
  }

  private ejecutarInorden(nodo: Nodo | null) {
    if (nodo) {
      if (nodo.hijos[0]) this.ejecutarInorden(nodo.hijos[0]);
      this.recorridoResultado.push(String(nodo.valor.titulo || nodo.valor));
      if (nodo.hijos[1]) this.ejecutarInorden(nodo.hijos[1]);
    }
  }
}