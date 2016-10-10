"use strict";
var vertex_1 = require("./vertex");
/**
 * Represents a directed-acyclic-graph.
 */
var Graph = (function () {
    /**
     * Instantiates a new instance of Graph.
     */
    function Graph() {
        this._vertices = [];
        this._edges = [];
    }
    Object.defineProperty(Graph.prototype, "vertices", {
        /** Gets the array of vertices contained in this graph. */
        get: function () { return this._vertices; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graph.prototype, "edges", {
        /** Gets the array of edges contained in the graph. */
        get: function () { return this._edges; },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a new vertex to the graph.
     */
    Graph.prototype.addVertex = function () {
        var uplinks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uplinks[_i - 0] = arguments[_i];
        }
        var v = new vertex_1.Vertex(this._vertices.length);
        this._vertices.length && this._vertices[0].last.insertAfter(v);
        this._vertices.push(v);
        for (var _a = 0, uplinks_1 = uplinks; _a < uplinks_1.length; _a++) {
            var l = uplinks_1[_a];
            this._edges.push(l.connectTo(v, this._edges.length));
        }
        return v;
    };
    /**
     * Adds a new edge to the graph.
     */
    Graph.prototype.addEdge = function (top, bottom) {
        var proto = { top: top, bottom: bottom };
        var cb = function (e) { return e.top === proto.top && e.bottom === proto.bottom; };
        if (!top.availableConnections().some(cb)) {
            throw new Error("Unable to create edge.  Circular connection detected!");
        }
        var e = top.connectTo(bottom, this._edges.length);
        this._edges.push(e);
        return e;
    };
    /**
     * Returns an array of every available edge.
     */
    Graph.prototype.availableEdges = function () {
        return this._vertices.reduce(function (prev, cur) {
            return prev.concat(cur.availableConnections());
        }, []);
    };
    /**
     * Traverses forward from the given vertex, executing the callback at each vertex.
     */
    Graph.prototype._traverse = function (v, i, cb) {
        cb(v, i);
        v.next && this._traverse(v.next, i + 1, cb);
    };
    /**
     * Traverses the graph in order, calling callback at each vertex.
     */
    Graph.prototype.traverse = function (cb) {
        this._traverse(this._vertices[0].first, 0, cb);
    };
    return Graph;
}());
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map