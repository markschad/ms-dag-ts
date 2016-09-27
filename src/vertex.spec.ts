import * as test from "tape";

import { Vertex } from "./vertex";

/**
 * Creates an array of isolated vertices.
 */
const setup = (): Vertex[] => {
	const fixtures: Vertex[] = [];
	for (let i = 0; i < 5; i++) {
		fixtures[i] = new Vertex();
	}
	return fixtures;
}

/**
 * Prove that the Vertex class is a reliable entity.
 */
test("Vertex", (t) => {
	/**
	 * Proves that "new Vertex" creates a new instance of Vertex.
	 */
	t.test("new Vertex()", (st) => {
		const v0 = new Vertex();
		st.ok(v0 instanceof Vertex, "v0 is an instance of Vertex.");
		st.equal(v0.id, 0, "v0 has the default id of zero.");
		const v1 = new Vertex(5);
		st.equal(v1.id, 5, "v1 has an id of five.");
		st.end();		
	});

	/**
	 * Proves that "insertBelow()" inserts the given vertex immediately below the
	 * subject, such that the subjects "next" property is set to the given vertex and the given
	 * vertex's "previous" property is set to the subject.
	 * 
	 * Assumptions:
	 * 	- new Vertex()
	 */
	t.test("insertBelow(vertex: Vertex)", (st) => {
		const v = setup();
		v[0].insertBelow(v[1]);
		st.equal(v[0].next, v[1], "v[1] comes after v[0].");
		st.equal(v[1].previous, v[0], "v[0] comes before v[1].");
		st.end();
	});

	/**
	 * Proves that "insertAbove()" inserts the given vertex immediately above the
	 * subject, such that the subjects "previous" property is set to the given vertex and the given
	 * vertex's "next" property is set to the subject.
	 * 
	 * Assumptions:
	 * 	- new Vertex
	 */
	t.test("insertAbove(vertex: Vertex)", (st) => {
		const v = setup();
		v[0].insertAbove(v[1]);
		st.equal(v[0].previous, v[1], "v[1] comes before v[0].");
		st.equal(v[1].next, v[0], "v[0] comes after v[1].");
		st.end();
	});
	
	/**
	 * Proves that "first" returns the very first vertex in the chain.
	 * 
	 * Assumptions:
	 * 	- new Vertex()
	 * 	- insertBelow()
	 */
	t.test("first:get", (st) => {
		const v = setup();
		st.equal(v[0].first, v[0], "v[0] is the first vertex in the chain, according to v[0].");
		v[0].insertAbove(v[1]);
		st.comment("insert v[1] above v[0].");
		st.equal(v[0].first, v[1], "v[1] is now the first vertex in the chain, according to v[0].");
		v[1].insertAbove(v[2]);
		st.comment("insert v[2] above v[1].");
		st.equal(v[0].first, v[2], "v[2] is now the first vertex in the chain, according to v[0].");
		st.equal(v[1].first, v[2], "v[2] is now the first vertex in the chain, according to v[1].");
		st.end();
	});

	/**
	 * Proves that "last" returns the very last vertex in the chain.
	 * 
	 * Assumptions:
	 * 	- new Vertex()
	 * 	- insertAbove()
	 */
	t.test("last:get", (st) => {
		const v = setup();
		st.equal(v[0].last, v[0], "v[0] is the last vertex in the chain, according to v[0].");
		v[0].insertBelow(v[1]);
		st.comment("insert v[1] below v[0].");
		st.equal(v[0].last, v[1], "v[1] is now the last vertex in the chain, according to v[0].");
		v[1].insertBelow(v[2]);
		st.comment("insert v[2] below v[1].");
		st.equal(v[0].last, v[2], "v[2] is now the last vertex in the chain, according to v[0].");
		st.equal(v[1].last, v[2], "v[2] is now the last vertex in the chain, according to v[1].");
		st.end();
	});

	/**
	 * Done.
	 */
	t.end();
});
