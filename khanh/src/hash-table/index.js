


// Hash table size directly affecs on the number of collisions/

import LinkedList from "../linked-list/LinkedList"

// The bigger the hash table size the less collision you'll get
const defaultHashTableSize = 32

export default class HashTable {
    /**
     * @param {number} hashTableSize
     */
    constructor(hashTableSize = defaultHashTableSize) {
        // Create hash table of certian size and fill each bucket with empty linked list
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList())

        // Just to keep track of all actual keys in a fast way
        this.keys = {}
    }

    /**
       * Converts key string to hash number.
       *
       * @param {string} key
       * @return {number}
       */
    hash(key) {
        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
            0,
        );

        return hash % this.buckets.length;
    }
    set(key, value) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash
        const bucketLinkedList = this.buckets[keyHash]
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key == key })
        if (!node) {
            // Insert new node.
            bucketLinkedList.append({ key, value });
        } else {
            // Update value of existing node.
            node.value.value = value;
        }
    }
    /**
     * @param {string} key
     * @return {*}
     */
    delete(key) {
        const keyHash = this.hash(key);
        delete this.keys[key];
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

        if (node) {
            return bucketLinkedList.delete(node.value);
        }

        return null;
    }

    /**
     * @param {string} key
     * @return {*}
     */
    get(key) {
        const bucketLinkedList = this.buckets[this.hash(key)];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

        return node ? node.value.value : undefined;
    }

    /**
     * @param {string} key
     * @return {boolean}
     */
    has(key) {
        return Object.hasOwnProperty.call(this.keys, key)
    }

    /**
     * @return {string[]}
     */
    getKeys() {
        return Object.keys(this.keys);
    }


}


