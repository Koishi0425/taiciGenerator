(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const E=document.getElementById("imageUpload"),x=document.getElementById("textInput"),I=document.getElementById("fontSize"),v=document.getElementById("downloadBtn"),c=document.getElementById("imageCanvas"),n=c.getContext("2d");let a=null;document.addEventListener("DOMContentLoaded",()=>{E.addEventListener("change",i=>{var s;const r=(s=i.target.files)==null?void 0:s[0];if(r){const o=new FileReader;o.onload=e=>{var t;a=new Image,a.src=(t=e.target)==null?void 0:t.result,a.onload=()=>{a&&p()}},o.readAsDataURL(r)}}),x.addEventListener("input",()=>{p()}),I.addEventListener("input",()=>{p()}),v.addEventListener("click",()=>{if(c.width&&c.height){const i=document.createElement("a");i.href=c.toDataURL("image/png"),i.download="generated_image.png",i.click()}})});function p(){if(a){const i=x.value.trim().split(`
`).filter(d=>d.trim()!==""),r=parseInt(I.value)||24;n.textAlign="center",n.textBaseline="top",n.fillStyle="black",n.strokeStyle="black",n.lineWidth=2;const s=n.measureText(i.join(" ")).width,o=r*1.8,e=i.length>1?i.length-1:0,t=e*o,l=a.width,u=a.height,L=u+t,h=Math.max(s,a.width),f=window.devicePixelRatio||1;if(c.width=h*f,c.height=L*f,n.scale(f,f),n.clearRect(0,0,c.width,c.height),n.drawImage(a,0,0,l,u),e>0)for(let d=0;d<=e;d++){const g=u+d*o;n.drawImage(a,0,u-o,l,o,0,g,h,o)}n.font=`${r}px Arial`,n.strokeStyle="black";const w=r*.5;i.forEach((d,g)=>{const y=h/2-n.measureText(d).width/2;let m;g===0?m=u-w:m=u+g*o-w,n.fillText(d,y,m),n.strokeText(d,y,m)})}}
