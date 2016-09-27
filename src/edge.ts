import { Vertex } from "./vertex";

/**
 * Represents a connection between two vertices.
 */
export interface Edge {
	id: number;
	top: Vertex;
	bottom: Vertex;
	content: any;
}
