function ip($) {
  return $ && $.__esModule && Object.prototype.hasOwnProperty.call($, "default") ? $.default : $;
}
var Eo = { exports: {} }, Ia = {};
var Df;
function np() {
  if (Df) return Ia;
  Df = 1;
  var $ = /* @__PURE__ */ Symbol.for("react.transitional.element"), K = /* @__PURE__ */ Symbol.for("react.fragment");
  function a(l, o, r) {
    var f = null;
    if (r !== void 0 && (f = "" + r), o.key !== void 0 && (f = "" + o.key), "key" in o) {
      r = {};
      for (var d in o)
        d !== "key" && (r[d] = o[d]);
    } else r = o;
    return o = r.ref, {
      $$typeof: $,
      type: l,
      key: f,
      ref: o !== void 0 ? o : null,
      props: r
    };
  }
  return Ia.Fragment = K, Ia.jsx = a, Ia.jsxs = a, Ia;
}
var Af;
function ap() {
  return Af || (Af = 1, Eo.exports = np()), Eo.exports;
}
var Pt = ap(), xo = { exports: {} }, Qa = {}, bo = { exports: {} }, Ro = {};
var zf;
function lp() {
  return zf || (zf = 1, (function($) {
    function K(F, ee) {
      var se = F.length;
      F.push(ee);
      e: for (; 0 < se; ) {
        var De = se - 1 >>> 1, Be = F[De];
        if (0 < o(Be, ee))
          F[De] = ee, F[se] = Be, se = De;
        else break e;
      }
    }
    function a(F) {
      return F.length === 0 ? null : F[0];
    }
    function l(F) {
      if (F.length === 0) return null;
      var ee = F[0], se = F.pop();
      if (se !== ee) {
        F[0] = se;
        e: for (var De = 0, Be = F.length, O = Be >>> 1; De < O; ) {
          var Z = 2 * (De + 1) - 1, Y = F[Z], ae = Z + 1, _e = F[ae];
          if (0 > o(Y, se))
            ae < Be && 0 > o(_e, Y) ? (F[De] = _e, F[ae] = se, De = ae) : (F[De] = Y, F[Z] = se, De = Z);
          else if (ae < Be && 0 > o(_e, se))
            F[De] = _e, F[ae] = se, De = ae;
          else break e;
        }
      }
      return ee;
    }
    function o(F, ee) {
      var se = F.sortIndex - ee.sortIndex;
      return se !== 0 ? se : F.id - ee.id;
    }
    if ($.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var r = performance;
      $.unstable_now = function() {
        return r.now();
      };
    } else {
      var f = Date, d = f.now();
      $.unstable_now = function() {
        return f.now() - d;
      };
    }
    var h = [], c = [], g = 1, p = null, T = 3, E = !1, C = !1, b = !1, D = !1, z = typeof setTimeout == "function" ? setTimeout : null, G = typeof clearTimeout == "function" ? clearTimeout : null, V = typeof setImmediate < "u" ? setImmediate : null;
    function de(F) {
      for (var ee = a(c); ee !== null; ) {
        if (ee.callback === null) l(c);
        else if (ee.startTime <= F)
          l(c), ee.sortIndex = ee.expirationTime, K(h, ee);
        else break;
        ee = a(c);
      }
    }
    function ne(F) {
      if (b = !1, de(F), !C)
        if (a(h) !== null)
          C = !0, me || (me = !0, ge());
        else {
          var ee = a(c);
          ee !== null && Xe(ne, ee.startTime - F);
        }
    }
    var me = !1, ie = -1, Te = 5, be = -1;
    function qe() {
      return D ? !0 : !($.unstable_now() - be < Te);
    }
    function Oe() {
      if (D = !1, me) {
        var F = $.unstable_now();
        be = F;
        var ee = !0;
        try {
          e: {
            C = !1, b && (b = !1, G(ie), ie = -1), E = !0;
            var se = T;
            try {
              t: {
                for (de(F), p = a(h); p !== null && !(p.expirationTime > F && qe()); ) {
                  var De = p.callback;
                  if (typeof De == "function") {
                    p.callback = null, T = p.priorityLevel;
                    var Be = De(
                      p.expirationTime <= F
                    );
                    if (F = $.unstable_now(), typeof Be == "function") {
                      p.callback = Be, de(F), ee = !0;
                      break t;
                    }
                    p === a(h) && l(h), de(F);
                  } else l(h);
                  p = a(h);
                }
                if (p !== null) ee = !0;
                else {
                  var O = a(c);
                  O !== null && Xe(
                    ne,
                    O.startTime - F
                  ), ee = !1;
                }
              }
              break e;
            } finally {
              p = null, T = se, E = !1;
            }
            ee = void 0;
          }
        } finally {
          ee ? ge() : me = !1;
        }
      }
    }
    var ge;
    if (typeof V == "function")
      ge = function() {
        V(Oe);
      };
    else if (typeof MessageChannel < "u") {
      var Ne = new MessageChannel(), Ze = Ne.port2;
      Ne.port1.onmessage = Oe, ge = function() {
        Ze.postMessage(null);
      };
    } else
      ge = function() {
        z(Oe, 0);
      };
    function Xe(F, ee) {
      ie = z(function() {
        F($.unstable_now());
      }, ee);
    }
    $.unstable_IdlePriority = 5, $.unstable_ImmediatePriority = 1, $.unstable_LowPriority = 4, $.unstable_NormalPriority = 3, $.unstable_Profiling = null, $.unstable_UserBlockingPriority = 2, $.unstable_cancelCallback = function(F) {
      F.callback = null;
    }, $.unstable_forceFrameRate = function(F) {
      0 > F || 125 < F ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Te = 0 < F ? Math.floor(1e3 / F) : 5;
    }, $.unstable_getCurrentPriorityLevel = function() {
      return T;
    }, $.unstable_next = function(F) {
      switch (T) {
        case 1:
        case 2:
        case 3:
          var ee = 3;
          break;
        default:
          ee = T;
      }
      var se = T;
      T = ee;
      try {
        return F();
      } finally {
        T = se;
      }
    }, $.unstable_requestPaint = function() {
      D = !0;
    }, $.unstable_runWithPriority = function(F, ee) {
      switch (F) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          F = 3;
      }
      var se = T;
      T = F;
      try {
        return ee();
      } finally {
        T = se;
      }
    }, $.unstable_scheduleCallback = function(F, ee, se) {
      var De = $.unstable_now();
      switch (typeof se == "object" && se !== null ? (se = se.delay, se = typeof se == "number" && 0 < se ? De + se : De) : se = De, F) {
        case 1:
          var Be = -1;
          break;
        case 2:
          Be = 250;
          break;
        case 5:
          Be = 1073741823;
          break;
        case 4:
          Be = 1e4;
          break;
        default:
          Be = 5e3;
      }
      return Be = se + Be, F = {
        id: g++,
        callback: ee,
        priorityLevel: F,
        startTime: se,
        expirationTime: Be,
        sortIndex: -1
      }, se > De ? (F.sortIndex = se, K(c, F), a(h) === null && F === a(c) && (b ? (G(ie), ie = -1) : b = !0, Xe(ne, se - De))) : (F.sortIndex = Be, K(h, F), C || E || (C = !0, me || (me = !0, ge()))), F;
    }, $.unstable_shouldYield = qe, $.unstable_wrapCallback = function(F) {
      var ee = T;
      return function() {
        var se = T;
        T = ee;
        try {
          return F.apply(this, arguments);
        } finally {
          T = se;
        }
      };
    };
  })(Ro)), Ro;
}
var Of;
function rp() {
  return Of || (Of = 1, bo.exports = lp()), bo.exports;
}
var Co = { exports: {} }, ze = {};
var Mf;
function sp() {
  if (Mf) return ze;
  Mf = 1;
  var $ = /* @__PURE__ */ Symbol.for("react.transitional.element"), K = /* @__PURE__ */ Symbol.for("react.portal"), a = /* @__PURE__ */ Symbol.for("react.fragment"), l = /* @__PURE__ */ Symbol.for("react.strict_mode"), o = /* @__PURE__ */ Symbol.for("react.profiler"), r = /* @__PURE__ */ Symbol.for("react.consumer"), f = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), h = /* @__PURE__ */ Symbol.for("react.suspense"), c = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.activity"), T = Symbol.iterator;
  function E(O) {
    return O === null || typeof O != "object" ? null : (O = T && O[T] || O["@@iterator"], typeof O == "function" ? O : null);
  }
  var C = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, b = Object.assign, D = {};
  function z(O, Z, Y) {
    this.props = O, this.context = Z, this.refs = D, this.updater = Y || C;
  }
  z.prototype.isReactComponent = {}, z.prototype.setState = function(O, Z) {
    if (typeof O != "object" && typeof O != "function" && O != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, O, Z, "setState");
  }, z.prototype.forceUpdate = function(O) {
    this.updater.enqueueForceUpdate(this, O, "forceUpdate");
  };
  function G() {
  }
  G.prototype = z.prototype;
  function V(O, Z, Y) {
    this.props = O, this.context = Z, this.refs = D, this.updater = Y || C;
  }
  var de = V.prototype = new G();
  de.constructor = V, b(de, z.prototype), de.isPureReactComponent = !0;
  var ne = Array.isArray;
  function me() {
  }
  var ie = { H: null, A: null, T: null, S: null }, Te = Object.prototype.hasOwnProperty;
  function be(O, Z, Y) {
    var ae = Y.ref;
    return {
      $$typeof: $,
      type: O,
      key: Z,
      ref: ae !== void 0 ? ae : null,
      props: Y
    };
  }
  function qe(O, Z) {
    return be(O.type, Z, O.props);
  }
  function Oe(O) {
    return typeof O == "object" && O !== null && O.$$typeof === $;
  }
  function ge(O) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + O.replace(/[=:]/g, function(Y) {
      return Z[Y];
    });
  }
  var Ne = /\/+/g;
  function Ze(O, Z) {
    return typeof O == "object" && O !== null && O.key != null ? ge("" + O.key) : Z.toString(36);
  }
  function Xe(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (typeof O.status == "string" ? O.then(me, me) : (O.status = "pending", O.then(
          function(Z) {
            O.status === "pending" && (O.status = "fulfilled", O.value = Z);
          },
          function(Z) {
            O.status === "pending" && (O.status = "rejected", O.reason = Z);
          }
        )), O.status) {
          case "fulfilled":
            return O.value;
          case "rejected":
            throw O.reason;
        }
    }
    throw O;
  }
  function F(O, Z, Y, ae, _e) {
    var Re = typeof O;
    (Re === "undefined" || Re === "boolean") && (O = null);
    var Ce = !1;
    if (O === null) Ce = !0;
    else
      switch (Re) {
        case "bigint":
        case "string":
        case "number":
          Ce = !0;
          break;
        case "object":
          switch (O.$$typeof) {
            case $:
            case K:
              Ce = !0;
              break;
            case g:
              return Ce = O._init, F(
                Ce(O._payload),
                Z,
                Y,
                ae,
                _e
              );
          }
      }
    if (Ce)
      return _e = _e(O), Ce = ae === "" ? "." + Ze(O, 0) : ae, ne(_e) ? (Y = "", Ce != null && (Y = Ce.replace(Ne, "$&/") + "/"), F(_e, Z, Y, "", function(bt) {
        return bt;
      })) : _e != null && (Oe(_e) && (_e = qe(
        _e,
        Y + (_e.key == null || O && O.key === _e.key ? "" : ("" + _e.key).replace(
          Ne,
          "$&/"
        ) + "/") + Ce
      )), Z.push(_e)), 1;
    Ce = 0;
    var $e = ae === "" ? "." : ae + ":";
    if (ne(O))
      for (var Qe = 0; Qe < O.length; Qe++)
        ae = O[Qe], Re = $e + Ze(ae, Qe), Ce += F(
          ae,
          Z,
          Y,
          Re,
          _e
        );
    else if (Qe = E(O), typeof Qe == "function")
      for (O = Qe.call(O), Qe = 0; !(ae = O.next()).done; )
        ae = ae.value, Re = $e + Ze(ae, Qe++), Ce += F(
          ae,
          Z,
          Y,
          Re,
          _e
        );
    else if (Re === "object") {
      if (typeof O.then == "function")
        return F(
          Xe(O),
          Z,
          Y,
          ae,
          _e
        );
      throw Z = String(O), Error(
        "Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ce;
  }
  function ee(O, Z, Y) {
    if (O == null) return O;
    var ae = [], _e = 0;
    return F(O, ae, "", "", function(Re) {
      return Z.call(Y, Re, _e++);
    }), ae;
  }
  function se(O) {
    if (O._status === -1) {
      var Z = O._result;
      Z = Z(), Z.then(
        function(Y) {
          (O._status === 0 || O._status === -1) && (O._status = 1, O._result = Y);
        },
        function(Y) {
          (O._status === 0 || O._status === -1) && (O._status = 2, O._result = Y);
        }
      ), O._status === -1 && (O._status = 0, O._result = Z);
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var De = typeof reportError == "function" ? reportError : function(O) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Z = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof O == "object" && O !== null && typeof O.message == "string" ? String(O.message) : String(O),
        error: O
      });
      if (!window.dispatchEvent(Z)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", O);
      return;
    }
    console.error(O);
  }, Be = {
    map: ee,
    forEach: function(O, Z, Y) {
      ee(
        O,
        function() {
          Z.apply(this, arguments);
        },
        Y
      );
    },
    count: function(O) {
      var Z = 0;
      return ee(O, function() {
        Z++;
      }), Z;
    },
    toArray: function(O) {
      return ee(O, function(Z) {
        return Z;
      }) || [];
    },
    only: function(O) {
      if (!Oe(O))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return O;
    }
  };
  return ze.Activity = p, ze.Children = Be, ze.Component = z, ze.Fragment = a, ze.Profiler = o, ze.PureComponent = V, ze.StrictMode = l, ze.Suspense = h, ze.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ie, ze.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(O) {
      return ie.H.useMemoCache(O);
    }
  }, ze.cache = function(O) {
    return function() {
      return O.apply(null, arguments);
    };
  }, ze.cacheSignal = function() {
    return null;
  }, ze.cloneElement = function(O, Z, Y) {
    if (O == null)
      throw Error(
        "The argument must be a React element, but you passed " + O + "."
      );
    var ae = b({}, O.props), _e = O.key;
    if (Z != null)
      for (Re in Z.key !== void 0 && (_e = "" + Z.key), Z)
        !Te.call(Z, Re) || Re === "key" || Re === "__self" || Re === "__source" || Re === "ref" && Z.ref === void 0 || (ae[Re] = Z[Re]);
    var Re = arguments.length - 2;
    if (Re === 1) ae.children = Y;
    else if (1 < Re) {
      for (var Ce = Array(Re), $e = 0; $e < Re; $e++)
        Ce[$e] = arguments[$e + 2];
      ae.children = Ce;
    }
    return be(O.type, _e, ae);
  }, ze.createContext = function(O) {
    return O = {
      $$typeof: f,
      _currentValue: O,
      _currentValue2: O,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, O.Provider = O, O.Consumer = {
      $$typeof: r,
      _context: O
    }, O;
  }, ze.createElement = function(O, Z, Y) {
    var ae, _e = {}, Re = null;
    if (Z != null)
      for (ae in Z.key !== void 0 && (Re = "" + Z.key), Z)
        Te.call(Z, ae) && ae !== "key" && ae !== "__self" && ae !== "__source" && (_e[ae] = Z[ae]);
    var Ce = arguments.length - 2;
    if (Ce === 1) _e.children = Y;
    else if (1 < Ce) {
      for (var $e = Array(Ce), Qe = 0; Qe < Ce; Qe++)
        $e[Qe] = arguments[Qe + 2];
      _e.children = $e;
    }
    if (O && O.defaultProps)
      for (ae in Ce = O.defaultProps, Ce)
        _e[ae] === void 0 && (_e[ae] = Ce[ae]);
    return be(O, Re, _e);
  }, ze.createRef = function() {
    return { current: null };
  }, ze.forwardRef = function(O) {
    return { $$typeof: d, render: O };
  }, ze.isValidElement = Oe, ze.lazy = function(O) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: O },
      _init: se
    };
  }, ze.memo = function(O, Z) {
    return {
      $$typeof: c,
      type: O,
      compare: Z === void 0 ? null : Z
    };
  }, ze.startTransition = function(O) {
    var Z = ie.T, Y = {};
    ie.T = Y;
    try {
      var ae = O(), _e = ie.S;
      _e !== null && _e(Y, ae), typeof ae == "object" && ae !== null && typeof ae.then == "function" && ae.then(me, De);
    } catch (Re) {
      De(Re);
    } finally {
      Z !== null && Y.types !== null && (Z.types = Y.types), ie.T = Z;
    }
  }, ze.unstable_useCacheRefresh = function() {
    return ie.H.useCacheRefresh();
  }, ze.use = function(O) {
    return ie.H.use(O);
  }, ze.useActionState = function(O, Z, Y) {
    return ie.H.useActionState(O, Z, Y);
  }, ze.useCallback = function(O, Z) {
    return ie.H.useCallback(O, Z);
  }, ze.useContext = function(O) {
    return ie.H.useContext(O);
  }, ze.useDebugValue = function() {
  }, ze.useDeferredValue = function(O, Z) {
    return ie.H.useDeferredValue(O, Z);
  }, ze.useEffect = function(O, Z) {
    return ie.H.useEffect(O, Z);
  }, ze.useEffectEvent = function(O) {
    return ie.H.useEffectEvent(O);
  }, ze.useId = function() {
    return ie.H.useId();
  }, ze.useImperativeHandle = function(O, Z, Y) {
    return ie.H.useImperativeHandle(O, Z, Y);
  }, ze.useInsertionEffect = function(O, Z) {
    return ie.H.useInsertionEffect(O, Z);
  }, ze.useLayoutEffect = function(O, Z) {
    return ie.H.useLayoutEffect(O, Z);
  }, ze.useMemo = function(O, Z) {
    return ie.H.useMemo(O, Z);
  }, ze.useOptimistic = function(O, Z) {
    return ie.H.useOptimistic(O, Z);
  }, ze.useReducer = function(O, Z, Y) {
    return ie.H.useReducer(O, Z, Y);
  }, ze.useRef = function(O) {
    return ie.H.useRef(O);
  }, ze.useState = function(O) {
    return ie.H.useState(O);
  }, ze.useSyncExternalStore = function(O, Z, Y) {
    return ie.H.useSyncExternalStore(
      O,
      Z,
      Y
    );
  }, ze.useTransition = function() {
    return ie.H.useTransition();
  }, ze.version = "19.2.0", ze;
}
var Hf;
function zo() {
  return Hf || (Hf = 1, Co.exports = sp()), Co.exports;
}
var Do = { exports: {} }, xt = {};
var Bf;
function op() {
  if (Bf) return xt;
  Bf = 1;
  var $ = zo();
  function K(h) {
    var c = "https://react.dev/errors/" + h;
    if (1 < arguments.length) {
      c += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        c += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + h + "; visit " + c + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function a() {
  }
  var l = {
    d: {
      f: a,
      r: function() {
        throw Error(K(522));
      },
      D: a,
      C: a,
      L: a,
      m: a,
      X: a,
      S: a,
      M: a
    },
    p: 0,
    findDOMNode: null
  }, o = /* @__PURE__ */ Symbol.for("react.portal");
  function r(h, c, g) {
    var p = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: p == null ? null : "" + p,
      children: h,
      containerInfo: c,
      implementation: g
    };
  }
  var f = $.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(h, c) {
    if (h === "font") return "";
    if (typeof c == "string")
      return c === "use-credentials" ? c : "";
  }
  return xt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, xt.createPortal = function(h, c) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!c || c.nodeType !== 1 && c.nodeType !== 9 && c.nodeType !== 11)
      throw Error(K(299));
    return r(h, c, null, g);
  }, xt.flushSync = function(h) {
    var c = f.T, g = l.p;
    try {
      if (f.T = null, l.p = 2, h) return h();
    } finally {
      f.T = c, l.p = g, l.d.f();
    }
  }, xt.preconnect = function(h, c) {
    typeof h == "string" && (c ? (c = c.crossOrigin, c = typeof c == "string" ? c === "use-credentials" ? c : "" : void 0) : c = null, l.d.C(h, c));
  }, xt.prefetchDNS = function(h) {
    typeof h == "string" && l.d.D(h);
  }, xt.preinit = function(h, c) {
    if (typeof h == "string" && c && typeof c.as == "string") {
      var g = c.as, p = d(g, c.crossOrigin), T = typeof c.integrity == "string" ? c.integrity : void 0, E = typeof c.fetchPriority == "string" ? c.fetchPriority : void 0;
      g === "style" ? l.d.S(
        h,
        typeof c.precedence == "string" ? c.precedence : void 0,
        {
          crossOrigin: p,
          integrity: T,
          fetchPriority: E
        }
      ) : g === "script" && l.d.X(h, {
        crossOrigin: p,
        integrity: T,
        fetchPriority: E,
        nonce: typeof c.nonce == "string" ? c.nonce : void 0
      });
    }
  }, xt.preinitModule = function(h, c) {
    if (typeof h == "string")
      if (typeof c == "object" && c !== null) {
        if (c.as == null || c.as === "script") {
          var g = d(
            c.as,
            c.crossOrigin
          );
          l.d.M(h, {
            crossOrigin: g,
            integrity: typeof c.integrity == "string" ? c.integrity : void 0,
            nonce: typeof c.nonce == "string" ? c.nonce : void 0
          });
        }
      } else c == null && l.d.M(h);
  }, xt.preload = function(h, c) {
    if (typeof h == "string" && typeof c == "object" && c !== null && typeof c.as == "string") {
      var g = c.as, p = d(g, c.crossOrigin);
      l.d.L(h, g, {
        crossOrigin: p,
        integrity: typeof c.integrity == "string" ? c.integrity : void 0,
        nonce: typeof c.nonce == "string" ? c.nonce : void 0,
        type: typeof c.type == "string" ? c.type : void 0,
        fetchPriority: typeof c.fetchPriority == "string" ? c.fetchPriority : void 0,
        referrerPolicy: typeof c.referrerPolicy == "string" ? c.referrerPolicy : void 0,
        imageSrcSet: typeof c.imageSrcSet == "string" ? c.imageSrcSet : void 0,
        imageSizes: typeof c.imageSizes == "string" ? c.imageSizes : void 0,
        media: typeof c.media == "string" ? c.media : void 0
      });
    }
  }, xt.preloadModule = function(h, c) {
    if (typeof h == "string")
      if (c) {
        var g = d(c.as, c.crossOrigin);
        l.d.m(h, {
          as: typeof c.as == "string" && c.as !== "script" ? c.as : void 0,
          crossOrigin: g,
          integrity: typeof c.integrity == "string" ? c.integrity : void 0
        });
      } else l.d.m(h);
  }, xt.requestFormReset = function(h) {
    l.d.r(h);
  }, xt.unstable_batchedUpdates = function(h, c) {
    return h(c);
  }, xt.useFormState = function(h, c, g) {
    return f.H.useFormState(h, c, g);
  }, xt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, xt.version = "19.2.0", xt;
}
var Pf;
function up() {
  if (Pf) return Do.exports;
  Pf = 1;
  function $() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($);
      } catch (K) {
        console.error(K);
      }
  }
  return $(), Do.exports = op(), Do.exports;
}
var Nf;
function cp() {
  if (Nf) return Qa;
  Nf = 1;
  var $ = rp(), K = zo(), a = up();
  function l(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        t += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function r(e) {
    var t = e, i = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (i = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? i : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function d(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (r(e) !== e)
      throw Error(l(188));
  }
  function c(e) {
    var t = e.alternate;
    if (!t) {
      if (t = r(e), t === null) throw Error(l(188));
      return t !== e ? null : e;
    }
    for (var i = e, n = t; ; ) {
      var s = i.return;
      if (s === null) break;
      var u = s.alternate;
      if (u === null) {
        if (n = s.return, n !== null) {
          i = n;
          continue;
        }
        break;
      }
      if (s.child === u.child) {
        for (u = s.child; u; ) {
          if (u === i) return h(s), e;
          if (u === n) return h(s), t;
          u = u.sibling;
        }
        throw Error(l(188));
      }
      if (i.return !== n.return) i = s, n = u;
      else {
        for (var v = !1, S = s.child; S; ) {
          if (S === i) {
            v = !0, i = s, n = u;
            break;
          }
          if (S === n) {
            v = !0, n = s, i = u;
            break;
          }
          S = S.sibling;
        }
        if (!v) {
          for (S = u.child; S; ) {
            if (S === i) {
              v = !0, i = u, n = s;
              break;
            }
            if (S === n) {
              v = !0, n = u, i = s;
              break;
            }
            S = S.sibling;
          }
          if (!v) throw Error(l(189));
        }
      }
      if (i.alternate !== n) throw Error(l(190));
    }
    if (i.tag !== 3) throw Error(l(188));
    return i.stateNode.current === i ? e : t;
  }
  function g(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = g(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var p = Object.assign, T = /* @__PURE__ */ Symbol.for("react.element"), E = /* @__PURE__ */ Symbol.for("react.transitional.element"), C = /* @__PURE__ */ Symbol.for("react.portal"), b = /* @__PURE__ */ Symbol.for("react.fragment"), D = /* @__PURE__ */ Symbol.for("react.strict_mode"), z = /* @__PURE__ */ Symbol.for("react.profiler"), G = /* @__PURE__ */ Symbol.for("react.consumer"), V = /* @__PURE__ */ Symbol.for("react.context"), de = /* @__PURE__ */ Symbol.for("react.forward_ref"), ne = /* @__PURE__ */ Symbol.for("react.suspense"), me = /* @__PURE__ */ Symbol.for("react.suspense_list"), ie = /* @__PURE__ */ Symbol.for("react.memo"), Te = /* @__PURE__ */ Symbol.for("react.lazy"), be = /* @__PURE__ */ Symbol.for("react.activity"), qe = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Oe = Symbol.iterator;
  function ge(e) {
    return e === null || typeof e != "object" ? null : (e = Oe && e[Oe] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ne = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Ze(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ne ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case b:
        return "Fragment";
      case z:
        return "Profiler";
      case D:
        return "StrictMode";
      case ne:
        return "Suspense";
      case me:
        return "SuspenseList";
      case be:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case C:
          return "Portal";
        case V:
          return e.displayName || "Context";
        case G:
          return (e._context.displayName || "Context") + ".Consumer";
        case de:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ie:
          return t = e.displayName || null, t !== null ? t : Ze(e.type) || "Memo";
        case Te:
          t = e._payload, e = e._init;
          try {
            return Ze(e(t));
          } catch {
          }
      }
    return null;
  }
  var Xe = Array.isArray, F = K.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, De = [], Be = -1;
  function O(e) {
    return { current: e };
  }
  function Z(e) {
    0 > Be || (e.current = De[Be], De[Be] = null, Be--);
  }
  function Y(e, t) {
    Be++, De[Be] = e.current, e.current = t;
  }
  var ae = O(null), _e = O(null), Re = O(null), Ce = O(null);
  function $e(e, t) {
    switch (Y(Re, t), Y(_e, e), Y(ae, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Wh(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Wh(t), e = Kh(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    Z(ae), Y(ae, e);
  }
  function Qe() {
    Z(ae), Z(_e), Z(Re);
  }
  function bt(e) {
    e.memoizedState !== null && Y(Ce, e);
    var t = ae.current, i = Kh(t, e.type);
    t !== i && (Y(_e, e), Y(ae, i));
  }
  function qt(e) {
    _e.current === e && (Z(ae), Z(_e)), Ce.current === e && (Z(Ce), Za._currentValue = se);
  }
  var te, xe;
  function he(e) {
    if (te === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        te = t && t[1] || "", xe = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + te + e + xe;
  }
  var Ae = !1;
  function We(e, t) {
    if (!e || Ae) return "";
    Ae = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var I = function() {
                throw Error();
              };
              if (Object.defineProperty(I.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(I, []);
                } catch (j) {
                  var L = j;
                }
                Reflect.construct(e, [], I);
              } else {
                try {
                  I.call();
                } catch (j) {
                  L = j;
                }
                e.call(I.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (j) {
                L = j;
              }
              (I = e()) && typeof I.catch == "function" && I.catch(function() {
              });
            }
          } catch (j) {
            if (j && L && typeof j.stack == "string")
              return [j.stack, L.stack];
          }
          return [null, null];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        n.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = n.DetermineComponentFrameRoot(), v = u[0], S = u[1];
      if (v && S) {
        var A = v.split(`
`), N = S.split(`
`);
        for (s = n = 0; n < A.length && !A[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; s < N.length && !N[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (n === A.length || s === N.length)
          for (n = A.length - 1, s = N.length - 1; 1 <= n && 0 <= s && A[n] !== N[s]; )
            s--;
        for (; 1 <= n && 0 <= s; n--, s--)
          if (A[n] !== N[s]) {
            if (n !== 1 || s !== 1)
              do
                if (n--, s--, 0 > s || A[n] !== N[s]) {
                  var q = `
` + A[n].replace(" at new ", " at ");
                  return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), q;
                }
              while (1 <= n && 0 <= s);
            break;
          }
      }
    } finally {
      Ae = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? he(i) : "";
  }
  function m(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return he(e.type);
      case 16:
        return he("Lazy");
      case 13:
        return e.child !== t && t !== null ? he("Suspense Fallback") : he("Suspense");
      case 19:
        return he("SuspenseList");
      case 0:
      case 15:
        return We(e.type, !1);
      case 11:
        return We(e.type.render, !1);
      case 1:
        return We(e.type, !0);
      case 31:
        return he("Activity");
      default:
        return "";
    }
  }
  function x(e) {
    try {
      var t = "", i = null;
      do
        t += m(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var B = Object.prototype.hasOwnProperty, W = $.unstable_scheduleCallback, J = $.unstable_cancelCallback, le = $.unstable_shouldYield, Q = $.unstable_requestPaint, fe = $.unstable_now, Le = $.unstable_getCurrentPriorityLevel, we = $.unstable_ImmediatePriority, oe = $.unstable_UserBlockingPriority, ue = $.unstable_NormalPriority, w = $.unstable_LowPriority, y = $.unstable_IdlePriority, _ = $.log, R = $.unstable_setDisableYieldValue, U = null, k = null;
  function re(e) {
    if (typeof _ == "function" && R(e), k && typeof k.setStrictMode == "function")
      try {
        k.setStrictMode(U, e);
      } catch {
      }
  }
  var Se = Math.clz32 ? Math.clz32 : ht, ve = Math.log, Rt = Math.LN2;
  function ht(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ve(e) / Rt | 0) | 0;
  }
  var ei = 256, $i = 262144, en = 4194304;
  function li(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Wa(e, t, i) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var s = 0, u = e.suspendedLanes, v = e.pingedLanes;
    e = e.warmLanes;
    var S = n & 134217727;
    return S !== 0 ? (n = S & ~u, n !== 0 ? s = li(n) : (v &= S, v !== 0 ? s = li(v) : i || (i = S & ~e, i !== 0 && (s = li(i))))) : (S = n & ~u, S !== 0 ? s = li(S) : v !== 0 ? s = li(v) : i || (i = n & ~e, i !== 0 && (s = li(i)))), s === 0 ? 0 : t !== 0 && t !== s && (t & u) === 0 && (u = s & -s, i = t & -t, u >= i || u === 32 && (i & 4194048) !== 0) ? t : s;
  }
  function na(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function qf(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Oo() {
    var e = en;
    return en <<= 1, (en & 62914560) === 0 && (en = 4194304), e;
  }
  function cr(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function aa(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Zf(e, t, i, n, s, u) {
    var v = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var S = e.entanglements, A = e.expirationTimes, N = e.hiddenUpdates;
    for (i = v & ~i; 0 < i; ) {
      var q = 31 - Se(i), I = 1 << q;
      S[q] = 0, A[q] = -1;
      var L = N[q];
      if (L !== null)
        for (N[q] = null, q = 0; q < L.length; q++) {
          var j = L[q];
          j !== null && (j.lane &= -536870913);
        }
      i &= ~I;
    }
    n !== 0 && Mo(e, n, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(v & ~t));
  }
  function Mo(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var n = 31 - Se(t);
    e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | i & 261930;
  }
  function Ho(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var n = 31 - Se(i), s = 1 << n;
      s & t | e[n] & t && (e[n] |= t), i &= ~s;
    }
  }
  function Bo(e, t) {
    var i = t & -t;
    return i = (i & 42) !== 0 ? 1 : hr(i), (i & (e.suspendedLanes | t)) !== 0 ? 0 : i;
  }
  function hr(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function fr(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Po() {
    var e = ee.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Sf(e.type));
  }
  function No(e, t) {
    var i = ee.p;
    try {
      return ee.p = e, t();
    } finally {
      ee.p = i;
    }
  }
  var Ai = Math.random().toString(36).slice(2), Tt = "__reactFiber$" + Ai, Dt = "__reactProps$" + Ai, Tn = "__reactContainer$" + Ai, dr = "__reactEvents$" + Ai, Xf = "__reactListeners$" + Ai, Yf = "__reactHandles$" + Ai, Lo = "__reactResources$" + Ai, la = "__reactMarker$" + Ai;
  function gr(e) {
    delete e[Tt], delete e[Dt], delete e[dr], delete e[Xf], delete e[Yf];
  }
  function wn(e) {
    var t = e[Tt];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[Tn] || i[Tt]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = lf(e); e !== null; ) {
            if (i = e[Tt]) return i;
            e = lf(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function Sn(e) {
    if (e = e[Tt] || e[Tn]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ra(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(l(33));
  }
  function _n(e) {
    var t = e[Lo];
    return t || (t = e[Lo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function vt(e) {
    e[la] = !0;
  }
  var Uo = /* @__PURE__ */ new Set(), Fo = {};
  function tn(e, t) {
    En(e, t), En(e + "Capture", t);
  }
  function En(e, t) {
    for (Fo[e] = t, e = 0; e < t.length; e++)
      Uo.add(t[e]);
  }
  var kf = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Go = {}, jo = {};
  function If(e) {
    return B.call(jo, e) ? !0 : B.call(Go, e) ? !1 : kf.test(e) ? jo[e] = !0 : (Go[e] = !0, !1);
  }
  function Ka(e, t, i) {
    if (If(t))
      if (i === null) e.removeAttribute(t);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var n = t.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + i);
      }
  }
  function Ja(e, t, i) {
    if (i === null) e.removeAttribute(t);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + i);
    }
  }
  function hi(e, t, i, n) {
    if (n === null) e.removeAttribute(i);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttributeNS(t, i, "" + n);
    }
  }
  function Zt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Vo(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Qf(e, t, i) {
    var n = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var s = n.get, u = n.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(v) {
          i = "" + v, u.call(this, v);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(v) {
          i = "" + v;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function pr(e) {
    if (!e._valueTracker) {
      var t = Vo(e) ? "checked" : "value";
      e._valueTracker = Qf(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function qo(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), n = "";
    return e && (n = Vo(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== i ? (t.setValue(e), !0) : !1;
  }
  function $a(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Wf = /[\n"\\]/g;
  function Xt(e) {
    return e.replace(
      Wf,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function mr(e, t, i, n, s, u, v, S) {
    e.name = "", v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? e.type = v : e.removeAttribute("type"), t != null ? v === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Zt(t)) : e.value !== "" + Zt(t) && (e.value = "" + Zt(t)) : v !== "submit" && v !== "reset" || e.removeAttribute("value"), t != null ? vr(e, v, Zt(t)) : i != null ? vr(e, v, Zt(i)) : n != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" ? e.name = "" + Zt(S) : e.removeAttribute("name");
  }
  function Zo(e, t, i, n, s, u, v, S) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || i != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        pr(e);
        return;
      }
      i = i != null ? "" + Zt(i) : "", t = t != null ? "" + Zt(t) : i, S || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = n ?? s, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = S ? e.checked : !!n, e.defaultChecked = !!n, v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" && (e.name = v), pr(e);
  }
  function vr(e, t, i) {
    t === "number" && $a(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function xn(e, t, i, n) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < i.length; s++)
        t["$" + i[s]] = !0;
      for (i = 0; i < e.length; i++)
        s = t.hasOwnProperty("$" + e[i].value), e[i].selected !== s && (e[i].selected = s), s && n && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + Zt(i), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === i) {
          e[s].selected = !0, n && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Xo(e, t, i) {
    if (t != null && (t = "" + Zt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + Zt(i) : "";
  }
  function Yo(e, t, i, n) {
    if (t == null) {
      if (n != null) {
        if (i != null) throw Error(l(92));
        if (Xe(n)) {
          if (1 < n.length) throw Error(l(93));
          n = n[0];
        }
        i = n;
      }
      i == null && (i = ""), t = i;
    }
    i = Zt(t), e.defaultValue = i, n = e.textContent, n === i && n !== "" && n !== null && (e.value = n), pr(e);
  }
  function bn(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Kf = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ko(e, t, i) {
    var n = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, i) : typeof i != "number" || i === 0 || Kf.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function Io(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(l(62));
    if (e = e.style, i != null) {
      for (var n in i)
        !i.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
      for (var s in t)
        n = t[s], t.hasOwnProperty(s) && i[s] !== n && ko(e, s, n);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && ko(e, u, t[u]);
  }
  function yr(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Jf = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), $f = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function el(e) {
    return $f.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function fi() {
  }
  var Tr = null;
  function wr(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Rn = null, Cn = null;
  function Qo(e) {
    var t = Sn(e);
    if (t && (e = t.stateNode)) {
      var i = e[Dt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (mr(
            e,
            i.value,
            i.defaultValue,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name
          ), t = i.name, i.type === "radio" && t != null) {
            for (i = e; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + Xt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var n = i[t];
              if (n !== e && n.form === e.form) {
                var s = n[Dt] || null;
                if (!s) throw Error(l(90));
                mr(
                  n,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (t = 0; t < i.length; t++)
              n = i[t], n.form === e.form && qo(n);
          }
          break e;
        case "textarea":
          Xo(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && xn(e, !!i.multiple, t, !1);
      }
    }
  }
  var Sr = !1;
  function Wo(e, t, i) {
    if (Sr) return e(t, i);
    Sr = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (Sr = !1, (Rn !== null || Cn !== null) && (jl(), Rn && (t = Rn, e = Cn, Cn = Rn = null, Qo(t), e)))
        for (t = 0; t < e.length; t++) Qo(e[t]);
    }
  }
  function sa(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var n = i[Dt] || null;
    if (n === null) return null;
    i = n[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (n = !n.disabled) || (e = e.type, n = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !n;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (i && typeof i != "function")
      throw Error(
        l(231, t, typeof i)
      );
    return i;
  }
  var di = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), _r = !1;
  if (di)
    try {
      var oa = {};
      Object.defineProperty(oa, "passive", {
        get: function() {
          _r = !0;
        }
      }), window.addEventListener("test", oa, oa), window.removeEventListener("test", oa, oa);
    } catch {
      _r = !1;
    }
  var zi = null, Er = null, tl = null;
  function Ko() {
    if (tl) return tl;
    var e, t = Er, i = t.length, n, s = "value" in zi ? zi.value : zi.textContent, u = s.length;
    for (e = 0; e < i && t[e] === s[e]; e++) ;
    var v = i - e;
    for (n = 1; n <= v && t[i - n] === s[u - n]; n++) ;
    return tl = s.slice(e, 1 < n ? 1 - n : void 0);
  }
  function il(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function nl() {
    return !0;
  }
  function Jo() {
    return !1;
  }
  function At(e) {
    function t(i, n, s, u, v) {
      this._reactName = i, this._targetInst = s, this.type = n, this.nativeEvent = u, this.target = v, this.currentTarget = null;
      for (var S in e)
        e.hasOwnProperty(S) && (i = e[S], this[S] = i ? i(u) : u[S]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? nl : Jo, this.isPropagationStopped = Jo, this;
    }
    return p(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = nl);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = nl);
      },
      persist: function() {
      },
      isPersistent: nl
    }), t;
  }
  var nn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, al = At(nn), ua = p({}, nn, { view: 0, detail: 0 }), ed = At(ua), xr, br, ca, ll = p({}, ua, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Cr,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== ca && (ca && e.type === "mousemove" ? (xr = e.screenX - ca.screenX, br = e.screenY - ca.screenY) : br = xr = 0, ca = e), xr);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : br;
    }
  }), $o = At(ll), td = p({}, ll, { dataTransfer: 0 }), id = At(td), nd = p({}, ua, { relatedTarget: 0 }), Rr = At(nd), ad = p({}, nn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ld = At(ad), rd = p({}, nn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), sd = At(rd), od = p({}, nn, { data: 0 }), eu = At(od), ud = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, cd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, hd = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function fd(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = hd[e]) ? !!t[e] : !1;
  }
  function Cr() {
    return fd;
  }
  var dd = p({}, ua, {
    key: function(e) {
      if (e.key) {
        var t = ud[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = il(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? cd[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Cr,
    charCode: function(e) {
      return e.type === "keypress" ? il(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? il(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), gd = At(dd), pd = p({}, ll, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), tu = At(pd), md = p({}, ua, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Cr
  }), vd = At(md), yd = p({}, nn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Td = At(yd), wd = p({}, ll, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Sd = At(wd), _d = p({}, nn, {
    newState: 0,
    oldState: 0
  }), Ed = At(_d), xd = [9, 13, 27, 32], Dr = di && "CompositionEvent" in window, ha = null;
  di && "documentMode" in document && (ha = document.documentMode);
  var bd = di && "TextEvent" in window && !ha, iu = di && (!Dr || ha && 8 < ha && 11 >= ha), nu = " ", au = !1;
  function lu(e, t) {
    switch (e) {
      case "keyup":
        return xd.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ru(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Dn = !1;
  function Rd(e, t) {
    switch (e) {
      case "compositionend":
        return ru(t);
      case "keypress":
        return t.which !== 32 ? null : (au = !0, nu);
      case "textInput":
        return e = t.data, e === nu && au ? null : e;
      default:
        return null;
    }
  }
  function Cd(e, t) {
    if (Dn)
      return e === "compositionend" || !Dr && lu(e, t) ? (e = Ko(), tl = Er = zi = null, Dn = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return iu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Dd = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function su(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Dd[e.type] : t === "textarea";
  }
  function ou(e, t, i, n) {
    Rn ? Cn ? Cn.push(n) : Cn = [n] : Rn = n, t = Il(t, "onChange"), 0 < t.length && (i = new al(
      "onChange",
      "change",
      null,
      i,
      n
    ), e.push({ event: i, listeners: t }));
  }
  var fa = null, da = null;
  function Ad(e) {
    Zh(e, 0);
  }
  function rl(e) {
    var t = ra(e);
    if (qo(t)) return e;
  }
  function uu(e, t) {
    if (e === "change") return t;
  }
  var cu = !1;
  if (di) {
    var Ar;
    if (di) {
      var zr = "oninput" in document;
      if (!zr) {
        var hu = document.createElement("div");
        hu.setAttribute("oninput", "return;"), zr = typeof hu.oninput == "function";
      }
      Ar = zr;
    } else Ar = !1;
    cu = Ar && (!document.documentMode || 9 < document.documentMode);
  }
  function fu() {
    fa && (fa.detachEvent("onpropertychange", du), da = fa = null);
  }
  function du(e) {
    if (e.propertyName === "value" && rl(da)) {
      var t = [];
      ou(
        t,
        da,
        e,
        wr(e)
      ), Wo(Ad, t);
    }
  }
  function zd(e, t, i) {
    e === "focusin" ? (fu(), fa = t, da = i, fa.attachEvent("onpropertychange", du)) : e === "focusout" && fu();
  }
  function Od(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return rl(da);
  }
  function Md(e, t) {
    if (e === "click") return rl(t);
  }
  function Hd(e, t) {
    if (e === "input" || e === "change")
      return rl(t);
  }
  function Bd(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Nt = typeof Object.is == "function" ? Object.is : Bd;
  function ga(e, t) {
    if (Nt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), n = Object.keys(t);
    if (i.length !== n.length) return !1;
    for (n = 0; n < i.length; n++) {
      var s = i[n];
      if (!B.call(t, s) || !Nt(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function gu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function pu(e, t) {
    var i = gu(e);
    e = 0;
    for (var n; i; ) {
      if (i.nodeType === 3) {
        if (n = e + i.textContent.length, e <= t && n >= t)
          return { node: i, offset: t - e };
        e = n;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = gu(i);
    }
  }
  function mu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? mu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function vu(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = $a(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = $a(e.document);
    }
    return t;
  }
  function Or(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Pd = di && "documentMode" in document && 11 >= document.documentMode, An = null, Mr = null, pa = null, Hr = !1;
  function yu(e, t, i) {
    var n = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Hr || An == null || An !== $a(n) || (n = An, "selectionStart" in n && Or(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), pa && ga(pa, n) || (pa = n, n = Il(Mr, "onSelect"), 0 < n.length && (t = new al(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: n }), t.target = An)));
  }
  function an(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var zn = {
    animationend: an("Animation", "AnimationEnd"),
    animationiteration: an("Animation", "AnimationIteration"),
    animationstart: an("Animation", "AnimationStart"),
    transitionrun: an("Transition", "TransitionRun"),
    transitionstart: an("Transition", "TransitionStart"),
    transitioncancel: an("Transition", "TransitionCancel"),
    transitionend: an("Transition", "TransitionEnd")
  }, Br = {}, Tu = {};
  di && (Tu = document.createElement("div").style, "AnimationEvent" in window || (delete zn.animationend.animation, delete zn.animationiteration.animation, delete zn.animationstart.animation), "TransitionEvent" in window || delete zn.transitionend.transition);
  function ln(e) {
    if (Br[e]) return Br[e];
    if (!zn[e]) return e;
    var t = zn[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in Tu)
        return Br[e] = t[i];
    return e;
  }
  var wu = ln("animationend"), Su = ln("animationiteration"), _u = ln("animationstart"), Nd = ln("transitionrun"), Ld = ln("transitionstart"), Ud = ln("transitioncancel"), Eu = ln("transitionend"), xu = /* @__PURE__ */ new Map(), Pr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Pr.push("scrollEnd");
  function ti(e, t) {
    xu.set(e, t), tn(t, [e]);
  }
  var sl = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Yt = [], On = 0, Nr = 0;
  function ol() {
    for (var e = On, t = Nr = On = 0; t < e; ) {
      var i = Yt[t];
      Yt[t++] = null;
      var n = Yt[t];
      Yt[t++] = null;
      var s = Yt[t];
      Yt[t++] = null;
      var u = Yt[t];
      if (Yt[t++] = null, n !== null && s !== null) {
        var v = n.pending;
        v === null ? s.next = s : (s.next = v.next, v.next = s), n.pending = s;
      }
      u !== 0 && bu(i, s, u);
    }
  }
  function ul(e, t, i, n) {
    Yt[On++] = e, Yt[On++] = t, Yt[On++] = i, Yt[On++] = n, Nr |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
  }
  function Lr(e, t, i, n) {
    return ul(e, t, i, n), cl(e);
  }
  function rn(e, t) {
    return ul(e, null, null, t), cl(e);
  }
  function bu(e, t, i) {
    e.lanes |= i;
    var n = e.alternate;
    n !== null && (n.lanes |= i);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= i, n = u.alternate, n !== null && (n.childLanes |= i), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - Se(i), e = u.hiddenUpdates, n = e[s], n === null ? e[s] = [t] : n.push(t), t.lane = i | 536870912), u) : null;
  }
  function cl(e) {
    if (50 < La)
      throw La = 0, Ys = null, Error(l(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Mn = {};
  function Fd(e, t, i, n) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Lt(e, t, i, n) {
    return new Fd(e, t, i, n);
  }
  function Ur(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function gi(e, t) {
    var i = e.alternate;
    return i === null ? (i = Lt(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function Ru(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function hl(e, t, i, n, s, u) {
    var v = 0;
    if (n = e, typeof e == "function") Ur(e) && (v = 1);
    else if (typeof e == "string")
      v = Zg(
        e,
        i,
        ae.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case be:
          return e = Lt(31, i, t, s), e.elementType = be, e.lanes = u, e;
        case b:
          return sn(i.children, s, u, t);
        case D:
          v = 8, s |= 24;
          break;
        case z:
          return e = Lt(12, i, t, s | 2), e.elementType = z, e.lanes = u, e;
        case ne:
          return e = Lt(13, i, t, s), e.elementType = ne, e.lanes = u, e;
        case me:
          return e = Lt(19, i, t, s), e.elementType = me, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case V:
                v = 10;
                break e;
              case G:
                v = 9;
                break e;
              case de:
                v = 11;
                break e;
              case ie:
                v = 14;
                break e;
              case Te:
                v = 16, n = null;
                break e;
            }
          v = 29, i = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), n = null;
      }
    return t = Lt(v, i, t, s), t.elementType = e, t.type = n, t.lanes = u, t;
  }
  function sn(e, t, i, n) {
    return e = Lt(7, e, n, t), e.lanes = i, e;
  }
  function Fr(e, t, i) {
    return e = Lt(6, e, null, t), e.lanes = i, e;
  }
  function Cu(e) {
    var t = Lt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Gr(e, t, i) {
    return t = Lt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = i, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Du = /* @__PURE__ */ new WeakMap();
  function kt(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = Du.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: x(t)
      }, Du.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: x(t)
    };
  }
  var Hn = [], Bn = 0, fl = null, ma = 0, It = [], Qt = 0, Oi = null, ri = 1, si = "";
  function pi(e, t) {
    Hn[Bn++] = ma, Hn[Bn++] = fl, fl = e, ma = t;
  }
  function Au(e, t, i) {
    It[Qt++] = ri, It[Qt++] = si, It[Qt++] = Oi, Oi = e;
    var n = ri;
    e = si;
    var s = 32 - Se(n) - 1;
    n &= ~(1 << s), i += 1;
    var u = 32 - Se(t) + s;
    if (30 < u) {
      var v = s - s % 5;
      u = (n & (1 << v) - 1).toString(32), n >>= v, s -= v, ri = 1 << 32 - Se(t) + s | i << s | n, si = u + e;
    } else
      ri = 1 << u | i << s | n, si = e;
  }
  function jr(e) {
    e.return !== null && (pi(e, 1), Au(e, 1, 0));
  }
  function Vr(e) {
    for (; e === fl; )
      fl = Hn[--Bn], Hn[Bn] = null, ma = Hn[--Bn], Hn[Bn] = null;
    for (; e === Oi; )
      Oi = It[--Qt], It[Qt] = null, si = It[--Qt], It[Qt] = null, ri = It[--Qt], It[Qt] = null;
  }
  function zu(e, t) {
    It[Qt++] = ri, It[Qt++] = si, It[Qt++] = Oi, ri = t.id, si = t.overflow, Oi = e;
  }
  var wt = null, at = null, Ve = !1, Mi = null, Wt = !1, qr = Error(l(519));
  function Hi(e) {
    var t = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw va(kt(t, e)), qr;
  }
  function Ou(e) {
    var t = e.stateNode, i = e.type, n = e.memoizedProps;
    switch (t[Tt] = e, t[Dt] = n, i) {
      case "dialog":
        Fe("cancel", t), Fe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Fe("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Fa.length; i++)
          Fe(Fa[i], t);
        break;
      case "source":
        Fe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Fe("error", t), Fe("load", t);
        break;
      case "details":
        Fe("toggle", t);
        break;
      case "input":
        Fe("invalid", t), Zo(
          t,
          n.value,
          n.defaultValue,
          n.checked,
          n.defaultChecked,
          n.type,
          n.name,
          !0
        );
        break;
      case "select":
        Fe("invalid", t);
        break;
      case "textarea":
        Fe("invalid", t), Yo(t, n.value, n.defaultValue, n.children);
    }
    i = n.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || n.suppressHydrationWarning === !0 || Ih(t.textContent, i) ? (n.popover != null && (Fe("beforetoggle", t), Fe("toggle", t)), n.onScroll != null && Fe("scroll", t), n.onScrollEnd != null && Fe("scrollend", t), n.onClick != null && (t.onclick = fi), t = !0) : t = !1, t || Hi(e, !0);
  }
  function Mu(e) {
    for (wt = e.return; wt; )
      switch (wt.tag) {
        case 5:
        case 31:
        case 13:
          Wt = !1;
          return;
        case 27:
        case 3:
          Wt = !0;
          return;
        default:
          wt = wt.return;
      }
  }
  function Pn(e) {
    if (e !== wt) return !1;
    if (!Ve) return Mu(e), Ve = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || so(e.type, e.memoizedProps)), i = !i), i && at && Hi(e), Mu(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      at = af(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      at = af(e);
    } else
      t === 27 ? (t = at, ki(e.type) ? (e = fo, fo = null, at = e) : at = t) : at = wt ? Jt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function on() {
    at = wt = null, Ve = !1;
  }
  function Zr() {
    var e = Mi;
    return e !== null && (Ht === null ? Ht = e : Ht.push.apply(
      Ht,
      e
    ), Mi = null), e;
  }
  function va(e) {
    Mi === null ? Mi = [e] : Mi.push(e);
  }
  var Xr = O(null), un = null, mi = null;
  function Bi(e, t, i) {
    Y(Xr, t._currentValue), t._currentValue = i;
  }
  function vi(e) {
    e._currentValue = Xr.current, Z(Xr);
  }
  function Yr(e, t, i) {
    for (; e !== null; ) {
      var n = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function kr(e, t, i, n) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var v = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var S = u;
          u = s;
          for (var A = 0; A < t.length; A++)
            if (S.context === t[A]) {
              u.lanes |= i, S = u.alternate, S !== null && (S.lanes |= i), Yr(
                u.return,
                i,
                e
              ), n || (v = null);
              break e;
            }
          u = S.next;
        }
      } else if (s.tag === 18) {
        if (v = s.return, v === null) throw Error(l(341));
        v.lanes |= i, u = v.alternate, u !== null && (u.lanes |= i), Yr(v, i, e), v = null;
      } else v = s.child;
      if (v !== null) v.return = s;
      else
        for (v = s; v !== null; ) {
          if (v === e) {
            v = null;
            break;
          }
          if (s = v.sibling, s !== null) {
            s.return = v.return, v = s;
            break;
          }
          v = v.return;
        }
      s = v;
    }
  }
  function Nn(e, t, i, n) {
    e = null;
    for (var s = t, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var v = s.alternate;
        if (v === null) throw Error(l(387));
        if (v = v.memoizedProps, v !== null) {
          var S = s.type;
          Nt(s.pendingProps.value, v.value) || (e !== null ? e.push(S) : e = [S]);
        }
      } else if (s === Ce.current) {
        if (v = s.alternate, v === null) throw Error(l(387));
        v.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(Za) : e = [Za]);
      }
      s = s.return;
    }
    e !== null && kr(
      t,
      e,
      i,
      n
    ), t.flags |= 262144;
  }
  function dl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Nt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function cn(e) {
    un = e, mi = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function St(e) {
    return Hu(un, e);
  }
  function gl(e, t) {
    return un === null && cn(e), Hu(e, t);
  }
  function Hu(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, mi === null) {
      if (e === null) throw Error(l(308));
      mi = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else mi = mi.next = t;
    return i;
  }
  var Gd = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(i, n) {
        e.push(n);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, jd = $.unstable_scheduleCallback, Vd = $.unstable_NormalPriority, ft = {
    $$typeof: V,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ir() {
    return {
      controller: new Gd(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ya(e) {
    e.refCount--, e.refCount === 0 && jd(Vd, function() {
      e.controller.abort();
    });
  }
  var Ta = null, Qr = 0, Ln = 0, Un = null;
  function qd(e, t) {
    if (Ta === null) {
      var i = Ta = [];
      Qr = 0, Ln = Js(), Un = {
        status: "pending",
        value: void 0,
        then: function(n) {
          i.push(n);
        }
      };
    }
    return Qr++, t.then(Bu, Bu), t;
  }
  function Bu() {
    if (--Qr === 0 && Ta !== null) {
      Un !== null && (Un.status = "fulfilled");
      var e = Ta;
      Ta = null, Ln = 0, Un = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Zd(e, t) {
    var i = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        i.push(s);
      }
    };
    return e.then(
      function() {
        n.status = "fulfilled", n.value = t;
        for (var s = 0; s < i.length; s++) (0, i[s])(t);
      },
      function(s) {
        for (n.status = "rejected", n.reason = s, s = 0; s < i.length; s++)
          (0, i[s])(void 0);
      }
    ), n;
  }
  var Pu = F.S;
  F.S = function(e, t) {
    yh = fe(), typeof t == "object" && t !== null && typeof t.then == "function" && qd(e, t), Pu !== null && Pu(e, t);
  };
  var hn = O(null);
  function Wr() {
    var e = hn.current;
    return e !== null ? e : nt.pooledCache;
  }
  function pl(e, t) {
    t === null ? Y(hn, hn.current) : Y(hn, t.pool);
  }
  function Nu() {
    var e = Wr();
    return e === null ? null : { parent: ft._currentValue, pool: e };
  }
  var Fn = Error(l(460)), Kr = Error(l(474)), ml = Error(l(542)), vl = { then: function() {
  } };
  function Lu(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Uu(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(fi, fi), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Gu(e), e;
      default:
        if (typeof t.status == "string") t.then(fi, fi);
        else {
          if (e = nt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(l(482));
          e = t, e.status = "pending", e.then(
            function(n) {
              if (t.status === "pending") {
                var s = t;
                s.status = "fulfilled", s.value = n;
              }
            },
            function(n) {
              if (t.status === "pending") {
                var s = t;
                s.status = "rejected", s.reason = n;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Gu(e), e;
        }
        throw dn = t, Fn;
    }
  }
  function fn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (dn = i, Fn) : i;
    }
  }
  var dn = null;
  function Fu() {
    if (dn === null) throw Error(l(459));
    var e = dn;
    return dn = null, e;
  }
  function Gu(e) {
    if (e === Fn || e === ml)
      throw Error(l(483));
  }
  var Gn = null, wa = 0;
  function yl(e) {
    var t = wa;
    return wa += 1, Gn === null && (Gn = []), Uu(Gn, e, t);
  }
  function Sa(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Tl(e, t) {
    throw t.$$typeof === T ? Error(l(525)) : (e = Object.prototype.toString.call(t), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function ju(e) {
    function t(H, M) {
      if (e) {
        var P = H.deletions;
        P === null ? (H.deletions = [M], H.flags |= 16) : P.push(M);
      }
    }
    function i(H, M) {
      if (!e) return null;
      for (; M !== null; )
        t(H, M), M = M.sibling;
      return null;
    }
    function n(H) {
      for (var M = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? M.set(H.key, H) : M.set(H.index, H), H = H.sibling;
      return M;
    }
    function s(H, M) {
      return H = gi(H, M), H.index = 0, H.sibling = null, H;
    }
    function u(H, M, P) {
      return H.index = P, e ? (P = H.alternate, P !== null ? (P = P.index, P < M ? (H.flags |= 67108866, M) : P) : (H.flags |= 67108866, M)) : (H.flags |= 1048576, M);
    }
    function v(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function S(H, M, P, X) {
      return M === null || M.tag !== 6 ? (M = Fr(P, H.mode, X), M.return = H, M) : (M = s(M, P), M.return = H, M);
    }
    function A(H, M, P, X) {
      var ye = P.type;
      return ye === b ? q(
        H,
        M,
        P.props.children,
        X,
        P.key
      ) : M !== null && (M.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Te && fn(ye) === M.type) ? (M = s(M, P.props), Sa(M, P), M.return = H, M) : (M = hl(
        P.type,
        P.key,
        P.props,
        null,
        H.mode,
        X
      ), Sa(M, P), M.return = H, M);
    }
    function N(H, M, P, X) {
      return M === null || M.tag !== 4 || M.stateNode.containerInfo !== P.containerInfo || M.stateNode.implementation !== P.implementation ? (M = Gr(P, H.mode, X), M.return = H, M) : (M = s(M, P.children || []), M.return = H, M);
    }
    function q(H, M, P, X, ye) {
      return M === null || M.tag !== 7 ? (M = sn(
        P,
        H.mode,
        X,
        ye
      ), M.return = H, M) : (M = s(M, P), M.return = H, M);
    }
    function I(H, M, P) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return M = Fr(
          "" + M,
          H.mode,
          P
        ), M.return = H, M;
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case E:
            return P = hl(
              M.type,
              M.key,
              M.props,
              null,
              H.mode,
              P
            ), Sa(P, M), P.return = H, P;
          case C:
            return M = Gr(
              M,
              H.mode,
              P
            ), M.return = H, M;
          case Te:
            return M = fn(M), I(H, M, P);
        }
        if (Xe(M) || ge(M))
          return M = sn(
            M,
            H.mode,
            P,
            null
          ), M.return = H, M;
        if (typeof M.then == "function")
          return I(H, yl(M), P);
        if (M.$$typeof === V)
          return I(
            H,
            gl(H, M),
            P
          );
        Tl(H, M);
      }
      return null;
    }
    function L(H, M, P, X) {
      var ye = M !== null ? M.key : null;
      if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint")
        return ye !== null ? null : S(H, M, "" + P, X);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case E:
            return P.key === ye ? A(H, M, P, X) : null;
          case C:
            return P.key === ye ? N(H, M, P, X) : null;
          case Te:
            return P = fn(P), L(H, M, P, X);
        }
        if (Xe(P) || ge(P))
          return ye !== null ? null : q(H, M, P, X, null);
        if (typeof P.then == "function")
          return L(
            H,
            M,
            yl(P),
            X
          );
        if (P.$$typeof === V)
          return L(
            H,
            M,
            gl(H, P),
            X
          );
        Tl(H, P);
      }
      return null;
    }
    function j(H, M, P, X, ye) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return H = H.get(P) || null, S(M, H, "" + X, ye);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case E:
            return H = H.get(
              X.key === null ? P : X.key
            ) || null, A(M, H, X, ye);
          case C:
            return H = H.get(
              X.key === null ? P : X.key
            ) || null, N(M, H, X, ye);
          case Te:
            return X = fn(X), j(
              H,
              M,
              P,
              X,
              ye
            );
        }
        if (Xe(X) || ge(X))
          return H = H.get(P) || null, q(M, H, X, ye, null);
        if (typeof X.then == "function")
          return j(
            H,
            M,
            P,
            yl(X),
            ye
          );
        if (X.$$typeof === V)
          return j(
            H,
            M,
            P,
            gl(M, X),
            ye
          );
        Tl(M, X);
      }
      return null;
    }
    function ce(H, M, P, X) {
      for (var ye = null, Ye = null, pe = M, Pe = M = 0, je = null; pe !== null && Pe < P.length; Pe++) {
        pe.index > Pe ? (je = pe, pe = null) : je = pe.sibling;
        var ke = L(
          H,
          pe,
          P[Pe],
          X
        );
        if (ke === null) {
          pe === null && (pe = je);
          break;
        }
        e && pe && ke.alternate === null && t(H, pe), M = u(ke, M, Pe), Ye === null ? ye = ke : Ye.sibling = ke, Ye = ke, pe = je;
      }
      if (Pe === P.length)
        return i(H, pe), Ve && pi(H, Pe), ye;
      if (pe === null) {
        for (; Pe < P.length; Pe++)
          pe = I(H, P[Pe], X), pe !== null && (M = u(
            pe,
            M,
            Pe
          ), Ye === null ? ye = pe : Ye.sibling = pe, Ye = pe);
        return Ve && pi(H, Pe), ye;
      }
      for (pe = n(pe); Pe < P.length; Pe++)
        je = j(
          pe,
          H,
          Pe,
          P[Pe],
          X
        ), je !== null && (e && je.alternate !== null && pe.delete(
          je.key === null ? Pe : je.key
        ), M = u(
          je,
          M,
          Pe
        ), Ye === null ? ye = je : Ye.sibling = je, Ye = je);
      return e && pe.forEach(function(Ji) {
        return t(H, Ji);
      }), Ve && pi(H, Pe), ye;
    }
    function Ee(H, M, P, X) {
      if (P == null) throw Error(l(151));
      for (var ye = null, Ye = null, pe = M, Pe = M = 0, je = null, ke = P.next(); pe !== null && !ke.done; Pe++, ke = P.next()) {
        pe.index > Pe ? (je = pe, pe = null) : je = pe.sibling;
        var Ji = L(H, pe, ke.value, X);
        if (Ji === null) {
          pe === null && (pe = je);
          break;
        }
        e && pe && Ji.alternate === null && t(H, pe), M = u(Ji, M, Pe), Ye === null ? ye = Ji : Ye.sibling = Ji, Ye = Ji, pe = je;
      }
      if (ke.done)
        return i(H, pe), Ve && pi(H, Pe), ye;
      if (pe === null) {
        for (; !ke.done; Pe++, ke = P.next())
          ke = I(H, ke.value, X), ke !== null && (M = u(ke, M, Pe), Ye === null ? ye = ke : Ye.sibling = ke, Ye = ke);
        return Ve && pi(H, Pe), ye;
      }
      for (pe = n(pe); !ke.done; Pe++, ke = P.next())
        ke = j(pe, H, Pe, ke.value, X), ke !== null && (e && ke.alternate !== null && pe.delete(ke.key === null ? Pe : ke.key), M = u(ke, M, Pe), Ye === null ? ye = ke : Ye.sibling = ke, Ye = ke);
      return e && pe.forEach(function(tp) {
        return t(H, tp);
      }), Ve && pi(H, Pe), ye;
    }
    function it(H, M, P, X) {
      if (typeof P == "object" && P !== null && P.type === b && P.key === null && (P = P.props.children), typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case E:
            e: {
              for (var ye = P.key; M !== null; ) {
                if (M.key === ye) {
                  if (ye = P.type, ye === b) {
                    if (M.tag === 7) {
                      i(
                        H,
                        M.sibling
                      ), X = s(
                        M,
                        P.props.children
                      ), X.return = H, H = X;
                      break e;
                    }
                  } else if (M.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Te && fn(ye) === M.type) {
                    i(
                      H,
                      M.sibling
                    ), X = s(M, P.props), Sa(X, P), X.return = H, H = X;
                    break e;
                  }
                  i(H, M);
                  break;
                } else t(H, M);
                M = M.sibling;
              }
              P.type === b ? (X = sn(
                P.props.children,
                H.mode,
                X,
                P.key
              ), X.return = H, H = X) : (X = hl(
                P.type,
                P.key,
                P.props,
                null,
                H.mode,
                X
              ), Sa(X, P), X.return = H, H = X);
            }
            return v(H);
          case C:
            e: {
              for (ye = P.key; M !== null; ) {
                if (M.key === ye)
                  if (M.tag === 4 && M.stateNode.containerInfo === P.containerInfo && M.stateNode.implementation === P.implementation) {
                    i(
                      H,
                      M.sibling
                    ), X = s(M, P.children || []), X.return = H, H = X;
                    break e;
                  } else {
                    i(H, M);
                    break;
                  }
                else t(H, M);
                M = M.sibling;
              }
              X = Gr(P, H.mode, X), X.return = H, H = X;
            }
            return v(H);
          case Te:
            return P = fn(P), it(
              H,
              M,
              P,
              X
            );
        }
        if (Xe(P))
          return ce(
            H,
            M,
            P,
            X
          );
        if (ge(P)) {
          if (ye = ge(P), typeof ye != "function") throw Error(l(150));
          return P = ye.call(P), Ee(
            H,
            M,
            P,
            X
          );
        }
        if (typeof P.then == "function")
          return it(
            H,
            M,
            yl(P),
            X
          );
        if (P.$$typeof === V)
          return it(
            H,
            M,
            gl(H, P),
            X
          );
        Tl(H, P);
      }
      return typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint" ? (P = "" + P, M !== null && M.tag === 6 ? (i(H, M.sibling), X = s(M, P), X.return = H, H = X) : (i(H, M), X = Fr(P, H.mode, X), X.return = H, H = X), v(H)) : i(H, M);
    }
    return function(H, M, P, X) {
      try {
        wa = 0;
        var ye = it(
          H,
          M,
          P,
          X
        );
        return Gn = null, ye;
      } catch (pe) {
        if (pe === Fn || pe === ml) throw pe;
        var Ye = Lt(29, pe, null, H.mode);
        return Ye.lanes = X, Ye.return = H, Ye;
      }
    };
  }
  var gn = ju(!0), Vu = ju(!1), Pi = !1;
  function Jr(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function $r(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ni(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Li(e, t, i) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (Ie & 2) !== 0) {
      var s = n.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), n.pending = t, t = cl(e), bu(e, null, i), t;
    }
    return ul(e, n, t, i), cl(e);
  }
  function _a(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var n = t.lanes;
      n &= e.pendingLanes, i |= n, t.lanes = i, Ho(e, i);
    }
  }
  function es(e, t) {
    var i = e.updateQueue, n = e.alternate;
    if (n !== null && (n = n.updateQueue, i === n)) {
      var s = null, u = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var v = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          u === null ? s = u = v : u = u.next = v, i = i.next;
        } while (i !== null);
        u === null ? s = u = t : u = u.next = t;
      } else s = u = t;
      i = {
        baseState: n.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: u,
        shared: n.shared,
        callbacks: n.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = t : e.next = t, i.lastBaseUpdate = t;
  }
  var ts = !1;
  function Ea() {
    if (ts) {
      var e = Un;
      if (e !== null) throw e;
    }
  }
  function xa(e, t, i, n) {
    ts = !1;
    var s = e.updateQueue;
    Pi = !1;
    var u = s.firstBaseUpdate, v = s.lastBaseUpdate, S = s.shared.pending;
    if (S !== null) {
      s.shared.pending = null;
      var A = S, N = A.next;
      A.next = null, v === null ? u = N : v.next = N, v = A;
      var q = e.alternate;
      q !== null && (q = q.updateQueue, S = q.lastBaseUpdate, S !== v && (S === null ? q.firstBaseUpdate = N : S.next = N, q.lastBaseUpdate = A));
    }
    if (u !== null) {
      var I = s.baseState;
      v = 0, q = N = A = null, S = u;
      do {
        var L = S.lane & -536870913, j = L !== S.lane;
        if (j ? (Ge & L) === L : (n & L) === L) {
          L !== 0 && L === Ln && (ts = !0), q !== null && (q = q.next = {
            lane: 0,
            tag: S.tag,
            payload: S.payload,
            callback: null,
            next: null
          });
          e: {
            var ce = e, Ee = S;
            L = t;
            var it = i;
            switch (Ee.tag) {
              case 1:
                if (ce = Ee.payload, typeof ce == "function") {
                  I = ce.call(it, I, L);
                  break e;
                }
                I = ce;
                break e;
              case 3:
                ce.flags = ce.flags & -65537 | 128;
              case 0:
                if (ce = Ee.payload, L = typeof ce == "function" ? ce.call(it, I, L) : ce, L == null) break e;
                I = p({}, I, L);
                break e;
              case 2:
                Pi = !0;
            }
          }
          L = S.callback, L !== null && (e.flags |= 64, j && (e.flags |= 8192), j = s.callbacks, j === null ? s.callbacks = [L] : j.push(L));
        } else
          j = {
            lane: L,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null
          }, q === null ? (N = q = j, A = I) : q = q.next = j, v |= L;
        if (S = S.next, S === null) {
          if (S = s.shared.pending, S === null)
            break;
          j = S, S = j.next, j.next = null, s.lastBaseUpdate = j, s.shared.pending = null;
        }
      } while (!0);
      q === null && (A = I), s.baseState = A, s.firstBaseUpdate = N, s.lastBaseUpdate = q, u === null && (s.shared.lanes = 0), Vi |= v, e.lanes = v, e.memoizedState = I;
    }
  }
  function qu(e, t) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(t);
  }
  function Zu(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        qu(i[e], t);
  }
  var jn = O(null), wl = O(0);
  function Xu(e, t) {
    e = Ri, Y(wl, e), Y(jn, t), Ri = e | t.baseLanes;
  }
  function is() {
    Y(wl, Ri), Y(jn, jn.current);
  }
  function ns() {
    Ri = wl.current, Z(jn), Z(wl);
  }
  var Ut = O(null), Kt = null;
  function Ui(e) {
    var t = e.alternate;
    Y(ut, ut.current & 1), Y(Ut, e), Kt === null && (t === null || jn.current !== null || t.memoizedState !== null) && (Kt = e);
  }
  function as(e) {
    Y(ut, ut.current), Y(Ut, e), Kt === null && (Kt = e);
  }
  function Yu(e) {
    e.tag === 22 ? (Y(ut, ut.current), Y(Ut, e), Kt === null && (Kt = e)) : Fi();
  }
  function Fi() {
    Y(ut, ut.current), Y(Ut, Ut.current);
  }
  function Ft(e) {
    Z(Ut), Kt === e && (Kt = null), Z(ut);
  }
  var ut = O(0);
  function Sl(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || co(i) || ho(i)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var yi = 0, He = null, et = null, dt = null, _l = !1, Vn = !1, pn = !1, El = 0, ba = 0, qn = null, Xd = 0;
  function st() {
    throw Error(l(321));
  }
  function ls(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!Nt(e[i], t[i])) return !1;
    return !0;
  }
  function rs(e, t, i, n, s, u) {
    return yi = u, He = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, F.H = e === null || e.memoizedState === null ? Ac : Ss, pn = !1, u = i(n, s), pn = !1, Vn && (u = Iu(
      t,
      i,
      n,
      s
    )), ku(e), u;
  }
  function ku(e) {
    F.H = Da;
    var t = et !== null && et.next !== null;
    if (yi = 0, dt = et = He = null, _l = !1, ba = 0, qn = null, t) throw Error(l(300));
    e === null || gt || (e = e.dependencies, e !== null && dl(e) && (gt = !0));
  }
  function Iu(e, t, i, n) {
    He = e;
    var s = 0;
    do {
      if (Vn && (qn = null), ba = 0, Vn = !1, 25 <= s) throw Error(l(301));
      if (s += 1, dt = et = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      F.H = zc, u = t(i, n);
    } while (Vn);
    return u;
  }
  function Yd() {
    var e = F.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Ra(t) : t, e = e.useState()[0], (et !== null ? et.memoizedState : null) !== e && (He.flags |= 1024), t;
  }
  function ss() {
    var e = El !== 0;
    return El = 0, e;
  }
  function os(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function us(e) {
    if (_l) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      _l = !1;
    }
    yi = 0, dt = et = He = null, Vn = !1, ba = El = 0, qn = null;
  }
  function Ct() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return dt === null ? He.memoizedState = dt = e : dt = dt.next = e, dt;
  }
  function ct() {
    if (et === null) {
      var e = He.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = et.next;
    var t = dt === null ? He.memoizedState : dt.next;
    if (t !== null)
      dt = t, et = e;
    else {
      if (e === null)
        throw He.alternate === null ? Error(l(467)) : Error(l(310));
      et = e, e = {
        memoizedState: et.memoizedState,
        baseState: et.baseState,
        baseQueue: et.baseQueue,
        queue: et.queue,
        next: null
      }, dt === null ? He.memoizedState = dt = e : dt = dt.next = e;
    }
    return dt;
  }
  function xl() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ra(e) {
    var t = ba;
    return ba += 1, qn === null && (qn = []), e = Uu(qn, e, t), t = He, (dt === null ? t.memoizedState : dt.next) === null && (t = t.alternate, F.H = t === null || t.memoizedState === null ? Ac : Ss), e;
  }
  function bl(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ra(e);
      if (e.$$typeof === V) return St(e);
    }
    throw Error(l(438, String(e)));
  }
  function cs(e) {
    var t = null, i = He.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var n = He.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (t = {
        data: n.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = xl(), He.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), n = 0; n < e; n++)
        i[n] = qe;
    return t.index++, i;
  }
  function Ti(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Rl(e) {
    var t = ct();
    return hs(t, et, e);
  }
  function hs(e, t, i) {
    var n = e.queue;
    if (n === null) throw Error(l(311));
    n.lastRenderedReducer = i;
    var s = e.baseQueue, u = n.pending;
    if (u !== null) {
      if (s !== null) {
        var v = s.next;
        s.next = u.next, u.next = v;
      }
      t.baseQueue = s = u, n.pending = null;
    }
    if (u = e.baseState, s === null) e.memoizedState = u;
    else {
      t = s.next;
      var S = v = null, A = null, N = t, q = !1;
      do {
        var I = N.lane & -536870913;
        if (I !== N.lane ? (Ge & I) === I : (yi & I) === I) {
          var L = N.revertLane;
          if (L === 0)
            A !== null && (A = A.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }), I === Ln && (q = !0);
          else if ((yi & L) === L) {
            N = N.next, L === Ln && (q = !0);
            continue;
          } else
            I = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, A === null ? (S = A = I, v = u) : A = A.next = I, He.lanes |= L, Vi |= L;
          I = N.action, pn && i(u, I), u = N.hasEagerState ? N.eagerState : i(u, I);
        } else
          L = {
            lane: I,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, A === null ? (S = A = L, v = u) : A = A.next = L, He.lanes |= I, Vi |= I;
        N = N.next;
      } while (N !== null && N !== t);
      if (A === null ? v = u : A.next = S, !Nt(u, e.memoizedState) && (gt = !0, q && (i = Un, i !== null)))
        throw i;
      e.memoizedState = u, e.baseState = v, e.baseQueue = A, n.lastRenderedState = u;
    }
    return s === null && (n.lanes = 0), [e.memoizedState, n.dispatch];
  }
  function fs(e) {
    var t = ct(), i = t.queue;
    if (i === null) throw Error(l(311));
    i.lastRenderedReducer = e;
    var n = i.dispatch, s = i.pending, u = t.memoizedState;
    if (s !== null) {
      i.pending = null;
      var v = s = s.next;
      do
        u = e(u, v.action), v = v.next;
      while (v !== s);
      Nt(u, t.memoizedState) || (gt = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), i.lastRenderedState = u;
    }
    return [u, n];
  }
  function Qu(e, t, i) {
    var n = He, s = ct(), u = Ve;
    if (u) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = t();
    var v = !Nt(
      (et || s).memoizedState,
      i
    );
    if (v && (s.memoizedState = i, gt = !0), s = s.queue, ps(Ju.bind(null, n, s, e), [
      e
    ]), s.getSnapshot !== t || v || dt !== null && dt.memoizedState.tag & 1) {
      if (n.flags |= 2048, Zn(
        9,
        { destroy: void 0 },
        Ku.bind(
          null,
          n,
          s,
          i,
          t
        ),
        null
      ), nt === null) throw Error(l(349));
      u || (yi & 127) !== 0 || Wu(n, t, i);
    }
    return i;
  }
  function Wu(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = He.updateQueue, t === null ? (t = xl(), He.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function Ku(e, t, i, n) {
    t.value = i, t.getSnapshot = n, $u(t) && ec(e);
  }
  function Ju(e, t, i) {
    return i(function() {
      $u(t) && ec(e);
    });
  }
  function $u(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !Nt(e, i);
    } catch {
      return !0;
    }
  }
  function ec(e) {
    var t = rn(e, 2);
    t !== null && Bt(t, e, 2);
  }
  function ds(e) {
    var t = Ct();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), pn) {
        re(!0);
        try {
          i();
        } finally {
          re(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ti,
      lastRenderedState: e
    }, t;
  }
  function tc(e, t, i, n) {
    return e.baseState = i, hs(
      e,
      et,
      typeof n == "function" ? n : Ti
    );
  }
  function kd(e, t, i, n, s) {
    if (Al(e)) throw Error(l(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(v) {
          u.listeners.push(v);
        }
      };
      F.T !== null ? i(!0) : u.isTransition = !1, n(u), i = t.pending, i === null ? (u.next = t.pending = u, ic(t, u)) : (u.next = i.next, t.pending = i.next = u);
    }
  }
  function ic(e, t) {
    var i = t.action, n = t.payload, s = e.state;
    if (t.isTransition) {
      var u = F.T, v = {};
      F.T = v;
      try {
        var S = i(s, n), A = F.S;
        A !== null && A(v, S), nc(e, t, S);
      } catch (N) {
        gs(e, t, N);
      } finally {
        u !== null && v.types !== null && (u.types = v.types), F.T = u;
      }
    } else
      try {
        u = i(s, n), nc(e, t, u);
      } catch (N) {
        gs(e, t, N);
      }
  }
  function nc(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(n) {
        ac(e, t, n);
      },
      function(n) {
        return gs(e, t, n);
      }
    ) : ac(e, t, i);
  }
  function ac(e, t, i) {
    t.status = "fulfilled", t.value = i, lc(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, ic(e, i)));
  }
  function gs(e, t, i) {
    var n = e.pending;
    if (e.pending = null, n !== null) {
      n = n.next;
      do
        t.status = "rejected", t.reason = i, lc(t), t = t.next;
      while (t !== n);
    }
    e.action = null;
  }
  function lc(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function rc(e, t) {
    return t;
  }
  function sc(e, t) {
    if (Ve) {
      var i = nt.formState;
      if (i !== null) {
        e: {
          var n = He;
          if (Ve) {
            if (at) {
              t: {
                for (var s = at, u = Wt; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break t;
                  }
                  if (s = Jt(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                u = s.data, s = u === "F!" || u === "F" ? s : null;
              }
              if (s) {
                at = Jt(
                  s.nextSibling
                ), n = s.data === "F!";
                break e;
              }
            }
            Hi(n);
          }
          n = !1;
        }
        n && (t = i[0]);
      }
    }
    return i = Ct(), i.memoizedState = i.baseState = t, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: rc,
      lastRenderedState: t
    }, i.queue = n, i = Rc.bind(
      null,
      He,
      n
    ), n.dispatch = i, n = ds(!1), u = ws.bind(
      null,
      He,
      !1,
      n.queue
    ), n = Ct(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, n.queue = s, i = kd.bind(
      null,
      He,
      s,
      u,
      i
    ), s.dispatch = i, n.memoizedState = e, [t, i, !1];
  }
  function oc(e) {
    var t = ct();
    return uc(t, et, e);
  }
  function uc(e, t, i) {
    if (t = hs(
      e,
      t,
      rc
    )[0], e = Rl(Ti)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var n = Ra(t);
      } catch (v) {
        throw v === Fn ? ml : v;
      }
    else n = t;
    t = ct();
    var s = t.queue, u = s.dispatch;
    return i !== t.memoizedState && (He.flags |= 2048, Zn(
      9,
      { destroy: void 0 },
      Id.bind(null, s, i),
      null
    )), [n, u, e];
  }
  function Id(e, t) {
    e.action = t;
  }
  function cc(e) {
    var t = ct(), i = et;
    if (i !== null)
      return uc(t, i, e);
    ct(), t = t.memoizedState, i = ct();
    var n = i.queue.dispatch;
    return i.memoizedState = e, [t, n, !1];
  }
  function Zn(e, t, i, n) {
    return e = { tag: e, create: i, deps: n, inst: t, next: null }, t = He.updateQueue, t === null && (t = xl(), He.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (n = i.next, i.next = e, e.next = n, t.lastEffect = e), e;
  }
  function hc() {
    return ct().memoizedState;
  }
  function Cl(e, t, i, n) {
    var s = Ct();
    He.flags |= e, s.memoizedState = Zn(
      1 | t,
      { destroy: void 0 },
      i,
      n === void 0 ? null : n
    );
  }
  function Dl(e, t, i, n) {
    var s = ct();
    n = n === void 0 ? null : n;
    var u = s.memoizedState.inst;
    et !== null && n !== null && ls(n, et.memoizedState.deps) ? s.memoizedState = Zn(t, u, i, n) : (He.flags |= e, s.memoizedState = Zn(
      1 | t,
      u,
      i,
      n
    ));
  }
  function fc(e, t) {
    Cl(8390656, 8, e, t);
  }
  function ps(e, t) {
    Dl(2048, 8, e, t);
  }
  function Qd(e) {
    He.flags |= 4;
    var t = He.updateQueue;
    if (t === null)
      t = xl(), He.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function dc(e) {
    var t = ct().memoizedState;
    return Qd({ ref: t, nextImpl: e }), function() {
      if ((Ie & 2) !== 0) throw Error(l(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function gc(e, t) {
    return Dl(4, 2, e, t);
  }
  function pc(e, t) {
    return Dl(4, 4, e, t);
  }
  function mc(e, t) {
    if (typeof t == "function") {
      e = e();
      var i = t(e);
      return function() {
        typeof i == "function" ? i() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function vc(e, t, i) {
    i = i != null ? i.concat([e]) : null, Dl(4, 4, mc.bind(null, t, e), i);
  }
  function ms() {
  }
  function yc(e, t) {
    var i = ct();
    t = t === void 0 ? null : t;
    var n = i.memoizedState;
    return t !== null && ls(t, n[1]) ? n[0] : (i.memoizedState = [e, t], e);
  }
  function Tc(e, t) {
    var i = ct();
    t = t === void 0 ? null : t;
    var n = i.memoizedState;
    if (t !== null && ls(t, n[1]))
      return n[0];
    if (n = e(), pn) {
      re(!0);
      try {
        e();
      } finally {
        re(!1);
      }
    }
    return i.memoizedState = [n, t], n;
  }
  function vs(e, t, i) {
    return i === void 0 || (yi & 1073741824) !== 0 && (Ge & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = wh(), He.lanes |= e, Vi |= e, i);
  }
  function wc(e, t, i, n) {
    return Nt(i, t) ? i : jn.current !== null ? (e = vs(e, i, n), Nt(e, t) || (gt = !0), e) : (yi & 42) === 0 || (yi & 1073741824) !== 0 && (Ge & 261930) === 0 ? (gt = !0, e.memoizedState = i) : (e = wh(), He.lanes |= e, Vi |= e, t);
  }
  function Sc(e, t, i, n, s) {
    var u = ee.p;
    ee.p = u !== 0 && 8 > u ? u : 8;
    var v = F.T, S = {};
    F.T = S, ws(e, !1, t, i);
    try {
      var A = s(), N = F.S;
      if (N !== null && N(S, A), A !== null && typeof A == "object" && typeof A.then == "function") {
        var q = Zd(
          A,
          n
        );
        Ca(
          e,
          t,
          q,
          Vt(e)
        );
      } else
        Ca(
          e,
          t,
          n,
          Vt(e)
        );
    } catch (I) {
      Ca(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: I },
        Vt()
      );
    } finally {
      ee.p = u, v !== null && S.types !== null && (v.types = S.types), F.T = v;
    }
  }
  function Wd() {
  }
  function ys(e, t, i, n) {
    if (e.tag !== 5) throw Error(l(476));
    var s = _c(e).queue;
    Sc(
      e,
      s,
      t,
      se,
      i === null ? Wd : function() {
        return Ec(e), i(n);
      }
    );
  }
  function _c(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: se,
      baseState: se,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ti,
        lastRenderedState: se
      },
      next: null
    };
    var i = {};
    return t.next = {
      memoizedState: i,
      baseState: i,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ti,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Ec(e) {
    var t = _c(e);
    t.next === null && (t = e.alternate.memoizedState), Ca(
      e,
      t.next.queue,
      {},
      Vt()
    );
  }
  function Ts() {
    return St(Za);
  }
  function xc() {
    return ct().memoizedState;
  }
  function bc() {
    return ct().memoizedState;
  }
  function Kd(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = Vt();
          e = Ni(i);
          var n = Li(t, e, i);
          n !== null && (Bt(n, t, i), _a(n, t, i)), t = { cache: Ir() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Jd(e, t, i) {
    var n = Vt();
    i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Al(e) ? Cc(t, i) : (i = Lr(e, t, i, n), i !== null && (Bt(i, e, n), Dc(i, t, n)));
  }
  function Rc(e, t, i) {
    var n = Vt();
    Ca(e, t, i, n);
  }
  function Ca(e, t, i, n) {
    var s = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Al(e)) Cc(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var v = t.lastRenderedState, S = u(v, i);
          if (s.hasEagerState = !0, s.eagerState = S, Nt(S, v))
            return ul(e, t, s, 0), nt === null && ol(), !1;
        } catch {
        }
      if (i = Lr(e, t, s, n), i !== null)
        return Bt(i, e, n), Dc(i, t, n), !0;
    }
    return !1;
  }
  function ws(e, t, i, n) {
    if (n = {
      lane: 2,
      revertLane: Js(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Al(e)) {
      if (t) throw Error(l(479));
    } else
      t = Lr(
        e,
        i,
        n,
        2
      ), t !== null && Bt(t, e, 2);
  }
  function Al(e) {
    var t = e.alternate;
    return e === He || t !== null && t === He;
  }
  function Cc(e, t) {
    Vn = _l = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function Dc(e, t, i) {
    if ((i & 4194048) !== 0) {
      var n = t.lanes;
      n &= e.pendingLanes, i |= n, t.lanes = i, Ho(e, i);
    }
  }
  var Da = {
    readContext: St,
    use: bl,
    useCallback: st,
    useContext: st,
    useEffect: st,
    useImperativeHandle: st,
    useLayoutEffect: st,
    useInsertionEffect: st,
    useMemo: st,
    useReducer: st,
    useRef: st,
    useState: st,
    useDebugValue: st,
    useDeferredValue: st,
    useTransition: st,
    useSyncExternalStore: st,
    useId: st,
    useHostTransitionStatus: st,
    useFormState: st,
    useActionState: st,
    useOptimistic: st,
    useMemoCache: st,
    useCacheRefresh: st
  };
  Da.useEffectEvent = st;
  var Ac = {
    readContext: St,
    use: bl,
    useCallback: function(e, t) {
      return Ct().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: St,
    useEffect: fc,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Cl(
        4194308,
        4,
        mc.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return Cl(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Cl(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = Ct();
      t = t === void 0 ? null : t;
      var n = e();
      if (pn) {
        re(!0);
        try {
          e();
        } finally {
          re(!1);
        }
      }
      return i.memoizedState = [n, t], n;
    },
    useReducer: function(e, t, i) {
      var n = Ct();
      if (i !== void 0) {
        var s = i(t);
        if (pn) {
          re(!0);
          try {
            i(t);
          } finally {
            re(!1);
          }
        }
      } else s = t;
      return n.memoizedState = n.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, n.queue = e, e = e.dispatch = Jd.bind(
        null,
        He,
        e
      ), [n.memoizedState, e];
    },
    useRef: function(e) {
      var t = Ct();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = ds(e);
      var t = e.queue, i = Rc.bind(null, He, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: ms,
    useDeferredValue: function(e, t) {
      var i = Ct();
      return vs(i, e, t);
    },
    useTransition: function() {
      var e = ds(!1);
      return e = Sc.bind(
        null,
        He,
        e.queue,
        !0,
        !1
      ), Ct().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var n = He, s = Ct();
      if (Ve) {
        if (i === void 0)
          throw Error(l(407));
        i = i();
      } else {
        if (i = t(), nt === null)
          throw Error(l(349));
        (Ge & 127) !== 0 || Wu(n, t, i);
      }
      s.memoizedState = i;
      var u = { value: i, getSnapshot: t };
      return s.queue = u, fc(Ju.bind(null, n, u, e), [
        e
      ]), n.flags |= 2048, Zn(
        9,
        { destroy: void 0 },
        Ku.bind(
          null,
          n,
          u,
          i,
          t
        ),
        null
      ), i;
    },
    useId: function() {
      var e = Ct(), t = nt.identifierPrefix;
      if (Ve) {
        var i = si, n = ri;
        i = (n & ~(1 << 32 - Se(n) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = El++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = Xd++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Ts,
    useFormState: sc,
    useActionState: sc,
    useOptimistic: function(e) {
      var t = Ct();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = ws.bind(
        null,
        He,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: cs,
    useCacheRefresh: function() {
      return Ct().memoizedState = Kd.bind(
        null,
        He
      );
    },
    useEffectEvent: function(e) {
      var t = Ct(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((Ie & 2) !== 0)
          throw Error(l(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Ss = {
    readContext: St,
    use: bl,
    useCallback: yc,
    useContext: St,
    useEffect: ps,
    useImperativeHandle: vc,
    useInsertionEffect: gc,
    useLayoutEffect: pc,
    useMemo: Tc,
    useReducer: Rl,
    useRef: hc,
    useState: function() {
      return Rl(Ti);
    },
    useDebugValue: ms,
    useDeferredValue: function(e, t) {
      var i = ct();
      return wc(
        i,
        et.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Rl(Ti)[0], t = ct().memoizedState;
      return [
        typeof e == "boolean" ? e : Ra(e),
        t
      ];
    },
    useSyncExternalStore: Qu,
    useId: xc,
    useHostTransitionStatus: Ts,
    useFormState: oc,
    useActionState: oc,
    useOptimistic: function(e, t) {
      var i = ct();
      return tc(i, et, e, t);
    },
    useMemoCache: cs,
    useCacheRefresh: bc
  };
  Ss.useEffectEvent = dc;
  var zc = {
    readContext: St,
    use: bl,
    useCallback: yc,
    useContext: St,
    useEffect: ps,
    useImperativeHandle: vc,
    useInsertionEffect: gc,
    useLayoutEffect: pc,
    useMemo: Tc,
    useReducer: fs,
    useRef: hc,
    useState: function() {
      return fs(Ti);
    },
    useDebugValue: ms,
    useDeferredValue: function(e, t) {
      var i = ct();
      return et === null ? vs(i, e, t) : wc(
        i,
        et.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = fs(Ti)[0], t = ct().memoizedState;
      return [
        typeof e == "boolean" ? e : Ra(e),
        t
      ];
    },
    useSyncExternalStore: Qu,
    useId: xc,
    useHostTransitionStatus: Ts,
    useFormState: cc,
    useActionState: cc,
    useOptimistic: function(e, t) {
      var i = ct();
      return et !== null ? tc(i, et, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: cs,
    useCacheRefresh: bc
  };
  zc.useEffectEvent = dc;
  function _s(e, t, i, n) {
    t = e.memoizedState, i = i(n, t), i = i == null ? t : p({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Es = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var n = Vt(), s = Ni(n);
      s.payload = t, i != null && (s.callback = i), t = Li(e, s, n), t !== null && (Bt(t, e, n), _a(t, e, n));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var n = Vt(), s = Ni(n);
      s.tag = 1, s.payload = t, i != null && (s.callback = i), t = Li(e, s, n), t !== null && (Bt(t, e, n), _a(t, e, n));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = Vt(), n = Ni(i);
      n.tag = 2, t != null && (n.callback = t), t = Li(e, n, i), t !== null && (Bt(t, e, i), _a(t, e, i));
    }
  };
  function Oc(e, t, i, n, s, u, v) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, u, v) : t.prototype && t.prototype.isPureReactComponent ? !ga(i, n) || !ga(s, u) : !0;
  }
  function Mc(e, t, i, n) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, n), t.state !== e && Es.enqueueReplaceState(t, t.state, null);
  }
  function mn(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var n in t)
        n !== "ref" && (i[n] = t[n]);
    }
    if (e = e.defaultProps) {
      i === t && (i = p({}, i));
      for (var s in e)
        i[s] === void 0 && (i[s] = e[s]);
    }
    return i;
  }
  function Hc(e) {
    sl(e);
  }
  function Bc(e) {
    console.error(e);
  }
  function Pc(e) {
    sl(e);
  }
  function zl(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Nc(e, t, i) {
    try {
      var n = e.onCaughtError;
      n(i.value, {
        componentStack: i.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function xs(e, t, i) {
    return i = Ni(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      zl(e, t);
    }, i;
  }
  function Lc(e) {
    return e = Ni(e), e.tag = 3, e;
  }
  function Uc(e, t, i, n) {
    var s = i.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = n.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        Nc(t, i, n);
      };
    }
    var v = i.stateNode;
    v !== null && typeof v.componentDidCatch == "function" && (e.callback = function() {
      Nc(t, i, n), typeof s != "function" && (qi === null ? qi = /* @__PURE__ */ new Set([this]) : qi.add(this));
      var S = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: S !== null ? S : ""
      });
    });
  }
  function $d(e, t, i, n, s) {
    if (i.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (t = i.alternate, t !== null && Nn(
        t,
        i,
        s,
        !0
      ), i = Ut.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Kt === null ? Vl() : i.alternate === null && ot === 0 && (ot = 3), i.flags &= -257, i.flags |= 65536, i.lanes = s, n === vl ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([n]) : t.add(n), Qs(e, n, s)), !1;
          case 22:
            return i.flags |= 65536, n === vl ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([n]) : i.add(n)), Qs(e, n, s)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return Qs(e, n, s), Vl(), !1;
    }
    if (Ve)
      return t = Ut.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, n !== qr && (e = Error(l(422), { cause: n }), va(kt(e, i)))) : (n !== qr && (t = Error(l(423), {
        cause: n
      }), va(
        kt(t, i)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, n = kt(n, i), s = xs(
        e.stateNode,
        n,
        s
      ), es(e, s), ot !== 4 && (ot = 2)), !1;
    var u = Error(l(520), { cause: n });
    if (u = kt(u, i), Na === null ? Na = [u] : Na.push(u), ot !== 4 && (ot = 2), t === null) return !0;
    n = kt(n, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = s & -s, i.lanes |= e, e = xs(i.stateNode, n, e), es(i, e), !1;
        case 1:
          if (t = i.type, u = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (qi === null || !qi.has(u))))
            return i.flags |= 65536, s &= -s, i.lanes |= s, s = Lc(s), Uc(
              s,
              e,
              i,
              n
            ), es(i, s), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var bs = Error(l(461)), gt = !1;
  function _t(e, t, i, n) {
    t.child = e === null ? Vu(t, null, i, n) : gn(
      t,
      e.child,
      i,
      n
    );
  }
  function Fc(e, t, i, n, s) {
    i = i.render;
    var u = t.ref;
    if ("ref" in n) {
      var v = {};
      for (var S in n)
        S !== "ref" && (v[S] = n[S]);
    } else v = n;
    return cn(t), n = rs(
      e,
      t,
      i,
      v,
      u,
      s
    ), S = ss(), e !== null && !gt ? (os(e, t, s), wi(e, t, s)) : (Ve && S && jr(t), t.flags |= 1, _t(e, t, n, s), t.child);
  }
  function Gc(e, t, i, n, s) {
    if (e === null) {
      var u = i.type;
      return typeof u == "function" && !Ur(u) && u.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = u, jc(
        e,
        t,
        u,
        n,
        s
      )) : (e = hl(
        i.type,
        null,
        n,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Hs(e, s)) {
      var v = u.memoizedProps;
      if (i = i.compare, i = i !== null ? i : ga, i(v, n) && e.ref === t.ref)
        return wi(e, t, s);
    }
    return t.flags |= 1, e = gi(u, n), e.ref = t.ref, e.return = t, t.child = e;
  }
  function jc(e, t, i, n, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (ga(u, n) && e.ref === t.ref)
        if (gt = !1, t.pendingProps = n = u, Hs(e, s))
          (e.flags & 131072) !== 0 && (gt = !0);
        else
          return t.lanes = e.lanes, wi(e, t, s);
    }
    return Rs(
      e,
      t,
      i,
      n,
      s
    );
  }
  function Vc(e, t, i, n) {
    var s = n.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | i : i, e !== null) {
          for (n = t.child = e.child, s = 0; n !== null; )
            s = s | n.lanes | n.childLanes, n = n.sibling;
          n = s & ~u;
        } else n = 0, t.child = null;
        return qc(
          e,
          t,
          u,
          i,
          n
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && pl(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Xu(t, u) : is(), Yu(t);
      else
        return n = t.lanes = 536870912, qc(
          e,
          t,
          u !== null ? u.baseLanes | i : i,
          i,
          n
        );
    } else
      u !== null ? (pl(t, u.cachePool), Xu(t, u), Fi(), t.memoizedState = null) : (e !== null && pl(t, null), is(), Fi());
    return _t(e, t, s, i), t.child;
  }
  function Aa(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function qc(e, t, i, n, s) {
    var u = Wr();
    return u = u === null ? null : { parent: ft._currentValue, pool: u }, t.memoizedState = {
      baseLanes: i,
      cachePool: u
    }, e !== null && pl(t, null), is(), Yu(t), e !== null && Nn(e, t, n, !0), t.childLanes = s, null;
  }
  function Ol(e, t) {
    return t = Hl(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Zc(e, t, i) {
    return gn(t, e.child, null, i), e = Ol(t, t.pendingProps), e.flags |= 2, Ft(t), t.memoizedState = null, e;
  }
  function eg(e, t, i) {
    var n = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ve) {
        if (n.mode === "hidden")
          return e = Ol(t, n), t.lanes = 536870912, Aa(null, e);
        if (as(t), (e = at) ? (e = nf(
          e,
          Wt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Oi !== null ? { id: ri, overflow: si } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Cu(e), i.return = t, t.child = i, wt = t, at = null)) : e = null, e === null) throw Hi(t);
        return t.lanes = 536870912, null;
      }
      return Ol(t, n);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var v = u.dehydrated;
      if (as(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = Zc(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(l(558));
      else if (gt || Nn(e, t, i, !1), s = (i & e.childLanes) !== 0, gt || s) {
        if (n = nt, n !== null && (v = Bo(n, i), v !== 0 && v !== u.retryLane))
          throw u.retryLane = v, rn(e, v), Bt(n, e, v), bs;
        Vl(), t = Zc(
          e,
          t,
          i
        );
      } else
        e = u.treeContext, at = Jt(v.nextSibling), wt = t, Ve = !0, Mi = null, Wt = !1, e !== null && zu(t, e), t = Ol(t, n), t.flags |= 4096;
      return t;
    }
    return e = gi(e.child, {
      mode: n.mode,
      children: n.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Ml(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function Rs(e, t, i, n, s) {
    return cn(t), i = rs(
      e,
      t,
      i,
      n,
      void 0,
      s
    ), n = ss(), e !== null && !gt ? (os(e, t, s), wi(e, t, s)) : (Ve && n && jr(t), t.flags |= 1, _t(e, t, i, s), t.child);
  }
  function Xc(e, t, i, n, s, u) {
    return cn(t), t.updateQueue = null, i = Iu(
      t,
      n,
      i,
      s
    ), ku(e), n = ss(), e !== null && !gt ? (os(e, t, u), wi(e, t, u)) : (Ve && n && jr(t), t.flags |= 1, _t(e, t, i, u), t.child);
  }
  function Yc(e, t, i, n, s) {
    if (cn(t), t.stateNode === null) {
      var u = Mn, v = i.contextType;
      typeof v == "object" && v !== null && (u = St(v)), u = new i(n, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Es, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = n, u.state = t.memoizedState, u.refs = {}, Jr(t), v = i.contextType, u.context = typeof v == "object" && v !== null ? St(v) : Mn, u.state = t.memoizedState, v = i.getDerivedStateFromProps, typeof v == "function" && (_s(
        t,
        i,
        v,
        n
      ), u.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (v = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), v !== u.state && Es.enqueueReplaceState(u, u.state, null), xa(t, n, u, s), Ea(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), n = !0;
    } else if (e === null) {
      u = t.stateNode;
      var S = t.memoizedProps, A = mn(i, S);
      u.props = A;
      var N = u.context, q = i.contextType;
      v = Mn, typeof q == "object" && q !== null && (v = St(q));
      var I = i.getDerivedStateFromProps;
      q = typeof I == "function" || typeof u.getSnapshotBeforeUpdate == "function", S = t.pendingProps !== S, q || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (S || N !== v) && Mc(
        t,
        u,
        n,
        v
      ), Pi = !1;
      var L = t.memoizedState;
      u.state = L, xa(t, n, u, s), Ea(), N = t.memoizedState, S || L !== N || Pi ? (typeof I == "function" && (_s(
        t,
        i,
        I,
        n
      ), N = t.memoizedState), (A = Pi || Oc(
        t,
        i,
        A,
        n,
        L,
        N,
        v
      )) ? (q || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = N), u.props = n, u.state = N, u.context = v, n = A) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), n = !1);
    } else {
      u = t.stateNode, $r(e, t), v = t.memoizedProps, q = mn(i, v), u.props = q, I = t.pendingProps, L = u.context, N = i.contextType, A = Mn, typeof N == "object" && N !== null && (A = St(N)), S = i.getDerivedStateFromProps, (N = typeof S == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (v !== I || L !== A) && Mc(
        t,
        u,
        n,
        A
      ), Pi = !1, L = t.memoizedState, u.state = L, xa(t, n, u, s), Ea();
      var j = t.memoizedState;
      v !== I || L !== j || Pi || e !== null && e.dependencies !== null && dl(e.dependencies) ? (typeof S == "function" && (_s(
        t,
        i,
        S,
        n
      ), j = t.memoizedState), (q = Pi || Oc(
        t,
        i,
        q,
        n,
        L,
        j,
        A
      ) || e !== null && e.dependencies !== null && dl(e.dependencies)) ? (N || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, j, A), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        j,
        A
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || v === e.memoizedProps && L === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && L === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = j), u.props = n, u.state = j, u.context = A, n = q) : (typeof u.componentDidUpdate != "function" || v === e.memoizedProps && L === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && L === e.memoizedState || (t.flags |= 1024), n = !1);
    }
    return u = n, Ml(e, t), n = (t.flags & 128) !== 0, u || n ? (u = t.stateNode, i = n && typeof i.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && n ? (t.child = gn(
      t,
      e.child,
      null,
      s
    ), t.child = gn(
      t,
      null,
      i,
      s
    )) : _t(e, t, i, s), t.memoizedState = u.state, e = t.child) : e = wi(
      e,
      t,
      s
    ), e;
  }
  function kc(e, t, i, n) {
    return on(), t.flags |= 256, _t(e, t, i, n), t.child;
  }
  var Cs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ds(e) {
    return { baseLanes: e, cachePool: Nu() };
  }
  function As(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= jt), e;
  }
  function Ic(e, t, i) {
    var n = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, v;
    if ((v = u) || (v = e !== null && e.memoizedState === null ? !1 : (ut.current & 2) !== 0), v && (s = !0, t.flags &= -129), v = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ve) {
        if (s ? Ui(t) : Fi(), (e = at) ? (e = nf(
          e,
          Wt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Oi !== null ? { id: ri, overflow: si } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Cu(e), i.return = t, t.child = i, wt = t, at = null)) : e = null, e === null) throw Hi(t);
        return ho(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var S = n.children;
      return n = n.fallback, s ? (Fi(), s = t.mode, S = Hl(
        { mode: "hidden", children: S },
        s
      ), n = sn(
        n,
        s,
        i,
        null
      ), S.return = t, n.return = t, S.sibling = n, t.child = S, n = t.child, n.memoizedState = Ds(i), n.childLanes = As(
        e,
        v,
        i
      ), t.memoizedState = Cs, Aa(null, n)) : (Ui(t), zs(t, S));
    }
    var A = e.memoizedState;
    if (A !== null && (S = A.dehydrated, S !== null)) {
      if (u)
        t.flags & 256 ? (Ui(t), t.flags &= -257, t = Os(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Fi(), t.child = e.child, t.flags |= 128, t = null) : (Fi(), S = n.fallback, s = t.mode, n = Hl(
          { mode: "visible", children: n.children },
          s
        ), S = sn(
          S,
          s,
          i,
          null
        ), S.flags |= 2, n.return = t, S.return = t, n.sibling = S, t.child = n, gn(
          t,
          e.child,
          null,
          i
        ), n = t.child, n.memoizedState = Ds(i), n.childLanes = As(
          e,
          v,
          i
        ), t.memoizedState = Cs, t = Aa(null, n));
      else if (Ui(t), ho(S)) {
        if (v = S.nextSibling && S.nextSibling.dataset, v) var N = v.dgst;
        v = N, n = Error(l(419)), n.stack = "", n.digest = v, va({ value: n, source: null, stack: null }), t = Os(
          e,
          t,
          i
        );
      } else if (gt || Nn(e, t, i, !1), v = (i & e.childLanes) !== 0, gt || v) {
        if (v = nt, v !== null && (n = Bo(v, i), n !== 0 && n !== A.retryLane))
          throw A.retryLane = n, rn(e, n), Bt(v, e, n), bs;
        co(S) || Vl(), t = Os(
          e,
          t,
          i
        );
      } else
        co(S) ? (t.flags |= 192, t.child = e.child, t = null) : (e = A.treeContext, at = Jt(
          S.nextSibling
        ), wt = t, Ve = !0, Mi = null, Wt = !1, e !== null && zu(t, e), t = zs(
          t,
          n.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (Fi(), S = n.fallback, s = t.mode, A = e.child, N = A.sibling, n = gi(A, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = A.subtreeFlags & 65011712, N !== null ? S = gi(
      N,
      S
    ) : (S = sn(
      S,
      s,
      i,
      null
    ), S.flags |= 2), S.return = t, n.return = t, n.sibling = S, t.child = n, Aa(null, n), n = t.child, S = e.child.memoizedState, S === null ? S = Ds(i) : (s = S.cachePool, s !== null ? (A = ft._currentValue, s = s.parent !== A ? { parent: A, pool: A } : s) : s = Nu(), S = {
      baseLanes: S.baseLanes | i,
      cachePool: s
    }), n.memoizedState = S, n.childLanes = As(
      e,
      v,
      i
    ), t.memoizedState = Cs, Aa(e.child, n)) : (Ui(t), i = e.child, e = i.sibling, i = gi(i, {
      mode: "visible",
      children: n.children
    }), i.return = t, i.sibling = null, e !== null && (v = t.deletions, v === null ? (t.deletions = [e], t.flags |= 16) : v.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function zs(e, t) {
    return t = Hl(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Hl(e, t) {
    return e = Lt(22, e, null, t), e.lanes = 0, e;
  }
  function Os(e, t, i) {
    return gn(t, e.child, null, i), e = zs(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Qc(e, t, i) {
    e.lanes |= t;
    var n = e.alternate;
    n !== null && (n.lanes |= t), Yr(e.return, t, i);
  }
  function Ms(e, t, i, n, s, u) {
    var v = e.memoizedState;
    v === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: i,
      tailMode: s,
      treeForkCount: u
    } : (v.isBackwards = t, v.rendering = null, v.renderingStartTime = 0, v.last = n, v.tail = i, v.tailMode = s, v.treeForkCount = u);
  }
  function Wc(e, t, i) {
    var n = t.pendingProps, s = n.revealOrder, u = n.tail;
    n = n.children;
    var v = ut.current, S = (v & 2) !== 0;
    if (S ? (v = v & 1 | 2, t.flags |= 128) : v &= 1, Y(ut, v), _t(e, t, n, i), n = Ve ? ma : 0, !S && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Qc(e, i, t);
        else if (e.tag === 19)
          Qc(e, i, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (s) {
      case "forwards":
        for (i = t.child, s = null; i !== null; )
          e = i.alternate, e !== null && Sl(e) === null && (s = i), i = i.sibling;
        i = s, i === null ? (s = t.child, t.child = null) : (s = i.sibling, i.sibling = null), Ms(
          t,
          !1,
          s,
          i,
          u,
          n
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, s = t.child, t.child = null; s !== null; ) {
          if (e = s.alternate, e !== null && Sl(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = i, i = s, s = e;
        }
        Ms(
          t,
          !0,
          i,
          null,
          u,
          n
        );
        break;
      case "together":
        Ms(
          t,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function wi(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), Vi |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (Nn(
          e,
          t,
          i,
          !1
        ), (i & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(l(153));
    if (t.child !== null) {
      for (e = t.child, i = gi(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = gi(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function Hs(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && dl(e)));
  }
  function tg(e, t, i) {
    switch (t.tag) {
      case 3:
        $e(t, t.stateNode.containerInfo), Bi(t, ft, e.memoizedState.cache), on();
        break;
      case 27:
      case 5:
        bt(t);
        break;
      case 4:
        $e(t, t.stateNode.containerInfo);
        break;
      case 10:
        Bi(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, as(t), null;
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (Ui(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? Ic(e, t, i) : (Ui(t), e = wi(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        Ui(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (n = (i & t.childLanes) !== 0, n || (Nn(
          e,
          t,
          i,
          !1
        ), n = (i & t.childLanes) !== 0), s) {
          if (n)
            return Wc(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), Y(ut, ut.current), n) break;
        return null;
      case 22:
        return t.lanes = 0, Vc(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        Bi(t, ft, e.memoizedState.cache);
    }
    return wi(e, t, i);
  }
  function Kc(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        gt = !0;
      else {
        if (!Hs(e, i) && (t.flags & 128) === 0)
          return gt = !1, tg(
            e,
            t,
            i
          );
        gt = (e.flags & 131072) !== 0;
      }
    else
      gt = !1, Ve && (t.flags & 1048576) !== 0 && Au(t, ma, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (e = fn(t.elementType), t.type = e, typeof e == "function")
            Ur(e) ? (n = mn(e, n), t.tag = 1, t = Yc(
              null,
              t,
              e,
              n,
              i
            )) : (t.tag = 0, t = Rs(
              null,
              t,
              e,
              n,
              i
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === de) {
                t.tag = 11, t = Fc(
                  null,
                  t,
                  e,
                  n,
                  i
                );
                break e;
              } else if (s === ie) {
                t.tag = 14, t = Gc(
                  null,
                  t,
                  e,
                  n,
                  i
                );
                break e;
              }
            }
            throw t = Ze(e) || e, Error(l(306, t, ""));
          }
        }
        return t;
      case 0:
        return Rs(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return n = t.type, s = mn(
          n,
          t.pendingProps
        ), Yc(
          e,
          t,
          n,
          s,
          i
        );
      case 3:
        e: {
          if ($e(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          n = t.pendingProps;
          var u = t.memoizedState;
          s = u.element, $r(e, t), xa(t, n, null, i);
          var v = t.memoizedState;
          if (n = v.cache, Bi(t, ft, n), n !== u.cache && kr(
            t,
            [ft],
            i,
            !0
          ), Ea(), n = v.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: v.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = kc(
                e,
                t,
                n,
                i
              );
              break e;
            } else if (n !== s) {
              s = kt(
                Error(l(424)),
                t
              ), va(s), t = kc(
                e,
                t,
                n,
                i
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, at = Jt(e.firstChild), wt = t, Ve = !0, Mi = null, Wt = !0, i = Vu(
                t,
                null,
                n,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
          else {
            if (on(), n === s) {
              t = wi(
                e,
                t,
                i
              );
              break e;
            }
            _t(e, t, n, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Ml(e, t), e === null ? (i = uf(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Ve || (i = t.type, e = t.pendingProps, n = Ql(
          Re.current
        ).createElement(i), n[Tt] = t, n[Dt] = e, Et(n, i, e), vt(n), t.stateNode = n) : t.memoizedState = uf(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return bt(t), e === null && Ve && (n = t.stateNode = rf(
          t.type,
          t.pendingProps,
          Re.current
        ), wt = t, Wt = !0, s = at, ki(t.type) ? (fo = s, at = Jt(n.firstChild)) : at = s), _t(
          e,
          t,
          t.pendingProps.children,
          i
        ), Ml(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ve && ((s = n = at) && (n = Og(
          n,
          t.type,
          t.pendingProps,
          Wt
        ), n !== null ? (t.stateNode = n, wt = t, at = Jt(n.firstChild), Wt = !1, s = !0) : s = !1), s || Hi(t)), bt(t), s = t.type, u = t.pendingProps, v = e !== null ? e.memoizedProps : null, n = u.children, so(s, u) ? n = null : v !== null && so(s, v) && (t.flags |= 32), t.memoizedState !== null && (s = rs(
          e,
          t,
          Yd,
          null,
          null,
          i
        ), Za._currentValue = s), Ml(e, t), _t(e, t, n, i), t.child;
      case 6:
        return e === null && Ve && ((e = i = at) && (i = Mg(
          i,
          t.pendingProps,
          Wt
        ), i !== null ? (t.stateNode = i, wt = t, at = null, e = !0) : e = !1), e || Hi(t)), null;
      case 13:
        return Ic(e, t, i);
      case 4:
        return $e(
          t,
          t.stateNode.containerInfo
        ), n = t.pendingProps, e === null ? t.child = gn(
          t,
          null,
          n,
          i
        ) : _t(e, t, n, i), t.child;
      case 11:
        return Fc(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return _t(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return _t(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return _t(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return n = t.pendingProps, Bi(t, t.type, n.value), _t(e, t, n.children, i), t.child;
      case 9:
        return s = t.type._context, n = t.pendingProps.children, cn(t), s = St(s), n = n(s), t.flags |= 1, _t(e, t, n, i), t.child;
      case 14:
        return Gc(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return jc(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return Wc(e, t, i);
      case 31:
        return eg(e, t, i);
      case 22:
        return Vc(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return cn(t), n = St(ft), e === null ? (s = Wr(), s === null && (s = nt, u = Ir(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= i), s = u), t.memoizedState = { parent: n, cache: s }, Jr(t), Bi(t, ft, s)) : ((e.lanes & i) !== 0 && ($r(e, t), xa(t, null, null, i), Ea()), s = e.memoizedState, u = t.memoizedState, s.parent !== n ? (s = { parent: n, cache: n }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), Bi(t, ft, n)) : (n = u.cache, Bi(t, ft, n), n !== s.cache && kr(
          t,
          [ft],
          i,
          !0
        ))), _t(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(l(156, t.tag));
  }
  function Si(e) {
    e.flags |= 4;
  }
  function Bs(e, t, i, n, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (xh()) e.flags |= 8192;
        else
          throw dn = vl, Kr;
    } else e.flags &= -16777217;
  }
  function Jc(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !gf(t))
      if (xh()) e.flags |= 8192;
      else
        throw dn = vl, Kr;
  }
  function Bl(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Oo() : 536870912, e.lanes |= t, In |= t);
  }
  function za(e, t) {
    if (!Ve)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var i = null; t !== null; )
            t.alternate !== null && (i = t), t = t.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = e.tail;
          for (var n = null; i !== null; )
            i.alternate !== null && (n = i), i = i.sibling;
          n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null;
      }
  }
  function lt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, n = 0;
    if (t)
      for (var s = e.child; s !== null; )
        i |= s.lanes | s.childLanes, n |= s.subtreeFlags & 65011712, n |= s.flags & 65011712, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        i |= s.lanes | s.childLanes, n |= s.subtreeFlags, n |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= n, e.childLanes = i, t;
  }
  function ig(e, t, i) {
    var n = t.pendingProps;
    switch (Vr(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return lt(t), null;
      case 1:
        return lt(t), null;
      case 3:
        return i = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), vi(ft), Qe(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Pn(t) ? Si(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Zr())), lt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Si(t), u !== null ? (lt(t), Jc(t, u)) : (lt(t), Bs(
          t,
          s,
          null,
          n,
          i
        ))) : u ? u !== e.memoizedState ? (Si(t), lt(t), Jc(t, u)) : (lt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && Si(t), lt(t), Bs(
          t,
          s,
          e,
          n,
          i
        )), null;
      case 27:
        if (qt(t), i = Re.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== n && Si(t);
        else {
          if (!n) {
            if (t.stateNode === null)
              throw Error(l(166));
            return lt(t), null;
          }
          e = ae.current, Pn(t) ? Ou(t) : (e = rf(s, n, i), t.stateNode = e, Si(t));
        }
        return lt(t), null;
      case 5:
        if (qt(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== n && Si(t);
        else {
          if (!n) {
            if (t.stateNode === null)
              throw Error(l(166));
            return lt(t), null;
          }
          if (u = ae.current, Pn(t))
            Ou(t);
          else {
            var v = Ql(
              Re.current
            );
            switch (u) {
              case 1:
                u = v.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                u = v.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    u = v.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    u = v.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    u = v.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof n.is == "string" ? v.createElement("select", {
                      is: n.is
                    }) : v.createElement("select"), n.multiple ? u.multiple = !0 : n.size && (u.size = n.size);
                    break;
                  default:
                    u = typeof n.is == "string" ? v.createElement(s, { is: n.is }) : v.createElement(s);
                }
            }
            u[Tt] = t, u[Dt] = n;
            e: for (v = t.child; v !== null; ) {
              if (v.tag === 5 || v.tag === 6)
                u.appendChild(v.stateNode);
              else if (v.tag !== 4 && v.tag !== 27 && v.child !== null) {
                v.child.return = v, v = v.child;
                continue;
              }
              if (v === t) break e;
              for (; v.sibling === null; ) {
                if (v.return === null || v.return === t)
                  break e;
                v = v.return;
              }
              v.sibling.return = v.return, v = v.sibling;
            }
            t.stateNode = u;
            e: switch (Et(u, s, n), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break e;
              case "img":
                n = !0;
                break e;
              default:
                n = !1;
            }
            n && Si(t);
          }
        }
        return lt(t), Bs(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== n && Si(t);
        else {
          if (typeof n != "string" && t.stateNode === null)
            throw Error(l(166));
          if (e = Re.current, Pn(t)) {
            if (e = t.stateNode, i = t.memoizedProps, n = null, s = wt, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  n = s.memoizedProps;
              }
            e[Tt] = t, e = !!(e.nodeValue === i || n !== null && n.suppressHydrationWarning === !0 || Ih(e.nodeValue, i)), e || Hi(t, !0);
          } else
            e = Ql(e).createTextNode(
              n
            ), e[Tt] = t, t.stateNode = e;
        }
        return lt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (n = Pn(t), i !== null) {
            if (e === null) {
              if (!n) throw Error(l(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[Tt] = t;
            } else
              on(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            lt(t), e = !1;
          } else
            i = Zr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (Ft(t), t) : (Ft(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(l(558));
        }
        return lt(t), null;
      case 13:
        if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = Pn(t), n !== null && n.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(l(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(l(317));
              s[Tt] = t;
            } else
              on(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            lt(t), s = !1;
          } else
            s = Zr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (Ft(t), t) : (Ft(t), null);
        }
        return Ft(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = n !== null, e = e !== null && e.memoizedState !== null, i && (n = t.child, s = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (s = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== s && (n.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), Bl(t, t.updateQueue), lt(t), null);
      case 4:
        return Qe(), e === null && io(t.stateNode.containerInfo), lt(t), null;
      case 10:
        return vi(t.type), lt(t), null;
      case 19:
        if (Z(ut), n = t.memoizedState, n === null) return lt(t), null;
        if (s = (t.flags & 128) !== 0, u = n.rendering, u === null)
          if (s) za(n, !1);
          else {
            if (ot !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Sl(e), u !== null) {
                  for (t.flags |= 128, za(n, !1), e = u.updateQueue, t.updateQueue = e, Bl(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    Ru(i, e), i = i.sibling;
                  return Y(
                    ut,
                    ut.current & 1 | 2
                  ), Ve && pi(t, n.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            n.tail !== null && fe() > Fl && (t.flags |= 128, s = !0, za(n, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = Sl(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, Bl(t, e), za(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !Ve)
                return lt(t), null;
            } else
              2 * fe() - n.renderingStartTime > Fl && i !== 536870912 && (t.flags |= 128, s = !0, za(n, !1), t.lanes = 4194304);
          n.isBackwards ? (u.sibling = t.child, t.child = u) : (e = n.last, e !== null ? e.sibling = u : t.child = u, n.last = u);
        }
        return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = fe(), e.sibling = null, i = ut.current, Y(
          ut,
          s ? i & 1 | 2 : i & 1
        ), Ve && pi(t, n.treeForkCount), e) : (lt(t), null);
      case 22:
      case 23:
        return Ft(t), ns(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (lt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : lt(t), i = t.updateQueue, i !== null && Bl(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== i && (t.flags |= 2048), e !== null && Z(hn), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), vi(ft), lt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function ng(e, t) {
    switch (Vr(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return vi(ft), Qe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return qt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ft(t), t.alternate === null)
            throw Error(l(340));
          on();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ft(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(l(340));
          on();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Z(ut), null;
      case 4:
        return Qe(), null;
      case 10:
        return vi(t.type), null;
      case 22:
      case 23:
        return Ft(t), ns(), e !== null && Z(hn), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return vi(ft), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function $c(e, t) {
    switch (Vr(t), t.tag) {
      case 3:
        vi(ft), Qe();
        break;
      case 26:
      case 27:
      case 5:
        qt(t);
        break;
      case 4:
        Qe();
        break;
      case 31:
        t.memoizedState !== null && Ft(t);
        break;
      case 13:
        Ft(t);
        break;
      case 19:
        Z(ut);
        break;
      case 10:
        vi(t.type);
        break;
      case 22:
      case 23:
        Ft(t), ns(), e !== null && Z(hn);
        break;
      case 24:
        vi(ft);
    }
  }
  function Oa(e, t) {
    try {
      var i = t.updateQueue, n = i !== null ? i.lastEffect : null;
      if (n !== null) {
        var s = n.next;
        i = s;
        do {
          if ((i.tag & e) === e) {
            n = void 0;
            var u = i.create, v = i.inst;
            n = u(), v.destroy = n;
          }
          i = i.next;
        } while (i !== s);
      }
    } catch (S) {
      Je(t, t.return, S);
    }
  }
  function Gi(e, t, i) {
    try {
      var n = t.updateQueue, s = n !== null ? n.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        n = u;
        do {
          if ((n.tag & e) === e) {
            var v = n.inst, S = v.destroy;
            if (S !== void 0) {
              v.destroy = void 0, s = t;
              var A = i, N = S;
              try {
                N();
              } catch (q) {
                Je(
                  s,
                  A,
                  q
                );
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (q) {
      Je(t, t.return, q);
    }
  }
  function eh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Zu(t, i);
      } catch (n) {
        Je(e, e.return, n);
      }
    }
  }
  function th(e, t, i) {
    i.props = mn(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (n) {
      Je(e, t, n);
    }
  }
  function Ma(e, t) {
    try {
      var i = e.ref;
      if (i !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var n = e.stateNode;
            break;
          case 30:
            n = e.stateNode;
            break;
          default:
            n = e.stateNode;
        }
        typeof i == "function" ? e.refCleanup = i(n) : i.current = n;
      }
    } catch (s) {
      Je(e, t, s);
    }
  }
  function oi(e, t) {
    var i = e.ref, n = e.refCleanup;
    if (i !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (s) {
          Je(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (s) {
          Je(e, t, s);
        }
      else i.current = null;
  }
  function ih(e) {
    var t = e.type, i = e.memoizedProps, n = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && n.focus();
          break e;
        case "img":
          i.src ? n.src = i.src : i.srcSet && (n.srcset = i.srcSet);
      }
    } catch (s) {
      Je(e, e.return, s);
    }
  }
  function Ps(e, t, i) {
    try {
      var n = e.stateNode;
      bg(n, e.type, i, t), n[Dt] = t;
    } catch (s) {
      Je(e, e.return, s);
    }
  }
  function nh(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ki(e.type) || e.tag === 4;
  }
  function Ns(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || nh(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ki(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ls(e, t, i) {
    var n = e.tag;
    if (n === 5 || n === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = fi));
    else if (n !== 4 && (n === 27 && ki(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (Ls(e, t, i), e = e.sibling; e !== null; )
        Ls(e, t, i), e = e.sibling;
  }
  function Pl(e, t, i) {
    var n = e.tag;
    if (n === 5 || n === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (n !== 4 && (n === 27 && ki(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (Pl(e, t, i), e = e.sibling; e !== null; )
        Pl(e, t, i), e = e.sibling;
  }
  function ah(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var n = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      Et(t, n, i), t[Tt] = e, t[Dt] = i;
    } catch (u) {
      Je(e, e.return, u);
    }
  }
  var _i = !1, pt = !1, Us = !1, lh = typeof WeakSet == "function" ? WeakSet : Set, yt = null;
  function ag(e, t) {
    if (e = e.containerInfo, lo = ir, e = vu(e), Or(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var n = i.getSelection && i.getSelection();
          if (n && n.rangeCount !== 0) {
            i = n.anchorNode;
            var s = n.anchorOffset, u = n.focusNode;
            n = n.focusOffset;
            try {
              i.nodeType, u.nodeType;
            } catch {
              i = null;
              break e;
            }
            var v = 0, S = -1, A = -1, N = 0, q = 0, I = e, L = null;
            t: for (; ; ) {
              for (var j; I !== i || s !== 0 && I.nodeType !== 3 || (S = v + s), I !== u || n !== 0 && I.nodeType !== 3 || (A = v + n), I.nodeType === 3 && (v += I.nodeValue.length), (j = I.firstChild) !== null; )
                L = I, I = j;
              for (; ; ) {
                if (I === e) break t;
                if (L === i && ++N === s && (S = v), L === u && ++q === n && (A = v), (j = I.nextSibling) !== null) break;
                I = L, L = I.parentNode;
              }
              I = j;
            }
            i = S === -1 || A === -1 ? null : { start: S, end: A };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (ro = { focusedElem: e, selectionRange: i }, ir = !1, yt = t; yt !== null; )
      if (t = yt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, yt = e;
      else
        for (; yt !== null; ) {
          switch (t = yt, u = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  s = e[i], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                e = void 0, i = t, s = u.memoizedProps, u = u.memoizedState, n = i.stateNode;
                try {
                  var ce = mn(
                    i.type,
                    s
                  );
                  e = n.getSnapshotBeforeUpdate(
                    ce,
                    u
                  ), n.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ee) {
                  Je(
                    i,
                    i.return,
                    Ee
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, i = e.nodeType, i === 9)
                  uo(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      uo(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(l(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, yt = e;
            break;
          }
          yt = t.return;
        }
  }
  function rh(e, t, i) {
    var n = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        xi(e, i), n & 4 && Oa(5, i);
        break;
      case 1:
        if (xi(e, i), n & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (v) {
              Je(i, i.return, v);
            }
          else {
            var s = mn(
              i.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                s,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (v) {
              Je(
                i,
                i.return,
                v
              );
            }
          }
        n & 64 && eh(i), n & 512 && Ma(i, i.return);
        break;
      case 3:
        if (xi(e, i), n & 64 && (e = i.updateQueue, e !== null)) {
          if (t = null, i.child !== null)
            switch (i.child.tag) {
              case 27:
              case 5:
                t = i.child.stateNode;
                break;
              case 1:
                t = i.child.stateNode;
            }
          try {
            Zu(e, t);
          } catch (v) {
            Je(i, i.return, v);
          }
        }
        break;
      case 27:
        t === null && n & 4 && ah(i);
      case 26:
      case 5:
        xi(e, i), t === null && n & 4 && ih(i), n & 512 && Ma(i, i.return);
        break;
      case 12:
        xi(e, i);
        break;
      case 31:
        xi(e, i), n & 4 && uh(e, i);
        break;
      case 13:
        xi(e, i), n & 4 && ch(e, i), n & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = dg.bind(
          null,
          i
        ), Hg(e, i))));
        break;
      case 22:
        if (n = i.memoizedState !== null || _i, !n) {
          t = t !== null && t.memoizedState !== null || pt, s = _i;
          var u = pt;
          _i = n, (pt = t) && !u ? bi(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : xi(e, i), _i = s, pt = u;
        }
        break;
      case 30:
        break;
      default:
        xi(e, i);
    }
  }
  function sh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, sh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && gr(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var rt = null, zt = !1;
  function Ei(e, t, i) {
    for (i = i.child; i !== null; )
      oh(e, t, i), i = i.sibling;
  }
  function oh(e, t, i) {
    if (k && typeof k.onCommitFiberUnmount == "function")
      try {
        k.onCommitFiberUnmount(U, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        pt || oi(i, t), Ei(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        pt || oi(i, t);
        var n = rt, s = zt;
        ki(i.type) && (rt = i.stateNode, zt = !1), Ei(
          e,
          t,
          i
        ), ja(i.stateNode), rt = n, zt = s;
        break;
      case 5:
        pt || oi(i, t);
      case 6:
        if (n = rt, s = zt, rt = null, Ei(
          e,
          t,
          i
        ), rt = n, zt = s, rt !== null)
          if (zt)
            try {
              (rt.nodeType === 9 ? rt.body : rt.nodeName === "HTML" ? rt.ownerDocument.body : rt).removeChild(i.stateNode);
            } catch (u) {
              Je(
                i,
                t,
                u
              );
            }
          else
            try {
              rt.removeChild(i.stateNode);
            } catch (u) {
              Je(
                i,
                t,
                u
              );
            }
        break;
      case 18:
        rt !== null && (zt ? (e = rt, ef(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), ia(e)) : ef(rt, i.stateNode));
        break;
      case 4:
        n = rt, s = zt, rt = i.stateNode.containerInfo, zt = !0, Ei(
          e,
          t,
          i
        ), rt = n, zt = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Gi(2, i, t), pt || Gi(4, i, t), Ei(
          e,
          t,
          i
        );
        break;
      case 1:
        pt || (oi(i, t), n = i.stateNode, typeof n.componentWillUnmount == "function" && th(
          i,
          t,
          n
        )), Ei(
          e,
          t,
          i
        );
        break;
      case 21:
        Ei(
          e,
          t,
          i
        );
        break;
      case 22:
        pt = (n = pt) || i.memoizedState !== null, Ei(
          e,
          t,
          i
        ), pt = n;
        break;
      default:
        Ei(
          e,
          t,
          i
        );
    }
  }
  function uh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ia(e);
      } catch (i) {
        Je(t, t.return, i);
      }
    }
  }
  function ch(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ia(e);
      } catch (i) {
        Je(t, t.return, i);
      }
  }
  function lg(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new lh()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new lh()), t;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function Nl(e, t) {
    var i = lg(e);
    t.forEach(function(n) {
      if (!i.has(n)) {
        i.add(n);
        var s = gg.bind(null, e, n);
        n.then(s, s);
      }
    });
  }
  function Ot(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var n = 0; n < i.length; n++) {
        var s = i[n], u = e, v = t, S = v;
        e: for (; S !== null; ) {
          switch (S.tag) {
            case 27:
              if (ki(S.type)) {
                rt = S.stateNode, zt = !1;
                break e;
              }
              break;
            case 5:
              rt = S.stateNode, zt = !1;
              break e;
            case 3:
            case 4:
              rt = S.stateNode.containerInfo, zt = !0;
              break e;
          }
          S = S.return;
        }
        if (rt === null) throw Error(l(160));
        oh(u, v, s), rt = null, zt = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        hh(t, e), t = t.sibling;
  }
  var ii = null;
  function hh(e, t) {
    var i = e.alternate, n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ot(t, e), Mt(e), n & 4 && (Gi(3, e, e.return), Oa(3, e), Gi(5, e, e.return));
        break;
      case 1:
        Ot(t, e), Mt(e), n & 512 && (pt || i === null || oi(i, i.return)), n & 64 && _i && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? n : i.concat(n))));
        break;
      case 26:
        var s = ii;
        if (Ot(t, e), Mt(e), n & 512 && (pt || i === null || oi(i, i.return)), n & 4) {
          var u = i !== null ? i.memoizedState : null;
          if (n = e.memoizedState, i === null)
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  n = e.type, i = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (n) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[la] || u[Tt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(n), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), Et(u, n, i), u[Tt] = e, vt(u), n = u;
                      break e;
                    case "link":
                      var v = ff(
                        "link",
                        "href",
                        s
                      ).get(n + (i.href || ""));
                      if (v) {
                        for (var S = 0; S < v.length; S++)
                          if (u = v[S], u.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && u.getAttribute("rel") === (i.rel == null ? null : i.rel) && u.getAttribute("title") === (i.title == null ? null : i.title) && u.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            v.splice(S, 1);
                            break t;
                          }
                      }
                      u = s.createElement(n), Et(u, n, i), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (v = ff(
                        "meta",
                        "content",
                        s
                      ).get(n + (i.content || ""))) {
                        for (S = 0; S < v.length; S++)
                          if (u = v[S], u.getAttribute("content") === (i.content == null ? null : "" + i.content) && u.getAttribute("name") === (i.name == null ? null : i.name) && u.getAttribute("property") === (i.property == null ? null : i.property) && u.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && u.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            v.splice(S, 1);
                            break t;
                          }
                      }
                      u = s.createElement(n), Et(u, n, i), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(l(468, n));
                  }
                  u[Tt] = e, vt(u), n = u;
                }
                e.stateNode = n;
              } else
                df(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = hf(
                s,
                n,
                e.memoizedProps
              );
          else
            u !== n ? (u === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : u.count--, n === null ? df(
              s,
              e.type,
              e.stateNode
            ) : hf(
              s,
              n,
              e.memoizedProps
            )) : n === null && e.stateNode !== null && Ps(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Ot(t, e), Mt(e), n & 512 && (pt || i === null || oi(i, i.return)), i !== null && n & 4 && Ps(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Ot(t, e), Mt(e), n & 512 && (pt || i === null || oi(i, i.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            bn(s, "");
          } catch (ce) {
            Je(e, e.return, ce);
          }
        }
        n & 4 && e.stateNode != null && (s = e.memoizedProps, Ps(
          e,
          s,
          i !== null ? i.memoizedProps : s
        )), n & 1024 && (Us = !0);
        break;
      case 6:
        if (Ot(t, e), Mt(e), n & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          n = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = n;
          } catch (ce) {
            Je(e, e.return, ce);
          }
        }
        break;
      case 3:
        if (Jl = null, s = ii, ii = Wl(t.containerInfo), Ot(t, e), ii = s, Mt(e), n & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            ia(t.containerInfo);
          } catch (ce) {
            Je(e, e.return, ce);
          }
        Us && (Us = !1, fh(e));
        break;
      case 4:
        n = ii, ii = Wl(
          e.stateNode.containerInfo
        ), Ot(t, e), Mt(e), ii = n;
        break;
      case 12:
        Ot(t, e), Mt(e);
        break;
      case 31:
        Ot(t, e), Mt(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Nl(e, n)));
        break;
      case 13:
        Ot(t, e), Mt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Ul = fe()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Nl(e, n)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var A = i !== null && i.memoizedState !== null, N = _i, q = pt;
        if (_i = N || s, pt = q || A, Ot(t, e), pt = q, _i = N, Mt(e), n & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (i === null || A || _i || pt || vn(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                A = i = t;
                try {
                  if (u = A.stateNode, s)
                    v = u.style, typeof v.setProperty == "function" ? v.setProperty("display", "none", "important") : v.display = "none";
                  else {
                    S = A.stateNode;
                    var I = A.memoizedProps.style, L = I != null && I.hasOwnProperty("display") ? I.display : null;
                    S.style.display = L == null || typeof L == "boolean" ? "" : ("" + L).trim();
                  }
                } catch (ce) {
                  Je(A, A.return, ce);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                A = t;
                try {
                  A.stateNode.nodeValue = s ? "" : A.memoizedProps;
                } catch (ce) {
                  Je(A, A.return, ce);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                A = t;
                try {
                  var j = A.stateNode;
                  s ? tf(j, !0) : tf(A.stateNode, !1);
                } catch (ce) {
                  Je(A, A.return, ce);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              i === t && (i = null), t = t.return;
            }
            i === t && (i = null), t.sibling.return = t.return, t = t.sibling;
          }
        n & 4 && (n = e.updateQueue, n !== null && (i = n.retryQueue, i !== null && (n.retryQueue = null, Nl(e, i))));
        break;
      case 19:
        Ot(t, e), Mt(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Nl(e, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ot(t, e), Mt(e);
    }
  }
  function Mt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, n = e.return; n !== null; ) {
          if (nh(n)) {
            i = n;
            break;
          }
          n = n.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var s = i.stateNode, u = Ns(e);
            Pl(e, u, s);
            break;
          case 5:
            var v = i.stateNode;
            i.flags & 32 && (bn(v, ""), i.flags &= -33);
            var S = Ns(e);
            Pl(e, S, v);
            break;
          case 3:
          case 4:
            var A = i.stateNode.containerInfo, N = Ns(e);
            Ls(
              e,
              N,
              A
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (q) {
        Je(e, e.return, q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function fh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        fh(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function xi(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        rh(e, t.alternate, t), t = t.sibling;
  }
  function vn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Gi(4, t, t.return), vn(t);
          break;
        case 1:
          oi(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && th(
            t,
            t.return,
            i
          ), vn(t);
          break;
        case 27:
          ja(t.stateNode);
        case 26:
        case 5:
          oi(t, t.return), vn(t);
          break;
        case 22:
          t.memoizedState === null && vn(t);
          break;
        case 30:
          vn(t);
          break;
        default:
          vn(t);
      }
      e = e.sibling;
    }
  }
  function bi(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate, s = e, u = t, v = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          bi(
            s,
            u,
            i
          ), Oa(4, u);
          break;
        case 1:
          if (bi(
            s,
            u,
            i
          ), n = u, s = n.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (N) {
              Je(n, n.return, N);
            }
          if (n = u, s = n.updateQueue, s !== null) {
            var S = n.stateNode;
            try {
              var A = s.shared.hiddenCallbacks;
              if (A !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < A.length; s++)
                  qu(A[s], S);
            } catch (N) {
              Je(n, n.return, N);
            }
          }
          i && v & 64 && eh(u), Ma(u, u.return);
          break;
        case 27:
          ah(u);
        case 26:
        case 5:
          bi(
            s,
            u,
            i
          ), i && n === null && v & 4 && ih(u), Ma(u, u.return);
          break;
        case 12:
          bi(
            s,
            u,
            i
          );
          break;
        case 31:
          bi(
            s,
            u,
            i
          ), i && v & 4 && uh(s, u);
          break;
        case 13:
          bi(
            s,
            u,
            i
          ), i && v & 4 && ch(s, u);
          break;
        case 22:
          u.memoizedState === null && bi(
            s,
            u,
            i
          ), Ma(u, u.return);
          break;
        case 30:
          break;
        default:
          bi(
            s,
            u,
            i
          );
      }
      t = t.sibling;
    }
  }
  function Fs(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && ya(i));
  }
  function Gs(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ya(e));
  }
  function ni(e, t, i, n) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        dh(
          e,
          t,
          i,
          n
        ), t = t.sibling;
  }
  function dh(e, t, i, n) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ni(
          e,
          t,
          i,
          n
        ), s & 2048 && Oa(9, t);
        break;
      case 1:
        ni(
          e,
          t,
          i,
          n
        );
        break;
      case 3:
        ni(
          e,
          t,
          i,
          n
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ya(e)));
        break;
      case 12:
        if (s & 2048) {
          ni(
            e,
            t,
            i,
            n
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, v = u.id, S = u.onPostCommit;
            typeof S == "function" && S(
              v,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (A) {
            Je(t, t.return, A);
          }
        } else
          ni(
            e,
            t,
            i,
            n
          );
        break;
      case 31:
        ni(
          e,
          t,
          i,
          n
        );
        break;
      case 13:
        ni(
          e,
          t,
          i,
          n
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, v = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? ni(
          e,
          t,
          i,
          n
        ) : Ha(e, t) : u._visibility & 2 ? ni(
          e,
          t,
          i,
          n
        ) : (u._visibility |= 2, Xn(
          e,
          t,
          i,
          n,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Fs(v, t);
        break;
      case 24:
        ni(
          e,
          t,
          i,
          n
        ), s & 2048 && Gs(t.alternate, t);
        break;
      default:
        ni(
          e,
          t,
          i,
          n
        );
    }
  }
  function Xn(e, t, i, n, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, v = t, S = i, A = n, N = v.flags;
      switch (v.tag) {
        case 0:
        case 11:
        case 15:
          Xn(
            u,
            v,
            S,
            A,
            s
          ), Oa(8, v);
          break;
        case 23:
          break;
        case 22:
          var q = v.stateNode;
          v.memoizedState !== null ? q._visibility & 2 ? Xn(
            u,
            v,
            S,
            A,
            s
          ) : Ha(
            u,
            v
          ) : (q._visibility |= 2, Xn(
            u,
            v,
            S,
            A,
            s
          )), s && N & 2048 && Fs(
            v.alternate,
            v
          );
          break;
        case 24:
          Xn(
            u,
            v,
            S,
            A,
            s
          ), s && N & 2048 && Gs(v.alternate, v);
          break;
        default:
          Xn(
            u,
            v,
            S,
            A,
            s
          );
      }
      t = t.sibling;
    }
  }
  function Ha(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, n = t, s = n.flags;
        switch (n.tag) {
          case 22:
            Ha(i, n), s & 2048 && Fs(
              n.alternate,
              n
            );
            break;
          case 24:
            Ha(i, n), s & 2048 && Gs(n.alternate, n);
            break;
          default:
            Ha(i, n);
        }
        t = t.sibling;
      }
  }
  var Ba = 8192;
  function Yn(e, t, i) {
    if (e.subtreeFlags & Ba)
      for (e = e.child; e !== null; )
        gh(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function gh(e, t, i) {
    switch (e.tag) {
      case 26:
        Yn(
          e,
          t,
          i
        ), e.flags & Ba && e.memoizedState !== null && Xg(
          i,
          ii,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Yn(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var n = ii;
        ii = Wl(e.stateNode.containerInfo), Yn(
          e,
          t,
          i
        ), ii = n;
        break;
      case 22:
        e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Ba, Ba = 16777216, Yn(
          e,
          t,
          i
        ), Ba = n) : Yn(
          e,
          t,
          i
        ));
        break;
      default:
        Yn(
          e,
          t,
          i
        );
    }
  }
  function ph(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Pa(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var n = t[i];
          yt = n, vh(
            n,
            e
          );
        }
      ph(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        mh(e), e = e.sibling;
  }
  function mh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Pa(e), e.flags & 2048 && Gi(9, e, e.return);
        break;
      case 3:
        Pa(e);
        break;
      case 12:
        Pa(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ll(e)) : Pa(e);
        break;
      default:
        Pa(e);
    }
  }
  function Ll(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var n = t[i];
          yt = n, vh(
            n,
            e
          );
        }
      ph(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Gi(8, t, t.return), Ll(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, Ll(t));
          break;
        default:
          Ll(t);
      }
      e = e.sibling;
    }
  }
  function vh(e, t) {
    for (; yt !== null; ) {
      var i = yt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Gi(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var n = i.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          ya(i.memoizedState.cache);
      }
      if (n = i.child, n !== null) n.return = i, yt = n;
      else
        e: for (i = e; yt !== null; ) {
          n = yt;
          var s = n.sibling, u = n.return;
          if (sh(n), n === i) {
            yt = null;
            break e;
          }
          if (s !== null) {
            s.return = u, yt = s;
            break e;
          }
          yt = u;
        }
    }
  }
  var rg = {
    getCacheForType: function(e) {
      var t = St(ft), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return St(ft).controller.signal;
    }
  }, sg = typeof WeakMap == "function" ? WeakMap : Map, Ie = 0, nt = null, Ue = null, Ge = 0, Ke = 0, Gt = null, ji = !1, kn = !1, js = !1, Ri = 0, ot = 0, Vi = 0, yn = 0, Vs = 0, jt = 0, In = 0, Na = null, Ht = null, qs = !1, Ul = 0, yh = 0, Fl = 1 / 0, Gl = null, qi = null, mt = 0, Zi = null, Qn = null, Ci = 0, Zs = 0, Xs = null, Th = null, La = 0, Ys = null;
  function Vt() {
    return (Ie & 2) !== 0 && Ge !== 0 ? Ge & -Ge : F.T !== null ? Js() : Po();
  }
  function wh() {
    if (jt === 0)
      if ((Ge & 536870912) === 0 || Ve) {
        var e = $i;
        $i <<= 1, ($i & 3932160) === 0 && ($i = 262144), jt = e;
      } else jt = 536870912;
    return e = Ut.current, e !== null && (e.flags |= 32), jt;
  }
  function Bt(e, t, i) {
    (e === nt && (Ke === 2 || Ke === 9) || e.cancelPendingCommit !== null) && (Wn(e, 0), Xi(
      e,
      Ge,
      jt,
      !1
    )), aa(e, i), ((Ie & 2) === 0 || e !== nt) && (e === nt && ((Ie & 2) === 0 && (yn |= i), ot === 4 && Xi(
      e,
      Ge,
      jt,
      !1
    )), ui(e));
  }
  function Sh(e, t, i) {
    if ((Ie & 6) !== 0) throw Error(l(327));
    var n = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || na(e, t), s = n ? cg(e, t) : Is(e, t, !0), u = n;
    do {
      if (s === 0) {
        kn && !n && Xi(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, u && !og(i)) {
          s = Is(e, t, !1), u = !1;
          continue;
        }
        if (s === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var v = 0;
          else
            v = e.pendingLanes & -536870913, v = v !== 0 ? v : v & 536870912 ? 536870912 : 0;
          if (v !== 0) {
            t = v;
            e: {
              var S = e;
              s = Na;
              var A = S.current.memoizedState.isDehydrated;
              if (A && (Wn(S, v).flags |= 256), v = Is(
                S,
                v,
                !1
              ), v !== 2) {
                if (js && !A) {
                  S.errorRecoveryDisabledLanes |= u, yn |= u, s = 4;
                  break e;
                }
                u = Ht, Ht = s, u !== null && (Ht === null ? Ht = u : Ht.push.apply(
                  Ht,
                  u
                ));
              }
              s = v;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Wn(e, 0), Xi(e, t, 0, !0);
          break;
        }
        e: {
          switch (n = e, u = s, u) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Xi(
                n,
                t,
                jt,
                !ji
              );
              break e;
            case 2:
              Ht = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((t & 62914560) === t && (s = Ul + 300 - fe(), 10 < s)) {
            if (Xi(
              n,
              t,
              jt,
              !ji
            ), Wa(n, 0, !0) !== 0) break e;
            Ci = t, n.timeoutHandle = Jh(
              _h.bind(
                null,
                n,
                i,
                Ht,
                Gl,
                qs,
                t,
                jt,
                yn,
                In,
                ji,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          _h(
            n,
            i,
            Ht,
            Gl,
            qs,
            t,
            jt,
            yn,
            In,
            ji,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ui(e);
  }
  function _h(e, t, i, n, s, u, v, S, A, N, q, I, L, j) {
    if (e.timeoutHandle = -1, I = t.subtreeFlags, I & 8192 || (I & 16785408) === 16785408) {
      I = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: fi
      }, gh(
        t,
        u,
        I
      );
      var ce = (u & 62914560) === u ? Ul - fe() : (u & 4194048) === u ? yh - fe() : 0;
      if (ce = Yg(
        I,
        ce
      ), ce !== null) {
        Ci = u, e.cancelPendingCommit = ce(
          zh.bind(
            null,
            e,
            t,
            u,
            i,
            n,
            s,
            v,
            S,
            A,
            q,
            I,
            null,
            L,
            j
          )
        ), Xi(e, u, v, !N);
        return;
      }
    }
    zh(
      e,
      t,
      u,
      i,
      n,
      s,
      v,
      S,
      A
    );
  }
  function og(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var n = 0; n < i.length; n++) {
          var s = i[n], u = s.getSnapshot;
          s = s.value;
          try {
            if (!Nt(u(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (i = t.child, t.subtreeFlags & 16384 && i !== null)
        i.return = t, t = i;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Xi(e, t, i, n) {
    t &= ~Vs, t &= ~yn, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - Se(s), v = 1 << u;
      n[u] = -1, s &= ~v;
    }
    i !== 0 && Mo(e, i, t);
  }
  function jl() {
    return (Ie & 6) === 0 ? (Ua(0), !1) : !0;
  }
  function ks() {
    if (Ue !== null) {
      if (Ke === 0)
        var e = Ue.return;
      else
        e = Ue, mi = un = null, us(e), Gn = null, wa = 0, e = Ue;
      for (; e !== null; )
        $c(e.alternate, e), e = e.return;
      Ue = null;
    }
  }
  function Wn(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Dg(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Ci = 0, ks(), nt = e, Ue = i = gi(e.current, null), Ge = t, Ke = 0, Gt = null, ji = !1, kn = na(e, t), js = !1, In = jt = Vs = yn = Vi = ot = 0, Ht = Na = null, qs = !1, (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var s = 31 - Se(n), u = 1 << s;
        t |= e[s], n &= ~u;
      }
    return Ri = t, ol(), i;
  }
  function Eh(e, t) {
    He = null, F.H = Da, t === Fn || t === ml ? (t = Fu(), Ke = 3) : t === Kr ? (t = Fu(), Ke = 4) : Ke = t === bs ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Gt = t, Ue === null && (ot = 1, zl(
      e,
      kt(t, e.current)
    ));
  }
  function xh() {
    var e = Ut.current;
    return e === null ? !0 : (Ge & 4194048) === Ge ? Kt === null : (Ge & 62914560) === Ge || (Ge & 536870912) !== 0 ? e === Kt : !1;
  }
  function bh() {
    var e = F.H;
    return F.H = Da, e === null ? Da : e;
  }
  function Rh() {
    var e = F.A;
    return F.A = rg, e;
  }
  function Vl() {
    ot = 4, ji || (Ge & 4194048) !== Ge && Ut.current !== null || (kn = !0), (Vi & 134217727) === 0 && (yn & 134217727) === 0 || nt === null || Xi(
      nt,
      Ge,
      jt,
      !1
    );
  }
  function Is(e, t, i) {
    var n = Ie;
    Ie |= 2;
    var s = bh(), u = Rh();
    (nt !== e || Ge !== t) && (Gl = null, Wn(e, t)), t = !1;
    var v = ot;
    e: do
      try {
        if (Ke !== 0 && Ue !== null) {
          var S = Ue, A = Gt;
          switch (Ke) {
            case 8:
              ks(), v = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ut.current === null && (t = !0);
              var N = Ke;
              if (Ke = 0, Gt = null, Kn(e, S, A, N), i && kn) {
                v = 0;
                break e;
              }
              break;
            default:
              N = Ke, Ke = 0, Gt = null, Kn(e, S, A, N);
          }
        }
        ug(), v = ot;
        break;
      } catch (q) {
        Eh(e, q);
      }
    while (!0);
    return t && e.shellSuspendCounter++, mi = un = null, Ie = n, F.H = s, F.A = u, Ue === null && (nt = null, Ge = 0, ol()), v;
  }
  function ug() {
    for (; Ue !== null; ) Ch(Ue);
  }
  function cg(e, t) {
    var i = Ie;
    Ie |= 2;
    var n = bh(), s = Rh();
    nt !== e || Ge !== t ? (Gl = null, Fl = fe() + 500, Wn(e, t)) : kn = na(
      e,
      t
    );
    e: do
      try {
        if (Ke !== 0 && Ue !== null) {
          t = Ue;
          var u = Gt;
          t: switch (Ke) {
            case 1:
              Ke = 0, Gt = null, Kn(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Lu(u)) {
                Ke = 0, Gt = null, Dh(t);
                break;
              }
              t = function() {
                Ke !== 2 && Ke !== 9 || nt !== e || (Ke = 7), ui(e);
              }, u.then(t, t);
              break e;
            case 3:
              Ke = 7;
              break e;
            case 4:
              Ke = 5;
              break e;
            case 7:
              Lu(u) ? (Ke = 0, Gt = null, Dh(t)) : (Ke = 0, Gt = null, Kn(e, t, u, 7));
              break;
            case 5:
              var v = null;
              switch (Ue.tag) {
                case 26:
                  v = Ue.memoizedState;
                case 5:
                case 27:
                  var S = Ue;
                  if (v ? gf(v) : S.stateNode.complete) {
                    Ke = 0, Gt = null;
                    var A = S.sibling;
                    if (A !== null) Ue = A;
                    else {
                      var N = S.return;
                      N !== null ? (Ue = N, ql(N)) : Ue = null;
                    }
                    break t;
                  }
              }
              Ke = 0, Gt = null, Kn(e, t, u, 5);
              break;
            case 6:
              Ke = 0, Gt = null, Kn(e, t, u, 6);
              break;
            case 8:
              ks(), ot = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        hg();
        break;
      } catch (q) {
        Eh(e, q);
      }
    while (!0);
    return mi = un = null, F.H = n, F.A = s, Ie = i, Ue !== null ? 0 : (nt = null, Ge = 0, ol(), ot);
  }
  function hg() {
    for (; Ue !== null && !le(); )
      Ch(Ue);
  }
  function Ch(e) {
    var t = Kc(e.alternate, e, Ri);
    e.memoizedProps = e.pendingProps, t === null ? ql(e) : Ue = t;
  }
  function Dh(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Xc(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ge
        );
        break;
      case 11:
        t = Xc(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ge
        );
        break;
      case 5:
        us(t);
      default:
        $c(i, t), t = Ue = Ru(t, Ri), t = Kc(i, t, Ri);
    }
    e.memoizedProps = e.pendingProps, t === null ? ql(e) : Ue = t;
  }
  function Kn(e, t, i, n) {
    mi = un = null, us(t), Gn = null, wa = 0;
    var s = t.return;
    try {
      if ($d(
        e,
        s,
        t,
        i,
        Ge
      )) {
        ot = 1, zl(
          e,
          kt(i, e.current)
        ), Ue = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw Ue = s, u;
      ot = 1, zl(
        e,
        kt(i, e.current)
      ), Ue = null;
      return;
    }
    t.flags & 32768 ? (Ve || n === 1 ? e = !0 : kn || (Ge & 536870912) !== 0 ? e = !1 : (ji = e = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Ut.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Ah(t, e)) : ql(t);
  }
  function ql(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Ah(
          t,
          ji
        );
        return;
      }
      e = t.return;
      var i = ig(
        t.alternate,
        t,
        Ri
      );
      if (i !== null) {
        Ue = i;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ue = t;
        return;
      }
      Ue = t = e;
    } while (t !== null);
    ot === 0 && (ot = 5);
  }
  function Ah(e, t) {
    do {
      var i = ng(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Ue = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !t && (e = e.sibling, e !== null)) {
        Ue = e;
        return;
      }
      Ue = e = i;
    } while (e !== null);
    ot = 6, Ue = null;
  }
  function zh(e, t, i, n, s, u, v, S, A) {
    e.cancelPendingCommit = null;
    do
      Zl();
    while (mt !== 0);
    if ((Ie & 6) !== 0) throw Error(l(327));
    if (t !== null) {
      if (t === e.current) throw Error(l(177));
      if (u = t.lanes | t.childLanes, u |= Nr, Zf(
        e,
        i,
        u,
        v,
        S,
        A
      ), e === nt && (Ue = nt = null, Ge = 0), Qn = t, Zi = e, Ci = i, Zs = u, Xs = s, Th = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, pg(ue, function() {
        return Ph(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
        n = F.T, F.T = null, s = ee.p, ee.p = 2, v = Ie, Ie |= 4;
        try {
          ag(e, t, i);
        } finally {
          Ie = v, ee.p = s, F.T = n;
        }
      }
      mt = 1, Oh(), Mh(), Hh();
    }
  }
  function Oh() {
    if (mt === 1) {
      mt = 0;
      var e = Zi, t = Qn, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = F.T, F.T = null;
        var n = ee.p;
        ee.p = 2;
        var s = Ie;
        Ie |= 4;
        try {
          hh(t, e);
          var u = ro, v = vu(e.containerInfo), S = u.focusedElem, A = u.selectionRange;
          if (v !== S && S && S.ownerDocument && mu(
            S.ownerDocument.documentElement,
            S
          )) {
            if (A !== null && Or(S)) {
              var N = A.start, q = A.end;
              if (q === void 0 && (q = N), "selectionStart" in S)
                S.selectionStart = N, S.selectionEnd = Math.min(
                  q,
                  S.value.length
                );
              else {
                var I = S.ownerDocument || document, L = I && I.defaultView || window;
                if (L.getSelection) {
                  var j = L.getSelection(), ce = S.textContent.length, Ee = Math.min(A.start, ce), it = A.end === void 0 ? Ee : Math.min(A.end, ce);
                  !j.extend && Ee > it && (v = it, it = Ee, Ee = v);
                  var H = pu(
                    S,
                    Ee
                  ), M = pu(
                    S,
                    it
                  );
                  if (H && M && (j.rangeCount !== 1 || j.anchorNode !== H.node || j.anchorOffset !== H.offset || j.focusNode !== M.node || j.focusOffset !== M.offset)) {
                    var P = I.createRange();
                    P.setStart(H.node, H.offset), j.removeAllRanges(), Ee > it ? (j.addRange(P), j.extend(M.node, M.offset)) : (P.setEnd(M.node, M.offset), j.addRange(P));
                  }
                }
              }
            }
            for (I = [], j = S; j = j.parentNode; )
              j.nodeType === 1 && I.push({
                element: j,
                left: j.scrollLeft,
                top: j.scrollTop
              });
            for (typeof S.focus == "function" && S.focus(), S = 0; S < I.length; S++) {
              var X = I[S];
              X.element.scrollLeft = X.left, X.element.scrollTop = X.top;
            }
          }
          ir = !!lo, ro = lo = null;
        } finally {
          Ie = s, ee.p = n, F.T = i;
        }
      }
      e.current = t, mt = 2;
    }
  }
  function Mh() {
    if (mt === 2) {
      mt = 0;
      var e = Zi, t = Qn, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = F.T, F.T = null;
        var n = ee.p;
        ee.p = 2;
        var s = Ie;
        Ie |= 4;
        try {
          rh(e, t.alternate, t);
        } finally {
          Ie = s, ee.p = n, F.T = i;
        }
      }
      mt = 3;
    }
  }
  function Hh() {
    if (mt === 4 || mt === 3) {
      mt = 0, Q();
      var e = Zi, t = Qn, i = Ci, n = Th;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? mt = 5 : (mt = 0, Qn = Zi = null, Bh(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (qi = null), fr(i), t = t.stateNode, k && typeof k.onCommitFiberRoot == "function")
        try {
          k.onCommitFiberRoot(
            U,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        t = F.T, s = ee.p, ee.p = 2, F.T = null;
        try {
          for (var u = e.onRecoverableError, v = 0; v < n.length; v++) {
            var S = n[v];
            u(S.value, {
              componentStack: S.stack
            });
          }
        } finally {
          F.T = t, ee.p = s;
        }
      }
      (Ci & 3) !== 0 && Zl(), ui(e), s = e.pendingLanes, (i & 261930) !== 0 && (s & 42) !== 0 ? e === Ys ? La++ : (La = 0, Ys = e) : La = 0, Ua(0);
    }
  }
  function Bh(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ya(t)));
  }
  function Zl() {
    return Oh(), Mh(), Hh(), Ph();
  }
  function Ph() {
    if (mt !== 5) return !1;
    var e = Zi, t = Zs;
    Zs = 0;
    var i = fr(Ci), n = F.T, s = ee.p;
    try {
      ee.p = 32 > i ? 32 : i, F.T = null, i = Xs, Xs = null;
      var u = Zi, v = Ci;
      if (mt = 0, Qn = Zi = null, Ci = 0, (Ie & 6) !== 0) throw Error(l(331));
      var S = Ie;
      if (Ie |= 4, mh(u.current), dh(
        u,
        u.current,
        v,
        i
      ), Ie = S, Ua(0, !1), k && typeof k.onPostCommitFiberRoot == "function")
        try {
          k.onPostCommitFiberRoot(U, u);
        } catch {
        }
      return !0;
    } finally {
      ee.p = s, F.T = n, Bh(e, t);
    }
  }
  function Nh(e, t, i) {
    t = kt(i, t), t = xs(e.stateNode, t, 2), e = Li(e, t, 2), e !== null && (aa(e, 2), ui(e));
  }
  function Je(e, t, i) {
    if (e.tag === 3)
      Nh(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Nh(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (qi === null || !qi.has(n))) {
            e = kt(i, e), i = Lc(2), n = Li(t, i, 2), n !== null && (Uc(
              i,
              n,
              t,
              e
            ), aa(n, 2), ui(n));
            break;
          }
        }
        t = t.return;
      }
  }
  function Qs(e, t, i) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new sg();
      var s = /* @__PURE__ */ new Set();
      n.set(t, s);
    } else
      s = n.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), n.set(t, s));
    s.has(i) || (js = !0, s.add(i), e = fg.bind(null, e, t, i), t.then(e, e));
  }
  function fg(e, t, i) {
    var n = e.pingCache;
    n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, nt === e && (Ge & i) === i && (ot === 4 || ot === 3 && (Ge & 62914560) === Ge && 300 > fe() - Ul ? (Ie & 2) === 0 && Wn(e, 0) : Vs |= i, In === Ge && (In = 0)), ui(e);
  }
  function Lh(e, t) {
    t === 0 && (t = Oo()), e = rn(e, t), e !== null && (aa(e, t), ui(e));
  }
  function dg(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), Lh(e, i);
  }
  function gg(e, t) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode, s = e.memoizedState;
        s !== null && (i = s.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    n !== null && n.delete(t), Lh(e, i);
  }
  function pg(e, t) {
    return W(e, t);
  }
  var Xl = null, Jn = null, Ws = !1, Yl = !1, Ks = !1, Yi = 0;
  function ui(e) {
    e !== Jn && e.next === null && (Jn === null ? Xl = Jn = e : Jn = Jn.next = e), Yl = !0, Ws || (Ws = !0, vg());
  }
  function Ua(e, t) {
    if (!Ks && Yl) {
      Ks = !0;
      do
        for (var i = !1, n = Xl; n !== null; ) {
          if (e !== 0) {
            var s = n.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var v = n.suspendedLanes, S = n.pingedLanes;
              u = (1 << 31 - Se(42 | e) + 1) - 1, u &= s & ~(v & ~S), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (i = !0, jh(n, u));
          } else
            u = Ge, u = Wa(
              n,
              n === nt ? u : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (u & 3) === 0 || na(n, u) || (i = !0, jh(n, u));
          n = n.next;
        }
      while (i);
      Ks = !1;
    }
  }
  function mg() {
    Uh();
  }
  function Uh() {
    Yl = Ws = !1;
    var e = 0;
    Yi !== 0 && Cg() && (e = Yi);
    for (var t = fe(), i = null, n = Xl; n !== null; ) {
      var s = n.next, u = Fh(n, t);
      u === 0 ? (n.next = null, i === null ? Xl = s : i.next = s, s === null && (Jn = i)) : (i = n, (e !== 0 || (u & 3) !== 0) && (Yl = !0)), n = s;
    }
    mt !== 0 && mt !== 5 || Ua(e), Yi !== 0 && (Yi = 0);
  }
  function Fh(e, t) {
    for (var i = e.suspendedLanes, n = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var v = 31 - Se(u), S = 1 << v, A = s[v];
      A === -1 ? ((S & i) === 0 || (S & n) !== 0) && (s[v] = qf(S, t)) : A <= t && (e.expiredLanes |= S), u &= ~S;
    }
    if (t = nt, i = Ge, i = Wa(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), n = e.callbackNode, i === 0 || e === t && (Ke === 2 || Ke === 9) || e.cancelPendingCommit !== null)
      return n !== null && n !== null && J(n), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || na(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (n !== null && J(n), fr(i)) {
        case 2:
        case 8:
          i = oe;
          break;
        case 32:
          i = ue;
          break;
        case 268435456:
          i = y;
          break;
        default:
          i = ue;
      }
      return n = Gh.bind(null, e), i = W(i, n), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return n !== null && n !== null && J(n), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Gh(e, t) {
    if (mt !== 0 && mt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (Zl() && e.callbackNode !== i)
      return null;
    var n = Ge;
    return n = Wa(
      e,
      e === nt ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), n === 0 ? null : (Sh(e, n, t), Fh(e, fe()), e.callbackNode != null && e.callbackNode === i ? Gh.bind(null, e) : null);
  }
  function jh(e, t) {
    if (Zl()) return null;
    Sh(e, t, !0);
  }
  function vg() {
    Ag(function() {
      (Ie & 6) !== 0 ? W(
        we,
        mg
      ) : Uh();
    });
  }
  function Js() {
    if (Yi === 0) {
      var e = Ln;
      e === 0 && (e = ei, ei <<= 1, (ei & 261888) === 0 && (ei = 256)), Yi = e;
    }
    return Yi;
  }
  function Vh(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : el("" + e);
  }
  function qh(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function yg(e, t, i, n, s) {
    if (t === "submit" && i && i.stateNode === s) {
      var u = Vh(
        (s[Dt] || null).action
      ), v = n.submitter;
      v && (t = (t = v[Dt] || null) ? Vh(t.formAction) : v.getAttribute("formAction"), t !== null && (u = t, v = null));
      var S = new al(
        "action",
        "action",
        null,
        n,
        s
      );
      e.push({
        event: S,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (Yi !== 0) {
                  var A = v ? qh(s, v) : new FormData(s);
                  ys(
                    i,
                    {
                      pending: !0,
                      data: A,
                      method: s.method,
                      action: u
                    },
                    null,
                    A
                  );
                }
              } else
                typeof u == "function" && (S.preventDefault(), A = v ? qh(s, v) : new FormData(s), ys(
                  i,
                  {
                    pending: !0,
                    data: A,
                    method: s.method,
                    action: u
                  },
                  u,
                  A
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var $s = 0; $s < Pr.length; $s++) {
    var eo = Pr[$s], Tg = eo.toLowerCase(), wg = eo[0].toUpperCase() + eo.slice(1);
    ti(
      Tg,
      "on" + wg
    );
  }
  ti(wu, "onAnimationEnd"), ti(Su, "onAnimationIteration"), ti(_u, "onAnimationStart"), ti("dblclick", "onDoubleClick"), ti("focusin", "onFocus"), ti("focusout", "onBlur"), ti(Nd, "onTransitionRun"), ti(Ld, "onTransitionStart"), ti(Ud, "onTransitionCancel"), ti(Eu, "onTransitionEnd"), En("onMouseEnter", ["mouseout", "mouseover"]), En("onMouseLeave", ["mouseout", "mouseover"]), En("onPointerEnter", ["pointerout", "pointerover"]), En("onPointerLeave", ["pointerout", "pointerover"]), tn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), tn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), tn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), tn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), tn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), tn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Fa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Sg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fa)
  );
  function Zh(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var n = e[i], s = n.event;
      n = n.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var v = n.length - 1; 0 <= v; v--) {
            var S = n[v], A = S.instance, N = S.currentTarget;
            if (S = S.listener, A !== u && s.isPropagationStopped())
              break e;
            u = S, s.currentTarget = N;
            try {
              u(s);
            } catch (q) {
              sl(q);
            }
            s.currentTarget = null, u = A;
          }
        else
          for (v = 0; v < n.length; v++) {
            if (S = n[v], A = S.instance, N = S.currentTarget, S = S.listener, A !== u && s.isPropagationStopped())
              break e;
            u = S, s.currentTarget = N;
            try {
              u(s);
            } catch (q) {
              sl(q);
            }
            s.currentTarget = null, u = A;
          }
      }
    }
  }
  function Fe(e, t) {
    var i = t[dr];
    i === void 0 && (i = t[dr] = /* @__PURE__ */ new Set());
    var n = e + "__bubble";
    i.has(n) || (Xh(t, e, 2, !1), i.add(n));
  }
  function to(e, t, i) {
    var n = 0;
    t && (n |= 4), Xh(
      i,
      e,
      n,
      t
    );
  }
  var kl = "_reactListening" + Math.random().toString(36).slice(2);
  function io(e) {
    if (!e[kl]) {
      e[kl] = !0, Uo.forEach(function(i) {
        i !== "selectionchange" && (Sg.has(i) || to(i, !1, e), to(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[kl] || (t[kl] = !0, to("selectionchange", !1, t));
    }
  }
  function Xh(e, t, i, n) {
    switch (Sf(t)) {
      case 2:
        var s = Qg;
        break;
      case 8:
        s = Wg;
        break;
      default:
        s = yo;
    }
    i = s.bind(
      null,
      t,
      i,
      e
    ), s = void 0, !_r || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), n ? s !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, i, !0) : s !== void 0 ? e.addEventListener(t, i, {
      passive: s
    }) : e.addEventListener(t, i, !1);
  }
  function no(e, t, i, n, s) {
    var u = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (; ; ) {
        if (n === null) return;
        var v = n.tag;
        if (v === 3 || v === 4) {
          var S = n.stateNode.containerInfo;
          if (S === s) break;
          if (v === 4)
            for (v = n.return; v !== null; ) {
              var A = v.tag;
              if ((A === 3 || A === 4) && v.stateNode.containerInfo === s)
                return;
              v = v.return;
            }
          for (; S !== null; ) {
            if (v = wn(S), v === null) return;
            if (A = v.tag, A === 5 || A === 6 || A === 26 || A === 27) {
              n = u = v;
              continue e;
            }
            S = S.parentNode;
          }
        }
        n = n.return;
      }
    Wo(function() {
      var N = u, q = wr(i), I = [];
      e: {
        var L = xu.get(e);
        if (L !== void 0) {
          var j = al, ce = e;
          switch (e) {
            case "keypress":
              if (il(i) === 0) break e;
            case "keydown":
            case "keyup":
              j = gd;
              break;
            case "focusin":
              ce = "focus", j = Rr;
              break;
            case "focusout":
              ce = "blur", j = Rr;
              break;
            case "beforeblur":
            case "afterblur":
              j = Rr;
              break;
            case "click":
              if (i.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              j = $o;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              j = id;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              j = vd;
              break;
            case wu:
            case Su:
            case _u:
              j = ld;
              break;
            case Eu:
              j = Td;
              break;
            case "scroll":
            case "scrollend":
              j = ed;
              break;
            case "wheel":
              j = Sd;
              break;
            case "copy":
            case "cut":
            case "paste":
              j = sd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              j = tu;
              break;
            case "toggle":
            case "beforetoggle":
              j = Ed;
          }
          var Ee = (t & 4) !== 0, it = !Ee && (e === "scroll" || e === "scrollend"), H = Ee ? L !== null ? L + "Capture" : null : L;
          Ee = [];
          for (var M = N, P; M !== null; ) {
            var X = M;
            if (P = X.stateNode, X = X.tag, X !== 5 && X !== 26 && X !== 27 || P === null || H === null || (X = sa(M, H), X != null && Ee.push(
              Ga(M, X, P)
            )), it) break;
            M = M.return;
          }
          0 < Ee.length && (L = new j(
            L,
            ce,
            null,
            i,
            q
          ), I.push({ event: L, listeners: Ee }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (L = e === "mouseover" || e === "pointerover", j = e === "mouseout" || e === "pointerout", L && i !== Tr && (ce = i.relatedTarget || i.fromElement) && (wn(ce) || ce[Tn]))
            break e;
          if ((j || L) && (L = q.window === q ? q : (L = q.ownerDocument) ? L.defaultView || L.parentWindow : window, j ? (ce = i.relatedTarget || i.toElement, j = N, ce = ce ? wn(ce) : null, ce !== null && (it = r(ce), Ee = ce.tag, ce !== it || Ee !== 5 && Ee !== 27 && Ee !== 6) && (ce = null)) : (j = null, ce = N), j !== ce)) {
            if (Ee = $o, X = "onMouseLeave", H = "onMouseEnter", M = "mouse", (e === "pointerout" || e === "pointerover") && (Ee = tu, X = "onPointerLeave", H = "onPointerEnter", M = "pointer"), it = j == null ? L : ra(j), P = ce == null ? L : ra(ce), L = new Ee(
              X,
              M + "leave",
              j,
              i,
              q
            ), L.target = it, L.relatedTarget = P, X = null, wn(q) === N && (Ee = new Ee(
              H,
              M + "enter",
              ce,
              i,
              q
            ), Ee.target = P, Ee.relatedTarget = it, X = Ee), it = X, j && ce)
              t: {
                for (Ee = _g, H = j, M = ce, P = 0, X = H; X; X = Ee(X))
                  P++;
                X = 0;
                for (var ye = M; ye; ye = Ee(ye))
                  X++;
                for (; 0 < P - X; )
                  H = Ee(H), P--;
                for (; 0 < X - P; )
                  M = Ee(M), X--;
                for (; P--; ) {
                  if (H === M || M !== null && H === M.alternate) {
                    Ee = H;
                    break t;
                  }
                  H = Ee(H), M = Ee(M);
                }
                Ee = null;
              }
            else Ee = null;
            j !== null && Yh(
              I,
              L,
              j,
              Ee,
              !1
            ), ce !== null && it !== null && Yh(
              I,
              it,
              ce,
              Ee,
              !0
            );
          }
        }
        e: {
          if (L = N ? ra(N) : window, j = L.nodeName && L.nodeName.toLowerCase(), j === "select" || j === "input" && L.type === "file")
            var Ye = uu;
          else if (su(L))
            if (cu)
              Ye = Hd;
            else {
              Ye = Od;
              var pe = zd;
            }
          else
            j = L.nodeName, !j || j.toLowerCase() !== "input" || L.type !== "checkbox" && L.type !== "radio" ? N && yr(N.elementType) && (Ye = uu) : Ye = Md;
          if (Ye && (Ye = Ye(e, N))) {
            ou(
              I,
              Ye,
              i,
              q
            );
            break e;
          }
          pe && pe(e, L, N), e === "focusout" && N && L.type === "number" && N.memoizedProps.value != null && vr(L, "number", L.value);
        }
        switch (pe = N ? ra(N) : window, e) {
          case "focusin":
            (su(pe) || pe.contentEditable === "true") && (An = pe, Mr = N, pa = null);
            break;
          case "focusout":
            pa = Mr = An = null;
            break;
          case "mousedown":
            Hr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Hr = !1, yu(I, i, q);
            break;
          case "selectionchange":
            if (Pd) break;
          case "keydown":
          case "keyup":
            yu(I, i, q);
        }
        var Pe;
        if (Dr)
          e: {
            switch (e) {
              case "compositionstart":
                var je = "onCompositionStart";
                break e;
              case "compositionend":
                je = "onCompositionEnd";
                break e;
              case "compositionupdate":
                je = "onCompositionUpdate";
                break e;
            }
            je = void 0;
          }
        else
          Dn ? lu(e, i) && (je = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (je = "onCompositionStart");
        je && (iu && i.locale !== "ko" && (Dn || je !== "onCompositionStart" ? je === "onCompositionEnd" && Dn && (Pe = Ko()) : (zi = q, Er = "value" in zi ? zi.value : zi.textContent, Dn = !0)), pe = Il(N, je), 0 < pe.length && (je = new eu(
          je,
          e,
          null,
          i,
          q
        ), I.push({ event: je, listeners: pe }), Pe ? je.data = Pe : (Pe = ru(i), Pe !== null && (je.data = Pe)))), (Pe = bd ? Rd(e, i) : Cd(e, i)) && (je = Il(N, "onBeforeInput"), 0 < je.length && (pe = new eu(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          q
        ), I.push({
          event: pe,
          listeners: je
        }), pe.data = Pe)), yg(
          I,
          e,
          N,
          i,
          q
        );
      }
      Zh(I, t);
    });
  }
  function Ga(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function Il(e, t) {
    for (var i = t + "Capture", n = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = sa(e, i), s != null && n.unshift(
        Ga(e, s, u)
      ), s = sa(e, t), s != null && n.push(
        Ga(e, s, u)
      )), e.tag === 3) return n;
      e = e.return;
    }
    return [];
  }
  function _g(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Yh(e, t, i, n, s) {
    for (var u = t._reactName, v = []; i !== null && i !== n; ) {
      var S = i, A = S.alternate, N = S.stateNode;
      if (S = S.tag, A !== null && A === n) break;
      S !== 5 && S !== 26 && S !== 27 || N === null || (A = N, s ? (N = sa(i, u), N != null && v.unshift(
        Ga(i, N, A)
      )) : s || (N = sa(i, u), N != null && v.push(
        Ga(i, N, A)
      ))), i = i.return;
    }
    v.length !== 0 && e.push({ event: t, listeners: v });
  }
  var Eg = /\r\n?/g, xg = /\u0000|\uFFFD/g;
  function kh(e) {
    return (typeof e == "string" ? e : "" + e).replace(Eg, `
`).replace(xg, "");
  }
  function Ih(e, t) {
    return t = kh(t), kh(e) === t;
  }
  function tt(e, t, i, n, s, u) {
    switch (i) {
      case "children":
        typeof n == "string" ? t === "body" || t === "textarea" && n === "" || bn(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && bn(e, "" + n);
        break;
      case "className":
        Ja(e, "class", n);
        break;
      case "tabIndex":
        Ja(e, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ja(e, i, n);
        break;
      case "style":
        Io(e, n, u);
        break;
      case "data":
        if (t !== "object") {
          Ja(e, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (t !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          e.removeAttribute(i);
          break;
        }
        n = el("" + n), e.setAttribute(i, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          e.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (i === "formAction" ? (t !== "input" && tt(e, t, "name", s.name, s, null), tt(
            e,
            t,
            "formEncType",
            s.formEncType,
            s,
            null
          ), tt(
            e,
            t,
            "formMethod",
            s.formMethod,
            s,
            null
          ), tt(
            e,
            t,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (tt(e, t, "encType", s.encType, s, null), tt(e, t, "method", s.method, s, null), tt(e, t, "target", s.target, s, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          e.removeAttribute(i);
          break;
        }
        n = el("" + n), e.setAttribute(i, n);
        break;
      case "onClick":
        n != null && (e.onclick = fi);
        break;
      case "onScroll":
        n != null && Fe("scroll", e);
        break;
      case "onScrollEnd":
        n != null && Fe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(l(61));
          if (i = n.__html, i != null) {
            if (s.children != null) throw Error(l(60));
            e.innerHTML = i;
          }
        }
        break;
      case "multiple":
        e.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        e.muted = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        i = el("" + n), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          i
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(i, "" + n) : e.removeAttribute(i);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        n && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(i, "") : e.removeAttribute(i);
        break;
      case "capture":
      case "download":
        n === !0 ? e.setAttribute(i, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(i, n) : e.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? e.setAttribute(i, n) : e.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? e.removeAttribute(i) : e.setAttribute(i, n);
        break;
      case "popover":
        Fe("beforetoggle", e), Fe("toggle", e), Ka(e, "popover", n);
        break;
      case "xlinkActuate":
        hi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        hi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        hi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        hi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        hi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        hi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        hi(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        hi(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        hi(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        Ka(e, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Jf.get(i) || i, Ka(e, i, n));
    }
  }
  function ao(e, t, i, n, s, u) {
    switch (i) {
      case "style":
        Io(e, n, u);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(l(61));
          if (i = n.__html, i != null) {
            if (s.children != null) throw Error(l(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof n == "string" ? bn(e, n) : (typeof n == "number" || typeof n == "bigint") && bn(e, "" + n);
        break;
      case "onScroll":
        n != null && Fe("scroll", e);
        break;
      case "onScrollEnd":
        n != null && Fe("scrollend", e);
        break;
      case "onClick":
        n != null && (e.onclick = fi);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Fo.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (s = i.endsWith("Capture"), t = i.slice(2, s ? i.length - 7 : void 0), u = e[Dt] || null, u = u != null ? u[i] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof n == "function")) {
              typeof u != "function" && u !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, n, s);
              break e;
            }
            i in e ? e[i] = n : n === !0 ? e.setAttribute(i, "") : Ka(e, i, n);
          }
    }
  }
  function Et(e, t, i) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Fe("error", e), Fe("load", e);
        var n = !1, s = !1, u;
        for (u in i)
          if (i.hasOwnProperty(u)) {
            var v = i[u];
            if (v != null)
              switch (u) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, t));
                default:
                  tt(e, t, u, v, i, null);
              }
          }
        s && tt(e, t, "srcSet", i.srcSet, i, null), n && tt(e, t, "src", i.src, i, null);
        return;
      case "input":
        Fe("invalid", e);
        var S = u = v = s = null, A = null, N = null;
        for (n in i)
          if (i.hasOwnProperty(n)) {
            var q = i[n];
            if (q != null)
              switch (n) {
                case "name":
                  s = q;
                  break;
                case "type":
                  v = q;
                  break;
                case "checked":
                  A = q;
                  break;
                case "defaultChecked":
                  N = q;
                  break;
                case "value":
                  u = q;
                  break;
                case "defaultValue":
                  S = q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (q != null)
                    throw Error(l(137, t));
                  break;
                default:
                  tt(e, t, n, q, i, null);
              }
          }
        Zo(
          e,
          u,
          S,
          A,
          N,
          v,
          s,
          !1
        );
        return;
      case "select":
        Fe("invalid", e), n = v = u = null;
        for (s in i)
          if (i.hasOwnProperty(s) && (S = i[s], S != null))
            switch (s) {
              case "value":
                u = S;
                break;
              case "defaultValue":
                v = S;
                break;
              case "multiple":
                n = S;
              default:
                tt(e, t, s, S, i, null);
            }
        t = u, i = v, e.multiple = !!n, t != null ? xn(e, !!n, t, !1) : i != null && xn(e, !!n, i, !0);
        return;
      case "textarea":
        Fe("invalid", e), u = s = n = null;
        for (v in i)
          if (i.hasOwnProperty(v) && (S = i[v], S != null))
            switch (v) {
              case "value":
                n = S;
                break;
              case "defaultValue":
                s = S;
                break;
              case "children":
                u = S;
                break;
              case "dangerouslySetInnerHTML":
                if (S != null) throw Error(l(91));
                break;
              default:
                tt(e, t, v, S, i, null);
            }
        Yo(e, n, s, u);
        return;
      case "option":
        for (A in i)
          i.hasOwnProperty(A) && (n = i[A], n != null) && (A === "selected" ? e.selected = n && typeof n != "function" && typeof n != "symbol" : tt(e, t, A, n, i, null));
        return;
      case "dialog":
        Fe("beforetoggle", e), Fe("toggle", e), Fe("cancel", e), Fe("close", e);
        break;
      case "iframe":
      case "object":
        Fe("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Fa.length; n++)
          Fe(Fa[n], e);
        break;
      case "image":
        Fe("error", e), Fe("load", e);
        break;
      case "details":
        Fe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Fe("error", e), Fe("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (N in i)
          if (i.hasOwnProperty(N) && (n = i[N], n != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, t));
              default:
                tt(e, t, N, n, i, null);
            }
        return;
      default:
        if (yr(t)) {
          for (q in i)
            i.hasOwnProperty(q) && (n = i[q], n !== void 0 && ao(
              e,
              t,
              q,
              n,
              i,
              void 0
            ));
          return;
        }
    }
    for (S in i)
      i.hasOwnProperty(S) && (n = i[S], n != null && tt(e, t, S, n, i, null));
  }
  function bg(e, t, i, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, u = null, v = null, S = null, A = null, N = null, q = null;
        for (j in i) {
          var I = i[j];
          if (i.hasOwnProperty(j) && I != null)
            switch (j) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                A = I;
              default:
                n.hasOwnProperty(j) || tt(e, t, j, null, n, I);
            }
        }
        for (var L in n) {
          var j = n[L];
          if (I = i[L], n.hasOwnProperty(L) && (j != null || I != null))
            switch (L) {
              case "type":
                u = j;
                break;
              case "name":
                s = j;
                break;
              case "checked":
                N = j;
                break;
              case "defaultChecked":
                q = j;
                break;
              case "value":
                v = j;
                break;
              case "defaultValue":
                S = j;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null)
                  throw Error(l(137, t));
                break;
              default:
                j !== I && tt(
                  e,
                  t,
                  L,
                  j,
                  n,
                  I
                );
            }
        }
        mr(
          e,
          v,
          S,
          A,
          N,
          q,
          u,
          s
        );
        return;
      case "select":
        j = v = S = L = null;
        for (u in i)
          if (A = i[u], i.hasOwnProperty(u) && A != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                j = A;
              default:
                n.hasOwnProperty(u) || tt(
                  e,
                  t,
                  u,
                  null,
                  n,
                  A
                );
            }
        for (s in n)
          if (u = n[s], A = i[s], n.hasOwnProperty(s) && (u != null || A != null))
            switch (s) {
              case "value":
                L = u;
                break;
              case "defaultValue":
                S = u;
                break;
              case "multiple":
                v = u;
              default:
                u !== A && tt(
                  e,
                  t,
                  s,
                  u,
                  n,
                  A
                );
            }
        t = S, i = v, n = j, L != null ? xn(e, !!i, L, !1) : !!n != !!i && (t != null ? xn(e, !!i, t, !0) : xn(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        j = L = null;
        for (S in i)
          if (s = i[S], i.hasOwnProperty(S) && s != null && !n.hasOwnProperty(S))
            switch (S) {
              case "value":
                break;
              case "children":
                break;
              default:
                tt(e, t, S, null, n, s);
            }
        for (v in n)
          if (s = n[v], u = i[v], n.hasOwnProperty(v) && (s != null || u != null))
            switch (v) {
              case "value":
                L = s;
                break;
              case "defaultValue":
                j = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(l(91));
                break;
              default:
                s !== u && tt(e, t, v, s, n, u);
            }
        Xo(e, L, j);
        return;
      case "option":
        for (var ce in i)
          L = i[ce], i.hasOwnProperty(ce) && L != null && !n.hasOwnProperty(ce) && (ce === "selected" ? e.selected = !1 : tt(
            e,
            t,
            ce,
            null,
            n,
            L
          ));
        for (A in n)
          L = n[A], j = i[A], n.hasOwnProperty(A) && L !== j && (L != null || j != null) && (A === "selected" ? e.selected = L && typeof L != "function" && typeof L != "symbol" : tt(
            e,
            t,
            A,
            L,
            n,
            j
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Ee in i)
          L = i[Ee], i.hasOwnProperty(Ee) && L != null && !n.hasOwnProperty(Ee) && tt(e, t, Ee, null, n, L);
        for (N in n)
          if (L = n[N], j = i[N], n.hasOwnProperty(N) && L !== j && (L != null || j != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null)
                  throw Error(l(137, t));
                break;
              default:
                tt(
                  e,
                  t,
                  N,
                  L,
                  n,
                  j
                );
            }
        return;
      default:
        if (yr(t)) {
          for (var it in i)
            L = i[it], i.hasOwnProperty(it) && L !== void 0 && !n.hasOwnProperty(it) && ao(
              e,
              t,
              it,
              void 0,
              n,
              L
            );
          for (q in n)
            L = n[q], j = i[q], !n.hasOwnProperty(q) || L === j || L === void 0 && j === void 0 || ao(
              e,
              t,
              q,
              L,
              n,
              j
            );
          return;
        }
    }
    for (var H in i)
      L = i[H], i.hasOwnProperty(H) && L != null && !n.hasOwnProperty(H) && tt(e, t, H, null, n, L);
    for (I in n)
      L = n[I], j = i[I], !n.hasOwnProperty(I) || L === j || L == null && j == null || tt(e, t, I, L, n, j);
  }
  function Qh(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Rg() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), n = 0; n < i.length; n++) {
        var s = i[n], u = s.transferSize, v = s.initiatorType, S = s.duration;
        if (u && S && Qh(v)) {
          for (v = 0, S = s.responseEnd, n += 1; n < i.length; n++) {
            var A = i[n], N = A.startTime;
            if (N > S) break;
            var q = A.transferSize, I = A.initiatorType;
            q && Qh(I) && (A = A.responseEnd, v += q * (A < S ? 1 : (S - N) / (A - N)));
          }
          if (--n, t += 8 * (u + v) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var lo = null, ro = null;
  function Ql(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Wh(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Kh(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function so(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var oo = null;
  function Cg() {
    var e = window.event;
    return e && e.type === "popstate" ? e === oo ? !1 : (oo = e, !0) : (oo = null, !1);
  }
  var Jh = typeof setTimeout == "function" ? setTimeout : void 0, Dg = typeof clearTimeout == "function" ? clearTimeout : void 0, $h = typeof Promise == "function" ? Promise : void 0, Ag = typeof queueMicrotask == "function" ? queueMicrotask : typeof $h < "u" ? function(e) {
    return $h.resolve(null).then(e).catch(zg);
  } : Jh;
  function zg(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ki(e) {
    return e === "head";
  }
  function ef(e, t) {
    var i = t, n = 0;
    do {
      var s = i.nextSibling;
      if (e.removeChild(i), s && s.nodeType === 8)
        if (i = s.data, i === "/$" || i === "/&") {
          if (n === 0) {
            e.removeChild(s), ia(t);
            return;
          }
          n--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          n++;
        else if (i === "html")
          ja(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, ja(i);
          for (var u = i.firstChild; u; ) {
            var v = u.nextSibling, S = u.nodeName;
            u[la] || S === "SCRIPT" || S === "STYLE" || S === "LINK" && u.rel.toLowerCase() === "stylesheet" || i.removeChild(u), u = v;
          }
        } else
          i === "body" && ja(e.ownerDocument.body);
      i = s;
    } while (i);
    ia(t);
  }
  function tf(e, t) {
    var i = e;
    e = 0;
    do {
      var n = i.nextSibling;
      if (i.nodeType === 1 ? t ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (t ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), n && n.nodeType === 8)
        if (i = n.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = n;
    } while (i);
  }
  function uo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          uo(i), gr(i);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(i);
    }
  }
  function Og(e, t, i, n) {
    for (; e.nodeType === 1; ) {
      var s = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (n) {
        if (!e[la])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== s.rel || e.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || e.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (s.src == null ? null : s.src) || e.getAttribute("type") !== (s.type == null ? null : s.type) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = Jt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Mg(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = Jt(e.nextSibling), e === null)) return null;
    return e;
  }
  function nf(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Jt(e.nextSibling), e === null)) return null;
    return e;
  }
  function co(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function ho(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Hg(e, t) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || i.readyState !== "loading")
      t();
    else {
      var n = function() {
        t(), i.removeEventListener("DOMContentLoaded", n);
      };
      i.addEventListener("DOMContentLoaded", n), e._reactRetry = n;
    }
  }
  function Jt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var fo = null;
  function af(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return Jt(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function lf(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (t === 0) return e;
          t--;
        } else i !== "/$" && i !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function rf(e, t, i) {
    switch (t = Ql(i), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(l(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(l(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(l(454));
        return e;
      default:
        throw Error(l(451));
    }
  }
  function ja(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    gr(e);
  }
  var $t = /* @__PURE__ */ new Map(), sf = /* @__PURE__ */ new Set();
  function Wl(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Di = ee.d;
  ee.d = {
    f: Bg,
    r: Pg,
    D: Ng,
    C: Lg,
    L: Ug,
    m: Fg,
    X: jg,
    S: Gg,
    M: Vg
  };
  function Bg() {
    var e = Di.f(), t = jl();
    return e || t;
  }
  function Pg(e) {
    var t = Sn(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ec(t) : Di.r(e);
  }
  var $n = typeof document > "u" ? null : document;
  function of(e, t, i) {
    var n = $n;
    if (n && typeof t == "string" && t) {
      var s = Xt(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof i == "string" && (s += '[crossorigin="' + i + '"]'), sf.has(s) || (sf.add(s), e = { rel: e, crossOrigin: i, href: t }, n.querySelector(s) === null && (t = n.createElement("link"), Et(t, "link", e), vt(t), n.head.appendChild(t)));
    }
  }
  function Ng(e) {
    Di.D(e), of("dns-prefetch", e, null);
  }
  function Lg(e, t) {
    Di.C(e, t), of("preconnect", e, t);
  }
  function Ug(e, t, i) {
    Di.L(e, t, i);
    var n = $n;
    if (n && e && t) {
      var s = 'link[rel="preload"][as="' + Xt(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (s += '[imagesrcset="' + Xt(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (s += '[imagesizes="' + Xt(
        i.imageSizes
      ) + '"]')) : s += '[href="' + Xt(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = ea(e);
          break;
        case "script":
          u = ta(e);
      }
      $t.has(u) || (e = p(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), $t.set(u, e), n.querySelector(s) !== null || t === "style" && n.querySelector(Va(u)) || t === "script" && n.querySelector(qa(u)) || (t = n.createElement("link"), Et(t, "link", e), vt(t), n.head.appendChild(t)));
    }
  }
  function Fg(e, t) {
    Di.m(e, t);
    var i = $n;
    if (i && e) {
      var n = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Xt(n) + '"][href="' + Xt(e) + '"]', u = s;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = ta(e);
      }
      if (!$t.has(u) && (e = p({ rel: "modulepreload", href: e }, t), $t.set(u, e), i.querySelector(s) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(qa(u)))
              return;
        }
        n = i.createElement("link"), Et(n, "link", e), vt(n), i.head.appendChild(n);
      }
    }
  }
  function Gg(e, t, i) {
    Di.S(e, t, i);
    var n = $n;
    if (n && e) {
      var s = _n(n).hoistableStyles, u = ea(e);
      t = t || "default";
      var v = s.get(u);
      if (!v) {
        var S = { loading: 0, preload: null };
        if (v = n.querySelector(
          Va(u)
        ))
          S.loading = 5;
        else {
          e = p(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = $t.get(u)) && go(e, i);
          var A = v = n.createElement("link");
          vt(A), Et(A, "link", e), A._p = new Promise(function(N, q) {
            A.onload = N, A.onerror = q;
          }), A.addEventListener("load", function() {
            S.loading |= 1;
          }), A.addEventListener("error", function() {
            S.loading |= 2;
          }), S.loading |= 4, Kl(v, t, n);
        }
        v = {
          type: "stylesheet",
          instance: v,
          count: 1,
          state: S
        }, s.set(u, v);
      }
    }
  }
  function jg(e, t) {
    Di.X(e, t);
    var i = $n;
    if (i && e) {
      var n = _n(i).hoistableScripts, s = ta(e), u = n.get(s);
      u || (u = i.querySelector(qa(s)), u || (e = p({ src: e, async: !0 }, t), (t = $t.get(s)) && po(e, t), u = i.createElement("script"), vt(u), Et(u, "link", e), i.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(s, u));
    }
  }
  function Vg(e, t) {
    Di.M(e, t);
    var i = $n;
    if (i && e) {
      var n = _n(i).hoistableScripts, s = ta(e), u = n.get(s);
      u || (u = i.querySelector(qa(s)), u || (e = p({ src: e, async: !0, type: "module" }, t), (t = $t.get(s)) && po(e, t), u = i.createElement("script"), vt(u), Et(u, "link", e), i.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(s, u));
    }
  }
  function uf(e, t, i, n) {
    var s = (s = Re.current) ? Wl(s) : null;
    if (!s) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = ea(i.href), i = _n(
          s
        ).hoistableStyles, n = i.get(t), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = ea(i.href);
          var u = _n(
            s
          ).hoistableStyles, v = u.get(e);
          if (v || (s = s.ownerDocument || s, v = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, v), (u = s.querySelector(
            Va(e)
          )) && !u._p && (v.instance = u, v.state.loading = 5), $t.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, $t.set(e, i), u || qg(
            s,
            e,
            i,
            v.state
          ))), t && n === null)
            throw Error(l(528, ""));
          return v;
        }
        if (t && n !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ta(i), i = _n(
          s
        ).hoistableScripts, n = i.get(t), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, e));
    }
  }
  function ea(e) {
    return 'href="' + Xt(e) + '"';
  }
  function Va(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function cf(e) {
    return p({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function qg(e, t, i, n) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
      return n.loading |= 1;
    }), t.addEventListener("error", function() {
      return n.loading |= 2;
    }), Et(t, "link", i), vt(t), e.head.appendChild(t));
  }
  function ta(e) {
    return '[src="' + Xt(e) + '"]';
  }
  function qa(e) {
    return "script[async]" + e;
  }
  function hf(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var n = e.querySelector(
            'style[data-href~="' + Xt(i.href) + '"]'
          );
          if (n)
            return t.instance = n, vt(n), n;
          var s = p({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return n = (e.ownerDocument || e).createElement(
            "style"
          ), vt(n), Et(n, "style", s), Kl(n, i.precedence, e), t.instance = n;
        case "stylesheet":
          s = ea(i.href);
          var u = e.querySelector(
            Va(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, vt(u), u;
          n = cf(i), (s = $t.get(s)) && go(n, s), u = (e.ownerDocument || e).createElement("link"), vt(u);
          var v = u;
          return v._p = new Promise(function(S, A) {
            v.onload = S, v.onerror = A;
          }), Et(u, "link", n), t.state.loading |= 4, Kl(u, i.precedence, e), t.instance = u;
        case "script":
          return u = ta(i.src), (s = e.querySelector(
            qa(u)
          )) ? (t.instance = s, vt(s), s) : (n = i, (s = $t.get(u)) && (n = p({}, i), po(n, s)), e = e.ownerDocument || e, s = e.createElement("script"), vt(s), Et(s, "link", n), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(l(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, Kl(n, i.precedence, e));
    return t.instance;
  }
  function Kl(e, t, i) {
    for (var n = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = n.length ? n[n.length - 1] : null, u = s, v = 0; v < n.length; v++) {
      var S = n[v];
      if (S.dataset.precedence === t) u = S;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function go(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function po(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Jl = null;
  function ff(e, t, i) {
    if (Jl === null) {
      var n = /* @__PURE__ */ new Map(), s = Jl = /* @__PURE__ */ new Map();
      s.set(i, n);
    } else
      s = Jl, n = s.get(i), n || (n = /* @__PURE__ */ new Map(), s.set(i, n));
    if (n.has(e)) return n;
    for (n.set(e, null), i = i.getElementsByTagName(e), s = 0; s < i.length; s++) {
      var u = i[s];
      if (!(u[la] || u[Tt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var v = u.getAttribute(t) || "";
        v = e + v;
        var S = n.get(v);
        S ? S.push(u) : n.set(v, [u]);
      }
    }
    return n;
  }
  function df(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Zg(e, t, i) {
    if (i === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function gf(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Xg(e, t, i, n) {
    if (i.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var s = ea(n.href), u = t.querySelector(
          Va(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = $l.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = u, vt(u);
          return;
        }
        u = t.ownerDocument || t, n = cf(n), (s = $t.get(s)) && go(n, s), u = u.createElement("link"), vt(u);
        var v = u;
        v._p = new Promise(function(S, A) {
          v.onload = S, v.onerror = A;
        }), Et(u, "link", n), i.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = $l.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var mo = 0;
  function Yg(e, t) {
    return e.stylesheets && e.count === 0 && tr(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var n = setTimeout(function() {
        if (e.stylesheets && tr(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && mo === 0 && (mo = 62500 * Rg());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && tr(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > mo ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(n), clearTimeout(s);
      };
    } : null;
  }
  function $l() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) tr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var er = null;
  function tr(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, er = /* @__PURE__ */ new Map(), t.forEach(kg, e), er = null, $l.call(e));
  }
  function kg(e, t) {
    if (!(t.state.loading & 4)) {
      var i = er.get(e);
      if (i) var n = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), er.set(e, i);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var v = s[u];
          (v.nodeName === "LINK" || v.getAttribute("media") !== "not all") && (i.set(v.dataset.precedence, v), n = v);
        }
        n && i.set(null, n);
      }
      s = t.instance, v = s.getAttribute("data-precedence"), u = i.get(v) || n, u === n && i.set(null, s), i.set(v, s), this.count++, n = $l.bind(this), s.addEventListener("load", n), s.addEventListener("error", n), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Za = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: se,
    _currentValue2: se,
    _threadCount: 0
  };
  function Ig(e, t, i, n, s, u, v, S, A) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = cr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = cr(0), this.hiddenUpdates = cr(null), this.identifierPrefix = n, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = v, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = A, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function pf(e, t, i, n, s, u, v, S, A, N, q, I) {
    return e = new Ig(
      e,
      t,
      i,
      v,
      A,
      N,
      q,
      I,
      S
    ), t = 1, u === !0 && (t |= 24), u = Lt(3, null, null, t), e.current = u, u.stateNode = e, t = Ir(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: i,
      cache: t
    }, Jr(u), e;
  }
  function mf(e) {
    return e ? (e = Mn, e) : Mn;
  }
  function vf(e, t, i, n, s, u) {
    s = mf(s), n.context === null ? n.context = s : n.pendingContext = s, n = Ni(t), n.payload = { element: i }, u = u === void 0 ? null : u, u !== null && (n.callback = u), i = Li(e, n, t), i !== null && (Bt(i, e, t), _a(i, e, t));
  }
  function yf(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function vo(e, t) {
    yf(e, t), (e = e.alternate) && yf(e, t);
  }
  function Tf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = rn(e, 67108864);
      t !== null && Bt(t, e, 67108864), vo(e, 67108864);
    }
  }
  function wf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Vt();
      t = hr(t);
      var i = rn(e, t);
      i !== null && Bt(i, e, t), vo(e, t);
    }
  }
  var ir = !0;
  function Qg(e, t, i, n) {
    var s = F.T;
    F.T = null;
    var u = ee.p;
    try {
      ee.p = 2, yo(e, t, i, n);
    } finally {
      ee.p = u, F.T = s;
    }
  }
  function Wg(e, t, i, n) {
    var s = F.T;
    F.T = null;
    var u = ee.p;
    try {
      ee.p = 8, yo(e, t, i, n);
    } finally {
      ee.p = u, F.T = s;
    }
  }
  function yo(e, t, i, n) {
    if (ir) {
      var s = To(n);
      if (s === null)
        no(
          e,
          t,
          n,
          nr,
          i
        ), _f(e, n);
      else if (Jg(
        s,
        e,
        t,
        i,
        n
      ))
        n.stopPropagation();
      else if (_f(e, n), t & 4 && -1 < Kg.indexOf(e)) {
        for (; s !== null; ) {
          var u = Sn(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var v = li(u.pendingLanes);
                  if (v !== 0) {
                    var S = u;
                    for (S.pendingLanes |= 2, S.entangledLanes |= 2; v; ) {
                      var A = 1 << 31 - Se(v);
                      S.entanglements[1] |= A, v &= ~A;
                    }
                    ui(u), (Ie & 6) === 0 && (Fl = fe() + 500, Ua(0));
                  }
                }
                break;
              case 31:
              case 13:
                S = rn(u, 2), S !== null && Bt(S, u, 2), jl(), vo(u, 2);
            }
          if (u = To(n), u === null && no(
            e,
            t,
            n,
            nr,
            i
          ), u === s) break;
          s = u;
        }
        s !== null && n.stopPropagation();
      } else
        no(
          e,
          t,
          n,
          null,
          i
        );
    }
  }
  function To(e) {
    return e = wr(e), wo(e);
  }
  var nr = null;
  function wo(e) {
    if (nr = null, e = wn(e), e !== null) {
      var t = r(e);
      if (t === null) e = null;
      else {
        var i = t.tag;
        if (i === 13) {
          if (e = f(t), e !== null) return e;
          e = null;
        } else if (i === 31) {
          if (e = d(t), e !== null) return e;
          e = null;
        } else if (i === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return nr = e, null;
  }
  function Sf(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Le()) {
          case we:
            return 2;
          case oe:
            return 8;
          case ue:
          case w:
            return 32;
          case y:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var So = !1, Ii = null, Qi = null, Wi = null, Xa = /* @__PURE__ */ new Map(), Ya = /* @__PURE__ */ new Map(), Ki = [], Kg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function _f(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ii = null;
        break;
      case "dragenter":
      case "dragleave":
        Qi = null;
        break;
      case "mouseover":
      case "mouseout":
        Wi = null;
        break;
      case "pointerover":
      case "pointerout":
        Xa.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ya.delete(t.pointerId);
    }
  }
  function ka(e, t, i, n, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = Sn(t), t !== null && Tf(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function Jg(e, t, i, n, s) {
    switch (t) {
      case "focusin":
        return Ii = ka(
          Ii,
          e,
          t,
          i,
          n,
          s
        ), !0;
      case "dragenter":
        return Qi = ka(
          Qi,
          e,
          t,
          i,
          n,
          s
        ), !0;
      case "mouseover":
        return Wi = ka(
          Wi,
          e,
          t,
          i,
          n,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return Xa.set(
          u,
          ka(
            Xa.get(u) || null,
            e,
            t,
            i,
            n,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, Ya.set(
          u,
          ka(
            Ya.get(u) || null,
            e,
            t,
            i,
            n,
            s
          )
        ), !0;
    }
    return !1;
  }
  function Ef(e) {
    var t = wn(e.target);
    if (t !== null) {
      var i = r(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = f(i), t !== null) {
            e.blockedOn = t, No(e.priority, function() {
              wf(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = d(i), t !== null) {
            e.blockedOn = t, No(e.priority, function() {
              wf(i);
            });
            return;
          }
        } else if (t === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ar(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = To(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var n = new i.constructor(
          i.type,
          i
        );
        Tr = n, i.target.dispatchEvent(n), Tr = null;
      } else
        return t = Sn(i), t !== null && Tf(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function xf(e, t, i) {
    ar(e) && i.delete(t);
  }
  function $g() {
    So = !1, Ii !== null && ar(Ii) && (Ii = null), Qi !== null && ar(Qi) && (Qi = null), Wi !== null && ar(Wi) && (Wi = null), Xa.forEach(xf), Ya.forEach(xf);
  }
  function lr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, So || (So = !0, $.unstable_scheduleCallback(
      $.unstable_NormalPriority,
      $g
    )));
  }
  var rr = null;
  function bf(e) {
    rr !== e && (rr = e, $.unstable_scheduleCallback(
      $.unstable_NormalPriority,
      function() {
        rr === e && (rr = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], n = e[t + 1], s = e[t + 2];
          if (typeof n != "function") {
            if (wo(n || i) === null)
              continue;
            break;
          }
          var u = Sn(i);
          u !== null && (e.splice(t, 3), t -= 3, ys(
            u,
            {
              pending: !0,
              data: s,
              method: i.method,
              action: n
            },
            n,
            s
          ));
        }
      }
    ));
  }
  function ia(e) {
    function t(A) {
      return lr(A, e);
    }
    Ii !== null && lr(Ii, e), Qi !== null && lr(Qi, e), Wi !== null && lr(Wi, e), Xa.forEach(t), Ya.forEach(t);
    for (var i = 0; i < Ki.length; i++) {
      var n = Ki[i];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < Ki.length && (i = Ki[0], i.blockedOn === null); )
      Ef(i), i.blockedOn === null && Ki.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (n = 0; n < i.length; n += 3) {
        var s = i[n], u = i[n + 1], v = s[Dt] || null;
        if (typeof u == "function")
          v || bf(i);
        else if (v) {
          var S = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, v = u[Dt] || null)
              S = v.formAction;
            else if (wo(s) !== null) continue;
          } else S = v.action;
          typeof S == "function" ? i[n + 1] = S : (i.splice(n, 3), n -= 3), bf(i);
        }
      }
  }
  function Rf() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(v) {
            return s = v;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      s !== null && (s(), s = null), n || setTimeout(i, 20);
    }
    function i() {
      if (!n && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, s = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(i, 100), function() {
        n = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), s !== null && (s(), s = null);
      };
    }
  }
  function _o(e) {
    this._internalRoot = e;
  }
  sr.prototype.render = _o.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(l(409));
    var i = t.current, n = Vt();
    vf(i, n, e, t, null, null);
  }, sr.prototype.unmount = _o.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      vf(e.current, 2, null, e, null, null), jl(), t[Tn] = null;
    }
  };
  function sr(e) {
    this._internalRoot = e;
  }
  sr.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Po();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < Ki.length && t !== 0 && t < Ki[i].priority; i++) ;
      Ki.splice(i, 0, e), i === 0 && Ef(e);
    }
  };
  var Cf = K.version;
  if (Cf !== "19.2.0")
    throw Error(
      l(
        527,
        Cf,
        "19.2.0"
      )
    );
  ee.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = c(t), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var ep = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: F,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var or = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!or.isDisabled && or.supportsFiber)
      try {
        U = or.inject(
          ep
        ), k = or;
      } catch {
      }
  }
  return Qa.createRoot = function(e, t) {
    if (!o(e)) throw Error(l(299));
    var i = !1, n = "", s = Hc, u = Bc, v = Pc;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (v = t.onRecoverableError)), t = pf(
      e,
      1,
      !1,
      null,
      null,
      i,
      n,
      null,
      s,
      u,
      v,
      Rf
    ), e[Tn] = t.current, io(e), new _o(t);
  }, Qa.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(l(299));
    var n = !1, s = "", u = Hc, v = Bc, S = Pc, A = null;
    return i != null && (i.unstable_strictMode === !0 && (n = !0), i.identifierPrefix !== void 0 && (s = i.identifierPrefix), i.onUncaughtError !== void 0 && (u = i.onUncaughtError), i.onCaughtError !== void 0 && (v = i.onCaughtError), i.onRecoverableError !== void 0 && (S = i.onRecoverableError), i.formState !== void 0 && (A = i.formState)), t = pf(
      e,
      1,
      !0,
      t,
      i ?? null,
      n,
      s,
      A,
      u,
      v,
      S,
      Rf
    ), t.context = mf(null), i = t.current, n = Vt(), n = hr(n), s = Ni(n), s.callback = null, Li(i, s, n), i = n, t.current.lanes = i, aa(t, i), ui(t), e[Tn] = t.current, io(e), new sr(t);
  }, Qa.version = "19.2.0", Qa;
}
var Lf;
function hp() {
  if (Lf) return xo.exports;
  Lf = 1;
  function $() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($);
      } catch (K) {
        console.error(K);
      }
  }
  return $(), xo.exports = cp(), xo.exports;
}
var wp = hp(), Me = zo(), ur = { exports: {} }, fp = ur.exports, Uf;
function dp() {
  return Uf || (Uf = 1, (function($) {
    function K(a) {
      return new K.Viewer(a);
    }
    (function(a) {
      a.version = {
        versionStr: "5.0.1",
        major: parseInt("5", 10),
        minor: parseInt("0", 10),
        revision: parseInt("1", 10)
      };
      var l = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object AsyncFunction]": "function",
        "[object Promise]": "promise",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regexp",
        "[object Object]": "object"
      }, o = Object.prototype.toString, r = Object.prototype.hasOwnProperty;
      a.isFunction = function(f) {
        return a.type(f) === "function";
      }, a.isArray = Array.isArray || function(f) {
        return a.type(f) === "array";
      }, a.isWindow = function(f) {
        return f && typeof f == "object" && "setInterval" in f;
      }, a.type = function(f) {
        return f == null ? String(f) : l[o.call(f)] || "object";
      }, a.isPlainObject = function(f) {
        if (!f || K.type(f) !== "object" || f.nodeType || a.isWindow(f) || f.constructor && !r.call(f, "constructor") && !r.call(f.constructor.prototype, "isPrototypeOf"))
          return !1;
        var d;
        for (var h in f)
          d = h;
        return d === void 0 || r.call(f, d);
      }, a.isEmptyObject = function(f) {
        for (var d in f)
          return !1;
        return !0;
      }, a.freezeObject = function(f) {
        return Object.freeze ? a.freezeObject = Object.freeze : a.freezeObject = function(d) {
          return d;
        }, a.freezeObject(f);
      }, a.supportsCanvas = (function() {
        var f = document.createElement("canvas");
        return !!(a.isFunction(f.getContext) && f.getContext("2d"));
      })(), a.isCanvasTainted = function(f) {
        var d = !1;
        try {
          f.getContext("2d").getImageData(0, 0, 1, 1);
        } catch {
          d = !0;
        }
        return d;
      }, a.supportsAddEventListener = (function() {
        return !!(document.documentElement.addEventListener && document.addEventListener);
      })(), a.supportsRemoveEventListener = (function() {
        return !!(document.documentElement.removeEventListener && document.removeEventListener);
      })(), a.supportsEventListenerOptions = (function() {
        var f = 0;
        if (a.supportsAddEventListener)
          try {
            var d = {
              get capture() {
                return f++, !1;
              },
              get once() {
                return f++, !1;
              },
              get passive() {
                return f++, !1;
              }
            };
            window.addEventListener("test", null, d), window.removeEventListener("test", null, d);
          } catch {
            f = 0;
          }
        return f >= 3;
      })(), a.getCurrentPixelDensityRatio = function() {
        if (a.supportsCanvas) {
          var f = document.createElement("canvas").getContext("2d"), d = window.devicePixelRatio || 1, h = f.webkitBackingStorePixelRatio || f.mozBackingStorePixelRatio || f.msBackingStorePixelRatio || f.oBackingStorePixelRatio || f.backingStorePixelRatio || 1;
          return Math.max(d, 1) / h;
        } else
          return 1;
      }, a.pixelDensityRatio = a.getCurrentPixelDensityRatio();
    })(K), (function(a) {
      a.extend = function() {
        var h, c, g, p, T, E, C = arguments[0] || {}, b = arguments.length, D = !1, z = 1;
        for (typeof C == "boolean" && (D = C, C = arguments[1] || {}, z = 2), typeof C != "object" && !K.isFunction(C) && (C = {}), b === z && (C = this, --z); z < b; z++)
          if (h = arguments[z], h !== null || h !== void 0)
            for (c in h) {
              var G = Object.getOwnPropertyDescriptor(h, c);
              if (G !== void 0) {
                if (G.get || G.set) {
                  Object.defineProperty(C, c, G);
                  continue;
                }
                p = G.value;
              } else {
                a.console.warn('Could not copy inherited property "' + c + '".');
                continue;
              }
              C !== p && (D && p && (K.isPlainObject(p) || (T = K.isArray(p))) ? (g = C[c], T ? (T = !1, E = g && K.isArray(g) ? g : []) : E = g && K.isPlainObject(g) ? g : {}, C[c] = K.extend(D, E, p)) : p !== void 0 && (C[c] = p));
            }
        return C;
      };
      var l = function() {
        if (typeof navigator != "object")
          return !1;
        var h = navigator.userAgent;
        return typeof h != "string" ? !1 : h.indexOf("iPhone") !== -1 || h.indexOf("iPad") !== -1 || h.indexOf("iPod") !== -1;
      };
      a.extend(
        a,
        /** @lends OpenSeadragon */
        {
          /**
           * The default values for the optional settings documented at {@link OpenSeadragon.Options}.
           * @static
           * @type {Object}
           */
          DEFAULT_SETTINGS: {
            //DATA SOURCE DETAILS
            xmlPath: null,
            tileSources: null,
            tileHost: null,
            initialPage: 0,
            crossOriginPolicy: !1,
            ajaxWithCredentials: !1,
            loadTilesWithAjax: !1,
            ajaxHeaders: {},
            splitHashDataForPost: !1,
            //PAN AND ZOOM SETTINGS AND CONSTRAINTS
            panHorizontal: !0,
            panVertical: !0,
            constrainDuringPan: !1,
            wrapHorizontal: !1,
            wrapVertical: !1,
            visibilityRatio: 0.5,
            //-> how much of the viewer can be negative space
            minPixelRatio: 0.5,
            //->closer to 0 draws tiles meant for a higher zoom at this zoom
            defaultZoomLevel: 0,
            minZoomLevel: null,
            maxZoomLevel: null,
            homeFillsViewer: !1,
            //UI RESPONSIVENESS AND FEEL
            clickTimeThreshold: 300,
            clickDistThreshold: 5,
            dblClickTimeThreshold: 300,
            dblClickDistThreshold: 20,
            springStiffness: 6.5,
            animationTime: 1.2,
            gestureSettingsMouse: {
              dragToPan: !0,
              scrollToZoom: !0,
              clickToZoom: !0,
              dblClickToZoom: !1,
              dblClickDragToZoom: !1,
              pinchToZoom: !1,
              zoomToRefPoint: !0,
              flickEnabled: !1,
              flickMinSpeed: 120,
              flickMomentum: 0.25,
              pinchRotate: !1
            },
            gestureSettingsTouch: {
              dragToPan: !0,
              scrollToZoom: !1,
              clickToZoom: !1,
              dblClickToZoom: !0,
              dblClickDragToZoom: !0,
              pinchToZoom: !0,
              zoomToRefPoint: !0,
              flickEnabled: !0,
              flickMinSpeed: 120,
              flickMomentum: 0.25,
              pinchRotate: !1
            },
            gestureSettingsPen: {
              dragToPan: !0,
              scrollToZoom: !1,
              clickToZoom: !0,
              dblClickToZoom: !1,
              dblClickDragToZoom: !1,
              pinchToZoom: !1,
              zoomToRefPoint: !0,
              flickEnabled: !1,
              flickMinSpeed: 120,
              flickMomentum: 0.25,
              pinchRotate: !1
            },
            gestureSettingsUnknown: {
              dragToPan: !0,
              scrollToZoom: !1,
              clickToZoom: !1,
              dblClickToZoom: !0,
              dblClickDragToZoom: !1,
              pinchToZoom: !0,
              zoomToRefPoint: !0,
              flickEnabled: !0,
              flickMinSpeed: 120,
              flickMomentum: 0.25,
              pinchRotate: !1
            },
            zoomPerClick: 2,
            zoomPerScroll: 1.2,
            zoomPerDblClickDrag: 1.2,
            zoomPerSecond: 1,
            blendTime: 0,
            alwaysBlend: !1,
            autoHideControls: !0,
            immediateRender: !1,
            minZoomImageRatio: 0.9,
            //-> closer to 0 allows zoom out to infinity
            maxZoomPixelRatio: 1.1,
            //-> higher allows 'over zoom' into pixels
            smoothTileEdgesMinZoom: 1.1,
            //-> higher than maxZoomPixelRatio disables it
            iOSDevice: l(),
            pixelsPerWheelLine: 40,
            pixelsPerArrowPress: 40,
            autoResize: !0,
            preserveImageSizeOnResize: !1,
            // requires autoResize=true
            minScrollDeltaTime: 50,
            rotationIncrement: 90,
            maxTilesPerFrame: 1,
            //DEFAULT CONTROL SETTINGS
            showSequenceControl: !0,
            //SEQUENCE
            sequenceControlAnchor: null,
            //SEQUENCE
            preserveViewport: !1,
            //SEQUENCE
            preserveOverlays: !1,
            //SEQUENCE
            navPrevNextWrap: !1,
            //SEQUENCE
            showNavigationControl: !0,
            //ZOOM/HOME/FULL/ROTATION
            navigationControlAnchor: null,
            //ZOOM/HOME/FULL/ROTATION
            showZoomControl: !0,
            //ZOOM
            showHomeControl: !0,
            //HOME
            showFullPageControl: !0,
            //FULL
            showRotationControl: !1,
            //ROTATION
            showFlipControl: !1,
            //FLIP
            controlsFadeDelay: 2e3,
            //ZOOM/HOME/FULL/SEQUENCE
            controlsFadeLength: 1500,
            //ZOOM/HOME/FULL/SEQUENCE
            mouseNavEnabled: !0,
            //GENERAL MOUSE INTERACTIVITY
            //VIEWPORT NAVIGATOR SETTINGS
            showNavigator: !1,
            navigatorElement: null,
            navigatorId: null,
            navigatorPosition: null,
            navigatorSizeRatio: 0.2,
            navigatorMaintainSizeRatio: !1,
            navigatorTop: null,
            navigatorLeft: null,
            navigatorHeight: null,
            navigatorWidth: null,
            navigatorAutoResize: !0,
            navigatorAutoFade: !0,
            navigatorRotate: !0,
            navigatorBackground: "#000",
            navigatorOpacity: 0.8,
            navigatorBorderColor: "#555",
            navigatorDisplayRegionColor: "#900",
            // INITIAL ROTATION
            degrees: 0,
            // INITIAL FLIP STATE
            flipped: !1,
            overlayPreserveContentDirection: !0,
            // APPEARANCE
            opacity: 1,
            // to be passed into each TiledImage
            compositeOperation: null,
            // to be passed into each TiledImage
            // DRAWER SETTINGS
            drawer: ["webgl", "canvas", "html"],
            // prefer using webgl, then canvas (i.e. context2d), then fallback to html
            drawerOptions: {
              webgl: {},
              canvas: {},
              html: {},
              custom: {}
            },
            // TILED IMAGE SETTINGS
            preload: !1,
            // to be passed into each TiledImage
            imageSmoothingEnabled: !0,
            // to be passed into each TiledImage
            placeholderFillStyle: null,
            // to be passed into each TiledImage
            subPixelRoundingForTransparency: null,
            // to be passed into each TiledImage
            //REFERENCE STRIP SETTINGS
            showReferenceStrip: !1,
            referenceStripScroll: "horizontal",
            referenceStripElement: null,
            referenceStripHeight: null,
            referenceStripWidth: null,
            referenceStripPosition: "BOTTOM_LEFT",
            referenceStripSizeRatio: 0.2,
            //COLLECTION VISUALIZATION SETTINGS
            collectionRows: 3,
            //or columns depending on layout
            collectionColumns: 0,
            //columns in horizontal layout, rows in vertical layout
            collectionLayout: "horizontal",
            //vertical
            collectionMode: !1,
            collectionTileSize: 800,
            collectionTileMargin: 80,
            //PERFORMANCE SETTINGS
            imageLoaderLimit: 0,
            maxImageCacheCount: 200,
            timeout: 3e4,
            tileRetryMax: 0,
            tileRetryDelay: 2500,
            //INTERFACE RESOURCE SETTINGS
            prefixUrl: "/images/",
            navImages: {
              zoomIn: {
                REST: "zoomin_rest.png",
                GROUP: "zoomin_grouphover.png",
                HOVER: "zoomin_hover.png",
                DOWN: "zoomin_pressed.png"
              },
              zoomOut: {
                REST: "zoomout_rest.png",
                GROUP: "zoomout_grouphover.png",
                HOVER: "zoomout_hover.png",
                DOWN: "zoomout_pressed.png"
              },
              home: {
                REST: "home_rest.png",
                GROUP: "home_grouphover.png",
                HOVER: "home_hover.png",
                DOWN: "home_pressed.png"
              },
              fullpage: {
                REST: "fullpage_rest.png",
                GROUP: "fullpage_grouphover.png",
                HOVER: "fullpage_hover.png",
                DOWN: "fullpage_pressed.png"
              },
              rotateleft: {
                REST: "rotateleft_rest.png",
                GROUP: "rotateleft_grouphover.png",
                HOVER: "rotateleft_hover.png",
                DOWN: "rotateleft_pressed.png"
              },
              rotateright: {
                REST: "rotateright_rest.png",
                GROUP: "rotateright_grouphover.png",
                HOVER: "rotateright_hover.png",
                DOWN: "rotateright_pressed.png"
              },
              flip: {
                // Flip icon designed by Yaroslav Samoylov from the Noun Project and modified by Nelson Campos ncampos@criteriamarathon.com, https://thenounproject.com/term/flip/136289/
                REST: "flip_rest.png",
                GROUP: "flip_grouphover.png",
                HOVER: "flip_hover.png",
                DOWN: "flip_pressed.png"
              },
              previous: {
                REST: "previous_rest.png",
                GROUP: "previous_grouphover.png",
                HOVER: "previous_hover.png",
                DOWN: "previous_pressed.png"
              },
              next: {
                REST: "next_rest.png",
                GROUP: "next_grouphover.png",
                HOVER: "next_hover.png",
                DOWN: "next_pressed.png"
              }
            },
            //DEVELOPER SETTINGS
            debugMode: !1,
            debugGridColor: ["#437AB2", "#1B9E77", "#D95F02", "#7570B3", "#E7298A", "#66A61E", "#E6AB02", "#A6761D", "#666666"],
            silenceMultiImageWarnings: !1
          },
          /**
           * Returns a function which invokes the method as if it were a method belonging to the object.
           * @function
           * @param {Object} object
           * @param {Function} method
           * @returns {Function}
           */
          delegate: function(h, c) {
            return function() {
              var g = arguments;
              return g === void 0 && (g = []), c.apply(h, g);
            };
          },
          /**
           * An enumeration of Browser vendors.
           * @static
           * @type {Object}
           * @property {Number} UNKNOWN
           * @property {Number} IE
           * @property {Number} FIREFOX
           * @property {Number} SAFARI
           * @property {Number} CHROME
           * @property {Number} OPERA
           * @property {Number} EDGE
           * @property {Number} CHROMEEDGE
           */
          BROWSERS: {
            UNKNOWN: 0,
            IE: 1,
            FIREFOX: 2,
            SAFARI: 3,
            CHROME: 4,
            OPERA: 5,
            EDGE: 6,
            CHROMEEDGE: 7
          },
          /**
           * An enumeration of when subpixel rounding should occur.
           * @static
           * @type {Object}
           * @property {Number} NEVER Never apply subpixel rounding for transparency.
           * @property {Number} ONLY_AT_REST Do not apply subpixel rounding for transparency during animation (panning, zoom, rotation) and apply it once animation is over.
           * @property {Number} ALWAYS Apply subpixel rounding for transparency during animation and when animation is over.
           */
          SUBPIXEL_ROUNDING_OCCURRENCES: {
            NEVER: 0,
            ONLY_AT_REST: 1,
            ALWAYS: 2
          },
          /**
           * Keep track of which {@link Viewer}s have been created.
           * - Key: {@link Element} to which a Viewer is attached.
           * - Value: {@link Viewer} of the element defined by the key.
           * @private
           * @static
           * @type {Object}
           */
          _viewers: /* @__PURE__ */ new Map(),
          /**
            * Returns the {@link Viewer} attached to a given DOM element. If there is
            * no viewer attached to the provided element, undefined is returned.
            * @function
            * @param {String|Element} element Accepts an id or element.
            * @returns {Viewer} The viewer attached to the given element, or undefined.
            */
          getViewer: function(h) {
            return a._viewers.get(this.getElement(h));
          },
          /**
           * Returns a DOM Element for the given id or element.
           * @function
           * @param {String|Element} element Accepts an id or element.
           * @returns {Element} The element with the given id, null, or the element itself.
           */
          getElement: function(h) {
            return typeof h == "string" && (h = document.getElementById(h)), h;
          },
          /**
           * Determines the position of the upper-left corner of the element.
           * @function
           * @param {Element|String} element - the element we want the position for.
           * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element.
           */
          getElementPosition: function(h) {
            var c = new a.Point(), g, p;
            for (h = a.getElement(h), g = a.getElementStyle(h).position === "fixed", p = d(h, g); p; )
              c.x += h.offsetLeft, c.y += h.offsetTop, g && (c = c.plus(a.getPageScroll())), h = p, g = a.getElementStyle(h).position === "fixed", p = d(h, g);
            return c;
          },
          /**
           * Determines the position of the upper-left corner of the element adjusted for current page and/or element scroll.
           * @function
           * @param {Element|String} element - the element we want the position for.
           * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element adjusted for current page and/or element scroll.
           */
          getElementOffset: function(h) {
            h = a.getElement(h);
            var c = h && h.ownerDocument, g, p, T = { top: 0, left: 0 };
            return c ? (g = c.documentElement, typeof h.getBoundingClientRect < "u" && (T = h.getBoundingClientRect()), p = c === c.window ? c : c.nodeType === 9 ? c.defaultView || c.parentWindow : !1, new a.Point(
              T.left + (p.pageXOffset || g.scrollLeft) - (g.clientLeft || 0),
              T.top + (p.pageYOffset || g.scrollTop) - (g.clientTop || 0)
            )) : new a.Point();
          },
          /**
           * Determines the height and width of the given element.
           * @function
           * @param {Element|String} element
           * @returns {OpenSeadragon.Point}
           */
          getElementSize: function(h) {
            return h = a.getElement(h), new a.Point(
              h.clientWidth,
              h.clientHeight
            );
          },
          /**
           * Returns the CSSStyle object for the given element.
           * @function
           * @param {Element|String} element
           * @returns {CSSStyle}
           */
          getElementStyle: document.documentElement.currentStyle ? function(h) {
            return h = a.getElement(h), h.currentStyle;
          } : function(h) {
            return h = a.getElement(h), window.getComputedStyle(h, "");
          },
          /**
           * Returns the property with the correct vendor prefix appended.
           * @param {String} property the property name
           * @returns {String} the property with the correct prefix or null if not
           * supported.
           */
          getCssPropertyWithVendorPrefix: function(h) {
            var c = {};
            return a.getCssPropertyWithVendorPrefix = function(g) {
              if (c[g] !== void 0)
                return c[g];
              var p = document.createElement("div").style, T = null;
              if (p[g] !== void 0)
                T = g;
              else
                for (var E = [
                  "Webkit",
                  "Moz",
                  "MS",
                  "O",
                  "webkit",
                  "moz",
                  "ms",
                  "o"
                ], C = a.capitalizeFirstLetter(g), b = 0; b < E.length; b++) {
                  var D = E[b] + C;
                  if (p[D] !== void 0) {
                    T = D;
                    break;
                  }
                }
              return c[g] = T, T;
            }, a.getCssPropertyWithVendorPrefix(h);
          },
          /**
           * Capitalizes the first letter of a string
           * @param {String} string
           * @returns {String} The string with the first letter capitalized
           */
          capitalizeFirstLetter: function(h) {
            return h.charAt(0).toUpperCase() + h.slice(1);
          },
          /**
           * Compute the modulo of a number but makes sure to always return
           * a positive value (also known as Euclidean modulo).
           * @param {Number} number the number to compute the modulo of
           * @param {Number} modulo the modulo
           * @returns {Number} the result of the modulo of number
           */
          positiveModulo: function(h, c) {
            var g = h % c;
            return g < 0 && (g += c), g;
          },
          /**
           * Determines if a point is within the bounding rectangle of the given element (hit-test).
           * @function
           * @param {Element|String} element
           * @param {OpenSeadragon.Point} point
           * @returns {Boolean}
           */
          pointInElement: function(h, c) {
            h = a.getElement(h);
            var g = a.getElementOffset(h), p = a.getElementSize(h);
            return c.x >= g.x && c.x < g.x + p.x && c.y < g.y + p.y && c.y >= g.y;
          },
          /**
           * Gets the position of the mouse on the screen for a given event.
           * @function
           * @param {Event} [event]
           * @returns {OpenSeadragon.Point}
           */
          getMousePosition: function(h) {
            if (typeof h.pageX == "number")
              a.getMousePosition = function(c) {
                var g = new a.Point();
                return g.x = c.pageX, g.y = c.pageY, g;
              };
            else if (typeof h.clientX == "number")
              a.getMousePosition = function(c) {
                var g = new a.Point();
                return g.x = c.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, g.y = c.clientY + document.body.scrollTop + document.documentElement.scrollTop, g;
              };
            else
              throw new Error(
                "Unknown event mouse position, no known technique."
              );
            return a.getMousePosition(h);
          },
          /**
           * Determines the page's current scroll position.
           * @function
           * @returns {OpenSeadragon.Point}
           */
          getPageScroll: function() {
            var h = document.documentElement || {}, c = document.body || {};
            if (typeof window.pageXOffset == "number")
              a.getPageScroll = function() {
                return new a.Point(
                  window.pageXOffset,
                  window.pageYOffset
                );
              };
            else if (c.scrollLeft || c.scrollTop)
              a.getPageScroll = function() {
                return new a.Point(
                  document.body.scrollLeft,
                  document.body.scrollTop
                );
              };
            else if (h.scrollLeft || h.scrollTop)
              a.getPageScroll = function() {
                return new a.Point(
                  document.documentElement.scrollLeft,
                  document.documentElement.scrollTop
                );
              };
            else
              return new a.Point(0, 0);
            return a.getPageScroll();
          },
          /**
           * Set the page scroll position.
           * @function
           * @returns {OpenSeadragon.Point}
           */
          setPageScroll: function(h) {
            if (typeof window.scrollTo < "u")
              a.setPageScroll = function(p) {
                window.scrollTo(p.x, p.y);
              };
            else {
              var c = a.getPageScroll();
              if (c.x === h.x && c.y === h.y)
                return;
              document.body.scrollLeft = h.x, document.body.scrollTop = h.y;
              var g = a.getPageScroll();
              if (g.x !== c.x && g.y !== c.y) {
                a.setPageScroll = function(p) {
                  document.body.scrollLeft = p.x, document.body.scrollTop = p.y;
                };
                return;
              }
              if (document.documentElement.scrollLeft = h.x, document.documentElement.scrollTop = h.y, g = a.getPageScroll(), g.x !== c.x && g.y !== c.y) {
                a.setPageScroll = function(p) {
                  document.documentElement.scrollLeft = p.x, document.documentElement.scrollTop = p.y;
                };
                return;
              }
              a.setPageScroll = function(p) {
              };
            }
            a.setPageScroll(h);
          },
          /**
           * Determines the size of the browsers window.
           * @function
           * @returns {OpenSeadragon.Point}
           */
          getWindowSize: function() {
            var h = document.documentElement || {}, c = document.body || {};
            if (typeof window.innerWidth == "number")
              a.getWindowSize = function() {
                return new a.Point(
                  window.innerWidth,
                  window.innerHeight
                );
              };
            else if (h.clientWidth || h.clientHeight)
              a.getWindowSize = function() {
                return new a.Point(
                  document.documentElement.clientWidth,
                  document.documentElement.clientHeight
                );
              };
            else if (c.clientWidth || c.clientHeight)
              a.getWindowSize = function() {
                return new a.Point(
                  document.body.clientWidth,
                  document.body.clientHeight
                );
              };
            else
              throw new Error("Unknown window size, no known technique.");
            return a.getWindowSize();
          },
          /**
           * Wraps the given element in a nest of divs so that the element can
           * be easily centered using CSS tables
           * @function
           * @param {Element|String} element
           * @returns {Element} outermost wrapper element
           */
          makeCenteredNode: function(h) {
            h = a.getElement(h);
            var c = [
              a.makeNeutralElement("div"),
              a.makeNeutralElement("div"),
              a.makeNeutralElement("div")
            ];
            return a.extend(c[0].style, {
              display: "table",
              height: "100%",
              width: "100%"
            }), a.extend(c[1].style, {
              display: "table-row"
            }), a.extend(c[2].style, {
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "center"
            }), c[0].appendChild(c[1]), c[1].appendChild(c[2]), c[2].appendChild(h), c[0];
          },
          /**
           * Creates an easily positionable element of the given type that therefor
           * serves as an excellent container element.
           * @function
           * @param {String} tagName
           * @returns {Element}
           */
          makeNeutralElement: function(h) {
            var c = document.createElement(h), g = c.style;
            return g.background = "transparent none", g.border = "none", g.margin = "0px", g.padding = "0px", g.position = "static", c;
          },
          /**
           * Returns the current milliseconds, using Date.now() if available
           * @function
           */
          now: function() {
            return Date.now ? a.now = Date.now : a.now = function() {
              return (/* @__PURE__ */ new Date()).getTime();
            }, a.now();
          },
          /**
           * Ensures an image is loaded correctly to support alpha transparency.
           * @function
           * @param {String} src
           * @returns {Element}
           */
          makeTransparentImage: function(h) {
            var c = a.makeNeutralElement("img");
            return c.src = h, c;
          },
          /**
           * Sets the opacity of the specified element.
           * @function
           * @param {Element|String} element
           * @param {Number} opacity
           * @param {Boolean} [usesAlpha]
           */
          setElementOpacity: function(h, c, g) {
            var p, T;
            h = a.getElement(h), g && !a.Browser.alpha && (c = Math.round(c)), a.Browser.opacity ? h.style.opacity = c < 1 ? c : "" : c < 1 ? (p = Math.round(100 * c), T = "alpha(opacity=" + p + ")", h.style.filter = T) : h.style.filter = "";
          },
          /**
           * Sets the specified element's touch-action style attribute to 'none'.
           * @function
           * @param {Element|String} element
           */
          setElementTouchActionNone: function(h) {
            h = a.getElement(h), typeof h.style.touchAction < "u" ? h.style.touchAction = "none" : typeof h.style.msTouchAction < "u" && (h.style.msTouchAction = "none");
          },
          /**
           * Sets the specified element's pointer-events style attribute to the passed value.
           * @function
           * @param {Element|String} element
           * @param {String} value
           */
          setElementPointerEvents: function(h, c) {
            h = a.getElement(h), typeof h.style < "u" && typeof h.style.pointerEvents < "u" && (h.style.pointerEvents = c);
          },
          /**
           * Sets the specified element's pointer-events style attribute to 'none'.
           * @function
           * @param {Element|String} element
           */
          setElementPointerEventsNone: function(h) {
            a.setElementPointerEvents(h, "none");
          },
          /**
           * Add the specified CSS class to the element if not present.
           * @function
           * @param {Element|String} element
           * @param {String} className
           */
          addClass: function(h, c) {
            h = a.getElement(h), h.className ? (" " + h.className + " ").indexOf(" " + c + " ") === -1 && (h.className += " " + c) : h.className = c;
          },
          /**
           * Find the first index at which an element is found in an array or -1
           * if not present.
           *
           * Code taken and adapted from
           * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility
           *
           * @function
           * @param {Array} array The array from which to find the element
           * @param {Object} searchElement The element to find
           * @param {Number} [fromIndex=0] Index to start research.
           * @returns {Number} The index of the element in the array.
           */
          indexOf: function(h, c, g) {
            return Array.prototype.indexOf ? this.indexOf = function(p, T, E) {
              return p.indexOf(T, E);
            } : this.indexOf = function(p, T, E) {
              var C, b = E || 0, D;
              if (!p)
                throw new TypeError();
              if (D = p.length, D === 0 || b >= D)
                return -1;
              for (b < 0 && (b = D - Math.abs(b)), C = b; C < D; C++)
                if (p[C] === T)
                  return C;
              return -1;
            }, this.indexOf(h, c, g);
          },
          /**
           * Remove the specified CSS class from the element.
           * @function
           * @param {Element|String} element
           * @param {String} className
           */
          removeClass: function(h, c) {
            var g, p = [], T;
            for (h = a.getElement(h), g = h.className.split(/\s+/), T = 0; T < g.length; T++)
              g[T] && g[T] !== c && p.push(g[T]);
            h.className = p.join(" ");
          },
          /**
           * Convert passed addEventListener() options to boolean or options object,
           * depending on browser support.
           * @function
           * @param {Boolean|Object} [options] Boolean useCapture, or if [supportsEventListenerOptions]{@link OpenSeadragon.supportsEventListenerOptions}, can be an object
           * @param {Boolean} [options.capture]
           * @param {Boolean} [options.passive]
           * @param {Boolean} [options.once]
           * @returns {String} The protocol (http:, https:, file:, ftp: ...)
           */
          normalizeEventListenerOptions: function(h) {
            var c;
            return typeof h < "u" ? typeof h == "boolean" ? c = a.supportsEventListenerOptions ? { capture: h } : h : c = a.supportsEventListenerOptions ? h : typeof h.capture < "u" ? h.capture : !1 : c = a.supportsEventListenerOptions ? { capture: !1 } : !1, c;
          },
          /**
           * Adds an event listener for the given element, eventName and handler.
           * @function
           * @param {Element|String} element
           * @param {String} eventName
           * @param {Function} handler
           * @param {Boolean|Object} [options] Boolean useCapture, or if [supportsEventListenerOptions]{@link OpenSeadragon.supportsEventListenerOptions}, can be an object
           * @param {Boolean} [options.capture]
           * @param {Boolean} [options.passive]
           * @param {Boolean} [options.once]
           */
          addEvent: (function() {
            if (a.supportsAddEventListener)
              return function(h, c, g, p) {
                p = a.normalizeEventListenerOptions(p), h = a.getElement(h), h.addEventListener(c, g, p);
              };
            if (document.documentElement.attachEvent && document.attachEvent)
              return function(h, c, g) {
                h = a.getElement(h), h.attachEvent("on" + c, g);
              };
            throw new Error("No known event model.");
          })(),
          /**
           * Remove a given event listener for the given element, event type and
           * handler.
           * @function
           * @param {Element|String} element
           * @param {String} eventName
           * @param {Function} handler
           * @param {Boolean|Object} [options] Boolean useCapture, or if [supportsEventListenerOptions]{@link OpenSeadragon.supportsEventListenerOptions}, can be an object
           * @param {Boolean} [options.capture]
           */
          removeEvent: (function() {
            if (a.supportsRemoveEventListener)
              return function(h, c, g, p) {
                p = a.normalizeEventListenerOptions(p), h = a.getElement(h), h.removeEventListener(c, g, p);
              };
            if (document.documentElement.detachEvent && document.detachEvent)
              return function(h, c, g) {
                h = a.getElement(h), h.detachEvent("on" + c, g);
              };
            throw new Error("No known event model.");
          })(),
          /**
           * Cancels the default browser behavior had the event propagated all
           * the way up the DOM to the window object.
           * @function
           * @param {Event} [event]
           */
          cancelEvent: function(h) {
            h.preventDefault();
          },
          /**
           * Returns true if {@link OpenSeadragon.cancelEvent|cancelEvent} has been called on
           * the event, otherwise returns false.
           * @function
           * @param {Event} [event]
           */
          eventIsCanceled: function(h) {
            return h.defaultPrevented;
          },
          /**
           * Stops the propagation of the event through the DOM in the capturing and bubbling phases.
           * @function
           * @param {Event} [event]
           */
          stopEvent: function(h) {
            h.stopPropagation();
          },
          // Deprecated
          createCallback: function(h, c) {
            console.error("The createCallback function is deprecated and will be removed in future versions. Please use alternativeFunction instead.");
            var g = [], p;
            for (p = 2; p < arguments.length; p++)
              g.push(arguments[p]);
            return function() {
              var T = g.concat([]), E;
              for (E = 0; E < arguments.length; E++)
                T.push(arguments[E]);
              return c.apply(h, T);
            };
          },
          /**
           * Retrieves the value of a url parameter from the window.location string.
           * @function
           * @param {String} key
           * @returns {String} The value of the url parameter or null if no param matches.
           */
          getUrlParameter: function(h) {
            var c = f[h];
            return c || null;
          },
          /**
           * Retrieves the protocol used by the url. The url can either be absolute
           * or relative.
           * @function
           * @private
           * @param {String} url The url to retrieve the protocol from.
           * @returns {String} The protocol (http:, https:, file:, ftp: ...)
           */
          getUrlProtocol: function(h) {
            var c = h.match(/^([a-z]+:)\/\//i);
            return c === null ? window.location.protocol : c[1].toLowerCase();
          },
          /**
           * Create an XHR object
           * @private
           * @param {type} [local] Deprecated. Ignored (IE/ActiveXObject file protocol no longer supported).
           * @returns {XMLHttpRequest}
           */
          createAjaxRequest: function() {
            if (window.XMLHttpRequest)
              return a.createAjaxRequest = function() {
                return new XMLHttpRequest();
              }, new XMLHttpRequest();
            throw new Error("Browser doesn't support XMLHttpRequest.");
          },
          /**
           * Makes an AJAX request.
           * @param {Object} options
           * @param {String} options.url - the url to request
           * @param {Function} options.success - a function to call on a successful response
           * @param {Function} options.error - a function to call on when an error occurs
           * @param {Object} options.headers - headers to add to the AJAX request
           * @param {String} options.responseType - the response type of the AJAX request
           * @param {String} options.postData - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
           *      see TileSource::getPostData), GET method used if null
           * @param {Boolean} [options.withCredentials=false] - whether to set the XHR's withCredentials
           * @throws {Error}
           * @returns {XMLHttpRequest}
           */
          makeAjaxRequest: function(h, c, g) {
            var p, T, E, C;
            a.isPlainObject(h) && (c = h.success, g = h.error, p = h.withCredentials, T = h.headers, E = h.responseType || null, C = h.postData || null, h = h.url);
            var b = a.getUrlProtocol(h), D = a.createAjaxRequest();
            if (!a.isFunction(c))
              throw new Error("makeAjaxRequest requires a success callback");
            D.onreadystatechange = function() {
              D.readyState === 4 && (D.onreadystatechange = function() {
              }, D.status >= 200 && D.status < 300 || D.status === 0 && b !== "http:" && b !== "https:" ? c(D) : a.isFunction(g) ? g(D) : a.console.error("AJAX request returned %d: %s", D.status, h));
            };
            var z = C ? "POST" : "GET";
            try {
              if (D.open(z, h, !0), E && (D.responseType = E), T)
                for (var G in T)
                  Object.prototype.hasOwnProperty.call(T, G) && T[G] && D.setRequestHeader(G, T[G]);
              p && (D.withCredentials = !0), D.send(C);
            } catch (V) {
              a.console.error("%s while making AJAX request: %s", V.name, V.message), D.onreadystatechange = function() {
              }, a.isFunction(g) && g(D, V);
            }
            return D;
          },
          /**
           * Taken from jQuery 1.6.1
           * @function
           * @param {Object} options
           * @param {String} options.url
           * @param {Function} options.callback
           * @param {String} [options.param='callback'] The name of the url parameter
           *      to request the jsonp provider with.
           * @param {String} [options.callbackName=] The name of the callback to
           *      request the jsonp provider with.
           */
          jsonp: function(h) {
            var c, g = h.url, p = document.head || document.getElementsByTagName("head")[0] || document.documentElement, T = h.callbackName || "openseadragon" + a.now(), E = window[T], C = "$1" + T + "$2", b = h.param || "callback", D = h.callback;
            g = g.replace(/(=)\?(&|$)|\?\?/i, C), g += (/\?/.test(g) ? "&" : "?") + b + "=" + T, window[T] = function(z) {
              if (E)
                window[T] = E;
              else
                try {
                  delete window[T];
                } catch {
                }
              D && a.isFunction(D) && D(z);
            }, c = document.createElement("script"), (h.async !== void 0 || h.async !== !1) && (c.async = "async"), h.scriptCharset && (c.charset = h.scriptCharset), c.src = g, c.onload = c.onreadystatechange = function(z, G) {
              (G || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, p && c.parentNode && p.removeChild(c), c = void 0);
            }, p.insertBefore(c, p.firstChild);
          },
          /**
           * Fully deprecated. Will throw an error.
           * @function
           * @deprecated use {@link OpenSeadragon.Viewer#open}
           */
          createFromDZI: function() {
            throw "OpenSeadragon.createFromDZI is deprecated, use Viewer.open.";
          },
          /**
           * Parses an XML string into a DOM Document.
           * @function
           * @param {String} string
           * @returns {Document}
           */
          parseXml: function(h) {
            if (window.DOMParser)
              a.parseXml = function(c) {
                var g = null, p;
                return p = new DOMParser(), g = p.parseFromString(c, "text/xml"), g;
              };
            else
              throw new Error("Browser doesn't support XML DOM.");
            return a.parseXml(h);
          },
          /**
           * Parses a JSON string into a Javascript object.
           * @function
           * @param {String} string
           * @returns {Object}
           */
          parseJSON: function(h) {
            return a.parseJSON = window.JSON.parse, a.parseJSON(h);
          },
          /**
           * Reports whether the image format is supported for tiling in this
           * version.
           * @function
           * @param {String} [extension]
           * @returns {Boolean}
           */
          imageFormatSupported: function(h) {
            return h = h || "", !!r[h.toLowerCase()];
          },
          /**
           * Updates supported image formats with user-specified values.
           * Preexisting formats that are not being updated are left unchanged.
           * By default, the defined formats are
           * <pre><code>{
           *      avif: true,
           *      bmp:  false,
           *      jpeg: true,
           *      jpg:  true,
           *      png:  true,
           *      tif:  false,
           *      wdp:  false,
           *      webp: true
           * }
           * </code></pre>
           * @function
           * @example
           * // sets bmp as supported and png as unsupported
           * setImageFormatsSupported({bmp: true, png: false});
           * @param {Object} formats An object containing format extensions as
           * keys and booleans as values.
           */
          setImageFormatsSupported: function(h) {
            a.extend(r, h);
          }
        }
      );
      var o = function(h) {
      };
      a.console = window.console || {
        log: o,
        debug: o,
        info: o,
        warn: o,
        error: o,
        assert: o
      }, a.Browser = {
        vendor: a.BROWSERS.UNKNOWN,
        version: 0,
        alpha: !0
      };
      var r = {
        avif: !0,
        bmp: !1,
        jpeg: !0,
        jpg: !0,
        png: !0,
        tif: !1,
        wdp: !1,
        webp: !0
      }, f = {};
      (function() {
        var h = navigator.appVersion, c = navigator.userAgent, g;
        switch (navigator.appName) {
          case "Microsoft Internet Explorer":
            window.attachEvent && window.ActiveXObject && (a.Browser.vendor = a.BROWSERS.IE, a.Browser.version = parseFloat(
              c.substring(
                c.indexOf("MSIE") + 5,
                c.indexOf(";", c.indexOf("MSIE"))
              )
            ));
            break;
          case "Netscape":
            window.addEventListener && (c.indexOf("Edge") >= 0 ? (a.Browser.vendor = a.BROWSERS.EDGE, a.Browser.version = parseFloat(
              c.substring(c.indexOf("Edge") + 5)
            )) : c.indexOf("Edg") >= 0 ? (a.Browser.vendor = a.BROWSERS.CHROMEEDGE, a.Browser.version = parseFloat(
              c.substring(c.indexOf("Edg") + 4)
            )) : c.indexOf("Firefox") >= 0 ? (a.Browser.vendor = a.BROWSERS.FIREFOX, a.Browser.version = parseFloat(
              c.substring(c.indexOf("Firefox") + 8)
            )) : c.indexOf("Safari") >= 0 ? (a.Browser.vendor = c.indexOf("Chrome") >= 0 ? a.BROWSERS.CHROME : a.BROWSERS.SAFARI, a.Browser.version = parseFloat(
              c.substring(
                c.substring(0, c.indexOf("Safari")).lastIndexOf("/") + 1,
                c.indexOf("Safari")
              )
            )) : (g = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})"), g.exec(c) !== null && (a.Browser.vendor = a.BROWSERS.IE, a.Browser.version = parseFloat(RegExp.$1))));
            break;
          case "Opera":
            a.Browser.vendor = a.BROWSERS.OPERA, a.Browser.version = parseFloat(h);
            break;
        }
        var p = window.location.search.substring(1), T = p.split("&"), E, C, b;
        for (b = 0; b < T.length; b++)
          if (E = T[b], C = E.indexOf("="), C > 0) {
            var D = E.substring(0, C), z = E.substring(C + 1);
            try {
              f[D] = decodeURIComponent(z);
            } catch {
              a.console.error("Ignoring malformed URL parameter: %s=%s", D, z);
            }
          }
        a.Browser.alpha = !(a.Browser.vendor === a.BROWSERS.CHROME && a.Browser.version < 2), a.Browser.opacity = !0, a.Browser.vendor === a.BROWSERS.IE && a.console.error("Internet Explorer is not supported by OpenSeadragon");
      })(), (function(h) {
        var c = h.requestAnimationFrame || h.mozRequestAnimationFrame || h.webkitRequestAnimationFrame || h.msRequestAnimationFrame, g = h.cancelAnimationFrame || h.mozCancelAnimationFrame || h.webkitCancelAnimationFrame || h.msCancelAnimationFrame;
        if (c && g)
          a.requestAnimationFrame = function() {
            return c.apply(h, arguments);
          }, a.cancelAnimationFrame = function() {
            return g.apply(h, arguments);
          };
        else {
          var p = [], T = [], E = 0, C;
          a.requestAnimationFrame = function(b) {
            return p.push([++E, b]), C || (C = setInterval(function() {
              if (p.length) {
                var D = a.now(), z = T;
                for (T = p, p = z; T.length; )
                  T.shift()[1](D);
              } else
                clearInterval(C), C = void 0;
            }, 1e3 / 50)), E;
          }, a.cancelAnimationFrame = function(b) {
            var D, z;
            for (D = 0, z = p.length; D < z; D += 1)
              if (p[D][0] === b) {
                p.splice(D, 1);
                return;
              }
            for (D = 0, z = T.length; D < z; D += 1)
              if (T[D][0] === b) {
                T.splice(D, 1);
                return;
              }
          };
        }
      })(window);
      function d(h, c) {
        return c && h !== document.body ? document.body : h.offsetParent;
      }
    })(K), (function(a, l) {
      $.exports ? $.exports = l() : a.OpenSeadragon = l();
    })(fp, function() {
      return K;
    }), (function(a) {
      class l {
        constructor(r) {
          r || (r = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]), this.values = r;
        }
        /**
         * @function makeIdentity
         * @memberof OpenSeadragon.Mat3
         * @static
         * @returns {OpenSeadragon.Mat3} an identity matrix
         */
        static makeIdentity() {
          return new l([
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
          ]);
        }
        /**
         * @function makeTranslation
         * @memberof OpenSeadragon.Mat3
         * @static
         * @param {Number} tx The x value of the translation
         * @param {Number} ty The y value of the translation
         * @returns {OpenSeadragon.Mat3} A translation matrix
         */
        static makeTranslation(r, f) {
          return new l([
            1,
            0,
            0,
            0,
            1,
            0,
            r,
            f,
            1
          ]);
        }
        /**
         * @function makeRotation
         * @memberof OpenSeadragon.Mat3
         * @static
         * @param {Number} angleInRadians The desired rotation angle, in radians
         * @returns {OpenSeadragon.Mat3} A rotation matrix
         */
        static makeRotation(r) {
          var f = Math.cos(r), d = Math.sin(r);
          return new l([
            f,
            -d,
            0,
            d,
            f,
            0,
            0,
            0,
            1
          ]);
        }
        /**
         * @function makeScaling
         * @memberof OpenSeadragon.Mat3
         * @static
         * @param {Number} sx The x value of the scaling
         * @param {Number} sy The y value of the scaling
         * @returns {OpenSeadragon.Mat3} A scaling matrix
         */
        static makeScaling(r, f) {
          return new l([
            r,
            0,
            0,
            0,
            f,
            0,
            0,
            0,
            1
          ]);
        }
        /**
         * @alias multiply
         * @memberof! OpenSeadragon.Mat3
         * @param {OpenSeadragon.Mat3} other the matrix to multiply with
         * @returns {OpenSeadragon.Mat3} The result of matrix multiplication
         */
        multiply(r) {
          let f = this.values, d = r.values;
          var h = f[0], c = f[1], g = f[2], p = f[3], T = f[4], E = f[5], C = f[6], b = f[7], D = f[8], z = d[0], G = d[1], V = d[2], de = d[3], ne = d[4], me = d[5], ie = d[6], Te = d[7], be = d[8];
          return new l([
            z * h + G * p + V * C,
            z * c + G * T + V * b,
            z * g + G * E + V * D,
            de * h + ne * p + me * C,
            de * c + ne * T + me * b,
            de * g + ne * E + me * D,
            ie * h + Te * p + be * C,
            ie * c + Te * T + be * b,
            ie * g + Te * E + be * D
          ]);
        }
      }
      a.Mat3 = l;
    })(K), (function(a) {
      var l = {
        supportsFullScreen: !1,
        isFullScreen: function() {
          return !1;
        },
        getFullScreenElement: function() {
          return null;
        },
        requestFullScreen: function() {
        },
        exitFullScreen: function() {
        },
        cancelFullScreen: function() {
        },
        fullScreenEventName: "",
        fullScreenErrorEventName: ""
      };
      document.exitFullscreen ? (l.supportsFullScreen = !0, l.getFullScreenElement = function() {
        return document.fullscreenElement;
      }, l.requestFullScreen = function(o) {
        return o.requestFullscreen().catch(function(r) {
          a.console.error("Fullscreen request failed: ", r);
        });
      }, l.exitFullScreen = function() {
        document.exitFullscreen().catch(function(o) {
          a.console.error("Error while exiting fullscreen: ", o);
        });
      }, l.fullScreenEventName = "fullscreenchange", l.fullScreenErrorEventName = "fullscreenerror") : document.msExitFullscreen ? (l.supportsFullScreen = !0, l.getFullScreenElement = function() {
        return document.msFullscreenElement;
      }, l.requestFullScreen = function(o) {
        return o.msRequestFullscreen();
      }, l.exitFullScreen = function() {
        document.msExitFullscreen();
      }, l.fullScreenEventName = "MSFullscreenChange", l.fullScreenErrorEventName = "MSFullscreenError") : document.webkitExitFullscreen ? (l.supportsFullScreen = !0, l.getFullScreenElement = function() {
        return document.webkitFullscreenElement;
      }, l.requestFullScreen = function(o) {
        return o.webkitRequestFullscreen();
      }, l.exitFullScreen = function() {
        document.webkitExitFullscreen();
      }, l.fullScreenEventName = "webkitfullscreenchange", l.fullScreenErrorEventName = "webkitfullscreenerror") : document.webkitCancelFullScreen ? (l.supportsFullScreen = !0, l.getFullScreenElement = function() {
        return document.webkitCurrentFullScreenElement;
      }, l.requestFullScreen = function(o) {
        return o.webkitRequestFullScreen();
      }, l.exitFullScreen = function() {
        document.webkitCancelFullScreen();
      }, l.fullScreenEventName = "webkitfullscreenchange", l.fullScreenErrorEventName = "webkitfullscreenerror") : document.mozCancelFullScreen && (l.supportsFullScreen = !0, l.getFullScreenElement = function() {
        return document.mozFullScreenElement;
      }, l.requestFullScreen = function(o) {
        return o.mozRequestFullScreen();
      }, l.exitFullScreen = function() {
        document.mozCancelFullScreen();
      }, l.fullScreenEventName = "mozfullscreenchange", l.fullScreenErrorEventName = "mozfullscreenerror"), l.isFullScreen = function() {
        return l.getFullScreenElement() !== null;
      }, l.cancelFullScreen = function() {
        a.console.error("cancelFullScreen is deprecated. Use exitFullScreen instead."), l.exitFullScreen();
      }, a.extend(a, l);
    })(K), (function(a) {
      a.EventSource = function() {
        this.events = {}, this._rejectedEventList = {};
      }, a.EventSource.prototype = {
        /**
         * Add an event handler to be triggered only once (or a given number of times)
         * for a given event. It is not removable with removeHandler().
         * @function
         * @param {String} eventName - Name of event to register.
         * @param {OpenSeadragon.EventHandler} handler - Function to call when event
         * is triggered.
         * @param {Object} [userData=null] - Arbitrary object to be passed unchanged
         * to the handler.
         * @param {Number} [times=1] - The number of times to handle the event
         * before removing it.
         * @param {Number} [priority=0] - Handler priority. By default, all priorities are 0. Higher number = priority.
         * @returns {Boolean} - True if the handler was added, false if it was rejected
         */
        addOnceHandler: function(l, o, r, f, d) {
          var h = this;
          f = f || 1;
          var c = 0, g = function(p) {
            return c++, c === f && h.removeHandler(l, g), o(p);
          };
          return this.addHandler(l, g, r, d);
        },
        /**
         * Add an event handler for a given event.
         * @function
         * @param {String} eventName - Name of event to register.
         * @param {OpenSeadragon.EventHandler} handler - Function to call when event is triggered.
         * @param {Object} [userData=null] - Arbitrary object to be passed unchanged to the handler.
         * @param {Number} [priority=0] - Handler priority. By default, all priorities are 0. Higher number = priority.
         * @returns {Boolean} - True if the handler was added, false if it was rejected
         */
        addHandler: function(l, o, r, f) {
          if (Object.prototype.hasOwnProperty.call(this._rejectedEventList, l))
            return a.console.error(`Error adding handler for ${l}. ${this._rejectedEventList[l]}`), !1;
          var d = this.events[l];
          if (d || (this.events[l] = d = []), o && a.isFunction(o)) {
            var h = d.length, c = { handler: o, userData: r || null, priority: f || 0 };
            for (d[h] = c; h > 0 && d[h - 1].priority < d[h].priority; )
              d[h] = d[h - 1], d[h - 1] = c, h--;
          }
          return !0;
        },
        /**
         * Remove a specific event handler for a given event.
         * @function
         * @param {String} eventName - Name of event for which the handler is to be removed.
         * @param {OpenSeadragon.EventHandler} handler - Function to be removed.
         */
        removeHandler: function(l, o) {
          var r = this.events[l], f = [], d;
          if (r && a.isArray(r)) {
            for (d = 0; d < r.length; d++)
              r[d].handler !== o && f.push(r[d]);
            this.events[l] = f;
          }
        },
        /**
         * Get the amount of handlers registered for a given event.
         * @param {String} eventName - Name of event to inspect.
         * @returns {number} amount of events
         */
        numberOfHandlers: function(l) {
          var o = this.events[l];
          return o ? o.length : 0;
        },
        /**
         * Remove all event handlers for a given event type. If no type is given all
         * event handlers for every event type are removed.
         * @function
         * @param {String} eventName - Name of event for which all handlers are to be removed.
         */
        removeAllHandlers: function(l) {
          if (l)
            this.events[l] = [];
          else
            for (var o in this.events)
              this.events[o] = [];
        },
        /**
         * Get a function which iterates the list of all handlers registered for a given event, calling the handler for each.
         * @function
         * @param {String} eventName - Name of event to get handlers for.
         */
        getHandler: function(l) {
          var o = this.events[l];
          return !o || !o.length ? null : (o = o.length === 1 ? [o[0]] : Array.apply(null, o), function(r, f) {
            var d, h = o.length;
            for (d = 0; d < h; d++)
              o[d] && (f.eventSource = r, f.userData = o[d].userData, o[d].handler(f));
          });
        },
        /**
         * Trigger an event, optionally passing additional information.
         * @function
         * @param {String} eventName - Name of event to register.
         * @param {Object} eventArgs - Event-specific data.
         * @returns {Boolean} True if the event was fired, false if it was rejected because of rejectEventHandler(eventName)
         */
        raiseEvent: function(l, o) {
          if (Object.prototype.hasOwnProperty.call(this._rejectedEventList, l))
            return a.console.error(`Error adding handler for ${l}. ${this._rejectedEventList[l]}`), !1;
          var r = this.getHandler(l);
          return r && r(this, o || {}), !0;
        },
        /**
         * Set an event name as being disabled, and provide an optional error message
         * to be printed to the console
         * @param {String} eventName - Name of the event
         * @param {String} [errorMessage] - Optional string to print to the console
         * @private
         */
        rejectEventHandler(l, o = "") {
          this._rejectedEventList[l] = o;
        },
        /**
         * Explicitly allow an event handler to be added for this event type, undoing
         * the effects of rejectEventHandler
         * @param {String} eventName - Name of the event
         * @private
         */
        allowEventHandler(l) {
          delete this._rejectedEventList[l];
        }
      };
    })(K), (function(a) {
      var l = {};
      a.MouseTracker = function(w) {
        var y = arguments;
        a.isPlainObject(w) || (w = {
          element: y[0],
          clickTimeThreshold: y[1],
          clickDistThreshold: y[2]
        }), this.hash = Math.random(), this.element = a.getElement(w.element), this.clickTimeThreshold = w.clickTimeThreshold || a.DEFAULT_SETTINGS.clickTimeThreshold, this.clickDistThreshold = w.clickDistThreshold || a.DEFAULT_SETTINGS.clickDistThreshold, this.dblClickTimeThreshold = w.dblClickTimeThreshold || a.DEFAULT_SETTINGS.dblClickTimeThreshold, this.dblClickDistThreshold = w.dblClickDistThreshold || a.DEFAULT_SETTINGS.dblClickDistThreshold, this.userData = w.userData || null, this.stopDelay = w.stopDelay || 50, this.preProcessEventHandler = w.preProcessEventHandler || null, this.contextMenuHandler = w.contextMenuHandler || null, this.enterHandler = w.enterHandler || null, this.leaveHandler = w.leaveHandler || null, this.exitHandler = w.exitHandler || null, this.overHandler = w.overHandler || null, this.outHandler = w.outHandler || null, this.pressHandler = w.pressHandler || null, this.nonPrimaryPressHandler = w.nonPrimaryPressHandler || null, this.releaseHandler = w.releaseHandler || null, this.nonPrimaryReleaseHandler = w.nonPrimaryReleaseHandler || null, this.moveHandler = w.moveHandler || null, this.scrollHandler = w.scrollHandler || null, this.clickHandler = w.clickHandler || null, this.dblClickHandler = w.dblClickHandler || null, this.dragHandler = w.dragHandler || null, this.dragEndHandler = w.dragEndHandler || null, this.pinchHandler = w.pinchHandler || null, this.stopHandler = w.stopHandler || null, this.keyDownHandler = w.keyDownHandler || null, this.keyUpHandler = w.keyUpHandler || null, this.keyHandler = w.keyHandler || null, this.focusHandler = w.focusHandler || null, this.blurHandler = w.blurHandler || null;
        var _ = this;
        l[this.hash] = {
          click: function(R) {
            V(_, R);
          },
          dblclick: function(R) {
            de(_, R);
          },
          keydown: function(R) {
            ne(_, R);
          },
          keyup: function(R) {
            me(_, R);
          },
          keypress: function(R) {
            ie(_, R);
          },
          focus: function(R) {
            Te(_, R);
          },
          blur: function(R) {
            be(_, R);
          },
          contextmenu: function(R) {
            qe(_, R);
          },
          wheel: function(R) {
            Oe(_, R);
          },
          mousewheel: function(R) {
            ge(_, R);
          },
          DOMMouseScroll: function(R) {
            ge(_, R);
          },
          MozMousePixelScroll: function(R) {
            ge(_, R);
          },
          losecapture: function(R) {
            Ze(_, R);
          },
          mouseenter: function(R) {
            Y(_, R);
          },
          mouseleave: function(R) {
            ae(_, R);
          },
          mouseover: function(R) {
            _e(_, R);
          },
          mouseout: function(R) {
            Re(_, R);
          },
          mousedown: function(R) {
            Ce(_, R);
          },
          mouseup: function(R) {
            $e(_, R);
          },
          mousemove: function(R) {
            qt(_, R);
          },
          touchstart: function(R) {
            Xe(_, R);
          },
          touchend: function(R) {
            F(_, R);
          },
          touchmove: function(R) {
            ee(_, R);
          },
          touchcancel: function(R) {
            se(_, R);
          },
          gesturestart: function(R) {
            De(_, R);
          },
          // Safari/Safari iOS
          gesturechange: function(R) {
            Be(_, R);
          },
          // Safari/Safari iOS
          gotpointercapture: function(R) {
            O(_, R);
          },
          lostpointercapture: function(R) {
            Z(_, R);
          },
          pointerenter: function(R) {
            Y(_, R);
          },
          pointerleave: function(R) {
            ae(_, R);
          },
          pointerover: function(R) {
            _e(_, R);
          },
          pointerout: function(R) {
            Re(_, R);
          },
          pointerdown: function(R) {
            Ce(_, R);
          },
          pointerup: function(R) {
            $e(_, R);
          },
          pointermove: function(R) {
            qt(_, R);
          },
          pointercancel: function(R) {
            he(_, R);
          },
          pointerupcaptured: function(R) {
            Qe(_, R);
          },
          pointermovecaptured: function(R) {
            te(_, R);
          },
          tracking: !1,
          // Active pointers lists. Array of GesturePointList objects, one for each pointer device type.
          // GesturePointList objects are added each time a pointer is tracked by a new pointer device type (see getActivePointersListByType()).
          // Active pointers are any pointer being tracked for this element which are in the hit-test area
          //     of the element (for hover-capable devices) and/or have contact or a button press initiated in the element.
          activePointersLists: [],
          // Tracking for double-click gesture
          lastClickPos: null,
          dblClickTimeOut: null,
          // Tracking for pinch gesture
          pinchGPoints: [],
          lastPinchDist: 0,
          currentPinchDist: 0,
          lastPinchCenter: null,
          currentPinchCenter: null,
          // Tracking for drag
          sentDragEvent: !1
        }, this.hasGestureHandlers = !!(this.pressHandler || this.nonPrimaryPressHandler || this.releaseHandler || this.nonPrimaryReleaseHandler || this.clickHandler || this.dblClickHandler || this.dragHandler || this.dragEndHandler || this.pinchHandler), this.hasScrollHandler = !!this.scrollHandler, a.MouseTracker.havePointerEvents && a.setElementPointerEvents(this.element, "auto"), this.exitHandler && a.console.error("MouseTracker.exitHandler is deprecated. Use MouseTracker.leaveHandler instead."), w.startDisabled || this.setTracking(!0);
      }, a.MouseTracker.prototype = {
        /**
         * Clean up any events or objects created by the tracker.
         * @function
         */
        destroy: function() {
          h(this), this.element = null, l[this.hash] = null, delete l[this.hash];
        },
        /**
         * Are we currently tracking events on this element.
         * @deprecated Just use this.tracking
         * @function
         * @returns {Boolean} Are we currently tracking events on this element.
         */
        isTracking: function() {
          return l[this.hash].tracking;
        },
        /**
         * Enable or disable whether or not we are tracking events on this element.
         * @function
         * @param {Boolean} track True to start tracking, false to stop tracking.
         * @returns {OpenSeadragon.MouseTracker} Chainable.
         */
        setTracking: function(w) {
          return w ? d(this) : h(this), this;
        },
        /**
         * Returns the {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} for the given pointer device type,
         * creating and caching a new {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} if one doesn't already exist for the type.
         * @function
         * @param {String} type - The pointer device type: "mouse", "touch", "pen", etc.
         * @returns {OpenSeadragon.MouseTracker.GesturePointList}
         */
        getActivePointersListByType: function(w) {
          var y = l[this.hash], _, R = y ? y.activePointersLists.length : 0, U;
          for (_ = 0; _ < R; _++)
            if (y.activePointersLists[_].type === w)
              return y.activePointersLists[_];
          return U = new a.MouseTracker.GesturePointList(w), y && y.activePointersLists.push(U), U;
        },
        /**
         * Returns the total number of pointers currently active on the tracked element.
         * @function
         * @returns {Number}
         */
        getActivePointerCount: function() {
          var w = l[this.hash], y, _ = w.activePointersLists.length, R = 0;
          for (y = 0; y < _; y++)
            R += w.activePointersLists[y].getLength();
          return R;
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
         */
        preProcessEventHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the contextmenu event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        contextMenuHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        enterHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @since v2.5.0
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        leaveHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @deprecated v2.5.0 Use leaveHandler instead
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        exitHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @since v2.5.0
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        overHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @since v2.5.0
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        outHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        pressHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.button
         *      Button which caused the event.
         *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        nonPrimaryPressHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.insideElementReleased
         *      True if the cursor inside the tracked element when the button was released.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        releaseHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.button
         *      Button which caused the event.
         *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        nonPrimaryReleaseHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        moveHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.scroll
         *      The scroll delta for the event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead. Touch devices no longer generate scroll event.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the wheel event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        scrollHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.quick
         *      True only if the clickDistThreshold and clickTimeThreshold are both passed. Useful for ignoring drag events.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Element} event.originalTarget
         *      The DOM element clicked on.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        clickHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dblClickHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {OpenSeadragon.Point} event.delta
         *      The x,y components of the difference between the current position and the last drag event position.  Useful for ignoring or weighting the events.
         * @param {Number} event.speed
         *     Current computed speed, in pixels per second.
         * @param {Number} event.direction
         *     Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dragHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.speed
         *     Speed at the end of a drag gesture, in pixels per second.
         * @param {Number} event.direction
         *     Direction at the end of a drag gesture, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dragEndHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} event.gesturePoints
         *      Gesture points associated with the gesture. Velocity data can be found here.
         * @param {OpenSeadragon.Point} event.lastCenter
         *      The previous center point of the two pinch contact points relative to the tracked element.
         * @param {OpenSeadragon.Point} event.center
         *      The center point of the two pinch contact points relative to the tracked element.
         * @param {Number} event.lastDistance
         *      The previous distance between the two pinch contact points in CSS pixels.
         * @param {Number} event.distance
         *      The distance between the two pinch contact points in CSS pixels.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        pinchHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        stopHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.ctrl
         *      True if the ctrl key was pressed during this event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.alt
         *      True if the alt key was pressed during this event.
         * @param {Boolean} event.meta
         *      True if the meta key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the keydown event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyDownHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.ctrl
         *      True if the ctrl key was pressed during this event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.alt
         *      True if the alt key was pressed during this event.
         * @param {Boolean} event.meta
         *      True if the meta key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the keyup event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyUpHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.ctrl
         *      True if the ctrl key was pressed during this event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.alt
         *      True if the alt key was pressed during this event.
         * @param {Boolean} event.meta
         *      True if the meta key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the keypress event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        focusHandler: function() {
        },
        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        blurHandler: function() {
        }
      };
      var o = (function() {
        try {
          return window.self !== window.top;
        } catch {
          return !0;
        }
      })();
      function r(w) {
        try {
          return w.addEventListener && w.removeEventListener;
        } catch {
          return !1;
        }
      }
      a.MouseTracker.gesturePointVelocityTracker = /* @__PURE__ */ (function() {
        var w = [], y = 0, _ = 0, R = function(Se, ve) {
          return Se.hash.toString() + ve.type + ve.id.toString();
        }, U = function() {
          var Se, ve = w.length, Rt, ht, ei = a.now(), $i, en, li;
          for ($i = ei - _, _ = ei, Se = 0; Se < ve; Se++)
            Rt = w[Se], ht = Rt.gPoint, ht.direction = Math.atan2(ht.currentPos.y - Rt.lastPos.y, ht.currentPos.x - Rt.lastPos.x), en = Rt.lastPos.distanceTo(ht.currentPos), Rt.lastPos = ht.currentPos, li = 1e3 * en / ($i + 1), ht.speed = 0.75 * li + 0.25 * ht.speed;
        }, k = function(Se, ve) {
          var Rt = R(Se, ve);
          w.push(
            {
              guid: Rt,
              gPoint: ve,
              lastPos: ve.currentPos
            }
          ), w.length === 1 && (_ = a.now(), y = window.setInterval(U, 50));
        }, re = function(Se, ve) {
          var Rt = R(Se, ve), ht, ei = w.length;
          for (ht = 0; ht < ei; ht++)
            if (w[ht].guid === Rt) {
              w.splice(ht, 1), ei--, ei === 0 && window.clearInterval(y);
              break;
            }
        };
        return {
          addPoint: k,
          removePoint: re
        };
      })(), a.MouseTracker.captureElement = document, a.MouseTracker.wheelEventName = "onwheel" in document.createElement("div") ? "wheel" : (
        // Modern browsers support 'wheel'
        document.onmousewheel !== void 0 ? "mousewheel" : (
          // Webkit (and unsupported IE) support at least 'mousewheel'
          "DOMMouseScroll"
        )
      ), a.MouseTracker.subscribeEvents = ["click", "dblclick", "keydown", "keyup", "keypress", "focus", "blur", "contextmenu", a.MouseTracker.wheelEventName], a.MouseTracker.wheelEventName === "DOMMouseScroll" && a.MouseTracker.subscribeEvents.push("MozMousePixelScroll"), window.PointerEvent ? (a.MouseTracker.havePointerEvents = !0, a.MouseTracker.subscribeEvents.push("pointerenter", "pointerleave", "pointerover", "pointerout", "pointerdown", "pointerup", "pointermove", "pointercancel"), a.MouseTracker.havePointerCapture = (function() {
        var w = document.createElement("div");
        return a.isFunction(w.setPointerCapture) && a.isFunction(w.releasePointerCapture);
      })(), a.MouseTracker.havePointerCapture && a.MouseTracker.subscribeEvents.push("gotpointercapture", "lostpointercapture")) : (a.MouseTracker.havePointerEvents = !1, a.MouseTracker.subscribeEvents.push("mouseenter", "mouseleave", "mouseover", "mouseout", "mousedown", "mouseup", "mousemove"), a.MouseTracker.mousePointerId = "legacy-mouse", a.MouseTracker.havePointerCapture = (function() {
        var w = document.createElement("div");
        return a.isFunction(w.setCapture) && a.isFunction(w.releaseCapture);
      })(), a.MouseTracker.havePointerCapture && a.MouseTracker.subscribeEvents.push("losecapture"), "ontouchstart" in window && a.MouseTracker.subscribeEvents.push("touchstart", "touchend", "touchmove", "touchcancel"), "ongesturestart" in window && a.MouseTracker.subscribeEvents.push("gesturestart", "gesturechange")), a.MouseTracker.GesturePointList = function(w) {
        this._gPoints = [], this.type = w, this.buttons = 0, this.contacts = 0, this.clicks = 0, this.captureCount = 0;
      }, a.MouseTracker.GesturePointList.prototype = {
        /**
         * @function
         * @returns {Number} Number of gesture points in the list.
         */
        getLength: function() {
          return this._gPoints.length;
        },
        /**
         * @function
         * @returns {Array.<OpenSeadragon.MouseTracker.GesturePoint>} The list of gesture points in the list as an array (read-only).
         */
        asArray: function() {
          return this._gPoints;
        },
        /**
         * @function
         * @param {OpenSeadragon.MouseTracker.GesturePoint} gesturePoint - A gesture point to add to the list.
         * @returns {Number} Number of gesture points in the list.
         */
        add: function(w) {
          return this._gPoints.push(w);
        },
        /**
         * @function
         * @param {Number} id - The id of the gesture point to remove from the list.
         * @returns {Number} Number of gesture points in the list.
         */
        removeById: function(w) {
          var y, _ = this._gPoints.length;
          for (y = 0; y < _; y++)
            if (this._gPoints[y].id === w) {
              this._gPoints.splice(y, 1);
              break;
            }
          return this._gPoints.length;
        },
        /**
         * @function
         * @param {Number} index - The index of the gesture point to retrieve from the list.
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The gesture point at the given index, or null if not found.
         */
        getByIndex: function(w) {
          return w < this._gPoints.length ? this._gPoints[w] : null;
        },
        /**
         * @function
         * @param {Number} id - The id of the gesture point to retrieve from the list.
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The gesture point with the given id, or null if not found.
         */
        getById: function(w) {
          var y, _ = this._gPoints.length;
          for (y = 0; y < _; y++)
            if (this._gPoints[y].id === w)
              return this._gPoints[y];
          return null;
        },
        /**
         * @function
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The primary gesture point in the list, or null if not found.
         */
        getPrimary: function(w) {
          var y, _ = this._gPoints.length;
          for (y = 0; y < _; y++)
            if (this._gPoints[y].isPrimary)
              return this._gPoints[y];
          return null;
        },
        /**
         * Increment this pointer list's contact count.
         * It will evaluate whether this pointer type is allowed to have multiple contacts.
         * @function
         */
        addContact: function() {
          ++this.contacts, this.contacts > 1 && (this.type === "mouse" || this.type === "pen") && (a.console.warn("GesturePointList.addContact() Implausible contacts value"), this.contacts = 1);
        },
        /**
         * Decrement this pointer list's contact count.
         * It will make sure the count does not go below 0.
         * @function
         */
        removeContact: function() {
          --this.contacts, this.contacts < 0 && (this.contacts = 0);
        }
      };
      function f(w) {
        var y = l[w.hash], _, R, U, k, re, Se = y.activePointersLists.length;
        for (_ = 0; _ < Se; _++)
          if (U = y.activePointersLists[_], U.getLength() > 0) {
            for (re = [], k = U.asArray(), R = 0; R < k.length; R++)
              re.push(k[R]);
            for (R = 0; R < re.length; R++)
              We(w, U, re[R]);
          }
        for (_ = 0; _ < Se; _++)
          y.activePointersLists.pop();
        y.sentDragEvent = !1;
      }
      function d(w) {
        var y = l[w.hash], _, R;
        if (!y.tracking) {
          for (R = 0; R < a.MouseTracker.subscribeEvents.length; R++)
            _ = a.MouseTracker.subscribeEvents[R], a.addEvent(
              w.element,
              _,
              y[_],
              _ === a.MouseTracker.wheelEventName ? { passive: !1, capture: !1 } : !1
            );
          f(w), y.tracking = !0;
        }
      }
      function h(w) {
        var y = l[w.hash], _, R;
        if (y.tracking) {
          for (R = 0; R < a.MouseTracker.subscribeEvents.length; R++)
            _ = a.MouseTracker.subscribeEvents[R], a.removeEvent(
              w.element,
              _,
              y[_],
              !1
            );
          f(w), y.tracking = !1;
        }
      }
      function c(w, y) {
        var _ = l[w.hash];
        if (y === "pointerevent")
          return {
            upName: "pointerup",
            upHandler: _.pointerupcaptured,
            moveName: "pointermove",
            moveHandler: _.pointermovecaptured
          };
        if (y === "mouse")
          return {
            upName: "pointerup",
            upHandler: _.pointerupcaptured,
            moveName: "pointermove",
            moveHandler: _.pointermovecaptured
          };
        if (y === "touch")
          return {
            upName: "touchend",
            upHandler: _.touchendcaptured,
            moveName: "touchmove",
            moveHandler: _.touchmovecaptured
          };
        throw new Error("MouseTracker.getCaptureEventParams: Unknown pointer type.");
      }
      function g(w, y) {
        var _;
        if (a.MouseTracker.havePointerCapture)
          if (a.MouseTracker.havePointerEvents)
            try {
              w.element.setPointerCapture(y.id);
            } catch {
              a.console.warn("setPointerCapture() called on invalid pointer ID");
              return;
            }
          else
            w.element.setCapture(!0);
        else
          _ = c(w, a.MouseTracker.havePointerEvents ? "pointerevent" : y.type), o && r(window.top) && a.addEvent(
            window.top,
            _.upName,
            _.upHandler,
            !0
          ), a.addEvent(
            a.MouseTracker.captureElement,
            _.upName,
            _.upHandler,
            !0
          ), a.addEvent(
            a.MouseTracker.captureElement,
            _.moveName,
            _.moveHandler,
            !0
          );
        B(w, y, !0);
      }
      function p(w, y) {
        var _, R, U;
        if (a.MouseTracker.havePointerCapture)
          if (a.MouseTracker.havePointerEvents) {
            if (R = w.getActivePointersListByType(y.type), U = R.getById(y.id), !U || !U.captured)
              return;
            try {
              w.element.releasePointerCapture(y.id);
            } catch {
            }
          } else
            w.element.releaseCapture();
        else
          _ = c(w, a.MouseTracker.havePointerEvents ? "pointerevent" : y.type), o && r(window.top) && a.removeEvent(
            window.top,
            _.upName,
            _.upHandler,
            !0
          ), a.removeEvent(
            a.MouseTracker.captureElement,
            _.moveName,
            _.moveHandler,
            !0
          ), a.removeEvent(
            a.MouseTracker.captureElement,
            _.upName,
            _.upHandler,
            !0
          );
        B(w, y, !1);
      }
      function T(w) {
        return a.MouseTracker.havePointerEvents ? w.pointerId : a.MouseTracker.mousePointerId;
      }
      function E(w) {
        return a.MouseTracker.havePointerEvents && w.pointerType ? w.pointerType : "mouse";
      }
      function C(w) {
        return a.MouseTracker.havePointerEvents ? w.isPrimary : !0;
      }
      function b(w) {
        return a.getMousePosition(w);
      }
      function D(w, y) {
        return z(b(w), y);
      }
      function z(w, y) {
        var _ = a.getElementOffset(y);
        return w.minus(_);
      }
      function G(w, y) {
        return new a.Point((w.x + y.x) / 2, (w.y + y.y) / 2);
      }
      function V(w, y) {
        var _ = {
          originalEvent: y,
          eventType: "click",
          pointerType: "mouse",
          isEmulated: !1
        };
        x(w, _), _.preventDefault && !_.defaultPrevented && a.cancelEvent(y), _.stopPropagation && a.stopEvent(y);
      }
      function de(w, y) {
        var _ = {
          originalEvent: y,
          eventType: "dblclick",
          pointerType: "mouse",
          isEmulated: !1
        };
        x(w, _), _.preventDefault && !_.defaultPrevented && a.cancelEvent(y), _.stopPropagation && a.stopEvent(y);
      }
      function ne(w, y) {
        var _ = null, R = {
          originalEvent: y,
          eventType: "keydown",
          pointerType: "",
          isEmulated: !1
        };
        x(w, R), w.keyDownHandler && !R.preventGesture && !R.defaultPrevented && (_ = {
          eventSource: w,
          keyCode: y.keyCode ? y.keyCode : y.charCode,
          ctrl: y.ctrlKey,
          shift: y.shiftKey,
          alt: y.altKey,
          meta: y.metaKey,
          originalEvent: y,
          preventDefault: R.preventDefault || R.defaultPrevented,
          userData: w.userData
        }, w.keyDownHandler(_)), (_ && _.preventDefault || R.preventDefault && !R.defaultPrevented) && a.cancelEvent(y), R.stopPropagation && a.stopEvent(y);
      }
      function me(w, y) {
        var _ = null, R = {
          originalEvent: y,
          eventType: "keyup",
          pointerType: "",
          isEmulated: !1
        };
        x(w, R), w.keyUpHandler && !R.preventGesture && !R.defaultPrevented && (_ = {
          eventSource: w,
          keyCode: y.keyCode ? y.keyCode : y.charCode,
          ctrl: y.ctrlKey,
          shift: y.shiftKey,
          alt: y.altKey,
          meta: y.metaKey,
          originalEvent: y,
          preventDefault: R.preventDefault || R.defaultPrevented,
          userData: w.userData
        }, w.keyUpHandler(_)), (_ && _.preventDefault || R.preventDefault && !R.defaultPrevented) && a.cancelEvent(y), R.stopPropagation && a.stopEvent(y);
      }
      function ie(w, y) {
        var _ = null, R = {
          originalEvent: y,
          eventType: "keypress",
          pointerType: "",
          isEmulated: !1
        };
        x(w, R), w.keyHandler && !R.preventGesture && !R.defaultPrevented && (_ = {
          eventSource: w,
          keyCode: y.keyCode ? y.keyCode : y.charCode,
          ctrl: y.ctrlKey,
          shift: y.shiftKey,
          alt: y.altKey,
          meta: y.metaKey,
          originalEvent: y,
          preventDefault: R.preventDefault || R.defaultPrevented,
          userData: w.userData
        }, w.keyHandler(_)), (_ && _.preventDefault || R.preventDefault && !R.defaultPrevented) && a.cancelEvent(y), R.stopPropagation && a.stopEvent(y);
      }
      function Te(w, y) {
        var _ = {
          originalEvent: y,
          eventType: "focus",
          pointerType: "",
          isEmulated: !1
        };
        x(w, _), w.focusHandler && !_.preventGesture && w.focusHandler(
          {
            eventSource: w,
            originalEvent: y,
            userData: w.userData
          }
        );
      }
      function be(w, y) {
        var _ = {
          originalEvent: y,
          eventType: "blur",
          pointerType: "",
          isEmulated: !1
        };
        x(w, _), w.blurHandler && !_.preventGesture && w.blurHandler(
          {
            eventSource: w,
            originalEvent: y,
            userData: w.userData
          }
        );
      }
      function qe(w, y) {
        var _ = null, R = {
          originalEvent: y,
          eventType: "contextmenu",
          pointerType: "mouse",
          isEmulated: !1
        };
        x(w, R), w.contextMenuHandler && !R.preventGesture && !R.defaultPrevented && (_ = {
          eventSource: w,
          position: z(b(y), w.element),
          originalEvent: R.originalEvent,
          preventDefault: R.preventDefault || R.defaultPrevented,
          userData: w.userData
        }, w.contextMenuHandler(_)), (_ && _.preventDefault || R.preventDefault && !R.defaultPrevented) && a.cancelEvent(y), R.stopPropagation && a.stopEvent(y);
      }
      function Oe(w, y) {
        Ne(w, y, y);
      }
      function ge(w, y) {
        var _ = {
          target: y.target || y.srcElement,
          type: "wheel",
          shiftKey: y.shiftKey || !1,
          clientX: y.clientX,
          clientY: y.clientY,
          pageX: y.pageX ? y.pageX : y.clientX,
          pageY: y.pageY ? y.pageY : y.clientY,
          deltaMode: y.type === "MozMousePixelScroll" ? 0 : 1,
          // 0=pixel, 1=line, 2=page
          deltaX: 0,
          deltaZ: 0
        };
        a.MouseTracker.wheelEventName === "mousewheel" ? _.deltaY = -y.wheelDelta / a.DEFAULT_SETTINGS.pixelsPerWheelLine : _.deltaY = y.detail, Ne(w, _, y);
      }
      function Ne(w, y, _) {
        var R = 0, U, k = null;
        R = y.deltaY ? y.deltaY < 0 ? 1 : -1 : 0, U = {
          originalEvent: y,
          eventType: "wheel",
          pointerType: "mouse",
          isEmulated: y !== _
        }, x(w, U), w.scrollHandler && !U.preventGesture && !U.defaultPrevented && (k = {
          eventSource: w,
          pointerType: "mouse",
          position: D(y, w.element),
          scroll: R,
          shift: y.shiftKey,
          isTouchEvent: !1,
          originalEvent: _,
          preventDefault: U.preventDefault || U.defaultPrevented,
          userData: w.userData
        }, w.scrollHandler(k)), U.stopPropagation && a.stopEvent(_), (k && k.preventDefault || U.preventDefault && !U.defaultPrevented) && a.cancelEvent(_);
      }
      function Ze(w, y) {
        var _ = {
          id: a.MouseTracker.mousePointerId,
          type: "mouse"
        }, R = {
          originalEvent: y,
          eventType: "lostpointercapture",
          pointerType: "mouse",
          isEmulated: !1
        };
        x(w, R), y.target === w.element && B(w, _, !1), R.stopPropagation && a.stopEvent(y);
      }
      function Xe(w, y) {
        var _, R, U = y.changedTouches.length, k, re = w.getActivePointersListByType("touch");
        _ = a.now(), re.getLength() > y.touches.length - U && a.console.warn("Tracked touch contact count doesn't match event.touches.length");
        var Se = {
          originalEvent: y,
          eventType: "pointerdown",
          pointerType: "touch",
          isEmulated: !1
        };
        for (x(w, Se), R = 0; R < U; R++)
          k = {
            id: y.changedTouches[R].identifier,
            type: "touch",
            // Simulate isPrimary
            isPrimary: re.getLength() === 0,
            currentPos: b(y.changedTouches[R]),
            currentTime: _
          }, W(w, Se, k), fe(w, Se, k, 0), B(w, k, !0);
        Se.preventDefault && !Se.defaultPrevented && a.cancelEvent(y), Se.stopPropagation && a.stopEvent(y);
      }
      function F(w, y) {
        var _, R, U = y.changedTouches.length, k;
        _ = a.now();
        var re = {
          originalEvent: y,
          eventType: "pointerup",
          pointerType: "touch",
          isEmulated: !1
        };
        for (x(w, re), R = 0; R < U; R++)
          k = {
            id: y.changedTouches[R].identifier,
            type: "touch",
            currentPos: b(y.changedTouches[R]),
            currentTime: _
          }, Le(w, re, k, 0), B(w, k, !1), J(w, re, k);
        re.preventDefault && !re.defaultPrevented && a.cancelEvent(y), re.stopPropagation && a.stopEvent(y);
      }
      function ee(w, y) {
        var _, R, U = y.changedTouches.length, k;
        _ = a.now();
        var re = {
          originalEvent: y,
          eventType: "pointermove",
          pointerType: "touch",
          isEmulated: !1
        };
        for (x(w, re), R = 0; R < U; R++)
          k = {
            id: y.changedTouches[R].identifier,
            type: "touch",
            currentPos: b(y.changedTouches[R]),
            currentTime: _
          }, we(w, re, k);
        re.preventDefault && !re.defaultPrevented && a.cancelEvent(y), re.stopPropagation && a.stopEvent(y);
      }
      function se(w, y) {
        var _ = y.changedTouches.length, R, U, k = {
          originalEvent: y,
          eventType: "pointercancel",
          pointerType: "touch",
          isEmulated: !1
        };
        for (x(w, k), R = 0; R < _; R++)
          U = {
            id: y.changedTouches[R].identifier,
            type: "touch"
          }, oe(w, k, U);
        k.stopPropagation && a.stopEvent(y);
      }
      function De(w, y) {
        return a.eventIsCanceled(y) || y.preventDefault(), !1;
      }
      function Be(w, y) {
        return a.eventIsCanceled(y) || y.preventDefault(), !1;
      }
      function O(w, y) {
        var _ = {
          originalEvent: y,
          eventType: "gotpointercapture",
          pointerType: E(y),
          isEmulated: !1
        };
        x(w, _), y.target === w.element && B(w, {
          id: y.pointerId,
          type: E(y)
        }, !0), _.stopPropagation && a.stopEvent(y);
      }
      function Z(w, y) {
        var _ = {
          originalEvent: y,
          eventType: "lostpointercapture",
          pointerType: E(y),
          isEmulated: !1
        };
        x(w, _), y.target === w.element && B(w, {
          id: y.pointerId,
          type: E(y)
        }, !1), _.stopPropagation && a.stopEvent(y);
      }
      function Y(w, y) {
        var _ = {
          id: T(y),
          type: E(y),
          isPrimary: C(y),
          currentPos: b(y),
          currentTime: a.now()
        }, R = {
          originalEvent: y,
          eventType: "pointerenter",
          pointerType: _.type,
          isEmulated: !1
        };
        x(w, R), W(w, R, _);
      }
      function ae(w, y) {
        var _ = {
          id: T(y),
          type: E(y),
          isPrimary: C(y),
          currentPos: b(y),
          currentTime: a.now()
        }, R = {
          originalEvent: y,
          eventType: "pointerleave",
          pointerType: _.type,
          isEmulated: !1
        };
        x(w, R), J(w, R, _);
      }
      function _e(w, y) {
        var _ = {
          id: T(y),
          type: E(y),
          isPrimary: C(y),
          currentPos: b(y),
          currentTime: a.now()
        }, R = {
          originalEvent: y,
          eventType: "pointerover",
          pointerType: _.type,
          isEmulated: !1
        };
        x(w, R), le(w, R, _), R.preventDefault && !R.defaultPrevented && a.cancelEvent(y), R.stopPropagation && a.stopEvent(y);
      }
      function Re(w, y) {
        var _ = {
          id: T(y),
          type: E(y),
          isPrimary: C(y),
          currentPos: b(y),
          currentTime: a.now()
        }, R = {
          originalEvent: y,
          eventType: "pointerout",
          pointerType: _.type,
          isEmulated: !1
        };
        x(w, R), Q(w, R, _), R.preventDefault && !R.defaultPrevented && a.cancelEvent(y), R.stopPropagation && a.stopEvent(y);
      }
      function Ce(w, y) {
        var _ = {
          id: T(y),
          type: E(y),
          isPrimary: C(y),
          currentPos: b(y),
          currentTime: a.now()
        }, R = a.MouseTracker.havePointerEvents && _.type === "touch", U = {
          originalEvent: y,
          eventType: "pointerdown",
          pointerType: _.type,
          isEmulated: !1
        };
        x(w, U), fe(w, U, _, y.button), U.preventDefault && !U.defaultPrevented && a.cancelEvent(y), U.stopPropagation && a.stopEvent(y), U.shouldCapture && (R ? B(w, _, !0) : g(w, _));
      }
      function $e(w, y) {
        bt(w, y);
      }
      function Qe(w, y) {
        var _ = w.getActivePointersListByType(E(y));
        _.getById(y.pointerId) && bt(w, y), a.stopEvent(y);
      }
      function bt(w, y) {
        var _;
        _ = {
          id: T(y),
          type: E(y),
          isPrimary: C(y),
          currentPos: b(y),
          currentTime: a.now()
        };
        var R = {
          originalEvent: y,
          eventType: "pointerup",
          pointerType: _.type,
          isEmulated: !1
        };
        x(w, R), Le(w, R, _, y.button), R.preventDefault && !R.defaultPrevented && a.cancelEvent(y), R.stopPropagation && a.stopEvent(y), R.shouldReleaseCapture && (y.target === w.element ? p(w, _) : B(w, _, !1));
      }
      function qt(w, y) {
        xe(w, y);
      }
      function te(w, y) {
        var _ = w.getActivePointersListByType(E(y));
        _.getById(y.pointerId) && xe(w, y), a.stopEvent(y);
      }
      function xe(w, y) {
        var _ = {
          id: T(y),
          type: E(y),
          isPrimary: C(y),
          currentPos: b(y),
          currentTime: a.now()
        }, R = {
          originalEvent: y,
          eventType: "pointermove",
          pointerType: _.type,
          isEmulated: !1
        };
        x(w, R), we(w, R, _), R.preventDefault && !R.defaultPrevented && a.cancelEvent(y), R.stopPropagation && a.stopEvent(y);
      }
      function he(w, y) {
        var _ = {
          id: y.pointerId,
          type: E(y)
        }, R = {
          originalEvent: y,
          eventType: "pointercancel",
          pointerType: _.type,
          isEmulated: !1
        };
        x(w, R), oe(w, R, _), R.stopPropagation && a.stopEvent(y);
      }
      function Ae(w, y) {
        return y.speed = 0, y.direction = 0, y.contactPos = y.currentPos, y.contactTime = y.currentTime, y.lastPos = y.currentPos, y.lastTime = y.currentTime, w.add(y);
      }
      function We(w, y, _) {
        var R, U = y.getById(_.id);
        return U ? (U.captured && (a.console.warn("stopTrackingPointer() called on captured pointer"), p(w, U)), y.removeContact(), R = y.removeById(_.id)) : R = y.getLength(), R;
      }
      function m(w, y) {
        switch (y.eventType) {
          case "pointermove":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !1, y.preventGesture = !w.hasGestureHandlers, y.stopPropagation = !1;
            break;
          case "pointerover":
          case "pointerout":
          case "contextmenu":
          case "keydown":
          case "keyup":
          case "keypress":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !1, y.preventGesture = !1, y.stopPropagation = !1;
            break;
          case "pointerdown":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !1, y.preventGesture = !w.hasGestureHandlers, y.stopPropagation = !1;
            break;
          case "pointerup":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !1, y.preventGesture = !w.hasGestureHandlers, y.stopPropagation = !1;
            break;
          case "wheel":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !1, y.preventGesture = !w.hasScrollHandler, y.stopPropagation = !1;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
            y.isStoppable = !0, y.isCancelable = !1, y.preventDefault = !1, y.preventGesture = !1, y.stopPropagation = !1;
            break;
          case "click":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !!w.clickHandler, y.preventGesture = !1, y.stopPropagation = !1;
            break;
          case "dblclick":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !!w.dblClickHandler, y.preventGesture = !1, y.stopPropagation = !1;
            break;
          default:
            y.isStoppable = !1, y.isCancelable = !1, y.preventDefault = !1, y.preventGesture = !1, y.stopPropagation = !1;
            break;
        }
      }
      function x(w, y) {
        y.eventSource = w, y.eventPhase = y.originalEvent && typeof y.originalEvent.eventPhase < "u" ? y.originalEvent.eventPhase : 0, y.defaultPrevented = a.eventIsCanceled(y.originalEvent), y.shouldCapture = !1, y.shouldReleaseCapture = !1, y.userData = w.userData, m(w, y), w.preProcessEventHandler && w.preProcessEventHandler(y);
      }
      function B(w, y, _) {
        var R = w.getActivePointersListByType(y.type), U = R.getById(y.id);
        U ? _ && !U.captured ? (U.captured = !0, R.captureCount++) : !_ && U.captured && (U.captured = !1, R.captureCount--, R.captureCount < 0 && (R.captureCount = 0, a.console.warn("updatePointerCaptured() - pointsList.captureCount went negative"))) : a.console.warn("updatePointerCaptured() called on untracked pointer");
      }
      function W(w, y, _) {
        var R = w.getActivePointersListByType(_.type), U;
        U = R.getById(_.id), U ? (U.insideElement = !0, U.lastPos = U.currentPos, U.lastTime = U.currentTime, U.currentPos = _.currentPos, U.currentTime = _.currentTime, _ = U) : (_.captured = !1, _.insideElementPressed = !1, _.insideElement = !0, Ae(R, _)), w.enterHandler && w.enterHandler(
          {
            eventSource: w,
            pointerType: _.type,
            position: z(_.currentPos, w.element),
            buttons: R.buttons,
            pointers: w.getActivePointerCount(),
            insideElementPressed: _.insideElementPressed,
            buttonDownAny: R.buttons !== 0,
            isTouchEvent: _.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        );
      }
      function J(w, y, _) {
        var R = w.getActivePointersListByType(_.type), U, k;
        U = R.getById(_.id), U ? (U.captured ? (U.insideElement = !1, U.lastPos = U.currentPos, U.lastTime = U.currentTime, U.currentPos = _.currentPos, U.currentTime = _.currentTime) : We(w, R, U), _ = U) : (_.captured = !1, _.insideElementPressed = !1), (w.leaveHandler || w.exitHandler) && (k = {
          eventSource: w,
          pointerType: _.type,
          // GitHub PR: https://github.com/openseadragon/openseadragon/pull/1754 (gPoint.currentPos && )
          position: _.currentPos && z(_.currentPos, w.element),
          buttons: R.buttons,
          pointers: w.getActivePointerCount(),
          insideElementPressed: _.insideElementPressed,
          buttonDownAny: R.buttons !== 0,
          isTouchEvent: _.type === "touch",
          originalEvent: y.originalEvent,
          userData: w.userData
        }, w.leaveHandler && w.leaveHandler(k), w.exitHandler && w.exitHandler(k));
      }
      function le(w, y, _) {
        var R, U;
        R = w.getActivePointersListByType(_.type), U = R.getById(_.id), U ? _ = U : (_.captured = !1, _.insideElementPressed = !1), w.overHandler && w.overHandler(
          {
            eventSource: w,
            pointerType: _.type,
            position: z(_.currentPos, w.element),
            buttons: R.buttons,
            pointers: w.getActivePointerCount(),
            insideElementPressed: _.insideElementPressed,
            buttonDownAny: R.buttons !== 0,
            isTouchEvent: _.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        );
      }
      function Q(w, y, _) {
        var R, U;
        R = w.getActivePointersListByType(_.type), U = R.getById(_.id), U ? _ = U : (_.captured = !1, _.insideElementPressed = !1), w.outHandler && w.outHandler({
          eventSource: w,
          pointerType: _.type,
          position: _.currentPos && z(_.currentPos, w.element),
          buttons: R.buttons,
          pointers: w.getActivePointerCount(),
          insideElementPressed: _.insideElementPressed,
          buttonDownAny: R.buttons !== 0,
          isTouchEvent: _.type === "touch",
          originalEvent: y.originalEvent,
          userData: w.userData
        });
      }
      function fe(w, y, _, R) {
        var U = l[w.hash], k = w.getActivePointersListByType(_.type), re;
        if (typeof y.originalEvent.buttons < "u" ? k.buttons = y.originalEvent.buttons : R === 0 ? k.buttons |= 1 : R === 1 ? k.buttons |= 4 : R === 2 ? k.buttons |= 2 : R === 3 ? k.buttons |= 8 : R === 4 ? k.buttons |= 16 : R === 5 && (k.buttons |= 32), R !== 0) {
          y.shouldCapture = !1, y.shouldReleaseCapture = !1, w.nonPrimaryPressHandler && !y.preventGesture && !y.defaultPrevented && (y.preventDefault = !0, w.nonPrimaryPressHandler(
            {
              eventSource: w,
              pointerType: _.type,
              position: z(_.currentPos, w.element),
              button: R,
              buttons: k.buttons,
              isTouchEvent: _.type === "touch",
              originalEvent: y.originalEvent,
              userData: w.userData
            }
          ));
          return;
        }
        re = k.getById(_.id), re ? (re.insideElementPressed = !0, re.insideElement = !0, re.originalTarget = y.originalEvent.target, re.contactPos = _.currentPos, re.contactTime = _.currentTime, re.lastPos = re.currentPos, re.lastTime = re.currentTime, re.currentPos = _.currentPos, re.currentTime = _.currentTime, _ = re) : (_.captured = !1, _.insideElementPressed = !0, _.insideElement = !0, _.originalTarget = y.originalEvent.target, Ae(k, _)), k.addContact(), !y.preventGesture && !y.defaultPrevented ? (y.shouldCapture = !0, y.shouldReleaseCapture = !1, y.preventDefault = !0, (w.dragHandler || w.dragEndHandler || w.pinchHandler) && a.MouseTracker.gesturePointVelocityTracker.addPoint(w, _), k.contacts === 1 ? w.pressHandler && !y.preventGesture && w.pressHandler(
          {
            eventSource: w,
            pointerType: _.type,
            position: z(_.contactPos, w.element),
            buttons: k.buttons,
            isTouchEvent: _.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        ) : k.contacts === 2 && w.pinchHandler && _.type === "touch" && (U.pinchGPoints = k.asArray(), U.lastPinchDist = U.currentPinchDist = U.pinchGPoints[0].currentPos.distanceTo(U.pinchGPoints[1].currentPos), U.lastPinchCenter = U.currentPinchCenter = G(U.pinchGPoints[0].currentPos, U.pinchGPoints[1].currentPos))) : (y.shouldCapture = !1, y.shouldReleaseCapture = !1);
      }
      function Le(w, y, _, R) {
        var U = l[w.hash], k = w.getActivePointersListByType(_.type), re, Se, ve, Rt = !1, ht;
        if (typeof y.originalEvent.buttons < "u" ? k.buttons = y.originalEvent.buttons : R === 0 ? k.buttons ^= -2 : R === 1 ? k.buttons ^= -5 : R === 2 ? k.buttons ^= -3 : R === 3 ? k.buttons ^= -9 : R === 4 ? k.buttons ^= -17 : R === 5 && (k.buttons ^= -33), y.shouldCapture = !1, R !== 0) {
          y.shouldReleaseCapture = !1, w.nonPrimaryReleaseHandler && !y.preventGesture && !y.defaultPrevented && (y.preventDefault = !0, w.nonPrimaryReleaseHandler(
            {
              eventSource: w,
              pointerType: _.type,
              position: z(_.currentPos, w.element),
              button: R,
              buttons: k.buttons,
              isTouchEvent: _.type === "touch",
              originalEvent: y.originalEvent,
              userData: w.userData
            }
          ));
          return;
        }
        ve = k.getById(_.id), ve ? (k.removeContact(), ve.captured && (Rt = !0), ve.lastPos = ve.currentPos, ve.lastTime = ve.currentTime, ve.currentPos = _.currentPos, ve.currentTime = _.currentTime, ve.insideElement || We(w, k, ve), re = ve.currentPos, Se = ve.currentTime) : (_.captured = !1, _.insideElementPressed = !1, _.insideElement = !0, Ae(k, _), ve = _), !y.preventGesture && !y.defaultPrevented && (Rt ? (y.shouldReleaseCapture = !0, y.preventDefault = !0, (w.dragHandler || w.dragEndHandler || w.pinchHandler) && a.MouseTracker.gesturePointVelocityTracker.removePoint(w, ve), k.contacts === 0 ? (w.releaseHandler && re && w.releaseHandler(
          {
            eventSource: w,
            pointerType: ve.type,
            position: z(re, w.element),
            buttons: k.buttons,
            insideElementPressed: ve.insideElementPressed,
            insideElementReleased: ve.insideElement,
            isTouchEvent: ve.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        ), w.dragEndHandler && U.sentDragEvent && w.dragEndHandler(
          {
            eventSource: w,
            pointerType: ve.type,
            position: z(ve.currentPos, w.element),
            speed: ve.speed,
            direction: ve.direction,
            shift: y.originalEvent.shiftKey,
            isTouchEvent: ve.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        ), U.sentDragEvent = !1, (w.clickHandler || w.dblClickHandler) && ve.insideElement && (ht = Se - ve.contactTime <= w.clickTimeThreshold && ve.contactPos.distanceTo(re) <= w.clickDistThreshold, w.clickHandler && w.clickHandler(
          {
            eventSource: w,
            pointerType: ve.type,
            position: z(ve.currentPos, w.element),
            quick: ht,
            shift: y.originalEvent.shiftKey,
            isTouchEvent: ve.type === "touch",
            originalEvent: y.originalEvent,
            originalTarget: ve.originalTarget,
            userData: w.userData
          }
        ), w.dblClickHandler && ht && (k.clicks++, k.clicks === 1 ? (U.lastClickPos = re, U.dblClickTimeOut = setTimeout(function() {
          k.clicks = 0;
        }, w.dblClickTimeThreshold)) : k.clicks === 2 && (clearTimeout(U.dblClickTimeOut), k.clicks = 0, U.lastClickPos.distanceTo(re) <= w.dblClickDistThreshold && w.dblClickHandler(
          {
            eventSource: w,
            pointerType: ve.type,
            position: z(ve.currentPos, w.element),
            shift: y.originalEvent.shiftKey,
            isTouchEvent: ve.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        ), U.lastClickPos = null)))) : k.contacts === 2 && w.pinchHandler && ve.type === "touch" && (U.pinchGPoints = k.asArray(), U.lastPinchDist = U.currentPinchDist = U.pinchGPoints[0].currentPos.distanceTo(U.pinchGPoints[1].currentPos), U.lastPinchCenter = U.currentPinchCenter = G(U.pinchGPoints[0].currentPos, U.pinchGPoints[1].currentPos))) : (y.shouldReleaseCapture = !1, w.releaseHandler && re && (w.releaseHandler(
          {
            eventSource: w,
            pointerType: ve.type,
            position: z(re, w.element),
            buttons: k.buttons,
            insideElementPressed: ve.insideElementPressed,
            insideElementReleased: ve.insideElement,
            isTouchEvent: ve.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        ), y.preventDefault = !0)));
      }
      function we(w, y, _) {
        var R = l[w.hash], U = w.getActivePointersListByType(_.type), k, re, Se;
        if (typeof y.originalEvent.buttons < "u" && (U.buttons = y.originalEvent.buttons), k = U.getById(_.id), k)
          k.lastPos = k.currentPos, k.lastTime = k.currentTime, k.currentPos = _.currentPos, k.currentTime = _.currentTime;
        else
          return;
        y.shouldCapture = !1, y.shouldReleaseCapture = !1, w.stopHandler && _.type === "mouse" && (clearTimeout(w.stopTimeOut), w.stopTimeOut = setTimeout(function() {
          ue(w, y.originalEvent, _.type);
        }, w.stopDelay)), U.contacts === 0 ? w.moveHandler && w.moveHandler(
          {
            eventSource: w,
            pointerType: _.type,
            position: z(_.currentPos, w.element),
            buttons: U.buttons,
            isTouchEvent: _.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        ) : U.contacts === 1 ? (w.moveHandler && (k = U.asArray()[0], w.moveHandler(
          {
            eventSource: w,
            pointerType: k.type,
            position: z(k.currentPos, w.element),
            buttons: U.buttons,
            isTouchEvent: k.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        )), w.dragHandler && !y.preventGesture && !y.defaultPrevented && (k = U.asArray()[0], Se = k.currentPos.minus(k.lastPos), w.dragHandler(
          {
            eventSource: w,
            pointerType: k.type,
            position: z(k.currentPos, w.element),
            buttons: U.buttons,
            delta: Se,
            speed: k.speed,
            direction: k.direction,
            shift: y.originalEvent.shiftKey,
            isTouchEvent: k.type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        ), y.preventDefault = !0, R.sentDragEvent = !0)) : U.contacts === 2 && (w.moveHandler && (re = U.asArray(), w.moveHandler(
          {
            eventSource: w,
            pointerType: re[0].type,
            position: z(G(re[0].currentPos, re[1].currentPos), w.element),
            buttons: U.buttons,
            isTouchEvent: re[0].type === "touch",
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        )), w.pinchHandler && _.type === "touch" && !y.preventGesture && !y.defaultPrevented && (Se = R.pinchGPoints[0].currentPos.distanceTo(R.pinchGPoints[1].currentPos), Se !== R.currentPinchDist && (R.lastPinchDist = R.currentPinchDist, R.currentPinchDist = Se, R.lastPinchCenter = R.currentPinchCenter, R.currentPinchCenter = G(R.pinchGPoints[0].currentPos, R.pinchGPoints[1].currentPos), w.pinchHandler(
          {
            eventSource: w,
            pointerType: "touch",
            gesturePoints: R.pinchGPoints,
            lastCenter: z(R.lastPinchCenter, w.element),
            center: z(R.currentPinchCenter, w.element),
            lastDistance: R.lastPinchDist,
            distance: R.currentPinchDist,
            shift: y.originalEvent.shiftKey,
            originalEvent: y.originalEvent,
            userData: w.userData
          }
        ), y.preventDefault = !0)));
      }
      function oe(w, y, _) {
        var R = w.getActivePointersListByType(_.type), U;
        U = R.getById(_.id), U && We(w, R, U);
      }
      function ue(w, y, _) {
        w.stopHandler && w.stopHandler({
          eventSource: w,
          pointerType: _,
          position: D(y, w.element),
          buttons: w.getActivePointersListByType(_).buttons,
          isTouchEvent: _ === "touch",
          originalEvent: y,
          userData: w.userData
        });
      }
    })(K), (function(a) {
      a.ControlAnchor = {
        NONE: 0,
        TOP_LEFT: 1,
        TOP_RIGHT: 2,
        BOTTOM_RIGHT: 3,
        BOTTOM_LEFT: 4,
        ABSOLUTE: 5
      }, a.Control = function(l, o, r) {
        var f = l.parentNode;
        typeof o == "number" && (a.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; please use an options object instead.  Support for this deprecated variant is scheduled for removal in December 2013"), o = { anchor: o }), o.attachToViewer = typeof o.attachToViewer > "u" ? !0 : o.attachToViewer, this.autoFade = typeof o.autoFade > "u" ? !0 : o.autoFade, this.element = l, this.anchor = o.anchor, this.container = r, this.anchor === a.ControlAnchor.ABSOLUTE ? (this.wrapper = a.makeNeutralElement("div"), this.wrapper.style.position = "absolute", this.wrapper.style.top = typeof o.top == "number" ? o.top + "px" : o.top, this.wrapper.style.left = typeof o.left == "number" ? o.left + "px" : o.left, this.wrapper.style.height = typeof o.height == "number" ? o.height + "px" : o.height, this.wrapper.style.width = typeof o.width == "number" ? o.width + "px" : o.width, this.wrapper.style.margin = "0px", this.wrapper.style.padding = "0px", this.element.style.position = "relative", this.element.style.top = "0px", this.element.style.left = "0px", this.element.style.height = "100%", this.element.style.width = "100%") : (this.wrapper = a.makeNeutralElement("div"), this.wrapper.style.display = "inline-block", this.anchor === a.ControlAnchor.NONE && (this.wrapper.style.width = this.wrapper.style.height = "100%")), this.wrapper.appendChild(this.element), o.attachToViewer ? this.anchor === a.ControlAnchor.TOP_RIGHT || this.anchor === a.ControlAnchor.BOTTOM_RIGHT ? this.container.insertBefore(
          this.wrapper,
          this.container.firstChild
        ) : this.container.appendChild(this.wrapper) : f.appendChild(this.wrapper);
      }, a.Control.prototype = {
        /**
         * Removes the control from the container.
         * @function
         */
        destroy: function() {
          this.wrapper.removeChild(this.element), this.anchor !== a.ControlAnchor.NONE && this.container.removeChild(this.wrapper);
        },
        /**
         * Determines if the control is currently visible.
         * @function
         * @returns {Boolean} true if currently visible, false otherwise.
         */
        isVisible: function() {
          return this.wrapper.style.display !== "none";
        },
        /**
         * Toggles the visibility of the control.
         * @function
         * @param {Boolean} visible - true to make visible, false to hide.
         */
        setVisible: function(l) {
          this.wrapper.style.display = l ? this.anchor === a.ControlAnchor.ABSOLUTE ? "block" : "inline-block" : "none";
        },
        /**
         * Sets the opacity level for the control.
         * @function
         * @param {Number} opactiy - a value between 1 and 0 inclusively.
         */
        setOpacity: function(l) {
          a.setElementOpacity(this.wrapper, l, !0);
        }
      };
    })(K), (function(a) {
      a.ControlDock = function(o) {
        var r = ["topleft", "topright", "bottomright", "bottomleft"], f, d;
        for (a.extend(!0, this, {
          id: "controldock-" + a.now() + "-" + Math.floor(Math.random() * 1e6),
          container: a.makeNeutralElement("div"),
          controls: []
        }, o), this.container.onsubmit = function() {
          return !1;
        }, this.element && (this.element = a.getElement(this.element), this.element.appendChild(this.container), a.getElementStyle(this.element).position === "static" && (this.element.style.position = "relative"), this.container.style.width = "100%", this.container.style.height = "100%"), d = 0; d < r.length; d++)
          f = r[d], this.controls[f] = a.makeNeutralElement("div"), this.controls[f].style.position = "absolute", f.match("left") && (this.controls[f].style.left = "0px"), f.match("right") && (this.controls[f].style.right = "0px"), f.match("top") && (this.controls[f].style.top = "0px"), f.match("bottom") && (this.controls[f].style.bottom = "0px");
        this.container.appendChild(this.controls.topleft), this.container.appendChild(this.controls.topright), this.container.appendChild(this.controls.bottomright), this.container.appendChild(this.controls.bottomleft);
      }, a.ControlDock.prototype = {
        /**
         * @function
         */
        addControl: function(o, r) {
          o = a.getElement(o);
          var f = null;
          if (!(l(this, o) >= 0)) {
            switch (r.anchor) {
              case a.ControlAnchor.TOP_RIGHT:
                f = this.controls.topright, o.style.position = "relative", o.style.paddingRight = "0px", o.style.paddingTop = "0px";
                break;
              case a.ControlAnchor.BOTTOM_RIGHT:
                f = this.controls.bottomright, o.style.position = "relative", o.style.paddingRight = "0px", o.style.paddingBottom = "0px";
                break;
              case a.ControlAnchor.BOTTOM_LEFT:
                f = this.controls.bottomleft, o.style.position = "relative", o.style.paddingLeft = "0px", o.style.paddingBottom = "0px";
                break;
              case a.ControlAnchor.TOP_LEFT:
                f = this.controls.topleft, o.style.position = "relative", o.style.paddingLeft = "0px", o.style.paddingTop = "0px";
                break;
              case a.ControlAnchor.ABSOLUTE:
                f = this.container, o.style.margin = "0px", o.style.padding = "0px";
                break;
              default:
              case a.ControlAnchor.NONE:
                f = this.container, o.style.margin = "0px", o.style.padding = "0px";
                break;
            }
            this.controls.push(
              new a.Control(o, r, f)
            ), o.style.display = "inline-block";
          }
        },
        /**
         * @function
         * @returns {OpenSeadragon.ControlDock} Chainable.
         */
        removeControl: function(o) {
          o = a.getElement(o);
          var r = l(this, o);
          return r >= 0 && (this.controls[r].destroy(), this.controls.splice(r, 1)), this;
        },
        /**
         * @function
         * @returns {OpenSeadragon.ControlDock} Chainable.
         */
        clearControls: function() {
          for (; this.controls.length > 0; )
            this.controls.pop().destroy();
          return this;
        },
        /**
         * @function
         * @returns {Boolean}
         */
        areControlsEnabled: function() {
          var o;
          for (o = this.controls.length - 1; o >= 0; o--)
            if (this.controls[o].isVisible())
              return !0;
          return !1;
        },
        /**
         * @function
         * @returns {OpenSeadragon.ControlDock} Chainable.
         */
        setControlsEnabled: function(o) {
          var r;
          for (r = this.controls.length - 1; r >= 0; r--)
            this.controls[r].setVisible(o);
          return this;
        }
      };
      function l(o, r) {
        var f = o.controls, d;
        for (d = f.length - 1; d >= 0; d--)
          if (f[d].element === r)
            return d;
        return -1;
      }
    })(K), (function(a) {
      a.Placement = a.freezeObject({
        CENTER: 0,
        TOP_LEFT: 1,
        TOP: 2,
        TOP_RIGHT: 3,
        RIGHT: 4,
        BOTTOM_RIGHT: 5,
        BOTTOM: 6,
        BOTTOM_LEFT: 7,
        LEFT: 8,
        properties: {
          0: {
            isLeft: !1,
            isHorizontallyCentered: !0,
            isRight: !1,
            isTop: !1,
            isVerticallyCentered: !0,
            isBottom: !1
          },
          1: {
            isLeft: !0,
            isHorizontallyCentered: !1,
            isRight: !1,
            isTop: !0,
            isVerticallyCentered: !1,
            isBottom: !1
          },
          2: {
            isLeft: !1,
            isHorizontallyCentered: !0,
            isRight: !1,
            isTop: !0,
            isVerticallyCentered: !1,
            isBottom: !1
          },
          3: {
            isLeft: !1,
            isHorizontallyCentered: !1,
            isRight: !0,
            isTop: !0,
            isVerticallyCentered: !1,
            isBottom: !1
          },
          4: {
            isLeft: !1,
            isHorizontallyCentered: !1,
            isRight: !0,
            isTop: !1,
            isVerticallyCentered: !0,
            isBottom: !1
          },
          5: {
            isLeft: !1,
            isHorizontallyCentered: !1,
            isRight: !0,
            isTop: !1,
            isVerticallyCentered: !1,
            isBottom: !0
          },
          6: {
            isLeft: !1,
            isHorizontallyCentered: !0,
            isRight: !1,
            isTop: !1,
            isVerticallyCentered: !1,
            isBottom: !0
          },
          7: {
            isLeft: !0,
            isHorizontallyCentered: !1,
            isRight: !1,
            isTop: !1,
            isVerticallyCentered: !1,
            isBottom: !0
          },
          8: {
            isLeft: !0,
            isHorizontallyCentered: !1,
            isRight: !1,
            isTop: !1,
            isVerticallyCentered: !0,
            isBottom: !1
          }
        }
      });
    })(K), (function(a) {
      var l = {}, o = 1;
      a.Viewer = function(m) {
        var x = arguments, B = this, W;
        a.isPlainObject(m) || (m = {
          id: x[0],
          xmlPath: x.length > 1 ? x[1] : void 0,
          prefixUrl: x.length > 2 ? x[2] : void 0,
          controls: x.length > 3 ? x[3] : void 0,
          overlays: x.length > 4 ? x[4] : void 0
        }), m.config && (a.extend(!0, m, m.config), delete m.config);
        let J = [
          "useCanvas"
          // deprecated
        ];
        if (m.drawerOptions = Object.assign(
          {},
          J.reduce((Q, fe) => (Q[fe] = m[fe], delete m[fe], Q), {}),
          m.drawerOptions
        ), a.extend(!0, this, {
          //internal state and dom identifiers
          id: m.id,
          hash: m.hash || o++,
          /**
           * Index for page to be shown first next time open() is called (only used in sequenceMode).
           * @member {Number} initialPage
           * @memberof OpenSeadragon.Viewer#
           */
          initialPage: 0,
          //dom nodes
          /**
           * The parent element of this Viewer instance, passed in when the Viewer was created.
           * @member {Element} element
           * @memberof OpenSeadragon.Viewer#
           */
          element: null,
          /**
           * A &lt;div&gt; element (provided by {@link OpenSeadragon.ControlDock}), the base element of this Viewer instance.<br><br>
           * Child element of {@link OpenSeadragon.Viewer#element}.
           * @member {Element} container
           * @memberof OpenSeadragon.Viewer#
           */
          container: null,
          /**
           * A &lt;div&gt; element, the element where user-input events are handled for panning and zooming.<br><br>
           * Child element of {@link OpenSeadragon.Viewer#container},
           * positioned on top of {@link OpenSeadragon.Viewer#keyboardCommandArea}.<br><br>
           * The parent of {@link OpenSeadragon.Drawer#canvas} instances.
           * @member {Element} canvas
           * @memberof OpenSeadragon.Viewer#
           */
          canvas: null,
          // Overlays list. An overlay allows to add html on top of the viewer.
          overlays: [],
          // Container inside the canvas where overlays are drawn.
          overlaysContainer: null,
          //private state properties
          previousBody: [],
          //This was originally initialized in the constructor and so could never
          //have anything in it.  now it can because we allow it to be specified
          //in the options and is only empty by default if not specified. Also
          //this array was returned from get_controls which I find confusing
          //since this object has a controls property which is treated in other
          //functions like clearControls.  I'm removing the accessors.
          customControls: [],
          //These are originally not part options but declared as members
          //in initialize.  It's still considered idiomatic to put them here
          //source is here for backwards compatibility. It is not an official
          //part of the API and should not be relied upon.
          source: null,
          /**
           * Handles rendering of tiles in the viewer. Created for each TileSource opened.
           * @member {OpenSeadragon.Drawer} drawer
           * @memberof OpenSeadragon.Viewer#
           */
          drawer: null,
          /**
           * Keeps track of all of the tiled images in the scene.
           * @member {OpenSeadragon.World} world
           * @memberof OpenSeadragon.Viewer#
           */
          world: null,
          /**
           * Handles coordinate-related functionality - zoom, pan, rotation, etc. Created for each TileSource opened.
           * @member {OpenSeadragon.Viewport} viewport
           * @memberof OpenSeadragon.Viewer#
           */
          viewport: null,
          /**
           * @member {OpenSeadragon.Navigator} navigator
           * @memberof OpenSeadragon.Viewer#
           */
          navigator: null,
          //A collection viewport is a separate viewport used to provide
          //simultaneous rendering of sets of tiles
          collectionViewport: null,
          collectionDrawer: null,
          //UI image resources
          //TODO: rename navImages to uiImages
          navImages: null,
          //interface button controls
          buttonGroup: null,
          //TODO: this is defunct so safely remove it
          profiler: null
        }, a.DEFAULT_SETTINGS, m), typeof this.hash > "u")
          throw new Error("A hash must be defined, either by specifying options.id or options.hash.");
        typeof l[this.hash] < "u" && a.console.warn("Hash " + this.hash + " has already been used."), l[this.hash] = {
          fsBoundsDelta: new a.Point(1, 1),
          prevContainerSize: null,
          animating: !1,
          forceRedraw: !1,
          needsResize: !1,
          forceResize: !1,
          mouseInside: !1,
          group: null,
          // whether we should be continuously zooming
          zooming: !1,
          // how much we should be continuously zooming by
          zoomFactor: null,
          lastZoomTime: null,
          fullPage: !1,
          onfullscreenchange: null,
          lastClickTime: null,
          draggingToZoom: !1
        }, this._sequenceIndex = 0, this._firstOpen = !0, this._updateRequestId = null, this._loadQueue = [], this.currentOverlays = [], this._updatePixelDensityRatioBind = null, this._lastScrollTime = a.now(), a.EventSource.call(this), this.addHandler("open-failed", function(Q) {
          var fe = a.getString("Errors.OpenFailed", Q.eventSource, Q.message);
          B._showMessage(fe);
        }), a.ControlDock.call(this, m), this.xmlPath && (this.tileSources = [this.xmlPath]), this.element = this.element || document.getElementById(this.id), this.canvas = a.makeNeutralElement("div"), this.canvas.className = "openseadragon-canvas", (function(Q) {
          Q.width = "100%", Q.height = "100%", Q.overflow = "hidden", Q.position = "absolute", Q.top = "0px", Q.left = "0px";
        })(this.canvas.style), a.setElementTouchActionNone(this.canvas), m.tabIndex !== "" && (this.canvas.tabIndex = m.tabIndex === void 0 ? 0 : m.tabIndex), this.container.className = "openseadragon-container", (function(Q) {
          Q.width = "100%", Q.height = "100%", Q.position = "relative", Q.overflow = "hidden", Q.left = "0px", Q.top = "0px", Q.textAlign = "left";
        })(this.container.style), a.setElementTouchActionNone(this.container), this.container.insertBefore(this.canvas, this.container.firstChild), this.element.appendChild(this.container), this.bodyWidth = document.body.style.width, this.bodyHeight = document.body.style.height, this.bodyOverflow = document.body.style.overflow, this.docOverflow = document.documentElement.style.overflow, this.innerTracker = new a.MouseTracker({
          userData: "Viewer.innerTracker",
          element: this.canvas,
          startDisabled: !this.mouseNavEnabled,
          clickTimeThreshold: this.clickTimeThreshold,
          clickDistThreshold: this.clickDistThreshold,
          dblClickTimeThreshold: this.dblClickTimeThreshold,
          dblClickDistThreshold: this.dblClickDistThreshold,
          contextMenuHandler: a.delegate(this, D),
          keyDownHandler: a.delegate(this, z),
          keyHandler: a.delegate(this, G),
          clickHandler: a.delegate(this, V),
          dblClickHandler: a.delegate(this, de),
          dragHandler: a.delegate(this, ne),
          dragEndHandler: a.delegate(this, me),
          enterHandler: a.delegate(this, ie),
          leaveHandler: a.delegate(this, Te),
          pressHandler: a.delegate(this, be),
          releaseHandler: a.delegate(this, qe),
          nonPrimaryPressHandler: a.delegate(this, Oe),
          nonPrimaryReleaseHandler: a.delegate(this, ge),
          scrollHandler: a.delegate(this, F),
          pinchHandler: a.delegate(this, Ne),
          focusHandler: a.delegate(this, Ze),
          blurHandler: a.delegate(this, Xe)
        }), this.outerTracker = new a.MouseTracker({
          userData: "Viewer.outerTracker",
          element: this.container,
          startDisabled: !this.mouseNavEnabled,
          clickTimeThreshold: this.clickTimeThreshold,
          clickDistThreshold: this.clickDistThreshold,
          dblClickTimeThreshold: this.dblClickTimeThreshold,
          dblClickDistThreshold: this.dblClickDistThreshold,
          enterHandler: a.delegate(this, ee),
          leaveHandler: a.delegate(this, se)
        }), this.toolbar && (this.toolbar = new a.ControlDock({ element: this.toolbar })), this.bindStandardControls(), l[this.hash].prevContainerSize = r(this.container), window.ResizeObserver ? (this._autoResizePolling = !1, this._resizeObserver = new ResizeObserver(function() {
          l[B.hash].needsResize = !0;
        }), this._resizeObserver.observe(this.container, {})) : this._autoResizePolling = !0, this.world = new a.World({
          viewer: this
        }), this.world.addHandler("add-item", function(Q) {
          B.source = B.world.getItemAt(0).source, l[B.hash].forceRedraw = !0, B._updateRequestId || (B._updateRequestId = c(B, De));
        }), this.world.addHandler("remove-item", function(Q) {
          B.world.getItemCount() ? B.source = B.world.getItemAt(0).source : B.source = null, l[B.hash].forceRedraw = !0;
        }), this.world.addHandler("metrics-change", function(Q) {
          B.viewport && B.viewport._setContentBounds(B.world.getHomeBounds(), B.world.getContentFactor());
        }), this.world.addHandler("item-index-change", function(Q) {
          B.source = B.world.getItemAt(0).source;
        }), this.viewport = new a.Viewport({
          containerSize: l[this.hash].prevContainerSize,
          springStiffness: this.springStiffness,
          animationTime: this.animationTime,
          minZoomImageRatio: this.minZoomImageRatio,
          maxZoomPixelRatio: this.maxZoomPixelRatio,
          visibilityRatio: this.visibilityRatio,
          wrapHorizontal: this.wrapHorizontal,
          wrapVertical: this.wrapVertical,
          defaultZoomLevel: this.defaultZoomLevel,
          minZoomLevel: this.minZoomLevel,
          maxZoomLevel: this.maxZoomLevel,
          viewer: this,
          degrees: this.degrees,
          flipped: this.flipped,
          overlayPreserveContentDirection: this.overlayPreserveContentDirection,
          navigatorRotate: this.navigatorRotate,
          homeFillsViewer: this.homeFillsViewer,
          margins: this.viewportMargins,
          silenceMultiImageWarnings: this.silenceMultiImageWarnings
        }), this.viewport._setContentBounds(this.world.getHomeBounds(), this.world.getContentFactor()), this.imageLoader = new a.ImageLoader({
          jobLimit: this.imageLoaderLimit,
          timeout: m.timeout,
          tileRetryMax: this.tileRetryMax,
          tileRetryDelay: this.tileRetryDelay
        }), this.tileCache = new a.TileCache({
          maxImageCacheCount: this.maxImageCacheCount
        }), Object.prototype.hasOwnProperty.call(this.drawerOptions, "useCanvas") && (a.console.error('useCanvas is deprecated, use the "drawer" option to indicate preferred drawer(s)'), this.drawerOptions.useCanvas || (this.drawer = a.HTMLDrawer), delete this.drawerOptions.useCanvas);
        let le = Array.isArray(this.drawer) ? this.drawer : [this.drawer];
        le.length === 0 && (le = [a.DEFAULT_SETTINGS.drawer].flat(), a.console.warn("No valid drawers were selected. Using the default value.")), this.drawer = null;
        for (const Q of le)
          if (this.requestDrawer(Q, { mainDrawer: !0, redrawImmediately: !1 }))
            break;
        if (!this.drawer)
          throw a.console.error("No drawer could be created!"), "Error with creating the selected drawer(s)";
        for (this.drawer.setImageSmoothingEnabled(this.imageSmoothingEnabled), this.overlaysContainer = a.makeNeutralElement("div"), this.canvas.appendChild(this.overlaysContainer), this.drawer.canRotate() || (this.rotateLeft && (W = this.buttonGroup.buttons.indexOf(this.rotateLeft), this.buttonGroup.buttons.splice(W, 1), this.buttonGroup.element.removeChild(this.rotateLeft.element)), this.rotateRight && (W = this.buttonGroup.buttons.indexOf(this.rotateRight), this.buttonGroup.buttons.splice(W, 1), this.buttonGroup.element.removeChild(this.rotateRight.element))), this._addUpdatePixelDensityRatioEvent(), this.showNavigator && (this.navigator = new a.Navigator({
          element: this.navigatorElement,
          id: this.navigatorId,
          position: this.navigatorPosition,
          sizeRatio: this.navigatorSizeRatio,
          maintainSizeRatio: this.navigatorMaintainSizeRatio,
          top: this.navigatorTop,
          left: this.navigatorLeft,
          width: this.navigatorWidth,
          height: this.navigatorHeight,
          autoResize: this.navigatorAutoResize,
          autoFade: this.navigatorAutoFade,
          prefixUrl: this.prefixUrl,
          viewer: this,
          navigatorRotate: this.navigatorRotate,
          background: this.navigatorBackground,
          opacity: this.navigatorOpacity,
          borderColor: this.navigatorBorderColor,
          displayRegionColor: this.navigatorDisplayRegionColor,
          crossOriginPolicy: this.crossOriginPolicy,
          animationTime: this.animationTime,
          drawer: this.drawer.getType(),
          loadTilesWithAjax: this.loadTilesWithAjax,
          ajaxHeaders: this.ajaxHeaders,
          ajaxWithCredentials: this.ajaxWithCredentials
        })), this.sequenceMode && this.bindSequenceControls(), this.tileSources && this.open(this.tileSources), W = 0; W < this.customControls.length; W++)
          this.addControl(
            this.customControls[W].id,
            { anchor: this.customControls[W].anchor }
          );
        a.requestAnimationFrame(function() {
          p(B);
        }), a._viewers.set(this.element, this);
      }, a.extend(
        a.Viewer.prototype,
        a.EventSource.prototype,
        a.ControlDock.prototype,
        /** @lends OpenSeadragon.Viewer.prototype */
        {
          /**
           * @function
           * @returns {Boolean}
           */
          isOpen: function() {
            return !!this.world.getItemCount();
          },
          // deprecated
          openDzi: function(m) {
            return a.console.error("[Viewer.openDzi] this function is deprecated; use Viewer.open() instead."), this.open(m);
          },
          // deprecated
          openTileSource: function(m) {
            return a.console.error("[Viewer.openTileSource] this function is deprecated; use Viewer.open() instead."), this.open(m);
          },
          //deprecated
          get buttons() {
            return a.console.warn("Viewer.buttons is deprecated; Please use Viewer.buttonGroup"), this.buttonGroup;
          },
          /**
           * Open tiled images into the viewer, closing any others.
           * To get the TiledImage instance created by open, add an event listener for
           * {@link OpenSeadragon.Viewer.html#.event:open}, which when fired can be used to get access
           * to the instance, i.e., viewer.world.getItemAt(0).
           * @function
           * @param {Array|String|Object|Function} tileSources - This can be a TiledImage
           * specifier, a TileSource specifier, or an array of either. A TiledImage specifier
           * is the same as the options parameter for {@link OpenSeadragon.Viewer#addTiledImage},
           * except for the index property; images are added in sequence.
           * A TileSource specifier is anything you could pass as the tileSource property
           * of the options parameter for {@link OpenSeadragon.Viewer#addTiledImage}.
           * @param {Number} initialPage - If sequenceMode is true, display this page initially
           * for the given tileSources. If specified, will overwrite the Viewer's existing initialPage property.
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:open
           * @fires OpenSeadragon.Viewer.event:open-failed
           */
          open: function(m, x) {
            var B = this;
            if (this.close(), !m)
              return this;
            if (this.sequenceMode && a.isArray(m))
              return this.referenceStrip && (this.referenceStrip.destroy(), this.referenceStrip = null), typeof x < "u" && !isNaN(x) && (this.initialPage = x), this.tileSources = m, this._sequenceIndex = Math.max(0, Math.min(this.tileSources.length - 1, this.initialPage)), this.tileSources.length && (this.open(this.tileSources[this._sequenceIndex]), this.showReferenceStrip && this.addReferenceStrip()), this._updateSequenceButtons(this._sequenceIndex), this;
            if (a.isArray(m) || (m = [m]), !m.length)
              return this;
            this._opening = !0;
            for (var W = m.length, J = 0, le = 0, Q, fe = function() {
              if (J + le === W)
                if (J) {
                  (B._firstOpen || !B.preserveViewport) && (B.viewport.goHome(!0), B.viewport.update()), B._firstOpen = !1;
                  var oe = m[0];
                  if (oe.tileSource && (oe = oe.tileSource), B.overlays && !B.preserveOverlays)
                    for (var ue = 0; ue < B.overlays.length; ue++)
                      B.currentOverlays[ue] = d(B, B.overlays[ue]);
                  B._drawOverlays(), B._opening = !1, B.raiseEvent("open", { source: oe });
                } else
                  B._opening = !1, B.raiseEvent("open-failed", Q);
            }, Le = function(oe) {
              (!a.isPlainObject(oe) || !oe.tileSource) && (oe = {
                tileSource: oe
              }), oe.index !== void 0 && (a.console.error("[Viewer.open] setting indexes here is not supported; use addTiledImage instead"), delete oe.index), oe.collectionImmediately === void 0 && (oe.collectionImmediately = !0);
              var ue = oe.success;
              oe.success = function(y) {
                if (J++, oe.tileSource.overlays)
                  for (var _ = 0; _ < oe.tileSource.overlays.length; _++)
                    B.addOverlay(oe.tileSource.overlays[_]);
                ue && ue(y), fe();
              };
              var w = oe.error;
              oe.error = function(y) {
                le++, Q || (Q = y), w && w(y), fe();
              }, B.addTiledImage(oe);
            }, we = 0; we < m.length; we++)
              Le(m[we]);
            return this;
          },
          /**
           * @function
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:close
           */
          close: function() {
            return l[this.hash] ? (this._opening = !1, this.navigator && this.navigator.close(), this.preserveOverlays || (this.clearOverlays(), this.overlaysContainer.innerHTML = ""), l[this.hash].animating = !1, this.world.removeAll(), this.imageLoader.clear(), this.raiseEvent("close"), this) : this;
          },
          /**
           * Function to destroy the viewer and clean up everything created by OpenSeadragon.
           *
           * Example:
           * var viewer = OpenSeadragon({
           *   [...]
           * });
           *
           * //when you are done with the viewer:
           * viewer.destroy();
           * viewer = null; //important
           *
           * @function
           * @fires OpenSeadragon.Viewer.event:before-destroy
           * @fires OpenSeadragon.Viewer.event:destroy
           */
          destroy: function() {
            if (l[this.hash]) {
              if (this.raiseEvent("before-destroy"), this._removeUpdatePixelDensityRatioEvent(), this.close(), this.clearOverlays(), this.overlaysContainer.innerHTML = "", this._resizeObserver && this._resizeObserver.disconnect(), this.referenceStrip && (this.referenceStrip.destroy(), this.referenceStrip = null), this._updateRequestId !== null && (a.cancelAnimationFrame(this._updateRequestId), this._updateRequestId = null), this.drawer && this.drawer.destroy(), this.navigator && (this.navigator.destroy(), l[this.navigator.hash] = null, delete l[this.navigator.hash], this.navigator = null), this.buttonGroup)
                this.buttonGroup.destroy();
              else if (this.customButtons)
                for (; this.customButtons.length; )
                  this.customButtons.pop().destroy();
              if (this.paging && this.paging.destroy(), this.element)
                for (; this.element.firstChild; )
                  this.element.removeChild(this.element.firstChild);
              this.container.onsubmit = null, this.clearControls(), this.innerTracker && this.innerTracker.destroy(), this.outerTracker && this.outerTracker.destroy(), l[this.hash] = null, delete l[this.hash], this.canvas = null, this.container = null, a._viewers.delete(this.element), this.element = null, this.raiseEvent("destroy"), this.removeAllHandlers();
            }
          },
          /**
           * Request a drawer for this viewer, as a supported string or drawer constructor.
           * @param {String | OpenSeadragon.DrawerBase} drawerCandidate The type of drawer to try to construct.
           * @param { Object } options
           * @param { Boolean } [options.mainDrawer] Whether to use this as the viewer's main drawer. Default = true.
           * @param { Boolean } [options.redrawImmediately] Whether to immediately draw a new frame. Only used if options.mainDrawer = true. Default = true.
           * @param { Object } [options.drawerOptions] Options for this drawer. Defaults to viewer.drawerOptions.
           * for this viewer type. See {@link OpenSeadragon.Options}.
           * @returns {Object | Boolean} The drawer that was created, or false if the requested drawer is not supported
           */
          requestDrawer(m, x) {
            const B = {
              mainDrawer: !0,
              redrawImmediately: !0,
              drawerOptions: null
            };
            x = a.extend(!0, B, x);
            const W = x.mainDrawer, J = x.redrawImmediately, le = x.drawerOptions, Q = this.drawer;
            let fe = null;
            if (m && m.prototype instanceof a.DrawerBase ? (fe = m, m = "custom") : typeof m == "string" && (fe = a.determineDrawer(m)), fe || a.console.warn("Unsupported drawer! Drawer must be an existing string type, or a class that extends OpenSeadragon.DrawerBase."), fe && fe.isSupported()) {
              Q && W && Q.destroy();
              const Le = new fe({
                viewer: this,
                viewport: this.viewport,
                element: this.canvas,
                debugGridColor: this.debugGridColor,
                options: le || this.drawerOptions[m]
              });
              return W && (this.drawer = Le, J && this.forceRedraw()), Le;
            }
            return !1;
          },
          /**
           * @function
           * @returns {Boolean}
           */
          isMouseNavEnabled: function() {
            return this.innerTracker.isTracking();
          },
          /**
           * @function
           * @param {Boolean} enabled - true to enable, false to disable
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:mouse-enabled
           */
          setMouseNavEnabled: function(m) {
            return this.innerTracker.setTracking(m), this.outerTracker.setTracking(m), this.raiseEvent("mouse-enabled", { enabled: m }), this;
          },
          /**
           * @function
           * @returns {Boolean}
           */
          areControlsEnabled: function() {
            var m = this.controls.length, x;
            for (x = 0; x < this.controls.length; x++)
              m = m && this.controls[x].isVisible();
            return m;
          },
          /**
           * Shows or hides the controls (e.g. the default navigation buttons).
           *
           * @function
           * @param {Boolean} true to show, false to hide.
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:controls-enabled
           */
          setControlsEnabled: function(m) {
            return m ? E(this) : p(this), this.raiseEvent("controls-enabled", { enabled: m }), this;
          },
          /**
           * Turns debugging mode on or off for this viewer.
           *
           * @function
           * @param {Boolean} debugMode true to turn debug on, false to turn debug off.
           */
          setDebugMode: function(m) {
            for (var x = 0; x < this.world.getItemCount(); x++)
              this.world.getItemAt(x).debugMode = m;
            this.debugMode = m, this.forceRedraw();
          },
          /**
           * Update headers to include when making AJAX requests.
           *
           * Unless `propagate` is set to false (which is likely only useful in rare circumstances),
           * the updated headers are propagated to all tiled images, each of which will subsequently
           * propagate the changed headers to all their tiles.
           * If applicable, the headers of the viewer's navigator and reference strip will also be updated.
           *
           * Note that the rules for merging headers still apply, i.e. headers returned by
           * {@link OpenSeadragon.TileSource#getTileAjaxHeaders} take precedence over
           * `TiledImage.ajaxHeaders`, which take precedence over the headers here in the viewer.
           *
           * @function
           * @param {Object} ajaxHeaders Updated AJAX headers.
           * @param {Boolean} [propagate=true] Whether to propagate updated headers to tiled images, etc.
           */
          setAjaxHeaders: function(m, x) {
            if (m === null && (m = {}), !a.isPlainObject(m)) {
              console.error("[Viewer.setAjaxHeaders] Ignoring invalid headers, must be a plain object");
              return;
            }
            if (x === void 0 && (x = !0), this.ajaxHeaders = m, x) {
              for (var B = 0; B < this.world.getItemCount(); B++)
                this.world.getItemAt(B)._updateAjaxHeaders(!0);
              if (this.navigator && this.navigator.setAjaxHeaders(this.ajaxHeaders, !0), this.referenceStrip && this.referenceStrip.miniViewers)
                for (var W in this.referenceStrip.miniViewers)
                  this.referenceStrip.miniViewers[W].setAjaxHeaders(this.ajaxHeaders, !0);
            }
          },
          /**
           * Adds the given button to this viewer.
           *
           * @function
           * @param {OpenSeadragon.Button} button
           */
          addButton: function(m) {
            this.buttonGroup.addButton(m);
          },
          /**
           * @function
           * @returns {Boolean}
           */
          isFullPage: function() {
            return l[this.hash] && l[this.hash].fullPage;
          },
          /**
           * Toggle full page mode.
           * @function
           * @param {Boolean} fullPage
           *      If true, enter full page mode.  If false, exit full page mode.
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:pre-full-page
           * @fires OpenSeadragon.Viewer.event:full-page
           */
          setFullPage: function(m) {
            var x = document.body, B = x.style, W = document.documentElement.style, J = this, le, Q;
            if (m === this.isFullPage())
              return this;
            var fe = {
              fullPage: m,
              preventDefaultAction: !1
            };
            if (this.raiseEvent("pre-full-page", fe), fe.preventDefaultAction)
              return this;
            if (m && this.element) {
              for (this.elementSize = a.getElementSize(this.element), this.pageScroll = a.getPageScroll(), this.elementMargin = this.element.style.margin, this.element.style.margin = "0", this.elementPadding = this.element.style.padding, this.element.style.padding = "0", this.bodyMargin = B.margin, this.docMargin = W.margin, B.margin = "0", W.margin = "0", this.bodyPadding = B.padding, this.docPadding = W.padding, B.padding = "0", W.padding = "0", this.bodyWidth = B.width, this.docWidth = W.width, B.width = "100%", W.width = "100%", this.bodyHeight = B.height, this.docHeight = W.height, B.height = "100%", W.height = "100%", this.bodyDisplay = B.display, B.display = "block", this.previousBody = [], l[this.hash].prevElementParent = this.element.parentNode, l[this.hash].prevNextSibling = this.element.nextSibling, l[this.hash].prevElementWidth = this.element.style.width, l[this.hash].prevElementHeight = this.element.style.height, le = x.childNodes.length, Q = 0; Q < le; Q++)
                this.previousBody.push(x.childNodes[0]), x.removeChild(x.childNodes[0]);
              this.toolbar && this.toolbar.element && (this.toolbar.parentNode = this.toolbar.element.parentNode, this.toolbar.nextSibling = this.toolbar.element.nextSibling, x.appendChild(this.toolbar.element), a.addClass(this.toolbar.element, "fullpage")), a.addClass(this.element, "fullpage"), x.appendChild(this.element), this.element.style.height = "100vh", this.element.style.width = "100vw", this.toolbar && this.toolbar.element && (this.element.style.height = a.getElementSize(this.element).y - a.getElementSize(this.toolbar.element).y + "px"), l[this.hash].fullPage = !0, a.delegate(this, ee)({});
            } else {
              for (this.element.style.margin = this.elementMargin, this.element.style.padding = this.elementPadding, B.margin = this.bodyMargin, W.margin = this.docMargin, B.padding = this.bodyPadding, W.padding = this.docPadding, B.width = this.bodyWidth, W.width = this.docWidth, B.height = this.bodyHeight, W.height = this.docHeight, B.display = this.bodyDisplay, x.removeChild(this.element), le = this.previousBody.length, Q = 0; Q < le; Q++)
                x.appendChild(this.previousBody.shift());
              a.removeClass(this.element, "fullpage"), l[this.hash].prevElementParent.insertBefore(
                this.element,
                l[this.hash].prevNextSibling
              ), this.toolbar && this.toolbar.element && (x.removeChild(this.toolbar.element), a.removeClass(this.toolbar.element, "fullpage"), this.toolbar.parentNode.insertBefore(
                this.toolbar.element,
                this.toolbar.nextSibling
              ), delete this.toolbar.parentNode, delete this.toolbar.nextSibling), this.element.style.width = l[this.hash].prevElementWidth, this.element.style.height = l[this.hash].prevElementHeight;
              var Le = 0, we = function() {
                a.setPageScroll(J.pageScroll);
                var oe = a.getPageScroll();
                Le++, Le < 10 && (oe.x !== J.pageScroll.x || oe.y !== J.pageScroll.y) && a.requestAnimationFrame(we);
              };
              a.requestAnimationFrame(we), l[this.hash].fullPage = !1, a.delegate(this, se)({});
            }
            return this.navigator && this.viewport && this.navigator.update(this.viewport), this.raiseEvent("full-page", { fullPage: m }), this;
          },
          /**
           * Toggle full screen mode if supported. Toggle full page mode otherwise.
           * @function
           * @param {Boolean} fullScreen
           *      If true, enter full screen mode.  If false, exit full screen mode.
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:pre-full-screen
           * @fires OpenSeadragon.Viewer.event:full-screen
           */
          setFullScreen: function(m) {
            var x = this;
            if (!a.supportsFullScreen)
              return this.setFullPage(m);
            if (a.isFullScreen() === m)
              return this;
            var B = {
              fullScreen: m,
              preventDefaultAction: !1
            };
            if (this.raiseEvent("pre-full-screen", B), B.preventDefaultAction)
              return this;
            if (m) {
              if (this.setFullPage(!0), !this.isFullPage())
                return this;
              this.fullPageStyleWidth = this.element.style.width, this.fullPageStyleHeight = this.element.style.height, this.element.style.width = "100%", this.element.style.height = "100%";
              var W = function() {
                var J = a.isFullScreen();
                J || (a.removeEvent(document, a.fullScreenEventName, W), a.removeEvent(document, a.fullScreenErrorEventName, W), x.setFullPage(!1), x.isFullPage() && (x.element.style.width = x.fullPageStyleWidth, x.element.style.height = x.fullPageStyleHeight)), x.navigator && x.viewport && setTimeout(function() {
                  x.navigator.update(x.viewport);
                }), x.raiseEvent("full-screen", { fullScreen: J });
              };
              a.addEvent(document, a.fullScreenEventName, W), a.addEvent(document, a.fullScreenErrorEventName, W), a.requestFullScreen(document.body);
            } else
              a.exitFullScreen();
            return this;
          },
          /**
           * @function
           * @returns {Boolean}
           */
          isVisible: function() {
            return this.container.style.visibility !== "hidden";
          },
          //
          /**
           * @function
           * @returns {Boolean} returns true if the viewer is in fullscreen
           */
          isFullScreen: function() {
            return a.isFullScreen() && this.isFullPage();
          },
          /**
           * @function
           * @param {Boolean} visible
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:visible
           */
          setVisible: function(m) {
            return this.container.style.visibility = m ? "" : "hidden", this.raiseEvent("visible", { visible: m }), this;
          },
          /**
           * Add a tiled image to the viewer.
           * options.tileSource can be anything that {@link OpenSeadragon.Viewer#open}
           *  supports except arrays of images.
           * Note that you can specify options.width or options.height, but not both.
           * The other dimension will be calculated according to the item's aspect ratio.
           * If collectionMode is on (see {@link OpenSeadragon.Options}), the new image is
           * automatically arranged with the others.
           * @function
           * @param {Object} options
           * @param {String|Object|Function} options.tileSource - The TileSource specifier.
           * A String implies a url used to determine the tileSource implementation
           *      based on the file extension of url. JSONP is implied by *.js,
           *      otherwise the url is retrieved as text and the resulting text is
           *      introspected to determine if its json, xml, or text and parsed.
           * An Object implies an inline configuration which has a single
           *      property sufficient for being able to determine tileSource
           *      implementation. If the object has a property which is a function
           *      named 'getTileUrl', it is treated as a custom TileSource.
           * @param {Number} [options.index] The index of the item. Added on top of
           * all other items if not specified.
           * @param {Boolean} [options.replace=false] If true, the item at options.index will be
           * removed and the new item is added in its place. options.tileSource will be
           * interpreted and fetched if necessary before the old item is removed to avoid leaving
           * a gap in the world.
           * @param {Number} [options.x=0] The X position for the image in viewport coordinates.
           * @param {Number} [options.y=0] The Y position for the image in viewport coordinates.
           * @param {Number} [options.width=1] The width for the image in viewport coordinates.
           * @param {Number} [options.height] The height for the image in viewport coordinates.
           * @param {OpenSeadragon.Rect} [options.fitBounds] The bounds in viewport coordinates
           * to fit the image into. If specified, x, y, width and height get ignored.
           * @param {OpenSeadragon.Placement} [options.fitBoundsPlacement=OpenSeadragon.Placement.CENTER]
           * How to anchor the image in the bounds if options.fitBounds is set.
           * @param {OpenSeadragon.Rect} [options.clip] - An area, in image pixels, to clip to
           * (portions of the image outside of this area will not be visible). Only works on
           * browsers that support the HTML5 canvas.
           * @param {Number} [options.opacity=1] Proportional opacity of the tiled images (1=opaque, 0=hidden)
           * @param {Boolean} [options.preload=false]  Default switch for loading hidden images (true loads, false blocks)
           * @param {Number} [options.degrees=0] Initial rotation of the tiled image around
           * its top left corner in degrees.
           * @param {Boolean} [options.flipped=false] Whether to horizontally flip the image.
           * @param {String} [options.compositeOperation] How the image is composited onto other images.
           * @param {String} [options.crossOriginPolicy] The crossOriginPolicy for this specific image,
           * overriding viewer.crossOriginPolicy.
           * @param {Boolean} [options.ajaxWithCredentials] Whether to set withCredentials on tile AJAX
           * @param {Boolean} [options.loadTilesWithAjax]
           *      Whether to load tile data using AJAX requests.
           *      Defaults to the setting in {@link OpenSeadragon.Options}.
           * @param {Object} [options.ajaxHeaders]
           *      A set of headers to include when making tile AJAX requests.
           *      Note that these headers will be merged over any headers specified in {@link OpenSeadragon.Options}.
           *      Specifying a falsy value for a header will clear its existing value set at the Viewer level (if any).
           * @param {Function} [options.success] A function that gets called when the image is
           * successfully added. It's passed the event object which contains a single property:
           * "item", which is the resulting instance of TiledImage.
           * @param {Function} [options.error] A function that gets called if the image is
           * unable to be added. It's passed the error event object, which contains "message"
           * and "source" properties.
           * @param {Boolean} [options.collectionImmediately=false] If collectionMode is on,
           * specifies whether to snap to the new arrangement immediately or to animate to it.
           * @param {String|CanvasGradient|CanvasPattern|Function} [options.placeholderFillStyle] - See {@link OpenSeadragon.Options}.
           * @fires OpenSeadragon.World.event:add-item
           * @fires OpenSeadragon.Viewer.event:add-item-failed
           */
          addTiledImage: function(m) {
            a.console.assert(m, "[Viewer.addTiledImage] options is required"), a.console.assert(m.tileSource, "[Viewer.addTiledImage] options.tileSource is required"), a.console.assert(
              !m.replace || m.index > -1 && m.index < this.world.getItemCount(),
              "[Viewer.addTiledImage] if options.replace is used, options.index must be a valid index in Viewer.world"
            );
            var x = this;
            m.replace && (m.replaceItem = x.world.getItemAt(m.index)), this._hideMessage(), m.placeholderFillStyle === void 0 && (m.placeholderFillStyle = this.placeholderFillStyle), m.opacity === void 0 && (m.opacity = this.opacity), m.preload === void 0 && (m.preload = this.preload), m.compositeOperation === void 0 && (m.compositeOperation = this.compositeOperation), m.crossOriginPolicy === void 0 && (m.crossOriginPolicy = m.tileSource.crossOriginPolicy !== void 0 ? m.tileSource.crossOriginPolicy : this.crossOriginPolicy), m.ajaxWithCredentials === void 0 && (m.ajaxWithCredentials = this.ajaxWithCredentials), m.loadTilesWithAjax === void 0 && (m.loadTilesWithAjax = this.loadTilesWithAjax), a.isPlainObject(m.ajaxHeaders) || (m.ajaxHeaders = {});
            var B = {
              options: m
            };
            function W(Q) {
              for (var fe = 0; fe < x._loadQueue.length; fe++)
                if (x._loadQueue[fe] === B) {
                  x._loadQueue.splice(fe, 1);
                  break;
                }
              x._loadQueue.length === 0 && J(B), x.raiseEvent("add-item-failed", Q), m.error && m.error(Q);
            }
            function J(Q) {
              x.collectionMode && (x.world.arrange({
                immediately: Q.options.collectionImmediately,
                rows: x.collectionRows,
                columns: x.collectionColumns,
                layout: x.collectionLayout,
                tileSize: x.collectionTileSize,
                tileMargin: x.collectionTileMargin
              }), x.world.setAutoRefigureSizes(!0));
            }
            if (a.isArray(m.tileSource)) {
              setTimeout(function() {
                W({
                  message: "[Viewer.addTiledImage] Sequences can not be added; add them one at a time instead.",
                  source: m.tileSource,
                  options: m
                });
              });
              return;
            }
            this._loadQueue.push(B);
            function le() {
              for (var Q, fe, Le; x._loadQueue.length && (Q = x._loadQueue[0], !!Q.tileSource); ) {
                if (x._loadQueue.splice(0, 1), Q.options.replace) {
                  var we = x.world.getIndexOfItem(Q.options.replaceItem);
                  we !== -1 && (Q.options.index = we), x.world.removeItem(Q.options.replaceItem);
                }
                fe = new a.TiledImage({
                  viewer: x,
                  source: Q.tileSource,
                  viewport: x.viewport,
                  drawer: x.drawer,
                  tileCache: x.tileCache,
                  imageLoader: x.imageLoader,
                  x: Q.options.x,
                  y: Q.options.y,
                  width: Q.options.width,
                  height: Q.options.height,
                  fitBounds: Q.options.fitBounds,
                  fitBoundsPlacement: Q.options.fitBoundsPlacement,
                  clip: Q.options.clip,
                  placeholderFillStyle: Q.options.placeholderFillStyle,
                  opacity: Q.options.opacity,
                  preload: Q.options.preload,
                  degrees: Q.options.degrees,
                  flipped: Q.options.flipped,
                  compositeOperation: Q.options.compositeOperation,
                  springStiffness: x.springStiffness,
                  animationTime: x.animationTime,
                  minZoomImageRatio: x.minZoomImageRatio,
                  wrapHorizontal: x.wrapHorizontal,
                  wrapVertical: x.wrapVertical,
                  maxTilesPerFrame: x.maxTilesPerFrame,
                  immediateRender: x.immediateRender,
                  blendTime: x.blendTime,
                  alwaysBlend: x.alwaysBlend,
                  minPixelRatio: x.minPixelRatio,
                  smoothTileEdgesMinZoom: x.smoothTileEdgesMinZoom,
                  iOSDevice: x.iOSDevice,
                  crossOriginPolicy: Q.options.crossOriginPolicy,
                  ajaxWithCredentials: Q.options.ajaxWithCredentials,
                  loadTilesWithAjax: Q.options.loadTilesWithAjax,
                  ajaxHeaders: Q.options.ajaxHeaders,
                  debugMode: x.debugMode,
                  subPixelRoundingForTransparency: x.subPixelRoundingForTransparency
                }), x.collectionMode && x.world.setAutoRefigureSizes(!1), x.navigator && (Le = a.extend({}, Q.options, {
                  replace: !1,
                  // navigator already removed the layer, nothing to replace
                  originalTiledImage: fe,
                  tileSource: Q.tileSource
                }), x.navigator.addTiledImage(Le)), x.world.addItem(fe, {
                  index: Q.options.index
                }), x._loadQueue.length === 0 && J(Q), x.world.getItemCount() === 1 && !x.preserveViewport && x.viewport.goHome(!0), Q.options.success && Q.options.success({
                  item: fe
                });
              }
            }
            f(this, m.tileSource, m, function(Q) {
              B.tileSource = Q, le();
            }, function(Q) {
              Q.options = m, W(Q), le();
            });
          },
          /**
           * Add a simple image to the viewer.
           * The options are the same as the ones in {@link OpenSeadragon.Viewer#addTiledImage}
           * except for options.tileSource which is replaced by options.url.
           * @function
           * @param {Object} options - See {@link OpenSeadragon.Viewer#addTiledImage}
           * for all the options
           * @param {String} options.url - The URL of the image to add.
           * @fires OpenSeadragon.World.event:add-item
           * @fires OpenSeadragon.Viewer.event:add-item-failed
           */
          addSimpleImage: function(m) {
            a.console.assert(m, "[Viewer.addSimpleImage] options is required"), a.console.assert(m.url, "[Viewer.addSimpleImage] options.url is required");
            var x = a.extend({}, m, {
              tileSource: {
                type: "image",
                url: m.url
              }
            });
            delete x.url, this.addTiledImage(x);
          },
          // deprecated
          addLayer: function(m) {
            var x = this;
            a.console.error("[Viewer.addLayer] this function is deprecated; use Viewer.addTiledImage() instead.");
            var B = a.extend({}, m, {
              success: function(W) {
                x.raiseEvent("add-layer", {
                  options: m,
                  drawer: W.item
                });
              },
              error: function(W) {
                x.raiseEvent("add-layer-failed", W);
              }
            });
            return this.addTiledImage(B), this;
          },
          // deprecated
          getLayerAtLevel: function(m) {
            return a.console.error("[Viewer.getLayerAtLevel] this function is deprecated; use World.getItemAt() instead."), this.world.getItemAt(m);
          },
          // deprecated
          getLevelOfLayer: function(m) {
            return a.console.error("[Viewer.getLevelOfLayer] this function is deprecated; use World.getIndexOfItem() instead."), this.world.getIndexOfItem(m);
          },
          // deprecated
          getLayersCount: function() {
            return a.console.error("[Viewer.getLayersCount] this function is deprecated; use World.getItemCount() instead."), this.world.getItemCount();
          },
          // deprecated
          setLayerLevel: function(m, x) {
            return a.console.error("[Viewer.setLayerLevel] this function is deprecated; use World.setItemIndex() instead."), this.world.setItemIndex(m, x);
          },
          // deprecated
          removeLayer: function(m) {
            return a.console.error("[Viewer.removeLayer] this function is deprecated; use World.removeItem() instead."), this.world.removeItem(m);
          },
          /**
           * Force the viewer to redraw its contents.
           * @returns {OpenSeadragon.Viewer} Chainable.
           */
          forceRedraw: function() {
            return l[this.hash].forceRedraw = !0, this;
          },
          /**
           * Force the viewer to reset its size to match its container.
           */
          forceResize: function() {
            l[this.hash].needsResize = !0, l[this.hash].forceResize = !0;
          },
          /**
           * @function
           * @returns {OpenSeadragon.Viewer} Chainable.
           */
          bindSequenceControls: function() {
            var m = a.delegate(this, C), x = a.delegate(this, b), B = a.delegate(this, this.goToNextPage), W = a.delegate(this, this.goToPreviousPage), J = this.navImages, le = !0;
            return this.showSequenceControl && ((this.previousButton || this.nextButton) && (le = !1), this.previousButton = new a.Button({
              element: this.previousButton ? a.getElement(this.previousButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.PreviousPage"),
              srcRest: Y(this.prefixUrl, J.previous.REST),
              srcGroup: Y(this.prefixUrl, J.previous.GROUP),
              srcHover: Y(this.prefixUrl, J.previous.HOVER),
              srcDown: Y(this.prefixUrl, J.previous.DOWN),
              onRelease: W,
              onFocus: m,
              onBlur: x
            }), this.nextButton = new a.Button({
              element: this.nextButton ? a.getElement(this.nextButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.NextPage"),
              srcRest: Y(this.prefixUrl, J.next.REST),
              srcGroup: Y(this.prefixUrl, J.next.GROUP),
              srcHover: Y(this.prefixUrl, J.next.HOVER),
              srcDown: Y(this.prefixUrl, J.next.DOWN),
              onRelease: B,
              onFocus: m,
              onBlur: x
            }), this.navPrevNextWrap || this.previousButton.disable(), (!this.tileSources || !this.tileSources.length) && this.nextButton.disable(), le && (this.paging = new a.ButtonGroup({
              buttons: [
                this.previousButton,
                this.nextButton
              ],
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold
            }), this.pagingControl = this.paging.element, this.toolbar ? this.toolbar.addControl(
              this.pagingControl,
              { anchor: a.ControlAnchor.BOTTOM_RIGHT }
            ) : this.addControl(
              this.pagingControl,
              { anchor: this.sequenceControlAnchor || a.ControlAnchor.TOP_LEFT }
            ))), this;
          },
          /**
           * @function
           * @returns {OpenSeadragon.Viewer} Chainable.
           */
          bindStandardControls: function() {
            var m = a.delegate(this, ae), x = a.delegate(this, Re), B = a.delegate(this, Qe), W = a.delegate(this, _e), J = a.delegate(this, bt), le = a.delegate(this, te), Q = a.delegate(this, xe), fe = a.delegate(this, he), Le = a.delegate(this, Ae), we = a.delegate(this, We), oe = a.delegate(this, C), ue = a.delegate(this, b), w = this.navImages, y = [], _ = !0;
            return this.showNavigationControl && ((this.zoomInButton || this.zoomOutButton || this.homeButton || this.fullPageButton || this.rotateLeftButton || this.rotateRightButton || this.flipButton) && (_ = !1), this.showZoomControl && (y.push(this.zoomInButton = new a.Button({
              element: this.zoomInButton ? a.getElement(this.zoomInButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.ZoomIn"),
              srcRest: Y(this.prefixUrl, w.zoomIn.REST),
              srcGroup: Y(this.prefixUrl, w.zoomIn.GROUP),
              srcHover: Y(this.prefixUrl, w.zoomIn.HOVER),
              srcDown: Y(this.prefixUrl, w.zoomIn.DOWN),
              onPress: m,
              onRelease: x,
              onClick: B,
              onEnter: m,
              onExit: x,
              onFocus: oe,
              onBlur: ue
            })), y.push(this.zoomOutButton = new a.Button({
              element: this.zoomOutButton ? a.getElement(this.zoomOutButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.ZoomOut"),
              srcRest: Y(this.prefixUrl, w.zoomOut.REST),
              srcGroup: Y(this.prefixUrl, w.zoomOut.GROUP),
              srcHover: Y(this.prefixUrl, w.zoomOut.HOVER),
              srcDown: Y(this.prefixUrl, w.zoomOut.DOWN),
              onPress: W,
              onRelease: x,
              onClick: J,
              onEnter: W,
              onExit: x,
              onFocus: oe,
              onBlur: ue
            }))), this.showHomeControl && y.push(this.homeButton = new a.Button({
              element: this.homeButton ? a.getElement(this.homeButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.Home"),
              srcRest: Y(this.prefixUrl, w.home.REST),
              srcGroup: Y(this.prefixUrl, w.home.GROUP),
              srcHover: Y(this.prefixUrl, w.home.HOVER),
              srcDown: Y(this.prefixUrl, w.home.DOWN),
              onRelease: le,
              onFocus: oe,
              onBlur: ue
            })), this.showFullPageControl && y.push(this.fullPageButton = new a.Button({
              element: this.fullPageButton ? a.getElement(this.fullPageButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.FullPage"),
              srcRest: Y(this.prefixUrl, w.fullpage.REST),
              srcGroup: Y(this.prefixUrl, w.fullpage.GROUP),
              srcHover: Y(this.prefixUrl, w.fullpage.HOVER),
              srcDown: Y(this.prefixUrl, w.fullpage.DOWN),
              onRelease: Q,
              onFocus: oe,
              onBlur: ue
            })), this.showRotationControl && (y.push(this.rotateLeftButton = new a.Button({
              element: this.rotateLeftButton ? a.getElement(this.rotateLeftButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.RotateLeft"),
              srcRest: Y(this.prefixUrl, w.rotateleft.REST),
              srcGroup: Y(this.prefixUrl, w.rotateleft.GROUP),
              srcHover: Y(this.prefixUrl, w.rotateleft.HOVER),
              srcDown: Y(this.prefixUrl, w.rotateleft.DOWN),
              onRelease: fe,
              onFocus: oe,
              onBlur: ue
            })), y.push(this.rotateRightButton = new a.Button({
              element: this.rotateRightButton ? a.getElement(this.rotateRightButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.RotateRight"),
              srcRest: Y(this.prefixUrl, w.rotateright.REST),
              srcGroup: Y(this.prefixUrl, w.rotateright.GROUP),
              srcHover: Y(this.prefixUrl, w.rotateright.HOVER),
              srcDown: Y(this.prefixUrl, w.rotateright.DOWN),
              onRelease: Le,
              onFocus: oe,
              onBlur: ue
            }))), this.showFlipControl && y.push(this.flipButton = new a.Button({
              element: this.flipButton ? a.getElement(this.flipButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.Flip"),
              srcRest: Y(this.prefixUrl, w.flip.REST),
              srcGroup: Y(this.prefixUrl, w.flip.GROUP),
              srcHover: Y(this.prefixUrl, w.flip.HOVER),
              srcDown: Y(this.prefixUrl, w.flip.DOWN),
              onRelease: we,
              onFocus: oe,
              onBlur: ue
            })), _ ? (this.buttonGroup = new a.ButtonGroup({
              buttons: y,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold
            }), this.navControl = this.buttonGroup.element, this.addHandler("open", a.delegate(this, qt)), this.toolbar ? this.toolbar.addControl(
              this.navControl,
              { anchor: this.navigationControlAnchor || a.ControlAnchor.TOP_LEFT }
            ) : this.addControl(
              this.navControl,
              { anchor: this.navigationControlAnchor || a.ControlAnchor.TOP_LEFT }
            )) : this.customButtons = y), this;
          },
          /**
           * Gets the active page of a sequence
           * @function
           * @returns {Number}
           */
          currentPage: function() {
            return this._sequenceIndex;
          },
          /**
           * @function
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:page
           */
          goToPage: function(m) {
            return this.tileSources && m >= 0 && m < this.tileSources.length && (this._sequenceIndex = m, this._updateSequenceButtons(m), this.open(this.tileSources[m]), this.referenceStrip && this.referenceStrip.setFocus(m), this.raiseEvent("page", { page: m })), this;
          },
          /**
            * Adds an html element as an overlay to the current viewport.  Useful for
            * highlighting words or areas of interest on an image or other zoomable
            * interface. The overlays added via this method are removed when the viewport
            * is closed which include when changing page.
            * @method
            * @param {Element|String|Object} element - A reference to an element or an id for
            *      the element which will be overlaid. Or an Object specifying the configuration for the overlay.
            *      If using an object, see {@link OpenSeadragon.Overlay} for a list of
            *      all available options.
            * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
            *      rectangle which will be overlaid. This is a viewport relative location.
            * @param {OpenSeadragon.Placement} [placement=OpenSeadragon.Placement.TOP_LEFT] - The position of the
            *      viewport which the location coordinates will be treated as relative
            *      to.
            * @param {function} [onDraw] - If supplied the callback is called when the overlay
            *      needs to be drawn. It is the responsibility of the callback to do any drawing/positioning.
            *      It is passed position, size and element.
            * @returns {OpenSeadragon.Viewer} Chainable.
            * @fires OpenSeadragon.Viewer.event:add-overlay
            */
          addOverlay: function(m, x, B, W) {
            var J;
            if (a.isPlainObject(m) ? J = m : J = {
              element: m,
              location: x,
              placement: B,
              onDraw: W
            }, m = a.getElement(J.element), h(this.currentOverlays, m) >= 0)
              return this;
            var le = d(this, J);
            return this.currentOverlays.push(le), le.drawHTML(this.overlaysContainer, this.viewport), this.raiseEvent("add-overlay", {
              element: m,
              location: J.location,
              placement: J.placement
            }), this;
          },
          /**
           * Updates the overlay represented by the reference to the element or
           * element id moving it to the new location, relative to the new placement.
           * @method
           * @param {Element|String} element - A reference to an element or an id for
           *      the element which is overlaid.
           * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
           *      rectangle which will be overlaid. This is a viewport relative location.
           * @param {OpenSeadragon.Placement} [placement=OpenSeadragon.Placement.TOP_LEFT] - The position of the
           *      viewport which the location coordinates will be treated as relative
           *      to.
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:update-overlay
           */
          updateOverlay: function(m, x, B) {
            var W;
            return m = a.getElement(m), W = h(this.currentOverlays, m), W >= 0 && (this.currentOverlays[W].update(x, B), l[this.hash].forceRedraw = !0, this.raiseEvent("update-overlay", {
              element: m,
              location: x,
              placement: B
            })), this;
          },
          /**
           * Removes an overlay identified by the reference element or element id
           * and schedules an update.
           * @method
           * @param {Element|String} element - A reference to the element or an
           *      element id which represent the ovelay content to be removed.
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:remove-overlay
           */
          removeOverlay: function(m) {
            var x;
            return m = a.getElement(m), x = h(this.currentOverlays, m), x >= 0 && (this.currentOverlays[x].destroy(), this.currentOverlays.splice(x, 1), l[this.hash].forceRedraw = !0, this.raiseEvent("remove-overlay", {
              element: m
            })), this;
          },
          /**
           * Removes all currently configured Overlays from this Viewer and schedules
           * an update.
           * @method
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:clear-overlay
           */
          clearOverlays: function() {
            for (; this.currentOverlays.length > 0; )
              this.currentOverlays.pop().destroy();
            return l[this.hash].forceRedraw = !0, this.raiseEvent("clear-overlay", {}), this;
          },
          /**
          * Finds an overlay identified by the reference element or element id
          * and returns it as an object, return null if not found.
          * @method
          * @param {Element|String} element - A reference to the element or an
          *      element id which represents the overlay content.
          * @returns {OpenSeadragon.Overlay} the matching overlay or null if none found.
          */
          getOverlayById: function(m) {
            var x;
            return m = a.getElement(m), x = h(this.currentOverlays, m), x >= 0 ? this.currentOverlays[x] : null;
          },
          /**
           * Updates the sequence buttons.
           * @function OpenSeadragon.Viewer.prototype._updateSequenceButtons
           * @private
           * @param {Number} Sequence Value
           */
          _updateSequenceButtons: function(m) {
            this.nextButton && (!this.tileSources || this.tileSources.length - 1 === m ? this.navPrevNextWrap || this.nextButton.disable() : this.nextButton.enable()), this.previousButton && (m > 0 ? this.previousButton.enable() : this.navPrevNextWrap || this.previousButton.disable());
          },
          /**
           * Display a message in the viewport
           * @function OpenSeadragon.Viewer.prototype._showMessage
           * @private
           * @param {String} text message
           */
          _showMessage: function(m) {
            this._hideMessage();
            var x = a.makeNeutralElement("div");
            x.appendChild(document.createTextNode(m)), this.messageDiv = a.makeCenteredNode(x), a.addClass(this.messageDiv, "openseadragon-message"), this.container.appendChild(this.messageDiv);
          },
          /**
           * Hide any currently displayed viewport message
           * @function OpenSeadragon.Viewer.prototype._hideMessage
           * @private
           */
          _hideMessage: function() {
            var m = this.messageDiv;
            m && (m.parentNode.removeChild(m), delete this.messageDiv);
          },
          /**
           * Gets this viewer's gesture settings for the given pointer device type.
           * @method
           * @param {String} type - The pointer device type to get the gesture settings for ("mouse", "touch", "pen", etc.).
           * @returns {OpenSeadragon.GestureSettings}
           */
          gestureSettingsByDeviceType: function(m) {
            switch (m) {
              case "mouse":
                return this.gestureSettingsMouse;
              case "touch":
                return this.gestureSettingsTouch;
              case "pen":
                return this.gestureSettingsPen;
              default:
                return this.gestureSettingsUnknown;
            }
          },
          // private
          _drawOverlays: function() {
            var m, x = this.currentOverlays.length;
            for (m = 0; m < x; m++)
              this.currentOverlays[m].drawHTML(this.overlaysContainer, this.viewport);
          },
          /**
           * Cancel the "in flight" images.
           */
          _cancelPendingImages: function() {
            this._loadQueue = [];
          },
          /**
           * Removes the reference strip and disables displaying it.
           * @function
           */
          removeReferenceStrip: function() {
            this.showReferenceStrip = !1, this.referenceStrip && (this.referenceStrip.destroy(), this.referenceStrip = null);
          },
          /**
           * Enables and displays the reference strip based on the currently set tileSources.
           * Works only when the Viewer has sequenceMode set to true.
           * @function
           */
          addReferenceStrip: function() {
            if (this.showReferenceStrip = !0, this.sequenceMode) {
              if (this.referenceStrip)
                return;
              this.tileSources.length && this.tileSources.length > 1 && (this.referenceStrip = new a.ReferenceStrip({
                id: this.referenceStripElement,
                position: this.referenceStripPosition,
                sizeRatio: this.referenceStripSizeRatio,
                scroll: this.referenceStripScroll,
                height: this.referenceStripHeight,
                width: this.referenceStripWidth,
                tileSources: this.tileSources,
                prefixUrl: this.prefixUrl,
                viewer: this
              }), this.referenceStrip.setFocus(this._sequenceIndex));
            } else
              a.console.warn('Attempting to display a reference strip while "sequenceMode" is off.');
          },
          /**
           * Adds _updatePixelDensityRatio to the window resize event.
           * @private
           */
          _addUpdatePixelDensityRatioEvent: function() {
            this._updatePixelDensityRatioBind = this._updatePixelDensityRatio.bind(this), a.addEvent(window, "resize", this._updatePixelDensityRatioBind);
          },
          /**
           * Removes _updatePixelDensityRatio from the window resize event.
           * @private
           */
          _removeUpdatePixelDensityRatioEvent: function() {
            a.removeEvent(window, "resize", this._updatePixelDensityRatioBind);
          },
          /**
           * Update pixel density ratio and forces a resize operation.
           * @private
           */
          _updatePixelDensityRatio: function() {
            var m = a.pixelDensityRatio, x = a.getCurrentPixelDensityRatio();
            m !== x && (a.pixelDensityRatio = x, this.forceResize());
          },
          /**
           * Sets the image source to the source with index equal to
           * currentIndex - 1. Changes current image in sequence mode.
           * If specified, wraps around (see navPrevNextWrap in
           * {@link OpenSeadragon.Options})
           *
           * @method
           */
          goToPreviousPage: function() {
            var m = this._sequenceIndex - 1;
            this.navPrevNextWrap && m < 0 && (m += this.tileSources.length), this.goToPage(m);
          },
          /**
           * Sets the image source to the source with index equal to
           * currentIndex + 1. Changes current image in sequence mode.
           * If specified, wraps around (see navPrevNextWrap in
           * {@link OpenSeadragon.Options})
           *
           * @method
           */
          goToNextPage: function() {
            var m = this._sequenceIndex + 1;
            this.navPrevNextWrap && m >= this.tileSources.length && (m = 0), this.goToPage(m);
          },
          isAnimating: function() {
            return l[this.hash].animating;
          }
        }
      );
      function r(m) {
        return m = a.getElement(m), new a.Point(
          m.clientWidth === 0 ? 1 : m.clientWidth,
          m.clientHeight === 0 ? 1 : m.clientHeight
        );
      }
      function f(m, x, B, W, J) {
        var le = m;
        if (a.type(x) === "string") {
          if (x.match(/^\s*<.*>\s*$/))
            x = a.parseXml(x);
          else if (x.match(/^\s*[{[].*[}\]]\s*$/))
            try {
              var Q = a.parseJSON(x);
              x = Q;
            } catch {
            }
        }
        function fe(Le, we) {
          Le.ready ? W(Le) : (Le.addHandler("ready", function() {
            W(Le);
          }), Le.addHandler("open-failed", function(oe) {
            J({
              message: oe.message,
              source: we
            });
          }));
        }
        setTimeout(function() {
          if (a.type(x) === "string")
            x = new a.TileSource({
              url: x,
              crossOriginPolicy: B.crossOriginPolicy !== void 0 ? B.crossOriginPolicy : m.crossOriginPolicy,
              ajaxWithCredentials: m.ajaxWithCredentials,
              ajaxHeaders: B.ajaxHeaders ? B.ajaxHeaders : m.ajaxHeaders,
              splitHashDataForPost: m.splitHashDataForPost,
              success: function(ue) {
                W(ue.tileSource);
              }
            }), x.addHandler("open-failed", function(ue) {
              J(ue);
            });
          else if (a.isPlainObject(x) || x.nodeType)
            if (x.crossOriginPolicy === void 0 && (B.crossOriginPolicy !== void 0 || m.crossOriginPolicy !== void 0) && (x.crossOriginPolicy = B.crossOriginPolicy !== void 0 ? B.crossOriginPolicy : m.crossOriginPolicy), x.ajaxWithCredentials === void 0 && (x.ajaxWithCredentials = m.ajaxWithCredentials), a.isFunction(x.getTileUrl)) {
              var Le = new a.TileSource(x);
              Le.getTileUrl = x.getTileUrl, W(Le);
            } else {
              var we = a.TileSource.determineType(le, x);
              if (!we) {
                J({
                  message: "Unable to load TileSource",
                  source: x
                });
                return;
              }
              var oe = we.prototype.configure.apply(le, [x]);
              fe(new we(oe), x);
            }
          else
            fe(x, x);
        });
      }
      function d(m, x) {
        if (x instanceof a.Overlay)
          return x;
        var B = null;
        if (x.element)
          B = a.getElement(x.element);
        else {
          var W = x.id ? x.id : "openseadragon-overlay-" + Math.floor(Math.random() * 1e7);
          B = a.getElement(x.id), B || (B = document.createElement("a"), B.href = "#/overlay/" + W), B.id = W, a.addClass(
            B,
            x.className ? x.className : "openseadragon-overlay"
          );
        }
        var J = x.location, le = x.width, Q = x.height;
        if (!J) {
          var fe = x.x, Le = x.y;
          if (x.px !== void 0) {
            var we = m.viewport.imageToViewportRectangle(new a.Rect(
              x.px,
              x.py,
              le || 0,
              Q || 0
            ));
            fe = we.x, Le = we.y, le = le !== void 0 ? we.width : void 0, Q = Q !== void 0 ? we.height : void 0;
          }
          J = new a.Point(fe, Le);
        }
        var oe = x.placement;
        return oe && a.type(oe) === "string" && (oe = a.Placement[x.placement.toUpperCase()]), new a.Overlay({
          element: B,
          location: J,
          placement: oe,
          onDraw: x.onDraw,
          checkResize: x.checkResize,
          width: le,
          height: Q,
          rotationMode: x.rotationMode
        });
      }
      function h(m, x) {
        var B;
        for (B = m.length - 1; B >= 0; B--)
          if (m[B].element === x)
            return B;
        return -1;
      }
      function c(m, x) {
        return a.requestAnimationFrame(function() {
          x(m);
        });
      }
      function g(m) {
        a.requestAnimationFrame(function() {
          T(m);
        });
      }
      function p(m) {
        m.autoHideControls && (m.controlsShouldFade = !0, m.controlsFadeBeginTime = a.now() + m.controlsFadeDelay, window.setTimeout(function() {
          g(m);
        }, m.controlsFadeDelay));
      }
      function T(m) {
        var x, B, W, J;
        if (m.controlsShouldFade) {
          for (x = a.now(), B = x - m.controlsFadeBeginTime, W = 1 - B / m.controlsFadeLength, W = Math.min(1, W), W = Math.max(0, W), J = m.controls.length - 1; J >= 0; J--)
            m.controls[J].autoFade && m.controls[J].setOpacity(W);
          W > 0 && g(m);
        }
      }
      function E(m) {
        var x;
        for (m.controlsShouldFade = !1, x = m.controls.length - 1; x >= 0; x--)
          m.controls[x].setOpacity(1);
      }
      function C() {
        E(this);
      }
      function b() {
        p(this);
      }
      function D(m) {
        var x = {
          tracker: m.eventSource,
          position: m.position,
          originalEvent: m.originalEvent,
          preventDefault: m.preventDefault
        };
        this.raiseEvent("canvas-contextmenu", x), m.preventDefault = x.preventDefault;
      }
      function z(m) {
        var x = {
          originalEvent: m.originalEvent,
          preventDefaultAction: !1,
          preventVerticalPan: m.preventVerticalPan || !this.panVertical,
          preventHorizontalPan: m.preventHorizontalPan || !this.panHorizontal
        };
        if (this.raiseEvent("canvas-key", x), !x.preventDefaultAction && !m.ctrl && !m.alt && !m.meta)
          switch (m.keyCode) {
            case 38:
              x.preventVerticalPan || (m.shift ? this.viewport.zoomBy(1.1) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0, -this.pixelsPerArrowPress))), this.viewport.applyConstraints()), m.preventDefault = !0;
              break;
            case 40:
              x.preventVerticalPan || (m.shift ? this.viewport.zoomBy(0.9) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0, this.pixelsPerArrowPress))), this.viewport.applyConstraints()), m.preventDefault = !0;
              break;
            case 37:
              x.preventHorizontalPan || (this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(-this.pixelsPerArrowPress, 0))), this.viewport.applyConstraints()), m.preventDefault = !0;
              break;
            case 39:
              x.preventHorizontalPan || (this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(this.pixelsPerArrowPress, 0))), this.viewport.applyConstraints()), m.preventDefault = !0;
              break;
            case 187:
              this.viewport.zoomBy(1.1), this.viewport.applyConstraints(), m.preventDefault = !0;
              break;
            case 189:
              this.viewport.zoomBy(0.9), this.viewport.applyConstraints(), m.preventDefault = !0;
              break;
            case 48:
              this.viewport.goHome(), this.viewport.applyConstraints(), m.preventDefault = !0;
              break;
            case 87:
              x.preventVerticalPan || (m.shift ? this.viewport.zoomBy(1.1) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0, -40))), this.viewport.applyConstraints()), m.preventDefault = !0;
              break;
            case 83:
              x.preventVerticalPan || (m.shift ? this.viewport.zoomBy(0.9) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0, 40))), this.viewport.applyConstraints()), m.preventDefault = !0;
              break;
            case 65:
              x.preventHorizontalPan || (this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(-40, 0))), this.viewport.applyConstraints()), m.preventDefault = !0;
              break;
            case 68:
              x.preventHorizontalPan || (this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(40, 0))), this.viewport.applyConstraints()), m.preventDefault = !0;
              break;
            case 82:
              m.shift ? this.viewport.flipped ? this.viewport.setRotation(this.viewport.getRotation() + this.rotationIncrement) : this.viewport.setRotation(this.viewport.getRotation() - this.rotationIncrement) : this.viewport.flipped ? this.viewport.setRotation(this.viewport.getRotation() - this.rotationIncrement) : this.viewport.setRotation(this.viewport.getRotation() + this.rotationIncrement), this.viewport.applyConstraints(), m.preventDefault = !0;
              break;
            case 70:
              this.viewport.toggleFlip(), m.preventDefault = !0;
              break;
            case 74:
              this.goToPreviousPage();
              break;
            case 75:
              this.goToNextPage();
              break;
            default:
              m.preventDefault = !1;
              break;
          }
        else
          m.preventDefault = !1;
      }
      function G(m) {
        var x = {
          originalEvent: m.originalEvent
        };
        this.raiseEvent("canvas-key-press", x);
      }
      function V(m) {
        var x, B = document.activeElement === this.canvas;
        B || this.canvas.focus(), this.viewport.flipped && (m.position.x = this.viewport.getContainerSize().x - m.position.x);
        var W = {
          tracker: m.eventSource,
          position: m.position,
          quick: m.quick,
          shift: m.shift,
          originalEvent: m.originalEvent,
          originalTarget: m.originalTarget,
          preventDefaultAction: !1
        };
        this.raiseEvent("canvas-click", W), !W.preventDefaultAction && this.viewport && m.quick && (x = this.gestureSettingsByDeviceType(m.pointerType), x.clickToZoom === !0 && (this.viewport.zoomBy(
          m.shift ? 1 / this.zoomPerClick : this.zoomPerClick,
          x.zoomToRefPoint ? this.viewport.pointFromPixel(m.position, !0) : null
        ), this.viewport.applyConstraints()), x.dblClickDragToZoom && (l[this.hash].draggingToZoom === !0 ? (l[this.hash].lastClickTime = null, l[this.hash].draggingToZoom = !1) : l[this.hash].lastClickTime = a.now()));
      }
      function de(m) {
        var x, B = {
          tracker: m.eventSource,
          position: m.position,
          shift: m.shift,
          originalEvent: m.originalEvent,
          preventDefaultAction: !1
        };
        this.raiseEvent("canvas-double-click", B), !B.preventDefaultAction && this.viewport && (x = this.gestureSettingsByDeviceType(m.pointerType), x.dblClickToZoom && (this.viewport.zoomBy(
          m.shift ? 1 / this.zoomPerClick : this.zoomPerClick,
          x.zoomToRefPoint ? this.viewport.pointFromPixel(m.position, !0) : null
        ), this.viewport.applyConstraints()));
      }
      function ne(m) {
        var x, B = {
          tracker: m.eventSource,
          pointerType: m.pointerType,
          position: m.position,
          delta: m.delta,
          speed: m.speed,
          direction: m.direction,
          shift: m.shift,
          originalEvent: m.originalEvent,
          preventDefaultAction: !1
        };
        if (this.raiseEvent("canvas-drag", B), x = this.gestureSettingsByDeviceType(m.pointerType), !B.preventDefaultAction && this.viewport) {
          if (x.dblClickDragToZoom && l[this.hash].draggingToZoom) {
            var W = Math.pow(this.zoomPerDblClickDrag, m.delta.y / 50);
            this.viewport.zoomBy(W);
          } else if (x.dragToPan && !l[this.hash].draggingToZoom) {
            if (this.panHorizontal || (m.delta.x = 0), this.panVertical || (m.delta.y = 0), this.viewport.flipped && (m.delta.x = -m.delta.x), this.constrainDuringPan) {
              var J = this.viewport.deltaPointsFromPixels(m.delta.negate());
              this.viewport.centerSpringX.target.value += J.x, this.viewport.centerSpringY.target.value += J.y;
              var le = this.viewport.getConstrainedBounds();
              this.viewport.centerSpringX.target.value -= J.x, this.viewport.centerSpringY.target.value -= J.y, le.xConstrained && (m.delta.x = 0), le.yConstrained && (m.delta.y = 0);
            }
            this.viewport.panBy(this.viewport.deltaPointsFromPixels(m.delta.negate()), x.flickEnabled && !this.constrainDuringPan);
          }
        }
      }
      function me(m) {
        var x, B = {
          tracker: m.eventSource,
          pointerType: m.pointerType,
          position: m.position,
          speed: m.speed,
          direction: m.direction,
          shift: m.shift,
          originalEvent: m.originalEvent,
          preventDefaultAction: !1
        };
        if (this.raiseEvent("canvas-drag-end", B), x = this.gestureSettingsByDeviceType(m.pointerType), !B.preventDefaultAction && this.viewport) {
          if (!l[this.hash].draggingToZoom && x.dragToPan && x.flickEnabled && m.speed >= x.flickMinSpeed) {
            var W = 0;
            this.panHorizontal && (W = x.flickMomentum * m.speed * Math.cos(m.direction));
            var J = 0;
            this.panVertical && (J = x.flickMomentum * m.speed * Math.sin(m.direction));
            var le = this.viewport.pixelFromPoint(
              this.viewport.getCenter(!0)
            ), Q = this.viewport.pointFromPixel(
              new a.Point(le.x - W, le.y - J)
            );
            this.viewport.panTo(Q, !1);
          }
          this.viewport.applyConstraints();
        }
        x.dblClickDragToZoom && l[this.hash].draggingToZoom === !0 && (l[this.hash].draggingToZoom = !1);
      }
      function ie(m) {
        this.raiseEvent("canvas-enter", {
          tracker: m.eventSource,
          pointerType: m.pointerType,
          position: m.position,
          buttons: m.buttons,
          pointers: m.pointers,
          insideElementPressed: m.insideElementPressed,
          buttonDownAny: m.buttonDownAny,
          originalEvent: m.originalEvent
        });
      }
      function Te(m) {
        this.raiseEvent("canvas-exit", {
          tracker: m.eventSource,
          pointerType: m.pointerType,
          position: m.position,
          buttons: m.buttons,
          pointers: m.pointers,
          insideElementPressed: m.insideElementPressed,
          buttonDownAny: m.buttonDownAny,
          originalEvent: m.originalEvent
        });
      }
      function be(m) {
        var x;
        if (this.raiseEvent("canvas-press", {
          tracker: m.eventSource,
          pointerType: m.pointerType,
          position: m.position,
          insideElementPressed: m.insideElementPressed,
          insideElementReleased: m.insideElementReleased,
          originalEvent: m.originalEvent
        }), x = this.gestureSettingsByDeviceType(m.pointerType), x.dblClickDragToZoom) {
          var B = l[this.hash].lastClickTime, W = a.now();
          if (B === null)
            return;
          W - B < this.dblClickTimeThreshold && (l[this.hash].draggingToZoom = !0), l[this.hash].lastClickTime = null;
        }
      }
      function qe(m) {
        this.raiseEvent("canvas-release", {
          tracker: m.eventSource,
          pointerType: m.pointerType,
          position: m.position,
          insideElementPressed: m.insideElementPressed,
          insideElementReleased: m.insideElementReleased,
          originalEvent: m.originalEvent
        });
      }
      function Oe(m) {
        this.raiseEvent("canvas-nonprimary-press", {
          tracker: m.eventSource,
          position: m.position,
          pointerType: m.pointerType,
          button: m.button,
          buttons: m.buttons,
          originalEvent: m.originalEvent
        });
      }
      function ge(m) {
        this.raiseEvent("canvas-nonprimary-release", {
          tracker: m.eventSource,
          position: m.position,
          pointerType: m.pointerType,
          button: m.button,
          buttons: m.buttons,
          originalEvent: m.originalEvent
        });
      }
      function Ne(m) {
        var x, B, W, J, le = {
          tracker: m.eventSource,
          pointerType: m.pointerType,
          gesturePoints: m.gesturePoints,
          lastCenter: m.lastCenter,
          center: m.center,
          lastDistance: m.lastDistance,
          distance: m.distance,
          shift: m.shift,
          originalEvent: m.originalEvent,
          preventDefaultPanAction: !1,
          preventDefaultZoomAction: !1,
          preventDefaultRotateAction: !1
        };
        if (this.raiseEvent("canvas-pinch", le), this.viewport && (x = this.gestureSettingsByDeviceType(m.pointerType), x.pinchToZoom && (!le.preventDefaultPanAction || !le.preventDefaultZoomAction) && (B = this.viewport.pointFromPixel(m.center, !0), x.zoomToRefPoint && !le.preventDefaultPanAction && (W = this.viewport.pointFromPixel(m.lastCenter, !0), J = W.minus(B), this.panHorizontal || (J.x = 0), this.panVertical || (J.y = 0), this.viewport.panBy(J, !0)), le.preventDefaultZoomAction || this.viewport.zoomBy(m.distance / m.lastDistance, B, !0), this.viewport.applyConstraints()), x.pinchRotate && !le.preventDefaultRotateAction)) {
          var Q = Math.atan2(
            m.gesturePoints[0].currentPos.y - m.gesturePoints[1].currentPos.y,
            m.gesturePoints[0].currentPos.x - m.gesturePoints[1].currentPos.x
          ), fe = Math.atan2(
            m.gesturePoints[0].lastPos.y - m.gesturePoints[1].lastPos.y,
            m.gesturePoints[0].lastPos.x - m.gesturePoints[1].lastPos.x
          );
          B = this.viewport.pointFromPixel(m.center, !0), this.viewport.rotateTo(this.viewport.getRotation(!0) + (Q - fe) * (180 / Math.PI), B, !0);
        }
      }
      function Ze(m) {
        this.raiseEvent("canvas-focus", {
          tracker: m.eventSource,
          originalEvent: m.originalEvent
        });
      }
      function Xe(m) {
        this.raiseEvent("canvas-blur", {
          tracker: m.eventSource,
          originalEvent: m.originalEvent
        });
      }
      function F(m) {
        var x, B, W, J, le;
        J = a.now(), le = J - this._lastScrollTime, le > this.minScrollDeltaTime ? (this._lastScrollTime = J, x = {
          tracker: m.eventSource,
          position: m.position,
          scroll: m.scroll,
          shift: m.shift,
          originalEvent: m.originalEvent,
          preventDefaultAction: !1,
          preventDefault: !0
        }, this.raiseEvent("canvas-scroll", x), !x.preventDefaultAction && this.viewport && (this.viewport.flipped && (m.position.x = this.viewport.getContainerSize().x - m.position.x), B = this.gestureSettingsByDeviceType(m.pointerType), B.scrollToZoom && (W = Math.pow(this.zoomPerScroll, m.scroll), this.viewport.zoomBy(
          W,
          B.zoomToRefPoint ? this.viewport.pointFromPixel(m.position, !0) : null
        ), this.viewport.applyConstraints())), m.preventDefault = x.preventDefault) : m.preventDefault = !0;
      }
      function ee(m) {
        l[this.hash].mouseInside = !0, E(this), this.raiseEvent("container-enter", {
          tracker: m.eventSource,
          pointerType: m.pointerType,
          position: m.position,
          buttons: m.buttons,
          pointers: m.pointers,
          insideElementPressed: m.insideElementPressed,
          buttonDownAny: m.buttonDownAny,
          originalEvent: m.originalEvent
        });
      }
      function se(m) {
        m.pointers < 1 && (l[this.hash].mouseInside = !1, l[this.hash].animating || p(this)), this.raiseEvent("container-exit", {
          tracker: m.eventSource,
          pointerType: m.pointerType,
          position: m.position,
          buttons: m.buttons,
          pointers: m.pointers,
          insideElementPressed: m.insideElementPressed,
          buttonDownAny: m.buttonDownAny,
          originalEvent: m.originalEvent
        });
      }
      function De(m) {
        O(m), m.isOpen() ? m._updateRequestId = c(m, De) : m._updateRequestId = !1;
      }
      function Be(m, x) {
        var B = m.viewport, W = B.getZoom(), J = B.getCenter();
        B.resize(x, m.preserveImageSizeOnResize), B.panTo(J, !0);
        var le;
        if (m.preserveImageSizeOnResize)
          le = l[m.hash].prevContainerSize.x / x.x;
        else {
          var Q = new a.Point(0, 0), fe = new a.Point(l[m.hash].prevContainerSize.x, l[m.hash].prevContainerSize.y).distanceTo(Q), Le = new a.Point(x.x, x.y).distanceTo(Q);
          le = Le / fe * l[m.hash].prevContainerSize.x / x.x;
        }
        B.zoomTo(W * le, null, !0), l[m.hash].prevContainerSize = x, l[m.hash].forceRedraw = !0, l[m.hash].needsResize = !1, l[m.hash].forceResize = !1;
      }
      function O(m) {
        if (!(m._opening || !l[m.hash])) {
          if (m.autoResize || l[m.hash].forceResize) {
            var x;
            if (m._autoResizePolling) {
              x = r(m.container);
              var B = l[m.hash].prevContainerSize;
              x.equals(B) || (l[m.hash].needsResize = !0);
            }
            l[m.hash].needsResize && Be(m, x || r(m.container));
          }
          var W = m.viewport.update(), J = m.world.update(W) || W;
          W && m.raiseEvent("viewport-change"), m.referenceStrip && (J = m.referenceStrip.update(m.viewport) || J);
          var le = l[m.hash].animating;
          !le && J && (m.raiseEvent("animation-start"), E(m));
          var Q = le && !J;
          Q && (l[m.hash].animating = !1), (J || Q || l[m.hash].forceRedraw || m.world.needsDraw()) && (Z(m), m._drawOverlays(), m.navigator && m.navigator.update(m.viewport), l[m.hash].forceRedraw = !1, J && m.raiseEvent("animation")), Q && (m.raiseEvent("animation-finish"), l[m.hash].mouseInside || p(m)), l[m.hash].animating = J;
        }
      }
      function Z(m) {
        m.imageLoader.clear(), m.world.draw(), m.raiseEvent("update-viewport", {});
      }
      function Y(m, x) {
        return m ? m + x : x;
      }
      function ae() {
        l[this.hash].lastZoomTime = a.now(), l[this.hash].zoomFactor = this.zoomPerSecond, l[this.hash].zooming = !0, Ce(this);
      }
      function _e() {
        l[this.hash].lastZoomTime = a.now(), l[this.hash].zoomFactor = 1 / this.zoomPerSecond, l[this.hash].zooming = !0, Ce(this);
      }
      function Re() {
        l[this.hash].zooming = !1;
      }
      function Ce(m) {
        a.requestAnimationFrame(a.delegate(m, $e));
      }
      function $e() {
        var m, x, B;
        l[this.hash].zooming && this.viewport && (m = a.now(), x = m - l[this.hash].lastZoomTime, B = Math.pow(l[this.hash].zoomFactor, x / 1e3), this.viewport.zoomBy(B), this.viewport.applyConstraints(), l[this.hash].lastZoomTime = m, Ce(this));
      }
      function Qe() {
        this.viewport && (l[this.hash].zooming = !1, this.viewport.zoomBy(
          this.zoomPerClick / 1
        ), this.viewport.applyConstraints());
      }
      function bt() {
        this.viewport && (l[this.hash].zooming = !1, this.viewport.zoomBy(
          1 / this.zoomPerClick
        ), this.viewport.applyConstraints());
      }
      function qt() {
        this.buttonGroup && (this.buttonGroup.emulateEnter(), this.buttonGroup.emulateLeave());
      }
      function te() {
        this.viewport && this.viewport.goHome();
      }
      function xe() {
        this.isFullPage() && !a.isFullScreen() ? this.setFullPage(!1) : this.setFullScreen(!this.isFullPage()), this.buttonGroup && this.buttonGroup.emulateLeave(), this.fullPageButton.element.focus(), this.viewport && this.viewport.applyConstraints();
      }
      function he() {
        if (this.viewport) {
          var m = this.viewport.getRotation();
          this.viewport.flipped ? m += this.rotationIncrement : m -= this.rotationIncrement, this.viewport.setRotation(m);
        }
      }
      function Ae() {
        if (this.viewport) {
          var m = this.viewport.getRotation();
          this.viewport.flipped ? m -= this.rotationIncrement : m += this.rotationIncrement, this.viewport.setRotation(m);
        }
      }
      function We() {
        this.viewport.toggleFlip();
      }
      a.determineDrawer = function(m) {
        for (let x in K) {
          const B = K[x], W = B.prototype;
          if (W && W instanceof K.DrawerBase && a.isFunction(W.getType) && W.getType.call(B) === m)
            return B;
        }
        return null;
      };
    })(K), (function(a) {
      a.Navigator = function(c) {
        var g = c.viewer, p = this, T, E;
        c.element || c.id ? (c.element ? (c.id && a.console.warn("Given option.id for Navigator was ignored since option.element was provided and is being used instead."), c.element.id ? c.id = c.element.id : c.id = "navigator-" + a.now(), this.element = c.element) : this.element = document.getElementById(c.id), c.controlOptions = {
          anchor: a.ControlAnchor.NONE,
          attachToViewer: !1,
          autoFade: !1
        }) : (c.id = "navigator-" + a.now(), this.element = a.makeNeutralElement("div"), c.controlOptions = {
          anchor: a.ControlAnchor.TOP_RIGHT,
          attachToViewer: !0,
          autoFade: c.autoFade
        }, c.position && (c.position === "BOTTOM_RIGHT" ? c.controlOptions.anchor = a.ControlAnchor.BOTTOM_RIGHT : c.position === "BOTTOM_LEFT" ? c.controlOptions.anchor = a.ControlAnchor.BOTTOM_LEFT : c.position === "TOP_RIGHT" ? c.controlOptions.anchor = a.ControlAnchor.TOP_RIGHT : c.position === "TOP_LEFT" ? c.controlOptions.anchor = a.ControlAnchor.TOP_LEFT : c.position === "ABSOLUTE" && (c.controlOptions.anchor = a.ControlAnchor.ABSOLUTE, c.controlOptions.top = c.top, c.controlOptions.left = c.left, c.controlOptions.height = c.height, c.controlOptions.width = c.width))), this.element.id = c.id, this.element.className += " navigator", c = a.extend(!0, {
          sizeRatio: a.DEFAULT_SETTINGS.navigatorSizeRatio
        }, c, {
          element: this.element,
          tabIndex: -1,
          // No keyboard navigation, omit from tab order
          //These need to be overridden to prevent recursion since
          //the navigator is a viewer and a viewer has a navigator
          showNavigator: !1,
          mouseNavEnabled: !1,
          showNavigationControl: !1,
          showSequenceControl: !1,
          immediateRender: !0,
          blendTime: 0,
          animationTime: c.animationTime,
          // disable autoResize since resize behavior is implemented differently by the navigator
          autoResize: !1,
          // prevent resizing the navigator from adding unwanted space around the image
          minZoomImageRatio: 1,
          background: c.background,
          opacity: c.opacity,
          borderColor: c.borderColor,
          displayRegionColor: c.displayRegionColor
        }), c.minPixelRatio = this.minPixelRatio = g.minPixelRatio, a.setElementTouchActionNone(this.element), this.borderWidth = 2, this.fudge = new a.Point(1, 1), this.totalBorderWidths = new a.Point(this.borderWidth * 2, this.borderWidth * 2).minus(this.fudge), c.controlOptions.anchor !== a.ControlAnchor.NONE && (function(D, z) {
          D.margin = "0px", D.border = z + "px solid " + c.borderColor, D.padding = "0px", D.background = c.background, D.opacity = c.opacity, D.overflow = "hidden";
        })(this.element.style, this.borderWidth), this.displayRegion = a.makeNeutralElement("div"), this.displayRegion.id = this.element.id + "-displayregion", this.displayRegion.className = "displayregion", (function(D, z) {
          D.position = "relative", D.top = "0px", D.left = "0px", D.fontSize = "0px", D.overflow = "hidden", D.border = z + "px solid " + c.displayRegionColor, D.margin = "0px", D.padding = "0px", D.background = "transparent", D.float = "left", D.cssFloat = "left", D.zIndex = 999999999, D.cursor = "default", D.boxSizing = "content-box";
        })(this.displayRegion.style, this.borderWidth), a.setElementPointerEventsNone(this.displayRegion), a.setElementTouchActionNone(this.displayRegion), this.displayRegionContainer = a.makeNeutralElement("div"), this.displayRegionContainer.id = this.element.id + "-displayregioncontainer", this.displayRegionContainer.className = "displayregioncontainer", this.displayRegionContainer.style.width = "100%", this.displayRegionContainer.style.height = "100%", a.setElementPointerEventsNone(this.displayRegionContainer), a.setElementTouchActionNone(this.displayRegionContainer), g.addControl(
          this.element,
          c.controlOptions
        ), this._resizeWithViewer = c.controlOptions.anchor !== a.ControlAnchor.ABSOLUTE && c.controlOptions.anchor !== a.ControlAnchor.NONE, c.width && c.height ? (this.setWidth(c.width), this.setHeight(c.height)) : this._resizeWithViewer && (T = a.getElementSize(g.element), this.element.style.height = Math.round(T.y * c.sizeRatio) + "px", this.element.style.width = Math.round(T.x * c.sizeRatio) + "px", this.oldViewerSize = T, E = a.getElementSize(this.element), this.elementArea = E.x * E.y), this.oldContainerSize = new a.Point(0, 0), a.Viewer.apply(this, [c]), this.displayRegionContainer.appendChild(this.displayRegion), this.element.getElementsByTagName("div")[0].appendChild(this.displayRegionContainer);
        function C(D, z) {
          d(p.displayRegionContainer, D), d(p.displayRegion, -D), p.viewport.setRotation(D, z);
        }
        if (c.navigatorRotate) {
          var b = c.viewer.viewport ? c.viewer.viewport.getRotation() : c.viewer.degrees || 0;
          C(b, !0), c.viewer.addHandler("rotate", function(D) {
            C(D.degrees, D.immediately);
          });
        }
        this.innerTracker.destroy(), this.innerTracker = new a.MouseTracker({
          userData: "Navigator.innerTracker",
          element: this.element,
          //this.canvas,
          dragHandler: a.delegate(this, o),
          clickHandler: a.delegate(this, l),
          releaseHandler: a.delegate(this, r),
          scrollHandler: a.delegate(this, f),
          preProcessEventHandler: function(D) {
            D.eventType === "wheel" && (D.preventDefault = !0);
          }
        }), this.outerTracker.userData = "Navigator.outerTracker", a.setElementPointerEventsNone(this.canvas), a.setElementPointerEventsNone(this.container), this.addHandler("reset-size", function() {
          p.viewport && p.viewport.goHome(!0);
        }), g.world.addHandler("item-index-change", function(D) {
          window.setTimeout(function() {
            var z = p.world.getItemAt(D.previousIndex);
            p.world.setItemIndex(z, D.newIndex);
          }, 1);
        }), g.world.addHandler("remove-item", function(D) {
          var z = D.item, G = p._getMatchingItem(z);
          G && p.world.removeItem(G);
        }), this.update(g.viewport);
      }, a.extend(
        a.Navigator.prototype,
        a.EventSource.prototype,
        a.Viewer.prototype,
        /** @lends OpenSeadragon.Navigator.prototype */
        {
          /**
           * Used to notify the navigator when its size has changed.
           * Especially useful when {@link OpenSeadragon.Options}.navigatorAutoResize is set to false and the navigator is resizable.
           * @function
           */
          updateSize: function() {
            if (this.viewport) {
              var c = new a.Point(
                this.container.clientWidth === 0 ? 1 : this.container.clientWidth,
                this.container.clientHeight === 0 ? 1 : this.container.clientHeight
              );
              c.equals(this.oldContainerSize) || (this.viewport.resize(c, !0), this.viewport.goHome(!0), this.oldContainerSize = c, this.world.update(), this.world.draw(), this.update(this.viewer.viewport));
            }
          },
          /**
           * Explicitly sets the width of the navigator, in web coordinates. Disables automatic resizing.
           * @param {Number|String} width - the new width, either a number of pixels or a CSS string, such as "100%"
           */
          setWidth: function(c) {
            this.width = c, this.element.style.width = typeof c == "number" ? c + "px" : c, this._resizeWithViewer = !1, this.updateSize();
          },
          /**
           * Explicitly sets the height of the navigator, in web coordinates. Disables automatic resizing.
           * @param {Number|String} height - the new height, either a number of pixels or a CSS string, such as "100%"
           */
          setHeight: function(c) {
            this.height = c, this.element.style.height = typeof c == "number" ? c + "px" : c, this._resizeWithViewer = !1, this.updateSize();
          },
          /**
            * Flip navigator element
            * @param {Boolean} state - Flip state to set.
            */
          setFlip: function(c) {
            return this.viewport.setFlip(c), this.setDisplayTransform(this.viewer.viewport.getFlip() ? "scale(-1,1)" : "scale(1,1)"), this;
          },
          setDisplayTransform: function(c) {
            h(this.canvas, c), h(this.element, c);
          },
          /**
           * Used to update the navigator minimap's viewport rectangle when a change in the viewer's viewport occurs.
           * @function
           * @param {OpenSeadragon.Viewport} [viewport] The viewport to display. Default: the viewport this navigator is tracking.
           */
          update: function(c) {
            var g, p, T, E, C, b;
            if (c || (c = this.viewer.viewport), g = a.getElementSize(this.viewer.element), this._resizeWithViewer && g.x && g.y && !g.equals(this.oldViewerSize) && (this.oldViewerSize = g, this.maintainSizeRatio || !this.elementArea ? (p = g.x * this.sizeRatio, T = g.y * this.sizeRatio) : (p = Math.sqrt(this.elementArea * (g.x / g.y)), T = this.elementArea / p), this.element.style.width = Math.round(p) + "px", this.element.style.height = Math.round(T) + "px", this.elementArea || (this.elementArea = p * T), this.updateSize()), c && this.viewport) {
              if (E = c.getBoundsNoRotate(!0), C = this.viewport.pixelFromPointNoRotate(E.getTopLeft(), !1), b = this.viewport.pixelFromPointNoRotate(E.getBottomRight(), !1).minus(this.totalBorderWidths), !this.navigatorRotate) {
                var D = c.getRotation(!0);
                d(this.displayRegion, -D);
              }
              var z = this.displayRegion.style;
              z.display = this.world.getItemCount() ? "block" : "none", z.top = C.y.toFixed(2) + "px", z.left = C.x.toFixed(2) + "px";
              var G = b.x - C.x, V = b.y - C.y;
              z.width = Math.round(Math.max(G, 0)) + "px", z.height = Math.round(Math.max(V, 0)) + "px";
            }
          },
          // overrides Viewer.addTiledImage
          addTiledImage: function(c) {
            var g = this, p = c.originalTiledImage;
            delete c.original;
            var T = a.extend({}, c, {
              success: function(E) {
                var C = E.item;
                C._originalForNavigator = p, g._matchBounds(C, p, !0), g._matchOpacity(C, p), g._matchCompositeOperation(C, p);
                function b() {
                  g._matchBounds(C, p);
                }
                function D() {
                  g._matchOpacity(C, p);
                }
                function z() {
                  g._matchCompositeOperation(C, p);
                }
                p.addHandler("bounds-change", b), p.addHandler("clip-change", b), p.addHandler("opacity-change", D), p.addHandler("composite-operation-change", z);
              }
            });
            return a.Viewer.prototype.addTiledImage.apply(this, [T]);
          },
          destroy: function() {
            return a.Viewer.prototype.destroy.apply(this);
          },
          // private
          _getMatchingItem: function(c) {
            for (var g = this.world.getItemCount(), p, T = 0; T < g; T++)
              if (p = this.world.getItemAt(T), p._originalForNavigator === c)
                return p;
            return null;
          },
          // private
          _matchBounds: function(c, g, p) {
            var T = g.getBoundsNoRotate();
            c.setPosition(T.getTopLeft(), p), c.setWidth(T.width, p), c.setRotation(g.getRotation(), p), c.setClip(g.getClip()), c.setFlip(g.getFlip());
          },
          // private
          _matchOpacity: function(c, g) {
            c.setOpacity(g.opacity);
          },
          // private
          _matchCompositeOperation: function(c, g) {
            c.setCompositeOperation(g.compositeOperation);
          }
        }
      );
      function l(c) {
        var g = {
          tracker: c.eventSource,
          position: c.position,
          quick: c.quick,
          shift: c.shift,
          originalEvent: c.originalEvent,
          preventDefaultAction: !1
        };
        if (this.viewer.raiseEvent("navigator-click", g), !g.preventDefaultAction && c.quick && this.viewer.viewport && (this.panVertical || this.panHorizontal)) {
          this.viewer.viewport.flipped && (c.position.x = this.viewport.getContainerSize().x - c.position.x);
          var p = this.viewport.pointFromPixel(c.position);
          this.panVertical ? this.panHorizontal || (p.x = this.viewer.viewport.getCenter(!0).x) : p.y = this.viewer.viewport.getCenter(!0).y, this.viewer.viewport.panTo(p), this.viewer.viewport.applyConstraints();
        }
      }
      function o(c) {
        var g = {
          tracker: c.eventSource,
          position: c.position,
          delta: c.delta,
          speed: c.speed,
          direction: c.direction,
          shift: c.shift,
          originalEvent: c.originalEvent,
          preventDefaultAction: !1
        };
        this.viewer.raiseEvent("navigator-drag", g), !g.preventDefaultAction && this.viewer.viewport && (this.panHorizontal || (c.delta.x = 0), this.panVertical || (c.delta.y = 0), this.viewer.viewport.flipped && (c.delta.x = -c.delta.x), this.viewer.viewport.panBy(
          this.viewport.deltaPointsFromPixels(
            c.delta
          )
        ), this.viewer.constrainDuringPan && this.viewer.viewport.applyConstraints());
      }
      function r(c) {
        c.insideElementPressed && this.viewer.viewport && this.viewer.viewport.applyConstraints();
      }
      function f(c) {
        var g = {
          tracker: c.eventSource,
          position: c.position,
          scroll: c.scroll,
          shift: c.shift,
          originalEvent: c.originalEvent,
          preventDefault: c.preventDefault
        };
        this.viewer.raiseEvent("navigator-scroll", g), c.preventDefault = g.preventDefault;
      }
      function d(c, g) {
        h(c, "rotate(" + g + "deg)");
      }
      function h(c, g) {
        c.style.webkitTransform = g, c.style.mozTransform = g, c.style.msTransform = g, c.style.oTransform = g, c.style.transform = g;
      }
    })(K), (function(a) {
      var l = {
        Errors: {
          Dzc: "Sorry, we don't support Deep Zoom Collections!",
          Dzi: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
          Xml: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
          ImageFormat: "Sorry, we don't support {0}-based Deep Zoom Images.",
          Security: "It looks like a security restriction stopped us from loading this Deep Zoom Image.",
          Status: "This space unintentionally left blank ({0} {1}).",
          OpenFailed: "Unable to open {0}: {1}"
        },
        Tooltips: {
          FullPage: "Toggle full page",
          Home: "Go home",
          ZoomIn: "Zoom in",
          ZoomOut: "Zoom out",
          NextPage: "Next page",
          PreviousPage: "Previous page",
          RotateLeft: "Rotate left",
          RotateRight: "Rotate right",
          Flip: "Flip Horizontally"
        }
      };
      a.extend(
        a,
        /** @lends OpenSeadragon */
        {
          /**
           * @function
           * @param {String} property
           */
          getString: function(o) {
            var r = o.split("."), f = null, d = arguments, h = l, c;
            for (c = 0; c < r.length - 1; c++)
              h = h[r[c]] || {};
            return f = h[r[c]], typeof f != "string" && (a.console.error("Untranslated source string:", o), f = ""), f.replace(/\{\d+\}/g, function(g) {
              var p = parseInt(g.match(/\d+/), 10) + 1;
              return p < d.length ? d[p] : "";
            });
          },
          /**
           * @function
           * @param {String} property
           * @param {*} value
           */
          setString: function(o, r) {
            var f = o.split("."), d = l, h;
            for (h = 0; h < f.length - 1; h++)
              d[f[h]] || (d[f[h]] = {}), d = d[f[h]];
            d[f[h]] = r;
          }
        }
      );
    })(K), (function(a) {
      a.Point = function(l, o) {
        this.x = typeof l == "number" ? l : 0, this.y = typeof o == "number" ? o : 0;
      }, a.Point.prototype = {
        /**
         * @function
         * @returns {OpenSeadragon.Point} a duplicate of this Point
         */
        clone: function() {
          return new a.Point(this.x, this.y);
        },
        /**
         * Add another Point to this point and return a new Point.
         * @function
         * @param {OpenSeadragon.Point} point The point to add vector components.
         * @returns {OpenSeadragon.Point} A new point representing the sum of the
         *  vector components
         */
        plus: function(l) {
          return new a.Point(
            this.x + l.x,
            this.y + l.y
          );
        },
        /**
         * Subtract another Point to this point and return a new Point.
         * @function
         * @param {OpenSeadragon.Point} point The point to subtract vector components.
         * @returns {OpenSeadragon.Point} A new point representing the subtraction of the
         *  vector components
         */
        minus: function(l) {
          return new a.Point(
            this.x - l.x,
            this.y - l.y
          );
        },
        /**
         * Multiply this point by a factor and return a new Point.
         * @function
         * @param {Number} factor The factor to multiply vector components.
         * @returns {OpenSeadragon.Point} A new point representing the multiplication
         *  of the vector components by the factor
         */
        times: function(l) {
          return new a.Point(
            this.x * l,
            this.y * l
          );
        },
        /**
         * Divide this point by a factor and return a new Point.
         * @function
         * @param {Number} factor The factor to divide vector components.
         * @returns {OpenSeadragon.Point} A new point representing the division of the
         *  vector components by the factor
         */
        divide: function(l) {
          return new a.Point(
            this.x / l,
            this.y / l
          );
        },
        /**
         * Compute the opposite of this point and return a new Point.
         * @function
         * @returns {OpenSeadragon.Point} A new point representing the opposite of the
         *  vector components
         */
        negate: function() {
          return new a.Point(-this.x, -this.y);
        },
        /**
         * Compute the distance between this point and another point.
         * @function
         * @param {OpenSeadragon.Point} point The point to compute the distance with.
         * @returns {Number} The distance between the 2 points
         */
        distanceTo: function(l) {
          return Math.sqrt(
            Math.pow(this.x - l.x, 2) + Math.pow(this.y - l.y, 2)
          );
        },
        /**
         * Compute the squared distance between this point and another point.
         * Useful for optimizing things like comparing distances.
         * @function
         * @param {OpenSeadragon.Point} point The point to compute the squared distance with.
         * @returns {Number} The squared distance between the 2 points
         */
        squaredDistanceTo: function(l) {
          return Math.pow(this.x - l.x, 2) + Math.pow(this.y - l.y, 2);
        },
        /**
         * Apply a function to each coordinate of this point and return a new point.
         * @function
         * @param {function} func The function to apply to each coordinate.
         * @returns {OpenSeadragon.Point} A new point with the coordinates computed
         * by the specified function
         */
        apply: function(l) {
          return new a.Point(l(this.x), l(this.y));
        },
        /**
         * Check if this point is equal to another one.
         * @function
         * @param {OpenSeadragon.Point} point The point to compare this point with.
         * @returns {Boolean} true if they are equal, false otherwise.
         */
        equals: function(l) {
          return l instanceof a.Point && this.x === l.x && this.y === l.y;
        },
        /**
         * Rotates the point around the specified pivot
         * From http://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
         * @function
         * @param {Number} degress to rotate around the pivot.
         * @param {OpenSeadragon.Point} [pivot=(0,0)] Point around which to rotate.
         * Defaults to the origin.
         * @returns {OpenSeadragon.Point}. A new point representing the point rotated around the specified pivot
         */
        rotate: function(l, o) {
          o = o || new a.Point(0, 0);
          var r, f;
          if (l % 90 === 0) {
            var d = a.positiveModulo(l, 360);
            switch (d) {
              case 0:
                r = 1, f = 0;
                break;
              case 90:
                r = 0, f = 1;
                break;
              case 180:
                r = -1, f = 0;
                break;
              case 270:
                r = 0, f = -1;
                break;
            }
          } else {
            var h = l * Math.PI / 180;
            r = Math.cos(h), f = Math.sin(h);
          }
          var c = r * (this.x - o.x) - f * (this.y - o.y) + o.x, g = f * (this.x - o.x) + r * (this.y - o.y) + o.y;
          return new a.Point(c, g);
        },
        /**
         * Convert this point to a string in the format (x,y) where x and y are
         * rounded to the nearest integer.
         * @function
         * @returns {String} A string representation of this point.
         */
        toString: function() {
          return "(" + Math.round(this.x * 100) / 100 + "," + Math.round(this.y * 100) / 100 + ")";
        }
      };
    })(K), (function(a) {
      a.TileSource = function(o, r, f, d, h, c) {
        var g = this, p = arguments, T, E;
        if (a.isPlainObject(o) ? T = o : T = {
          width: p[0],
          height: p[1],
          tileSize: p[2],
          tileOverlap: p[3],
          minLevel: p[4],
          maxLevel: p[5]
        }, a.EventSource.call(this), a.extend(!0, this, T), !this.success) {
          for (E = 0; E < arguments.length; E++)
            if (a.isFunction(arguments[E])) {
              this.success = arguments[E];
              break;
            }
        }
        this.success && this.addHandler("ready", function(C) {
          g.success(C);
        }), a.type(arguments[0]) === "string" && (this.url = arguments[0]), this.url ? (this.aspectRatio = 1, this.dimensions = new a.Point(10, 10), this._tileWidth = 0, this._tileHeight = 0, this.tileOverlap = 0, this.minLevel = 0, this.maxLevel = 0, this.ready = !1, this.getImageInfo(this.url)) : (this.ready = !0, this.aspectRatio = T.width && T.height ? T.width / T.height : 1, this.dimensions = new a.Point(T.width, T.height), this.tileSize ? (this._tileWidth = this._tileHeight = this.tileSize, delete this.tileSize) : (this.tileWidth ? (this._tileWidth = this.tileWidth, delete this.tileWidth) : this._tileWidth = 0, this.tileHeight ? (this._tileHeight = this.tileHeight, delete this.tileHeight) : this._tileHeight = 0), this.tileOverlap = T.tileOverlap ? T.tileOverlap : 0, this.minLevel = T.minLevel ? T.minLevel : 0, this.maxLevel = T.maxLevel !== void 0 && T.maxLevel !== null ? T.maxLevel : T.width && T.height ? Math.ceil(
          Math.log(Math.max(T.width, T.height)) / Math.log(2)
        ) : 0, this.success && a.isFunction(this.success) && this.success(this));
      }, a.TileSource.prototype = {
        getTileSize: function(o) {
          return a.console.error(
            "[TileSource.getTileSize] is deprecated. Use TileSource.getTileWidth() and TileSource.getTileHeight() instead"
          ), this._tileWidth;
        },
        /**
         * Return the tileWidth for a given level.
         * Subclasses should override this if tileWidth can be different at different levels
         *   such as in IIIFTileSource.  Code should use this function rather than reading
         *   from ._tileWidth directly.
         * @function
         * @param {Number} level
         */
        getTileWidth: function(o) {
          return this._tileWidth ? this._tileWidth : this.getTileSize(o);
        },
        /**
         * Return the tileHeight for a given level.
         * Subclasses should override this if tileHeight can be different at different levels
         *   such as in IIIFTileSource.  Code should use this function rather than reading
         *   from ._tileHeight directly.
         * @function
         * @param {Number} level
         */
        getTileHeight: function(o) {
          return this._tileHeight ? this._tileHeight : this.getTileSize(o);
        },
        /**
         * Set the maxLevel to the given level, and perform the memoization of
         * getLevelScale with the new maxLevel. This function can be useful if the
         * memoization is required before the first call of getLevelScale, or both
         * memoized getLevelScale and maxLevel should be changed accordingly.
         * @function
         * @param {Number} level
         */
        setMaxLevel: function(o) {
          this.maxLevel = o, this._memoizeLevelScale();
        },
        /**
         * @function
         * @param {Number} level
         */
        getLevelScale: function(o) {
          return this._memoizeLevelScale(), this.getLevelScale(o);
        },
        // private
        _memoizeLevelScale: function() {
          var o = {}, r;
          for (r = 0; r <= this.maxLevel; r++)
            o[r] = 1 / Math.pow(2, this.maxLevel - r);
          this.getLevelScale = function(f) {
            return o[f];
          };
        },
        /**
         * @function
         * @param {Number} level
         */
        getNumTiles: function(o) {
          var r = this.getLevelScale(o), f = Math.ceil(r * this.dimensions.x / this.getTileWidth(o)), d = Math.ceil(r * this.dimensions.y / this.getTileHeight(o));
          return new a.Point(f, d);
        },
        /**
         * @function
         * @param {Number} level
         */
        getPixelRatio: function(o) {
          var r = this.dimensions.times(this.getLevelScale(o)), f = 1 / r.x * a.pixelDensityRatio, d = 1 / r.y * a.pixelDensityRatio;
          return new a.Point(f, d);
        },
        /**
         * @function
         * @returns {Number} The highest level in this tile source that can be contained in a single tile.
         */
        getClosestLevel: function() {
          var o, r;
          for (o = this.minLevel + 1; o <= this.maxLevel && (r = this.getNumTiles(o), !(r.x > 1 || r.y > 1)); o++)
            ;
          return o - 1;
        },
        /**
         * @function
         * @param {Number} level
         * @param {OpenSeadragon.Point} point
         */
        getTileAtPoint: function(o, r) {
          var f = r.x >= 0 && r.x <= 1 && r.y >= 0 && r.y <= 1 / this.aspectRatio;
          a.console.assert(f, "[TileSource.getTileAtPoint] must be called with a valid point.");
          var d = this.dimensions.x * this.getLevelScale(o), h = r.x * d, c = r.y * d, g = Math.floor(h / this.getTileWidth(o)), p = Math.floor(c / this.getTileHeight(o));
          r.x >= 1 && (g = this.getNumTiles(o).x - 1);
          var T = 1e-15;
          return r.y >= 1 / this.aspectRatio - T && (p = this.getNumTiles(o).y - 1), new a.Point(g, p);
        },
        /**
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         * @param {Boolean} [isSource=false] Whether to return the source bounds of the tile.
         * @returns {OpenSeadragon.Rect} Either where this tile fits (in normalized coordinates) or the
         * portion of the tile to use as the source of the drawing operation (in pixels), depending on
         * the isSource parameter.
         */
        getTileBounds: function(o, r, f, d) {
          var h = this.dimensions.times(this.getLevelScale(o)), c = this.getTileWidth(o), g = this.getTileHeight(o), p = r === 0 ? 0 : c * r - this.tileOverlap, T = f === 0 ? 0 : g * f - this.tileOverlap, E = c + (r === 0 ? 1 : 2) * this.tileOverlap, C = g + (f === 0 ? 1 : 2) * this.tileOverlap, b = 1 / h.x;
          return E = Math.min(E, h.x - p), C = Math.min(C, h.y - T), d ? new a.Rect(0, 0, E, C) : new a.Rect(p * b, T * b, E * b, C * b);
        },
        /**
         * Responsible for retrieving, and caching the
         * image metadata pertinent to this TileSources implementation.
         * @function
         * @param {String} url
         * @throws {Error}
         */
        getImageInfo: function(o) {
          var r = this, f, d, h, c, g, p, T;
          o && (g = o.split("/"), p = g[g.length - 1], T = p.lastIndexOf("."), T > -1 && (g[g.length - 1] = p.slice(0, T)));
          var E = null;
          if (this.splitHashDataForPost) {
            var C = o.indexOf("#");
            C !== -1 && (E = o.substring(C + 1), o = o.substr(0, C));
          }
          d = function(b) {
            typeof b == "string" && (b = a.parseXml(b));
            var D = a.TileSource.determineType(r, b, o);
            if (!D) {
              r.raiseEvent("open-failed", { message: "Unable to load TileSource", source: o });
              return;
            }
            c = D.prototype.configure.apply(r, [b, o, E]), c.ajaxWithCredentials === void 0 && (c.ajaxWithCredentials = r.ajaxWithCredentials), h = new D(c), r.ready = !0, r.raiseEvent("ready", { tileSource: h });
          }, o.match(/\.js$/) ? (f = o.split("/").pop().replace(".js", ""), a.jsonp({
            url: o,
            async: !1,
            callbackName: f,
            callback: d
          })) : a.makeAjaxRequest({
            url: o,
            postData: E,
            withCredentials: this.ajaxWithCredentials,
            headers: this.ajaxHeaders,
            success: function(b) {
              var D = l(b);
              d(D);
            },
            error: function(b, D) {
              var z;
              try {
                z = "HTTP " + b.status + " attempting to load TileSource: " + o;
              } catch {
                var G;
                typeof D > "u" || !D.toString ? G = "Unknown error" : G = D.toString(), z = G + " attempting to load TileSource: " + o;
              }
              a.console.error(z), r.raiseEvent("open-failed", {
                message: z,
                source: o,
                postData: E
              });
            }
          });
        },
        /**
         * Responsible for determining if the particular TileSource supports the
         * data format ( and allowed to apply logic against the url the data was
         * loaded from, if any ). Overriding implementations are expected to do
         * something smart with data and / or url to determine support.  Also
         * understand that iteration order of TileSources is not guaranteed so
         * please make sure your data or url is expressive enough to ensure a simple
         * and sufficient mechanism for clear determination.
         * @function
         * @param {String|Object|Array|Document} data
         * @param {String} url - the url the data was loaded
         *      from if any.
         * @returns {Boolean}
         */
        supports: function(o, r) {
          return !1;
        },
        /**
         * Responsible for parsing and configuring the
         * image metadata pertinent to this TileSources implementation.
         * This method is not implemented by this class other than to throw an Error
         * announcing you have to implement it.  Because of the variety of tile
         * server technologies, and various specifications for building image
         * pyramids, this method is here to allow easy integration.
         * @function
         * @param {String|Object|Array|Document} data
         * @param {String} url - the url the data was loaded
         *      from if any.
         * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null value obtained from
         *      the protocol URL after '#' sign if flag splitHashDataForPost set to 'true'
         * @returns {Object} options - A dictionary of keyword arguments sufficient
         *      to configure the tile source constructor (include all values you want to
         *      instantiate the TileSource subclass with - what _options_ object should contain).
         * @throws {Error}
         */
        configure: function(o, r, f) {
          throw new Error("Method not implemented.");
        },
        /**
         * Responsible for retrieving the url which will return an image for the
         * region specified by the given x, y, and level components.
         * This method is not implemented by this class other than to throw an Error
         * announcing you have to implement it.  Because of the variety of tile
         * server technologies, and various specifications for building image
         * pyramids, this method is here to allow easy integration.
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         * @returns {String|Function} url - A string for the url or a function that returns a url string.
         * @throws {Error}
         */
        getTileUrl: function(o, r, f) {
          throw new Error("Method not implemented.");
        },
        /**
         * Must use AJAX in order to work, i.e. loadTilesWithAjax = true is set.
         * If a value is returned, ajax issues POST request to the tile url.
         * If null is returned, ajax issues GET request.
         * The return value must comply to the header 'content type'.
         *
         * Examples (USED HEADER --> getTilePostData CODE):
         * 'Content-type': 'application/x-www-form-urlencoded' -->
         *   return "key1=value=1&key2=value2";
         *
         * 'Content-type': 'application/x-www-form-urlencoded' -->
         *   return JSON.stringify({key: "value", number: 5});
         *
         * 'Content-type': 'multipart/form-data' -->
         *   let result = new FormData();
         *   result.append("data", myData);
         *   return result;
         *
         * IMPORTANT: in case you move all the logic on image fetching
         * to post data, you must re-define 'getTileHashKey(...)' to
         * stay unique for different tile images.
         *
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         * @returns {*|null} post data to send with tile configuration request
         */
        getTilePostData: function(o, r, f) {
          return null;
        },
        /**
         * Responsible for retrieving the headers which will be attached to the image request for the
         * region specified by the given x, y, and level components.
         * This option is only relevant if {@link OpenSeadragon.Options}.loadTilesWithAjax is set to true.
         * The headers returned here will override headers specified at the Viewer or TiledImage level.
         * Specifying a falsy value for a header will clear its existing value set at the Viewer or
         * TiledImage level (if any).
         *
         * Note that the headers of existing tiles don't automatically change when this function
         * returns updated headers. To do that, you need to call {@link OpenSeadragon.Viewer#setAjaxHeaders}
         * and propagate the changes.
         *
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         * @returns {Object}
         */
        getTileAjaxHeaders: function(o, r, f) {
          return {};
        },
        /**
         * The tile cache object is uniquely determined by this key and used to lookup
         * the image data in cache: keys should be different if images are different.
         *
         * In case a tile has context2D property defined (TileSource.prototype.getContext2D)
         * or its context2D is set manually; the cache is not used and this function
         * is irrelevant.
         * Note: default behaviour does not take into account post data.
         * @param {Number} level tile level it was fetched with
         * @param {Number} x x-coordinate in the pyramid level
         * @param {Number} y y-coordinate in the pyramid level
         * @param {String} url the tile was fetched with
         * @param {Object} ajaxHeaders the tile was fetched with
         * @param {*} postData data the tile was fetched with (type depends on getTilePostData(..) return type)
         */
        getTileHashKey: function(o, r, f, d, h, c) {
          function g(p) {
            return h ? p + "+" + JSON.stringify(h) : p;
          }
          return g(typeof d != "string" ? o + "/" + r + "_" + f : d);
        },
        /**
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         */
        tileExists: function(o, r, f) {
          var d = this.getNumTiles(o);
          return o >= this.minLevel && o <= this.maxLevel && r >= 0 && f >= 0 && r < d.x && f < d.y;
        },
        /**
         * Decide whether tiles have transparency: this is crucial for correct images blending.
         * @returns {boolean} true if the image has transparency
         */
        hasTransparency: function(o, r, f, d) {
          return !!o || r.match(".png");
        },
        /**
         * Download tile data.
         * Note that if you override this function, you should override also downloadTileAbort().
         * @param {ImageJob} context job context that you have to call finish(...) on.
         * @param {String} [context.src] - URL of image to download.
         * @param {String} [context.loadWithAjax] - Whether to load this image with AJAX.
         * @param {String} [context.ajaxHeaders] - Headers to add to the image request if using AJAX.
         * @param {Boolean} [context.ajaxWithCredentials] - Whether to set withCredentials on AJAX requests.
         * @param {String} [context.crossOriginPolicy] - CORS policy to use for downloads
         * @param {String} [context.postData] - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
         *   see TileSource::getPostData) or null
         * @param {*} [context.userData] - Empty object to attach your own data and helper variables to.
         * @param {Function} [context.finish] - Should be called unless abort() was executed, e.g. on all occasions,
         *   be it successful or unsuccessful request.
         *   Usage: context.finish(data, request, errMessage). Pass the downloaded data object or null upon failure.
         *   Add also reference to an ajax request if used. Provide error message in case of failure.
         * @param {Function} [context.abort] - Called automatically when the job times out.
         *   Usage: context.abort().
         * @param {Function} [context.callback] @private - Called automatically once image has been downloaded
         *   (triggered by finish).
         * @param {Number} [context.timeout] @private - The max number of milliseconds that
         *   this image job may take to complete.
         * @param {string} [context.errorMsg] @private - The final error message, default null (set by finish).
         */
        downloadTileStart: function(o) {
          var r = o.userData, f = new Image();
          r.image = f, r.request = null;
          var d = function(h) {
            if (!f) {
              o.finish(null, r.request, "Image load failed: undefined Image instance.");
              return;
            }
            f.onload = f.onerror = f.onabort = null, o.finish(h ? null : f, r.request, h);
          };
          f.onload = function() {
            d();
          }, f.onabort = f.onerror = function() {
            d("Image load aborted.");
          }, o.loadWithAjax ? r.request = a.makeAjaxRequest({
            url: o.src,
            withCredentials: o.ajaxWithCredentials,
            headers: o.ajaxHeaders,
            responseType: "arraybuffer",
            postData: o.postData,
            success: function(h) {
              var c;
              try {
                c = new window.Blob([h.response]);
              } catch (T) {
                var g = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                if (T.name === "TypeError" && g) {
                  var p = new g();
                  p.append(h.response), c = p.getBlob();
                }
              }
              c.size === 0 ? d("Empty image response.") : f.src = (window.URL || window.webkitURL).createObjectURL(c);
            },
            error: function(h) {
              d("Image load aborted - XHR error");
            }
          }) : (o.crossOriginPolicy !== !1 && (f.crossOrigin = o.crossOriginPolicy), f.src = o.src);
        },
        /**
         * Provide means of aborting the execution.
         * Note that if you override this function, you should override also downloadTileStart().
         * @param {ImageJob} context job, the same object as with downloadTileStart(..)
         * @param {*} [context.userData] - Empty object to attach (and mainly read) your own data.
         */
        downloadTileAbort: function(o) {
          o.userData.request && o.userData.request.abort();
          var r = o.userData.image;
          o.userData.image && (r.onload = r.onerror = r.onabort = null);
        },
        /**
         * Create cache object from the result of the download process. The
         * cacheObject parameter should be used to attach the data to, there are no
         * conventions on how it should be stored - all the logic is implemented within *TileCache() functions.
         *
         * Note that if you override any of *TileCache() functions, you should override all of them.
         * @param {object} cacheObject context cache object
         * @param {*} data image data, the data sent to ImageJob.prototype.finish(), by default an Image object
         * @param {Tile} tile instance the cache was created with
         */
        createTileCache: function(o, r, f) {
          o._data = r;
        },
        /**
         * Cache object destructor, unset all properties you created to allow GC collection.
         * Note that if you override any of *TileCache() functions, you should override all of them.
         * @param {object} cacheObject context cache object
         */
        destroyTileCache: function(o) {
          o._data = null, o._renderedContext = null;
        },
        /**
         * Raw data getter
         * Note that if you override any of *TileCache() functions, you should override all of them.
         * @param {object} cacheObject context cache object
         * @returns {*} cache data
         */
        getTileCacheData: function(o) {
          return o._data;
        },
        /**
         * Compatibility image element getter
         *  - plugins might need image representation of the data
         *  - div HTML rendering relies on image element presence
         * Note that if you override any of *TileCache() functions, you should override all of them.
         *  @param {object} cacheObject context cache object
         *  @returns {Image} cache data as an Image
         */
        getTileCacheDataAsImage: function(o) {
          return o._data;
        },
        /**
         * Compatibility context 2D getter
         *  - most heavily used rendering method is a canvas-based approach,
         *    convert the data to a canvas and return it's 2D context
         * Note that if you override any of *TileCache() functions, you should override all of them.
         * @param {object} cacheObject context cache object
         * @returns {CanvasRenderingContext2D} context of the canvas representation of the cache data
         */
        getTileCacheDataAsContext2D: function(o) {
          if (!o._renderedContext) {
            var r = document.createElement("canvas");
            r.width = o._data.width, r.height = o._data.height, o._renderedContext = r.getContext("2d"), o._renderedContext.drawImage(o._data, 0, 0), o._data = null;
          }
          return o._renderedContext;
        }
      }, a.extend(!0, a.TileSource.prototype, a.EventSource.prototype);
      function l(o) {
        var r = o.responseText, f = o.status, d, h;
        if (o) {
          if (o.status !== 200 && o.status !== 0)
            throw f = o.status, d = f === 404 ? "Not Found" : o.statusText, new Error(a.getString("Errors.Status", f, d));
        } else throw new Error(a.getString("Errors.Security"));
        if (r.match(/^\s*<.*/))
          try {
            h = o.responseXML && o.responseXML.documentElement ? o.responseXML : a.parseXml(r);
          } catch {
            h = o.responseText;
          }
        else if (r.match(/\s*[{[].*/))
          try {
            h = a.parseJSON(r);
          } catch {
            h = r;
          }
        else
          h = r;
        return h;
      }
      a.TileSource.determineType = function(o, r, f) {
        var d;
        for (d in K)
          if (d.match(/.+TileSource$/) && a.isFunction(K[d]) && a.isFunction(K[d].prototype.supports) && K[d].prototype.supports.call(o, r, f))
            return K[d];
        return a.console.error("No TileSource was able to open %s %s", f, r), null;
      };
    })(K), (function(a) {
      a.DziTileSource = function(r, f, d, h, c, g, p, T, E) {
        var C, b, D, z;
        if (a.isPlainObject(r) ? z = r : z = {
          width: arguments[0],
          height: arguments[1],
          tileSize: arguments[2],
          tileOverlap: arguments[3],
          tilesUrl: arguments[4],
          fileFormat: arguments[5],
          displayRects: arguments[6],
          minLevel: arguments[7],
          maxLevel: arguments[8]
        }, this._levelRects = {}, this.tilesUrl = z.tilesUrl, this.fileFormat = z.fileFormat, this.displayRects = z.displayRects, this.displayRects)
          for (C = this.displayRects.length - 1; C >= 0; C--)
            for (b = this.displayRects[C], D = b.minLevel; D <= b.maxLevel; D++)
              this._levelRects[D] || (this._levelRects[D] = []), this._levelRects[D].push(b);
        a.TileSource.apply(this, [z]);
      }, a.extend(
        a.DziTileSource.prototype,
        a.TileSource.prototype,
        /** @lends OpenSeadragon.DziTileSource.prototype */
        {
          /**
           * Determine if the data and/or url imply the image service is supported by
           * this tile source.
           * @function
           * @param {Object|Array} data
           * @param {String} optional - url
           */
          supports: function(r, f) {
            var d;
            return r.Image ? d = r.Image.xmlns : r.documentElement && (r.documentElement.localName === "Image" || r.documentElement.tagName === "Image") && (d = r.documentElement.namespaceURI), d = (d || "").toLowerCase(), d.indexOf("schemas.microsoft.com/deepzoom/2008") !== -1 || d.indexOf("schemas.microsoft.com/deepzoom/2009") !== -1;
          },
          /**
           *
           * @function
           * @param {Object|XMLDocument} data - the raw configuration
           * @param {String} url - the url the data was retrieved from if any.
           * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
           * @returns {Object} options - A dictionary of keyword arguments sufficient
           *      to configure this tile sources constructor.
           */
          configure: function(r, f, d) {
            var h;
            return a.isPlainObject(r) ? h = o(this, r) : h = l(this, r), f && !h.tilesUrl && (h.tilesUrl = f.replace(
              /([^/]+?)(\.(dzi|xml|js)?(\?[^/]*)?)?\/?$/,
              "$1_files/"
            ), f.search(/\.(dzi|xml|js)\?/) !== -1 ? h.queryParams = f.match(/\?.*/) : h.queryParams = ""), h;
          },
          /**
           * @function
           * @param {Number} level
           * @param {Number} x
           * @param {Number} y
           */
          getTileUrl: function(r, f, d) {
            return [this.tilesUrl, r, "/", f, "_", d, ".", this.fileFormat, this.queryParams].join("");
          },
          /**
           * @function
           * @param {Number} level
           * @param {Number} x
           * @param {Number} y
           */
          tileExists: function(r, f, d) {
            var h = this._levelRects[r], c, g, p, T, E, C, b;
            if (this.minLevel && r < this.minLevel || this.maxLevel && r > this.maxLevel)
              return !1;
            if (!h || !h.length)
              return !0;
            for (b = h.length - 1; b >= 0; b--)
              if (c = h[b], !(r < c.minLevel || r > c.maxLevel) && (g = this.getLevelScale(r), p = c.x * g, T = c.y * g, E = p + c.width * g, C = T + c.height * g, p = Math.floor(p / this._tileWidth), T = Math.floor(T / this._tileWidth), E = Math.ceil(E / this._tileWidth), C = Math.ceil(C / this._tileWidth), p <= f && f < E && T <= d && d < C))
                return !0;
            return !1;
          }
        }
      );
      function l(r, f) {
        if (!f || !f.documentElement)
          throw new Error(a.getString("Errors.Xml"));
        var d = f.documentElement, h = d.localName || d.tagName, c = f.documentElement.namespaceURI, g = null, p = [], T, E, C, b, D;
        if (h === "Image")
          try {
            if (b = d.getElementsByTagName("Size")[0], b === void 0 && (b = d.getElementsByTagNameNS(c, "Size")[0]), g = {
              Image: {
                xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                Url: d.getAttribute("Url"),
                Format: d.getAttribute("Format"),
                DisplayRect: null,
                Overlap: parseInt(d.getAttribute("Overlap"), 10),
                TileSize: parseInt(d.getAttribute("TileSize"), 10),
                Size: {
                  Height: parseInt(b.getAttribute("Height"), 10),
                  Width: parseInt(b.getAttribute("Width"), 10)
                }
              }
            }, !a.imageFormatSupported(g.Image.Format))
              throw new Error(
                a.getString("Errors.ImageFormat", g.Image.Format.toUpperCase())
              );
            for (T = d.getElementsByTagName("DisplayRect"), T === void 0 && (T = d.getElementsByTagNameNS(c, "DisplayRect")[0]), D = 0; D < T.length; D++)
              E = T[D], C = E.getElementsByTagName("Rect")[0], C === void 0 && (C = E.getElementsByTagNameNS(c, "Rect")[0]), p.push({
                Rect: {
                  X: parseInt(C.getAttribute("X"), 10),
                  Y: parseInt(C.getAttribute("Y"), 10),
                  Width: parseInt(C.getAttribute("Width"), 10),
                  Height: parseInt(C.getAttribute("Height"), 10),
                  MinLevel: parseInt(E.getAttribute("MinLevel"), 10),
                  MaxLevel: parseInt(E.getAttribute("MaxLevel"), 10)
                }
              });
            return p.length && (g.Image.DisplayRect = p), o(r, g);
          } catch (V) {
            throw V instanceof Error ? V : new Error(a.getString("Errors.Dzi"));
          }
        else {
          if (h === "Collection")
            throw new Error(a.getString("Errors.Dzc"));
          if (h === "Error") {
            var z = d.getElementsByTagName("Message")[0], G = z.firstChild.nodeValue;
            throw new Error(G);
          }
        }
        throw new Error(a.getString("Errors.Dzi"));
      }
      function o(r, f) {
        var d = f.Image, h = d.Url, c = d.Format, g = d.Size, p = d.DisplayRect || [], T = parseInt(g.Width, 10), E = parseInt(g.Height, 10), C = parseInt(d.TileSize, 10), b = parseInt(d.Overlap, 10), D = [], z, G;
        for (G = 0; G < p.length; G++)
          z = p[G].Rect, D.push(new a.DisplayRect(
            parseInt(z.X, 10),
            parseInt(z.Y, 10),
            parseInt(z.Width, 10),
            parseInt(z.Height, 10),
            parseInt(z.MinLevel, 10),
            parseInt(z.MaxLevel, 10)
          ));
        return a.extend(!0, {
          width: T,
          /* width *required */
          height: E,
          /* height *required */
          tileSize: C,
          /* tileSize *required */
          tileOverlap: b,
          /* tileOverlap *required */
          minLevel: null,
          /* minLevel */
          maxLevel: null,
          /* maxLevel */
          tilesUrl: h,
          /* tilesUrl */
          fileFormat: c,
          /* fileFormat */
          displayRects: D
          /* displayRects */
        }, f);
      }
    })(K), (function(a) {
      a.IIIFTileSource = function(d) {
        if (a.extend(!0, this, d), this._id = this["@id"] || this.id || this.identifier || null, !(this.height && this.width && this._id))
          throw new Error("IIIF required parameters (width, height, or id) not provided.");
        if (d.tileSizePerScaleFactor = {}, this.tileFormat = this.tileFormat || "jpg", this.version = d.version, this.tile_width && this.tile_height)
          d.tileWidth = this.tile_width, d.tileHeight = this.tile_height;
        else if (this.tile_width)
          d.tileSize = this.tile_width;
        else if (this.tile_height)
          d.tileSize = this.tile_height;
        else if (this.tiles)
          if (this.tiles.length === 1)
            d.tileWidth = this.tiles[0].width, d.tileHeight = this.tiles[0].height || this.tiles[0].width, this.scale_factors = this.tiles[0].scaleFactors;
          else {
            this.scale_factors = [];
            for (var h = 0; h < this.tiles.length; h++)
              for (var c = 0; c < this.tiles[h].scaleFactors.length; c++) {
                var g = this.tiles[h].scaleFactors[c];
                this.scale_factors.push(g), d.tileSizePerScaleFactor[g] = {
                  width: this.tiles[h].width,
                  height: this.tiles[h].height || this.tiles[h].width
                };
              }
          }
        else if (l(d)) {
          for (var p = Math.min(this.height, this.width), T = [256, 512, 1024], E = [], C = 0; C < T.length; C++)
            T[C] <= p && E.push(T[C]);
          E.length > 0 ? d.tileSize = Math.max.apply(null, E) : d.tileSize = p;
        } else this.sizes && this.sizes.length > 0 ? (this.emulateLegacyImagePyramid = !0, d.levels = o(this), a.extend(!0, d, {
          width: d.levels[d.levels.length - 1].width,
          height: d.levels[d.levels.length - 1].height,
          tileSize: Math.max(d.height, d.width),
          tileOverlap: 0,
          minLevel: 0,
          maxLevel: d.levels.length - 1
        }), this.levels = d.levels) : a.console.error("Nothing in the info.json to construct image pyramids from");
        if (!d.maxLevel && !this.emulateLegacyImagePyramid)
          if (!this.scale_factors)
            d.maxLevel = Number(Math.round(Math.log(Math.max(this.width, this.height), 2)));
          else {
            var b = Math.max.apply(null, this.scale_factors);
            d.maxLevel = Math.round(Math.log(b) * Math.LOG2E);
          }
        if (this.sizes) {
          var D = this.sizes.length;
          (D === d.maxLevel || D === d.maxLevel + 1) && (this.levelSizes = this.sizes.slice().sort((z, G) => z.width - G.width), D === d.maxLevel && this.levelSizes.push({ width: this.width, height: this.height }));
        }
        a.TileSource.apply(this, [d]);
      }, a.extend(
        a.IIIFTileSource.prototype,
        a.TileSource.prototype,
        /** @lends OpenSeadragon.IIIFTileSource.prototype */
        {
          /**
           * Determine if the data and/or url imply the image service is supported by
           * this tile source.
           * @function
           * @param {Object|Array} data
           * @param {String} [url] - url
           */
          supports: function(d, h) {
            return d.protocol && d.protocol === "http://iiif.io/api/image" || d["@context"] && (d["@context"] === "http://library.stanford.edu/iiif/image-api/1.1/context.json" || d["@context"] === "http://iiif.io/api/image/1/context.json") || d.profile && d.profile.indexOf("http://library.stanford.edu/iiif/image-api/compliance.html") === 0 || d.identifier && d.width && d.height ? !0 : !!(d.documentElement && d.documentElement.tagName === "info" && d.documentElement.namespaceURI === "http://library.stanford.edu/iiif/image-api/ns/");
          },
          /**
           * A static function used to prepare an incoming IIIF Image API info.json
           * response for processing by the tile handler. Normalizes data for all
           * versions of IIIF (1.0, 1.1, 2.x, 3.x) and returns a data object that
           * may be passed to the IIIFTileSource.
           *
           * @function
           * @static
           * @param {Object} data - the raw configuration
           * @param {String} url - the url configuration was retrieved from
           * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
           * @returns {Object} A normalized IIIF data object
           * @example <caption>IIIF 2.x Info Looks like this</caption>
           * {
           * "@context": "http://iiif.io/api/image/2/context.json",
           * "@id": "http://iiif.example.com/prefix/1E34750D-38DB-4825-A38A-B60A345E591C",
           * "protocol": "http://iiif.io/api/image",
           * "height": 1024,
           * "width": 775,
           * "tiles" : [{"width":256, "scaleFactors":[1,2,4,8]}],
           *  "profile": ["http://iiif.io/api/image/2/level1.json", {
           *    "qualities": [ "native", "bitonal", "grey", "color" ],
           *    "formats": [ "jpg", "png", "gif" ]
           *   }]
           * }
           */
          configure: function(d, h, c) {
            if (a.isPlainObject(d)) {
              if (!d["@context"])
                d["@context"] = "http://iiif.io/api/image/1.0/context.json", d["@id"] = h.replace("/info.json", ""), d.version = 1;
              else {
                var p = d["@context"];
                if (Array.isArray(p)) {
                  for (var T = 0; T < p.length; T++)
                    if (typeof p[T] == "string" && (/^http:\/\/iiif\.io\/api\/image\/[1-3]\/context\.json$/.test(p[T]) || p[T] === "http://library.stanford.edu/iiif/image-api/1.1/context.json")) {
                      p = p[T];
                      break;
                    }
                }
                switch (p) {
                  case "http://iiif.io/api/image/1/context.json":
                  case "http://library.stanford.edu/iiif/image-api/1.1/context.json":
                    d.version = 1;
                    break;
                  case "http://iiif.io/api/image/2/context.json":
                    d.version = 2;
                    break;
                  case "http://iiif.io/api/image/3/context.json":
                    d.version = 3;
                    break;
                  default:
                    a.console.error("Data has a @context property which contains no known IIIF context URI.");
                }
              }
              if (d.preferredFormats) {
                for (var E = 0; E < d.preferredFormats.length; E++)
                  if (K.imageFormatSupported(d.preferredFormats[E])) {
                    d.tileFormat = d.preferredFormats[E];
                    break;
                  }
              }
              return d;
            } else {
              var g = r(d);
              return g["@context"] = "http://iiif.io/api/image/1.0/context.json", g["@id"] = h.replace("/info.xml", ""), g.version = 1, g;
            }
          },
          /**
           * Return the tileWidth for the given level.
           * @function
           * @param {Number} level
           */
          getTileWidth: function(d) {
            if (this.emulateLegacyImagePyramid)
              return a.TileSource.prototype.getTileWidth.call(this, d);
            var h = Math.pow(2, this.maxLevel - d);
            return this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[h] ? this.tileSizePerScaleFactor[h].width : this._tileWidth;
          },
          /**
           * Return the tileHeight for the given level.
           * @function
           * @param {Number} level
           */
          getTileHeight: function(d) {
            if (this.emulateLegacyImagePyramid)
              return a.TileSource.prototype.getTileHeight.call(this, d);
            var h = Math.pow(2, this.maxLevel - d);
            return this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[h] ? this.tileSizePerScaleFactor[h].height : this._tileHeight;
          },
          /**
           * @function
           * @param {Number} level
           */
          getLevelScale: function(d) {
            if (this.emulateLegacyImagePyramid) {
              var h = NaN;
              return this.levels.length > 0 && d >= this.minLevel && d <= this.maxLevel && (h = this.levels[d].width / this.levels[this.maxLevel].width), h;
            }
            return a.TileSource.prototype.getLevelScale.call(this, d);
          },
          /**
           * @function
           * @param {Number} level
           */
          getNumTiles: function(d) {
            if (this.emulateLegacyImagePyramid) {
              var h = this.getLevelScale(d);
              return h ? new a.Point(1, 1) : new a.Point(0, 0);
            }
            if (this.levelSizes) {
              var c = this.levelSizes[d], g = Math.ceil(c.width / this.getTileWidth(d)), p = Math.ceil(c.height / this.getTileHeight(d));
              return new a.Point(g, p);
            } else
              return a.TileSource.prototype.getNumTiles.call(this, d);
          },
          /**
           * @function
           * @param {Number} level
           * @param {OpenSeadragon.Point} point
           */
          getTileAtPoint: function(d, h) {
            if (this.emulateLegacyImagePyramid)
              return new a.Point(0, 0);
            if (this.levelSizes) {
              var c = h.x >= 0 && h.x <= 1 && h.y >= 0 && h.y <= 1 / this.aspectRatio;
              a.console.assert(c, "[TileSource.getTileAtPoint] must be called with a valid point.");
              var g = this.levelSizes[d].width, p = h.x * g, T = h.y * g, E = Math.floor(p / this.getTileWidth(d)), C = Math.floor(T / this.getTileHeight(d));
              h.x >= 1 && (E = this.getNumTiles(d).x - 1);
              var b = 1e-15;
              return h.y >= 1 / this.aspectRatio - b && (C = this.getNumTiles(d).y - 1), new a.Point(E, C);
            }
            return a.TileSource.prototype.getTileAtPoint.call(this, d, h);
          },
          /**
           * Responsible for retrieving the url which will return an image for the
           * region specified by the given x, y, and level components.
           * @function
           * @param {Number} level - z index
           * @param {Number} x
           * @param {Number} y
           * @throws {Error}
           */
          getTileUrl: function(d, h, c) {
            if (this.emulateLegacyImagePyramid) {
              var g = null;
              return this.levels.length > 0 && d >= this.minLevel && d <= this.maxLevel && (g = this.levels[d].url), g;
            }
            var p = "0", T = Math.pow(0.5, this.maxLevel - d), E, C, b, D, z, G, V, de, ne, me, ie, Te, be, qe, Oe, ge;
            return this.levelSizes ? (E = this.levelSizes[d].width, C = this.levelSizes[d].height) : (E = Math.ceil(this.width * T), C = Math.ceil(this.height * T)), b = this.getTileWidth(d), D = this.getTileHeight(d), z = Math.round(b / T), G = Math.round(D / T), this.version === 1 ? Oe = "native." + this.tileFormat : Oe = "default." + this.tileFormat, E < b && C < D ? (this.version === 2 && E === this.width ? Te = "full" : this.version === 3 && E === this.width && C === this.height ? Te = "max" : this.version === 3 ? Te = E + "," + C : Te = E + ",", V = "full") : (de = h * z, ne = c * G, me = Math.min(z, this.width - de), ie = Math.min(G, this.height - ne), h === 0 && c === 0 && me === this.width && ie === this.height ? V = "full" : V = [de, ne, me, ie].join(","), be = Math.min(b, E - h * b), qe = Math.min(D, C - c * D), this.version === 2 && be === this.width ? Te = "full" : this.version === 3 && be === this.width && qe === this.height ? Te = "max" : this.version === 3 ? Te = be + "," + qe : Te = be + ","), ge = [this._id, V, Te, p, Oe].join("/"), ge;
          },
          __testonly__: {
            canBeTiled: l,
            constructLevels: o
          }
        }
      );
      function l(d) {
        var h = [
          "http://library.stanford.edu/iiif/image-api/compliance.html#level0",
          "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0",
          "http://iiif.io/api/image/2/level0.json",
          "level0",
          "https://iiif.io/api/image/3/level0.json"
        ], c = Array.isArray(d.profile) ? d.profile[0] : d.profile, g = h.indexOf(c) !== -1, p = !1;
        return d.version === 2 && d.profile.length > 1 && d.profile[1].supports && (p = d.profile[1].supports.indexOf("sizeByW") !== -1), d.version === 3 && d.extraFeatures && (p = d.extraFeatures.indexOf("sizeByWh") !== -1), !g || p;
      }
      function o(d) {
        for (var h = [], c = 0; c < d.sizes.length; c++)
          h.push({
            url: d._id + "/full/" + d.sizes[c].width + "," + (d.version === 3 ? d.sizes[c].height : "") + "/0/default." + d.tileFormat,
            width: d.sizes[c].width,
            height: d.sizes[c].height
          });
        return h.sort(function(g, p) {
          return g.width - p.width;
        });
      }
      function r(d) {
        if (!d || !d.documentElement)
          throw new Error(a.getString("Errors.Xml"));
        var h = d.documentElement, c = h.tagName, g = null;
        if (c === "info")
          try {
            return g = {}, f(h, g), g;
          } catch (p) {
            throw p instanceof Error ? p : new Error(a.getString("Errors.IIIF"));
          }
        throw new Error(a.getString("Errors.IIIF"));
      }
      function f(d, h, c) {
        var g, p;
        if (d.nodeType === 3 && c)
          p = d.nodeValue.trim(), p.match(/^\d*$/) && (p = Number(p)), h[c] ? (a.isArray(h[c]) || (h[c] = [h[c]]), h[c].push(p)) : h[c] = p;
        else if (d.nodeType === 1)
          for (g = 0; g < d.childNodes.length; g++)
            f(d.childNodes[g], h, d.nodeName);
      }
    })(K), (function(a) {
      a.OsmTileSource = function(l, o, r, f, d) {
        var h;
        a.isPlainObject(l) ? h = l : h = {
          width: arguments[0],
          height: arguments[1],
          tileSize: arguments[2],
          tileOverlap: arguments[3],
          tilesUrl: arguments[4]
        }, (!h.width || !h.height) && (h.width = 65572864, h.height = 65572864), h.tileSize || (h.tileSize = 256, h.tileOverlap = 0), h.tilesUrl || (h.tilesUrl = "http://tile.openstreetmap.org/"), h.minLevel = 8, a.TileSource.apply(this, [h]);
      }, a.extend(
        a.OsmTileSource.prototype,
        a.TileSource.prototype,
        /** @lends OpenSeadragon.OsmTileSource.prototype */
        {
          /**
           * Determine if the data and/or url imply the image service is supported by
           * this tile source.
           * @function
           * @param {Object|Array} data
           * @param {String} optional - url
           */
          supports: function(l, o) {
            return l.type && l.type === "openstreetmaps";
          },
          /**
           *
           * @function
           * @param {Object} data - the raw configuration
           * @param {String} url - the url the data was retrieved from if any.
           * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
           * @returns {Object} options - A dictionary of keyword arguments sufficient
           *      to configure this tile sources constructor.
           */
          configure: function(l, o, r) {
            return l;
          },
          /**
           * @function
           * @param {Number} level
           * @param {Number} x
           * @param {Number} y
           */
          getTileUrl: function(l, o, r) {
            return this.tilesUrl + (l - 8) + "/" + o + "/" + r + ".png";
          }
        }
      );
    })(K), (function(a) {
      a.TmsTileSource = function(l, o, r, f, d) {
        var h;
        a.isPlainObject(l) ? h = l : h = {
          width: arguments[0],
          height: arguments[1],
          tileSize: arguments[2],
          tileOverlap: arguments[3],
          tilesUrl: arguments[4]
        };
        var c = Math.ceil(h.width / 256) * 256, g = Math.ceil(h.height / 256) * 256, p;
        c > g ? p = c / 256 : p = g / 256, h.maxLevel = Math.ceil(Math.log(p) / Math.log(2)) - 1, h.tileSize = 256, h.width = c, h.height = g, a.TileSource.apply(this, [h]);
      }, a.extend(
        a.TmsTileSource.prototype,
        a.TileSource.prototype,
        /** @lends OpenSeadragon.TmsTileSource.prototype */
        {
          /**
           * Determine if the data and/or url imply the image service is supported by
           * this tile source.
           * @function
           * @param {Object|Array} data
           * @param {String} optional - url
           */
          supports: function(l, o) {
            return l.type && l.type === "tiledmapservice";
          },
          /**
           *
           * @function
           * @param {Object} data - the raw configuration
           * @param {String} url - the url the data was retrieved from if any.
           * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
           * @returns {Object} options - A dictionary of keyword arguments sufficient
           *      to configure this tile sources constructor.
           */
          configure: function(l, o, r) {
            return l;
          },
          /**
           * @function
           * @param {Number} level
           * @param {Number} x
           * @param {Number} y
           */
          getTileUrl: function(l, o, r) {
            var f = this.getNumTiles(l).y - 1;
            return this.tilesUrl + l + "/" + o + "/" + (f - r) + ".png";
          }
        }
      );
    })(K), (function(a) {
      a.ZoomifyTileSource = function(l) {
        typeof l.tileSize > "u" && (l.tileSize = 256), typeof l.fileFormat > "u" && (l.fileFormat = "jpg", this.fileFormat = l.fileFormat);
        var o = {
          x: l.width,
          y: l.height
        };
        for (l.imageSizes = [{
          x: l.width,
          y: l.height
        }], l.gridSize = [this._getGridSize(l.width, l.height, l.tileSize)]; parseInt(o.x, 10) > l.tileSize || parseInt(o.y, 10) > l.tileSize; )
          o.x = Math.floor(o.x / 2), o.y = Math.floor(o.y / 2), l.imageSizes.push({
            x: o.x,
            y: o.y
          }), l.gridSize.push(this._getGridSize(o.x, o.y, l.tileSize));
        l.imageSizes.reverse(), l.gridSize.reverse(), l.minLevel = 0, l.maxLevel = l.gridSize.length - 1, K.TileSource.apply(this, [l]);
      }, a.extend(
        a.ZoomifyTileSource.prototype,
        a.TileSource.prototype,
        /** @lends OpenSeadragon.ZoomifyTileSource.prototype */
        {
          //private
          _getGridSize: function(l, o, r) {
            return {
              x: Math.ceil(l / r),
              y: Math.ceil(o / r)
            };
          },
          //private
          _calculateAbsoluteTileNumber: function(l, o, r) {
            for (var f = 0, d = {}, h = 0; h < l; h++)
              d = this.gridSize[h], f += d.x * d.y;
            return d = this.gridSize[l], f += d.x * r + o, f;
          },
          /**
           * Determine if the data and/or url imply the image service is supported by
           * this tile source.
           * @function
           * @param {Object|Array} data
           * @param {String} optional - url
           */
          supports: function(l, o) {
            return l.type && l.type === "zoomifytileservice";
          },
          /**
           *
           * @function
           * @param {Object} data - the raw configuration
           * @param {String} url - the url the data was retrieved from if any.
           * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
           * @returns {Object} options - A dictionary of keyword arguments sufficient
           *      to configure this tile sources constructor.
           */
          configure: function(l, o, r) {
            return l;
          },
          /**
           * @function
           * @param {Number} level
           * @param {Number} x
           * @param {Number} y
           */
          getTileUrl: function(l, o, r) {
            var f = 0, d = this._calculateAbsoluteTileNumber(l, o, r);
            return f = Math.floor(d / 256), this.tilesUrl + "TileGroup" + f + "/" + l + "-" + o + "-" + r + "." + this.fileFormat;
          }
        }
      );
    })(K), (function(a) {
      a.LegacyTileSource = function(f) {
        var d, h, c;
        a.isArray(f) && (d = {
          type: "legacy-image-pyramid",
          levels: f
        }), d.levels = l(d.levels), d.levels.length > 0 ? (h = d.levels[d.levels.length - 1].width, c = d.levels[d.levels.length - 1].height) : (h = 0, c = 0, a.console.error("No supported image formats found")), a.extend(!0, d, {
          width: h,
          height: c,
          tileSize: Math.max(c, h),
          tileOverlap: 0,
          minLevel: 0,
          maxLevel: d.levels.length > 0 ? d.levels.length - 1 : 0
        }), a.TileSource.apply(this, [d]), this.levels = d.levels;
      }, a.extend(
        a.LegacyTileSource.prototype,
        a.TileSource.prototype,
        /** @lends OpenSeadragon.LegacyTileSource.prototype */
        {
          /**
           * Determine if the data and/or url imply the image service is supported by
           * this tile source.
           * @function
           * @param {Object|Array} data
           * @param {String} optional - url
           */
          supports: function(f, d) {
            return f.type && f.type === "legacy-image-pyramid" || f.documentElement && f.documentElement.getAttribute("type") === "legacy-image-pyramid";
          },
          /**
           *
           * @function
           * @param {Object|XMLDocument} configuration - the raw configuration
           * @param {String} dataUrl - the url the data was retrieved from if any.
           * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
           * @returns {Object} options - A dictionary of keyword arguments sufficient
           *      to configure this tile sources constructor.
           */
          configure: function(f, d, h) {
            var c;
            return a.isPlainObject(f) ? c = r(this, f) : c = o(this, f), c;
          },
          /**
           * @function
           * @param {Number} level
           */
          getLevelScale: function(f) {
            var d = NaN;
            return this.levels.length > 0 && f >= this.minLevel && f <= this.maxLevel && (d = this.levels[f].width / this.levels[this.maxLevel].width), d;
          },
          /**
           * @function
           * @param {Number} level
           */
          getNumTiles: function(f) {
            var d = this.getLevelScale(f);
            return d ? new a.Point(1, 1) : new a.Point(0, 0);
          },
          /**
           * This method is not implemented by this class other than to throw an Error
           * announcing you have to implement it.  Because of the variety of tile
           * server technologies, and various specifications for building image
           * pyramids, this method is here to allow easy integration.
           * @function
           * @param {Number} level
           * @param {Number} x
           * @param {Number} y
           * @throws {Error}
           */
          getTileUrl: function(f, d, h) {
            var c = null;
            return this.levels.length > 0 && f >= this.minLevel && f <= this.maxLevel && (c = this.levels[f].url), c;
          }
        }
      );
      function l(f) {
        var d = [], h, c;
        for (c = 0; c < f.length; c++)
          h = f[c], h.height && h.width && h.url ? d.push({
            url: h.url,
            width: Number(h.width),
            height: Number(h.height)
          }) : a.console.error("Unsupported image format: %s", h.url ? h.url : "<no URL>");
        return d.sort(function(g, p) {
          return g.height - p.height;
        });
      }
      function o(f, d) {
        if (!d || !d.documentElement)
          throw new Error(a.getString("Errors.Xml"));
        var h = d.documentElement, c = h.tagName, g = null, p = [], T, E;
        if (c === "image")
          try {
            for (g = {
              type: h.getAttribute("type"),
              levels: []
            }, p = h.getElementsByTagName("level"), E = 0; E < p.length; E++)
              T = p[E], g.levels.push({
                url: T.getAttribute("url"),
                width: parseInt(T.getAttribute("width"), 10),
                height: parseInt(T.getAttribute("height"), 10)
              });
            return r(f, g);
          } catch (C) {
            throw C instanceof Error ? C : new Error("Unknown error parsing Legacy Image Pyramid XML.");
          }
        else {
          if (c === "collection")
            throw new Error("Legacy Image Pyramid Collections not yet supported.");
          if (c === "error")
            throw new Error("Error: " + d);
        }
        throw new Error("Unknown element " + c);
      }
      function r(f, d) {
        return d.levels;
      }
    })(K), (function(a) {
      a.ImageTileSource = function(l) {
        l = a.extend({
          buildPyramid: !0,
          crossOriginPolicy: !1,
          ajaxWithCredentials: !1
        }, l), a.TileSource.apply(this, [l]);
      }, a.extend(
        a.ImageTileSource.prototype,
        a.TileSource.prototype,
        /** @lends OpenSeadragon.ImageTileSource.prototype */
        {
          /**
           * Determine if the data and/or url imply the image service is supported by
           * this tile source.
           * @function
           * @param {Object|Array} data
           * @param {String} optional - url
           */
          supports: function(l, o) {
            return l.type && l.type === "image";
          },
          /**
           *
           * @function
           * @param {Object} options - the options
           * @param {String} dataUrl - the url the image was retrieved from, if any.
           * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
           * @returns {Object} options - A dictionary of keyword arguments sufficient
           *      to configure this tile sources constructor.
           */
          configure: function(l, o, r) {
            return l;
          },
          /**
           * Responsible for retrieving, and caching the
           * image metadata pertinent to this TileSources implementation.
           * @function
           * @param {String} url
           * @throws {Error}
           */
          getImageInfo: function(l) {
            var o = this._image = new Image(), r = this;
            this.crossOriginPolicy && (o.crossOrigin = this.crossOriginPolicy), this.ajaxWithCredentials && (o.useCredentials = this.ajaxWithCredentials), a.addEvent(o, "load", function() {
              r.width = o.naturalWidth, r.height = o.naturalHeight, r.aspectRatio = r.width / r.height, r.dimensions = new a.Point(r.width, r.height), r._tileWidth = r.width, r._tileHeight = r.height, r.tileOverlap = 0, r.minLevel = 0, r.levels = r._buildLevels(), r.maxLevel = r.levels.length - 1, r.ready = !0, r.raiseEvent("ready", { tileSource: r });
            }), a.addEvent(o, "error", function() {
              r.raiseEvent("open-failed", {
                message: "Error loading image at " + l,
                source: l
              });
            }), o.src = l;
          },
          /**
           * @function
           * @param {Number} level
           */
          getLevelScale: function(l) {
            var o = NaN;
            return l >= this.minLevel && l <= this.maxLevel && (o = this.levels[l].width / this.levels[this.maxLevel].width), o;
          },
          /**
           * @function
           * @param {Number} level
           */
          getNumTiles: function(l) {
            var o = this.getLevelScale(l);
            return o ? new a.Point(1, 1) : new a.Point(0, 0);
          },
          /**
           * Retrieves a tile url
           * @function
           * @param {Number} level Level of the tile
           * @param {Number} x x coordinate of the tile
           * @param {Number} y y coordinate of the tile
           */
          getTileUrl: function(l, o, r) {
            var f = null;
            return l >= this.minLevel && l <= this.maxLevel && (f = this.levels[l].url), f;
          },
          /**
           * Retrieves a tile context 2D
           * @function
           * @param {Number} level Level of the tile
           * @param {Number} x x coordinate of the tile
           * @param {Number} y y coordinate of the tile
           */
          getContext2D: function(l, o, r) {
            var f = null;
            return l >= this.minLevel && l <= this.maxLevel && (f = this.levels[l].context2D), f;
          },
          /**
           * Destroys ImageTileSource
           * @function
           * @param {OpenSeadragon.Viewer} viewer the viewer that is calling
           * destroy on the ImageTileSource
           */
          destroy: function(l) {
            this._freeupCanvasMemory(l);
          },
          // private
          //
          // Builds the different levels of the pyramid if possible
          // (i.e. if canvas API enabled and no canvas tainting issue).
          _buildLevels: function() {
            var l = [{
              url: this._image.src,
              width: this._image.naturalWidth,
              height: this._image.naturalHeight
            }];
            if (!this.buildPyramid || !a.supportsCanvas)
              return delete this._image, l;
            var o = this._image.naturalWidth, r = this._image.naturalHeight, f = document.createElement("canvas"), d = f.getContext("2d");
            if (f.width = o, f.height = r, d.drawImage(this._image, 0, 0, o, r), l[0].context2D = d, delete this._image, a.isCanvasTainted(f))
              return l;
            for (; o >= 2 && r >= 2; ) {
              o = Math.floor(o / 2), r = Math.floor(r / 2);
              var h = document.createElement("canvas"), c = h.getContext("2d");
              h.width = o, h.height = r, c.drawImage(f, 0, 0, o, r), l.splice(0, 0, {
                context2D: c,
                width: o,
                height: r
              }), f = h, d = c;
            }
            return l;
          },
          /**
           * Free up canvas memory
           * (iOS 12 or higher on 2GB RAM device has only 224MB canvas memory,
           * and Safari keeps canvas until its height and width will be set to 0).
           * @function
           */
          _freeupCanvasMemory: function(l) {
            for (var o = 0; o < this.levels.length; o++)
              this.levels[o].context2D && (this.levels[o].context2D.canvas.height = 0, this.levels[o].context2D.canvas.width = 0, l && l.raiseEvent("image-unloaded", {
                context2D: this.levels[o].context2D
              }));
          }
        }
      );
    })(K), (function(a) {
      a.TileSourceCollection = function(l, o, r, f) {
        a.console.error("TileSourceCollection is deprecated; use World instead");
      };
    })(K), (function(a) {
      a.ButtonState = {
        REST: 0,
        GROUP: 1,
        HOVER: 2,
        DOWN: 3
      }, a.Button = function(c) {
        var g = this;
        a.EventSource.call(this), a.extend(!0, this, {
          tooltip: null,
          srcRest: null,
          srcGroup: null,
          srcHover: null,
          srcDown: null,
          clickTimeThreshold: a.DEFAULT_SETTINGS.clickTimeThreshold,
          clickDistThreshold: a.DEFAULT_SETTINGS.clickDistThreshold,
          /**
           * How long to wait before fading.
           * @member {Number} fadeDelay
           * @memberof OpenSeadragon.Button#
           */
          fadeDelay: 0,
          /**
           * How long should it take to fade the button.
           * @member {Number} fadeLength
           * @memberof OpenSeadragon.Button#
           */
          fadeLength: 2e3,
          onPress: null,
          onRelease: null,
          onClick: null,
          onEnter: null,
          onExit: null,
          onFocus: null,
          onBlur: null,
          userData: null
        }, c), this.element = c.element || a.makeNeutralElement("div"), c.element || (this.imgRest = a.makeTransparentImage(this.srcRest), this.imgGroup = a.makeTransparentImage(this.srcGroup), this.imgHover = a.makeTransparentImage(this.srcHover), this.imgDown = a.makeTransparentImage(this.srcDown), this.imgRest.alt = this.imgGroup.alt = this.imgHover.alt = this.imgDown.alt = this.tooltip, a.setElementPointerEventsNone(this.imgRest), a.setElementPointerEventsNone(this.imgGroup), a.setElementPointerEventsNone(this.imgHover), a.setElementPointerEventsNone(this.imgDown), this.element.style.position = "relative", a.setElementTouchActionNone(this.element), this.imgGroup.style.position = this.imgHover.style.position = this.imgDown.style.position = "absolute", this.imgGroup.style.top = this.imgHover.style.top = this.imgDown.style.top = "0px", this.imgGroup.style.left = this.imgHover.style.left = this.imgDown.style.left = "0px", this.imgHover.style.visibility = this.imgDown.style.visibility = "hidden", this.element.appendChild(this.imgRest), this.element.appendChild(this.imgGroup), this.element.appendChild(this.imgHover), this.element.appendChild(this.imgDown)), this.addHandler("press", this.onPress), this.addHandler("release", this.onRelease), this.addHandler("click", this.onClick), this.addHandler("enter", this.onEnter), this.addHandler("exit", this.onExit), this.addHandler("focus", this.onFocus), this.addHandler("blur", this.onBlur), this.currentState = a.ButtonState.GROUP, this.fadeBeginTime = null, this.shouldFade = !1, this.element.style.display = "inline-block", this.element.style.position = "relative", this.element.title = this.tooltip, this.tracker = new a.MouseTracker({
          userData: "Button.tracker",
          element: this.element,
          clickTimeThreshold: this.clickTimeThreshold,
          clickDistThreshold: this.clickDistThreshold,
          enterHandler: function(p) {
            p.insideElementPressed ? (d(g, a.ButtonState.DOWN), g.raiseEvent("enter", { originalEvent: p.originalEvent })) : p.buttonDownAny || d(g, a.ButtonState.HOVER);
          },
          focusHandler: function(p) {
            g.tracker.enterHandler(p), g.raiseEvent("focus", { originalEvent: p.originalEvent });
          },
          leaveHandler: function(p) {
            h(g, a.ButtonState.GROUP), p.insideElementPressed && g.raiseEvent("exit", { originalEvent: p.originalEvent });
          },
          blurHandler: function(p) {
            g.tracker.leaveHandler(p), g.raiseEvent("blur", { originalEvent: p.originalEvent });
          },
          pressHandler: function(p) {
            d(g, a.ButtonState.DOWN), g.raiseEvent("press", { originalEvent: p.originalEvent });
          },
          releaseHandler: function(p) {
            p.insideElementPressed && p.insideElementReleased ? (h(g, a.ButtonState.HOVER), g.raiseEvent("release", { originalEvent: p.originalEvent })) : p.insideElementPressed ? h(g, a.ButtonState.GROUP) : d(g, a.ButtonState.HOVER);
          },
          clickHandler: function(p) {
            p.quick && g.raiseEvent("click", { originalEvent: p.originalEvent });
          },
          keyHandler: function(p) {
            p.keyCode === 13 ? (g.raiseEvent("click", { originalEvent: p.originalEvent }), g.raiseEvent("release", { originalEvent: p.originalEvent }), p.preventDefault = !0) : p.preventDefault = !1;
          }
        }), h(this, a.ButtonState.REST);
      }, a.extend(
        a.Button.prototype,
        a.EventSource.prototype,
        /** @lends OpenSeadragon.Button.prototype */
        {
          /**
           * Used by a button container element (e.g. a ButtonGroup) to transition the button state
           * to ButtonState.GROUP.
           * @function
           */
          notifyGroupEnter: function() {
            d(this, a.ButtonState.GROUP);
          },
          /**
           * Used by a button container element (e.g. a ButtonGroup) to transition the button state
           * to ButtonState.REST.
           * @function
           */
          notifyGroupExit: function() {
            h(this, a.ButtonState.REST);
          },
          /**
           * @function
           */
          disable: function() {
            this.notifyGroupExit(), this.element.disabled = !0, this.tracker.setTracking(!1), a.setElementOpacity(this.element, 0.2, !0);
          },
          /**
           * @function
           */
          enable: function() {
            this.element.disabled = !1, this.tracker.setTracking(!0), a.setElementOpacity(this.element, 1, !0), this.notifyGroupEnter();
          },
          destroy: function() {
            this.imgRest && (this.element.removeChild(this.imgRest), this.imgRest = null), this.imgGroup && (this.element.removeChild(this.imgGroup), this.imgGroup = null), this.imgHover && (this.element.removeChild(this.imgHover), this.imgHover = null), this.imgDown && (this.element.removeChild(this.imgDown), this.imgDown = null), this.removeAllHandlers(), this.tracker.destroy(), this.element = null;
          }
        }
      );
      function l(c) {
        a.requestAnimationFrame(function() {
          o(c);
        });
      }
      function o(c) {
        var g, p, T;
        c.shouldFade && (g = a.now(), p = g - c.fadeBeginTime, T = 1 - p / c.fadeLength, T = Math.min(1, T), T = Math.max(0, T), c.imgGroup && a.setElementOpacity(c.imgGroup, T, !0), T > 0 && l(c));
      }
      function r(c) {
        c.shouldFade = !0, c.fadeBeginTime = a.now() + c.fadeDelay, window.setTimeout(function() {
          l(c);
        }, c.fadeDelay);
      }
      function f(c) {
        c.shouldFade = !1, c.imgGroup && a.setElementOpacity(c.imgGroup, 1, !0);
      }
      function d(c, g) {
        c.element.disabled || (g >= a.ButtonState.GROUP && c.currentState === a.ButtonState.REST && (f(c), c.currentState = a.ButtonState.GROUP), g >= a.ButtonState.HOVER && c.currentState === a.ButtonState.GROUP && (c.imgHover && (c.imgHover.style.visibility = ""), c.currentState = a.ButtonState.HOVER), g >= a.ButtonState.DOWN && c.currentState === a.ButtonState.HOVER && (c.imgDown && (c.imgDown.style.visibility = ""), c.currentState = a.ButtonState.DOWN));
      }
      function h(c, g) {
        c.element.disabled || (g <= a.ButtonState.HOVER && c.currentState === a.ButtonState.DOWN && (c.imgDown && (c.imgDown.style.visibility = "hidden"), c.currentState = a.ButtonState.HOVER), g <= a.ButtonState.GROUP && c.currentState === a.ButtonState.HOVER && (c.imgHover && (c.imgHover.style.visibility = "hidden"), c.currentState = a.ButtonState.GROUP), g <= a.ButtonState.REST && c.currentState === a.ButtonState.GROUP && (r(c), c.currentState = a.ButtonState.REST));
      }
    })(K), (function(a) {
      a.ButtonGroup = function(l) {
        a.extend(!0, this, {
          /**
           * An array containing the buttons themselves.
           * @member {Array} buttons
           * @memberof OpenSeadragon.ButtonGroup#
           */
          buttons: [],
          clickTimeThreshold: a.DEFAULT_SETTINGS.clickTimeThreshold,
          clickDistThreshold: a.DEFAULT_SETTINGS.clickDistThreshold,
          labelText: ""
        }, l);
        var o = this.buttons.concat([]), r = this, f;
        if (this.element = l.element || a.makeNeutralElement("div"), !l.group)
          for (this.element.style.display = "inline-block", f = 0; f < o.length; f++)
            this.element.appendChild(o[f].element);
        a.setElementTouchActionNone(this.element), this.tracker = new a.MouseTracker({
          userData: "ButtonGroup.tracker",
          element: this.element,
          clickTimeThreshold: this.clickTimeThreshold,
          clickDistThreshold: this.clickDistThreshold,
          enterHandler: function(d) {
            var h;
            for (h = 0; h < r.buttons.length; h++)
              r.buttons[h].notifyGroupEnter();
          },
          leaveHandler: function(d) {
            var h;
            if (!d.insideElementPressed)
              for (h = 0; h < r.buttons.length; h++)
                r.buttons[h].notifyGroupExit();
          }
        });
      }, a.ButtonGroup.prototype = {
        /**
         * Adds the given button to this button group.
         *
         * @function
         * @param {OpenSeadragon.Button} button
         */
        addButton: function(l) {
          this.buttons.push(l), this.element.appendChild(l.element);
        },
        /**
         * TODO: Figure out why this is used on the public API and if a more useful
         * api can be created.
         * @function
         * @private
         */
        emulateEnter: function() {
          this.tracker.enterHandler({ eventSource: this.tracker });
        },
        /**
         * TODO: Figure out why this is used on the public API and if a more useful
         * api can be created.
         * @function
         * @private
         */
        emulateLeave: function() {
          this.tracker.leaveHandler({ eventSource: this.tracker });
        },
        destroy: function() {
          for (; this.buttons.length; ) {
            var l = this.buttons.pop();
            this.element.removeChild(l.element), l.destroy();
          }
          this.tracker.destroy(), this.element = null;
        }
      };
    })(K), (function(a) {
      a.Rect = function(l, o, r, f, d) {
        this.x = typeof l == "number" ? l : 0, this.y = typeof o == "number" ? o : 0, this.width = typeof r == "number" ? r : 0, this.height = typeof f == "number" ? f : 0, this.degrees = typeof d == "number" ? d : 0, this.degrees = a.positiveModulo(this.degrees, 360);
        var h, c;
        this.degrees >= 270 ? (h = this.getTopRight(), this.x = h.x, this.y = h.y, c = this.height, this.height = this.width, this.width = c, this.degrees -= 270) : this.degrees >= 180 ? (h = this.getBottomRight(), this.x = h.x, this.y = h.y, this.degrees -= 180) : this.degrees >= 90 && (h = this.getBottomLeft(), this.x = h.x, this.y = h.y, c = this.height, this.height = this.width, this.width = c, this.degrees -= 90);
      }, a.Rect.fromSummits = function(l, o, r) {
        var f = l.distanceTo(o), d = l.distanceTo(r), h = o.minus(l), c = Math.atan(h.y / h.x);
        return h.x < 0 ? c += Math.PI : h.y < 0 && (c += 2 * Math.PI), new a.Rect(
          l.x,
          l.y,
          f,
          d,
          c / Math.PI * 180
        );
      }, a.Rect.prototype = {
        /**
         * @function
         * @returns {OpenSeadragon.Rect} a duplicate of this Rect
         */
        clone: function() {
          return new a.Rect(
            this.x,
            this.y,
            this.width,
            this.height,
            this.degrees
          );
        },
        /**
         * The aspect ratio is simply the ratio of width to height.
         * @function
         * @returns {Number} The ratio of width to height.
         */
        getAspectRatio: function() {
          return this.width / this.height;
        },
        /**
         * Provides the coordinates of the upper-left corner of the rectangle as a
         * point.
         * @function
         * @returns {OpenSeadragon.Point} The coordinate of the upper-left corner of
         *  the rectangle.
         */
        getTopLeft: function() {
          return new a.Point(
            this.x,
            this.y
          );
        },
        /**
         * Provides the coordinates of the bottom-right corner of the rectangle as a
         * point.
         * @function
         * @returns {OpenSeadragon.Point} The coordinate of the bottom-right corner of
         *  the rectangle.
         */
        getBottomRight: function() {
          return new a.Point(this.x + this.width, this.y + this.height).rotate(this.degrees, this.getTopLeft());
        },
        /**
         * Provides the coordinates of the top-right corner of the rectangle as a
         * point.
         * @function
         * @returns {OpenSeadragon.Point} The coordinate of the top-right corner of
         *  the rectangle.
         */
        getTopRight: function() {
          return new a.Point(this.x + this.width, this.y).rotate(this.degrees, this.getTopLeft());
        },
        /**
         * Provides the coordinates of the bottom-left corner of the rectangle as a
         * point.
         * @function
         * @returns {OpenSeadragon.Point} The coordinate of the bottom-left corner of
         *  the rectangle.
         */
        getBottomLeft: function() {
          return new a.Point(this.x, this.y + this.height).rotate(this.degrees, this.getTopLeft());
        },
        /**
         * Computes the center of the rectangle.
         * @function
         * @returns {OpenSeadragon.Point} The center of the rectangle as represented
         *  as represented by a 2-dimensional vector (x,y)
         */
        getCenter: function() {
          return new a.Point(
            this.x + this.width / 2,
            this.y + this.height / 2
          ).rotate(this.degrees, this.getTopLeft());
        },
        /**
         * Returns the width and height component as a vector OpenSeadragon.Point
         * @function
         * @returns {OpenSeadragon.Point} The 2 dimensional vector representing the
         *  width and height of the rectangle.
         */
        getSize: function() {
          return new a.Point(this.width, this.height);
        },
        /**
         * Determines if two Rectangles have equivalent components.
         * @function
         * @param {OpenSeadragon.Rect} rectangle The Rectangle to compare to.
         * @returns {Boolean} 'true' if all components are equal, otherwise 'false'.
         */
        equals: function(l) {
          return l instanceof a.Rect && this.x === l.x && this.y === l.y && this.width === l.width && this.height === l.height && this.degrees === l.degrees;
        },
        /**
        * Multiply all dimensions (except degrees) in this Rect by a factor and
        * return a new Rect.
        * @function
        * @param {Number} factor The factor to multiply vector components.
        * @returns {OpenSeadragon.Rect} A new rect representing the multiplication
        *  of the vector components by the factor
        */
        times: function(l) {
          return new a.Rect(
            this.x * l,
            this.y * l,
            this.width * l,
            this.height * l,
            this.degrees
          );
        },
        /**
        * Translate/move this Rect by a vector and return new Rect.
        * @function
        * @param {OpenSeadragon.Point} delta The translation vector.
        * @returns {OpenSeadragon.Rect} A new rect with altered position
        */
        translate: function(l) {
          return new a.Rect(
            this.x + l.x,
            this.y + l.y,
            this.width,
            this.height,
            this.degrees
          );
        },
        /**
         * Returns the smallest rectangle that will contain this and the given
         * rectangle bounding boxes.
         * @param {OpenSeadragon.Rect} rect
         * @returns {OpenSeadragon.Rect} The new rectangle.
         */
        union: function(l) {
          var o = this.getBoundingBox(), r = l.getBoundingBox(), f = Math.min(o.x, r.x), d = Math.min(o.y, r.y), h = Math.max(
            o.x + o.width,
            r.x + r.width
          ), c = Math.max(
            o.y + o.height,
            r.y + r.height
          );
          return new a.Rect(
            f,
            d,
            h - f,
            c - d
          );
        },
        /**
         * Returns the bounding box of the intersection of this rectangle with the
         * given rectangle.
         * @param {OpenSeadragon.Rect} rect
         * @returns {OpenSeadragon.Rect} the bounding box of the intersection
         * or null if the rectangles don't intersect.
         */
        intersection: function(l) {
          var o = 1e-10, r = [], f = this.getTopLeft();
          l.containsPoint(f, o) && r.push(f);
          var d = this.getTopRight();
          l.containsPoint(d, o) && r.push(d);
          var h = this.getBottomLeft();
          l.containsPoint(h, o) && r.push(h);
          var c = this.getBottomRight();
          l.containsPoint(c, o) && r.push(c);
          var g = l.getTopLeft();
          this.containsPoint(g, o) && r.push(g);
          var p = l.getTopRight();
          this.containsPoint(p, o) && r.push(p);
          var T = l.getBottomLeft();
          this.containsPoint(T, o) && r.push(T);
          var E = l.getBottomRight();
          this.containsPoint(E, o) && r.push(E);
          for (var C = this._getSegments(), b = l._getSegments(), D = 0; D < C.length; D++)
            for (var z = C[D], G = 0; G < b.length; G++) {
              var V = b[G], de = ne(
                z[0],
                z[1],
                V[0],
                V[1]
              );
              de && r.push(de);
            }
          function ne(ge, Ne, Ze, Xe) {
            var F = Ne.minus(ge), ee = Xe.minus(Ze), se = -ee.x * F.y + F.x * ee.y;
            if (se === 0)
              return null;
            var De = (F.x * (ge.y - Ze.y) - F.y * (ge.x - Ze.x)) / se, Be = (ee.x * (ge.y - Ze.y) - ee.y * (ge.x - Ze.x)) / se;
            return -o <= De && De <= 1 - o && -o <= Be && Be <= 1 - o ? new a.Point(ge.x + Be * F.x, ge.y + Be * F.y) : null;
          }
          if (r.length === 0)
            return null;
          for (var me = r[0].x, ie = r[0].x, Te = r[0].y, be = r[0].y, qe = 1; qe < r.length; qe++) {
            var Oe = r[qe];
            Oe.x < me && (me = Oe.x), Oe.x > ie && (ie = Oe.x), Oe.y < Te && (Te = Oe.y), Oe.y > be && (be = Oe.y);
          }
          return new a.Rect(me, Te, ie - me, be - Te);
        },
        // private
        _getSegments: function() {
          var l = this.getTopLeft(), o = this.getTopRight(), r = this.getBottomLeft(), f = this.getBottomRight();
          return [
            [l, o],
            [o, f],
            [f, r],
            [r, l]
          ];
        },
        /**
         * Rotates a rectangle around a point.
         * @function
         * @param {Number} degrees The angle in degrees to rotate.
         * @param {OpenSeadragon.Point} [pivot] The point about which to rotate.
         * Defaults to the center of the rectangle.
         * @returns {OpenSeadragon.Rect}
         */
        rotate: function(l, o) {
          if (l = a.positiveModulo(l, 360), l === 0)
            return this.clone();
          o = o || this.getCenter();
          var r = this.getTopLeft().rotate(l, o), f = this.getTopRight().rotate(l, o), d = f.minus(r);
          d = d.apply(function(c) {
            var g = 1e-15;
            return Math.abs(c) < g ? 0 : c;
          });
          var h = Math.atan(d.y / d.x);
          return d.x < 0 ? h += Math.PI : d.y < 0 && (h += 2 * Math.PI), new a.Rect(
            r.x,
            r.y,
            this.width,
            this.height,
            h / Math.PI * 180
          );
        },
        /**
         * Retrieves the smallest horizontal (degrees=0) rectangle which contains
         * this rectangle.
         * @returns {OpenSeadragon.Rect}
         */
        getBoundingBox: function() {
          if (this.degrees === 0)
            return this.clone();
          var l = this.getTopLeft(), o = this.getTopRight(), r = this.getBottomLeft(), f = this.getBottomRight(), d = Math.min(l.x, o.x, r.x, f.x), h = Math.max(l.x, o.x, r.x, f.x), c = Math.min(l.y, o.y, r.y, f.y), g = Math.max(l.y, o.y, r.y, f.y);
          return new a.Rect(
            d,
            c,
            h - d,
            g - c
          );
        },
        /**
         * Retrieves the smallest horizontal (degrees=0) rectangle which contains
         * this rectangle and has integers x, y, width and height
         * @returns {OpenSeadragon.Rect}
         */
        getIntegerBoundingBox: function() {
          var l = this.getBoundingBox(), o = Math.floor(l.x), r = Math.floor(l.y), f = Math.ceil(l.width + l.x - o), d = Math.ceil(l.height + l.y - r);
          return new a.Rect(o, r, f, d);
        },
        /**
         * Determines whether a point is inside this rectangle (edge included).
         * @function
         * @param {OpenSeadragon.Point} point
         * @param {Number} [epsilon=0] the margin of error allowed
         * @returns {Boolean} true if the point is inside this rectangle, false
         * otherwise.
         */
        containsPoint: function(l, o) {
          o = o || 0;
          var r = this.getTopLeft(), f = this.getTopRight(), d = this.getBottomLeft(), h = f.minus(r), c = d.minus(r);
          return (l.x - r.x) * h.x + (l.y - r.y) * h.y >= -o && (l.x - f.x) * h.x + (l.y - f.y) * h.y <= o && (l.x - r.x) * c.x + (l.y - r.y) * c.y >= -o && (l.x - d.x) * c.x + (l.y - d.y) * c.y <= o;
        },
        /**
         * Provides a string representation of the rectangle which is useful for
         * debugging.
         * @function
         * @returns {String} A string representation of the rectangle.
         */
        toString: function() {
          return "[" + Math.round(this.x * 100) / 100 + ", " + Math.round(this.y * 100) / 100 + ", " + Math.round(this.width * 100) / 100 + "x" + Math.round(this.height * 100) / 100 + ", " + Math.round(this.degrees * 100) / 100 + "deg]";
        }
      };
    })(K), (function(a) {
      var l = {};
      a.ReferenceStrip = function(T) {
        var E = this, C = T.viewer, b = a.getElementSize(C.element), D, z, G;
        for (T.id || (T.id = "referencestrip-" + a.now(), this.element = a.makeNeutralElement("div"), this.element.id = T.id, this.element.className = "referencestrip"), T = a.extend(!0, {
          sizeRatio: a.DEFAULT_SETTINGS.referenceStripSizeRatio,
          position: a.DEFAULT_SETTINGS.referenceStripPosition,
          scroll: a.DEFAULT_SETTINGS.referenceStripScroll,
          clickTimeThreshold: a.DEFAULT_SETTINGS.clickTimeThreshold
        }, T, {
          element: this.element
        }), a.extend(this, T), l[this.id] = {
          animating: !1
        }, this.minPixelRatio = this.viewer.minPixelRatio, this.element.tabIndex = 0, z = this.element.style, z.marginTop = "0px", z.marginRight = "0px", z.marginBottom = "0px", z.marginLeft = "0px", z.left = "0px", z.bottom = "0px", z.border = "0px", z.background = "#000", z.position = "relative", a.setElementTouchActionNone(this.element), a.setElementOpacity(this.element, 0.8), this.viewer = C, this.tracker = new a.MouseTracker({
          userData: "ReferenceStrip.tracker",
          element: this.element,
          clickHandler: a.delegate(this, o),
          dragHandler: a.delegate(this, r),
          scrollHandler: a.delegate(this, f),
          enterHandler: a.delegate(this, h),
          leaveHandler: a.delegate(this, c),
          keyDownHandler: a.delegate(this, g),
          keyHandler: a.delegate(this, p),
          preProcessEventHandler: function(V) {
            V.eventType === "wheel" && (V.preventDefault = !0);
          }
        }), T.width && T.height ? (this.element.style.width = T.width + "px", this.element.style.height = T.height + "px", C.addControl(
          this.element,
          { anchor: a.ControlAnchor.BOTTOM_LEFT }
        )) : T.scroll === "horizontal" ? (this.element.style.width = b.x * T.sizeRatio * C.tileSources.length + 12 * C.tileSources.length + "px", this.element.style.height = b.y * T.sizeRatio + "px", C.addControl(
          this.element,
          { anchor: a.ControlAnchor.BOTTOM_LEFT }
        )) : (this.element.style.height = b.y * T.sizeRatio * C.tileSources.length + 12 * C.tileSources.length + "px", this.element.style.width = b.x * T.sizeRatio + "px", C.addControl(
          this.element,
          { anchor: a.ControlAnchor.TOP_LEFT }
        )), this.panelWidth = b.x * this.sizeRatio + 8, this.panelHeight = b.y * this.sizeRatio + 8, this.panels = [], this.miniViewers = {}, G = 0; G < C.tileSources.length; G++)
          D = a.makeNeutralElement("div"), D.id = this.element.id + "-" + G, D.style.width = E.panelWidth + "px", D.style.height = E.panelHeight + "px", D.style.display = "inline", D.style.float = "left", D.style.cssFloat = "left", D.style.padding = "2px", a.setElementTouchActionNone(D), a.setElementPointerEventsNone(D), this.element.appendChild(D), D.activePanel = !1, this.panels.push(D);
        d(this, this.scroll === "vertical" ? b.y : b.x, 0), this.setFocus(0);
      }, a.ReferenceStrip.prototype = {
        /**
         * @function
         */
        setFocus: function(T) {
          var E = this.element.querySelector("#" + this.element.id + "-" + T), C = a.getElementSize(this.viewer.canvas), b = Number(this.element.style.width.replace("px", "")), D = Number(this.element.style.height.replace("px", "")), z = -Number(this.element.style.marginLeft.replace("px", "")), G = -Number(this.element.style.marginTop.replace("px", "")), V;
          this.currentSelected !== E && (this.currentSelected && (this.currentSelected.style.background = "#000"), this.currentSelected = E, this.currentSelected.style.background = "#999", this.scroll === "horizontal" ? (V = Number(T) * (this.panelWidth + 3), V > z + C.x - this.panelWidth ? (V = Math.min(V, b - C.x), this.element.style.marginLeft = -V + "px", d(this, C.x, -V)) : V < z && (V = Math.max(0, V - C.x / 2), this.element.style.marginLeft = -V + "px", d(this, C.x, -V))) : (V = Number(T) * (this.panelHeight + 3), V > G + C.y - this.panelHeight ? (V = Math.min(V, D - C.y), this.element.style.marginTop = -V + "px", d(this, C.y, -V)) : V < G && (V = Math.max(0, V - C.y / 2), this.element.style.marginTop = -V + "px", d(this, C.y, -V))), this.currentPage = T, h.call(this, { eventSource: this.tracker }));
        },
        /**
         * @function
         */
        update: function() {
          return !!l[this.id].animating;
        },
        destroy: function() {
          if (this.miniViewers)
            for (var T in this.miniViewers)
              this.miniViewers[T].destroy();
          this.tracker.destroy(), this.element && this.viewer.removeControl(this.element);
        }
      };
      function o(T) {
        if (T.quick) {
          var E;
          this.scroll === "horizontal" ? E = Math.floor(T.position.x / (this.panelWidth + 4)) : E = Math.floor(T.position.y / this.panelHeight), this.viewer.goToPage(E);
        }
        this.element.focus();
      }
      function r(T) {
        if (this.dragging = !0, this.element) {
          var E = Number(this.element.style.marginLeft.replace("px", "")), C = Number(this.element.style.marginTop.replace("px", "")), b = Number(this.element.style.width.replace("px", "")), D = Number(this.element.style.height.replace("px", "")), z = a.getElementSize(this.viewer.canvas);
          this.scroll === "horizontal" ? -T.delta.x > 0 ? E > -(b - z.x) && (this.element.style.marginLeft = E + T.delta.x * 2 + "px", d(this, z.x, E + T.delta.x * 2)) : -T.delta.x < 0 && E < 0 && (this.element.style.marginLeft = E + T.delta.x * 2 + "px", d(this, z.x, E + T.delta.x * 2)) : -T.delta.y > 0 ? C > -(D - z.y) && (this.element.style.marginTop = C + T.delta.y * 2 + "px", d(this, z.y, C + T.delta.y * 2)) : -T.delta.y < 0 && C < 0 && (this.element.style.marginTop = C + T.delta.y * 2 + "px", d(this, z.y, C + T.delta.y * 2));
        }
      }
      function f(T) {
        if (this.element) {
          var E = Number(this.element.style.marginLeft.replace("px", "")), C = Number(this.element.style.marginTop.replace("px", "")), b = Number(this.element.style.width.replace("px", "")), D = Number(this.element.style.height.replace("px", "")), z = a.getElementSize(this.viewer.canvas);
          this.scroll === "horizontal" ? T.scroll > 0 ? E > -(b - z.x) && (this.element.style.marginLeft = E - T.scroll * 60 + "px", d(this, z.x, E - T.scroll * 60)) : T.scroll < 0 && E < 0 && (this.element.style.marginLeft = E - T.scroll * 60 + "px", d(this, z.x, E - T.scroll * 60)) : T.scroll < 0 ? C > z.y - D && (this.element.style.marginTop = C + T.scroll * 60 + "px", d(this, z.y, C + T.scroll * 60)) : T.scroll > 0 && C < 0 && (this.element.style.marginTop = C + T.scroll * 60 + "px", d(this, z.y, C + T.scroll * 60)), T.preventDefault = !0;
        }
      }
      function d(T, E, C) {
        var b, D, z, G, V, de;
        for (T.scroll === "horizontal" ? b = T.panelWidth : b = T.panelHeight, D = Math.ceil(E / b) + 5, z = Math.ceil((Math.abs(C) + E) / b) + 1, D = z - D, D = D < 0 ? 0 : D, V = D; V < z && V < T.panels.length; V++)
          if (de = T.panels[V], !de.activePanel) {
            var ne, me = T.viewer.tileSources[V];
            me.referenceStripThumbnailUrl ? ne = {
              type: "image",
              url: me.referenceStripThumbnailUrl
            } : ne = me, G = new a.Viewer({
              id: de.id,
              tileSources: [ne],
              element: de,
              navigatorSizeRatio: T.sizeRatio,
              showNavigator: !1,
              mouseNavEnabled: !1,
              showNavigationControl: !1,
              showSequenceControl: !1,
              immediateRender: !0,
              blendTime: 0,
              animationTime: 0,
              loadTilesWithAjax: T.viewer.loadTilesWithAjax,
              ajaxHeaders: T.viewer.ajaxHeaders,
              drawer: "canvas"
              //always use canvas for the reference strip
            }), a.setElementPointerEventsNone(G.canvas), a.setElementPointerEventsNone(G.container), G.innerTracker.setTracking(!1), G.outerTracker.setTracking(!1), T.miniViewers[de.id] = G, de.activePanel = !0;
          }
      }
      function h(T) {
        var E = T.eventSource.element;
        this.scroll === "horizontal" ? E.style.marginBottom = "0px" : E.style.marginLeft = "0px";
      }
      function c(T) {
        var E = T.eventSource.element;
        this.scroll === "horizontal" ? E.style.marginBottom = "-" + a.getElementSize(E).y / 2 + "px" : E.style.marginLeft = "-" + a.getElementSize(E).x / 2 + "px";
      }
      function g(T) {
        if (!T.ctrl && !T.alt && !T.meta)
          switch (T.keyCode) {
            case 38:
              f.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null }), T.preventDefault = !0;
              break;
            case 40:
              f.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null }), T.preventDefault = !0;
              break;
            case 37:
              f.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null }), T.preventDefault = !0;
              break;
            case 39:
              f.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null }), T.preventDefault = !0;
              break;
            default:
              T.preventDefault = !1;
              break;
          }
        else
          T.preventDefault = !1;
      }
      function p(T) {
        if (!T.ctrl && !T.alt && !T.meta)
          switch (T.keyCode) {
            case 61:
              f.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null }), T.preventDefault = !0;
              break;
            case 45:
              f.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null }), T.preventDefault = !0;
              break;
            case 48:
            //0|)
            case 119:
            //w
            case 87:
              f.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null }), T.preventDefault = !0;
              break;
            case 115:
            //s
            case 83:
              f.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null }), T.preventDefault = !0;
              break;
            case 97:
              f.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null }), T.preventDefault = !0;
              break;
            case 100:
              f.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null }), T.preventDefault = !0;
              break;
            default:
              T.preventDefault = !1;
              break;
          }
        else
          T.preventDefault = !1;
      }
    })(K), (function(a) {
      a.DisplayRect = function(l, o, r, f, d, h) {
        a.Rect.apply(this, [l, o, r, f]), this.minLevel = d, this.maxLevel = h;
      }, a.extend(a.DisplayRect.prototype, a.Rect.prototype);
    })(K), (function(a) {
      a.Spring = function(o) {
        var r = arguments;
        typeof o != "object" && (o = {
          initial: r.length && typeof r[0] == "number" ? r[0] : void 0,
          /**
           * Spring stiffness.
           * @member {Number} springStiffness
           * @memberof OpenSeadragon.Spring#
           */
          springStiffness: r.length > 1 ? r[1].springStiffness : 5,
          /**
           * Animation duration per spring.
           * @member {Number} animationTime
           * @memberof OpenSeadragon.Spring#
           */
          animationTime: r.length > 1 ? r[1].animationTime : 1.5
        }), a.console.assert(
          typeof o.springStiffness == "number" && o.springStiffness !== 0,
          "[OpenSeadragon.Spring] options.springStiffness must be a non-zero number"
        ), a.console.assert(
          typeof o.animationTime == "number" && o.animationTime >= 0,
          "[OpenSeadragon.Spring] options.animationTime must be a number greater than or equal to 0"
        ), o.exponential && (this._exponential = !0, delete o.exponential), a.extend(!0, this, o), this.current = {
          value: typeof this.initial == "number" ? this.initial : this._exponential ? 0 : 1,
          time: a.now()
          // always work in milliseconds
        }, a.console.assert(
          !this._exponential || this.current.value !== 0,
          "[OpenSeadragon.Spring] value must be non-zero for exponential springs"
        ), this.start = {
          value: this.current.value,
          time: this.current.time
        }, this.target = {
          value: this.current.value,
          time: this.current.time
        }, this._exponential && (this.start._logValue = Math.log(this.start.value), this.target._logValue = Math.log(this.target.value), this.current._logValue = Math.log(this.current.value));
      }, a.Spring.prototype = {
        /**
         * @function
         * @param {Number} target
         */
        resetTo: function(o) {
          a.console.assert(
            !this._exponential || o !== 0,
            "[OpenSeadragon.Spring.resetTo] target must be non-zero for exponential springs"
          ), this.start.value = this.target.value = this.current.value = o, this.start.time = this.target.time = this.current.time = a.now(), this._exponential && (this.start._logValue = Math.log(this.start.value), this.target._logValue = Math.log(this.target.value), this.current._logValue = Math.log(this.current.value));
        },
        /**
         * @function
         * @param {Number} target
         */
        springTo: function(o) {
          a.console.assert(
            !this._exponential || o !== 0,
            "[OpenSeadragon.Spring.springTo] target must be non-zero for exponential springs"
          ), this.start.value = this.current.value, this.start.time = this.current.time, this.target.value = o, this.target.time = this.start.time + 1e3 * this.animationTime, this._exponential && (this.start._logValue = Math.log(this.start.value), this.target._logValue = Math.log(this.target.value));
        },
        /**
         * @function
         * @param {Number} delta
         */
        shiftBy: function(o) {
          this.start.value += o, this.target.value += o, this._exponential && (a.console.assert(
            this.target.value !== 0 && this.start.value !== 0,
            "[OpenSeadragon.Spring.shiftBy] spring value must be non-zero for exponential springs"
          ), this.start._logValue = Math.log(this.start.value), this.target._logValue = Math.log(this.target.value));
        },
        setExponential: function(o) {
          this._exponential = o, this._exponential && (a.console.assert(
            this.current.value !== 0 && this.target.value !== 0 && this.start.value !== 0,
            "[OpenSeadragon.Spring.setExponential] spring value must be non-zero for exponential springs"
          ), this.start._logValue = Math.log(this.start.value), this.target._logValue = Math.log(this.target.value), this.current._logValue = Math.log(this.current.value));
        },
        /**
         * @function
         * @returns true if the spring is still updating its value, false if it is
         * already at the target value.
         */
        update: function() {
          this.current.time = a.now();
          let o, r;
          if (this._exponential ? (o = this.start._logValue, r = this.target._logValue) : (o = this.start.value, r = this.target.value), this.current.time >= this.target.time)
            this.current.value = this.target.value;
          else {
            let f = o + (r - o) * l(
              this.springStiffness,
              (this.current.time - this.start.time) / (this.target.time - this.start.time)
            );
            this._exponential ? this.current.value = Math.exp(f) : this.current.value = f;
          }
          return this.current.value !== this.target.value;
        },
        /**
         * Returns whether the spring is at the target value
         * @function
         * @returns {Boolean} True if at target value, false otherwise
         */
        isAtTargetValue: function() {
          return this.current.value === this.target.value;
        }
      };
      function l(o, r) {
        return (1 - Math.exp(o * -r)) / (1 - Math.exp(-o));
      }
    })(K), (function(a) {
      a.ImageJob = function(o) {
        a.extend(!0, this, {
          timeout: a.DEFAULT_SETTINGS.timeout,
          jobId: null,
          tries: 0
        }, o), this.data = null, this.userData = {}, this.errorMsg = null;
      }, a.ImageJob.prototype = {
        /**
         * Starts the image job.
         * @method
         * @memberof OpenSeadragon.ImageJob#
         */
        start: function() {
          this.tries++;
          var o = this, r = this.abort;
          this.jobId = window.setTimeout(function() {
            o.finish(null, null, "Image load exceeded timeout (" + o.timeout + " ms)");
          }, this.timeout), this.abort = function() {
            o.source.downloadTileAbort(o), typeof r == "function" && r();
          }, this.source.downloadTileStart(this);
        },
        /**
         * Finish this job.
         * @param {*} data data that has been downloaded
         * @param {XMLHttpRequest} request reference to the request if used
         * @param {string} errorMessage description upon failure
         * @memberof OpenSeadragon.ImageJob#
         */
        finish: function(o, r, f) {
          this.data = o, this.request = r, this.errorMsg = f, this.jobId && window.clearTimeout(this.jobId), this.callback(this);
        }
      }, a.ImageLoader = function(o) {
        a.extend(!0, this, {
          jobLimit: a.DEFAULT_SETTINGS.imageLoaderLimit,
          timeout: a.DEFAULT_SETTINGS.timeout,
          jobQueue: [],
          failedTiles: [],
          jobsInProgress: 0
        }, o);
      }, a.ImageLoader.prototype = {
        /**
         * Add an unloaded image to the loader queue.
         * @method
         * @param {Object} options - Options for this job.
         * @param {String} [options.src] - URL of image to download.
         * @param {Tile} [options.tile] - Tile that belongs the data to. The tile instance
         *      is not internally used and serves for custom TileSources implementations.
         * @param {TileSource} [options.source] - Image loading strategy
         * @param {String} [options.loadWithAjax] - Whether to load this image with AJAX.
         * @param {String} [options.ajaxHeaders] - Headers to add to the image request if using AJAX.
         * @param {String|Boolean} [options.crossOriginPolicy] - CORS policy to use for downloads
         * @param {String} [options.postData] - POST parameters (usually but not necessarily in k=v&k2=v2... form,
         *      see TileSource::getPostData) or null
         * @param {Boolean} [options.ajaxWithCredentials] - Whether to set withCredentials on AJAX
         *      requests.
         * @param {Function} [options.callback] - Called once image has been downloaded.
         * @param {Function} [options.abort] - Called when this image job is aborted.
         */
        addJob: function(o) {
          if (!o.source) {
            a.console.error("ImageLoader.prototype.addJob() requires [options.source]. TileSource since new API defines how images are fetched. Creating a dummy TileSource.");
            var r = a.TileSource.prototype;
            o.source = {
              downloadTileStart: r.downloadTileStart,
              downloadTileAbort: r.downloadTileAbort
            };
          }
          var f = this, d = function(g) {
            l(f, g, o.callback);
          }, h = {
            src: o.src,
            tile: o.tile || {},
            source: o.source,
            loadWithAjax: o.loadWithAjax,
            ajaxHeaders: o.loadWithAjax ? o.ajaxHeaders : null,
            crossOriginPolicy: o.crossOriginPolicy,
            ajaxWithCredentials: o.ajaxWithCredentials,
            postData: o.postData,
            callback: d,
            abort: o.abort,
            timeout: this.timeout
          }, c = new a.ImageJob(h);
          !this.jobLimit || this.jobsInProgress < this.jobLimit ? (c.start(), this.jobsInProgress++) : this.jobQueue.push(c);
        },
        /**
         * Clear any unstarted image loading jobs from the queue.
         * @method
         */
        clear: function() {
          for (var o = 0; o < this.jobQueue.length; o++) {
            var r = this.jobQueue[o];
            typeof r.abort == "function" && r.abort();
          }
          this.jobQueue = [];
        }
      };
      function l(o, r, f) {
        r.errorMsg !== "" && (r.data === null || r.data === void 0) && r.tries < 1 + o.tileRetryMax && o.failedTiles.push(r);
        var d;
        o.jobsInProgress--, (!o.jobLimit || o.jobsInProgress < o.jobLimit) && o.jobQueue.length > 0 && (d = o.jobQueue.shift(), d.start(), o.jobsInProgress++), o.tileRetryMax > 0 && o.jobQueue.length === 0 && (!o.jobLimit || o.jobsInProgress < o.jobLimit) && o.failedTiles.length > 0 && (d = o.failedTiles.shift(), setTimeout(function() {
          d.start();
        }, o.tileRetryDelay), o.jobsInProgress++), f(r.data, r.errorMsg, r.request);
      }
    })(K), (function(a) {
      a.Tile = function(l, o, r, f, d, h, c, g, p, T, E, C) {
        this.level = l, this.x = o, this.y = r, this.bounds = f, this.positionedBounds = new K.Rect(f.x, f.y, f.width, f.height), this.sourceBounds = T, this.exists = d, this._url = h, this.postData = E, this.context2D = c, this.loadWithAjax = g, this.ajaxHeaders = p, C === void 0 && (a.console.warn("Tile constructor needs 'cacheKey' variable: creation tile cache in Tile class is deprecated. TileSource.prototype.getTileHashKey will be used."), C = a.TileSource.prototype.getTileHashKey(l, o, r, h, p, E)), this.cacheKey = C, this.loaded = !1, this.loading = !1, this.element = null, this.imgElement = null, this.style = null, this.position = null, this.size = null, this.flipped = !1, this.blendStart = null, this.opacity = null, this.squaredDistance = null, this.visibility = null, this.hasTransparency = !1, this.beingDrawn = !1, this.lastTouchTime = 0, this.isRightMost = !1, this.isBottomMost = !1;
      }, a.Tile.prototype = {
        /**
         * Provides a string representation of this tiles level and (x,y)
         * components.
         * @function
         * @returns {String}
         */
        toString: function() {
          return this.level + "/" + this.x + "_" + this.y;
        },
        // private
        _hasTransparencyChannel: function() {
          return console.warn("Tile.prototype._hasTransparencyChannel() has been deprecated and will be removed in the future. Use TileSource.prototype.hasTransparency() instead."), !!this.context2D || this.getUrl().match(".png");
        },
        /**
         * The Image object for this tile.
         * @member {Object} image
         * @memberof OpenSeadragon.Tile#
         * @deprecated
         * @returns {Image}
         */
        get image() {
          return a.console.error("[Tile.image] property has been deprecated. Use [Tile.prototype.getImage] instead."), this.getImage();
        },
        /**
         * The URL of this tile's image.
         * @member {String} url
         * @memberof OpenSeadragon.Tile#
         * @deprecated
         * @returns {String}
         */
        get url() {
          return a.console.error("[Tile.url] property has been deprecated. Use [Tile.prototype.getUrl] instead."), this.getUrl();
        },
        /**
         * Get the Image object for this tile.
         * @returns {Image}
         */
        getImage: function() {
          return this.cacheImageRecord.getImage();
        },
        /**
         * Get the url string for this tile.
         * @returns {String}
         */
        getUrl: function() {
          return typeof this._url == "function" ? this._url() : this._url;
        },
        /**
         * Get the CanvasRenderingContext2D instance for tile image data drawn
         * onto Canvas if enabled and available
         * @returns {CanvasRenderingContext2D}
         */
        getCanvasContext: function() {
          return this.context2D || this.cacheImageRecord && this.cacheImageRecord.getRenderedContext();
        },
        /**
         * Get the ratio between current and original size.
         * @function
         * @returns {Float}
         */
        getScaleForEdgeSmoothing: function() {
          var l;
          if (this.cacheImageRecord)
            l = this.cacheImageRecord.getRenderedContext();
          else if (this.context2D)
            l = this.context2D;
          else
            return a.console.warn(
              "[Tile.drawCanvas] attempting to get tile scale %s when tile's not cached",
              this.toString()
            ), 1;
          return l.canvas.width / (this.size.x * a.pixelDensityRatio);
        },
        /**
         * Get a translation vector that when applied to the tile position produces integer coordinates.
         * Needed to avoid swimming and twitching.
         * @function
         * @param {Number} [scale=1] - Scale to be applied to position.
         * @returns {OpenSeadragon.Point}
         */
        getTranslationForEdgeSmoothing: function(l, o, r) {
          var f = Math.max(1, Math.ceil((r.x - o.x) / 2)), d = Math.max(1, Math.ceil((r.y - o.y) / 2));
          return new a.Point(f, d).minus(
            this.position.times(a.pixelDensityRatio).times(l || 1).apply(function(h) {
              return h % 1;
            })
          );
        },
        /**
         * Removes tile from its container.
         * @function
         */
        unload: function() {
          this.imgElement && this.imgElement.parentNode && this.imgElement.parentNode.removeChild(this.imgElement), this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element), this.element = null, this.imgElement = null, this.loaded = !1, this.loading = !1;
        }
      };
    })(K), (function(a) {
      a.OverlayPlacement = a.Placement, a.OverlayRotationMode = a.freezeObject({
        NO_ROTATION: 1,
        EXACT: 2,
        BOUNDING_BOX: 3
      }), a.Overlay = function(l, o, r) {
        var f;
        a.isPlainObject(l) ? f = l : f = {
          element: l,
          location: o,
          placement: r
        }, this.elementWrapper = document.createElement("div"), this.element = f.element, this.elementWrapper.appendChild(this.element), this.element.id ? this.elementWrapper.id = "overlay-wrapper-" + this.element.id : this.elementWrapper.id = "overlay-wrapper", this.style = this.elementWrapper.style, this._init(f);
      }, a.Overlay.prototype = {
        // private
        _init: function(l) {
          this.location = l.location, this.placement = l.placement === void 0 ? a.Placement.TOP_LEFT : l.placement, this.onDraw = l.onDraw, this.checkResize = l.checkResize === void 0 ? !0 : l.checkResize, this.width = l.width === void 0 ? null : l.width, this.height = l.height === void 0 ? null : l.height, this.rotationMode = l.rotationMode || a.OverlayRotationMode.EXACT, this.location instanceof a.Rect && (this.width = this.location.width, this.height = this.location.height, this.location = this.location.getTopLeft(), this.placement = a.Placement.TOP_LEFT), this.scales = this.width !== null && this.height !== null, this.bounds = new a.Rect(
            this.location.x,
            this.location.y,
            this.width,
            this.height
          ), this.position = this.location;
        },
        /**
         * Internal function to adjust the position of an overlay
         * depending on it size and placement.
         * @function
         * @param {OpenSeadragon.Point} position
         * @param {OpenSeadragon.Point} size
         */
        adjust: function(l, o) {
          var r = a.Placement.properties[this.placement];
          r && (r.isHorizontallyCentered ? l.x -= o.x / 2 : r.isRight && (l.x -= o.x), r.isVerticallyCentered ? l.y -= o.y / 2 : r.isBottom && (l.y -= o.y));
        },
        /**
         * @function
         */
        destroy: function() {
          var l = this.elementWrapper, o = this.style;
          l.parentNode && (l.parentNode.removeChild(l), l.prevElementParent && (o.display = "none", document.body.appendChild(l))), this.onDraw = null, o.top = "", o.left = "", o.position = "", this.width !== null && (o.width = ""), this.height !== null && (o.height = "");
          var r = a.getCssPropertyWithVendorPrefix(
            "transformOrigin"
          ), f = a.getCssPropertyWithVendorPrefix(
            "transform"
          );
          r && f && (o[r] = "", o[f] = "");
        },
        /**
         * @function
         * @param {Element} container
         */
        drawHTML: function(l, o) {
          var r = this.elementWrapper;
          r.parentNode !== l && (r.prevElementParent = r.parentNode, r.prevNextSibling = r.nextSibling, l.appendChild(r), this.style.position = "absolute", this.size = a.getElementSize(this.elementWrapper));
          var f = this._getOverlayPositionAndSize(o), d = f.position, h = this.size = f.size, c = "";
          o.overlayPreserveContentDirection && (c = o.flipped ? " scaleX(-1)" : " scaleX(1)");
          var g = o.flipped ? -f.rotate : f.rotate, p = o.flipped ? " scaleX(-1)" : "";
          if (this.onDraw)
            this.onDraw(d, h, this.element);
          else {
            var T = this.style, E = this.element.style;
            E.display = "block", T.left = d.x + "px", T.top = d.y + "px", this.width !== null && (E.width = h.x + "px"), this.height !== null && (E.height = h.y + "px");
            var C = a.getCssPropertyWithVendorPrefix(
              "transformOrigin"
            ), b = a.getCssPropertyWithVendorPrefix(
              "transform"
            );
            C && b && (g && !o.flipped ? (E[b] = "", T[C] = this._getTransformOrigin(), T[b] = "rotate(" + g + "deg)") : !g && o.flipped ? (E[b] = c, T[C] = this._getTransformOrigin(), T[b] = p) : g && o.flipped ? (E[b] = c, T[C] = this._getTransformOrigin(), T[b] = "rotate(" + g + "deg)" + p) : (E[b] = "", T[C] = "", T[b] = "")), T.display = "flex";
          }
        },
        // private
        _getOverlayPositionAndSize: function(l) {
          var o = l.pixelFromPoint(this.location, !0), r = this._getSizeInPixels(l);
          this.adjust(o, r);
          var f = 0;
          if (l.getRotation(!0) && this.rotationMode !== a.OverlayRotationMode.NO_ROTATION)
            if (this.rotationMode === a.OverlayRotationMode.BOUNDING_BOX && this.width !== null && this.height !== null) {
              var d = new a.Rect(o.x, o.y, r.x, r.y), h = this._getBoundingBox(d, l.getRotation(!0));
              o = h.getTopLeft(), r = h.getSize();
            } else
              f = l.getRotation(!0);
          return l.flipped && (o.x = l.getContainerSize().x - o.x), {
            position: o,
            size: r,
            rotate: f
          };
        },
        // private
        _getSizeInPixels: function(l) {
          var o = this.size.x, r = this.size.y;
          if (this.width !== null || this.height !== null) {
            var f = l.deltaPixelsFromPointsNoRotate(
              new a.Point(this.width || 0, this.height || 0),
              !0
            );
            this.width !== null && (o = f.x), this.height !== null && (r = f.y);
          }
          if (this.checkResize && (this.width === null || this.height === null)) {
            var d = this.size = a.getElementSize(this.elementWrapper);
            this.width === null && (o = d.x), this.height === null && (r = d.y);
          }
          return new a.Point(o, r);
        },
        // private
        _getBoundingBox: function(l, o) {
          var r = this._getPlacementPoint(l);
          return l.rotate(o, r).getBoundingBox();
        },
        // private
        _getPlacementPoint: function(l) {
          var o = new a.Point(l.x, l.y), r = a.Placement.properties[this.placement];
          return r && (r.isHorizontallyCentered ? o.x += l.width / 2 : r.isRight && (o.x += l.width), r.isVerticallyCentered ? o.y += l.height / 2 : r.isBottom && (o.y += l.height)), o;
        },
        // private
        _getTransformOrigin: function() {
          var l = "", o = a.Placement.properties[this.placement];
          return o && (o.isLeft ? l = "left" : o.isRight && (l = "right"), o.isTop ? l += " top" : o.isBottom && (l += " bottom")), l;
        },
        /**
         * Changes the overlay settings.
         * @function
         * @param {OpenSeadragon.Point|OpenSeadragon.Rect|Object} location
         * If an object is specified, the options are the same than the constructor
         * except for the element which can not be changed.
         * @param {OpenSeadragon.Placement} placement
         */
        update: function(l, o) {
          var r = a.isPlainObject(l) ? l : {
            location: l,
            placement: o
          };
          this._init({
            location: r.location || this.location,
            placement: r.placement !== void 0 ? r.placement : this.placement,
            onDraw: r.onDraw || this.onDraw,
            checkResize: r.checkResize || this.checkResize,
            width: r.width !== void 0 ? r.width : this.width,
            height: r.height !== void 0 ? r.height : this.height,
            rotationMode: r.rotationMode || this.rotationMode
          });
        },
        /**
         * Returns the current bounds of the overlay in viewport coordinates
         * @function
         * @param {OpenSeadragon.Viewport} viewport the viewport
         * @returns {OpenSeadragon.Rect} overlay bounds
         */
        getBounds: function(l) {
          a.console.assert(
            l,
            "A viewport must now be passed to Overlay.getBounds."
          );
          var o = this.width, r = this.height;
          if (o === null || r === null) {
            var f = l.deltaPointsFromPixelsNoRotate(this.size, !0);
            o === null && (o = f.x), r === null && (r = f.y);
          }
          var d = this.location.clone();
          return this.adjust(d, new a.Point(o, r)), this._adjustBoundsForRotation(
            l,
            new a.Rect(d.x, d.y, o, r)
          );
        },
        // private
        _adjustBoundsForRotation: function(l, o) {
          if (!l || l.getRotation(!0) === 0 || this.rotationMode === a.OverlayRotationMode.EXACT)
            return o;
          if (this.rotationMode === a.OverlayRotationMode.BOUNDING_BOX) {
            if (this.width === null || this.height === null)
              return o;
            var r = this._getOverlayPositionAndSize(l);
            return l.viewerElementToViewportRectangle(new a.Rect(
              r.position.x,
              r.position.y,
              r.size.x,
              r.size.y
            ));
          }
          return o.rotate(
            -l.getRotation(!0),
            this._getPlacementPoint(o)
          );
        }
      };
    })(K), (function(a) {
      const l = a;
      l.DrawerBase = class {
        constructor(r) {
          a.console.assert(r.viewer, "[Drawer] options.viewer is required"), a.console.assert(r.viewport, "[Drawer] options.viewport is required"), a.console.assert(r.element, "[Drawer] options.element is required"), this.viewer = r.viewer, this.viewport = r.viewport, this.debugGridColor = typeof r.debugGridColor == "string" ? [r.debugGridColor] : r.debugGridColor || a.DEFAULT_SETTINGS.debugGridColor, this.options = r.options || {}, this.container = a.getElement(r.element), this._renderingTarget = this._createDrawingElement(), this.canvas.style.width = "100%", this.canvas.style.height = "100%", this.canvas.style.position = "absolute", this.canvas.style.left = "0", a.setElementOpacity(this.canvas, this.viewer.opacity, !0), a.setElementPointerEventsNone(this.canvas), a.setElementTouchActionNone(this.canvas), this.container.style.textAlign = "left", this.container.appendChild(this.canvas), this._checkForAPIOverrides();
        }
        // protect the canvas member with a getter
        get canvas() {
          return this._renderingTarget;
        }
        get element() {
          return a.console.error("Drawer.element is deprecated. Use Drawer.container instead."), this.container;
        }
        /**
         * @abstract
         * @returns {String | undefined} What type of drawer this is. Must be overridden by extending classes.
         */
        getType() {
          a.console.error("Drawer.getType must be implemented by child class");
        }
        /**
         * @abstract
         * @returns {Boolean} Whether the drawer implementation is supported by the browser. Must be overridden by extending classes.
         */
        static isSupported() {
          a.console.error("Drawer.isSupported must be implemented by child class");
        }
        /**
         * @abstract
         * @returns {Element} the element to draw into
         * @private
         */
        _createDrawingElement() {
          return a.console.error("Drawer._createDrawingElement must be implemented by child class"), null;
        }
        /**
         * @abstract
         * @param {Array} tiledImages - An array of TiledImages that are ready to be drawn.
         * @private
         */
        draw(r) {
          a.console.error("Drawer.draw must be implemented by child class");
        }
        /**
         * @abstract
         * @returns {Boolean} True if rotation is supported.
         */
        canRotate() {
          a.console.error("Drawer.canRotate must be implemented by child class");
        }
        /**
         * @abstract
         */
        destroy() {
          a.console.error("Drawer.destroy must be implemented by child class");
        }
        /**
         * @param {TiledImage} tiledImage the tiled image that is calling the function
         * @returns {Boolean} Whether this drawer requires enforcing minimum tile overlap to avoid showing seams.
         * @private
         */
        minimumOverlapRequired(r) {
          return !1;
        }
        /**
         * @abstract
         * @param {Boolean} [imageSmoothingEnabled] - Whether or not the image is
         * drawn smoothly on the canvas; see imageSmoothingEnabled in
         * {@link OpenSeadragon.Options} for more explanation.
         */
        setImageSmoothingEnabled(r) {
          a.console.error("Drawer.setImageSmoothingEnabled must be implemented by child class");
        }
        /**
         * Optional public API to draw a rectangle (e.g. for debugging purposes)
         * Child classes can override this method if they wish to support this
         * @param {OpenSeadragon.Rect} rect
         */
        drawDebuggingRect(r) {
          a.console.warn("[drawer].drawDebuggingRect is not implemented by this drawer");
        }
        // Deprecated functions
        clear() {
          a.console.warn("[drawer].clear() is deprecated. The drawer is responsible for clearing itself as needed before drawing tiles.");
        }
        // Private functions
        /**
         * Ensures that child classes have provided implementations for public API methods
         * draw, canRotate, destroy, and setImageSmoothinEnabled. Throws an exception if the original
         * placeholder methods are still in place.
         * @private
         *
         */
        _checkForAPIOverrides() {
          if (this._createDrawingElement === a.DrawerBase.prototype._createDrawingElement)
            throw new Error("[drawer]._createDrawingElement must be implemented by child class");
          if (this.draw === a.DrawerBase.prototype.draw)
            throw new Error("[drawer].draw must be implemented by child class");
          if (this.canRotate === a.DrawerBase.prototype.canRotate)
            throw new Error("[drawer].canRotate must be implemented by child class");
          if (this.destroy === a.DrawerBase.prototype.destroy)
            throw new Error("[drawer].destroy must be implemented by child class");
          if (this.setImageSmoothingEnabled === a.DrawerBase.prototype.setImageSmoothingEnabled)
            throw new Error("[drawer].setImageSmoothingEnabled must be implemented by child class");
        }
        // Utility functions
        /**
         * Scale from OpenSeadragon viewer rectangle to drawer rectangle
         * (ignoring rotation)
         * @param {OpenSeadragon.Rect} rectangle - The rectangle in viewport coordinate system.
         * @returns {OpenSeadragon.Rect} Rectangle in drawer coordinate system.
         */
        viewportToDrawerRectangle(r) {
          var f = this.viewport.pixelFromPointNoRotate(r.getTopLeft(), !0), d = this.viewport.deltaPixelsFromPointsNoRotate(r.getSize(), !0);
          return new a.Rect(
            f.x * a.pixelDensityRatio,
            f.y * a.pixelDensityRatio,
            d.x * a.pixelDensityRatio,
            d.y * a.pixelDensityRatio
          );
        }
        /**
         * This function converts the given point from to the drawer coordinate by
         * multiplying it with the pixel density.
         * This function does not take rotation into account, thus assuming provided
         * point is at 0 degree.
         * @param {OpenSeadragon.Point} point - the pixel point to convert
         * @returns {OpenSeadragon.Point} Point in drawer coordinate system.
         */
        viewportCoordToDrawerCoord(r) {
          var f = this.viewport.pixelFromPointNoRotate(r, !0);
          return new a.Point(
            f.x * a.pixelDensityRatio,
            f.y * a.pixelDensityRatio
          );
        }
        // Internal utility functions
        /**
         * Calculate width and height of the canvas based on viewport dimensions
         * and pixelDensityRatio
         * @private
         * @returns {OpenSeadragon.Point} {x, y} size of the canvas
         */
        _calculateCanvasSize() {
          var r = a.pixelDensityRatio, f = this.viewport.getContainerSize();
          return new l.Point(Math.round(f.x * r), Math.round(f.y * r));
        }
        /**
         * Called by implementations to fire the tiled-image-drawn event (used by tests)
         * @private
         */
        _raiseTiledImageDrawnEvent(r, f) {
          this.viewer && this.viewer.raiseEvent("tiled-image-drawn", {
            tiledImage: r,
            tiles: f
          });
        }
        /**
         * Called by implementations to fire the drawer-error event
         * @private
         */
        _raiseDrawerErrorEvent(r, f) {
          this.viewer && this.viewer.raiseEvent("drawer-error", {
            tiledImage: r,
            drawer: this,
            error: f
          });
        }
      };
    })(K), (function(a) {
      const l = a;
      class o extends l.DrawerBase {
        constructor(f) {
          super(f), this.viewer.rejectEventHandler("tile-drawing", "The HTMLDrawer does not raise the tile-drawing event"), this.viewer.allowEventHandler("tile-drawn");
        }
        /**
         * @returns {Boolean} always true
         */
        static isSupported() {
          return !0;
        }
        /**
         *
         * @returns 'html'
         */
        getType() {
          return "html";
        }
        /**
         * @param {TiledImage} tiledImage the tiled image that is calling the function
         * @returns {Boolean} Whether this drawer requires enforcing minimum tile overlap to avoid showing seams.
         * @private
         */
        minimumOverlapRequired(f) {
          return !0;
        }
        /**
         * create the HTML element (e.g. canvas, div) that the image will be drawn into
         * @returns {Element} the div to draw into
         */
        _createDrawingElement() {
          return a.makeNeutralElement("div");
        }
        /**
         * Draws the TiledImages
         */
        draw(f) {
          var d = this;
          this._prepareNewFrame(), f.forEach(function(h) {
            h.opacity !== 0 && d._drawTiles(h);
          });
        }
        /**
         * @returns {Boolean} False - rotation is not supported.
         */
        canRotate() {
          return !1;
        }
        /**
         * Destroy the drawer (unload current loaded tiles)
         */
        destroy() {
          this.container.removeChild(this.canvas);
        }
        /**
         * This function is ignored by the HTML Drawer. Implementing it is required by DrawerBase.
         * @param {Boolean} [imageSmoothingEnabled] - Whether or not the image is
         * drawn smoothly on the canvas; see imageSmoothingEnabled in
         * {@link OpenSeadragon.Options} for more explanation.
         */
        setImageSmoothingEnabled() {
        }
        /**
         * Clears the Drawer so it's ready to draw another frame.
         * @private
         *
         */
        _prepareNewFrame() {
          this.canvas.innerHTML = "";
        }
        /**
         * Draws a TiledImage.
         * @private
         *
         */
        _drawTiles(f) {
          var d = f.getTilesToDraw().map((g) => g.tile);
          if (!(f.opacity === 0 || d.length === 0 && !f.placeholderFillStyle))
            for (var h = d.length - 1; h >= 0; h--) {
              var c = d[h];
              this._drawTile(c), this.viewer && this.viewer.raiseEvent("tile-drawn", {
                tiledImage: f,
                tile: c
              });
            }
        }
        /**
         * Draws the given tile.
         * @private
         * @param {OpenSeadragon.Tile} tile - The tile to draw.
         * @param {Function} drawingHandler - Method for firing the drawing event if using canvas.
         * drawingHandler({context, tile, rendered})
         */
        _drawTile(f) {
          a.console.assert(f, "[Drawer._drawTile] tile is required");
          let d = this.canvas;
          if (!f.cacheImageRecord) {
            a.console.warn(
              "[Drawer._drawTileToHTML] attempting to draw tile %s when it's not cached",
              f.toString()
            );
            return;
          }
          if (!f.loaded) {
            a.console.warn(
              "Attempting to draw tile %s when it's not yet loaded.",
              f.toString()
            );
            return;
          }
          if (!f.element) {
            var h = f.getImage();
            if (!h)
              return;
            f.element = a.makeNeutralElement("div"), f.imgElement = h.cloneNode(), f.imgElement.style.msInterpolationMode = "nearest-neighbor", f.imgElement.style.width = "100%", f.imgElement.style.height = "100%", f.style = f.element.style, f.style.position = "absolute";
          }
          f.element.parentNode !== d && d.appendChild(f.element), f.imgElement.parentNode !== f.element && f.element.appendChild(f.imgElement), f.style.top = f.position.y + "px", f.style.left = f.position.x + "px", f.style.height = f.size.y + "px", f.style.width = f.size.x + "px", f.flipped && (f.style.transform = "scaleX(-1)"), a.setElementOpacity(f.element, f.opacity);
        }
      }
      a.HTMLDrawer = o;
    })(K), (function(a) {
      const l = a;
      class o extends l.DrawerBase {
        constructor(g) {
          super(g), this.context = this.canvas.getContext("2d"), this.sketchCanvas = null, this.sketchContext = null, this._imageSmoothingEnabled = !0, this.viewer.allowEventHandler("tile-drawn"), this.viewer.allowEventHandler("tile-drawing");
        }
        /**
         * @returns {Boolean} true if canvas is supported by the browser, otherwise false
         */
        static isSupported() {
          return a.supportsCanvas;
        }
        getType() {
          return "canvas";
        }
        /**
         * create the HTML element (e.g. canvas, div) that the image will be drawn into
         * @returns {Element} the canvas to draw into
         */
        _createDrawingElement() {
          let g = a.makeNeutralElement("canvas"), p = this._calculateCanvasSize();
          return g.width = p.x, g.height = p.y, g;
        }
        /**
         * Draws the TiledImages
         */
        draw(g) {
          this._prepareNewFrame(), this.viewer.viewport.getFlip() !== this._viewportFlipped && this._flip();
          for (const p of g)
            p.opacity !== 0 && this._drawTiles(p);
        }
        /**
         * @returns {Boolean} True - rotation is supported.
         */
        canRotate() {
          return !0;
        }
        /**
         * Destroy the drawer (unload current loaded tiles)
         */
        destroy() {
          this.canvas.width = 1, this.canvas.height = 1, this.sketchCanvas = null, this.sketchContext = null, this.container.removeChild(this.canvas);
        }
        /**
         * @param {TiledImage} tiledImage the tiled image that is calling the function
         * @returns {Boolean} Whether this drawer requires enforcing minimum tile overlap to avoid showing seams.
         * @private
         */
        minimumOverlapRequired(g) {
          return !0;
        }
        /**
         * Turns image smoothing on or off for this viewer. Note: Ignored in some (especially older) browsers that do not support this property.
         *
         * @function
         * @param {Boolean} [imageSmoothingEnabled] - Whether or not the image is
         * drawn smoothly on the canvas; see imageSmoothingEnabled in
         * {@link OpenSeadragon.Options} for more explanation.
         */
        setImageSmoothingEnabled(g) {
          this._imageSmoothingEnabled = !!g, this._updateImageSmoothingEnabled(this.context), this.viewer.forceRedraw();
        }
        /**
         * Draw a rectangle onto the canvas
         * @param {OpenSeadragon.Rect} rect
         */
        drawDebuggingRect(g) {
          var p = this.context;
          p.save(), p.lineWidth = 2 * a.pixelDensityRatio, p.strokeStyle = this.debugGridColor[0], p.fillStyle = this.debugGridColor[0], p.strokeRect(
            g.x * a.pixelDensityRatio,
            g.y * a.pixelDensityRatio,
            g.width * a.pixelDensityRatio,
            g.height * a.pixelDensityRatio
          ), p.restore();
        }
        /**
         * Test whether the current context is flipped or not
         * @private
         */
        get _viewportFlipped() {
          return this.context.getTransform().a < 0;
        }
        /**
         * Fires the tile-drawing event.
         * @private
         */
        _raiseTileDrawingEvent(g, p, T, E) {
          this.viewer.raiseEvent("tile-drawing", {
            tiledImage: g,
            context: p,
            tile: T,
            rendered: E
          });
        }
        /**
         * Clears the Drawer so it's ready to draw another frame.
         * @private
         *
         */
        _prepareNewFrame() {
          var g = this._calculateCanvasSize();
          if ((this.canvas.width !== g.x || this.canvas.height !== g.y) && (this.canvas.width = g.x, this.canvas.height = g.y, this._updateImageSmoothingEnabled(this.context), this.sketchCanvas !== null)) {
            var p = this._calculateSketchCanvasSize();
            this.sketchCanvas.width = p.x, this.sketchCanvas.height = p.y, this._updateImageSmoothingEnabled(this.sketchContext);
          }
          this._clear();
        }
        /**
         * @private
         * @param {Boolean} useSketch Whether to clear sketch canvas or main canvas
         * @param {OpenSeadragon.Rect} [bounds] The rectangle to clear
         */
        _clear(g, p) {
          var T = this._getContext(g);
          if (p)
            T.clearRect(p.x, p.y, p.width, p.height);
          else {
            var E = T.canvas;
            T.clearRect(0, 0, E.width, E.height);
          }
        }
        /**
         * Draws a TiledImage.
         * @private
         *
         */
        _drawTiles(g) {
          var p = g.getTilesToDraw().map((ge) => ge.tile);
          if (!(g.opacity === 0 || p.length === 0 && !g.placeholderFillStyle)) {
            var T = p[0], E;
            T && (E = g.opacity < 1 || g.compositeOperation && g.compositeOperation !== "source-over" || !g._isBottomItem() && g.source.hasTransparency(T.context2D, T.getUrl(), T.ajaxHeaders, T.postData));
            var C, b, D = this.viewport.getZoom(!0), z = g.viewportToImageZoom(D);
            p.length > 1 && z > g.smoothTileEdgesMinZoom && !g.iOSDevice && g.getRotation(!0) % 360 === 0 && (E = !0, C = T.getScaleForEdgeSmoothing(), b = T.getTranslationForEdgeSmoothing(
              C,
              this._getCanvasSize(!1),
              this._getCanvasSize(!0)
            ));
            var G;
            E && (C || (G = this.viewport.viewportToViewerElementRectangle(
              g.getClippedBounds(!0)
            ).getIntegerBoundingBox(), G = G.times(a.pixelDensityRatio)), this._clear(!0, G)), C || this._setRotations(g, E);
            var V = !1;
            if (g._clip) {
              this._saveContext(E);
              var de = g.imageToViewportRectangle(g._clip, !0);
              de = de.rotate(-g.getRotation(!0), g._getRotationPoint(!0));
              var ne = this.viewportToDrawerRectangle(de);
              C && (ne = ne.times(C)), b && (ne = ne.translate(b)), this._setClip(ne, E), V = !0;
            }
            if (g._croppingPolygons) {
              var me = this;
              V || this._saveContext(E);
              try {
                var ie = g._croppingPolygons.map(function(ge) {
                  return ge.map(function(Ne) {
                    var Ze = g.imageToViewportCoordinates(Ne.x, Ne.y, !0).rotate(-g.getRotation(!0), g._getRotationPoint(!0)), Xe = me.viewportCoordToDrawerCoord(Ze);
                    return C && (Xe = Xe.times(C)), b && (Xe = Xe.plus(b)), Xe;
                  });
                });
                this._clipWithPolygons(ie, E);
              } catch (ge) {
                a.console.error(ge);
              }
              V = !0;
            }
            if (g._hasOpaqueTile = !1, g.placeholderFillStyle && g._hasOpaqueTile === !1) {
              let ge = this.viewportToDrawerRectangle(g.getBoundsNoRotate(!0));
              C && (ge = ge.times(C)), b && (ge = ge.translate(b));
              let Ne = null;
              typeof g.placeholderFillStyle == "function" ? Ne = g.placeholderFillStyle(g, this.context) : Ne = g.placeholderFillStyle, this._drawRectangle(ge, Ne, E);
            }
            var Te = h(g.subPixelRoundingForTransparency), be = !1;
            if (Te === a.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS)
              be = !0;
            else if (Te === a.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST) {
              var qe = this.viewer && this.viewer.isAnimating();
              be = !qe;
            }
            for (var Oe = 0; Oe < p.length; Oe++)
              T = p[Oe], this._drawTile(
                T,
                g,
                E,
                C,
                b,
                be,
                g.source
              ), this.viewer && this.viewer.raiseEvent("tile-drawn", {
                tiledImage: g,
                tile: T
              });
            V && this._restoreContext(E), C || (g.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(E), this.viewport.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(E)), E && (C && this._setRotations(g), this.blendSketch({
              opacity: g.opacity,
              scale: C,
              translate: b,
              compositeOperation: g.compositeOperation,
              bounds: G
            }), C && (g.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(!1), this.viewport.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(!1))), this._drawDebugInfo(g, p), this._raiseTiledImageDrawnEvent(g, p);
          }
        }
        /**
         * Draws special debug information for a TiledImage if in debug mode.
         * @private
         * @param {OpenSeadragon.Tile[]} lastDrawn - An unordered list of Tiles drawn last frame.
         */
        _drawDebugInfo(g, p) {
          if (g.debugMode)
            for (var T = p.length - 1; T >= 0; T--) {
              var E = p[T];
              try {
                this._drawDebugInfoOnTile(E, p.length, T, g);
              } catch (C) {
                a.console.error(C);
              }
            }
        }
        /**
         * This function will create multiple polygon paths on the drawing context by provided polygons,
         * then clip the context to the paths.
         * @private
         * @param {OpenSeadragon.Point[][]} polygons - an array of polygons. A polygon is an array of OpenSeadragon.Point
         * @param {Boolean} useSketch - Whether to use the sketch canvas or not.
         */
        _clipWithPolygons(g, p) {
          var T = this._getContext(p);
          T.beginPath();
          for (const E of g)
            for (const [C, b] of E.entries())
              T[C === 0 ? "moveTo" : "lineTo"](b.x, b.y);
          T.clip();
        }
        /**
         * Draws the given tile.
         * @private
         * @param {OpenSeadragon.Tile} tile - The tile to draw.
         * @param {OpenSeadragon.TiledImage} tiledImage - The tiled image being drawn.
         * @param {Boolean} useSketch - Whether to use the sketch canvas or not.
         * where <code>rendered</code> is the context with the pre-drawn image.
         * @param {Float} [scale=1] - Apply a scale to tile position and size. Defaults to 1.
         * @param {OpenSeadragon.Point} [translate] A translation vector to offset tile position
         * @param {Boolean} [shouldRoundPositionAndSize] - Tells whether to round
         * position and size of tiles supporting alpha channel in non-transparency
         * context.
         * @param {OpenSeadragon.TileSource} source - The source specification of the tile.
         */
        _drawTile(g, p, T, E, C, b, D) {
          a.console.assert(g, "[Drawer._drawTile] tile is required"), a.console.assert(p, "[Drawer._drawTile] drawingHandler is required");
          var z = this._getContext(T);
          E = E || 1, this._drawTileToCanvas(g, z, p, E, C, b, D);
        }
        /**
         * Renders the tile in a canvas-based context.
         * @private
         * @function
         * @param {OpenSeadragon.Tile} tile - the tile to draw to the canvas
         * @param {Canvas} context
         * @param {OpenSeadragon.TiledImage} tiledImage - Method for firing the drawing event.
         * drawingHandler({context, tile, rendered})
         * where <code>rendered</code> is the context with the pre-drawn image.
         * @param {Number} [scale=1] - Apply a scale to position and size
         * @param {OpenSeadragon.Point} [translate] - A translation vector
         * @param {Boolean} [shouldRoundPositionAndSize] - Tells whether to round
         * position and size of tiles supporting alpha channel in non-transparency
         * context.
         * @param {OpenSeadragon.TileSource} source - The source specification of the tile.
         */
        _drawTileToCanvas(g, p, T, E, C, b, D) {
          var z = g.position.times(a.pixelDensityRatio), G = g.size.times(a.pixelDensityRatio), V;
          if (!g.context2D && !g.cacheImageRecord) {
            a.console.warn(
              "[Drawer._drawTileToCanvas] attempting to draw tile %s when it's not cached",
              g.toString()
            );
            return;
          }
          if (V = g.getCanvasContext(), !g.loaded || !V) {
            a.console.warn(
              "Attempting to draw tile %s when it's not yet loaded.",
              g.toString()
            );
            return;
          }
          p.save(), typeof E == "number" && E !== 1 && (z = z.times(E), G = G.times(E)), C instanceof a.Point && (z = z.plus(C)), p.globalAlpha === 1 && g.hasTransparency && (b && (z.x = Math.round(z.x), z.y = Math.round(z.y), G.x = Math.round(G.x), G.y = Math.round(G.y)), p.clearRect(
            z.x,
            z.y,
            G.x,
            G.y
          )), this._raiseTileDrawingEvent(T, p, g, V);
          var de, ne;
          g.sourceBounds ? (de = Math.min(g.sourceBounds.width, V.canvas.width), ne = Math.min(g.sourceBounds.height, V.canvas.height)) : (de = V.canvas.width, ne = V.canvas.height), p.translate(z.x + G.x / 2, 0), g.flipped && p.scale(-1, 1), p.drawImage(
            V.canvas,
            0,
            0,
            de,
            ne,
            -G.x / 2,
            z.y,
            G.x,
            G.y
          ), p.restore();
        }
        /**
         * Get the context of the main or sketch canvas
         * @private
         * @param {Boolean} useSketch
         * @returns {CanvasRenderingContext2D}
         */
        _getContext(g) {
          var p = this.context;
          if (g) {
            if (this.sketchCanvas === null) {
              this.sketchCanvas = document.createElement("canvas");
              var T = this._calculateSketchCanvasSize();
              if (this.sketchCanvas.width = T.x, this.sketchCanvas.height = T.y, this.sketchContext = this.sketchCanvas.getContext("2d"), this.viewport.getRotation() === 0) {
                var E = this;
                this.viewer.addHandler("rotate", function C() {
                  if (E.viewport.getRotation() !== 0) {
                    E.viewer.removeHandler("rotate", C);
                    var b = E._calculateSketchCanvasSize();
                    E.sketchCanvas.width = b.x, E.sketchCanvas.height = b.y;
                  }
                });
              }
              this._updateImageSmoothingEnabled(this.sketchContext);
            }
            p = this.sketchContext;
          }
          return p;
        }
        /**
         * Save the context of the main or sketch canvas
         * @private
         * @param {Boolean} useSketch
         */
        _saveContext(g) {
          this._getContext(g).save();
        }
        /**
         * Restore the context of the main or sketch canvas
         * @private
         * @param {Boolean} useSketch
         */
        _restoreContext(g) {
          this._getContext(g).restore();
        }
        // private
        _setClip(g, p) {
          var T = this._getContext(p);
          T.beginPath(), T.rect(g.x, g.y, g.width, g.height), T.clip();
        }
        // private
        // used to draw a placeholder rectangle
        _drawRectangle(g, p, T) {
          var E = this._getContext(T);
          E.save(), E.fillStyle = p, E.fillRect(g.x, g.y, g.width, g.height), E.restore();
        }
        /**
         * Blends the sketch canvas in the main canvas.
         * @param {Object} options The options
         * @param {Float} options.opacity The opacity of the blending.
         * @param {Float} [options.scale=1] The scale at which tiles were drawn on
         * the sketch. Default is 1.
         * Use scale to draw at a lower scale and then enlarge onto the main canvas.
         * @param {OpenSeadragon.Point} [options.translate] A translation vector
         * that was used to draw the tiles
         * @param {String} [options.compositeOperation] - How the image is
         * composited onto other images; see compositeOperation in
         * {@link OpenSeadragon.Options} for possible values.
         * @param {OpenSeadragon.Rect} [options.bounds] The part of the sketch
         * canvas to blend in the main canvas. If specified, options.scale and
         * options.translate get ignored.
         */
        blendSketch(g, p, T, E) {
          var C = g;
          a.isPlainObject(C) || (C = {
            opacity: g,
            scale: p,
            translate: T,
            compositeOperation: E
          }), g = C.opacity, E = C.compositeOperation;
          var b = C.bounds;
          if (this.context.save(), this.context.globalAlpha = g, E && (this.context.globalCompositeOperation = E), b)
            b.x < 0 && (b.width += b.x, b.x = 0), b.x + b.width > this.canvas.width && (b.width = this.canvas.width - b.x), b.y < 0 && (b.height += b.y, b.y = 0), b.y + b.height > this.canvas.height && (b.height = this.canvas.height - b.y), this.context.drawImage(
              this.sketchCanvas,
              b.x,
              b.y,
              b.width,
              b.height,
              b.x,
              b.y,
              b.width,
              b.height
            );
          else {
            p = C.scale || 1, T = C.translate;
            var D = T instanceof a.Point ? T : new a.Point(0, 0), z = 0, G = 0;
            if (T) {
              var V = this.sketchCanvas.width - this.canvas.width, de = this.sketchCanvas.height - this.canvas.height;
              z = Math.round(V / 2), G = Math.round(de / 2);
            }
            this.context.drawImage(
              this.sketchCanvas,
              D.x - z * p,
              D.y - G * p,
              (this.canvas.width + 2 * z) * p,
              (this.canvas.height + 2 * G) * p,
              -z,
              -G,
              this.canvas.width + 2 * z,
              this.canvas.height + 2 * G
            );
          }
          this.context.restore();
        }
        // private
        _drawDebugInfoOnTile(g, p, T, E) {
          var C = this.viewer.world.getIndexOfItem(E) % this.debugGridColor.length, b = this.context;
          b.save(), b.lineWidth = 2 * a.pixelDensityRatio, b.font = "small-caps bold " + 13 * a.pixelDensityRatio + "px arial", b.strokeStyle = this.debugGridColor[C], b.fillStyle = this.debugGridColor[C], this._setRotations(E), this._viewportFlipped && this._flip({ point: g.position.plus(g.size.divide(2)) }), b.strokeRect(
            g.position.x * a.pixelDensityRatio,
            g.position.y * a.pixelDensityRatio,
            g.size.x * a.pixelDensityRatio,
            g.size.y * a.pixelDensityRatio
          );
          var D = (g.position.x + g.size.x / 2) * a.pixelDensityRatio, z = (g.position.y + g.size.y / 2) * a.pixelDensityRatio;
          b.translate(D, z);
          const G = this.viewport.getRotation(!0);
          b.rotate(Math.PI / 180 * -G), b.translate(-D, -z), g.x === 0 && g.y === 0 && (b.fillText(
            "Zoom: " + this.viewport.getZoom(),
            g.position.x * a.pixelDensityRatio,
            (g.position.y - 30) * a.pixelDensityRatio
          ), b.fillText(
            "Pan: " + this.viewport.getBounds().toString(),
            g.position.x * a.pixelDensityRatio,
            (g.position.y - 20) * a.pixelDensityRatio
          )), b.fillText(
            "Level: " + g.level,
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 20) * a.pixelDensityRatio
          ), b.fillText(
            "Column: " + g.x,
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 30) * a.pixelDensityRatio
          ), b.fillText(
            "Row: " + g.y,
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 40) * a.pixelDensityRatio
          ), b.fillText(
            "Order: " + T + " of " + p,
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 50) * a.pixelDensityRatio
          ), b.fillText(
            "Size: " + g.size.toString(),
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 60) * a.pixelDensityRatio
          ), b.fillText(
            "Position: " + g.position.toString(),
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 70) * a.pixelDensityRatio
          ), this.viewport.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(), E.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(), b.restore();
        }
        // private
        _updateImageSmoothingEnabled(g) {
          g.msImageSmoothingEnabled = this._imageSmoothingEnabled, g.imageSmoothingEnabled = this._imageSmoothingEnabled;
        }
        /**
         * Get the canvas size
         * @private
         * @param {Boolean} sketch If set to true return the size of the sketch canvas
         * @returns {OpenSeadragon.Point} The size of the canvas
         */
        _getCanvasSize(g) {
          var p = this._getContext(g).canvas;
          return new a.Point(p.width, p.height);
        }
        /**
         * Get the canvas center
         * @private
         * @param {Boolean} sketch If set to true return the center point of the sketch canvas
         * @returns {OpenSeadragon.Point} The center point of the canvas
         */
        _getCanvasCenter() {
          return new a.Point(this.canvas.width / 2, this.canvas.height / 2);
        }
        /**
         * Set rotations for viewport & tiledImage
         * @private
         * @param {OpenSeadragon.TiledImage} tiledImage
         * @param {Boolean} [useSketch=false]
         */
        _setRotations(g, p = !1) {
          var T = !1;
          this.viewport.getRotation(!0) % 360 !== 0 && (this._offsetForRotation({
            degrees: this.viewport.getRotation(!0),
            useSketch: p,
            saveContext: T
          }), T = !1), g.getRotation(!0) % 360 !== 0 && this._offsetForRotation({
            degrees: g.getRotation(!0),
            point: this.viewport.pixelFromPointNoRotate(
              g._getRotationPoint(!0),
              !0
            ),
            useSketch: p,
            saveContext: T
          });
        }
        // private
        _offsetForRotation(g) {
          var p = g.point ? g.point.times(a.pixelDensityRatio) : this._getCanvasCenter(), T = this._getContext(g.useSketch);
          T.save(), T.translate(p.x, p.y), T.rotate(Math.PI / 180 * g.degrees), T.translate(-p.x, -p.y);
        }
        // private
        _flip(g) {
          g = g || {};
          var p = g.point ? g.point.times(a.pixelDensityRatio) : this._getCanvasCenter(), T = this._getContext(g.useSketch);
          T.translate(p.x, 0), T.scale(-1, 1), T.translate(-p.x, 0);
        }
        // private
        _restoreRotationChanges(g) {
          var p = this._getContext(g);
          p.restore();
        }
        // private
        _calculateCanvasSize() {
          var g = a.pixelDensityRatio, p = this.viewport.getContainerSize();
          return {
            // canvas width and height are integers
            x: Math.round(p.x * g),
            y: Math.round(p.y * g)
          };
        }
        // private
        _calculateSketchCanvasSize() {
          var g = this._calculateCanvasSize();
          if (this.viewport.getRotation() === 0)
            return g;
          var p = Math.ceil(Math.sqrt(
            g.x * g.x + g.y * g.y
          ));
          return {
            x: p,
            y: p
          };
        }
      }
      a.CanvasDrawer = o;
      var r = a.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER;
      function f(c) {
        return c !== a.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS && c !== a.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST && c !== a.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER;
      }
      function d(c) {
        return f(c) ? r : c;
      }
      function h(c) {
        if (typeof c == "number")
          return d(c);
        if (!c || !a.Browser)
          return r;
        var g = c[a.Browser.vendor];
        return f(g) && (g = c["*"]), d(g);
      }
    })(K), (function(a) {
      const l = a;
      l.WebGLDrawer = class extends l.DrawerBase {
        constructor(r) {
          super(r), this._destroyed = !1, this._TextureMap = /* @__PURE__ */ new Map(), this._TileMap = /* @__PURE__ */ new Map(), this._gl = null, this._firstPass = null, this._secondPass = null, this._glFrameBuffer = null, this._renderToTexture = null, this._glFramebufferToCanvasTransform = null, this._outputCanvas = null, this._outputContext = null, this._clippingCanvas = null, this._clippingContext = null, this._renderingCanvas = null, this._backupCanvasDrawer = null, this._imageSmoothingEnabled = !0, this._boundToTileReady = (f) => this._tileReadyHandler(f), this._boundToImageUnloaded = (f) => this._imageUnloadedHandler(f), this.viewer.addHandler("tile-ready", this._boundToTileReady), this.viewer.addHandler("image-unloaded", this._boundToImageUnloaded), this.viewer.rejectEventHandler("tile-drawn", "The WebGLDrawer does not raise the tile-drawn event"), this.viewer.rejectEventHandler("tile-drawing", "The WebGLDrawer does not raise the tile-drawing event"), this._setupCanvases(), this._setupRenderer(), this.context = this._outputContext;
        }
        // Public API required by all Drawer implementations
        /**
        * Clean up the renderer, removing all resources
        */
        destroy() {
          if (this._destroyed)
            return;
          let r = this._gl;
          var f = r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS);
          for (let h = 0; h < f; ++h)
            r.activeTexture(r.TEXTURE0 + h), r.bindTexture(r.TEXTURE_2D, null), r.bindTexture(r.TEXTURE_CUBE_MAP, null);
          r.bindBuffer(r.ARRAY_BUFFER, null), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, null), r.bindRenderbuffer(r.RENDERBUFFER, null), r.bindFramebuffer(r.FRAMEBUFFER, null), this._unloadTextures(), r.deleteBuffer(this._secondPass.bufferOutputPosition), r.deleteFramebuffer(this._glFrameBuffer), this._renderingCanvas.width = this._renderingCanvas.height = 1, this._clippingCanvas.width = this._clippingCanvas.height = 1, this._outputCanvas.width = this._outputCanvas.height = 1, this._renderingCanvas = null, this._clippingCanvas = this._clippingContext = null, this._outputCanvas = this._outputContext = null;
          let d = r.getExtension("WEBGL_lose_context");
          d && d.loseContext(), this.viewer.removeHandler("tile-ready", this._boundToTileReady), this.viewer.removeHandler("image-unloaded", this._boundToImageUnloaded), this.viewer.removeHandler("resize", this._resizeHandler), this._gl = null, this._backupCanvasDrawer && (this._backupCanvasDrawer.destroy(), this._backupCanvasDrawer = null), this.container.removeChild(this.canvas), this.viewer.drawer === this && (this.viewer.drawer = null), this._destroyed = !0;
        }
        // Public API required by all Drawer implementations
        /**
        *
        * @returns {Boolean} true
        */
        canRotate() {
          return !0;
        }
        // Public API required by all Drawer implementations
        /**
        * @returns {Boolean} true if canvas and webgl are supported
        */
        static isSupported() {
          let r = document.createElement("canvas"), f = a.isFunction(r.getContext) && r.getContext("webgl"), d = f && f.getExtension("WEBGL_lose_context");
          return d && d.loseContext(), !!f;
        }
        /**
         *
         * @returns 'webgl'
         */
        getType() {
          return "webgl";
        }
        /**
         * @param {TiledImage} tiledImage the tiled image that is calling the function
         * @returns {Boolean} Whether this drawer requires enforcing minimum tile overlap to avoid showing seams.
         * @private
         */
        minimumOverlapRequired(r) {
          return r.isTainted();
        }
        /**
        * create the HTML element (canvas in this case) that the image will be drawn into
        * @private
        * @returns {Element} the canvas to draw into
        */
        _createDrawingElement() {
          let r = a.makeNeutralElement("canvas"), f = this._calculateCanvasSize();
          return r.width = f.x, r.height = f.y, r;
        }
        /**
         * Get the backup renderer (CanvasDrawer) to use if data cannot be used by webgl
         * Lazy loaded
         * @private
         * @returns {CanvasDrawer}
         */
        _getBackupCanvasDrawer() {
          return this._backupCanvasDrawer || (this._backupCanvasDrawer = this.viewer.requestDrawer("canvas", { mainDrawer: !1 }), this._backupCanvasDrawer.canvas.style.setProperty("visibility", "hidden")), this._backupCanvasDrawer;
        }
        /**
        *
        * @param {Array} tiledImages Array of TiledImage objects to draw
        */
        draw(r) {
          let f = this._gl;
          const d = this.viewport.getBoundsNoRotateWithMargins(!0);
          let h = {
            bounds: d,
            center: new l.Point(d.x + d.width / 2, d.y + d.height / 2),
            rotation: this.viewport.getRotation(!0) * Math.PI / 180
          }, c = this.viewport.flipped ? -1 : 1, g = a.Mat3.makeTranslation(-h.center.x, -h.center.y), p = a.Mat3.makeScaling(2 / h.bounds.width * c, -2 / h.bounds.height), T = a.Mat3.makeRotation(-h.rotation), E = p.multiply(T).multiply(g);
          f.bindFramebuffer(f.FRAMEBUFFER, null), f.clear(f.COLOR_BUFFER_BIT), this._outputContext.clearRect(0, 0, this._outputCanvas.width, this._outputCanvas.height);
          let C = !1;
          r.forEach((b, D) => {
            if (b.isTainted()) {
              C && (this._outputContext.drawImage(this._renderingCanvas, 0, 0), f.bindFramebuffer(f.FRAMEBUFFER, null), f.clear(f.COLOR_BUFFER_BIT), C = !1);
              const z = this._getBackupCanvasDrawer();
              z.draw([b]), this._outputContext.drawImage(z.canvas, 0, 0);
            } else {
              let z = b.getTilesToDraw();
              if (b.placeholderFillStyle && b._hasOpaqueTile === !1 && this._drawPlaceholder(b), z.length === 0 || b.getOpacity() === 0)
                return;
              let G = z[0], V = b.compositeOperation || this.viewer.compositeOperation || b._clip || b._croppingPolygons || b.debugMode, de = V || b.opacity < 1 || G.hasTransparency;
              V && (C && this._outputContext.drawImage(this._renderingCanvas, 0, 0), f.bindFramebuffer(f.FRAMEBUFFER, null), f.clear(f.COLOR_BUFFER_BIT)), f.useProgram(this._firstPass.shaderProgram), de ? (f.bindFramebuffer(f.FRAMEBUFFER, this._glFrameBuffer), f.clear(f.COLOR_BUFFER_BIT)) : f.bindFramebuffer(f.FRAMEBUFFER, null);
              let ne = E, me = b.getRotation(!0);
              if (me % 360 !== 0) {
                let ge = a.Mat3.makeRotation(-me * Math.PI / 180), Ne = b.getBoundsNoRotate(!0).getCenter(), Ze = a.Mat3.makeTranslation(Ne.x, Ne.y), Xe = a.Mat3.makeTranslation(-Ne.x, -Ne.y), F = Ze.multiply(ge).multiply(Xe);
                ne = E.multiply(F);
              }
              let ie = this._gl.getParameter(this._gl.MAX_TEXTURE_IMAGE_UNITS);
              if (ie <= 0)
                throw new Error(`WegGL error: bad value for gl parameter MAX_TEXTURE_IMAGE_UNITS (${ie}). This could happen
                        if too many contexts have been created and not released, or there is another problem with the graphics card.`);
              let Te = new Float32Array(ie * 12), be = new Array(ie), qe = new Array(ie), Oe = new Array(ie);
              for (let ge = 0; ge < z.length; ge++) {
                let Ne = z[ge].tile, Ze = ge % ie, Xe = Ze + 1, F = Ne.getCanvasContext(), ee = F ? this._TextureMap.get(F.canvas) : null;
                if (ee || (this._tileReadyHandler({ tile: Ne, tiledImage: b }), ee = F ? this._TextureMap.get(F.canvas) : null), ee && this._getTileData(Ne, b, ee, ne, Ze, Te, be, qe, Oe), Xe === ie || ge === z.length - 1) {
                  for (let se = 0; se <= Xe; se++)
                    f.activeTexture(f.TEXTURE0 + se), f.bindTexture(f.TEXTURE_2D, be[se]);
                  f.bindBuffer(f.ARRAY_BUFFER, this._firstPass.bufferTexturePosition), f.bufferData(f.ARRAY_BUFFER, Te, f.DYNAMIC_DRAW), qe.forEach((se, De) => {
                    f.uniformMatrix3fv(this._firstPass.uTransformMatrices[De], !1, se);
                  }), f.uniform1fv(this._firstPass.uOpacities, new Float32Array(Oe)), f.bindBuffer(f.ARRAY_BUFFER, this._firstPass.bufferOutputPosition), f.vertexAttribPointer(this._firstPass.aOutputPosition, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, this._firstPass.bufferTexturePosition), f.vertexAttribPointer(this._firstPass.aTexturePosition, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, this._firstPass.bufferIndex), f.vertexAttribPointer(this._firstPass.aIndex, 1, f.FLOAT, !1, 0, 0), f.drawArrays(f.TRIANGLES, 0, 6 * Xe);
                }
              }
              de && (f.useProgram(this._secondPass.shaderProgram), f.bindFramebuffer(f.FRAMEBUFFER, null), f.activeTexture(f.TEXTURE0), f.bindTexture(f.TEXTURE_2D, this._renderToTexture), this._gl.uniform1f(this._secondPass.uOpacityMultiplier, b.opacity), f.bindBuffer(f.ARRAY_BUFFER, this._secondPass.bufferTexturePosition), f.vertexAttribPointer(this._secondPass.aTexturePosition, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, this._secondPass.bufferOutputPosition), f.vertexAttribPointer(this._secondPass.aOutputPosition, 2, f.FLOAT, !1, 0, 0), f.drawArrays(f.TRIANGLES, 0, 6)), C = !0, V && (this._applyContext2dPipeline(b, z, D), C = !1, f.bindFramebuffer(f.FRAMEBUFFER, null), f.clear(f.COLOR_BUFFER_BIT)), D === 0 && this._raiseTiledImageDrawnEvent(b, z.map((ge) => ge.tile));
            }
          }), C && this._outputContext.drawImage(this._renderingCanvas, 0, 0);
        }
        // Public API required by all Drawer implementations
        /**
        * Sets whether image smoothing is enabled or disabled
        * @param {Boolean} enabled If true, uses gl.LINEAR as the TEXTURE_MIN_FILTER and TEXTURE_MAX_FILTER, otherwise gl.NEAREST.
        */
        setImageSmoothingEnabled(r) {
          this._imageSmoothingEnabled !== r && (this._imageSmoothingEnabled = r, this._unloadTextures(), this.viewer.world.draw());
        }
        /**
        * Draw a rect onto the output canvas for debugging purposes
        * @param {OpenSeadragon.Rect} rect
        */
        drawDebuggingRect(r) {
          let f = this._outputContext;
          f.save(), f.lineWidth = 2 * a.pixelDensityRatio, f.strokeStyle = this.debugGridColor[0], f.fillStyle = this.debugGridColor[0], f.strokeRect(
            r.x * a.pixelDensityRatio,
            r.y * a.pixelDensityRatio,
            r.width * a.pixelDensityRatio,
            r.height * a.pixelDensityRatio
          ), f.restore();
        }
        // private
        _getTextureDataFromTile(r) {
          return r.getCanvasContext().canvas;
        }
        /**
        * Draw data from the rendering canvas onto the output canvas, with clipping,
        * cropping and/or debug info as requested.
        * @private
        * @param {OpenSeadragon.TiledImage} tiledImage - the tiledImage to draw
        * @param {Array} tilesToDraw - array of objects containing tiles that were drawn
        */
        _applyContext2dPipeline(r, f, d) {
          if (this._outputContext.save(), this._outputContext.globalCompositeOperation = d === 0 ? null : r.compositeOperation || this.viewer.compositeOperation, r._croppingPolygons || r._clip ? (this._renderToClippingCanvas(r), this._outputContext.drawImage(this._clippingCanvas, 0, 0)) : this._outputContext.drawImage(this._renderingCanvas, 0, 0), this._outputContext.restore(), r.debugMode) {
            const h = this.viewer.viewport.getFlip();
            h && this._flip(), this._drawDebugInfo(f, r, h), h && this._flip();
          }
        }
        // private
        _getTileData(r, f, d, h, c, g, p, T, E) {
          let C = d.texture, b = d.position;
          g.set(b, c * 12);
          let D = this._calculateOverlapFraction(r, f), z = r.positionedBounds.width * D.x, G = r.positionedBounds.height * D.y, V = r.positionedBounds.x + (r.x === 0 ? 0 : z), de = r.positionedBounds.y + (r.y === 0 ? 0 : G), ne = r.positionedBounds.x + r.positionedBounds.width - (r.isRightMost ? 0 : z), me = r.positionedBounds.y + r.positionedBounds.height - (r.isBottomMost ? 0 : G), ie = ne - V, Te = me - de, be = new a.Mat3([
            ie,
            0,
            0,
            0,
            Te,
            0,
            V,
            de,
            1
          ]);
          if (r.flipped) {
            let Oe = a.Mat3.makeTranslation(0.5, 0), ge = a.Mat3.makeTranslation(-0.5, 0), Ne = Oe.multiply(a.Mat3.makeScaling(-1, 1)).multiply(ge);
            be = be.multiply(Ne);
          }
          let qe = h.multiply(be);
          E[c] = r.opacity, p[c] = C, T[c] = qe.values;
        }
        // private
        _textureFilter() {
          return this._imageSmoothingEnabled ? this._gl.LINEAR : this._gl.NEAREST;
        }
        // private
        _setupRenderer() {
          let r = this._gl;
          r || a.console.error("_setupCanvases must be called before _setupRenderer"), this._unitQuad = this._makeQuadVertexBuffer(0, 1, 0, 1), this._makeFirstPassShaderProgram(), this._makeSecondPassShaderProgram(), this._renderToTexture = r.createTexture(), r.activeTexture(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, this._renderToTexture), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, this._renderingCanvas.width, this._renderingCanvas.height, 0, r.RGBA, r.UNSIGNED_BYTE, null), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, this._textureFilter()), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), this._glFrameBuffer = r.createFramebuffer(), r.bindFramebuffer(r.FRAMEBUFFER, this._glFrameBuffer), r.framebufferTexture2D(
            r.FRAMEBUFFER,
            r.COLOR_ATTACHMENT0,
            // attach texture as COLOR_ATTACHMENT0
            r.TEXTURE_2D,
            // attach a 2D texture
            this._renderToTexture,
            // the texture to attach
            0
          ), r.enable(r.BLEND), r.blendFunc(r.ONE, r.ONE_MINUS_SRC_ALPHA);
        }
        //private
        _makeFirstPassShaderProgram() {
          let r = this._glNumTextures = this._gl.getParameter(this._gl.MAX_TEXTURE_IMAGE_UNITS), f = () => [...Array(r).keys()].map((C) => `uniform mat3 u_matrix_${C};`).join(`
`), d = () => [...Array(r).keys()].map((C) => `${C > 0 ? "else " : ""}if(int(a_index) == ${C}) { transform_matrix = u_matrix_${C}; }`).join(`
`);
          const h = `
            attribute vec2 a_output_position;
            attribute vec2 a_texture_position;
            attribute float a_index;

            ${f()} // create a uniform mat3 for each potential tile to draw

            varying vec2 v_texture_position;
            varying float v_image_index;

            void main() {

                mat3 transform_matrix; // value will be set by the if/elses in makeConditional()

                ${d()}

                gl_Position = vec4(transform_matrix * vec3(a_output_position, 1), 1);

                v_texture_position = a_texture_position;
                v_image_index = a_index;
            }
            `, c = `
            precision mediump float;

            // our textures
            uniform sampler2D u_images[${r}];
            // our opacities
            uniform float u_opacities[${r}];

            // the varyings passed in from the vertex shader.
            varying vec2 v_texture_position;
            varying float v_image_index;

            void main() {
                // can't index directly with a variable, need to use a loop iterator hack
                for(int i = 0; i < ${r}; ++i){
                    if(i == int(v_image_index)){
                        gl_FragColor = texture2D(u_images[i], v_texture_position) * u_opacities[i];
                    }
                }
            }
            `;
          let g = this._gl, p = this.constructor.initShaderProgram(g, h, c);
          g.useProgram(p), this._firstPass = {
            shaderProgram: p,
            aOutputPosition: g.getAttribLocation(p, "a_output_position"),
            aTexturePosition: g.getAttribLocation(p, "a_texture_position"),
            aIndex: g.getAttribLocation(p, "a_index"),
            uTransformMatrices: [...Array(this._glNumTextures).keys()].map((C) => g.getUniformLocation(p, `u_matrix_${C}`)),
            uImages: g.getUniformLocation(p, "u_images"),
            uOpacities: g.getUniformLocation(p, "u_opacities"),
            bufferOutputPosition: g.createBuffer(),
            bufferTexturePosition: g.createBuffer(),
            bufferIndex: g.createBuffer()
          }, g.uniform1iv(this._firstPass.uImages, [...Array(r).keys()]);
          let T = new Float32Array(r * 12);
          for (let C = 0; C < r; ++C)
            T.set(Float32Array.from(this._unitQuad), C * 12);
          g.bindBuffer(g.ARRAY_BUFFER, this._firstPass.bufferOutputPosition), g.bufferData(g.ARRAY_BUFFER, T, g.STATIC_DRAW), g.enableVertexAttribArray(this._firstPass.aOutputPosition), g.bindBuffer(g.ARRAY_BUFFER, this._firstPass.bufferTexturePosition), g.enableVertexAttribArray(this._firstPass.aTexturePosition), g.bindBuffer(g.ARRAY_BUFFER, this._firstPass.bufferIndex);
          let E = [...Array(this._glNumTextures).keys()].map((C) => Array(6).fill(C)).flat();
          g.bufferData(g.ARRAY_BUFFER, new Float32Array(E), g.STATIC_DRAW), g.enableVertexAttribArray(this._firstPass.aIndex);
        }
        // private
        _makeSecondPassShaderProgram() {
          const r = `
            attribute vec2 a_output_position;
            attribute vec2 a_texture_position;

            uniform mat3 u_matrix;

            varying vec2 v_texture_position;

            void main() {
                gl_Position = vec4(u_matrix * vec3(a_output_position, 1), 1);

                v_texture_position = a_texture_position;
            }
            `, f = `
            precision mediump float;

            // our texture
            uniform sampler2D u_image;

            // the texCoords passed in from the vertex shader.
            varying vec2 v_texture_position;

            // the opacity multiplier for the image
            uniform float u_opacity_multiplier;

            void main() {
                gl_FragColor = texture2D(u_image, v_texture_position);
                gl_FragColor *= u_opacity_multiplier;
            }
            `;
          let d = this._gl, h = this.constructor.initShaderProgram(d, r, f);
          d.useProgram(h), this._secondPass = {
            shaderProgram: h,
            aOutputPosition: d.getAttribLocation(h, "a_output_position"),
            aTexturePosition: d.getAttribLocation(h, "a_texture_position"),
            uMatrix: d.getUniformLocation(h, "u_matrix"),
            uImage: d.getUniformLocation(h, "u_image"),
            uOpacityMultiplier: d.getUniformLocation(h, "u_opacity_multiplier"),
            bufferOutputPosition: d.createBuffer(),
            bufferTexturePosition: d.createBuffer()
          }, d.bindBuffer(d.ARRAY_BUFFER, this._secondPass.bufferOutputPosition), d.bufferData(d.ARRAY_BUFFER, this._unitQuad, d.STATIC_DRAW), d.enableVertexAttribArray(this._secondPass.aOutputPosition), d.bindBuffer(d.ARRAY_BUFFER, this._secondPass.bufferTexturePosition), d.bufferData(d.ARRAY_BUFFER, this._unitQuad, d.DYNAMIC_DRAW), d.enableVertexAttribArray(this._secondPass.aTexturePosition);
          let c = a.Mat3.makeScaling(2, 2).multiply(a.Mat3.makeTranslation(-0.5, -0.5));
          d.uniformMatrix3fv(this._secondPass.uMatrix, !1, c.values);
        }
        // private
        _resizeRenderer() {
          let r = this._gl, f = this._renderingCanvas.width, d = this._renderingCanvas.height;
          r.viewport(0, 0, f, d), r.deleteTexture(this._renderToTexture), this._renderToTexture = r.createTexture(), r.activeTexture(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, this._renderToTexture), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, f, d, 0, r.RGBA, r.UNSIGNED_BYTE, null), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, this._textureFilter()), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.bindFramebuffer(r.FRAMEBUFFER, this._glFrameBuffer), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, this._renderToTexture, 0);
        }
        // private
        _setupCanvases() {
          let r = this;
          this._outputCanvas = this.canvas, this._outputContext = this._outputCanvas.getContext("2d"), this._renderingCanvas = document.createElement("canvas"), this._clippingCanvas = document.createElement("canvas"), this._clippingContext = this._clippingCanvas.getContext("2d"), this._renderingCanvas.width = this._clippingCanvas.width = this._outputCanvas.width, this._renderingCanvas.height = this._clippingCanvas.height = this._outputCanvas.height, this._gl = this._renderingCanvas.getContext("webgl"), this._resizeHandler = function() {
            r._outputCanvas !== r.viewer.drawer.canvas && (r._outputCanvas.style.width = r.viewer.drawer.canvas.clientWidth + "px", r._outputCanvas.style.height = r.viewer.drawer.canvas.clientHeight + "px");
            let f = r._calculateCanvasSize();
            (r._outputCanvas.width !== f.x || r._outputCanvas.height !== f.y) && (r._outputCanvas.width = f.x, r._outputCanvas.height = f.y), r._renderingCanvas.style.width = r._outputCanvas.clientWidth + "px", r._renderingCanvas.style.height = r._outputCanvas.clientHeight + "px", r._renderingCanvas.width = r._clippingCanvas.width = r._outputCanvas.width, r._renderingCanvas.height = r._clippingCanvas.height = r._outputCanvas.height, r._resizeRenderer();
          }, this.viewer.addHandler("resize", this._resizeHandler);
        }
        // private
        _makeQuadVertexBuffer(r, f, d, h) {
          return new Float32Array([
            r,
            h,
            f,
            h,
            r,
            d,
            r,
            d,
            f,
            h,
            f,
            d
          ]);
        }
        // private
        _tileReadyHandler(r) {
          let f = r.tile, d = r.tiledImage;
          if (d.isTainted())
            return;
          let h = f.getCanvasContext(), c = h && h.canvas;
          if (!c || a.isCanvasTainted(c)) {
            d.isTainted() || (d.setTainted(!0), a.console.warn("WebGL cannot be used to draw this TiledImage because it has tainted data. Does crossOriginPolicy need to be set?"), this._raiseDrawerErrorEvent(d, "Tainted data cannot be used by the WebGLDrawer. Falling back to CanvasDrawer for this TiledImage."));
            return;
          }
          if (!this._TextureMap.get(c)) {
            let p = this._gl, T = p.createTexture(), E, C = d.source.tileOverlap, b, D;
            if (f.sourceBounds ? (b = Math.min(f.sourceBounds.width, c.width) / c.width, D = Math.min(f.sourceBounds.height, c.height) / c.height) : (b = 1, D = 1), C > 0) {
              let G = this._calculateOverlapFraction(f, d), V = (f.x === 0 ? 0 : G.x) * b, de = (f.y === 0 ? 0 : G.y) * D, ne = (f.isRightMost ? 1 : 1 - G.x) * b, me = (f.isBottomMost ? 1 : 1 - G.y) * D;
              E = this._makeQuadVertexBuffer(V, ne, de, me);
            } else b === 1 && D === 1 ? E = this._unitQuad : E = this._makeQuadVertexBuffer(0, b, 0, D);
            let z = {
              texture: T,
              position: E
            };
            this._TextureMap.set(c, z), p.activeTexture(p.TEXTURE0), p.bindTexture(p.TEXTURE_2D, T), p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_S, p.CLAMP_TO_EDGE), p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_T, p.CLAMP_TO_EDGE), p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MIN_FILTER, this._textureFilter()), p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MAG_FILTER, this._textureFilter()), this._uploadImageData(h);
          }
        }
        // private
        _calculateOverlapFraction(r, f) {
          let d = f.source.tileOverlap, h = r.sourceBounds.width, c = r.sourceBounds.height, g = (r.x === 0 ? 0 : d) + (r.isRightMost ? 0 : d), p = (r.y === 0 ? 0 : d) + (r.isBottomMost ? 0 : d), T = d / (h + g), E = d / (c + p);
          return {
            x: T,
            y: E
          };
        }
        // private
        _unloadTextures() {
          Array.from(this._TextureMap.keys()).forEach((f) => {
            this._cleanupImageData(f);
          });
        }
        // private
        _uploadImageData(r) {
          let f = this._gl, d = r.canvas;
          try {
            if (!d)
              throw r;
            f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, d);
          } catch (h) {
            a.console.error("Error uploading image data to WebGL", h);
          }
        }
        // private
        _imageUnloadedHandler(r) {
          let f = r.context2D.canvas;
          this._cleanupImageData(f);
        }
        // private
        _cleanupImageData(r) {
          let f = this._TextureMap.get(r);
          this._TextureMap.delete(r), f && this._gl.deleteTexture(f.texture);
        }
        // private
        _setClip() {
        }
        // private
        _renderToClippingCanvas(r) {
          if (this._clippingContext.clearRect(0, 0, this._clippingCanvas.width, this._clippingCanvas.height), this._clippingContext.save(), this.viewer.viewport.getFlip()) {
            const f = new a.Point(this.canvas.width / 2, this.canvas.height / 2);
            this._clippingContext.translate(f.x, 0), this._clippingContext.scale(-1, 1), this._clippingContext.translate(-f.x, 0);
          }
          if (r._clip) {
            let d = [
              { x: r._clip.x, y: r._clip.y },
              { x: r._clip.x + r._clip.width, y: r._clip.y },
              { x: r._clip.x + r._clip.width, y: r._clip.y + r._clip.height },
              { x: r._clip.x, y: r._clip.y + r._clip.height }
            ].map((h) => {
              let c = r.imageToViewportCoordinates(h.x, h.y, !0).rotate(this.viewer.viewport.getRotation(!0), this.viewer.viewport.getCenter(!0));
              return this.viewportCoordToDrawerCoord(c);
            });
            this._clippingContext.beginPath(), d.forEach((h, c) => {
              this._clippingContext[c === 0 ? "moveTo" : "lineTo"](h.x, h.y);
            }), this._clippingContext.clip(), this._setClip();
          }
          if (r._croppingPolygons) {
            let f = r._croppingPolygons.map((d) => d.map((h) => {
              let c = r.imageToViewportCoordinates(h.x, h.y, !0).rotate(this.viewer.viewport.getRotation(!0), this.viewer.viewport.getCenter(!0));
              return this.viewportCoordToDrawerCoord(c);
            }));
            this._clippingContext.beginPath(), f.forEach((d) => {
              d.forEach((h, c) => {
                this._clippingContext[c === 0 ? "moveTo" : "lineTo"](h.x, h.y);
              });
            }), this._clippingContext.clip();
          }
          if (this.viewer.viewport.getFlip()) {
            const f = new a.Point(this.canvas.width / 2, this.canvas.height / 2);
            this._clippingContext.translate(f.x, 0), this._clippingContext.scale(-1, 1), this._clippingContext.translate(-f.x, 0);
          }
          this._clippingContext.drawImage(this._renderingCanvas, 0, 0), this._clippingContext.restore();
        }
        /**
         * Set rotations for viewport & tiledImage
         * @private
         * @param {OpenSeadragon.TiledImage} tiledImage
         */
        _setRotations(r) {
          var f = !1;
          this.viewport.getRotation(!0) % 360 !== 0 && (this._offsetForRotation({
            degrees: this.viewport.getRotation(!0),
            saveContext: f
          }), f = !1), r.getRotation(!0) % 360 !== 0 && this._offsetForRotation({
            degrees: r.getRotation(!0),
            point: this.viewport.pixelFromPointNoRotate(
              r._getRotationPoint(!0),
              !0
            ),
            saveContext: f
          });
        }
        // private
        _offsetForRotation(r) {
          var f = r.point ? r.point.times(a.pixelDensityRatio) : this._getCanvasCenter(), d = this._outputContext;
          d.save(), d.translate(f.x, f.y), d.rotate(Math.PI / 180 * r.degrees), d.translate(-f.x, -f.y);
        }
        // private
        _flip(r) {
          r = r || {};
          var f = r.point ? r.point.times(a.pixelDensityRatio) : this._getCanvasCenter(), d = this._outputContext;
          d.translate(f.x, 0), d.scale(-1, 1), d.translate(-f.x, 0);
        }
        // private
        _drawDebugInfo(r, f, d) {
          for (var h = r.length - 1; h >= 0; h--) {
            var c = r[h].tile;
            try {
              this._drawDebugInfoOnTile(c, r.length, h, f, d);
            } catch (g) {
              a.console.error(g);
            }
          }
        }
        // private
        _drawDebugInfoOnTile(r, f, d, h, c) {
          var g = this.viewer.world.getIndexOfItem(h) % this.debugGridColor.length, p = this.context;
          p.save(), p.lineWidth = 2 * a.pixelDensityRatio, p.font = "small-caps bold " + 13 * a.pixelDensityRatio + "px arial", p.strokeStyle = this.debugGridColor[g], p.fillStyle = this.debugGridColor[g], this._setRotations(h), c && this._flip({ point: r.position.plus(r.size.divide(2)) }), p.strokeRect(
            r.position.x * a.pixelDensityRatio,
            r.position.y * a.pixelDensityRatio,
            r.size.x * a.pixelDensityRatio,
            r.size.y * a.pixelDensityRatio
          );
          var T = (r.position.x + r.size.x / 2) * a.pixelDensityRatio, E = (r.position.y + r.size.y / 2) * a.pixelDensityRatio;
          p.translate(T, E);
          const C = this.viewport.getRotation(!0);
          p.rotate(Math.PI / 180 * -C), p.translate(-T, -E), r.x === 0 && r.y === 0 && (p.fillText(
            "Zoom: " + this.viewport.getZoom(),
            r.position.x * a.pixelDensityRatio,
            (r.position.y - 30) * a.pixelDensityRatio
          ), p.fillText(
            "Pan: " + this.viewport.getBounds().toString(),
            r.position.x * a.pixelDensityRatio,
            (r.position.y - 20) * a.pixelDensityRatio
          )), p.fillText(
            "Level: " + r.level,
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 20) * a.pixelDensityRatio
          ), p.fillText(
            "Column: " + r.x,
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 30) * a.pixelDensityRatio
          ), p.fillText(
            "Row: " + r.y,
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 40) * a.pixelDensityRatio
          ), p.fillText(
            "Order: " + d + " of " + f,
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 50) * a.pixelDensityRatio
          ), p.fillText(
            "Size: " + r.size.toString(),
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 60) * a.pixelDensityRatio
          ), p.fillText(
            "Position: " + r.position.toString(),
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 70) * a.pixelDensityRatio
          ), this.viewport.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(), h.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(), p.restore();
        }
        _drawPlaceholder(r) {
          const f = r.getBounds(!0), d = this.viewportToDrawerRectangle(r.getBounds(!0)), h = this._outputContext;
          let c;
          typeof r.placeholderFillStyle == "function" ? c = r.placeholderFillStyle(r, h) : c = r.placeholderFillStyle, this._offsetForRotation({ degrees: this.viewer.viewport.getRotation(!0) }), h.fillStyle = c, h.translate(d.x, d.y), h.rotate(Math.PI / 180 * f.degrees), h.translate(-d.x, -d.y), h.fillRect(d.x, d.y, d.width, d.height), this._restoreRotationChanges();
        }
        /**
         * Get the canvas center
         * @private
         * @returns {OpenSeadragon.Point} The center point of the canvas
         */
        _getCanvasCenter() {
          return new a.Point(this.canvas.width / 2, this.canvas.height / 2);
        }
        // private
        _restoreRotationChanges() {
          var r = this._outputContext;
          r.restore();
        }
        // modified from https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
        static initShaderProgram(r, f, d) {
          function h(T, E, C) {
            const b = T.createShader(E);
            return T.shaderSource(b, C), T.compileShader(b), T.getShaderParameter(b, T.COMPILE_STATUS) ? b : (a.console.error(
              `An error occurred compiling the shaders: ${T.getShaderInfoLog(b)}`
            ), T.deleteShader(b), null);
          }
          const c = h(r, r.VERTEX_SHADER, f), g = h(r, r.FRAGMENT_SHADER, d), p = r.createProgram();
          return r.attachShader(p, c), r.attachShader(p, g), r.linkProgram(p), r.getProgramParameter(p, r.LINK_STATUS) ? p : (a.console.error(
            `Unable to initialize the shader program: ${r.getProgramInfoLog(
              p
            )}`
          ), null);
        }
      };
    })(K), (function(a) {
      a.Viewport = function(l) {
        var o = arguments;
        o.length && o[0] instanceof a.Point && (l = {
          containerSize: o[0],
          contentSize: o[1],
          config: o[2]
        }), l.config && (a.extend(!0, l, l.config), delete l.config), this._margins = a.extend({
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }, l.margins || {}), delete l.margins, l.initialDegrees = l.degrees, delete l.degrees, a.extend(!0, this, {
          //required settings
          containerSize: null,
          contentSize: null,
          //internal state properties
          zoomPoint: null,
          rotationPivot: null,
          viewer: null,
          //configurable options
          springStiffness: a.DEFAULT_SETTINGS.springStiffness,
          animationTime: a.DEFAULT_SETTINGS.animationTime,
          minZoomImageRatio: a.DEFAULT_SETTINGS.minZoomImageRatio,
          maxZoomPixelRatio: a.DEFAULT_SETTINGS.maxZoomPixelRatio,
          visibilityRatio: a.DEFAULT_SETTINGS.visibilityRatio,
          wrapHorizontal: a.DEFAULT_SETTINGS.wrapHorizontal,
          wrapVertical: a.DEFAULT_SETTINGS.wrapVertical,
          defaultZoomLevel: a.DEFAULT_SETTINGS.defaultZoomLevel,
          minZoomLevel: a.DEFAULT_SETTINGS.minZoomLevel,
          maxZoomLevel: a.DEFAULT_SETTINGS.maxZoomLevel,
          initialDegrees: a.DEFAULT_SETTINGS.degrees,
          flipped: a.DEFAULT_SETTINGS.flipped,
          homeFillsViewer: a.DEFAULT_SETTINGS.homeFillsViewer,
          silenceMultiImageWarnings: a.DEFAULT_SETTINGS.silenceMultiImageWarnings
        }, l), this._updateContainerInnerSize(), this.centerSpringX = new a.Spring({
          initial: 0,
          springStiffness: this.springStiffness,
          animationTime: this.animationTime
        }), this.centerSpringY = new a.Spring({
          initial: 0,
          springStiffness: this.springStiffness,
          animationTime: this.animationTime
        }), this.zoomSpring = new a.Spring({
          exponential: !0,
          initial: 1,
          springStiffness: this.springStiffness,
          animationTime: this.animationTime
        }), this.degreesSpring = new a.Spring({
          initial: l.initialDegrees,
          springStiffness: this.springStiffness,
          animationTime: this.animationTime
        }), this._oldCenterX = this.centerSpringX.current.value, this._oldCenterY = this.centerSpringY.current.value, this._oldZoom = this.zoomSpring.current.value, this._oldDegrees = this.degreesSpring.current.value, this._setContentBounds(new a.Rect(0, 0, 1, 1), 1), this.goHome(!0), this.update();
      }, a.Viewport.prototype = {
        // deprecated
        get degrees() {
          return a.console.warn("Accessing [Viewport.degrees] is deprecated. Use viewport.getRotation instead."), this.getRotation();
        },
        // deprecated
        set degrees(l) {
          a.console.warn("Setting [Viewport.degrees] is deprecated. Use viewport.rotateTo, viewport.rotateBy, or viewport.setRotation instead."), this.rotateTo(l);
        },
        /**
         * Updates the viewport's home bounds and constraints for the given content size.
         * @function
         * @param {OpenSeadragon.Point} contentSize - size of the content in content units
         * @returns {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:reset-size
         */
        resetContentSize: function(l) {
          return a.console.assert(l, "[Viewport.resetContentSize] contentSize is required"), a.console.assert(l instanceof a.Point, "[Viewport.resetContentSize] contentSize must be an OpenSeadragon.Point"), a.console.assert(l.x > 0, "[Viewport.resetContentSize] contentSize.x must be greater than 0"), a.console.assert(l.y > 0, "[Viewport.resetContentSize] contentSize.y must be greater than 0"), this._setContentBounds(new a.Rect(0, 0, 1, l.y / l.x), l.x), this;
        },
        // deprecated
        setHomeBounds: function(l, o) {
          a.console.error("[Viewport.setHomeBounds] this function is deprecated; The content bounds should not be set manually."), this._setContentBounds(l, o);
        },
        // Set the viewport's content bounds
        // @param {OpenSeadragon.Rect} bounds - the new bounds in viewport coordinates
        // without rotation
        // @param {Number} contentFactor - how many content units per viewport unit
        // @fires OpenSeadragon.Viewer.event:reset-size
        // @private
        _setContentBounds: function(l, o) {
          a.console.assert(l, "[Viewport._setContentBounds] bounds is required"), a.console.assert(l instanceof a.Rect, "[Viewport._setContentBounds] bounds must be an OpenSeadragon.Rect"), a.console.assert(l.width > 0, "[Viewport._setContentBounds] bounds.width must be greater than 0"), a.console.assert(l.height > 0, "[Viewport._setContentBounds] bounds.height must be greater than 0"), this._contentBoundsNoRotate = l.clone(), this._contentSizeNoRotate = this._contentBoundsNoRotate.getSize().times(
            o
          ), this._contentBounds = l.rotate(this.getRotation()).getBoundingBox(), this._contentSize = this._contentBounds.getSize().times(o), this._contentAspectRatio = this._contentSize.x / this._contentSize.y, this.viewer && this.viewer.raiseEvent("reset-size", {
            contentSize: this._contentSizeNoRotate.clone(),
            contentFactor: o,
            homeBounds: this._contentBoundsNoRotate.clone(),
            contentBounds: this._contentBounds.clone()
          });
        },
        /**
         * Returns the home zoom in "viewport zoom" value.
         * @function
         * @returns {Number} The home zoom in "viewport zoom".
         */
        getHomeZoom: function() {
          if (this.defaultZoomLevel)
            return this.defaultZoomLevel;
          var l = this._contentAspectRatio / this.getAspectRatio(), o;
          return this.homeFillsViewer ? o = l >= 1 ? l : 1 : o = l >= 1 ? 1 : l, o / this._contentBounds.width;
        },
        /**
         * Returns the home bounds in viewport coordinates.
         * @function
         * @returns {OpenSeadragon.Rect} The home bounds in vewport coordinates.
         */
        getHomeBounds: function() {
          return this.getHomeBoundsNoRotate().rotate(-this.getRotation());
        },
        /**
         * Returns the home bounds in viewport coordinates.
         * This method ignores the viewport rotation. Use
         * {@link OpenSeadragon.Viewport#getHomeBounds} to take it into account.
         * @function
         * @returns {OpenSeadragon.Rect} The home bounds in vewport coordinates.
         */
        getHomeBoundsNoRotate: function() {
          var l = this._contentBounds.getCenter(), o = 1 / this.getHomeZoom(), r = o / this.getAspectRatio();
          return new a.Rect(
            l.x - o / 2,
            l.y - r / 2,
            o,
            r
          );
        },
        /**
         * @function
         * @param {Boolean} immediately
         * @fires OpenSeadragon.Viewer.event:home
         */
        goHome: function(l) {
          return this.viewer && this.viewer.raiseEvent("home", {
            immediately: l
          }), this.fitBounds(this.getHomeBounds(), l);
        },
        /**
         * @function
         */
        getMinZoom: function() {
          var l = this.getHomeZoom(), o = this.minZoomLevel ? this.minZoomLevel : this.minZoomImageRatio * l;
          return o;
        },
        /**
         * @function
         */
        getMaxZoom: function() {
          var l = this.maxZoomLevel;
          return l || (l = this._contentSize.x * this.maxZoomPixelRatio / this._containerInnerSize.x, l /= this._contentBounds.width), Math.max(l, this.getHomeZoom());
        },
        /**
         * @function
         */
        getAspectRatio: function() {
          return this._containerInnerSize.x / this._containerInnerSize.y;
        },
        /**
         * @function
         * @returns {OpenSeadragon.Point} The size of the container, in screen coordinates.
         */
        getContainerSize: function() {
          return new a.Point(
            this.containerSize.x,
            this.containerSize.y
          );
        },
        /**
         * The margins push the "home" region in from the sides by the specified amounts.
         * @function
         * @returns {Object} Properties (Numbers, in screen coordinates): left, top, right, bottom.
         */
        getMargins: function() {
          return a.extend({}, this._margins);
        },
        /**
         * The margins push the "home" region in from the sides by the specified amounts.
         * @function
         * @param {Object} margins - Properties (Numbers, in screen coordinates): left, top, right, bottom.
         */
        setMargins: function(l) {
          a.console.assert(a.type(l) === "object", "[Viewport.setMargins] margins must be an object"), this._margins = a.extend({
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }, l), this._updateContainerInnerSize(), this.viewer && this.viewer.forceRedraw();
        },
        /**
         * Returns the bounds of the visible area in viewport coordinates.
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to, in viewport coordinates.
         */
        getBounds: function(l) {
          return this.getBoundsNoRotate(l).rotate(-this.getRotation(l));
        },
        /**
         * Returns the bounds of the visible area in viewport coordinates.
         * This method ignores the viewport rotation. Use
         * {@link OpenSeadragon.Viewport#getBounds} to take it into account.
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to, in viewport coordinates.
         */
        getBoundsNoRotate: function(l) {
          var o = this.getCenter(l), r = 1 / this.getZoom(l), f = r / this.getAspectRatio();
          return new a.Rect(
            o.x - r / 2,
            o.y - f / 2,
            r,
            f
          );
        },
        /**
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to,
         * including the space taken by margins, in viewport coordinates.
         */
        getBoundsWithMargins: function(l) {
          return this.getBoundsNoRotateWithMargins(l).rotate(
            -this.getRotation(l),
            this.getCenter(l)
          );
        },
        /**
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to,
         * including the space taken by margins, in viewport coordinates.
         */
        getBoundsNoRotateWithMargins: function(l) {
          var o = this.getBoundsNoRotate(l), r = this._containerInnerSize.x * this.getZoom(l);
          return o.x -= this._margins.left / r, o.y -= this._margins.top / r, o.width += (this._margins.left + this._margins.right) / r, o.height += (this._margins.top + this._margins.bottom) / r, o;
        },
        /**
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         */
        getCenter: function(l) {
          var o = new a.Point(
            this.centerSpringX.current.value,
            this.centerSpringY.current.value
          ), r = new a.Point(
            this.centerSpringX.target.value,
            this.centerSpringY.target.value
          ), f, d, h, c, g, p, T, E;
          return l ? o : this.zoomPoint ? (f = this.pixelFromPoint(this.zoomPoint, !0), d = this.getZoom(), h = 1 / d, c = h / this.getAspectRatio(), g = new a.Rect(
            o.x - h / 2,
            o.y - c / 2,
            h,
            c
          ), p = this._pixelFromPoint(this.zoomPoint, g), T = p.minus(f).rotate(-this.getRotation(!0)), E = T.divide(this._containerInnerSize.x * d), r.plus(E)) : r;
        },
        /**
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         */
        getZoom: function(l) {
          return l ? this.zoomSpring.current.value : this.zoomSpring.target.value;
        },
        // private
        _applyZoomConstraints: function(l) {
          return Math.max(
            Math.min(l, this.getMaxZoom()),
            this.getMinZoom()
          );
        },
        /**
         * @function
         * @private
         * @param {OpenSeadragon.Rect} bounds
         * @returns {OpenSeadragon.Rect} constrained bounds.
         */
        _applyBoundaryConstraints: function(l) {
          var o = this.viewportToViewerElementRectangle(l).getBoundingBox(), r = this.viewportToViewerElementRectangle(this._contentBoundsNoRotate).getBoundingBox(), f = !1, d = !1;
          if (!this.wrapHorizontal) {
            var h = o.x + o.width, c = r.x + r.width, g, p, T;
            o.width > r.width ? g = this.visibilityRatio * r.width : g = this.visibilityRatio * o.width, p = r.x - h + g, T = c - o.x - g, g > r.width ? (o.x += (p + T) / 2, f = !0) : T < 0 ? (o.x += T, f = !0) : p > 0 && (o.x += p, f = !0);
          }
          if (!this.wrapVertical) {
            var E = o.y + o.height, C = r.y + r.height, b, D, z;
            o.height > r.height ? b = this.visibilityRatio * r.height : b = this.visibilityRatio * o.height, D = r.y - E + b, z = C - o.y - b, b > r.height ? (o.y += (D + z) / 2, d = !0) : z < 0 ? (o.y += z, d = !0) : D > 0 && (o.y += D, d = !0);
          }
          var G = f || d, V = G ? this.viewerElementToViewportRectangle(o) : l.clone();
          return V.xConstrained = f, V.yConstrained = d, V.constraintApplied = G, V;
        },
        /**
         * @function
         * @private
         * @param {Boolean} [immediately=false] - whether the function that triggered this event was
         * called with the "immediately" flag
         */
        _raiseConstraintsEvent: function(l) {
          this.viewer && this.viewer.raiseEvent("constrain", {
            immediately: l
          });
        },
        /**
         * Enforces the minZoom, maxZoom and visibilityRatio constraints by
         * zooming and panning to the closest acceptable zoom and location.
         * @function
         * @param {Boolean} [immediately=false]
         * @returns {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:constrain if constraints were applied
         */
        applyConstraints: function(l) {
          var o = this.getZoom(), r = this._applyZoomConstraints(o);
          o !== r && this.zoomTo(r, this.zoomPoint, l);
          var f = this.getConstrainedBounds(!1);
          return f.constraintApplied && (this.fitBounds(f, l), this._raiseConstraintsEvent(l)), this;
        },
        /**
         * Equivalent to {@link OpenSeadragon.Viewport#applyConstraints}
         * @function
         * @param {Boolean} [immediately=false]
         * @returns {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:constrain
         */
        ensureVisible: function(l) {
          return this.applyConstraints(l);
        },
        /**
         * @function
         * @private
         * @param {OpenSeadragon.Rect} bounds
         * @param {Object} options (immediately=false, constraints=false)
         * @returns {OpenSeadragon.Viewport} Chainable.
         */
        _fitBounds: function(l, o) {
          o = o || {};
          var r = o.immediately || !1, f = o.constraints || !1, d = this.getAspectRatio(), h = l.getCenter(), c = new a.Rect(
            l.x,
            l.y,
            l.width,
            l.height,
            l.degrees + this.getRotation()
          ).getBoundingBox();
          c.getAspectRatio() >= d ? c.height = c.width / d : c.width = c.height * d, c.x = h.x - c.width / 2, c.y = h.y - c.height / 2;
          var g = 1 / c.width;
          if (r)
            return this.panTo(h, !0), this.zoomTo(g, null, !0), f && this.applyConstraints(!0), this;
          var p = this.getCenter(!0), T = this.getZoom(!0);
          this.panTo(p, !0), this.zoomTo(T, null, !0);
          var E = this.getBounds(), C = this.getZoom();
          if (C === 0 || Math.abs(g / C - 1) < 1e-8)
            return this.zoomTo(g, null, !0), this.panTo(h, r), f && this.applyConstraints(!1), this;
          if (f) {
            this.panTo(h, !1), g = this._applyZoomConstraints(g), this.zoomTo(g, null, !1);
            var b = this.getConstrainedBounds();
            this.panTo(p, !0), this.zoomTo(T, null, !0), this.fitBounds(b);
          } else {
            var D = c.rotate(-this.getRotation()), z = D.getTopLeft().times(g).minus(E.getTopLeft().times(C)).divide(g - C);
            this.zoomTo(g, z, r);
          }
          return this;
        },
        /**
         * Makes the viewport zoom and pan so that the specified bounds take
         * as much space as possible in the viewport.
         * Note: this method ignores the constraints (minZoom, maxZoom and
         * visibilityRatio).
         * Use {@link OpenSeadragon.Viewport#fitBoundsWithConstraints} to enforce
         * them.
         * @function
         * @param {OpenSeadragon.Rect} bounds
         * @param {Boolean} [immediately=false]
         * @returns {OpenSeadragon.Viewport} Chainable.
         */
        fitBounds: function(l, o) {
          return this._fitBounds(l, {
            immediately: o,
            constraints: !1
          });
        },
        /**
         * Makes the viewport zoom and pan so that the specified bounds take
         * as much space as possible in the viewport while enforcing the constraints
         * (minZoom, maxZoom and visibilityRatio).
         * Note: because this method enforces the constraints, part of the
         * provided bounds may end up outside of the viewport.
         * Use {@link OpenSeadragon.Viewport#fitBounds} to ignore them.
         * @function
         * @param {OpenSeadragon.Rect} bounds
         * @param {Boolean} [immediately=false]
         * @returns {OpenSeadragon.Viewport} Chainable.
         */
        fitBoundsWithConstraints: function(l, o) {
          return this._fitBounds(l, {
            immediately: o,
            constraints: !0
          });
        },
        /**
         * Zooms so the image just fills the viewer vertically.
         * @param {Boolean} immediately
         * @returns {OpenSeadragon.Viewport} Chainable.
         */
        fitVertically: function(l) {
          var o = new a.Rect(
            this._contentBounds.x + this._contentBounds.width / 2,
            this._contentBounds.y,
            0,
            this._contentBounds.height
          );
          return this.fitBounds(o, l);
        },
        /**
         * Zooms so the image just fills the viewer horizontally.
         * @param {Boolean} immediately
         * @returns {OpenSeadragon.Viewport} Chainable.
         */
        fitHorizontally: function(l) {
          var o = new a.Rect(
            this._contentBounds.x,
            this._contentBounds.y + this._contentBounds.height / 2,
            this._contentBounds.width,
            0
          );
          return this.fitBounds(o, l);
        },
        /**
         * Returns bounds taking constraints into account
         * Added to improve constrained panning
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         * @returns {OpenSeadragon.Rect} The bounds in viewport coordinates after applying constraints. The returned $.Rect
         *                               contains additional properties constraintsApplied, xConstrained and yConstrained.
         *                               These flags indicate whether the viewport bounds were modified by the constraints
         *                               of the viewer rectangle, and in which dimension(s).
         */
        getConstrainedBounds: function(l) {
          var o, r;
          return o = this.getBounds(l), r = this._applyBoundaryConstraints(o), r;
        },
        /**
         * @function
         * @param {OpenSeadragon.Point} delta
         * @param {Boolean} immediately
         * @returns {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:pan
         */
        panBy: function(l, o) {
          var r = new a.Point(
            this.centerSpringX.target.value,
            this.centerSpringY.target.value
          );
          return this.panTo(r.plus(l), o);
        },
        /**
         * @function
         * @param {OpenSeadragon.Point} center
         * @param {Boolean} immediately
         * @returns {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:pan
         */
        panTo: function(l, o) {
          return o ? (this.centerSpringX.resetTo(l.x), this.centerSpringY.resetTo(l.y)) : (this.centerSpringX.springTo(l.x), this.centerSpringY.springTo(l.y)), this.viewer && this.viewer.raiseEvent("pan", {
            center: l,
            immediately: o
          }), this;
        },
        /**
         * @function
         * @returns {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:zoom
         */
        zoomBy: function(l, o, r) {
          return this.zoomTo(
            this.zoomSpring.target.value * l,
            o,
            r
          );
        },
        /**
         * Zooms to the specified zoom level
         * @function
         * @param {Number} zoom The zoom level to zoom to.
         * @param {OpenSeadragon.Point} [refPoint] The point which will stay at
         * the same screen location. Defaults to the viewport center.
         * @param {Boolean} [immediately=false]
         * @returns {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:zoom
         */
        zoomTo: function(l, o, r) {
          var f = this;
          return this.zoomPoint = o instanceof a.Point && !isNaN(o.x) && !isNaN(o.y) ? o : null, r ? this._adjustCenterSpringsForZoomPoint(function() {
            f.zoomSpring.resetTo(l);
          }) : this.zoomSpring.springTo(l), this.viewer && this.viewer.raiseEvent("zoom", {
            zoom: l,
            refPoint: o,
            immediately: r
          }), this;
        },
        /**
         * Rotates this viewport to the angle specified.
         * @function
         * @param {Number} degrees The degrees to set the rotation to.
         * @param {Boolean} [immediately=false] Whether to animate to the new angle
         * or rotate immediately.
         * * @returns {OpenSeadragon.Viewport} Chainable.
         */
        setRotation: function(l, o) {
          return this.rotateTo(l, null, o);
        },
        /**
         * Gets the current rotation in degrees.
         * @function
         * @param {Boolean} [current=false] True for current rotation, false for target.
         * @returns {Number} The current rotation in degrees.
         */
        getRotation: function(l) {
          return l ? this.degreesSpring.current.value : this.degreesSpring.target.value;
        },
        /**
         * Rotates this viewport to the angle specified around a pivot point. Alias for rotateTo.
         * @function
         * @param {Number} degrees The degrees to set the rotation to.
         * @param {OpenSeadragon.Point} [pivot] (Optional) point in viewport coordinates
         * around which the rotation should be performed. Defaults to the center of the viewport.
         * @param {Boolean} [immediately=false] Whether to animate to the new angle
         * or rotate immediately.
         * * @returns {OpenSeadragon.Viewport} Chainable.
         */
        setRotationWithPivot: function(l, o, r) {
          return this.rotateTo(l, o, r);
        },
        /**
         * Rotates this viewport to the angle specified.
         * @function
         * @param {Number} degrees The degrees to set the rotation to.
         * @param {OpenSeadragon.Point} [pivot] (Optional) point in viewport coordinates
         * around which the rotation should be performed. Defaults to the center of the viewport.
         * @param {Boolean} [immediately=false] Whether to animate to the new angle
         * or rotate immediately.
         * @returns {OpenSeadragon.Viewport} Chainable.
         */
        rotateTo: function(l, o, r) {
          if (!this.viewer || !this.viewer.drawer.canRotate())
            return this;
          if (this.degreesSpring.target.value === l && this.degreesSpring.isAtTargetValue())
            return this;
          if (this.rotationPivot = o instanceof a.Point && !isNaN(o.x) && !isNaN(o.y) ? o : null, r)
            if (this.rotationPivot) {
              var f = l - this._oldDegrees;
              if (!f)
                return this.rotationPivot = null, this;
              this._rotateAboutPivot(l);
            } else
              this.degreesSpring.resetTo(l);
          else {
            var d = a.positiveModulo(this.degreesSpring.current.value, 360), h = a.positiveModulo(l, 360), c = h - d;
            c > 180 ? h -= 360 : c < -180 && (h += 360);
            var g = d - h;
            this.degreesSpring.resetTo(l + g), this.degreesSpring.springTo(l);
          }
          return this._setContentBounds(
            this.viewer.world.getHomeBounds(),
            this.viewer.world.getContentFactor()
          ), this.viewer.forceRedraw(), this.viewer.raiseEvent("rotate", { degrees: l, immediately: !!r, pivot: this.rotationPivot || this.getCenter() }), this;
        },
        /**
         * Rotates this viewport by the angle specified.
         * @function
         * @param {Number} degrees The degrees by which to rotate the viewport.
         * @param {OpenSeadragon.Point} [pivot] (Optional) point in viewport coordinates
         * around which the rotation should be performed. Defaults to the center of the viewport.
         * * @param {Boolean} [immediately=false] Whether to animate to the new angle
         * or rotate immediately.
         * @returns {OpenSeadragon.Viewport} Chainable.
         */
        rotateBy: function(l, o, r) {
          return this.rotateTo(this.degreesSpring.target.value + l, o, r);
        },
        /**
         * @function
         * @returns {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:resize
         */
        resize: function(l, o) {
          var r = this.getBoundsNoRotate(), f = r, d;
          this.containerSize.x = l.x, this.containerSize.y = l.y, this._updateContainerInnerSize(), o && (d = l.x / this.containerSize.x, f.width = r.width * d, f.height = f.width / this.getAspectRatio()), this.viewer && this.viewer.raiseEvent("resize", {
            newContainerSize: l,
            maintain: o
          });
          var h = this.fitBounds(f, !0);
          return this.viewer && this.viewer.raiseEvent("after-resize", {
            newContainerSize: l,
            maintain: o
          }), h;
        },
        // private
        _updateContainerInnerSize: function() {
          this._containerInnerSize = new a.Point(
            Math.max(1, this.containerSize.x - (this._margins.left + this._margins.right)),
            Math.max(1, this.containerSize.y - (this._margins.top + this._margins.bottom))
          );
        },
        /**
         * Update the zoom, degrees, and center (X and Y) springs.
         * @function
         * @returns {Boolean} True if the viewport is still animating, false otherwise.
         */
        update: function() {
          var l = this;
          this._adjustCenterSpringsForZoomPoint(function() {
            l.zoomSpring.update();
          }), this.degreesSpring.isAtTargetValue() && (this.rotationPivot = null), this.centerSpringX.update(), this.centerSpringY.update(), this.rotationPivot ? this._rotateAboutPivot(!0) : this.degreesSpring.update();
          var o = this.centerSpringX.current.value !== this._oldCenterX || this.centerSpringY.current.value !== this._oldCenterY || this.zoomSpring.current.value !== this._oldZoom || this.degreesSpring.current.value !== this._oldDegrees;
          this._oldCenterX = this.centerSpringX.current.value, this._oldCenterY = this.centerSpringY.current.value, this._oldZoom = this.zoomSpring.current.value, this._oldDegrees = this.degreesSpring.current.value;
          var r = o || !this.zoomSpring.isAtTargetValue() || !this.centerSpringX.isAtTargetValue() || !this.centerSpringY.isAtTargetValue() || !this.degreesSpring.isAtTargetValue();
          return r;
        },
        // private - pass true to use spring, or a number for degrees for immediate rotation
        _rotateAboutPivot: function(l) {
          var o = l === !0, r = this.rotationPivot.minus(this.getCenter());
          this.centerSpringX.shiftBy(r.x), this.centerSpringY.shiftBy(r.y), o ? this.degreesSpring.update() : this.degreesSpring.resetTo(l);
          var f = this.degreesSpring.current.value - this._oldDegrees, d = r.rotate(f * -1).times(-1);
          this.centerSpringX.shiftBy(d.x), this.centerSpringY.shiftBy(d.y);
        },
        // private
        _adjustCenterSpringsForZoomPoint: function(l) {
          if (this.zoomPoint) {
            var o = this.pixelFromPoint(this.zoomPoint, !0);
            l();
            var r = this.pixelFromPoint(this.zoomPoint, !0), f = r.minus(o), d = this.deltaPointsFromPixels(
              f,
              !0
            );
            this.centerSpringX.shiftBy(d.x), this.centerSpringY.shiftBy(d.y), this.zoomSpring.isAtTargetValue() && (this.zoomPoint = null);
          } else
            l();
        },
        /**
         * Convert a delta (translation vector) from viewport coordinates to pixels
         * coordinates. This method does not take rotation into account.
         * Consider using deltaPixelsFromPoints if you need to account for rotation.
         * @param {OpenSeadragon.Point} deltaPoints - The translation vector to convert.
         * @param {Boolean} [current=false] - Pass true for the current location;
         * defaults to false (target location).
         * @returns {OpenSeadragon.Point}
         */
        deltaPixelsFromPointsNoRotate: function(l, o) {
          return l.times(
            this._containerInnerSize.x * this.getZoom(o)
          );
        },
        /**
         * Convert a delta (translation vector) from viewport coordinates to pixels
         * coordinates.
         * @param {OpenSeadragon.Point} deltaPoints - The translation vector to convert.
         * @param {Boolean} [current=false] - Pass true for the current location;
         * defaults to false (target location).
         * @returns {OpenSeadragon.Point}
         */
        deltaPixelsFromPoints: function(l, o) {
          return this.deltaPixelsFromPointsNoRotate(
            l.rotate(this.getRotation(o)),
            o
          );
        },
        /**
         * Convert a delta (translation vector) from pixels coordinates to viewport
         * coordinates. This method does not take rotation into account.
         * Consider using deltaPointsFromPixels if you need to account for rotation.
         * @param {OpenSeadragon.Point} deltaPixels - The translation vector to convert.
         * @param {Boolean} [current=false] - Pass true for the current location;
         * defaults to false (target location).
         * @returns {OpenSeadragon.Point}
         */
        deltaPointsFromPixelsNoRotate: function(l, o) {
          return l.divide(
            this._containerInnerSize.x * this.getZoom(o)
          );
        },
        /**
         * Convert a delta (translation vector) from pixels coordinates to viewport
         * coordinates.
         * @param {OpenSeadragon.Point} deltaPixels - The translation vector to convert.
         * @param {Boolean} [current=false] - Pass true for the current location;
         * defaults to false (target location).
         * @returns {OpenSeadragon.Point}
         */
        deltaPointsFromPixels: function(l, o) {
          return this.deltaPointsFromPixelsNoRotate(l, o).rotate(-this.getRotation(o));
        },
        /**
         * Convert viewport coordinates to pixels coordinates.
         * This method does not take rotation into account.
         * Consider using pixelFromPoint if you need to account for rotation.
         * @param {OpenSeadragon.Point} point the viewport coordinates
         * @param {Boolean} [current=false] - Pass true for the current location;
         * defaults to false (target location).
         * @returns {OpenSeadragon.Point}
         */
        pixelFromPointNoRotate: function(l, o) {
          return this._pixelFromPointNoRotate(
            l,
            this.getBoundsNoRotate(o)
          );
        },
        /**
         * Convert viewport coordinates to pixel coordinates.
         * @param {OpenSeadragon.Point} point the viewport coordinates
         * @param {Boolean} [current=false] - Pass true for the current location;
         * defaults to false (target location).
         * @returns {OpenSeadragon.Point}
         */
        pixelFromPoint: function(l, o) {
          return this._pixelFromPoint(l, this.getBoundsNoRotate(o));
        },
        // private
        _pixelFromPointNoRotate: function(l, o) {
          return l.minus(
            o.getTopLeft()
          ).times(
            this._containerInnerSize.x / o.width
          ).plus(
            new a.Point(this._margins.left, this._margins.top)
          );
        },
        // private
        _pixelFromPoint: function(l, o) {
          return this._pixelFromPointNoRotate(
            l.rotate(this.getRotation(!0), this.getCenter(!0)),
            o
          );
        },
        /**
         * Convert pixel coordinates to viewport coordinates.
         * This method does not take rotation into account.
         * Consider using pointFromPixel if you need to account for rotation.
         * @param {OpenSeadragon.Point} pixel Pixel coordinates
         * @param {Boolean} [current=false] - Pass true for the current location;
         * defaults to false (target location).
         * @returns {OpenSeadragon.Point}
         */
        pointFromPixelNoRotate: function(l, o) {
          var r = this.getBoundsNoRotate(o);
          return l.minus(
            new a.Point(this._margins.left, this._margins.top)
          ).divide(
            this._containerInnerSize.x / r.width
          ).plus(
            r.getTopLeft()
          );
        },
        /**
         * Convert pixel coordinates to viewport coordinates.
         * @param {OpenSeadragon.Point} pixel Pixel coordinates
         * @param {Boolean} [current=false] - Pass true for the current location;
         * defaults to false (target location).
         * @returns {OpenSeadragon.Point}
         */
        pointFromPixel: function(l, o) {
          return this.pointFromPixelNoRotate(l, o).rotate(
            -this.getRotation(o),
            this.getCenter(o)
          );
        },
        // private
        _viewportToImageDelta: function(l, o) {
          var r = this._contentBoundsNoRotate.width;
          return new a.Point(
            l * this._contentSizeNoRotate.x / r,
            o * this._contentSizeNoRotate.x / r
          );
        },
        /**
         * Translates from OpenSeadragon viewer coordinate system to image coordinate system.
         * This method can be called either by passing X,Y coordinates or an
         * OpenSeadragon.Point
         * Note: not accurate with multi-image; use TiledImage.viewportToImageCoordinates instead.
         * @function
         * @param {(OpenSeadragon.Point|Number)} viewerX either a point or the X
         * coordinate in viewport coordinate system.
         * @param {Number} [viewerY] Y coordinate in viewport coordinate system.
         * @returns {OpenSeadragon.Point} a point representing the coordinates in the image.
         */
        viewportToImageCoordinates: function(l, o) {
          if (l instanceof a.Point)
            return this.viewportToImageCoordinates(l.x, l.y);
          if (this.viewer) {
            var r = this.viewer.world.getItemCount();
            if (r > 1)
              this.silenceMultiImageWarnings || a.console.error("[Viewport.viewportToImageCoordinates] is not accurate with multi-image; use TiledImage.viewportToImageCoordinates instead.");
            else if (r === 1) {
              var f = this.viewer.world.getItemAt(0);
              return f.viewportToImageCoordinates(l, o, !0);
            }
          }
          return this._viewportToImageDelta(
            l - this._contentBoundsNoRotate.x,
            o - this._contentBoundsNoRotate.y
          );
        },
        // private
        _imageToViewportDelta: function(l, o) {
          var r = this._contentBoundsNoRotate.width;
          return new a.Point(
            l / this._contentSizeNoRotate.x * r,
            o / this._contentSizeNoRotate.x * r
          );
        },
        /**
         * Translates from image coordinate system to OpenSeadragon viewer coordinate system
         * This method can be called either by passing X,Y coordinates or an
         * OpenSeadragon.Point
         * Note: not accurate with multi-image; use TiledImage.imageToViewportCoordinates instead.
         * @function
         * @param {(OpenSeadragon.Point | Number)} imageX the point or the
         * X coordinate in image coordinate system.
         * @param {Number} [imageY] Y coordinate in image coordinate system.
         * @returns {OpenSeadragon.Point} a point representing the coordinates in the viewport.
         */
        imageToViewportCoordinates: function(l, o) {
          if (l instanceof a.Point)
            return this.imageToViewportCoordinates(l.x, l.y);
          if (this.viewer) {
            var r = this.viewer.world.getItemCount();
            if (r > 1)
              this.silenceMultiImageWarnings || a.console.error("[Viewport.imageToViewportCoordinates] is not accurate with multi-image; use TiledImage.imageToViewportCoordinates instead.");
            else if (r === 1) {
              var f = this.viewer.world.getItemAt(0);
              return f.imageToViewportCoordinates(l, o, !0);
            }
          }
          var d = this._imageToViewportDelta(l, o);
          return d.x += this._contentBoundsNoRotate.x, d.y += this._contentBoundsNoRotate.y, d;
        },
        /**
         * Translates from a rectangle which describes a portion of the image in
         * pixel coordinates to OpenSeadragon viewport rectangle coordinates.
         * This method can be called either by passing X,Y,width,height or an
         * OpenSeadragon.Rect
         * Note: not accurate with multi-image; use TiledImage.imageToViewportRectangle instead.
         * @function
         * @param {(OpenSeadragon.Rect | Number)} imageX the rectangle or the X
         * coordinate of the top left corner of the rectangle in image coordinate system.
         * @param {Number} [imageY] the Y coordinate of the top left corner of the rectangle
         * in image coordinate system.
         * @param {Number} [pixelWidth] the width in pixel of the rectangle.
         * @param {Number} [pixelHeight] the height in pixel of the rectangle.
         * @returns {OpenSeadragon.Rect} This image's bounds in viewport coordinates
         */
        imageToViewportRectangle: function(l, o, r, f) {
          var d = l;
          if (d instanceof a.Rect || (d = new a.Rect(l, o, r, f)), this.viewer) {
            var h = this.viewer.world.getItemCount();
            if (h > 1)
              this.silenceMultiImageWarnings || a.console.error("[Viewport.imageToViewportRectangle] is not accurate with multi-image; use TiledImage.imageToViewportRectangle instead.");
            else if (h === 1) {
              var c = this.viewer.world.getItemAt(0);
              return c.imageToViewportRectangle(
                l,
                o,
                r,
                f,
                !0
              );
            }
          }
          var g = this.imageToViewportCoordinates(d.x, d.y), p = this._imageToViewportDelta(d.width, d.height);
          return new a.Rect(
            g.x,
            g.y,
            p.x,
            p.y,
            d.degrees
          );
        },
        /**
         * Translates from a rectangle which describes a portion of
         * the viewport in point coordinates to image rectangle coordinates.
         * This method can be called either by passing X,Y,width,height or an
         * OpenSeadragon.Rect
         * Note: not accurate with multi-image; use TiledImage.viewportToImageRectangle instead.
         * @function
         * @param {(OpenSeadragon.Rect | Number)} viewerX either a rectangle or
         * the X coordinate of the top left corner of the rectangle in viewport
         * coordinate system.
         * @param {Number} [viewerY] the Y coordinate of the top left corner of the rectangle
         * in viewport coordinate system.
         * @param {Number} [pointWidth] the width of the rectangle in viewport coordinate system.
         * @param {Number} [pointHeight] the height of the rectangle in viewport coordinate system.
         */
        viewportToImageRectangle: function(l, o, r, f) {
          var d = l;
          if (d instanceof a.Rect || (d = new a.Rect(l, o, r, f)), this.viewer) {
            var h = this.viewer.world.getItemCount();
            if (h > 1)
              this.silenceMultiImageWarnings || a.console.error("[Viewport.viewportToImageRectangle] is not accurate with multi-image; use TiledImage.viewportToImageRectangle instead.");
            else if (h === 1) {
              var c = this.viewer.world.getItemAt(0);
              return c.viewportToImageRectangle(
                l,
                o,
                r,
                f,
                !0
              );
            }
          }
          var g = this.viewportToImageCoordinates(d.x, d.y), p = this._viewportToImageDelta(d.width, d.height);
          return new a.Rect(
            g.x,
            g.y,
            p.x,
            p.y,
            d.degrees
          );
        },
        /**
         * Convert pixel coordinates relative to the viewer element to image
         * coordinates.
         * Note: not accurate with multi-image.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        viewerElementToImageCoordinates: function(l) {
          var o = this.pointFromPixel(l, !0);
          return this.viewportToImageCoordinates(o);
        },
        /**
         * Convert pixel coordinates relative to the image to
         * viewer element coordinates.
         * Note: not accurate with multi-image.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        imageToViewerElementCoordinates: function(l) {
          var o = this.imageToViewportCoordinates(l);
          return this.pixelFromPoint(o, !0);
        },
        /**
         * Convert pixel coordinates relative to the window to image coordinates.
         * Note: not accurate with multi-image.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        windowToImageCoordinates: function(l) {
          a.console.assert(
            this.viewer,
            "[Viewport.windowToImageCoordinates] the viewport must have a viewer."
          );
          var o = l.minus(
            a.getElementPosition(this.viewer.element)
          );
          return this.viewerElementToImageCoordinates(o);
        },
        /**
         * Convert image coordinates to pixel coordinates relative to the window.
         * Note: not accurate with multi-image.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        imageToWindowCoordinates: function(l) {
          a.console.assert(
            this.viewer,
            "[Viewport.imageToWindowCoordinates] the viewport must have a viewer."
          );
          var o = this.imageToViewerElementCoordinates(l);
          return o.plus(
            a.getElementPosition(this.viewer.element)
          );
        },
        /**
         * Convert pixel coordinates relative to the viewer element to viewport
         * coordinates.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        viewerElementToViewportCoordinates: function(l) {
          return this.pointFromPixel(l, !0);
        },
        /**
         * Convert viewport coordinates to pixel coordinates relative to the
         * viewer element.
         * @param {OpenSeadragon.Point} point
         * @returns {OpenSeadragon.Point}
         */
        viewportToViewerElementCoordinates: function(l) {
          return this.pixelFromPoint(l, !0);
        },
        /**
         * Convert a rectangle in pixel coordinates relative to the viewer element
         * to viewport coordinates.
         * @param {OpenSeadragon.Rect} rectangle the rectangle to convert
         * @returns {OpenSeadragon.Rect} the converted rectangle
         */
        viewerElementToViewportRectangle: function(l) {
          return a.Rect.fromSummits(
            this.pointFromPixel(l.getTopLeft(), !0),
            this.pointFromPixel(l.getTopRight(), !0),
            this.pointFromPixel(l.getBottomLeft(), !0)
          );
        },
        /**
         * Convert a rectangle in viewport coordinates to pixel coordinates relative
         * to the viewer element.
         * @param {OpenSeadragon.Rect} rectangle the rectangle to convert
         * @returns {OpenSeadragon.Rect} the converted rectangle
         */
        viewportToViewerElementRectangle: function(l) {
          return a.Rect.fromSummits(
            this.pixelFromPoint(l.getTopLeft(), !0),
            this.pixelFromPoint(l.getTopRight(), !0),
            this.pixelFromPoint(l.getBottomLeft(), !0)
          );
        },
        /**
         * Convert pixel coordinates relative to the window to viewport coordinates.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        windowToViewportCoordinates: function(l) {
          a.console.assert(
            this.viewer,
            "[Viewport.windowToViewportCoordinates] the viewport must have a viewer."
          );
          var o = l.minus(
            a.getElementPosition(this.viewer.element)
          );
          return this.viewerElementToViewportCoordinates(o);
        },
        /**
         * Convert viewport coordinates to pixel coordinates relative to the window.
         * @param {OpenSeadragon.Point} point
         * @returns {OpenSeadragon.Point}
         */
        viewportToWindowCoordinates: function(l) {
          a.console.assert(
            this.viewer,
            "[Viewport.viewportToWindowCoordinates] the viewport must have a viewer."
          );
          var o = this.viewportToViewerElementCoordinates(l);
          return o.plus(
            a.getElementPosition(this.viewer.element)
          );
        },
        /**
         * Convert a viewport zoom to an image zoom.
         * Image zoom: ratio of the original image size to displayed image size.
         * 1 means original image size, 0.5 half size...
         * Viewport zoom: ratio of the displayed image's width to viewport's width.
         * 1 means identical width, 2 means image's width is twice the viewport's width...
         * Note: not accurate with multi-image.
         * @function
         * @param {Number} viewportZoom The viewport zoom
         * target zoom.
         * @returns {Number} imageZoom The image zoom
         */
        viewportToImageZoom: function(l) {
          if (this.viewer) {
            var o = this.viewer.world.getItemCount();
            if (o > 1)
              this.silenceMultiImageWarnings || a.console.error("[Viewport.viewportToImageZoom] is not accurate with multi-image.");
            else if (o === 1) {
              var r = this.viewer.world.getItemAt(0);
              return r.viewportToImageZoom(l);
            }
          }
          var f = this._contentSizeNoRotate.x, d = this._containerInnerSize.x, h = this._contentBoundsNoRotate.width, c = d / f * h;
          return l * c;
        },
        /**
         * Convert an image zoom to a viewport zoom.
         * Image zoom: ratio of the original image size to displayed image size.
         * 1 means original image size, 0.5 half size...
         * Viewport zoom: ratio of the displayed image's width to viewport's width.
         * 1 means identical width, 2 means image's width is twice the viewport's width...
         * Note: not accurate with multi-image; use [TiledImage.imageToViewportZoom] for the specific image of interest.
         * @function
         * @param {Number} imageZoom The image zoom
         * target zoom.
         * @returns {Number} viewportZoom The viewport zoom
         */
        imageToViewportZoom: function(l) {
          if (this.viewer) {
            var o = this.viewer.world.getItemCount();
            if (o > 1)
              this.silenceMultiImageWarnings || a.console.error("[Viewport.imageToViewportZoom] is not accurate with multi-image. Instead, use [TiledImage.imageToViewportZoom] for the specific image of interest");
            else if (o === 1) {
              var r = this.viewer.world.getItemAt(0);
              return r.imageToViewportZoom(l);
            }
          }
          var f = this._contentSizeNoRotate.x, d = this._containerInnerSize.x, h = this._contentBoundsNoRotate.width, c = f / d / h;
          return l * c;
        },
        /**
         * Toggles flip state and demands a new drawing on navigator and viewer objects.
         * @function
         * @returns {OpenSeadragon.Viewport} Chainable.
         */
        toggleFlip: function() {
          return this.setFlip(!this.getFlip()), this;
        },
        /**
         * Get flip state stored on viewport.
         * @function
         * @returns {Boolean} Flip state.
         */
        getFlip: function() {
          return this.flipped;
        },
        /**
         * Sets flip state according to the state input argument.
         * @function
         * @param {Boolean} state - Flip state to set.
         * @returns {OpenSeadragon.Viewport} Chainable.
         */
        setFlip: function(l) {
          return this.flipped === l ? this : (this.flipped = l, this.viewer.navigator && this.viewer.navigator.setFlip(this.getFlip()), this.viewer.forceRedraw(), this.viewer.raiseEvent("flip", { flipped: l }), this);
        },
        /**
         * Gets current max zoom pixel ratio
         * @function
         * @returns {Number} Max zoom pixel ratio
         */
        getMaxZoomPixelRatio: function() {
          return this.maxZoomPixelRatio;
        },
        /**
         * Sets max zoom pixel ratio
         * @function
         * @param {Number} ratio - Max zoom pixel ratio
         * @param {Boolean} [applyConstraints=true] - Apply constraints after setting ratio;
         * Takes effect only if current zoom is greater than set max zoom pixel ratio
         * @param {Boolean} [immediately=false] - Whether to animate to new zoom
         */
        setMaxZoomPixelRatio: function(l, o = !0, r = !1) {
          a.console.assert(!isNaN(l), "[Viewport.setMaxZoomPixelRatio] ratio must be a number"), !isNaN(l) && (this.maxZoomPixelRatio = l, o && this.getZoom() > this.getMaxZoom() && this.applyConstraints(r));
        }
      };
    })(K), (function(a) {
      a.TiledImage = function(l) {
        this._initialized = !1, a.console.assert(l.tileCache, "[TiledImage] options.tileCache is required"), a.console.assert(l.drawer, "[TiledImage] options.drawer is required"), a.console.assert(l.viewer, "[TiledImage] options.viewer is required"), a.console.assert(l.imageLoader, "[TiledImage] options.imageLoader is required"), a.console.assert(l.source, "[TiledImage] options.source is required"), a.console.assert(
          !l.clip || l.clip instanceof a.Rect,
          "[TiledImage] options.clip must be an OpenSeadragon.Rect if present"
        ), a.EventSource.call(this), this._tileCache = l.tileCache, delete l.tileCache, this._drawer = l.drawer, delete l.drawer, this._imageLoader = l.imageLoader, delete l.imageLoader, l.clip instanceof a.Rect && (this._clip = l.clip.clone()), delete l.clip;
        var o = l.x || 0;
        delete l.x;
        var r = l.y || 0;
        delete l.y, this.normHeight = l.source.dimensions.y / l.source.dimensions.x, this.contentAspectX = l.source.dimensions.x / l.source.dimensions.y;
        var f = 1;
        l.width ? (f = l.width, delete l.width, l.height && (a.console.error("specifying both width and height to a tiledImage is not supported"), delete l.height)) : l.height && (f = l.height / this.normHeight, delete l.height);
        var d = l.fitBounds;
        delete l.fitBounds;
        var h = l.fitBoundsPlacement || K.Placement.CENTER;
        delete l.fitBoundsPlacement;
        var c = l.degrees || 0;
        delete l.degrees;
        var g = l.ajaxHeaders;
        delete l.ajaxHeaders, a.extend(!0, this, {
          //internal state properties
          viewer: null,
          tilesMatrix: {},
          // A '3d' dictionary [level][x][y] --> Tile.
          coverage: {},
          // A '3d' dictionary [level][x][y] --> Boolean; shows what areas have been drawn.
          loadingCoverage: {},
          // A '3d' dictionary [level][x][y] --> Boolean; shows what areas are loaded or are being loaded/blended.
          lastDrawn: [],
          // An unordered list of Tiles drawn last frame.
          lastResetTime: 0,
          // Last time for which the tiledImage was reset.
          _needsDraw: !0,
          // Does the tiledImage need to be drawn again?
          _needsUpdate: !0,
          // Does the tiledImage need to update the viewport again?
          _hasOpaqueTile: !1,
          // Do we have even one fully opaque tile?
          _tilesLoading: 0,
          // The number of pending tile requests.
          _tilesToDraw: [],
          // info about the tiles currently in the viewport, two deep: array[level][tile]
          _lastDrawn: [],
          // array of tiles that were last fetched by the drawer
          _isBlending: !1,
          // Are any tiles still being blended?
          _wasBlending: !1,
          // Were any tiles blending before the last draw?
          _isTainted: !1,
          // Has a Tile been found with tainted data?
          //configurable settings
          springStiffness: a.DEFAULT_SETTINGS.springStiffness,
          animationTime: a.DEFAULT_SETTINGS.animationTime,
          minZoomImageRatio: a.DEFAULT_SETTINGS.minZoomImageRatio,
          wrapHorizontal: a.DEFAULT_SETTINGS.wrapHorizontal,
          wrapVertical: a.DEFAULT_SETTINGS.wrapVertical,
          immediateRender: a.DEFAULT_SETTINGS.immediateRender,
          blendTime: a.DEFAULT_SETTINGS.blendTime,
          alwaysBlend: a.DEFAULT_SETTINGS.alwaysBlend,
          minPixelRatio: a.DEFAULT_SETTINGS.minPixelRatio,
          smoothTileEdgesMinZoom: a.DEFAULT_SETTINGS.smoothTileEdgesMinZoom,
          iOSDevice: a.DEFAULT_SETTINGS.iOSDevice,
          debugMode: a.DEFAULT_SETTINGS.debugMode,
          crossOriginPolicy: a.DEFAULT_SETTINGS.crossOriginPolicy,
          ajaxWithCredentials: a.DEFAULT_SETTINGS.ajaxWithCredentials,
          placeholderFillStyle: a.DEFAULT_SETTINGS.placeholderFillStyle,
          opacity: a.DEFAULT_SETTINGS.opacity,
          preload: a.DEFAULT_SETTINGS.preload,
          compositeOperation: a.DEFAULT_SETTINGS.compositeOperation,
          subPixelRoundingForTransparency: a.DEFAULT_SETTINGS.subPixelRoundingForTransparency,
          maxTilesPerFrame: a.DEFAULT_SETTINGS.maxTilesPerFrame
        }, l), this._preload = this.preload, delete this.preload, this._fullyLoaded = !1, this._xSpring = new a.Spring({
          initial: o,
          springStiffness: this.springStiffness,
          animationTime: this.animationTime
        }), this._ySpring = new a.Spring({
          initial: r,
          springStiffness: this.springStiffness,
          animationTime: this.animationTime
        }), this._scaleSpring = new a.Spring({
          initial: f,
          springStiffness: this.springStiffness,
          animationTime: this.animationTime
        }), this._degreesSpring = new a.Spring({
          initial: c,
          springStiffness: this.springStiffness,
          animationTime: this.animationTime
        }), this._updateForScale(), d && this.fitBounds(d, h, !0), this._ownAjaxHeaders = {}, this.setAjaxHeaders(g, !1), this._initialized = !0;
      }, a.extend(
        a.TiledImage.prototype,
        a.EventSource.prototype,
        /** @lends OpenSeadragon.TiledImage.prototype */
        {
          /**
           * @returns {Boolean} Whether the TiledImage needs to be drawn.
           */
          needsDraw: function() {
            return this._needsDraw;
          },
          /**
           * Mark the tiled image as needing to be (re)drawn
           */
          redraw: function() {
            this._needsDraw = !0;
          },
          /**
           * @returns {Boolean} Whether all tiles necessary for this TiledImage to draw at the current view have been loaded.
           */
          getFullyLoaded: function() {
            return this._fullyLoaded;
          },
          // private
          _setFullyLoaded: function(l) {
            l !== this._fullyLoaded && (this._fullyLoaded = l, this.raiseEvent("fully-loaded-change", {
              fullyLoaded: this._fullyLoaded
            }));
          },
          /**
           * Clears all tiles and triggers an update on the next call to
           * {@link OpenSeadragon.TiledImage#update}.
           */
          reset: function() {
            this._tileCache.clearTilesFor(this), this.lastResetTime = a.now(), this._needsDraw = !0;
          },
          /**
           * Updates the TiledImage's bounds, animating if needed. Based on the new
           * bounds, updates the levels and tiles to be drawn into the viewport.
           * @param viewportChanged Whether the viewport changed meaning tiles need to be updated.
           * @returns {Boolean} Whether the TiledImage needs to be drawn.
           */
          update: function(l) {
            let o = this._xSpring.update(), r = this._ySpring.update(), f = this._scaleSpring.update(), d = this._degreesSpring.update(), h = o || r || f || d || this._needsUpdate;
            if (h || l || !this._fullyLoaded) {
              let c = this._updateLevelsForViewport();
              this._setFullyLoaded(c);
            }
            return this._needsUpdate = !1, h ? (this._updateForScale(), this._raiseBoundsChange(), this._needsDraw = !0, !0) : !1;
          },
          /**
           * Mark this TiledImage as having been drawn, so that it will only be drawn
           * again if something changes about the image. If the image is still blending,
           * this will have no effect.
           * @returns {Boolean} whether the item still needs to be drawn due to blending
           */
          setDrawn: function() {
            return this._needsDraw = this._isBlending || this._wasBlending, this._needsDraw;
          },
          /**
           * Set the internal _isTainted flag for this TiledImage. Lazy loaded - not
           * checked each time a Tile is loaded, but can be set if a consumer of the
           * tiles (e.g. a Drawer) discovers a Tile to have tainted data so that further
           * checks are not needed and alternative rendering strategies can be used.
           * @private
           */
          setTainted(l) {
            this._isTainted = l;
          },
          /**
           * @private
           * @returns {Boolean} whether the TiledImage has been marked as tainted
           */
          isTainted() {
            return this._isTainted;
          },
          /**
           * Destroy the TiledImage (unload current loaded tiles).
           */
          destroy: function() {
            this.reset(), this.source.destroy && this.source.destroy(this.viewer);
          },
          /**
           * Get this TiledImage's bounds in viewport coordinates.
           * @param {Boolean} [current=false] - Pass true for the current location;
           * false for target location.
           * @returns {OpenSeadragon.Rect} This TiledImage's bounds in viewport coordinates.
           */
          getBounds: function(l) {
            return this.getBoundsNoRotate(l).rotate(this.getRotation(l), this._getRotationPoint(l));
          },
          /**
           * Get this TiledImage's bounds in viewport coordinates without taking
           * rotation into account.
           * @param {Boolean} [current=false] - Pass true for the current location;
           * false for target location.
           * @returns {OpenSeadragon.Rect} This TiledImage's bounds in viewport coordinates.
           */
          getBoundsNoRotate: function(l) {
            return l ? new a.Rect(
              this._xSpring.current.value,
              this._ySpring.current.value,
              this._worldWidthCurrent,
              this._worldHeightCurrent
            ) : new a.Rect(
              this._xSpring.target.value,
              this._ySpring.target.value,
              this._worldWidthTarget,
              this._worldHeightTarget
            );
          },
          // deprecated
          getWorldBounds: function() {
            return a.console.error("[TiledImage.getWorldBounds] is deprecated; use TiledImage.getBounds instead"), this.getBounds();
          },
          /**
           * Get the bounds of the displayed part of the tiled image.
           * @param {Boolean} [current=false] Pass true for the current location,
           * false for the target location.
           * @returns {$.Rect} The clipped bounds in viewport coordinates.
           */
          getClippedBounds: function(l) {
            var o = this.getBoundsNoRotate(l);
            if (this._clip) {
              var r = l ? this._worldWidthCurrent : this._worldWidthTarget, f = r / this.source.dimensions.x, d = this._clip.times(f);
              o = new a.Rect(
                o.x + d.x,
                o.y + d.y,
                d.width,
                d.height
              );
            }
            return o.rotate(this.getRotation(l), this._getRotationPoint(l));
          },
          /**
           * @function
           * @param {Number} level
           * @param {Number} x
           * @param {Number} y
           * @returns {OpenSeadragon.Rect} Where this tile fits (in normalized coordinates).
           */
          getTileBounds: function(l, o, r) {
            var f = this.source.getNumTiles(l), d = (f.x + o % f.x) % f.x, h = (f.y + r % f.y) % f.y, c = this.source.getTileBounds(l, d, h);
            return this.getFlip() && (c.x = Math.max(0, 1 - c.x - c.width)), c.x += (o - d) / f.x, c.y += this._worldHeightCurrent / this._worldWidthCurrent * ((r - h) / f.y), c;
          },
          /**
           * @returns {OpenSeadragon.Point} This TiledImage's content size, in original pixels.
           */
          getContentSize: function() {
            return new a.Point(this.source.dimensions.x, this.source.dimensions.y);
          },
          /**
           * @returns {OpenSeadragon.Point} The TiledImage's content size, in window coordinates.
           */
          getSizeInWindowCoordinates: function() {
            var l = this.imageToWindowCoordinates(new a.Point(0, 0)), o = this.imageToWindowCoordinates(this.getContentSize());
            return new a.Point(o.x - l.x, o.y - l.y);
          },
          // private
          _viewportToImageDelta: function(l, o, r) {
            var f = r ? this._scaleSpring.current.value : this._scaleSpring.target.value;
            return new a.Point(
              l * (this.source.dimensions.x / f),
              o * (this.source.dimensions.y * this.contentAspectX / f)
            );
          },
          /**
           * Translates from OpenSeadragon viewer coordinate system to image coordinate system.
           * This method can be called either by passing X,Y coordinates or an {@link OpenSeadragon.Point}.
           * @param {Number|OpenSeadragon.Point} viewerX - The X coordinate or point in viewport coordinate system.
           * @param {Number} [viewerY] - The Y coordinate in viewport coordinate system.
           * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
           * @returns {OpenSeadragon.Point} A point representing the coordinates in the image.
           */
          viewportToImageCoordinates: function(l, o, r) {
            var f;
            return l instanceof a.Point ? (r = o, f = l) : f = new a.Point(l, o), f = f.rotate(-this.getRotation(r), this._getRotationPoint(r)), r ? this._viewportToImageDelta(
              f.x - this._xSpring.current.value,
              f.y - this._ySpring.current.value
            ) : this._viewportToImageDelta(
              f.x - this._xSpring.target.value,
              f.y - this._ySpring.target.value
            );
          },
          // private
          _imageToViewportDelta: function(l, o, r) {
            var f = r ? this._scaleSpring.current.value : this._scaleSpring.target.value;
            return new a.Point(
              l / this.source.dimensions.x * f,
              o / this.source.dimensions.y / this.contentAspectX * f
            );
          },
          /**
           * Translates from image coordinate system to OpenSeadragon viewer coordinate system
           * This method can be called either by passing X,Y coordinates or an {@link OpenSeadragon.Point}.
           * @param {Number|OpenSeadragon.Point} imageX - The X coordinate or point in image coordinate system.
           * @param {Number} [imageY] - The Y coordinate in image coordinate system.
           * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
           * @returns {OpenSeadragon.Point} A point representing the coordinates in the viewport.
           */
          imageToViewportCoordinates: function(l, o, r) {
            l instanceof a.Point && (r = o, o = l.y, l = l.x);
            var f = this._imageToViewportDelta(l, o, r);
            return r ? (f.x += this._xSpring.current.value, f.y += this._ySpring.current.value) : (f.x += this._xSpring.target.value, f.y += this._ySpring.target.value), f.rotate(this.getRotation(r), this._getRotationPoint(r));
          },
          /**
           * Translates from a rectangle which describes a portion of the image in
           * pixel coordinates to OpenSeadragon viewport rectangle coordinates.
           * This method can be called either by passing X,Y,width,height or an {@link OpenSeadragon.Rect}.
           * @param {Number|OpenSeadragon.Rect} imageX - The left coordinate or rectangle in image coordinate system.
           * @param {Number} [imageY] - The top coordinate in image coordinate system.
           * @param {Number} [pixelWidth] - The width in pixel of the rectangle.
           * @param {Number} [pixelHeight] - The height in pixel of the rectangle.
           * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
           * @returns {OpenSeadragon.Rect} A rect representing the coordinates in the viewport.
           */
          imageToViewportRectangle: function(l, o, r, f, d) {
            var h = l;
            h instanceof a.Rect ? d = o : h = new a.Rect(l, o, r, f);
            var c = this.imageToViewportCoordinates(h.getTopLeft(), d), g = this._imageToViewportDelta(h.width, h.height, d);
            return new a.Rect(
              c.x,
              c.y,
              g.x,
              g.y,
              h.degrees + this.getRotation(d)
            );
          },
          /**
           * Translates from a rectangle which describes a portion of
           * the viewport in point coordinates to image rectangle coordinates.
           * This method can be called either by passing X,Y,width,height or an {@link OpenSeadragon.Rect}.
           * @param {Number|OpenSeadragon.Rect} viewerX - The left coordinate or rectangle in viewport coordinate system.
           * @param {Number} [viewerY] - The top coordinate in viewport coordinate system.
           * @param {Number} [pointWidth] - The width in viewport coordinate system.
           * @param {Number} [pointHeight] - The height in viewport coordinate system.
           * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
           * @returns {OpenSeadragon.Rect} A rect representing the coordinates in the image.
           */
          viewportToImageRectangle: function(l, o, r, f, d) {
            var h = l;
            l instanceof a.Rect ? d = o : h = new a.Rect(l, o, r, f);
            var c = this.viewportToImageCoordinates(h.getTopLeft(), d), g = this._viewportToImageDelta(h.width, h.height, d);
            return new a.Rect(
              c.x,
              c.y,
              g.x,
              g.y,
              h.degrees - this.getRotation(d)
            );
          },
          /**
           * Convert pixel coordinates relative to the viewer element to image
           * coordinates.
           * @param {OpenSeadragon.Point} pixel
           * @returns {OpenSeadragon.Point}
           */
          viewerElementToImageCoordinates: function(l) {
            var o = this.viewport.pointFromPixel(l, !0);
            return this.viewportToImageCoordinates(o);
          },
          /**
           * Convert pixel coordinates relative to the image to
           * viewer element coordinates.
           * @param {OpenSeadragon.Point} pixel
           * @returns {OpenSeadragon.Point}
           */
          imageToViewerElementCoordinates: function(l) {
            var o = this.imageToViewportCoordinates(l);
            return this.viewport.pixelFromPoint(o, !0);
          },
          /**
           * Convert pixel coordinates relative to the window to image coordinates.
           * @param {OpenSeadragon.Point} pixel
           * @returns {OpenSeadragon.Point}
           */
          windowToImageCoordinates: function(l) {
            var o = l.minus(
              K.getElementPosition(this.viewer.element)
            );
            return this.viewerElementToImageCoordinates(o);
          },
          /**
           * Convert image coordinates to pixel coordinates relative to the window.
           * @param {OpenSeadragon.Point} pixel
           * @returns {OpenSeadragon.Point}
           */
          imageToWindowCoordinates: function(l) {
            var o = this.imageToViewerElementCoordinates(l);
            return o.plus(
              K.getElementPosition(this.viewer.element)
            );
          },
          // private
          // Convert rectangle in viewport coordinates to this tiled image point
          // coordinates (x in [0, 1] and y in [0, aspectRatio])
          _viewportToTiledImageRectangle: function(l) {
            var o = this._scaleSpring.current.value;
            return l = l.rotate(-this.getRotation(!0), this._getRotationPoint(!0)), new a.Rect(
              (l.x - this._xSpring.current.value) / o,
              (l.y - this._ySpring.current.value) / o,
              l.width / o,
              l.height / o,
              l.degrees
            );
          },
          /**
           * Convert a viewport zoom to an image zoom.
           * Image zoom: ratio of the original image size to displayed image size.
           * 1 means original image size, 0.5 half size...
           * Viewport zoom: ratio of the displayed image's width to viewport's width.
           * 1 means identical width, 2 means image's width is twice the viewport's width...
           * @function
           * @param {Number} viewportZoom The viewport zoom
           * @returns {Number} imageZoom The image zoom
           */
          viewportToImageZoom: function(l) {
            var o = this._scaleSpring.current.value * this.viewport._containerInnerSize.x / this.source.dimensions.x;
            return o * l;
          },
          /**
           * Convert an image zoom to a viewport zoom.
           * Image zoom: ratio of the original image size to displayed image size.
           * 1 means original image size, 0.5 half size...
           * Viewport zoom: ratio of the displayed image's width to viewport's width.
           * 1 means identical width, 2 means image's width is twice the viewport's width...
           * Note: not accurate with multi-image.
           * @function
           * @param {Number} imageZoom The image zoom
           * @returns {Number} viewportZoom The viewport zoom
           */
          imageToViewportZoom: function(l) {
            var o = this._scaleSpring.current.value * this.viewport._containerInnerSize.x / this.source.dimensions.x;
            return l / o;
          },
          /**
           * Sets the TiledImage's position in the world.
           * @param {OpenSeadragon.Point} position - The new position, in viewport coordinates.
           * @param {Boolean} [immediately=false] - Whether to animate to the new position or snap immediately.
           * @fires OpenSeadragon.TiledImage.event:bounds-change
           */
          setPosition: function(l, o) {
            var r = this._xSpring.target.value === l.x && this._ySpring.target.value === l.y;
            if (o) {
              if (r && this._xSpring.current.value === l.x && this._ySpring.current.value === l.y)
                return;
              this._xSpring.resetTo(l.x), this._ySpring.resetTo(l.y), this._needsDraw = !0, this._needsUpdate = !0;
            } else {
              if (r)
                return;
              this._xSpring.springTo(l.x), this._ySpring.springTo(l.y), this._needsDraw = !0, this._needsUpdate = !0;
            }
            r || this._raiseBoundsChange();
          },
          /**
           * Sets the TiledImage's width in the world, adjusting the height to match based on aspect ratio.
           * @param {Number} width - The new width, in viewport coordinates.
           * @param {Boolean} [immediately=false] - Whether to animate to the new size or snap immediately.
           * @fires OpenSeadragon.TiledImage.event:bounds-change
           */
          setWidth: function(l, o) {
            this._setScale(l, o);
          },
          /**
           * Sets the TiledImage's height in the world, adjusting the width to match based on aspect ratio.
           * @param {Number} height - The new height, in viewport coordinates.
           * @param {Boolean} [immediately=false] - Whether to animate to the new size or snap immediately.
           * @fires OpenSeadragon.TiledImage.event:bounds-change
           */
          setHeight: function(l, o) {
            this._setScale(l / this.normHeight, o);
          },
          /**
           * Sets an array of polygons to crop the TiledImage during draw tiles.
           * The render function will use the default non-zero winding rule.
           * @param {OpenSeadragon.Point[][]} polygons - represented in an array of point object in image coordinates.
           * Example format: [
           *  [{x: 197, y:172}, {x: 226, y:172}, {x: 226, y:198}, {x: 197, y:198}], // First polygon
           *  [{x: 328, y:200}, {x: 330, y:199}, {x: 332, y:201}, {x: 329, y:202}]  // Second polygon
           *  [{x: 321, y:201}, {x: 356, y:205}, {x: 341, y:250}] // Third polygon
           * ]
           */
          setCroppingPolygons: function(l) {
            var o = function(f) {
              return f instanceof a.Point || typeof f.x == "number" && typeof f.y == "number";
            }, r = function(f) {
              return f.map(function(d) {
                try {
                  if (o(d))
                    return { x: d.x, y: d.y };
                  throw new Error();
                } catch {
                  throw new Error("A Provided cropping polygon point is not supported");
                }
              });
            };
            try {
              if (!a.isArray(l))
                throw new Error("Provided cropping polygon is not an array");
              this._croppingPolygons = l.map(function(f) {
                return r(f);
              }), this._needsDraw = !0;
            } catch (f) {
              a.console.error("[TiledImage.setCroppingPolygons] Cropping polygon format not supported"), a.console.error(f), this.resetCroppingPolygons();
            }
          },
          /**
           * Resets the cropping polygons, thus next render will remove all cropping
           * polygon effects.
           */
          resetCroppingPolygons: function() {
            this._croppingPolygons = null, this._needsDraw = !0;
          },
          /**
           * Positions and scales the TiledImage to fit in the specified bounds.
           * Note: this method fires OpenSeadragon.TiledImage.event:bounds-change
           * twice
           * @param {OpenSeadragon.Rect} bounds The bounds to fit the image into.
           * @param {OpenSeadragon.Placement} [anchor=OpenSeadragon.Placement.CENTER]
           * How to anchor the image in the bounds.
           * @param {Boolean} [immediately=false] Whether to animate to the new size
           * or snap immediately.
           * @fires OpenSeadragon.TiledImage.event:bounds-change
           */
          fitBounds: function(l, o, r) {
            o = o || a.Placement.CENTER;
            var f = a.Placement.properties[o], d = this.contentAspectX, h = 0, c = 0, g = 1, p = 1;
            if (this._clip && (d = this._clip.getAspectRatio(), g = this._clip.width / this.source.dimensions.x, p = this._clip.height / this.source.dimensions.y, l.getAspectRatio() > d ? (h = this._clip.x / this._clip.height * l.height, c = this._clip.y / this._clip.height * l.height) : (h = this._clip.x / this._clip.width * l.width, c = this._clip.y / this._clip.width * l.width)), l.getAspectRatio() > d) {
              var T = l.height / p, E = 0;
              f.isHorizontallyCentered ? E = (l.width - l.height * d) / 2 : f.isRight && (E = l.width - l.height * d), this.setPosition(
                new a.Point(l.x - h + E, l.y - c),
                r
              ), this.setHeight(T, r);
            } else {
              var C = l.width / g, b = 0;
              f.isVerticallyCentered ? b = (l.height - l.width / d) / 2 : f.isBottom && (b = l.height - l.width / d), this.setPosition(
                new a.Point(l.x - h, l.y - c + b),
                r
              ), this.setWidth(C, r);
            }
          },
          /**
           * @returns {OpenSeadragon.Rect|null} The TiledImage's current clip rectangle,
           * in image pixels, or null if none.
           */
          getClip: function() {
            return this._clip ? this._clip.clone() : null;
          },
          /**
           * @param {OpenSeadragon.Rect|null} newClip - An area, in image pixels, to clip to
           * (portions of the image outside of this area will not be visible). Only works on
           * browsers that support the HTML5 canvas.
           * @fires OpenSeadragon.TiledImage.event:clip-change
           */
          setClip: function(l) {
            a.console.assert(
              !l || l instanceof a.Rect,
              "[TiledImage.setClip] newClip must be an OpenSeadragon.Rect or null"
            ), l instanceof a.Rect ? this._clip = l.clone() : this._clip = null, this._needsUpdate = !0, this._needsDraw = !0, this.raiseEvent("clip-change");
          },
          /**
           * @returns {Boolean} Whether the TiledImage should be flipped before rendering.
           */
          getFlip: function() {
            return this.flipped;
          },
          /**
           * @param {Boolean} flip Whether the TiledImage should be flipped before rendering.
           * @fires OpenSeadragon.TiledImage.event:bounds-change
           */
          setFlip: function(l) {
            this.flipped = l;
          },
          get flipped() {
            return this._flipped;
          },
          set flipped(l) {
            let o = this._flipped !== !!l;
            this._flipped = !!l, o && (this.update(!0), this._needsDraw = !0, this._raiseBoundsChange());
          },
          get wrapHorizontal() {
            return this._wrapHorizontal;
          },
          set wrapHorizontal(l) {
            let o = this._wrapHorizontal !== !!l;
            this._wrapHorizontal = !!l, this._initialized && o && (this.update(!0), this._needsDraw = !0);
          },
          get wrapVertical() {
            return this._wrapVertical;
          },
          set wrapVertical(l) {
            let o = this._wrapVertical !== !!l;
            this._wrapVertical = !!l, this._initialized && o && (this.update(!0), this._needsDraw = !0);
          },
          get debugMode() {
            return this._debugMode;
          },
          set debugMode(l) {
            this._debugMode = !!l, this._needsDraw = !0;
          },
          /**
           * @returns {Number} The TiledImage's current opacity.
           */
          getOpacity: function() {
            return this.opacity;
          },
          /**
           * @param {Number} opacity Opacity the tiled image should be drawn at.
           * @fires OpenSeadragon.TiledImage.event:opacity-change
           */
          setOpacity: function(l) {
            this.opacity = l;
          },
          get opacity() {
            return this._opacity;
          },
          set opacity(l) {
            l !== this.opacity && (this._opacity = l, this._needsDraw = !0, this.raiseEvent("opacity-change", {
              opacity: this.opacity
            }));
          },
          /**
           * @returns {Boolean} whether the tiledImage can load its tiles even when it has zero opacity.
           */
          getPreload: function() {
            return this._preload;
          },
          /**
           * Set true to load even when hidden. Set false to block loading when hidden.
           */
          setPreload: function(l) {
            this._preload = !!l, this._needsDraw = !0;
          },
          /**
           * Get the rotation of this tiled image in degrees.
           * @param {Boolean} [current=false] True for current rotation, false for target.
           * @returns {Number} the rotation of this tiled image in degrees.
           */
          getRotation: function(l) {
            return l ? this._degreesSpring.current.value : this._degreesSpring.target.value;
          },
          /**
           * Set the current rotation of this tiled image in degrees.
           * @param {Number} degrees the rotation in degrees.
           * @param {Boolean} [immediately=false] Whether to animate to the new angle
           * or rotate immediately.
           * @fires OpenSeadragon.TiledImage.event:bounds-change
           */
          setRotation: function(l, o) {
            this._degreesSpring.target.value === l && this._degreesSpring.isAtTargetValue() || (o ? this._degreesSpring.resetTo(l) : this._degreesSpring.springTo(l), this._needsDraw = !0, this._needsUpdate = !0, this._raiseBoundsChange());
          },
          /**
           * Get the region of this tiled image that falls within the viewport.
           * @returns {OpenSeadragon.Rect} the region of this tiled image that falls within the viewport.
           * Returns false for images with opacity==0 unless preload==true
           */
          getDrawArea: function() {
            if (this._opacity === 0 && !this._preload)
              return !1;
            var l = this._viewportToTiledImageRectangle(
              this.viewport.getBoundsWithMargins(!0)
            );
            if (!this.wrapHorizontal && !this.wrapVertical) {
              var o = this._viewportToTiledImageRectangle(
                this.getClippedBounds(!0)
              );
              l = l.intersection(o);
            }
            return l;
          },
          /**
           *
           * @returns {Array} Array of Tiles that make up the current view
           */
          getTilesToDraw: function() {
            let l = this._tilesToDraw.flat();
            return this._updateTilesInViewport(l), l = this._tilesToDraw.flat(), l.forEach((o) => {
              o.tile.beingDrawn = !0;
            }), this._lastDrawn = l, l;
          },
          /**
           * Get the point around which this tiled image is rotated
           * @private
           * @param {Boolean} current True for current rotation point, false for target.
           * @returns {OpenSeadragon.Point}
           */
          _getRotationPoint: function(l) {
            return this.getBoundsNoRotate(l).getCenter();
          },
          get compositeOperation() {
            return this._compositeOperation;
          },
          set compositeOperation(l) {
            l !== this._compositeOperation && (this._compositeOperation = l, this._needsDraw = !0, this.raiseEvent("composite-operation-change", {
              compositeOperation: this._compositeOperation
            }));
          },
          /**
           * @returns {String} The TiledImage's current compositeOperation.
           */
          getCompositeOperation: function() {
            return this._compositeOperation;
          },
          /**
           * @param {String} compositeOperation the tiled image should be drawn with this globalCompositeOperation.
           * @fires OpenSeadragon.TiledImage.event:composite-operation-change
           */
          setCompositeOperation: function(l) {
            this.compositeOperation = l;
          },
          /**
           * Update headers to include when making AJAX requests.
           *
           * Unless `propagate` is set to false (which is likely only useful in rare circumstances),
           * the updated headers are propagated to all tiles and queued image loader jobs.
           *
           * Note that the rules for merging headers still apply, i.e. headers returned by
           * {@link OpenSeadragon.TileSource#getTileAjaxHeaders} take precedence over
           * the headers here in the tiled image (`TiledImage.ajaxHeaders`).
           *
           * @function
           * @param {Object} ajaxHeaders Updated AJAX headers, which will be merged over any headers specified in {@link OpenSeadragon.Options}.
           * @param {Boolean} [propagate=true] Whether to propagate updated headers to existing tiles and queued image loader jobs.
           */
          setAjaxHeaders: function(l, o) {
            if (l === null && (l = {}), !a.isPlainObject(l)) {
              console.error("[TiledImage.setAjaxHeaders] Ignoring invalid headers, must be a plain object");
              return;
            }
            this._ownAjaxHeaders = l, this._updateAjaxHeaders(o);
          },
          /**
           * Update headers to include when making AJAX requests.
           *
           * This function has the same effect as calling {@link OpenSeadragon.TiledImage#setAjaxHeaders},
           * except that the headers for this tiled image do not change. This is especially useful
           * for propagating updated headers from {@link OpenSeadragon.TileSource#getTileAjaxHeaders}
           * to existing tiles.
           *
           * @private
           * @function
           * @param {Boolean} [propagate=true] Whether to propagate updated headers to existing tiles and queued image loader jobs.
           */
          _updateAjaxHeaders: function(l) {
            if (l === void 0 && (l = !0), a.isPlainObject(this.viewer.ajaxHeaders) ? this.ajaxHeaders = a.extend({}, this.viewer.ajaxHeaders, this._ownAjaxHeaders) : this.ajaxHeaders = this._ownAjaxHeaders, l) {
              var o, r, f, d;
              for (var h in this.tilesMatrix) {
                o = this.source.getNumTiles(h);
                for (var c in this.tilesMatrix[h]) {
                  r = (o.x + c % o.x) % o.x;
                  for (var g in this.tilesMatrix[h][c])
                    if (f = (o.y + g % o.y) % o.y, d = this.tilesMatrix[h][c][g], d.loadWithAjax = this.loadTilesWithAjax, d.loadWithAjax) {
                      var p = this.source.getTileAjaxHeaders(h, r, f);
                      d.ajaxHeaders = a.extend({}, this.ajaxHeaders, p);
                    } else
                      d.ajaxHeaders = null;
                }
              }
              for (var T = 0; T < this._imageLoader.jobQueue.length; T++) {
                var E = this._imageLoader.jobQueue[T];
                E.loadWithAjax = E.tile.loadWithAjax, E.ajaxHeaders = E.tile.loadWithAjax ? E.tile.ajaxHeaders : null;
              }
            }
          },
          // private
          _setScale: function(l, o) {
            var r = this._scaleSpring.target.value === l;
            if (o) {
              if (r && this._scaleSpring.current.value === l)
                return;
              this._scaleSpring.resetTo(l), this._updateForScale(), this._needsDraw = !0, this._needsUpdate = !0;
            } else {
              if (r)
                return;
              this._scaleSpring.springTo(l), this._updateForScale(), this._needsDraw = !0, this._needsUpdate = !0;
            }
            r || this._raiseBoundsChange();
          },
          // private
          _updateForScale: function() {
            this._worldWidthTarget = this._scaleSpring.target.value, this._worldHeightTarget = this.normHeight * this._scaleSpring.target.value, this._worldWidthCurrent = this._scaleSpring.current.value, this._worldHeightCurrent = this.normHeight * this._scaleSpring.current.value;
          },
          // private
          _raiseBoundsChange: function() {
            this.raiseEvent("bounds-change");
          },
          // private
          _isBottomItem: function() {
            return this.viewer.world.getItemAt(0) === this;
          },
          // private
          _getLevelsInterval: function() {
            var l = Math.max(
              this.source.minLevel,
              Math.floor(Math.log(this.minZoomImageRatio) / Math.log(2))
            ), o = this.viewport.deltaPixelsFromPointsNoRotate(
              this.source.getPixelRatio(0),
              !0
            ).x * this._scaleSpring.current.value, r = Math.min(
              Math.abs(this.source.maxLevel),
              Math.abs(Math.floor(
                Math.log(o / this.minPixelRatio) / Math.log(2)
              ))
            );
            return r = Math.max(r, this.source.minLevel || 0), l = Math.min(l, r), {
              lowestLevel: l,
              highestLevel: r
            };
          },
          // returns boolean flag of whether the image should be marked as fully loaded
          _updateLevelsForViewport: function() {
            var l = this._getLevelsInterval(), o = l.lowestLevel, r = l.highestLevel, f = [], d = this.getDrawArea(), h = a.now();
            if (this._lastDrawn.forEach((ne) => {
              ne.tile.beingDrawn = !1;
            }), this._tilesToDraw = [], this._tilesLoading = 0, this.loadingCoverage = {}, !d)
              return this._needsDraw = !1, this._fullyLoaded;
            var c = new Array(r - o + 1);
            for (let ne = 0, me = r; me >= o; me--, ne++)
              c[ne] = me;
            for (let ne = r + 1; ne <= this.source.maxLevel; ne++) {
              var g = this.tilesMatrix[ne] && this.tilesMatrix[ne][0] && this.tilesMatrix[ne][0][0];
              if (g && g.isBottomMost && g.isRightMost && g.loaded) {
                c.push(ne);
                break;
              }
            }
            let p = !1;
            for (let ne = 0; ne < c.length; ne++) {
              let me = c[ne];
              var T = this.viewport.deltaPixelsFromPointsNoRotate(
                this.source.getPixelRatio(me),
                !0
              ).x * this._scaleSpring.current.value;
              if (ne === c.length - 1 || T >= this.minPixelRatio)
                p = !0;
              else if (!p)
                continue;
              var E = this.viewport.deltaPixelsFromPointsNoRotate(
                this.source.getPixelRatio(me),
                !1
              ).x * this._scaleSpring.current.value, C = this.viewport.deltaPixelsFromPointsNoRotate(
                this.source.getPixelRatio(
                  Math.max(
                    this.source.getClosestLevel(),
                    0
                  )
                ),
                !1
              ).x * this._scaleSpring.current.value, b = this.immediateRender ? 1 : C, D = Math.min(1, (T - 0.5) / 0.5), z = b / Math.abs(
                b - E
              ), G = this._updateLevel(
                me,
                D,
                z,
                d,
                h,
                f
              );
              f = G.bestTiles;
              var V = G.updatedTiles.filter((ie) => ie.loaded), de = /* @__PURE__ */ (function(ie, Te, be) {
                return function(qe) {
                  return {
                    tile: qe,
                    level: ie,
                    levelOpacity: Te,
                    currentTime: be
                  };
                };
              })(me, D, h);
              if (this._tilesToDraw[me] = V.map(de), this._providesCoverage(this.coverage, me))
                break;
            }
            return f && f.length > 0 ? (f.forEach(function(ne) {
              ne && !ne.context2D && this._loadTile(ne, h);
            }, this), this._needsDraw = !0, !1) : this._tilesLoading === 0;
          },
          /**
           * Update all tiles that contribute to the current view
           * @private
           *
           */
          _updateTilesInViewport: function(l) {
            let o = a.now(), r = this;
            this._tilesLoading = 0, this._wasBlending = this._isBlending, this._isBlending = !1, this.loadingCoverage = {};
            let f = l.length ? l[0].level : 0;
            if (!this.getDrawArea())
              return;
            function h(g) {
              let p = g.tile;
              if (p && p.loaded) {
                let T = r._blendTile(
                  p,
                  p.x,
                  p.y,
                  g.level,
                  g.levelOpacity,
                  o,
                  f
                );
                r._isBlending = r._isBlending || T, r._needsDraw = r._needsDraw || T || r._wasBlending;
              }
            }
            let c = 0;
            for (let g = 0; g < l.length; g++) {
              let p = l[g];
              h(p), this._providesCoverage(this.coverage, p.level) && (c = Math.max(c, p.level));
            }
            if (c > 0)
              for (let g in this._tilesToDraw)
                g < c && delete this._tilesToDraw[g];
          },
          /**
           * Updates the opacity of a tile according to the time it has been on screen
           * to perform a fade-in.
           * Updates coverage once a tile is fully opaque.
           * Returns whether the fade-in has completed.
           * @private
           *
           * @param {OpenSeadragon.Tile} tile
           * @param {Number} x
           * @param {Number} y
           * @param {Number} level
           * @param {Number} levelOpacity
           * @param {Number} currentTime
           * @param {Boolean} lowestLevel
           * @returns {Boolean} true if blending did not yet finish
           */
          _blendTile: function(l, o, r, f, d, h, c) {
            let g = 1e3 * this.blendTime, p, T;
            return l.blendStart || (l.blendStart = h), p = h - l.blendStart, T = g ? Math.min(1, p / g) : 1, f === c && (T = 1, p = g), this.alwaysBlend && (T *= d), l.opacity = T, T === 1 && (this._setCoverage(this.coverage, f, o, r, !0), this._hasOpaqueTile = !0), p < g;
          },
          /**
           * Updates all tiles at a given resolution level.
           * @private
           * @param {Number} level
           * @param {Number} levelOpacity
           * @param {Number} levelVisibility
           * @param {OpenSeadragon.Rect} drawArea
           * @param {Number} currentTime
           * @param {OpenSeadragon.Tile[]} best Array of the current best tiles
           * @returns {Object} Dictionary {bestTiles: OpenSeadragon.Tile - the current "best" tiles to draw, updatedTiles: OpenSeadragon.Tile) - the updated tiles}.
           */
          _updateLevel: function(l, o, r, f, d, h) {
            var c = f.getBoundingBox().getTopLeft(), g = f.getBoundingBox().getBottomRight();
            this.viewer && this.viewer.raiseEvent("update-level", {
              tiledImage: this,
              havedrawn: !0,
              // deprecated, kept for backwards compatibility
              level: l,
              opacity: o,
              visibility: r,
              drawArea: f,
              topleft: c,
              bottomright: g,
              currenttime: d,
              best: h
            }), this._resetCoverage(this.coverage, l), this._resetCoverage(this.loadingCoverage, l);
            var p = this._getCornerTiles(l, c, g), T = p.topLeft, E = p.bottomRight, C = this.source.getNumTiles(l), b = this.viewport.pixelFromPoint(this.viewport.getCenter());
            this.getFlip() && (E.x += 1, this.wrapHorizontal || (E.x = Math.min(E.x, C.x - 1)));
            for (var D = Math.max(0, (E.x - T.x) * (E.y - T.y)), z = new Array(D), G = 0, V = T.x; V <= E.x; V++)
              for (var de = T.y; de <= E.y; de++) {
                var ne;
                if (this.getFlip()) {
                  var me = (C.x + V % C.x) % C.x;
                  ne = V + C.x - me - me - 1;
                } else
                  ne = V;
                if (f.intersection(this.getTileBounds(l, ne, de)) !== null) {
                  var ie = this._updateTile(
                    ne,
                    de,
                    l,
                    r,
                    b,
                    C,
                    d,
                    h
                  );
                  h = ie.bestTiles, z[G] = ie.tile, G += 1;
                }
              }
            return {
              bestTiles: h,
              updatedTiles: z
            };
          },
          /**
           * @private
           * @param {OpenSeadragon.Tile} tile
           * @param {Boolean} overlap
           * @param {OpenSeadragon.Viewport} viewport
           * @param {OpenSeadragon.Point} viewportCenter
           * @param {Number} levelVisibility
           */
          _positionTile: function(l, o, r, f, d) {
            var h = l.bounds.getTopLeft();
            h.x *= this._scaleSpring.current.value, h.y *= this._scaleSpring.current.value, h.x += this._xSpring.current.value, h.y += this._ySpring.current.value;
            var c = l.bounds.getSize();
            c.x *= this._scaleSpring.current.value, c.y *= this._scaleSpring.current.value, l.positionedBounds.x = h.x, l.positionedBounds.y = h.y, l.positionedBounds.width = c.x, l.positionedBounds.height = c.y;
            var g = r.pixelFromPointNoRotate(h, !0), p = r.pixelFromPointNoRotate(h, !1), T = r.deltaPixelsFromPointsNoRotate(c, !0), E = r.deltaPixelsFromPointsNoRotate(c, !1), C = p.plus(E.divide(2)), b = f.squaredDistanceTo(C);
            this.viewer.drawer.minimumOverlapRequired(this) && (o || (T = T.plus(new a.Point(1, 1))), l.isRightMost && this.wrapHorizontal && (T.x += 0.75), l.isBottomMost && this.wrapVertical && (T.y += 0.75)), l.position = g, l.size = T, l.squaredDistance = b, l.visibility = d;
          },
          /**
           * Update a single tile at a particular resolution level.
           * @private
           * @param {Number} x
           * @param {Number} y
           * @param {Number} level
           * @param {Number} levelVisibility
           * @param {OpenSeadragon.Point} viewportCenter
           * @param {Number} numberOfTiles
           * @param {Number} currentTime
           * @param {OpenSeadragon.Tile} best - The current "best" tile to draw.
           * @returns {Object} Dictionary {bestTiles: OpenSeadragon.Tile[] - the current best tiles, tile: OpenSeadragon.Tile the current tile}
           */
          _updateTile: function(l, o, r, f, d, h, c, g) {
            var p = this._getTile(
              l,
              o,
              r,
              c,
              h
            );
            this.viewer && this.viewer.raiseEvent("update-tile", {
              tiledImage: this,
              tile: p
            }), this._setCoverage(this.coverage, r, l, o, !1);
            var T = p.loaded || p.loading || this._isCovered(this.loadingCoverage, r, l, o);
            if (this._setCoverage(this.loadingCoverage, r, l, o, T), !p.exists)
              return {
                bestTiles: g,
                tile: p
              };
            if (p.loaded && p.opacity === 1 && this._setCoverage(this.coverage, r, l, o, !0), this._positionTile(
              p,
              this.source.tileOverlap,
              this.viewport,
              d,
              f
            ), !p.loaded)
              if (p.context2D)
                this._setTileLoaded(p);
              else {
                var E = this._tileCache.getImageRecord(p.cacheKey);
                E && this._setTileLoaded(p, E.getData());
              }
            return p.loading ? this._tilesLoading++ : T || (g = this._compareTiles(g, p, this.maxTilesPerFrame)), {
              bestTiles: g,
              tile: p
            };
          },
          // private
          _getCornerTiles: function(l, o, r) {
            var f, d;
            this.wrapHorizontal ? (f = a.positiveModulo(o.x, 1), d = a.positiveModulo(r.x, 1)) : (f = Math.max(0, o.x), d = Math.min(1, r.x));
            var h, c, g = 1 / this.source.aspectRatio;
            this.wrapVertical ? (h = a.positiveModulo(o.y, g), c = a.positiveModulo(r.y, g)) : (h = Math.max(0, o.y), c = Math.min(g, r.y));
            var p = this.source.getTileAtPoint(l, new a.Point(f, h)), T = this.source.getTileAtPoint(l, new a.Point(d, c)), E = this.source.getNumTiles(l);
            return this.wrapHorizontal && (p.x += E.x * Math.floor(o.x), T.x += E.x * Math.floor(r.x)), this.wrapVertical && (p.y += E.y * Math.floor(o.y / g), T.y += E.y * Math.floor(r.y / g)), {
              topLeft: p,
              bottomRight: T
            };
          },
          /**
           * Obtains a tile at the given location.
           * @private
           * @param {Number} x
           * @param {Number} y
           * @param {Number} level
           * @param {Number} time
           * @param {Number} numTiles
           * @returns {OpenSeadragon.Tile}
           */
          _getTile: function(l, o, r, f, d) {
            var h, c, g, p, T, E, C, b, D, z, G = this.tilesMatrix, V = this.source;
            return G[r] || (G[r] = {}), G[r][l] || (G[r][l] = {}), (!G[r][l][o] || !G[r][l][o].flipped != !this.flipped) && (h = (d.x + l % d.x) % d.x, c = (d.y + o % d.y) % d.y, g = this.getTileBounds(r, l, o), p = V.getTileBounds(r, h, c, !0), T = V.tileExists(r, h, c), E = V.getTileUrl(r, h, c), C = V.getTilePostData(r, h, c), this.loadTilesWithAjax ? (b = V.getTileAjaxHeaders(r, h, c), a.isPlainObject(this.ajaxHeaders) && (b = a.extend({}, this.ajaxHeaders, b))) : b = null, D = V.getContext2D ? V.getContext2D(r, h, c) : void 0, z = new a.Tile(
              r,
              l,
              o,
              g,
              T,
              E,
              D,
              this.loadTilesWithAjax,
              b,
              p,
              C,
              V.getTileHashKey(r, h, c, E, b, C)
            ), this.getFlip() ? h === 0 && (z.isRightMost = !0) : h === d.x - 1 && (z.isRightMost = !0), c === d.y - 1 && (z.isBottomMost = !0), z.flipped = this.flipped, G[r][l][o] = z), z = G[r][l][o], z.lastTouchTime = f, z;
          },
          /**
           * Dispatch a job to the ImageLoader to load the Image for a Tile.
           * @private
           * @param {OpenSeadragon.Tile} tile
           * @param {Number} time
           */
          _loadTile: function(l, o) {
            var r = this;
            l.loading = !0, this._imageLoader.addJob({
              src: l.getUrl(),
              tile: l,
              source: this.source,
              postData: l.postData,
              loadWithAjax: l.loadWithAjax,
              ajaxHeaders: l.ajaxHeaders,
              crossOriginPolicy: this.crossOriginPolicy,
              ajaxWithCredentials: this.ajaxWithCredentials,
              callback: function(f, d, h) {
                r._onTileLoad(l, o, f, d, h);
              },
              abort: function() {
                l.loading = !1;
              }
            });
          },
          /**
           * Callback fired when a Tile's Image finished downloading.
           * @private
           * @param {OpenSeadragon.Tile} tile
           * @param {Number} time
           * @param {*} data image data
           * @param {String} errorMsg
           * @param {XMLHttpRequest} tileRequest
           */
          _onTileLoad: function(l, o, r, f, d) {
            if (r)
              l.exists = !0;
            else {
              a.console.error("Tile %s failed to load: %s - error: %s", l, l.getUrl(), f), this.viewer.raiseEvent("tile-load-failed", {
                tile: l,
                tiledImage: this,
                time: o,
                message: f,
                tileRequest: d
              }), l.loading = !1, l.exists = !1;
              return;
            }
            if (o < this.lastResetTime) {
              a.console.warn("Ignoring tile %s loaded before reset: %s", l, l.getUrl()), l.loading = !1;
              return;
            }
            var h = this, c = function() {
              var g = h.source, p = g.getClosestLevel();
              h._setTileLoaded(l, r, p, d);
            };
            c();
          },
          /**
           * @private
           * @param {OpenSeadragon.Tile} tile
           * @param {*} data image data, the data sent to ImageJob.prototype.finish(), by default an Image object
           * @param {Number|undefined} cutoff
           * @param {XMLHttpRequest|undefined} tileRequest
           */
          _setTileLoaded: function(l, o, r, f) {
            var d = 0, h = !1, c = this;
            function g() {
              return h && a.console.error("Event 'tile-loaded' argument getCompletionCallback must be called synchronously. Its return value should be called asynchronously."), d++, p;
            }
            function p() {
              d--, d === 0 && (l.loading = !1, l.loaded = !0, l.hasTransparency = c.source.hasTransparency(
                l.context2D,
                l.getUrl(),
                l.ajaxHeaders,
                l.postData
              ), l.context2D || c._tileCache.cacheTile({
                data: o,
                tile: l,
                cutoff: r,
                tiledImage: c
              }), c.viewer.raiseEvent("tile-ready", {
                tile: l,
                tiledImage: c,
                tileRequest: f
              }), c._needsDraw = !0);
            }
            var T = g();
            this.viewer.raiseEvent("tile-loaded", {
              tile: l,
              tiledImage: this,
              tileRequest: f,
              get image() {
                return a.console.error("[tile-loaded] event 'image' has been deprecated. Use 'data' property instead."), o;
              },
              data: o,
              getCompletionCallback: g
            }), h = !0, T();
          },
          /**
           * Determines the 'best tiles' from the given 'last best' tiles and the
           * tile in question.
           * @private
           *
           * @param {OpenSeadragon.Tile[]} previousBest The best tiles so far.
           * @param {OpenSeadragon.Tile} tile The new tile to consider.
           * @param {Number} maxNTiles The max number of best tiles.
           * @returns {OpenSeadragon.Tile[]} The new best tiles.
           */
          _compareTiles: function(l, o, r) {
            return l ? (l.push(o), this._sortTiles(l), l.length > r && l.pop(), l) : [o];
          },
          /**
           * Sorts tiles in an array according to distance and visibility.
           * @private
           *
           * @param {OpenSeadragon.Tile[]} tiles The tiles.
           */
          _sortTiles: function(l) {
            l.sort(function(o, r) {
              return o === null ? 1 : r === null ? -1 : o.visibility === r.visibility ? o.squaredDistance - r.squaredDistance : r.visibility - o.visibility;
            });
          },
          /**
           * Returns true if the given tile provides coverage to lower-level tiles of
           * lower resolution representing the same content. If neither x nor y is
           * given, returns true if the entire visible level provides coverage.
           *
           * Note that out-of-bounds tiles provide coverage in this sense, since
           * there's no content that they would need to cover. Tiles at non-existent
           * levels that are within the image bounds, however, do not.
           * @private
           *
           * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
           * @param {Number} level - The resolution level of the tile.
           * @param {Number} x - The X position of the tile.
           * @param {Number} y - The Y position of the tile.
           * @returns {Boolean}
           */
          _providesCoverage: function(l, o, r, f) {
            var d, h, c, g;
            if (!l[o])
              return !1;
            if (r === void 0 || f === void 0) {
              d = l[o];
              for (c in d)
                if (Object.prototype.hasOwnProperty.call(d, c)) {
                  h = d[c];
                  for (g in h)
                    if (Object.prototype.hasOwnProperty.call(h, g) && !h[g])
                      return !1;
                }
              return !0;
            }
            return l[o][r] === void 0 || l[o][r][f] === void 0 || l[o][r][f] === !0;
          },
          /**
           * Returns true if the given tile is completely covered by higher-level
           * tiles of higher resolution representing the same content. If neither x
           * nor y is given, returns true if the entire visible level is covered.
           * @private
           *
           * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
           * @param {Number} level - The resolution level of the tile.
           * @param {Number} x - The X position of the tile.
           * @param {Number} y - The Y position of the tile.
           * @returns {Boolean}
           */
          _isCovered: function(l, o, r, f) {
            return r === void 0 || f === void 0 ? this._providesCoverage(l, o + 1) : this._providesCoverage(l, o + 1, 2 * r, 2 * f) && this._providesCoverage(l, o + 1, 2 * r, 2 * f + 1) && this._providesCoverage(l, o + 1, 2 * r + 1, 2 * f) && this._providesCoverage(l, o + 1, 2 * r + 1, 2 * f + 1);
          },
          /**
           * Sets whether the given tile provides coverage or not.
           * @private
           *
           * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
           * @param {Number} level - The resolution level of the tile.
           * @param {Number} x - The X position of the tile.
           * @param {Number} y - The Y position of the tile.
           * @param {Boolean} covers - Whether the tile provides coverage.
           */
          _setCoverage: function(l, o, r, f, d) {
            if (!l[o]) {
              a.console.warn(
                "Setting coverage for a tile before its level's coverage has been reset: %s",
                o
              );
              return;
            }
            l[o][r] || (l[o][r] = {}), l[o][r][f] = d;
          },
          /**
           * Resets coverage information for the given level. This should be called
           * after every draw routine. Note that at the beginning of the next draw
           * routine, coverage for every visible tile should be explicitly set.
           * @private
           *
           * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
           * @param {Number} level - The resolution level of tiles to completely reset.
           */
          _resetCoverage: function(l, o) {
            l[o] = {};
          }
        }
      );
    })(K), (function(a) {
      var l = function(r) {
        a.console.assert(r, "[TileCache.cacheTile] options is required"), a.console.assert(r.tile, "[TileCache.cacheTile] options.tile is required"), a.console.assert(r.tiledImage, "[TileCache.cacheTile] options.tiledImage is required"), this.tile = r.tile, this.tiledImage = r.tiledImage;
      }, o = function(r) {
        a.console.assert(r, "[ImageRecord] options is required"), a.console.assert(r.data, "[ImageRecord] options.data is required"), this._tiles = [], r.create.apply(null, [this, r.data, r.ownerTile]), this._destroyImplementation = r.destroy.bind(null, this), this.getImage = r.getImage.bind(null, this), this.getData = r.getData.bind(null, this), this.getRenderedContext = r.getRenderedContext.bind(null, this);
      };
      o.prototype = {
        destroy: function() {
          this._destroyImplementation(), this._tiles = null;
        },
        addTile: function(r) {
          a.console.assert(r, "[ImageRecord.addTile] tile is required"), this._tiles.push(r);
        },
        removeTile: function(r) {
          for (var f = 0; f < this._tiles.length; f++)
            if (this._tiles[f] === r) {
              this._tiles.splice(f, 1);
              return;
            }
          a.console.warn("[ImageRecord.removeTile] trying to remove unknown tile", r);
        },
        getTileCount: function() {
          return this._tiles.length;
        }
      }, a.TileCache = function(r) {
        r = r || {}, this._maxImageCacheCount = r.maxImageCacheCount || a.DEFAULT_SETTINGS.maxImageCacheCount, this._tilesLoaded = [], this._imagesLoaded = [], this._imagesLoadedCount = 0;
      }, a.TileCache.prototype = {
        /**
         * @returns {Number} The total number of tiles that have been loaded by
         * this TileCache.
         */
        numTilesLoaded: function() {
          return this._tilesLoaded.length;
        },
        /**
         * Caches the specified tile, removing an old tile if necessary to stay under the
         * maxImageCacheCount specified on construction. Note that if multiple tiles reference
         * the same image, there may be more tiles than maxImageCacheCount; the goal is to keep
         * the number of images below that number. Note, as well, that even the number of images
         * may temporarily surpass that number, but should eventually come back down to the max specified.
         * @param {Object} options - Tile info.
         * @param {OpenSeadragon.Tile} options.tile - The tile to cache.
         * @param {String} options.tile.cacheKey - The unique key used to identify this tile in the cache.
         * @param {Image} options.image - The image of the tile to cache.
         * @param {OpenSeadragon.TiledImage} options.tiledImage - The TiledImage that owns that tile.
         * @param {Number} [options.cutoff=0] - If adding this tile goes over the cache max count, this
         * function will release an old tile. The cutoff option specifies a tile level at or below which
         * tiles will not be released.
         */
        cacheTile: function(r) {
          a.console.assert(r, "[TileCache.cacheTile] options is required"), a.console.assert(r.tile, "[TileCache.cacheTile] options.tile is required"), a.console.assert(r.tile.cacheKey, "[TileCache.cacheTile] options.tile.cacheKey is required"), a.console.assert(r.tiledImage, "[TileCache.cacheTile] options.tiledImage is required");
          var f = r.cutoff || 0, d = this._tilesLoaded.length, h = this._imagesLoaded[r.tile.cacheKey];
          if (h || (r.data || (a.console.error("[TileCache.cacheTile] options.image was renamed to options.data. '.image' attribute has been deprecated and will be removed in the future."), r.data = r.image), a.console.assert(r.data, "[TileCache.cacheTile] options.data is required to create an ImageRecord"), h = this._imagesLoaded[r.tile.cacheKey] = new o({
            data: r.data,
            ownerTile: r.tile,
            create: r.tiledImage.source.createTileCache,
            destroy: r.tiledImage.source.destroyTileCache,
            getImage: r.tiledImage.source.getTileCacheDataAsImage,
            getData: r.tiledImage.source.getTileCacheData,
            getRenderedContext: r.tiledImage.source.getTileCacheDataAsContext2D
          }), this._imagesLoadedCount++), h.addTile(r.tile), r.tile.cacheImageRecord = h, this._imagesLoadedCount > this._maxImageCacheCount) {
            for (var c = null, g = -1, p = null, T, E, C, b, D, z, G = this._tilesLoaded.length - 1; G >= 0; G--)
              if (z = this._tilesLoaded[G], T = z.tile, !(T.level <= f || T.beingDrawn)) {
                if (!c) {
                  c = T, g = G, p = z;
                  continue;
                }
                b = T.lastTouchTime, E = c.lastTouchTime, D = T.level, C = c.level, (b < E || b === E && D > C) && (c = T, g = G, p = z);
              }
            c && g >= 0 && (this._unloadTile(p), d = g);
          }
          this._tilesLoaded[d] = new l({
            tile: r.tile,
            tiledImage: r.tiledImage
          });
        },
        /**
         * Clears all tiles associated with the specified tiledImage.
         * @param {OpenSeadragon.TiledImage} tiledImage
         */
        clearTilesFor: function(r) {
          a.console.assert(r, "[TileCache.clearTilesFor] tiledImage is required");
          for (var f, d = 0; d < this._tilesLoaded.length; ++d)
            f = this._tilesLoaded[d], f.tiledImage === r && (this._unloadTile(f), this._tilesLoaded.splice(d, 1), d--);
        },
        // private
        getImageRecord: function(r) {
          return a.console.assert(r, "[TileCache.getImageRecord] cacheKey is required"), this._imagesLoaded[r];
        },
        // private
        _unloadTile: function(r) {
          a.console.assert(r, "[TileCache._unloadTile] tileRecord is required");
          var f = r.tile, d = r.tiledImage;
          let h = f.getCanvasContext && f.getCanvasContext();
          f.unload(), f.cacheImageRecord = null;
          var c = this._imagesLoaded[f.cacheKey];
          c && (c.removeTile(f), c.getTileCount() || (c.destroy(), delete this._imagesLoaded[f.cacheKey], this._imagesLoadedCount--, h && (h.canvas.width = 0, h.canvas.height = 0, d.viewer.raiseEvent("image-unloaded", {
            context2D: h,
            tile: f
          }))), d.viewer.raiseEvent("tile-unloaded", {
            tile: f,
            tiledImage: d
          }));
        }
      };
    })(K), (function(a) {
      a.World = function(l) {
        var o = this;
        a.console.assert(l.viewer, "[World] options.viewer is required"), a.EventSource.call(this), this.viewer = l.viewer, this._items = [], this._needsDraw = !1, this._autoRefigureSizes = !0, this._needsSizesFigured = !1, this._delegatedFigureSizes = function(r) {
          o._autoRefigureSizes ? o._figureSizes() : o._needsSizesFigured = !0;
        }, this._figureSizes();
      }, a.extend(
        a.World.prototype,
        a.EventSource.prototype,
        /** @lends OpenSeadragon.World.prototype */
        {
          /**
           * Add the specified item.
           * @param {OpenSeadragon.TiledImage} item - The item to add.
           * @param {Number} [options.index] - Index for the item. If not specified, goes at the top.
           * @fires OpenSeadragon.World.event:add-item
           * @fires OpenSeadragon.World.event:metrics-change
           */
          addItem: function(l, o) {
            if (a.console.assert(l, "[World.addItem] item is required"), a.console.assert(l instanceof a.TiledImage, "[World.addItem] only TiledImages supported at this time"), o = o || {}, o.index !== void 0) {
              var r = Math.max(0, Math.min(this._items.length, o.index));
              this._items.splice(r, 0, l);
            } else
              this._items.push(l);
            this._autoRefigureSizes ? this._figureSizes() : this._needsSizesFigured = !0, this._needsDraw = !0, l.addHandler("bounds-change", this._delegatedFigureSizes), l.addHandler("clip-change", this._delegatedFigureSizes), this.raiseEvent("add-item", {
              item: l
            });
          },
          /**
           * Get the item at the specified index.
           * @param {Number} index - The item's index.
           * @returns {OpenSeadragon.TiledImage} The item at the specified index.
           */
          getItemAt: function(l) {
            return a.console.assert(l !== void 0, "[World.getItemAt] index is required"), this._items[l];
          },
          /**
           * Get the index of the given item or -1 if not present.
           * @param {OpenSeadragon.TiledImage} item - The item.
           * @returns {Number} The index of the item or -1 if not present.
           */
          getIndexOfItem: function(l) {
            return a.console.assert(l, "[World.getIndexOfItem] item is required"), a.indexOf(this._items, l);
          },
          /**
           * @returns {Number} The number of items used.
           */
          getItemCount: function() {
            return this._items.length;
          },
          /**
           * Change the index of a item so that it appears over or under others.
           * @param {OpenSeadragon.TiledImage} item - The item to move.
           * @param {Number} index - The new index.
           * @fires OpenSeadragon.World.event:item-index-change
           */
          setItemIndex: function(l, o) {
            a.console.assert(l, "[World.setItemIndex] item is required"), a.console.assert(o !== void 0, "[World.setItemIndex] index is required");
            var r = this.getIndexOfItem(l);
            if (o >= this._items.length)
              throw new Error("Index bigger than number of layers.");
            o === r || r === -1 || (this._items.splice(r, 1), this._items.splice(o, 0, l), this._needsDraw = !0, this.raiseEvent("item-index-change", {
              item: l,
              previousIndex: r,
              newIndex: o
            }));
          },
          /**
           * Remove an item.
           * @param {OpenSeadragon.TiledImage} item - The item to remove.
           * @fires OpenSeadragon.World.event:remove-item
           * @fires OpenSeadragon.World.event:metrics-change
           */
          removeItem: function(l) {
            a.console.assert(l, "[World.removeItem] item is required");
            var o = a.indexOf(this._items, l);
            o !== -1 && (l.removeHandler("bounds-change", this._delegatedFigureSizes), l.removeHandler("clip-change", this._delegatedFigureSizes), l.destroy(), this._items.splice(o, 1), this._figureSizes(), this._needsDraw = !0, this._raiseRemoveItem(l));
          },
          /**
           * Remove all items.
           * @fires OpenSeadragon.World.event:remove-item
           * @fires OpenSeadragon.World.event:metrics-change
           */
          removeAll: function() {
            this.viewer._cancelPendingImages();
            var l, o;
            for (o = 0; o < this._items.length; o++)
              l = this._items[o], l.removeHandler("bounds-change", this._delegatedFigureSizes), l.removeHandler("clip-change", this._delegatedFigureSizes), l.destroy();
            var r = this._items;
            for (this._items = [], this._figureSizes(), this._needsDraw = !0, o = 0; o < r.length; o++)
              l = r[o], this._raiseRemoveItem(l);
          },
          /**
           * Clears all tiles and triggers updates for all items.
           */
          resetItems: function() {
            for (var l = 0; l < this._items.length; l++)
              this._items[l].reset();
          },
          /**
           * Updates (i.e. animates bounds of) all items.
           * @function
           * @param viewportChanged Whether the viewport changed, which indicates that
           * all TiledImages need to be updated.
           */
          update: function(l) {
            for (var o = !1, r = 0; r < this._items.length; r++)
              o = this._items[r].update(l) || o;
            return o;
          },
          /**
           * Draws all items.
           */
          draw: function() {
            this.viewer.drawer.draw(this._items), this._needsDraw = !1, this._items.forEach((l) => {
              this._needsDraw = l.setDrawn() || this._needsDraw;
            });
          },
          /**
           * @returns {Boolean} true if any items need updating.
           */
          needsDraw: function() {
            for (var l = 0; l < this._items.length; l++)
              if (this._items[l].needsDraw())
                return !0;
            return this._needsDraw;
          },
          /**
           * @returns {OpenSeadragon.Rect} The smallest rectangle that encloses all items, in viewport coordinates.
           */
          getHomeBounds: function() {
            return this._homeBounds.clone();
          },
          /**
           * To facilitate zoom constraints, we keep track of the pixel density of the
           * densest item in the World (i.e. the item whose content size to viewport size
           * ratio is the highest) and save it as this "content factor".
           * @returns {Number} the number of content units per viewport unit.
           */
          getContentFactor: function() {
            return this._contentFactor;
          },
          /**
           * As a performance optimization, setting this flag to false allows the bounds-change event handler
           * on tiledImages to skip calculations on the world bounds. If a lot of images are going to be positioned in
           * rapid succession, this is a good idea. When finished, setAutoRefigureSizes should be called with true
           * or the system may behave oddly.
           * @param {Boolean} [value] The value to which to set the flag.
           */
          setAutoRefigureSizes: function(l) {
            this._autoRefigureSizes = l, l & this._needsSizesFigured && (this._figureSizes(), this._needsSizesFigured = !1);
          },
          /**
           * Arranges all of the TiledImages with the specified settings.
           * @param {Object} options - Specifies how to arrange.
           * @param {Boolean} [options.immediately=false] - Whether to animate to the new arrangement.
           * @param {String} [options.layout] - See collectionLayout in {@link OpenSeadragon.Options}.
           * @param {Number} [options.rows] - See collectionRows in {@link OpenSeadragon.Options}.
           * @param {Number} [options.columns] - See collectionColumns in {@link OpenSeadragon.Options}.
           * @param {Number} [options.tileSize] - See collectionTileSize in {@link OpenSeadragon.Options}.
           * @param {Number} [options.tileMargin] - See collectionTileMargin in {@link OpenSeadragon.Options}.
           * @fires OpenSeadragon.World.event:metrics-change
           */
          arrange: function(l) {
            l = l || {};
            var o = l.immediately || !1, r = l.layout || a.DEFAULT_SETTINGS.collectionLayout, f = l.rows || a.DEFAULT_SETTINGS.collectionRows, d = l.columns || a.DEFAULT_SETTINGS.collectionColumns, h = l.tileSize || a.DEFAULT_SETTINGS.collectionTileSize, c = l.tileMargin || a.DEFAULT_SETTINGS.collectionTileMargin, g = h + c, p;
            !l.rows && d ? p = d : p = Math.ceil(this._items.length / f);
            var T = 0, E = 0, C, b, D, z, G;
            this.setAutoRefigureSizes(!1);
            for (var V = 0; V < this._items.length; V++)
              V && V % p === 0 && (r === "horizontal" ? (E += g, T = 0) : (T += g, E = 0)), C = this._items[V], b = C.getBounds(), b.width > b.height ? D = h : D = h * (b.width / b.height), z = D * (b.height / b.width), G = new a.Point(
                T + (h - D) / 2,
                E + (h - z) / 2
              ), C.setPosition(G, o), C.setWidth(D, o), r === "horizontal" ? T += g : E += g;
            this.setAutoRefigureSizes(!0);
          },
          // private
          _figureSizes: function() {
            var l = this._homeBounds ? this._homeBounds.clone() : null, o = this._contentSize ? this._contentSize.clone() : null, r = this._contentFactor || 0;
            if (!this._items.length)
              this._homeBounds = new a.Rect(0, 0, 1, 1), this._contentSize = new a.Point(1, 1), this._contentFactor = 1;
            else {
              var f = this._items[0], d = f.getBounds();
              this._contentFactor = f.getContentSize().x / d.width;
              for (var h = f.getClippedBounds().getBoundingBox(), c = h.x, g = h.y, p = h.x + h.width, T = h.y + h.height, E = 1; E < this._items.length; E++)
                f = this._items[E], d = f.getBounds(), this._contentFactor = Math.max(
                  this._contentFactor,
                  f.getContentSize().x / d.width
                ), h = f.getClippedBounds().getBoundingBox(), c = Math.min(c, h.x), g = Math.min(g, h.y), p = Math.max(p, h.x + h.width), T = Math.max(T, h.y + h.height);
              this._homeBounds = new a.Rect(c, g, p - c, T - g), this._contentSize = new a.Point(
                this._homeBounds.width * this._contentFactor,
                this._homeBounds.height * this._contentFactor
              );
            }
            (this._contentFactor !== r || !this._homeBounds.equals(l) || !this._contentSize.equals(o)) && this.raiseEvent("metrics-change", {});
          },
          // private
          _raiseRemoveItem: function(l) {
            this.raiseEvent("remove-item", { item: l });
          }
        }
      );
    })(K);
  })(ur)), ur.exports;
}
var gp = dp();
const ai = /* @__PURE__ */ ip(gp), Ao = { TYPOGRAPHY: 2, ILLUSTRATION: 3, STAMP: 4 };
function pp($) {
  return $.width < $.height ? "vertical" : "horizontal";
}
function Vf($) {
  return $.direction === "vertical" || $.direction === "horizontal" ? $.direction : pp($);
}
function Ep($) {
  const K = $.filter((a) => Vf(a) === "vertical").length;
  return $.length < K * 2 ? "vertical" : "horizontal";
}
function xp($) {
  return $ === "vertical" ? "縦書き" : "横書き";
}
function mp($, K) {
  return K === "auto" ? $ === "vertical" ? "rtl" : "ltr" : K;
}
function bp($, K) {
  return $ === "auto" ? "自動（" + (K === "vertical" ? "右から左" : "左から右") + "）" : $ === "rtl" ? "右から左" : "左から右";
}
function Rp($, K, a) {
  const l = mp(K, a);
  return [...$].sort((o, r) => K === "vertical" ? (l === "ltr" ? o.x - r.x : r.x - o.x) || o.y - r.y : o.y - r.y || (l === "ltr" ? o.x - r.x : r.x - o.x)).map((o, r) => ({ ...o, readingOrder: r + 1 }));
}
const vp = {
  [Ao.ILLUSTRATION]: "図版",
  [Ao.STAMP]: "印判"
}, yp = ["nw", "n", "ne", "e", "se", "s", "sw", "w"], ci = 6, Ff = 24, Gf = 36, jf = 24;
function Tp($, K, a) {
  const l = Math.max($.width, 1), o = Math.max($.height, 1), r = l * 3, f = Math.max(K - Ff * 2, 1), d = Math.max(a - Gf - jf, 1), h = Math.max(Math.min(f / r, d / o), 1e-3), c = Ff / h, g = Gf / h, p = jf / h;
  return new ai.Rect(
    $.x - l - c,
    $.y - g,
    r + c * 2,
    o + g + p
  );
}
const Cp = Me.forwardRef(function({
  dataUrl: K,
  lines: a,
  regions: l,
  showOverlays: o,
  selectedOrder: r,
  onSelectLine: f,
  onUpdateLine: d,
  onDeleteLine: h,
  editable: c = !0,
  regionMode: g,
  selectedRegion: p,
  onRegionDraw: T
}, E) {
  const C = Me.useRef(null), b = Me.useRef(null), D = Me.useRef(/* @__PURE__ */ new Map()), [z, G] = Me.useState(!1), [V, de] = Me.useState(!1), [ne, me] = Me.useState(0), ie = Me.useRef(null), [Te, be] = Me.useState(null), [qe, Oe] = Me.useState(null), [ge, Ne] = Me.useState(null), [Ze, Xe] = Me.useState(null), F = Me.useRef(f), ee = Me.useRef(d), se = Me.useRef(h), De = Me.useRef(a), Be = Me.useRef(o), O = Me.useRef(r), Z = Me.useRef(null), Y = Me.useRef(() => {
  }), ae = Me.useRef(g), _e = Me.useRef(p), Re = Me.useRef(T);
  Me.useEffect(() => {
    F.current = f;
  }, [f]), Me.useEffect(() => {
    ee.current = d;
  }, [d]), Me.useEffect(() => {
    se.current = h;
  }, [h]), Me.useEffect(() => {
    De.current = a;
  }, [a]), Me.useEffect(() => {
    Be.current = o;
  }, [o]), Me.useEffect(() => {
    O.current = r;
  }, [r]), Me.useEffect(() => {
    Re.current = T;
  }, [T]), Me.useImperativeHandle(E, () => ({
    scrollToLine(te) {
      const xe = b.current, he = xe?.world.getItemAt(0), Ae = De.current.find((m) => m.readingOrder === te), We = C.current;
      xe && he && Ae && We && xe.viewport.fitBounds(he.imageToViewportRectangle(
        Tp(Ae, We.clientWidth, We.clientHeight)
      ));
    },
    getVisibleImageBounds() {
      const te = b.current, xe = te?.world.getItemAt(0);
      if (!te || !xe) return null;
      const he = xe.viewportToImageRectangle(te.viewport.getBounds());
      return { x: he.x, y: he.y, width: he.width, height: he.height };
    }
  }), []);
  const Ce = Me.useCallback((te, xe) => {
    const he = b.current, Ae = C.current.getBoundingClientRect();
    return he.viewport.viewerElementToImageCoordinates(new ai.Point(te - Ae.left, xe - Ae.top));
  }, []), $e = Me.useCallback((te) => {
    const xe = b.current, he = xe.viewport.imageToViewerElementCoordinates(new ai.Point(te.x, te.y)), Ae = xe.viewport.imageToViewerElementCoordinates(new ai.Point(te.x + te.width, te.y + te.height));
    return { left: he.x, top: he.y, width: Ae.x - he.x, height: Ae.y - he.y };
  }, []), Qe = Me.useCallback(() => {
    const te = b.current, xe = O.current;
    if (!te || xe == null || !Be.current || !te.world.getItemAt(0)) {
      Oe(null);
      return;
    }
    const he = Z.current ?? De.current.find((Ae) => Ae.readingOrder === xe);
    if (!he) {
      Oe(null);
      return;
    }
    Oe($e(he));
  }, [$e]), bt = Me.useCallback(() => {
    const te = b.current, xe = _e.current;
    if (!te || !xe || !te.world.getItemAt(0)) {
      Xe(null);
      return;
    }
    Xe($e(xe));
  }, [$e]);
  Me.useEffect(() => {
    Y.current = () => {
      Qe(), bt();
    };
  }, [Qe, bt]), Me.useEffect(() => {
    _e.current = p, bt();
  }, [p, z, bt]), Me.useEffect(() => {
    ae.current = g;
    const te = b.current;
    te && te.setMouseNavEnabled(!g), C.current && (C.current.style.cursor = g ? "crosshair" : ""), g || Ne(null);
  }, [g]), Me.useEffect(() => {
    if (!C.current) return;
    const te = C.current, he = ai({
      element: te,
      drawer: ["canvas", "html"],
      showNavigationControl: !1,
      gestureSettingsMouse: { clickToZoom: !1, dblClickToZoom: !0 },
      visibilityRatio: 1,
      minZoomImageRatio: 0.8,
      maxZoomPixelRatio: 4,
      animationTime: 0.4,
      preserveImageSizeOnResize: !0
    });
    b.current = he, he.addHandler("update-viewport", () => Y.current());
    let Ae = -1;
    const We = (we) => {
      if (ae.current || !Be.current || !he.world.getItemAt(0)) {
        Ae !== -1 && (Ae = -1, be(null));
        return;
      }
      const oe = Ce(we.clientX, we.clientY), ue = De.current.find((R) => oe.x >= R.x && oe.x <= R.x + R.width && oe.y >= R.y && oe.y <= R.y + R.height);
      if (!ue || ue.raw == null) {
        Ae !== -1 && (Ae = -1, be(null));
        return;
      }
      const w = Vf(ue), y = w === "vertical" ? new ai.Point(ue.x + ue.width, ue.y) : new ai.Point(ue.x, ue.y + ue.height), _ = he.viewport.imageToViewerElementCoordinates(y);
      Ae = ue.readingOrder, be({
        order: ue.readingOrder,
        text: ue.raw || "（空）",
        x: w === "vertical" ? _.x + 8 : Math.max(4, _.x),
        y: w === "vertical" ? Math.max(4, _.y) : _.y + 8,
        direction: w
      });
    }, m = () => {
      Ae = -1, be(null);
    };
    let x = null;
    const B = (we) => {
      ae.current || (x = { x: we.clientX, y: we.clientY });
    }, W = (we) => {
      if (ae.current || !x) return;
      const oe = Math.hypot(we.clientX - x.x, we.clientY - x.y);
      if (x = null, oe > 5 || !he.world.getItemAt(0)) return;
      const ue = Ce(we.clientX, we.clientY), w = _e.current;
      if (w && !(ue.x >= w.x && ue.x <= w.x + w.width && ue.y >= w.y && ue.y <= w.y + w.height)) {
        Re.current(null);
        return;
      }
      if (!Be.current) return;
      const y = De.current.find((_) => ue.x >= _.x && ue.x <= _.x + _.width && ue.y >= _.y && ue.y <= _.y + _.height);
      F.current(y ? y.readingOrder : null);
    };
    let J = null;
    const le = (we) => {
      !ae.current || !he.world.getItemAt(0) || (J = { x: we.clientX, y: we.clientY }, te.setPointerCapture?.(we.pointerId), Ne({ left: 0, top: 0, width: 0, height: 0 }));
    }, Q = (we) => {
      if (!J) return;
      const oe = te.getBoundingClientRect(), ue = J.x - oe.left, w = J.y - oe.top, y = we.clientX - oe.left, _ = we.clientY - oe.top;
      Ne({ left: Math.min(ue, y), top: Math.min(w, _), width: Math.abs(y - ue), height: Math.abs(_ - w) });
    }, fe = (we) => {
      if (!J) return;
      const oe = J;
      J = null, Ne(null);
      const ue = he.world.getItemAt(0);
      if (!ue) {
        Re.current(null);
        return;
      }
      const w = Ce(oe.x, oe.y), y = Ce(we.clientX, we.clientY), _ = ue.getContentSize(), R = Math.max(0, Math.min(w.x, y.x)), U = Math.max(0, Math.min(w.y, y.y)), k = Math.min(_.x, Math.max(w.x, y.x)), re = Math.min(_.y, Math.max(w.y, y.y)), Se = k - R, ve = re - U;
      Re.current(Se >= 4 && ve >= 4 ? { x: Math.round(R), y: Math.round(U), width: Math.round(Se), height: Math.round(ve) } : null);
    }, Le = () => {
      J = null, x = null, Ne(null);
    };
    return te.addEventListener("pointermove", We), te.addEventListener("pointerleave", m), te.addEventListener("pointerdown", B), te.addEventListener("pointerup", W), te.addEventListener("pointerdown", le), te.addEventListener("pointermove", Q), te.addEventListener("pointerup", fe), te.addEventListener("pointercancel", Le), () => {
      te.removeEventListener("pointermove", We), te.removeEventListener("pointerleave", m), te.removeEventListener("pointerdown", B), te.removeEventListener("pointerup", W), te.removeEventListener("pointerdown", le), te.removeEventListener("pointermove", Q), te.removeEventListener("pointerup", fe), te.removeEventListener("pointercancel", Le), ie.current?.(), he.destroy(), b.current = null;
    };
  }, [Ce]), Me.useEffect(() => {
    const te = b.current;
    if (!te || !K) return;
    ie.current?.(), G(!1), de(!1), be(null), Oe(null);
    const xe = () => G(!0), he = () => de(!0);
    return te.addHandler("open", xe), te.addHandler("open-failed", he), te.addHandler("tile-load-failed", he), te.open({ type: "image", url: K, buildPyramid: !1 }), () => {
      te.removeHandler("open", xe), te.removeHandler("open-failed", he), te.removeHandler("tile-load-failed", he);
    };
  }, [K, ne]), Me.useEffect(() => {
    const te = b.current;
    if (!te || !z) return;
    const xe = te.world.getItemAt(0);
    if (xe && (te.clearOverlays(), D.current.clear(), !!o)) {
      for (const he of a) {
        const Ae = document.createElement("div");
        Ae.className = "osd-line" + (he.classId === Ao.TYPOGRAPHY ? " osd-line-type" : "");
        const We = document.createElement("span");
        We.className = "osd-order", We.textContent = String(he.readingOrder), Ae.appendChild(We), te.addOverlay({ element: Ae, location: xe.imageToViewportRectangle(new ai.Rect(he.x, he.y, he.width, he.height)) }), D.current.set(he.readingOrder, Ae);
      }
      for (const he of l) {
        const Ae = document.createElement("div");
        Ae.className = "osd-region";
        const We = vp[he.classId];
        if (We) {
          const m = document.createElement("span");
          m.className = "osd-region-label", m.textContent = We, Ae.appendChild(m);
        }
        te.addOverlay({ element: Ae, location: xe.imageToViewportRectangle(new ai.Rect(he.x, he.y, he.width, he.height)) });
      }
      D.current.forEach((he, Ae) => he.classList.toggle("selected", Ae === r));
    }
  }, [z, a, l, o]), Me.useEffect(() => {
    D.current.forEach((te, xe) => te.classList.toggle("selected", xe === r)), Qe();
  }, [r, a, z, o, Qe]);
  const qt = Me.useCallback((te, xe) => {
    te.stopPropagation(), te.preventDefault(), ie.current?.();
    const he = b.current, Ae = O.current;
    if (!he || Ae == null) return;
    const We = he.world.getItemAt(0), m = De.current.find((ue) => ue.readingOrder === Ae);
    if (!We || !m) return;
    const x = We.getContentSize(), B = x.x, W = x.y, J = Ce(te.clientX, te.clientY), le = { x: m.x, y: m.y, width: m.width, height: m.height };
    te.currentTarget.setPointerCapture?.(te.pointerId);
    const fe = (ue) => {
      const w = Ce(ue.clientX, ue.clientY), y = w.x - J.x, _ = w.y - J.y;
      let { x: R, y: U, width: k, height: re } = le;
      xe === "move" ? (R += y, U += _) : (xe.includes("e") && (k += y), xe.includes("s") && (re += _), xe.includes("w") && (R += y, k -= y), xe.includes("n") && (U += _, re -= _)), k < ci && (xe.includes("w") && (R = le.x + le.width - ci), k = ci), re < ci && (xe.includes("n") && (U = le.y + le.height - ci), re = ci), R = Math.max(0, Math.min(R, B - ci)), U = Math.max(0, Math.min(U, W - ci)), k = Math.max(ci, Math.min(k, B - R)), re = Math.max(ci, Math.min(re, W - U));
      const Se = { x: Math.round(R), y: Math.round(U), width: Math.round(k), height: Math.round(re) };
      Z.current = Se;
      const ve = D.current.get(Ae);
      ve && he.updateOverlay(ve, We.imageToViewportRectangle(new ai.Rect(Se.x, Se.y, Se.width, Se.height))), Oe($e(Se));
    }, Le = () => {
      window.removeEventListener("pointermove", fe), window.removeEventListener("pointerup", oe), window.removeEventListener("pointercancel", we), ie.current = null;
    }, we = () => {
      Le(), Z.current = null;
      const ue = D.current.get(Ae);
      ue && he.updateOverlay(ue, We.imageToViewportRectangle(new ai.Rect(le.x, le.y, le.width, le.height))), Oe($e(le));
    }, oe = () => {
      Le();
      const ue = Z.current;
      Z.current = null, ue && ee.current(Ae, ue);
    };
    window.addEventListener("pointermove", fe), window.addEventListener("pointerup", oe), window.addEventListener("pointercancel", we), ie.current = we;
  }, [Ce, $e]);
  return /* @__PURE__ */ Pt.jsxs("div", { className: "osd-root", children: [
    /* @__PURE__ */ Pt.jsx("div", { className: "osd-host", ref: C }),
    V && /* @__PURE__ */ Pt.jsxs("div", { className: "osd-image-error", role: "alert", children: [
      /* @__PURE__ */ Pt.jsx("p", { children: "画像を表示できません。再読み込みしても表示されない場合は、この画面を開き直してください。" }),
      /* @__PURE__ */ Pt.jsx("button", { type: "button", onClick: () => me((te) => te + 1), children: "画像を再読み込み" })
    ] }),
    Ze && !ge && /* @__PURE__ */ Pt.jsx("div", { className: "osd-select-region", style: { left: Ze.left, top: Ze.top, width: Ze.width, height: Ze.height } }),
    ge && /* @__PURE__ */ Pt.jsx("div", { className: "osd-select-draw", style: { left: ge.left, top: ge.top, width: ge.width, height: ge.height } }),
    c && qe && /* @__PURE__ */ Pt.jsxs("div", { className: "edit-layer", style: { left: qe.left, top: qe.top, width: qe.width, height: qe.height }, children: [
      /* @__PURE__ */ Pt.jsx("div", { className: "edit-move", onPointerDown: (te) => qt(te, "move"), title: "ドラッグで移動" }),
      yp.map((te) => /* @__PURE__ */ Pt.jsx("div", { className: `edit-h edit-${te}`, onPointerDown: (xe) => qt(xe, te) }, te)),
      /* @__PURE__ */ Pt.jsx(
        "button",
        {
          className: "edit-del",
          title: "この行を削除 (Delete)",
          onPointerDown: (te) => {
            te.stopPropagation(), te.preventDefault();
            const xe = O.current;
            xe != null && se.current(xe);
          },
          children: "×"
        }
      )
    ] }),
    Te && /* @__PURE__ */ Pt.jsxs("div", { className: `osd-popup is-${Te.direction}`, style: { left: Te.x, top: Te.y }, children: [
      /* @__PURE__ */ Pt.jsx("span", { className: "osd-popup-no", children: Te.order }),
      /* @__PURE__ */ Pt.jsx("span", { className: "osd-popup-text", children: Te.text })
    ] })
  ] });
});
export {
  Cp as I,
  bp as a,
  Rp as b,
  wp as c,
  xp as d,
  pp as e,
  mp as f,
  Pt as j,
  Vf as l,
  Ep as p,
  Me as r
};
