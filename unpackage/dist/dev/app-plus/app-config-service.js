
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/equipment/equipment","pages/gasdata/gasdata","pages/index/index","pages/data/data","pages/datasView/datasView","pages/devs/devs","pages/info/info","pages/list/index","pages/chat/chat","pages/login/login","pages/reg/reg","pages/message/message","pages/my/my","pages/gasdata/test","pages/gasdata/history"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"麦越环境","navigationBarBackgroundColor":"#000000","backgroundColor":"#000000"},"tabBar":{"borderStyle":"black","backgroundColor":"#333","color":"#8F8F94","selectedColor":"#f33e54","list":[{"pagePath":"pages/equipment/equipment","iconPath":"static/img/tabbar/equipment.png","selectedIconPath":"static/img/tabbar/equipmentactive.png","text":"设备"},{"pagePath":"pages/my/my","iconPath":"static/img/tabbar/me.png","selectedIconPath":"static/img/tabbar/meactive.png","text":"我"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"环保云","compilerVersion":"3.4.18","entryPagePath":"pages/equipment/equipment","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/equipment/equipment","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"设备列表","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#000000","navigationBarTextStyle":"white"}},{"path":"/pages/gasdata/gasdata","meta":{},"window":{"navigationBarTitleText":"设备数据","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#000000","navigationBarTextStyle":"white"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"麦越环境"}},{"path":"/pages/data/data","meta":{},"window":{"navigationBarTitleText":"数据展示"}},{"path":"/pages/datasView/datasView","meta":{},"window":{"navigationBarTitleText":"数据展示"}},{"path":"/pages/devs/devs","meta":{},"window":{"navigationBarTitleText":"设备"}},{"path":"/pages/info/info","meta":{},"window":{"navigationBarTitleText":"新闻展示"}},{"path":"/pages/list/index","meta":{"isNVue":true},"window":{"navigationBarTitleText":"好友列表"}},{"path":"/pages/chat/chat","meta":{"isNVue":true},"window":{"titleNView":{"buttons":[{"float":"left","fontSize":"18px","text":"","color":"#007AFF"}]}}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/reg/reg","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/message/message","meta":{},"window":{"navigationBarTitleText":"消息提醒"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的信息"}},{"path":"/pages/gasdata/test","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/gasdata/history","meta":{},"window":{"navigationBarTitleText":"历史记录","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#000000","navigationBarTextStyle":"white"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});