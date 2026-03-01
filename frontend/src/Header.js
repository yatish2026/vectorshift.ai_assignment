// Header.js – top bar with title and Run Pipeline button

import './Header.css';

export const Header = ({ onRunPipeline, loading }) => {
  return (
    <header className="app-header">
      <h1 className="app-header__title">VectorShift Mini Builder</h1>
      <button
        type="button"
        className="app-header__run-btn btn-gradient"
        onClick={onRunPipeline}
        disabled={loading}
      >
        {loading ? 'Analyzing…' : 'Run Pipeline'}
      </button>
    </header>
  );
};
