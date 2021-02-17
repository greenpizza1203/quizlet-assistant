(()=>{"use strict";var e={111:(e,t,n)=>{function s(e){return Array.isArray?Array.isArray(e):"[object Array]"===a(e)}function r(e){return"string"==typeof e}function i(e){return"number"==typeof e}function o(e){return"object"==typeof e}function c(e){return null!=e}function h(e){return!e.trim().length}function a(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}n.r(t),n.d(t,{default:()=>C});const l=Object.prototype.hasOwnProperty;class d{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let n=u(e);t+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function u(e){let t=null,n=null,i=null,o=1;if(r(e)||s(e))i=e,t=f(e),n=g(e);else{if(!l.call(e,"name"))throw new Error("Missing name property in key");const s=e.name;if(i=s,l.call(e,"weight")&&(o=e.weight,o<=0))throw new Error((e=>`Property 'weight' in key '${e}' must be a positive integer`)(s));t=f(s),n=g(s)}return{path:t,id:n,weight:o,src:i}}function f(e){return s(e)?e:e.split(".")}function g(e){return s(e)?e.join("."):e}var p={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(e,t){let n=[],h=!1;const l=(e,t,d)=>{if(c(e))if(t[d]){const u=e[t[d]];if(!c(u))return;if(d===t.length-1&&(r(u)||i(u)||function(e){return!0===e||!1===e||function(e){return o(e)&&null!==e}(e)&&"[object Boolean]"==a(e)}(u)))n.push(function(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)}(u));else if(s(u)){h=!0;for(let e=0,n=u.length;e<n;e+=1)l(u[e],t,d+1)}else t.length&&l(u,t,d+1)}else n.push(e)};return l(e,r(t)?t.split("."):t,0),h?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1};const y=/[^ ]+/g;class m{constructor({getFn:e=p.getFn}={}){this.norm=function(e=3){const t=new Map,n=Math.pow(10,e);return{get(e){const s=e.match(y).length;if(t.has(s))return t.get(s);const r=1/Math.sqrt(s),i=parseFloat(Math.round(r*n)/n);return t.set(s,i),i},clear(){t.clear()}}}(3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,r(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();r(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!c(e)||h(e))return;console.log(t);let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach(((t,i)=>{let o=this.getFn(e,t.path);if(c(o))if(s(o)){let e=[];const t=[{nestedArrIndex:-1,value:o}];for(;t.length;){const{nestedArrIndex:n,value:i}=t.pop();if(c(i))if(r(i)&&!h(i)){let t={v:i,i:n,n:this.norm.get(i)};e.push(t)}else s(i)&&i.forEach(((e,n)=>{t.push({nestedArrIndex:n,value:e})}))}n.$[i]=e}else if(!h(o)){let e={v:o,n:this.norm.get(o)};n.$[i]=e}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function M(e,t,{getFn:n=p.getFn}={}){const s=new m({getFn:n});return s.setKeys(e.map(u)),s.setSources(t),s.create(),s}function x(e,{errors:t=0,currentLocation:n=0,expectedLocation:s=0,distance:r=p.distance,ignoreLocation:i=p.ignoreLocation}={}){const o=t/e.length;if(i)return o;const c=Math.abs(s-n);return r?o+c/r:c?1:o}const k=32;function L(e){let t={};for(let n=0,s=e.length;n<s;n+=1){const r=e.charCodeAt(n);t[r]=(t[r]||0)|1<<s-n-1}return t}class _{constructor(e,{location:t=p.location,threshold:n=p.threshold,distance:s=p.distance,includeMatches:r=p.includeMatches,findAllMatches:i=p.findAllMatches,minMatchCharLength:o=p.minMatchCharLength,isCaseSensitive:c=p.isCaseSensitive,ignoreLocation:h=p.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:c,ignoreLocation:h},this.pattern=c?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const a=(e,t)=>{this.chunks.push({pattern:e,alphabet:L(e),startIndex:t})},l=this.pattern.length;if(l>k){let e=0;const t=l%k,n=l-t;for(;e<n;)a(this.pattern.substr(e,k),e),e+=k;if(t){const e=l-k;a(this.pattern.substr(e),e)}}else a(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return n&&(t.indices=[[0,e.length-1]]),t}const{location:s,distance:r,threshold:i,findAllMatches:o,minMatchCharLength:c,ignoreLocation:h}=this.options;let a=[],l=0,d=!1;this.chunks.forEach((({pattern:t,alphabet:u,startIndex:f})=>{const{isMatch:g,score:y,indices:m}=function(e,t,n,{location:s=p.location,distance:r=p.distance,threshold:i=p.threshold,findAllMatches:o=p.findAllMatches,minMatchCharLength:c=p.minMatchCharLength,includeMatches:h=p.includeMatches,ignoreLocation:a=p.ignoreLocation}={}){if(t.length>k)throw new Error("Pattern length exceeds max of 32.");const l=t.length,d=e.length,u=Math.max(0,Math.min(s,d));let f=i,g=u;const y=c>1||h,m=y?Array(d):[];let M;for(;(M=e.indexOf(t,g))>-1;){let e=x(t,{currentLocation:M,expectedLocation:u,distance:r,ignoreLocation:a});if(f=Math.min(e,f),g=M+l,y){let e=0;for(;e<l;)m[M+e]=1,e+=1}}g=-1;let L=[],_=1,v=l+d;const w=1<<l-1;for(let s=0;s<l;s+=1){let i=0,c=v;for(;i<c;)x(t,{errors:s,currentLocation:u+c,expectedLocation:u,distance:r,ignoreLocation:a})<=f?i=c:v=c,c=Math.floor((v-i)/2+i);v=c;let h=Math.max(1,u-c+1),p=o?d:Math.min(u+c,d)+l,M=Array(p+2);M[p+1]=(1<<s)-1;for(let i=p;i>=h;i-=1){let o=i-1,c=n[e.charCodeAt(o)];if(y&&(m[o]=+!!c),M[i]=(M[i+1]<<1|1)&c,s&&(M[i]|=(L[i+1]|L[i])<<1|1|L[i+1]),M[i]&w&&(_=x(t,{errors:s,currentLocation:o,expectedLocation:u,distance:r,ignoreLocation:a}),_<=f)){if(f=_,g=o,g<=u)break;h=Math.max(1,2*u-g)}}if(x(t,{errors:s+1,currentLocation:u,expectedLocation:u,distance:r,ignoreLocation:a})>f)break;L=M}const b={isMatch:g>=0,score:Math.max(.001,_)};if(y){const e=function(e=[],t=p.minMatchCharLength){let n=[],s=-1,r=-1,i=0;for(let o=e.length;i<o;i+=1){let o=e[i];o&&-1===s?s=i:o||-1===s||(r=i-1,r-s+1>=t&&n.push([s,r]),s=-1)}return e[i-1]&&i-s>=t&&n.push([s,i-1]),n}(m,c);e.length?h&&(b.indices=e):b.isMatch=!1}return b}(e,t,u,{location:s+f,distance:r,threshold:i,findAllMatches:o,minMatchCharLength:c,includeMatches:n,ignoreLocation:h});g&&(d=!0),l+=y,g&&m&&(a=[...a,...m])}));let u={isMatch:d,score:d?l/this.chunks.length:1};return d&&n&&(u.indices=a),u}}const v=[];function w(e,t){for(let n=0,s=v.length;n<s;n+=1){let s=v[n];if(s.condition(e,t))return new s(e,t)}return new _(e,t)}const b="$and",S=e=>!(!e.$and&&!e.$or),E=e=>({[b]:Object.keys(e).map((t=>({[t]:e[t]})))});function I(e,t){const n=e.matches;t.matches=[],c(n)&&n.forEach((e=>{if(!c(e.indices)||!e.indices.length)return;const{indices:n,value:s}=e;let r={indices:n,value:s};e.key&&(r.key=e.key.src),e.idx>-1&&(r.refIndex=e.idx),t.matches.push(r)}))}function A(e,t){t.score=e.score}class F{constructor(e,t={},n){if(this.options={...p,...t},this.options.useExtendedSearch)throw new Error("Extended search is not available");this._keyStore=new d(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof m))throw new Error("Incorrect 'index' type");this._myIndex=t||M(this.options.keys,this._docs,{getFn:this.options.getFn})}add(e){c(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=(()=>!1)){const t=[];for(let n=0,s=this._docs.length;n<s;n+=1){const r=this._docs[n];e(r,n)&&(this.removeAt(n),n-=1,s-=1,t.push(r))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:s,shouldSort:o,sortFn:c,ignoreFieldNorm:h}=this.options;let a=r(e)?r(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=p.ignoreFieldNorm}){e.forEach((e=>{let n=1;e.matches.forEach((({key:e,norm:s,score:r})=>{const i=e?e.weight:null;n*=Math.pow(0===r&&i?Number.EPSILON:r,(i||1)*(t?1:s))})),e.score=n}))}(a,{ignoreFieldNorm:h}),o&&a.sort(c),i(t)&&t>-1&&(a=a.slice(0,t)),function(e,t,{includeMatches:n=p.includeMatches,includeScore:s=p.includeScore}={}){const r=[];return n&&r.push(I),s&&r.push(A),e.map((e=>{const{idx:n}=e,s={item:t[n],refIndex:n};return r.length&&r.forEach((t=>{t(e,s)})),s}))}(a,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(e){const t=w(e,this.options),{records:n}=this._myIndex,s=[];return n.forEach((({v:e,i:n,n:r})=>{if(!c(e))return;const{isMatch:i,score:o,indices:h}=t.searchIn(e);i&&s.push({item:e,idx:n,matches:[{score:o,value:e,norm:r,indices:h}]})})),s}_searchLogical(e){throw new Error("Logical search is not available")}_searchObjectList(e){const t=w(e,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach((({$:e,i:s})=>{if(!c(e))return;let i=[];n.forEach(((n,s)=>{i.push(...this._findMatches({key:n,value:e[s],searcher:t}))})),i.length&&r.push({idx:s,item:e,matches:i})})),r}_findMatches({key:e,value:t,searcher:n}){if(!c(t))return[];let r=[];if(s(t))t.forEach((({v:t,i:s,n:i})=>{if(!c(t))return;const{isMatch:o,score:h,indices:a}=n.searchIn(t);o&&r.push({score:h,key:e,value:t,idx:s,norm:i,indices:a})}));else{const{v:s,n:i}=t,{isMatch:o,score:c,indices:h}=n.searchIn(s);o&&r.push({score:c,key:e,value:s,norm:i,indices:h})}return r}}F.version="6.4.6",F.createIndex=M,F.parseIndex=function(e,{getFn:t=p.getFn}={}){const{keys:n,records:s}=e,r=new m({getFn:t});return r.setKeys(n),r.setIndexRecords(s),r},F.config=p,F.parseQuery=function(e,t,{auto:n=!0}={}){const i=e=>{let c=Object.keys(e);const h=(e=>!!e.$path)(e);if(!h&&c.length>1&&!S(e))return i(E(e));if((e=>!s(e)&&o(e)&&!S(e))(e)){const s=h?e.$path:c[0],i=h?e.$val:e[s];if(!r(i))throw new Error((e=>`Invalid value for key ${e}`)(s));const o={keyId:g(s),pattern:i};return n&&(o.searcher=w(i,t)),o}let a={children:[],operator:c[0]};return c.forEach((t=>{const n=e[t];s(n)&&n.forEach((e=>{a.children.push(i(e))}))})),a};return S(e)||(e=E(e)),i(e)};const C=F},362:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Fuzzy=t.options=void 0;const s=n(111);t.options={includeScore:!0,ignoreLocation:!0,findAllMatches:!0,keys:["front"]},t.Fuzzy=class{constructor(){this.existing={},this.fuse=new s.default([],t.options)}addSets(e){Object.entries(e).forEach((([e,t])=>{if(!this.existing[e]){for(let{word:e,definition:n}of t)this.fuse.add({front:e,back:n}),this.fuse.add({front:n,back:e});this.existing[e]=!0}}))}search(e){const t=performance.now();let n=this.fuse.search(e,{limit:3});const s=performance.now();return console.log(`Searched ${this.fuse.getIndex().size()/2} cards in ${s-t} milliseconds.`),n.map((e=>e.item))}}},827:(e,t,n)=>{let s=new(n(362).Fuzzy);onmessage=async function({data:e}){e.sets&&s.addSets(e.sets);const t=e.fuzzy??e;"string"==typeof t&&postMessage(s.search(t))}}},t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={exports:{}};return e[s](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(827)})();