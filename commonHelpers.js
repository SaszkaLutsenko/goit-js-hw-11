import{i as g,s as L}from"./assets/vendor-87ec4f81.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const v=document.querySelector(".form"),l=document.querySelector("#input"),c=document.querySelector(".gallery"),n=document.querySelector(".loader");n.style.display="none";v.addEventListener("submit",a=>{a.preventDefault();const o=l.value.trim();c.innerHTML="",l.value="",n.style.display="block";const i=new URLSearchParams({key:"41777094-15d23fa072ac8c02efe5e3565",q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"});fetch(`https://pixabay.com/api/?${i}`).then(t=>{if(!t.ok)throw new Error(t.status);const e=t.headers.get("content-type");if(e&&e.includes("application/json"))return t.json();throw new Error("Invalid server response")}).then(t=>{if(n.style.display="none",!t.hits||!t.hits.length)g.error({message:"Sorry, there are no images matching your search query. Please try again!",theme:"dark",backgroundColor:"#EF4040",titleColor:"white",messageSize:"16",titleSize:"16",position:"topRight",maxWidth:430});else{const e=t.hits.reduce((s,{webformatURL:u,largeImageURL:p,tags:d,likes:m,views:y,comments:f,downloads:h})=>s+`<li class="gallery-item">
          <a class="gallery-link" href="${p}">
           <img class="gallery-image"
           src="${u}"
           alt="${d}"
           />
          </a>          
          <div class="description">
          <p>Likes:<span>${m}</span></p>
          <p>Views:<span>${y}</span></p>
          <p>Comments:<span>${f}</span></p>
          <p>Downloads:<span>${h}</span></p>
          </div> 
        </li>`,"");c.innerHTML=e,new L("ul.gallery a",{captionDelay:250,captionsData:"alt"}).refresh()}}).catch(t=>{n.style.display="none",console.log(t)})});
//# sourceMappingURL=commonHelpers.js.map
