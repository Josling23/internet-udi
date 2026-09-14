/* Meta Pixel - UDI Internet (internet-udi.com) */
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq('init','371516287277518');
fbq('track','PageView');

/* Bloquea WhatsApp si no hay direccion, y marca Lead cuando si la hay */
document.addEventListener('click', function(e){
  var t = e.target;
  if (!t || !t.closest) return;
  var a = t.closest('a.btn, a.fab');
  if (!a) return;

  var dirEl = document.getElementById('dir');
  var dir = dirEl ? String(dirEl.value || '').trim() : '';
  var err = document.getElementById('err');
  var esES = (document.documentElement.lang || 'es').indexOf('en') !== 0;

  if (dir.length < 5) {
    e.preventDefault();
    e.stopPropagation();
    if (err) {
      err.textContent = esES
        ? 'Escribe tu direccion para poder verificar que internet llega a tu casa.'
        : 'Enter your address so we can check what internet is available at your home.';
      err.style.display = 'block';
      err.style.color = '#c0392b';
      err.style.fontWeight = '600';
      err.style.marginTop = '8px';
    }
    var wrap = document.getElementById('dir-wrap');
    if (wrap && wrap.scrollIntoView) { wrap.scrollIntoView({behavior:'smooth', block:'center'}); }
    try { if (dirEl && dirEl.focus) dirEl.focus(); } catch (x) {}
    return false;
  }

  if (err) { err.textContent = ''; err.style.display = 'none'; }
  if (typeof fbq === 'function') { fbq('track','Lead'); }
}, true);
