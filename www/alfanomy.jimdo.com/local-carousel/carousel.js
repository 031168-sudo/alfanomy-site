
(function(){
function init(){
 var host=document.getElementById('cc-inner') || document.body;
 if(!host || host.querySelector('.local-carousel-layer')) return;
 var data=window.__LOCAL_CAROUSEL_IMAGES__ || [];
 if(!data.length) return;
 var layer=document.createElement('div'); layer.className='local-carousel-layer';
 data.forEach(function(url,i){var d=document.createElement('div');d.className='lc-slide'+(i===0?' active':'');
      if(url.indexOf('version/1458681058/')!==-1 || url.indexOf('version/1450869939/')!==-1){
        d.style.backgroundPosition='center top';
      } else {
        d.style.backgroundPosition='center -200px';
      }
      d.style.backgroundImage='url("'+url+'")';layer.appendChild(d);});
 host.insertBefore(layer,host.firstChild);
 var slides=layer.children, i=0;
 if(slides.length>1) setInterval(function(){
   slides[i].classList.remove('active'); i=(i+1)%slides.length; slides[i].classList.add('active');
 },10000);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
