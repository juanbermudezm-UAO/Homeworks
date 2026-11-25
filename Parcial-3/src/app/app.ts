import { Component } from '@angular/core';
import { SearchTrie } from './components/search-trie/search-trie';
import { TopHeap } from './components/top-heap/top-heap';
import { RelatedGraph } from './components/related-graph/related-graph';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchTrie, TopHeap, RelatedGraph],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}