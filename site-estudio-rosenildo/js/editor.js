(function(){
  var TEXT='h1,h2,h3,h4,h5,h6,p,li,a,span,button,td,th,figcaption,blockquote,strong,em';
  document.querySelectorAll(TEXT).forEach(function(el){
    if(el.closest('#pe-bar'))return;
    if(el.children.length===0||el.childElementCount<=1){
      el.addEventListener('click',function(e){
        if(el.tagName==='A'||el.tagName==='BUTTON')e.preventDefault();
        el.setAttribute('contenteditable','true');el.focus();
      });
      el.addEventListener('mouseenter',function(){el.classList.add('pe-hover')});
      el.addEventListener('mouseleave',function(){el.classList.remove('pe-hover')});
      el.addEventListener('blur',function(){el.removeAttribute('contenteditable')});
    }
  });
  var fileInput=document.getElementById('pe-file'),currentImg=null;
  document.querySelectorAll('img').forEach(function(img){
    img.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();currentImg=img;fileInput.click()});
    img.addEventListener('mouseenter',function(){img.classList.add('pe-hover')});
    img.addEventListener('mouseleave',function(){img.classList.remove('pe-hover')});
  });
  fileInput.addEventListener('change',function(){
    var f=fileInput.files[0];if(!f||!currentImg)return;
    var r=new FileReader();
    r.onload=function(){currentImg.src=r.result;if(currentImg.srcset)currentImg.removeAttribute('srcset')};
    r.readAsDataURL(f);fileInput.value='';
  });
  document.getElementById('pe-export').addEventListener('click',function(){
    var doc=document.documentElement.cloneNode(true);
    ['#pe-bar','#pe-style','#pe-script','#pe-file'].forEach(function(s){var n=doc.querySelector(s);if(n)n.remove()});
    doc.querySelectorAll('[contenteditable]').forEach(function(n){n.removeAttribute('contenteditable')});
    doc.querySelectorAll('.pe-hover').forEach(function(n){n.classList.remove('pe-hover')});
    var html='<!DOCTYPE html>\n'+doc.outerHTML;
    var blob=new Blob([html],{type:'text/html'});
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='index.html';a.click();
  });
})();
