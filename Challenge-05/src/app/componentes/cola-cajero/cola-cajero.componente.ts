import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Queue, PersonaATM } from '../../modelos/cola-persona.modelo';

@Component({
    selector: 'app-cola-cajero',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './cola-cajero.componente.html',
    styleUrls: ['./cola-cajero.componente.css']
})
export class ColaCajeroComponente implements OnInit {
    queue = new Queue();

    nuevaPersona = {
        nombre: '',
        montoRetiro: null as number | null
    };

    ngOnInit(): void {
        const ahora = Date.now();
        const hora1 = new Date(ahora - Math.floor(Math.random() * 20 + 10) * 60000);
        const hora2 = new Date(ahora - Math.floor(Math.random() * 9 + 5) * 60000);
        const hora3 = new Date(ahora - Math.floor(Math.random() * 4 + 1) * 60000);

        this.queue.enqueue({
            nombre: 'Carlos Mendoza',
            montoRetiro: 250000,
            fechaLlegada: hora1
        });

        this.queue.enqueue({
            nombre: 'María Gómez',
            montoRetiro: 500000,
            fechaLlegada: hora2
        });

        this.queue.enqueue({
            nombre: 'Andrés López',
            montoRetiro: 120000,
            fechaLlegada: hora3
        });

        this.queue.print();
    }

    agregarPersona(): void {
        if (!this.nuevaPersona.nombre || !this.nuevaPersona.montoRetiro || this.nuevaPersona.montoRetiro <= 0) {
            alert('Por favor completa el nombre y un monto válido a retirar.');
            return;
        }

        const persona: PersonaATM = {
            nombre: this.nuevaPersona.nombre,
            montoRetiro: this.nuevaPersona.montoRetiro,
            fechaLlegada: new Date()
        };

        this.queue.enqueue(persona);

        this.nuevaPersona = { nombre: '', montoRetiro: null };
    }

    atenderPersona(): void {
        const atendida = this.queue.dequeue();
        if (atendida) {
            alert(`Se ha atendido en el cajero a "${atendida.nombre}".\nMonto retirado: $${atendida.montoRetiro}`);
        }
    }
}