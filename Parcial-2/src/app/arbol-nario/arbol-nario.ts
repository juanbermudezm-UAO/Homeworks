import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../services/firestore';
import { AuthService } from '../services/auth';
import { Router, RouterLink } from '@angular/router';

export type TipoNodo = 'carpeta' | 'archivo';

export interface ElementoNodo {
  id?: string;
  nombre: string;
  tipo: TipoNodo;
  ownerEmail: string;
  parentId: string | null;
}

export class Nodo {
  valor: ElementoNodo;
  hijos: Nodo[];

  constructor(valor: ElementoNodo) {
    this.valor = valor;
    this.hijos = [];
  }

  agregarHijo(nodo: Nodo): boolean {
    if (this.valor.tipo === 'archivo') {
      throw new Error('Un archivo no puede contener otros elementos.');
    }
    this.hijos.push(nodo);
    return true;
  }
}

export class ArbolNArio {
  raiz: Nodo | null;

  constructor() {
    this.raiz = null;
  }

  buscarNodo(id: string, actual: Nodo | null = this.raiz): Nodo | null {
    if (!actual) return null;
    if (actual.valor.id === id) return actual;

    for (const hijo of actual.hijos) {
      const encontrado = this.buscarNodo(id, hijo);
      if (encontrado) return encontrado;
    }
    return null;
  }
}

@Component({
  selector: 'app-arbol-nario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [FirestoreService],
  templateUrl: './arbol-nario.html',
  styleUrl: './arbol-nario.scss'
})
export class ArbolNarioComponent implements OnInit {
  readonly firestoreService = inject<FirestoreService<ElementoNodo>>(FirestoreService);
  readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  arbol: ArbolNArio = new ArbolNArio();
  
  nuevoNombre: string = '';
  nuevoTipo: TipoNodo = 'carpeta';
  nodoSeleccionado: Nodo | null = null;

  ngOnInit() {
    this.firestoreService.init('elementos_arbol');
    
    this.firestoreService.listenAll((listaPlana) => {
      this.reconstruirArbol(listaPlana);
    });
  }

  reconstruirArbol(listaPlana: ElementoNodo[]) {
    if (!listaPlana || listaPlana.length === 0) {
      this.arbol = new ArbolNArio();
      this.nodoSeleccionado = null;
      this.cdr.detectChanges();
      return;
    }

    const mapa = new Map<string, Nodo>();
    let nodoRaiz: Nodo | null = null;

    listaPlana.forEach((item) => {
      if (item.id) {
        mapa.set(item.id, new Nodo(item));
      }
    });

    listaPlana.forEach((item) => {
      if (!item.id) return;
      const nodoActual = mapa.get(item.id)!;

      if (item.parentId === null) {
        nodoRaiz = nodoActual;
      } else {
        const padre = mapa.get(item.parentId);
        if (padre && padre.valor.tipo === 'carpeta') {
          padre.agregarHijo(nodoActual);
        }
      }
    });

    const nuevoArbol = new ArbolNArio();
    nuevoArbol.raiz = nodoRaiz;
    this.arbol = nuevoArbol;

    if (this.nodoSeleccionado && this.nodoSeleccionado.valor.id) {
      this.nodoSeleccionado = this.arbol.buscarNodo(this.nodoSeleccionado.valor.id);
    }

    this.cdr.detectChanges();
  }

  async crearRaizPrincipal() {
    const user = this.authService.currentUser();
    if (!user || !user.email) {
      alert('Debe iniciar sesión para realizar esta acción.');
      return;
    }

    const raizData: Omit<ElementoNodo, 'id'> = {
      nombre: 'Raíz Principal',
      tipo: 'carpeta',
      ownerEmail: user.email,
      parentId: null
    };

    try {
      await this.firestoreService.add(raizData);
    } catch (error: any) {
      alert('Error al crear la raíz: ' + error.message);
    }
  }

  seleccionarNodo(nodo: Nodo) {
    this.nodoSeleccionado = nodo;
  }

  async crearElemento() {
    const user = this.authService.currentUser();
    
    if (!user || !user.email) {
      alert('Debe estar registrado e iniciar sesión para crear un archivo o carpeta.');
      return;
    }

    if (!this.nodoSeleccionado || !this.nodoSeleccionado.valor.id) {
      alert('Por favor seleccione una carpeta padre en el árbol.');
      return;
    }

    if (this.nodoSeleccionado.valor.tipo === 'archivo') {
      alert('Un archivo no puede contener carpetas ni otros archivos.');
      return;
    }

    if (!this.nuevoNombre.trim()) {
      alert('Por favor ingrese un nombre.');
      return;
    }

    const nuevoElemento: Omit<ElementoNodo, 'id'> = {
      nombre: this.nuevoNombre.trim(),
      tipo: this.nuevoTipo,
      ownerEmail: user.email,
      parentId: this.nodoSeleccionado.valor.id
    };

    try {
      await this.firestoreService.add(nuevoElemento);
      this.nuevoNombre = '';
      this.cdr.detectChanges();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}