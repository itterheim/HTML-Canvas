parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Wz1A":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(t,o){void 0===t&&(t=0),void 0===o&&(o=0),this.x=t,this.y=o}return t.random=function(o){return void 0===o&&(o=1),new t(2*Math.random()*o-o,2*Math.random()*o-o)},Object.defineProperty(t.prototype,"magnitude",{get:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},enumerable:!0,configurable:!0}),t.prototype.add=function(t){this.x+=t.x,this.y+=t.y},t.prototype.round=function(){this.x=Math.round(this.x),this.y=Math.round(this.y)},t.prototype.multiply=function(t){this.x*=t,this.y*=t},t.prototype.clone=function(){return new t(this.x,this.y)},t}();exports.Vector=t;
},{}],"5Aws":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=require("./Vector"),i=function(){function i(t,i){this.x=t,this.y=i,this.in=[],this.out=null}return i.prototype.render=function(t,i){if(this.out){var e=Math.sqrt(this.out.x*this.out.x+this.out.y*this.out.y)/2,o="rgba(0,0,0,"+Math.min(e,1)+")";t.fillStyle=o,t.fillRect(this.x*i,this.y*i,i,i)}},i.prototype.getSpeed=function(){return this.out||(this.out=new t.Vector),this.out},i.prototype.addSpeed=function(t){this.in.push(t)},i.prototype.update=function(){this.in&&this.in.length>0?this.out=this.in.reduce(function(t,i){return t.add(i),t},new t.Vector):this.out=null,this.in=[]},i}();exports.Tile=i;
},{"./Vector":"Wz1A"}],"8UFg":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=require("./Tile"),i=require("./Vector"),e=function(){function e(){var t=this;this.size=100,this.scale=10,this.diffusion=.01,this.tiles=[];var i=document.querySelector("canvas");i&&i.parentNode.removeChild(i),window.cancelAnimationFrame(window.anim),window.clearInterval(window.interval),window.clearTimeout(window.timeout),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),document.body.insertAdjacentElement("afterbegin",this.canvas),window.onresize=function(){return t.resize()},this.resize(),this.scale=Math.min(this.canvas.width,this.canvas.height)/this.size,this.run()}return e.prototype.run=function(){var e=this;console.clear(),this.tiles=[];for(var s=0;s<this.size;s++)for(var n=0;n<this.size;n++){var o=new t.Tile(n,s);this.tiles.push(o)}window.anim=window.requestAnimationFrame(function(t){return function t(s){window.anim=window.requestAnimationFrame(function(i){return t()}),e.tiles[e.xy(Math.floor(e.size/2),Math.floor(e.size/2))].addSpeed(i.Vector.random(4)),e.clear(),e.update(),e.render()}()})},e.prototype.update=function(){for(var t=0,e=this.tiles;t<e.length;t++){var s=e[t],n=[this.tiles[this.xy(s.x+1,s.y+1)],this.tiles[this.xy(s.x+1,s.y-1)],this.tiles[this.xy(s.x-1,s.y+1)],this.tiles[this.xy(s.x-1,s.y-1)],this.tiles[this.xy(s.x+1,s.y)],this.tiles[this.xy(s.x-1,s.y)],this.tiles[this.xy(s.x,s.y+1)],this.tiles[this.xy(s.x,s.y-1)]].filter(function(t){return t}),o=this.diffusion*n.length,r=(l=s.getSpeed()).clone();l.multiply(1-o),r.multiply(this.diffusion);for(var h=0,a=n;h<a.length;h++){a[h].getSpeed().add(r)}}for(var c=0,d=this.tiles;c<d.length;c++){var l;if(l=(s=d[c]).getSpeed()){var u=this.getPosition(new i.Vector(s.x,s.y),l),y=this.tiles[this.xy(u.x,u.y)];y&&y.addSpeed(l)}}for(var x=0,v=this.tiles;x<v.length;x++){(s=v[x]).update()}},e.prototype.render=function(){for(var t=0,i=this.tiles;t<i.length;t++){i[t].render(this.ctx,this.scale)}},e.prototype.clear=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},e.prototype.resize=function(){var t=document.body.clientWidth,i=document.body.clientHeight;"number"==typeof window.devicePixelRatio?(this.canvas.width=t*window.devicePixelRatio,this.canvas.height=i*window.devicePixelRatio):(this.canvas.width=t,this.canvas.height=i)},e.prototype.xy=function(t,i){return t<0?-1:i<0?-1:t>=this.size?-1:t>=this.size?-1:i*this.size+t},e.prototype.getPosition=function(t,i){return t.add(i),t.round(),t.x>=this.size&&(t.x=t.x-(t.x-this.size)-1,i.x*=-1),t.y>=this.size&&(t.y=t.y-(t.y-this.size)-1,i.y*=-1),t.x<0&&(t.x*=-1,i.x*=-1),t.y<0&&(t.y*=-1,i.y*=-1),t},e}();exports.App=e;
},{"./Tile":"5Aws","./Vector":"Wz1A"}],"dPj9":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./App"),p=new e.App;
},{"./App":"8UFg"}]},{},["dPj9"], null)
//# sourceMappingURL=generative.f5335d46.map