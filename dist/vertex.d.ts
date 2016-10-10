import { Edge, ProtoEdge } from "./edge";
/**
 * Represents a vertex within a directed-acyclic-graph.
 */
export declare class Vertex {
    private _id;
    private _next;
    private _previous;
    private _uplinks;
    private _downlinks;
    /**
     * Joins the given vertices such that the second is the first's next.  This method does not
     * repair the structure of the chain.
     */
    static join(v1: Vertex, v2: Vertex): void;
    /**
     * Unjoins the given vertex such that it has no next or previous.  This method does not repair
     * the structure of the chain.
     */
    static unjoin(vertex: Vertex): void;
    /**
     * Instantiates a new instance of Vertex.
     */
    constructor(id?: number);
    /** Gets or sets the content of this vertex. */
    content: any;
    /** Gets the unique id of this Vertex. */
    readonly id: number;
    /** Gets the collection of uplinks. */
    readonly uplinks: Edge[];
    /** Gets the collection of downlinks. */
    readonly downlinks: Edge[];
    /** Gets the first vertex in the chain. */
    readonly first: Vertex;
    /** Gets an array of vertices which are before this vertex in the chain. */
    readonly before: Vertex[];
    /** Gets the previous vertex in the chain. */
    readonly previous: Vertex;
    /** Gets the next vertex in the chain. */
    readonly next: Vertex;
    /**
     * Gets an array of vertices which are after this vertex in the chain.
     */
    readonly after: Vertex[];
    /** Gets the last vertex in the chain. */
    readonly last: Vertex;
    /**
     * Removes this vertex from the chain and returns it.
     */
    remove(): Vertex;
    /**
     * Inserts the given vertex directly before this vertex.
     * @param {Vertex} vertex The vertex to insert.
     */
    insertBefore(vertex: Vertex): Vertex;
    /**
     * Inserts the given vertex directly after this one.
     * @param {Vertex} vertex The vertex to insert.
     */
    insertAfter(vertex: Vertex): Vertex;
    /**
     * Returns true if this vertex is before the given vertex.
     * @param {Vertex} vertex The vertex to check.
     */
    isBefore(vertex: Vertex): boolean;
    /**
     * Returns true if this vertex is after the given vertex.
     * @param {Vertex} vertex The vertex to check.
     */
    isAfter(vertex: Vertex): boolean;
    /**
     * Returns an array of vertices which connect directly to this vertex.
     */
    directlyAbove(): Vertex[];
    /**
     * Returns an array of vertices which connect directly or indirectly to this vertex.
     */
    above(): Vertex[];
    /**
     * Returns true if the given vertex is a direct or indirect uplink of this vertex.
     */
    isAbove(vertex: Vertex): boolean;
    /**
     * Returns an array of vertices to which this vertex direectly connects.
     */
    directlyBelow(): Vertex[];
    /**
     * Returns an array of vertices to which this vertex connects directly or indirectly.
     */
    below(): Vertex[];
    /**
     * Returns true if the given vertex is a direct or indirect downlink of this vertex.
     */
    isBelow(vertex: Vertex): boolean;
    /**
     * Connects this vertex to the given vertex, returning a new instance of edge which defines the
     * relationship between the two vertices.
     */
    connectTo(vertex: Vertex, id?: number): Edge;
    /**
     * If necessary, moves this vertex immediately before its highest priority downlink and returns
     * it.  Triggers this method for every uplink of this vertex.
     */
    reflow(): this;
    /**
     * Returns an array of possible edges that could be created without creating a cyclical
     * connection.
     */
    availableConnections(): ProtoEdge[];
    /**
     * Produces a string representation of this vertex.
     */
    toString(): String;
}
