// loggerNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LoggerNode = ({ id, data }) => {
  const handleLog = () => {
    // In a real engine this would log the evaluated input.
    // For this assessment we log the node id and current data.
    // This showcases side-effect style nodes using BaseNode.
    // eslint-disable-next-line no-console
    console.log('LoggerNode', { id, data });
  };

  return (
    <BaseNode
      id={id}
      title="Logger"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-in`,
          style: { top: '50%' },
        },
      ]}
    >
      <span className="node-helper-text">
        Logs incoming value to the browser console.
      </span>
      <button
        type="button"
        className="btn-gradient btn-gradient--sm"
        onClick={handleLog}
      >
        Log to console
      </button>
    </BaseNode>
  );
};

