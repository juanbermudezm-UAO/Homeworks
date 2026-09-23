import { Component } from '@angular/core';
import { StackLibrosComponente } from './componentes/stack-libros/stack-libros.componentes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StackLibrosComponente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Challenge 04 - Stack de Libros';
}