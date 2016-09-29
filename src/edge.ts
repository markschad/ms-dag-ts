import { Vertex } from "./vertex";

/**
 * Represents a connection between two vertices.
 */
export interface Edge {
	/** The unique id of this edge. */
	id: number;
	/** The vertex at the top of this edge. */
	top: Vertex;
	/** The vertex at the bottom of this edge. */
	bottom: Vertex;
	/** Gets or sets the content of this edge.	 */
	content: any;
}

/**
 * Represents a possible connection between two vertices.
 */
export interface ProtoEdge {
	top: Vertex,
	bottom: Vertex
}
