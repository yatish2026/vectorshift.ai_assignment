// BaseNode.js
import { Handle } from 'reactflow';
import './nodes.css';

/**
 * Reusable base node for React Flow nodes.
 *
 * Responsibilities:
 * - Common container layout & styling
 * - Title rendering
 * - Input / output handles
 * - Slot (`children`) for node‑specific content
 *
 * `handles` is an array of objects passed directly to `Handle`, e.g.:
 * { type: 'source', position: Position.Right, id: `${id}-value`, style: { top: '50%' } }
 */
export const BaseNode = ({
  id,
  title,
  handles = [],
  children,
  style = {},
  className = '',
  headerClassName = '',
  bodyClassName = '',
}) => {
  const baseStyle = {
    // Keep layout defaults in CSS; only use inline style for per-node overrides.
    ...style,
  };

  const headerStyle = {};
  const bodyStyle = {};

  return (
    <div
      style={baseStyle}
      className={`node-card ${className}`.trim()}
      data-node-id={id}
    >
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || `${id}-handle-${index}`}
          className={`node-handle ${handle.className || ''}`.trim()}
          {...handle}
        />
      ))}

      <div
        style={headerStyle}
        className={`node-card__header ${headerClassName}`.trim()}
      >
        <span className="node-card__title">{title}</span>
      </div>

      <div
        style={bodyStyle}
        className={`node-card__body ${bodyClassName}`.trim()}
      >
        {typeof children === 'function' ? children({ id }) : children}
      </div>
    </div>
  );
};

