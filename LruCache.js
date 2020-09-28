// A Least Recently Used Cache
class LruChache
{
    // constructor that defines:
    //      * size of the cache
    //      * reset the members
    constructor(size)
    {
        this.size = size;
        this.reset();
    }

    reset()
    {
        this.storage = {};
        this.head = new LinkNode();
        this.tail = new LinkNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.totalNumberOfItems = 0;        
    }

    del(key)
    {
        if (this.storage[key])
        {
            let oldNext = this.storage[key].next;
            let oldPrev = this.storage[key].prev;
            this.storage[key].prev.next = oldNext;
            this.storage[key].next.prev = oldPrev;
            delete this.storage[key];
            this.totalNumberOfItems--;
        }
    }
    
    _addToFront(node)
    {
        node.prev = this.head;
        node.next = this.head.next;
        this.storage[node.key] = node;
        this.head.next.prev = node;
        this.head.next = node;
    }

    get(key)
    {
        let value = null;
        if (this.storage[key])
        {
            value = this.storage[key].value;
            let newNode = new LinkNode(key, value);
            this.del(key);
            this._addToFront(newNode);
            this.totalNumberOfItems++;
        }
        return value;
    }

    put(key, value)
    {
        // if the key already exists, delete it first so we can add it back to the head of the list later
        this.del(key);
        let newNode = new LinkNode(key, value);
        this._addToFront(newNode);
        this.totalNumberOfItems++;
        if (this.totalNumberOfItems > this.size)
        {
            this.del(this.tail.prev.key);
            this.totalNumberOfItems--;
        }
    }

}
class LinkNode
{
    constructor(key, value, prev = null, next = null)
    {
        this.key = key;
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

function test()
{
    let cache = new LruChache(3);
    cache.put(1,2);
    cache.put(3,4);
    cache.put(5,6);
    cache.get(1);
    cache.put(6,8);
    cache.del(6);
    cache.reset();
    cache.put(1,2);
    cache.put(3,4);
    cache.put(5,6);
    cache.get(1);
    cache.put(6,8);
    console.log(cache.get(1));
    console.log(cache.get(6));

}
test();