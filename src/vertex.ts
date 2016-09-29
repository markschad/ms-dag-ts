import { Edge, ProtoEdge } from "./edge";

/**
 * Represents a vertex within a directed-acyclic-graph.
 */
export class Vertex {

	private _id: number;

	private _next: Vertex = null;
	private _previous: Vertex = null;

	private _uplinks: Edge[] = [];
	private _downlinks: Edge[] = [];

	/**
	 * Joins the given vertices such that the second is the first's next.  This method does not
	 * repair the structure of the chain.
	 */
	static join(v1: Vertex, v2: Vertex): void {
		v1 && (v1._next = v2);
		v2 && (v2._previous = v1);
	}

	/**
	 * Unjoins the given vertex such that it has no next or previous.  This method does not repair
	 * the structure of the chain.
	 */
	static unjoin(vertex: Vertex): void {
		vertex._next = null;
		vertex._previous = null;
	}

	/**
	 * Instantiates a new instance of Vertex.
	 */
	constructor(id: number = 0) {	
		this._id = id;
	}

	/** Gets or sets the content of this vertex. */
	public content: any;

	/** Gets the unique id of this Vertex. */
	get id(): number {
		return this._id;
	}

	/** Gets the collection of uplinks. */
	get uplinks(): Edge[] { return this._uplinks; }

	/** Gets the collection of downlinks. */
	get downlinks(): Edge[] { return this._downlinks; }

	/** Gets the first vertex in the chain. */
	get first(): Vertex { 
		return this._previous ? this._previous.first : this; 
	}

	/** Gets an array of vertices which are before this vertex in the chain. */
	get before(): Vertex[] {
		if (this._previous) {
			return [ this._previous, ...this._previous.before ];
		}
		else {
			return [];
		}
	}

	/** Gets the previous vertex in the chain. */
	get previous(): Vertex { 
		return this._previous; 
	}

	/** Gets the next vertex in the chain. */
	get next(): Vertex {
		return this._next; 
	}

	/**
	 * Gets an array of vertices which are after this vertex in the chain.
	 */
	get after(): Vertex[] {
		if (this._next) {
			return [ this._next, ...this._next.after ];
		}
		else {
			return [];
		}
	}

	/** Gets the last vertex in the chain. */
	get last(): Vertex {
		return this._next ? this._next.last : this;
	}

	/**
	 * Removes this vertex from the chain and returns it.
	 */
	remove(): Vertex {
		Vertex.join(this._previous, this._next);
		Vertex.unjoin(this);
		return this;
	}

	/**
	 * Inserts the given vertex directly before this vertex.
	 * @param {Vertex} vertex The vertex to insert.
	 */
	insertBefore(vertex: Vertex): Vertex {
		const previous = this._previous;
		Vertex.join(vertex.previous, vertex.next);
		Vertex.join(previous, vertex);
		Vertex.join(vertex, this);
		return vertex;
	}

	/**
	 * Inserts the given vertex directly after this one.
	 * @param {Vertex} vertex The vertex to insert.
	 */
	insertAfter(vertex: Vertex): Vertex {
		const next = this._next;
		Vertex.join(vertex.previous, vertex.next);
		Vertex.join(this, vertex);
		Vertex.join(vertex, next);
		return vertex;
	}

	/**
	 * Returns true if this vertex is above the given vertex.
	 * @param {Vertex} vertex The vertex to check.
	 */
	isAbove(vertex: Vertex): boolean {
		return this._next && (this._next === vertex || this._next.isAbove(vertex));
	}

	/**
	 * Returns true if this vertex is below the given vertex.
	 * @param {Vertex} vertex The vertex to check.
	 */
	isBelow(vertex: Vertex): boolean {
		return this._previous && (this._previous === vertex || this._previous.isAbove(vertex)); 
	}

	/**
	 * Returns an array of vertices which connect directly to this vertex.
	 */
	directlyAbove(): Vertex[] {
		return this._uplinks.map(e => { return e.top;	});
	}

	/**
	 * Returns an array of vertices which connect directly or indirectly to this vertex.
	 */
	above(): Vertex[] {
		return this.directlyAbove().reduce((prev, cur) => {
			return [ ...prev, cur, ...cur.directlyAbove() ];
		}, []);
	}

	/**
	 * Returns an array of vertices to which this vertex direectly connects.
	 */
	directlyBelow(): Vertex[] {
		return this._downlinks.map(e => {	return e.bottom; });
	}

	/**
	 * Returns an array of vertices to which this vertex connects directly or indirectly.
	 */
	below(): Vertex[] {
		return this.directlyBelow().reduce((prev, cur) => {
			return [ ...prev, cur, ...cur.directlyBelow() ];
		}, []);
	}

	/**
	 * Connects this vertex to the given vertex, returning a new instance of edge which defines the
	 * relationship between the two vertices.
	 */
	connectTo(vertex: Vertex, id: number = 0): Edge {
		for (let e of this._downlinks) {
			if (e.bottom === vertex) {
				throw new Error("The vertices are already connected.");
			}
		}
		const e: Edge = {
			id: id,
			top: this,
			bottom: vertex,
			content: null
		};
		this._downlinks.push(e);
		vertex._uplinks.push(e);
		return e;
	}

	/**
	 * If necessary, moves this vertex immediately before its highest priority downlink and returns
	 * it.  Triggers this method for every uplink of this vertex.
	 */
	reflow() {
		for (let e of this._downlinks) {
			if (e.bottom.isAbove(this)) {
				e.bottom.insertBefore(this);
			}
		}
		for (let v of this.above()) {
			v.reflow();
		}
		return this;
	}

	/**
	 * 
	 */
	availableConnections(): ProtoEdge[] {
		// TODO: Implement this.
		return [];
	}

	/**
	 * Produces a string representation of this vertex.
	 */
	toString(): String {
		let a=0;
		return `Vertex [$this.id]`;
	}
	
}
