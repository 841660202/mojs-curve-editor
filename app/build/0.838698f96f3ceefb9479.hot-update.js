webpackHotUpdatemojs_curve_editor(0,{42:function(t,e,s){(function(t){s(82),s(47),s(48),s(52),s(78),t.tag2("curve-editor",'<icons></icons> <resize-handle type="top"></resize-handle> <resize-handle type="right"></resize-handle> <resize-handle type="bottom"></resize-handle> <div class="{this.CLASSES[\'curve-editor__left\']}"> <icon-button shape="code"></icon-button> <a href="https://github.com/legomushroom/mojs-curve-editor" target="_blank" class="{this.CLASSES[\'curve-editor__mojs-logo\']}"> <icon shape="mojs-logo"></icon> </a> </div> <curve adc="{this.CLASSES[\'curve-editor__right\']}"></curve>',"",'class="{this.CLASSES[\'curve-editor\']}" riot-style="{this.getStyle()}"',function(t){"use strict";function e(t){return t&&t.__esModule?t:{"default":t}}var o=this,a=s(77),i=e(a),r=s(87),n=e(r);s(43),this.CLASSES=s(56);var c=t,d=c.store;d.subscribe(this.update.bind(this)),this.on("mount",function(){(0,n["default"])(new i["default"](o.root)).on("pan",function(t){o.x=t.deltaX,o.y=t.deltaY,o.update()}).on("panend",function(t){var e=t.deltaX,s=t.deltaY,a=d.getState().present.translate;o.x=o.y=0,d.dispatch({type:"EDITOR_TRANSLATE",data:{x:a.x+e,y:a.y+s}})})}),this.getStyle=function(){var t=d.getState().present,e=t.tempResize_top;378-e<378&&(e=0);var s=Math.abs(e%378),a=parseInt(e/378);s<15?e=378*a:s>363&&(e=378*-(a+1));var i=t.translate,r="height: "+(378-e)+"px",n=(o.x||0)+i.x,c=(o.y||0)+i.y,l="transform: translate("+n+"px, "+(c+e)+"px)";return console.log(mojs.h.prefix.css),""+mojs.h.prefix.css+l+"; "+l+"; "+r}})}).call(e,s(2))}});