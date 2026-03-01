// numberNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const NumberNode = ({ id, data }) => {
  const [value, setValue] = useState(
    typeof data?.value === 'number' ? data.value : 0
  );

  const handleChange = (e) => {
    const next = e.target.value === '' ? '' : Number(e.target.value);
    setValue(next);
  };

  return (
    <BaseNode
      id={id}
      title="Number"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-number`,
          style: { top: '50%' },
        },
      ]}
    >
      <div className="node-field">
        <span className="node-label">Value</span>
        <input
          type="number"
          className="node-input"
          value={value}
          onChange={handleChange}
        />
      </div>
    </BaseNode>
  );
};

