(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts"],{"0b1d":function(t,e,a){"use strict";a.r(e);var i=a("330b"),o=a("c362");for(var n in o)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("2e32");var r=a("828b"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"3234884c",null,!1,i["a"],void 0);e["default"]=s.exports},"2e32":function(t,e,a){"use strict";var i=a("efbe"),o=a.n(i);o.a},"330b":function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var i={qiunLoading:function(){return a.e("uni_modules/qiun-data-charts/components/qiun-loading/qiun-loading").then(a.bind(null,"e510"))},qiunError:function(){return a.e("uni_modules/qiun-data-charts/components/qiun-error/qiun-error").then(a.bind(null,"6bee"))}},o=function(){var t=this.$createElement;this._self._c},n=[]},c362:function(t,e,a){"use strict";a.r(e);var i=a("f084"),o=a.n(i);for(var n in i)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},efbe:function(t,e,a){},f084:function(t,e,a){"use strict";(function(t,i){var o=a("47a9");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("3b2d")),r=o(a("e51e")),s=o(a("5e2a"));function l(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length,a=new Array(e>1?e-1:0),i=1;i<e;i++)a[i-1]=arguments[i];for(var o in a)for(var r in a[o])a[o].hasOwnProperty(r)&&(t[r]=a[o][r]&&"object"===(0,n.default)(a[o][r])?l(Array.isArray(a[o][r])?[]:{},t[r],a[o][r]):a[o][r]);return t}function c(t){var e=t.getFullYear(),a=t.getMonth()+1,i=t.getDate();a>=1&&a<=9&&(a="0"+a),i>=0&&i<=9&&(i="0"+i);var o=e+"-"+a+"-"+i;return o}var h=null;var u={name:"qiun-data-charts",mixins:[t.mixinDatacom],props:{type:{type:String,default:null},canvasId:{type:String,default:"uchartsid"},canvas2d:{type:Boolean,default:!1},background:{type:String,default:"rgba(0,0,0,0)"},animation:{type:Boolean,default:!0},chartData:{type:Object,default:function(){return{categories:[],series:[]}}},opts:{type:Object,default:function(){return{}}},eopts:{type:Object,default:function(){return{}}},loadingType:{type:Number,default:2},errorShow:{type:Boolean,default:!0},errorReload:{type:Boolean,default:!0},errorMessage:{type:String,default:null},inScrollView:{type:Boolean,default:!1},reshow:{type:Boolean,default:!1},reload:{type:Boolean,default:!1},disableScroll:{type:Boolean,default:!1},optsWatch:{type:Boolean,default:!0},onzoom:{type:Boolean,default:!1},ontap:{type:Boolean,default:!0},ontouch:{type:Boolean,default:!1},onmouse:{type:Boolean,default:!0},onmovetip:{type:Boolean,default:!1},echartsH5:{type:Boolean,default:!1},echartsApp:{type:Boolean,default:!1},tooltipShow:{type:Boolean,default:!0},tooltipFormat:{type:String,default:void 0},tooltipCustom:{type:Object,default:void 0},startDate:{type:String,default:void 0},endDate:{type:String,default:void 0},textEnum:{type:Array,default:function(){return[]}},groupEnum:{type:Array,default:function(){return[]}},pageScrollTop:{type:Number,default:0},directory:{type:String,default:"/"},tapLegend:{type:Boolean,default:!0},menus:{type:Array,default:function(){return[]}}},data:function(){return{cid:"uchartsid",inWx:!1,inAli:!1,inTt:!1,inBd:!1,inH5:!1,inApp:!1,inWin:!1,type2d:!0,disScroll:!1,openmouse:!1,pixel:1,cWidth:375,cHeight:250,showchart:!1,echarts:!1,echartsResize:!1,uchartsOpts:{},echartsOpts:{},drawData:{},lastDrawTime:null}},created:function(){if(this.cid=this.canvasId,"uchartsid"==this.canvasId||""==this.canvasId){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",e=t.length,a="",o=0;o<32;o++)a+=t.charAt(Math.floor(Math.random()*e));this.cid=a}var n=i.getSystemInfoSync();"windows"!==n.platform&&"mac"!==n.platform||(this.inWin=!0),this.inWx=!0,!1===this.canvas2d||"windows"===n.platform||"mac"===n.platform?this.type2d=!1:(this.type2d=!0,this.pixel=n.pixelRatio),this.disScroll=this.disableScroll},mounted:function(){var t=this;this.$nextTick((function(){t.beforeInit()}));var e=this.inH5?500:200,a=this;i.onWindowResize(function(t,e){var a=!1;return function(){var i=arguments,o=this;clearTimeout(a),a&&clearTimeout(a),a=setTimeout((function(){a=!1,t.apply(o,i)}),e)}}((function(t){if(1!=a.mixinDatacomLoading){var e=a.mixinDatacomErrorMessage;null!==e&&"null"!==e&&""!==e||(a.echarts?a.echartsResize=!a.echartsResize:a.resizeHandler())}}),e))},destroyed:function(){!0===this.echarts?(delete cfe.option[this.cid],delete cfe.instance[this.cid]):(delete s.default.option[this.cid],delete s.default.instance[this.cid]),i.offWindowResize((function(){}))},watch:{chartDataProps:{handler:function(t,e){"object"===(0,n.default)(t)?JSON.stringify(t)!==JSON.stringify(e)&&(this._clearChart(),t.series&&t.series.length>0?this.beforeInit():(this.mixinDatacomLoading=!0,this.showchart=!1,this.mixinDatacomErrorMessage=null)):(this.mixinDatacomLoading=!1,this._clearChart(),this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：chartData数据类型错误")},immediate:!1,deep:!0},localdata:{handler:function(t,e){JSON.stringify(t)!==JSON.stringify(e)&&(t.length>0?this.beforeInit():(this.mixinDatacomLoading=!0,this._clearChart(),this.showchart=!1,this.mixinDatacomErrorMessage=null))},immediate:!1,deep:!0},optsProps:{handler:function(t,e){"object"===(0,n.default)(t)?JSON.stringify(t)!==JSON.stringify(e)&&!1===this.echarts&&1==this.optsWatch&&this.checkData(this.drawData):(this.mixinDatacomLoading=!1,this._clearChart(),this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：opts数据类型错误")},immediate:!1,deep:!0},eoptsProps:{handler:function(t,e){"object"===(0,n.default)(t)?JSON.stringify(t)!==JSON.stringify(e)&&!0===this.echarts&&this.checkData(this.drawData):(this.mixinDatacomLoading=!1,this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：eopts数据类型错误")},immediate:!1,deep:!0},reshow:function(t,e){var a=this;!0===t&&!1===this.mixinDatacomLoading&&setTimeout((function(){a.mixinDatacomErrorMessage=null,a.echartsResize=!a.echartsResize,a.checkData(a.drawData)}),200)},reload:function(t,e){!0===t&&(this.showchart=!1,this.mixinDatacomErrorMessage=null,this.reloading())},mixinDatacomErrorMessage:function(t,e){t&&(this.emitMsg({name:"error",params:{type:"error",errorShow:this.errorShow,msg:t,id:this.cid}}),this.errorShow&&console.log("[秋云图表组件]"+t))},errorMessage:function(t,e){t&&this.errorShow&&null!==t&&"null"!==t&&""!==t?(this.showchart=!1,this.mixinDatacomLoading=!1,this.mixinDatacomErrorMessage=t):(this.showchart=!1,this.mixinDatacomErrorMessage=null,this.reloading())}},computed:{optsProps:function(){return JSON.parse(JSON.stringify(this.opts))},eoptsProps:function(){return JSON.parse(JSON.stringify(this.eopts))},chartDataProps:function(){return JSON.parse(JSON.stringify(this.chartData))}},methods:{beforeInit:function(){this.mixinDatacomErrorMessage=null,"object"===(0,n.default)(this.chartData)&&null!=this.chartData&&void 0!==this.chartData.series&&this.chartData.series.length>0?(this.drawData=l({},this.chartData),this.mixinDatacomLoading=!1,this.showchart=!0,this.checkData(this.chartData)):this.localdata.length>0?(this.mixinDatacomLoading=!1,this.showchart=!0,this.localdataInit(this.localdata)):""!==this.collection?(this.mixinDatacomLoading=!1,this.getCloudData()):this.mixinDatacomLoading=!0},localdataInit:function(t){if(this.groupEnum.length>0)for(var e=0;e<t.length;e++)for(var a=0;a<this.groupEnum.length;a++)t[e].group===this.groupEnum[a].value&&(t[e].group=this.groupEnum[a].text);if(this.textEnum.length>0)for(var i=0;i<t.length;i++)for(var o=0;o<this.textEnum.length;o++)t[i].text===this.textEnum[o].value&&(t[i].text=this.textEnum[o].text);var n=!1,r={categories:[],series:[]},h=[],u=[];if(n=!0===this.echarts?cfe.categories.includes(this.type):s.default.categories.includes(this.type),!0===n){if(this.chartData&&this.chartData.categories&&this.chartData.categories.length>0)h=this.chartData.categories;else if(this.startDate&&this.endDate){var d=new Date(this.startDate),f=new Date(this.endDate);while(d<=f)h.push(c(d)),d=d.setDate(d.getDate()+1),d=new Date(d)}else{var p={};t.map((function(t,e){void 0==t.text||p[t.text]||(h.push(t.text),p[t.text]=!0)}))}r.categories=h}var m={};if(t.map((function(t,e){void 0==t.group||m[t.group]||(u.push({name:t.group,data:[]}),m[t.group]=!0)})),0==u.length)if(u=[{name:"默认分组",data:[]}],!0===n)for(var g=0;g<h.length;g++){for(var x=0,v=0;v<t.length;v++)t[v].text==h[g]&&(x=t[v].value);u[0].data.push(x)}else for(var D=0;D<t.length;D++)u[0].data.push({name:t[D].text,value:t[D].value});else for(var y=0;y<u.length;y++)if(h.length>0)for(var w=0;w<h.length;w++){for(var S=0,b=0;b<t.length;b++)u[y].name==t[b].group&&t[b].text==h[w]&&(S=t[b].value);u[y].data.push(S)}else for(var T=0;T<t.length;T++)u[y].name==t[T].group&&u[y].data.push(t[T].value);r.series=u,this.drawData=l({},r),this.checkData(r)},reloading:function(){!1!==this.errorReload&&(this.showchart=!1,this.mixinDatacomErrorMessage=null,""!==this.collection?(this.mixinDatacomLoading=!1,this.onMixinDatacomPropsChange(!0)):this.beforeInit())},checkData:function(t){var e=this,a=this.cid;!0===this.echarts?(cfe.option[a]=l({},this.eopts),cfe.option[a].id=a,cfe.option[a].type=this.type):this.type&&s.default.type.includes(this.type)?(s.default.option[a]=l({},s.default[this.type],this.opts),s.default.option[a].canvasId=a):(this.mixinDatacomLoading=!1,this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：props参数中type类型不正确");var i=l({},t);void 0!==i.series&&i.series.length>0&&(this.mixinDatacomErrorMessage=null,!0===this.echarts?(cfe.option[a].chartData=i,this.$nextTick((function(){e.init()}))):(s.default.option[a].categories=i.categories,s.default.option[a].series=i.series,this.$nextTick((function(){e.init()}))))},resizeHandler:function(){var t=this,e=Date.now(),a=this.lastDrawTime?this.lastDrawTime:e-3e3,o=e-a;if(!(o<1e3))i.createSelectorQuery().in(this).select("#ChartBoxId"+this.cid).boundingClientRect((function(e){t.showchart=!0,e.width>0&&e.height>0&&(e.width===t.cWidth&&e.height===t.cHeight||t.checkData(t.drawData))})).exec()},getCloudData:function(){var t=this;1!=this.mixinDatacomLoading&&(this.mixinDatacomLoading=!0,this.mixinDatacomGet().then((function(e){t.mixinDatacomResData=e.result.data,t.localdataInit(t.mixinDatacomResData)})).catch((function(e){t.mixinDatacomLoading=!1,t.showchart=!1,t.mixinDatacomErrorMessage="请求错误："+e})))},onMixinDatacomPropsChange:function(t,e){1==t&&""!==this.collection&&(this.showchart=!1,this.mixinDatacomErrorMessage=null,this._clearChart(),this.getCloudData())},_clearChart:function(){var t=this.cid;if(!0!==this.echrts&&s.default.option[t]&&s.default.option[t].context){var e=s.default.option[t].context;"object"!==(0,n.default)(e)||s.default.option[t].update||(e.clearRect(0,0,this.cWidth,this.cHeight),e.draw())}},init:function(){var t=this,e=this.cid;i.createSelectorQuery().in(this).select("#ChartBoxId"+e).boundingClientRect((function(a){a.width>0&&a.height>0?(t.mixinDatacomLoading=!1,t.showchart=!0,t.lastDrawTime=Date.now(),t.cWidth=a.width,t.cHeight=a.height,!0!==t.echarts&&(s.default.option[e].background="rgba(0,0,0,0)"==t.background?"#FFFFFF":t.background,s.default.option[e].canvas2d=t.type2d,s.default.option[e].pixelRatio=t.pixel,s.default.option[e].animation=t.animation,s.default.option[e].width=a.width*t.pixel,s.default.option[e].height=a.height*t.pixel,s.default.option[e].onzoom=t.onzoom,s.default.option[e].ontap=t.ontap,s.default.option[e].ontouch=t.ontouch,s.default.option[e].onmouse=t.openmouse,s.default.option[e].onmovetip=t.onmovetip,s.default.option[e].tooltipShow=t.tooltipShow,s.default.option[e].tooltipFormat=t.tooltipFormat,s.default.option[e].tooltipCustom=t.tooltipCustom,s.default.option[e].inScrollView=t.inScrollView,s.default.option[e].lastDrawTime=t.lastDrawTime,s.default.option[e].tapLegend=t.tapLegend),t.inH5||t.inApp?1==t.echarts?(cfe.option[e].ontap=t.ontap,cfe.option[e].onmouse=t.openmouse,cfe.option[e].tooltipShow=t.tooltipShow,cfe.option[e].tooltipFormat=t.tooltipFormat,cfe.option[e].tooltipCustom=t.tooltipCustom,cfe.option[e].lastDrawTime=t.lastDrawTime,t.echartsOpts=l({},cfe.option[e])):(s.default.option[e].rotateLock=s.default.option[e].rotate,t.uchartsOpts=l({},s.default.option[e])):(s.default.option[e]=function t(e,a){for(var i in e)e.hasOwnProperty(i)&&null!==e[i]&&"object"===(0,n.default)(e[i])?t(e[i],a):"format"===i&&"string"===typeof e[i]&&(e["formatter"]=a[e[i]]?a[e[i]]:void 0);return e}(s.default.option[e],s.default.formatter),t.mixinDatacomErrorMessage=null,t.mixinDatacomLoading=!1,t.showchart=!0,t.$nextTick((function(){if(!0===t.type2d){var o=i.createSelectorQuery().in(t);o.select("#"+e).fields({node:!0,size:!0}).exec((function(i){if(i[0]){var o=i[0].node,n=o.getContext("2d");s.default.option[e].context=n,s.default.option[e].rotateLock=s.default.option[e].rotate,s.default.instance[e]&&s.default.option[e]&&!0===s.default.option[e].update?t._updataUChart(e):(o.width=a.width*t.pixel,o.height=a.height*t.pixel,o._width=a.width*t.pixel,o._height=a.height*t.pixel,setTimeout((function(){s.default.option[e].context.restore(),s.default.option[e].context.save(),t._newChart(e)}),100))}else t.showchart=!1,t.mixinDatacomErrorMessage="参数错误：开启2d模式后，未获取到dom节点，canvas-id:"+e}))}else t.inAli&&(s.default.option[e].rotateLock=s.default.option[e].rotate),s.default.option[e].context=i.createCanvasContext(e,t),s.default.instance[e]&&s.default.option[e]&&!0===s.default.option[e].update?t._updataUChart(e):setTimeout((function(){s.default.option[e].context.restore(),s.default.option[e].context.save(),t._newChart(e)}),100)})))):(t.mixinDatacomLoading=!1,t.showchart=!1,1==t.reshow&&(t.mixinDatacomErrorMessage="布局错误：未获取到父元素宽高尺寸！canvas-id:"+e))})).exec()},saveImage:function(){i.canvasToTempFilePath({canvasId:this.cid,success:function(t){i.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){i.showToast({title:"保存成功",duration:2e3})}})}},this)},getImage:function(){var t=this;if(0==this.type2d)i.canvasToTempFilePath({canvasId:this.cid,success:function(e){t.emitMsg({name:"getImage",params:{type:"getImage",base64:e.tempFilePath}})}},this);else{var e=i.createSelectorQuery().in(this);e.select("#"+this.cid).fields({node:!0,size:!0}).exec((function(e){if(e[0]){var a=e[0].node;t.emitMsg({name:"getImage",params:{type:"getImage",base64:a.toDataURL("image/png")}})}}))}},_newChart:function(t){var e=this;1!=this.mixinDatacomLoading&&(this.showchart=!0,s.default.instance[t]=new r.default(s.default.option[t]),s.default.instance[t].addEventListener("renderComplete",(function(){e.emitMsg({name:"complete",params:{type:"complete",complete:!0,id:t}}),s.default.instance[t].delEventListener("renderComplete")})),s.default.instance[t].addEventListener("scrollLeft",(function(){e.emitMsg({name:"scrollLeft",params:{type:"scrollLeft",scrollLeft:!0,id:t}})})),s.default.instance[t].addEventListener("scrollRight",(function(){e.emitMsg({name:"scrollRight",params:{type:"scrollRight",scrollRight:!0,id:t}})})))},_updataUChart:function(t){s.default.instance[t].updateData(s.default.option[t])},_tooltipDefault:function(t,e,a,i){if(e){var o=t.data;return"object"===(0,n.default)(t.data)&&(o=t.data.value),e+" "+t.name+":"+o}return t.properties&&t.properties.name?t.properties.name:t.name+":"+t.data},_showTooltip:function(t){var e=this,a=this.cid,i=s.default.option[a].tooltipCustom;if(i&&void 0!==i&&null!==i){var o=void 0;i.x>=0&&i.y>=0&&(o={x:i.x,y:i.y+10}),s.default.instance[a].showToolTip(t,{index:i.index,offset:o,textList:i.textList,formatter:function(t,i,o,n){return"string"===typeof s.default.option[a].tooltipFormat&&s.default.formatter[s.default.option[a].tooltipFormat]?s.default.formatter[s.default.option[a].tooltipFormat](t,i,o,n):e._tooltipDefault(t,i,o,n)}})}else s.default.instance[a].showToolTip(t,{formatter:function(t,i,o,n){return"string"===typeof s.default.option[a].tooltipFormat&&s.default.formatter[s.default.option[a].tooltipFormat]?s.default.formatter[s.default.option[a].tooltipFormat](t,i,o,n):e._tooltipDefault(t,i,o,n)}})},_tap:function(t,e){var a=this,o=this.cid,n=null,r=null;if(!0===this.inScrollView||this.inAli)i.createSelectorQuery().in(this).select("#ChartBoxId"+o).boundingClientRect((function(i){t.changedTouches=[],a.inAli?t.changedTouches.unshift({x:t.detail.clientX-i.left,y:t.detail.clientY-i.top}):t.changedTouches.unshift({x:t.detail.x-i.left,y:t.detail.y-i.top-a.pageScrollTop}),e?!0===a.tooltipShow&&a._showTooltip(t):(n=s.default.instance[o].getCurrentDataIndex(t),r=s.default.instance[o].getLegendDataIndex(t),!0===a.tapLegend&&s.default.instance[o].touchLegend(t),!0===a.tooltipShow&&a._showTooltip(t),a.emitMsg({name:"getIndex",params:{type:"getIndex",event:{x:t.detail.x-i.left,y:t.detail.y-i.top},currentIndex:n,legendIndex:r,id:o,opts:s.default.instance[o].opts}}))})).exec();else e?!0===this.tooltipShow&&this._showTooltip(t):(t.changedTouches=[],t.changedTouches.unshift({x:t.detail.x-t.currentTarget.offsetLeft,y:t.detail.y-t.currentTarget.offsetTop}),n=s.default.instance[o].getCurrentDataIndex(t),r=s.default.instance[o].getLegendDataIndex(t),!0===this.tapLegend&&s.default.instance[o].touchLegend(t),!0===this.tooltipShow&&this._showTooltip(t),this.emitMsg({name:"getIndex",params:{type:"getIndex",event:{x:t.detail.x,y:t.detail.y-t.currentTarget.offsetTop},currentIndex:n,legendIndex:r,id:o,opts:s.default.instance[o].opts}}))},_touchStart:function(t){var e=this.cid;h=Date.now(),!0===s.default.option[e].enableScroll&&1==t.touches.length&&s.default.instance[e].scrollStart(t),this.emitMsg({name:"getTouchStart",params:{type:"touchStart",event:t.changedTouches[0],id:e}})},_touchMove:function(t){var e=this.cid,a=Date.now(),i=a-h,o=s.default.option[e].touchMoveLimit||24;i<Math.floor(1e3/o)||(h=a,!0===s.default.option[e].enableScroll&&1==t.changedTouches.length&&s.default.instance[e].scroll(t),!0===this.ontap&&!1===s.default.option[e].enableScroll&&!0===this.onmovetip&&this._tap(t,!0),!0===this.ontouch&&!0===s.default.option[e].enableScroll&&!0===this.onzoom&&2==t.changedTouches.length&&s.default.instance[e].dobuleZoom(t),this.emitMsg({name:"getTouchMove",params:{type:"touchMove",event:t.changedTouches[0],id:e}}))},_touchEnd:function(t){var e=this.cid;!0===s.default.option[e].enableScroll&&0==t.touches.length&&s.default.instance[e].scrollEnd(t),this.emitMsg({name:"getTouchEnd",params:{type:"touchEnd",event:t.changedTouches[0],id:e}}),!0===this.ontap&&!1===s.default.option[e].enableScroll&&!0===this.onmovetip&&this._tap(t,!0)},_error:function(t){this.mixinDatacomErrorMessage=t.detail.errMsg},emitMsg:function(t){this.$emit(t.name,t.params)},getRenderType:function(){!0===this.echarts&&!1===this.mixinDatacomLoading&&this.beforeInit()},toJSON:function(){return this}}};e.default=u}).call(this,a("861b")["default"],a("df3c")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts-create-component',
    {
        'uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("0b1d"))
        })
    },
    [['uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts-create-component']]
]);