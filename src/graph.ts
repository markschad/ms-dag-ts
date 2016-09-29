import * as _ from "lodash";

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

	/** Gets the array of vertices contained in this graph. */
	get vertices(): Vertex[] { return this._vertices; }

	/** Gets the array of edges contained in the graph. */
	get edges(): Edge[] { return this._edges; }

	/**
	 * Adds a new vertex to the graph.
	 */
	addVertex(...downlinks: Vertex[]): Vertex {
		const v = new Vertex(this._vertices.length);
		this._vertices.length && this._vertices[0].first.insertBefore(v);
		this._vertices.push(v);
		for (let c of downlinks) {
			this._edges.push(v.connectTo(c, this._edges.length));
		}
		return v;
	}

}
