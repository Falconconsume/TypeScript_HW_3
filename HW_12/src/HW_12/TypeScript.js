var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
function DeprecatedMethod(reason, nameOfNewMethod) {
    return function (target, propertyKey, descriptor) {
        console.warn("".concat(propertyKey, " can't be used.").concat(reason));
        if (nameOfNewMethod) {
            console.warn("You can use this method ".concat(nameOfNewMethod, " instead!"));
        }
        return descriptor;
    };
}
function MinLength(minNumber) {
    return function (target, propertyKey, descriptor) {
        var originalDecorator = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args[0].length < minNumber) {
                throw Error('You should enter more letters!');
            }
            return originalDecorator.apply(this, args);
        };
        return descriptor;
    };
}
function MaxLength(maxNumber) {
    return function (target, propertyKey, descriptor) {
        var originalDecorator = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args[0].length > maxNumber) {
                throw Error('You can\'t enter anything anymore!');
            }
            return originalDecorator.apply(this, args);
        };
        return descriptor;
    };
}
function Email(target, propertyKey, descriptor) {
    var originalDecorator = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!args[0].includes('@') || !args[0].includes('.')) {
            throw Error("You entered invalid email!");
        }
        return originalDecorator.apply(this, args);
    };
    return descriptor;
}
var UserCheck = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _setEmail_decorators;
    return _a = /** @class */ (function () {
            function UserCheck() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            UserCheck.prototype.setEmail = function (email) {
                console.log("Your ".concat(email, " is valid."));
            };
            return UserCheck;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _setEmail_decorators = [Email, MinLength(5), MaxLength(50)];
            __esDecorate(_a, null, _setEmail_decorators, { kind: "method", name: "setEmail", static: false, private: false, access: { has: function (obj) { return "setEmail" in obj; }, get: function (obj) { return obj.setEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
