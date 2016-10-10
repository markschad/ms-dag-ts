import * as test from "tape";

import "./vertex.spec";

import { Graph, } from "./graph";
import { Vertex } from "./vertex";

/**
 * Creates a Graph with the following topology:
 */
const setup = (): Graph => {
	return new Graph();
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
const setupAndConnect = (): Graph => {
	const g = new Graph();
	const v0 = g.addVertex();
	const v1 = g.addVertex(v0);
	const v2 = g.addVertex();
	const v3 = g.addVertex(v2);
	const v4 = g.addVertex(v0);
	return g;
}

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
	t.test("Graph.prototype.addVertex", st => {
		const g = new Graph();
		const v0 = g.addVertex();
		st.equal(v0.id, 0, "v0 has id 0.");
		st.same(g.vertices, [ v0 ], "v0 is the only vertex in g.vertices.");
		const v1 = g.addVertex();
		st.equal(v1.id, 1, "v1 has id 1");
		st.same(v0.last, v1, "v1 is the last vertex.");
		st.same(g.vertices, [ v0, v1 ], "v0 and v1 are in g.vertices respectively.");
		const v2 = g.addVertex(v0, v1);
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
	t.test("Graph.prototype.addEdge", st => {
		const g = setupAndConnect();
		const throwError = () => { g.addEdge(g.vertices[4], g.vertices[0]); }
		st.throws(throwError, "attempting to connect v[4] to v[0] throws an error.");
		const e = g.addEdge(g.vertices[3], g.vertices[0]);
		st.equal(e.id, 3, "assigns the new edge an id of 3.");
		st.same(e.top, g.vertices[3], "sets top to v[3].");
		st.same(e.bottom, g.vertices[0], "sets bottom to v[0].");
		st.end();
	});

	/**
	 * Done.
	 */
	t.end();
});
