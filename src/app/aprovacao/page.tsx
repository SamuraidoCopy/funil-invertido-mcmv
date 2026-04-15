"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Calendar, Clock, CheckCircle2, PartyPopper } from "lucide-react";
import { Suspense } from "react";

function AprovacaoContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Candidato";

  return (
    <main className="min-h-screen mesh-gradient py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-white/40 backdrop-blur-[2px] -z-10" />
      
      <div className="max-w-4xl mx-auto space-y-10 text-center relative z-10">
        
        {/* Badge de Status Premium */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-emerald-600 px-6 py-2.5 rounded-full text-xs font-black tracking-[0.2em] border border-emerald-100 shadow-sm uppercase shadow-emerald-500/10"
        >
          <CheckCircle2 size={16} className="text-emerald-500" />
          Perfil Auditado e Enviado
        </motion.div>

        {/* Header Principal Premium */}
        <header className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 leading-[1.1] tracking-tight">
            <span className="flex items-center justify-center gap-4">Muito Bem, {name}! <PartyPopper className="text-amber-500 animate-bounce" size={48} /></span>
            <span className="text-gradient-blue">Sua jornada começou.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Nossa equipe de especialistas iniciou a auditoria do seu CPF. <span className="text-slate-800 font-bold underline decoration-brand-blue/30 decoration-4 underline-offset-4">Assista agora</span> para não perder o subsídio.
          </p>
        </header>

        {/* Video Player Frame Premium */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="aspect-video w-full glass-premium rounded-[2.5rem] p-3 shadow-2xl relative group overflow-hidden"
        >
          <div className="w-full h-full bg-slate-900 rounded-[2rem] overflow-hidden relative border border-white/20">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 backdrop-blur-xl group-hover:scale-110 transition-transform cursor-pointer">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                </div>
                <p className="text-slate-400 font-display italic text-sm tracking-widest">
                  [AUDITORIA EM ANDAMENTO]
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card de Instruções Pós-Análise Premium */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-premium p-10 rounded-[2.5rem] max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-xl font-display font-bold text-slate-800 flex items-center justify-center gap-2">
            <ShieldCheck className="text-brand-blue" />
            O QUE ACONTECE AGORA?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-slate-50 rounded-2xl flex gap-3">
              <Clock className="text-brand-blue shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Prazo de 48h</h3>
                <p className="text-xs text-slate-500">Nosso time de auditores revisará suas respostas minuciosamente.</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl flex gap-3">
              <Calendar className="text-brand-blue shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Fique Atento</h3>
                <p className="text-xs text-slate-500">O contato será feito exclusivamente via WhatsApp pela nossa equipe.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
             <p className="text-sm text-slate-400 font-medium">
               Atenção: Não aceite contatos de números desconhecidos que não se identifiquem como nossa equipe de Auditoria.
             </p>
          </div>
        </motion.div>

      </div>
    </main>
  );
}

export default function AprovacaoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando análise...</div>}>
      <AprovacaoContent />
    </Suspense>
  );
}
