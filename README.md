# VectorShift Mini Builder

Visual pipeline builder for designing and validating node-based workflows.

Build pipelines by dragging nodes onto a canvas, connecting them with edges, and running analysis to verify the graph structure (including DAG detection).

![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?logo=fastapi)
![React Flow](https://img.shields.io/badge/React%20Flow-11.x-ff0072)

---

## Features

- **Visual pipeline editor** — Drag-and-drop nodes, connect with edges, zoom and pan
- **Reusable node system** — `BaseNode` abstraction with consistent layout, styling, and handles
- **Built-in node types** — Input, Output, LLM, Text, Number, Uppercase, Delay, Condition, Logger
- **Text node** — Dynamic width/height, template variables via `{{name}}` with auto-generated input handles
- **Pipeline analysis** — Submit pipeline to backend; get node count, edge count, and DAG validation
- **DAG detection** — Backend uses Kahn’s algorithm to detect cycles
- **Modern UI** — Glass-style nodes, header bar, run pipeline button, empty state, and result card

---

## Tech Stack

| Layer    | Technology |
| -------- | ---------- |
| Frontend | React 18, React Flow 11, Zustand |
| Backend  | Python 3, FastAPI, Pydantic |
| Run      | Create React App (frontend), Uvicorn (backend) |

---

## Prerequisites

- **Node.js** 16+ and npm (for frontend)
- **Python** 3.9+ (for backend)

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yatish/vectorshift.ai_assignment.git
cd vectorshift-mini-builder
```

### 2. Backend

```bash
cd backend
pip install fastapi uvicorn
# Or with a venv:
# python -m venv venv
# venv\Scripts\activate   (Windows)
# pip install fastapi uvicorn
```

### 3. Frontend

```bash
cd frontend
npm install
```

---

## How to Run

Run **both** the backend and frontend (in two terminals).

### Terminal 1 — Backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

- API: [http://localhost:8000](http://localhost:8000)  
- Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Terminal 2 — Frontend

```bash
cd frontend
npm start
```

- App: [http://localhost:3000](http://localhost:3000)

---

## Usage

1. **Add nodes** — Drag node types from the top bar (Input, LLM, Output, Text, Number, etc.) onto the canvas.
2. **Connect nodes** — Drag from a node’s output handle (right) to another node’s input handle (left).
3. **Configure nodes** — Use the fields inside each node (e.g. Text template with `{{variable}}`, Delay ms, Condition operator).
4. **Run analysis** — Click **Run Pipeline** in the header or **Submit** below the canvas. The result card shows:
   - **Nodes** — Total number of nodes  
   - **Edges** — Total number of edges  
   - **Status** — **Valid DAG** (no cycles) or **Invalid – Cycle detected**

To see **Invalid – Cycle detected**, create a cycle (e.g. connect a node’s output back to an earlier node’s input).

---

## Project Structure

```
VectorShift/
├── backend/
│   └── main.py              # FastAPI app, /pipelines/parse, DAG logic
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── nodes/           # Node components (BaseNode + all node types)
│   │   │   ├── BaseNode.js
│   │   │   ├── inputNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── textNode.js
│   │   │   ├── numberNode.js
│   │   │   ├── upperCaseNode.js
│   │   │   ├── delayNode.js
│   │   │   ├── conditionNode.js
│   │   │   ├── loggerNode.js
│   │   │   └── nodes.css
│   │   ├── App.js
│   │   ├── Header.js
│   │   ├── ui.js             # React Flow canvas, nodeTypes, drop logic
│   │   ├── toolbar.js
│   │   ├── submit.js
│   │   ├── usePipelineSubmit.js
│   │   ├── store.js          # Zustand (nodes, edges, connect)
│   │   ├── draggableNode.js
│   │   └── index.css
│   └── package.json
└── README.md
```

---

## API

### `POST /pipelines/parse`

Analyzes a pipeline graph and returns node count, edge count, and whether it is a DAG.

**Request body:**

```json
{
  "nodes": [{"id": "text-1"}, {"id": "customOutput-1"}],
  "edges": [
    {"source": "text-1", "target": "customOutput-1"}
  ]
}
```

**Response:**

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

- **`is_dag`** — `true` if the graph has no cycles; `false` if at least one cycle exists (Kahn’s algorithm).

---

screenshots:
<img width="1918" height="876" alt="image" src="https://github.com/user-attachments/assets/f81fb191-602d-46c8-a48d-6bac5c55679a" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/593c6f0b-55dd-4305-9167-47d456b567ae" />


## License

This project was built as a technical assessment. Use and modify as needed.
