class Graph {
  constructor() {
    this.adjacencyList = {}
  }

  addVertex(name) {
    this.adjacencyList[name] = this.adjacencyList[name] || []
  }

  addEdge(vertex1, vertex2) {
    const doesNotHaveAdjacency = (a, b) =>
      this.adjacencyList[a].indexOf(b) === -1

    if (doesNotHaveAdjacency(vertex1, vertex2)) {
      this.adjacencyList[vertex1].push(vertex2)
    }
    if (doesNotHaveAdjacency(vertex2, vertex1)) {
      this.adjacencyList[vertex2].push(vertex1)
    }
  }

  removeEdge(vertex1, vertex2) {
    this._removeAdjacency(vertex1, vertex2)
    this._removeAdjacency(vertex2, vertex1)
  }

  _removeAdjacency(vertex, adjacency) {
    this.adjacencyList[vertex] = this.adjacencyList[vertex].filter(
      a => a !== adjacency
    )
  }

  removeVertex(name) {
    delete this.adjacencyList[name]
    for (const vertex in this.adjacencyList) {
      this._removeAdjacency(vertex, name)
    }
  }

  dfTraverse(startVertex) {
    const toVisitStack = [startVertex]
    const result = []
    const visited = {}
    let current
    while (toVisitStack.length) {
      current = toVisitStack.pop()
      if (!visited[current]) {
        visited[current] = true
        result.push(current)
        toVisitStack.push(...this.adjacencyList[current])
      }
    }
    return result
  }

  bfTraverse(startVertex) {
    const result = []
    const visited = {}

    const isNotVisited = node => !visited[node]

    const visitNode = node => {
      result.push(node)
      visited[node] = true
    }

    const childrenOfNodes = nodes =>
      nodes.reduce((acc, node) => acc.concat(this.adjacencyList[node]), [])

    const traverse = nodes => {
      if (!nodes.length) return
      const unvisited = nodes.filter(isNotVisited)
      unvisited.forEach(visitNode)
      traverse(childrenOfNodes(unvisited))
    }
    traverse([startVertex])
    return result
  }
}
/* 
  Run with --test argument to run tests
*/
if (process.argv.indexOf('--test') !== -1) {
  const colors = (function createColors() {
    const DEFAULT_COLOR = 39

    const makeColor = (startCode, endCode) => s =>
      `\x1b[${startCode}m${s}\x1b[${endCode}m`

    return {
      green: makeColor(32, DEFAULT_COLOR),
      red: makeColor(31, DEFAULT_COLOR)
    }
  })()

  const symbols = {
    heavyCheckMark: '\u2714',
    heavyBallotX: '\u2718'
  }
  console.log('\nGraph:')
  console.log('------')
  addVertexTests()
  addEdgeTests()
  removeEdgeTests()
  removeVertexTests()
  dfTraverseTests()
  bfTraverseTests()

  function runTest(description, test) {
    try {
      test()
      console.log(colors.green(`  ${symbols.heavyCheckMark} ${description}`))
    } catch (err) {
      console.log(colors.red(`  ${symbols.heavyBallotX} ${description}`))
      console.log('\n', err.stack)
    }
  }

  function vertexIsNotAdjacentTo(graph, vertex, adjacentVertex) {
    console.assert(
      graph.adjacencyList[vertex].indexOf(adjacentVertex) === -1,
      `Expected graph.adjacencyList[${vertex}] to not include "${adjacentVertex}"`
    )
  }

  function addVertexTests() {
    console.log('addVertex')

    let graph
    const setup = () => {
      graph = new Graph()
      graph.addVertex('Picard')
    }

    runTest('should add a vertex to the graph', () => {
      setup()
      console.assert(
        Array.isArray(graph.adjacencyList.Picard),
        'Expected an array'
      )
    })

    runTest('should not over-write if vertex name already exists', () => {
      setup()
      const initial = graph.adjacencyList.Picard
      graph.addVertex('Picard')
      console.assert(initial === graph.adjacencyList.Picard)
    })

    console.log('')
  }

  function addEdgeTests() {
    let graph

    console.log('addEdge')
    shouldAddEdgeToFirstVertex()
    shouldAddEdgeToSecondVertex()
    shouldNotCreateDuplicateEdgeEntries()
    console.log('')

    function setup() {
      graph = new Graph()
      graph.addVertex('Picard')
      graph.addVertex('Riker')
    }

    function vertexHasEdgeWith(vertex, adjacentVertex) {
      console.assert(
        graph.adjacencyList[vertex].indexOf(adjacentVertex) !== -1,
        `Expected graph.adjacencyList[${vertex}] to include "${adjacentVertex}"`
      )
    }

    function shouldAddEdgeToFirstVertex() {
      const description = 'should add edge to first vertex argument'
      const test = () => {
        setup()
        graph.addEdge('Picard', 'Riker')
        vertexHasEdgeWith('Picard', 'Riker')
      }
      runTest(description, test)
    }

    function shouldAddEdgeToSecondVertex() {
      const description = 'should add edge to second vertex argument'
      const test = () => {
        setup()
        graph.addEdge('Picard', 'Riker')
        vertexHasEdgeWith('Riker', 'Picard')
      }
      runTest(description, test)
    }

    function shouldNotCreateDuplicateEdgeEntries() {
      const description = 'should not create duplicate edge entries'
      const test = () => {
        setup()
        graph.addEdge('Picard', 'Riker')
        graph.addEdge('Picard', 'Riker')
        console.assert(
          occursOnceInArray(graph.adjacencyList.Picard, 'Riker'),
          'expected one entry for "Riker" in list'
        )
        console.assert(
          occursOnceInArray(graph.adjacencyList.Riker, 'Picard'),
          'expected one entry for "Picard" in list'
        )

        function occursOnceInArray(arr, value) {
          return arr.filter(element => element === value).length === 1
        }
      }
      runTest(description, test)
    }
  }

  function removeEdgeTests() {
    let graph

    console.log('removeEdge')
    shouldRemoveAdjacencyFromEachVertex()
    console.log('')

    function setup() {
      graph = new Graph()
      graph.addVertex('Picard')
      graph.addVertex('Riker')
      graph.addEdge('Picard', 'Riker')
    }

    function shouldRemoveAdjacencyFromEachVertex() {
      const description = 'should remove adjacency from each vertex'
      const test = () => {
        setup()
        graph.removeEdge('Picard', 'Riker')
        vertexIsNotAdjacentTo(graph, 'Picard', 'Riker')
        vertexIsNotAdjacentTo(graph, 'Riker', 'Picard')
      }
      runTest(description, test)
    }
  }

  function removeVertexTests() {
    let graph

    console.log('removeVertex')
    shouldRemoveTheVertex()
    shouldRemoveEdges()
    console.log('')

    function setup() {
      graph = new Graph()
      graph.addVertex('Picard')
      graph.addVertex('Riker')
      graph.addEdge('Picard', 'Riker')
    }

    function shouldRemoveTheVertex() {
      const description = 'should remove the vertex'
      const test = () => {
        setup()
        graph.removeVertex('Picard')
        console.assert(
          !graph.adjacencyList.Picard,
          'graph.adjacencyList.Picard is falsy'
        )
      }
      runTest(description, test)
    }

    function shouldRemoveEdges() {
      const description = 'should remove all edges'
      const test = () => {
        setup()
        graph.removeVertex('Picard')
        vertexIsNotAdjacentTo(graph, 'Riker', 'Picard')
      }
      runTest(description, test)
    }
  }

  function dfTraverseTests() {
    let graph

    console.log('dfTraverse')
    shouldReturnDepthFirstArray()
    console.log('')

    function setup() {
      /* 
        Creates a graph arranged as follows:

            A
           / \
          B — C — D
        
        A depth first traversal from A produces A - B - C - D or A - C - D - B
        depending on implementation.
      */
      graph = new Graph()
      'ABCD'.split('').forEach(graph.addVertex.bind(graph))
      'A-B, A-C, B-C, C-D'
        .split(', ')
        .map(edge => edge.split('-'))
        .forEach(edge => graph.addEdge(...edge))
    }

    function shouldReturnDepthFirstArray() {
      const description =
        'should return array of all vertexes in depth first order'

      const test = () => {
        setup()
        const result = graph.dfTraverse('A')
        console.assert(Array.isArray(result), 'Expected result to be an array')
        console.assert(
          graph.dfTraverse('A').join('') === 'ACDB',
          `Expected A C D B but got ${result.join(' ')}`
        )
      }

      runTest(description, test)
    }
  }

  function bfTraverseTests() {
    let graph

    console.log('bfTraverse')
    shouldReturnAnArray()
    shouldReturnAllNodesInBreadthFirstOrder()
    console.log('')

    function setup() {
      /* 
        Creates a graph arranged as follows:

          A — E  — D
          |
          B — C
        
        A breadth first traversal from A results in one of two orders:
          - A B E C D
          - A E B D C
      */
      graph = new Graph()
      'ABCDE'.split('').forEach(graph.addVertex.bind(graph))
      'A-B, A-E, B-C, E-D'
        .split(', ')
        .map(edge => edge.split('-'))
        .forEach(edge => graph.addEdge(...edge))
    }

    function shouldReturnAnArray() {
      const description = 'should return an array'

      const test = () => {
        setup()
        const result = graph.bfTraverse('A')
        console.assert(Array.isArray(result), 'Expected result to be an array')
      }
      runTest(description, test)
    }

    function shouldReturnAllNodesInBreadthFirstOrder() {
      const description = 'should return all nodes in breadth first order'

      const test = () => {
        setup()
        const result = graph.bfTraverse('A')
        console.assert(
          result.join('') === 'ABECD',
          `Expected A B E C D but got ${result.join(' ') || 'nothing'}`
        )
      }
      runTest(description, test)
    }
  }
}
