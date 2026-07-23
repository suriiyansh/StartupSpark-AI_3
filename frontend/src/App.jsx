import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import IdeaForm from "./components/IdeaForm";
import ResultsDashboard from "./components/ResultsDashboard";
import { validateIdea } from "./lib/api";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(idea) {
    setLoading(true);
    setResult(null);
    try {
      const data = await validateIdea(idea);
      setResult(data);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Couldn't analyze that idea. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen font-body px-6 py-16">
      <Toaster position="top-center" />
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold mb-2">
          StartupSpark <span className="text-accent">AI</span>
        </h1>
        <p className="text-text-muted text-sm">
          Your idea, stress-tested like a mentor would.
        </p>
      </div>

      <IdeaForm onSubmit={handleSubmit} loading={loading} />
      {result && <ResultsDashboard data={result} />}
    </div>
  );
}