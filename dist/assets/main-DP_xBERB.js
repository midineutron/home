import{V as d}from"./Visualizer-BLDLWDIk.js";import{V as l}from"./three-MbgGJel_.js";const h={main:{id:"main",links:[{text:"OPEN CALL",url:"https://docs.google.com/forms/d/e/1FAIpQLSdzo1lmF7smd4cPE2YneNMzwvvgpDSgeWniHdU9JLU85TNOfA/viewform"},{text:"CONVERSATION - 8 Ball Underground Sessions",url:"https://www.youtube.com/watch?v=04tTAJXzHwM"},{text:"Artists",url:"#artists"}]},artists:{id:"artists",links:[{text:"Nakama",url:"https://linktr.ee/nakama.wtf"},{text:"Yoh",url:"https://www.yoh-holo.com/music"},{text:"Midi Neutron",url:"https://eryngii.art/midineutron"},{text:"Austin Peete",url:"https://rnsc.world/pages/austinpeete"}],showBack:!0}};class m{constructor(t,e,n){this.cards={},this.cardElements={},this.container=document.getElementById("links")||this.createLinksContainer(),this.renderer=t,this.camera=n,this.cards=h,this.targetObj=e,this.initialize()}async initialize(){this.initializeCards(),this.handleInitialRoute(),this.updatePosition(),window.addEventListener("hashchange",()=>this.handleRouteChange()),window.addEventListener("resize",()=>this.updatePosition())}createLinksContainer(){var e;const t=document.createElement("div");return t.id="links",(e=document.getElementById("container"))==null||e.appendChild(t),t}initializeCards(){Object.values(this.cards).forEach(t=>{const e=this.createCard(t);e.style.opacity="0",e.style.display="none",this.cardElements[t.id]=e,this.container.appendChild(e)})}createCard(t){const e=document.createElement("div");e.className="card";const n=document.createElement("div");if(n.className="card-title",n.textContent="IMMINENT DOMAIN PROJECT",e.appendChild(n),t.links.forEach(i=>{const a=document.createElement("div");a.className="link-button";const r=document.createElement("a");r.href=i.url,r.textContent=i.text,a.appendChild(r),e.appendChild(a)}),t.showBack){const i=document.createElement("div");i.className="link-button back-button",i.innerHTML='<a href="#main">← Back</a>',e.appendChild(i)}return e}handleInitialRoute(){const t=window.location.hash.slice(1)||"main";this.showCard(t)}handleRouteChange(){const t=window.location.hash.slice(1)||"main";this.cards[t]&&this.showCard(t)}showCard(t){if(!this.cards[t]||!this.cardElements[t])return;Object.values(this.cardElements).forEach(n=>{n.style.opacity="0",setTimeout(()=>{n.style.display="none"},300)});const e=this.cardElements[t];setTimeout(()=>{e.style.display="block",requestAnimationFrame(()=>{e.style.opacity="1"})},300)}updatePosition(){if(!this.targetObj)return;this.camera.updateMatrixWorld(),this.camera.updateProjectionMatrix(),this.targetObj.model.updateMatrixWorld(!0);const t=this.targetObj.model.children[0].children[5];t.updateMatrixWorld(!0);const e=new l;t.getWorldPosition(e);const n=e.clone();n.project(this.camera);const a=this.renderer.domElement.getBoundingClientRect(),r=(n.x*.5+.5)*a.width+a.left,c=(-n.y*.5+.5)*a.height+a.top;this.container.style.position="absolute",this.container.style.left=`${r}px`,this.container.style.top=`${c}px`,this.container.style.transform="translate(-50%, -50%)"}}let s=null;const u="tv";window.addEventListener("load",async()=>{s=new d,await s.setup();const o=s.getSceneManager(),t=o.getRenderer(),e=o.getActiveCamera(),n=o.getActiveSceneObjects().find(i=>i.name===u);new m(t,n,e)});window.addEventListener("resize",()=>{s&&(s.sceneManager.renderer.setSize(window.innerWidth,window.innerHeight),s.sceneManager.camera.aspect=window.innerWidth/window.innerHeight,s.sceneManager.camera.updateProjectionMatrix())});