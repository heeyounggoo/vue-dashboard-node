webpackJsonp([10],{"5NYu":function(e,n){},IE0R:function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("7+uW"),i={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]},a=t("VU/8")({name:"App"},i,!1,null,null,null).exports,l=t("/ocq"),r=(t("IE0R"),t("lbHh")),s=t.n(r),u={name:"navi",data:function(){return{userName:"Goo heeyoung"}},methods:{linkToHome:function(){this.$router.push({path:"/"})},handleLogout:function(){s.a.remove("token"),location.reload()}}},c={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-header",[t("div",{staticClass:"logo",on:{click:e.linkToHome}},[e._v("\n    Dashboard\n    "),t("span",{staticClass:"round"},[e._v("v.1.0")])]),e._v(" "),t("el-dropdown",{attrs:{trigger:"click"}},[t("span",{staticClass:"userName"},[e._v("\n      "+e._s(e.userName)),t("i",{staticClass:"el-icon-setting",staticStyle:{"margin-right":"15px"}})]),e._v(" "),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",[e._v("사용자 정보")]),e._v(" "),t("el-dropdown-item",{nativeOn:{click:function(n){return e.handleLogout(n)}}},[e._v("Logout")])],1)],1)],1)},staticRenderFns:[]},d=t("VU/8")(u,c,!1,null,null,null).exports,p={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"sideNavi"},[n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{router:!0}},[n("el-menu-item",{attrs:{index:"1",route:{name:"TableList"}}},[n("i",{staticClass:"el-icon-edit"}),this._v("TABLE")]),this._v(" "),n("el-menu-item",{attrs:{index:"2",route:{name:"PopupRegister"}}},[n("i",{staticClass:"el-icon-edit"}),this._v("POPUP")])],1)],1)},staticRenderFns:[]},m=t("VU/8")({name:"side-navi"},p,!1,null,null,null).exports,h=(t("5NYu"),{components:{Navi:d,SideNavi:m}}),f={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"app-wrapper"},[n("side-navi"),this._v(" "),n("div",{staticClass:"container"},[n("navi"),this._v(" "),n("section",{staticClass:"app-main"},[n("router-view")],1)],1)],1)},staticRenderFns:[]},v=t("VU/8")(h,f,!1,null,null,null).exports;o.default.use(l.a);var _=[{path:"/login",component:function(){return t.e(4).then(t.bind(null,"0HId"))}},{path:"/",component:v,redirect:"/helloWorld",name:"HelloWorld",hidden:!0,children:[{path:"/",component:function(){return Promise.all([t.e(0),t.e(2)]).then(t.bind(null,"gORT"))}}]},{path:"/table",component:v,children:[{path:"list",name:"TableList",component:function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,"cUfd"))}},{path:"register",name:"TableRegister",component:function(){return Promise.all([t.e(0),t.e(5)]).then(t.bind(null,"q/SJ"))}},{path:"detail",name:"TableDetail",component:function(){return Promise.all([t.e(0),t.e(7)]).then(t.bind(null,"Z18l"))}}]},{path:"/popup",component:v,children:[{path:"register",name:"PopupRegister",component:function(){return Promise.all([t.e(0),t.e(1)]).then(t.bind(null,"h4Vs"))}},{path:"modal",name:"PopupModal",component:function(){return t.e(8).then(t.bind(null,"cHof"))}}]},{path:"/me",component:v,children:[{path:"/status",name:"MeStatus",component:function(){return Promise.all([t.e(0),t.e(3)]).then(t.bind(null,"PqG3"))}}]}],g=new l.a({routes:_}),b=t("NYxO"),N=t("mtWM"),w=t.n(N);o.default.use(b.a);var P={state:{id:"",loading:!1},mutations:{SET_ID:function(e,n){e.id=n},SET_LOGIN:function(e,n){e.loading=!1}},actions:{Login:function(e,n){var t=e.commit;w.a.post("http://localhost:3000/login",{data:n}).then(function(e){console.log("==== res ===="),console.log(e),console.log("==== res ===="),t("SET_ID",e.data.body.LOGIN_ID),s.a.set("token",e.data.body.LOGIN_ID,{expires:1})}).catch(function(e){alert("로그인 정보가 일치하지 않습니다.")}).finally(function(){t("SET_LOGIN",!1)})}}},T=new b.a.Store({modules:{user:P}}),E=t("zL8q"),L=t.n(E),R=t("wUZ8"),C=t.n(R);t("tvR6");o.default.config.productionTip=!1,o.default.use(L.a,{locale:C.a}),g.beforeEach(function(e,n,t){s.a.get("token")?"/login"===e.path?t("/"):t():"/login"===e.path?t():t("/login")}),new o.default({el:"#app",router:g,store:T,render:function(e){return e(a)}})},tvR6:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.3f59268a7ed70cb50a34.js.map