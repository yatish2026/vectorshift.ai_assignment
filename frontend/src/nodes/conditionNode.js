// conditionNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const OPERATORS = ['==', '!=', '>', '<', '>=', '<='];

export const ConditionNode = ({ id, data }) => {
  const [left, setLeft] = useState(data?.left ?? '');
  const [right, setRight] = useState(data?.right ?? '');
  const [op, setOp] = useState(data?.operator || '==');

  return (
    <BaseNode
      id={id}
      title="Condition"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`,
          style: { top: '50%' },
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-true`,
          style: { top: '35%' },
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-false`,
          style: { top: '65%' },
        },
      ]}
    >
      <div className="node-field">
        <span className="node-label">Left</span>
        <input
          type="text"
          className="node-input"
          value={left}
          onChange={(e) => setLeft(e.target.value)}
        />
      </div>
      <div className="node-field">
        <span className="node-label">Operator</span>
        <select
          className="node-select"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          {OPERATORS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="node-field">
        <span className="node-label">Right</span>
        <input
          type="text"
          className="node-input"
          value={right}
          onChange={(e) => setRight(e.target.value)}
        />
      </div>
      <span className="node-helper-text">
        True / False branches on the right.
      </span>
    </BaseNode>
  );
};

