import { Component } from '@angular/core';
import { LinkedListComponent } from './components/linked-list/linked-list';
import { DoubleLinkedListComponent } from './components/double-linked-list/double-linked-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LinkedListComponent, DoubleLinkedListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'challenge03';
}
