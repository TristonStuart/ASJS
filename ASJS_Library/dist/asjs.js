!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.asjs=e():t.asjs=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function r(t,e){let r=e.U32||new Int32Array(e);return{rtSize:r[t-4>>>2],rtId:r[t-8>>>2],gcInfo2:r[t-12>>>2],gcInfo:r[t-16>>>2],mmInfo:r[t-20>>>2]}}t.r(e),t.d(e,{api:()=>m,wasm:()=>p});let o={readCommonHeader:r,stringFromMemory:function(t,e){let o=e.U16||new Int16Array(e),n=r(t,e).rtSize/2,s="";for(let e=0;e<n;e++)s+=String.fromCharCode(o[t+2*e>>>1]);return s},arrayFromMemory:function(t,e){let r=e.U32||new Int32Array(e),o=r[t>>>2],n=r[t+12>>>2],s=[];for(let t=0;t<n;t++)s.push(r[(o>>>2)+t]);return s}};class n{constructor(t,e){this.value=t,this.typeName=e}static Struct(t){return{structure:t,isStruct:!0,type:this.type,fromMemory:this.fromMemory}}static fromMemory(t,e,r){return new this(t,this.type)}static type="Type"}class s extends n{constructor(t){super(t,s.type)}static type="i32"}class i extends n{constructor(t){"number"==typeof t&&(t=!!t),super(t,i.type)}static type="boolean"}class a extends n{constructor(t){super(t,a.type)}static fromMemory(t,e,r){return new this(o.stringFromMemory(t,e))}static type="string"}class y extends n{constructor(t){super(t,y.type)}static Struct(t){return{arrayType:t,isStruct:!0,type:this.type,fromMemory:this.fromMemory}}static fromMemory(t,e,r){let n=[],s=o.arrayFromMemory(t,e);for(let t=0;t<s.length;t++)n.push(r.arrayType.fromMemory(s[t],e,r.arrayType.isStruct?r.arrayType:{}));return n}static type="Array"}let c={_type:n,i32:s,boolean:i,string:a,Array:y};function u(t,e){return class extends t{static fromMemory(r,o){return t.fromMemory.apply(this,[r,e,o])}}}class p{constructor(t,e){let r=this;this.Exports,this.Memory,this.Table,this.Types,this.module,this.onLoad=e,function(t){return new Promise(((e,r)=>{(function(t){return WebAssembly.instantiate(t,{Date,module:{},env:{abort:function(){console.log(arguments)},seed:function(){}}})})(t).then((t=>e(t)))}))}(t).then((t=>{r.module=t,r.Exports=t.instance.exports,r.Memory=t.instance.exports.memory,r.Table=t.instance.exports.table,r.Types=function(t,e){let r={};for(let o in t)r[o]=u(t[o],e);return r}(c,r.Memory.buffer),r.onLoad(r)}))}}let m={Types:c,Utils:o};return e})()}));