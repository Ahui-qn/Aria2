(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Completed"],{"225c":function(e,t,c){},"34ee":function(e,t,c){"use strict";c("225c")},cc90:function(e,t,c){"use strict";c.r(t);var a=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",[c("Header",{attrs:{isShowSpeed:!1}}),c("div",{staticClass:"taskContiner"},e._l(e.showSearch("completeds"),(function(t){return c("Tables",{key:t.gid,attrs:{filename:e.getLinkName(t),filesize:e.getFileSize(t),progress:e.getProgress(t),selected:e.selected,task:t,isShowSpeed:!1},nativeOn:{click:function(c){return e.selectedSwitch(t)}}})})),1)],1)},s=[],i=c("5530"),n=c("2f62"),r=c("cfd0"),l=c("0418"),o={name:"completed",data:function(){return{}},components:{Tables:r["a"],Header:l["a"]},mounted:function(){this.updateCompleted()},beforeDestroy:function(){clearInterval(this.intervalCompletedsId),this.clearSeleted()},watch:{aria2c:function(){clearInterval(this.intervalCompletedsId),this.updateCompleted()}},computed:Object(i["a"])(Object(i["a"])(Object(i["a"])({},Object(n["e"])(["completeds","selected","aria2"])),Object(n["c"])(["getLinkName","getFileSize","getProgress","showSearch"])),{},{aria2c:function(){return this.aria2}}),methods:Object(i["a"])(Object(i["a"])({},Object(n["d"])(["selectedSwitch","clearSeleted"])),{},{updateCompleted:function(){var e=this;this.$store.dispatch("getTellStopped"),this.intervalCompletedsId=setInterval((function(){e.$store.dispatch("getTellStopped",e.intervalCompletedsId)}),1e3)}})},d=o,p=(c("34ee"),c("2877")),u=Object(p["a"])(d,a,s,!1,null,"5907c413",null);t["default"]=u.exports}}]);
//# sourceMappingURL=Completed.0f1b6738.js.map