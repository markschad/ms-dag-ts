import * as test from "tape";

import { Vertex } from "./vertex";

/**
 * Creates an array of isolated vertices.
 */
const setup = (): Vertex[] => {
	const fixtures: Vertex[] = [];
	let prev = null;
	for (let i = 0; i < 5; i++) {
		fixtures[i] = new Vertex(i);
	}
	return fixtures;
};

/**
 * Creates an array of vertices with the following topology:
 * 
 * 		0 --+-----------+
 * 			  |           |
 *        1           |
 *                    |
 *            2       |
 *            |       |
 *            +---3   |
 *                    |
 *                    4 
 */
const setupAndConnect = (): Vertex[] => {
	const fixtures = setup();
	fixtures[0]
		.insertAfter(fixtures[1])
		.insertAfter(fixtures[2])
		.insertAfter(fixtures[3])
		.insertAfter(fixtures[4]);
	fixtures[0].connectTo(fixtures[1]);
	fixtures[0].connectTo(fixtures[2]);
	fixtures[0].connectTo(fixtures[4]);
	fixtures[2].connectTo(fixtures[3]);
	return fixtures;
};

/**
 * Prove "Vertex".
 */
test("Vertex", t => {
	/**
	 * Proves "Vertex.constructor":
	 * 	- Returns a new instance of Vertex.
	 * 	- Assigns the given id.
	 */
	t.test("Vertex.constructor", st => {
		const v0 = new Vertex();
		st.ok(v0 instanceof Vertex, "v0 is an instance of Vertex.");
		st.equal(v0.id, 0, "v0 has the default id of zero.");
		const v1 = new Vertex(5);
		st.equal(v1.id, 5, "v1 has an id of five.");
		st.end();
	});

	/**
	 * Proves "Vertex.join":
	 * 	- Sets the next property of v1 to v2.
	 * 	- Sets the "previous" property of v2 to v2.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 */
	t.test("Vertex.join", st => {
		const v = setup();
		Vertex.join(v[0], v[1]);
		st.same(v[0].next, v[1], "v[0].next is v[1].");
		st.same(v[1].previous, v[0], "v[1].previous is v[0]");
		Vertex.join(null, v[0]);
		st.same(v[0].previous, null, "v[0].previous is null.");
		Vertex.join(v[1], null);
		st.same(v[1].next, null, "v[1].next is null.");
		st.end();
	});

	/**
	 * Proves "Vertex.unjoin":
	 * 	- Sets the "next" and "previous" property of the given vertex to null.
	 * 
	 * Assumptions:
	 * 	-	Vertex.constructor
	 * 	- Vertex.join
	 */
	t.test("Vertex.unjoin", st => {
		const v = setup();
		Vertex.join(v[0], v[1]);
		Vertex.join(v[1], v[2]);
		Vertex.unjoin(v[1]);
		st.same(v[0].next, v[1], "v[0].next is v[1]");
		st.same(v[1].previous, null, "v[1].previous is null.");
		st.same(v[1].next, null, "v[1].next is null.");
		st.end();
	});

	/**
	 * Prove "Vertex.prototype.remove":
	 * 	- Stiches subject's "next" and "previous" vertices together.
	 * 	- Sets the subject's "next" and "previous" vertices to null.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.join
	 */
	t.test("Vertex.prototype.remove", st => {
		const v = setup();
		Vertex.join(v[0], v[1]);
		Vertex.join(v[1], v[2]);
		const r = v[1].remove();
		st.same(r, v[1]);
		st.isEqual(v[1].next, null);
		st.isEqual(v[1].previous, null);
		st.same(v[0].next, v[2]);
		st.same(v[2].previous, v[0]);
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.insertBefore":
	 *  - Sets the given vertex's "previous" property to be the subject's "previous" property.
	 *  - Sets the given vertex's "next" property to be the subject.
	 *  - Sets the subject's "previous" property to be the given vertex.
	 * 	- Returns the given vertex.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 */
	t.test("Vertex.prototype.insertBefore", st => {
		const v = setup();
		const g = v[0].insertBefore(v[1]);
		st.equal(v[0].previous, v[1], "v[1] comes before v[0].");
		st.equal(v[1].next, v[0], "v[0] comes after v[1].");
		st.same(g, v[1]);
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.insertAfter": 
	 *  - Sets the given vertex's "next" property to be the subject's "next" property.
	 *  - Sets the given vertex's "previous" property to be the subject.
	 *  - Sets the subject's "next" property to be the given vertex.
	 * 	- Returns the given vertex.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 */
	t.test("Vertex.prototype.insertAfter", st => {
		const v = setup();
		const g = v[0].insertAfter(v[1]);
		st.equal(v[0].next, v[1], "v[1] comes after v[0].");
		st.equal(v[1].previous, v[0], "v[0] comes before v[1].");
		st.equal(g, v[1]);
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.before+get":
	 * 	- Returns an array of vertices which come before the subject in the chain.
	 */
	t.test("Vertex.prototype.before+get", st => {
		const v = setup();
		v[2].insertBefore(v[1]);
		v[1].insertBefore(v[0]);
		const a = v[2].before;
		st.same(a, [ v[1], v[0] ]);
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.after+get":
	 * 	- Returns an array of vertices which come after the subject in the chain.
	 */
	t.test("Vertex.prototype.after+get", st => {
		const v = setup();
		v[0].insertAfter(v[1]);
		v[1].insertAfter(v[2]);
		const a = v[0].after;
		st.same(a, [ v[1], v[2] ]);
		st.end();
	});
	
	/**
	 * Proves "Vertex.protptype.first+get":
	 *	- Returns the first vertex in the chain.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.perototype.insertBefore
	 */
	t.test("Vertex.prototype.first+get", st => {
		const v = setup();
		st.equal(v[0].first, v[0], "v[0] is the first vertex in the chain, according to v[0].");
		v[0].insertBefore(v[1]);
		st.equal(v[0].first, v[1], "v[1] is now the first vertex in the chain, according to v[0].");
		v[1].insertBefore(v[2]);
		st.equal(v[0].first, v[2], "v[2] is now the first vertex in the chain, according to v[0].");
		st.equal(v[1].first, v[2], "v[2] is now the first vertex in the chain, according to v[1].");
		st.end();
	});

	/**
	 * Proves "Vertex.protptype.last+get":
	 *	- Returns the last vertex in the chain.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.insertAfter
	 */
	t.test("Vertex.prototype.last+get", st => {
		const v = setup();
		st.equal(v[0].last, v[0], "v[0] is the last vertex in the chain, according to v[0].");
		v[0].insertAfter(v[1]);
		st.equal(v[0].last, v[1], "v[1] is now the last vertex in the chain, according to v[0].");
		v[1].insertAfter(v[2]);
		st.equal(v[0].last, v[2], "v[2] is now the last vertex in the chain, according to v[0].");
		st.equal(v[1].last, v[2], "v[2] is now the last vertex in the chain, according to v[1].");
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.isAbove":
	 * 	- Returns true if the subject is above the given vertex.
	 * 	- Returns false if the subject is below or is the given vertex.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.insertAfter
	 */
	t.test("Vertex.prototype.isAbove", st => {
		const v = setup();
		v[0].insertAfter(v[1]);
		st.ok(v[0].isAbove(v[1]), "v[0] is above v[1].");
		st.notOk(v[1].isAbove(v[0]), "v[0] is not above v[1]");
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.isBelow":
	 * 	- Returns true if the subject is below the given vertex.
	 * 	- Returns false if the subject is above or is the given vertex.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.insertBefore
	 */
	t.test("Vertex.prototype.isBelow", st => {
		const v = setup();
		v[0].insertBefore(v[1]);
		st.ok(v[0].isBelow(v[1]));
		st.notOk(v[1].isBelow(v[0]));
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.connectTo":
	 * 	- Throws an error if the subject is already connected directly to the target.
	 * 	- Returns an edge.
	 * 	- The edge's "top" property is set to the subject.
	 * 	- The edge's "bottom" property is set to the given vertex.
	 * 	- The edge is included in the subjects array of dowlinks.
	 *	- The edge is included in the given vertex's array of uplinks.
	 *	- The default edge id is zero.
	 *	-	Optionally assigns an id number to the edge.
	 *
	 * Assumptions:
	 * 	- Vertex.constructor
	 */
	t.test("Vertex.prototype.connectTo", st => {
		const v = setup();
		const e1 = v[0].connectTo(v[1]);
		const throwError = function() { return v[0].connectTo(v[1]); };
		st.throws(throwError, "attempting to connect v[0] to v[1] a second time throws an error.");
		st.ok(e1 instanceof Object, "e is an object.");
		st.same(e1.top, v[0], "e.top is set to v[0]");
		st.same(e1.bottom, v[1], "e.bottom is set to v[1]");
		st.same(v[0].downlinks, [ e1 ], "e is a member of v[0]'s downlinks.");
		st.same(v[1].uplinks, [ e1 ], "e is a member of v[1]'s uplinks.");
		st.equal(e1.id, 0, "e1 has the default id '0'.");
		const e2 = v[0].connectTo(v[2], 5);
		st.equal(e2.id, 5, "e2 has been optionally assigned the id '5'.")
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.directlyAbove"
	 * 	- Returns an array of vertices which include only the vertices which are direct uplinks of
	 * 			the subject.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.connectTo
	 */
	t.test("Vertex.prototype.directlyAbove", st => {
		const v = setup();
		v[2].connectTo(v[0], 0);
		v[4].connectTo(v[0], 1);
		const da = v[0].directlyAbove();
		st.same(da, [ v[2], v[4] ], "v[2] and v[4] are directly above v[0].");
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.directlyBelow"
	 * 	- Returns an array of vertices which include only the vertices which are direct downlinks of
	 * 			the subject.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.connectTo
	 */
	t.test("Vertex.prototype.directlyBelow", st => {
		const v = setup();
		v[0].connectTo(v[2], 0);
		v[0].connectTo(v[4], 1);
		const db = v[0].directlyBelow();
		st.same(db, [ v[2], v[4] ], "v[2] and v[4] are directly below v[0].");
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.above"
	 * 	- Returns an array of vertices which connect directly or indirectly to the subject.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.connectTo
	 */
	t.test("Vertex.prototype.above", st => {
		const v = setup();
		v[0].connectTo(v[1]);
		v[1].connectTo(v[3]);
		v[2].connectTo(v[3]);
		const a = v[3].above();
		st.same(a, [ v[1], v[0], v[2] ], "v[0], v[1] and v[2] are directly above v[3].");
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.below"
	 * 	- Returns an array of vertices to which the subject connects directly or indirectly.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.connectTo
	 */
	t.test("Vertex.prototype.below", st => {
		const v = setup();
		v[0].connectTo(v[1]);
		v[0].connectTo(v[2]);
		v[1].connectTo(v[3]);
		const a = v[0].below();
		st.same(a, [ v[1], v[3], v[2] ], "v[1], v[2] and v[3] are directly below v[0].");
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.reflow":
	 * 	- Moves the subject in the chain directly above its highest downlink.
	 * 	- Returns the subject.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.insertBefore
	 */
	t.test("Vertex.prototype.reflow", st => {
		const v = setup();
		v[0]
			.insertAfter(v[1])
			.insertAfter(v[2])
			.insertAfter(v[3])
			.insertAfter(v[4]);
		v[2].connectTo(v[3]);
		v[3].connectTo(v[0]);
		v[3].reflow();
		st.same(v[2].next, v[3], "v[2].next should be v[3].")
		st.same(v[3].previous, v[2], "v[3].previous should be v[2].");
		st.same(v[3].next, v[0], "v[3].next should be v[0].");
		st.same(v[0].previous, v[3], "v[0].previous should be v[3].");
		st.same(v[1].next, v[4], "v[1].next should be v[4].");
		st.same(v[4].previous, v[1], "v[4].previous should be v[1].");
		st.end();//
	});

	/**
	 * Prove "Vertex.prototype.availableConnections":
	 * 	- Returns an array prototypical edges which could be created without creating a cyclic
	 * 			connection.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.connectTo
	 */
	t.test("Vertex.prototype.availableConnections", st => {
		// TODO: implement.
		// const v = setupAndConnect();
		// const a = v[2].availableConnections();
		// st.same(a, [ 
		// 	{
		// 		top: v[2],
		// 		bottom: v[0],
		// 	},
		// 	{
		// 		top: v[2],
		// 		bottom: v[1],
		// 	},
		// 	{
		// 		top: v[2],
		// 		bottom: v[4],
		// 	}
		// ]);
		st.end();
	});

	/**
	 * Done.
	 */
	t.end();
});
