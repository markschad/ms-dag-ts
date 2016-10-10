"use strict";
var test = require("tape");
var vertex_1 = require("./vertex");
var setup = function () {
    var fixtures = [];
    var prev = null;
    for (var i = 0; i < 5; i++) {
        fixtures[i] = new vertex_1.Vertex(i);
    }
    return fixtures;
};
var setupAndConnect = function () {
    var fixtures = setup();
    fixtures[0]
        .insertAfter(fixtures[1])
        .insertAfter(fixtures[2])
        .insertAfter(fixtures[3])
        .insertAfter(fixtures[4]);
    fixtures[0].connectTo(fixtures[1]);
    fixtures[0].connectTo(fixtures[4]);
    fixtures[2].connectTo(fixtures[3]);
    return fixtures;
};
test("Vertex", function (t) {
    t.test("Vertex.constructor", function (st) {
        var v0 = new vertex_1.Vertex();
        st.ok(v0 instanceof vertex_1.Vertex, "v0 is an instance of Vertex.");
        st.equal(v0.id, 0, "v0 has the default id of zero.");
        var v1 = new vertex_1.Vertex(5);
        st.equal(v1.id, 5, "v1 has an id of five.");
        st.end();
    });
    t.test("Vertex.join", function (st) {
        var v = setup();
        vertex_1.Vertex.join(v[0], v[1]);
        st.same(v[0].next, v[1], "v[0].next is v[1].");
        st.same(v[1].previous, v[0], "v[1].previous is v[0]");
        vertex_1.Vertex.join(null, v[0]);
        st.same(v[0].previous, null, "v[0].previous is null.");
        vertex_1.Vertex.join(v[1], null);
        st.same(v[1].next, null, "v[1].next is null.");
        st.end();
    });
    t.test("Vertex.unjoin", function (st) {
        var v = setup();
        vertex_1.Vertex.join(v[0], v[1]);
        vertex_1.Vertex.join(v[1], v[2]);
        vertex_1.Vertex.unjoin(v[1]);
        st.same(v[0].next, v[1], "v[0].next is v[1]");
        st.same(v[1].previous, null, "v[1].previous is null.");
        st.same(v[1].next, null, "v[1].next is null.");
        st.end();
    });
    t.test("Vertex.prototype.remove", function (st) {
        var v = setup();
        vertex_1.Vertex.join(v[0], v[1]);
        vertex_1.Vertex.join(v[1], v[2]);
        var r = v[1].remove();
        st.same(r, v[1]);
        st.isEqual(v[1].next, null);
        st.isEqual(v[1].previous, null);
        st.same(v[0].next, v[2]);
        st.same(v[2].previous, v[0]);
        st.end();
    });
    t.test("Vertex.prototype.insertBefore", function (st) {
        var v = setup();
        var g = v[0].insertBefore(v[1]);
        st.equal(v[0].previous, v[1], "v[1] comes before v[0].");
        st.equal(v[1].next, v[0], "v[0] comes after v[1].");
        st.same(g, v[1]);
        st.end();
    });
    t.test("Vertex.prototype.insertAfter", function (st) {
        var v = setup();
        var g = v[0].insertAfter(v[1]);
        st.equal(v[0].next, v[1], "v[1] comes after v[0].");
        st.equal(v[1].previous, v[0], "v[0] comes before v[1].");
        st.equal(g, v[1]);
        st.end();
    });
    t.test("Vertex.prototype.before+get", function (st) {
        var v = setup();
        v[2].insertBefore(v[1]);
        v[1].insertBefore(v[0]);
        var a = v[2].before;
        st.same(a, [v[1], v[0]]);
        st.end();
    });
    t.test("Vertex.prototype.after+get", function (st) {
        var v = setup();
        v[0].insertAfter(v[1]);
        v[1].insertAfter(v[2]);
        var a = v[0].after;
        st.same(a, [v[1], v[2]]);
        st.end();
    });
    t.test("Vertex.prototype.first+get", function (st) {
        var v = setup();
        st.equal(v[0].first, v[0], "v[0] is the first vertex in the chain, according to v[0].");
        v[0].insertBefore(v[1]);
        st.equal(v[0].first, v[1], "v[1] is now the first vertex in the chain, according to v[0].");
        v[1].insertBefore(v[2]);
        st.equal(v[0].first, v[2], "v[2] is now the first vertex in the chain, according to v[0].");
        st.equal(v[1].first, v[2], "v[2] is now the first vertex in the chain, according to v[1].");
        st.end();
    });
    t.test("Vertex.prototype.last+get", function (st) {
        var v = setup();
        st.equal(v[0].last, v[0], "v[0] is the last vertex in the chain, according to v[0].");
        v[0].insertAfter(v[1]);
        st.equal(v[0].last, v[1], "v[1] is now the last vertex in the chain, according to v[0].");
        v[1].insertAfter(v[2]);
        st.equal(v[0].last, v[2], "v[2] is now the last vertex in the chain, according to v[0].");
        st.equal(v[1].last, v[2], "v[2] is now the last vertex in the chain, according to v[1].");
        st.end();
    });
    t.test("Vertex.prototype.isBefore", function (st) {
        var v = setup();
        v[0].insertAfter(v[1]);
        st.ok(v[0].isBefore(v[1]), "v[0] is above v[1].");
        st.notOk(v[1].isBefore(v[0]), "v[0] is not above v[1]");
        st.end();
    });
    t.test("Vertex.prototype.isAfter", function (st) {
        var v = setup();
        v[0].insertBefore(v[1]);
        st.ok(v[0].isAfter(v[1]));
        st.notOk(v[1].isAfter(v[0]));
        st.end();
    });
    t.test("Vertex.prototype.connectTo", function (st) {
        var v = setup();
        var e1 = v[0].connectTo(v[1]);
        var throwError = function () { return v[0].connectTo(v[1]); };
        st.throws(throwError, "attempting to connect v[0] to v[1] a second time throws an error.");
        st.ok(e1 instanceof Object, "e is an object.");
        st.same(e1.top, v[0], "e.top is set to v[0]");
        st.same(e1.bottom, v[1], "e.bottom is set to v[1]");
        st.same(v[0].downlinks, [e1], "e is a member of v[0]'s downlinks.");
        st.same(v[1].uplinks, [e1], "e is a member of v[1]'s uplinks.");
        st.equal(e1.id, 0, "e1 has the default id '0'.");
        var e2 = v[0].connectTo(v[2], 5);
        st.equal(e2.id, 5, "e2 has been optionally assigned the id '5'.");
        st.end();
    });
    t.test("Vertex.prototype.directlyAbove", function (st) {
        var v = setup();
        v[2].connectTo(v[0], 0);
        v[4].connectTo(v[0], 1);
        var da = v[0].directlyAbove();
        st.same(da, [v[2], v[4]], "v[2] and v[4] are directly above v[0].");
        st.end();
    });
    t.test("Vertex.prototype.directlyBelow", function (st) {
        var v = setup();
        v[0].connectTo(v[2], 0);
        v[0].connectTo(v[4], 1);
        var db = v[0].directlyBelow();
        st.same(db, [v[2], v[4]], "v[2] and v[4] are directly below v[0].");
        st.end();
    });
    t.test("Vertex.prototype.above", function (st) {
        var v = setup();
        v[0].connectTo(v[1]);
        v[1].connectTo(v[3]);
        v[2].connectTo(v[3]);
        var a = v[3].above();
        st.same(a, [v[1], v[0], v[2]], "v[0], v[1] and v[2] are directly above v[3].");
        st.end();
    });
    t.test("Vertex.prototype.below", function (st) {
        var v = setup();
        v[0].connectTo(v[1]);
        v[0].connectTo(v[2]);
        v[1].connectTo(v[3]);
        var a = v[0].below();
        st.same(a, [v[1], v[3], v[2]], "v[1], v[2] and v[3] are directly below v[0].");
        st.end();
    });
    t.test("Vertex.prototype.isAbove", function (st) {
        var v = setupAndConnect();
        st.ok(v[1].isAbove(v[0]), "v[1] is above v[0].");
        st.ok(v[4].isAbove(v[0]), "v[4] is above v[0].");
        st.notOk(v[0].isAbove(v[0]), "v[0] is not above v[0].");
        st.notOk(v[2].isAbove(v[0]), "v[2] is not above v[0].");
        st.notOk(v[3].isAbove(v[0]), "v[3] is not above v[0].");
        st.end();
    });
    t.test("Vertex.prototype.isBelow", function (st) {
        var v = setupAndConnect();
        st.ok(v[2].isBelow(v[3]), "v[2] is below v[3].");
        st.ok(v[0].isBelow(v[4]), "v[0] is below v[4].");
        st.notOk(v[0].isBelow(v[3]), "v[0] is not below v[3].");
        st.notOk(v[1].isBelow(v[3]), "v[2] is not below v[3].");
        st.notOk(v[3].isBelow(v[3]), "v[3] is not below v[3].");
        st.notOk(v[4].isBelow(v[3]), "v[4] is not below v[2].");
        st.end();
    });
    t.test("Vertex.prototype.reflow", function (st) {
        var v = setupAndConnect();
        v[3].connectTo(v[0]);
        v[3].reflow();
        st.same(v[2].next, v[3], "v[2].next should be v[3].");
        st.same(v[3].previous, v[2], "v[3].previous should be v[2].");
        st.same(v[3].next, v[0], "v[3].next should be v[0].");
        st.same(v[0].previous, v[3], "v[0].previous should be v[3].");
        st.same(v[1].next, v[4], "v[1].next should be v[4].");
        st.same(v[4].previous, v[1], "v[4].previous should be v[1].");
        st.end();
    });
    t.test("Vertex.prototype.availableConnections", function (st) {
        var v = setupAndConnect();
        var a2 = v[2].availableConnections();
        st.same(a2, [
            {
                top: v[2],
                bottom: v[0],
            },
            {
                top: v[2],
                bottom: v[1],
            },
            {
                top: v[2],
                bottom: v[4],
            }
        ], "v[2] can connect to v[0], v[1] and v[4].");
        var a4 = v[4].availableConnections();
        st.same(a4, [
            {
                top: v[4],
                bottom: v[1],
            },
            {
                top: v[4],
                bottom: v[2],
            },
            {
                top: v[4],
                bottom: v[3],
            }
        ], "v[4] can connect to v[1], v[2] and v[3].");
        st.end();
    });
    t.end();
});
//# sourceMappingURL=vertex.spec.js.map