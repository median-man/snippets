const { WeightedGraph } = require('./weighted-graph')
const { PriorityQueue } = require('./priority-queue')

function shortestPath(graph, start, end) {
  const nodes = new PriorityQueue()
  
  const distances = {}
  const previous = {}
  graph.vertices.forEach(v => {
    distances[v] = Infinity
    previous[v] = null
  })
  distances[start] = 0

  let currentNode = start
  while (currentNode) {
    if (currentNode === end) return createPath()
    for (const edge of graph.edgesOf(currentNode)) {
      findShortestDistance(edge);
    }
    currentNode = nodes.dequeue().value
  }

  function findShortestDistance(edge) {
    const distanceFromStart = edge.weight + distances[currentNode];
    if (distanceFromStart < distances[edge.name]) {
      distances[edge.name] = distanceFromStart;
      previous[edge.name] = currentNode;
      nodes.enqueue(edge.name, distanceFromStart);
    }
  }

  function createPath() {
    const result = [end]
    let prevNode = end
    while (prevNode !== start) {
      prevNode = previous[result[result.length - 1]]
      result.push(prevNode)
    }
    return result.reverse()
  }
}

const graph = new WeightedGraph()
'ABCDEF'.split('').forEach(v => graph.addVertex(v))
'AB4, AC2, BE3, CD2, CF4, DE3, DF1, EF1'
  .split(', ')
  .map(s => s.split(''))
  .forEach(([v1, v2, weight]) => graph.addEdge(v1, v2, parseFloat(weight)))
// console.dir(graph.adjacencyList, { colors: true })

console.log(shortestPath(graph, 'A', 'E'))
// => [ 'A', 'C', 'D', 'F', 'E' ]
