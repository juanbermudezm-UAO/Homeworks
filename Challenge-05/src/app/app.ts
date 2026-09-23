import { Component, signal } from '@angular/core';
import { ColaCajeroComponente } from './componentes/cola-cajero/cola-cajero.componente';

@Component({
  selector: 'app-root',
  imports: [ColaCajeroComponente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Challenge-05');
}
