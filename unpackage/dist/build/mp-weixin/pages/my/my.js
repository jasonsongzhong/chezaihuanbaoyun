(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/my/my"], {
    "0452": function (n, e, t) {
      "use strict";
      (function (n) {
        var o = t("47a9");
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.default = void 0;
        var r = o(t("7ca3")),
          u = t("8f59");

        function a(n, e) {
          var t = Object.keys(n);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(n);
            e && (o = o.filter((function (e) {
              return Object.getOwnPropertyDescriptor(n, e).enumerable
            }))), t.push.apply(t, o)
          }
          return t
        }

        function i(n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = null != arguments[e] ? arguments[e] : {};
            e % 2 ? a(Object(t), !0).forEach((function (e) {
              (0, r.default)(n, e, t[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : a(Object(t)).forEach((function (e) {
              Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e))
            }))
          }
          return n
        }
        var c = {
          computed: i({}, (0, u.mapState)(["hasLogin", "forcedLogin", "userName"])),
          components: {
            LunaUpgrade: function () {
              t.e("components/luna-upgrade/luna-upgrade").then(function () {
                return resolve(t("1165"))
              }.bind(null, t)).catch(t.oe)
            },
            uniBadge: function () {
              t.e("uni_modules/uni-badge/components/uni-badge/uni-badge").then(function () {
                return resolve(t("8068"))
              }.bind(null, t)).catch(t.oe)
            }
          },
          data: function () {
            return {
              notes: "",
              url: "",
              isCheck: !1,
              login: !1,
              visible: !1,
              appInfo: {
                version: "",
                name: "",
                ent: ""
              },
              avatarUrl: "/static/img/user/toux.jpg",
              hasNewV: !1
            }
          },
          onLoad: function (n) {},
          onShow: function () {
            this.ent = n.getStorageSync("userInfo").ent, this.ent = n.getStorageSync("devs"), this.realname = n.getStorageSync("realname"), this.ent
          },
          methods: i(i({}, (0, u.mapMutations)(["logout"])), {}, {
            bindLogin: function () {
              n.navigateTo({
                url: "../login/login"
              })
            },
            bindLogout: function () {
              this.logout(), n.clearStorage(), n.reLaunch({
                url: "../my/my"
              })
            },
            about: function () {
              var e;
              n.showModal((e = {
                title: "关于",
                showCancel: !1,
                content: "麦越环境感谢您的支持！\n\n简易使用说明：\n    同一企业如需多人查看，请安装APP后自助注册，设备ID和设备类型请咨询业务专员，2020年6月之前安装的设备请选择老平台，之后的选择新平台！"
              }, (0, r.default)(e, "content", "麦越环境感谢您的支持！\n"), (0, r.default)(e, "duration", 2e3), e))
            },
            pass: function () {
              n.showToast({
                icon: "none",
                title: "由于安全原因修改密码请联系服务专员！",
                duration: 2e3
              })
            },
            me: function () {
              this.uuu = n.getStorageSync("userInfo"), this.devs = n.getStorageSync("userInfo").devs, this.len = this.devs.length, this.mns = [];
              for (var e = 0; e < this.len; e++) this.mns[e] = this.devs[e]["mn"];
              n.showModal({
                title: "个人资料",
                content: "用户:  " + this.uuu.userId + "\n企业:  " + this.uuu.userId + "\nMN:  " + this.mns + "\n平台:  " + this.uuu.server + "\n\n同一企业如需多人使用，请按下面资料自助注册，企业、MN号、平台需一致，用户名不可重复\n",
                showCancel: !1,
                confirmText: "知道了"
              })
            },
            handleCancel: function () {
              console.log("modal关闭")
            },
            appUpgrade: function () {}
          })
        };
        e.default = c
      }).call(this, t("df3c")["default"])
    },
    "19e1": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("cb02"),
        r = t("482d");
      for (var u in r)["default"].indexOf(u) < 0 && function (n) {
        t.d(e, n, (function () {
          return r[n]
        }))
      }(u);
      t("33e1");
      var a = t("828b"),
        i = Object(a["a"])(r["default"], o["b"], o["c"], !1, null, null, null, !1, o["a"], void 0);
      e["default"] = i.exports
    },
    "1fad": function (n, e, t) {
      "use strict";
      (function (n, e) {
        var o = t("47a9");
        t("8ed8"), t("c891"), t("861b");
        o(t("3240"));
        var r = o(t("19e1"));
        n.__webpack_require_UNI_MP_PLUGIN__ = t, e(r.default)
      }).call(this, t("3223")["default"], t("df3c")["createPage"])
    },
    "33e1": function (n, e, t) {
      "use strict";
      var o = t("8036"),
        r = t.n(o);
      r.a
    },
    "482d": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("0452"),
        r = t.n(o);
      for (var u in o)["default"].indexOf(u) < 0 && function (n) {
        t.d(e, n, (function () {
          return o[n]
        }))
      }(u);
      e["default"] = r.a
    },
    8036: function (n, e, t) {},
    cb02: function (n, e, t) {
      "use strict";
      t.d(e, "b", (function () {
        return r
      })), t.d(e, "c", (function () {
        return u
      })), t.d(e, "a", (function () {
        return o
      }));
      var o = {
          lunaUpgrade: function () {
            return t.e("components/luna-upgrade/luna-upgrade").then(t.bind(null, "1165"))
          }
        },
        r = function () {
          var n = this.$createElement;
          this._self._c
        },
        u = []
    }
  },
  [
    ["1fad", "common/runtime", "common/vendor"]
  ]
]);