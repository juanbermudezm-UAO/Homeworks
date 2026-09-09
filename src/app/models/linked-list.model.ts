export class Node<T> {
    public value: T;
    public next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList<T> {
    public head: Node<T> | null = null;
    public tail: Node<T> | null = null;
    public length: number = 0;

    append(value: T): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else if (this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.length++;
    }
}
