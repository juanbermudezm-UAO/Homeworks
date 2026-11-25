import { Component, inject } from '@angular/core';
import { Musica } from '../../services/musica';

@Component({
  selector: 'app-search-trie',
  standalone: true,
  templateUrl: './search-trie.html',
  styleUrl: './search-trie.scss',
})
export class SearchTrie {
  musicService = inject(Musica);

  addNewSong(title: string, artist: string, playsStr: string) {
    if (!title.trim() || !artist.trim()) return;
    const plays = Number(playsStr) || 100;
    const id = Date.now().toString();
    this.musicService.registerSong({
      id,
      title: title.trim(),
      artist: artist.trim(),
      plays,
    });
  }
}