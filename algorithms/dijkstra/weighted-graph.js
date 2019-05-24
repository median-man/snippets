class WeightedGraph {
  constructor() {
    this.adjacencyList = {}
  }

  addVertex(name) {
    if (!this.adjacencyList[name]) {
      this.adjacencyList[name] = new Vertex()
    }
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push(new Edge(v2, weight))
    this.adjacencyList[v2].push(new Edge(v1, weight))
  }

  get vertices() {
    return Object.keys(this.adjacencyList)
  }

  edgesOf(vertex) {
    return this.adjacencyList[vertex]
  }
}

class Vertex extends Array {}

class Edge {
  constructor(name, weight) {
    this.name = name
    this.weight = weight
  }
}

module.exports = { WeightedGraph }
