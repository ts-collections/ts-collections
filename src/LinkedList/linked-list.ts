export class LinkedListNode<T> {
	value: T;
	prev: LinkedListNode<T> | null;
	next: LinkedListNode<T> | null;

	constructor(
		value: T,
		next: LinkedListNode<T> | null = null,
		prev: LinkedListNode<T> | null = null,
	) {
		this.value = value;
		this.next = next;
		this.prev = prev;
	}
}

/**
 * Implementation of doubly linked list
 */
export class LinkedList<T> {
	length: number;
	head: LinkedListNode<T> | null;
	tail: LinkedListNode<T> | null;

	constructor(values?: Iterable<T>) {
		this.length = 0;
		this.head = null;
		this.tail = null;
		if (!values) return this;
		for (const value of values) this.addLast(value);
	}

	get(index: number) {
		if (index < 0 || index >= this.length) {
			return null;
		}

		let temp = this.head;
		while (index > 0 && temp != null) {
			temp = temp.next;
		}

		return temp?.value ?? null;
	}

	addFirst(value: T): void {
		let node = new LinkedListNode<T>(value, this.head);

		if (this.head == null || this.tail == null) {
			this.head = this.tail = node;
			this.length = 1;
		}

		this.head.prev = node;
		this.head = node;
		this.length++;
	}

	addLast(value: T): void {
		let node = new LinkedListNode<T>(value, null, this.tail);

		if (this.head == null || this.tail == null) {
			this.head = this.tail = node;
			this.length = 1;
		}

		this.tail.next = node;
		this.tail = node;
		this.length++;
	}

	deleteFirst() {
		if (this.head == null) {
			return null;
		}

		const temp = this.head;
		this.head = this.head.next;
		this.length--;
		return temp.value;
	}

	deleteLast() {
		if (this.tail == null) {
			return null;
		}

		const temp = this.tail;
		this.tail = this.tail.prev;
		this.length--;
		return temp.value;
	}

	reverse() {}

	toString(callback?: (value: T) => string, delimiter?: string): string {
		let message = "HEAD" + (delimiter ?? " <-> ");
		let temp: LinkedListNode<T> | null = this.head;
		while (temp != null) {
			const str = callback ? callback(temp.value) : temp.value;
			message += str + (delimiter ?? " <-> ");
			temp = temp.next;
		}
		return message + "END";
	}
}
