parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"8UFg":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.setCanvasSize(),document.body.insertAdjacentElement("afterbegin",this.canvas),this.run()}return t.prototype.run=function(){var t=this;window.anim=window.requestAnimationFrame(function(n){return function n(i){window.anim=window.requestAnimationFrame(function(t){return n()}),t.ctx.fillRect(Math.floor(Math.random()*t.canvas.width),Math.floor(Math.random()*t.canvas.height),2,2)}()})},t.prototype.setCanvasSize=function(){var t=document.body.clientWidth,n=document.body.clientHeight;"number"==typeof window.devicePixelRatio?(this.canvas.width=t*window.devicePixelRatio,this.canvas.height=n*window.devicePixelRatio):(this.canvas.width=t,this.canvas.height=n)},t}();exports.App=t;
},{}],"LQOA":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./App"),o=document.body.querySelector("canvas");o&&o.parentNode.removeChild(o),window.cancelAnimationFrame(window.anim),window.onclick=null,console.clear(),console.log(new Date);var n=new e.App;
},{"./App":"8UFg"}]},{},["LQOA"], null)
//# sourceMappingURL=ts.863edd62.map