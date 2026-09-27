const start = new Date('2026-09-12T16:43:00-03:00');
const $ = (id) => document.getElementById(id);
function updateCounter(){
  const diff=Math.max(0,Date.now()-start.getTime());
  const total=Math.floor(diff/1000);
  $('days').textContent=Math.floor(total/86400);
  $('hours').textContent=String(Math.floor((total%86400)/3600)).padStart(2,'0');
  $('minutes').textContent=String(Math.floor((total%3600)/60)).padStart(2,'0');
  $('seconds').textContent=String(total%60).padStart(2,'0');
}
updateCounter();setInterval(updateCounter,1000);
const observer=new IntersectionObserver((entries)=>entries.forEach((e)=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;observer.observe(el)});
const modal=$('modal'),surprise=$('surpriseBtn'),close=$('closeModal');
function toggleModal(show){modal.hidden=!show;document.body.style.overflow=show?'hidden':'';if(show)close.focus()}
surprise.addEventListener('click',()=>toggleModal(true));close.addEventListener('click',()=>toggleModal(false));
modal.addEventListener('click',(e)=>{if(e.target===modal)toggleModal(false)});document.addEventListener('keydown',(e)=>{if(e.key==='Escape')toggleModal(false)});
const lightbox=$('lightbox'),lightboxImage=$('lightboxImage'),lightboxCaption=$('lightboxCaption'),closeLightbox=$('closeLightbox');
function toggleLightbox(show,button){lightbox.hidden=!show;document.body.style.overflow=show?'hidden':'';if(show&&button){lightboxImage.src=button.dataset.full;lightboxImage.alt=button.querySelector('img').alt;lightboxCaption.textContent=button.dataset.caption;closeLightbox.focus()}if(!show)lightboxImage.src=''}
document.querySelectorAll('.photo').forEach((button)=>button.addEventListener('click',()=>toggleLightbox(true,button)));closeLightbox.addEventListener('click',()=>toggleLightbox(false));lightbox.addEventListener('click',(e)=>{if(e.target===lightbox)toggleLightbox(false)});document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&!lightbox.hidden)toggleLightbox(false)});
const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',(e)=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
let audio;
$('soundBtn').addEventListener('click',()=>{
  if(!audio){const C=window.AudioContext||window.webkitAudioContext;audio=new C();const osc=audio.createOscillator(),gain=audio.createGain();osc.type='sine';osc.frequency.value=174;gain.gain.value=.018;osc.connect(gain).connect(audio.destination);osc.start();$('soundBtn').textContent='Ⅱ';$('soundBtn').title='Pausar som ambiente'}
  else if(audio.state==='running'){audio.suspend();$('soundBtn').textContent='♪'}else{audio.resume();$('soundBtn').textContent='Ⅱ'}
});
