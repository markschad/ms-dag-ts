import { Edge, ProtoEdge } from "./edge";
import { Vertex } from "./vertex";
export interface TraversalCallback {
    (vertex: Vertex, index: number): void;
}
export declare class Graph {
    private _vertices;
    private _edges;
    constructor();
    readonly vertices: Vertex[];
    readonly edges: Edge[];
    addVertex(...uplinks: Vertex[]): Vertex;
    addEdge(top: Vertex, bottom: Vertex): Edge;
    availableEdges(): ProtoEdge[];
    private _traverse(v, i, cb);
    traverse(cb: TraversalCallback): void;
}
