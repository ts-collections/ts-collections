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
export class LinkedList<T> implements Iterable<T> {
	length: number;
	head: LinkedListNode<T> | null;
	tail: LinkedListNode<T> | null;

	constructor(values?: Iterable<T>) {
		this.length = 0;
		this.head = this.tail = null;
		if (!values) {
			return;
		}
		for (const value of values) {
			this.addLast(value);
		}
	}

	get(index: number) {
		if (index < 0 || index >= this.length) {
			return null;
		}

		let temp = this.head;
		while (index > 0) {
			if (!temp) {
				return null;
			}
			temp = temp.next;
			index--;
		}

		if (!temp) {
			return null;
		}
		return temp.value;
	}

	addFirst(value: T): void {
		let node = new LinkedListNode<T>(value, this.head);

		if (this.head == null || this.tail == null) {
			this.head = this.tail = node;
			this.length = 1;
			return;
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
			return;
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

	delete(index: number) {
		if (index < 0 || index >= this.length) {
			return null;
		}

		let temp = this.head;
		while (index > 1) {
			temp = temp?.next ?? null;
			index--;
		}
		this.length--;
		return temp ?? null;
	}

	reverse(): void {
		let current = this.head;
		let temp: LinkedListNode<T> | null = null;

		while (current !== null) {
			temp = current.prev;
			current.prev = current.next;
			current.next = temp;

			current = current.prev;
		}

		temp = this.head;
		this.head = this.tail;
		this.tail = temp;
	}

	[Symbol.iterator]() {
		let temp = this.head;
		const iterator: Iterator<T> = {
			next(): IteratorResult<T> {
				if (temp === null) {
					return { value: undefined, done: true };
				} else {
					const value = temp.value;
					temp = temp.next;
					return { value, done: false };
				}
			},
		};
		return iterator;
	}

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
