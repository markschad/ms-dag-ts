"use strict";
var test = require("tape");
require("./vertex.spec");
var graph_1 = require("./graph");
var setup = function () {
    return new graph_1.Graph();
};
var setupAndConnect = function () {
    var g = new graph_1.Graph();
    var v0 = g.addVertex();
    var v1 = g.addVertex(v0);
    var v2 = g.addVertex();
    var v3 = g.addVertex(v2);
    var v4 = g.addVertex(v0);
    return g;
};
test("Graph", function (t) {
    t.test("Graph.constructor", function (st) {
        var g = new graph_1.Graph();
        st.ok(g instanceof graph_1.Graph, "g is an instance of Graph");
        st.equal(g.vertices.length, 0, "g is initialised with no vertices.");
        st.equal(g.edges.length, 0, "g is initialised with no edges.");
        st.end();
    });
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
    t.end();
});
//# sourceMappingURL=graph.spec.js.map