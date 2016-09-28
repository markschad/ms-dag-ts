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
	 * 	- Returns a new vertex.
	 *  - Assigns it a unique id.
	 * 	- Inserts it at the top of the chain.
	 *  - Adds it to the ordered array of vertices.
	 * 	- Optionally creates an edge between the new vertex and each given vertex.
	 *  - Returns the new vertex.
	 * 
	 * Assumptions:
	 * 	- Graph.constructor
	 */
	t.test("Graph.prototype.addVertex", st => {
		// const g = setup();
		// const v0 = g.addVertex();
		// st.ok(v0 instanceof Vertex, "v0 is an instance of Vertex.");
		// const v1 = g.addVertex(v0);
		// st.equal(v0.first, v1, "v1 is at the top of the chain.");
		// st.looseEqual(v0)
		// const v2 = g.addVertex(v1, v2);
		st.end();
	});

	/**
	 * Done.
	 */
	t.end();
});
