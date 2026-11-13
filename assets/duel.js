(() => {
  'use strict';
  const card = document.querySelector('.identity');
  const key = 'portfolio-duel-record-v1';
  let record = { encountered: 0, defeated: 0 };
  try { const saved = JSON.parse(localStorage.getItem(key)); if (saved && Number.isFinite(saved.encountered) && Number.isFinite(saved.defeated)) record = saved; } catch (_) {}
  function save() {
    try { localStorage.setItem(key, JSON.stringify(record)); } catch (_) {}
    document.querySelectorAll('[data-duel-encountered]').forEach(el => { el.textContent = record.encountered; });
    document.querySelectorAll('[data-duel-defeated]').forEach(el => { el.textContent = record.defeated; });
  }
  save();
  if (!card) return;
  let active = false;
  function start(event) {
    if (active || event.target.closest('a')) return;
    active = true;
    record.encountered++; save();
    document.body.classList.add('duel-active');
    card.classList.remove('is-tilting');
    const platformElements = [...document.querySelectorAll('header, .identity, main h1, main h2, main h3, .tag, .experience-row, .button, .identity-links a, .post-row, footer')];
    let platforms = [];
    function measurePlatforms() { platforms = platformElements.map(el => el.getBoundingClientRect()).filter(r => r.width >= 35 && r.height >= 8 && r.top > 48 && r.top < innerHeight && r.right > 0 && r.left < innerWidth).map(r => ({left: Math.max(0,r.left), right: Math.min(innerWidth,r.right), top:r.top})); }
    measurePlatforms();
    const arena = document.createElement('div');
    arena.className = 'duel-arena';
    arena.innerHTML = '<canvas class="duel-canvas" aria-hidden="true"></canvas><div class="duel-hud"><span>Click to Attack, ESC to exit</span><button type="button" class="duel-exit">Exit</button></div><div class="duel-enemy-health" aria-label="Fighter health"><div><i></i></div></div><div class="duel-cursor-health" aria-hidden="true"><span>YOU</span><div><i></i></div></div><div class="duel-result" role="status" hidden></div>';
    document.body.append(arena);
    const canvas = arena.querySelector('canvas'), ctx = canvas.getContext('2d');
    const exit = arena.querySelector('.duel-exit'), result = arena.querySelector('.duel-result');
    const cursorBar = arena.querySelector('.duel-cursor-health'), cursorFill = cursorBar.querySelector('i');
    const enemyHealth = arena.querySelector('.duel-enemy-health'), enemyBar = enemyHealth.querySelector('i');
    let w = innerWidth, h = innerHeight, raf = 0, last = 0, time = 0, over = false, ending = false;
    const pointer = {x: Math.min(w - 30, event.clientX || w/2), y: Math.min(h - 30, event.clientY || h/2)};
    const spawn = card.getBoundingClientRect();
    const fighter = {x: Math.max(30,Math.min(w-30,spawn.left + spawn.width/2)), y: Math.max(55,Math.min(h-45,spawn.top-38)), vx: 0, vy: 0, hp: 100, attack: 0, next: 1, hurt: 0, grounded: false, facing: -1, jumpWait: .2};
    let hp = 100, damageCooldown = 0, lastStrike = 0;
    const effects = [];
    function resize() { w=innerWidth; h=innerHeight; const d=Math.min(devicePixelRatio||1,2); canvas.width=Math.round(w*d); canvas.height=Math.round(h*d); canvas.style.width=w+'px'; canvas.style.height=h+'px'; ctx.setTransform(d,0,0,d,0,0); measurePlatforms(); }
    function health() { cursorFill.style.width=Math.max(0,hp)+'%'; enemyBar.style.width=Math.max(0,fighter.hp)+'%'; cursorBar.style.left=Math.max(8,Math.min(w-112,pointer.x-50))+'px'; cursorBar.style.top=Math.max(65,pointer.y-47)+'px'; }
    function cleanup() { if (ending) return; ending=true; cancelAnimationFrame(raf); window.removeEventListener('resize',resize); window.removeEventListener('keydown',onKey); document.body.classList.remove('duel-active'); arena.remove(); active=false; }
    function end(win) { if(over)return; over=true; if(!win){record.defeated++; save();} result.hidden=false; cursorBar.hidden=true; enemyHealth.hidden=true; result.innerHTML=win?'<strong>Congrats!</strong><span>You defeated me.</span><button type="button">Return to the site</button>':'<strong>Defeated!</strong><span>Ha! I got you!</span><button type="button">Return to the site</button>'; result.querySelector('button').addEventListener('click',cleanup); result.querySelector('button').focus(); }
    function onKey(e){ if(e.key==='Escape'){e.preventDefault();cleanup();} }
    function move(e){pointer.x=e.clientX;pointer.y=e.clientY;health();}
    function strike(e) { if(over||e.target.closest('.duel-hud, .duel-result'))return; e.preventDefault(); move(e); const now=performance.now(); if(now-lastStrike<160)return;lastStrike=now; effects.push({x:pointer.x,y:pointer.y,r:0,life:.32}); const dx=fighter.x-pointer.x,dy=fighter.y-pointer.y; if(Math.hypot(dx,dy)<90){ fighter.hp=Math.max(0,fighter.hp-10);fighter.hurt=.22;const dist=Math.max(1,Math.hypot(dx,dy));fighter.vx+=dx/dist*200;fighter.vy+=dy/dist*200; if(fighter.hp<=0)end(true); } health(); }
    arena.addEventListener('pointermove',move); arena.addEventListener('pointerdown',strike); exit.addEventListener('click',cleanup); window.addEventListener('keydown',onKey);window.addEventListener('resize',resize);resize();health();
    function limb(points) {ctx.beginPath();ctx.moveTo(points[0],points[1]);for(let i=2;i<points.length;i+=2)ctx.lineTo(points[i],points[i+1]);ctx.stroke();}
    function drawFighter() {
      ctx.save(); ctx.translate(fighter.x,fighter.y); ctx.scale(fighter.facing,1);
      ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle=fighter.hurt>0?'#ffd2a8':'#eefdfa'; ctx.lineWidth=3.5;
      ctx.beginPath();ctx.arc(0,-24,8,0,Math.PI*2);ctx.stroke();limb([0,-16,0,10]);
      const run = fighter.grounded ? Math.sin(time*15)*Math.min(10,Math.abs(fighter.vx)/22) : 0;
      if(fighter.grounded){limb([0,10,-8-run,24,-12-run,37]);limb([0,10,8+run,24,12+run,37]);}
      else {limb([0,10,-12,21,-5,31]);limb([0,10,11,17,17,29]);}
      limb([0,-8,-12,0,-17,-9]);
      const progress=fighter.attack>0 ? 1-fighter.attack/.32 : 0;
      const ease=t=>t*t*(3-2*t);
      const swing=progress<.25 ? -.75*ease(progress/.25) : progress<.58 ? -.75+1.45*ease((progress-.25)/.33) : .7*(1-ease((progress-.58)/.42));
      ctx.save();ctx.translate(0,-8);ctx.rotate(swing);limb([0,0,13,5,21,-7]);
      ctx.strokeStyle='#8de8e0';ctx.lineWidth=4;limb([21,-7,29,-15]);ctx.strokeStyle='#e8faff';ctx.lineWidth=3;limb([27,-13,45,-35]);ctx.strokeStyle='#93dfd2';ctx.lineWidth=2;limb([23,-19,33,-9]);ctx.restore();
      if(fighter.attack>0 && progress>=.25 && progress<=.58){ctx.strokeStyle='rgba(150,247,231,'+(Math.sin((progress-.25)/.33*Math.PI)*.55)+')';ctx.lineWidth=3;ctx.beginPath();ctx.arc(4,-4,55,-1.25,.2);ctx.stroke();} ctx.restore();
    }
    function frame(ts){
      if(ending)return; const dt=Math.min((ts-(last||ts))/1000,.033);last=ts;time+=dt;ctx.clearRect(0,0,w,h);
      if(!over){
        const dx=pointer.x-fighter.x,dy=pointer.y-fighter.y;const dist=Math.hypot(dx,dy);
        fighter.hurt=Math.max(0,fighter.hurt-dt);damageCooldown=Math.max(0,damageCooldown-dt);fighter.attack=Math.max(0,fighter.attack-dt);fighter.next-=dt;fighter.jumpWait-=dt;
        if(Math.abs(dx)>8)fighter.facing=dx>0?1:-1;
        const targetV=Math.max(-245,Math.min(245,dx*2.1));fighter.vx+=(targetV-fighter.vx)*Math.min(1,dt*(fighter.grounded?9:3.8));
        if(fighter.grounded && fighter.jumpWait<=0 && (dy < -35 || Math.abs(dx)>75 || Math.random()<.012)){
          fighter.vy=-Math.min(670,Math.max(430,470+Math.max(0,-dy)*.55));fighter.grounded=false;fighter.jumpWait=.6;
        }
        if(fighter.next<=0 && dist<100){fighter.next=.55;fighter.attack=.32;}
        const prevFeet=fighter.y+37;fighter.vy=Math.min(850,fighter.vy+1350*dt);fighter.x=Math.max(18,Math.min(w-18,fighter.x+fighter.vx*dt));fighter.y+=fighter.vy*dt;fighter.grounded=false;
        if(fighter.vy>=0){let landing=h-12;for(const surface of platforms){if(fighter.x+10>=surface.left && fighter.x-10<=surface.right && prevFeet<=surface.top+2 && fighter.y+37>=surface.top && surface.top<landing)landing=surface.top;}if(fighter.y+37>=landing && prevFeet<=landing+2){fighter.y=landing-37;fighter.vy=0;fighter.grounded=true;}}
        if(fighter.y>h-49){fighter.y=h-49;fighter.vy=0;fighter.grounded=true;}
        if(dist<75 && fighter.attack<=.24 && fighter.attack>=.12 && damageCooldown<=0){hp=Math.max(0,hp-15);damageCooldown=.55;health();if(hp<=0)end(false);}
      }
      effects.forEach(e=>{e.life-=dt;e.r+=260*dt;ctx.strokeStyle='rgba(128,225,213,'+Math.max(0,e.life/.32)+')';ctx.lineWidth=3;ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);ctx.stroke();});
      for(let i=effects.length-1;i>=0;i--)if(effects[i].life<=0)effects.splice(i,1);drawFighter();enemyHealth.style.left=Math.max(4,Math.min(w-74,fighter.x-35))+'px';enemyHealth.style.top=Math.max(4,fighter.y-58)+'px';raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);
  }
  card.addEventListener('click', start);
})();
