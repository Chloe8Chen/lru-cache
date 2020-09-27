class LruChache
{
    constructor(size)
    {
        this.size = size;
        this.totalNumberOfItems = 0;
        this.head = new LinkNode();
        this.tail = new LinkNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.storage = {};
    }

    get(key)
    {
        let value = null;
        if (!this.storage[key])
        {
            console.log(key + " does not exist in cache");
        }
        else
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
        let newNode = new LinkNode(key, value);
        this._addToFront(newNode);
        this.totalNumberOfItems++;
        if (this.totalNumberOfItems > this.size)
        {
            this.del(this.tail.prev.key);
            this.totalNumberOfItems--;
        }
    }

    del(key)
    {
        if (!this.storage[key])
        {
            console.log("key " + key + " does not exist!");
        }
        else
        {
            let oldNext = this.storage[key].next;
            let oldPrev = this.storage[key].prev;
            this.storage[key].prev.next = oldNext;
            this.storage[key].next.prev = oldPrev;
            console.log("deleting [" + key + ", " + this.storage[key].value + "] from cache!");
            delete this.storage[key];
            this.totalNumberOfItems--;
        }
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

    _addToFront(node)
    {
        node.prev = this.head;
        node.next = this.head.next;
        this.storage[node.key] = node;
        this.head.next.prev = node;
        this.head.next = node;
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
    let cache = new LruChache(7);
    cache.put(1,2);
    cache.put(3,4);
    console.log(cache.get(1));
//    cache.del(3);
  //  console.log(cache.get(1));
    console.log(cache);
}
test();