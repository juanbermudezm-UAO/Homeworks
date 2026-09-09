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

export class DoubleCircularLinkedList {
    public head: Node | null;
    public tail: Node | null;
    public length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    agregarAlComite(value: any): void {
        const newNode = new Node(value)

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head;
            newNode.prev = this.tail;
        } else {
            if (this.tail) {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                newNode.next = this.head;
                this.head.prev = newNode;
                this.tail = newNode;
            }
        }
        this.length++;
    }

    sigMiembroComite(): any | null {
        if (!this.head || !this.tail) {
            return null;
        }
        this.head = this.head.next;
        this.tail = this.tail.next;

        if (this.head)
            return this.head.value;
        else
            return null;
    }

    antMiembroComite(): any | null {
        if (!this.head || !this.tail)
            return null;
        this.head = this.head.prev;
        this.tail = this.tail.prev;

        if (this.head)
            return this.head.value;
        else
            return null;
    }

    toArray(): any[] {
        const res: any[] = [];
        let current: Node | null = this.head;

        if (!current)
            return res;

        while (current && current !== this.head) {
            res.push(current.value);
            current = current.next;
        }
        return res
    }
}