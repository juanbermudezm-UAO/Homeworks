import { Component } from '@angular/core';
import { Clinica } from './clinica/clinica';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Clinica],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = "Aplicacion Clinica"
}
