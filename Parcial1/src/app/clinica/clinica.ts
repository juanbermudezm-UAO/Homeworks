import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LinkedList } from '../modelos/LinkedList.model';
import { DoubleLinkedList } from '../modelos/DoubleLinkedList.model';
import { CircularLinkedList } from '../modelos/CircularLinkedList.model';
import { DoubleCircularLinkedList } from '../modelos/DoubleCircularLinkedList.model';

@Component({
  selector: 'app-clinica',
  imports: [CommonModule, FormsModule],
  templateUrl: './clinica.html',
  styleUrl: './clinica.css'
})

export class Clinica implements OnInit {
  // Estructuras de datos
  public listaEspera = new LinkedList();
  public historial = new DoubleLinkedList();
  public medicos = new CircularLinkedList();
  public comite = new DoubleCircularLinkedList();

  // Variables de estado
  public nombrePaciente: string = '';
  public medicoActual: string = '';
  public miembroComiteActual: string = '';

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.actualizarVistas();
  }

  private cargarDatosIniciales(): void {
    // Médicos iniciales (Lista Circular Simple)
    this.medicos.añadirMedico('Dr. Pérez (Cardiología)');
    this.medicos.añadirMedico('Dra. Gómez (Pediatría)');
    this.medicos.añadirMedico('Dr. Rodríguez (Traumatología)');

    // Miembros del comité (Lista Circular Doble)
    this.comite.agregarAlComite('Director General');
    this.comite.agregarAlComite('Jefe de Cirugía');
    this.comite.agregarAlComite('Coordinador de Enfermería');

    // Pacientes iniciales (Lista Simple)
    this.listaEspera.añadir('Paciente: Carlos López');
    this.listaEspera.añadir('Paciente: Ana Martínez');
  }

  actualizarVistas(): void {
    this.medicoActual = this.medicos.head?.value || 'Sin médico de guardia';
    this.miembroComiteActual = this.comite.head?.value || 'Sin miembros';
  }

  // Método manual para simular la rotación del médico de guardia
  rotarMedicoManualmente(): void {
    this.medicos.rotarGuardia();
    this.actualizarVistas();
  }

  agregarPaciente(): void {
    if (!this.nombrePaciente.trim()) return;

    this.listaEspera.añadir(`Paciente: ${this.nombrePaciente}`);
    this.nombrePaciente = '';
  }

  atenderSiguiente(): void {
    if (!this.listaEspera.head) return;

    const pacienteAtendido = this.listaEspera.head.value;

    // Eliminar de lista de espera
    this.listaEspera.borrar(pacienteAtendido);

    // Agregar al historial con el médico activo
    const registro = `${pacienteAtendido} - Atendido por: ${this.medicoActual}`;
    this.historial.agregarAlFinal(registro);

    this.actualizarVistas();
  }

  siguienteComite(): void {
    this.comite.sigMiembroComite();
    this.actualizarVistas();
  }

  anteriorComite(): void {
    this.comite.antMiembroComite();
    this.actualizarVistas();
  }
}