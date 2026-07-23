import { motion } from "framer-motion";

const STYLES = {
  pursue: { color: "var(--color-positive)", label: "PURSUE" },
  pivot: { color: "var(--color-accent)", label: "PIVOT" },
  reconsider: { color: "var(--color-negative)", label: "RECONSIDER" },
};

export default function VerdictStamp({ recommendation }) {
  const style = STYLES[recommendation] || STYLES.pivot;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.4, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="inline-block border-4 rounded-md px-4 py-1 font-display font-bold text-xl tracking-widest select-none"
      style={{ borderColor: style.color, color: style.color }}
    >
      {style.label}
    </motion.div>
  );
}