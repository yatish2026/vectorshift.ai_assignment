// upperCaseNode.js

import { useState, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const UpperCaseNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');

  const upper = useMemo(() => text.toUpperCase(), [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Uppercase"
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
        <span className="node-label">Input text</span>
        <input
          type="text"
          className="node-input"
          value={text}
          onChange={handleChange}
        />
      </div>
      <div className="node-field">
        <span className="node-label">Preview</span>
        <span className="node-helper-text">{upper || '—'}</span>
      </div>
    </BaseNode>
  );
};

