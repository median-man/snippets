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
}
