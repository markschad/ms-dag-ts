import * as test from "tape";

import "./vertex.spec";

import { Graph } from "./graph";
import { Vertex } from "./vertex";

/**
 * Creates a Graph with the following topology:
 */
const setup = (): Graph => {
	return new Graph();
};

/**
 * Proves that the Graph class works as intended.
 * 
 * Assumptions:
 * 	- Vertex
 */
test("Graph", t => {
	/**
	 * Proves that "new Graph" creates a new instance of Graph.
	 */
	t.test("Graph.constructor", st => {
		const g = new Graph();
		st.ok(g instanceof Graph, "g is an instance of Graph");
		st.equal(g.vertices.length, 0, "g is initialised with no vertices.");
		st.equal(g.edges.length, 0, "g is initialised with no edges.");
		st.end();
	});

	/**
	 * Proves "Graph.prototype.addVertex":
	 *  - Assigns it the next available vertex id.
	 * 	- Inserts it at the top of the chain.
	 *  - Adds it to the ordered array of vertices.
	 * 	- Optionally creates an edge between the new vertex and each given vertex.
	 *  - Returns the new vertex.
	 * 
	 * Assumptions:
	 * 	- Graph.constructor
	 */
	t.test("Graph.prototype.addVertex", st => {
		const g = new Graph();
		const v0 = g.addVertex();
		st.equal(v0.id, 0, "v0 has id 0.");
		st.same(g.vertices, [ v0 ], "v0 is the only vertex in g.vertices.");
		const v1 = g.addVertex();
		st.equal(v1.id, 1, "v1 has id 1");
		st.same(v0.first, v1, "v1 is the first vertex.");
		st.same(g.vertices, [ v0, v1 ], "v0 and v1 are in g.vertices respectively.");
		const v2 = g.addVertex(v0, v1);
		st.equal(v2.id, 2, "v2 has id 2.");
		st.same(v0.first, v2, "v2 is the first vertex.");
		st.equal(v2.downlinks.length, 2, "v2 has 2 downlinking edges.");
		st.end();
	});

	/**
	 * Done.
	 */
	t.end();
});
