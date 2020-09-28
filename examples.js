const LruCache = require('./LruCache')
function test () {
  console.log('this is an example to test the LRU cache')
  const lruCache = new LruCache(3)
  lruCache.put(1, 'a')
  lruCache.put(2, 'b')
  lruCache.put(3, 'c')
  lruCache.put(4, 'd')
  console.log(lruCache.get(3))
  lruCache.delete(4)
  lruCache.reset()
}
test()
