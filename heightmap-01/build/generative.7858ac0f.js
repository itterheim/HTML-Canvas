parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"aHPR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,i){var r=this;this.width=t,this.height=i,this.layers=10,this.data=new Array(this.width*this.height).fill(0).map(function(){return Math.floor(Math.random()*r.layers)}),console.log(this.data)}return t.prototype.render=function(t,i,r,e){for(var h=new Array(this.layers).fill(void 0).map(function(){return[]}),a=0;a<this.data.length;a++)for(var n=this.data[a],o=this.indexToXY(a),s=n;s>=0;s--)h[s].push(o);for(n=0;n<h.length;n++){var l=1+.01*n,d=t.canvas.width/2+(i-t.canvas.width/2)*l,f=t.canvas.height/2+(r-t.canvas.height/2)*l;t.fillStyle="rgba(0,0,0,"+.5*n/(this.layers-1)+")";for(var u=0,c=h[n];u<c.length;u++){o=c[u];t.fillRect(d+o[0]*e*l,f+o[1]*e*l,e*l,e*l)}}},t.prototype.indexToXY=function(t){return[t%this.width,Math.floor(t/this.width)]},t.prototype.xyToIndex=function(t,i){return i*this.width+t},t}();exports.HeightMap=t;
},{}],"UFgx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./Heightmap"),t=function(){function t(){var n=this,t=document.querySelector("canvas");t&&t.parentNode.removeChild(t),window.cancelAnimationFrame(window.anim),window.clearInterval(window.interval),window.clearTimeout(window.timeout),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),document.body.insertAdjacentElement("afterbegin",this.canvas),window.onresize=function(){return n.resize()},this.resize(),this.run()}return t.prototype.run=function(){var t=this;console.clear();var i,e=2*Math.ceil(Math.max(this.canvas.width,this.canvas.height)/30),o=[this.canvas.width,this.canvas.height].map(function(n){return Math.round(n/2)-Math.round(30*e/2)}),c=new n.HeightMap(e,e);this.canvas.onmousedown=function(n){return i=[n.clientX,n.clientY]},this.canvas.onmouseup=function(){return i=void 0},this.canvas.onmouseout=function(){return i=void 0},this.canvas.onmousemove=function(n){if(i){var t=[i[0]-n.clientX,i[1]-n.clientY];o.forEach(function(n,i){return o[i]-=t[i]}),i=[n.clientX,n.clientY]}},this.canvas.ontouchstart=function(n){return i=[n.touches[0].clientX,n.touches[0].clientY]},this.canvas.ontouchend=function(){return i=void 0},this.canvas.ontouchcancel=function(){return i=void 0},this.canvas.ontouchmove=function(n){if(i){var t=[i[0]-n.touches[0].clientX,i[1]-n.touches[0].clientY].map(function(n){return n*window.devicePixelRatio});o.forEach(function(n,i){return o[i]-=t[i]}),i=[n.touches[0].clientX,n.touches[0].clientY]}};window.anim=window.requestAnimationFrame(function(n){return function n(i){window.anim=window.requestAnimationFrame(function(t){return n()}),t.clear(),c.render(t.ctx,o[0],o[1],30)}()})},t.prototype.clear=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.resize=function(){var n=window.innerWidth,t=window.innerHeight;"number"==typeof window.devicePixelRatio?(this.canvas.width=n*window.devicePixelRatio,this.canvas.height=t*window.devicePixelRatio):(this.canvas.width=n,this.canvas.height=t)},t}();exports.App=t;
},{"./Heightmap":"aHPR"}],"dPj9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./App");console.clear(),console.log(new Date),new e.App;
},{"./App":"UFgx"}]},{},["dPj9"], null)
//# sourceMappingURL=generative.7858ac0f.js.map