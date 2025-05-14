import create from "zustand";
import { addEdge, Node, Edge, Connection } from "react-flow-renderer";
import { theme } from "../theme";

export interface FlowNodeData {
  label: string;
}
interface FlowState {
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
  addNode(node: Node<FlowNodeData>): void;
  updateNode(id: string, label: string): void;
  removeNode(id: string): void;
  duplicateNode(id: string): void;
  moveNode(id: string, position: { x: number; y: number }): void;
  connect(params: Connection): void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [
    {
      // TODO: could do something better than inline styles
      id: "1",
      type: "editable",
      position: { x: 100, y: 100 },
      data: { label: "Start" },
      style: {
        background: theme.nodeBg,
        color: theme.nodeFontColor,
        border: `2px solid ${theme.primary}`,
        borderRadius: theme.nodeBorderRadius,
        padding: "12px 16px",
        minWidth: 120,
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "all 0.2s ease",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 500,
        "&:hover": {
          boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
          transform: "translateY(-1px)",
        },
      },
    },
  ],
  edges: [],
  addNode: (node) =>
    set((s) => ({
      nodes: [
        ...s.nodes,
        {
          ...node,
          type: "editable",
          style: { ...node.style, border: `2px solid ${theme.primary}` },
        },
      ],
    })),
  updateNode: (id, label) =>
    set((s) => ({
      nodes: s.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, label } } : n
      ),
    })),
  removeNode: (id) =>
    set((s) => ({
      nodes: s.nodes.filter((n) => n.id !== id),
      edges: s.edges.filter((e) => e.source !== id && e.target !== id),
    })),
  duplicateNode: (id) => {
    const src = get().nodes.find((n) => n.id === id);
    if (!src) return;
    const newId = Date.now().toString();
    set((s) => ({
      nodes: [
        ...s.nodes,
        {
          id: newId,
          type: "editable",
          position: { x: src.position.x + 40, y: src.position.y + 40 },
          data: { label: src.data.label },
          style: src.style,
        },
      ],
    }));
  },
  moveNode: (id, pos) =>
    set((s) => ({
      nodes: s.nodes.map((n) => (n.id === id ? { ...n, position: pos } : n)),
    })),
  connect: (params) =>
    set((s) => ({
      edges: addEdge(
        { ...params, style: { stroke: theme.edgeColor, strokeWidth: 2 } },
        s.edges
      ),
    })),
}));
