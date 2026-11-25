import { Component, inject } from '@angular/core';
import { Musica } from '../../services/musica';

@Component({
  selector: 'app-top-heap',
  standalone: true,
  templateUrl: './top-heap.html',
  styleUrl: './top-heap.scss',
})
export class TopHeap {
  musicService = inject(Musica);
}