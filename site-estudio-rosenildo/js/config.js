/* ============================================================
   CONFIGURAÇÃO DO SITE — edite apenas este arquivo
   ============================================================ */

/* ============================================================
   CONFIGURAÇÃO — preencha antes de publicar
   ============================================================ */

/* [PLACEHOLDER OBRIGATÓRIO]
   Número no formato internacional, apenas dígitos: 55 + DDD + número.
   Exemplo de formato: "5581912345678"  (este exemplo NÃO é o número real) */
var WHATSAPP_NUMBER = "5500000000000";

/* [PLACEHOLDER] Link do Instagram do estúdio (ex.: "https://instagram.com/perfil") */
var INSTAGRAM_URL = "";

var DEFAULT_MSG = "Olá! Vim pelo site do Estúdio Rosenildo Alencar e gostaria de saber mais sobre os atendimentos e agendar uma avaliação.";

/* ---------- WhatsApp: função central de conversão ---------- */
function openWhatsApp(message){
  var n = String(WHATSAPP_NUMBER).replace(/\D/g, "");
  if (!n || /0{7,}/.test(n) || n.length < 11){
    alert("⚠ Site em configuração:\n\nDefina o número real do WhatsApp na variável WHATSAPP_NUMBER, no início do <script> desta página (formato: 55 + DDD + número).");
    return;
  }
  var msg = message || DEFAULT_MSG;
  var url = "https://wa.me/" + n + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank", "noopener");
}
