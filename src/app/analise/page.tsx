"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, CheckCircle, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AnaliseEducativa() {
  return (
    <main className="min-h-screen mesh-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-white/40 backdrop-blur-[2px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full glass-premium rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600" />
        
        <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-100/50">
          <ShieldAlert size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-6 leading-tight">
          Pausa Estratégica na <br /> <span className="text-amber-600">Sua Aprovação</span>
        </h1>
        
        <p className="text-slate-500 text-lg mb-10 font-medium leading-relaxed">
          O novo <span className="text-slate-800 font-bold">MCMV 2026</span> exige que seu CPF esteja 100% regularizado para a liberação do subsídio de até R$ 55 mil. Mas não se preocupe: isso é apenas um <span className="italic">obstáculo temporário</span>.
        </p>

        <div className="bg-slate-50/50 backdrop-blur-sm p-8 rounded-[2rem] text-left border border-white/60 mb-10 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
            <TrendingUp size={16} className="text-brand-blue" />
            Seu Plano de Recuperação de Crédito:
          </h3>
          <ul className="space-y-4">
            {[
              { text: "Acesse o App do Serasa (Feirão Limpa Nome)", color: "text-brand-blue" },
              { text: "Negocie dívidas com até 90% de desconto", color: "text-brand-green" },
              { text: "Aguarde 5 dias após a quitação para o sistema baixar", color: "text-slate-500" },
            ].map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-sm">
                  {i + 1}
                </div>
                <span className={`text-sm font-bold ${step.color}`}>{step.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/">
          <button className="w-full bg-slate-900 text-white font-bold px-8 py-5 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 group">
            Entendi, vou regularizar meu CPF
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2 border-t border-slate-100 pt-6">
          <CheckCircle size={12} />
          Sua vaga na auditoria será preservada por 30 dias.
        </p>
      </motion.div>
    </main>
  );
}
