import { CircularQueue } from './circularBuffer'
import { expect, test } from '@jest/globals'

test('Does not overflow', () => {
    const capacity = 10
    const cb = new CircularQueue(capacity)
    for (let i = 0; i < capacity * 2; i++) {
        cb.push(i)
    }
    expect(cb.size).toBe(capacity)
})

test('Is the right size', () => {
    const capacity = 5
    const cb = new CircularQueue(capacity)
    for (let i = 0; i < capacity; i++) {
        cb.push(i)
        expect(cb.size).toBe(i + 1)
    }
    for (let i = capacity; i > 0; i--) {
        cb.pop()
        expect(cb.size).toBe(i - 1)
    }
})

test('Is FIFO', () => {
    const capacity = 10
    const cb = new CircularQueue(capacity)
    for (let i = 0; i < capacity; i++) {
        cb.push(i)
    }

    const items = []
    for (let i = 0; i < capacity; i++) {
        items.push(cb.pop())
    }
    // Ex. capacity == 10 -> [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    const expected = [...Array(capacity).keys()].reverse()
    expect(items).toEqual(expected)
})

test('Is circular', () => {
    const capacity = 10
    const cb = new CircularQueue(capacity)

    for (let i = 0; i < capacity; i++) {
        cb.push(i)
    }
    for (let i = 0; i < capacity; i++) {
        cb.push(i)
    }

    const items = []
    for (let i = 0; i < capacity; i++) {
        items.push(cb.pop())
    }
    // Ex. capacity == 10 -> [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    const expected = [...Array(capacity).keys()].reverse()
    expect(items).toEqual(expected)
})
