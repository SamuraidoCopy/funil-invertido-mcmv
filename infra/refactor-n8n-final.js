const fs = require('fs');
const path = require('path');

const workflowsFile = path.resolve(__dirname, 'workflows_backup.json');
const templateFile = path.resolve(__dirname, 'email-template-agente.html');

let workflows = JSON.parse(fs.readFileSync(workflowsFile, 'utf8'));
let htmlTemplate = fs.readFileSync(templateFile, 'utf8');

const escapedTemplate = JSON.stringify(htmlTemplate);

const codeNode = {
  "parameters": {
    "jsCode": `
const template = ${escapedTemplate};
const body = $node["Webhook"].json.body;
const answers = body.answers || {};

const questionMap = {
  "step_1": "Qual é o seu MAIOR motivo para querer sair da sua casa atual?",
  "step_2": "Você já tem algum valor guardado para documentação ou entrada?",
  "step_3": "Possui pendências registradas no seu CPF ou do seu cônjuge?",
  "step_4": "Qual o valor da sua Renda Bruta Familiar Comprovada?",
  "motivation": "Maior motivação para sair de onde mora hoje",
  "feelings": "Sentimento de saber que pode parar de pagar aluguel",
  "submit_at": "Data de submissão"
};

const answerMap = {
  "aluguel": "O aluguel está me sufocando todo mês.",
  "favor": "Moro de favor e quero a minha independência.",
  "espaco": "A casa está pequena para a minha família.",
  "poupanca": "Tenho de R$ 5.000 a R$ 10.000 guardados.",
  "fgts": "Tenho saldo no meu FGTS (carteira assinada).",
  "subsidio": "Não tenho nada guardado, dependo do subsídio.",
  "restricao_sim": "Sim, possuo restrição.",
  "restricao_nao": "Não, meu CPF está totalmente limpo.",
  "faixa_1": "Abaixo de R$ 2.640",
  "faixa_2": "Entre R$ 2.641 e R$ 4.400",
  "faixa_3": "Acima de R$ 4.400"
};

let answersHtml = Object.entries(answers).map(([k,v]) => {
  if (k === 'submit_at') return '';
  let question = questionMap[k] || k;
  let answer = answerMap[v] || v;
  return \`<div style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #f1f5f9;margin-bottom:12px;">\
    <p style="font-family:Inter,sans-serif;font-size:12px;font-weight:600;color:#64748b;margin:0 0 4px 0;">\${question}</p>\
    <p style="font-family:Inter,sans-serif;font-size:14px;font-weight:500;color:#0f172a;margin:0;">\${answer}</p>\
  </div>\`;
}).join('');

let html = template
  .replace(/{{lead_nome}}/g, body.name || '')
  .replace(/{{lead_whatsapp}}/g, body.whatsapp || '')
  .replace(/{{lead_whatsapp_clean}}/g, (body.whatsapp || '').replace(/\\D/g, ''))
  .replace(/{{lead_nome_primeiro}}/g, (body.name || '').split(' ')[0])
  .replace(/{{nome_agente}}/g, 'Consultor Caixa')
  .replace(/{{analise_titulo}}/g, 'Alerta do Sistema')
  .replace(/{{analise_texto_ia}}/g, (body.analysis || '')
      .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
      .replace(/\\n/g, '<br>'))
  .replace(/{{data_captura}}/g, body.timestamp || '')
  .replace(/{{dados_perguntas_html}}/g, answersHtml);

return [{
  json: {
    html: html,
    body: body
  }
}];
`
  },
  "id": "code-html-gen-001",
  "name": "Gerador de Email",
  "type": "n8n-nodes-base.code",
  "typeVersion": 2,
  "position": [-300, 400]
};

const emailNode = workflows[0].nodes.find(n => n.name === 'Email Alerta');
if (emailNode) {
    emailNode.parameters.emailFormat = "both";
    emailNode.parameters.html = "={{ $json.html }}";
    // MANTENDO O TEXTO COMO FALLBACK POR SEGURANÇA
    emailNode.parameters.text = "={{ 'Nome: ' + $json.body.name + '\\nWhatsApp: ' + $json.body.whatsapp + '\\n\\n(Ative a visualização em HTML do seu provedor de email para ver o laudo completo do lead)' }}";
    emailNode.parameters.subject = "={{ '🔥 NOVO LEAD: ' + $json.body.name }}";
    emailNode.position = [0, 400];
}

workflows[0].nodes.push(codeNode);

workflows[0].connections = {
  "Webhook": {
    "main": [
      [
        { "node": "Gerador de Email", "type": "main", "index": 0 },
        { "node": "Alerta WhatsApp", "type": "main", "index": 0 }
      ]
    ]
  },
  "Gerador de Email": {
    "main": [
      [
        { "node": "Email Alerta", "type": "main", "index": 0 }
      ]
    ]
  }
};

fs.writeFileSync(path.resolve(__dirname, 'workflows_refactored.json'), JSON.stringify(workflows, null, 2));
console.log("✅ Workflow refatorado (V3 - Text Fallback)!");
