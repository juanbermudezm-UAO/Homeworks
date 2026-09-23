import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Stack, Libro } from '../../modelos/stack-libro.modelo';

@Component({
    selector: 'app-stack-libros',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './stack-libros.componentes.html',
    styleUrls: ['./stack-libros.componentes.css']
})
export class StackLibrosComponente implements OnInit {
    stack = new Stack();

    // Objeto enlazado a los campos del formulario
    nuevoLibro: Libro = {
        nombre: '',
        isbn: '',
        autor: '',
        editorial: ''
    };

    ngOnInit(): void {
        // Datos iniciales de prueba (Mock Data)
        this.stack.push({
            nombre: 'Cien Años de Soledad',
            isbn: '978-0307474728',
            autor: 'Gabriel García Márquez',
            editorial: 'Sudamericana'
        });
        this.stack.push({
            nombre: 'El Principito',
            isbn: '978-0156013987',
            autor: 'Antoine de Saint-Exupéry',
            editorial: 'Reynal & Hitchcock'
        });
        this.stack.push({
            nombre: 'Don Quijote de la Mancha',
            isbn: '978-8424116033',
            autor: 'Miguel de Cervantes',
            editorial: 'Francisco de Robles'
        });

        this.stack.print();
    }

    agregarLibro(): void {
        if (!this.nuevoLibro.nombre || !this.nuevoLibro.isbn || !this.nuevoLibro.autor || !this.nuevoLibro.editorial) {
            alert('Por favor completa todos los campos del libro.');
            return;
        }

        // Push al tope de la pila
        this.stack.push({ ...this.nuevoLibro });

        // Limpiar formulario
        this.nuevoLibro = { nombre: '', isbn: '', autor: '', editorial: '' };
    }

    desapilarLibro(): void {
        const removido = this.stack.pop();
        if (removido) {
            alert(`Se ha retirado del tope de la pila: "${removido.nombre}"`);
        }
    }
}