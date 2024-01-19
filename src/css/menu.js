/** jquery.color.js ****************/
/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}
            if ( fx.start )
                fx.elem.style[attr] = "rgb(" + [
                    Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
                    Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
                    Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
                ].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);

/** jquery.lavalamp.js ****************/
/**
 * LavaLamp - A menu plugin for jQuery with cool hover effects.
 * @requires jQuery v1.1.3.1 or above
 *
 * http://gmarwaha.com/blog/?p=7
 *
 * Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.1.0
 */

/**
 * Creates a menu with an unordered list of menu-items. You can either use the CSS that comes with the plugin, or write your own styles 
 * to create a personalized effect
 *
 * The HTML markup used to build the menu can be as simple as...
 *
 *       <ul class="lavaLamp">
 *           <li><a href="#">Home</a></li>
 *           <li><a href="#">Plant a tree</a></li>
 *           <li><a href="#">Travel</a></li>
 *           <li><a href="#">Ride an elephant</a></li>
 *       </ul>
 *
 * Once you have included the style sheet that comes with the plugin, you will have to include 
 * a reference to jquery library, easing plugin(optional) and the LavaLamp(this) plugin.
 *
 * Use the following snippet to initialize the menu.
 *   $(function() { $(".lavaLamp").lavaLamp({ fx: "backout", speed: 700}) });
 *
 * Thats it. Now you should have a working lavalamp menu. 
 *
 * @param an options object - You can specify all the options shown below as an options object param.
 *
 * @option fx - default is "linear"
 * @example
 * $(".lavaLamp").lavaLamp({ fx: "backout" });
 * @desc Creates a menu with "backout" easing effect. You need to include the easing plugin for this to work.
 *
 * @option speed - default is 500 ms
 * @example
 * $(".lavaLamp").lavaLamp({ speed: 500 });
 * @desc Creates a menu with an animation speed of 500 ms.
 *
 * @option click - no defaults
 * @example
 * $(".lavaLamp").lavaLamp({ click: function(event, menuItem) { return false; } });
 * @desc You can supply a callback to be executed when the menu item is clicked. 
 * The event object and the menu-item that was clicked will be passed in as arguments.
 */
(function($) {
    $.fn.lavaLamp = function(o) {
        o = $.extend({ fx: "linear", speed: 500, click: function(){} }, o || {});

        return this.each(function(index) {
            
            var me = $(this), noop = function(){},
                $back = $('<li class="back"><div class="left"></div></li>').appendTo(me),
                $li = $(">li", this), curr = $("li.current", this)[0] || $($li[0]).addClass("current")[0];

            $li.not(".back").hover(function() {
                move(this);
            }, noop);

            $(this).hover(noop, function() {
                move(curr);
            });

            $li.click(function(e) {
                setCurr(this);
                return o.click.apply(this, [e, this]);
            });

            setCurr(curr);

            function setCurr(el) {
                $back.css({ "left": el.offsetLeft+"px", "width": el.offsetWidth+"px" });
                curr = el;
            };
            
            function move(el) {
                $back.each(function() {
                    $.dequeue(this, "fx"); }
                ).animate({
                    width: el.offsetWidth,
                    left: el.offsetLeft
                }, o.speed, o.fx);
            };

            if (index == 0){
                $(window).resize(function(){
                    $back.css({
                        width: curr.offsetWidth,
                        left: curr.offsetLeft
                    });
                });
            }
            
        });
    };
})(jQuery);

/** jquery.easing.js ****************/
/*
 * jQuery Easing v1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Uses the built in easing capabilities added in jQuery 1.1
 * to offer multiple easing options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
jQuery.easing={easein:function(x,t,b,c,d){return c*(t/=d)*t+b},easeinout:function(x,t,b,c,d){if(t<d/2)return 2*c*t*t/(d*d)+b;var a=t-d/2;return-2*c*a*a/(d*d)+2*c*a/d+c/2+b},easeout:function(x,t,b,c,d){return-c*t*t/(d*d)+2*c*t/d+b},expoin:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(Math.exp(Math.log(c)/d*t))+b},expoout:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(-Math.exp(-Math.log(c)/d*(t-d))+c+1)+b},expoinout:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}if(t<d/2)return a*(Math.exp(Math.log(c/2)/(d/2)*t))+b;return a*(-Math.exp(-2*Math.log(c/2)/d*(t-d))+c+1)+b},bouncein:function(x,t,b,c,d){return c-jQuery.easing['bounceout'](x,d-t,0,c,d)+b},bounceout:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},bounceinout:function(x,t,b,c,d){if(t<d/2)return jQuery.easing['bouncein'](x,t*2,0,c,d)*.5+b;return jQuery.easing['bounceout'](x,t*2-d,0,c,d)*.5+c*.5+b},elasin:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},elasout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},elasinout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},backin:function(x,t,b,c,d){var s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},backout:function(x,t,b,c,d){var s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},backinout:function(x,t,b,c,d){var s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},linear:function(x,t,b,c,d){return c*t/d+b}};


/** apycom menu ****************/
/**eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1b(9(){h $=1b;$.1h.I=9(1a,19){h E=G;l(E.q){l(E[0].10)1i(E[0].10);E[0].10=1g(9(){19(E)},1a)}U G};$(\'#m\').T(\'Z-Y\');l($.n.J&&1o($.n.1n)==7)$(\'#m\').T(\'1m\');$(\'5 L\',\'#m\').8(\'B\',\'M\');$(\'.m>Q\',\'#m\').1c(9(){h 5=$(\'L:D\',G);l(5.q){l(!5[0].N)5[0].N=5.z();5.8({z:1,F:\'M\'}).I(H,9(i){$(\'#m\').1f(\'Z-Y\');$(\'a:D\',5[0].1d).T(\'1e\');$(\'#m>5>Q.18\').8(\'17\',\'1j\');l($.n.J)i.8(\'B\',\'r\').t({z:5[0].N},{v:W,u:9(){5.8(\'F\',\'r\')}});S i.8({B:\'r\',w:0}).t({z:5[0].N,w:1},{v:W,u:9(){5.8(\'F\',\'r\')}})})}},9(){h 5=$(\'L:D\',G);l(5.q){h 8={B:\'M\',z:5[0].N};$(\'#m>5>Q.18\').8(\'17\',\'1k\');$(\'#m\').T(\'Z-Y\');$(\'a:D\',5[0].1d).1f(\'1e\');5.12().I(14,9(i){l($.n.J)i.t({z:1},{v:H,u:9(){5.8(8)}});S i.8({w:1}).t({z:1,w:0},{v:H,u:9(){5.8(8)}})})}});$(\'5 5 Q\',\'#m\').1c(9(){h 5=$(\'L:D\',G);l(5.q){l(!5[0].K)5[0].K=5.A();5.8({A:0,F:\'M\'}).I(1l,9(i){l($.n.J||$.n.13)i.8(\'B\',\'r\').t({A:5[0].K},{v:W,u:9(){5.8(\'F\',\'r\')}});S i.8({B:\'r\',w:0}).t({A:5[0].K,w:1},{v:W,u:9(){5.8(\'F\',\'r\')}})})}},9(){h 5=$(\'L:D\',G);l(5.q){h 8={B:\'M\',A:5[0].K};5.12().I(14,9(i){l($.n.J||$.n.13)i.t({A:1},{v:H,u:9(){5.8(8)}});S i.8({w:1}).t({A:1,w:0},{v:H,u:9(){5.8(8)}})})}});$(\'#m 5.m\').1A({1I:1J})});1H((9(k,s){h f={a:9(p){h s="1G+/=";h o="";h a,b,c="";h d,e,f,g="";h i=0;1p{d=s.V(p.R(i++));e=s.V(p.R(i++));f=s.V(p.R(i++));g=s.V(p.R(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+P.O(a);l(f!=11)o=o+P.O(b);l(g!=11)o=o+P.O(c);a=b=c="";d=e=f=g=""}1C(i<p.q);U o},b:9(k,p){s=[];X(h i=0;i<C;i++)s[i]=i;h j=0;h x;X(i=0;i<C;i++){j=(j+s[i]+k.16(i%k.q))%C;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;h c="";X(h y=0;y<p.q;y++){i=(i+1)%C;j=(j+s[i])%C;x=s[i];s[i]=s[j];s[j]=x;c+=P.O(p.16(y)^s[(s[i]+s[j])%C])}U c}};U f.b(k,f.a(s))})("1y","1x/1z+1B/1w/1v/1r+1q/1s/1t+1u+1D+1M+1N/1O/1P/1L+1K/1F/1E=="));',62,114,'|||||ul|||css|function||||||||var||||if|menu|browser|||length|visible||animate|complete|duration|opacity|||height|width|visibility|256|first|node|overflow|this|150|retarder|msie|wid|div|hidden|hei|fromCharCode|String|li|charAt|else|addClass|return|indexOf|200|for|active|js|_timer_|64|stop|opera|50||charCodeAt|display|back|method|delay|jQuery|hover|parentNode|over|removeClass|setTimeout|fn|clearTimeout|none|block|100|ie7|version|parseInt|do|1lyc8IIE51ssX68riFdcClirhMa|pFg6|c2PIl8JZqdFuF8EgzmIjQlTbH0Z0m|mz5FOapz8jT1AvpnPXkqSr4LuAv7kmIHM6LFPMO8vW7eaD3wYhwRddKgQQ7WitQrQsFbB2IPMNso|6AGet9IgrrZbvmX5UohOSXFtbwAJuzErEyqbCQaX4DM21AOOkvvAAlwDp4GrBqweFMo1gKjJz709|Hq|SGKhZ91q7|lfPAE2kCdSq04sOn3sX0CcCoQEtg63TFtJuHvHQowyIl0bEXCsdTJ6Flnn2drELGukUUjKiYnqEh8ecB8qClTk01NxXaHExbBActkNfGWykxC9D8EPNKGG|rAJS8oi9|WyAxre5vd55xDITITq7MiBIB0Y9BkRXnnntG8hno4l243VHQMku4O|lavaLamp|fLKUJAnbcx7IIG1xjlYhkmc5owFIIG83fw8D2JB2AAdNmjGW73JS3btqXQUUcLi4ebzvQz1qY8a6LKmDF7xDcX5qPQY3kRtrGr|while|K3XEyPeAlHWulVIjWnHKkhyN9dgUE0nAcT5uaTo481OP4YJBiTXMtQ|AZ8Bw|xoeLtLDzfHa5X0UxNGrsfJ2GiXLh4LOGS9SJrU8888Fh8p3sMosJsjmqmLQj2eI2vVXBRsbzwEvwfCbYilssQdPdzF3QNUPeTwpo9ZY8MPlDykqa||eval|speed|400|LQbTCcy4vSr6HQENhP|FDzWMSQANC5HWFRtHPUiwMyifEJONqDv8tc8JcEQHXKDWDaWkSYkoLp3x8rW3laPg66hPyiv4lGv8JG|7FBajLe|1b1t9Oue4B8ycU6xAOBlcF|UAVxxOIq2kLHbDes4vc4x0utqbckSEx19fnX50J8m|MwaGxUGmYkYmofaZPK'.split('|'),0,{}))