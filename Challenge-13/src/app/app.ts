import { Component, inject } from '@angular/core';
import { Gifs } from './services/gifs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  gifsService = inject(Gifs);

  buscar(query: string) {
    if (!query.trim()) return;
    this.gifsService.buscarGifs(query);
  }
}