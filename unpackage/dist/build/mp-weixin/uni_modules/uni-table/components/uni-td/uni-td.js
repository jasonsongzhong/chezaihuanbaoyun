(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-table/components/uni-td/uni-td"],{"0070":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"uniTd",options:{virtualHost:!0},props:{width:{type:[String,Number],default:""},align:{type:String,default:"left"},rowspan:{type:[Number,String],default:1},colspan:{type:[Number,String],default:1}},data:function(){return{border:!1}},created:function(){this.root=this.getTable(),this.border=this.root.border},methods:{getTable:function(){var t=this.$parent,n=t.$options.name;while("uniTable"!==n){if(t=t.$parent,!t)return!1;n=t.$options.name}return t}}};n.default=r},"0742":function(t,n,e){"use strict";e.r(n);var r=e("d726"),u=e("e0eb");for(var i in u)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("5b7b");var o=e("828b"),a=Object(o["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);n["default"]=a.exports},"5b7b":function(t,n,e){"use strict";var r=e("f018"),u=e.n(r);u.a},d726:function(t,n,e){"use strict";e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){}));var r=function(){var t=this.$createElement;this._self._c},u=[]},e0eb:function(t,n,e){"use strict";e.r(n);var r=e("0070"),u=e.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return r[t]}))}(i);n["default"]=u.a},f018:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-table/components/uni-td/uni-td-create-component',
    {
        'uni_modules/uni-table/components/uni-td/uni-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("0742"))
        })
    },
    [['uni_modules/uni-table/components/uni-td/uni-td-create-component']]
]);
