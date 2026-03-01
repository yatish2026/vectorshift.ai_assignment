// textNode.js

import { useEffect, useMemo, useRef, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const VARIABLE_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Auto-resize textarea height based on content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [currText]);

  // Extract unique variable names from the template text
  useEffect(() => {
    const found = new Set();
    let match;
    while ((match = VARIABLE_REGEX.exec(currText)) !== null) {
      const name = match[1];
      if (name) {
        found.add(name);
      }
    }
    setVariables(Array.from(found));
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Dynamic handles: first at 60px from top, each next +28px to avoid crowding
  const handles = useMemo(() => {
    const variableHandles = variables.map((name, index) => {
      const topPx = 60 + index * 28;
      return {
        type: 'target',
        position: Position.Left,
        id: `${id}-var-${name}`,
        style: { top: `${topPx}px` },
      };
    });

    const outputHandle = {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
      style: { top: '50%' },
    };

    return [...variableHandles, outputHandle];
  }, [id, variables]);

  return (
    <BaseNode id={id} title="Text" handles={handles}>
      <div className="node-field">
        <span className="node-label">Template</span>
        <textarea
          ref={textareaRef}
          className="node-textarea"
          value={currText}
          onChange={handleTextChange}
          rows={1}
          style={{
            overflow: 'hidden',
            resize: 'none',
          }}
        />
      </div>

      {variables.length > 0 && (
        <div className="node-field">
          <span className="node-label">Variables</span>
          <span className="node-helper-text">
            {variables.join(', ')}
          </span>
        </div>
      )}
    </BaseNode>
  );
};
