import { Component, inject } from '@angular/core';
import { Musica } from '../../services/musica';

@Component({
  selector: 'app-related-graph',
  standalone: true,
  templateUrl: './related-graph.html',
  styleUrl: './related-graph.scss',
})
export class RelatedGraph {
  musicService = inject(Musica);

  linkSongs(idA: string, idB: string) {
    if (!idA || !idB) return;
    this.musicService.connectSongs(idA, idB);
  }
}