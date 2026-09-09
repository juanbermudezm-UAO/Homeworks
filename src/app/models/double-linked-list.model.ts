export class DoubleNode<T> {
    public value: T;
    public next: DoubleNode<T> | null = null;
    public prev: DoubleNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

export class DoublyLinkedList<T> {
    public head: DoubleNode<T> | null = null;
    public tail: DoubleNode<T> | null = null;
    public length: number = 0;

    append(value: T): void {
        const newNode = new DoubleNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else if (this.tail) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }
}