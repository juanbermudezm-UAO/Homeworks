export class Node {
    public value: any;
    public next: Node | null;
    public prev: Node | null;

    constructor(value: any) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class DoubleLinkedList {
    public head: Node | null;
    public tail: Node | null;
    public length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    agregarAlFinal(value: any): void {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            }
        }
        this.length++;
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