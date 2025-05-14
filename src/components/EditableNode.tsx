import React, { memo, useState } from "react";
import { NodeProps, Handle, Position } from "react-flow-renderer";
import styled from "styled-components";
import { FlowNodeData, useFlowStore } from "../store/flowStore";
import { theme } from "../theme";

const NodeContainer = styled.div`
  background: ${theme.nodeBg};
  color: ${theme.nodeFontColor};
  border: 2px solid ${theme.primary};
  border-radius: ${theme.nodeBorderRadius}px;
  padding: 8px;
  text-align: center;
  min-width: 100px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LabelInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font: inherit;
  text-align: center;
`;

export const EditableNode: React.FC<NodeProps<FlowNodeData>> = memo(
  ({ id, data }) => {
    const updateNode = useFlowStore((state) => state.updateNode);
    const [editing, setEditing] = useState(false);
    const [temp, setTemp] = useState(data.label);

    const onDouble = () => setEditing(true);
    const onBlur = () => {
      updateNode(id, temp.trim() || data.label);
      setEditing(false);
    };
    const onKey = (e: React.KeyboardEvent) =>
      e.key === "Enter" && (e.target as HTMLInputElement).blur();

    return (
      <NodeContainer onDoubleClick={onDouble}>
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: theme.primary }}
        />
        {editing ? (
          <LabelInput
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKey}
            autoFocus
          />
        ) : (
          <div>{data.label}</div>
        )}
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: theme.primary }}
        />
      </NodeContainer>
    );
  }
);

export default EditableNode;
