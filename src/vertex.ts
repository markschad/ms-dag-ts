import { Edge } from "./edge";

export class Vertex {

	private _id: number;

	private _next: Vertex = null;
	private _previous: Vertex = null;

	private _edges: Edge[];

	/**
	 * Instantiates a new instance of Vertex.
	 */
	constructor(id: number = 0) {	
		this._id = id;
	}

	/** Gets the unique id of this Vertex. */
	get id(): number {
		return this._id;
	}

	/** Gets the first vertex in the chain. */
	get first(): Vertex { 
		return this._previous ? this._previous.first : this; 
	}

	/** Gets the next vertex in the chain. */
	get next(): Vertex {
		return this._next; 
	}

	/** Gets the previous vertex in the chain. */
	get previous(): Vertex { 
		return this._previous; 
	}

	/** Gets the last vertex in the chain. */
	get last(): Vertex {
		return this._next ? this._next.last : this;
	}

	/**
	 * Inserts the given vertex directly below this vertex.
	 * @param {Vertex} vertex The vertex to insert.
	 */
	insertBelow(vertex: Vertex) {
		const next = this._next;
		this._next = vertex;
		vertex._next = next;
		vertex._previous = this;
	}

	/**
	 * Inserts the given vertex directly above this vertex.
	 * @param {Vertex} vertex The vertex to insert.
	 */
	insertAbove(vertex: Vertex) {
		const previous = this._previous;
		this._previous = vertex;
		vertex._previous = previous;
		vertex._next = this;
	}
	
}
