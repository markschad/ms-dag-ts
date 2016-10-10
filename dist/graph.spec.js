"use strict";
var test = require("tape");
require("./vertex.spec");
var graph_1 = require("./graph");
/**
 * Creates a Graph with the following topology:
 */
var setup = function () {
    return new graph_1.Graph();
};
/**
 * Creates a Graph with the following topology:
 *
 * 		0---+-----------+
 * 			  |           |
 *        1           |
 *                    |
 *            2       |
 *            |       |
 *            +---3   |
 *                    |
 *                    4
 */
var setupAndConnect = function () {
    var g = new graph_1.Graph();
    var v0 = g.addVertex();
    var v1 = g.addVertex(v0);
    var v2 = g.addVertex();
    var v3 = g.addVertex(v2);
    var v4 = g.addVertex(v0);
    return g;
};
/**
 * Proves that the Graph class works as intended.
 *
 * Assumptions:
 * 	- Vertex
 */
test("Graph", function (t) {
    /**
     * Proves that "new Graph" creates a new instance of Graph.
     */
    t.test("Graph.constructor", function (st) {
        var g = new graph_1.Graph();
        st.ok(g instanceof graph_1.Graph, "g is an instance of Graph");
        st.equal(g.vertices.length, 0, "g is initialised with no vertices.");
        st.equal(g.edges.length, 0, "g is initialised with no edges.");
        st.end();
    });
    /**
     * Proves "Graph.prototype.addVertex":
     * 	- Creates a new vertex.
     *  - Assigns it the next available vertex id.
     * 	- Inserts it at the end of the chain.
     *  - Adds it to the ordered array of vertices.
     * 	- Optionally creates an edge between the new vertex and each given vertex.
     *  - Returns the new vertex.
     *
     * Assumptions:
     * 	- Graph.constructor
     */
    t.test("Graph.prototype.addVertex", function (st) {
        var g = new graph_1.Graph();
        var v0 = g.addVertex();
        st.equal(v0.id, 0, "v0 has id 0.");
        st.same(g.vertices, [v0], "v0 is the only vertex in g.vertices.");
        var v1 = g.addVertex();
        st.equal(v1.id, 1, "v1 has id 1");
        st.same(v0.last, v1, "v1 is the last vertex.");
        st.same(g.vertices, [v0, v1], "v0 and v1 are in g.vertices respectively.");
        var v2 = g.addVertex(v0, v1);
        st.equal(v2.id, 2, "v2 has id 2.");
        st.same(v0.last, v2, "v2 is the last vertex.");
        st.equal(v2.uplinks.length, 2, "v2 has 2 uplinking edges.");
        st.end();
    });
    /**
     * Proves "Graph.prototype.addEdge":
     * 	- Throws an error if the connection is not available.
     * 	- Creates a new edge.
     * 	- Assigns it the next available id.
     * 	- Assigns it the given top and bottom vertices.
     * 	- Returns it.
     *
     * Assumptions:
     * 	- Graph.constructor
     * 	- Graph.prototype.addVertex
     */
    t.test("Graph.prototype.addEdge", function (st) {
        var g = setupAndConnect();
        var throwError = function () { g.addEdge(g.vertices[4], g.vertices[0]); };
        st.throws(throwError, "attempting to connect v[4] to v[0] throws an error.");
        var e = g.addEdge(g.vertices[3], g.vertices[0]);
        st.equal(e.id, 3, "assigns the new edge an id of 3.");
        st.same(e.top, g.vertices[3], "sets top to v[3].");
        st.same(e.bottom, g.vertices[0], "sets bottom to v[0].");
        st.end();
    });
    /**
     * Proves "Graph.prototype.traverse":
     * 	- Visits each vertex in order.
     * 	- Stops if a truthy value is returned by cb.
     *
     * Assumptions:
     * 	- Graph.constructor
     * 	- Graph.prototype.addVertex
     */
    t.test("Graph.prototype.traverse", function (st) {
        var g = setupAndConnect();
        var a = [];
        var cb = function (v) { return a.push(v.id) > 2; };
        g.traverse(cb);
        st.same(a, [0, 1, 2]);
        st.end();
    });
    /**
     * Done.
     */
    t.end();
});
//# sourceMappingURL=graph.spec.js.map