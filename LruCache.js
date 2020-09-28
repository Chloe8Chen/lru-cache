// A Least Recently Used Cache
class LruChache {
  // constructor that defines:
  //      * size of the cache
  //      * reset the members
  constructor (size) {
    if (typeof (size) !== 'number') {
      throw new Error('The size for Cache should be a number!')
    }
    if (size < 1 || size > 100) {
      throw new Error('Size of the Cache needs to be between 1 and 100!')
    }
    this.size = size
    this.reset()
  }

  reset () {
    this.storage = {}
    this.head = new LinkNode()
    this.tail = new LinkNode()
    this.head.next = this.tail
    this.tail.prev = this.head
    this.totalNumberOfItems = 0
  }

  delete (key) {
    if (this.storage[key]) {
      const oldNext = this.storage[key].next
      const oldPrev = this.storage[key].prev
      this.storage[key].prev.next = oldNext
      this.storage[key].next.prev = oldPrev
      delete this.storage[key]
      this.totalNumberOfItems--
    }
  }

  _addToFront (node) {
    node.prev = this.head
    node.next = this.head.next
    this.storage[node.key] = node
    this.head.next.prev = node
    this.head.next = node
  }

  get (key) {
    let value = null
    if (this.storage[key]) {
      value = this.storage[key].value
      const newNode = new LinkNode(key, value)
      this.delete(key)
      this._addToFront(newNode)
      this.totalNumberOfItems++
    }
    return value
  }

  put (key, value) {
    // if the key already exists, delete it first so we can add it back to the head of the list later
    this.delete(key)
    const newNode = new LinkNode(key, value)
    this._addToFront(newNode)
    this.totalNumberOfItems++
    if (this.totalNumberOfItems > this.size) {
      this.delete(this.tail.prev.key)
      this.totalNumberOfItems--
    }
  }
}
class LinkNode {
  constructor (key, value, prev = null, next = null) {
    this.key = key
    this.value = value
    this.prev = prev
    this.next = next
  }
}

module.exports = LruChache
