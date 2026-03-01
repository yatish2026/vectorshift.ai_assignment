// usePipelineSubmit.js – shared submit logic for header and result UI

import { useState } from 'react';
import { useStore } from './store';

export const usePipelineSubmit = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      console.log('Pipeline analysis result:', data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to submit pipeline');
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, result, error };
};
