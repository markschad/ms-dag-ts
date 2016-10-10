import { Edge, ProtoEdge } from "./edge";
import { Vertex } from "./vertex";
/**
 * Function signature for traversing the graph.
 */
export interface TraversalCallback {
    (vertex: Vertex, index: number): void;
}
/**
 * Represents a directed-acyclic-graph.
 */
export declare class Graph {
    /** Array of vertices ordered by Vertex.prototype.id. */
    private _vertices;
    /** Array of edges ordered by Edge.id. */
    private _edges;
    /**
     * Instantiates a new instance of Graph.
     */
    constructor();
    /** Gets the array of vertices contained in this graph. */
    readonly vertices: Vertex[];
    /** Gets the array of edges contained in the graph. */
    readonly edges: Edge[];
    /**
     * Adds a new vertex to the graph.
     */
    addVertex(...uplinks: Vertex[]): Vertex;
    /**
     * Adds a new edge to the graph.
     */
    addEdge(top: Vertex, bottom: Vertex): Edge;
    /**
     * Returns an array of every available edge.
     */
    availableEdges(): ProtoEdge[];
    /**
     * Traverses forward from the given vertex, executing the callback at each vertex.
     */
    private _traverse(v, i, cb);
    /**
     * Traverses the graph in order, calling callback at each vertex.
     */
    traverse(cb: TraversalCallback): void;
}
