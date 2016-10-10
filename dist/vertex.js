"use strict";
var Vertex = (function () {
    function Vertex(id) {
        if (id === void 0) { id = 0; }
        this._next = null;
        this._previous = null;
        this._uplinks = [];
        this._downlinks = [];
        this._id = id;
    }
    Vertex.join = function (v1, v2) {
        v1 && (v1._next = v2);
        v2 && (v2._previous = v1);
    };
    Vertex.unjoin = function (vertex) {
        vertex._next = null;
        vertex._previous = null;
    };
    Object.defineProperty(Vertex.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "uplinks", {
        get: function () { return this._uplinks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "downlinks", {
        get: function () { return this._downlinks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "first", {
        get: function () {
            return this._previous ? this._previous.first : this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "before", {
        get: function () {
            if (this._previous) {
                return [this._previous].concat(this._previous.before);
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "previous", {
        get: function () {
            return this._previous;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "next", {
        get: function () {
            return this._next;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "after", {
        get: function () {
            if (this._next) {
                return [this._next].concat(this._next.after);
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "last", {
        get: function () {
            return this._next ? this._next.last : this;
        },
        enumerable: true,
        configurable: true
    });
    Vertex.prototype.remove = function () {
        Vertex.join(this._previous, this._next);
        Vertex.unjoin(this);
        return this;
    };
    Vertex.prototype.insertBefore = function (vertex) {
        var previous = this._previous;
        Vertex.join(vertex.previous, vertex.next);
        Vertex.join(previous, vertex);
        Vertex.join(vertex, this);
        return vertex;
    };
    Vertex.prototype.insertAfter = function (vertex) {
        var next = this._next;
        Vertex.join(vertex.previous, vertex.next);
        Vertex.join(this, vertex);
        Vertex.join(vertex, next);
        return vertex;
    };
    Vertex.prototype.isBefore = function (vertex) {
        return this._next && (this._next === vertex || this._next.isBefore(vertex));
    };
    Vertex.prototype.isAfter = function (vertex) {
        return this._previous && (this._previous === vertex || this._previous.isAfter(vertex));
    };
    Vertex.prototype.directlyAbove = function () {
        return this._uplinks.map(function (e) { return e.top; });
    };
    Vertex.prototype.above = function () {
        return this.directlyAbove().reduce(function (prev, cur) {
            return prev.concat([cur], cur.directlyAbove());
        }, []);
    };
    Vertex.prototype.isAbove = function (vertex) {
        if (vertex === this) {
            return false;
        }
        var cb = function (e, i, arr) { return e === vertex; };
        return this.above().some(cb, this);
    };
    Vertex.prototype.directlyBelow = function () {
        return this._downlinks.map(function (e) { return e.bottom; });
    };
    Vertex.prototype.below = function () {
        return this.directlyBelow().reduce(function (prev, cur) {
            return prev.concat([cur], cur.directlyBelow());
        }, []);
    };
    Vertex.prototype.isBelow = function (vertex) {
        if (vertex === this) {
            return false;
        }
        var cb = function (e, i, arr) { return e === vertex; };
        return this.below().some(cb, this);
    };
    Vertex.prototype.connectTo = function (vertex, id) {
        if (id === void 0) { id = 0; }
        for (var _i = 0, _a = this._downlinks; _i < _a.length; _i++) {
            var e_1 = _a[_i];
            if (e_1.bottom === vertex) {
                throw new Error("The vertices are already connected.");
            }
        }
        var e = {
            id: id,
            top: this,
            bottom: vertex,
            content: null
        };
        this._downlinks.push(e);
        vertex._uplinks.push(e);
        return e;
    };
    Vertex.prototype.reflow = function () {
        for (var _i = 0, _a = this._downlinks; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.bottom.isBefore(this)) {
                e.bottom.insertBefore(this);
            }
        }
        for (var _b = 0, _c = this.above(); _b < _c.length; _b++) {
            var v = _c[_b];
            v.reflow();
        }
        return this;
    };
    Vertex.prototype.availableConnections = function () {
        var _this = this;
        var protos = [];
        var isConnected = function (v) { return _this._downlinks.some(function (e) { return e.bottom === v; }); };
        var pointer = this.first;
        while (pointer) {
            if (pointer !== this && !pointer.isBelow(this) && !isConnected(pointer)) {
                protos.push({
                    top: this,
                    bottom: pointer
                });
            }
            pointer = pointer.next;
        }
        return protos;
    };
    Vertex.prototype.toString = function () {
        return "Vertex [$this.id]";
    };
    return Vertex;
}());
exports.Vertex = Vertex;
//# sourceMappingURL=vertex.js.map