// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '8px 4px 0' }}>
          <div className="toolbar-row">
            <DraggableNode type='customInput' label='Input' />
            <DraggableNode type='llm' label='LLM' />
            <DraggableNode type='customOutput' label='Output' />
            <DraggableNode type='text' label='Text' />
            <DraggableNode type='number' label='Number' />
            <DraggableNode type='uppercase' label='Uppercase' />
            <DraggableNode type='delay' label='Delay' />
            <DraggableNode type='condition' label='Condition' />
            <DraggableNode type='logger' label='Logger' />
          </div>
        </div>
    );
};
