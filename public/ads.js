(function(){
  const ZONES = [
    { src: 'https://quge5.com/88/tag.min.js', zone: '198789', cfasync: 'false' },
    { src: 'https://nap5k.com/tag.min.js', zone: '10414925', cfasync: 'false' }
  ];
  let injected = false;
  function injectScripts(){
    if(injected) return; injected = true;
    try{
      ZONES.forEach(z => {
        const s = document.createElement('script');
        s.src = z.src;
        s.async = true;
        if(z.zone) s.setAttribute('data-zone', z.zone);
        if(z.cfasync) s.setAttribute('data-cfasync', z.cfasync);
        document.body.appendChild(s);
      });
    }catch(e){ console.warn('Ad injection failed', e); }
  }

  function isAboutOrContact(path){
    return /(^|\/)about\.html$/.test(path) || /(^|\/)contact\.html$/.test(path);
  }

  document.addEventListener('DOMContentLoaded', function(){
    const path = (location.pathname.split('/').pop() || 'index.html');
    if(isAboutOrContact(path)) return; // keep About & Contact ad-free

    if(path === 'tools.html'){
      // OnClick only, desktop only
      const desktopMQ = window.matchMedia && window.matchMedia('(pointer: fine) and (min-width: 900px)');
      function attachClick(){
        if(desktopMQ && !desktopMQ.matches) return; // do not attach on mobile
        const onClick = function(){ injectScripts(); document.removeEventListener('click', onClick, true); };
        document.addEventListener('click', onClick, { capture: true, passive: true });
      }
      attachClick();
      if(desktopMQ && typeof desktopMQ.addEventListener === 'function') desktopMQ.addEventListener('change', attachClick);
    } else {
      // In-Page Push for most pages (mobile + desktop): inject after small delay to avoid blocking
      setTimeout(injectScripts, 600);
    }
  });
})();
