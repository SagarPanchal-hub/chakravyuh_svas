import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  Shield, Brain, Lock, Network, Eye, Zap, 
  ChevronRight, Cpu, Github, Heart, Mail, 
  ExternalLink, Globe, Twitter, Linkedin
} from 'lucide-react';

// --- Enhanced Data Definition ---
const features = [
  {
    icon: Network,
    title: "Graph Neural Networks",
    description: "Detect multi-hop fraud patterns using GraphSAGE. Traditional AI analyzes a single transaction, while GNN evaluates the entire network.",
    color: "cyan",
    stat: "Network Analysis"
  },
  {
    icon: Brain,
    title: "Federated Learning",
    description: "Banks can collaborate without sharing raw data. Using the Flower framework, each bank trains on its local dataset securely.",
    color: "purple",
    stat: "Flower Framework"
  },
  {
    icon: Lock,
    title: "Post-Quantum Cryptography",
    description: "Quantum-resistant encryption using Kyber (ML-KEM) and Dilithium (ML-DSA). Future-proof security designed for the next era.",
    color: "green",
    stat: "ML-KEM / ML-DSA"
  },
  {
    icon: Eye,
    title: "Zero-Knowledge Proofs",
    description: "No need to reveal sensitive credentials. ZKP allows verification of identity without exposing the actual data structure.",
    color: "amber",
    stat: "Identity Privacy"
  },
  {
    icon: Shield,
    title: "Agentic AI Response",
    description: "When fraud probability exceeds 0.9, the system autonomously blocks transactions in real time for proactive protection.",
    color: "cyan",
    stat: "Autonomous P > 0.9"
  },
  {
    icon: Zap,
    title: "Edge-Powered Processing",
    description: "Near-zero latency fraud detection using edge computing. Local inference runs directly on each distributed bank node.",
    color: "purple",
    stat: "Edge Inference"
  },
];

// const team = [
//   { name: "Ashwin Chauhan", role: "ML & Data Visualizer", color: "cyan" },
//   { name: "Sagar Panchal", role: "AI Architect", color: "purple" },
//   { name: "Saniya Khan", role: "Backend & Research", color: "green" },
//   { name: "Vijay Songara", role: "Cybersecurity (PQC & ZKP)", color: "amber" },
// ];

const colorConfig = {
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.15)]",
    accent: "bg-cyan-400",
    name: "neon-cyan"
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    accent: "bg-purple-400",
    name: "neon-purple"
  },
  green: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
    accent: "bg-emerald-400",
    name: "neon-green"
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
    accent: "bg-amber-400",
    name: "neon-amber"
  }
};

const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,1)_100%)]" />
    <div 
      className="absolute inset-0 opacity-[0.1]"
      style={{
        backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />
    <motion.div 
      animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/10 blur-[150px] rounded-full"
    />
    <motion.div 
      animate={{ opacity: [0.05, 0.1, 0.05], scale: [1.2, 1, 1.2] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 blur-[150px] rounded-full"
    />
  </div>
);

const FeatureCard = ({ feature, index }) => {
  const config = colorConfig[feature.color];
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group h-full p-[1px] rounded-2xl overflow-hidden transition-all duration-500`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 border ${config.border} group-hover:border-white/10 transition-colors`} />
      
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 40%)`
          )
        }}
      />

      <div className="relative h-full bg-slate-950/90 backdrop-blur-2xl rounded-2xl p-8 flex flex-col z-20">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl ${config.bg} ${config.glow} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
            <feature.icon className={`w-6 h-6 ${config.text}`} />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-slate-900 border border-slate-800 ${config.text}`}>
            {feature.stat}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">
          {feature.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
          {feature.description}
        </p>

        <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-white transition-all cursor-pointer">
          <span className="mr-2">Protocol Insight</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>

        <motion.div 
          className={`absolute bottom-0 left-0 h-[2px] ${config.accent}`}
          initial={{ width: "0%" }}
          animate={isHovered ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

// const Footer = () => (
//   <footer className="relative border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-2xl mt-32">
//     <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      
//       {/* Top Grid */}
//       <div className="grid md:grid-cols-12 gap-12 mb-16">
        
//         {/* Brand Section */}
//         <div className="md:col-span-5">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="p-2 rounded-lg bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
//               <Shield className="w-6 h-6 text-cyan-400" />
//             </div>
//             <span className="font-black text-2xl tracking-tighter text-white">
//               CHAKRAVYUH<span className="text-cyan-400">-SVAS</span>
//             </span>
//           </div>
//           <p className="text-slate-400 leading-relaxed max-w-sm text-sm mb-8">
//             A next-generation cybersecurity ecosystem leveraging autonomous AI, 
//             federated learning, and post-quantum encryption to secure the 
//             future of global financial networks.
//           </p>
//           <div className="flex gap-4">
//             {[Github, Twitter, Linkedin, Mail].map((Icon, idx) => (
//               <a key={idx} href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all">
//                 <Icon className="w-5 h-5" />
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="md:col-span-3">
//           <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Platform</h4>
//           <ul className="space-y-4 text-sm text-slate-400">
//             {['About Intelligence', 'Global Services', 'Real-time Dashboard', 'Security Protocols', 'API Documentation'].map((item) => (
//               <li key={item}>
//                 <a href="#" className="hover:text-cyan-400 flex items-center group transition-colors">
//                   <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Technical Info */}
//         <div className="md:col-span-4">
//           <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Connect</h4>
//           <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
//               <span className="text-xs font-mono text-cyan-400 tracking-tighter uppercase">Support Line Active</span>
//             </div>
//             <p className="text-sm text-slate-300 font-medium mb-1">team@chakravyuh.ai</p>
//             <p className="text-xs text-slate-500 mb-6">Response time: &lt; 2 Hours</p>
//             <button className="w-full py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-widest hover:bg-cyan-500/20 transition-all">
//               Initiate Secure Chat
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Team Section */}
//       <div className="mb-16 pt-16 border-t border-slate-900">
//         <div className="flex flex-col items-center mb-10">
//           <h4 className="text-white font-bold tracking-tight mb-2">Built by Team Techno</h4>
//           <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {team.map((member, i) => (
//             <motion.div
//               key={member.name}
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               whileHover={{ y: -5 }}
//               transition={{ delay: i * 0.1 }}
//               viewport={{ once: true }}
//               className="p-5 rounded-2xl border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm group hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.05)] transition-all"
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <div className={`w-8 h-8 rounded-lg ${colorConfig[member.color].bg} flex items-center justify-center`}>
//                   <Globe className={`w-4 h-4 ${colorConfig[member.color].text}`} />
//                 </div>
//                 <p className="text-sm font-bold text-white group-hover:text-cyan-100">{member.name}</p>
//               </div>
//               <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-slate-500 group-hover:text-slate-400">{member.role}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
//         <p>© {new Date().getFullYear()} CHAKRAVYUH-SVAS • Enterprise Encryption v4.0</p>
//         <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full group">
//           <span>Crafted with</span>
//           <Heart className="w-3 h-3 text-red-500 fill-red-500 group-hover:scale-125 transition-transform" />
//           <span>by Team Techno</span>
//         </div>
//       </div>
//     </div>

//     {/* Footer Glows */}
//     <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
//     <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
//   </footer>
// );

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden flex flex-col">
      {/* <BackgroundGrid /> */}

      <main className="relative z-10 py-24 px-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 mb-8 shadow-2xl"
            >
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Security Architecture 2.0</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8"
            >
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Technologies</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg max-w-2xl leading-relaxed"
            >
              A fusion of cutting-edge technologies that makes digital banking truly secure, leveraging agentic intelligence and quantum-resistant protocols.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>

          {/* Performance Summary Banner */}
          {/* <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20"
          >
            <div className="bg-slate-950/80 backdrop-blur-xl rounded-[22px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-full border border-cyan-500/20 flex items-center justify-center bg-cyan-500/5">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">System Latency: &lt; 5ms</h4>
                  <p className="text-slate-500 text-sm">Real-time edge processing active across 42 global nodes.</p>
                </div>
              </div>
              <button className="w-full md:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95">
                Explore The Sandbox
              </button>
            </div>
          </motion.div> */}
        </div>
      </main>

      {/* <Footer /> */}

      {/* Decorative Lateral Lines */}
      <div className="fixed left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-800/50 to-transparent hidden xl:block" />
      <div className="fixed right-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-800/50 to-transparent hidden xl:block" />
    </div>
  );
}
