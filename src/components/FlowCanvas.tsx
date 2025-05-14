import React, { useCallback, useState } from "react";
import ReactFlow, { MiniMap, Controls, Background, Node, Connection } from "react-flow-renderer";
import { useFlowStore } from "../store/flowStore";
import { ContextMenu, MenuItem } from "./ContextMenu";
import styled from "styled-components";

import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import { theme } from "../theme";
import { EditableNode } from "./EditableNode";

const FlowArea = styled.div`
  width: 100%;
  height: 100%;
`;
const nodeTypes = { editable: EditableNode };

const FlowCanvas: React.FC = () => {
  const {
    nodes,
    edges,
    addNode,
    removeNode,
    moveNode,
    connect,
    duplicateNode,
  } = useFlowStore();
  const [menu, setMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    nodeId: string | null;
  }>({ visible: false, x: 0, y: 0, nodeId: null });

  const onPaneClick = useCallback(
    (e: React.MouseEvent) => {
      setMenu({ visible: false, x: 0, y: 0, nodeId: null });
      const target = e.target as HTMLElement;
      if (!target.classList.contains("react-flow__pane")) return;
      const id = Date.now().toString();
      addNode({
        id,
        type: "editable",
        position: { x: e.clientX - 60, y: e.clientY - 20 },
        data: { label: `Item ${id}` },
      } as Node<{ label: string }>);
    },
    [addNode]
  );

  const onConnect = useCallback((p: Connection) => connect(p), [connect]);
  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, n: Node<{ label: string }>) => moveNode(n.id, n.position),
    [moveNode]
  );
  const onNodeContext = useCallback((e: React.MouseEvent, n: Node<{ label: string }>) => {
    e.preventDefault();
    setMenu({ visible: true, x: e.clientX, y: e.clientY, nodeId: n.id });
  }, []);

  const edit = () => {
    if (!menu.nodeId) return;
    const cur = nodes.find((n) => n.id === menu.nodeId)?.data.label || "";
    const nl = prompt("New label:", cur);
    if (nl !== null) useFlowStore.getState().updateNode(menu.nodeId, nl);
    setMenu({ ...menu, visible: false });
  };
  const dup = () => {
    if (!menu.nodeId) return;
    duplicateNode(menu.nodeId);
    setMenu({ ...menu, visible: false });
  };
  const del = () => {
    if (!menu.nodeId) return;
    removeNode(menu.nodeId);
    setMenu({ ...menu, visible: false });
  };

  return (
    <>
      {menu.visible && menu.nodeId && (
        <ContextMenu x={menu.x} y={menu.y}>
          <MenuItem onClick={edit}>
            <FaEdit />
            Edit Label
          </MenuItem>
          <MenuItem onClick={dup}>
            <FaCopy />
            Duplicate Node
          </MenuItem>
          <MenuItem onClick={del}>
            <FaTrash />
            Delete Node
          </MenuItem>
        </ContextMenu>
      )}
      <FlowArea>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onPaneClick={onPaneClick}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContext}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid={true}
          snapGrid={[16, 16]}
        >
          <MiniMap
            nodeStrokeColor={() => theme.primary}
            nodeColor={() => theme.nodeBg}
          />
          <Controls />
          {
            //todo:fix prop
          }
          <Background
            variant="dots"
            gap={16}
            size={2}
            color={theme.gridColor}
          />
        </ReactFlow>
      </FlowArea>
    </>
  );
};

export default FlowCanvas;
