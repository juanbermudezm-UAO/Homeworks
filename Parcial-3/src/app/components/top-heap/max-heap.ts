import { Song } from '../../services/musica';

export class MaxHeap {
    heap: Song[];

    constructor(initial: Song[] = []) {
        this.heap = [];
        if (initial.length > 0) {
            this.heap = [...initial];
            this.heapify();
        }
    }

    push(value: Song): void {
        this.heap.push(value);
        this.percolateUp();
    }

    pop(): Song | undefined {
        if (this.heap.length === 0) return undefined;
        const n = this.heap.length;
        this.swap(0, n - 1);
        const max = this.heap.pop();
        this.percolateDown(0);
        return max;
    }

    peek(): Song | undefined {
        return this.heap[0];
    }

    heapify(): void {
        const start = Math.floor((this.heap.length - 2) / 2);
        for (let i = start; i >= 0; i--) {
            this.percolateDown(i);
        }
    }

    percolateDown(index: number): void {
        let curr = index;
        while (2 * curr + 1 < this.heap.length) {
            const left = 2 * curr + 1;
            const right = 2 * curr + 2;
            const maxChild =
                right < this.heap.length && this.heap[right].plays > this.heap[left].plays
                    ? right
                    : left;

            if (this.heap[maxChild].plays > this.heap[curr].plays) {
                this.swap(curr, maxChild);
                curr = maxChild;
            } else {
                break;
            }
        }
    }

    percolateUp(): void {
        let curr = this.heap.length - 1;
        while (curr > 0) {
            const parent = Math.floor((curr - 1) / 2);
            if (this.heap[curr].plays > this.heap[parent].plays) {
                this.swap(curr, parent);
                curr = parent;
            } else {
                break;
            }
        }
    }

    swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    size(): number {
        return this.heap.length;
    }

    toArray(): Song[] {
        return [...this.heap];
    }

    getTopK(k: number): Song[] {
        const copy = new MaxHeap(this.toArray());
        const top: Song[] = [];
        for (let i = 0; i < k; i++) {
            const max = copy.pop();
            if (!max) break;
            top.push(max);
        }
        return top;
    }
}