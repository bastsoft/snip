(()=>{"use strict";function t(e,n,o){Object.keys(e).reduce(((n,i)=>("object"==typeof e[i]?t(e[i],n,o+i+"▷"):n.push(o+i),n)),n)}function e(t){const e=document.getElementById(t);e&&e.parentNode.removeChild(e)}const n="inquirer-ui-menu";function o(o,i){const s=[];t(o,s,"");const c={name:"keyname",choices:s};e(n);const r=document.createElement("ul");document.body.appendChild(r);const l={};function u(t){const e=t.keyname.split("▷");let n=o;e.reduce(((t,e)=>{const o=t[e];return"function"==typeof o&&(n=t),o}),o).call(n,i)}r.setAttribute("id",n),r.setAttribute("style","            z-index: 2147483000;            position:fixed;            list-style-type:none;            margin:0;            padding: 0;            font-family: monospace;            font-size: 14px;            cursor: pointer;            top: 0;            left: 0;            background: rgba(255, 255, 255, 0.8);            border-radius: 16px;            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);            backdrop-filter: blur(5px);            -webkit-backdrop-filter: blur(5px);            border: 1px solid rgba(255, 255, 255, 0.3);        ");let a=null,d=r;const h=function(t,o,i,s){const r=o.split("▷");a!==r[0]&&(a=null,d=t),r.length>1&&!a&&(a=r[0],d=function(t){const e=encodeURI(a).replace(/\%/g,"");let n=document.getElementById(e);if(n)return n;const o=document.createElement("li");return o.setAttribute("style","              padding: 10px;            "),o.innerHTML=a,n=document.createElement("ul"),n.id=e,n.setAttribute("style","              display: none;            "),o.appendChild(n),d.appendChild(o),o.onclick=t=>{t.stopPropagation(),"on"===n.dataset.open?(n.setAttribute("style","                  display: none;                "),n.dataset.open=""):(n.setAttribute("style","                display: block;              "),n.dataset.open="on")},n}());const p=o.replace(a+"▷","");return p.includes("▷")?a=h(d,p,i,a):function(t,o){const i=document.createElement("li");i.innerHTML=t,i.setAttribute("style","            padding: 10px;          "),i.setAttribute("onmouseover",'this.style.backgroundColor="rgba(81, 114, 201, 0.42)";'),i.setAttribute("onmouseout",'this.style.backgroundColor="rgba(255, 255, 255, 0.2)";'),i.addEventListener("click",(()=>{e(n),u&&(l[c.name]=o,u(l),u=null)}),!1),d.appendChild(i)}(p,i),s};c.choices.forEach((t=>{h(r,t,t)}))}function i(t,e){var n=document.createElement("script");return n.type="text/javascript",n.src=t,e&&(n.onreadystatechange=e,n.onload=e),n}function s(t){return new Promise((function(e,n){try{const n=String.fromCharCode(65+Math.floor(26*Math.random()))+ +new Date,o=-1!==t.indexOf("?")?"&":"?",s=i.bind(this,t+o+"callback=fun"+n)((function(){if(s.readyState&&"complete"!==s.readyState&&"loaded"!==s.readyState)return!1;s.parentNode.removeChild(s)}));window["fun"+n]=function(t){e(t),window["fun"+n]=null},document.getElementsByTagName("head")[0].appendChild(s)}catch(t){n(t)}}))}let c=null;function r(t){let e=[];const n=c[0];if("//"===t.slice(0,2)){const o=7;let i=document.evaluate(t,n||document,null,o,null);for(let t=0,n=i.snapshotLength;t<n;++t)e.push(i.snapshotItem(t))}else e=[...n.querySelectorAll(t)];return e}const l=function(t){const e=function(e,n,o){let i=4e3;return(o||{}).timeout&&(i=o.timeout),new Promise(((o,s)=>{let r=0,l=Date.now(),u=null;t.log("wait "+e),function a(){u=setTimeout((()=>{let d=n();const h=d.length>0;r>=i||h?(clearTimeout(u),h?(t.log("found "+e),c=d,o()):s()):(r=Date.now()-l,a())}),0)}()}))};return{initEl:async t=>{c=[t]},then:t=>t(c),log:async e=>{t.log(e)},wait:async t=>await new Promise((e=>setTimeout(e,t))),get:(t,n)=>e("get "+t,(()=>r(t)),n),contains:(t,n,o)=>e("contains "+t+" "+n,(()=>r(t).filter((t=>{const e=(t.innerText||"").toLowerCase(),o=(n||"").toLowerCase();return e.indexOf(o)>-1}))),o),find:async t=>{const e=[...c[0].querySelectorAll(t)];e.length>0&&(c=e)},type:async t=>{const e=t.replace(/{backspace}|{del}|{downArrow}|{end}|{enter}|{esc}|{home}|{insert}|{leftArrow}|{moveToEnd}|{moveToStart}|{pageDown}|{pageUp}|{rightArrow}|{selectAll}|{upArrow}|{alt}|{ctrl}|{meta}|{shift}]/g,"");c[0].value=e,c[0].dispatchEvent(new CustomEvent("input",{bubbles:!0}))},click:async()=>{const{left:t,bottom:e}=c[0].getBoundingClientRect();let n=new MouseEvent("click",{button:0,bubbles:!0,cancelable:!0,clientX:t,clientY:e});c[0].dispatchEvent(n)},rightclick:async()=>{const{left:t,bottom:e}=c[0].getBoundingClientRect();let n=new MouseEvent("contextmenu",{bubbles:!0,cancelable:!1,button:2,buttons:0,clientX:t,clientY:e});c[0].dispatchEvent(n)},trigger:async t=>{c[0].dispatchEvent(new Event(t))},focus:async()=>{c[0].dispatchEvent(new CustomEvent("focus",{bubbles:!0}))},focused:async()=>{c=[document.activeElement]},parent:async()=>{c=[c[0].parentElement]},last:async()=>{c=[c[c.length-1]]},siblings:async t=>{c=[c[0].parentElement],c=[...c[0].querySelectorAll(t)]},eq:async t=>{c=c.slice(t,t+1)}}};class u{constructor(){const t=this;return this._queue=[],this.isRun=!1,this.isAsynch=!1,this._queueAsynch=[],this.isRunAsynch=!1,{_add(e,n){this[e]=(...e)=>(t.runThroughQueue(n.bind(t,...e)),this)}}}runThroughQueue(t){this.isAsynch?(this._queueAsynch.push(t),this.runAsynch()):(this._queue.push(t),this.run())}runAsynch(){this._queueAsynch.length&&!this.isRunAsynch&&(this.isRunAsynch=!0,(this._queueAsynch.shift()()||(async()=>{})()).then((()=>{this.isRunAsynch=!1,this.runAsynch()})))}run(){if(this._queue.length&&!this.isRun){const t=this._queue.shift();this.isRun=!0,this.isAsynch="bound then"===t.name;const e=t();(e||{}).then&&e.then((()=>{this.isAsynch=!1,this.isRun=!1,this.run()}))}}}function a(t,e){const n=new u;for(let[t,o]of Object.entries(e))n._add(t,o);return new Proxy(n,{get:(e,n)=>(e.initEl(t),e[n])})}const d=function(t,e){return a(t,l(e))},h=function(t,e){const n=l(e);return a(t,{initEl:n.initEl,then:n.then,locator:t=>n.get(t),click:t=>"string"==typeof t?n.get(t).then((()=>n.click())):"right"===(t||{}).button?n.rightclick():n.click(),fill:(t,e)=>t&&e?n.get(t).then((()=>n.type(e))):n.type(t),type:t=>n.type(t),hover:()=>n.trigger("mouseover")})},p={log(){console.log(...arguments)}};let f={};const y={},m=function(t,e){return t?(void 0!==e&&(f[t]=e),"object"==typeof t&&(f={...f,...t}),"string"==typeof t&&void 0===e?f[t]:void 0):f};function b(t){import(t).then((t=>{o(t.default,y)}))}y.cy=d(window.document,p),y.Cypress={env:m},y.page=h(window.document,p),window.snip=function(t){t.url&&b(t.url),t.id&&function(t){(function(t,e,n){return t("https://gist.github.com/"+n+".json").then((t=>{var n={},o=e.createElement("div");o.innerHTML=t.div;for(var i=o.querySelectorAll(".gist-file .gist-data .file"),s=0;s<i.length;s++)n[t.files[s]]={html:i[s].outerHTML,text:i[s].textContent.replace("This file contains bidirectional Unicode text that may be interpreted or compiled differently than what appears below. To review, open the file in an editor that reveals hidden Unicode characters. Learn more about bidirectional Unicode characters","")};return n}))})(s,document,t.id).then((e=>{const n=e[t.file].text;b(URL.createObjectURL(new Blob([n],{type:"text/javascript"})))}))}(t),t.env&&m(t.env),t.file&&t.file.then((t=>{o(t.default,y)}))}})();