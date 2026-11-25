import { Song } from '../../services/musica';

export class Graph {
    nodes: Song[];
    adjList: { [key: string]: Song[] };

    constructor() {
        this.nodes = [];
        this.adjList = {};
    }

    addNode(node: Song): void {
        if (!this.searchNode(node.id)) {
            this.nodes.push(node);
            this.adjList[node.id] = [];
        }
    }

    addEdge(node1: Song, node2: Song): void {
        if (node1.id === node2.id) return;
        if (!this.searchNode(node1.id) || !this.searchNode(node2.id)) return;

        const alreadyLinked = this.adjList[node1.id].some((n) => n.id === node2.id);
        if (!alreadyLinked) {
            this.adjList[node1.id].push(node2);
            this.adjList[node2.id].push(node1);
        }
    }

    searchNode(id: string): Song | undefined {
        if (!this.nodes.length) return undefined;
        return this.nodes.find((n) => n.id === id);
    }

    printAdjacency(id: string): Song[] {
        if (this.searchNode(id)) {
            console.log(this.adjList[id]);
            return this.adjList[id];
        }
        return [];
    }

    printGraph(): void {
        console.log(this.adjList);
    }
}