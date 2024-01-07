var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Figure = /** @class */ (function () {
    function Figure(name, color) {
        this.name = name;
        this.color = color;
    }
    return Figure;
}());
var formulaArea = /** @class */ (function (_super) {
    __extends(formulaArea, _super);
    function formulaArea(name, color, formulaFigure) {
        var _this = _super.call(this, name, color) || this;
        _this.formulaFigure = formulaFigure;
        return _this;
    }
    formulaArea.prototype.print = function () {
        console.log(this.formulaFigure);
    };
    return formulaArea;
}(Figure));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super.call(this, 'Circle', 'black') || this;
    }
    Circle.prototype.calculateArea = function (r) {
        return Math.PI * Math.pow(r, 2);
    };
    return Circle;
}(Figure));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        return _super.call(this, 'Rectangle', 'black', 'S = a * b') || this;
    }
    Rectangle.prototype.calculateArea = function (a, b) {
        return a * b;
    };
    return Rectangle;
}(formulaArea));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        return _super.call(this, 'Square', 'black') || this;
    }
    Square.prototype.calculateArea = function (a) {
        return a * a;
    };
    return Square;
}(Figure));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle() {
        return _super.call(this, 'Triangle', 'black', 'S = 1/2 * a * b') || this;
    }
    Triangle.prototype.calculateArea = function (a, b) {
        return 1 / 2 * a * b;
    };
    return Triangle;
}(formulaArea));
