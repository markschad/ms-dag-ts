ms-dag-ts
---------
> Just a directed acyclic graph implementation.

[![Build Status](https://travis-ci.org/markschad/ms-dag-ts.svg?branch=master)](https://travis-ci.org/markschad/ms-dag-ts)

Directed Acyclic Graph
======================

Graph
-----

`new Graph()` 
> Instantiates a new instance of graph.

`addVertex(...uplinks: Vertex[]): Vertex`
> Adds a new `Vertex` to the graph, optionally uplinking it to the given vertices.

`addEdge(top: Vertex, bottom: Vertex): Edge`
> Adds a new `Edge` to the graph, creating a downlink from `top` to `bottom`.

`availableEdges(): ProtoEdge[]`
> Returns an array `ProtoEdge` objects which describe each `Edge` that _could_ be connected without breaking the graph.

`traverse(cb: TraversalCallback): void`
> Traverses the graph in order, calling `cb` at each `Vertex`.

Vertex
------

`new Vertex(id?: number)`
> Instantiates a new instance of `Vertex`, optionally assigning it `id`.

`id+get: number`
> Gets the id of this `Vertex`.

`uplinks+get: Edge[]`
> Gets the array of `Edge` objects which describe every connection to this `Vertex`.

`downlinks+get: Edge[]`
> Gets the array of `Edge` objects which describe every connection from this `Vertex`.

`first+get: Vertex`
> Gets the first `Vertex` in the chain.

`before+get: Vertex[]`
> Gets an array of `Vertex` objects which includes only the vertices which appear before this `Vertex` in the chain.

`previous+get: Vertex`
> Gets the `Vertex` which appears immediately before this `Vertex` in the chain.

`next+get: Vertex`
> Gets the `Vertex` which appears immmediately after this `Vertex` in the chain.

`after+get: Vertex`
> Gets an array of `Vertex` objects which include only the vertices which appear after this `Vertex` in the chain.

`last+get: Vertex`
> Gets the last `Vertex` in the chain.

`remove(): Vertex`
> Removes this `Vertex` from the chain, stitching together the previous and next vertices and returning this `Vertex`.

`insertBefore(vertex: Vertex): Vertex`
> Inserts the given `Vertex` immediately before this `Vertex` in the chain.

`insertAfter(vertex: Vertex): Vertex`
> Insert the given `Vertex` immediately after this `Vertex` in the chain.

`isBefore(vertex: Vertex): boolean`
> Returns a boolean value indicating if this `Vertex` is before the given `Vertex` in the chain.

`isAfter(vertex: Vertex): boolean`
> Returns a boolean value indicating if this `Vertex` is after the given `Vertex` in the chain.

`above(): Vertex[]`
> Returns an array of `Vertex` objects for which this `Vertex` is a direct or indirect downlink.

`directlyAbove(): Vertex[]`
> Returns an array of `Vertex` objects for which this `Vertex` is a direct downlink.

`isAbove(vertex: Vertex): boolean`
> Returns a boolean value indicating if this `Vertex` is a direct or indirect downlink of the given `Vertex`.

`below(): Vertex[]`
> Returns an array of `Vertex` objects for which this `Vertex` is a direct or indirect uplink.

`directlyBelow(): Vertex[]`
> Returns an array of `Vertex` objects for which this `Vertex` is a direct uplink.

`isBelow(vertex: Vertex): boolean`
> Returns a boolean value indicating if this `Vertex` is a direct or indirect uplink of the given `Vertex`.

`connectTo(vertex: Vertex, id?: number): Edge`
> Connects this `Vertex` to the given `Vertex` returning a new instance of `Edge` which defines the relationship and optionally assigning it the given id.

`reflow(): void`
> Moves this `Vertex` up the chain such that it is above all of its downlinks.  Calls `reflow()` for each uplink.

`availableConnections(): ProtoEdge[]`
> Returns an array of `ProtoEdge` objects which describe every possible connection which could be made without causing a cyclic flow.
