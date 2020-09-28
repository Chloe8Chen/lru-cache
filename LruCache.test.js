const LruCache = require('./LruCache')
require('should')
describe('LruCache ', function () {
  let lruCache
  beforeEach(function () {
    lruCache = new LruCache(3)
  })
  it('should get nothing if empty', function () {
    should.equal(lruCache.get(1), null)
  })
  it('should get value if exits', function () {
    lruCache.put(1, 'a')
    should.equal(lruCache.get(1), 'a')
  })
  it('should not get value if key is pushed out', function () {
    lruCache.put(1, 'a')
    lruCache.put(2, 'b')
    lruCache.put(3, 'c')
    lruCache.put(4, 'c')
    should.notEqual(lruCache.get(1), 'a')
  })
  it('should move item to the front once get', function () {
    lruCache.put(1, 'a')
    lruCache.put(2, 'b')
    lruCache.put(3, 'c')
    lruCache.get(1)
    should.equal(lruCache.head.next.key, 1)
    should.equal(lruCache.head.next.value, 'a')
  })
  it('should put item to the cache', function () {
    should.equal(lruCache.get(1), null)
    lruCache.put(1, 'a')
    should.equal(lruCache.get(1), 'a')
  })
  it('should update item if push with key that exists', function () {
    lruCache.put(1, 'a')
    should.equal(lruCache.get(1), 'a')
    lruCache.put(1, 'b')
    should.equal(lruCache.get(1), 'b')
  })
  it('should push out LRU item out when put at capacity', function () {
    lruCache.put(1, 'a')
    lruCache.put(2, 'b')
    lruCache.put(3, 'c')
    should.equal(lruCache.get(1), 'a')
    lruCache.put(4, 'c')
    should.equal(lruCache.get(2), null)
  })
  it('should delete item', function () {
    lruCache.put(1, 'a')
    should.equal(lruCache.get(1), 'a')
    lruCache.delete(1)
    should.equal(lruCache.get(1), null)
  })
  it('should be able to reset', function () {
    lruCache.put(1, 'a')
    should.equal(lruCache.get(1), 'a')
    lruCache.reset()
    should.equal(lruCache.head.next, lruCache.tail)
    should.equal(lruCache.totalNumberOfItems, 0)
  })
  it('should throw error if cache size is negative', function () {
    try {
      lruCache = new LruChache(-1)
    } catch (err) {
      should.exist(err)
    }
  })
  it('should throw error if cache size is greater than 100', function () {
    try {
      lruCache = new LruChache(110)
    } catch (err) {
      should.exist(err)
    }
  })
})
