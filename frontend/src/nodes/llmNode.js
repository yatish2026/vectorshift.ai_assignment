// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode
      id={id}
      title="LLM"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-system`,
          style: { top: '33%' },
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-prompt`,
          style: { top: '66%' },
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`,
          style: { top: '50%' },
        },
      ]}
    >
      <div className="node-field">
        <span className="node-label">Description</span>
        <span className="node-helper-text">
          Large language model that takes system &amp; prompt inputs.
        </span>
      </div>
    </BaseNode>
  );
};
