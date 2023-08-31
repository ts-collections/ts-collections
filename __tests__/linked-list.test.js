import { LinkedList } from "../dist";
import { expect, test, describe, beforeEach } from "vitest";

describe("Testing constructor behaviour for LinkedList", () => {
	test("should create an empty linked list", () => {
		const list = new LinkedList();
		expect(list.length).toBe(0);
		expect(list.head).toBeNull();
		expect(list.tail).toBeNull();
	});

	test("should create a linked list from an iterable", () => {
		const values = [1, 2, 3, 4, 5];
		const list = new LinkedList(values);
		expect(list.length).toBe(values.length);
		expect(list.head.value).toBe(values[0]);
		expect(list.tail.value).toBe(values[values.length - 1]);
	});
});

describe("Testing get() method for Linked List", () => {
	let list;
	beforeEach(() => {
		list = new LinkedList();
	});

	test("get should return element at index", () => {
		list.addLast(1);
		list.addLast(2);
		expect(list.get(1)).toBe(2);
	});

	test("get should return null when index is < 0", () => {
		expect(list.get(list.get(-1))).toBeNull();
	});

	test("get should return null when index is >= length", () => {
		expect(list.get(list.get(list.length))).toBeNull();
	});
});

describe("Testing add methods for Linked List", () => {
	let list;
	beforeEach(() => {
		list = new LinkedList();
	});

	test("addFirst should add element to the start", () => {
		list.addFirst(1);
		list.addFirst(2);
		expect(list.length).toBe(2);
		expect(list.get(0)).toBe(2);
		expect(list.get(list.length - 1)).toBe(1);
	});

	test("addLast should add element to the end", () => {
		list.addLast(1);
		list.addLast(2);
		expect(list.length).toBe(2);
		expect(list.get(0)).toBe(1);
		expect(list.get(list.length - 1)).toBe(2);
	});
});

describe("Testing delete methods for linked lists", () => {
	let list;
	beforeEach(() => {
		list = new LinkedList([1, 2, 3, 4]);
	});

	test("deleteFirst should delete element from start", () => {
		list.deleteFirst();
		expect(list.get(0)).toBe(2);
		expect(list.length).toBe(3);
	});

	test("deleteLast should delete element from end", () => {
		list.deleteLast();
		expect(list.get(list.length - 1)).toBe(3);
		expect(list.length).toBe(3);
	});
});

describe("Testing length property of Linked List", () => {
	let list;
	beforeEach(() => {
		list = new LinkedList([1, 2, 3, 4]);
	});

	test("length should be 4", () => {
		expect(list.length).toBe(4);
	});

	test("should decrease by one on removal of element from start", () => {
		list.deleteFirst();
		expect(list.length).toBe(3);
	});

	test("should decrease by one on removal of element from end", () => {
		list.deleteLast();
		expect(list.length).toBe(3);
	});

	test("should decrease by one on removal of element from middle", () => {
		list.delete(3);
		expect(list.length).toBe(3);
	});

	test("should not decrease on removal of element from index < 0", () => {
		list.delete(-2);
		expect(list.length).toBe(4);
	});

	test("should not decrease on removal of element from index >= length", () => {
		list.delete(list.length);
		expect(list.length).toBe(4);
	});
});

describe("Testing toString() behaviour", () => {
	test("should convert the linked list to a string", () => {
		const list = new LinkedList([1, 2, 3]);
		const str = list.toString();
		expect(str).toBe("HEAD <-> 1 <-> 2 <-> 3 <-> END");
	});

	test("should convert empty linked list to string", () => {
		const list = new LinkedList();
		const str = list.toString();
		expect(str).toBe("HEAD <-> END");
	});

	test("should map to custom value", () => {
		const list = new LinkedList([1, 2, 3]);
		const str = list.toString((x) => x + 2);
		expect(str).toBe("HEAD <-> 3 <-> 4 <-> 5 <-> END");
	});

	test("should use custom delimiter", () => {
		const list = new LinkedList([1, 2, 3]);
		const str = list.toString((x) => x, ", ");
		expect(str).toBe("HEAD, 1, 2, 3, END");
	});
});

describe('Testing Iterator behaviour of Linked List', () => {
  test('should iterate over the linked list elements', () => {
    const list = new LinkedList([1, 2, 3]);
    const expectedValues = [1, 2, 3];
    let index = 0;
    for (const value of list) {
      expect(value).toBe(expectedValues[index]);
      index++;
    }
    expect(index).toBe(expectedValues.length);
  });

  test('should iterate over an empty linked list', () => {
    const list = new LinkedList();
    const iterator = list[Symbol.iterator]();
    const result = iterator.next();
    expect(result.value).toBeUndefined();
    expect(result.done).toBe(true);
  });

  test('should iterate partially and then reach the end', () => {
    const list = new LinkedList([1, 2, 3]);
    const iterator = list[Symbol.iterator]();
    
	const result1 = iterator.next();
    expect(result1.value).toBe(1);
    expect(result1.done).toBe(false);

    const result2 = iterator.next();
    expect(result2.value).toBe(2);
    expect(result2.done).toBe(false);

    const result3 = iterator.next();
    expect(result3.value).toBe(3);
    expect(result3.done).toBe(false);

    const result4 = iterator.next();
    expect(result4.value).toBeUndefined();
    expect(result4.done).toBe(true);
  });
});
