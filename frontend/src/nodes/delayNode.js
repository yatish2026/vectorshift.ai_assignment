// delayNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [ms, setMs] = useState(
    typeof data?.delayMs === 'number' ? data.delayMs : 500
  );

  const handleChange = (e) => {
    const next = e.target.value === '' ? '' : Number(e.target.value);
    setMs(next);
  };

  return (
    <BaseNode
      id={id}
      title="Delay"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-in`,
          style: { top: '50%' },
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-out`,
          style: { top: '50%' },
        },
      ]}
    >
      <div className="node-field">
        <span className="node-label">Delay (ms)</span>
        <input
          type="number"
          min="0"
          step="50"
          className="node-input"
          value={ms}
          onChange={handleChange}
        />
      </div>
      <span className="node-helper-text">
        Simulates latency between input and output.
      </span>
    </BaseNode>
  );
};

