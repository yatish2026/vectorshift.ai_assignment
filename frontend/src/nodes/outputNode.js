// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={[
        {
          type: 'target',
          position: Position.Left,
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
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
