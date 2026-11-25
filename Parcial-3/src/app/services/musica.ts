import { Injectable, signal } from '@angular/core';
import { Trie } from '../components/search-trie/trie';
import { MaxHeap } from '../components/top-heap/max-heap';
import { Graph } from '../components/related-graph/grafo';

export interface Song {
    id: string;
    title: string;
    artist: string;
    plays: number;
}

@Injectable({ providedIn: 'root' })
export class Musica {
    private trie = new Trie();
    private maxHeap = new MaxHeap();
    private graph = new Graph();

    suggestions = signal<string[]>([]);
    exactExists = signal<boolean | null>(null);
    topSongs = signal<Song[]>([]);
    selectedSong = signal<Song | null>(null);
    relatedSongs = signal<Song[]>([]);

    constructor() {
        this.seedInitialData();
    }

    private seedInitialData(): void {
        const initialSongs: Song[] = [
            { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', plays: 4200 },
            { id: '2', title: 'Starboy', artist: 'The Weeknd', plays: 3100 },
            { id: '3', title: 'Save Your Tears', artist: 'The Weeknd', plays: 2900 },
            { id: '4', title: 'Levitating', artist: 'Dua Lipa', plays: 3800 },
            { id: '5', title: 'Dont Start Now', artist: 'Dua Lipa', plays: 2700 },
            { id: '6', title: 'Bohemian Rhapsody', artist: 'Queen', plays: 5000 },
            { id: '7', title: 'Stay', artist: 'The Kid LAROI', plays: 3400 },
        ];

        initialSongs.forEach((song) => this.registerSong(song));

        this.connectSongs('1', '2');
        this.connectSongs('1', '3');
        this.connectSongs('1', '4');
        this.connectSongs('4', '5');
        this.connectSongs('2', '7');

        this.selectSong(initialSongs[0]);
    }

    registerSong(song: Song): void {
        this.trie.insert(song.title);
        this.maxHeap.push(song);
        this.graph.addNode(song);
        this.topSongs.set(this.maxHeap.getTopK(5));
    }

    connectSongs(idA: string, idB: string): void {
        const node1 = this.graph.searchNode(idA);
        const node2 = this.graph.searchNode(idB);
        if (node1 && node2) {
            this.graph.addEdge(node1, node2);
            const current = this.selectedSong();
            if (current && (current.id === idA || current.id === idB)) {
                this.relatedSongs.set([...this.graph.printAdjacency(current.id)]);
            }
        }
    }

    onSearchInput(query: string): void {
        if (!query.trim()) {
            this.suggestions.set([]);
            this.exactExists.set(null);
            return;
        }
        this.suggestions.set(this.trie.suggest(query));
        this.exactExists.set(this.trie.search(query));
    }

    selectByTitle(title: string): void {
        const found = this.graph.nodes.find(
            (s) => s.title.trim().toLowerCase() === title.trim().toLowerCase()
        );
        if (found) {
            this.selectSong(found);
        }
    }

    selectSong(song: Song): void {
    this.selectedSong.set(song);
    const vecinos = this.graph.adjList[song.id] ?? [];
    this.relatedSongs.set([...vecinos]);
    }

    playSong(song: Song): void {
        song.plays += 100;
        this.maxHeap.heapify();
        this.topSongs.set(this.maxHeap.getTopK(5));
    }

    getAllSongs(): Song[] {
        return this.graph.nodes;
    }
}