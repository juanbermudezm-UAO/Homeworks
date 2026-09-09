import { Component, OnInit, signal } from '@angular/core';
import { DoublyLinkedList, DoubleNode } from '../../models/double-linked-list.model';

interface WebPage {
  titulo: string;
  url: string;
}

@Component({
  selector: 'app-double-linked-list',
  standalone: true,
  templateUrl: './double-linked-list.html',
  styleUrl: './double-linked-list.css'
})
export class DoubleLinkedListComponent implements OnInit {
  private history = new DoublyLinkedList<WebPage>();
  public currentPageNode = signal<DoubleNode<WebPage> | null>(null);

  ngOnInit(): void {
    // Cargar datos quemados (fake data)
    this.history.append({ titulo: 'Google', url: 'https://google.com' });
    this.history.append({ titulo: 'UAO Virtual', url: 'https://uaao.edu.co' });
    this.history.append({ titulo: 'GitHub', url: 'https://github.com' });

    // Iniciar navegación en la primera página (Head)
    this.currentPageNode.set(this.history.head);
  }

  goBack(): void {
    const current = this.currentPageNode();
    if (current && current.prev) {
      this.currentPageNode.set(current.prev);
    }
  }

  goForward(): void {
    const current = this.currentPageNode();
    if (current && current.next) {
      this.currentPageNode.set(current.next);
    }
  }
}