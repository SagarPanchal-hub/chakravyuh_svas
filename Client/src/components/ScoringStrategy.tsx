import { motion } from "framer-motion";
import { Trophy, Target, Star, Award, Lightbulb } from "lucide-react";

const rounds = [
  {
    round: "Round 1",
    title: "Mentor Round — The Hook",
    icon: Lightbulb,
    points: "Originality 5/5 · Problem-Solution Fit 5/5",
    strategy: "Batayein ki aapka solution 'Federated' hai — banks bina data share kiye collaborate karte hain. Yeh USP hai jo koi aur nahi karega.",
    color: "neon-cyan",
  },
  {
    round: "Round 2",
    title: "Mid-Hackathon — The Progress",
    icon: Target,
    points: "Technical Progress 5/5 · Mentor Feedback 5/5",
    strategy: "Server + Client training logs live dikhayein. Agar mentor ne feedback diya tha, usse implement karke highlight karein.",
    color: "neon-purple",
  },
  {
    round: "Round 3",
    title: "Judge Evaluation — The Impact",
    icon: Star,
    points: "Technical Execution 5/5 · Real-World Impact 5/5",
    strategy: "GNN accuracy graph + PQC latency metrics dikhayein. Money laundering se desh ki suraksha ka connection batayein.",
    color: "neon-green",
  },
  {
    round: "Round 4",
    title: "Final Jury — The Grand Slam",
    icon: Trophy,
    points: "70 Marks — Social Impact 10 · Emerging Tech 10 · UX 10",
    strategy: "PQC + Agentic AI ka zikr. SHAP visualizers se explainable AI dikhayein. Dashboard mein Global Fraud Map.",
    color: "neon-amber",
  },
];

const colorMap: Record<string, string> = {
  "neon-cyan": "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5",
  "neon-purple": "text-neon-purple border-neon-purple/30 bg-neon-purple/5",
  "neon-green": "text-neon-green border-neon-green/30 bg-neon-green/5",
  "neon-amber": "text-neon-amber border-neon-amber/30 bg-neon-amber/5",
};

const ScoringStrategy = () => (
  <section className="py-24 px-6 relative">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-foreground">Prayatna 3.0 </span>
          <span className="text-neon-amber" style={{ textShadow: "0 0 10px hsl(38 92% 55% / 0.6)" }}>
            Scoring Strategy
          </span>
        </h2>
        <p className="text-muted-foreground">Har round mein full marks kaise payein</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {rounds.map((round, i) => (
          <motion.div
            key={round.round}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`card-cyber p-6 border ${colorMap[round.color].split(" ").slice(1).join(" ")}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <round.icon className={`w-6 h-6 ${colorMap[round.color].split(" ")[0]}`} />
              <div>
                <span className="text-xs font-mono text-muted-foreground">{round.round}</span>
                <h3 className={`text-lg font-bold ${colorMap[round.color].split(" ")[0]}`}>{round.title}</h3>
              </div>
            </div>
            <div className={`inline-block px-3 py-1 rounded text-xs font-mono border mb-3 ${colorMap[round.color]}`}>
              {round.points}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{round.strategy}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ScoringStrategy;
