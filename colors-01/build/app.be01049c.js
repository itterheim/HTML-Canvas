parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"fm/c":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){return function(t,i){void 0===t&&(t=0),void 0===i&&(i=0),this.x=t,this.y=i}}();exports.Point=t;
},{}],"6ivv":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var s=require("./RgbColor"),t=function(){function t(s,t,e){this.h=s,this.s=t,this.v=e}return t.prototype.getRgb=function(){var t,e,i,h=Math.floor(6*this.h),r=6*this.h-h,o=this.v*(1-this.s),a=this.v*(1-r*this.s),v=this.v*(1-(1-r)*this.s);switch(h%6){case 0:t=this.v,e=v,i=o;break;case 1:t=a,e=this.v,i=o;break;case 2:t=o,e=this.v,i=v;break;case 3:t=o,e=a,i=this.v;break;case 4:t=v,e=o,i=this.v;break;case 5:t=this.v,e=o,i=a}return new s.RgbColor(255*t,255*e,255*i)},t}();exports.HsvColor=t;
},{"./RgbColor":"SiVq"}],"SiVq":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=require("./HsvColor"),e=function(){function e(t,e,r){this.r=t,this.g=e,this.b=r}return e.prototype.getHsv=function(){var e,r,s=this.r/255,i=this.g/255,o=this.b/255,a=Math.max(s,i,o),n=Math.min(s,i,o),h=a,c=a-n;if(r=0===a?0:c/a,a===n)e=0;else{switch(a){case s:e=(i-o)/c+(i<o?6:0);break;case i:e=(o-s)/c+2;break;case o:e=(s-i)/c+4}e/=6}return new t.HsvColor(e,r,h)},e}();exports.RgbColor=e;
},{"./HsvColor":"6ivv"}],"ZHI3":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=require("./Point"),i=require("./RgbColor"),h=function(){function h(){this.step=10,this.canvas=document.createElement("canvas"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.ctx=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.A=new t.Point(100,100),this.B=new t.Point(100,this.canvas.height-100),this.C=new t.Point(this.canvas.width-100,this.canvas.height-100),this.D=new t.Point(this.canvas.width-100,100)}return h.prototype.render=function(t,i){void 0===i&&(i=10),this.step=i,this.reset();var h=document.createElement("canvas"),s=h.getContext("2d");h.width=t.naturalWidth,h.height=t.naturalHeight,s.drawImage(t,0,0),this.ctx.drawImage(t,this.canvas.width/2-100,20,200,200*h.height/h.width),this.renderImage(h,s)},h.prototype.reset=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.renderAxes()},h.prototype.renderImage=function(t,h){var s=this,e="",n=0;window.animation=window.requestAnimationFrame(function(){return function a(){for(var r=0;r<t.height;r+=s.step){var o=h.getImageData(n,r,1,1).data,c=new i.RgbColor(o[0],o[1],o[2]),x="("+c.r+","+c.g+","+c.b+")";-1===e.indexOf(x)&&(s.renderColor(c),e+=x)}(n+=s.step)<t.width&&(window.animation=window.requestAnimationFrame(function(){return a()}))}()})},h.prototype.renderAxes=function(){this.ctx.lineWidth=1,this.ctx.strokeStyle="#000",this.ctx.beginPath(),this.ctx.arc(this.A.x,this.A.y,5,0,2*Math.PI),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.arc(this.B.x,this.B.y,5,0,2*Math.PI),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.arc(this.C.x,this.C.y,5,0,2*Math.PI),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.arc(this.D.x,this.D.y,5,0,2*Math.PI),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(this.A.x,this.A.y),this.ctx.lineTo(this.B.x,this.B.y),this.ctx.lineTo(this.C.x,this.C.y),this.ctx.lineTo(this.D.x,this.D.y),this.ctx.stroke()},h.prototype.renderColor=function(t){var i=t.getHsv(),h=this.getPosition(i);this.ctx.beginPath(),this.ctx.fillStyle="rgba("+t.r+","+t.g+","+t.b+",0.1)",this.ctx.arc(h.x,h.y,6,0,2*Math.PI),this.ctx.fill()},h.prototype.getPosition=function(i){var h=i.h+i.s+i.v,s=new t.Point(this.A.x+i.s*(this.B.x-this.A.x),this.A.y+i.s*(this.B.y-this.A.y)),e=new t.Point(this.B.x+i.h*(this.C.x-this.B.x),this.B.y+i.h*(this.C.y-this.B.y)),n=new t.Point(this.C.x+i.v*(this.D.x-this.C.x),this.C.y+i.v*(this.D.y-this.C.y));return new t.Point((i.s*s.x+i.h*e.x+i.v*n.x)/h,(i.s*s.y+i.h*e.y+i.v*n.y)/h)},h}();exports.Renderer=h;
},{"./Point":"fm/c","./RgbColor":"SiVq"}],"vSGk":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./Renderer");window.cancelAnimationFrame(window.animation);for(var n=document.body.querySelectorAll("canvas"),r=0,a=n;r<a.length;r++){var o=a[r];o.parentNode.removeChild(o)}console.clear(),console.log(new Date);var t=new e.Renderer,i=document.querySelector("img");function d(e){return["image/gif","image/png","image/jpeg","image/bmp"].indexOf(e.type)>-1}function c(e){var n=new FileReader;n.onload=function(e){var r=new Image;r.onload=function(){t.render(r)},r.src=n.result},n.readAsDataURL(e)}i.onload=function(){t.render(i)},i.complete&&t.render(i),t.canvas.addEventListener("drop",function(e){e.preventDefault(),window.cancelAnimationFrame(window.animation);for(var n=0,r=e.dataTransfer.files;n<r.length;n++){var a=r[n];if(d(a)){c(a);break}}}),t.canvas.addEventListener("dragover",function(e){e.preventDefault()});
},{"./Renderer":"ZHI3"}]},{},["vSGk"], null)
//# sourceMappingURL=app.be01049c.map