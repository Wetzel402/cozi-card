var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};function e(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}var i=function(){return i=Object.assign||function(t){for(var e,i=1,s=arguments.length;i<s;i++)for(var r in e=arguments[i])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},i.apply(this,arguments)};function s(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}function r(t){var e="function"==typeof Symbol&&Symbol.iterator,i=e&&t[e],s=0;if(i)return i.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&s>=t.length&&(t=void 0),{value:t&&t[s++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=window,n=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),l=new WeakMap;class c{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=l.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&l.set(e,t))}return t}toString(){return this.cssText}}const h=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new c(i,t,a)},d=(t,e)=>{n?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=o.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))},u=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new c("string"==typeof t?t:t+"",void 0,a))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var p;const v=window,_=v.trustedTypes,m=_?_.emptyScript:"",f=v.reactiveElementPolyfillSupport,g={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>e!==t&&(e==e||t==t),y={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:$};class A extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const r=this[t];this[e]=s,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||y}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return d(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=y){var s;const r=this.constructor._$Ep(t,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:g).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,r=s._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=s.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:g;this._$El=r,this[r]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||$)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var b;A.finalized=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:A}),(null!==(p=v.reactiveElementVersions)&&void 0!==p?p:v.reactiveElementVersions=[]).push("1.4.2");const w=window,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,C="?"+x,H=`<${C}>`,k=document,I=(t="")=>k.createComment(t),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,M=/>/g,R=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),U=/'/g,z=/"/g,N=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),D=new WeakMap,q=k.createTreeWalker(k,129,null,!1),K=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":"",n=O;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===O?"!--"===l[1]?n=V:void 0!==l[1]?n=M:void 0!==l[2]?(N.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=R):void 0!==l[3]&&(n=R):n===R?">"===l[0]?(n=null!=r?r:O,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?R:'"'===l[3]?z:U):n===z||n===U?n=R:n===V||n===M?n=O:(n=R,r=void 0);const d=n===R&&t[e+1].startsWith("/>")?" ":"";o+=n===O?i+H:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+x+d):i+x+(-2===c?(s.push(void 0),e):d)}const a=o+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==S?S.createHTML(a):a,s]};class W{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=W.createElement(l,i),q.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=q.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(x)){const i=c[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(x),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?X:"@"===e[1]?tt:F})}else a.push({type:6,index:r})}for(const e of t)s.removeAttribute(e)}if(N.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],I()),q.nextNode(),a.push({type:2,index:++r});s.append(t[e],I())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)a.push({type:7,index:r}),t+=x.length-1}r++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){var r,o,n,a;if(e===B)return e;let l=void 0!==s?null===(r=i._$Co)||void 0===r?void 0:r[s]:i._$Cl;const c=P(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=Z(t,l._$AS(t,e.values),l,s)),e}class J{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(i,!0);q.currentNode=r;let o=q.nextNode(),n=0,a=0,l=s[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new Y(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new et(o,this,t)),this.u.push(e),l=s[++a]}n!==(null==l?void 0:l.index)&&(o=q.nextNode(),n++)}return r}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{constructor(t,e,i,s){var r;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(r=null==s?void 0:s.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),P(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==B&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==L&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=W.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.p(i);else{const t=new J(r,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=D.get(t.strings);return void 0===e&&D.set(t.strings,e=new W(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Y(this.O(I()),this.O(I()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class F{constructor(t,e,i,s,r){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Z(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Z(this,s[i+n],e,n),a===B&&(a=this._$AH[n]),o||(o=!P(a)||a!==this._$AH[n]),a===L?t=L:t!==L&&(t+=(null!=a?a:"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends F{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}const Q=E?E.emptyScript:"";class X extends F{constructor(){super(...arguments),this.type=4}j(t){t&&t!==L?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class tt extends F{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Z(this,t,e,0))&&void 0!==i?i:L)===B)return;const s=this._$AH,r=t===L&&s!==L||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==L&&(s===L||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const it=w.litHtmlPolyfillSupport;null==it||it(W,Y),(null!==(b=w.litHtmlVersions)&&void 0!==b?b:w.litHtmlVersions=[]).push("2.4.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var st,rt;class ot extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,r;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=o._$litPart$;if(void 0===n){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;o._$litPart$=n=new Y(e.insertBefore(I(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return B}}ot.finalized=!0,ot._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:ot});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:ot}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,lt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ct(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):lt(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ht(t){return ct({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt=({finisher:t,descriptor:e})=>(i,s)=>{var r;if(void 0===s){const s=null!==(r=i.originalKey)&&void 0!==r?r:i.key,o=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:{...i,key:s};return null!=t&&(o.finisher=function(e){t(e,s)}),o}{const r=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),null==t||t(r,s)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function ut(t,e){return dt({descriptor:i=>{const s={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[e]&&(this[e]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null),this[e]}}return s}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pt;const vt=null!=(null===(pt=window.HTMLSlotElement)||void 0===pt?void 0:pt.prototype.assignedElements)?(t,e)=>t.assignedElements(e):(t,e)=>t.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));function _t(t){const{slot:e,selector:i}=null!=t?t:{};return dt({descriptor:s=>({get(){var s;const r="slot"+(e?`[name=${e}]`:":not([name])"),o=null===(s=this.renderRoot)||void 0===s?void 0:s.querySelector(r),n=null!=o?vt(o,t):[];return i?n.filter((t=>t.matches(i))):n},enumerable:!0,configurable:!0})})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ft=t=>(...e)=>({_$litDirective$:t,values:e});class gt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t={},yt=ft(class extends gt{constructor(){super(...arguments),this.ot=$t}render(t,e){return e()}update(t,[e,i]){if(Array.isArray(e)){if(Array.isArray(this.ot)&&this.ot.length===e.length&&e.every(((t,e)=>t===this.ot[e])))return B}else if(this.ot===e)return B;return this.ot=Array.isArray(e)?Array.from(e):e,this.render(e,i)}});var At,bt,wt="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z",Et="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(At||(At={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(bt||(bt={}));var St=function(t,e,i,s){s=s||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r};let xt;var Ct={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},Ht={common:Ct},kt={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},It={common:kt};const Pt={en:Object.freeze({__proto__:null,common:Ct,default:Ht}),nb:Object.freeze({__proto__:null,common:kt,default:It})};function Tt(t,e="",i=""){const s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce(((t,e)=>t[e]),Pt[s])}catch(e){r=t.split(".").reduce(((t,e)=>t[e]),Pt.en)}return void 0===r&&(r=t.split(".").reduce(((t,e)=>t[e]),Pt.en)),""!==e&&""!==i&&(r=r.replace(e,i)),r}window.customCards=window.customCards||[],window.customCards.push({type:"cozi-card",name:"Cozi Card",description:"A card that works with the Cozi custom integration."});let Ot=class extends ot{constructor(){super(),this._reordering=!1,this._renderEmptySortable=!1,this._allItems=[],this._checkedItems=[],this.firstrun=!0}static async getConfigElement(){return await import("./editor-f07ec4f1.js"),document.createElement("cozi-card-editor")}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error(Tt("common.invalid_configuration"));if(!t.list||4!=t.list.length)throw new Error(Tt("common.invalid_configuration"));t.test_gui&&function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null}().setEditMode(!0),this.config=Object.assign({},t)}shouldUpdate(t){return!!this.config&&function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!0)}render(){return this._fetchData(),this.firstrun&&(console.info(`%c  COZI-CARD \n%c  ${Tt("common.version")} 2022.12.0    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),this.firstrun=!1),j`
      <ha-card>
      <div class="has-header">
      <ha-svg-icon
          class="addButton"
          .path=${"M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"}
          @click=${this._refresh}
        >
        </ha-svg-icon>
        ${this.config.name||this.config.list[1]}
      </div>
        <div class="addRow">
          <ha-svg-icon
            class="addButton"
            .path=${Et}
            .title=${this.hass.localize("ui.panel.lovelace.cards.shopping-list.add_item")}
            .itemPos=${0}
            @click=${this._addItem}
          >
          </ha-svg-icon>
          <ha-textfield
            class="addBox"
            .placeholder=${this.hass.localize("ui.panel.lovelace.cards.shopping-list.add_item")}
            .itemPos=${0}
            @keydown=${this._addKeyPress}
          ></ha-textfield>
          <ha-svg-icon
            class="reorderButton"
            .path=${"M18 21L14 17H17V7H14L18 3L22 7H19V17H22M2 19V17H12V19M2 13V11H9V13M2 7V5H6V7H2Z"}
            .title=${this.hass.localize("ui.panel.lovelace.cards.shopping-list.reorder_items")}
            @click=${this._toggleReorder}
          >
          </ha-svg-icon>
        </div>
        ${this._reordering?j`
              <div id="sortable">
                ${yt([this._allItems,this._renderEmptySortable],(()=>this._renderEmptySortable?"":this._renderItems(this._allItems)))}
              </div>
            `:this._renderItems(this._allItems)}
        ${this._checkedItems.length>0?j`
              <div class="divider"></div>
              <div class="checked">
                <span></span>
                <ha-svg-icon
                  class="clearall"
                  tabindex="0"
                  .path=${"M5,13H19V11H5M3,17H17V15H3M7,7V9H21V7"}
                  .title=${this.hass.localize("ui.panel.lovelace.cards.shopping-list.clear_items")}
                  @click=${this._clearItems}
                >
                </ha-svg-icon>
              </div>
            `:""}
      </ha-card>
    `}_renderItems(t){let e=j``;return t.forEach((t=>{"header"==t.itemType&&(e=j`${e} ${this._renderHeader(t)}`),1==t.status&&(e=j`${e} ${this._renderChecked(t)}`),0==t.status&&"header"!=t.itemType&&(e=j`${e} ${this._renderUnchecked(t)}`)})),e}_renderHeader(t){return j`
      <div class="addRow item" item=${'{"itemId": "'+t.itemId+'", "itemType": "'+t.itemType+'", "status": "'+t.status+'", "text": "'+t.text+'"}'}>
        <ha-svg-icon
            class="addButton"
            .path=${Et}
            .title=${this.hass.localize("ui.panel.lovelace.cards.shopping-list.add_item")}
            .itemPos=${t.itemPos}
            @click=${this._addItem}
          >
          </ha-svg-icon>
          <ha-textfield
            class="addBox"
            .placeholder=${t.text}
            .itemId=${t.itemId}
            .itemPos=${t.itemPos}
            @keydown=${this._addKeyPress}
          ></ha-textfield>
        ${this._reordering?j`
              <ha-svg-icon
                .title=${this.hass.localize("ui.panel.lovelace.cards.shopping-list.drag_and_drop")}
                class="reorderButton"
                .path=${wt}
              >
              </ha-svg-icon>
            `:""}
      </div>
    `}_renderUnchecked(t){return j`
      <div class="editRow" item=${'{"itemId": "'+t.itemId+'", "itemType": "'+t.itemType+'", "status": "'+t.status+'", "text": "'+t.text+'"}'}>
        <ha-checkbox
          tabindex="0"
          .checked=${t.status}
          .itemId=${t.itemId}
          @change=${this._completeItem}
        ></ha-checkbox>
        <ha-textfield
          class="item"
          .value=${t.text}
          .itemId=${t.itemId}
          @change=${this._saveEdit}
        ></ha-textfield>
        ${this._reordering?j`
              <ha-svg-icon
                .title=${this.hass.localize("ui.panel.lovelace.cards.shopping-list.drag_and_drop")}
                class="reorderButton"
                .path=${wt}
              >
              </ha-svg-icon>
            `:""}
      </div>
    `}_renderChecked(t){return j`
      <div class="editRow checked" item=${'{"itemId": "'+t.itemId+'", "itemType": "'+t.itemType+'", "status": "'+t.status+'", "text": "'+t.text+'"}'}>
        <ha-checkbox
          tabindex="0"
          .checked=${t.status}
          .itemId=${t.itemId}
          @change=${this._completeItem}
        ></ha-checkbox>
        <ha-textfield
          class="item"
          .value=${t.text}
          .itemId=${t.itemId}
          @change=${this._saveEdit}
        ></ha-textfield>
        ${this._reordering?j`
              <ha-svg-icon
                .title=${this.hass.localize("ui.panel.lovelace.cards.shopping-list.drag_and_drop")}
                class="reorderButton"
                .path=${wt}
              >
              </ha-svg-icon>
            `:""}
      </div>
    `}async _fetchData(){if(!this.hass)return;const t=[],e=[],i=(t=>t.map(((t,e)=>{let i=!1;return i="complete"==t.status,{itemId:t.itemId,itemType:t.itemType,status:i,text:t.text,itemPos:e}})))(this.hass.states["sensor.cozi_lists"].attributes.lists[this.config.list[0]].items);for(const s in i)t.push(i[s]),i[s].status&&e.push(i[s]);this._allItems=t,this._checkedItems=e}async _refresh(){await this.hass.callService("cozi","refresh")}async _completeItem(t){let e="";e=t.target.checked?"complete":"incomplete",await((t,e,i,s)=>t.callService("cozi","mark_item",{list_id:e,item_id:i,status:s}))(this.hass,this.config.list[2],t.target.itemId,e)}async _saveEdit(t){var e,i,s,r;await(e=this.hass,i=this.config.list[2],s=t.target.itemId,r=t.target.value,e.callService("cozi","edit_item",{list_id:i,item_id:s,item_text:r})),t.target.blur()}async _clearItems(){if(this.hass){const t=[];this._checkedItems.forEach((e=>{t.push(e.itemId)})),await((t,e,i)=>t.callService("cozi","remove_items",{list_id:e,item_ids:i}))(this.hass,this.config.list[2],t)}}async _addItem(t){let e=t.target.itemPos;var i,s,r,o;e>0&&(e+=1),t.target.value.length>0&&await(i=this.hass,s=this.config.list[2],r=t.target.value,o=e,i.callService("cozi","add_item",{list_id:s,item_text:r,item_pos:o})),t.target.value="",t&&t.target.focus()}_addKeyPress(t){13===t.keyCode&&this._addItem(t)}async _toggleReorder(){var t;this._reordering=!this._reordering,await this.updateComplete,this._reordering?this._createSortable():(null===(t=this._sortable)||void 0===t||t.destroy(),this._sortable=void 0)}async _createSortable(){const t=await(async()=>(xt||(xt=(await import("./sortable-6702497a.js")).default),xt))(),e=this._sortableEl;this._sortable=new t(e,{animation:150,fallbackClass:"sortable-fallback",dataIdAttr:"item",handle:"ha-svg-icon",onEnd:async t=>{if(void 0!==t.newIndex&&void 0!==t.oldIndex){var i,s,r,o,n;for(t.oldIndex!==t.newIndex&&((i=this.hass,s=this.config.list[2],r=this.config.list[1],o=JSON.parse("["+this._sortable.toArray()+"]"),n=this.config.list[3],i.callService("cozi","reorder_items",{list_id:s,list_title:r,items_list:o,list_type:n})).catch((()=>this._fetchData())),this._allItems.splice(t.newIndex,0,this._allItems.splice(t.oldIndex,1)[0])),this._renderEmptySortable=!0,await this.updateComplete;null==e?void 0:e.lastElementChild;)e.removeChild(e.lastElementChild);this._renderEmptySortable=!1}}})}static get styles(){return h`
      ha-card {
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
      }
      .has-header {
        font-family: var(--paper-font-headline_-_font-family);
        -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
        text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
        opacity: var(--dark-primary-opacity);
        padding: 0px 0px 10px 0px;
        width: 100%
      }
      .editRow,
      .addRow,
      .checked {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .item {
        margin-top: 8px;
      }
      .addButton {
        padding-right: 16px;
        padding-inline-end: 16px;
        cursor: pointer;
        direction: var(--direction);
      }
      .reorderButton {
        padding-left: 16px;
        padding-inline-start: 16px;
        cursor: pointer;
        direction: var(--direction);
      }
      ha-checkbox {
        margin-left: -12px;
        margin-inline-start: -12px;
        direction: var(--direction);
      }
      ha-textfield {
        flex-grow: 1;
      }
      .checked {
        justify-content: space-between;
        text-decoration: line-through;
        opacity: 0.6;
      }
      .checked span {
        color: var(--primary-text-color);
        font-weight: 500;
      }
      .divider {
        height: 1px;
        background-color: var(--divider-color);
        margin: 10px 0;
      }
      .clearall {
        cursor: pointer;
      }
    `}};s([ct({attribute:!1})],Ot.prototype,"hass",void 0),s([ht()],Ot.prototype,"config",void 0),s([ht()],Ot.prototype,"_allItems",void 0),s([ht()],Ot.prototype,"_checkedItems",void 0),s([ht()],Ot.prototype,"_reordering",void 0),s([ht()],Ot.prototype,"_renderEmptySortable",void 0),s([ut("#sortable")],Ot.prototype,"_sortableEl",void 0),Ot=s([at("cozi-card")],Ot);export{Ot as C,d as S,e as _,i as a,s as b,ft as c,ut as d,ct as e,h as f,L as g,ht as h,gt as i,r as j,at as k,_t as l,St as n,dt as o,ot as s,mt as t,B as x,j as y};
