import { Edge, ProtoEdge } from "./edge";
import { Vertex } from "./vertex";

/**
 * Function signature for traversing the graph.
 */
export interface TraversalCallback { (vertex: Vertex, index: number): void; }

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
	public get vertices(): Vertex[] { return this._vertices; }

	/** Gets the array of edges contained in the graph. */
	public get edges(): Edge[] { return this._edges; }

	/**
	 * Adds a new vertex to the graph.
	 */
	addVertex(...uplinks: Vertex[]): Vertex {
		const v = new Vertex(this._vertices.length);
		this._vertices.length && this._vertices[0].last.insertAfter(v);
		this._vertices.push(v);
		for (let l of uplinks) {
			this._edges.push(l.connectTo(v, this._edges.length));
		}
		return v;
	}

	/**
	 * Adds a new edge to the graph.
	 */
	addEdge(top: Vertex, bottom: Vertex): Edge {
		const proto: ProtoEdge = { top: top, bottom: bottom };
		const cb = e => e.top === proto.top && e.bottom === proto.bottom;
		if (!top.availableConnections().some(cb)) {
			throw new Error("Unable to create edge.  Circular connection detected!");
		}
		const e = top.connectTo(bottom, this._edges.length);
		this._edges.push(e);
		return e;
	}

	/**
	 * Returns an array of every available edge.
	 */
	availableEdges(): ProtoEdge[] {
		return this._vertices.reduce((prev: ProtoEdge[], cur: Vertex) => {			
			return [ ...prev, ...cur.availableConnections() ];
		}, []);
	}

	/**
	 * Traverses forward from the given vertex, executing the callback at each vertex.
	 */
	private _traverse(v: Vertex, i: number, cb: TraversalCallback): void {
		!cb(v, i) && v.next && this._traverse(v.next, i+1, cb);
	}

	/**
	 * Traverses the graph in order, calling callback at each vertex.
	 */
	public traverse(cb: TraversalCallback) {
		if (this._vertices.length > 0) {
			this._traverse(this._vertices[0].first, 0, cb);
		}
	}

	/**
	 * Clears all vertices and edges from the graph.
	 */
	public clear() {
		this._vertices = [];
		this._edges = [];
	}

}
