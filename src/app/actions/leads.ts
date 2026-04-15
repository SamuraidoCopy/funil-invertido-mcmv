// @ts-nocheck
"use server";

import { supabase } from "@/lib/supabaseClient";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function createLeadAction(formData: {
  name: string;
  whatsapp: string;
  answers: any;
  profile?: string;
}) {
  try {
    // @ts-ignore - Bypassing type check for missing Supabase generated types
    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .insert([
        {
          name: formData.name,
          whatsapp: formData.whatsapp,
          answers: formData.answers,
          profile: formData.profile || "mcmv_high_end_lead",
        },
      ] as any)
      .select()
      .single();

    if (leadError) {
      console.error("Supabase Error:", leadError);
      return { success: false, error: leadError.message };
    }

    // 2. Disparar Análise da IA (Ryan Serhant) via OpenRouter
    // Não vamos aguardar a análise para redirecionar o usuário (UX mais rápida), 
    // mas aqui para o MVP vamos fazer em série para garantir o dado.
    try {
      const response = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001", // Modelo rápido e eficiente
        messages: [
          {
            role: "system",
            content: `Você é Ryan Serhant, o corretor #1 de NY. Sua missão é analisar leads do programa Minha Casa Minha Vida (MCMV) para um corretor parceiro. 
            Use seu tom de voz: Énergético, Direto, Big Money Energy.
            Analise as respostas do lead e dê ao corretor um parágrafo estratégico de como fechar esse cliente. 
            Foque na "Parede" (The Wall) - o medo que impulsiona o lead (sair do aluguel, independência, segurança dos filhos).
            Classifique de 0 a 10 a Qualidade do Lead.`
          },
          {
            role: "user",
            content: `Lead: ${formData.name}
            Respostas: ${JSON.stringify(formData.answers)}`
          }
        ],
      });

      const analysisRaw = response.choices[0].message.content;

      // 3. Atualizar o lead com a análise (salvando dentro do JSON de answers por enquanto)
      // @ts-ignore - Bypassing type check
      await supabase
        .from("leads")
        .update({ 
          answers: { 
            ...formData.answers, 
            ryan_analysis: analysisRaw 
          } 
        } as any)
        .eq("id", leadData.id);
      
      // 4. Disparar Notificações via n8n (Webhook)
      const webhookUrl = process.env.N8N_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: leadData.id,
            name: formData.name,
            whatsapp: formData.whatsapp,
            analysis: analysisRaw,
            answers: formData.answers,
            timestamp: new Date().toISOString(),
          }),
        }).catch(err => console.error("Webhook Error:", err));
      }

    } catch (aiError) {
      console.error("AI Analysis Error:", aiError);
      // Não trava o fluxo se a IA falhar
    }

    return { success: true, data: leadData };
  } catch (error: any) {
    console.error("Action Error:", error);
    return { success: false, error: error.message };
  }
}
