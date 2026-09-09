export class Node {
    public value: any;
    public next: Node | null;

    constructor(value: any) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    public head: Node | null;
    public tail: Node | null;
    public length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    añadir(value: any): void {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                this.tail.next = newNode;

                this.tail = newNode;
            }
        }
        this.length++;
    }

    borrar(value: any): string {
        if (!this.head) {
            return "Valor no encontrado";
        }

        if (this.head.value === value) {
            this.head = this.head.next;
            this.length--;
            if (this.length === 0) {
                this.tail = null;
            }
            return "Valor eliminado";
        }


        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                if (current.next === this.tail) {
                    this.tail = current;
                }
                current.next = current.next.next;
                this.length--;
                return "Valor eliminado";
            }
            current = current.next;
        }
        return "Valor no encontrado";
    }

    toArray(): any[] {
        const res: any[] = [];
        let current = this.head;

        while (current) {
            res.push(current.value);
            current = current.next;
        }

        return res;
    }
}