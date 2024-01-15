
function filterArray<T>(array: T[], condition: (value: T, index: number, array: T[]) => boolean ): T[] {
    let result: T[] = [];
    for(let i = 0; i < array.length; i++) {
        if(condition(array[i],i,array)) {
            result.push(array[i]);
        }
    }
    return result;
}

let arr: number[] = [1,2,3,-2,8];

filterArray(arr, (e: number) => e > 2 );


class Stack<T> {
    private stack: T[] = [];

    constructor (...args: T[]) {
        this.stack = [...args];
    }

    push(e: T) {
        return this.stack.push(e);
    }
    pop(): T | undefined {
        return this.stack.pop();
    }
    peek(): T | undefined {
        return this.stack[this.stack.length - 1];
    }
}

class Dictionary<K,V> {
    private dictionary : Map<K,V> = new Map();

    set(word: K, definition: V): void {
        this.dictionary.set(word,definition);
    }

    get(word:K): V | undefined {
        return this.dictionary.get(word);
    }

    has(word:K): boolean {
        return this.dictionary.has(word);
    }
}