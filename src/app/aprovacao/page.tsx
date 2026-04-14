"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { Suspense } from "react";

function AprovacaoContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Candidato";

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        
        {/* Badge de Status */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200"
        >
          <CheckCircle2 size={16} />
          SEU PERFIL FOI ENVIADO PARA AUDITORIA
        </motion.div>

        {/* Header Principal */}
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-slate-800 leading-tight">
            Parabéns, {name}! 🎉 <br />
            <span className="text-brand-blue">Sua pré-análise está em processamento.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Assista ao vídeo abaixo para entender como funciona o processo de liberação do seu subsídio e os próximos passos.
          </p>
        </header>

        {/* Video Player (VSL) Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="aspect-video w-full bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-white relative group"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-slate-500 font-display italic">
              [Player de Vídeo: VSL do Auditor de Risco]
            </p>
          </div>
          {/* 
            Aqui entrará o embed do PandaVideo, YouTube ou Vimeo do cliente.
            Ex: <iframe src="..." className="w-full h-full" ... />
          */}
        </motion.div>

        {/* Card de Instruções Pós-Análise */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6"
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
