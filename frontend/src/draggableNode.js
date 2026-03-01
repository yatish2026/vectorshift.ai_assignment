// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <button
        type="button"
        className={`btn-gradient btn-gradient--sm ${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{
          cursor: 'grab',
          minWidth: '88px',
          height: '40px',
        }}
        draggable
      >
        {label}
      </button>
    );
  };
  