import MinHeap from '../heap/MinHeap'
import Comparator from '../../src/utils/comparator/Comparator'


export default class PriorityQueue extends MinHeap {
    constructor() {
        // Call minHip contructor first
        super();

        // Setup priorities map
        // eslint-disable-next-line no-undef
        this.priorities = new Map()

        // User custom comparator for heap elements that will take element priority
        // insted of element value into account
        this.compare = new Comparator(this.comparePriority.bind(this))
    }

    /**
     * Add item to priority queue.
     * @param {*} item - item we're going to add to the queue.
     * @param {number} [priority] - items priority
     * @return {PriorityQueue}
     */
    add(item, priority = 0) {
        this.priorities.set(item, priority)
        // this.priorities.push({ item, priority })
        super.add(item)
        return this
    }


    /**
    * Remove item from priority queue.
    * @param {*} item - item we're going to remove.
    * @param {Comparator} [customFindingComparator] - custom function for finding the item to remove
    * @return {PriorityQueue}
    */
    remove(item, customFindingComparator) {
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    }


    /**
     * Change priority of the item in a queue.
     * @param {*} item - item we're going to re-prioritize.
     * @param {number} priority - new item's priority.
     * @return {PriorityQueue}
     */
    changePriority(item, priority) {
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority)
        return this
    }

    findByValue(item) {
        return this.find(item, new Comparator(this.compareValue))
    }

    hasValue(item) {
        return this.findByValue(item).length > 0
    }

    comparePriority(a, b) {
        // if (this.priorities.find(x => x.item = a).priority === this.priorities.find(x => x.item = b).priority) {
        //     return 0
        // }

        // return this.priorities.find(x => x.item = a).priority
        //     < this.priorities.find(x => x.item = b).priority ? -1 : 1


        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0
        }
        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
    }

    compareValue(a, b) {
        if (a == b) {
            return 0
        }
        return a < b ? -1 : 1
    }

}
