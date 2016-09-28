import * as test from "tape";

import { Vertex } from "./vertex";

/**
 * Creates an array of isolated vertices.
 */
const setup = (): Vertex[] => {
	const fixtures: Vertex[] = [];
	let prev = null;
	for (let i = 0; i < 5; i++) {
		fixtures[i] = new Vertex();
	}
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
	 * Proves "Vertex.prototype.insertAbove":
	 *  - Sets the given vertex's "previous" property to be the subject's "previous" property.
	 *  - Sets the given vertex's "next" property to be the subject.
	 *  - Sets the subject's "previous" property to be the given vertex.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 */
	t.test("Vertex.prototype.insertAbove", st => {
		const v = setup();
		v[0].insertAbove(v[1]);
		st.equal(v[0].previous, v[1], "v[1] comes before v[0].");
		st.equal(v[1].next, v[0], "v[0] comes after v[1].");
		st.end();
	});

	/**
	 * Proves "Vertex.prototype.insertBelow":
	 *  - Sets the given vertex's "next" property to be the subject's "next" property.
	 *  - Sets the given vertex's "previous" property to be the subject.
	 *  - Sets the subject's "next" property to be the given vertex.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 */
	t.test("Vertex.prototype.insertBelow", st => {
		const v = setup();
		v[0].insertBelow(v[1]);
		st.equal(v[0].next, v[1], "v[1] comes after v[0].");
		st.equal(v[1].previous, v[0], "v[0] comes before v[1].");
		st.end();
	});
	
	/**
	 * Proves "Vertex.protptype.first:get":
	 *	- Returns the first vertex in the chain.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.perototype.insertAbove
	 */
	t.test("Vertex.prototype.first: get", st => {
		const v = setup();
		st.equal(v[0].first, v[0], "v[0] is the first vertex in the chain, according to v[0].");
		v[0].insertAbove(v[1]);
		st.equal(v[0].first, v[1], "v[1] is now the first vertex in the chain, according to v[0].");
		v[1].insertAbove(v[2]);
		st.equal(v[0].first, v[2], "v[2] is now the first vertex in the chain, according to v[0].");
		st.equal(v[1].first, v[2], "v[2] is now the first vertex in the chain, according to v[1].");
		st.end();
	});

	/**
	 * Proves "Vertex.protptype.last:get":
	 *	- Returns the last vertex in the chain.
	 * 
	 * Assumptions:
	 * 	- Vertex.constructor
	 * 	- Vertex.prototype.insertBelow
	 */
	t.test("Vertex.prototype.last: get", st => {
		const v = setup();
		st.equal(v[0].last, v[0], "v[0] is the last vertex in the chain, according to v[0].");
		v[0].insertBelow(v[1]);
		st.equal(v[0].last, v[1], "v[1] is now the last vertex in the chain, according to v[0].");
		v[1].insertBelow(v[2]);
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
	 * 	- Vertex.prototype.insertBelow
	 */
	t.test("Vertex.prototype.isAbove", st => {
		const v = setup();
		v[0].insertBelow(v[1]);
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
	 * 	- Vertex.prototype.insertAbove
	 */
	t.test("Vertex.prototype.isBelow", st => {
		const v = setup();
		v[0].insertAbove(v[1]);
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
	 * 	- The edge is included in the subjects array of edges.
	 *	- The edge is included in the given vertex's array of edges.
	 */
	t.test("Vertex.prototype.connect", st => {
		// TODO: Implement this.
		// const v = setup();
		// const e = v[0].connectTo(v[1]);
		st.end();
	});

	/**
	 * Done.
	 */
	//t.end();
});
