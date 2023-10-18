export class Queue<T> {
    private items: T[] = [];

    // Add an item to the back of the queue
    enqueue(item: T): void {
        this.items.push(item);
    }

    // Remove and return the front item from the queue
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }

    // Return the front item without removing it
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Get the number of elements in the queue
    size(): number {
        return this.items.length;
    }

    // Clear the queue
    clear(): void {
        this.items = [];
    }
}
