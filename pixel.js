/* Meta Pixel - UDI Internet (internet-udi.com) */
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq('init','371516287277518');
fbq('track','PageView');

/* Direccion actual: usa getAddr() de index.html (entiende el autocompletado de Google);
   si no existe, lee el campo #dir directo */
function _udiAddr(){
  try { if (typeof getAddr === 'function') return String(getAddr() || '').trim(); } catch (x) {}
  var el = document.getElementById('dir');
  return el ? String(el.value || '').trim() : '';
}

/* Bloquea CUALQUIER boton de WhatsApp (Verificar, Obtener, burbuja, barra fija) si no hay
   direccion, y marca Lead en Meta cuando si la hay. Corre en captura: antes del onclick */
document.addEventListener('click', function(e){
  var t = e.target;
  if (!t || !t.closest) return;
  var a = t.closest('a[onclick*="goWA"], a.btn, a.fab');
  if (!a) return;

  var dir = _udiAddr();
  var err = document.getElementById('err');
  var esES = (document.documentElement.lang || 'es').indexOf('en') !== 0;

  var ok = (typeof addrOk === 'function') ? addrOk() : (dir.length >= 6);
  if (ok && typeof tipoOk === 'function' && !tipoOk()) ok = false;   /* falta casa/apto o el numero de apto */
  if (!ok) {
    e.preventDefault();
    e.stopPropagation();
    /* index.html ya sabe exactamente que falta (direccion, casa/apto o numero de apto) */
    if (typeof needAddr === 'function') { needAddr(); return false; }
    if (err) {
      err.textContent = (dir.length < 6)
        ? (esES ? 'Escribe tu direccion para poder verificar que internet llega a tu casa.' : 'Enter your address so we can check what internet is available at your home.')
        : (esES ? 'Completa los datos de tu direccion (solo Estados Unidos).' : 'Complete your address details (United States only).');
      err.style.display = 'block';
      err.style.color = '#c0392b';
      err.style.fontWeight = '600';
      err.style.marginTop = '8px';
    }
    var wrap = document.getElementById('dir-wrap');
    if (wrap && wrap.scrollIntoView) { wrap.scrollIntoView({behavior:'smooth', block:'center'}); }
    try { var d = document.getElementById('dir'); if (d && d.focus) setTimeout(function(){ d.focus(); }, 400); } catch (x) {}
    return false;
  }

  if (err) { err.textContent = ''; err.style.display = 'none'; }
  if (typeof fbq === 'function') { fbq('track','Lead'); }
}, true);
