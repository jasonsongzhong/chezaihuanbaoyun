(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tabBar4"],{"0e9d":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={props:{currentPage:{type:String,default:"index"}},data:function(){return{tabBar:[{url:"index",text:"短模板",imgNormal:"../static/index_change.png",imgClick:"../static/index.png"},{url:"longIndex",text:"长模板",imgNormal:"../static/index_change.png",imgClick:"../static/index.png"},{url:"other",text:"其他示例",imgNormal:"../static/index_change.png",imgClick:"../static/index.png"}]}},created:function(){t.hideTabBar({})},computed:{},methods:{navTo:function(n){if(n.url!==this.currentPage){var e="/pages/".concat(n.url,"/").concat(n.url);t.switchTab({url:e})}else this.$parent.toTop()}}};n.default=e}).call(this,e("df3c")["default"])},"6ac1":function(t,n,e){"use strict";var a=e("a4fa"),i=e.n(a);i.a},a4fa:function(t,n,e){},bde6:function(t,n,e){"use strict";e.r(n);var a=e("d9fb"),i=e("dbf4");for(var c in i)["default"].indexOf(c)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(c);e("6ac1");var r=e("828b"),u=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"24545822",null,!1,a["a"],void 0);n["default"]=u.exports},d9fb:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement;this._self._c},i=[]},dbf4:function(t,n,e){"use strict";e.r(n);var a=e("0e9d"),i=e.n(a);for(var c in a)["default"].indexOf(c)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(c);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tabBar4-create-component',
    {
        'components/tabBar4-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("bde6"))
        })
    },
    [['components/tabBar4-create-component']]
]);
