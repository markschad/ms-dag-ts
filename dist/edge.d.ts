import { Vertex } from "./vertex";
export interface Edge {
    id: number;
    top: Vertex;
    bottom: Vertex;
    content: any;
}
export interface ProtoEdge {
    top: Vertex;
    bottom: Vertex;
}
