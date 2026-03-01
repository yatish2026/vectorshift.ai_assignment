// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-value`,
          style: { top: '50%' },
        },
      ]}
    >
      <div className="node-field">
        <span className="node-label">Name</span>
        <input
          type="text"
          className="node-input"
          value={currName}
          onChange={handleNameChange}
        />
      </div>

      <div className="node-field">
        <span className="node-label">Type</span>
        <select
          className="node-select"
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
