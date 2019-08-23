var MODSParser=function(){function t(t,e){this.eid=t,this.mods=e}return t.prototype.convert=function(){if(null==this.publication){function t(t,e){null!=e&&(n[t]=e)}var e=this.eid,r=this.mods,n={id:e,type:this.findType(r),title:this.xtitle(r.titleInfo),year:null,ext:{}};try{t("author",this.parseNames(r,["author","aut"])),t("editor",this.parseNames(r,["editor","edt"])),t("composer",this.parseNames(r,["composer"])),t("interviewer",this.parseNames(r,["interviewer"])),t("recipient",this.parseNames(r,["recipient"])),t("translator",this.parseNames(r,["translator","trl"])),t("contributor",this.parseNames(r,["contributor","ctb"]))}catch(t){console.error(t)}var i=r.originInfo?r.originInfo[0]:{},a=r.relatedItem?r.relatedItem:{},s=a.originInfo?a.originInfo:{},o=r.dateIssued?r.dateIssued:{};try{var l=r.relatedItem;if(l)for(var c in l){a=CwZ(l)[0];a.type&&"host"==a.type?t("container-author",this.parseNames(a,["author"])):a.$&&"series"==a.$.type&&t("collection-editor",this.parseNames(a,["editor"])),a.titleInfo&&(t("container-title",this.xtitle(a.titleInfo)),t("collection-title",this.text(a.titleInfo[0].partNumber)))}}catch(t){console.warn("MODS.2 ..",t.message,t.source,e)}try{var u=i.dateIssued||s.dateIssued||o,f=this.xdate(this.text(u));f&&(t("issued",f),t("year",f.year))}catch(t){console.warn("MODS.3 ..",t.message,t.source,e)}try{t("publisher-place",this.xplace(i)||this.xplace(s));var p=this.text(i.publisher||s.publisher);if(!p){var h=this.parseNames(r,["degree grantor"]);h&&h[0]&&(p=h[0].literal)}t("publisher",p)}catch(t){console.warn("MODS.4 ..",t.message,t.source,e,n)}try{var d=a.part||r.part;if(d){var g=d[0].detail;g&&g[0].$&&t(g[0].$.type,this.text(g[0].number)),d[0].extent&&t("page",this.xpage(d[0].extent[0]))}this.identify(n,a.identifier),this.identify(n,r.identifier);var x=this.text(r.abstract);x&&(n.ext.description=x);for(var _=[],m=r.subject||[],y=0;y<m.length;y++){var v=this.text(m[y].topic);this.containsObj(_,v)||_.push(v)}1<_.length&&(n.ext.keywords=_.join("; "))}catch(t){console.warn("MODS.5 ..",t.message,t.source,e)}try{if(r.location){var b=r.location[0].url,O="";O=b&&b.length?this.text(r.location[0].url[0]):this.text(r.location[0].url),t("URL",O);var N=i.dateAccessed||i.dateIssued||s.dateIssued;f=this.xdate(this.text(N));t("accessed",f),n.ext.url=[];for(var T=0;T<b.length;T++){var S=b[T],A={};for(var D in A.url=this.text(S),S.$)A[D]=S.$[D];n.ext.url.push(A)}}}catch(t){console.warn("MODS.6 ..",t.message,t.source,e)}try{var M=[];if(r.note){var F=r.note.length;for(T=0;T<F;T++)M.push(this.text(r.note[T]));n.note=M[0],n.notes=M}}catch(t){console.warn("MODS.7 (notes)..",t.message,t.source,e)}this.publication=n}return this.publication},t.prototype.findType=function(t){for(var e=null,r=null,n=null,i=t.genre||[],a=0;a<i.length;a++){var s=i[a];if(s.$&&"colwiz"==s.$.authority){n=this.text(s);break}r=this.text(s)}if(n&&(r=n),!r){for(a=0;a<i.length;a++)r=i[a];i=t.relatedItem&&t.relatedItem[0].genre||[];for(a=0;a<i.length;a++)e=i[a]}return PubType.toCSLType(r,e)},t.prototype.text=function(t){if(null==t)return null;var e=t[0];if(e){if(e._)return e._;if(e.nodeValue)return e.nodeValue}return t._?t._:t.nodeValue?t.nodeValue:t.toString()},t.prototype.xplace=function(t){if(!t)return null;var e=t.place;if(!e)return null;for(var r=0;r<e.length;r++){var n=e[r].placeTerm;if(n[0]&&(n=n[0]),n.$&&"text"==n.$.type)return this.text(n)}return e&&e[0]?this.text(e[0].placeTerm):null},t.prototype.xdate=function(t){try{if(!t)return null;var e=new Date(t),r={year:e.getFullYear()};return r.year&&6<t.length&&(r.month=e.getMonth()+1,r.day=e.getDate()),r}catch(t){return null}},t.prototype.xtitle=function(t){var e=t;if(t.length){e=t[0];for(var r=0;r<t.length;r++){var n=t[r];n.$&&"abbreviated"==n.$.type||(e=n)}}var i=this.text(e.title);if(!i)return null;var a=this.text(e.subTitle);a&&1<a.trim().length&&(i+=": "+a.trim()),i=i.trim();var s=this.text(e.nonSort);return s&&0<s.length&&(i=s+" "+i),i=i.replace(/\{|\}|\\|\$/g,""),i=i.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/<(\/)?(bold)>/gi,"<$1b>").replace(/<(\/)?(italic)>/gi,"<$1i>").replace(/<(\/)?(xref)>/gi,"<$1sup>"),i},t.prototype.identify=function(t,e){if(null==e)return!1;t.ext.idents=t.ext.idents||{};for(var r=0;r<e.length;r++)try{var n=e[r],i=n.$.type,a=this.text(n).replace("&amp;","&");switch("[object Object]"==a&&(a=""),t.ext.idents[i]=a,i){case"doi":t.DOI=a;break;case"isbn":t.ISBN=a;break;case"issn":t.ISSN=a;break;case"citekey":t.citekey=a}}catch(t){console.error(t)}},t.prototype.parseNames=function(t,e){var r=[],n=t.name;if(!n)return null;for(var i=0;i<n.length;i++){var a;if(n[i].role&&(a=this.text(n[i].role.roleTerm)),a&&"[object Object]"!=a||(a="author"),Array.isArray(e)){var s=!1;if(e.forEach(function(t){s=s||a==t}),!s)continue}else if(a!=e)continue;for(var o=n[i].namePart,l=null,c=null,u="",f=0;f<o.length;f++){var p=o[f],h=p.type?p.type:null;if("family"==h)l=this.text(p);else if("given"==h){""!=u&&(u+=" ");var d=this.text(p);1==d.length&&(d+="."),u+=d}else c=this.text(p)}l&&"others"!=l.toLowerCase()?0<u.length?r.push({family:l.trim(),given:u.trim()}):r.push({literal:l.trim(),"parse-names":!0}):c&&r.push({literal:c.trim(),"parse-names":!0})}return 0==r.length?null:r},t.prototype.xpage=function(t){if(t&&t.$){var e=t.$.unit;if(e&&"page"==e.substr(0,4)){var r=this.text(t.start);if(r){var n=this.text(t.end);return n&&(r+="-"+n),r}return this.text(t.list)}}return null},t.prototype.containsObj=function(t,e){for(var r=t.length,n=0;n<r;n++)if(t[n]===e)return!0;return!1},t}();function X2JS(u){"use strict";u=u||{},function(){void 0===u.escapeMode&&(u.escapeMode=!0);u.attributePrefix=u.attributePrefix||"_",u.arrayAccessForm=u.arrayAccessForm||"none",u.emptyNodeForm=u.emptyNodeForm||"text",void 0===u.enableToStringFunc&&(u.enableToStringFunc=!0);u.arrayAccessFormPaths=u.arrayAccessFormPaths||[],void 0===u.skipEmptyTextNodesForObj&&(u.skipEmptyTextNodesForObj=!0);void 0===u.stripWhitespaces&&(u.stripWhitespaces=!0);u.datetimeAccessFormPaths=u.datetimeAccessFormPaths||[]}(),function(){function t(t){var e=String(t);return 1===e.length&&(e="0"+e),e}"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|^\n+|(\s|\n)+$/g,"")});"function"!=typeof Date.prototype.toISOString&&(Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+t(this.getUTCMonth()+1)+"-"+t(this.getUTCDate())+"T"+t(this.getUTCHours())+":"+t(this.getUTCMinutes())+":"+t(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1e3).toFixed(3)).slice(2,5)+"Z"})}();var f={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};function p(t){var e=t.localName;return null==e&&(e=t.baseName),null!=e&&""!=e||(e=t.nodeName),e}function l(t){return"string"==typeof t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"):t}function h(t,e,r){switch(u.arrayAccessForm){case"property":t[e]instanceof Array?t[e+"_asArray"]=t[e]:t[e+"_asArray"]=[t[e]]}if(!(t[e]instanceof Array)&&0<u.arrayAccessFormPaths.length){for(var n=0;n<u.arrayAccessFormPaths.length;n++){var i=u.arrayAccessFormPaths[n];if("string"==typeof i){if(i==r)break}else if(i instanceof RegExp){if(i.test(r))break}else if("function"==typeof i&&i(t,e,r))break}n!=u.arrayAccessFormPaths.length&&(t[e]=[t[e]])}}function d(t){var e=t.split(/[-T:+Z]/g),r=new Date(e[0],e[1]-1,e[2]),n=e[5].split(".");if(r.setHours(e[3],e[4],n[0]),1<n.length&&r.setMilliseconds(n[1]),e[6]&&e[7]){var i=60*e[6]+Number(e[7]),a=/\d\d-\d\d:\d\d$/.test(t)?"-":"+";i=0+("-"==a?-1*i:i),r.setMinutes(r.getMinutes()-i-r.getTimezoneOffset())}else-1!==t.indexOf("Z",t.length-1)&&(r=new Date(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds(),r.getMilliseconds())));return r}function g(t,e){if(t.nodeType==f.DOCUMENT_NODE){for(var r=new Object,n=t.childNodes,i=0;i<n.length;i++){var a=n.item(i);if(a.nodeType==f.ELEMENT_NODE){var s=p(a);r[s]=g(a,s)}}return r}if(t.nodeType==f.ELEMENT_NODE){r=new Object;r.__cnt=0;for(n=t.childNodes,i=0;i<n.length;i++){a=n.item(i),s=p(a);a.nodeType!=f.COMMENT_NODE&&(r.__cnt++,null==r[s]?(r[s]=g(a,e+"."+s),h(r,s,e+"."+s)):(null!=r[s]&&(r[s]instanceof Array||(r[s]=[r[s]],h(r,s,e+"."+s))),r[s][r[s].length]=g(a,e+"."+s)))}for(var o=0;o<t.attributes.length;o++){var l=t.attributes.item(o);r.__cnt++,r[u.attributePrefix+l.name]=l.value}var c=function(t){return t.prefix}(t);return null!=c&&""!=c&&(r.__cnt++,r.__prefix=c),null!=r["#text"]&&(r.__text=r["#text"],r.__text instanceof Array&&(r.__text=r.__text.join("\n")),u.escapeMode&&(r.__text=function(t){return t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#x2F;/g,"/")}(r.__text)),u.stripWhitespaces&&(r.__text=r.__text.trim()),delete r["#text"],"property"==u.arrayAccessForm&&delete r["#text_asArray"],r.__text=function(t,e,r){if(0<u.datetimeAccessFormPaths.length){for(var n=r.split(".#")[0],i=0;i<u.datetimeAccessFormPaths.length;i++){var a=u.datetimeAccessFormPaths[i];if("string"==typeof a){if(a==n)break}else if(a instanceof RegExp){if(a.test(n))break}else if("function"==typeof a&&a(obj,e,n))break}return i!=u.datetimeAccessFormPaths.length?d(t):t}return t}(r.__text,s,e+"."+s)),null!=r["#cdata-section"]&&(r.__cdata=r["#cdata-section"],delete r["#cdata-section"],"property"==u.arrayAccessForm&&delete r["#cdata-section_asArray"]),1==r.__cnt&&null!=r.__text?r=r.__text:0==r.__cnt&&"text"==u.emptyNodeForm?r="":1<r.__cnt&&null!=r.__text&&u.skipEmptyTextNodesForObj&&(u.stripWhitespaces&&""==r.__text||""==r.__text.trim())&&delete r.__text,delete r.__cnt,!u.enableToStringFunc||null==r.__text&&null==r.__cdata||(r.toString=function(){return(null!=this.__text?this.__text:"")+(null!=this.__cdata?this.__cdata:"")}),r}if(t.nodeType==f.TEXT_NODE||t.nodeType==f.CDATA_SECTION_NODE)return t.nodeValue}function o(t,e,r,n){var i="<"+(null!=t&&null!=t.__prefix?t.__prefix+":":"")+e;if(null!=r)for(var a=0;a<r.length;a++){var s=r[a],o=t[s];u.escapeMode&&(o=l(o)),i+=" "+s.substr(u.attributePrefix.length)+"='"+o+"'"}return i+=n?"/>":">",i}function c(t,e){return"</"+(null!=t.__prefix?t.__prefix+":":"")+e+">"}function x(t,e){return!!("property"==u.arrayAccessForm&&function(t,e){return-1!==t.indexOf(e,t.length-e.length)}(e.toString(),"_asArray")||0==e.toString().indexOf(u.attributePrefix)||0==e.toString().indexOf("__")||t[e]instanceof Function)}function _(t){var e=0;if(t instanceof Object)for(var r in t)x(t,r)||e++;return e}function m(t){var e=[];if(t instanceof Object)for(var r in t)-1==r.toString().indexOf("__")&&0==r.toString().indexOf(u.attributePrefix)&&e.push(r);return e}function y(t){var e="";return t instanceof Object?e+=function(t){var e="";return null!=t.__cdata&&(e+="<![CDATA["+t.__cdata+"]]>"),null!=t.__text&&(u.escapeMode?e+=l(t.__text):e+=t.__text),e}(t):null!=t&&(u.escapeMode?e+=l(t):e+=t),e}function v(t,e,r){var n="";if(0==t.length)n+=o(t,e,r,!0);else for(var i=0;i<t.length;i++)n+=o(t[i],e,m(t[i]),!1),n+=b(t[i]),n+=c(t[i],e);return n}function b(t){var e="",r=_(t);if(0<r)for(var n in t)if(!x(t,n)){var i=t[n],a=m(i);if(null==i||null==i)e+=o(i,n,a,!0);else if(i instanceof Object)if(i instanceof Array)e+=v(i,n,a);else if(i instanceof Date)e+=o(i,n,a,!1),e+=i.toISOString(),e+=c(i,n);else{var s=_(i);0<s||null!=i.__text||null!=i.__cdata?(e+=o(i,n,a,!1),e+=b(i),e+=c(i,n)):e+=o(i,n,a,!0)}else e+=o(i,n,a,!1),e+=y(i),e+=c(i,n)}return e+=y(t),e}this.parseXmlString=function(t){var e,r=window.ActiveXObject||"ActiveXObject"in window;if(void 0===t)return null;if(window.DOMParser){var n=new window.DOMParser,i=null;if(!r)try{i=n.parseFromString("INVALID","text/xml").childNodes[0].namespaceURI}catch(t){i=null}try{e=n.parseFromString(t,"text/xml"),null!=i&&0<e.getElementsByTagNameNS(i,"parsererror").length&&(e=null)}catch(t){e=null}}else 0==t.indexOf("<?")&&(t=t.substr(t.indexOf("?>")+2)),e=new ActiveXObject("Microsoft.XMLDOM"),e.async="false",e.loadXML(t);return e},this.asArray=function(t){return t instanceof Array?t:[t]},this.toXmlDateTime=function(t){return t instanceof Date?t.toISOString():"number"==typeof t?new Date(t).toISOString():null},this.asDateTime=function(t){return"string"==typeof t?d(t):t},this.xml2json=function(t){return g(t)},this.xml_str2json=function(t){var e=this.parseXmlString(t);return null!=e?this.xml2json(e):null},this.json2xml_str=function(t){return b(t)},this.json2xml=function(t){var e=this.json2xml_str(t);return this.parseXmlString(e)},this.getVersion=function(){return"1.1.5"}}