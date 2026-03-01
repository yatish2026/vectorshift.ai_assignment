// submit.js – result card + secondary submit button

export const SubmitButton = ({ onSubmit, loading, result, error }) => {
  return (
    <div className="submit-section">
      <div className="center-row">
        <button
          type="button"
          className="btn-gradient"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? 'Analyzing…' : 'Submit'}
        </button>
      </div>

      {result && (
        <div className="pipeline-result-card" role="status">
          <h3 className="pipeline-result-card__title">Pipeline Analysis</h3>
          <div className="pipeline-result-card__row">
            <span>Nodes:</span>
            <strong>{result.num_nodes}</strong>
          </div>
          <div className="pipeline-result-card__row">
            <span>Edges:</span>
            <strong>{result.num_edges}</strong>
          </div>
          <div className="pipeline-result-card__status">
            {result.is_dag ? (
              <span className="pipeline-result-card__badge pipeline-result-card__badge--valid">
                Valid DAG
              </span>
            ) : (
              <span className="pipeline-result-card__badge pipeline-result-card__badge--invalid">
                Invalid – Cycle detected
              </span>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="pipeline-result-card pipeline-result-card--error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

