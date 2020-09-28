/**
 * This is the implementation of a LRU (least recently used) cache
 * To set up and run the code please check README.md
 */
class LruChache {
  /**
   * The constructor of the cache
   * This defines the maximum size of the cache and resets cache to empty
   * @param {number} size
   */
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

  /**
   * This resets the cache
   */
  reset () {
    this.storage = {}
    this.head = new LinkNode()
    this.tail = new LinkNode()
    this.head.next = this.tail
    this.tail.prev = this.head
    this.totalNumberOfItems = 0
  }

  /**
   * This deletes an item from the cache using the key
   * @param {*} key The key of the item to be delete
   */
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

  /**
   * This is a private method to add an item to the front of the cache
   * @param {LinkNode} node
   */
  _addToFront (node) {
    node.prev = this.head
    node.next = this.head.next
    this.storage[node.key] = node
    this.head.next.prev = node
    this.head.next = node
  }

  /**
   * This gets/reads the value of an item from the cache
   * @param {*} key the key of the item to get from the cache
   */
  get (key) {
    let value = null
    // while reading the value, this item is moved to the front/top of the cache
    // indicating this item is recently used
    if (this.storage[key]) {
      value = this.storage[key].value
      const newNode = new LinkNode(key, value)
      this.delete(key)
      this._addToFront(newNode)
      this.totalNumberOfItems++
    }
    return value
  }

  /**
   * This adds an item if it's not already in the cache,
   * and updates the item if it is already in.
   * @param {*} key the key of the item to add/update
   * @param {*} value the value of the item to add/update
   */
  put (key, value) {
    // if the key already exists, delete it first so we can add it back to the head of the list later
    this.delete(key)
    const newNode = new LinkNode(key, value)
    this._addToFront(newNode)
    this.totalNumberOfItems++
    // if the cache is at capacity, the last item in the cache (least used item) will be removed
    if (this.totalNumberOfItems > this.size) {
      this.delete(this.tail.prev.key)
      this.totalNumberOfItems--
    }
  }
}

/**
 * This class is an implementation of the doubly linked list data structure
 * This ensures fast lookups and fast updates (O(1))
 */
class LinkNode {
  constructor (key, value, prev = null, next = null) {
    this.key = key
    this.value = value
    this.prev = prev
    this.next = next
  }
}
module.exports = LruChache
