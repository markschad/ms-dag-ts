import { Edge } from "./edge";
import { Vertex } from "./vertex";

/**
 * Represents a directed-acyclic-graph.
 */
export class Graph {

	/** Array of vertices ordered by Vertex.prototype.id. */
	private _vertices: Vertex[];
	/** Array of edges ordered by Edge.id. */
	private _edges: Edge[];

	/**
	 * Instantiates a new instance of Graph.
	 */
	constructor() {
		this._vertices = [];
		this._edges = [];
	}

	/** Gets the ordered array of vertices contained in this graph. */
	get vertices(): Vertex[] { return this._vertices; }

	/** Gets the ordered array of edges contained in the graph. */
	get edges(): Edge[] { return this._edges; }

}
