webpackHotUpdatemojs_curve_editor(0,{42:function(t,e,i){(function(t){i(82),i(47),i(48),i(52),i(78),t.tag2("curve-editor",'<icons></icons> <div class="{this.CLASSES[\'curve-editor__left\']}"> <icon-button shape="code"></icon-button> <a href="https://github.com/legomushroom/mojs-curve-editor" target="_blank" class="{this.CLASSES[\'curve-editor__mojs-logo\']}"> <icon shape="mojs-logo"></icon> </a> </div> <div class="{this.CLASSES[\'curve-editor__right\']}"> <curve></curve> <resize-handle type="top"></resize-handle> <resize-handle type="right"></resize-handle> <resize-handle type="bottom"></resize-handle> </div>',"",'class="{this.CLASSES[\'curve-editor\']}" riot-style="{this.getStyle()}"',function(t){"use strict";function e(t){return t&&t.__esModule?t:{"default":t}}var o=this,s=i(77),r=e(s),a=i(87),n=e(a),c=i(92),d=e(c);i(43),this.CLASSES=i(56);var l=t,u=l.store;u.subscribe(this.update.bind(this)),this.on("mount",function(){(0,n["default"])(new r["default"](o.root)).on("pan",function(t){o.x=t.deltaX,o.y=t.deltaY,o.update()}).on("panend",function(t){var e=t.deltaX,i=t.deltaY,s=u.getState().present.translate;o.x=o.y=0,u.dispatch({type:"EDITOR_TRANSLATE",data:{x:s.x+e,y:s.y+i}})})}),this.getStyle=function(){var t=u.getState().present,e=t.tempResize_top,i=t.tempResize_bottom,s=t.tempResize_right;e+=t.resize_top,i+=t.resize_bottom,s+=t.resize_right,378-e<378&&(e=0),378+i<378&&(i=0),378+s<378&&(s=0),e=(0,d["default"])(e,-1),i=(0,d["default"])(i);var r=t.translate,a="height: "+(378-e+i)+"px",n="width: "+(378-s)+"px",c=(o.x||0)+r.x,l=(o.y||0)+r.y,h="transform: translate("+c+"px, "+(l+e)+"px)";return console.log(n),""+mojs.h.prefix.css+h+"; "+h+"; "+a+"; "+a+";"}})}).call(e,i(2))}});