import { motion } from "framer-motion";
import VerdictStamp from "./VerdictStamp";

function Section({ label, children }) {
  return (
    <div className="border border-border rounded-lg p-5 bg-surface">
      <p className="font-mono text-xs text-accent tracking-widest mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function ResultsDashboard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-10 space-y-6"
    >
      <div className="flex items-start justify-between gap-6 border-b border-border pb-6">
        <div>
          <p className="font-mono text-xs text-text-muted mb-2">SUMMARY</p>
          <h2 className="font-display text-2xl leading-snug">
            {data.ideaSummary}
          </h2>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-xs text-text-muted mb-1">VIABILITY</p>
          <p className="font-mono text-4xl font-medium text-accent">
            {data.viabilityScore}
            <span className="text-lg text-text-muted">/10</span>
          </p>
        </div>
      </div>

      <VerdictStamp recommendation={data.verdict.recommendation} />
      <p className="text-text-muted text-sm">{data.verdict.reasoning}</p>

      <Section label="COMPETITORS">
        <div className="space-y-3">
          {data.competitors.map((c, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium">{c.name}</span>
              <span className="text-text-muted"> — {c.description}</span>
              <p className="text-accent text-xs mt-1">↳ {c.differentiator}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="MARKET SIZE">
        <div className="grid grid-cols-3 gap-4 font-mono text-sm mb-3">
          <div>
            <p className="text-text-muted text-xs">TAM</p>
            <p>{data.marketSize.tam}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs">SAM</p>
            <p>{data.marketSize.sam}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs">SOM</p>
            <p>{data.marketSize.som}</p>
          </div>
        </div>
        <p className="text-text-muted text-xs">{data.marketSize.trend}</p>
      </Section>

      <Section label="REVENUE MODEL">
        <div className="space-y-3">
          {data.revenueModel.map((r, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium">{r.model}</span>
              <span className="text-text-muted"> — {r.description}</span>
              <p className="text-accent text-xs mt-1">{r.pricingSuggestion}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="SWOT">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {["strengths", "weaknesses", "opportunities", "threats"].map(
            (key) => (
              <div key={key}>
                <p className="text-text-muted text-xs uppercase mb-1">
                  {key}
                </p>
                <ul className="list-disc list-inside space-y-1 text-text/90">
                  {data.swot[key].map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </Section>

      <Section label="MVP SUGGESTIONS">
        <p className="text-sm text-text-muted mb-2">
          Core features to build first:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          {data.mvpSuggestions.coreFeatures.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <p className="text-sm text-text-muted mb-2">Skip for v1:</p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3 text-text-muted">
          {data.mvpSuggestions.outOfScope.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <p className="font-mono text-xs text-accent">
          {data.mvpSuggestions.buildTimeEstimate} ·{" "}
          {data.mvpSuggestions.techStackSuggestion}
        </p>
      </Section>

      <Section label="MARKETING PLAN">
        <p className="text-sm mb-2">
          <span className="text-text-muted">Audience: </span>
          {data.marketingPlan.targetAudience}
        </p>
        <p className="text-sm mb-2">
          <span className="text-text-muted">Channels: </span>
          {data.marketingPlan.primaryChannels.join(", ")}
        </p>
        <p className="text-sm mb-2">{data.marketingPlan.goToMarketStrategy}</p>
        <p className="text-accent text-xs">
          First move: {data.marketingPlan.earlyTractionTactic}
        </p>
      </Section>

      <Section label="RISKS">
        <div className="space-y-3">
          {data.risks.map((r, i) => (
            <div key={i} className="text-sm">
              <span
                className="font-mono text-xs mr-2 uppercase"
                style={{
                  color:
                    r.severity === "high"
                      ? "var(--color-negative)"
                      : r.severity === "medium"
                      ? "var(--color-accent)"
                      : "var(--color-positive)",
                }}
              >
                [{r.severity}]
              </span>
              {r.risk}
              <p className="text-text-muted text-xs mt-1 ml-8">
                ↳ {r.mitigation}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </motion.div>
  );
}