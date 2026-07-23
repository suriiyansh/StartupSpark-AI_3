import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function IdeaForm({ onSubmit, loading }) {
  const [idea, setIdea] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (idea.trim().length < 3) return;
    onSubmit(idea.trim());
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="font-mono text-xs text-text-muted mb-2 tracking-wide">
        // enter a startup idea to analyze
      </p>
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex-1 flex items-center bg-surface border border-border rounded-lg px-4 py-3 focus-within:border-accent transition-colors">
          <span className="font-mono text-accent mr-2">&gt;</span>
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="AI Laundry Service"
            maxLength={200}
            className="flex-1 bg-transparent outline-none font-mono text-sm placeholder:text-text-muted/50"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading || idea.trim().length < 3}
          className="flex items-center gap-2 bg-accent text-bg font-display font-medium px-5 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing…" : "Validate"}
          {!loading && <ArrowRight size={16} />}
        </motion.button>
      </form>
    </div>
  );
}