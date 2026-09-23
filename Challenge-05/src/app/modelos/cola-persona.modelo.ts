export interface PersonaATM {
    nombre: string;
    montoRetiro: number;
    fechaLlegada: Date;
}

export class Queue {
    items: PersonaATM[];

    constructor() {
        this.items = [];
    }

    enqueue(item: PersonaATM): void {
        this.items.push(item);
    }

    dequeue(): PersonaATM | null {
        return this.items.length > 0 ? this.items.shift()! : null;
    }

    peek(): PersonaATM | null {
        return this.items.length > 0 ? this.items[0] : null;
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    print(): void {
        this.items.forEach(item => {
            console.log(item);
        });
    }

    getItems(): PersonaATM[] {
        return this.items;
    }
}