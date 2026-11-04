import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Producto {
  nombre: string;
  popularidad: number;
}

export class NodoTrie {
  valor: string | null;
  hijos: { [clave: string]: NodoTrie } = {};
  esFinDePalabra: boolean = false;
  producto: Producto | null = null;

  constructor(valor: string | null = null) {
    this.valor = valor;
  }
}

export class Trie {
  raiz: NodoTrie = new NodoTrie(null);

  insertar(nombre: string, popularidad: number): void {
    let actual = this.raiz;
    const nombreLimpio = nombre.trim().toLowerCase();

    for (const caracter of nombreLimpio) {
      if (!actual.hijos[caracter]) {
        actual.hijos[caracter] = new NodoTrie(caracter);
      }
      actual = actual.hijos[caracter];
    }

    actual.esFinDePalabra = true;
    actual.producto = { nombre, popularidad };
  }

  buscarNodo(prefijo: string): NodoTrie | null {
    let actual = this.raiz;
    const prefijoLimpio = prefijo.trim().toLowerCase();

    for (const caracter of prefijoLimpio) {
      if (!actual.hijos[caracter]) {
        return null;
      }
      actual = actual.hijos[caracter];
    }
    return actual;
  }

  recolectarProductos(nodo: NodoTrie, resultados: Producto[]): void {
    if (nodo.esFinDePalabra && nodo.producto) {
      resultados.push(nodo.producto);
    }

    for (const caracter in nodo.hijos) {
      this.recolectarProductos(nodo.hijos[caracter], resultados);
    }
  }

  obtenerProductosPorPrefijo(prefijo: string): Producto[] {
    const resultados: Producto[] = [];
    if (!prefijo.trim()) return resultados;

    const nodoInicial = this.buscarNodo(prefijo);
    if (nodoInicial) {
      this.recolectarProductos(nodoInicial, resultados);
    }
    return resultados;
  }

  obtenerTodosLosProductos(): Producto[] {
    const resultados: Producto[] = [];
    this.recolectarProductos(this.raiz, resultados);
    return resultados;
  }
}

export class MaxHeap {
  heap: Producto[] = [];

  constructor(productosIniciales: Producto[] = []) {
    if (productosIniciales.length > 0) {
      this.heap = [...productosIniciales];
      this.heapify();
    }
  }

  push(producto: Producto): void {
    this.heap.push(producto);
    this.percolateUp();
  }

  pop(): Producto | undefined {
    if (this.heap.length === 0) return undefined;
    const n = this.heap.length;
    this.swap(0, n - 1);
    const productoMaximo = this.heap.pop();
    this.percolateDown(0);
    return productoMaximo;
  }

  private heapify(): void {
    const inicio = Math.floor((this.heap.length - 2) / 2);
    for (let i = inicio; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  private percolateUp(): void {
    let actual = this.heap.length - 1;
    while (actual > 0) {
      const padre = Math.floor((actual - 1) / 2);
      if (this.heap[actual].popularidad > this.heap[padre].popularidad) {
        this.swap(actual, padre);
        actual = padre;
      } else {
        break;
      }
    }
  }

  private percolateDown(indice: number): void {
    let actual = indice;
    while (2 * actual + 1 < this.heap.length) {
      const izquierdo = 2 * actual + 1;
      const derecho = 2 * actual + 2;
      let hijoMayor = izquierdo;

      if (
        derecho < this.heap.length &&
        this.heap[derecho].popularidad > this.heap[izquierdo].popularidad
      ) {
        hijoMayor = derecho;
      }

      if (this.heap[hijoMayor].popularidad > this.heap[actual].popularidad) {
        this.swap(actual, hijoMayor);
        actual = hijoMayor;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  size(): number {
    return this.heap.length;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  trie = new Trie();

  nuevoNombreProducto: string = '';
  nuevaPopularidadProducto: number | null = null;

  prefijoBusqueda: string = '';
  limiteTopK: number = 2;

  resultadosTopK: Producto[] = [];
  totalCoincidenciasPrefijo: number = 0;
  todosLosProductos: Producto[] = [];

  ngOnInit(): void {
    const productosIniciales: Producto[] = [
      { nombre: 'air max', popularidad: 90 },
      { nombre: 'air force', popularidad: 95 },
      { nombre: 'air jordan', popularidad: 85 },
      { nombre: 'adidas boost', popularidad: 80 },
      { nombre: 'adidas ultraboost', popularidad: 88 },
      { nombre: 'puma suede', popularidad: 78 }
    ];

    productosIniciales.forEach((p) => this.trie.insertar(p.nombre, p.popularidad));
    this.actualizarListaProductos();
    this.alBuscar();
  }

  actualizarListaProductos(): void {
    const heap = new MaxHeap(this.trie.obtenerTodosLosProductos());
    const listaOrdenada: Producto[] = [];
    while (heap.size() > 0) {
      const p = heap.pop();
      if (p) listaOrdenada.push(p);
    }
    this.todosLosProductos = listaOrdenada;
  }

  agregarProducto(): void {
    if (!this.nuevoNombreProducto.trim() || this.nuevaPopularidadProducto === null) return;

    this.trie.insertar(this.nuevoNombreProducto.trim(), this.nuevaPopularidadProducto);
    this.nuevoNombreProducto = '';
    this.nuevaPopularidadProducto = null;
    this.actualizarListaProductos();
    this.alBuscar();
  }

  buscarTopK(prefijo: string, k: number): Producto[] {
    const productosCoincidentes = this.trie.obtenerProductosPorPrefijo(prefijo);
    this.totalCoincidenciasPrefijo = productosCoincidentes.length;

    const maxHeap = new MaxHeap(productosCoincidentes);
    const topK: Producto[] = [];
    const limite = Math.min(k, maxHeap.size());

    for (let i = 0; i < limite; i++) {
      const productoSuperior = maxHeap.pop();
      if (productoSuperior) {
        topK.push(productoSuperior);
      }
    }

    return topK;
  }

  alBuscar(): void {
    if (!this.prefijoBusqueda.trim()) {
      this.resultadosTopK = [];
      this.totalCoincidenciasPrefijo = 0;
      return;
    }
    this.resultadosTopK = this.buscarTopK(this.prefijoBusqueda, this.limiteTopK || 1);
  }
}