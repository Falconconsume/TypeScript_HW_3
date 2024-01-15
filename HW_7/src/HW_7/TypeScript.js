var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function filterArray(array, condition) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}
var arr = [1, 2, 3, -2, 8];
filterArray(arr, function (e) { return e > 2; });
var Stack = /** @class */ (function () {
    function Stack() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.stack = [];
        this.stack = __spreadArray([], args, true);
    }
    Stack.prototype.push = function (e) {
        return this.stack.push(e);
    };
    Stack.prototype.pop = function () {
        return this.stack.pop();
    };
    Stack.prototype.peek = function () {
        return this.stack[this.stack.length - 1];
    };
    return Stack;
}());
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this.dictionary = new Map();
    }
    Dictionary.prototype.set = function (word, definition) {
        this.dictionary.set(word, definition);
    };
    Dictionary.prototype.get = function (word) {
        return this.dictionary.get(word);
    };
    Dictionary.prototype.has = function (word) {
        return this.dictionary.has(word);
    };
    return Dictionary;
}());
