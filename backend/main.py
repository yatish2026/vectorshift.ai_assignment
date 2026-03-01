from typing import Dict, List, Set

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

# Allow the React dev server (port 3000) to talk to this API during development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str


class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelineRequest):
    """
    Parse a pipeline definition and return:
    - total number of nodes
    - total number of edges
    - whether the directed graph is acyclic (DAG)
    """

    nodes = payload.nodes or []
    edges = payload.edges or []

    num_nodes = len(nodes)
    num_edges = len(edges)

    # Collect all node ids that participate in the graph. We use the ids from the
    # nodes list and also include any ids referenced by edges, so the cycle check
    # reflects the full directed graph structure.
    node_ids: Set[str] = {node.id for node in nodes}
    for edge in edges:
        node_ids.add(edge.source)
        node_ids.add(edge.target)

    # Empty graph (no nodes, no edges) is trivially a DAG.
    if not node_ids:
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": True,
        }

    # Build adjacency list and in-degree count for Kahn's Algorithm.
    adjacency: Dict[str, List[str]] = {node_id: [] for node_id in node_ids}
    in_degree: Dict[str, int] = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        # Only consider edges whose endpoints are in the known node set.
        if edge.source in adjacency and edge.target in adjacency:
            adjacency[edge.source].append(edge.target)
            in_degree[edge.target] += 1

    # Initialize queue with all nodes that have in-degree 0.
    queue: List[str] = [node_id for node_id, deg in in_degree.items() if deg == 0]

    visited_count = 0

    # Kahn's Algorithm (topological sort). If we can visit all nodes,
    # the graph is acyclic. If some nodes remain with non-zero in-degree,
    # there must be at least one cycle.
    while queue:
        current = queue.pop(0)
        visited_count += 1

        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited_count == len(node_ids)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }


