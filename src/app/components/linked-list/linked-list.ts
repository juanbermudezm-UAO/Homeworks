import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Importar CommonModule
import { LinkedList, Node } from '../../models/linked-list.model';

interface Song {
  id: number;
  titulo: string;
  artista: string;
}

@Component({
  standalone: true,
  selector: 'app-linked-list',
  imports: [CommonModule], // 2. Agregar CommonModule a las importaciones
  templateUrl: './linked-list.html',
  styleUrl: './linked-list.css'
})
export class LinkedListComponent implements OnInit {
  private playlist = new LinkedList<Song>();
  public currentSongNode = signal<Node<Song> | null>(null);

  ngOnInit(): void {
    this.playlist.append({ id: 1, titulo: 'Sweden', artista: 'C418' });
    this.playlist.append({ id: 2, titulo: 'Haggstrom', artista: 'C418' });
    this.playlist.append({ id: 3, titulo: 'Mice on Venus', artista: 'C418' });

    this.currentSongNode.set(this.playlist.head);
  }

  nextSong(): void {
    const current = this.currentSongNode();
    if (current && current.next) {
      this.currentSongNode.set(current.next);
    }
  }
}