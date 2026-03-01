import { Header } from './Header';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { usePipelineSubmit } from './usePipelineSubmit';

function App() {
  const { handleSubmit, loading, result, error } = usePipelineSubmit();

  return (
    <div className="app-shell">
      <Header onRunPipeline={handleSubmit} loading={loading} />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton
        onSubmit={handleSubmit}
        loading={loading}
        result={result}
        error={error}
      />
    </div>
  );
}

export default App;
