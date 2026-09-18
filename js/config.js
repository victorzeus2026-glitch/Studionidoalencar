var WHATSAPP_NUMBER = "5581985696225";

var INSTAGRAM_URL = "https://instagram.com/studionidoalencar";

var DEFAULT_MSG = "Olá! Vim pelo site do Estúdio Rosenildo Alencar e gostaria de saber mais sobre os atendimentos e agendar uma avaliação.";

function openWhatsApp(message){
  var n = String(WHATSAPP_NUMBER).replace(/\D/g, "");

  if (!n || /0{7,}/.test(n) || n.length < 11){
    alert("⚠ Site em configuração:\n\nDefina o número real do WhatsApp.");
    return;
  }

  var msg = message || DEFAULT_MSG;

  var url = "https://wa.me/" + n + "?text=" + encodeURIComponent(msg);

  window.open(url, "_blank", "noopener");
}