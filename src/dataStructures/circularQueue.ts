/**
 * https://en.wikipedia.org/wiki/Circular_buffer
 */
export class CircularQueue<T> {
    private head: number
    private tail: number
    private _size: number
    private buffer: T[]

    constructor(capacity: number) {
        this.head = -1
        this.tail = 0
        this._size = 0
        this.buffer = Array(capacity)
    }

    get size() {
        return this._size
    }

    get capacity() {
        return this.buffer.length
    }

    push(value: T) {
        if (this._size > this.capacity) {
            // shift the end to "make room"
            this.tail = (this.tail + 1) % this.capacity
        }
        this.head = (this.head + 1) % this.capacity
        this.buffer[this.head] = value

        if (this._size < this.capacity) {
            this._size += 1
        }
    }

    pop() {
        if (this._size === 0) {
            return null
        }
        const val = this.buffer[this.head]
        this.head = (this.capacity + this.head - 1) % this.capacity
        this._size -= 1
        return val
    }
}
