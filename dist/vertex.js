"use strict";
/**
 * Represents a vertex within a directed-acyclic-graph.
 */
var Vertex = (function () {
    /**
     * Instantiates a new instance of Vertex.
     */
    function Vertex(id) {
        if (id === void 0) { id = 0; }
        this._next = null;
        this._previous = null;
        this._uplinks = [];
        this._downlinks = [];
        this._id = id;
    }
    /**
     * Joins the given vertices such that the second is the first's next.  This method does not
     * repair the structure of the chain.
     */
    Vertex.join = function (v1, v2) {
        v1 && (v1._next = v2);
        v2 && (v2._previous = v1);
    };
    /**
     * Unjoins the given vertex such that it has no next or previous.  This method does not repair
     * the structure of the chain.
     */
    Vertex.unjoin = function (vertex) {
        vertex._next = null;
        vertex._previous = null;
    };
    Object.defineProperty(Vertex.prototype, "id", {
        /** Gets the unique id of this Vertex. */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "uplinks", {
        /** Gets the collection of uplinks. */
        get: function () { return this._uplinks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "downlinks", {
        /** Gets the collection of downlinks. */
        get: function () { return this._downlinks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "first", {
        /** Gets the first vertex in the chain. */
        get: function () {
            return this._previous ? this._previous.first : this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "before", {
        /** Gets an array of vertices which are before this vertex in the chain. */
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
        /** Gets the previous vertex in the chain. */
        get: function () {
            return this._previous;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "next", {
        /** Gets the next vertex in the chain. */
        get: function () {
            return this._next;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vertex.prototype, "after", {
        /**
         * Gets an array of vertices which are after this vertex in the chain.
         */
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
        /** Gets the last vertex in the chain. */
        get: function () {
            return this._next ? this._next.last : this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Removes this vertex from the chain and returns it.
     */
    Vertex.prototype.remove = function () {
        Vertex.join(this._previous, this._next);
        Vertex.unjoin(this);
        return this;
    };
    /**
     * Inserts the given vertex directly before this vertex.
     * @param {Vertex} vertex The vertex to insert.
     */
    Vertex.prototype.insertBefore = function (vertex) {
        var previous = this._previous;
        Vertex.join(vertex.previous, vertex.next);
        Vertex.join(previous, vertex);
        Vertex.join(vertex, this);
        return vertex;
    };
    /**
     * Inserts the given vertex directly after this one.
     * @param {Vertex} vertex The vertex to insert.
     */
    Vertex.prototype.insertAfter = function (vertex) {
        var next = this._next;
        Vertex.join(vertex.previous, vertex.next);
        Vertex.join(this, vertex);
        Vertex.join(vertex, next);
        return vertex;
    };
    /**
     * Returns true if this vertex is before the given vertex.
     * @param {Vertex} vertex The vertex to check.
     */
    Vertex.prototype.isBefore = function (vertex) {
        return this._next && (this._next === vertex || this._next.isBefore(vertex));
    };
    /**
     * Returns true if this vertex is after the given vertex.
     * @param {Vertex} vertex The vertex to check.
     */
    Vertex.prototype.isAfter = function (vertex) {
        return this._previous && (this._previous === vertex || this._previous.isAfter(vertex));
    };
    /**
     * Returns an array of vertices which connect directly to this vertex.
     */
    Vertex.prototype.directlyAbove = function () {
        return this._uplinks.map(function (e) { return e.top; });
    };
    /**
     * Returns an array of vertices which connect directly or indirectly to this vertex.
     */
    Vertex.prototype.above = function () {
        return this.directlyAbove().reduce(function (prev, cur) {
            return prev.concat([cur], cur.directlyAbove());
        }, []);
    };
    /**
     * Returns true if the given vertex is a direct or indirect uplink of this vertex.
     */
    Vertex.prototype.isAbove = function (vertex) {
        if (vertex === this) {
            return false;
        }
        var cb = function (e, i, arr) { return e === vertex; };
        return this.above().some(cb, this);
    };
    /**
     * Returns an array of vertices to which this vertex direectly connects.
     */
    Vertex.prototype.directlyBelow = function () {
        return this._downlinks.map(function (e) { return e.bottom; });
    };
    /**
     * Returns an array of vertices to which this vertex connects directly or indirectly.
     */
    Vertex.prototype.below = function () {
        return this.directlyBelow().reduce(function (prev, cur) {
            return prev.concat([cur], cur.directlyBelow());
        }, []);
    };
    /**
     * Returns true if the given vertex is a direct or indirect downlink of this vertex.
     */
    Vertex.prototype.isBelow = function (vertex) {
        if (vertex === this) {
            return false;
        }
        var cb = function (e, i, arr) { return e === vertex; };
        return this.below().some(cb, this);
    };
    /**
     * Connects this vertex to the given vertex, returning a new instance of edge which defines the
     * relationship between the two vertices.
     */
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
    /**
     * If necessary, moves this vertex immediately before its highest priority downlink and returns
     * it.  Triggers this method for every uplink of this vertex.
     */
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
    /**
     * Returns an array of possible edges that could be created without creating a cyclical
     * connection.
     */
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
    /**
     * Produces a string representation of this vertex.
     */
    Vertex.prototype.toString = function () {
        return "Vertex [$this.id]";
    };
    return Vertex;
}());
exports.Vertex = Vertex;
//# sourceMappingURL=vertex.js.map