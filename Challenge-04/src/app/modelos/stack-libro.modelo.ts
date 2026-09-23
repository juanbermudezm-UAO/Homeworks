export interface Libro {
    nombre: string;
    isbn: string;
    autor: string;
    editorial: string;
}

export class Stack {
    items: Libro[];

    constructor() {
        this.items = [];
    }

    push(value: Libro): void {
        this.items.push(value);
    }

    pop(): Libro | null {
        return this.items.length > 0 ? this.items.pop()! : null;
    }

    peek(): Libro | null {
        return this.items.length > 0 ? this.items[this.items.length - 1] : null;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    print(): void {
        this.items.slice().reverse().forEach(item => {
            console.log(item);
        });
    }

    getItems(): Libro[] {
        return this.items.slice().reverse();
    }
}