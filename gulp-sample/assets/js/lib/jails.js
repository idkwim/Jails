define(function(){function h(a){function b(a){var b;return a.trigger("get-instance",function(a){b=a}),b||{}}return{execute:function(c,d){d=Array.prototype.slice.call(arguments),d.shift();var e=b(a.eq(0));e[c]&&e[c].apply(e,d)},broadcast:function(d,e){e=Array.prototype.slice.call(arguments),e.shift(),a.each(function(){var a=b(c(this));a[d]&&a[d].apply(a,e)})},instance:function(){return b(a.eq(0))}}}var a,c,e,d={};a={config:{templates:{type:"x-tmpl-mustache"}},context:null,start:function(b,d){c=b.base,a.context=c(document.documentElement),e=c("<i />"),c.extend(!0,a.config,b),f.start(d),a.context.addClass("ready")},refresh:function(a){f.start(a)},data:function(){return d}};var f={start:function(b){var c,d=[];b=b||a.context,c=a.config.templates.type,f.scan("partial","script[type="+c+"]",b,d),f.scan("component","[data-component]",b,d),f.scan("view","[data-view]",b,d),f.scan("controller","[data-controller]",b,d),f.scan("app","[data-app]",b,d),g.start(d)},scan:function(b,d,e,g){e=e||a.context;var h,i,j,k;i=e.get(0).querySelectorAll(d),j=i.length;for(var l=0;j>l;l++)h=c(i[l]),k=f[b],k?k(b,h,g):f.module(b,h,g)},module:function(b,c,e){var f,i,j="s";f=c.data(b),i=a[b+j][f],i=i?new i(c,d):new g[b]._class(f,c,b),e.push(i)},partial:function(b,d){var e=a.config.templates.prefix,f=d.prop("id").split(e||"tmpl-").pop();a.templates[f]=c.trim(d.html())},component:function(b,d,e){var f,h,j;f=d.data(b),h=f.replace(/\s/g,"").split(/\,/),c.each(h,function(c,f){j=a.components[f],j=j?new j(d):new g[b]._class(f,d),e.push(j)})}},g={start:function(a){for(var b=a.length,c=0;b>c;c++)a[c].init&&a[c].init();a=null},common:{_class:function(a,b){var f=this;this.name=a,b.on("get-instance",function(a,b){b(f),a.stopPropagation()}),this.get=function(a,c){var d;return d=c?b.find("[data-"+a+'*="'+c+'"]'):b.find("[data-"+a+"]"),h(d)},this.data=function(a){return a?d=a:d},this.watch=function(a,c,d){b.on(c,a,d)},this.broadcast=function(a,b){c(a).trigger(b)},this.listen=function(a,c){b.on(a,function(a,b){c.apply(b.element,[a].concat(b.args))})},this.emit=function(c,d){d=Array.prototype.slice.call(arguments),d.shift(),b.trigger(a+":"+c,{args:d,element:b.get(0)})},this.publish=function(c,d){d=Array.prototype.slice.call(arguments),d.shift(),e.trigger(a+":"+c,{args:d,element:b.get(0)})},this.subscribe=function(a,b){e.on(a,function(a,c){b.apply(c.element,[a].concat(c.args))})}}},app:{_class:function(a,b){g.common._class.apply(this,[a,b])}},controller:{_class:function(a,b){g.common._class.apply(this,[a,b])}},view:{_class:function(b,e){function m(a){return a?j[a]:null}function n(a){var b=a.html(),d=c("<div />"),e=c("<div />");return e.append(b),e.find("[data-if]").each(function(){var a=c(this),b=a.data("if");a.before("{{#"+b+"}}"),a.after("{{/"+b+"}}")}),e.find("[data-not]").each(function(){var a=c(this),b=a.data("not");a.before("{{^"+b+"}}"),a.after("{{/"+b+"}}")}),e.find("[data-each]").each(function(){var a=c(this),b=a.children().eq(0),e=a.data("each");d.empty().append(b),a.html("{{#"+e+"}}"+d.html()+"{{/"+e+"}}")}),e.find("[data-value]").each(function(){var a=c(this),b=a.data("value"),d=b.split(/\:/);d[1]?a.html("{{#"+d[1]+"}}{{"+d[0]+"}}{{/"+d[1]+"}}"):a.html("{{"+b+"}}")}),e.find("[data-out]").each(function(){c(this).before("{{#out}}").after("{{/out}}")}),c.trim(e.html().replace(/(data-attr)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g,function(a,b,c){return c}))}g.common._class.apply(this,[b,e]);var h,i,j,k,l=this;i=a.config.templates,j=a.templates,h=m(e.data("template"))||n(e),k=e.data("render"),this.template=function(a,b){return i.engine.render(m(b),a,j)},this.render=function(a,b){var c=b||h;this.partial(e,c,a)},this.partial=function(b,d,e){var g,k;e=e||{},d=j[d]||d,e&&e.done?e.done(function(a){l.partial(b,d,a)}):(g=c.extend({},e,a.filters),k=i.engine.render(d||h,g,j),b.html(k),f.start(b))},k?this.render(d):null}},model:{_class:function(a){var c={};this.name=a,this.on_update=function(){},this.data=function(a,b){return a?(c=a,b&&this.transform(b,a),this.on_update(c),void 0):c},this.size=function(){var a=0;for(var b in c)a++;return a},this.find=function(a){return c[a]},this.remove=function(a){delete c[a],this.on_update(c)},this.update=function(a,b){c[a]=b,this.on_update(c)},this.transform=function(a,b){b=b||c,b=b.push?b:[b];var f,g,d={},e=b.length;for(f=0;e>f;f++)g=b[f],d[g[a||f]]=g;count=f,c=d}}},component:{_class:function(a,b){this.name=a;var c=this;b.on("get-instance",function(a,b){b(c),a.stopPropagation()}),this.emit=function(c,d){d=Array.prototype.slice.call(arguments),d.shift(),b.trigger(a+":"+c,{args:d,element:b.get(0)})}}}},i={_class:function(){this.apps={},this.controllers={},this.views={},this.models={},this.components={},this.templates={},this.filters={},this.controller=function(a,b){this.controllers[a]=function(c,d){g.controller._class.call(this,a,c),b.call(this,c,d)}},this.component=function(a,b){this.components[a]=function(c,d){g.component._class.call(this,a,c),b.call(this,c,d)}},this.view=function(a,b){this.views[a]=function(c,d){g.view._class.call(this,a,c),b.call(this,c,d)}},this.app=function(a,b){this.apps[a]=function(c,d){g.app._class.call(this,a,c),b.call(this,c,d)}},this.filter=function(a,b){this.filters[a]=function(){return function(a,c){return b(c(a))}}},this.model=function(b,c){a.models[b]=c;var d=new g.model._class(b);return c.apply(d),d},this.filter("out",function(a){var b=c(a),d=c("<div />"),e=b.data("out");return b.html(new Function("return "+e)()),d.append(b),d.html()})}};return i._class.apply(a),a});