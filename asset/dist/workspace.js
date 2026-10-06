import { llmState as td, subscribeLlm as Sm, providerNames as uu, mountLlmSettings as _m, confirmCommercial as Em, translateCommercial as bm } from "./llm.js";
function Rm(Y) {
  return Y && Y.__esModule && Object.prototype.hasOwnProperty.call(Y, "default") ? Y.default : Y;
}
var cu = { exports: {} }, Ul = {};
var id;
function Cm() {
  if (id) return Ul;
  id = 1;
  var Y = /* @__PURE__ */ Symbol.for("react.transitional.element"), K = /* @__PURE__ */ Symbol.for("react.fragment");
  function a(l, o, r) {
    var f = null;
    if (r !== void 0 && (f = "" + r), o.key !== void 0 && (f = "" + o.key), "key" in o) {
      r = {};
      for (var d in o)
        d !== "key" && (r[d] = o[d]);
    } else r = o;
    return o = r.ref, {
      $$typeof: Y,
      type: l,
      key: f,
      ref: o !== void 0 ? o : null,
      props: r
    };
  }
  return Ul.Fragment = K, Ul.jsx = a, Ul.jsxs = a, Ul;
}
var nd;
function Dm() {
  return nd || (nd = 1, cu.exports = Cm()), cu.exports;
}
var R = Dm(), hu = { exports: {} }, jl = {}, fu = { exports: {} }, du = {};
var ad;
function Om() {
  return ad || (ad = 1, (function(Y) {
    function K(V, ne) {
      var ge = V.length;
      V.push(ne);
      e: for (; 0 < ge; ) {
        var ze = ge - 1 >>> 1, He = V[ze];
        if (0 < o(He, ne))
          V[ze] = ne, V[ge] = He, ge = ze;
        else break e;
      }
    }
    function a(V) {
      return V.length === 0 ? null : V[0];
    }
    function l(V) {
      if (V.length === 0) return null;
      var ne = V[0], ge = V.pop();
      if (ge !== ne) {
        V[0] = ge;
        e: for (var ze = 0, He = V.length, B = He >>> 1; ze < B; ) {
          var I = 2 * (ze + 1) - 1, J = V[I], ce = I + 1, Ee = V[ce];
          if (0 > o(J, ge))
            ce < He && 0 > o(Ee, J) ? (V[ze] = Ee, V[ce] = ge, ze = ce) : (V[ze] = J, V[I] = ge, ze = I);
          else if (ce < He && 0 > o(Ee, ge))
            V[ze] = Ee, V[ce] = ge, ze = ce;
          else break e;
        }
      }
      return ne;
    }
    function o(V, ne) {
      var ge = V.sortIndex - ne.sortIndex;
      return ge !== 0 ? ge : V.id - ne.id;
    }
    if (Y.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var r = performance;
      Y.unstable_now = function() {
        return r.now();
      };
    } else {
      var f = Date, d = f.now();
      Y.unstable_now = function() {
        return f.now() - d;
      };
    }
    var h = [], c = [], g = 1, m = null, T = 3, b = !1, C = !1, w = !1, A = !1, M = typeof setTimeout == "function" ? setTimeout : null, N = typeof clearTimeout == "function" ? clearTimeout : null, Z = typeof setImmediate < "u" ? setImmediate : null;
    function ie(V) {
      for (var ne = a(c); ne !== null; ) {
        if (ne.callback === null) l(c);
        else if (ne.startTime <= V)
          l(c), ne.sortIndex = ne.expirationTime, K(h, ne);
        else break;
        ne = a(c);
      }
    }
    function se(V) {
      if (w = !1, ie(V), !C)
        if (a(h) !== null)
          C = !0, de || (de = !0, ve());
        else {
          var ne = a(c);
          ne !== null && Ie(se, ne.startTime - V);
        }
    }
    var de = !1, ue = -1, Te = 5, Ce = -1;
    function ke() {
      return A ? !0 : !(Y.unstable_now() - Ce < Te);
    }
    function Le() {
      if (A = !1, de) {
        var V = Y.unstable_now();
        Ce = V;
        var ne = !0;
        try {
          e: {
            C = !1, w && (w = !1, N(ue), ue = -1), b = !0;
            var ge = T;
            try {
              t: {
                for (ie(V), m = a(h); m !== null && !(m.expirationTime > V && ke()); ) {
                  var ze = m.callback;
                  if (typeof ze == "function") {
                    m.callback = null, T = m.priorityLevel;
                    var He = ze(
                      m.expirationTime <= V
                    );
                    if (V = Y.unstable_now(), typeof He == "function") {
                      m.callback = He, ie(V), ne = !0;
                      break t;
                    }
                    m === a(h) && l(h), ie(V);
                  } else l(h);
                  m = a(h);
                }
                if (m !== null) ne = !0;
                else {
                  var B = a(c);
                  B !== null && Ie(
                    se,
                    B.startTime - V
                  ), ne = !1;
                }
              }
              break e;
            } finally {
              m = null, T = ge, b = !1;
            }
            ne = void 0;
          }
        } finally {
          ne ? ve() : de = !1;
        }
      }
    }
    var ve;
    if (typeof Z == "function")
      ve = function() {
        Z(Le);
      };
    else if (typeof MessageChannel < "u") {
      var Ze = new MessageChannel(), Ke = Ze.port2;
      Ze.port1.onmessage = Le, ve = function() {
        Ke.postMessage(null);
      };
    } else
      ve = function() {
        M(Le, 0);
      };
    function Ie(V, ne) {
      ue = M(function() {
        V(Y.unstable_now());
      }, ne);
    }
    Y.unstable_IdlePriority = 5, Y.unstable_ImmediatePriority = 1, Y.unstable_LowPriority = 4, Y.unstable_NormalPriority = 3, Y.unstable_Profiling = null, Y.unstable_UserBlockingPriority = 2, Y.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, Y.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Te = 0 < V ? Math.floor(1e3 / V) : 5;
    }, Y.unstable_getCurrentPriorityLevel = function() {
      return T;
    }, Y.unstable_next = function(V) {
      switch (T) {
        case 1:
        case 2:
        case 3:
          var ne = 3;
          break;
        default:
          ne = T;
      }
      var ge = T;
      T = ne;
      try {
        return V();
      } finally {
        T = ge;
      }
    }, Y.unstable_requestPaint = function() {
      A = !0;
    }, Y.unstable_runWithPriority = function(V, ne) {
      switch (V) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          V = 3;
      }
      var ge = T;
      T = V;
      try {
        return ne();
      } finally {
        T = ge;
      }
    }, Y.unstable_scheduleCallback = function(V, ne, ge) {
      var ze = Y.unstable_now();
      switch (typeof ge == "object" && ge !== null ? (ge = ge.delay, ge = typeof ge == "number" && 0 < ge ? ze + ge : ze) : ge = ze, V) {
        case 1:
          var He = -1;
          break;
        case 2:
          He = 250;
          break;
        case 5:
          He = 1073741823;
          break;
        case 4:
          He = 1e4;
          break;
        default:
          He = 5e3;
      }
      return He = ge + He, V = {
        id: g++,
        callback: ne,
        priorityLevel: V,
        startTime: ge,
        expirationTime: He,
        sortIndex: -1
      }, ge > ze ? (V.sortIndex = ge, K(c, V), a(h) === null && V === a(c) && (w ? (N(ue), ue = -1) : w = !0, Ie(se, ge - ze))) : (V.sortIndex = He, K(h, V), C || b || (C = !0, de || (de = !0, ve()))), V;
    }, Y.unstable_shouldYield = ke, Y.unstable_wrapCallback = function(V) {
      var ne = T;
      return function() {
        var ge = T;
        T = ne;
        try {
          return V.apply(this, arguments);
        } finally {
          T = ge;
        }
      };
    };
  })(du)), du;
}
var ld;
function Am() {
  return ld || (ld = 1, fu.exports = Om()), fu.exports;
}
var gu = { exports: {} }, Ge = {};
var rd;
function zm() {
  if (rd) return Ge;
  rd = 1;
  var Y = /* @__PURE__ */ Symbol.for("react.transitional.element"), K = /* @__PURE__ */ Symbol.for("react.portal"), a = /* @__PURE__ */ Symbol.for("react.fragment"), l = /* @__PURE__ */ Symbol.for("react.strict_mode"), o = /* @__PURE__ */ Symbol.for("react.profiler"), r = /* @__PURE__ */ Symbol.for("react.consumer"), f = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), h = /* @__PURE__ */ Symbol.for("react.suspense"), c = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), m = /* @__PURE__ */ Symbol.for("react.activity"), T = Symbol.iterator;
  function b(B) {
    return B === null || typeof B != "object" ? null : (B = T && B[T] || B["@@iterator"], typeof B == "function" ? B : null);
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
  }, w = Object.assign, A = {};
  function M(B, I, J) {
    this.props = B, this.context = I, this.refs = A, this.updater = J || C;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(B, I) {
    if (typeof B != "object" && typeof B != "function" && B != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, B, I, "setState");
  }, M.prototype.forceUpdate = function(B) {
    this.updater.enqueueForceUpdate(this, B, "forceUpdate");
  };
  function N() {
  }
  N.prototype = M.prototype;
  function Z(B, I, J) {
    this.props = B, this.context = I, this.refs = A, this.updater = J || C;
  }
  var ie = Z.prototype = new N();
  ie.constructor = Z, w(ie, M.prototype), ie.isPureReactComponent = !0;
  var se = Array.isArray;
  function de() {
  }
  var ue = { H: null, A: null, T: null, S: null }, Te = Object.prototype.hasOwnProperty;
  function Ce(B, I, J) {
    var ce = J.ref;
    return {
      $$typeof: Y,
      type: B,
      key: I,
      ref: ce !== void 0 ? ce : null,
      props: J
    };
  }
  function ke(B, I) {
    return Ce(B.type, I, B.props);
  }
  function Le(B) {
    return typeof B == "object" && B !== null && B.$$typeof === Y;
  }
  function ve(B) {
    var I = { "=": "=0", ":": "=2" };
    return "$" + B.replace(/[=:]/g, function(J) {
      return I[J];
    });
  }
  var Ze = /\/+/g;
  function Ke(B, I) {
    return typeof B == "object" && B !== null && B.key != null ? ve("" + B.key) : I.toString(36);
  }
  function Ie(B) {
    switch (B.status) {
      case "fulfilled":
        return B.value;
      case "rejected":
        throw B.reason;
      default:
        switch (typeof B.status == "string" ? B.then(de, de) : (B.status = "pending", B.then(
          function(I) {
            B.status === "pending" && (B.status = "fulfilled", B.value = I);
          },
          function(I) {
            B.status === "pending" && (B.status = "rejected", B.reason = I);
          }
        )), B.status) {
          case "fulfilled":
            return B.value;
          case "rejected":
            throw B.reason;
        }
    }
    throw B;
  }
  function V(B, I, J, ce, Ee) {
    var Be = typeof B;
    (Be === "undefined" || Be === "boolean") && (B = null);
    var Fe = !1;
    if (B === null) Fe = !0;
    else
      switch (Be) {
        case "bigint":
        case "string":
        case "number":
          Fe = !0;
          break;
        case "object":
          switch (B.$$typeof) {
            case Y:
            case K:
              Fe = !0;
              break;
            case g:
              return Fe = B._init, V(
                Fe(B._payload),
                I,
                J,
                ce,
                Ee
              );
          }
      }
    if (Fe)
      return Ee = Ee(B), Fe = ce === "" ? "." + Ke(B, 0) : ce, se(Ee) ? (J = "", Fe != null && (J = Fe.replace(Ze, "$&/") + "/"), V(Ee, I, J, "", function(re) {
        return re;
      })) : Ee != null && (Le(Ee) && (Ee = ke(
        Ee,
        J + (Ee.key == null || B && B.key === Ee.key ? "" : ("" + Ee.key).replace(
          Ze,
          "$&/"
        ) + "/") + Fe
      )), I.push(Ee)), 1;
    Fe = 0;
    var lt = ce === "" ? "." : ce + ":";
    if (se(B))
      for (var rt = 0; rt < B.length; rt++)
        ce = B[rt], Be = lt + Ke(ce, rt), Fe += V(
          ce,
          I,
          J,
          Be,
          Ee
        );
    else if (rt = b(B), typeof rt == "function")
      for (B = rt.call(B), rt = 0; !(ce = B.next()).done; )
        ce = ce.value, Be = lt + Ke(ce, rt++), Fe += V(
          ce,
          I,
          J,
          Be,
          Ee
        );
    else if (Be === "object") {
      if (typeof B.then == "function")
        return V(
          Ie(B),
          I,
          J,
          ce,
          Ee
        );
      throw I = String(B), Error(
        "Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(B).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Fe;
  }
  function ne(B, I, J) {
    if (B == null) return B;
    var ce = [], Ee = 0;
    return V(B, ce, "", "", function(Be) {
      return I.call(J, Be, Ee++);
    }), ce;
  }
  function ge(B) {
    if (B._status === -1) {
      var I = B._result;
      I = I(), I.then(
        function(J) {
          (B._status === 0 || B._status === -1) && (B._status = 1, B._result = J);
        },
        function(J) {
          (B._status === 0 || B._status === -1) && (B._status = 2, B._result = J);
        }
      ), B._status === -1 && (B._status = 0, B._result = I);
    }
    if (B._status === 1) return B._result.default;
    throw B._result;
  }
  var ze = typeof reportError == "function" ? reportError : function(B) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var I = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof B == "object" && B !== null && typeof B.message == "string" ? String(B.message) : String(B),
        error: B
      });
      if (!window.dispatchEvent(I)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", B);
      return;
    }
    console.error(B);
  }, He = {
    map: ne,
    forEach: function(B, I, J) {
      ne(
        B,
        function() {
          I.apply(this, arguments);
        },
        J
      );
    },
    count: function(B) {
      var I = 0;
      return ne(B, function() {
        I++;
      }), I;
    },
    toArray: function(B) {
      return ne(B, function(I) {
        return I;
      }) || [];
    },
    only: function(B) {
      if (!Le(B))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return B;
    }
  };
  return Ge.Activity = m, Ge.Children = He, Ge.Component = M, Ge.Fragment = a, Ge.Profiler = o, Ge.PureComponent = Z, Ge.StrictMode = l, Ge.Suspense = h, Ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ue, Ge.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(B) {
      return ue.H.useMemoCache(B);
    }
  }, Ge.cache = function(B) {
    return function() {
      return B.apply(null, arguments);
    };
  }, Ge.cacheSignal = function() {
    return null;
  }, Ge.cloneElement = function(B, I, J) {
    if (B == null)
      throw Error(
        "The argument must be a React element, but you passed " + B + "."
      );
    var ce = w({}, B.props), Ee = B.key;
    if (I != null)
      for (Be in I.key !== void 0 && (Ee = "" + I.key), I)
        !Te.call(I, Be) || Be === "key" || Be === "__self" || Be === "__source" || Be === "ref" && I.ref === void 0 || (ce[Be] = I[Be]);
    var Be = arguments.length - 2;
    if (Be === 1) ce.children = J;
    else if (1 < Be) {
      for (var Fe = Array(Be), lt = 0; lt < Be; lt++)
        Fe[lt] = arguments[lt + 2];
      ce.children = Fe;
    }
    return Ce(B.type, Ee, ce);
  }, Ge.createContext = function(B) {
    return B = {
      $$typeof: f,
      _currentValue: B,
      _currentValue2: B,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, B.Provider = B, B.Consumer = {
      $$typeof: r,
      _context: B
    }, B;
  }, Ge.createElement = function(B, I, J) {
    var ce, Ee = {}, Be = null;
    if (I != null)
      for (ce in I.key !== void 0 && (Be = "" + I.key), I)
        Te.call(I, ce) && ce !== "key" && ce !== "__self" && ce !== "__source" && (Ee[ce] = I[ce]);
    var Fe = arguments.length - 2;
    if (Fe === 1) Ee.children = J;
    else if (1 < Fe) {
      for (var lt = Array(Fe), rt = 0; rt < Fe; rt++)
        lt[rt] = arguments[rt + 2];
      Ee.children = lt;
    }
    if (B && B.defaultProps)
      for (ce in Fe = B.defaultProps, Fe)
        Ee[ce] === void 0 && (Ee[ce] = Fe[ce]);
    return Ce(B, Be, Ee);
  }, Ge.createRef = function() {
    return { current: null };
  }, Ge.forwardRef = function(B) {
    return { $$typeof: d, render: B };
  }, Ge.isValidElement = Le, Ge.lazy = function(B) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: B },
      _init: ge
    };
  }, Ge.memo = function(B, I) {
    return {
      $$typeof: c,
      type: B,
      compare: I === void 0 ? null : I
    };
  }, Ge.startTransition = function(B) {
    var I = ue.T, J = {};
    ue.T = J;
    try {
      var ce = B(), Ee = ue.S;
      Ee !== null && Ee(J, ce), typeof ce == "object" && ce !== null && typeof ce.then == "function" && ce.then(de, ze);
    } catch (Be) {
      ze(Be);
    } finally {
      I !== null && J.types !== null && (I.types = J.types), ue.T = I;
    }
  }, Ge.unstable_useCacheRefresh = function() {
    return ue.H.useCacheRefresh();
  }, Ge.use = function(B) {
    return ue.H.use(B);
  }, Ge.useActionState = function(B, I, J) {
    return ue.H.useActionState(B, I, J);
  }, Ge.useCallback = function(B, I) {
    return ue.H.useCallback(B, I);
  }, Ge.useContext = function(B) {
    return ue.H.useContext(B);
  }, Ge.useDebugValue = function() {
  }, Ge.useDeferredValue = function(B, I) {
    return ue.H.useDeferredValue(B, I);
  }, Ge.useEffect = function(B, I) {
    return ue.H.useEffect(B, I);
  }, Ge.useEffectEvent = function(B) {
    return ue.H.useEffectEvent(B);
  }, Ge.useId = function() {
    return ue.H.useId();
  }, Ge.useImperativeHandle = function(B, I, J) {
    return ue.H.useImperativeHandle(B, I, J);
  }, Ge.useInsertionEffect = function(B, I) {
    return ue.H.useInsertionEffect(B, I);
  }, Ge.useLayoutEffect = function(B, I) {
    return ue.H.useLayoutEffect(B, I);
  }, Ge.useMemo = function(B, I) {
    return ue.H.useMemo(B, I);
  }, Ge.useOptimistic = function(B, I) {
    return ue.H.useOptimistic(B, I);
  }, Ge.useReducer = function(B, I, J) {
    return ue.H.useReducer(B, I, J);
  }, Ge.useRef = function(B) {
    return ue.H.useRef(B);
  }, Ge.useState = function(B) {
    return ue.H.useState(B);
  }, Ge.useSyncExternalStore = function(B, I, J) {
    return ue.H.useSyncExternalStore(
      B,
      I,
      J
    );
  }, Ge.useTransition = function() {
    return ue.H.useTransition();
  }, Ge.version = "19.2.0", Ge;
}
var sd;
function _u() {
  return sd || (sd = 1, gu.exports = zm()), gu.exports;
}
var mu = { exports: {} }, Ft = {};
var od;
function Mm() {
  if (od) return Ft;
  od = 1;
  var Y = _u();
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
    var m = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: m == null ? null : "" + m,
      children: h,
      containerInfo: c,
      implementation: g
    };
  }
  var f = Y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(h, c) {
    if (h === "font") return "";
    if (typeof c == "string")
      return c === "use-credentials" ? c : "";
  }
  return Ft.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, Ft.createPortal = function(h, c) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!c || c.nodeType !== 1 && c.nodeType !== 9 && c.nodeType !== 11)
      throw Error(K(299));
    return r(h, c, null, g);
  }, Ft.flushSync = function(h) {
    var c = f.T, g = l.p;
    try {
      if (f.T = null, l.p = 2, h) return h();
    } finally {
      f.T = c, l.p = g, l.d.f();
    }
  }, Ft.preconnect = function(h, c) {
    typeof h == "string" && (c ? (c = c.crossOrigin, c = typeof c == "string" ? c === "use-credentials" ? c : "" : void 0) : c = null, l.d.C(h, c));
  }, Ft.prefetchDNS = function(h) {
    typeof h == "string" && l.d.D(h);
  }, Ft.preinit = function(h, c) {
    if (typeof h == "string" && c && typeof c.as == "string") {
      var g = c.as, m = d(g, c.crossOrigin), T = typeof c.integrity == "string" ? c.integrity : void 0, b = typeof c.fetchPriority == "string" ? c.fetchPriority : void 0;
      g === "style" ? l.d.S(
        h,
        typeof c.precedence == "string" ? c.precedence : void 0,
        {
          crossOrigin: m,
          integrity: T,
          fetchPriority: b
        }
      ) : g === "script" && l.d.X(h, {
        crossOrigin: m,
        integrity: T,
        fetchPriority: b,
        nonce: typeof c.nonce == "string" ? c.nonce : void 0
      });
    }
  }, Ft.preinitModule = function(h, c) {
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
  }, Ft.preload = function(h, c) {
    if (typeof h == "string" && typeof c == "object" && c !== null && typeof c.as == "string") {
      var g = c.as, m = d(g, c.crossOrigin);
      l.d.L(h, g, {
        crossOrigin: m,
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
  }, Ft.preloadModule = function(h, c) {
    if (typeof h == "string")
      if (c) {
        var g = d(c.as, c.crossOrigin);
        l.d.m(h, {
          as: typeof c.as == "string" && c.as !== "script" ? c.as : void 0,
          crossOrigin: g,
          integrity: typeof c.integrity == "string" ? c.integrity : void 0
        });
      } else l.d.m(h);
  }, Ft.requestFormReset = function(h) {
    l.d.r(h);
  }, Ft.unstable_batchedUpdates = function(h, c) {
    return h(c);
  }, Ft.useFormState = function(h, c, g) {
    return f.H.useFormState(h, c, g);
  }, Ft.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, Ft.version = "19.2.0", Ft;
}
var ud;
function Bm() {
  if (ud) return mu.exports;
  ud = 1;
  function Y() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Y);
      } catch (K) {
        console.error(K);
      }
  }
  return Y(), mu.exports = Mm(), mu.exports;
}
var cd;
function Hm() {
  if (cd) return jl;
  cd = 1;
  var Y = Am(), K = _u(), a = Bm();
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
  var m = Object.assign, T = /* @__PURE__ */ Symbol.for("react.element"), b = /* @__PURE__ */ Symbol.for("react.transitional.element"), C = /* @__PURE__ */ Symbol.for("react.portal"), w = /* @__PURE__ */ Symbol.for("react.fragment"), A = /* @__PURE__ */ Symbol.for("react.strict_mode"), M = /* @__PURE__ */ Symbol.for("react.profiler"), N = /* @__PURE__ */ Symbol.for("react.consumer"), Z = /* @__PURE__ */ Symbol.for("react.context"), ie = /* @__PURE__ */ Symbol.for("react.forward_ref"), se = /* @__PURE__ */ Symbol.for("react.suspense"), de = /* @__PURE__ */ Symbol.for("react.suspense_list"), ue = /* @__PURE__ */ Symbol.for("react.memo"), Te = /* @__PURE__ */ Symbol.for("react.lazy"), Ce = /* @__PURE__ */ Symbol.for("react.activity"), ke = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Le = Symbol.iterator;
  function ve(e) {
    return e === null || typeof e != "object" ? null : (e = Le && e[Le] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ze = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Ke(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ze ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case w:
        return "Fragment";
      case M:
        return "Profiler";
      case A:
        return "StrictMode";
      case se:
        return "Suspense";
      case de:
        return "SuspenseList";
      case Ce:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case C:
          return "Portal";
        case Z:
          return e.displayName || "Context";
        case N:
          return (e._context.displayName || "Context") + ".Consumer";
        case ie:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ue:
          return t = e.displayName || null, t !== null ? t : Ke(e.type) || "Memo";
        case Te:
          t = e._payload, e = e._init;
          try {
            return Ke(e(t));
          } catch {
          }
      }
    return null;
  }
  var Ie = Array.isArray, V = K.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ge = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ze = [], He = -1;
  function B(e) {
    return { current: e };
  }
  function I(e) {
    0 > He || (e.current = ze[He], ze[He] = null, He--);
  }
  function J(e, t) {
    He++, ze[He] = e.current, e.current = t;
  }
  var ce = B(null), Ee = B(null), Be = B(null), Fe = B(null);
  function lt(e, t) {
    switch (J(Be, t), J(Ee, e), J(ce, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Ef(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Ef(t), e = bf(t, e);
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
    I(ce), J(ce, e);
  }
  function rt() {
    I(ce), I(Ee), I(Be);
  }
  function re(e) {
    e.memoizedState !== null && J(Fe, e);
    var t = ce.current, i = bf(t, e.type);
    t !== i && (J(Ee, e), J(ce, i));
  }
  function be(e) {
    Ee.current === e && (I(ce), I(Ee)), Fe.current === e && (I(Fe), Hl._currentValue = ge);
  }
  var xe, Ve;
  function Ye(e) {
    if (xe === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        xe = t && t[1] || "", Ve = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + xe + e + Ve;
  }
  var tt = !1;
  function wt(e, t) {
    if (!e || tt) return "";
    tt = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var te = function() {
                throw Error();
              };
              if (Object.defineProperty(te.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(te, []);
                } catch (X) {
                  var G = X;
                }
                Reflect.construct(e, [], te);
              } else {
                try {
                  te.call();
                } catch (X) {
                  G = X;
                }
                e.call(te.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (X) {
                G = X;
              }
              (te = e()) && typeof te.catch == "function" && te.catch(function() {
              });
            }
          } catch (X) {
            if (X && G && typeof X.stack == "string")
              return [X.stack, G.stack];
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
        var z = v.split(`
`), j = S.split(`
`);
        for (s = n = 0; n < z.length && !z[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; s < j.length && !j[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (n === z.length || s === j.length)
          for (n = z.length - 1, s = j.length - 1; 1 <= n && 0 <= s && z[n] !== j[s]; )
            s--;
        for (; 1 <= n && 0 <= s; n--, s--)
          if (z[n] !== j[s]) {
            if (n !== 1 || s !== 1)
              do
                if (n--, s--, 0 > s || z[n] !== j[s]) {
                  var Q = `
` + z[n].replace(" at new ", " at ");
                  return e.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", e.displayName)), Q;
                }
              while (1 <= n && 0 <= s);
            break;
          }
      }
    } finally {
      tt = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Ye(i) : "";
  }
  function p(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ye(e.type);
      case 16:
        return Ye("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ye("Suspense Fallback") : Ye("Suspense");
      case 19:
        return Ye("SuspenseList");
      case 0:
      case 15:
        return wt(e.type, !1);
      case 11:
        return wt(e.type.render, !1);
      case 1:
        return wt(e.type, !0);
      case 31:
        return Ye("Activity");
      default:
        return "";
    }
  }
  function E(e) {
    try {
      var t = "", i = null;
      do
        t += p(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var L = Object.prototype.hasOwnProperty, W = Y.unstable_scheduleCallback, le = Y.unstable_cancelCallback, he = Y.unstable_shouldYield, q = Y.unstable_requestPaint, oe = Y.unstable_now, we = Y.unstable_getCurrentPriorityLevel, fe = Y.unstable_ImmediatePriority, ye = Y.unstable_UserBlockingPriority, Me = Y.unstable_NormalPriority, x = Y.unstable_LowPriority, y = Y.unstable_IdlePriority, _ = Y.log, D = Y.unstable_setDisableYieldValue, k = null, $ = null;
  function me(e) {
    if (typeof _ == "function" && D(e), $ && typeof $.setStrictMode == "function")
      try {
        $.setStrictMode(k, e);
      } catch {
      }
  }
  var Ue = Math.clz32 ? Math.clz32 : je, De = Math.log, zt = Math.LN2;
  function je(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (De(e) / zt | 0) | 0;
  }
  var it = 256, Gi = 262144, bi = 4194304;
  function kt(e) {
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
  function jn(e, t, i) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var s = 0, u = e.suspendedLanes, v = e.pingedLanes;
    e = e.warmLanes;
    var S = n & 134217727;
    return S !== 0 ? (n = S & ~u, n !== 0 ? s = kt(n) : (v &= S, v !== 0 ? s = kt(v) : i || (i = S & ~e, i !== 0 && (s = kt(i))))) : (S = n & ~u, S !== 0 ? s = kt(S) : v !== 0 ? s = kt(v) : i || (i = n & ~e, i !== 0 && (s = kt(i)))), s === 0 ? 0 : t !== 0 && t !== s && (t & u) === 0 && (u = s & -s, i = t & -t, u >= i || u === 32 && (i & 4194048) !== 0) ? t : s;
  }
  function Ri(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Vl(e, t) {
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
  function rn() {
    var e = bi;
    return bi <<= 1, (bi & 62914560) === 0 && (bi = 4194304), e;
  }
  function Fn(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function ki(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function ql(e, t, i, n, s, u) {
    var v = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var S = e.entanglements, z = e.expirationTimes, j = e.hiddenUpdates;
    for (i = v & ~i; 0 < i; ) {
      var Q = 31 - Ue(i), te = 1 << Q;
      S[Q] = 0, z[Q] = -1;
      var G = j[Q];
      if (G !== null)
        for (j[Q] = null, Q = 0; Q < G.length; Q++) {
          var X = G[Q];
          X !== null && (X.lane &= -536870913);
        }
      i &= ~te;
    }
    n !== 0 && Fa(e, n, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(v & ~t));
  }
  function Fa(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var n = 31 - Ue(t);
    e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | i & 261930;
  }
  function Ga(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var n = 31 - Ue(i), s = 1 << n;
      s & t | e[n] & t && (e[n] |= t), i &= ~s;
    }
  }
  function ka(e, t) {
    var i = t & -t;
    return i = (i & 42) !== 0 ? 1 : la(i), (i & (e.suspendedLanes | t)) !== 0 ? 0 : i;
  }
  function la(e) {
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
  function Gn(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function _e() {
    var e = ne.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : If(e.type));
  }
  function sn(e, t) {
    var i = ne.p;
    try {
      return ne.p = e, t();
    } finally {
      ne.p = i;
    }
  }
  var Ci = Math.random().toString(36).slice(2), yt = "__reactFiber$" + Ci, Mt = "__reactProps$" + Ci, ui = "__reactContainer$" + Ci, mt = "__reactEvents$" + Ci, ra = "__reactListeners$" + Ci, ei = "__reactHandles$" + Ci, Va = "__reactResources$" + Ci, Di = "__reactMarker$" + Ci;
  function on(e) {
    delete e[yt], delete e[Mt], delete e[mt], delete e[ra], delete e[ei];
  }
  function Oi(e) {
    var t = e[yt];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[ui] || i[yt]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = Mf(e); e !== null; ) {
            if (i = e[yt]) return i;
            e = Mf(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function Ti(e) {
    if (e = e[yt] || e[ui]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ai(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(l(33));
  }
  function zi(e) {
    var t = e[Va];
    return t || (t = e[Va] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function xt(e) {
    e[Di] = !0;
  }
  var xi = /* @__PURE__ */ new Set(), Bt = {};
  function Mi(e, t) {
    Zt(e, t), Zt(e + "Capture", t);
  }
  function Zt(e, t) {
    for (Bt[e] = t, e = 0; e < t.length; e++)
      xi.add(t[e]);
  }
  var ss = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Bi = {}, qa = {};
  function Zl(e) {
    return L.call(qa, e) ? !0 : L.call(Bi, e) ? !1 : ss.test(e) ? qa[e] = !0 : (Bi[e] = !0, !1);
  }
  function sa(e, t, i) {
    if (Zl(t))
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
  function un(e, t, i) {
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
  function ti(e, t, i, n) {
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
  function Xt(e) {
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
  function Xl(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function kn(e, t, i) {
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
  function Vi(e) {
    if (!e._valueTracker) {
      var t = Xl(e) ? "checked" : "value";
      e._valueTracker = kn(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Za(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), n = "";
    return e && (n = Xl(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== i ? (t.setValue(e), !0) : !1;
  }
  function cn(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Xa = /[\n"\\]/g;
  function Vt(e) {
    return e.replace(
      Xa,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ya(e, t, i, n, s, u, v, S) {
    e.name = "", v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? e.type = v : e.removeAttribute("type"), t != null ? v === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Xt(t)) : e.value !== "" + Xt(t) && (e.value = "" + Xt(t)) : v !== "submit" && v !== "reset" || e.removeAttribute("value"), t != null ? Ia(e, v, Xt(t)) : i != null ? Ia(e, v, Xt(i)) : n != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" ? e.name = "" + Xt(S) : e.removeAttribute("name");
  }
  function Yl(e, t, i, n, s, u, v, S) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || i != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Vi(e);
        return;
      }
      i = i != null ? "" + Xt(i) : "", t = t != null ? "" + Xt(t) : i, S || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = n ?? s, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = S ? e.checked : !!n, e.defaultChecked = !!n, v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" && (e.name = v), Vi(e);
  }
  function Ia(e, t, i) {
    t === "number" && cn(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function hn(e, t, i, n) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < i.length; s++)
        t["$" + i[s]] = !0;
      for (i = 0; i < e.length; i++)
        s = t.hasOwnProperty("$" + e[i].value), e[i].selected !== s && (e[i].selected = s), s && n && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + Xt(i), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === i) {
          e[s].selected = !0, n && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function oa(e, t, i) {
    if (t != null && (t = "" + Xt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + Xt(i) : "";
  }
  function Il(e, t, i, n) {
    if (t == null) {
      if (n != null) {
        if (i != null) throw Error(l(92));
        if (Ie(n)) {
          if (1 < n.length) throw Error(l(93));
          n = n[0];
        }
        i = n;
      }
      i == null && (i = ""), t = i;
    }
    i = Xt(t), e.defaultValue = i, n = e.textContent, n === i && n !== "" && n !== null && (e.value = n), Vi(e);
  }
  function fn(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var os = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ql(e, t, i) {
    var n = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, i) : typeof i != "number" || i === 0 || os.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function Qa(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(l(62));
    if (e = e.style, i != null) {
      for (var n in i)
        !i.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
      for (var s in t)
        n = t[s], t.hasOwnProperty(s) && i[s] !== n && Ql(e, s, n);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Ql(e, u, t[u]);
  }
  function dn(e) {
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
  var Wl = /* @__PURE__ */ new Map([
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
  ]), Kl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Yt(e) {
    return Kl.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ci() {
  }
  var Wa = null;
  function ua(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var gn = null, O = null;
  function F(e) {
    var t = Ti(e);
    if (t && (e = t.stateNode)) {
      var i = e[Mt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ya(
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
              'input[name="' + Vt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var n = i[t];
              if (n !== e && n.form === e.form) {
                var s = n[Mt] || null;
                if (!s) throw Error(l(90));
                Ya(
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
              n = i[t], n.form === e.form && Za(n);
          }
          break e;
        case "textarea":
          oa(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && hn(e, !!i.multiple, t, !1);
      }
    }
  }
  var pe = !1;
  function Oe(e, t, i) {
    if (pe) return e(t, i);
    pe = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (pe = !1, (gn !== null || O !== null) && (Ur(), gn && (t = gn, e = O, O = gn = null, F(t), e)))
        for (t = 0; t < e.length; t++) F(e[t]);
    }
  }
  function ot(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var n = i[Mt] || null;
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
  var Ht = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ka = !1;
  if (Ht)
    try {
      var Ja = {};
      Object.defineProperty(Ja, "passive", {
        get: function() {
          Ka = !0;
        }
      }), window.addEventListener("test", Ja, Ja), window.removeEventListener("test", Ja, Ja);
    } catch {
      Ka = !1;
    }
  var mn = null, us = null, Jl = null;
  function Eu() {
    if (Jl) return Jl;
    var e, t = us, i = t.length, n, s = "value" in mn ? mn.value : mn.textContent, u = s.length;
    for (e = 0; e < i && t[e] === s[e]; e++) ;
    var v = i - e;
    for (n = 1; n <= v && t[i - n] === s[u - n]; n++) ;
    return Jl = s.slice(e, 1 < n ? 1 - n : void 0);
  }
  function $l(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function er() {
    return !0;
  }
  function bu() {
    return !1;
  }
  function It(e) {
    function t(i, n, s, u, v) {
      this._reactName = i, this._targetInst = s, this.type = n, this.nativeEvent = u, this.target = v, this.currentTarget = null;
      for (var S in e)
        e.hasOwnProperty(S) && (i = e[S], this[S] = i ? i(u) : u[S]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? er : bu, this.isPropagationStopped = bu, this;
    }
    return m(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = er);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = er);
      },
      persist: function() {
      },
      isPersistent: er
    }), t;
  }
  var Vn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, tr = It(Vn), $a = m({}, Vn, { view: 0, detail: 0 }), xd = It($a), cs, hs, el, ir = m({}, $a, {
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
    getModifierState: ds,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== el && (el && e.type === "mousemove" ? (cs = e.screenX - el.screenX, hs = e.screenY - el.screenY) : hs = cs = 0, el = e), cs);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : hs;
    }
  }), Ru = It(ir), wd = m({}, ir, { dataTransfer: 0 }), Sd = It(wd), _d = m({}, $a, { relatedTarget: 0 }), fs = It(_d), Ed = m({}, Vn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), bd = It(Ed), Rd = m({}, Vn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Cd = It(Rd), Dd = m({}, Vn, { data: 0 }), Cu = It(Dd), Od = {
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
  }, Ad = {
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
  }, zd = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Md(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = zd[e]) ? !!t[e] : !1;
  }
  function ds() {
    return Md;
  }
  var Bd = m({}, $a, {
    key: function(e) {
      if (e.key) {
        var t = Od[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = $l(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ad[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ds,
    charCode: function(e) {
      return e.type === "keypress" ? $l(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? $l(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Hd = It(Bd), Nd = m({}, ir, {
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
  }), Du = It(Nd), Pd = m({}, $a, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ds
  }), Ld = It(Pd), Ud = m({}, Vn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), jd = It(Ud), Fd = m({}, ir, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Gd = It(Fd), kd = m({}, Vn, {
    newState: 0,
    oldState: 0
  }), Vd = It(kd), qd = [9, 13, 27, 32], gs = Ht && "CompositionEvent" in window, tl = null;
  Ht && "documentMode" in document && (tl = document.documentMode);
  var Zd = Ht && "TextEvent" in window && !tl, Ou = Ht && (!gs || tl && 8 < tl && 11 >= tl), Au = " ", zu = !1;
  function Mu(e, t) {
    switch (e) {
      case "keyup":
        return qd.indexOf(t.keyCode) !== -1;
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
  function Bu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ca = !1;
  function Xd(e, t) {
    switch (e) {
      case "compositionend":
        return Bu(t);
      case "keypress":
        return t.which !== 32 ? null : (zu = !0, Au);
      case "textInput":
        return e = t.data, e === Au && zu ? null : e;
      default:
        return null;
    }
  }
  function Yd(e, t) {
    if (ca)
      return e === "compositionend" || !gs && Mu(e, t) ? (e = Eu(), Jl = us = mn = null, ca = !1, e) : null;
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
        return Ou && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Id = {
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
  function Hu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Id[e.type] : t === "textarea";
  }
  function Nu(e, t, i, n) {
    gn ? O ? O.push(n) : O = [n] : gn = n, t = Zr(t, "onChange"), 0 < t.length && (i = new tr(
      "onChange",
      "change",
      null,
      i,
      n
    ), e.push({ event: i, listeners: t }));
  }
  var il = null, nl = null;
  function Qd(e) {
    yf(e, 0);
  }
  function nr(e) {
    var t = Ai(e);
    if (Za(t)) return e;
  }
  function Pu(e, t) {
    if (e === "change") return t;
  }
  var Lu = !1;
  if (Ht) {
    var ms;
    if (Ht) {
      var ps = "oninput" in document;
      if (!ps) {
        var Uu = document.createElement("div");
        Uu.setAttribute("oninput", "return;"), ps = typeof Uu.oninput == "function";
      }
      ms = ps;
    } else ms = !1;
    Lu = ms && (!document.documentMode || 9 < document.documentMode);
  }
  function ju() {
    il && (il.detachEvent("onpropertychange", Fu), nl = il = null);
  }
  function Fu(e) {
    if (e.propertyName === "value" && nr(nl)) {
      var t = [];
      Nu(
        t,
        nl,
        e,
        ua(e)
      ), Oe(Qd, t);
    }
  }
  function Wd(e, t, i) {
    e === "focusin" ? (ju(), il = t, nl = i, il.attachEvent("onpropertychange", Fu)) : e === "focusout" && ju();
  }
  function Kd(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return nr(nl);
  }
  function Jd(e, t) {
    if (e === "click") return nr(t);
  }
  function $d(e, t) {
    if (e === "input" || e === "change")
      return nr(t);
  }
  function eg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ii = typeof Object.is == "function" ? Object.is : eg;
  function al(e, t) {
    if (ii(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), n = Object.keys(t);
    if (i.length !== n.length) return !1;
    for (n = 0; n < i.length; n++) {
      var s = i[n];
      if (!L.call(t, s) || !ii(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function Gu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function ku(e, t) {
    var i = Gu(e);
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
      i = Gu(i);
    }
  }
  function Vu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Vu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function qu(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = cn(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = cn(e.document);
    }
    return t;
  }
  function vs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var tg = Ht && "documentMode" in document && 11 >= document.documentMode, ha = null, ys = null, ll = null, Ts = !1;
  function Zu(e, t, i) {
    var n = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Ts || ha == null || ha !== cn(n) || (n = ha, "selectionStart" in n && vs(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), ll && al(ll, n) || (ll = n, n = Zr(ys, "onSelect"), 0 < n.length && (t = new tr(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: n }), t.target = ha)));
  }
  function qn(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var fa = {
    animationend: qn("Animation", "AnimationEnd"),
    animationiteration: qn("Animation", "AnimationIteration"),
    animationstart: qn("Animation", "AnimationStart"),
    transitionrun: qn("Transition", "TransitionRun"),
    transitionstart: qn("Transition", "TransitionStart"),
    transitioncancel: qn("Transition", "TransitionCancel"),
    transitionend: qn("Transition", "TransitionEnd")
  }, xs = {}, Xu = {};
  Ht && (Xu = document.createElement("div").style, "AnimationEvent" in window || (delete fa.animationend.animation, delete fa.animationiteration.animation, delete fa.animationstart.animation), "TransitionEvent" in window || delete fa.transitionend.transition);
  function Zn(e) {
    if (xs[e]) return xs[e];
    if (!fa[e]) return e;
    var t = fa[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in Xu)
        return xs[e] = t[i];
    return e;
  }
  var Yu = Zn("animationend"), Iu = Zn("animationiteration"), Qu = Zn("animationstart"), ig = Zn("transitionrun"), ng = Zn("transitionstart"), ag = Zn("transitioncancel"), Wu = Zn("transitionend"), Ku = /* @__PURE__ */ new Map(), ws = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ws.push("scrollEnd");
  function wi(e, t) {
    Ku.set(e, t), Mi(t, [e]);
  }
  var ar = typeof reportError == "function" ? reportError : function(e) {
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
  }, hi = [], da = 0, Ss = 0;
  function lr() {
    for (var e = da, t = Ss = da = 0; t < e; ) {
      var i = hi[t];
      hi[t++] = null;
      var n = hi[t];
      hi[t++] = null;
      var s = hi[t];
      hi[t++] = null;
      var u = hi[t];
      if (hi[t++] = null, n !== null && s !== null) {
        var v = n.pending;
        v === null ? s.next = s : (s.next = v.next, v.next = s), n.pending = s;
      }
      u !== 0 && Ju(i, s, u);
    }
  }
  function rr(e, t, i, n) {
    hi[da++] = e, hi[da++] = t, hi[da++] = i, hi[da++] = n, Ss |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
  }
  function _s(e, t, i, n) {
    return rr(e, t, i, n), sr(e);
  }
  function Xn(e, t) {
    return rr(e, null, null, t), sr(e);
  }
  function Ju(e, t, i) {
    e.lanes |= i;
    var n = e.alternate;
    n !== null && (n.lanes |= i);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= i, n = u.alternate, n !== null && (n.childLanes |= i), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - Ue(i), e = u.hiddenUpdates, n = e[s], n === null ? e[s] = [t] : n.push(t), t.lane = i | 536870912), u) : null;
  }
  function sr(e) {
    if (50 < Cl)
      throw Cl = 0, Bo = null, Error(l(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ga = {};
  function lg(e, t, i, n) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ni(e, t, i, n) {
    return new lg(e, t, i, n);
  }
  function Es(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function qi(e, t) {
    var i = e.alternate;
    return i === null ? (i = ni(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function $u(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function or(e, t, i, n, s, u) {
    var v = 0;
    if (n = e, typeof e == "function") Es(e) && (v = 1);
    else if (typeof e == "string")
      v = cm(
        e,
        i,
        ce.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Ce:
          return e = ni(31, i, t, s), e.elementType = Ce, e.lanes = u, e;
        case w:
          return Yn(i.children, s, u, t);
        case A:
          v = 8, s |= 24;
          break;
        case M:
          return e = ni(12, i, t, s | 2), e.elementType = M, e.lanes = u, e;
        case se:
          return e = ni(13, i, t, s), e.elementType = se, e.lanes = u, e;
        case de:
          return e = ni(19, i, t, s), e.elementType = de, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Z:
                v = 10;
                break e;
              case N:
                v = 9;
                break e;
              case ie:
                v = 11;
                break e;
              case ue:
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
    return t = ni(v, i, t, s), t.elementType = e, t.type = n, t.lanes = u, t;
  }
  function Yn(e, t, i, n) {
    return e = ni(7, e, n, t), e.lanes = i, e;
  }
  function bs(e, t, i) {
    return e = ni(6, e, null, t), e.lanes = i, e;
  }
  function ec(e) {
    var t = ni(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Rs(e, t, i) {
    return t = ni(
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
  var tc = /* @__PURE__ */ new WeakMap();
  function fi(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = tc.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: E(t)
      }, tc.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: E(t)
    };
  }
  var ma = [], pa = 0, ur = null, rl = 0, di = [], gi = 0, pn = null, Hi = 1, Ni = "";
  function Zi(e, t) {
    ma[pa++] = rl, ma[pa++] = ur, ur = e, rl = t;
  }
  function ic(e, t, i) {
    di[gi++] = Hi, di[gi++] = Ni, di[gi++] = pn, pn = e;
    var n = Hi;
    e = Ni;
    var s = 32 - Ue(n) - 1;
    n &= ~(1 << s), i += 1;
    var u = 32 - Ue(t) + s;
    if (30 < u) {
      var v = s - s % 5;
      u = (n & (1 << v) - 1).toString(32), n >>= v, s -= v, Hi = 1 << 32 - Ue(t) + s | i << s | n, Ni = u + e;
    } else
      Hi = 1 << u | i << s | n, Ni = e;
  }
  function Cs(e) {
    e.return !== null && (Zi(e, 1), ic(e, 1, 0));
  }
  function Ds(e) {
    for (; e === ur; )
      ur = ma[--pa], ma[pa] = null, rl = ma[--pa], ma[pa] = null;
    for (; e === pn; )
      pn = di[--gi], di[gi] = null, Ni = di[--gi], di[gi] = null, Hi = di[--gi], di[gi] = null;
  }
  function nc(e, t) {
    di[gi++] = Hi, di[gi++] = Ni, di[gi++] = pn, Hi = t.id, Ni = t.overflow, pn = e;
  }
  var Pt = null, pt = null, et = !1, vn = null, mi = !1, Os = Error(l(519));
  function yn(e) {
    var t = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw sl(fi(t, e)), Os;
  }
  function ac(e) {
    var t = e.stateNode, i = e.type, n = e.memoizedProps;
    switch (t[yt] = e, t[Mt] = n, i) {
      case "dialog":
        We("cancel", t), We("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        We("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ol.length; i++)
          We(Ol[i], t);
        break;
      case "source":
        We("error", t);
        break;
      case "img":
      case "image":
      case "link":
        We("error", t), We("load", t);
        break;
      case "details":
        We("toggle", t);
        break;
      case "input":
        We("invalid", t), Yl(
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
        We("invalid", t);
        break;
      case "textarea":
        We("invalid", t), Il(t, n.value, n.defaultValue, n.children);
    }
    i = n.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || n.suppressHydrationWarning === !0 || Sf(t.textContent, i) ? (n.popover != null && (We("beforetoggle", t), We("toggle", t)), n.onScroll != null && We("scroll", t), n.onScrollEnd != null && We("scrollend", t), n.onClick != null && (t.onclick = ci), t = !0) : t = !1, t || yn(e, !0);
  }
  function lc(e) {
    for (Pt = e.return; Pt; )
      switch (Pt.tag) {
        case 5:
        case 31:
        case 13:
          mi = !1;
          return;
        case 27:
        case 3:
          mi = !0;
          return;
        default:
          Pt = Pt.return;
      }
  }
  function va(e) {
    if (e !== Pt) return !1;
    if (!et) return lc(e), et = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Io(e.type, e.memoizedProps)), i = !i), i && pt && yn(e), lc(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      pt = zf(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      pt = zf(e);
    } else
      t === 27 ? (t = pt, Mn(e.type) ? (e = $o, $o = null, pt = e) : pt = t) : pt = Pt ? vi(e.stateNode.nextSibling) : null;
    return !0;
  }
  function In() {
    pt = Pt = null, et = !1;
  }
  function As() {
    var e = vn;
    return e !== null && (Jt === null ? Jt = e : Jt.push.apply(
      Jt,
      e
    ), vn = null), e;
  }
  function sl(e) {
    vn === null ? vn = [e] : vn.push(e);
  }
  var zs = B(null), Qn = null, Xi = null;
  function Tn(e, t, i) {
    J(zs, t._currentValue), t._currentValue = i;
  }
  function Yi(e) {
    e._currentValue = zs.current, I(zs);
  }
  function Ms(e, t, i) {
    for (; e !== null; ) {
      var n = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function Bs(e, t, i, n) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var v = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var S = u;
          u = s;
          for (var z = 0; z < t.length; z++)
            if (S.context === t[z]) {
              u.lanes |= i, S = u.alternate, S !== null && (S.lanes |= i), Ms(
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
        v.lanes |= i, u = v.alternate, u !== null && (u.lanes |= i), Ms(v, i, e), v = null;
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
  function ya(e, t, i, n) {
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
          ii(s.pendingProps.value, v.value) || (e !== null ? e.push(S) : e = [S]);
        }
      } else if (s === Fe.current) {
        if (v = s.alternate, v === null) throw Error(l(387));
        v.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(Hl) : e = [Hl]);
      }
      s = s.return;
    }
    e !== null && Bs(
      t,
      e,
      i,
      n
    ), t.flags |= 262144;
  }
  function cr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ii(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Wn(e) {
    Qn = e, Xi = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Lt(e) {
    return rc(Qn, e);
  }
  function hr(e, t) {
    return Qn === null && Wn(e), rc(e, t);
  }
  function rc(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, Xi === null) {
      if (e === null) throw Error(l(308));
      Xi = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Xi = Xi.next = t;
    return i;
  }
  var rg = typeof AbortController < "u" ? AbortController : function() {
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
  }, sg = Y.unstable_scheduleCallback, og = Y.unstable_NormalPriority, Rt = {
    $$typeof: Z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Hs() {
    return {
      controller: new rg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ol(e) {
    e.refCount--, e.refCount === 0 && sg(og, function() {
      e.controller.abort();
    });
  }
  var ul = null, Ns = 0, Ta = 0, xa = null;
  function ug(e, t) {
    if (ul === null) {
      var i = ul = [];
      Ns = 0, Ta = jo(), xa = {
        status: "pending",
        value: void 0,
        then: function(n) {
          i.push(n);
        }
      };
    }
    return Ns++, t.then(sc, sc), t;
  }
  function sc() {
    if (--Ns === 0 && ul !== null) {
      xa !== null && (xa.status = "fulfilled");
      var e = ul;
      ul = null, Ta = 0, xa = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function cg(e, t) {
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
  var oc = V.S;
  V.S = function(e, t) {
    Zh = oe(), typeof t == "object" && t !== null && typeof t.then == "function" && ug(e, t), oc !== null && oc(e, t);
  };
  var Kn = B(null);
  function Ps() {
    var e = Kn.current;
    return e !== null ? e : gt.pooledCache;
  }
  function fr(e, t) {
    t === null ? J(Kn, Kn.current) : J(Kn, t.pool);
  }
  function uc() {
    var e = Ps();
    return e === null ? null : { parent: Rt._currentValue, pool: e };
  }
  var wa = Error(l(460)), Ls = Error(l(474)), dr = Error(l(542)), gr = { then: function() {
  } };
  function cc(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function hc(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(ci, ci), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, dc(e), e;
      default:
        if (typeof t.status == "string") t.then(ci, ci);
        else {
          if (e = gt, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, dc(e), e;
        }
        throw $n = t, wa;
    }
  }
  function Jn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? ($n = i, wa) : i;
    }
  }
  var $n = null;
  function fc() {
    if ($n === null) throw Error(l(459));
    var e = $n;
    return $n = null, e;
  }
  function dc(e) {
    if (e === wa || e === dr)
      throw Error(l(483));
  }
  var Sa = null, cl = 0;
  function mr(e) {
    var t = cl;
    return cl += 1, Sa === null && (Sa = []), hc(Sa, e, t);
  }
  function hl(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function pr(e, t) {
    throw t.$$typeof === T ? Error(l(525)) : (e = Object.prototype.toString.call(t), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function gc(e) {
    function t(P, H) {
      if (e) {
        var U = P.deletions;
        U === null ? (P.deletions = [H], P.flags |= 16) : U.push(H);
      }
    }
    function i(P, H) {
      if (!e) return null;
      for (; H !== null; )
        t(P, H), H = H.sibling;
      return null;
    }
    function n(P) {
      for (var H = /* @__PURE__ */ new Map(); P !== null; )
        P.key !== null ? H.set(P.key, P) : H.set(P.index, P), P = P.sibling;
      return H;
    }
    function s(P, H) {
      return P = qi(P, H), P.index = 0, P.sibling = null, P;
    }
    function u(P, H, U) {
      return P.index = U, e ? (U = P.alternate, U !== null ? (U = U.index, U < H ? (P.flags |= 67108866, H) : U) : (P.flags |= 67108866, H)) : (P.flags |= 1048576, H);
    }
    function v(P) {
      return e && P.alternate === null && (P.flags |= 67108866), P;
    }
    function S(P, H, U, ee) {
      return H === null || H.tag !== 6 ? (H = bs(U, P.mode, ee), H.return = P, H) : (H = s(H, U), H.return = P, H);
    }
    function z(P, H, U, ee) {
      var Ae = U.type;
      return Ae === w ? Q(
        P,
        H,
        U.props.children,
        ee,
        U.key
      ) : H !== null && (H.elementType === Ae || typeof Ae == "object" && Ae !== null && Ae.$$typeof === Te && Jn(Ae) === H.type) ? (H = s(H, U.props), hl(H, U), H.return = P, H) : (H = or(
        U.type,
        U.key,
        U.props,
        null,
        P.mode,
        ee
      ), hl(H, U), H.return = P, H);
    }
    function j(P, H, U, ee) {
      return H === null || H.tag !== 4 || H.stateNode.containerInfo !== U.containerInfo || H.stateNode.implementation !== U.implementation ? (H = Rs(U, P.mode, ee), H.return = P, H) : (H = s(H, U.children || []), H.return = P, H);
    }
    function Q(P, H, U, ee, Ae) {
      return H === null || H.tag !== 7 ? (H = Yn(
        U,
        P.mode,
        ee,
        Ae
      ), H.return = P, H) : (H = s(H, U), H.return = P, H);
    }
    function te(P, H, U) {
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return H = bs(
          "" + H,
          P.mode,
          U
        ), H.return = P, H;
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case b:
            return U = or(
              H.type,
              H.key,
              H.props,
              null,
              P.mode,
              U
            ), hl(U, H), U.return = P, U;
          case C:
            return H = Rs(
              H,
              P.mode,
              U
            ), H.return = P, H;
          case Te:
            return H = Jn(H), te(P, H, U);
        }
        if (Ie(H) || ve(H))
          return H = Yn(
            H,
            P.mode,
            U,
            null
          ), H.return = P, H;
        if (typeof H.then == "function")
          return te(P, mr(H), U);
        if (H.$$typeof === Z)
          return te(
            P,
            hr(P, H),
            U
          );
        pr(P, H);
      }
      return null;
    }
    function G(P, H, U, ee) {
      var Ae = H !== null ? H.key : null;
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return Ae !== null ? null : S(P, H, "" + U, ee);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case b:
            return U.key === Ae ? z(P, H, U, ee) : null;
          case C:
            return U.key === Ae ? j(P, H, U, ee) : null;
          case Te:
            return U = Jn(U), G(P, H, U, ee);
        }
        if (Ie(U) || ve(U))
          return Ae !== null ? null : Q(P, H, U, ee, null);
        if (typeof U.then == "function")
          return G(
            P,
            H,
            mr(U),
            ee
          );
        if (U.$$typeof === Z)
          return G(
            P,
            H,
            hr(P, U),
            ee
          );
        pr(P, U);
      }
      return null;
    }
    function X(P, H, U, ee, Ae) {
      if (typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint")
        return P = P.get(U) || null, S(H, P, "" + ee, Ae);
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case b:
            return P = P.get(
              ee.key === null ? U : ee.key
            ) || null, z(H, P, ee, Ae);
          case C:
            return P = P.get(
              ee.key === null ? U : ee.key
            ) || null, j(H, P, ee, Ae);
          case Te:
            return ee = Jn(ee), X(
              P,
              H,
              U,
              ee,
              Ae
            );
        }
        if (Ie(ee) || ve(ee))
          return P = P.get(U) || null, Q(H, P, ee, Ae, null);
        if (typeof ee.then == "function")
          return X(
            P,
            H,
            U,
            mr(ee),
            Ae
          );
        if (ee.$$typeof === Z)
          return X(
            P,
            H,
            U,
            hr(H, ee),
            Ae
          );
        pr(H, ee);
      }
      return null;
    }
    function Se(P, H, U, ee) {
      for (var Ae = null, nt = null, Re = H, Xe = H = 0, $e = null; Re !== null && Xe < U.length; Xe++) {
        Re.index > Xe ? ($e = Re, Re = null) : $e = Re.sibling;
        var at = G(
          P,
          Re,
          U[Xe],
          ee
        );
        if (at === null) {
          Re === null && (Re = $e);
          break;
        }
        e && Re && at.alternate === null && t(P, Re), H = u(at, H, Xe), nt === null ? Ae = at : nt.sibling = at, nt = at, Re = $e;
      }
      if (Xe === U.length)
        return i(P, Re), et && Zi(P, Xe), Ae;
      if (Re === null) {
        for (; Xe < U.length; Xe++)
          Re = te(P, U[Xe], ee), Re !== null && (H = u(
            Re,
            H,
            Xe
          ), nt === null ? Ae = Re : nt.sibling = Re, nt = Re);
        return et && Zi(P, Xe), Ae;
      }
      for (Re = n(Re); Xe < U.length; Xe++)
        $e = X(
          Re,
          P,
          Xe,
          U[Xe],
          ee
        ), $e !== null && (e && $e.alternate !== null && Re.delete(
          $e.key === null ? Xe : $e.key
        ), H = u(
          $e,
          H,
          Xe
        ), nt === null ? Ae = $e : nt.sibling = $e, nt = $e);
      return e && Re.forEach(function(Ln) {
        return t(P, Ln);
      }), et && Zi(P, Xe), Ae;
    }
    function Pe(P, H, U, ee) {
      if (U == null) throw Error(l(151));
      for (var Ae = null, nt = null, Re = H, Xe = H = 0, $e = null, at = U.next(); Re !== null && !at.done; Xe++, at = U.next()) {
        Re.index > Xe ? ($e = Re, Re = null) : $e = Re.sibling;
        var Ln = G(P, Re, at.value, ee);
        if (Ln === null) {
          Re === null && (Re = $e);
          break;
        }
        e && Re && Ln.alternate === null && t(P, Re), H = u(Ln, H, Xe), nt === null ? Ae = Ln : nt.sibling = Ln, nt = Ln, Re = $e;
      }
      if (at.done)
        return i(P, Re), et && Zi(P, Xe), Ae;
      if (Re === null) {
        for (; !at.done; Xe++, at = U.next())
          at = te(P, at.value, ee), at !== null && (H = u(at, H, Xe), nt === null ? Ae = at : nt.sibling = at, nt = at);
        return et && Zi(P, Xe), Ae;
      }
      for (Re = n(Re); !at.done; Xe++, at = U.next())
        at = X(Re, P, Xe, at.value, ee), at !== null && (e && at.alternate !== null && Re.delete(at.key === null ? Xe : at.key), H = u(at, H, Xe), nt === null ? Ae = at : nt.sibling = at, nt = at);
      return e && Re.forEach(function(wm) {
        return t(P, wm);
      }), et && Zi(P, Xe), Ae;
    }
    function dt(P, H, U, ee) {
      if (typeof U == "object" && U !== null && U.type === w && U.key === null && (U = U.props.children), typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case b:
            e: {
              for (var Ae = U.key; H !== null; ) {
                if (H.key === Ae) {
                  if (Ae = U.type, Ae === w) {
                    if (H.tag === 7) {
                      i(
                        P,
                        H.sibling
                      ), ee = s(
                        H,
                        U.props.children
                      ), ee.return = P, P = ee;
                      break e;
                    }
                  } else if (H.elementType === Ae || typeof Ae == "object" && Ae !== null && Ae.$$typeof === Te && Jn(Ae) === H.type) {
                    i(
                      P,
                      H.sibling
                    ), ee = s(H, U.props), hl(ee, U), ee.return = P, P = ee;
                    break e;
                  }
                  i(P, H);
                  break;
                } else t(P, H);
                H = H.sibling;
              }
              U.type === w ? (ee = Yn(
                U.props.children,
                P.mode,
                ee,
                U.key
              ), ee.return = P, P = ee) : (ee = or(
                U.type,
                U.key,
                U.props,
                null,
                P.mode,
                ee
              ), hl(ee, U), ee.return = P, P = ee);
            }
            return v(P);
          case C:
            e: {
              for (Ae = U.key; H !== null; ) {
                if (H.key === Ae)
                  if (H.tag === 4 && H.stateNode.containerInfo === U.containerInfo && H.stateNode.implementation === U.implementation) {
                    i(
                      P,
                      H.sibling
                    ), ee = s(H, U.children || []), ee.return = P, P = ee;
                    break e;
                  } else {
                    i(P, H);
                    break;
                  }
                else t(P, H);
                H = H.sibling;
              }
              ee = Rs(U, P.mode, ee), ee.return = P, P = ee;
            }
            return v(P);
          case Te:
            return U = Jn(U), dt(
              P,
              H,
              U,
              ee
            );
        }
        if (Ie(U))
          return Se(
            P,
            H,
            U,
            ee
          );
        if (ve(U)) {
          if (Ae = ve(U), typeof Ae != "function") throw Error(l(150));
          return U = Ae.call(U), Pe(
            P,
            H,
            U,
            ee
          );
        }
        if (typeof U.then == "function")
          return dt(
            P,
            H,
            mr(U),
            ee
          );
        if (U.$$typeof === Z)
          return dt(
            P,
            H,
            hr(P, U),
            ee
          );
        pr(P, U);
      }
      return typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint" ? (U = "" + U, H !== null && H.tag === 6 ? (i(P, H.sibling), ee = s(H, U), ee.return = P, P = ee) : (i(P, H), ee = bs(U, P.mode, ee), ee.return = P, P = ee), v(P)) : i(P, H);
    }
    return function(P, H, U, ee) {
      try {
        cl = 0;
        var Ae = dt(
          P,
          H,
          U,
          ee
        );
        return Sa = null, Ae;
      } catch (Re) {
        if (Re === wa || Re === dr) throw Re;
        var nt = ni(29, Re, null, P.mode);
        return nt.lanes = ee, nt.return = P, nt;
      }
    };
  }
  var ea = gc(!0), mc = gc(!1), xn = !1;
  function Us(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function js(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function wn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Sn(e, t, i) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (st & 2) !== 0) {
      var s = n.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), n.pending = t, t = sr(e), Ju(e, null, i), t;
    }
    return rr(e, n, t, i), sr(e);
  }
  function fl(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var n = t.lanes;
      n &= e.pendingLanes, i |= n, t.lanes = i, Ga(e, i);
    }
  }
  function Fs(e, t) {
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
  var Gs = !1;
  function dl() {
    if (Gs) {
      var e = xa;
      if (e !== null) throw e;
    }
  }
  function gl(e, t, i, n) {
    Gs = !1;
    var s = e.updateQueue;
    xn = !1;
    var u = s.firstBaseUpdate, v = s.lastBaseUpdate, S = s.shared.pending;
    if (S !== null) {
      s.shared.pending = null;
      var z = S, j = z.next;
      z.next = null, v === null ? u = j : v.next = j, v = z;
      var Q = e.alternate;
      Q !== null && (Q = Q.updateQueue, S = Q.lastBaseUpdate, S !== v && (S === null ? Q.firstBaseUpdate = j : S.next = j, Q.lastBaseUpdate = z));
    }
    if (u !== null) {
      var te = s.baseState;
      v = 0, Q = j = z = null, S = u;
      do {
        var G = S.lane & -536870913, X = G !== S.lane;
        if (X ? (Je & G) === G : (n & G) === G) {
          G !== 0 && G === Ta && (Gs = !0), Q !== null && (Q = Q.next = {
            lane: 0,
            tag: S.tag,
            payload: S.payload,
            callback: null,
            next: null
          });
          e: {
            var Se = e, Pe = S;
            G = t;
            var dt = i;
            switch (Pe.tag) {
              case 1:
                if (Se = Pe.payload, typeof Se == "function") {
                  te = Se.call(dt, te, G);
                  break e;
                }
                te = Se;
                break e;
              case 3:
                Se.flags = Se.flags & -65537 | 128;
              case 0:
                if (Se = Pe.payload, G = typeof Se == "function" ? Se.call(dt, te, G) : Se, G == null) break e;
                te = m({}, te, G);
                break e;
              case 2:
                xn = !0;
            }
          }
          G = S.callback, G !== null && (e.flags |= 64, X && (e.flags |= 8192), X = s.callbacks, X === null ? s.callbacks = [G] : X.push(G));
        } else
          X = {
            lane: G,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null
          }, Q === null ? (j = Q = X, z = te) : Q = Q.next = X, v |= G;
        if (S = S.next, S === null) {
          if (S = s.shared.pending, S === null)
            break;
          X = S, S = X.next, X.next = null, s.lastBaseUpdate = X, s.shared.pending = null;
        }
      } while (!0);
      Q === null && (z = te), s.baseState = z, s.firstBaseUpdate = j, s.lastBaseUpdate = Q, u === null && (s.shared.lanes = 0), Cn |= v, e.lanes = v, e.memoizedState = te;
    }
  }
  function pc(e, t) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(t);
  }
  function vc(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        pc(i[e], t);
  }
  var _a = B(null), vr = B(0);
  function yc(e, t) {
    e = nn, J(vr, e), J(_a, t), nn = e | t.baseLanes;
  }
  function ks() {
    J(vr, nn), J(_a, _a.current);
  }
  function Vs() {
    nn = vr.current, I(_a), I(vr);
  }
  var ai = B(null), pi = null;
  function _n(e) {
    var t = e.alternate;
    J(Et, Et.current & 1), J(ai, e), pi === null && (t === null || _a.current !== null || t.memoizedState !== null) && (pi = e);
  }
  function qs(e) {
    J(Et, Et.current), J(ai, e), pi === null && (pi = e);
  }
  function Tc(e) {
    e.tag === 22 ? (J(Et, Et.current), J(ai, e), pi === null && (pi = e)) : En();
  }
  function En() {
    J(Et, Et.current), J(ai, ai.current);
  }
  function li(e) {
    I(ai), pi === e && (pi = null), I(Et);
  }
  var Et = B(0);
  function yr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Ko(i) || Jo(i)))
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
  var Ii = 0, qe = null, ht = null, Ct = null, Tr = !1, Ea = !1, ta = !1, xr = 0, ml = 0, ba = null, hg = 0;
  function St() {
    throw Error(l(321));
  }
  function Zs(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!ii(e[i], t[i])) return !1;
    return !0;
  }
  function Xs(e, t, i, n, s, u) {
    return Ii = u, qe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, V.H = e === null || e.memoizedState === null ? ih : so, ta = !1, u = i(n, s), ta = !1, Ea && (u = wc(
      t,
      i,
      n,
      s
    )), xc(e), u;
  }
  function xc(e) {
    V.H = yl;
    var t = ht !== null && ht.next !== null;
    if (Ii = 0, Ct = ht = qe = null, Tr = !1, ml = 0, ba = null, t) throw Error(l(300));
    e === null || Dt || (e = e.dependencies, e !== null && cr(e) && (Dt = !0));
  }
  function wc(e, t, i, n) {
    qe = e;
    var s = 0;
    do {
      if (Ea && (ba = null), ml = 0, Ea = !1, 25 <= s) throw Error(l(301));
      if (s += 1, Ct = ht = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      V.H = nh, u = t(i, n);
    } while (Ea);
    return u;
  }
  function fg() {
    var e = V.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? pl(t) : t, e = e.useState()[0], (ht !== null ? ht.memoizedState : null) !== e && (qe.flags |= 1024), t;
  }
  function Ys() {
    var e = xr !== 0;
    return xr = 0, e;
  }
  function Is(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function Qs(e) {
    if (Tr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Tr = !1;
    }
    Ii = 0, Ct = ht = qe = null, Ea = !1, ml = xr = 0, ba = null;
  }
  function qt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ct === null ? qe.memoizedState = Ct = e : Ct = Ct.next = e, Ct;
  }
  function bt() {
    if (ht === null) {
      var e = qe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ht.next;
    var t = Ct === null ? qe.memoizedState : Ct.next;
    if (t !== null)
      Ct = t, ht = e;
    else {
      if (e === null)
        throw qe.alternate === null ? Error(l(467)) : Error(l(310));
      ht = e, e = {
        memoizedState: ht.memoizedState,
        baseState: ht.baseState,
        baseQueue: ht.baseQueue,
        queue: ht.queue,
        next: null
      }, Ct === null ? qe.memoizedState = Ct = e : Ct = Ct.next = e;
    }
    return Ct;
  }
  function wr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function pl(e) {
    var t = ml;
    return ml += 1, ba === null && (ba = []), e = hc(ba, e, t), t = qe, (Ct === null ? t.memoizedState : Ct.next) === null && (t = t.alternate, V.H = t === null || t.memoizedState === null ? ih : so), e;
  }
  function Sr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return pl(e);
      if (e.$$typeof === Z) return Lt(e);
    }
    throw Error(l(438, String(e)));
  }
  function Ws(e) {
    var t = null, i = qe.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var n = qe.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (t = {
        data: n.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = wr(), qe.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), n = 0; n < e; n++)
        i[n] = ke;
    return t.index++, i;
  }
  function Qi(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function _r(e) {
    var t = bt();
    return Ks(t, ht, e);
  }
  function Ks(e, t, i) {
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
      var S = v = null, z = null, j = t, Q = !1;
      do {
        var te = j.lane & -536870913;
        if (te !== j.lane ? (Je & te) === te : (Ii & te) === te) {
          var G = j.revertLane;
          if (G === 0)
            z !== null && (z = z.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            }), te === Ta && (Q = !0);
          else if ((Ii & G) === G) {
            j = j.next, G === Ta && (Q = !0);
            continue;
          } else
            te = {
              lane: 0,
              revertLane: j.revertLane,
              gesture: null,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            }, z === null ? (S = z = te, v = u) : z = z.next = te, qe.lanes |= G, Cn |= G;
          te = j.action, ta && i(u, te), u = j.hasEagerState ? j.eagerState : i(u, te);
        } else
          G = {
            lane: te,
            revertLane: j.revertLane,
            gesture: j.gesture,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null
          }, z === null ? (S = z = G, v = u) : z = z.next = G, qe.lanes |= te, Cn |= te;
        j = j.next;
      } while (j !== null && j !== t);
      if (z === null ? v = u : z.next = S, !ii(u, e.memoizedState) && (Dt = !0, Q && (i = xa, i !== null)))
        throw i;
      e.memoizedState = u, e.baseState = v, e.baseQueue = z, n.lastRenderedState = u;
    }
    return s === null && (n.lanes = 0), [e.memoizedState, n.dispatch];
  }
  function Js(e) {
    var t = bt(), i = t.queue;
    if (i === null) throw Error(l(311));
    i.lastRenderedReducer = e;
    var n = i.dispatch, s = i.pending, u = t.memoizedState;
    if (s !== null) {
      i.pending = null;
      var v = s = s.next;
      do
        u = e(u, v.action), v = v.next;
      while (v !== s);
      ii(u, t.memoizedState) || (Dt = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), i.lastRenderedState = u;
    }
    return [u, n];
  }
  function Sc(e, t, i) {
    var n = qe, s = bt(), u = et;
    if (u) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = t();
    var v = !ii(
      (ht || s).memoizedState,
      i
    );
    if (v && (s.memoizedState = i, Dt = !0), s = s.queue, to(bc.bind(null, n, s, e), [
      e
    ]), s.getSnapshot !== t || v || Ct !== null && Ct.memoizedState.tag & 1) {
      if (n.flags |= 2048, Ra(
        9,
        { destroy: void 0 },
        Ec.bind(
          null,
          n,
          s,
          i,
          t
        ),
        null
      ), gt === null) throw Error(l(349));
      u || (Ii & 127) !== 0 || _c(n, t, i);
    }
    return i;
  }
  function _c(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = qe.updateQueue, t === null ? (t = wr(), qe.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function Ec(e, t, i, n) {
    t.value = i, t.getSnapshot = n, Rc(t) && Cc(e);
  }
  function bc(e, t, i) {
    return i(function() {
      Rc(t) && Cc(e);
    });
  }
  function Rc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !ii(e, i);
    } catch {
      return !0;
    }
  }
  function Cc(e) {
    var t = Xn(e, 2);
    t !== null && $t(t, e, 2);
  }
  function $s(e) {
    var t = qt();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), ta) {
        me(!0);
        try {
          i();
        } finally {
          me(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Qi,
      lastRenderedState: e
    }, t;
  }
  function Dc(e, t, i, n) {
    return e.baseState = i, Ks(
      e,
      ht,
      typeof n == "function" ? n : Qi
    );
  }
  function dg(e, t, i, n, s) {
    if (Rr(e)) throw Error(l(485));
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
      V.T !== null ? i(!0) : u.isTransition = !1, n(u), i = t.pending, i === null ? (u.next = t.pending = u, Oc(t, u)) : (u.next = i.next, t.pending = i.next = u);
    }
  }
  function Oc(e, t) {
    var i = t.action, n = t.payload, s = e.state;
    if (t.isTransition) {
      var u = V.T, v = {};
      V.T = v;
      try {
        var S = i(s, n), z = V.S;
        z !== null && z(v, S), Ac(e, t, S);
      } catch (j) {
        eo(e, t, j);
      } finally {
        u !== null && v.types !== null && (u.types = v.types), V.T = u;
      }
    } else
      try {
        u = i(s, n), Ac(e, t, u);
      } catch (j) {
        eo(e, t, j);
      }
  }
  function Ac(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(n) {
        zc(e, t, n);
      },
      function(n) {
        return eo(e, t, n);
      }
    ) : zc(e, t, i);
  }
  function zc(e, t, i) {
    t.status = "fulfilled", t.value = i, Mc(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, Oc(e, i)));
  }
  function eo(e, t, i) {
    var n = e.pending;
    if (e.pending = null, n !== null) {
      n = n.next;
      do
        t.status = "rejected", t.reason = i, Mc(t), t = t.next;
      while (t !== n);
    }
    e.action = null;
  }
  function Mc(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Bc(e, t) {
    return t;
  }
  function Hc(e, t) {
    if (et) {
      var i = gt.formState;
      if (i !== null) {
        e: {
          var n = qe;
          if (et) {
            if (pt) {
              t: {
                for (var s = pt, u = mi; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break t;
                  }
                  if (s = vi(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                u = s.data, s = u === "F!" || u === "F" ? s : null;
              }
              if (s) {
                pt = vi(
                  s.nextSibling
                ), n = s.data === "F!";
                break e;
              }
            }
            yn(n);
          }
          n = !1;
        }
        n && (t = i[0]);
      }
    }
    return i = qt(), i.memoizedState = i.baseState = t, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Bc,
      lastRenderedState: t
    }, i.queue = n, i = $c.bind(
      null,
      qe,
      n
    ), n.dispatch = i, n = $s(!1), u = ro.bind(
      null,
      qe,
      !1,
      n.queue
    ), n = qt(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, n.queue = s, i = dg.bind(
      null,
      qe,
      s,
      u,
      i
    ), s.dispatch = i, n.memoizedState = e, [t, i, !1];
  }
  function Nc(e) {
    var t = bt();
    return Pc(t, ht, e);
  }
  function Pc(e, t, i) {
    if (t = Ks(
      e,
      t,
      Bc
    )[0], e = _r(Qi)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var n = pl(t);
      } catch (v) {
        throw v === wa ? dr : v;
      }
    else n = t;
    t = bt();
    var s = t.queue, u = s.dispatch;
    return i !== t.memoizedState && (qe.flags |= 2048, Ra(
      9,
      { destroy: void 0 },
      gg.bind(null, s, i),
      null
    )), [n, u, e];
  }
  function gg(e, t) {
    e.action = t;
  }
  function Lc(e) {
    var t = bt(), i = ht;
    if (i !== null)
      return Pc(t, i, e);
    bt(), t = t.memoizedState, i = bt();
    var n = i.queue.dispatch;
    return i.memoizedState = e, [t, n, !1];
  }
  function Ra(e, t, i, n) {
    return e = { tag: e, create: i, deps: n, inst: t, next: null }, t = qe.updateQueue, t === null && (t = wr(), qe.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (n = i.next, i.next = e, e.next = n, t.lastEffect = e), e;
  }
  function Uc() {
    return bt().memoizedState;
  }
  function Er(e, t, i, n) {
    var s = qt();
    qe.flags |= e, s.memoizedState = Ra(
      1 | t,
      { destroy: void 0 },
      i,
      n === void 0 ? null : n
    );
  }
  function br(e, t, i, n) {
    var s = bt();
    n = n === void 0 ? null : n;
    var u = s.memoizedState.inst;
    ht !== null && n !== null && Zs(n, ht.memoizedState.deps) ? s.memoizedState = Ra(t, u, i, n) : (qe.flags |= e, s.memoizedState = Ra(
      1 | t,
      u,
      i,
      n
    ));
  }
  function jc(e, t) {
    Er(8390656, 8, e, t);
  }
  function to(e, t) {
    br(2048, 8, e, t);
  }
  function mg(e) {
    qe.flags |= 4;
    var t = qe.updateQueue;
    if (t === null)
      t = wr(), qe.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function Fc(e) {
    var t = bt().memoizedState;
    return mg({ ref: t, nextImpl: e }), function() {
      if ((st & 2) !== 0) throw Error(l(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Gc(e, t) {
    return br(4, 2, e, t);
  }
  function kc(e, t) {
    return br(4, 4, e, t);
  }
  function Vc(e, t) {
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
  function qc(e, t, i) {
    i = i != null ? i.concat([e]) : null, br(4, 4, Vc.bind(null, t, e), i);
  }
  function io() {
  }
  function Zc(e, t) {
    var i = bt();
    t = t === void 0 ? null : t;
    var n = i.memoizedState;
    return t !== null && Zs(t, n[1]) ? n[0] : (i.memoizedState = [e, t], e);
  }
  function Xc(e, t) {
    var i = bt();
    t = t === void 0 ? null : t;
    var n = i.memoizedState;
    if (t !== null && Zs(t, n[1]))
      return n[0];
    if (n = e(), ta) {
      me(!0);
      try {
        e();
      } finally {
        me(!1);
      }
    }
    return i.memoizedState = [n, t], n;
  }
  function no(e, t, i) {
    return i === void 0 || (Ii & 1073741824) !== 0 && (Je & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = Yh(), qe.lanes |= e, Cn |= e, i);
  }
  function Yc(e, t, i, n) {
    return ii(i, t) ? i : _a.current !== null ? (e = no(e, i, n), ii(e, t) || (Dt = !0), e) : (Ii & 42) === 0 || (Ii & 1073741824) !== 0 && (Je & 261930) === 0 ? (Dt = !0, e.memoizedState = i) : (e = Yh(), qe.lanes |= e, Cn |= e, t);
  }
  function Ic(e, t, i, n, s) {
    var u = ne.p;
    ne.p = u !== 0 && 8 > u ? u : 8;
    var v = V.T, S = {};
    V.T = S, ro(e, !1, t, i);
    try {
      var z = s(), j = V.S;
      if (j !== null && j(S, z), z !== null && typeof z == "object" && typeof z.then == "function") {
        var Q = cg(
          z,
          n
        );
        vl(
          e,
          t,
          Q,
          oi(e)
        );
      } else
        vl(
          e,
          t,
          n,
          oi(e)
        );
    } catch (te) {
      vl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: te },
        oi()
      );
    } finally {
      ne.p = u, v !== null && S.types !== null && (v.types = S.types), V.T = v;
    }
  }
  function pg() {
  }
  function ao(e, t, i, n) {
    if (e.tag !== 5) throw Error(l(476));
    var s = Qc(e).queue;
    Ic(
      e,
      s,
      t,
      ge,
      i === null ? pg : function() {
        return Wc(e), i(n);
      }
    );
  }
  function Qc(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ge,
      baseState: ge,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qi,
        lastRenderedState: ge
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
        lastRenderedReducer: Qi,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Wc(e) {
    var t = Qc(e);
    t.next === null && (t = e.alternate.memoizedState), vl(
      e,
      t.next.queue,
      {},
      oi()
    );
  }
  function lo() {
    return Lt(Hl);
  }
  function Kc() {
    return bt().memoizedState;
  }
  function Jc() {
    return bt().memoizedState;
  }
  function vg(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = oi();
          e = wn(i);
          var n = Sn(t, e, i);
          n !== null && ($t(n, t, i), fl(n, t, i)), t = { cache: Hs() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function yg(e, t, i) {
    var n = oi();
    i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Rr(e) ? eh(t, i) : (i = _s(e, t, i, n), i !== null && ($t(i, e, n), th(i, t, n)));
  }
  function $c(e, t, i) {
    var n = oi();
    vl(e, t, i, n);
  }
  function vl(e, t, i, n) {
    var s = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Rr(e)) eh(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var v = t.lastRenderedState, S = u(v, i);
          if (s.hasEagerState = !0, s.eagerState = S, ii(S, v))
            return rr(e, t, s, 0), gt === null && lr(), !1;
        } catch {
        }
      if (i = _s(e, t, s, n), i !== null)
        return $t(i, e, n), th(i, t, n), !0;
    }
    return !1;
  }
  function ro(e, t, i, n) {
    if (n = {
      lane: 2,
      revertLane: jo(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Rr(e)) {
      if (t) throw Error(l(479));
    } else
      t = _s(
        e,
        i,
        n,
        2
      ), t !== null && $t(t, e, 2);
  }
  function Rr(e) {
    var t = e.alternate;
    return e === qe || t !== null && t === qe;
  }
  function eh(e, t) {
    Ea = Tr = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function th(e, t, i) {
    if ((i & 4194048) !== 0) {
      var n = t.lanes;
      n &= e.pendingLanes, i |= n, t.lanes = i, Ga(e, i);
    }
  }
  var yl = {
    readContext: Lt,
    use: Sr,
    useCallback: St,
    useContext: St,
    useEffect: St,
    useImperativeHandle: St,
    useLayoutEffect: St,
    useInsertionEffect: St,
    useMemo: St,
    useReducer: St,
    useRef: St,
    useState: St,
    useDebugValue: St,
    useDeferredValue: St,
    useTransition: St,
    useSyncExternalStore: St,
    useId: St,
    useHostTransitionStatus: St,
    useFormState: St,
    useActionState: St,
    useOptimistic: St,
    useMemoCache: St,
    useCacheRefresh: St
  };
  yl.useEffectEvent = St;
  var ih = {
    readContext: Lt,
    use: Sr,
    useCallback: function(e, t) {
      return qt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Lt,
    useEffect: jc,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Er(
        4194308,
        4,
        Vc.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return Er(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Er(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = qt();
      t = t === void 0 ? null : t;
      var n = e();
      if (ta) {
        me(!0);
        try {
          e();
        } finally {
          me(!1);
        }
      }
      return i.memoizedState = [n, t], n;
    },
    useReducer: function(e, t, i) {
      var n = qt();
      if (i !== void 0) {
        var s = i(t);
        if (ta) {
          me(!0);
          try {
            i(t);
          } finally {
            me(!1);
          }
        }
      } else s = t;
      return n.memoizedState = n.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, n.queue = e, e = e.dispatch = yg.bind(
        null,
        qe,
        e
      ), [n.memoizedState, e];
    },
    useRef: function(e) {
      var t = qt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = $s(e);
      var t = e.queue, i = $c.bind(null, qe, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: io,
    useDeferredValue: function(e, t) {
      var i = qt();
      return no(i, e, t);
    },
    useTransition: function() {
      var e = $s(!1);
      return e = Ic.bind(
        null,
        qe,
        e.queue,
        !0,
        !1
      ), qt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var n = qe, s = qt();
      if (et) {
        if (i === void 0)
          throw Error(l(407));
        i = i();
      } else {
        if (i = t(), gt === null)
          throw Error(l(349));
        (Je & 127) !== 0 || _c(n, t, i);
      }
      s.memoizedState = i;
      var u = { value: i, getSnapshot: t };
      return s.queue = u, jc(bc.bind(null, n, u, e), [
        e
      ]), n.flags |= 2048, Ra(
        9,
        { destroy: void 0 },
        Ec.bind(
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
      var e = qt(), t = gt.identifierPrefix;
      if (et) {
        var i = Ni, n = Hi;
        i = (n & ~(1 << 32 - Ue(n) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = xr++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = hg++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: lo,
    useFormState: Hc,
    useActionState: Hc,
    useOptimistic: function(e) {
      var t = qt();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = ro.bind(
        null,
        qe,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: Ws,
    useCacheRefresh: function() {
      return qt().memoizedState = vg.bind(
        null,
        qe
      );
    },
    useEffectEvent: function(e) {
      var t = qt(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((st & 2) !== 0)
          throw Error(l(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, so = {
    readContext: Lt,
    use: Sr,
    useCallback: Zc,
    useContext: Lt,
    useEffect: to,
    useImperativeHandle: qc,
    useInsertionEffect: Gc,
    useLayoutEffect: kc,
    useMemo: Xc,
    useReducer: _r,
    useRef: Uc,
    useState: function() {
      return _r(Qi);
    },
    useDebugValue: io,
    useDeferredValue: function(e, t) {
      var i = bt();
      return Yc(
        i,
        ht.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = _r(Qi)[0], t = bt().memoizedState;
      return [
        typeof e == "boolean" ? e : pl(e),
        t
      ];
    },
    useSyncExternalStore: Sc,
    useId: Kc,
    useHostTransitionStatus: lo,
    useFormState: Nc,
    useActionState: Nc,
    useOptimistic: function(e, t) {
      var i = bt();
      return Dc(i, ht, e, t);
    },
    useMemoCache: Ws,
    useCacheRefresh: Jc
  };
  so.useEffectEvent = Fc;
  var nh = {
    readContext: Lt,
    use: Sr,
    useCallback: Zc,
    useContext: Lt,
    useEffect: to,
    useImperativeHandle: qc,
    useInsertionEffect: Gc,
    useLayoutEffect: kc,
    useMemo: Xc,
    useReducer: Js,
    useRef: Uc,
    useState: function() {
      return Js(Qi);
    },
    useDebugValue: io,
    useDeferredValue: function(e, t) {
      var i = bt();
      return ht === null ? no(i, e, t) : Yc(
        i,
        ht.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Js(Qi)[0], t = bt().memoizedState;
      return [
        typeof e == "boolean" ? e : pl(e),
        t
      ];
    },
    useSyncExternalStore: Sc,
    useId: Kc,
    useHostTransitionStatus: lo,
    useFormState: Lc,
    useActionState: Lc,
    useOptimistic: function(e, t) {
      var i = bt();
      return ht !== null ? Dc(i, ht, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Ws,
    useCacheRefresh: Jc
  };
  nh.useEffectEvent = Fc;
  function oo(e, t, i, n) {
    t = e.memoizedState, i = i(n, t), i = i == null ? t : m({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var uo = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var n = oi(), s = wn(n);
      s.payload = t, i != null && (s.callback = i), t = Sn(e, s, n), t !== null && ($t(t, e, n), fl(t, e, n));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var n = oi(), s = wn(n);
      s.tag = 1, s.payload = t, i != null && (s.callback = i), t = Sn(e, s, n), t !== null && ($t(t, e, n), fl(t, e, n));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = oi(), n = wn(i);
      n.tag = 2, t != null && (n.callback = t), t = Sn(e, n, i), t !== null && ($t(t, e, i), fl(t, e, i));
    }
  };
  function ah(e, t, i, n, s, u, v) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, u, v) : t.prototype && t.prototype.isPureReactComponent ? !al(i, n) || !al(s, u) : !0;
  }
  function lh(e, t, i, n) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, n), t.state !== e && uo.enqueueReplaceState(t, t.state, null);
  }
  function ia(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var n in t)
        n !== "ref" && (i[n] = t[n]);
    }
    if (e = e.defaultProps) {
      i === t && (i = m({}, i));
      for (var s in e)
        i[s] === void 0 && (i[s] = e[s]);
    }
    return i;
  }
  function rh(e) {
    ar(e);
  }
  function sh(e) {
    console.error(e);
  }
  function oh(e) {
    ar(e);
  }
  function Cr(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function uh(e, t, i) {
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
  function co(e, t, i) {
    return i = wn(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Cr(e, t);
    }, i;
  }
  function ch(e) {
    return e = wn(e), e.tag = 3, e;
  }
  function hh(e, t, i, n) {
    var s = i.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = n.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        uh(t, i, n);
      };
    }
    var v = i.stateNode;
    v !== null && typeof v.componentDidCatch == "function" && (e.callback = function() {
      uh(t, i, n), typeof s != "function" && (Dn === null ? Dn = /* @__PURE__ */ new Set([this]) : Dn.add(this));
      var S = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: S !== null ? S : ""
      });
    });
  }
  function Tg(e, t, i, n, s) {
    if (i.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (t = i.alternate, t !== null && ya(
        t,
        i,
        s,
        !0
      ), i = ai.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return pi === null ? jr() : i.alternate === null && _t === 0 && (_t = 3), i.flags &= -257, i.flags |= 65536, i.lanes = s, n === gr ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([n]) : t.add(n), Po(e, n, s)), !1;
          case 22:
            return i.flags |= 65536, n === gr ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([n]) : i.add(n)), Po(e, n, s)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return Po(e, n, s), jr(), !1;
    }
    if (et)
      return t = ai.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, n !== Os && (e = Error(l(422), { cause: n }), sl(fi(e, i)))) : (n !== Os && (t = Error(l(423), {
        cause: n
      }), sl(
        fi(t, i)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, n = fi(n, i), s = co(
        e.stateNode,
        n,
        s
      ), Fs(e, s), _t !== 4 && (_t = 2)), !1;
    var u = Error(l(520), { cause: n });
    if (u = fi(u, i), Rl === null ? Rl = [u] : Rl.push(u), _t !== 4 && (_t = 2), t === null) return !0;
    n = fi(n, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = s & -s, i.lanes |= e, e = co(i.stateNode, n, e), Fs(i, e), !1;
        case 1:
          if (t = i.type, u = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Dn === null || !Dn.has(u))))
            return i.flags |= 65536, s &= -s, i.lanes |= s, s = ch(s), hh(
              s,
              e,
              i,
              n
            ), Fs(i, s), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var ho = Error(l(461)), Dt = !1;
  function Ut(e, t, i, n) {
    t.child = e === null ? mc(t, null, i, n) : ea(
      t,
      e.child,
      i,
      n
    );
  }
  function fh(e, t, i, n, s) {
    i = i.render;
    var u = t.ref;
    if ("ref" in n) {
      var v = {};
      for (var S in n)
        S !== "ref" && (v[S] = n[S]);
    } else v = n;
    return Wn(t), n = Xs(
      e,
      t,
      i,
      v,
      u,
      s
    ), S = Ys(), e !== null && !Dt ? (Is(e, t, s), Wi(e, t, s)) : (et && S && Cs(t), t.flags |= 1, Ut(e, t, n, s), t.child);
  }
  function dh(e, t, i, n, s) {
    if (e === null) {
      var u = i.type;
      return typeof u == "function" && !Es(u) && u.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = u, gh(
        e,
        t,
        u,
        n,
        s
      )) : (e = or(
        i.type,
        null,
        n,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !xo(e, s)) {
      var v = u.memoizedProps;
      if (i = i.compare, i = i !== null ? i : al, i(v, n) && e.ref === t.ref)
        return Wi(e, t, s);
    }
    return t.flags |= 1, e = qi(u, n), e.ref = t.ref, e.return = t, t.child = e;
  }
  function gh(e, t, i, n, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (al(u, n) && e.ref === t.ref)
        if (Dt = !1, t.pendingProps = n = u, xo(e, s))
          (e.flags & 131072) !== 0 && (Dt = !0);
        else
          return t.lanes = e.lanes, Wi(e, t, s);
    }
    return fo(
      e,
      t,
      i,
      n,
      s
    );
  }
  function mh(e, t, i, n) {
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
        return ph(
          e,
          t,
          u,
          i,
          n
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && fr(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? yc(t, u) : ks(), Tc(t);
      else
        return n = t.lanes = 536870912, ph(
          e,
          t,
          u !== null ? u.baseLanes | i : i,
          i,
          n
        );
    } else
      u !== null ? (fr(t, u.cachePool), yc(t, u), En(), t.memoizedState = null) : (e !== null && fr(t, null), ks(), En());
    return Ut(e, t, s, i), t.child;
  }
  function Tl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function ph(e, t, i, n, s) {
    var u = Ps();
    return u = u === null ? null : { parent: Rt._currentValue, pool: u }, t.memoizedState = {
      baseLanes: i,
      cachePool: u
    }, e !== null && fr(t, null), ks(), Tc(t), e !== null && ya(e, t, n, !0), t.childLanes = s, null;
  }
  function Dr(e, t) {
    return t = Ar(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function vh(e, t, i) {
    return ea(t, e.child, null, i), e = Dr(t, t.pendingProps), e.flags |= 2, li(t), t.memoizedState = null, e;
  }
  function xg(e, t, i) {
    var n = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (et) {
        if (n.mode === "hidden")
          return e = Dr(t, n), t.lanes = 536870912, Tl(null, e);
        if (qs(t), (e = pt) ? (e = Af(
          e,
          mi
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: pn !== null ? { id: Hi, overflow: Ni } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = ec(e), i.return = t, t.child = i, Pt = t, pt = null)) : e = null, e === null) throw yn(t);
        return t.lanes = 536870912, null;
      }
      return Dr(t, n);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var v = u.dehydrated;
      if (qs(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = vh(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(l(558));
      else if (Dt || ya(e, t, i, !1), s = (i & e.childLanes) !== 0, Dt || s) {
        if (n = gt, n !== null && (v = ka(n, i), v !== 0 && v !== u.retryLane))
          throw u.retryLane = v, Xn(e, v), $t(n, e, v), ho;
        jr(), t = vh(
          e,
          t,
          i
        );
      } else
        e = u.treeContext, pt = vi(v.nextSibling), Pt = t, et = !0, vn = null, mi = !1, e !== null && nc(t, e), t = Dr(t, n), t.flags |= 4096;
      return t;
    }
    return e = qi(e.child, {
      mode: n.mode,
      children: n.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Or(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function fo(e, t, i, n, s) {
    return Wn(t), i = Xs(
      e,
      t,
      i,
      n,
      void 0,
      s
    ), n = Ys(), e !== null && !Dt ? (Is(e, t, s), Wi(e, t, s)) : (et && n && Cs(t), t.flags |= 1, Ut(e, t, i, s), t.child);
  }
  function yh(e, t, i, n, s, u) {
    return Wn(t), t.updateQueue = null, i = wc(
      t,
      n,
      i,
      s
    ), xc(e), n = Ys(), e !== null && !Dt ? (Is(e, t, u), Wi(e, t, u)) : (et && n && Cs(t), t.flags |= 1, Ut(e, t, i, u), t.child);
  }
  function Th(e, t, i, n, s) {
    if (Wn(t), t.stateNode === null) {
      var u = ga, v = i.contextType;
      typeof v == "object" && v !== null && (u = Lt(v)), u = new i(n, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = uo, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = n, u.state = t.memoizedState, u.refs = {}, Us(t), v = i.contextType, u.context = typeof v == "object" && v !== null ? Lt(v) : ga, u.state = t.memoizedState, v = i.getDerivedStateFromProps, typeof v == "function" && (oo(
        t,
        i,
        v,
        n
      ), u.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (v = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), v !== u.state && uo.enqueueReplaceState(u, u.state, null), gl(t, n, u, s), dl(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), n = !0;
    } else if (e === null) {
      u = t.stateNode;
      var S = t.memoizedProps, z = ia(i, S);
      u.props = z;
      var j = u.context, Q = i.contextType;
      v = ga, typeof Q == "object" && Q !== null && (v = Lt(Q));
      var te = i.getDerivedStateFromProps;
      Q = typeof te == "function" || typeof u.getSnapshotBeforeUpdate == "function", S = t.pendingProps !== S, Q || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (S || j !== v) && lh(
        t,
        u,
        n,
        v
      ), xn = !1;
      var G = t.memoizedState;
      u.state = G, gl(t, n, u, s), dl(), j = t.memoizedState, S || G !== j || xn ? (typeof te == "function" && (oo(
        t,
        i,
        te,
        n
      ), j = t.memoizedState), (z = xn || ah(
        t,
        i,
        z,
        n,
        G,
        j,
        v
      )) ? (Q || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = j), u.props = n, u.state = j, u.context = v, n = z) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), n = !1);
    } else {
      u = t.stateNode, js(e, t), v = t.memoizedProps, Q = ia(i, v), u.props = Q, te = t.pendingProps, G = u.context, j = i.contextType, z = ga, typeof j == "object" && j !== null && (z = Lt(j)), S = i.getDerivedStateFromProps, (j = typeof S == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (v !== te || G !== z) && lh(
        t,
        u,
        n,
        z
      ), xn = !1, G = t.memoizedState, u.state = G, gl(t, n, u, s), dl();
      var X = t.memoizedState;
      v !== te || G !== X || xn || e !== null && e.dependencies !== null && cr(e.dependencies) ? (typeof S == "function" && (oo(
        t,
        i,
        S,
        n
      ), X = t.memoizedState), (Q = xn || ah(
        t,
        i,
        Q,
        n,
        G,
        X,
        z
      ) || e !== null && e.dependencies !== null && cr(e.dependencies)) ? (j || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, X, z), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        X,
        z
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || v === e.memoizedProps && G === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && G === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = X), u.props = n, u.state = X, u.context = z, n = Q) : (typeof u.componentDidUpdate != "function" || v === e.memoizedProps && G === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && G === e.memoizedState || (t.flags |= 1024), n = !1);
    }
    return u = n, Or(e, t), n = (t.flags & 128) !== 0, u || n ? (u = t.stateNode, i = n && typeof i.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && n ? (t.child = ea(
      t,
      e.child,
      null,
      s
    ), t.child = ea(
      t,
      null,
      i,
      s
    )) : Ut(e, t, i, s), t.memoizedState = u.state, e = t.child) : e = Wi(
      e,
      t,
      s
    ), e;
  }
  function xh(e, t, i, n) {
    return In(), t.flags |= 256, Ut(e, t, i, n), t.child;
  }
  var go = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mo(e) {
    return { baseLanes: e, cachePool: uc() };
  }
  function po(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= si), e;
  }
  function wh(e, t, i) {
    var n = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, v;
    if ((v = u) || (v = e !== null && e.memoizedState === null ? !1 : (Et.current & 2) !== 0), v && (s = !0, t.flags &= -129), v = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (et) {
        if (s ? _n(t) : En(), (e = pt) ? (e = Af(
          e,
          mi
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: pn !== null ? { id: Hi, overflow: Ni } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = ec(e), i.return = t, t.child = i, Pt = t, pt = null)) : e = null, e === null) throw yn(t);
        return Jo(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var S = n.children;
      return n = n.fallback, s ? (En(), s = t.mode, S = Ar(
        { mode: "hidden", children: S },
        s
      ), n = Yn(
        n,
        s,
        i,
        null
      ), S.return = t, n.return = t, S.sibling = n, t.child = S, n = t.child, n.memoizedState = mo(i), n.childLanes = po(
        e,
        v,
        i
      ), t.memoizedState = go, Tl(null, n)) : (_n(t), vo(t, S));
    }
    var z = e.memoizedState;
    if (z !== null && (S = z.dehydrated, S !== null)) {
      if (u)
        t.flags & 256 ? (_n(t), t.flags &= -257, t = yo(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (En(), t.child = e.child, t.flags |= 128, t = null) : (En(), S = n.fallback, s = t.mode, n = Ar(
          { mode: "visible", children: n.children },
          s
        ), S = Yn(
          S,
          s,
          i,
          null
        ), S.flags |= 2, n.return = t, S.return = t, n.sibling = S, t.child = n, ea(
          t,
          e.child,
          null,
          i
        ), n = t.child, n.memoizedState = mo(i), n.childLanes = po(
          e,
          v,
          i
        ), t.memoizedState = go, t = Tl(null, n));
      else if (_n(t), Jo(S)) {
        if (v = S.nextSibling && S.nextSibling.dataset, v) var j = v.dgst;
        v = j, n = Error(l(419)), n.stack = "", n.digest = v, sl({ value: n, source: null, stack: null }), t = yo(
          e,
          t,
          i
        );
      } else if (Dt || ya(e, t, i, !1), v = (i & e.childLanes) !== 0, Dt || v) {
        if (v = gt, v !== null && (n = ka(v, i), n !== 0 && n !== z.retryLane))
          throw z.retryLane = n, Xn(e, n), $t(v, e, n), ho;
        Ko(S) || jr(), t = yo(
          e,
          t,
          i
        );
      } else
        Ko(S) ? (t.flags |= 192, t.child = e.child, t = null) : (e = z.treeContext, pt = vi(
          S.nextSibling
        ), Pt = t, et = !0, vn = null, mi = !1, e !== null && nc(t, e), t = vo(
          t,
          n.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (En(), S = n.fallback, s = t.mode, z = e.child, j = z.sibling, n = qi(z, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = z.subtreeFlags & 65011712, j !== null ? S = qi(
      j,
      S
    ) : (S = Yn(
      S,
      s,
      i,
      null
    ), S.flags |= 2), S.return = t, n.return = t, n.sibling = S, t.child = n, Tl(null, n), n = t.child, S = e.child.memoizedState, S === null ? S = mo(i) : (s = S.cachePool, s !== null ? (z = Rt._currentValue, s = s.parent !== z ? { parent: z, pool: z } : s) : s = uc(), S = {
      baseLanes: S.baseLanes | i,
      cachePool: s
    }), n.memoizedState = S, n.childLanes = po(
      e,
      v,
      i
    ), t.memoizedState = go, Tl(e.child, n)) : (_n(t), i = e.child, e = i.sibling, i = qi(i, {
      mode: "visible",
      children: n.children
    }), i.return = t, i.sibling = null, e !== null && (v = t.deletions, v === null ? (t.deletions = [e], t.flags |= 16) : v.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function vo(e, t) {
    return t = Ar(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ar(e, t) {
    return e = ni(22, e, null, t), e.lanes = 0, e;
  }
  function yo(e, t, i) {
    return ea(t, e.child, null, i), e = vo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Sh(e, t, i) {
    e.lanes |= t;
    var n = e.alternate;
    n !== null && (n.lanes |= t), Ms(e.return, t, i);
  }
  function To(e, t, i, n, s, u) {
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
  function _h(e, t, i) {
    var n = t.pendingProps, s = n.revealOrder, u = n.tail;
    n = n.children;
    var v = Et.current, S = (v & 2) !== 0;
    if (S ? (v = v & 1 | 2, t.flags |= 128) : v &= 1, J(Et, v), Ut(e, t, n, i), n = et ? rl : 0, !S && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Sh(e, i, t);
        else if (e.tag === 19)
          Sh(e, i, t);
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
          e = i.alternate, e !== null && yr(e) === null && (s = i), i = i.sibling;
        i = s, i === null ? (s = t.child, t.child = null) : (s = i.sibling, i.sibling = null), To(
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
          if (e = s.alternate, e !== null && yr(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = i, i = s, s = e;
        }
        To(
          t,
          !0,
          i,
          null,
          u,
          n
        );
        break;
      case "together":
        To(
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
  function Wi(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), Cn |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (ya(
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
      for (e = t.child, i = qi(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = qi(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function xo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && cr(e)));
  }
  function wg(e, t, i) {
    switch (t.tag) {
      case 3:
        lt(t, t.stateNode.containerInfo), Tn(t, Rt, e.memoizedState.cache), In();
        break;
      case 27:
      case 5:
        re(t);
        break;
      case 4:
        lt(t, t.stateNode.containerInfo);
        break;
      case 10:
        Tn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, qs(t), null;
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (_n(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? wh(e, t, i) : (_n(t), e = Wi(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        _n(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (n = (i & t.childLanes) !== 0, n || (ya(
          e,
          t,
          i,
          !1
        ), n = (i & t.childLanes) !== 0), s) {
          if (n)
            return _h(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), J(Et, Et.current), n) break;
        return null;
      case 22:
        return t.lanes = 0, mh(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        Tn(t, Rt, e.memoizedState.cache);
    }
    return Wi(e, t, i);
  }
  function Eh(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Dt = !0;
      else {
        if (!xo(e, i) && (t.flags & 128) === 0)
          return Dt = !1, wg(
            e,
            t,
            i
          );
        Dt = (e.flags & 131072) !== 0;
      }
    else
      Dt = !1, et && (t.flags & 1048576) !== 0 && ic(t, rl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (e = Jn(t.elementType), t.type = e, typeof e == "function")
            Es(e) ? (n = ia(e, n), t.tag = 1, t = Th(
              null,
              t,
              e,
              n,
              i
            )) : (t.tag = 0, t = fo(
              null,
              t,
              e,
              n,
              i
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === ie) {
                t.tag = 11, t = fh(
                  null,
                  t,
                  e,
                  n,
                  i
                );
                break e;
              } else if (s === ue) {
                t.tag = 14, t = dh(
                  null,
                  t,
                  e,
                  n,
                  i
                );
                break e;
              }
            }
            throw t = Ke(e) || e, Error(l(306, t, ""));
          }
        }
        return t;
      case 0:
        return fo(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return n = t.type, s = ia(
          n,
          t.pendingProps
        ), Th(
          e,
          t,
          n,
          s,
          i
        );
      case 3:
        e: {
          if (lt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          n = t.pendingProps;
          var u = t.memoizedState;
          s = u.element, js(e, t), gl(t, n, null, i);
          var v = t.memoizedState;
          if (n = v.cache, Tn(t, Rt, n), n !== u.cache && Bs(
            t,
            [Rt],
            i,
            !0
          ), dl(), n = v.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: v.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = xh(
                e,
                t,
                n,
                i
              );
              break e;
            } else if (n !== s) {
              s = fi(
                Error(l(424)),
                t
              ), sl(s), t = xh(
                e,
                t,
                n,
                i
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, pt = vi(e.firstChild), Pt = t, et = !0, vn = null, mi = !0, i = mc(
                t,
                null,
                n,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
          else {
            if (In(), n === s) {
              t = Wi(
                e,
                t,
                i
              );
              break e;
            }
            Ut(e, t, n, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Or(e, t), e === null ? (i = Pf(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : et || (i = t.type, e = t.pendingProps, n = Xr(
          Be.current
        ).createElement(i), n[yt] = t, n[Mt] = e, jt(n, i, e), xt(n), t.stateNode = n) : t.memoizedState = Pf(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return re(t), e === null && et && (n = t.stateNode = Bf(
          t.type,
          t.pendingProps,
          Be.current
        ), Pt = t, mi = !0, s = pt, Mn(t.type) ? ($o = s, pt = vi(n.firstChild)) : pt = s), Ut(
          e,
          t,
          t.pendingProps.children,
          i
        ), Or(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && et && ((s = n = pt) && (n = Kg(
          n,
          t.type,
          t.pendingProps,
          mi
        ), n !== null ? (t.stateNode = n, Pt = t, pt = vi(n.firstChild), mi = !1, s = !0) : s = !1), s || yn(t)), re(t), s = t.type, u = t.pendingProps, v = e !== null ? e.memoizedProps : null, n = u.children, Io(s, u) ? n = null : v !== null && Io(s, v) && (t.flags |= 32), t.memoizedState !== null && (s = Xs(
          e,
          t,
          fg,
          null,
          null,
          i
        ), Hl._currentValue = s), Or(e, t), Ut(e, t, n, i), t.child;
      case 6:
        return e === null && et && ((e = i = pt) && (i = Jg(
          i,
          t.pendingProps,
          mi
        ), i !== null ? (t.stateNode = i, Pt = t, pt = null, e = !0) : e = !1), e || yn(t)), null;
      case 13:
        return wh(e, t, i);
      case 4:
        return lt(
          t,
          t.stateNode.containerInfo
        ), n = t.pendingProps, e === null ? t.child = ea(
          t,
          null,
          n,
          i
        ) : Ut(e, t, n, i), t.child;
      case 11:
        return fh(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return Ut(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return Ut(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return Ut(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return n = t.pendingProps, Tn(t, t.type, n.value), Ut(e, t, n.children, i), t.child;
      case 9:
        return s = t.type._context, n = t.pendingProps.children, Wn(t), s = Lt(s), n = n(s), t.flags |= 1, Ut(e, t, n, i), t.child;
      case 14:
        return dh(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return gh(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return _h(e, t, i);
      case 31:
        return xg(e, t, i);
      case 22:
        return mh(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return Wn(t), n = Lt(Rt), e === null ? (s = Ps(), s === null && (s = gt, u = Hs(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= i), s = u), t.memoizedState = { parent: n, cache: s }, Us(t), Tn(t, Rt, s)) : ((e.lanes & i) !== 0 && (js(e, t), gl(t, null, null, i), dl()), s = e.memoizedState, u = t.memoizedState, s.parent !== n ? (s = { parent: n, cache: n }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), Tn(t, Rt, n)) : (n = u.cache, Tn(t, Rt, n), n !== s.cache && Bs(
          t,
          [Rt],
          i,
          !0
        ))), Ut(
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
  function Ki(e) {
    e.flags |= 4;
  }
  function wo(e, t, i, n, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Kh()) e.flags |= 8192;
        else
          throw $n = gr, Ls;
    } else e.flags &= -16777217;
  }
  function bh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Gf(t))
      if (Kh()) e.flags |= 8192;
      else
        throw $n = gr, Ls;
  }
  function zr(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? rn() : 536870912, e.lanes |= t, Aa |= t);
  }
  function xl(e, t) {
    if (!et)
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
  function vt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, n = 0;
    if (t)
      for (var s = e.child; s !== null; )
        i |= s.lanes | s.childLanes, n |= s.subtreeFlags & 65011712, n |= s.flags & 65011712, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        i |= s.lanes | s.childLanes, n |= s.subtreeFlags, n |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= n, e.childLanes = i, t;
  }
  function Sg(e, t, i) {
    var n = t.pendingProps;
    switch (Ds(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return vt(t), null;
      case 1:
        return vt(t), null;
      case 3:
        return i = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Yi(Rt), rt(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (va(t) ? Ki(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, As())), vt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Ki(t), u !== null ? (vt(t), bh(t, u)) : (vt(t), wo(
          t,
          s,
          null,
          n,
          i
        ))) : u ? u !== e.memoizedState ? (Ki(t), vt(t), bh(t, u)) : (vt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && Ki(t), vt(t), wo(
          t,
          s,
          e,
          n,
          i
        )), null;
      case 27:
        if (be(t), i = Be.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== n && Ki(t);
        else {
          if (!n) {
            if (t.stateNode === null)
              throw Error(l(166));
            return vt(t), null;
          }
          e = ce.current, va(t) ? ac(t) : (e = Bf(s, n, i), t.stateNode = e, Ki(t));
        }
        return vt(t), null;
      case 5:
        if (be(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== n && Ki(t);
        else {
          if (!n) {
            if (t.stateNode === null)
              throw Error(l(166));
            return vt(t), null;
          }
          if (u = ce.current, va(t))
            ac(t);
          else {
            var v = Xr(
              Be.current
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
            u[yt] = t, u[Mt] = n;
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
            e: switch (jt(u, s, n), s) {
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
            n && Ki(t);
          }
        }
        return vt(t), wo(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== n && Ki(t);
        else {
          if (typeof n != "string" && t.stateNode === null)
            throw Error(l(166));
          if (e = Be.current, va(t)) {
            if (e = t.stateNode, i = t.memoizedProps, n = null, s = Pt, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  n = s.memoizedProps;
              }
            e[yt] = t, e = !!(e.nodeValue === i || n !== null && n.suppressHydrationWarning === !0 || Sf(e.nodeValue, i)), e || yn(t, !0);
          } else
            e = Xr(e).createTextNode(
              n
            ), e[yt] = t, t.stateNode = e;
        }
        return vt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (n = va(t), i !== null) {
            if (e === null) {
              if (!n) throw Error(l(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[yt] = t;
            } else
              In(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            vt(t), e = !1;
          } else
            i = As(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (li(t), t) : (li(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(l(558));
        }
        return vt(t), null;
      case 13:
        if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = va(t), n !== null && n.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(l(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(l(317));
              s[yt] = t;
            } else
              In(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            vt(t), s = !1;
          } else
            s = As(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (li(t), t) : (li(t), null);
        }
        return li(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = n !== null, e = e !== null && e.memoizedState !== null, i && (n = t.child, s = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (s = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== s && (n.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), zr(t, t.updateQueue), vt(t), null);
      case 4:
        return rt(), e === null && Vo(t.stateNode.containerInfo), vt(t), null;
      case 10:
        return Yi(t.type), vt(t), null;
      case 19:
        if (I(Et), n = t.memoizedState, n === null) return vt(t), null;
        if (s = (t.flags & 128) !== 0, u = n.rendering, u === null)
          if (s) xl(n, !1);
          else {
            if (_t !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = yr(e), u !== null) {
                  for (t.flags |= 128, xl(n, !1), e = u.updateQueue, t.updateQueue = e, zr(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    $u(i, e), i = i.sibling;
                  return J(
                    Et,
                    Et.current & 1 | 2
                  ), et && Zi(t, n.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            n.tail !== null && oe() > Pr && (t.flags |= 128, s = !0, xl(n, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = yr(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, zr(t, e), xl(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !et)
                return vt(t), null;
            } else
              2 * oe() - n.renderingStartTime > Pr && i !== 536870912 && (t.flags |= 128, s = !0, xl(n, !1), t.lanes = 4194304);
          n.isBackwards ? (u.sibling = t.child, t.child = u) : (e = n.last, e !== null ? e.sibling = u : t.child = u, n.last = u);
        }
        return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = oe(), e.sibling = null, i = Et.current, J(
          Et,
          s ? i & 1 | 2 : i & 1
        ), et && Zi(t, n.treeForkCount), e) : (vt(t), null);
      case 22:
      case 23:
        return li(t), Vs(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (vt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : vt(t), i = t.updateQueue, i !== null && zr(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== i && (t.flags |= 2048), e !== null && I(Kn), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), Yi(Rt), vt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function _g(e, t) {
    switch (Ds(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Yi(Rt), rt(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return be(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (li(t), t.alternate === null)
            throw Error(l(340));
          In();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (li(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(l(340));
          In();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return I(Et), null;
      case 4:
        return rt(), null;
      case 10:
        return Yi(t.type), null;
      case 22:
      case 23:
        return li(t), Vs(), e !== null && I(Kn), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Yi(Rt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Rh(e, t) {
    switch (Ds(t), t.tag) {
      case 3:
        Yi(Rt), rt();
        break;
      case 26:
      case 27:
      case 5:
        be(t);
        break;
      case 4:
        rt();
        break;
      case 31:
        t.memoizedState !== null && li(t);
        break;
      case 13:
        li(t);
        break;
      case 19:
        I(Et);
        break;
      case 10:
        Yi(t.type);
        break;
      case 22:
      case 23:
        li(t), Vs(), e !== null && I(Kn);
        break;
      case 24:
        Yi(Rt);
    }
  }
  function wl(e, t) {
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
      ct(t, t.return, S);
    }
  }
  function bn(e, t, i) {
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
              var z = i, j = S;
              try {
                j();
              } catch (Q) {
                ct(
                  s,
                  z,
                  Q
                );
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (Q) {
      ct(t, t.return, Q);
    }
  }
  function Ch(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        vc(t, i);
      } catch (n) {
        ct(e, e.return, n);
      }
    }
  }
  function Dh(e, t, i) {
    i.props = ia(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (n) {
      ct(e, t, n);
    }
  }
  function Sl(e, t) {
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
      ct(e, t, s);
    }
  }
  function Pi(e, t) {
    var i = e.ref, n = e.refCleanup;
    if (i !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (s) {
          ct(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (s) {
          ct(e, t, s);
        }
      else i.current = null;
  }
  function Oh(e) {
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
      ct(e, e.return, s);
    }
  }
  function So(e, t, i) {
    try {
      var n = e.stateNode;
      Zg(n, e.type, i, t), n[Mt] = t;
    } catch (s) {
      ct(e, e.return, s);
    }
  }
  function Ah(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Mn(e.type) || e.tag === 4;
  }
  function _o(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ah(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Mn(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Eo(e, t, i) {
    var n = e.tag;
    if (n === 5 || n === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = ci));
    else if (n !== 4 && (n === 27 && Mn(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (Eo(e, t, i), e = e.sibling; e !== null; )
        Eo(e, t, i), e = e.sibling;
  }
  function Mr(e, t, i) {
    var n = e.tag;
    if (n === 5 || n === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (n !== 4 && (n === 27 && Mn(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (Mr(e, t, i), e = e.sibling; e !== null; )
        Mr(e, t, i), e = e.sibling;
  }
  function zh(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var n = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      jt(t, n, i), t[yt] = e, t[Mt] = i;
    } catch (u) {
      ct(e, e.return, u);
    }
  }
  var Ji = !1, Ot = !1, bo = !1, Mh = typeof WeakSet == "function" ? WeakSet : Set, Nt = null;
  function Eg(e, t) {
    if (e = e.containerInfo, Xo = $r, e = qu(e), vs(e)) {
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
            var v = 0, S = -1, z = -1, j = 0, Q = 0, te = e, G = null;
            t: for (; ; ) {
              for (var X; te !== i || s !== 0 && te.nodeType !== 3 || (S = v + s), te !== u || n !== 0 && te.nodeType !== 3 || (z = v + n), te.nodeType === 3 && (v += te.nodeValue.length), (X = te.firstChild) !== null; )
                G = te, te = X;
              for (; ; ) {
                if (te === e) break t;
                if (G === i && ++j === s && (S = v), G === u && ++Q === n && (z = v), (X = te.nextSibling) !== null) break;
                te = G, G = te.parentNode;
              }
              te = X;
            }
            i = S === -1 || z === -1 ? null : { start: S, end: z };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Yo = { focusedElem: e, selectionRange: i }, $r = !1, Nt = t; Nt !== null; )
      if (t = Nt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Nt = e;
      else
        for (; Nt !== null; ) {
          switch (t = Nt, u = t.alternate, e = t.flags, t.tag) {
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
                  var Se = ia(
                    i.type,
                    s
                  );
                  e = n.getSnapshotBeforeUpdate(
                    Se,
                    u
                  ), n.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Pe) {
                  ct(
                    i,
                    i.return,
                    Pe
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, i = e.nodeType, i === 9)
                  Wo(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Wo(e);
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
            e.return = t.return, Nt = e;
            break;
          }
          Nt = t.return;
        }
  }
  function Bh(e, t, i) {
    var n = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        en(e, i), n & 4 && wl(5, i);
        break;
      case 1:
        if (en(e, i), n & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (v) {
              ct(i, i.return, v);
            }
          else {
            var s = ia(
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
              ct(
                i,
                i.return,
                v
              );
            }
          }
        n & 64 && Ch(i), n & 512 && Sl(i, i.return);
        break;
      case 3:
        if (en(e, i), n & 64 && (e = i.updateQueue, e !== null)) {
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
            vc(e, t);
          } catch (v) {
            ct(i, i.return, v);
          }
        }
        break;
      case 27:
        t === null && n & 4 && zh(i);
      case 26:
      case 5:
        en(e, i), t === null && n & 4 && Oh(i), n & 512 && Sl(i, i.return);
        break;
      case 12:
        en(e, i);
        break;
      case 31:
        en(e, i), n & 4 && Ph(e, i);
        break;
      case 13:
        en(e, i), n & 4 && Lh(e, i), n & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = Bg.bind(
          null,
          i
        ), $g(e, i))));
        break;
      case 22:
        if (n = i.memoizedState !== null || Ji, !n) {
          t = t !== null && t.memoizedState !== null || Ot, s = Ji;
          var u = Ot;
          Ji = n, (Ot = t) && !u ? tn(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : en(e, i), Ji = s, Ot = u;
        }
        break;
      case 30:
        break;
      default:
        en(e, i);
    }
  }
  function Hh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Hh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && on(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Tt = null, Qt = !1;
  function $i(e, t, i) {
    for (i = i.child; i !== null; )
      Nh(e, t, i), i = i.sibling;
  }
  function Nh(e, t, i) {
    if ($ && typeof $.onCommitFiberUnmount == "function")
      try {
        $.onCommitFiberUnmount(k, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Ot || Pi(i, t), $i(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Ot || Pi(i, t);
        var n = Tt, s = Qt;
        Mn(i.type) && (Tt = i.stateNode, Qt = !1), $i(
          e,
          t,
          i
        ), zl(i.stateNode), Tt = n, Qt = s;
        break;
      case 5:
        Ot || Pi(i, t);
      case 6:
        if (n = Tt, s = Qt, Tt = null, $i(
          e,
          t,
          i
        ), Tt = n, Qt = s, Tt !== null)
          if (Qt)
            try {
              (Tt.nodeType === 9 ? Tt.body : Tt.nodeName === "HTML" ? Tt.ownerDocument.body : Tt).removeChild(i.stateNode);
            } catch (u) {
              ct(
                i,
                t,
                u
              );
            }
          else
            try {
              Tt.removeChild(i.stateNode);
            } catch (u) {
              ct(
                i,
                t,
                u
              );
            }
        break;
      case 18:
        Tt !== null && (Qt ? (e = Tt, Df(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Ua(e)) : Df(Tt, i.stateNode));
        break;
      case 4:
        n = Tt, s = Qt, Tt = i.stateNode.containerInfo, Qt = !0, $i(
          e,
          t,
          i
        ), Tt = n, Qt = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        bn(2, i, t), Ot || bn(4, i, t), $i(
          e,
          t,
          i
        );
        break;
      case 1:
        Ot || (Pi(i, t), n = i.stateNode, typeof n.componentWillUnmount == "function" && Dh(
          i,
          t,
          n
        )), $i(
          e,
          t,
          i
        );
        break;
      case 21:
        $i(
          e,
          t,
          i
        );
        break;
      case 22:
        Ot = (n = Ot) || i.memoizedState !== null, $i(
          e,
          t,
          i
        ), Ot = n;
        break;
      default:
        $i(
          e,
          t,
          i
        );
    }
  }
  function Ph(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ua(e);
      } catch (i) {
        ct(t, t.return, i);
      }
    }
  }
  function Lh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ua(e);
      } catch (i) {
        ct(t, t.return, i);
      }
  }
  function bg(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Mh()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Mh()), t;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function Br(e, t) {
    var i = bg(e);
    t.forEach(function(n) {
      if (!i.has(n)) {
        i.add(n);
        var s = Hg.bind(null, e, n);
        n.then(s, s);
      }
    });
  }
  function Wt(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var n = 0; n < i.length; n++) {
        var s = i[n], u = e, v = t, S = v;
        e: for (; S !== null; ) {
          switch (S.tag) {
            case 27:
              if (Mn(S.type)) {
                Tt = S.stateNode, Qt = !1;
                break e;
              }
              break;
            case 5:
              Tt = S.stateNode, Qt = !1;
              break e;
            case 3:
            case 4:
              Tt = S.stateNode.containerInfo, Qt = !0;
              break e;
          }
          S = S.return;
        }
        if (Tt === null) throw Error(l(160));
        Nh(u, v, s), Tt = null, Qt = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Uh(t, e), t = t.sibling;
  }
  var Si = null;
  function Uh(e, t) {
    var i = e.alternate, n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Wt(t, e), Kt(e), n & 4 && (bn(3, e, e.return), wl(3, e), bn(5, e, e.return));
        break;
      case 1:
        Wt(t, e), Kt(e), n & 512 && (Ot || i === null || Pi(i, i.return)), n & 64 && Ji && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? n : i.concat(n))));
        break;
      case 26:
        var s = Si;
        if (Wt(t, e), Kt(e), n & 512 && (Ot || i === null || Pi(i, i.return)), n & 4) {
          var u = i !== null ? i.memoizedState : null;
          if (n = e.memoizedState, i === null)
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  n = e.type, i = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (n) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[Di] || u[yt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(n), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), jt(u, n, i), u[yt] = e, xt(u), n = u;
                      break e;
                    case "link":
                      var v = jf(
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
                      u = s.createElement(n), jt(u, n, i), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (v = jf(
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
                      u = s.createElement(n), jt(u, n, i), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(l(468, n));
                  }
                  u[yt] = e, xt(u), n = u;
                }
                e.stateNode = n;
              } else
                Ff(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Uf(
                s,
                n,
                e.memoizedProps
              );
          else
            u !== n ? (u === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : u.count--, n === null ? Ff(
              s,
              e.type,
              e.stateNode
            ) : Uf(
              s,
              n,
              e.memoizedProps
            )) : n === null && e.stateNode !== null && So(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Wt(t, e), Kt(e), n & 512 && (Ot || i === null || Pi(i, i.return)), i !== null && n & 4 && So(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Wt(t, e), Kt(e), n & 512 && (Ot || i === null || Pi(i, i.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            fn(s, "");
          } catch (Se) {
            ct(e, e.return, Se);
          }
        }
        n & 4 && e.stateNode != null && (s = e.memoizedProps, So(
          e,
          s,
          i !== null ? i.memoizedProps : s
        )), n & 1024 && (bo = !0);
        break;
      case 6:
        if (Wt(t, e), Kt(e), n & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          n = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = n;
          } catch (Se) {
            ct(e, e.return, Se);
          }
        }
        break;
      case 3:
        if (Qr = null, s = Si, Si = Yr(t.containerInfo), Wt(t, e), Si = s, Kt(e), n & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Ua(t.containerInfo);
          } catch (Se) {
            ct(e, e.return, Se);
          }
        bo && (bo = !1, jh(e));
        break;
      case 4:
        n = Si, Si = Yr(
          e.stateNode.containerInfo
        ), Wt(t, e), Kt(e), Si = n;
        break;
      case 12:
        Wt(t, e), Kt(e);
        break;
      case 31:
        Wt(t, e), Kt(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Br(e, n)));
        break;
      case 13:
        Wt(t, e), Kt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Nr = oe()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Br(e, n)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var z = i !== null && i.memoizedState !== null, j = Ji, Q = Ot;
        if (Ji = j || s, Ot = Q || z, Wt(t, e), Ot = Q, Ji = j, Kt(e), n & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (i === null || z || Ji || Ot || na(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                z = i = t;
                try {
                  if (u = z.stateNode, s)
                    v = u.style, typeof v.setProperty == "function" ? v.setProperty("display", "none", "important") : v.display = "none";
                  else {
                    S = z.stateNode;
                    var te = z.memoizedProps.style, G = te != null && te.hasOwnProperty("display") ? te.display : null;
                    S.style.display = G == null || typeof G == "boolean" ? "" : ("" + G).trim();
                  }
                } catch (Se) {
                  ct(z, z.return, Se);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                z = t;
                try {
                  z.stateNode.nodeValue = s ? "" : z.memoizedProps;
                } catch (Se) {
                  ct(z, z.return, Se);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                z = t;
                try {
                  var X = z.stateNode;
                  s ? Of(X, !0) : Of(z.stateNode, !1);
                } catch (Se) {
                  ct(z, z.return, Se);
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
        n & 4 && (n = e.updateQueue, n !== null && (i = n.retryQueue, i !== null && (n.retryQueue = null, Br(e, i))));
        break;
      case 19:
        Wt(t, e), Kt(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Br(e, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Wt(t, e), Kt(e);
    }
  }
  function Kt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, n = e.return; n !== null; ) {
          if (Ah(n)) {
            i = n;
            break;
          }
          n = n.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var s = i.stateNode, u = _o(e);
            Mr(e, u, s);
            break;
          case 5:
            var v = i.stateNode;
            i.flags & 32 && (fn(v, ""), i.flags &= -33);
            var S = _o(e);
            Mr(e, S, v);
            break;
          case 3:
          case 4:
            var z = i.stateNode.containerInfo, j = _o(e);
            Eo(
              e,
              j,
              z
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (Q) {
        ct(e, e.return, Q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function jh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        jh(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function en(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Bh(e, t.alternate, t), t = t.sibling;
  }
  function na(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          bn(4, t, t.return), na(t);
          break;
        case 1:
          Pi(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && Dh(
            t,
            t.return,
            i
          ), na(t);
          break;
        case 27:
          zl(t.stateNode);
        case 26:
        case 5:
          Pi(t, t.return), na(t);
          break;
        case 22:
          t.memoizedState === null && na(t);
          break;
        case 30:
          na(t);
          break;
        default:
          na(t);
      }
      e = e.sibling;
    }
  }
  function tn(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate, s = e, u = t, v = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          tn(
            s,
            u,
            i
          ), wl(4, u);
          break;
        case 1:
          if (tn(
            s,
            u,
            i
          ), n = u, s = n.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (j) {
              ct(n, n.return, j);
            }
          if (n = u, s = n.updateQueue, s !== null) {
            var S = n.stateNode;
            try {
              var z = s.shared.hiddenCallbacks;
              if (z !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < z.length; s++)
                  pc(z[s], S);
            } catch (j) {
              ct(n, n.return, j);
            }
          }
          i && v & 64 && Ch(u), Sl(u, u.return);
          break;
        case 27:
          zh(u);
        case 26:
        case 5:
          tn(
            s,
            u,
            i
          ), i && n === null && v & 4 && Oh(u), Sl(u, u.return);
          break;
        case 12:
          tn(
            s,
            u,
            i
          );
          break;
        case 31:
          tn(
            s,
            u,
            i
          ), i && v & 4 && Ph(s, u);
          break;
        case 13:
          tn(
            s,
            u,
            i
          ), i && v & 4 && Lh(s, u);
          break;
        case 22:
          u.memoizedState === null && tn(
            s,
            u,
            i
          ), Sl(u, u.return);
          break;
        case 30:
          break;
        default:
          tn(
            s,
            u,
            i
          );
      }
      t = t.sibling;
    }
  }
  function Ro(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && ol(i));
  }
  function Co(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ol(e));
  }
  function _i(e, t, i, n) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Fh(
          e,
          t,
          i,
          n
        ), t = t.sibling;
  }
  function Fh(e, t, i, n) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        _i(
          e,
          t,
          i,
          n
        ), s & 2048 && wl(9, t);
        break;
      case 1:
        _i(
          e,
          t,
          i,
          n
        );
        break;
      case 3:
        _i(
          e,
          t,
          i,
          n
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ol(e)));
        break;
      case 12:
        if (s & 2048) {
          _i(
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
          } catch (z) {
            ct(t, t.return, z);
          }
        } else
          _i(
            e,
            t,
            i,
            n
          );
        break;
      case 31:
        _i(
          e,
          t,
          i,
          n
        );
        break;
      case 13:
        _i(
          e,
          t,
          i,
          n
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, v = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? _i(
          e,
          t,
          i,
          n
        ) : _l(e, t) : u._visibility & 2 ? _i(
          e,
          t,
          i,
          n
        ) : (u._visibility |= 2, Ca(
          e,
          t,
          i,
          n,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Ro(v, t);
        break;
      case 24:
        _i(
          e,
          t,
          i,
          n
        ), s & 2048 && Co(t.alternate, t);
        break;
      default:
        _i(
          e,
          t,
          i,
          n
        );
    }
  }
  function Ca(e, t, i, n, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, v = t, S = i, z = n, j = v.flags;
      switch (v.tag) {
        case 0:
        case 11:
        case 15:
          Ca(
            u,
            v,
            S,
            z,
            s
          ), wl(8, v);
          break;
        case 23:
          break;
        case 22:
          var Q = v.stateNode;
          v.memoizedState !== null ? Q._visibility & 2 ? Ca(
            u,
            v,
            S,
            z,
            s
          ) : _l(
            u,
            v
          ) : (Q._visibility |= 2, Ca(
            u,
            v,
            S,
            z,
            s
          )), s && j & 2048 && Ro(
            v.alternate,
            v
          );
          break;
        case 24:
          Ca(
            u,
            v,
            S,
            z,
            s
          ), s && j & 2048 && Co(v.alternate, v);
          break;
        default:
          Ca(
            u,
            v,
            S,
            z,
            s
          );
      }
      t = t.sibling;
    }
  }
  function _l(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, n = t, s = n.flags;
        switch (n.tag) {
          case 22:
            _l(i, n), s & 2048 && Ro(
              n.alternate,
              n
            );
            break;
          case 24:
            _l(i, n), s & 2048 && Co(n.alternate, n);
            break;
          default:
            _l(i, n);
        }
        t = t.sibling;
      }
  }
  var El = 8192;
  function Da(e, t, i) {
    if (e.subtreeFlags & El)
      for (e = e.child; e !== null; )
        Gh(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function Gh(e, t, i) {
    switch (e.tag) {
      case 26:
        Da(
          e,
          t,
          i
        ), e.flags & El && e.memoizedState !== null && hm(
          i,
          Si,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Da(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var n = Si;
        Si = Yr(e.stateNode.containerInfo), Da(
          e,
          t,
          i
        ), Si = n;
        break;
      case 22:
        e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = El, El = 16777216, Da(
          e,
          t,
          i
        ), El = n) : Da(
          e,
          t,
          i
        ));
        break;
      default:
        Da(
          e,
          t,
          i
        );
    }
  }
  function kh(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function bl(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var n = t[i];
          Nt = n, qh(
            n,
            e
          );
        }
      kh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Vh(e), e = e.sibling;
  }
  function Vh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        bl(e), e.flags & 2048 && bn(9, e, e.return);
        break;
      case 3:
        bl(e);
        break;
      case 12:
        bl(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Hr(e)) : bl(e);
        break;
      default:
        bl(e);
    }
  }
  function Hr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var n = t[i];
          Nt = n, qh(
            n,
            e
          );
        }
      kh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          bn(8, t, t.return), Hr(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, Hr(t));
          break;
        default:
          Hr(t);
      }
      e = e.sibling;
    }
  }
  function qh(e, t) {
    for (; Nt !== null; ) {
      var i = Nt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          bn(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var n = i.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          ol(i.memoizedState.cache);
      }
      if (n = i.child, n !== null) n.return = i, Nt = n;
      else
        e: for (i = e; Nt !== null; ) {
          n = Nt;
          var s = n.sibling, u = n.return;
          if (Hh(n), n === i) {
            Nt = null;
            break e;
          }
          if (s !== null) {
            s.return = u, Nt = s;
            break e;
          }
          Nt = u;
        }
    }
  }
  var Rg = {
    getCacheForType: function(e) {
      var t = Lt(Rt), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Lt(Rt).controller.signal;
    }
  }, Cg = typeof WeakMap == "function" ? WeakMap : Map, st = 0, gt = null, Qe = null, Je = 0, ut = 0, ri = null, Rn = !1, Oa = !1, Do = !1, nn = 0, _t = 0, Cn = 0, aa = 0, Oo = 0, si = 0, Aa = 0, Rl = null, Jt = null, Ao = !1, Nr = 0, Zh = 0, Pr = 1 / 0, Lr = null, Dn = null, At = 0, On = null, za = null, an = 0, zo = 0, Mo = null, Xh = null, Cl = 0, Bo = null;
  function oi() {
    return (st & 2) !== 0 && Je !== 0 ? Je & -Je : V.T !== null ? jo() : _e();
  }
  function Yh() {
    if (si === 0)
      if ((Je & 536870912) === 0 || et) {
        var e = Gi;
        Gi <<= 1, (Gi & 3932160) === 0 && (Gi = 262144), si = e;
      } else si = 536870912;
    return e = ai.current, e !== null && (e.flags |= 32), si;
  }
  function $t(e, t, i) {
    (e === gt && (ut === 2 || ut === 9) || e.cancelPendingCommit !== null) && (Ma(e, 0), An(
      e,
      Je,
      si,
      !1
    )), ki(e, i), ((st & 2) === 0 || e !== gt) && (e === gt && ((st & 2) === 0 && (aa |= i), _t === 4 && An(
      e,
      Je,
      si,
      !1
    )), Li(e));
  }
  function Ih(e, t, i) {
    if ((st & 6) !== 0) throw Error(l(327));
    var n = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ri(e, t), s = n ? Ag(e, t) : No(e, t, !0), u = n;
    do {
      if (s === 0) {
        Oa && !n && An(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, u && !Dg(i)) {
          s = No(e, t, !1), u = !1;
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
              s = Rl;
              var z = S.current.memoizedState.isDehydrated;
              if (z && (Ma(S, v).flags |= 256), v = No(
                S,
                v,
                !1
              ), v !== 2) {
                if (Do && !z) {
                  S.errorRecoveryDisabledLanes |= u, aa |= u, s = 4;
                  break e;
                }
                u = Jt, Jt = s, u !== null && (Jt === null ? Jt = u : Jt.push.apply(
                  Jt,
                  u
                ));
              }
              s = v;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Ma(e, 0), An(e, t, 0, !0);
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
              An(
                n,
                t,
                si,
                !Rn
              );
              break e;
            case 2:
              Jt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((t & 62914560) === t && (s = Nr + 300 - oe(), 10 < s)) {
            if (An(
              n,
              t,
              si,
              !Rn
            ), jn(n, 0, !0) !== 0) break e;
            an = t, n.timeoutHandle = Rf(
              Qh.bind(
                null,
                n,
                i,
                Jt,
                Lr,
                Ao,
                t,
                si,
                aa,
                Aa,
                Rn,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          Qh(
            n,
            i,
            Jt,
            Lr,
            Ao,
            t,
            si,
            aa,
            Aa,
            Rn,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Li(e);
  }
  function Qh(e, t, i, n, s, u, v, S, z, j, Q, te, G, X) {
    if (e.timeoutHandle = -1, te = t.subtreeFlags, te & 8192 || (te & 16785408) === 16785408) {
      te = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ci
      }, Gh(
        t,
        u,
        te
      );
      var Se = (u & 62914560) === u ? Nr - oe() : (u & 4194048) === u ? Zh - oe() : 0;
      if (Se = fm(
        te,
        Se
      ), Se !== null) {
        an = u, e.cancelPendingCommit = Se(
          af.bind(
            null,
            e,
            t,
            u,
            i,
            n,
            s,
            v,
            S,
            z,
            Q,
            te,
            null,
            G,
            X
          )
        ), An(e, u, v, !j);
        return;
      }
    }
    af(
      e,
      t,
      u,
      i,
      n,
      s,
      v,
      S,
      z
    );
  }
  function Dg(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var n = 0; n < i.length; n++) {
          var s = i[n], u = s.getSnapshot;
          s = s.value;
          try {
            if (!ii(u(), s)) return !1;
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
  function An(e, t, i, n) {
    t &= ~Oo, t &= ~aa, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - Ue(s), v = 1 << u;
      n[u] = -1, s &= ~v;
    }
    i !== 0 && Fa(e, i, t);
  }
  function Ur() {
    return (st & 6) === 0 ? (Dl(0), !1) : !0;
  }
  function Ho() {
    if (Qe !== null) {
      if (ut === 0)
        var e = Qe.return;
      else
        e = Qe, Xi = Qn = null, Qs(e), Sa = null, cl = 0, e = Qe;
      for (; e !== null; )
        Rh(e.alternate, e), e = e.return;
      Qe = null;
    }
  }
  function Ma(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Ig(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), an = 0, Ho(), gt = e, Qe = i = qi(e.current, null), Je = t, ut = 0, ri = null, Rn = !1, Oa = Ri(e, t), Do = !1, Aa = si = Oo = aa = Cn = _t = 0, Jt = Rl = null, Ao = !1, (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var s = 31 - Ue(n), u = 1 << s;
        t |= e[s], n &= ~u;
      }
    return nn = t, lr(), i;
  }
  function Wh(e, t) {
    qe = null, V.H = yl, t === wa || t === dr ? (t = fc(), ut = 3) : t === Ls ? (t = fc(), ut = 4) : ut = t === ho ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ri = t, Qe === null && (_t = 1, Cr(
      e,
      fi(t, e.current)
    ));
  }
  function Kh() {
    var e = ai.current;
    return e === null ? !0 : (Je & 4194048) === Je ? pi === null : (Je & 62914560) === Je || (Je & 536870912) !== 0 ? e === pi : !1;
  }
  function Jh() {
    var e = V.H;
    return V.H = yl, e === null ? yl : e;
  }
  function $h() {
    var e = V.A;
    return V.A = Rg, e;
  }
  function jr() {
    _t = 4, Rn || (Je & 4194048) !== Je && ai.current !== null || (Oa = !0), (Cn & 134217727) === 0 && (aa & 134217727) === 0 || gt === null || An(
      gt,
      Je,
      si,
      !1
    );
  }
  function No(e, t, i) {
    var n = st;
    st |= 2;
    var s = Jh(), u = $h();
    (gt !== e || Je !== t) && (Lr = null, Ma(e, t)), t = !1;
    var v = _t;
    e: do
      try {
        if (ut !== 0 && Qe !== null) {
          var S = Qe, z = ri;
          switch (ut) {
            case 8:
              Ho(), v = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ai.current === null && (t = !0);
              var j = ut;
              if (ut = 0, ri = null, Ba(e, S, z, j), i && Oa) {
                v = 0;
                break e;
              }
              break;
            default:
              j = ut, ut = 0, ri = null, Ba(e, S, z, j);
          }
        }
        Og(), v = _t;
        break;
      } catch (Q) {
        Wh(e, Q);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Xi = Qn = null, st = n, V.H = s, V.A = u, Qe === null && (gt = null, Je = 0, lr()), v;
  }
  function Og() {
    for (; Qe !== null; ) ef(Qe);
  }
  function Ag(e, t) {
    var i = st;
    st |= 2;
    var n = Jh(), s = $h();
    gt !== e || Je !== t ? (Lr = null, Pr = oe() + 500, Ma(e, t)) : Oa = Ri(
      e,
      t
    );
    e: do
      try {
        if (ut !== 0 && Qe !== null) {
          t = Qe;
          var u = ri;
          t: switch (ut) {
            case 1:
              ut = 0, ri = null, Ba(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (cc(u)) {
                ut = 0, ri = null, tf(t);
                break;
              }
              t = function() {
                ut !== 2 && ut !== 9 || gt !== e || (ut = 7), Li(e);
              }, u.then(t, t);
              break e;
            case 3:
              ut = 7;
              break e;
            case 4:
              ut = 5;
              break e;
            case 7:
              cc(u) ? (ut = 0, ri = null, tf(t)) : (ut = 0, ri = null, Ba(e, t, u, 7));
              break;
            case 5:
              var v = null;
              switch (Qe.tag) {
                case 26:
                  v = Qe.memoizedState;
                case 5:
                case 27:
                  var S = Qe;
                  if (v ? Gf(v) : S.stateNode.complete) {
                    ut = 0, ri = null;
                    var z = S.sibling;
                    if (z !== null) Qe = z;
                    else {
                      var j = S.return;
                      j !== null ? (Qe = j, Fr(j)) : Qe = null;
                    }
                    break t;
                  }
              }
              ut = 0, ri = null, Ba(e, t, u, 5);
              break;
            case 6:
              ut = 0, ri = null, Ba(e, t, u, 6);
              break;
            case 8:
              Ho(), _t = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        zg();
        break;
      } catch (Q) {
        Wh(e, Q);
      }
    while (!0);
    return Xi = Qn = null, V.H = n, V.A = s, st = i, Qe !== null ? 0 : (gt = null, Je = 0, lr(), _t);
  }
  function zg() {
    for (; Qe !== null && !he(); )
      ef(Qe);
  }
  function ef(e) {
    var t = Eh(e.alternate, e, nn);
    e.memoizedProps = e.pendingProps, t === null ? Fr(e) : Qe = t;
  }
  function tf(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = yh(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Je
        );
        break;
      case 11:
        t = yh(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Je
        );
        break;
      case 5:
        Qs(t);
      default:
        Rh(i, t), t = Qe = $u(t, nn), t = Eh(i, t, nn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Fr(e) : Qe = t;
  }
  function Ba(e, t, i, n) {
    Xi = Qn = null, Qs(t), Sa = null, cl = 0;
    var s = t.return;
    try {
      if (Tg(
        e,
        s,
        t,
        i,
        Je
      )) {
        _t = 1, Cr(
          e,
          fi(i, e.current)
        ), Qe = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw Qe = s, u;
      _t = 1, Cr(
        e,
        fi(i, e.current)
      ), Qe = null;
      return;
    }
    t.flags & 32768 ? (et || n === 1 ? e = !0 : Oa || (Je & 536870912) !== 0 ? e = !1 : (Rn = e = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = ai.current, n !== null && n.tag === 13 && (n.flags |= 16384))), nf(t, e)) : Fr(t);
  }
  function Fr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        nf(
          t,
          Rn
        );
        return;
      }
      e = t.return;
      var i = Sg(
        t.alternate,
        t,
        nn
      );
      if (i !== null) {
        Qe = i;
        return;
      }
      if (t = t.sibling, t !== null) {
        Qe = t;
        return;
      }
      Qe = t = e;
    } while (t !== null);
    _t === 0 && (_t = 5);
  }
  function nf(e, t) {
    do {
      var i = _g(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Qe = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !t && (e = e.sibling, e !== null)) {
        Qe = e;
        return;
      }
      Qe = e = i;
    } while (e !== null);
    _t = 6, Qe = null;
  }
  function af(e, t, i, n, s, u, v, S, z) {
    e.cancelPendingCommit = null;
    do
      Gr();
    while (At !== 0);
    if ((st & 6) !== 0) throw Error(l(327));
    if (t !== null) {
      if (t === e.current) throw Error(l(177));
      if (u = t.lanes | t.childLanes, u |= Ss, ql(
        e,
        i,
        u,
        v,
        S,
        z
      ), e === gt && (Qe = gt = null, Je = 0), za = t, On = e, an = i, zo = u, Mo = s, Xh = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Ng(Me, function() {
        return uf(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
        n = V.T, V.T = null, s = ne.p, ne.p = 2, v = st, st |= 4;
        try {
          Eg(e, t, i);
        } finally {
          st = v, ne.p = s, V.T = n;
        }
      }
      At = 1, lf(), rf(), sf();
    }
  }
  function lf() {
    if (At === 1) {
      At = 0;
      var e = On, t = za, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = V.T, V.T = null;
        var n = ne.p;
        ne.p = 2;
        var s = st;
        st |= 4;
        try {
          Uh(t, e);
          var u = Yo, v = qu(e.containerInfo), S = u.focusedElem, z = u.selectionRange;
          if (v !== S && S && S.ownerDocument && Vu(
            S.ownerDocument.documentElement,
            S
          )) {
            if (z !== null && vs(S)) {
              var j = z.start, Q = z.end;
              if (Q === void 0 && (Q = j), "selectionStart" in S)
                S.selectionStart = j, S.selectionEnd = Math.min(
                  Q,
                  S.value.length
                );
              else {
                var te = S.ownerDocument || document, G = te && te.defaultView || window;
                if (G.getSelection) {
                  var X = G.getSelection(), Se = S.textContent.length, Pe = Math.min(z.start, Se), dt = z.end === void 0 ? Pe : Math.min(z.end, Se);
                  !X.extend && Pe > dt && (v = dt, dt = Pe, Pe = v);
                  var P = ku(
                    S,
                    Pe
                  ), H = ku(
                    S,
                    dt
                  );
                  if (P && H && (X.rangeCount !== 1 || X.anchorNode !== P.node || X.anchorOffset !== P.offset || X.focusNode !== H.node || X.focusOffset !== H.offset)) {
                    var U = te.createRange();
                    U.setStart(P.node, P.offset), X.removeAllRanges(), Pe > dt ? (X.addRange(U), X.extend(H.node, H.offset)) : (U.setEnd(H.node, H.offset), X.addRange(U));
                  }
                }
              }
            }
            for (te = [], X = S; X = X.parentNode; )
              X.nodeType === 1 && te.push({
                element: X,
                left: X.scrollLeft,
                top: X.scrollTop
              });
            for (typeof S.focus == "function" && S.focus(), S = 0; S < te.length; S++) {
              var ee = te[S];
              ee.element.scrollLeft = ee.left, ee.element.scrollTop = ee.top;
            }
          }
          $r = !!Xo, Yo = Xo = null;
        } finally {
          st = s, ne.p = n, V.T = i;
        }
      }
      e.current = t, At = 2;
    }
  }
  function rf() {
    if (At === 2) {
      At = 0;
      var e = On, t = za, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = V.T, V.T = null;
        var n = ne.p;
        ne.p = 2;
        var s = st;
        st |= 4;
        try {
          Bh(e, t.alternate, t);
        } finally {
          st = s, ne.p = n, V.T = i;
        }
      }
      At = 3;
    }
  }
  function sf() {
    if (At === 4 || At === 3) {
      At = 0, q();
      var e = On, t = za, i = an, n = Xh;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? At = 5 : (At = 0, za = On = null, of(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (Dn = null), Gn(i), t = t.stateNode, $ && typeof $.onCommitFiberRoot == "function")
        try {
          $.onCommitFiberRoot(
            k,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        t = V.T, s = ne.p, ne.p = 2, V.T = null;
        try {
          for (var u = e.onRecoverableError, v = 0; v < n.length; v++) {
            var S = n[v];
            u(S.value, {
              componentStack: S.stack
            });
          }
        } finally {
          V.T = t, ne.p = s;
        }
      }
      (an & 3) !== 0 && Gr(), Li(e), s = e.pendingLanes, (i & 261930) !== 0 && (s & 42) !== 0 ? e === Bo ? Cl++ : (Cl = 0, Bo = e) : Cl = 0, Dl(0);
    }
  }
  function of(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ol(t)));
  }
  function Gr() {
    return lf(), rf(), sf(), uf();
  }
  function uf() {
    if (At !== 5) return !1;
    var e = On, t = zo;
    zo = 0;
    var i = Gn(an), n = V.T, s = ne.p;
    try {
      ne.p = 32 > i ? 32 : i, V.T = null, i = Mo, Mo = null;
      var u = On, v = an;
      if (At = 0, za = On = null, an = 0, (st & 6) !== 0) throw Error(l(331));
      var S = st;
      if (st |= 4, Vh(u.current), Fh(
        u,
        u.current,
        v,
        i
      ), st = S, Dl(0, !1), $ && typeof $.onPostCommitFiberRoot == "function")
        try {
          $.onPostCommitFiberRoot(k, u);
        } catch {
        }
      return !0;
    } finally {
      ne.p = s, V.T = n, of(e, t);
    }
  }
  function cf(e, t, i) {
    t = fi(i, t), t = co(e.stateNode, t, 2), e = Sn(e, t, 2), e !== null && (ki(e, 2), Li(e));
  }
  function ct(e, t, i) {
    if (e.tag === 3)
      cf(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          cf(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Dn === null || !Dn.has(n))) {
            e = fi(i, e), i = ch(2), n = Sn(t, i, 2), n !== null && (hh(
              i,
              n,
              t,
              e
            ), ki(n, 2), Li(n));
            break;
          }
        }
        t = t.return;
      }
  }
  function Po(e, t, i) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new Cg();
      var s = /* @__PURE__ */ new Set();
      n.set(t, s);
    } else
      s = n.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), n.set(t, s));
    s.has(i) || (Do = !0, s.add(i), e = Mg.bind(null, e, t, i), t.then(e, e));
  }
  function Mg(e, t, i) {
    var n = e.pingCache;
    n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, gt === e && (Je & i) === i && (_t === 4 || _t === 3 && (Je & 62914560) === Je && 300 > oe() - Nr ? (st & 2) === 0 && Ma(e, 0) : Oo |= i, Aa === Je && (Aa = 0)), Li(e);
  }
  function hf(e, t) {
    t === 0 && (t = rn()), e = Xn(e, t), e !== null && (ki(e, t), Li(e));
  }
  function Bg(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), hf(e, i);
  }
  function Hg(e, t) {
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
    n !== null && n.delete(t), hf(e, i);
  }
  function Ng(e, t) {
    return W(e, t);
  }
  var kr = null, Ha = null, Lo = !1, Vr = !1, Uo = !1, zn = 0;
  function Li(e) {
    e !== Ha && e.next === null && (Ha === null ? kr = Ha = e : Ha = Ha.next = e), Vr = !0, Lo || (Lo = !0, Lg());
  }
  function Dl(e, t) {
    if (!Uo && Vr) {
      Uo = !0;
      do
        for (var i = !1, n = kr; n !== null; ) {
          if (e !== 0) {
            var s = n.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var v = n.suspendedLanes, S = n.pingedLanes;
              u = (1 << 31 - Ue(42 | e) + 1) - 1, u &= s & ~(v & ~S), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (i = !0, mf(n, u));
          } else
            u = Je, u = jn(
              n,
              n === gt ? u : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (u & 3) === 0 || Ri(n, u) || (i = !0, mf(n, u));
          n = n.next;
        }
      while (i);
      Uo = !1;
    }
  }
  function Pg() {
    ff();
  }
  function ff() {
    Vr = Lo = !1;
    var e = 0;
    zn !== 0 && Yg() && (e = zn);
    for (var t = oe(), i = null, n = kr; n !== null; ) {
      var s = n.next, u = df(n, t);
      u === 0 ? (n.next = null, i === null ? kr = s : i.next = s, s === null && (Ha = i)) : (i = n, (e !== 0 || (u & 3) !== 0) && (Vr = !0)), n = s;
    }
    At !== 0 && At !== 5 || Dl(e), zn !== 0 && (zn = 0);
  }
  function df(e, t) {
    for (var i = e.suspendedLanes, n = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var v = 31 - Ue(u), S = 1 << v, z = s[v];
      z === -1 ? ((S & i) === 0 || (S & n) !== 0) && (s[v] = Vl(S, t)) : z <= t && (e.expiredLanes |= S), u &= ~S;
    }
    if (t = gt, i = Je, i = jn(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), n = e.callbackNode, i === 0 || e === t && (ut === 2 || ut === 9) || e.cancelPendingCommit !== null)
      return n !== null && n !== null && le(n), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || Ri(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (n !== null && le(n), Gn(i)) {
        case 2:
        case 8:
          i = ye;
          break;
        case 32:
          i = Me;
          break;
        case 268435456:
          i = y;
          break;
        default:
          i = Me;
      }
      return n = gf.bind(null, e), i = W(i, n), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return n !== null && n !== null && le(n), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function gf(e, t) {
    if (At !== 0 && At !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (Gr() && e.callbackNode !== i)
      return null;
    var n = Je;
    return n = jn(
      e,
      e === gt ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), n === 0 ? null : (Ih(e, n, t), df(e, oe()), e.callbackNode != null && e.callbackNode === i ? gf.bind(null, e) : null);
  }
  function mf(e, t) {
    if (Gr()) return null;
    Ih(e, t, !0);
  }
  function Lg() {
    Qg(function() {
      (st & 6) !== 0 ? W(
        fe,
        Pg
      ) : ff();
    });
  }
  function jo() {
    if (zn === 0) {
      var e = Ta;
      e === 0 && (e = it, it <<= 1, (it & 261888) === 0 && (it = 256)), zn = e;
    }
    return zn;
  }
  function pf(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Yt("" + e);
  }
  function vf(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function Ug(e, t, i, n, s) {
    if (t === "submit" && i && i.stateNode === s) {
      var u = pf(
        (s[Mt] || null).action
      ), v = n.submitter;
      v && (t = (t = v[Mt] || null) ? pf(t.formAction) : v.getAttribute("formAction"), t !== null && (u = t, v = null));
      var S = new tr(
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
                if (zn !== 0) {
                  var z = v ? vf(s, v) : new FormData(s);
                  ao(
                    i,
                    {
                      pending: !0,
                      data: z,
                      method: s.method,
                      action: u
                    },
                    null,
                    z
                  );
                }
              } else
                typeof u == "function" && (S.preventDefault(), z = v ? vf(s, v) : new FormData(s), ao(
                  i,
                  {
                    pending: !0,
                    data: z,
                    method: s.method,
                    action: u
                  },
                  u,
                  z
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var Fo = 0; Fo < ws.length; Fo++) {
    var Go = ws[Fo], jg = Go.toLowerCase(), Fg = Go[0].toUpperCase() + Go.slice(1);
    wi(
      jg,
      "on" + Fg
    );
  }
  wi(Yu, "onAnimationEnd"), wi(Iu, "onAnimationIteration"), wi(Qu, "onAnimationStart"), wi("dblclick", "onDoubleClick"), wi("focusin", "onFocus"), wi("focusout", "onBlur"), wi(ig, "onTransitionRun"), wi(ng, "onTransitionStart"), wi(ag, "onTransitionCancel"), wi(Wu, "onTransitionEnd"), Zt("onMouseEnter", ["mouseout", "mouseover"]), Zt("onMouseLeave", ["mouseout", "mouseover"]), Zt("onPointerEnter", ["pointerout", "pointerover"]), Zt("onPointerLeave", ["pointerout", "pointerover"]), Mi(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Mi(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Mi("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Mi(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Mi(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Mi(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ol = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Gg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ol)
  );
  function yf(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var n = e[i], s = n.event;
      n = n.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var v = n.length - 1; 0 <= v; v--) {
            var S = n[v], z = S.instance, j = S.currentTarget;
            if (S = S.listener, z !== u && s.isPropagationStopped())
              break e;
            u = S, s.currentTarget = j;
            try {
              u(s);
            } catch (Q) {
              ar(Q);
            }
            s.currentTarget = null, u = z;
          }
        else
          for (v = 0; v < n.length; v++) {
            if (S = n[v], z = S.instance, j = S.currentTarget, S = S.listener, z !== u && s.isPropagationStopped())
              break e;
            u = S, s.currentTarget = j;
            try {
              u(s);
            } catch (Q) {
              ar(Q);
            }
            s.currentTarget = null, u = z;
          }
      }
    }
  }
  function We(e, t) {
    var i = t[mt];
    i === void 0 && (i = t[mt] = /* @__PURE__ */ new Set());
    var n = e + "__bubble";
    i.has(n) || (Tf(t, e, 2, !1), i.add(n));
  }
  function ko(e, t, i) {
    var n = 0;
    t && (n |= 4), Tf(
      i,
      e,
      n,
      t
    );
  }
  var qr = "_reactListening" + Math.random().toString(36).slice(2);
  function Vo(e) {
    if (!e[qr]) {
      e[qr] = !0, xi.forEach(function(i) {
        i !== "selectionchange" && (Gg.has(i) || ko(i, !1, e), ko(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[qr] || (t[qr] = !0, ko("selectionchange", !1, t));
    }
  }
  function Tf(e, t, i, n) {
    switch (If(t)) {
      case 2:
        var s = mm;
        break;
      case 8:
        s = pm;
        break;
      default:
        s = au;
    }
    i = s.bind(
      null,
      t,
      i,
      e
    ), s = void 0, !Ka || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), n ? s !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, i, !0) : s !== void 0 ? e.addEventListener(t, i, {
      passive: s
    }) : e.addEventListener(t, i, !1);
  }
  function qo(e, t, i, n, s) {
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
              var z = v.tag;
              if ((z === 3 || z === 4) && v.stateNode.containerInfo === s)
                return;
              v = v.return;
            }
          for (; S !== null; ) {
            if (v = Oi(S), v === null) return;
            if (z = v.tag, z === 5 || z === 6 || z === 26 || z === 27) {
              n = u = v;
              continue e;
            }
            S = S.parentNode;
          }
        }
        n = n.return;
      }
    Oe(function() {
      var j = u, Q = ua(i), te = [];
      e: {
        var G = Ku.get(e);
        if (G !== void 0) {
          var X = tr, Se = e;
          switch (e) {
            case "keypress":
              if ($l(i) === 0) break e;
            case "keydown":
            case "keyup":
              X = Hd;
              break;
            case "focusin":
              Se = "focus", X = fs;
              break;
            case "focusout":
              Se = "blur", X = fs;
              break;
            case "beforeblur":
            case "afterblur":
              X = fs;
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
              X = Ru;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              X = Sd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              X = Ld;
              break;
            case Yu:
            case Iu:
            case Qu:
              X = bd;
              break;
            case Wu:
              X = jd;
              break;
            case "scroll":
            case "scrollend":
              X = xd;
              break;
            case "wheel":
              X = Gd;
              break;
            case "copy":
            case "cut":
            case "paste":
              X = Cd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              X = Du;
              break;
            case "toggle":
            case "beforetoggle":
              X = Vd;
          }
          var Pe = (t & 4) !== 0, dt = !Pe && (e === "scroll" || e === "scrollend"), P = Pe ? G !== null ? G + "Capture" : null : G;
          Pe = [];
          for (var H = j, U; H !== null; ) {
            var ee = H;
            if (U = ee.stateNode, ee = ee.tag, ee !== 5 && ee !== 26 && ee !== 27 || U === null || P === null || (ee = ot(H, P), ee != null && Pe.push(
              Al(H, ee, U)
            )), dt) break;
            H = H.return;
          }
          0 < Pe.length && (G = new X(
            G,
            Se,
            null,
            i,
            Q
          ), te.push({ event: G, listeners: Pe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (G = e === "mouseover" || e === "pointerover", X = e === "mouseout" || e === "pointerout", G && i !== Wa && (Se = i.relatedTarget || i.fromElement) && (Oi(Se) || Se[ui]))
            break e;
          if ((X || G) && (G = Q.window === Q ? Q : (G = Q.ownerDocument) ? G.defaultView || G.parentWindow : window, X ? (Se = i.relatedTarget || i.toElement, X = j, Se = Se ? Oi(Se) : null, Se !== null && (dt = r(Se), Pe = Se.tag, Se !== dt || Pe !== 5 && Pe !== 27 && Pe !== 6) && (Se = null)) : (X = null, Se = j), X !== Se)) {
            if (Pe = Ru, ee = "onMouseLeave", P = "onMouseEnter", H = "mouse", (e === "pointerout" || e === "pointerover") && (Pe = Du, ee = "onPointerLeave", P = "onPointerEnter", H = "pointer"), dt = X == null ? G : Ai(X), U = Se == null ? G : Ai(Se), G = new Pe(
              ee,
              H + "leave",
              X,
              i,
              Q
            ), G.target = dt, G.relatedTarget = U, ee = null, Oi(Q) === j && (Pe = new Pe(
              P,
              H + "enter",
              Se,
              i,
              Q
            ), Pe.target = U, Pe.relatedTarget = dt, ee = Pe), dt = ee, X && Se)
              t: {
                for (Pe = kg, P = X, H = Se, U = 0, ee = P; ee; ee = Pe(ee))
                  U++;
                ee = 0;
                for (var Ae = H; Ae; Ae = Pe(Ae))
                  ee++;
                for (; 0 < U - ee; )
                  P = Pe(P), U--;
                for (; 0 < ee - U; )
                  H = Pe(H), ee--;
                for (; U--; ) {
                  if (P === H || H !== null && P === H.alternate) {
                    Pe = P;
                    break t;
                  }
                  P = Pe(P), H = Pe(H);
                }
                Pe = null;
              }
            else Pe = null;
            X !== null && xf(
              te,
              G,
              X,
              Pe,
              !1
            ), Se !== null && dt !== null && xf(
              te,
              dt,
              Se,
              Pe,
              !0
            );
          }
        }
        e: {
          if (G = j ? Ai(j) : window, X = G.nodeName && G.nodeName.toLowerCase(), X === "select" || X === "input" && G.type === "file")
            var nt = Pu;
          else if (Hu(G))
            if (Lu)
              nt = $d;
            else {
              nt = Kd;
              var Re = Wd;
            }
          else
            X = G.nodeName, !X || X.toLowerCase() !== "input" || G.type !== "checkbox" && G.type !== "radio" ? j && dn(j.elementType) && (nt = Pu) : nt = Jd;
          if (nt && (nt = nt(e, j))) {
            Nu(
              te,
              nt,
              i,
              Q
            );
            break e;
          }
          Re && Re(e, G, j), e === "focusout" && j && G.type === "number" && j.memoizedProps.value != null && Ia(G, "number", G.value);
        }
        switch (Re = j ? Ai(j) : window, e) {
          case "focusin":
            (Hu(Re) || Re.contentEditable === "true") && (ha = Re, ys = j, ll = null);
            break;
          case "focusout":
            ll = ys = ha = null;
            break;
          case "mousedown":
            Ts = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ts = !1, Zu(te, i, Q);
            break;
          case "selectionchange":
            if (tg) break;
          case "keydown":
          case "keyup":
            Zu(te, i, Q);
        }
        var Xe;
        if (gs)
          e: {
            switch (e) {
              case "compositionstart":
                var $e = "onCompositionStart";
                break e;
              case "compositionend":
                $e = "onCompositionEnd";
                break e;
              case "compositionupdate":
                $e = "onCompositionUpdate";
                break e;
            }
            $e = void 0;
          }
        else
          ca ? Mu(e, i) && ($e = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && ($e = "onCompositionStart");
        $e && (Ou && i.locale !== "ko" && (ca || $e !== "onCompositionStart" ? $e === "onCompositionEnd" && ca && (Xe = Eu()) : (mn = Q, us = "value" in mn ? mn.value : mn.textContent, ca = !0)), Re = Zr(j, $e), 0 < Re.length && ($e = new Cu(
          $e,
          e,
          null,
          i,
          Q
        ), te.push({ event: $e, listeners: Re }), Xe ? $e.data = Xe : (Xe = Bu(i), Xe !== null && ($e.data = Xe)))), (Xe = Zd ? Xd(e, i) : Yd(e, i)) && ($e = Zr(j, "onBeforeInput"), 0 < $e.length && (Re = new Cu(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          Q
        ), te.push({
          event: Re,
          listeners: $e
        }), Re.data = Xe)), Ug(
          te,
          e,
          j,
          i,
          Q
        );
      }
      yf(te, t);
    });
  }
  function Al(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function Zr(e, t) {
    for (var i = t + "Capture", n = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = ot(e, i), s != null && n.unshift(
        Al(e, s, u)
      ), s = ot(e, t), s != null && n.push(
        Al(e, s, u)
      )), e.tag === 3) return n;
      e = e.return;
    }
    return [];
  }
  function kg(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function xf(e, t, i, n, s) {
    for (var u = t._reactName, v = []; i !== null && i !== n; ) {
      var S = i, z = S.alternate, j = S.stateNode;
      if (S = S.tag, z !== null && z === n) break;
      S !== 5 && S !== 26 && S !== 27 || j === null || (z = j, s ? (j = ot(i, u), j != null && v.unshift(
        Al(i, j, z)
      )) : s || (j = ot(i, u), j != null && v.push(
        Al(i, j, z)
      ))), i = i.return;
    }
    v.length !== 0 && e.push({ event: t, listeners: v });
  }
  var Vg = /\r\n?/g, qg = /\u0000|\uFFFD/g;
  function wf(e) {
    return (typeof e == "string" ? e : "" + e).replace(Vg, `
`).replace(qg, "");
  }
  function Sf(e, t) {
    return t = wf(t), wf(e) === t;
  }
  function ft(e, t, i, n, s, u) {
    switch (i) {
      case "children":
        typeof n == "string" ? t === "body" || t === "textarea" && n === "" || fn(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && fn(e, "" + n);
        break;
      case "className":
        un(e, "class", n);
        break;
      case "tabIndex":
        un(e, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        un(e, i, n);
        break;
      case "style":
        Qa(e, n, u);
        break;
      case "data":
        if (t !== "object") {
          un(e, "data", n);
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
        n = Yt("" + n), e.setAttribute(i, n);
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
          typeof u == "function" && (i === "formAction" ? (t !== "input" && ft(e, t, "name", s.name, s, null), ft(
            e,
            t,
            "formEncType",
            s.formEncType,
            s,
            null
          ), ft(
            e,
            t,
            "formMethod",
            s.formMethod,
            s,
            null
          ), ft(
            e,
            t,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (ft(e, t, "encType", s.encType, s, null), ft(e, t, "method", s.method, s, null), ft(e, t, "target", s.target, s, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          e.removeAttribute(i);
          break;
        }
        n = Yt("" + n), e.setAttribute(i, n);
        break;
      case "onClick":
        n != null && (e.onclick = ci);
        break;
      case "onScroll":
        n != null && We("scroll", e);
        break;
      case "onScrollEnd":
        n != null && We("scrollend", e);
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
        i = Yt("" + n), e.setAttributeNS(
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
        We("beforetoggle", e), We("toggle", e), sa(e, "popover", n);
        break;
      case "xlinkActuate":
        ti(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        ti(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        ti(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        ti(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        ti(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        ti(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        ti(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        ti(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        ti(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        sa(e, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Wl.get(i) || i, sa(e, i, n));
    }
  }
  function Zo(e, t, i, n, s, u) {
    switch (i) {
      case "style":
        Qa(e, n, u);
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
        typeof n == "string" ? fn(e, n) : (typeof n == "number" || typeof n == "bigint") && fn(e, "" + n);
        break;
      case "onScroll":
        n != null && We("scroll", e);
        break;
      case "onScrollEnd":
        n != null && We("scrollend", e);
        break;
      case "onClick":
        n != null && (e.onclick = ci);
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
        if (!Bt.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (s = i.endsWith("Capture"), t = i.slice(2, s ? i.length - 7 : void 0), u = e[Mt] || null, u = u != null ? u[i] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof n == "function")) {
              typeof u != "function" && u !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, n, s);
              break e;
            }
            i in e ? e[i] = n : n === !0 ? e.setAttribute(i, "") : sa(e, i, n);
          }
    }
  }
  function jt(e, t, i) {
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
        We("error", e), We("load", e);
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
                  ft(e, t, u, v, i, null);
              }
          }
        s && ft(e, t, "srcSet", i.srcSet, i, null), n && ft(e, t, "src", i.src, i, null);
        return;
      case "input":
        We("invalid", e);
        var S = u = v = s = null, z = null, j = null;
        for (n in i)
          if (i.hasOwnProperty(n)) {
            var Q = i[n];
            if (Q != null)
              switch (n) {
                case "name":
                  s = Q;
                  break;
                case "type":
                  v = Q;
                  break;
                case "checked":
                  z = Q;
                  break;
                case "defaultChecked":
                  j = Q;
                  break;
                case "value":
                  u = Q;
                  break;
                case "defaultValue":
                  S = Q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Q != null)
                    throw Error(l(137, t));
                  break;
                default:
                  ft(e, t, n, Q, i, null);
              }
          }
        Yl(
          e,
          u,
          S,
          z,
          j,
          v,
          s,
          !1
        );
        return;
      case "select":
        We("invalid", e), n = v = u = null;
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
                ft(e, t, s, S, i, null);
            }
        t = u, i = v, e.multiple = !!n, t != null ? hn(e, !!n, t, !1) : i != null && hn(e, !!n, i, !0);
        return;
      case "textarea":
        We("invalid", e), u = s = n = null;
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
                ft(e, t, v, S, i, null);
            }
        Il(e, n, s, u);
        return;
      case "option":
        for (z in i)
          i.hasOwnProperty(z) && (n = i[z], n != null) && (z === "selected" ? e.selected = n && typeof n != "function" && typeof n != "symbol" : ft(e, t, z, n, i, null));
        return;
      case "dialog":
        We("beforetoggle", e), We("toggle", e), We("cancel", e), We("close", e);
        break;
      case "iframe":
      case "object":
        We("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Ol.length; n++)
          We(Ol[n], e);
        break;
      case "image":
        We("error", e), We("load", e);
        break;
      case "details":
        We("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        We("error", e), We("load", e);
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
        for (j in i)
          if (i.hasOwnProperty(j) && (n = i[j], n != null))
            switch (j) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, t));
              default:
                ft(e, t, j, n, i, null);
            }
        return;
      default:
        if (dn(t)) {
          for (Q in i)
            i.hasOwnProperty(Q) && (n = i[Q], n !== void 0 && Zo(
              e,
              t,
              Q,
              n,
              i,
              void 0
            ));
          return;
        }
    }
    for (S in i)
      i.hasOwnProperty(S) && (n = i[S], n != null && ft(e, t, S, n, i, null));
  }
  function Zg(e, t, i, n) {
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
        var s = null, u = null, v = null, S = null, z = null, j = null, Q = null;
        for (X in i) {
          var te = i[X];
          if (i.hasOwnProperty(X) && te != null)
            switch (X) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                z = te;
              default:
                n.hasOwnProperty(X) || ft(e, t, X, null, n, te);
            }
        }
        for (var G in n) {
          var X = n[G];
          if (te = i[G], n.hasOwnProperty(G) && (X != null || te != null))
            switch (G) {
              case "type":
                u = X;
                break;
              case "name":
                s = X;
                break;
              case "checked":
                j = X;
                break;
              case "defaultChecked":
                Q = X;
                break;
              case "value":
                v = X;
                break;
              case "defaultValue":
                S = X;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (X != null)
                  throw Error(l(137, t));
                break;
              default:
                X !== te && ft(
                  e,
                  t,
                  G,
                  X,
                  n,
                  te
                );
            }
        }
        Ya(
          e,
          v,
          S,
          z,
          j,
          Q,
          u,
          s
        );
        return;
      case "select":
        X = v = S = G = null;
        for (u in i)
          if (z = i[u], i.hasOwnProperty(u) && z != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                X = z;
              default:
                n.hasOwnProperty(u) || ft(
                  e,
                  t,
                  u,
                  null,
                  n,
                  z
                );
            }
        for (s in n)
          if (u = n[s], z = i[s], n.hasOwnProperty(s) && (u != null || z != null))
            switch (s) {
              case "value":
                G = u;
                break;
              case "defaultValue":
                S = u;
                break;
              case "multiple":
                v = u;
              default:
                u !== z && ft(
                  e,
                  t,
                  s,
                  u,
                  n,
                  z
                );
            }
        t = S, i = v, n = X, G != null ? hn(e, !!i, G, !1) : !!n != !!i && (t != null ? hn(e, !!i, t, !0) : hn(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        X = G = null;
        for (S in i)
          if (s = i[S], i.hasOwnProperty(S) && s != null && !n.hasOwnProperty(S))
            switch (S) {
              case "value":
                break;
              case "children":
                break;
              default:
                ft(e, t, S, null, n, s);
            }
        for (v in n)
          if (s = n[v], u = i[v], n.hasOwnProperty(v) && (s != null || u != null))
            switch (v) {
              case "value":
                G = s;
                break;
              case "defaultValue":
                X = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(l(91));
                break;
              default:
                s !== u && ft(e, t, v, s, n, u);
            }
        oa(e, G, X);
        return;
      case "option":
        for (var Se in i)
          G = i[Se], i.hasOwnProperty(Se) && G != null && !n.hasOwnProperty(Se) && (Se === "selected" ? e.selected = !1 : ft(
            e,
            t,
            Se,
            null,
            n,
            G
          ));
        for (z in n)
          G = n[z], X = i[z], n.hasOwnProperty(z) && G !== X && (G != null || X != null) && (z === "selected" ? e.selected = G && typeof G != "function" && typeof G != "symbol" : ft(
            e,
            t,
            z,
            G,
            n,
            X
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
        for (var Pe in i)
          G = i[Pe], i.hasOwnProperty(Pe) && G != null && !n.hasOwnProperty(Pe) && ft(e, t, Pe, null, n, G);
        for (j in n)
          if (G = n[j], X = i[j], n.hasOwnProperty(j) && G !== X && (G != null || X != null))
            switch (j) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(l(137, t));
                break;
              default:
                ft(
                  e,
                  t,
                  j,
                  G,
                  n,
                  X
                );
            }
        return;
      default:
        if (dn(t)) {
          for (var dt in i)
            G = i[dt], i.hasOwnProperty(dt) && G !== void 0 && !n.hasOwnProperty(dt) && Zo(
              e,
              t,
              dt,
              void 0,
              n,
              G
            );
          for (Q in n)
            G = n[Q], X = i[Q], !n.hasOwnProperty(Q) || G === X || G === void 0 && X === void 0 || Zo(
              e,
              t,
              Q,
              G,
              n,
              X
            );
          return;
        }
    }
    for (var P in i)
      G = i[P], i.hasOwnProperty(P) && G != null && !n.hasOwnProperty(P) && ft(e, t, P, null, n, G);
    for (te in n)
      G = n[te], X = i[te], !n.hasOwnProperty(te) || G === X || G == null && X == null || ft(e, t, te, G, n, X);
  }
  function _f(e) {
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
  function Xg() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), n = 0; n < i.length; n++) {
        var s = i[n], u = s.transferSize, v = s.initiatorType, S = s.duration;
        if (u && S && _f(v)) {
          for (v = 0, S = s.responseEnd, n += 1; n < i.length; n++) {
            var z = i[n], j = z.startTime;
            if (j > S) break;
            var Q = z.transferSize, te = z.initiatorType;
            Q && _f(te) && (z = z.responseEnd, v += Q * (z < S ? 1 : (S - j) / (z - j)));
          }
          if (--n, t += 8 * (u + v) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Xo = null, Yo = null;
  function Xr(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ef(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function bf(e, t) {
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
  function Io(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Qo = null;
  function Yg() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Qo ? !1 : (Qo = e, !0) : (Qo = null, !1);
  }
  var Rf = typeof setTimeout == "function" ? setTimeout : void 0, Ig = typeof clearTimeout == "function" ? clearTimeout : void 0, Cf = typeof Promise == "function" ? Promise : void 0, Qg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cf < "u" ? function(e) {
    return Cf.resolve(null).then(e).catch(Wg);
  } : Rf;
  function Wg(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Mn(e) {
    return e === "head";
  }
  function Df(e, t) {
    var i = t, n = 0;
    do {
      var s = i.nextSibling;
      if (e.removeChild(i), s && s.nodeType === 8)
        if (i = s.data, i === "/$" || i === "/&") {
          if (n === 0) {
            e.removeChild(s), Ua(t);
            return;
          }
          n--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          n++;
        else if (i === "html")
          zl(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, zl(i);
          for (var u = i.firstChild; u; ) {
            var v = u.nextSibling, S = u.nodeName;
            u[Di] || S === "SCRIPT" || S === "STYLE" || S === "LINK" && u.rel.toLowerCase() === "stylesheet" || i.removeChild(u), u = v;
          }
        } else
          i === "body" && zl(e.ownerDocument.body);
      i = s;
    } while (i);
    Ua(t);
  }
  function Of(e, t) {
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
  function Wo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Wo(i), on(i);
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
  function Kg(e, t, i, n) {
    for (; e.nodeType === 1; ) {
      var s = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (n) {
        if (!e[Di])
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
      if (e = vi(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Jg(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = vi(e.nextSibling), e === null)) return null;
    return e;
  }
  function Af(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = vi(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ko(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Jo(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function $g(e, t) {
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
  function vi(e) {
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
  var $o = null;
  function zf(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return vi(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Mf(e) {
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
  function Bf(e, t, i) {
    switch (t = Xr(i), e) {
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
  function zl(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    on(e);
  }
  var yi = /* @__PURE__ */ new Map(), Hf = /* @__PURE__ */ new Set();
  function Yr(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ln = ne.d;
  ne.d = {
    f: em,
    r: tm,
    D: im,
    C: nm,
    L: am,
    m: lm,
    X: sm,
    S: rm,
    M: om
  };
  function em() {
    var e = ln.f(), t = Ur();
    return e || t;
  }
  function tm(e) {
    var t = Ti(e);
    t !== null && t.tag === 5 && t.type === "form" ? Wc(t) : ln.r(e);
  }
  var Na = typeof document > "u" ? null : document;
  function Nf(e, t, i) {
    var n = Na;
    if (n && typeof t == "string" && t) {
      var s = Vt(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof i == "string" && (s += '[crossorigin="' + i + '"]'), Hf.has(s) || (Hf.add(s), e = { rel: e, crossOrigin: i, href: t }, n.querySelector(s) === null && (t = n.createElement("link"), jt(t, "link", e), xt(t), n.head.appendChild(t)));
    }
  }
  function im(e) {
    ln.D(e), Nf("dns-prefetch", e, null);
  }
  function nm(e, t) {
    ln.C(e, t), Nf("preconnect", e, t);
  }
  function am(e, t, i) {
    ln.L(e, t, i);
    var n = Na;
    if (n && e && t) {
      var s = 'link[rel="preload"][as="' + Vt(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (s += '[imagesrcset="' + Vt(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (s += '[imagesizes="' + Vt(
        i.imageSizes
      ) + '"]')) : s += '[href="' + Vt(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = Pa(e);
          break;
        case "script":
          u = La(e);
      }
      yi.has(u) || (e = m(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), yi.set(u, e), n.querySelector(s) !== null || t === "style" && n.querySelector(Ml(u)) || t === "script" && n.querySelector(Bl(u)) || (t = n.createElement("link"), jt(t, "link", e), xt(t), n.head.appendChild(t)));
    }
  }
  function lm(e, t) {
    ln.m(e, t);
    var i = Na;
    if (i && e) {
      var n = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Vt(n) + '"][href="' + Vt(e) + '"]', u = s;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = La(e);
      }
      if (!yi.has(u) && (e = m({ rel: "modulepreload", href: e }, t), yi.set(u, e), i.querySelector(s) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Bl(u)))
              return;
        }
        n = i.createElement("link"), jt(n, "link", e), xt(n), i.head.appendChild(n);
      }
    }
  }
  function rm(e, t, i) {
    ln.S(e, t, i);
    var n = Na;
    if (n && e) {
      var s = zi(n).hoistableStyles, u = Pa(e);
      t = t || "default";
      var v = s.get(u);
      if (!v) {
        var S = { loading: 0, preload: null };
        if (v = n.querySelector(
          Ml(u)
        ))
          S.loading = 5;
        else {
          e = m(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = yi.get(u)) && eu(e, i);
          var z = v = n.createElement("link");
          xt(z), jt(z, "link", e), z._p = new Promise(function(j, Q) {
            z.onload = j, z.onerror = Q;
          }), z.addEventListener("load", function() {
            S.loading |= 1;
          }), z.addEventListener("error", function() {
            S.loading |= 2;
          }), S.loading |= 4, Ir(v, t, n);
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
  function sm(e, t) {
    ln.X(e, t);
    var i = Na;
    if (i && e) {
      var n = zi(i).hoistableScripts, s = La(e), u = n.get(s);
      u || (u = i.querySelector(Bl(s)), u || (e = m({ src: e, async: !0 }, t), (t = yi.get(s)) && tu(e, t), u = i.createElement("script"), xt(u), jt(u, "link", e), i.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(s, u));
    }
  }
  function om(e, t) {
    ln.M(e, t);
    var i = Na;
    if (i && e) {
      var n = zi(i).hoistableScripts, s = La(e), u = n.get(s);
      u || (u = i.querySelector(Bl(s)), u || (e = m({ src: e, async: !0, type: "module" }, t), (t = yi.get(s)) && tu(e, t), u = i.createElement("script"), xt(u), jt(u, "link", e), i.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(s, u));
    }
  }
  function Pf(e, t, i, n) {
    var s = (s = Be.current) ? Yr(s) : null;
    if (!s) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = Pa(i.href), i = zi(
          s
        ).hoistableStyles, n = i.get(t), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = Pa(i.href);
          var u = zi(
            s
          ).hoistableStyles, v = u.get(e);
          if (v || (s = s.ownerDocument || s, v = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, v), (u = s.querySelector(
            Ml(e)
          )) && !u._p && (v.instance = u, v.state.loading = 5), yi.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, yi.set(e, i), u || um(
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
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = La(i), i = zi(
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
  function Pa(e) {
    return 'href="' + Vt(e) + '"';
  }
  function Ml(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Lf(e) {
    return m({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function um(e, t, i, n) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
      return n.loading |= 1;
    }), t.addEventListener("error", function() {
      return n.loading |= 2;
    }), jt(t, "link", i), xt(t), e.head.appendChild(t));
  }
  function La(e) {
    return '[src="' + Vt(e) + '"]';
  }
  function Bl(e) {
    return "script[async]" + e;
  }
  function Uf(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var n = e.querySelector(
            'style[data-href~="' + Vt(i.href) + '"]'
          );
          if (n)
            return t.instance = n, xt(n), n;
          var s = m({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return n = (e.ownerDocument || e).createElement(
            "style"
          ), xt(n), jt(n, "style", s), Ir(n, i.precedence, e), t.instance = n;
        case "stylesheet":
          s = Pa(i.href);
          var u = e.querySelector(
            Ml(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, xt(u), u;
          n = Lf(i), (s = yi.get(s)) && eu(n, s), u = (e.ownerDocument || e).createElement("link"), xt(u);
          var v = u;
          return v._p = new Promise(function(S, z) {
            v.onload = S, v.onerror = z;
          }), jt(u, "link", n), t.state.loading |= 4, Ir(u, i.precedence, e), t.instance = u;
        case "script":
          return u = La(i.src), (s = e.querySelector(
            Bl(u)
          )) ? (t.instance = s, xt(s), s) : (n = i, (s = yi.get(u)) && (n = m({}, i), tu(n, s)), e = e.ownerDocument || e, s = e.createElement("script"), xt(s), jt(s, "link", n), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(l(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, Ir(n, i.precedence, e));
    return t.instance;
  }
  function Ir(e, t, i) {
    for (var n = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = n.length ? n[n.length - 1] : null, u = s, v = 0; v < n.length; v++) {
      var S = n[v];
      if (S.dataset.precedence === t) u = S;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function eu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function tu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Qr = null;
  function jf(e, t, i) {
    if (Qr === null) {
      var n = /* @__PURE__ */ new Map(), s = Qr = /* @__PURE__ */ new Map();
      s.set(i, n);
    } else
      s = Qr, n = s.get(i), n || (n = /* @__PURE__ */ new Map(), s.set(i, n));
    if (n.has(e)) return n;
    for (n.set(e, null), i = i.getElementsByTagName(e), s = 0; s < i.length; s++) {
      var u = i[s];
      if (!(u[Di] || u[yt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var v = u.getAttribute(t) || "";
        v = e + v;
        var S = n.get(v);
        S ? S.push(u) : n.set(v, [u]);
      }
    }
    return n;
  }
  function Ff(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function cm(e, t, i) {
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
  function Gf(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function hm(e, t, i, n) {
    if (i.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var s = Pa(n.href), u = t.querySelector(
          Ml(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Wr.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = u, xt(u);
          return;
        }
        u = t.ownerDocument || t, n = Lf(n), (s = yi.get(s)) && eu(n, s), u = u.createElement("link"), xt(u);
        var v = u;
        v._p = new Promise(function(S, z) {
          v.onload = S, v.onerror = z;
        }), jt(u, "link", n), i.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Wr.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var iu = 0;
  function fm(e, t) {
    return e.stylesheets && e.count === 0 && Jr(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var n = setTimeout(function() {
        if (e.stylesheets && Jr(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && iu === 0 && (iu = 62500 * Xg());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Jr(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > iu ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(n), clearTimeout(s);
      };
    } : null;
  }
  function Wr() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Jr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Kr = null;
  function Jr(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Kr = /* @__PURE__ */ new Map(), t.forEach(dm, e), Kr = null, Wr.call(e));
  }
  function dm(e, t) {
    if (!(t.state.loading & 4)) {
      var i = Kr.get(e);
      if (i) var n = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Kr.set(e, i);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var v = s[u];
          (v.nodeName === "LINK" || v.getAttribute("media") !== "not all") && (i.set(v.dataset.precedence, v), n = v);
        }
        n && i.set(null, n);
      }
      s = t.instance, v = s.getAttribute("data-precedence"), u = i.get(v) || n, u === n && i.set(null, s), i.set(v, s), this.count++, n = Wr.bind(this), s.addEventListener("load", n), s.addEventListener("error", n), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Hl = {
    $$typeof: Z,
    Provider: null,
    Consumer: null,
    _currentValue: ge,
    _currentValue2: ge,
    _threadCount: 0
  };
  function gm(e, t, i, n, s, u, v, S, z) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Fn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fn(0), this.hiddenUpdates = Fn(null), this.identifierPrefix = n, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = v, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = z, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function kf(e, t, i, n, s, u, v, S, z, j, Q, te) {
    return e = new gm(
      e,
      t,
      i,
      v,
      z,
      j,
      Q,
      te,
      S
    ), t = 1, u === !0 && (t |= 24), u = ni(3, null, null, t), e.current = u, u.stateNode = e, t = Hs(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: i,
      cache: t
    }, Us(u), e;
  }
  function Vf(e) {
    return e ? (e = ga, e) : ga;
  }
  function qf(e, t, i, n, s, u) {
    s = Vf(s), n.context === null ? n.context = s : n.pendingContext = s, n = wn(t), n.payload = { element: i }, u = u === void 0 ? null : u, u !== null && (n.callback = u), i = Sn(e, n, t), i !== null && ($t(i, e, t), fl(i, e, t));
  }
  function Zf(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function nu(e, t) {
    Zf(e, t), (e = e.alternate) && Zf(e, t);
  }
  function Xf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xn(e, 67108864);
      t !== null && $t(t, e, 67108864), nu(e, 67108864);
    }
  }
  function Yf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = oi();
      t = la(t);
      var i = Xn(e, t);
      i !== null && $t(i, e, t), nu(e, t);
    }
  }
  var $r = !0;
  function mm(e, t, i, n) {
    var s = V.T;
    V.T = null;
    var u = ne.p;
    try {
      ne.p = 2, au(e, t, i, n);
    } finally {
      ne.p = u, V.T = s;
    }
  }
  function pm(e, t, i, n) {
    var s = V.T;
    V.T = null;
    var u = ne.p;
    try {
      ne.p = 8, au(e, t, i, n);
    } finally {
      ne.p = u, V.T = s;
    }
  }
  function au(e, t, i, n) {
    if ($r) {
      var s = lu(n);
      if (s === null)
        qo(
          e,
          t,
          n,
          es,
          i
        ), Qf(e, n);
      else if (ym(
        s,
        e,
        t,
        i,
        n
      ))
        n.stopPropagation();
      else if (Qf(e, n), t & 4 && -1 < vm.indexOf(e)) {
        for (; s !== null; ) {
          var u = Ti(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var v = kt(u.pendingLanes);
                  if (v !== 0) {
                    var S = u;
                    for (S.pendingLanes |= 2, S.entangledLanes |= 2; v; ) {
                      var z = 1 << 31 - Ue(v);
                      S.entanglements[1] |= z, v &= ~z;
                    }
                    Li(u), (st & 6) === 0 && (Pr = oe() + 500, Dl(0));
                  }
                }
                break;
              case 31:
              case 13:
                S = Xn(u, 2), S !== null && $t(S, u, 2), Ur(), nu(u, 2);
            }
          if (u = lu(n), u === null && qo(
            e,
            t,
            n,
            es,
            i
          ), u === s) break;
          s = u;
        }
        s !== null && n.stopPropagation();
      } else
        qo(
          e,
          t,
          n,
          null,
          i
        );
    }
  }
  function lu(e) {
    return e = ua(e), ru(e);
  }
  var es = null;
  function ru(e) {
    if (es = null, e = Oi(e), e !== null) {
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
    return es = e, null;
  }
  function If(e) {
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
        switch (we()) {
          case fe:
            return 2;
          case ye:
            return 8;
          case Me:
          case x:
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
  var su = !1, Bn = null, Hn = null, Nn = null, Nl = /* @__PURE__ */ new Map(), Pl = /* @__PURE__ */ new Map(), Pn = [], vm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Qf(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Bn = null;
        break;
      case "dragenter":
      case "dragleave":
        Hn = null;
        break;
      case "mouseover":
      case "mouseout":
        Nn = null;
        break;
      case "pointerover":
      case "pointerout":
        Nl.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pl.delete(t.pointerId);
    }
  }
  function Ll(e, t, i, n, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = Ti(t), t !== null && Xf(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function ym(e, t, i, n, s) {
    switch (t) {
      case "focusin":
        return Bn = Ll(
          Bn,
          e,
          t,
          i,
          n,
          s
        ), !0;
      case "dragenter":
        return Hn = Ll(
          Hn,
          e,
          t,
          i,
          n,
          s
        ), !0;
      case "mouseover":
        return Nn = Ll(
          Nn,
          e,
          t,
          i,
          n,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return Nl.set(
          u,
          Ll(
            Nl.get(u) || null,
            e,
            t,
            i,
            n,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, Pl.set(
          u,
          Ll(
            Pl.get(u) || null,
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
  function Wf(e) {
    var t = Oi(e.target);
    if (t !== null) {
      var i = r(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = f(i), t !== null) {
            e.blockedOn = t, sn(e.priority, function() {
              Yf(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = d(i), t !== null) {
            e.blockedOn = t, sn(e.priority, function() {
              Yf(i);
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
  function ts(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = lu(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var n = new i.constructor(
          i.type,
          i
        );
        Wa = n, i.target.dispatchEvent(n), Wa = null;
      } else
        return t = Ti(i), t !== null && Xf(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function Kf(e, t, i) {
    ts(e) && i.delete(t);
  }
  function Tm() {
    su = !1, Bn !== null && ts(Bn) && (Bn = null), Hn !== null && ts(Hn) && (Hn = null), Nn !== null && ts(Nn) && (Nn = null), Nl.forEach(Kf), Pl.forEach(Kf);
  }
  function is(e, t) {
    e.blockedOn === t && (e.blockedOn = null, su || (su = !0, Y.unstable_scheduleCallback(
      Y.unstable_NormalPriority,
      Tm
    )));
  }
  var ns = null;
  function Jf(e) {
    ns !== e && (ns = e, Y.unstable_scheduleCallback(
      Y.unstable_NormalPriority,
      function() {
        ns === e && (ns = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], n = e[t + 1], s = e[t + 2];
          if (typeof n != "function") {
            if (ru(n || i) === null)
              continue;
            break;
          }
          var u = Ti(i);
          u !== null && (e.splice(t, 3), t -= 3, ao(
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
  function Ua(e) {
    function t(z) {
      return is(z, e);
    }
    Bn !== null && is(Bn, e), Hn !== null && is(Hn, e), Nn !== null && is(Nn, e), Nl.forEach(t), Pl.forEach(t);
    for (var i = 0; i < Pn.length; i++) {
      var n = Pn[i];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < Pn.length && (i = Pn[0], i.blockedOn === null); )
      Wf(i), i.blockedOn === null && Pn.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (n = 0; n < i.length; n += 3) {
        var s = i[n], u = i[n + 1], v = s[Mt] || null;
        if (typeof u == "function")
          v || Jf(i);
        else if (v) {
          var S = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, v = u[Mt] || null)
              S = v.formAction;
            else if (ru(s) !== null) continue;
          } else S = v.action;
          typeof S == "function" ? i[n + 1] = S : (i.splice(n, 3), n -= 3), Jf(i);
        }
      }
  }
  function $f() {
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
  function ou(e) {
    this._internalRoot = e;
  }
  as.prototype.render = ou.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(l(409));
    var i = t.current, n = oi();
    qf(i, n, e, t, null, null);
  }, as.prototype.unmount = ou.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      qf(e.current, 2, null, e, null, null), Ur(), t[ui] = null;
    }
  };
  function as(e) {
    this._internalRoot = e;
  }
  as.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = _e();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < Pn.length && t !== 0 && t < Pn[i].priority; i++) ;
      Pn.splice(i, 0, e), i === 0 && Wf(e);
    }
  };
  var ed = K.version;
  if (ed !== "19.2.0")
    throw Error(
      l(
        527,
        ed,
        "19.2.0"
      )
    );
  ne.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = c(t), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var xm = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: V,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ls = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ls.isDisabled && ls.supportsFiber)
      try {
        k = ls.inject(
          xm
        ), $ = ls;
      } catch {
      }
  }
  return jl.createRoot = function(e, t) {
    if (!o(e)) throw Error(l(299));
    var i = !1, n = "", s = rh, u = sh, v = oh;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (v = t.onRecoverableError)), t = kf(
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
      $f
    ), e[ui] = t.current, Vo(e), new ou(t);
  }, jl.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(l(299));
    var n = !1, s = "", u = rh, v = sh, S = oh, z = null;
    return i != null && (i.unstable_strictMode === !0 && (n = !0), i.identifierPrefix !== void 0 && (s = i.identifierPrefix), i.onUncaughtError !== void 0 && (u = i.onUncaughtError), i.onCaughtError !== void 0 && (v = i.onCaughtError), i.onRecoverableError !== void 0 && (S = i.onRecoverableError), i.formState !== void 0 && (z = i.formState)), t = kf(
      e,
      1,
      !0,
      t,
      i ?? null,
      n,
      s,
      z,
      u,
      v,
      S,
      $f
    ), t.context = Vf(null), i = t.current, n = oi(), n = la(n), s = wn(n), s.callback = null, Sn(i, s, n), i = n, t.current.lanes = i, ki(t, i), Li(t), e[ui] = t.current, Vo(e), new as(t);
  }, jl.version = "19.2.0", jl;
}
var hd;
function Nm() {
  if (hd) return hu.exports;
  hd = 1;
  function Y() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Y);
      } catch (K) {
        console.error(K);
      }
  }
  return Y(), hu.exports = Hm(), hu.exports;
}
var Pm = Nm(), ae = _u(), rs = { exports: {} }, Lm = rs.exports, fd;
function Um() {
  return fd || (fd = 1, (function(Y) {
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
        var h, c, g, m, T, b, C = arguments[0] || {}, w = arguments.length, A = !1, M = 1;
        for (typeof C == "boolean" && (A = C, C = arguments[1] || {}, M = 2), typeof C != "object" && !K.isFunction(C) && (C = {}), w === M && (C = this, --M); M < w; M++)
          if (h = arguments[M], h !== null || h !== void 0)
            for (c in h) {
              var N = Object.getOwnPropertyDescriptor(h, c);
              if (N !== void 0) {
                if (N.get || N.set) {
                  Object.defineProperty(C, c, N);
                  continue;
                }
                m = N.value;
              } else {
                a.console.warn('Could not copy inherited property "' + c + '".');
                continue;
              }
              C !== m && (A && m && (K.isPlainObject(m) || (T = K.isArray(m))) ? (g = C[c], T ? (T = !1, b = g && K.isArray(g) ? g : []) : b = g && K.isPlainObject(g) ? g : {}, C[c] = K.extend(A, b, m)) : m !== void 0 && (C[c] = m));
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
            var c = new a.Point(), g, m;
            for (h = a.getElement(h), g = a.getElementStyle(h).position === "fixed", m = d(h, g); m; )
              c.x += h.offsetLeft, c.y += h.offsetTop, g && (c = c.plus(a.getPageScroll())), h = m, g = a.getElementStyle(h).position === "fixed", m = d(h, g);
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
            var c = h && h.ownerDocument, g, m, T = { top: 0, left: 0 };
            return c ? (g = c.documentElement, typeof h.getBoundingClientRect < "u" && (T = h.getBoundingClientRect()), m = c === c.window ? c : c.nodeType === 9 ? c.defaultView || c.parentWindow : !1, new a.Point(
              T.left + (m.pageXOffset || g.scrollLeft) - (g.clientLeft || 0),
              T.top + (m.pageYOffset || g.scrollTop) - (g.clientTop || 0)
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
              var m = document.createElement("div").style, T = null;
              if (m[g] !== void 0)
                T = g;
              else
                for (var b = [
                  "Webkit",
                  "Moz",
                  "MS",
                  "O",
                  "webkit",
                  "moz",
                  "ms",
                  "o"
                ], C = a.capitalizeFirstLetter(g), w = 0; w < b.length; w++) {
                  var A = b[w] + C;
                  if (m[A] !== void 0) {
                    T = A;
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
            var g = a.getElementOffset(h), m = a.getElementSize(h);
            return c.x >= g.x && c.x < g.x + m.x && c.y < g.y + m.y && c.y >= g.y;
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
              a.setPageScroll = function(m) {
                window.scrollTo(m.x, m.y);
              };
            else {
              var c = a.getPageScroll();
              if (c.x === h.x && c.y === h.y)
                return;
              document.body.scrollLeft = h.x, document.body.scrollTop = h.y;
              var g = a.getPageScroll();
              if (g.x !== c.x && g.y !== c.y) {
                a.setPageScroll = function(m) {
                  document.body.scrollLeft = m.x, document.body.scrollTop = m.y;
                };
                return;
              }
              if (document.documentElement.scrollLeft = h.x, document.documentElement.scrollTop = h.y, g = a.getPageScroll(), g.x !== c.x && g.y !== c.y) {
                a.setPageScroll = function(m) {
                  document.documentElement.scrollLeft = m.x, document.documentElement.scrollTop = m.y;
                };
                return;
              }
              a.setPageScroll = function(m) {
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
            var m, T;
            h = a.getElement(h), g && !a.Browser.alpha && (c = Math.round(c)), a.Browser.opacity ? h.style.opacity = c < 1 ? c : "" : c < 1 ? (m = Math.round(100 * c), T = "alpha(opacity=" + m + ")", h.style.filter = T) : h.style.filter = "";
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
            return Array.prototype.indexOf ? this.indexOf = function(m, T, b) {
              return m.indexOf(T, b);
            } : this.indexOf = function(m, T, b) {
              var C, w = b || 0, A;
              if (!m)
                throw new TypeError();
              if (A = m.length, A === 0 || w >= A)
                return -1;
              for (w < 0 && (w = A - Math.abs(w)), C = w; C < A; C++)
                if (m[C] === T)
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
            var g, m = [], T;
            for (h = a.getElement(h), g = h.className.split(/\s+/), T = 0; T < g.length; T++)
              g[T] && g[T] !== c && m.push(g[T]);
            h.className = m.join(" ");
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
              return function(h, c, g, m) {
                m = a.normalizeEventListenerOptions(m), h = a.getElement(h), h.addEventListener(c, g, m);
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
              return function(h, c, g, m) {
                m = a.normalizeEventListenerOptions(m), h = a.getElement(h), h.removeEventListener(c, g, m);
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
            var g = [], m;
            for (m = 2; m < arguments.length; m++)
              g.push(arguments[m]);
            return function() {
              var T = g.concat([]), b;
              for (b = 0; b < arguments.length; b++)
                T.push(arguments[b]);
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
            var m, T, b, C;
            a.isPlainObject(h) && (c = h.success, g = h.error, m = h.withCredentials, T = h.headers, b = h.responseType || null, C = h.postData || null, h = h.url);
            var w = a.getUrlProtocol(h), A = a.createAjaxRequest();
            if (!a.isFunction(c))
              throw new Error("makeAjaxRequest requires a success callback");
            A.onreadystatechange = function() {
              A.readyState === 4 && (A.onreadystatechange = function() {
              }, A.status >= 200 && A.status < 300 || A.status === 0 && w !== "http:" && w !== "https:" ? c(A) : a.isFunction(g) ? g(A) : a.console.error("AJAX request returned %d: %s", A.status, h));
            };
            var M = C ? "POST" : "GET";
            try {
              if (A.open(M, h, !0), b && (A.responseType = b), T)
                for (var N in T)
                  Object.prototype.hasOwnProperty.call(T, N) && T[N] && A.setRequestHeader(N, T[N]);
              m && (A.withCredentials = !0), A.send(C);
            } catch (Z) {
              a.console.error("%s while making AJAX request: %s", Z.name, Z.message), A.onreadystatechange = function() {
              }, a.isFunction(g) && g(A, Z);
            }
            return A;
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
            var c, g = h.url, m = document.head || document.getElementsByTagName("head")[0] || document.documentElement, T = h.callbackName || "openseadragon" + a.now(), b = window[T], C = "$1" + T + "$2", w = h.param || "callback", A = h.callback;
            g = g.replace(/(=)\?(&|$)|\?\?/i, C), g += (/\?/.test(g) ? "&" : "?") + w + "=" + T, window[T] = function(M) {
              if (b)
                window[T] = b;
              else
                try {
                  delete window[T];
                } catch {
                }
              A && a.isFunction(A) && A(M);
            }, c = document.createElement("script"), (h.async !== void 0 || h.async !== !1) && (c.async = "async"), h.scriptCharset && (c.charset = h.scriptCharset), c.src = g, c.onload = c.onreadystatechange = function(M, N) {
              (N || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, m && c.parentNode && m.removeChild(c), c = void 0);
            }, m.insertBefore(c, m.firstChild);
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
                var g = null, m;
                return m = new DOMParser(), g = m.parseFromString(c, "text/xml"), g;
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
        var m = window.location.search.substring(1), T = m.split("&"), b, C, w;
        for (w = 0; w < T.length; w++)
          if (b = T[w], C = b.indexOf("="), C > 0) {
            var A = b.substring(0, C), M = b.substring(C + 1);
            try {
              f[A] = decodeURIComponent(M);
            } catch {
              a.console.error("Ignoring malformed URL parameter: %s=%s", A, M);
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
          var m = [], T = [], b = 0, C;
          a.requestAnimationFrame = function(w) {
            return m.push([++b, w]), C || (C = setInterval(function() {
              if (m.length) {
                var A = a.now(), M = T;
                for (T = m, m = M; T.length; )
                  T.shift()[1](A);
              } else
                clearInterval(C), C = void 0;
            }, 1e3 / 50)), b;
          }, a.cancelAnimationFrame = function(w) {
            var A, M;
            for (A = 0, M = m.length; A < M; A += 1)
              if (m[A][0] === w) {
                m.splice(A, 1);
                return;
              }
            for (A = 0, M = T.length; A < M; A += 1)
              if (T[A][0] === w) {
                T.splice(A, 1);
                return;
              }
          };
        }
      })(window);
      function d(h, c) {
        return c && h !== document.body ? document.body : h.offsetParent;
      }
    })(K), (function(a, l) {
      Y.exports ? Y.exports = l() : a.OpenSeadragon = l();
    })(Lm, function() {
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
          var h = f[0], c = f[1], g = f[2], m = f[3], T = f[4], b = f[5], C = f[6], w = f[7], A = f[8], M = d[0], N = d[1], Z = d[2], ie = d[3], se = d[4], de = d[5], ue = d[6], Te = d[7], Ce = d[8];
          return new l([
            M * h + N * m + Z * C,
            M * c + N * T + Z * w,
            M * g + N * b + Z * A,
            ie * h + se * m + de * C,
            ie * c + se * T + de * w,
            ie * g + se * b + de * A,
            ue * h + Te * m + Ce * C,
            ue * c + Te * T + Ce * w,
            ue * g + Te * b + Ce * A
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
          var c = 0, g = function(m) {
            return c++, c === f && h.removeHandler(l, g), o(m);
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
      a.MouseTracker = function(x) {
        var y = arguments;
        a.isPlainObject(x) || (x = {
          element: y[0],
          clickTimeThreshold: y[1],
          clickDistThreshold: y[2]
        }), this.hash = Math.random(), this.element = a.getElement(x.element), this.clickTimeThreshold = x.clickTimeThreshold || a.DEFAULT_SETTINGS.clickTimeThreshold, this.clickDistThreshold = x.clickDistThreshold || a.DEFAULT_SETTINGS.clickDistThreshold, this.dblClickTimeThreshold = x.dblClickTimeThreshold || a.DEFAULT_SETTINGS.dblClickTimeThreshold, this.dblClickDistThreshold = x.dblClickDistThreshold || a.DEFAULT_SETTINGS.dblClickDistThreshold, this.userData = x.userData || null, this.stopDelay = x.stopDelay || 50, this.preProcessEventHandler = x.preProcessEventHandler || null, this.contextMenuHandler = x.contextMenuHandler || null, this.enterHandler = x.enterHandler || null, this.leaveHandler = x.leaveHandler || null, this.exitHandler = x.exitHandler || null, this.overHandler = x.overHandler || null, this.outHandler = x.outHandler || null, this.pressHandler = x.pressHandler || null, this.nonPrimaryPressHandler = x.nonPrimaryPressHandler || null, this.releaseHandler = x.releaseHandler || null, this.nonPrimaryReleaseHandler = x.nonPrimaryReleaseHandler || null, this.moveHandler = x.moveHandler || null, this.scrollHandler = x.scrollHandler || null, this.clickHandler = x.clickHandler || null, this.dblClickHandler = x.dblClickHandler || null, this.dragHandler = x.dragHandler || null, this.dragEndHandler = x.dragEndHandler || null, this.pinchHandler = x.pinchHandler || null, this.stopHandler = x.stopHandler || null, this.keyDownHandler = x.keyDownHandler || null, this.keyUpHandler = x.keyUpHandler || null, this.keyHandler = x.keyHandler || null, this.focusHandler = x.focusHandler || null, this.blurHandler = x.blurHandler || null;
        var _ = this;
        l[this.hash] = {
          click: function(D) {
            Z(_, D);
          },
          dblclick: function(D) {
            ie(_, D);
          },
          keydown: function(D) {
            se(_, D);
          },
          keyup: function(D) {
            de(_, D);
          },
          keypress: function(D) {
            ue(_, D);
          },
          focus: function(D) {
            Te(_, D);
          },
          blur: function(D) {
            Ce(_, D);
          },
          contextmenu: function(D) {
            ke(_, D);
          },
          wheel: function(D) {
            Le(_, D);
          },
          mousewheel: function(D) {
            ve(_, D);
          },
          DOMMouseScroll: function(D) {
            ve(_, D);
          },
          MozMousePixelScroll: function(D) {
            ve(_, D);
          },
          losecapture: function(D) {
            Ke(_, D);
          },
          mouseenter: function(D) {
            J(_, D);
          },
          mouseleave: function(D) {
            ce(_, D);
          },
          mouseover: function(D) {
            Ee(_, D);
          },
          mouseout: function(D) {
            Be(_, D);
          },
          mousedown: function(D) {
            Fe(_, D);
          },
          mouseup: function(D) {
            lt(_, D);
          },
          mousemove: function(D) {
            be(_, D);
          },
          touchstart: function(D) {
            Ie(_, D);
          },
          touchend: function(D) {
            V(_, D);
          },
          touchmove: function(D) {
            ne(_, D);
          },
          touchcancel: function(D) {
            ge(_, D);
          },
          gesturestart: function(D) {
            ze(_, D);
          },
          // Safari/Safari iOS
          gesturechange: function(D) {
            He(_, D);
          },
          // Safari/Safari iOS
          gotpointercapture: function(D) {
            B(_, D);
          },
          lostpointercapture: function(D) {
            I(_, D);
          },
          pointerenter: function(D) {
            J(_, D);
          },
          pointerleave: function(D) {
            ce(_, D);
          },
          pointerover: function(D) {
            Ee(_, D);
          },
          pointerout: function(D) {
            Be(_, D);
          },
          pointerdown: function(D) {
            Fe(_, D);
          },
          pointerup: function(D) {
            lt(_, D);
          },
          pointermove: function(D) {
            be(_, D);
          },
          pointercancel: function(D) {
            Ye(_, D);
          },
          pointerupcaptured: function(D) {
            rt(_, D);
          },
          pointermovecaptured: function(D) {
            xe(_, D);
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
        }, this.hasGestureHandlers = !!(this.pressHandler || this.nonPrimaryPressHandler || this.releaseHandler || this.nonPrimaryReleaseHandler || this.clickHandler || this.dblClickHandler || this.dragHandler || this.dragEndHandler || this.pinchHandler), this.hasScrollHandler = !!this.scrollHandler, a.MouseTracker.havePointerEvents && a.setElementPointerEvents(this.element, "auto"), this.exitHandler && a.console.error("MouseTracker.exitHandler is deprecated. Use MouseTracker.leaveHandler instead."), x.startDisabled || this.setTracking(!0);
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
        setTracking: function(x) {
          return x ? d(this) : h(this), this;
        },
        /**
         * Returns the {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} for the given pointer device type,
         * creating and caching a new {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} if one doesn't already exist for the type.
         * @function
         * @param {String} type - The pointer device type: "mouse", "touch", "pen", etc.
         * @returns {OpenSeadragon.MouseTracker.GesturePointList}
         */
        getActivePointersListByType: function(x) {
          var y = l[this.hash], _, D = y ? y.activePointersLists.length : 0, k;
          for (_ = 0; _ < D; _++)
            if (y.activePointersLists[_].type === x)
              return y.activePointersLists[_];
          return k = new a.MouseTracker.GesturePointList(x), y && y.activePointersLists.push(k), k;
        },
        /**
         * Returns the total number of pointers currently active on the tracked element.
         * @function
         * @returns {Number}
         */
        getActivePointerCount: function() {
          var x = l[this.hash], y, _ = x.activePointersLists.length, D = 0;
          for (y = 0; y < _; y++)
            D += x.activePointersLists[y].getLength();
          return D;
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
      function r(x) {
        try {
          return x.addEventListener && x.removeEventListener;
        } catch {
          return !1;
        }
      }
      a.MouseTracker.gesturePointVelocityTracker = /* @__PURE__ */ (function() {
        var x = [], y = 0, _ = 0, D = function(Ue, De) {
          return Ue.hash.toString() + De.type + De.id.toString();
        }, k = function() {
          var Ue, De = x.length, zt, je, it = a.now(), Gi, bi, kt;
          for (Gi = it - _, _ = it, Ue = 0; Ue < De; Ue++)
            zt = x[Ue], je = zt.gPoint, je.direction = Math.atan2(je.currentPos.y - zt.lastPos.y, je.currentPos.x - zt.lastPos.x), bi = zt.lastPos.distanceTo(je.currentPos), zt.lastPos = je.currentPos, kt = 1e3 * bi / (Gi + 1), je.speed = 0.75 * kt + 0.25 * je.speed;
        }, $ = function(Ue, De) {
          var zt = D(Ue, De);
          x.push(
            {
              guid: zt,
              gPoint: De,
              lastPos: De.currentPos
            }
          ), x.length === 1 && (_ = a.now(), y = window.setInterval(k, 50));
        }, me = function(Ue, De) {
          var zt = D(Ue, De), je, it = x.length;
          for (je = 0; je < it; je++)
            if (x[je].guid === zt) {
              x.splice(je, 1), it--, it === 0 && window.clearInterval(y);
              break;
            }
        };
        return {
          addPoint: $,
          removePoint: me
        };
      })(), a.MouseTracker.captureElement = document, a.MouseTracker.wheelEventName = "onwheel" in document.createElement("div") ? "wheel" : (
        // Modern browsers support 'wheel'
        document.onmousewheel !== void 0 ? "mousewheel" : (
          // Webkit (and unsupported IE) support at least 'mousewheel'
          "DOMMouseScroll"
        )
      ), a.MouseTracker.subscribeEvents = ["click", "dblclick", "keydown", "keyup", "keypress", "focus", "blur", "contextmenu", a.MouseTracker.wheelEventName], a.MouseTracker.wheelEventName === "DOMMouseScroll" && a.MouseTracker.subscribeEvents.push("MozMousePixelScroll"), window.PointerEvent ? (a.MouseTracker.havePointerEvents = !0, a.MouseTracker.subscribeEvents.push("pointerenter", "pointerleave", "pointerover", "pointerout", "pointerdown", "pointerup", "pointermove", "pointercancel"), a.MouseTracker.havePointerCapture = (function() {
        var x = document.createElement("div");
        return a.isFunction(x.setPointerCapture) && a.isFunction(x.releasePointerCapture);
      })(), a.MouseTracker.havePointerCapture && a.MouseTracker.subscribeEvents.push("gotpointercapture", "lostpointercapture")) : (a.MouseTracker.havePointerEvents = !1, a.MouseTracker.subscribeEvents.push("mouseenter", "mouseleave", "mouseover", "mouseout", "mousedown", "mouseup", "mousemove"), a.MouseTracker.mousePointerId = "legacy-mouse", a.MouseTracker.havePointerCapture = (function() {
        var x = document.createElement("div");
        return a.isFunction(x.setCapture) && a.isFunction(x.releaseCapture);
      })(), a.MouseTracker.havePointerCapture && a.MouseTracker.subscribeEvents.push("losecapture"), "ontouchstart" in window && a.MouseTracker.subscribeEvents.push("touchstart", "touchend", "touchmove", "touchcancel"), "ongesturestart" in window && a.MouseTracker.subscribeEvents.push("gesturestart", "gesturechange")), a.MouseTracker.GesturePointList = function(x) {
        this._gPoints = [], this.type = x, this.buttons = 0, this.contacts = 0, this.clicks = 0, this.captureCount = 0;
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
        add: function(x) {
          return this._gPoints.push(x);
        },
        /**
         * @function
         * @param {Number} id - The id of the gesture point to remove from the list.
         * @returns {Number} Number of gesture points in the list.
         */
        removeById: function(x) {
          var y, _ = this._gPoints.length;
          for (y = 0; y < _; y++)
            if (this._gPoints[y].id === x) {
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
        getByIndex: function(x) {
          return x < this._gPoints.length ? this._gPoints[x] : null;
        },
        /**
         * @function
         * @param {Number} id - The id of the gesture point to retrieve from the list.
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The gesture point with the given id, or null if not found.
         */
        getById: function(x) {
          var y, _ = this._gPoints.length;
          for (y = 0; y < _; y++)
            if (this._gPoints[y].id === x)
              return this._gPoints[y];
          return null;
        },
        /**
         * @function
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The primary gesture point in the list, or null if not found.
         */
        getPrimary: function(x) {
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
      function f(x) {
        var y = l[x.hash], _, D, k, $, me, Ue = y.activePointersLists.length;
        for (_ = 0; _ < Ue; _++)
          if (k = y.activePointersLists[_], k.getLength() > 0) {
            for (me = [], $ = k.asArray(), D = 0; D < $.length; D++)
              me.push($[D]);
            for (D = 0; D < me.length; D++)
              wt(x, k, me[D]);
          }
        for (_ = 0; _ < Ue; _++)
          y.activePointersLists.pop();
        y.sentDragEvent = !1;
      }
      function d(x) {
        var y = l[x.hash], _, D;
        if (!y.tracking) {
          for (D = 0; D < a.MouseTracker.subscribeEvents.length; D++)
            _ = a.MouseTracker.subscribeEvents[D], a.addEvent(
              x.element,
              _,
              y[_],
              _ === a.MouseTracker.wheelEventName ? { passive: !1, capture: !1 } : !1
            );
          f(x), y.tracking = !0;
        }
      }
      function h(x) {
        var y = l[x.hash], _, D;
        if (y.tracking) {
          for (D = 0; D < a.MouseTracker.subscribeEvents.length; D++)
            _ = a.MouseTracker.subscribeEvents[D], a.removeEvent(
              x.element,
              _,
              y[_],
              !1
            );
          f(x), y.tracking = !1;
        }
      }
      function c(x, y) {
        var _ = l[x.hash];
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
      function g(x, y) {
        var _;
        if (a.MouseTracker.havePointerCapture)
          if (a.MouseTracker.havePointerEvents)
            try {
              x.element.setPointerCapture(y.id);
            } catch {
              a.console.warn("setPointerCapture() called on invalid pointer ID");
              return;
            }
          else
            x.element.setCapture(!0);
        else
          _ = c(x, a.MouseTracker.havePointerEvents ? "pointerevent" : y.type), o && r(window.top) && a.addEvent(
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
        L(x, y, !0);
      }
      function m(x, y) {
        var _, D, k;
        if (a.MouseTracker.havePointerCapture)
          if (a.MouseTracker.havePointerEvents) {
            if (D = x.getActivePointersListByType(y.type), k = D.getById(y.id), !k || !k.captured)
              return;
            try {
              x.element.releasePointerCapture(y.id);
            } catch {
            }
          } else
            x.element.releaseCapture();
        else
          _ = c(x, a.MouseTracker.havePointerEvents ? "pointerevent" : y.type), o && r(window.top) && a.removeEvent(
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
        L(x, y, !1);
      }
      function T(x) {
        return a.MouseTracker.havePointerEvents ? x.pointerId : a.MouseTracker.mousePointerId;
      }
      function b(x) {
        return a.MouseTracker.havePointerEvents && x.pointerType ? x.pointerType : "mouse";
      }
      function C(x) {
        return a.MouseTracker.havePointerEvents ? x.isPrimary : !0;
      }
      function w(x) {
        return a.getMousePosition(x);
      }
      function A(x, y) {
        return M(w(x), y);
      }
      function M(x, y) {
        var _ = a.getElementOffset(y);
        return x.minus(_);
      }
      function N(x, y) {
        return new a.Point((x.x + y.x) / 2, (x.y + y.y) / 2);
      }
      function Z(x, y) {
        var _ = {
          originalEvent: y,
          eventType: "click",
          pointerType: "mouse",
          isEmulated: !1
        };
        E(x, _), _.preventDefault && !_.defaultPrevented && a.cancelEvent(y), _.stopPropagation && a.stopEvent(y);
      }
      function ie(x, y) {
        var _ = {
          originalEvent: y,
          eventType: "dblclick",
          pointerType: "mouse",
          isEmulated: !1
        };
        E(x, _), _.preventDefault && !_.defaultPrevented && a.cancelEvent(y), _.stopPropagation && a.stopEvent(y);
      }
      function se(x, y) {
        var _ = null, D = {
          originalEvent: y,
          eventType: "keydown",
          pointerType: "",
          isEmulated: !1
        };
        E(x, D), x.keyDownHandler && !D.preventGesture && !D.defaultPrevented && (_ = {
          eventSource: x,
          keyCode: y.keyCode ? y.keyCode : y.charCode,
          ctrl: y.ctrlKey,
          shift: y.shiftKey,
          alt: y.altKey,
          meta: y.metaKey,
          originalEvent: y,
          preventDefault: D.preventDefault || D.defaultPrevented,
          userData: x.userData
        }, x.keyDownHandler(_)), (_ && _.preventDefault || D.preventDefault && !D.defaultPrevented) && a.cancelEvent(y), D.stopPropagation && a.stopEvent(y);
      }
      function de(x, y) {
        var _ = null, D = {
          originalEvent: y,
          eventType: "keyup",
          pointerType: "",
          isEmulated: !1
        };
        E(x, D), x.keyUpHandler && !D.preventGesture && !D.defaultPrevented && (_ = {
          eventSource: x,
          keyCode: y.keyCode ? y.keyCode : y.charCode,
          ctrl: y.ctrlKey,
          shift: y.shiftKey,
          alt: y.altKey,
          meta: y.metaKey,
          originalEvent: y,
          preventDefault: D.preventDefault || D.defaultPrevented,
          userData: x.userData
        }, x.keyUpHandler(_)), (_ && _.preventDefault || D.preventDefault && !D.defaultPrevented) && a.cancelEvent(y), D.stopPropagation && a.stopEvent(y);
      }
      function ue(x, y) {
        var _ = null, D = {
          originalEvent: y,
          eventType: "keypress",
          pointerType: "",
          isEmulated: !1
        };
        E(x, D), x.keyHandler && !D.preventGesture && !D.defaultPrevented && (_ = {
          eventSource: x,
          keyCode: y.keyCode ? y.keyCode : y.charCode,
          ctrl: y.ctrlKey,
          shift: y.shiftKey,
          alt: y.altKey,
          meta: y.metaKey,
          originalEvent: y,
          preventDefault: D.preventDefault || D.defaultPrevented,
          userData: x.userData
        }, x.keyHandler(_)), (_ && _.preventDefault || D.preventDefault && !D.defaultPrevented) && a.cancelEvent(y), D.stopPropagation && a.stopEvent(y);
      }
      function Te(x, y) {
        var _ = {
          originalEvent: y,
          eventType: "focus",
          pointerType: "",
          isEmulated: !1
        };
        E(x, _), x.focusHandler && !_.preventGesture && x.focusHandler(
          {
            eventSource: x,
            originalEvent: y,
            userData: x.userData
          }
        );
      }
      function Ce(x, y) {
        var _ = {
          originalEvent: y,
          eventType: "blur",
          pointerType: "",
          isEmulated: !1
        };
        E(x, _), x.blurHandler && !_.preventGesture && x.blurHandler(
          {
            eventSource: x,
            originalEvent: y,
            userData: x.userData
          }
        );
      }
      function ke(x, y) {
        var _ = null, D = {
          originalEvent: y,
          eventType: "contextmenu",
          pointerType: "mouse",
          isEmulated: !1
        };
        E(x, D), x.contextMenuHandler && !D.preventGesture && !D.defaultPrevented && (_ = {
          eventSource: x,
          position: M(w(y), x.element),
          originalEvent: D.originalEvent,
          preventDefault: D.preventDefault || D.defaultPrevented,
          userData: x.userData
        }, x.contextMenuHandler(_)), (_ && _.preventDefault || D.preventDefault && !D.defaultPrevented) && a.cancelEvent(y), D.stopPropagation && a.stopEvent(y);
      }
      function Le(x, y) {
        Ze(x, y, y);
      }
      function ve(x, y) {
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
        a.MouseTracker.wheelEventName === "mousewheel" ? _.deltaY = -y.wheelDelta / a.DEFAULT_SETTINGS.pixelsPerWheelLine : _.deltaY = y.detail, Ze(x, _, y);
      }
      function Ze(x, y, _) {
        var D = 0, k, $ = null;
        D = y.deltaY ? y.deltaY < 0 ? 1 : -1 : 0, k = {
          originalEvent: y,
          eventType: "wheel",
          pointerType: "mouse",
          isEmulated: y !== _
        }, E(x, k), x.scrollHandler && !k.preventGesture && !k.defaultPrevented && ($ = {
          eventSource: x,
          pointerType: "mouse",
          position: A(y, x.element),
          scroll: D,
          shift: y.shiftKey,
          isTouchEvent: !1,
          originalEvent: _,
          preventDefault: k.preventDefault || k.defaultPrevented,
          userData: x.userData
        }, x.scrollHandler($)), k.stopPropagation && a.stopEvent(_), ($ && $.preventDefault || k.preventDefault && !k.defaultPrevented) && a.cancelEvent(_);
      }
      function Ke(x, y) {
        var _ = {
          id: a.MouseTracker.mousePointerId,
          type: "mouse"
        }, D = {
          originalEvent: y,
          eventType: "lostpointercapture",
          pointerType: "mouse",
          isEmulated: !1
        };
        E(x, D), y.target === x.element && L(x, _, !1), D.stopPropagation && a.stopEvent(y);
      }
      function Ie(x, y) {
        var _, D, k = y.changedTouches.length, $, me = x.getActivePointersListByType("touch");
        _ = a.now(), me.getLength() > y.touches.length - k && a.console.warn("Tracked touch contact count doesn't match event.touches.length");
        var Ue = {
          originalEvent: y,
          eventType: "pointerdown",
          pointerType: "touch",
          isEmulated: !1
        };
        for (E(x, Ue), D = 0; D < k; D++)
          $ = {
            id: y.changedTouches[D].identifier,
            type: "touch",
            // Simulate isPrimary
            isPrimary: me.getLength() === 0,
            currentPos: w(y.changedTouches[D]),
            currentTime: _
          }, W(x, Ue, $), oe(x, Ue, $, 0), L(x, $, !0);
        Ue.preventDefault && !Ue.defaultPrevented && a.cancelEvent(y), Ue.stopPropagation && a.stopEvent(y);
      }
      function V(x, y) {
        var _, D, k = y.changedTouches.length, $;
        _ = a.now();
        var me = {
          originalEvent: y,
          eventType: "pointerup",
          pointerType: "touch",
          isEmulated: !1
        };
        for (E(x, me), D = 0; D < k; D++)
          $ = {
            id: y.changedTouches[D].identifier,
            type: "touch",
            currentPos: w(y.changedTouches[D]),
            currentTime: _
          }, we(x, me, $, 0), L(x, $, !1), le(x, me, $);
        me.preventDefault && !me.defaultPrevented && a.cancelEvent(y), me.stopPropagation && a.stopEvent(y);
      }
      function ne(x, y) {
        var _, D, k = y.changedTouches.length, $;
        _ = a.now();
        var me = {
          originalEvent: y,
          eventType: "pointermove",
          pointerType: "touch",
          isEmulated: !1
        };
        for (E(x, me), D = 0; D < k; D++)
          $ = {
            id: y.changedTouches[D].identifier,
            type: "touch",
            currentPos: w(y.changedTouches[D]),
            currentTime: _
          }, fe(x, me, $);
        me.preventDefault && !me.defaultPrevented && a.cancelEvent(y), me.stopPropagation && a.stopEvent(y);
      }
      function ge(x, y) {
        var _ = y.changedTouches.length, D, k, $ = {
          originalEvent: y,
          eventType: "pointercancel",
          pointerType: "touch",
          isEmulated: !1
        };
        for (E(x, $), D = 0; D < _; D++)
          k = {
            id: y.changedTouches[D].identifier,
            type: "touch"
          }, ye(x, $, k);
        $.stopPropagation && a.stopEvent(y);
      }
      function ze(x, y) {
        return a.eventIsCanceled(y) || y.preventDefault(), !1;
      }
      function He(x, y) {
        return a.eventIsCanceled(y) || y.preventDefault(), !1;
      }
      function B(x, y) {
        var _ = {
          originalEvent: y,
          eventType: "gotpointercapture",
          pointerType: b(y),
          isEmulated: !1
        };
        E(x, _), y.target === x.element && L(x, {
          id: y.pointerId,
          type: b(y)
        }, !0), _.stopPropagation && a.stopEvent(y);
      }
      function I(x, y) {
        var _ = {
          originalEvent: y,
          eventType: "lostpointercapture",
          pointerType: b(y),
          isEmulated: !1
        };
        E(x, _), y.target === x.element && L(x, {
          id: y.pointerId,
          type: b(y)
        }, !1), _.stopPropagation && a.stopEvent(y);
      }
      function J(x, y) {
        var _ = {
          id: T(y),
          type: b(y),
          isPrimary: C(y),
          currentPos: w(y),
          currentTime: a.now()
        }, D = {
          originalEvent: y,
          eventType: "pointerenter",
          pointerType: _.type,
          isEmulated: !1
        };
        E(x, D), W(x, D, _);
      }
      function ce(x, y) {
        var _ = {
          id: T(y),
          type: b(y),
          isPrimary: C(y),
          currentPos: w(y),
          currentTime: a.now()
        }, D = {
          originalEvent: y,
          eventType: "pointerleave",
          pointerType: _.type,
          isEmulated: !1
        };
        E(x, D), le(x, D, _);
      }
      function Ee(x, y) {
        var _ = {
          id: T(y),
          type: b(y),
          isPrimary: C(y),
          currentPos: w(y),
          currentTime: a.now()
        }, D = {
          originalEvent: y,
          eventType: "pointerover",
          pointerType: _.type,
          isEmulated: !1
        };
        E(x, D), he(x, D, _), D.preventDefault && !D.defaultPrevented && a.cancelEvent(y), D.stopPropagation && a.stopEvent(y);
      }
      function Be(x, y) {
        var _ = {
          id: T(y),
          type: b(y),
          isPrimary: C(y),
          currentPos: w(y),
          currentTime: a.now()
        }, D = {
          originalEvent: y,
          eventType: "pointerout",
          pointerType: _.type,
          isEmulated: !1
        };
        E(x, D), q(x, D, _), D.preventDefault && !D.defaultPrevented && a.cancelEvent(y), D.stopPropagation && a.stopEvent(y);
      }
      function Fe(x, y) {
        var _ = {
          id: T(y),
          type: b(y),
          isPrimary: C(y),
          currentPos: w(y),
          currentTime: a.now()
        }, D = a.MouseTracker.havePointerEvents && _.type === "touch", k = {
          originalEvent: y,
          eventType: "pointerdown",
          pointerType: _.type,
          isEmulated: !1
        };
        E(x, k), oe(x, k, _, y.button), k.preventDefault && !k.defaultPrevented && a.cancelEvent(y), k.stopPropagation && a.stopEvent(y), k.shouldCapture && (D ? L(x, _, !0) : g(x, _));
      }
      function lt(x, y) {
        re(x, y);
      }
      function rt(x, y) {
        var _ = x.getActivePointersListByType(b(y));
        _.getById(y.pointerId) && re(x, y), a.stopEvent(y);
      }
      function re(x, y) {
        var _;
        _ = {
          id: T(y),
          type: b(y),
          isPrimary: C(y),
          currentPos: w(y),
          currentTime: a.now()
        };
        var D = {
          originalEvent: y,
          eventType: "pointerup",
          pointerType: _.type,
          isEmulated: !1
        };
        E(x, D), we(x, D, _, y.button), D.preventDefault && !D.defaultPrevented && a.cancelEvent(y), D.stopPropagation && a.stopEvent(y), D.shouldReleaseCapture && (y.target === x.element ? m(x, _) : L(x, _, !1));
      }
      function be(x, y) {
        Ve(x, y);
      }
      function xe(x, y) {
        var _ = x.getActivePointersListByType(b(y));
        _.getById(y.pointerId) && Ve(x, y), a.stopEvent(y);
      }
      function Ve(x, y) {
        var _ = {
          id: T(y),
          type: b(y),
          isPrimary: C(y),
          currentPos: w(y),
          currentTime: a.now()
        }, D = {
          originalEvent: y,
          eventType: "pointermove",
          pointerType: _.type,
          isEmulated: !1
        };
        E(x, D), fe(x, D, _), D.preventDefault && !D.defaultPrevented && a.cancelEvent(y), D.stopPropagation && a.stopEvent(y);
      }
      function Ye(x, y) {
        var _ = {
          id: y.pointerId,
          type: b(y)
        }, D = {
          originalEvent: y,
          eventType: "pointercancel",
          pointerType: _.type,
          isEmulated: !1
        };
        E(x, D), ye(x, D, _), D.stopPropagation && a.stopEvent(y);
      }
      function tt(x, y) {
        return y.speed = 0, y.direction = 0, y.contactPos = y.currentPos, y.contactTime = y.currentTime, y.lastPos = y.currentPos, y.lastTime = y.currentTime, x.add(y);
      }
      function wt(x, y, _) {
        var D, k = y.getById(_.id);
        return k ? (k.captured && (a.console.warn("stopTrackingPointer() called on captured pointer"), m(x, k)), y.removeContact(), D = y.removeById(_.id)) : D = y.getLength(), D;
      }
      function p(x, y) {
        switch (y.eventType) {
          case "pointermove":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !1, y.preventGesture = !x.hasGestureHandlers, y.stopPropagation = !1;
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
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !1, y.preventGesture = !x.hasGestureHandlers, y.stopPropagation = !1;
            break;
          case "pointerup":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !1, y.preventGesture = !x.hasGestureHandlers, y.stopPropagation = !1;
            break;
          case "wheel":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !1, y.preventGesture = !x.hasScrollHandler, y.stopPropagation = !1;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
            y.isStoppable = !0, y.isCancelable = !1, y.preventDefault = !1, y.preventGesture = !1, y.stopPropagation = !1;
            break;
          case "click":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !!x.clickHandler, y.preventGesture = !1, y.stopPropagation = !1;
            break;
          case "dblclick":
            y.isStoppable = !0, y.isCancelable = !0, y.preventDefault = !!x.dblClickHandler, y.preventGesture = !1, y.stopPropagation = !1;
            break;
          default:
            y.isStoppable = !1, y.isCancelable = !1, y.preventDefault = !1, y.preventGesture = !1, y.stopPropagation = !1;
            break;
        }
      }
      function E(x, y) {
        y.eventSource = x, y.eventPhase = y.originalEvent && typeof y.originalEvent.eventPhase < "u" ? y.originalEvent.eventPhase : 0, y.defaultPrevented = a.eventIsCanceled(y.originalEvent), y.shouldCapture = !1, y.shouldReleaseCapture = !1, y.userData = x.userData, p(x, y), x.preProcessEventHandler && x.preProcessEventHandler(y);
      }
      function L(x, y, _) {
        var D = x.getActivePointersListByType(y.type), k = D.getById(y.id);
        k ? _ && !k.captured ? (k.captured = !0, D.captureCount++) : !_ && k.captured && (k.captured = !1, D.captureCount--, D.captureCount < 0 && (D.captureCount = 0, a.console.warn("updatePointerCaptured() - pointsList.captureCount went negative"))) : a.console.warn("updatePointerCaptured() called on untracked pointer");
      }
      function W(x, y, _) {
        var D = x.getActivePointersListByType(_.type), k;
        k = D.getById(_.id), k ? (k.insideElement = !0, k.lastPos = k.currentPos, k.lastTime = k.currentTime, k.currentPos = _.currentPos, k.currentTime = _.currentTime, _ = k) : (_.captured = !1, _.insideElementPressed = !1, _.insideElement = !0, tt(D, _)), x.enterHandler && x.enterHandler(
          {
            eventSource: x,
            pointerType: _.type,
            position: M(_.currentPos, x.element),
            buttons: D.buttons,
            pointers: x.getActivePointerCount(),
            insideElementPressed: _.insideElementPressed,
            buttonDownAny: D.buttons !== 0,
            isTouchEvent: _.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        );
      }
      function le(x, y, _) {
        var D = x.getActivePointersListByType(_.type), k, $;
        k = D.getById(_.id), k ? (k.captured ? (k.insideElement = !1, k.lastPos = k.currentPos, k.lastTime = k.currentTime, k.currentPos = _.currentPos, k.currentTime = _.currentTime) : wt(x, D, k), _ = k) : (_.captured = !1, _.insideElementPressed = !1), (x.leaveHandler || x.exitHandler) && ($ = {
          eventSource: x,
          pointerType: _.type,
          // GitHub PR: https://github.com/openseadragon/openseadragon/pull/1754 (gPoint.currentPos && )
          position: _.currentPos && M(_.currentPos, x.element),
          buttons: D.buttons,
          pointers: x.getActivePointerCount(),
          insideElementPressed: _.insideElementPressed,
          buttonDownAny: D.buttons !== 0,
          isTouchEvent: _.type === "touch",
          originalEvent: y.originalEvent,
          userData: x.userData
        }, x.leaveHandler && x.leaveHandler($), x.exitHandler && x.exitHandler($));
      }
      function he(x, y, _) {
        var D, k;
        D = x.getActivePointersListByType(_.type), k = D.getById(_.id), k ? _ = k : (_.captured = !1, _.insideElementPressed = !1), x.overHandler && x.overHandler(
          {
            eventSource: x,
            pointerType: _.type,
            position: M(_.currentPos, x.element),
            buttons: D.buttons,
            pointers: x.getActivePointerCount(),
            insideElementPressed: _.insideElementPressed,
            buttonDownAny: D.buttons !== 0,
            isTouchEvent: _.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        );
      }
      function q(x, y, _) {
        var D, k;
        D = x.getActivePointersListByType(_.type), k = D.getById(_.id), k ? _ = k : (_.captured = !1, _.insideElementPressed = !1), x.outHandler && x.outHandler({
          eventSource: x,
          pointerType: _.type,
          position: _.currentPos && M(_.currentPos, x.element),
          buttons: D.buttons,
          pointers: x.getActivePointerCount(),
          insideElementPressed: _.insideElementPressed,
          buttonDownAny: D.buttons !== 0,
          isTouchEvent: _.type === "touch",
          originalEvent: y.originalEvent,
          userData: x.userData
        });
      }
      function oe(x, y, _, D) {
        var k = l[x.hash], $ = x.getActivePointersListByType(_.type), me;
        if (typeof y.originalEvent.buttons < "u" ? $.buttons = y.originalEvent.buttons : D === 0 ? $.buttons |= 1 : D === 1 ? $.buttons |= 4 : D === 2 ? $.buttons |= 2 : D === 3 ? $.buttons |= 8 : D === 4 ? $.buttons |= 16 : D === 5 && ($.buttons |= 32), D !== 0) {
          y.shouldCapture = !1, y.shouldReleaseCapture = !1, x.nonPrimaryPressHandler && !y.preventGesture && !y.defaultPrevented && (y.preventDefault = !0, x.nonPrimaryPressHandler(
            {
              eventSource: x,
              pointerType: _.type,
              position: M(_.currentPos, x.element),
              button: D,
              buttons: $.buttons,
              isTouchEvent: _.type === "touch",
              originalEvent: y.originalEvent,
              userData: x.userData
            }
          ));
          return;
        }
        me = $.getById(_.id), me ? (me.insideElementPressed = !0, me.insideElement = !0, me.originalTarget = y.originalEvent.target, me.contactPos = _.currentPos, me.contactTime = _.currentTime, me.lastPos = me.currentPos, me.lastTime = me.currentTime, me.currentPos = _.currentPos, me.currentTime = _.currentTime, _ = me) : (_.captured = !1, _.insideElementPressed = !0, _.insideElement = !0, _.originalTarget = y.originalEvent.target, tt($, _)), $.addContact(), !y.preventGesture && !y.defaultPrevented ? (y.shouldCapture = !0, y.shouldReleaseCapture = !1, y.preventDefault = !0, (x.dragHandler || x.dragEndHandler || x.pinchHandler) && a.MouseTracker.gesturePointVelocityTracker.addPoint(x, _), $.contacts === 1 ? x.pressHandler && !y.preventGesture && x.pressHandler(
          {
            eventSource: x,
            pointerType: _.type,
            position: M(_.contactPos, x.element),
            buttons: $.buttons,
            isTouchEvent: _.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        ) : $.contacts === 2 && x.pinchHandler && _.type === "touch" && (k.pinchGPoints = $.asArray(), k.lastPinchDist = k.currentPinchDist = k.pinchGPoints[0].currentPos.distanceTo(k.pinchGPoints[1].currentPos), k.lastPinchCenter = k.currentPinchCenter = N(k.pinchGPoints[0].currentPos, k.pinchGPoints[1].currentPos))) : (y.shouldCapture = !1, y.shouldReleaseCapture = !1);
      }
      function we(x, y, _, D) {
        var k = l[x.hash], $ = x.getActivePointersListByType(_.type), me, Ue, De, zt = !1, je;
        if (typeof y.originalEvent.buttons < "u" ? $.buttons = y.originalEvent.buttons : D === 0 ? $.buttons ^= -2 : D === 1 ? $.buttons ^= -5 : D === 2 ? $.buttons ^= -3 : D === 3 ? $.buttons ^= -9 : D === 4 ? $.buttons ^= -17 : D === 5 && ($.buttons ^= -33), y.shouldCapture = !1, D !== 0) {
          y.shouldReleaseCapture = !1, x.nonPrimaryReleaseHandler && !y.preventGesture && !y.defaultPrevented && (y.preventDefault = !0, x.nonPrimaryReleaseHandler(
            {
              eventSource: x,
              pointerType: _.type,
              position: M(_.currentPos, x.element),
              button: D,
              buttons: $.buttons,
              isTouchEvent: _.type === "touch",
              originalEvent: y.originalEvent,
              userData: x.userData
            }
          ));
          return;
        }
        De = $.getById(_.id), De ? ($.removeContact(), De.captured && (zt = !0), De.lastPos = De.currentPos, De.lastTime = De.currentTime, De.currentPos = _.currentPos, De.currentTime = _.currentTime, De.insideElement || wt(x, $, De), me = De.currentPos, Ue = De.currentTime) : (_.captured = !1, _.insideElementPressed = !1, _.insideElement = !0, tt($, _), De = _), !y.preventGesture && !y.defaultPrevented && (zt ? (y.shouldReleaseCapture = !0, y.preventDefault = !0, (x.dragHandler || x.dragEndHandler || x.pinchHandler) && a.MouseTracker.gesturePointVelocityTracker.removePoint(x, De), $.contacts === 0 ? (x.releaseHandler && me && x.releaseHandler(
          {
            eventSource: x,
            pointerType: De.type,
            position: M(me, x.element),
            buttons: $.buttons,
            insideElementPressed: De.insideElementPressed,
            insideElementReleased: De.insideElement,
            isTouchEvent: De.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        ), x.dragEndHandler && k.sentDragEvent && x.dragEndHandler(
          {
            eventSource: x,
            pointerType: De.type,
            position: M(De.currentPos, x.element),
            speed: De.speed,
            direction: De.direction,
            shift: y.originalEvent.shiftKey,
            isTouchEvent: De.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        ), k.sentDragEvent = !1, (x.clickHandler || x.dblClickHandler) && De.insideElement && (je = Ue - De.contactTime <= x.clickTimeThreshold && De.contactPos.distanceTo(me) <= x.clickDistThreshold, x.clickHandler && x.clickHandler(
          {
            eventSource: x,
            pointerType: De.type,
            position: M(De.currentPos, x.element),
            quick: je,
            shift: y.originalEvent.shiftKey,
            isTouchEvent: De.type === "touch",
            originalEvent: y.originalEvent,
            originalTarget: De.originalTarget,
            userData: x.userData
          }
        ), x.dblClickHandler && je && ($.clicks++, $.clicks === 1 ? (k.lastClickPos = me, k.dblClickTimeOut = setTimeout(function() {
          $.clicks = 0;
        }, x.dblClickTimeThreshold)) : $.clicks === 2 && (clearTimeout(k.dblClickTimeOut), $.clicks = 0, k.lastClickPos.distanceTo(me) <= x.dblClickDistThreshold && x.dblClickHandler(
          {
            eventSource: x,
            pointerType: De.type,
            position: M(De.currentPos, x.element),
            shift: y.originalEvent.shiftKey,
            isTouchEvent: De.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        ), k.lastClickPos = null)))) : $.contacts === 2 && x.pinchHandler && De.type === "touch" && (k.pinchGPoints = $.asArray(), k.lastPinchDist = k.currentPinchDist = k.pinchGPoints[0].currentPos.distanceTo(k.pinchGPoints[1].currentPos), k.lastPinchCenter = k.currentPinchCenter = N(k.pinchGPoints[0].currentPos, k.pinchGPoints[1].currentPos))) : (y.shouldReleaseCapture = !1, x.releaseHandler && me && (x.releaseHandler(
          {
            eventSource: x,
            pointerType: De.type,
            position: M(me, x.element),
            buttons: $.buttons,
            insideElementPressed: De.insideElementPressed,
            insideElementReleased: De.insideElement,
            isTouchEvent: De.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        ), y.preventDefault = !0)));
      }
      function fe(x, y, _) {
        var D = l[x.hash], k = x.getActivePointersListByType(_.type), $, me, Ue;
        if (typeof y.originalEvent.buttons < "u" && (k.buttons = y.originalEvent.buttons), $ = k.getById(_.id), $)
          $.lastPos = $.currentPos, $.lastTime = $.currentTime, $.currentPos = _.currentPos, $.currentTime = _.currentTime;
        else
          return;
        y.shouldCapture = !1, y.shouldReleaseCapture = !1, x.stopHandler && _.type === "mouse" && (clearTimeout(x.stopTimeOut), x.stopTimeOut = setTimeout(function() {
          Me(x, y.originalEvent, _.type);
        }, x.stopDelay)), k.contacts === 0 ? x.moveHandler && x.moveHandler(
          {
            eventSource: x,
            pointerType: _.type,
            position: M(_.currentPos, x.element),
            buttons: k.buttons,
            isTouchEvent: _.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        ) : k.contacts === 1 ? (x.moveHandler && ($ = k.asArray()[0], x.moveHandler(
          {
            eventSource: x,
            pointerType: $.type,
            position: M($.currentPos, x.element),
            buttons: k.buttons,
            isTouchEvent: $.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        )), x.dragHandler && !y.preventGesture && !y.defaultPrevented && ($ = k.asArray()[0], Ue = $.currentPos.minus($.lastPos), x.dragHandler(
          {
            eventSource: x,
            pointerType: $.type,
            position: M($.currentPos, x.element),
            buttons: k.buttons,
            delta: Ue,
            speed: $.speed,
            direction: $.direction,
            shift: y.originalEvent.shiftKey,
            isTouchEvent: $.type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        ), y.preventDefault = !0, D.sentDragEvent = !0)) : k.contacts === 2 && (x.moveHandler && (me = k.asArray(), x.moveHandler(
          {
            eventSource: x,
            pointerType: me[0].type,
            position: M(N(me[0].currentPos, me[1].currentPos), x.element),
            buttons: k.buttons,
            isTouchEvent: me[0].type === "touch",
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        )), x.pinchHandler && _.type === "touch" && !y.preventGesture && !y.defaultPrevented && (Ue = D.pinchGPoints[0].currentPos.distanceTo(D.pinchGPoints[1].currentPos), Ue !== D.currentPinchDist && (D.lastPinchDist = D.currentPinchDist, D.currentPinchDist = Ue, D.lastPinchCenter = D.currentPinchCenter, D.currentPinchCenter = N(D.pinchGPoints[0].currentPos, D.pinchGPoints[1].currentPos), x.pinchHandler(
          {
            eventSource: x,
            pointerType: "touch",
            gesturePoints: D.pinchGPoints,
            lastCenter: M(D.lastPinchCenter, x.element),
            center: M(D.currentPinchCenter, x.element),
            lastDistance: D.lastPinchDist,
            distance: D.currentPinchDist,
            shift: y.originalEvent.shiftKey,
            originalEvent: y.originalEvent,
            userData: x.userData
          }
        ), y.preventDefault = !0)));
      }
      function ye(x, y, _) {
        var D = x.getActivePointersListByType(_.type), k;
        k = D.getById(_.id), k && wt(x, D, k);
      }
      function Me(x, y, _) {
        x.stopHandler && x.stopHandler({
          eventSource: x,
          pointerType: _,
          position: A(y, x.element),
          buttons: x.getActivePointersListByType(_).buttons,
          isTouchEvent: _ === "touch",
          originalEvent: y,
          userData: x.userData
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
      a.Viewer = function(p) {
        var E = arguments, L = this, W;
        a.isPlainObject(p) || (p = {
          id: E[0],
          xmlPath: E.length > 1 ? E[1] : void 0,
          prefixUrl: E.length > 2 ? E[2] : void 0,
          controls: E.length > 3 ? E[3] : void 0,
          overlays: E.length > 4 ? E[4] : void 0
        }), p.config && (a.extend(!0, p, p.config), delete p.config);
        let le = [
          "useCanvas"
          // deprecated
        ];
        if (p.drawerOptions = Object.assign(
          {},
          le.reduce((q, oe) => (q[oe] = p[oe], delete p[oe], q), {}),
          p.drawerOptions
        ), a.extend(!0, this, {
          //internal state and dom identifiers
          id: p.id,
          hash: p.hash || o++,
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
        }, a.DEFAULT_SETTINGS, p), typeof this.hash > "u")
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
        }, this._sequenceIndex = 0, this._firstOpen = !0, this._updateRequestId = null, this._loadQueue = [], this.currentOverlays = [], this._updatePixelDensityRatioBind = null, this._lastScrollTime = a.now(), a.EventSource.call(this), this.addHandler("open-failed", function(q) {
          var oe = a.getString("Errors.OpenFailed", q.eventSource, q.message);
          L._showMessage(oe);
        }), a.ControlDock.call(this, p), this.xmlPath && (this.tileSources = [this.xmlPath]), this.element = this.element || document.getElementById(this.id), this.canvas = a.makeNeutralElement("div"), this.canvas.className = "openseadragon-canvas", (function(q) {
          q.width = "100%", q.height = "100%", q.overflow = "hidden", q.position = "absolute", q.top = "0px", q.left = "0px";
        })(this.canvas.style), a.setElementTouchActionNone(this.canvas), p.tabIndex !== "" && (this.canvas.tabIndex = p.tabIndex === void 0 ? 0 : p.tabIndex), this.container.className = "openseadragon-container", (function(q) {
          q.width = "100%", q.height = "100%", q.position = "relative", q.overflow = "hidden", q.left = "0px", q.top = "0px", q.textAlign = "left";
        })(this.container.style), a.setElementTouchActionNone(this.container), this.container.insertBefore(this.canvas, this.container.firstChild), this.element.appendChild(this.container), this.bodyWidth = document.body.style.width, this.bodyHeight = document.body.style.height, this.bodyOverflow = document.body.style.overflow, this.docOverflow = document.documentElement.style.overflow, this.innerTracker = new a.MouseTracker({
          userData: "Viewer.innerTracker",
          element: this.canvas,
          startDisabled: !this.mouseNavEnabled,
          clickTimeThreshold: this.clickTimeThreshold,
          clickDistThreshold: this.clickDistThreshold,
          dblClickTimeThreshold: this.dblClickTimeThreshold,
          dblClickDistThreshold: this.dblClickDistThreshold,
          contextMenuHandler: a.delegate(this, A),
          keyDownHandler: a.delegate(this, M),
          keyHandler: a.delegate(this, N),
          clickHandler: a.delegate(this, Z),
          dblClickHandler: a.delegate(this, ie),
          dragHandler: a.delegate(this, se),
          dragEndHandler: a.delegate(this, de),
          enterHandler: a.delegate(this, ue),
          leaveHandler: a.delegate(this, Te),
          pressHandler: a.delegate(this, Ce),
          releaseHandler: a.delegate(this, ke),
          nonPrimaryPressHandler: a.delegate(this, Le),
          nonPrimaryReleaseHandler: a.delegate(this, ve),
          scrollHandler: a.delegate(this, V),
          pinchHandler: a.delegate(this, Ze),
          focusHandler: a.delegate(this, Ke),
          blurHandler: a.delegate(this, Ie)
        }), this.outerTracker = new a.MouseTracker({
          userData: "Viewer.outerTracker",
          element: this.container,
          startDisabled: !this.mouseNavEnabled,
          clickTimeThreshold: this.clickTimeThreshold,
          clickDistThreshold: this.clickDistThreshold,
          dblClickTimeThreshold: this.dblClickTimeThreshold,
          dblClickDistThreshold: this.dblClickDistThreshold,
          enterHandler: a.delegate(this, ne),
          leaveHandler: a.delegate(this, ge)
        }), this.toolbar && (this.toolbar = new a.ControlDock({ element: this.toolbar })), this.bindStandardControls(), l[this.hash].prevContainerSize = r(this.container), window.ResizeObserver ? (this._autoResizePolling = !1, this._resizeObserver = new ResizeObserver(function() {
          l[L.hash].needsResize = !0;
        }), this._resizeObserver.observe(this.container, {})) : this._autoResizePolling = !0, this.world = new a.World({
          viewer: this
        }), this.world.addHandler("add-item", function(q) {
          L.source = L.world.getItemAt(0).source, l[L.hash].forceRedraw = !0, L._updateRequestId || (L._updateRequestId = c(L, ze));
        }), this.world.addHandler("remove-item", function(q) {
          L.world.getItemCount() ? L.source = L.world.getItemAt(0).source : L.source = null, l[L.hash].forceRedraw = !0;
        }), this.world.addHandler("metrics-change", function(q) {
          L.viewport && L.viewport._setContentBounds(L.world.getHomeBounds(), L.world.getContentFactor());
        }), this.world.addHandler("item-index-change", function(q) {
          L.source = L.world.getItemAt(0).source;
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
          timeout: p.timeout,
          tileRetryMax: this.tileRetryMax,
          tileRetryDelay: this.tileRetryDelay
        }), this.tileCache = new a.TileCache({
          maxImageCacheCount: this.maxImageCacheCount
        }), Object.prototype.hasOwnProperty.call(this.drawerOptions, "useCanvas") && (a.console.error('useCanvas is deprecated, use the "drawer" option to indicate preferred drawer(s)'), this.drawerOptions.useCanvas || (this.drawer = a.HTMLDrawer), delete this.drawerOptions.useCanvas);
        let he = Array.isArray(this.drawer) ? this.drawer : [this.drawer];
        he.length === 0 && (he = [a.DEFAULT_SETTINGS.drawer].flat(), a.console.warn("No valid drawers were selected. Using the default value.")), this.drawer = null;
        for (const q of he)
          if (this.requestDrawer(q, { mainDrawer: !0, redrawImmediately: !1 }))
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
          m(L);
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
          openDzi: function(p) {
            return a.console.error("[Viewer.openDzi] this function is deprecated; use Viewer.open() instead."), this.open(p);
          },
          // deprecated
          openTileSource: function(p) {
            return a.console.error("[Viewer.openTileSource] this function is deprecated; use Viewer.open() instead."), this.open(p);
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
          open: function(p, E) {
            var L = this;
            if (this.close(), !p)
              return this;
            if (this.sequenceMode && a.isArray(p))
              return this.referenceStrip && (this.referenceStrip.destroy(), this.referenceStrip = null), typeof E < "u" && !isNaN(E) && (this.initialPage = E), this.tileSources = p, this._sequenceIndex = Math.max(0, Math.min(this.tileSources.length - 1, this.initialPage)), this.tileSources.length && (this.open(this.tileSources[this._sequenceIndex]), this.showReferenceStrip && this.addReferenceStrip()), this._updateSequenceButtons(this._sequenceIndex), this;
            if (a.isArray(p) || (p = [p]), !p.length)
              return this;
            this._opening = !0;
            for (var W = p.length, le = 0, he = 0, q, oe = function() {
              if (le + he === W)
                if (le) {
                  (L._firstOpen || !L.preserveViewport) && (L.viewport.goHome(!0), L.viewport.update()), L._firstOpen = !1;
                  var ye = p[0];
                  if (ye.tileSource && (ye = ye.tileSource), L.overlays && !L.preserveOverlays)
                    for (var Me = 0; Me < L.overlays.length; Me++)
                      L.currentOverlays[Me] = d(L, L.overlays[Me]);
                  L._drawOverlays(), L._opening = !1, L.raiseEvent("open", { source: ye });
                } else
                  L._opening = !1, L.raiseEvent("open-failed", q);
            }, we = function(ye) {
              (!a.isPlainObject(ye) || !ye.tileSource) && (ye = {
                tileSource: ye
              }), ye.index !== void 0 && (a.console.error("[Viewer.open] setting indexes here is not supported; use addTiledImage instead"), delete ye.index), ye.collectionImmediately === void 0 && (ye.collectionImmediately = !0);
              var Me = ye.success;
              ye.success = function(y) {
                if (le++, ye.tileSource.overlays)
                  for (var _ = 0; _ < ye.tileSource.overlays.length; _++)
                    L.addOverlay(ye.tileSource.overlays[_]);
                Me && Me(y), oe();
              };
              var x = ye.error;
              ye.error = function(y) {
                he++, q || (q = y), x && x(y), oe();
              }, L.addTiledImage(ye);
            }, fe = 0; fe < p.length; fe++)
              we(p[fe]);
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
          requestDrawer(p, E) {
            const L = {
              mainDrawer: !0,
              redrawImmediately: !0,
              drawerOptions: null
            };
            E = a.extend(!0, L, E);
            const W = E.mainDrawer, le = E.redrawImmediately, he = E.drawerOptions, q = this.drawer;
            let oe = null;
            if (p && p.prototype instanceof a.DrawerBase ? (oe = p, p = "custom") : typeof p == "string" && (oe = a.determineDrawer(p)), oe || a.console.warn("Unsupported drawer! Drawer must be an existing string type, or a class that extends OpenSeadragon.DrawerBase."), oe && oe.isSupported()) {
              q && W && q.destroy();
              const we = new oe({
                viewer: this,
                viewport: this.viewport,
                element: this.canvas,
                debugGridColor: this.debugGridColor,
                options: he || this.drawerOptions[p]
              });
              return W && (this.drawer = we, le && this.forceRedraw()), we;
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
          setMouseNavEnabled: function(p) {
            return this.innerTracker.setTracking(p), this.outerTracker.setTracking(p), this.raiseEvent("mouse-enabled", { enabled: p }), this;
          },
          /**
           * @function
           * @returns {Boolean}
           */
          areControlsEnabled: function() {
            var p = this.controls.length, E;
            for (E = 0; E < this.controls.length; E++)
              p = p && this.controls[E].isVisible();
            return p;
          },
          /**
           * Shows or hides the controls (e.g. the default navigation buttons).
           *
           * @function
           * @param {Boolean} true to show, false to hide.
           * @returns {OpenSeadragon.Viewer} Chainable.
           * @fires OpenSeadragon.Viewer.event:controls-enabled
           */
          setControlsEnabled: function(p) {
            return p ? b(this) : m(this), this.raiseEvent("controls-enabled", { enabled: p }), this;
          },
          /**
           * Turns debugging mode on or off for this viewer.
           *
           * @function
           * @param {Boolean} debugMode true to turn debug on, false to turn debug off.
           */
          setDebugMode: function(p) {
            for (var E = 0; E < this.world.getItemCount(); E++)
              this.world.getItemAt(E).debugMode = p;
            this.debugMode = p, this.forceRedraw();
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
          setAjaxHeaders: function(p, E) {
            if (p === null && (p = {}), !a.isPlainObject(p)) {
              console.error("[Viewer.setAjaxHeaders] Ignoring invalid headers, must be a plain object");
              return;
            }
            if (E === void 0 && (E = !0), this.ajaxHeaders = p, E) {
              for (var L = 0; L < this.world.getItemCount(); L++)
                this.world.getItemAt(L)._updateAjaxHeaders(!0);
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
          addButton: function(p) {
            this.buttonGroup.addButton(p);
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
          setFullPage: function(p) {
            var E = document.body, L = E.style, W = document.documentElement.style, le = this, he, q;
            if (p === this.isFullPage())
              return this;
            var oe = {
              fullPage: p,
              preventDefaultAction: !1
            };
            if (this.raiseEvent("pre-full-page", oe), oe.preventDefaultAction)
              return this;
            if (p && this.element) {
              for (this.elementSize = a.getElementSize(this.element), this.pageScroll = a.getPageScroll(), this.elementMargin = this.element.style.margin, this.element.style.margin = "0", this.elementPadding = this.element.style.padding, this.element.style.padding = "0", this.bodyMargin = L.margin, this.docMargin = W.margin, L.margin = "0", W.margin = "0", this.bodyPadding = L.padding, this.docPadding = W.padding, L.padding = "0", W.padding = "0", this.bodyWidth = L.width, this.docWidth = W.width, L.width = "100%", W.width = "100%", this.bodyHeight = L.height, this.docHeight = W.height, L.height = "100%", W.height = "100%", this.bodyDisplay = L.display, L.display = "block", this.previousBody = [], l[this.hash].prevElementParent = this.element.parentNode, l[this.hash].prevNextSibling = this.element.nextSibling, l[this.hash].prevElementWidth = this.element.style.width, l[this.hash].prevElementHeight = this.element.style.height, he = E.childNodes.length, q = 0; q < he; q++)
                this.previousBody.push(E.childNodes[0]), E.removeChild(E.childNodes[0]);
              this.toolbar && this.toolbar.element && (this.toolbar.parentNode = this.toolbar.element.parentNode, this.toolbar.nextSibling = this.toolbar.element.nextSibling, E.appendChild(this.toolbar.element), a.addClass(this.toolbar.element, "fullpage")), a.addClass(this.element, "fullpage"), E.appendChild(this.element), this.element.style.height = "100vh", this.element.style.width = "100vw", this.toolbar && this.toolbar.element && (this.element.style.height = a.getElementSize(this.element).y - a.getElementSize(this.toolbar.element).y + "px"), l[this.hash].fullPage = !0, a.delegate(this, ne)({});
            } else {
              for (this.element.style.margin = this.elementMargin, this.element.style.padding = this.elementPadding, L.margin = this.bodyMargin, W.margin = this.docMargin, L.padding = this.bodyPadding, W.padding = this.docPadding, L.width = this.bodyWidth, W.width = this.docWidth, L.height = this.bodyHeight, W.height = this.docHeight, L.display = this.bodyDisplay, E.removeChild(this.element), he = this.previousBody.length, q = 0; q < he; q++)
                E.appendChild(this.previousBody.shift());
              a.removeClass(this.element, "fullpage"), l[this.hash].prevElementParent.insertBefore(
                this.element,
                l[this.hash].prevNextSibling
              ), this.toolbar && this.toolbar.element && (E.removeChild(this.toolbar.element), a.removeClass(this.toolbar.element, "fullpage"), this.toolbar.parentNode.insertBefore(
                this.toolbar.element,
                this.toolbar.nextSibling
              ), delete this.toolbar.parentNode, delete this.toolbar.nextSibling), this.element.style.width = l[this.hash].prevElementWidth, this.element.style.height = l[this.hash].prevElementHeight;
              var we = 0, fe = function() {
                a.setPageScroll(le.pageScroll);
                var ye = a.getPageScroll();
                we++, we < 10 && (ye.x !== le.pageScroll.x || ye.y !== le.pageScroll.y) && a.requestAnimationFrame(fe);
              };
              a.requestAnimationFrame(fe), l[this.hash].fullPage = !1, a.delegate(this, ge)({});
            }
            return this.navigator && this.viewport && this.navigator.update(this.viewport), this.raiseEvent("full-page", { fullPage: p }), this;
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
          setFullScreen: function(p) {
            var E = this;
            if (!a.supportsFullScreen)
              return this.setFullPage(p);
            if (a.isFullScreen() === p)
              return this;
            var L = {
              fullScreen: p,
              preventDefaultAction: !1
            };
            if (this.raiseEvent("pre-full-screen", L), L.preventDefaultAction)
              return this;
            if (p) {
              if (this.setFullPage(!0), !this.isFullPage())
                return this;
              this.fullPageStyleWidth = this.element.style.width, this.fullPageStyleHeight = this.element.style.height, this.element.style.width = "100%", this.element.style.height = "100%";
              var W = function() {
                var le = a.isFullScreen();
                le || (a.removeEvent(document, a.fullScreenEventName, W), a.removeEvent(document, a.fullScreenErrorEventName, W), E.setFullPage(!1), E.isFullPage() && (E.element.style.width = E.fullPageStyleWidth, E.element.style.height = E.fullPageStyleHeight)), E.navigator && E.viewport && setTimeout(function() {
                  E.navigator.update(E.viewport);
                }), E.raiseEvent("full-screen", { fullScreen: le });
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
          setVisible: function(p) {
            return this.container.style.visibility = p ? "" : "hidden", this.raiseEvent("visible", { visible: p }), this;
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
          addTiledImage: function(p) {
            a.console.assert(p, "[Viewer.addTiledImage] options is required"), a.console.assert(p.tileSource, "[Viewer.addTiledImage] options.tileSource is required"), a.console.assert(
              !p.replace || p.index > -1 && p.index < this.world.getItemCount(),
              "[Viewer.addTiledImage] if options.replace is used, options.index must be a valid index in Viewer.world"
            );
            var E = this;
            p.replace && (p.replaceItem = E.world.getItemAt(p.index)), this._hideMessage(), p.placeholderFillStyle === void 0 && (p.placeholderFillStyle = this.placeholderFillStyle), p.opacity === void 0 && (p.opacity = this.opacity), p.preload === void 0 && (p.preload = this.preload), p.compositeOperation === void 0 && (p.compositeOperation = this.compositeOperation), p.crossOriginPolicy === void 0 && (p.crossOriginPolicy = p.tileSource.crossOriginPolicy !== void 0 ? p.tileSource.crossOriginPolicy : this.crossOriginPolicy), p.ajaxWithCredentials === void 0 && (p.ajaxWithCredentials = this.ajaxWithCredentials), p.loadTilesWithAjax === void 0 && (p.loadTilesWithAjax = this.loadTilesWithAjax), a.isPlainObject(p.ajaxHeaders) || (p.ajaxHeaders = {});
            var L = {
              options: p
            };
            function W(q) {
              for (var oe = 0; oe < E._loadQueue.length; oe++)
                if (E._loadQueue[oe] === L) {
                  E._loadQueue.splice(oe, 1);
                  break;
                }
              E._loadQueue.length === 0 && le(L), E.raiseEvent("add-item-failed", q), p.error && p.error(q);
            }
            function le(q) {
              E.collectionMode && (E.world.arrange({
                immediately: q.options.collectionImmediately,
                rows: E.collectionRows,
                columns: E.collectionColumns,
                layout: E.collectionLayout,
                tileSize: E.collectionTileSize,
                tileMargin: E.collectionTileMargin
              }), E.world.setAutoRefigureSizes(!0));
            }
            if (a.isArray(p.tileSource)) {
              setTimeout(function() {
                W({
                  message: "[Viewer.addTiledImage] Sequences can not be added; add them one at a time instead.",
                  source: p.tileSource,
                  options: p
                });
              });
              return;
            }
            this._loadQueue.push(L);
            function he() {
              for (var q, oe, we; E._loadQueue.length && (q = E._loadQueue[0], !!q.tileSource); ) {
                if (E._loadQueue.splice(0, 1), q.options.replace) {
                  var fe = E.world.getIndexOfItem(q.options.replaceItem);
                  fe !== -1 && (q.options.index = fe), E.world.removeItem(q.options.replaceItem);
                }
                oe = new a.TiledImage({
                  viewer: E,
                  source: q.tileSource,
                  viewport: E.viewport,
                  drawer: E.drawer,
                  tileCache: E.tileCache,
                  imageLoader: E.imageLoader,
                  x: q.options.x,
                  y: q.options.y,
                  width: q.options.width,
                  height: q.options.height,
                  fitBounds: q.options.fitBounds,
                  fitBoundsPlacement: q.options.fitBoundsPlacement,
                  clip: q.options.clip,
                  placeholderFillStyle: q.options.placeholderFillStyle,
                  opacity: q.options.opacity,
                  preload: q.options.preload,
                  degrees: q.options.degrees,
                  flipped: q.options.flipped,
                  compositeOperation: q.options.compositeOperation,
                  springStiffness: E.springStiffness,
                  animationTime: E.animationTime,
                  minZoomImageRatio: E.minZoomImageRatio,
                  wrapHorizontal: E.wrapHorizontal,
                  wrapVertical: E.wrapVertical,
                  maxTilesPerFrame: E.maxTilesPerFrame,
                  immediateRender: E.immediateRender,
                  blendTime: E.blendTime,
                  alwaysBlend: E.alwaysBlend,
                  minPixelRatio: E.minPixelRatio,
                  smoothTileEdgesMinZoom: E.smoothTileEdgesMinZoom,
                  iOSDevice: E.iOSDevice,
                  crossOriginPolicy: q.options.crossOriginPolicy,
                  ajaxWithCredentials: q.options.ajaxWithCredentials,
                  loadTilesWithAjax: q.options.loadTilesWithAjax,
                  ajaxHeaders: q.options.ajaxHeaders,
                  debugMode: E.debugMode,
                  subPixelRoundingForTransparency: E.subPixelRoundingForTransparency
                }), E.collectionMode && E.world.setAutoRefigureSizes(!1), E.navigator && (we = a.extend({}, q.options, {
                  replace: !1,
                  // navigator already removed the layer, nothing to replace
                  originalTiledImage: oe,
                  tileSource: q.tileSource
                }), E.navigator.addTiledImage(we)), E.world.addItem(oe, {
                  index: q.options.index
                }), E._loadQueue.length === 0 && le(q), E.world.getItemCount() === 1 && !E.preserveViewport && E.viewport.goHome(!0), q.options.success && q.options.success({
                  item: oe
                });
              }
            }
            f(this, p.tileSource, p, function(q) {
              L.tileSource = q, he();
            }, function(q) {
              q.options = p, W(q), he();
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
          addSimpleImage: function(p) {
            a.console.assert(p, "[Viewer.addSimpleImage] options is required"), a.console.assert(p.url, "[Viewer.addSimpleImage] options.url is required");
            var E = a.extend({}, p, {
              tileSource: {
                type: "image",
                url: p.url
              }
            });
            delete E.url, this.addTiledImage(E);
          },
          // deprecated
          addLayer: function(p) {
            var E = this;
            a.console.error("[Viewer.addLayer] this function is deprecated; use Viewer.addTiledImage() instead.");
            var L = a.extend({}, p, {
              success: function(W) {
                E.raiseEvent("add-layer", {
                  options: p,
                  drawer: W.item
                });
              },
              error: function(W) {
                E.raiseEvent("add-layer-failed", W);
              }
            });
            return this.addTiledImage(L), this;
          },
          // deprecated
          getLayerAtLevel: function(p) {
            return a.console.error("[Viewer.getLayerAtLevel] this function is deprecated; use World.getItemAt() instead."), this.world.getItemAt(p);
          },
          // deprecated
          getLevelOfLayer: function(p) {
            return a.console.error("[Viewer.getLevelOfLayer] this function is deprecated; use World.getIndexOfItem() instead."), this.world.getIndexOfItem(p);
          },
          // deprecated
          getLayersCount: function() {
            return a.console.error("[Viewer.getLayersCount] this function is deprecated; use World.getItemCount() instead."), this.world.getItemCount();
          },
          // deprecated
          setLayerLevel: function(p, E) {
            return a.console.error("[Viewer.setLayerLevel] this function is deprecated; use World.setItemIndex() instead."), this.world.setItemIndex(p, E);
          },
          // deprecated
          removeLayer: function(p) {
            return a.console.error("[Viewer.removeLayer] this function is deprecated; use World.removeItem() instead."), this.world.removeItem(p);
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
            var p = a.delegate(this, C), E = a.delegate(this, w), L = a.delegate(this, this.goToNextPage), W = a.delegate(this, this.goToPreviousPage), le = this.navImages, he = !0;
            return this.showSequenceControl && ((this.previousButton || this.nextButton) && (he = !1), this.previousButton = new a.Button({
              element: this.previousButton ? a.getElement(this.previousButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.PreviousPage"),
              srcRest: J(this.prefixUrl, le.previous.REST),
              srcGroup: J(this.prefixUrl, le.previous.GROUP),
              srcHover: J(this.prefixUrl, le.previous.HOVER),
              srcDown: J(this.prefixUrl, le.previous.DOWN),
              onRelease: W,
              onFocus: p,
              onBlur: E
            }), this.nextButton = new a.Button({
              element: this.nextButton ? a.getElement(this.nextButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.NextPage"),
              srcRest: J(this.prefixUrl, le.next.REST),
              srcGroup: J(this.prefixUrl, le.next.GROUP),
              srcHover: J(this.prefixUrl, le.next.HOVER),
              srcDown: J(this.prefixUrl, le.next.DOWN),
              onRelease: L,
              onFocus: p,
              onBlur: E
            }), this.navPrevNextWrap || this.previousButton.disable(), (!this.tileSources || !this.tileSources.length) && this.nextButton.disable(), he && (this.paging = new a.ButtonGroup({
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
            var p = a.delegate(this, ce), E = a.delegate(this, Be), L = a.delegate(this, rt), W = a.delegate(this, Ee), le = a.delegate(this, re), he = a.delegate(this, xe), q = a.delegate(this, Ve), oe = a.delegate(this, Ye), we = a.delegate(this, tt), fe = a.delegate(this, wt), ye = a.delegate(this, C), Me = a.delegate(this, w), x = this.navImages, y = [], _ = !0;
            return this.showNavigationControl && ((this.zoomInButton || this.zoomOutButton || this.homeButton || this.fullPageButton || this.rotateLeftButton || this.rotateRightButton || this.flipButton) && (_ = !1), this.showZoomControl && (y.push(this.zoomInButton = new a.Button({
              element: this.zoomInButton ? a.getElement(this.zoomInButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.ZoomIn"),
              srcRest: J(this.prefixUrl, x.zoomIn.REST),
              srcGroup: J(this.prefixUrl, x.zoomIn.GROUP),
              srcHover: J(this.prefixUrl, x.zoomIn.HOVER),
              srcDown: J(this.prefixUrl, x.zoomIn.DOWN),
              onPress: p,
              onRelease: E,
              onClick: L,
              onEnter: p,
              onExit: E,
              onFocus: ye,
              onBlur: Me
            })), y.push(this.zoomOutButton = new a.Button({
              element: this.zoomOutButton ? a.getElement(this.zoomOutButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.ZoomOut"),
              srcRest: J(this.prefixUrl, x.zoomOut.REST),
              srcGroup: J(this.prefixUrl, x.zoomOut.GROUP),
              srcHover: J(this.prefixUrl, x.zoomOut.HOVER),
              srcDown: J(this.prefixUrl, x.zoomOut.DOWN),
              onPress: W,
              onRelease: E,
              onClick: le,
              onEnter: W,
              onExit: E,
              onFocus: ye,
              onBlur: Me
            }))), this.showHomeControl && y.push(this.homeButton = new a.Button({
              element: this.homeButton ? a.getElement(this.homeButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.Home"),
              srcRest: J(this.prefixUrl, x.home.REST),
              srcGroup: J(this.prefixUrl, x.home.GROUP),
              srcHover: J(this.prefixUrl, x.home.HOVER),
              srcDown: J(this.prefixUrl, x.home.DOWN),
              onRelease: he,
              onFocus: ye,
              onBlur: Me
            })), this.showFullPageControl && y.push(this.fullPageButton = new a.Button({
              element: this.fullPageButton ? a.getElement(this.fullPageButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.FullPage"),
              srcRest: J(this.prefixUrl, x.fullpage.REST),
              srcGroup: J(this.prefixUrl, x.fullpage.GROUP),
              srcHover: J(this.prefixUrl, x.fullpage.HOVER),
              srcDown: J(this.prefixUrl, x.fullpage.DOWN),
              onRelease: q,
              onFocus: ye,
              onBlur: Me
            })), this.showRotationControl && (y.push(this.rotateLeftButton = new a.Button({
              element: this.rotateLeftButton ? a.getElement(this.rotateLeftButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.RotateLeft"),
              srcRest: J(this.prefixUrl, x.rotateleft.REST),
              srcGroup: J(this.prefixUrl, x.rotateleft.GROUP),
              srcHover: J(this.prefixUrl, x.rotateleft.HOVER),
              srcDown: J(this.prefixUrl, x.rotateleft.DOWN),
              onRelease: oe,
              onFocus: ye,
              onBlur: Me
            })), y.push(this.rotateRightButton = new a.Button({
              element: this.rotateRightButton ? a.getElement(this.rotateRightButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.RotateRight"),
              srcRest: J(this.prefixUrl, x.rotateright.REST),
              srcGroup: J(this.prefixUrl, x.rotateright.GROUP),
              srcHover: J(this.prefixUrl, x.rotateright.HOVER),
              srcDown: J(this.prefixUrl, x.rotateright.DOWN),
              onRelease: we,
              onFocus: ye,
              onBlur: Me
            }))), this.showFlipControl && y.push(this.flipButton = new a.Button({
              element: this.flipButton ? a.getElement(this.flipButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: a.getString("Tooltips.Flip"),
              srcRest: J(this.prefixUrl, x.flip.REST),
              srcGroup: J(this.prefixUrl, x.flip.GROUP),
              srcHover: J(this.prefixUrl, x.flip.HOVER),
              srcDown: J(this.prefixUrl, x.flip.DOWN),
              onRelease: fe,
              onFocus: ye,
              onBlur: Me
            })), _ ? (this.buttonGroup = new a.ButtonGroup({
              buttons: y,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold
            }), this.navControl = this.buttonGroup.element, this.addHandler("open", a.delegate(this, be)), this.toolbar ? this.toolbar.addControl(
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
          goToPage: function(p) {
            return this.tileSources && p >= 0 && p < this.tileSources.length && (this._sequenceIndex = p, this._updateSequenceButtons(p), this.open(this.tileSources[p]), this.referenceStrip && this.referenceStrip.setFocus(p), this.raiseEvent("page", { page: p })), this;
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
          addOverlay: function(p, E, L, W) {
            var le;
            if (a.isPlainObject(p) ? le = p : le = {
              element: p,
              location: E,
              placement: L,
              onDraw: W
            }, p = a.getElement(le.element), h(this.currentOverlays, p) >= 0)
              return this;
            var he = d(this, le);
            return this.currentOverlays.push(he), he.drawHTML(this.overlaysContainer, this.viewport), this.raiseEvent("add-overlay", {
              element: p,
              location: le.location,
              placement: le.placement
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
          updateOverlay: function(p, E, L) {
            var W;
            return p = a.getElement(p), W = h(this.currentOverlays, p), W >= 0 && (this.currentOverlays[W].update(E, L), l[this.hash].forceRedraw = !0, this.raiseEvent("update-overlay", {
              element: p,
              location: E,
              placement: L
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
          removeOverlay: function(p) {
            var E;
            return p = a.getElement(p), E = h(this.currentOverlays, p), E >= 0 && (this.currentOverlays[E].destroy(), this.currentOverlays.splice(E, 1), l[this.hash].forceRedraw = !0, this.raiseEvent("remove-overlay", {
              element: p
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
          getOverlayById: function(p) {
            var E;
            return p = a.getElement(p), E = h(this.currentOverlays, p), E >= 0 ? this.currentOverlays[E] : null;
          },
          /**
           * Updates the sequence buttons.
           * @function OpenSeadragon.Viewer.prototype._updateSequenceButtons
           * @private
           * @param {Number} Sequence Value
           */
          _updateSequenceButtons: function(p) {
            this.nextButton && (!this.tileSources || this.tileSources.length - 1 === p ? this.navPrevNextWrap || this.nextButton.disable() : this.nextButton.enable()), this.previousButton && (p > 0 ? this.previousButton.enable() : this.navPrevNextWrap || this.previousButton.disable());
          },
          /**
           * Display a message in the viewport
           * @function OpenSeadragon.Viewer.prototype._showMessage
           * @private
           * @param {String} text message
           */
          _showMessage: function(p) {
            this._hideMessage();
            var E = a.makeNeutralElement("div");
            E.appendChild(document.createTextNode(p)), this.messageDiv = a.makeCenteredNode(E), a.addClass(this.messageDiv, "openseadragon-message"), this.container.appendChild(this.messageDiv);
          },
          /**
           * Hide any currently displayed viewport message
           * @function OpenSeadragon.Viewer.prototype._hideMessage
           * @private
           */
          _hideMessage: function() {
            var p = this.messageDiv;
            p && (p.parentNode.removeChild(p), delete this.messageDiv);
          },
          /**
           * Gets this viewer's gesture settings for the given pointer device type.
           * @method
           * @param {String} type - The pointer device type to get the gesture settings for ("mouse", "touch", "pen", etc.).
           * @returns {OpenSeadragon.GestureSettings}
           */
          gestureSettingsByDeviceType: function(p) {
            switch (p) {
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
            var p, E = this.currentOverlays.length;
            for (p = 0; p < E; p++)
              this.currentOverlays[p].drawHTML(this.overlaysContainer, this.viewport);
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
            var p = a.pixelDensityRatio, E = a.getCurrentPixelDensityRatio();
            p !== E && (a.pixelDensityRatio = E, this.forceResize());
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
            var p = this._sequenceIndex - 1;
            this.navPrevNextWrap && p < 0 && (p += this.tileSources.length), this.goToPage(p);
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
            var p = this._sequenceIndex + 1;
            this.navPrevNextWrap && p >= this.tileSources.length && (p = 0), this.goToPage(p);
          },
          isAnimating: function() {
            return l[this.hash].animating;
          }
        }
      );
      function r(p) {
        return p = a.getElement(p), new a.Point(
          p.clientWidth === 0 ? 1 : p.clientWidth,
          p.clientHeight === 0 ? 1 : p.clientHeight
        );
      }
      function f(p, E, L, W, le) {
        var he = p;
        if (a.type(E) === "string") {
          if (E.match(/^\s*<.*>\s*$/))
            E = a.parseXml(E);
          else if (E.match(/^\s*[{[].*[}\]]\s*$/))
            try {
              var q = a.parseJSON(E);
              E = q;
            } catch {
            }
        }
        function oe(we, fe) {
          we.ready ? W(we) : (we.addHandler("ready", function() {
            W(we);
          }), we.addHandler("open-failed", function(ye) {
            le({
              message: ye.message,
              source: fe
            });
          }));
        }
        setTimeout(function() {
          if (a.type(E) === "string")
            E = new a.TileSource({
              url: E,
              crossOriginPolicy: L.crossOriginPolicy !== void 0 ? L.crossOriginPolicy : p.crossOriginPolicy,
              ajaxWithCredentials: p.ajaxWithCredentials,
              ajaxHeaders: L.ajaxHeaders ? L.ajaxHeaders : p.ajaxHeaders,
              splitHashDataForPost: p.splitHashDataForPost,
              success: function(Me) {
                W(Me.tileSource);
              }
            }), E.addHandler("open-failed", function(Me) {
              le(Me);
            });
          else if (a.isPlainObject(E) || E.nodeType)
            if (E.crossOriginPolicy === void 0 && (L.crossOriginPolicy !== void 0 || p.crossOriginPolicy !== void 0) && (E.crossOriginPolicy = L.crossOriginPolicy !== void 0 ? L.crossOriginPolicy : p.crossOriginPolicy), E.ajaxWithCredentials === void 0 && (E.ajaxWithCredentials = p.ajaxWithCredentials), a.isFunction(E.getTileUrl)) {
              var we = new a.TileSource(E);
              we.getTileUrl = E.getTileUrl, W(we);
            } else {
              var fe = a.TileSource.determineType(he, E);
              if (!fe) {
                le({
                  message: "Unable to load TileSource",
                  source: E
                });
                return;
              }
              var ye = fe.prototype.configure.apply(he, [E]);
              oe(new fe(ye), E);
            }
          else
            oe(E, E);
        });
      }
      function d(p, E) {
        if (E instanceof a.Overlay)
          return E;
        var L = null;
        if (E.element)
          L = a.getElement(E.element);
        else {
          var W = E.id ? E.id : "openseadragon-overlay-" + Math.floor(Math.random() * 1e7);
          L = a.getElement(E.id), L || (L = document.createElement("a"), L.href = "#/overlay/" + W), L.id = W, a.addClass(
            L,
            E.className ? E.className : "openseadragon-overlay"
          );
        }
        var le = E.location, he = E.width, q = E.height;
        if (!le) {
          var oe = E.x, we = E.y;
          if (E.px !== void 0) {
            var fe = p.viewport.imageToViewportRectangle(new a.Rect(
              E.px,
              E.py,
              he || 0,
              q || 0
            ));
            oe = fe.x, we = fe.y, he = he !== void 0 ? fe.width : void 0, q = q !== void 0 ? fe.height : void 0;
          }
          le = new a.Point(oe, we);
        }
        var ye = E.placement;
        return ye && a.type(ye) === "string" && (ye = a.Placement[E.placement.toUpperCase()]), new a.Overlay({
          element: L,
          location: le,
          placement: ye,
          onDraw: E.onDraw,
          checkResize: E.checkResize,
          width: he,
          height: q,
          rotationMode: E.rotationMode
        });
      }
      function h(p, E) {
        var L;
        for (L = p.length - 1; L >= 0; L--)
          if (p[L].element === E)
            return L;
        return -1;
      }
      function c(p, E) {
        return a.requestAnimationFrame(function() {
          E(p);
        });
      }
      function g(p) {
        a.requestAnimationFrame(function() {
          T(p);
        });
      }
      function m(p) {
        p.autoHideControls && (p.controlsShouldFade = !0, p.controlsFadeBeginTime = a.now() + p.controlsFadeDelay, window.setTimeout(function() {
          g(p);
        }, p.controlsFadeDelay));
      }
      function T(p) {
        var E, L, W, le;
        if (p.controlsShouldFade) {
          for (E = a.now(), L = E - p.controlsFadeBeginTime, W = 1 - L / p.controlsFadeLength, W = Math.min(1, W), W = Math.max(0, W), le = p.controls.length - 1; le >= 0; le--)
            p.controls[le].autoFade && p.controls[le].setOpacity(W);
          W > 0 && g(p);
        }
      }
      function b(p) {
        var E;
        for (p.controlsShouldFade = !1, E = p.controls.length - 1; E >= 0; E--)
          p.controls[E].setOpacity(1);
      }
      function C() {
        b(this);
      }
      function w() {
        m(this);
      }
      function A(p) {
        var E = {
          tracker: p.eventSource,
          position: p.position,
          originalEvent: p.originalEvent,
          preventDefault: p.preventDefault
        };
        this.raiseEvent("canvas-contextmenu", E), p.preventDefault = E.preventDefault;
      }
      function M(p) {
        var E = {
          originalEvent: p.originalEvent,
          preventDefaultAction: !1,
          preventVerticalPan: p.preventVerticalPan || !this.panVertical,
          preventHorizontalPan: p.preventHorizontalPan || !this.panHorizontal
        };
        if (this.raiseEvent("canvas-key", E), !E.preventDefaultAction && !p.ctrl && !p.alt && !p.meta)
          switch (p.keyCode) {
            case 38:
              E.preventVerticalPan || (p.shift ? this.viewport.zoomBy(1.1) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0, -this.pixelsPerArrowPress))), this.viewport.applyConstraints()), p.preventDefault = !0;
              break;
            case 40:
              E.preventVerticalPan || (p.shift ? this.viewport.zoomBy(0.9) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0, this.pixelsPerArrowPress))), this.viewport.applyConstraints()), p.preventDefault = !0;
              break;
            case 37:
              E.preventHorizontalPan || (this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(-this.pixelsPerArrowPress, 0))), this.viewport.applyConstraints()), p.preventDefault = !0;
              break;
            case 39:
              E.preventHorizontalPan || (this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(this.pixelsPerArrowPress, 0))), this.viewport.applyConstraints()), p.preventDefault = !0;
              break;
            case 187:
              this.viewport.zoomBy(1.1), this.viewport.applyConstraints(), p.preventDefault = !0;
              break;
            case 189:
              this.viewport.zoomBy(0.9), this.viewport.applyConstraints(), p.preventDefault = !0;
              break;
            case 48:
              this.viewport.goHome(), this.viewport.applyConstraints(), p.preventDefault = !0;
              break;
            case 87:
              E.preventVerticalPan || (p.shift ? this.viewport.zoomBy(1.1) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0, -40))), this.viewport.applyConstraints()), p.preventDefault = !0;
              break;
            case 83:
              E.preventVerticalPan || (p.shift ? this.viewport.zoomBy(0.9) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0, 40))), this.viewport.applyConstraints()), p.preventDefault = !0;
              break;
            case 65:
              E.preventHorizontalPan || (this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(-40, 0))), this.viewport.applyConstraints()), p.preventDefault = !0;
              break;
            case 68:
              E.preventHorizontalPan || (this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(40, 0))), this.viewport.applyConstraints()), p.preventDefault = !0;
              break;
            case 82:
              p.shift ? this.viewport.flipped ? this.viewport.setRotation(this.viewport.getRotation() + this.rotationIncrement) : this.viewport.setRotation(this.viewport.getRotation() - this.rotationIncrement) : this.viewport.flipped ? this.viewport.setRotation(this.viewport.getRotation() - this.rotationIncrement) : this.viewport.setRotation(this.viewport.getRotation() + this.rotationIncrement), this.viewport.applyConstraints(), p.preventDefault = !0;
              break;
            case 70:
              this.viewport.toggleFlip(), p.preventDefault = !0;
              break;
            case 74:
              this.goToPreviousPage();
              break;
            case 75:
              this.goToNextPage();
              break;
            default:
              p.preventDefault = !1;
              break;
          }
        else
          p.preventDefault = !1;
      }
      function N(p) {
        var E = {
          originalEvent: p.originalEvent
        };
        this.raiseEvent("canvas-key-press", E);
      }
      function Z(p) {
        var E, L = document.activeElement === this.canvas;
        L || this.canvas.focus(), this.viewport.flipped && (p.position.x = this.viewport.getContainerSize().x - p.position.x);
        var W = {
          tracker: p.eventSource,
          position: p.position,
          quick: p.quick,
          shift: p.shift,
          originalEvent: p.originalEvent,
          originalTarget: p.originalTarget,
          preventDefaultAction: !1
        };
        this.raiseEvent("canvas-click", W), !W.preventDefaultAction && this.viewport && p.quick && (E = this.gestureSettingsByDeviceType(p.pointerType), E.clickToZoom === !0 && (this.viewport.zoomBy(
          p.shift ? 1 / this.zoomPerClick : this.zoomPerClick,
          E.zoomToRefPoint ? this.viewport.pointFromPixel(p.position, !0) : null
        ), this.viewport.applyConstraints()), E.dblClickDragToZoom && (l[this.hash].draggingToZoom === !0 ? (l[this.hash].lastClickTime = null, l[this.hash].draggingToZoom = !1) : l[this.hash].lastClickTime = a.now()));
      }
      function ie(p) {
        var E, L = {
          tracker: p.eventSource,
          position: p.position,
          shift: p.shift,
          originalEvent: p.originalEvent,
          preventDefaultAction: !1
        };
        this.raiseEvent("canvas-double-click", L), !L.preventDefaultAction && this.viewport && (E = this.gestureSettingsByDeviceType(p.pointerType), E.dblClickToZoom && (this.viewport.zoomBy(
          p.shift ? 1 / this.zoomPerClick : this.zoomPerClick,
          E.zoomToRefPoint ? this.viewport.pointFromPixel(p.position, !0) : null
        ), this.viewport.applyConstraints()));
      }
      function se(p) {
        var E, L = {
          tracker: p.eventSource,
          pointerType: p.pointerType,
          position: p.position,
          delta: p.delta,
          speed: p.speed,
          direction: p.direction,
          shift: p.shift,
          originalEvent: p.originalEvent,
          preventDefaultAction: !1
        };
        if (this.raiseEvent("canvas-drag", L), E = this.gestureSettingsByDeviceType(p.pointerType), !L.preventDefaultAction && this.viewport) {
          if (E.dblClickDragToZoom && l[this.hash].draggingToZoom) {
            var W = Math.pow(this.zoomPerDblClickDrag, p.delta.y / 50);
            this.viewport.zoomBy(W);
          } else if (E.dragToPan && !l[this.hash].draggingToZoom) {
            if (this.panHorizontal || (p.delta.x = 0), this.panVertical || (p.delta.y = 0), this.viewport.flipped && (p.delta.x = -p.delta.x), this.constrainDuringPan) {
              var le = this.viewport.deltaPointsFromPixels(p.delta.negate());
              this.viewport.centerSpringX.target.value += le.x, this.viewport.centerSpringY.target.value += le.y;
              var he = this.viewport.getConstrainedBounds();
              this.viewport.centerSpringX.target.value -= le.x, this.viewport.centerSpringY.target.value -= le.y, he.xConstrained && (p.delta.x = 0), he.yConstrained && (p.delta.y = 0);
            }
            this.viewport.panBy(this.viewport.deltaPointsFromPixels(p.delta.negate()), E.flickEnabled && !this.constrainDuringPan);
          }
        }
      }
      function de(p) {
        var E, L = {
          tracker: p.eventSource,
          pointerType: p.pointerType,
          position: p.position,
          speed: p.speed,
          direction: p.direction,
          shift: p.shift,
          originalEvent: p.originalEvent,
          preventDefaultAction: !1
        };
        if (this.raiseEvent("canvas-drag-end", L), E = this.gestureSettingsByDeviceType(p.pointerType), !L.preventDefaultAction && this.viewport) {
          if (!l[this.hash].draggingToZoom && E.dragToPan && E.flickEnabled && p.speed >= E.flickMinSpeed) {
            var W = 0;
            this.panHorizontal && (W = E.flickMomentum * p.speed * Math.cos(p.direction));
            var le = 0;
            this.panVertical && (le = E.flickMomentum * p.speed * Math.sin(p.direction));
            var he = this.viewport.pixelFromPoint(
              this.viewport.getCenter(!0)
            ), q = this.viewport.pointFromPixel(
              new a.Point(he.x - W, he.y - le)
            );
            this.viewport.panTo(q, !1);
          }
          this.viewport.applyConstraints();
        }
        E.dblClickDragToZoom && l[this.hash].draggingToZoom === !0 && (l[this.hash].draggingToZoom = !1);
      }
      function ue(p) {
        this.raiseEvent("canvas-enter", {
          tracker: p.eventSource,
          pointerType: p.pointerType,
          position: p.position,
          buttons: p.buttons,
          pointers: p.pointers,
          insideElementPressed: p.insideElementPressed,
          buttonDownAny: p.buttonDownAny,
          originalEvent: p.originalEvent
        });
      }
      function Te(p) {
        this.raiseEvent("canvas-exit", {
          tracker: p.eventSource,
          pointerType: p.pointerType,
          position: p.position,
          buttons: p.buttons,
          pointers: p.pointers,
          insideElementPressed: p.insideElementPressed,
          buttonDownAny: p.buttonDownAny,
          originalEvent: p.originalEvent
        });
      }
      function Ce(p) {
        var E;
        if (this.raiseEvent("canvas-press", {
          tracker: p.eventSource,
          pointerType: p.pointerType,
          position: p.position,
          insideElementPressed: p.insideElementPressed,
          insideElementReleased: p.insideElementReleased,
          originalEvent: p.originalEvent
        }), E = this.gestureSettingsByDeviceType(p.pointerType), E.dblClickDragToZoom) {
          var L = l[this.hash].lastClickTime, W = a.now();
          if (L === null)
            return;
          W - L < this.dblClickTimeThreshold && (l[this.hash].draggingToZoom = !0), l[this.hash].lastClickTime = null;
        }
      }
      function ke(p) {
        this.raiseEvent("canvas-release", {
          tracker: p.eventSource,
          pointerType: p.pointerType,
          position: p.position,
          insideElementPressed: p.insideElementPressed,
          insideElementReleased: p.insideElementReleased,
          originalEvent: p.originalEvent
        });
      }
      function Le(p) {
        this.raiseEvent("canvas-nonprimary-press", {
          tracker: p.eventSource,
          position: p.position,
          pointerType: p.pointerType,
          button: p.button,
          buttons: p.buttons,
          originalEvent: p.originalEvent
        });
      }
      function ve(p) {
        this.raiseEvent("canvas-nonprimary-release", {
          tracker: p.eventSource,
          position: p.position,
          pointerType: p.pointerType,
          button: p.button,
          buttons: p.buttons,
          originalEvent: p.originalEvent
        });
      }
      function Ze(p) {
        var E, L, W, le, he = {
          tracker: p.eventSource,
          pointerType: p.pointerType,
          gesturePoints: p.gesturePoints,
          lastCenter: p.lastCenter,
          center: p.center,
          lastDistance: p.lastDistance,
          distance: p.distance,
          shift: p.shift,
          originalEvent: p.originalEvent,
          preventDefaultPanAction: !1,
          preventDefaultZoomAction: !1,
          preventDefaultRotateAction: !1
        };
        if (this.raiseEvent("canvas-pinch", he), this.viewport && (E = this.gestureSettingsByDeviceType(p.pointerType), E.pinchToZoom && (!he.preventDefaultPanAction || !he.preventDefaultZoomAction) && (L = this.viewport.pointFromPixel(p.center, !0), E.zoomToRefPoint && !he.preventDefaultPanAction && (W = this.viewport.pointFromPixel(p.lastCenter, !0), le = W.minus(L), this.panHorizontal || (le.x = 0), this.panVertical || (le.y = 0), this.viewport.panBy(le, !0)), he.preventDefaultZoomAction || this.viewport.zoomBy(p.distance / p.lastDistance, L, !0), this.viewport.applyConstraints()), E.pinchRotate && !he.preventDefaultRotateAction)) {
          var q = Math.atan2(
            p.gesturePoints[0].currentPos.y - p.gesturePoints[1].currentPos.y,
            p.gesturePoints[0].currentPos.x - p.gesturePoints[1].currentPos.x
          ), oe = Math.atan2(
            p.gesturePoints[0].lastPos.y - p.gesturePoints[1].lastPos.y,
            p.gesturePoints[0].lastPos.x - p.gesturePoints[1].lastPos.x
          );
          L = this.viewport.pointFromPixel(p.center, !0), this.viewport.rotateTo(this.viewport.getRotation(!0) + (q - oe) * (180 / Math.PI), L, !0);
        }
      }
      function Ke(p) {
        this.raiseEvent("canvas-focus", {
          tracker: p.eventSource,
          originalEvent: p.originalEvent
        });
      }
      function Ie(p) {
        this.raiseEvent("canvas-blur", {
          tracker: p.eventSource,
          originalEvent: p.originalEvent
        });
      }
      function V(p) {
        var E, L, W, le, he;
        le = a.now(), he = le - this._lastScrollTime, he > this.minScrollDeltaTime ? (this._lastScrollTime = le, E = {
          tracker: p.eventSource,
          position: p.position,
          scroll: p.scroll,
          shift: p.shift,
          originalEvent: p.originalEvent,
          preventDefaultAction: !1,
          preventDefault: !0
        }, this.raiseEvent("canvas-scroll", E), !E.preventDefaultAction && this.viewport && (this.viewport.flipped && (p.position.x = this.viewport.getContainerSize().x - p.position.x), L = this.gestureSettingsByDeviceType(p.pointerType), L.scrollToZoom && (W = Math.pow(this.zoomPerScroll, p.scroll), this.viewport.zoomBy(
          W,
          L.zoomToRefPoint ? this.viewport.pointFromPixel(p.position, !0) : null
        ), this.viewport.applyConstraints())), p.preventDefault = E.preventDefault) : p.preventDefault = !0;
      }
      function ne(p) {
        l[this.hash].mouseInside = !0, b(this), this.raiseEvent("container-enter", {
          tracker: p.eventSource,
          pointerType: p.pointerType,
          position: p.position,
          buttons: p.buttons,
          pointers: p.pointers,
          insideElementPressed: p.insideElementPressed,
          buttonDownAny: p.buttonDownAny,
          originalEvent: p.originalEvent
        });
      }
      function ge(p) {
        p.pointers < 1 && (l[this.hash].mouseInside = !1, l[this.hash].animating || m(this)), this.raiseEvent("container-exit", {
          tracker: p.eventSource,
          pointerType: p.pointerType,
          position: p.position,
          buttons: p.buttons,
          pointers: p.pointers,
          insideElementPressed: p.insideElementPressed,
          buttonDownAny: p.buttonDownAny,
          originalEvent: p.originalEvent
        });
      }
      function ze(p) {
        B(p), p.isOpen() ? p._updateRequestId = c(p, ze) : p._updateRequestId = !1;
      }
      function He(p, E) {
        var L = p.viewport, W = L.getZoom(), le = L.getCenter();
        L.resize(E, p.preserveImageSizeOnResize), L.panTo(le, !0);
        var he;
        if (p.preserveImageSizeOnResize)
          he = l[p.hash].prevContainerSize.x / E.x;
        else {
          var q = new a.Point(0, 0), oe = new a.Point(l[p.hash].prevContainerSize.x, l[p.hash].prevContainerSize.y).distanceTo(q), we = new a.Point(E.x, E.y).distanceTo(q);
          he = we / oe * l[p.hash].prevContainerSize.x / E.x;
        }
        L.zoomTo(W * he, null, !0), l[p.hash].prevContainerSize = E, l[p.hash].forceRedraw = !0, l[p.hash].needsResize = !1, l[p.hash].forceResize = !1;
      }
      function B(p) {
        if (!(p._opening || !l[p.hash])) {
          if (p.autoResize || l[p.hash].forceResize) {
            var E;
            if (p._autoResizePolling) {
              E = r(p.container);
              var L = l[p.hash].prevContainerSize;
              E.equals(L) || (l[p.hash].needsResize = !0);
            }
            l[p.hash].needsResize && He(p, E || r(p.container));
          }
          var W = p.viewport.update(), le = p.world.update(W) || W;
          W && p.raiseEvent("viewport-change"), p.referenceStrip && (le = p.referenceStrip.update(p.viewport) || le);
          var he = l[p.hash].animating;
          !he && le && (p.raiseEvent("animation-start"), b(p));
          var q = he && !le;
          q && (l[p.hash].animating = !1), (le || q || l[p.hash].forceRedraw || p.world.needsDraw()) && (I(p), p._drawOverlays(), p.navigator && p.navigator.update(p.viewport), l[p.hash].forceRedraw = !1, le && p.raiseEvent("animation")), q && (p.raiseEvent("animation-finish"), l[p.hash].mouseInside || m(p)), l[p.hash].animating = le;
        }
      }
      function I(p) {
        p.imageLoader.clear(), p.world.draw(), p.raiseEvent("update-viewport", {});
      }
      function J(p, E) {
        return p ? p + E : E;
      }
      function ce() {
        l[this.hash].lastZoomTime = a.now(), l[this.hash].zoomFactor = this.zoomPerSecond, l[this.hash].zooming = !0, Fe(this);
      }
      function Ee() {
        l[this.hash].lastZoomTime = a.now(), l[this.hash].zoomFactor = 1 / this.zoomPerSecond, l[this.hash].zooming = !0, Fe(this);
      }
      function Be() {
        l[this.hash].zooming = !1;
      }
      function Fe(p) {
        a.requestAnimationFrame(a.delegate(p, lt));
      }
      function lt() {
        var p, E, L;
        l[this.hash].zooming && this.viewport && (p = a.now(), E = p - l[this.hash].lastZoomTime, L = Math.pow(l[this.hash].zoomFactor, E / 1e3), this.viewport.zoomBy(L), this.viewport.applyConstraints(), l[this.hash].lastZoomTime = p, Fe(this));
      }
      function rt() {
        this.viewport && (l[this.hash].zooming = !1, this.viewport.zoomBy(
          this.zoomPerClick / 1
        ), this.viewport.applyConstraints());
      }
      function re() {
        this.viewport && (l[this.hash].zooming = !1, this.viewport.zoomBy(
          1 / this.zoomPerClick
        ), this.viewport.applyConstraints());
      }
      function be() {
        this.buttonGroup && (this.buttonGroup.emulateEnter(), this.buttonGroup.emulateLeave());
      }
      function xe() {
        this.viewport && this.viewport.goHome();
      }
      function Ve() {
        this.isFullPage() && !a.isFullScreen() ? this.setFullPage(!1) : this.setFullScreen(!this.isFullPage()), this.buttonGroup && this.buttonGroup.emulateLeave(), this.fullPageButton.element.focus(), this.viewport && this.viewport.applyConstraints();
      }
      function Ye() {
        if (this.viewport) {
          var p = this.viewport.getRotation();
          this.viewport.flipped ? p += this.rotationIncrement : p -= this.rotationIncrement, this.viewport.setRotation(p);
        }
      }
      function tt() {
        if (this.viewport) {
          var p = this.viewport.getRotation();
          this.viewport.flipped ? p -= this.rotationIncrement : p += this.rotationIncrement, this.viewport.setRotation(p);
        }
      }
      function wt() {
        this.viewport.toggleFlip();
      }
      a.determineDrawer = function(p) {
        for (let E in K) {
          const L = K[E], W = L.prototype;
          if (W && W instanceof K.DrawerBase && a.isFunction(W.getType) && W.getType.call(L) === p)
            return L;
        }
        return null;
      };
    })(K), (function(a) {
      a.Navigator = function(c) {
        var g = c.viewer, m = this, T, b;
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
        }), c.minPixelRatio = this.minPixelRatio = g.minPixelRatio, a.setElementTouchActionNone(this.element), this.borderWidth = 2, this.fudge = new a.Point(1, 1), this.totalBorderWidths = new a.Point(this.borderWidth * 2, this.borderWidth * 2).minus(this.fudge), c.controlOptions.anchor !== a.ControlAnchor.NONE && (function(A, M) {
          A.margin = "0px", A.border = M + "px solid " + c.borderColor, A.padding = "0px", A.background = c.background, A.opacity = c.opacity, A.overflow = "hidden";
        })(this.element.style, this.borderWidth), this.displayRegion = a.makeNeutralElement("div"), this.displayRegion.id = this.element.id + "-displayregion", this.displayRegion.className = "displayregion", (function(A, M) {
          A.position = "relative", A.top = "0px", A.left = "0px", A.fontSize = "0px", A.overflow = "hidden", A.border = M + "px solid " + c.displayRegionColor, A.margin = "0px", A.padding = "0px", A.background = "transparent", A.float = "left", A.cssFloat = "left", A.zIndex = 999999999, A.cursor = "default", A.boxSizing = "content-box";
        })(this.displayRegion.style, this.borderWidth), a.setElementPointerEventsNone(this.displayRegion), a.setElementTouchActionNone(this.displayRegion), this.displayRegionContainer = a.makeNeutralElement("div"), this.displayRegionContainer.id = this.element.id + "-displayregioncontainer", this.displayRegionContainer.className = "displayregioncontainer", this.displayRegionContainer.style.width = "100%", this.displayRegionContainer.style.height = "100%", a.setElementPointerEventsNone(this.displayRegionContainer), a.setElementTouchActionNone(this.displayRegionContainer), g.addControl(
          this.element,
          c.controlOptions
        ), this._resizeWithViewer = c.controlOptions.anchor !== a.ControlAnchor.ABSOLUTE && c.controlOptions.anchor !== a.ControlAnchor.NONE, c.width && c.height ? (this.setWidth(c.width), this.setHeight(c.height)) : this._resizeWithViewer && (T = a.getElementSize(g.element), this.element.style.height = Math.round(T.y * c.sizeRatio) + "px", this.element.style.width = Math.round(T.x * c.sizeRatio) + "px", this.oldViewerSize = T, b = a.getElementSize(this.element), this.elementArea = b.x * b.y), this.oldContainerSize = new a.Point(0, 0), a.Viewer.apply(this, [c]), this.displayRegionContainer.appendChild(this.displayRegion), this.element.getElementsByTagName("div")[0].appendChild(this.displayRegionContainer);
        function C(A, M) {
          d(m.displayRegionContainer, A), d(m.displayRegion, -A), m.viewport.setRotation(A, M);
        }
        if (c.navigatorRotate) {
          var w = c.viewer.viewport ? c.viewer.viewport.getRotation() : c.viewer.degrees || 0;
          C(w, !0), c.viewer.addHandler("rotate", function(A) {
            C(A.degrees, A.immediately);
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
          preProcessEventHandler: function(A) {
            A.eventType === "wheel" && (A.preventDefault = !0);
          }
        }), this.outerTracker.userData = "Navigator.outerTracker", a.setElementPointerEventsNone(this.canvas), a.setElementPointerEventsNone(this.container), this.addHandler("reset-size", function() {
          m.viewport && m.viewport.goHome(!0);
        }), g.world.addHandler("item-index-change", function(A) {
          window.setTimeout(function() {
            var M = m.world.getItemAt(A.previousIndex);
            m.world.setItemIndex(M, A.newIndex);
          }, 1);
        }), g.world.addHandler("remove-item", function(A) {
          var M = A.item, N = m._getMatchingItem(M);
          N && m.world.removeItem(N);
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
            var g, m, T, b, C, w;
            if (c || (c = this.viewer.viewport), g = a.getElementSize(this.viewer.element), this._resizeWithViewer && g.x && g.y && !g.equals(this.oldViewerSize) && (this.oldViewerSize = g, this.maintainSizeRatio || !this.elementArea ? (m = g.x * this.sizeRatio, T = g.y * this.sizeRatio) : (m = Math.sqrt(this.elementArea * (g.x / g.y)), T = this.elementArea / m), this.element.style.width = Math.round(m) + "px", this.element.style.height = Math.round(T) + "px", this.elementArea || (this.elementArea = m * T), this.updateSize()), c && this.viewport) {
              if (b = c.getBoundsNoRotate(!0), C = this.viewport.pixelFromPointNoRotate(b.getTopLeft(), !1), w = this.viewport.pixelFromPointNoRotate(b.getBottomRight(), !1).minus(this.totalBorderWidths), !this.navigatorRotate) {
                var A = c.getRotation(!0);
                d(this.displayRegion, -A);
              }
              var M = this.displayRegion.style;
              M.display = this.world.getItemCount() ? "block" : "none", M.top = C.y.toFixed(2) + "px", M.left = C.x.toFixed(2) + "px";
              var N = w.x - C.x, Z = w.y - C.y;
              M.width = Math.round(Math.max(N, 0)) + "px", M.height = Math.round(Math.max(Z, 0)) + "px";
            }
          },
          // overrides Viewer.addTiledImage
          addTiledImage: function(c) {
            var g = this, m = c.originalTiledImage;
            delete c.original;
            var T = a.extend({}, c, {
              success: function(b) {
                var C = b.item;
                C._originalForNavigator = m, g._matchBounds(C, m, !0), g._matchOpacity(C, m), g._matchCompositeOperation(C, m);
                function w() {
                  g._matchBounds(C, m);
                }
                function A() {
                  g._matchOpacity(C, m);
                }
                function M() {
                  g._matchCompositeOperation(C, m);
                }
                m.addHandler("bounds-change", w), m.addHandler("clip-change", w), m.addHandler("opacity-change", A), m.addHandler("composite-operation-change", M);
              }
            });
            return a.Viewer.prototype.addTiledImage.apply(this, [T]);
          },
          destroy: function() {
            return a.Viewer.prototype.destroy.apply(this);
          },
          // private
          _getMatchingItem: function(c) {
            for (var g = this.world.getItemCount(), m, T = 0; T < g; T++)
              if (m = this.world.getItemAt(T), m._originalForNavigator === c)
                return m;
            return null;
          },
          // private
          _matchBounds: function(c, g, m) {
            var T = g.getBoundsNoRotate();
            c.setPosition(T.getTopLeft(), m), c.setWidth(T.width, m), c.setRotation(g.getRotation(), m), c.setClip(g.getClip()), c.setFlip(g.getFlip());
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
          var m = this.viewport.pointFromPixel(c.position);
          this.panVertical ? this.panHorizontal || (m.x = this.viewer.viewport.getCenter(!0).x) : m.y = this.viewer.viewport.getCenter(!0).y, this.viewer.viewport.panTo(m), this.viewer.viewport.applyConstraints();
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
              var m = parseInt(g.match(/\d+/), 10) + 1;
              return m < d.length ? d[m] : "";
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
        var g = this, m = arguments, T, b;
        if (a.isPlainObject(o) ? T = o : T = {
          width: m[0],
          height: m[1],
          tileSize: m[2],
          tileOverlap: m[3],
          minLevel: m[4],
          maxLevel: m[5]
        }, a.EventSource.call(this), a.extend(!0, this, T), !this.success) {
          for (b = 0; b < arguments.length; b++)
            if (a.isFunction(arguments[b])) {
              this.success = arguments[b];
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
          var d = this.dimensions.x * this.getLevelScale(o), h = r.x * d, c = r.y * d, g = Math.floor(h / this.getTileWidth(o)), m = Math.floor(c / this.getTileHeight(o));
          r.x >= 1 && (g = this.getNumTiles(o).x - 1);
          var T = 1e-15;
          return r.y >= 1 / this.aspectRatio - T && (m = this.getNumTiles(o).y - 1), new a.Point(g, m);
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
          var h = this.dimensions.times(this.getLevelScale(o)), c = this.getTileWidth(o), g = this.getTileHeight(o), m = r === 0 ? 0 : c * r - this.tileOverlap, T = f === 0 ? 0 : g * f - this.tileOverlap, b = c + (r === 0 ? 1 : 2) * this.tileOverlap, C = g + (f === 0 ? 1 : 2) * this.tileOverlap, w = 1 / h.x;
          return b = Math.min(b, h.x - m), C = Math.min(C, h.y - T), d ? new a.Rect(0, 0, b, C) : new a.Rect(m * w, T * w, b * w, C * w);
        },
        /**
         * Responsible for retrieving, and caching the
         * image metadata pertinent to this TileSources implementation.
         * @function
         * @param {String} url
         * @throws {Error}
         */
        getImageInfo: function(o) {
          var r = this, f, d, h, c, g, m, T;
          o && (g = o.split("/"), m = g[g.length - 1], T = m.lastIndexOf("."), T > -1 && (g[g.length - 1] = m.slice(0, T)));
          var b = null;
          if (this.splitHashDataForPost) {
            var C = o.indexOf("#");
            C !== -1 && (b = o.substring(C + 1), o = o.substr(0, C));
          }
          d = function(w) {
            typeof w == "string" && (w = a.parseXml(w));
            var A = a.TileSource.determineType(r, w, o);
            if (!A) {
              r.raiseEvent("open-failed", { message: "Unable to load TileSource", source: o });
              return;
            }
            c = A.prototype.configure.apply(r, [w, o, b]), c.ajaxWithCredentials === void 0 && (c.ajaxWithCredentials = r.ajaxWithCredentials), h = new A(c), r.ready = !0, r.raiseEvent("ready", { tileSource: h });
          }, o.match(/\.js$/) ? (f = o.split("/").pop().replace(".js", ""), a.jsonp({
            url: o,
            async: !1,
            callbackName: f,
            callback: d
          })) : a.makeAjaxRequest({
            url: o,
            postData: b,
            withCredentials: this.ajaxWithCredentials,
            headers: this.ajaxHeaders,
            success: function(w) {
              var A = l(w);
              d(A);
            },
            error: function(w, A) {
              var M;
              try {
                M = "HTTP " + w.status + " attempting to load TileSource: " + o;
              } catch {
                var N;
                typeof A > "u" || !A.toString ? N = "Unknown error" : N = A.toString(), M = N + " attempting to load TileSource: " + o;
              }
              a.console.error(M), r.raiseEvent("open-failed", {
                message: M,
                source: o,
                postData: b
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
          function g(m) {
            return h ? m + "+" + JSON.stringify(h) : m;
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
                  var m = new g();
                  m.append(h.response), c = m.getBlob();
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
      a.DziTileSource = function(r, f, d, h, c, g, m, T, b) {
        var C, w, A, M;
        if (a.isPlainObject(r) ? M = r : M = {
          width: arguments[0],
          height: arguments[1],
          tileSize: arguments[2],
          tileOverlap: arguments[3],
          tilesUrl: arguments[4],
          fileFormat: arguments[5],
          displayRects: arguments[6],
          minLevel: arguments[7],
          maxLevel: arguments[8]
        }, this._levelRects = {}, this.tilesUrl = M.tilesUrl, this.fileFormat = M.fileFormat, this.displayRects = M.displayRects, this.displayRects)
          for (C = this.displayRects.length - 1; C >= 0; C--)
            for (w = this.displayRects[C], A = w.minLevel; A <= w.maxLevel; A++)
              this._levelRects[A] || (this._levelRects[A] = []), this._levelRects[A].push(w);
        a.TileSource.apply(this, [M]);
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
            var h = this._levelRects[r], c, g, m, T, b, C, w;
            if (this.minLevel && r < this.minLevel || this.maxLevel && r > this.maxLevel)
              return !1;
            if (!h || !h.length)
              return !0;
            for (w = h.length - 1; w >= 0; w--)
              if (c = h[w], !(r < c.minLevel || r > c.maxLevel) && (g = this.getLevelScale(r), m = c.x * g, T = c.y * g, b = m + c.width * g, C = T + c.height * g, m = Math.floor(m / this._tileWidth), T = Math.floor(T / this._tileWidth), b = Math.ceil(b / this._tileWidth), C = Math.ceil(C / this._tileWidth), m <= f && f < b && T <= d && d < C))
                return !0;
            return !1;
          }
        }
      );
      function l(r, f) {
        if (!f || !f.documentElement)
          throw new Error(a.getString("Errors.Xml"));
        var d = f.documentElement, h = d.localName || d.tagName, c = f.documentElement.namespaceURI, g = null, m = [], T, b, C, w, A;
        if (h === "Image")
          try {
            if (w = d.getElementsByTagName("Size")[0], w === void 0 && (w = d.getElementsByTagNameNS(c, "Size")[0]), g = {
              Image: {
                xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                Url: d.getAttribute("Url"),
                Format: d.getAttribute("Format"),
                DisplayRect: null,
                Overlap: parseInt(d.getAttribute("Overlap"), 10),
                TileSize: parseInt(d.getAttribute("TileSize"), 10),
                Size: {
                  Height: parseInt(w.getAttribute("Height"), 10),
                  Width: parseInt(w.getAttribute("Width"), 10)
                }
              }
            }, !a.imageFormatSupported(g.Image.Format))
              throw new Error(
                a.getString("Errors.ImageFormat", g.Image.Format.toUpperCase())
              );
            for (T = d.getElementsByTagName("DisplayRect"), T === void 0 && (T = d.getElementsByTagNameNS(c, "DisplayRect")[0]), A = 0; A < T.length; A++)
              b = T[A], C = b.getElementsByTagName("Rect")[0], C === void 0 && (C = b.getElementsByTagNameNS(c, "Rect")[0]), m.push({
                Rect: {
                  X: parseInt(C.getAttribute("X"), 10),
                  Y: parseInt(C.getAttribute("Y"), 10),
                  Width: parseInt(C.getAttribute("Width"), 10),
                  Height: parseInt(C.getAttribute("Height"), 10),
                  MinLevel: parseInt(b.getAttribute("MinLevel"), 10),
                  MaxLevel: parseInt(b.getAttribute("MaxLevel"), 10)
                }
              });
            return m.length && (g.Image.DisplayRect = m), o(r, g);
          } catch (Z) {
            throw Z instanceof Error ? Z : new Error(a.getString("Errors.Dzi"));
          }
        else {
          if (h === "Collection")
            throw new Error(a.getString("Errors.Dzc"));
          if (h === "Error") {
            var M = d.getElementsByTagName("Message")[0], N = M.firstChild.nodeValue;
            throw new Error(N);
          }
        }
        throw new Error(a.getString("Errors.Dzi"));
      }
      function o(r, f) {
        var d = f.Image, h = d.Url, c = d.Format, g = d.Size, m = d.DisplayRect || [], T = parseInt(g.Width, 10), b = parseInt(g.Height, 10), C = parseInt(d.TileSize, 10), w = parseInt(d.Overlap, 10), A = [], M, N;
        for (N = 0; N < m.length; N++)
          M = m[N].Rect, A.push(new a.DisplayRect(
            parseInt(M.X, 10),
            parseInt(M.Y, 10),
            parseInt(M.Width, 10),
            parseInt(M.Height, 10),
            parseInt(M.MinLevel, 10),
            parseInt(M.MaxLevel, 10)
          ));
        return a.extend(!0, {
          width: T,
          /* width *required */
          height: b,
          /* height *required */
          tileSize: C,
          /* tileSize *required */
          tileOverlap: w,
          /* tileOverlap *required */
          minLevel: null,
          /* minLevel */
          maxLevel: null,
          /* maxLevel */
          tilesUrl: h,
          /* tilesUrl */
          fileFormat: c,
          /* fileFormat */
          displayRects: A
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
          for (var m = Math.min(this.height, this.width), T = [256, 512, 1024], b = [], C = 0; C < T.length; C++)
            T[C] <= m && b.push(T[C]);
          b.length > 0 ? d.tileSize = Math.max.apply(null, b) : d.tileSize = m;
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
            var w = Math.max.apply(null, this.scale_factors);
            d.maxLevel = Math.round(Math.log(w) * Math.LOG2E);
          }
        if (this.sizes) {
          var A = this.sizes.length;
          (A === d.maxLevel || A === d.maxLevel + 1) && (this.levelSizes = this.sizes.slice().sort((M, N) => M.width - N.width), A === d.maxLevel && this.levelSizes.push({ width: this.width, height: this.height }));
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
                var m = d["@context"];
                if (Array.isArray(m)) {
                  for (var T = 0; T < m.length; T++)
                    if (typeof m[T] == "string" && (/^http:\/\/iiif\.io\/api\/image\/[1-3]\/context\.json$/.test(m[T]) || m[T] === "http://library.stanford.edu/iiif/image-api/1.1/context.json")) {
                      m = m[T];
                      break;
                    }
                }
                switch (m) {
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
                for (var b = 0; b < d.preferredFormats.length; b++)
                  if (K.imageFormatSupported(d.preferredFormats[b])) {
                    d.tileFormat = d.preferredFormats[b];
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
              var c = this.levelSizes[d], g = Math.ceil(c.width / this.getTileWidth(d)), m = Math.ceil(c.height / this.getTileHeight(d));
              return new a.Point(g, m);
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
              var g = this.levelSizes[d].width, m = h.x * g, T = h.y * g, b = Math.floor(m / this.getTileWidth(d)), C = Math.floor(T / this.getTileHeight(d));
              h.x >= 1 && (b = this.getNumTiles(d).x - 1);
              var w = 1e-15;
              return h.y >= 1 / this.aspectRatio - w && (C = this.getNumTiles(d).y - 1), new a.Point(b, C);
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
            var m = "0", T = Math.pow(0.5, this.maxLevel - d), b, C, w, A, M, N, Z, ie, se, de, ue, Te, Ce, ke, Le, ve;
            return this.levelSizes ? (b = this.levelSizes[d].width, C = this.levelSizes[d].height) : (b = Math.ceil(this.width * T), C = Math.ceil(this.height * T)), w = this.getTileWidth(d), A = this.getTileHeight(d), M = Math.round(w / T), N = Math.round(A / T), this.version === 1 ? Le = "native." + this.tileFormat : Le = "default." + this.tileFormat, b < w && C < A ? (this.version === 2 && b === this.width ? Te = "full" : this.version === 3 && b === this.width && C === this.height ? Te = "max" : this.version === 3 ? Te = b + "," + C : Te = b + ",", Z = "full") : (ie = h * M, se = c * N, de = Math.min(M, this.width - ie), ue = Math.min(N, this.height - se), h === 0 && c === 0 && de === this.width && ue === this.height ? Z = "full" : Z = [ie, se, de, ue].join(","), Ce = Math.min(w, b - h * w), ke = Math.min(A, C - c * A), this.version === 2 && Ce === this.width ? Te = "full" : this.version === 3 && Ce === this.width && ke === this.height ? Te = "max" : this.version === 3 ? Te = Ce + "," + ke : Te = Ce + ","), ve = [this._id, Z, Te, m, Le].join("/"), ve;
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
        ], c = Array.isArray(d.profile) ? d.profile[0] : d.profile, g = h.indexOf(c) !== -1, m = !1;
        return d.version === 2 && d.profile.length > 1 && d.profile[1].supports && (m = d.profile[1].supports.indexOf("sizeByW") !== -1), d.version === 3 && d.extraFeatures && (m = d.extraFeatures.indexOf("sizeByWh") !== -1), !g || m;
      }
      function o(d) {
        for (var h = [], c = 0; c < d.sizes.length; c++)
          h.push({
            url: d._id + "/full/" + d.sizes[c].width + "," + (d.version === 3 ? d.sizes[c].height : "") + "/0/default." + d.tileFormat,
            width: d.sizes[c].width,
            height: d.sizes[c].height
          });
        return h.sort(function(g, m) {
          return g.width - m.width;
        });
      }
      function r(d) {
        if (!d || !d.documentElement)
          throw new Error(a.getString("Errors.Xml"));
        var h = d.documentElement, c = h.tagName, g = null;
        if (c === "info")
          try {
            return g = {}, f(h, g), g;
          } catch (m) {
            throw m instanceof Error ? m : new Error(a.getString("Errors.IIIF"));
          }
        throw new Error(a.getString("Errors.IIIF"));
      }
      function f(d, h, c) {
        var g, m;
        if (d.nodeType === 3 && c)
          m = d.nodeValue.trim(), m.match(/^\d*$/) && (m = Number(m)), h[c] ? (a.isArray(h[c]) || (h[c] = [h[c]]), h[c].push(m)) : h[c] = m;
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
        var c = Math.ceil(h.width / 256) * 256, g = Math.ceil(h.height / 256) * 256, m;
        c > g ? m = c / 256 : m = g / 256, h.maxLevel = Math.ceil(Math.log(m) / Math.log(2)) - 1, h.tileSize = 256, h.width = c, h.height = g, a.TileSource.apply(this, [h]);
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
        return d.sort(function(g, m) {
          return g.height - m.height;
        });
      }
      function o(f, d) {
        if (!d || !d.documentElement)
          throw new Error(a.getString("Errors.Xml"));
        var h = d.documentElement, c = h.tagName, g = null, m = [], T, b;
        if (c === "image")
          try {
            for (g = {
              type: h.getAttribute("type"),
              levels: []
            }, m = h.getElementsByTagName("level"), b = 0; b < m.length; b++)
              T = m[b], g.levels.push({
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
          enterHandler: function(m) {
            m.insideElementPressed ? (d(g, a.ButtonState.DOWN), g.raiseEvent("enter", { originalEvent: m.originalEvent })) : m.buttonDownAny || d(g, a.ButtonState.HOVER);
          },
          focusHandler: function(m) {
            g.tracker.enterHandler(m), g.raiseEvent("focus", { originalEvent: m.originalEvent });
          },
          leaveHandler: function(m) {
            h(g, a.ButtonState.GROUP), m.insideElementPressed && g.raiseEvent("exit", { originalEvent: m.originalEvent });
          },
          blurHandler: function(m) {
            g.tracker.leaveHandler(m), g.raiseEvent("blur", { originalEvent: m.originalEvent });
          },
          pressHandler: function(m) {
            d(g, a.ButtonState.DOWN), g.raiseEvent("press", { originalEvent: m.originalEvent });
          },
          releaseHandler: function(m) {
            m.insideElementPressed && m.insideElementReleased ? (h(g, a.ButtonState.HOVER), g.raiseEvent("release", { originalEvent: m.originalEvent })) : m.insideElementPressed ? h(g, a.ButtonState.GROUP) : d(g, a.ButtonState.HOVER);
          },
          clickHandler: function(m) {
            m.quick && g.raiseEvent("click", { originalEvent: m.originalEvent });
          },
          keyHandler: function(m) {
            m.keyCode === 13 ? (g.raiseEvent("click", { originalEvent: m.originalEvent }), g.raiseEvent("release", { originalEvent: m.originalEvent }), m.preventDefault = !0) : m.preventDefault = !1;
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
        var g, m, T;
        c.shouldFade && (g = a.now(), m = g - c.fadeBeginTime, T = 1 - m / c.fadeLength, T = Math.min(1, T), T = Math.max(0, T), c.imgGroup && a.setElementOpacity(c.imgGroup, T, !0), T > 0 && l(c));
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
          var m = l.getTopRight();
          this.containsPoint(m, o) && r.push(m);
          var T = l.getBottomLeft();
          this.containsPoint(T, o) && r.push(T);
          var b = l.getBottomRight();
          this.containsPoint(b, o) && r.push(b);
          for (var C = this._getSegments(), w = l._getSegments(), A = 0; A < C.length; A++)
            for (var M = C[A], N = 0; N < w.length; N++) {
              var Z = w[N], ie = se(
                M[0],
                M[1],
                Z[0],
                Z[1]
              );
              ie && r.push(ie);
            }
          function se(ve, Ze, Ke, Ie) {
            var V = Ze.minus(ve), ne = Ie.minus(Ke), ge = -ne.x * V.y + V.x * ne.y;
            if (ge === 0)
              return null;
            var ze = (V.x * (ve.y - Ke.y) - V.y * (ve.x - Ke.x)) / ge, He = (ne.x * (ve.y - Ke.y) - ne.y * (ve.x - Ke.x)) / ge;
            return -o <= ze && ze <= 1 - o && -o <= He && He <= 1 - o ? new a.Point(ve.x + He * V.x, ve.y + He * V.y) : null;
          }
          if (r.length === 0)
            return null;
          for (var de = r[0].x, ue = r[0].x, Te = r[0].y, Ce = r[0].y, ke = 1; ke < r.length; ke++) {
            var Le = r[ke];
            Le.x < de && (de = Le.x), Le.x > ue && (ue = Le.x), Le.y < Te && (Te = Le.y), Le.y > Ce && (Ce = Le.y);
          }
          return new a.Rect(de, Te, ue - de, Ce - Te);
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
        var b = this, C = T.viewer, w = a.getElementSize(C.element), A, M, N;
        for (T.id || (T.id = "referencestrip-" + a.now(), this.element = a.makeNeutralElement("div"), this.element.id = T.id, this.element.className = "referencestrip"), T = a.extend(!0, {
          sizeRatio: a.DEFAULT_SETTINGS.referenceStripSizeRatio,
          position: a.DEFAULT_SETTINGS.referenceStripPosition,
          scroll: a.DEFAULT_SETTINGS.referenceStripScroll,
          clickTimeThreshold: a.DEFAULT_SETTINGS.clickTimeThreshold
        }, T, {
          element: this.element
        }), a.extend(this, T), l[this.id] = {
          animating: !1
        }, this.minPixelRatio = this.viewer.minPixelRatio, this.element.tabIndex = 0, M = this.element.style, M.marginTop = "0px", M.marginRight = "0px", M.marginBottom = "0px", M.marginLeft = "0px", M.left = "0px", M.bottom = "0px", M.border = "0px", M.background = "#000", M.position = "relative", a.setElementTouchActionNone(this.element), a.setElementOpacity(this.element, 0.8), this.viewer = C, this.tracker = new a.MouseTracker({
          userData: "ReferenceStrip.tracker",
          element: this.element,
          clickHandler: a.delegate(this, o),
          dragHandler: a.delegate(this, r),
          scrollHandler: a.delegate(this, f),
          enterHandler: a.delegate(this, h),
          leaveHandler: a.delegate(this, c),
          keyDownHandler: a.delegate(this, g),
          keyHandler: a.delegate(this, m),
          preProcessEventHandler: function(Z) {
            Z.eventType === "wheel" && (Z.preventDefault = !0);
          }
        }), T.width && T.height ? (this.element.style.width = T.width + "px", this.element.style.height = T.height + "px", C.addControl(
          this.element,
          { anchor: a.ControlAnchor.BOTTOM_LEFT }
        )) : T.scroll === "horizontal" ? (this.element.style.width = w.x * T.sizeRatio * C.tileSources.length + 12 * C.tileSources.length + "px", this.element.style.height = w.y * T.sizeRatio + "px", C.addControl(
          this.element,
          { anchor: a.ControlAnchor.BOTTOM_LEFT }
        )) : (this.element.style.height = w.y * T.sizeRatio * C.tileSources.length + 12 * C.tileSources.length + "px", this.element.style.width = w.x * T.sizeRatio + "px", C.addControl(
          this.element,
          { anchor: a.ControlAnchor.TOP_LEFT }
        )), this.panelWidth = w.x * this.sizeRatio + 8, this.panelHeight = w.y * this.sizeRatio + 8, this.panels = [], this.miniViewers = {}, N = 0; N < C.tileSources.length; N++)
          A = a.makeNeutralElement("div"), A.id = this.element.id + "-" + N, A.style.width = b.panelWidth + "px", A.style.height = b.panelHeight + "px", A.style.display = "inline", A.style.float = "left", A.style.cssFloat = "left", A.style.padding = "2px", a.setElementTouchActionNone(A), a.setElementPointerEventsNone(A), this.element.appendChild(A), A.activePanel = !1, this.panels.push(A);
        d(this, this.scroll === "vertical" ? w.y : w.x, 0), this.setFocus(0);
      }, a.ReferenceStrip.prototype = {
        /**
         * @function
         */
        setFocus: function(T) {
          var b = this.element.querySelector("#" + this.element.id + "-" + T), C = a.getElementSize(this.viewer.canvas), w = Number(this.element.style.width.replace("px", "")), A = Number(this.element.style.height.replace("px", "")), M = -Number(this.element.style.marginLeft.replace("px", "")), N = -Number(this.element.style.marginTop.replace("px", "")), Z;
          this.currentSelected !== b && (this.currentSelected && (this.currentSelected.style.background = "#000"), this.currentSelected = b, this.currentSelected.style.background = "#999", this.scroll === "horizontal" ? (Z = Number(T) * (this.panelWidth + 3), Z > M + C.x - this.panelWidth ? (Z = Math.min(Z, w - C.x), this.element.style.marginLeft = -Z + "px", d(this, C.x, -Z)) : Z < M && (Z = Math.max(0, Z - C.x / 2), this.element.style.marginLeft = -Z + "px", d(this, C.x, -Z))) : (Z = Number(T) * (this.panelHeight + 3), Z > N + C.y - this.panelHeight ? (Z = Math.min(Z, A - C.y), this.element.style.marginTop = -Z + "px", d(this, C.y, -Z)) : Z < N && (Z = Math.max(0, Z - C.y / 2), this.element.style.marginTop = -Z + "px", d(this, C.y, -Z))), this.currentPage = T, h.call(this, { eventSource: this.tracker }));
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
          var b;
          this.scroll === "horizontal" ? b = Math.floor(T.position.x / (this.panelWidth + 4)) : b = Math.floor(T.position.y / this.panelHeight), this.viewer.goToPage(b);
        }
        this.element.focus();
      }
      function r(T) {
        if (this.dragging = !0, this.element) {
          var b = Number(this.element.style.marginLeft.replace("px", "")), C = Number(this.element.style.marginTop.replace("px", "")), w = Number(this.element.style.width.replace("px", "")), A = Number(this.element.style.height.replace("px", "")), M = a.getElementSize(this.viewer.canvas);
          this.scroll === "horizontal" ? -T.delta.x > 0 ? b > -(w - M.x) && (this.element.style.marginLeft = b + T.delta.x * 2 + "px", d(this, M.x, b + T.delta.x * 2)) : -T.delta.x < 0 && b < 0 && (this.element.style.marginLeft = b + T.delta.x * 2 + "px", d(this, M.x, b + T.delta.x * 2)) : -T.delta.y > 0 ? C > -(A - M.y) && (this.element.style.marginTop = C + T.delta.y * 2 + "px", d(this, M.y, C + T.delta.y * 2)) : -T.delta.y < 0 && C < 0 && (this.element.style.marginTop = C + T.delta.y * 2 + "px", d(this, M.y, C + T.delta.y * 2));
        }
      }
      function f(T) {
        if (this.element) {
          var b = Number(this.element.style.marginLeft.replace("px", "")), C = Number(this.element.style.marginTop.replace("px", "")), w = Number(this.element.style.width.replace("px", "")), A = Number(this.element.style.height.replace("px", "")), M = a.getElementSize(this.viewer.canvas);
          this.scroll === "horizontal" ? T.scroll > 0 ? b > -(w - M.x) && (this.element.style.marginLeft = b - T.scroll * 60 + "px", d(this, M.x, b - T.scroll * 60)) : T.scroll < 0 && b < 0 && (this.element.style.marginLeft = b - T.scroll * 60 + "px", d(this, M.x, b - T.scroll * 60)) : T.scroll < 0 ? C > M.y - A && (this.element.style.marginTop = C + T.scroll * 60 + "px", d(this, M.y, C + T.scroll * 60)) : T.scroll > 0 && C < 0 && (this.element.style.marginTop = C + T.scroll * 60 + "px", d(this, M.y, C + T.scroll * 60)), T.preventDefault = !0;
        }
      }
      function d(T, b, C) {
        var w, A, M, N, Z, ie;
        for (T.scroll === "horizontal" ? w = T.panelWidth : w = T.panelHeight, A = Math.ceil(b / w) + 5, M = Math.ceil((Math.abs(C) + b) / w) + 1, A = M - A, A = A < 0 ? 0 : A, Z = A; Z < M && Z < T.panels.length; Z++)
          if (ie = T.panels[Z], !ie.activePanel) {
            var se, de = T.viewer.tileSources[Z];
            de.referenceStripThumbnailUrl ? se = {
              type: "image",
              url: de.referenceStripThumbnailUrl
            } : se = de, N = new a.Viewer({
              id: ie.id,
              tileSources: [se],
              element: ie,
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
            }), a.setElementPointerEventsNone(N.canvas), a.setElementPointerEventsNone(N.container), N.innerTracker.setTracking(!1), N.outerTracker.setTracking(!1), T.miniViewers[ie.id] = N, ie.activePanel = !0;
          }
      }
      function h(T) {
        var b = T.eventSource.element;
        this.scroll === "horizontal" ? b.style.marginBottom = "0px" : b.style.marginLeft = "0px";
      }
      function c(T) {
        var b = T.eventSource.element;
        this.scroll === "horizontal" ? b.style.marginBottom = "-" + a.getElementSize(b).y / 2 + "px" : b.style.marginLeft = "-" + a.getElementSize(b).x / 2 + "px";
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
      function m(T) {
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
      a.Tile = function(l, o, r, f, d, h, c, g, m, T, b, C) {
        this.level = l, this.x = o, this.y = r, this.bounds = f, this.positionedBounds = new K.Rect(f.x, f.y, f.width, f.height), this.sourceBounds = T, this.exists = d, this._url = h, this.postData = b, this.context2D = c, this.loadWithAjax = g, this.ajaxHeaders = m, C === void 0 && (a.console.warn("Tile constructor needs 'cacheKey' variable: creation tile cache in Tile class is deprecated. TileSource.prototype.getTileHashKey will be used."), C = a.TileSource.prototype.getTileHashKey(l, o, r, h, m, b)), this.cacheKey = C, this.loaded = !1, this.loading = !1, this.element = null, this.imgElement = null, this.style = null, this.position = null, this.size = null, this.flipped = !1, this.blendStart = null, this.opacity = null, this.squaredDistance = null, this.visibility = null, this.hasTransparency = !1, this.beingDrawn = !1, this.lastTouchTime = 0, this.isRightMost = !1, this.isBottomMost = !1;
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
          var g = o.flipped ? -f.rotate : f.rotate, m = o.flipped ? " scaleX(-1)" : "";
          if (this.onDraw)
            this.onDraw(d, h, this.element);
          else {
            var T = this.style, b = this.element.style;
            b.display = "block", T.left = d.x + "px", T.top = d.y + "px", this.width !== null && (b.width = h.x + "px"), this.height !== null && (b.height = h.y + "px");
            var C = a.getCssPropertyWithVendorPrefix(
              "transformOrigin"
            ), w = a.getCssPropertyWithVendorPrefix(
              "transform"
            );
            C && w && (g && !o.flipped ? (b[w] = "", T[C] = this._getTransformOrigin(), T[w] = "rotate(" + g + "deg)") : !g && o.flipped ? (b[w] = c, T[C] = this._getTransformOrigin(), T[w] = m) : g && o.flipped ? (b[w] = c, T[C] = this._getTransformOrigin(), T[w] = "rotate(" + g + "deg)" + m) : (b[w] = "", T[C] = "", T[w] = "")), T.display = "flex";
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
          let g = a.makeNeutralElement("canvas"), m = this._calculateCanvasSize();
          return g.width = m.x, g.height = m.y, g;
        }
        /**
         * Draws the TiledImages
         */
        draw(g) {
          this._prepareNewFrame(), this.viewer.viewport.getFlip() !== this._viewportFlipped && this._flip();
          for (const m of g)
            m.opacity !== 0 && this._drawTiles(m);
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
          var m = this.context;
          m.save(), m.lineWidth = 2 * a.pixelDensityRatio, m.strokeStyle = this.debugGridColor[0], m.fillStyle = this.debugGridColor[0], m.strokeRect(
            g.x * a.pixelDensityRatio,
            g.y * a.pixelDensityRatio,
            g.width * a.pixelDensityRatio,
            g.height * a.pixelDensityRatio
          ), m.restore();
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
        _raiseTileDrawingEvent(g, m, T, b) {
          this.viewer.raiseEvent("tile-drawing", {
            tiledImage: g,
            context: m,
            tile: T,
            rendered: b
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
            var m = this._calculateSketchCanvasSize();
            this.sketchCanvas.width = m.x, this.sketchCanvas.height = m.y, this._updateImageSmoothingEnabled(this.sketchContext);
          }
          this._clear();
        }
        /**
         * @private
         * @param {Boolean} useSketch Whether to clear sketch canvas or main canvas
         * @param {OpenSeadragon.Rect} [bounds] The rectangle to clear
         */
        _clear(g, m) {
          var T = this._getContext(g);
          if (m)
            T.clearRect(m.x, m.y, m.width, m.height);
          else {
            var b = T.canvas;
            T.clearRect(0, 0, b.width, b.height);
          }
        }
        /**
         * Draws a TiledImage.
         * @private
         *
         */
        _drawTiles(g) {
          var m = g.getTilesToDraw().map((ve) => ve.tile);
          if (!(g.opacity === 0 || m.length === 0 && !g.placeholderFillStyle)) {
            var T = m[0], b;
            T && (b = g.opacity < 1 || g.compositeOperation && g.compositeOperation !== "source-over" || !g._isBottomItem() && g.source.hasTransparency(T.context2D, T.getUrl(), T.ajaxHeaders, T.postData));
            var C, w, A = this.viewport.getZoom(!0), M = g.viewportToImageZoom(A);
            m.length > 1 && M > g.smoothTileEdgesMinZoom && !g.iOSDevice && g.getRotation(!0) % 360 === 0 && (b = !0, C = T.getScaleForEdgeSmoothing(), w = T.getTranslationForEdgeSmoothing(
              C,
              this._getCanvasSize(!1),
              this._getCanvasSize(!0)
            ));
            var N;
            b && (C || (N = this.viewport.viewportToViewerElementRectangle(
              g.getClippedBounds(!0)
            ).getIntegerBoundingBox(), N = N.times(a.pixelDensityRatio)), this._clear(!0, N)), C || this._setRotations(g, b);
            var Z = !1;
            if (g._clip) {
              this._saveContext(b);
              var ie = g.imageToViewportRectangle(g._clip, !0);
              ie = ie.rotate(-g.getRotation(!0), g._getRotationPoint(!0));
              var se = this.viewportToDrawerRectangle(ie);
              C && (se = se.times(C)), w && (se = se.translate(w)), this._setClip(se, b), Z = !0;
            }
            if (g._croppingPolygons) {
              var de = this;
              Z || this._saveContext(b);
              try {
                var ue = g._croppingPolygons.map(function(ve) {
                  return ve.map(function(Ze) {
                    var Ke = g.imageToViewportCoordinates(Ze.x, Ze.y, !0).rotate(-g.getRotation(!0), g._getRotationPoint(!0)), Ie = de.viewportCoordToDrawerCoord(Ke);
                    return C && (Ie = Ie.times(C)), w && (Ie = Ie.plus(w)), Ie;
                  });
                });
                this._clipWithPolygons(ue, b);
              } catch (ve) {
                a.console.error(ve);
              }
              Z = !0;
            }
            if (g._hasOpaqueTile = !1, g.placeholderFillStyle && g._hasOpaqueTile === !1) {
              let ve = this.viewportToDrawerRectangle(g.getBoundsNoRotate(!0));
              C && (ve = ve.times(C)), w && (ve = ve.translate(w));
              let Ze = null;
              typeof g.placeholderFillStyle == "function" ? Ze = g.placeholderFillStyle(g, this.context) : Ze = g.placeholderFillStyle, this._drawRectangle(ve, Ze, b);
            }
            var Te = h(g.subPixelRoundingForTransparency), Ce = !1;
            if (Te === a.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS)
              Ce = !0;
            else if (Te === a.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST) {
              var ke = this.viewer && this.viewer.isAnimating();
              Ce = !ke;
            }
            for (var Le = 0; Le < m.length; Le++)
              T = m[Le], this._drawTile(
                T,
                g,
                b,
                C,
                w,
                Ce,
                g.source
              ), this.viewer && this.viewer.raiseEvent("tile-drawn", {
                tiledImage: g,
                tile: T
              });
            Z && this._restoreContext(b), C || (g.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(b), this.viewport.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(b)), b && (C && this._setRotations(g), this.blendSketch({
              opacity: g.opacity,
              scale: C,
              translate: w,
              compositeOperation: g.compositeOperation,
              bounds: N
            }), C && (g.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(!1), this.viewport.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(!1))), this._drawDebugInfo(g, m), this._raiseTiledImageDrawnEvent(g, m);
          }
        }
        /**
         * Draws special debug information for a TiledImage if in debug mode.
         * @private
         * @param {OpenSeadragon.Tile[]} lastDrawn - An unordered list of Tiles drawn last frame.
         */
        _drawDebugInfo(g, m) {
          if (g.debugMode)
            for (var T = m.length - 1; T >= 0; T--) {
              var b = m[T];
              try {
                this._drawDebugInfoOnTile(b, m.length, T, g);
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
        _clipWithPolygons(g, m) {
          var T = this._getContext(m);
          T.beginPath();
          for (const b of g)
            for (const [C, w] of b.entries())
              T[C === 0 ? "moveTo" : "lineTo"](w.x, w.y);
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
        _drawTile(g, m, T, b, C, w, A) {
          a.console.assert(g, "[Drawer._drawTile] tile is required"), a.console.assert(m, "[Drawer._drawTile] drawingHandler is required");
          var M = this._getContext(T);
          b = b || 1, this._drawTileToCanvas(g, M, m, b, C, w, A);
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
        _drawTileToCanvas(g, m, T, b, C, w, A) {
          var M = g.position.times(a.pixelDensityRatio), N = g.size.times(a.pixelDensityRatio), Z;
          if (!g.context2D && !g.cacheImageRecord) {
            a.console.warn(
              "[Drawer._drawTileToCanvas] attempting to draw tile %s when it's not cached",
              g.toString()
            );
            return;
          }
          if (Z = g.getCanvasContext(), !g.loaded || !Z) {
            a.console.warn(
              "Attempting to draw tile %s when it's not yet loaded.",
              g.toString()
            );
            return;
          }
          m.save(), typeof b == "number" && b !== 1 && (M = M.times(b), N = N.times(b)), C instanceof a.Point && (M = M.plus(C)), m.globalAlpha === 1 && g.hasTransparency && (w && (M.x = Math.round(M.x), M.y = Math.round(M.y), N.x = Math.round(N.x), N.y = Math.round(N.y)), m.clearRect(
            M.x,
            M.y,
            N.x,
            N.y
          )), this._raiseTileDrawingEvent(T, m, g, Z);
          var ie, se;
          g.sourceBounds ? (ie = Math.min(g.sourceBounds.width, Z.canvas.width), se = Math.min(g.sourceBounds.height, Z.canvas.height)) : (ie = Z.canvas.width, se = Z.canvas.height), m.translate(M.x + N.x / 2, 0), g.flipped && m.scale(-1, 1), m.drawImage(
            Z.canvas,
            0,
            0,
            ie,
            se,
            -N.x / 2,
            M.y,
            N.x,
            N.y
          ), m.restore();
        }
        /**
         * Get the context of the main or sketch canvas
         * @private
         * @param {Boolean} useSketch
         * @returns {CanvasRenderingContext2D}
         */
        _getContext(g) {
          var m = this.context;
          if (g) {
            if (this.sketchCanvas === null) {
              this.sketchCanvas = document.createElement("canvas");
              var T = this._calculateSketchCanvasSize();
              if (this.sketchCanvas.width = T.x, this.sketchCanvas.height = T.y, this.sketchContext = this.sketchCanvas.getContext("2d"), this.viewport.getRotation() === 0) {
                var b = this;
                this.viewer.addHandler("rotate", function C() {
                  if (b.viewport.getRotation() !== 0) {
                    b.viewer.removeHandler("rotate", C);
                    var w = b._calculateSketchCanvasSize();
                    b.sketchCanvas.width = w.x, b.sketchCanvas.height = w.y;
                  }
                });
              }
              this._updateImageSmoothingEnabled(this.sketchContext);
            }
            m = this.sketchContext;
          }
          return m;
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
        _setClip(g, m) {
          var T = this._getContext(m);
          T.beginPath(), T.rect(g.x, g.y, g.width, g.height), T.clip();
        }
        // private
        // used to draw a placeholder rectangle
        _drawRectangle(g, m, T) {
          var b = this._getContext(T);
          b.save(), b.fillStyle = m, b.fillRect(g.x, g.y, g.width, g.height), b.restore();
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
        blendSketch(g, m, T, b) {
          var C = g;
          a.isPlainObject(C) || (C = {
            opacity: g,
            scale: m,
            translate: T,
            compositeOperation: b
          }), g = C.opacity, b = C.compositeOperation;
          var w = C.bounds;
          if (this.context.save(), this.context.globalAlpha = g, b && (this.context.globalCompositeOperation = b), w)
            w.x < 0 && (w.width += w.x, w.x = 0), w.x + w.width > this.canvas.width && (w.width = this.canvas.width - w.x), w.y < 0 && (w.height += w.y, w.y = 0), w.y + w.height > this.canvas.height && (w.height = this.canvas.height - w.y), this.context.drawImage(
              this.sketchCanvas,
              w.x,
              w.y,
              w.width,
              w.height,
              w.x,
              w.y,
              w.width,
              w.height
            );
          else {
            m = C.scale || 1, T = C.translate;
            var A = T instanceof a.Point ? T : new a.Point(0, 0), M = 0, N = 0;
            if (T) {
              var Z = this.sketchCanvas.width - this.canvas.width, ie = this.sketchCanvas.height - this.canvas.height;
              M = Math.round(Z / 2), N = Math.round(ie / 2);
            }
            this.context.drawImage(
              this.sketchCanvas,
              A.x - M * m,
              A.y - N * m,
              (this.canvas.width + 2 * M) * m,
              (this.canvas.height + 2 * N) * m,
              -M,
              -N,
              this.canvas.width + 2 * M,
              this.canvas.height + 2 * N
            );
          }
          this.context.restore();
        }
        // private
        _drawDebugInfoOnTile(g, m, T, b) {
          var C = this.viewer.world.getIndexOfItem(b) % this.debugGridColor.length, w = this.context;
          w.save(), w.lineWidth = 2 * a.pixelDensityRatio, w.font = "small-caps bold " + 13 * a.pixelDensityRatio + "px arial", w.strokeStyle = this.debugGridColor[C], w.fillStyle = this.debugGridColor[C], this._setRotations(b), this._viewportFlipped && this._flip({ point: g.position.plus(g.size.divide(2)) }), w.strokeRect(
            g.position.x * a.pixelDensityRatio,
            g.position.y * a.pixelDensityRatio,
            g.size.x * a.pixelDensityRatio,
            g.size.y * a.pixelDensityRatio
          );
          var A = (g.position.x + g.size.x / 2) * a.pixelDensityRatio, M = (g.position.y + g.size.y / 2) * a.pixelDensityRatio;
          w.translate(A, M);
          const N = this.viewport.getRotation(!0);
          w.rotate(Math.PI / 180 * -N), w.translate(-A, -M), g.x === 0 && g.y === 0 && (w.fillText(
            "Zoom: " + this.viewport.getZoom(),
            g.position.x * a.pixelDensityRatio,
            (g.position.y - 30) * a.pixelDensityRatio
          ), w.fillText(
            "Pan: " + this.viewport.getBounds().toString(),
            g.position.x * a.pixelDensityRatio,
            (g.position.y - 20) * a.pixelDensityRatio
          )), w.fillText(
            "Level: " + g.level,
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 20) * a.pixelDensityRatio
          ), w.fillText(
            "Column: " + g.x,
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 30) * a.pixelDensityRatio
          ), w.fillText(
            "Row: " + g.y,
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 40) * a.pixelDensityRatio
          ), w.fillText(
            "Order: " + T + " of " + m,
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 50) * a.pixelDensityRatio
          ), w.fillText(
            "Size: " + g.size.toString(),
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 60) * a.pixelDensityRatio
          ), w.fillText(
            "Position: " + g.position.toString(),
            (g.position.x + 10) * a.pixelDensityRatio,
            (g.position.y + 70) * a.pixelDensityRatio
          ), this.viewport.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(), b.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(), w.restore();
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
          var m = this._getContext(g).canvas;
          return new a.Point(m.width, m.height);
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
        _setRotations(g, m = !1) {
          var T = !1;
          this.viewport.getRotation(!0) % 360 !== 0 && (this._offsetForRotation({
            degrees: this.viewport.getRotation(!0),
            useSketch: m,
            saveContext: T
          }), T = !1), g.getRotation(!0) % 360 !== 0 && this._offsetForRotation({
            degrees: g.getRotation(!0),
            point: this.viewport.pixelFromPointNoRotate(
              g._getRotationPoint(!0),
              !0
            ),
            useSketch: m,
            saveContext: T
          });
        }
        // private
        _offsetForRotation(g) {
          var m = g.point ? g.point.times(a.pixelDensityRatio) : this._getCanvasCenter(), T = this._getContext(g.useSketch);
          T.save(), T.translate(m.x, m.y), T.rotate(Math.PI / 180 * g.degrees), T.translate(-m.x, -m.y);
        }
        // private
        _flip(g) {
          g = g || {};
          var m = g.point ? g.point.times(a.pixelDensityRatio) : this._getCanvasCenter(), T = this._getContext(g.useSketch);
          T.translate(m.x, 0), T.scale(-1, 1), T.translate(-m.x, 0);
        }
        // private
        _restoreRotationChanges(g) {
          var m = this._getContext(g);
          m.restore();
        }
        // private
        _calculateCanvasSize() {
          var g = a.pixelDensityRatio, m = this.viewport.getContainerSize();
          return {
            // canvas width and height are integers
            x: Math.round(m.x * g),
            y: Math.round(m.y * g)
          };
        }
        // private
        _calculateSketchCanvasSize() {
          var g = this._calculateCanvasSize();
          if (this.viewport.getRotation() === 0)
            return g;
          var m = Math.ceil(Math.sqrt(
            g.x * g.x + g.y * g.y
          ));
          return {
            x: m,
            y: m
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
          }, c = this.viewport.flipped ? -1 : 1, g = a.Mat3.makeTranslation(-h.center.x, -h.center.y), m = a.Mat3.makeScaling(2 / h.bounds.width * c, -2 / h.bounds.height), T = a.Mat3.makeRotation(-h.rotation), b = m.multiply(T).multiply(g);
          f.bindFramebuffer(f.FRAMEBUFFER, null), f.clear(f.COLOR_BUFFER_BIT), this._outputContext.clearRect(0, 0, this._outputCanvas.width, this._outputCanvas.height);
          let C = !1;
          r.forEach((w, A) => {
            if (w.isTainted()) {
              C && (this._outputContext.drawImage(this._renderingCanvas, 0, 0), f.bindFramebuffer(f.FRAMEBUFFER, null), f.clear(f.COLOR_BUFFER_BIT), C = !1);
              const M = this._getBackupCanvasDrawer();
              M.draw([w]), this._outputContext.drawImage(M.canvas, 0, 0);
            } else {
              let M = w.getTilesToDraw();
              if (w.placeholderFillStyle && w._hasOpaqueTile === !1 && this._drawPlaceholder(w), M.length === 0 || w.getOpacity() === 0)
                return;
              let N = M[0], Z = w.compositeOperation || this.viewer.compositeOperation || w._clip || w._croppingPolygons || w.debugMode, ie = Z || w.opacity < 1 || N.hasTransparency;
              Z && (C && this._outputContext.drawImage(this._renderingCanvas, 0, 0), f.bindFramebuffer(f.FRAMEBUFFER, null), f.clear(f.COLOR_BUFFER_BIT)), f.useProgram(this._firstPass.shaderProgram), ie ? (f.bindFramebuffer(f.FRAMEBUFFER, this._glFrameBuffer), f.clear(f.COLOR_BUFFER_BIT)) : f.bindFramebuffer(f.FRAMEBUFFER, null);
              let se = b, de = w.getRotation(!0);
              if (de % 360 !== 0) {
                let ve = a.Mat3.makeRotation(-de * Math.PI / 180), Ze = w.getBoundsNoRotate(!0).getCenter(), Ke = a.Mat3.makeTranslation(Ze.x, Ze.y), Ie = a.Mat3.makeTranslation(-Ze.x, -Ze.y), V = Ke.multiply(ve).multiply(Ie);
                se = b.multiply(V);
              }
              let ue = this._gl.getParameter(this._gl.MAX_TEXTURE_IMAGE_UNITS);
              if (ue <= 0)
                throw new Error(`WegGL error: bad value for gl parameter MAX_TEXTURE_IMAGE_UNITS (${ue}). This could happen
                        if too many contexts have been created and not released, or there is another problem with the graphics card.`);
              let Te = new Float32Array(ue * 12), Ce = new Array(ue), ke = new Array(ue), Le = new Array(ue);
              for (let ve = 0; ve < M.length; ve++) {
                let Ze = M[ve].tile, Ke = ve % ue, Ie = Ke + 1, V = Ze.getCanvasContext(), ne = V ? this._TextureMap.get(V.canvas) : null;
                if (ne || (this._tileReadyHandler({ tile: Ze, tiledImage: w }), ne = V ? this._TextureMap.get(V.canvas) : null), ne && this._getTileData(Ze, w, ne, se, Ke, Te, Ce, ke, Le), Ie === ue || ve === M.length - 1) {
                  for (let ge = 0; ge <= Ie; ge++)
                    f.activeTexture(f.TEXTURE0 + ge), f.bindTexture(f.TEXTURE_2D, Ce[ge]);
                  f.bindBuffer(f.ARRAY_BUFFER, this._firstPass.bufferTexturePosition), f.bufferData(f.ARRAY_BUFFER, Te, f.DYNAMIC_DRAW), ke.forEach((ge, ze) => {
                    f.uniformMatrix3fv(this._firstPass.uTransformMatrices[ze], !1, ge);
                  }), f.uniform1fv(this._firstPass.uOpacities, new Float32Array(Le)), f.bindBuffer(f.ARRAY_BUFFER, this._firstPass.bufferOutputPosition), f.vertexAttribPointer(this._firstPass.aOutputPosition, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, this._firstPass.bufferTexturePosition), f.vertexAttribPointer(this._firstPass.aTexturePosition, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, this._firstPass.bufferIndex), f.vertexAttribPointer(this._firstPass.aIndex, 1, f.FLOAT, !1, 0, 0), f.drawArrays(f.TRIANGLES, 0, 6 * Ie);
                }
              }
              ie && (f.useProgram(this._secondPass.shaderProgram), f.bindFramebuffer(f.FRAMEBUFFER, null), f.activeTexture(f.TEXTURE0), f.bindTexture(f.TEXTURE_2D, this._renderToTexture), this._gl.uniform1f(this._secondPass.uOpacityMultiplier, w.opacity), f.bindBuffer(f.ARRAY_BUFFER, this._secondPass.bufferTexturePosition), f.vertexAttribPointer(this._secondPass.aTexturePosition, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, this._secondPass.bufferOutputPosition), f.vertexAttribPointer(this._secondPass.aOutputPosition, 2, f.FLOAT, !1, 0, 0), f.drawArrays(f.TRIANGLES, 0, 6)), C = !0, Z && (this._applyContext2dPipeline(w, M, A), C = !1, f.bindFramebuffer(f.FRAMEBUFFER, null), f.clear(f.COLOR_BUFFER_BIT)), A === 0 && this._raiseTiledImageDrawnEvent(w, M.map((ve) => ve.tile));
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
        _getTileData(r, f, d, h, c, g, m, T, b) {
          let C = d.texture, w = d.position;
          g.set(w, c * 12);
          let A = this._calculateOverlapFraction(r, f), M = r.positionedBounds.width * A.x, N = r.positionedBounds.height * A.y, Z = r.positionedBounds.x + (r.x === 0 ? 0 : M), ie = r.positionedBounds.y + (r.y === 0 ? 0 : N), se = r.positionedBounds.x + r.positionedBounds.width - (r.isRightMost ? 0 : M), de = r.positionedBounds.y + r.positionedBounds.height - (r.isBottomMost ? 0 : N), ue = se - Z, Te = de - ie, Ce = new a.Mat3([
            ue,
            0,
            0,
            0,
            Te,
            0,
            Z,
            ie,
            1
          ]);
          if (r.flipped) {
            let Le = a.Mat3.makeTranslation(0.5, 0), ve = a.Mat3.makeTranslation(-0.5, 0), Ze = Le.multiply(a.Mat3.makeScaling(-1, 1)).multiply(ve);
            Ce = Ce.multiply(Ze);
          }
          let ke = h.multiply(Ce);
          b[c] = r.opacity, m[c] = C, T[c] = ke.values;
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
          let g = this._gl, m = this.constructor.initShaderProgram(g, h, c);
          g.useProgram(m), this._firstPass = {
            shaderProgram: m,
            aOutputPosition: g.getAttribLocation(m, "a_output_position"),
            aTexturePosition: g.getAttribLocation(m, "a_texture_position"),
            aIndex: g.getAttribLocation(m, "a_index"),
            uTransformMatrices: [...Array(this._glNumTextures).keys()].map((C) => g.getUniformLocation(m, `u_matrix_${C}`)),
            uImages: g.getUniformLocation(m, "u_images"),
            uOpacities: g.getUniformLocation(m, "u_opacities"),
            bufferOutputPosition: g.createBuffer(),
            bufferTexturePosition: g.createBuffer(),
            bufferIndex: g.createBuffer()
          }, g.uniform1iv(this._firstPass.uImages, [...Array(r).keys()]);
          let T = new Float32Array(r * 12);
          for (let C = 0; C < r; ++C)
            T.set(Float32Array.from(this._unitQuad), C * 12);
          g.bindBuffer(g.ARRAY_BUFFER, this._firstPass.bufferOutputPosition), g.bufferData(g.ARRAY_BUFFER, T, g.STATIC_DRAW), g.enableVertexAttribArray(this._firstPass.aOutputPosition), g.bindBuffer(g.ARRAY_BUFFER, this._firstPass.bufferTexturePosition), g.enableVertexAttribArray(this._firstPass.aTexturePosition), g.bindBuffer(g.ARRAY_BUFFER, this._firstPass.bufferIndex);
          let b = [...Array(this._glNumTextures).keys()].map((C) => Array(6).fill(C)).flat();
          g.bufferData(g.ARRAY_BUFFER, new Float32Array(b), g.STATIC_DRAW), g.enableVertexAttribArray(this._firstPass.aIndex);
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
            let m = this._gl, T = m.createTexture(), b, C = d.source.tileOverlap, w, A;
            if (f.sourceBounds ? (w = Math.min(f.sourceBounds.width, c.width) / c.width, A = Math.min(f.sourceBounds.height, c.height) / c.height) : (w = 1, A = 1), C > 0) {
              let N = this._calculateOverlapFraction(f, d), Z = (f.x === 0 ? 0 : N.x) * w, ie = (f.y === 0 ? 0 : N.y) * A, se = (f.isRightMost ? 1 : 1 - N.x) * w, de = (f.isBottomMost ? 1 : 1 - N.y) * A;
              b = this._makeQuadVertexBuffer(Z, se, ie, de);
            } else w === 1 && A === 1 ? b = this._unitQuad : b = this._makeQuadVertexBuffer(0, w, 0, A);
            let M = {
              texture: T,
              position: b
            };
            this._TextureMap.set(c, M), m.activeTexture(m.TEXTURE0), m.bindTexture(m.TEXTURE_2D, T), m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_S, m.CLAMP_TO_EDGE), m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_T, m.CLAMP_TO_EDGE), m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MIN_FILTER, this._textureFilter()), m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MAG_FILTER, this._textureFilter()), this._uploadImageData(h);
          }
        }
        // private
        _calculateOverlapFraction(r, f) {
          let d = f.source.tileOverlap, h = r.sourceBounds.width, c = r.sourceBounds.height, g = (r.x === 0 ? 0 : d) + (r.isRightMost ? 0 : d), m = (r.y === 0 ? 0 : d) + (r.isBottomMost ? 0 : d), T = d / (h + g), b = d / (c + m);
          return {
            x: T,
            y: b
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
          var g = this.viewer.world.getIndexOfItem(h) % this.debugGridColor.length, m = this.context;
          m.save(), m.lineWidth = 2 * a.pixelDensityRatio, m.font = "small-caps bold " + 13 * a.pixelDensityRatio + "px arial", m.strokeStyle = this.debugGridColor[g], m.fillStyle = this.debugGridColor[g], this._setRotations(h), c && this._flip({ point: r.position.plus(r.size.divide(2)) }), m.strokeRect(
            r.position.x * a.pixelDensityRatio,
            r.position.y * a.pixelDensityRatio,
            r.size.x * a.pixelDensityRatio,
            r.size.y * a.pixelDensityRatio
          );
          var T = (r.position.x + r.size.x / 2) * a.pixelDensityRatio, b = (r.position.y + r.size.y / 2) * a.pixelDensityRatio;
          m.translate(T, b);
          const C = this.viewport.getRotation(!0);
          m.rotate(Math.PI / 180 * -C), m.translate(-T, -b), r.x === 0 && r.y === 0 && (m.fillText(
            "Zoom: " + this.viewport.getZoom(),
            r.position.x * a.pixelDensityRatio,
            (r.position.y - 30) * a.pixelDensityRatio
          ), m.fillText(
            "Pan: " + this.viewport.getBounds().toString(),
            r.position.x * a.pixelDensityRatio,
            (r.position.y - 20) * a.pixelDensityRatio
          )), m.fillText(
            "Level: " + r.level,
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 20) * a.pixelDensityRatio
          ), m.fillText(
            "Column: " + r.x,
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 30) * a.pixelDensityRatio
          ), m.fillText(
            "Row: " + r.y,
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 40) * a.pixelDensityRatio
          ), m.fillText(
            "Order: " + d + " of " + f,
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 50) * a.pixelDensityRatio
          ), m.fillText(
            "Size: " + r.size.toString(),
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 60) * a.pixelDensityRatio
          ), m.fillText(
            "Position: " + r.position.toString(),
            (r.position.x + 10) * a.pixelDensityRatio,
            (r.position.y + 70) * a.pixelDensityRatio
          ), this.viewport.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(), h.getRotation(!0) % 360 !== 0 && this._restoreRotationChanges(), m.restore();
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
          function h(T, b, C) {
            const w = T.createShader(b);
            return T.shaderSource(w, C), T.compileShader(w), T.getShaderParameter(w, T.COMPILE_STATUS) ? w : (a.console.error(
              `An error occurred compiling the shaders: ${T.getShaderInfoLog(w)}`
            ), T.deleteShader(w), null);
          }
          const c = h(r, r.VERTEX_SHADER, f), g = h(r, r.FRAGMENT_SHADER, d), m = r.createProgram();
          return r.attachShader(m, c), r.attachShader(m, g), r.linkProgram(m), r.getProgramParameter(m, r.LINK_STATUS) ? m : (a.console.error(
            `Unable to initialize the shader program: ${r.getProgramInfoLog(
              m
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
          ), f, d, h, c, g, m, T, b;
          return l ? o : this.zoomPoint ? (f = this.pixelFromPoint(this.zoomPoint, !0), d = this.getZoom(), h = 1 / d, c = h / this.getAspectRatio(), g = new a.Rect(
            o.x - h / 2,
            o.y - c / 2,
            h,
            c
          ), m = this._pixelFromPoint(this.zoomPoint, g), T = m.minus(f).rotate(-this.getRotation(!0)), b = T.divide(this._containerInnerSize.x * d), r.plus(b)) : r;
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
            var h = o.x + o.width, c = r.x + r.width, g, m, T;
            o.width > r.width ? g = this.visibilityRatio * r.width : g = this.visibilityRatio * o.width, m = r.x - h + g, T = c - o.x - g, g > r.width ? (o.x += (m + T) / 2, f = !0) : T < 0 ? (o.x += T, f = !0) : m > 0 && (o.x += m, f = !0);
          }
          if (!this.wrapVertical) {
            var b = o.y + o.height, C = r.y + r.height, w, A, M;
            o.height > r.height ? w = this.visibilityRatio * r.height : w = this.visibilityRatio * o.height, A = r.y - b + w, M = C - o.y - w, w > r.height ? (o.y += (A + M) / 2, d = !0) : M < 0 ? (o.y += M, d = !0) : A > 0 && (o.y += A, d = !0);
          }
          var N = f || d, Z = N ? this.viewerElementToViewportRectangle(o) : l.clone();
          return Z.xConstrained = f, Z.yConstrained = d, Z.constraintApplied = N, Z;
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
          var m = this.getCenter(!0), T = this.getZoom(!0);
          this.panTo(m, !0), this.zoomTo(T, null, !0);
          var b = this.getBounds(), C = this.getZoom();
          if (C === 0 || Math.abs(g / C - 1) < 1e-8)
            return this.zoomTo(g, null, !0), this.panTo(h, r), f && this.applyConstraints(!1), this;
          if (f) {
            this.panTo(h, !1), g = this._applyZoomConstraints(g), this.zoomTo(g, null, !1);
            var w = this.getConstrainedBounds();
            this.panTo(m, !0), this.zoomTo(T, null, !0), this.fitBounds(w);
          } else {
            var A = c.rotate(-this.getRotation()), M = A.getTopLeft().times(g).minus(b.getTopLeft().times(C)).divide(g - C);
            this.zoomTo(g, M, r);
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
          var g = this.imageToViewportCoordinates(d.x, d.y), m = this._imageToViewportDelta(d.width, d.height);
          return new a.Rect(
            g.x,
            g.y,
            m.x,
            m.y,
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
          var g = this.viewportToImageCoordinates(d.x, d.y), m = this._viewportToImageDelta(d.width, d.height);
          return new a.Rect(
            g.x,
            g.y,
            m.x,
            m.y,
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
            var f = a.Placement.properties[o], d = this.contentAspectX, h = 0, c = 0, g = 1, m = 1;
            if (this._clip && (d = this._clip.getAspectRatio(), g = this._clip.width / this.source.dimensions.x, m = this._clip.height / this.source.dimensions.y, l.getAspectRatio() > d ? (h = this._clip.x / this._clip.height * l.height, c = this._clip.y / this._clip.height * l.height) : (h = this._clip.x / this._clip.width * l.width, c = this._clip.y / this._clip.width * l.width)), l.getAspectRatio() > d) {
              var T = l.height / m, b = 0;
              f.isHorizontallyCentered ? b = (l.width - l.height * d) / 2 : f.isRight && (b = l.width - l.height * d), this.setPosition(
                new a.Point(l.x - h + b, l.y - c),
                r
              ), this.setHeight(T, r);
            } else {
              var C = l.width / g, w = 0;
              f.isVerticallyCentered ? w = (l.height - l.width / d) / 2 : f.isBottom && (w = l.height - l.width / d), this.setPosition(
                new a.Point(l.x - h, l.y - c + w),
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
                      var m = this.source.getTileAjaxHeaders(h, r, f);
                      d.ajaxHeaders = a.extend({}, this.ajaxHeaders, m);
                    } else
                      d.ajaxHeaders = null;
                }
              }
              for (var T = 0; T < this._imageLoader.jobQueue.length; T++) {
                var b = this._imageLoader.jobQueue[T];
                b.loadWithAjax = b.tile.loadWithAjax, b.ajaxHeaders = b.tile.loadWithAjax ? b.tile.ajaxHeaders : null;
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
            if (this._lastDrawn.forEach((se) => {
              se.tile.beingDrawn = !1;
            }), this._tilesToDraw = [], this._tilesLoading = 0, this.loadingCoverage = {}, !d)
              return this._needsDraw = !1, this._fullyLoaded;
            var c = new Array(r - o + 1);
            for (let se = 0, de = r; de >= o; de--, se++)
              c[se] = de;
            for (let se = r + 1; se <= this.source.maxLevel; se++) {
              var g = this.tilesMatrix[se] && this.tilesMatrix[se][0] && this.tilesMatrix[se][0][0];
              if (g && g.isBottomMost && g.isRightMost && g.loaded) {
                c.push(se);
                break;
              }
            }
            let m = !1;
            for (let se = 0; se < c.length; se++) {
              let de = c[se];
              var T = this.viewport.deltaPixelsFromPointsNoRotate(
                this.source.getPixelRatio(de),
                !0
              ).x * this._scaleSpring.current.value;
              if (se === c.length - 1 || T >= this.minPixelRatio)
                m = !0;
              else if (!m)
                continue;
              var b = this.viewport.deltaPixelsFromPointsNoRotate(
                this.source.getPixelRatio(de),
                !1
              ).x * this._scaleSpring.current.value, C = this.viewport.deltaPixelsFromPointsNoRotate(
                this.source.getPixelRatio(
                  Math.max(
                    this.source.getClosestLevel(),
                    0
                  )
                ),
                !1
              ).x * this._scaleSpring.current.value, w = this.immediateRender ? 1 : C, A = Math.min(1, (T - 0.5) / 0.5), M = w / Math.abs(
                w - b
              ), N = this._updateLevel(
                de,
                A,
                M,
                d,
                h,
                f
              );
              f = N.bestTiles;
              var Z = N.updatedTiles.filter((ue) => ue.loaded), ie = /* @__PURE__ */ (function(ue, Te, Ce) {
                return function(ke) {
                  return {
                    tile: ke,
                    level: ue,
                    levelOpacity: Te,
                    currentTime: Ce
                  };
                };
              })(de, A, h);
              if (this._tilesToDraw[de] = Z.map(ie), this._providesCoverage(this.coverage, de))
                break;
            }
            return f && f.length > 0 ? (f.forEach(function(se) {
              se && !se.context2D && this._loadTile(se, h);
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
              let m = g.tile;
              if (m && m.loaded) {
                let T = r._blendTile(
                  m,
                  m.x,
                  m.y,
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
              let m = l[g];
              h(m), this._providesCoverage(this.coverage, m.level) && (c = Math.max(c, m.level));
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
            let g = 1e3 * this.blendTime, m, T;
            return l.blendStart || (l.blendStart = h), m = h - l.blendStart, T = g ? Math.min(1, m / g) : 1, f === c && (T = 1, m = g), this.alwaysBlend && (T *= d), l.opacity = T, T === 1 && (this._setCoverage(this.coverage, f, o, r, !0), this._hasOpaqueTile = !0), m < g;
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
            var m = this._getCornerTiles(l, c, g), T = m.topLeft, b = m.bottomRight, C = this.source.getNumTiles(l), w = this.viewport.pixelFromPoint(this.viewport.getCenter());
            this.getFlip() && (b.x += 1, this.wrapHorizontal || (b.x = Math.min(b.x, C.x - 1)));
            for (var A = Math.max(0, (b.x - T.x) * (b.y - T.y)), M = new Array(A), N = 0, Z = T.x; Z <= b.x; Z++)
              for (var ie = T.y; ie <= b.y; ie++) {
                var se;
                if (this.getFlip()) {
                  var de = (C.x + Z % C.x) % C.x;
                  se = Z + C.x - de - de - 1;
                } else
                  se = Z;
                if (f.intersection(this.getTileBounds(l, se, ie)) !== null) {
                  var ue = this._updateTile(
                    se,
                    ie,
                    l,
                    r,
                    w,
                    C,
                    d,
                    h
                  );
                  h = ue.bestTiles, M[N] = ue.tile, N += 1;
                }
              }
            return {
              bestTiles: h,
              updatedTiles: M
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
            var g = r.pixelFromPointNoRotate(h, !0), m = r.pixelFromPointNoRotate(h, !1), T = r.deltaPixelsFromPointsNoRotate(c, !0), b = r.deltaPixelsFromPointsNoRotate(c, !1), C = m.plus(b.divide(2)), w = f.squaredDistanceTo(C);
            this.viewer.drawer.minimumOverlapRequired(this) && (o || (T = T.plus(new a.Point(1, 1))), l.isRightMost && this.wrapHorizontal && (T.x += 0.75), l.isBottomMost && this.wrapVertical && (T.y += 0.75)), l.position = g, l.size = T, l.squaredDistance = w, l.visibility = d;
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
            var m = this._getTile(
              l,
              o,
              r,
              c,
              h
            );
            this.viewer && this.viewer.raiseEvent("update-tile", {
              tiledImage: this,
              tile: m
            }), this._setCoverage(this.coverage, r, l, o, !1);
            var T = m.loaded || m.loading || this._isCovered(this.loadingCoverage, r, l, o);
            if (this._setCoverage(this.loadingCoverage, r, l, o, T), !m.exists)
              return {
                bestTiles: g,
                tile: m
              };
            if (m.loaded && m.opacity === 1 && this._setCoverage(this.coverage, r, l, o, !0), this._positionTile(
              m,
              this.source.tileOverlap,
              this.viewport,
              d,
              f
            ), !m.loaded)
              if (m.context2D)
                this._setTileLoaded(m);
              else {
                var b = this._tileCache.getImageRecord(m.cacheKey);
                b && this._setTileLoaded(m, b.getData());
              }
            return m.loading ? this._tilesLoading++ : T || (g = this._compareTiles(g, m, this.maxTilesPerFrame)), {
              bestTiles: g,
              tile: m
            };
          },
          // private
          _getCornerTiles: function(l, o, r) {
            var f, d;
            this.wrapHorizontal ? (f = a.positiveModulo(o.x, 1), d = a.positiveModulo(r.x, 1)) : (f = Math.max(0, o.x), d = Math.min(1, r.x));
            var h, c, g = 1 / this.source.aspectRatio;
            this.wrapVertical ? (h = a.positiveModulo(o.y, g), c = a.positiveModulo(r.y, g)) : (h = Math.max(0, o.y), c = Math.min(g, r.y));
            var m = this.source.getTileAtPoint(l, new a.Point(f, h)), T = this.source.getTileAtPoint(l, new a.Point(d, c)), b = this.source.getNumTiles(l);
            return this.wrapHorizontal && (m.x += b.x * Math.floor(o.x), T.x += b.x * Math.floor(r.x)), this.wrapVertical && (m.y += b.y * Math.floor(o.y / g), T.y += b.y * Math.floor(r.y / g)), {
              topLeft: m,
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
            var h, c, g, m, T, b, C, w, A, M, N = this.tilesMatrix, Z = this.source;
            return N[r] || (N[r] = {}), N[r][l] || (N[r][l] = {}), (!N[r][l][o] || !N[r][l][o].flipped != !this.flipped) && (h = (d.x + l % d.x) % d.x, c = (d.y + o % d.y) % d.y, g = this.getTileBounds(r, l, o), m = Z.getTileBounds(r, h, c, !0), T = Z.tileExists(r, h, c), b = Z.getTileUrl(r, h, c), C = Z.getTilePostData(r, h, c), this.loadTilesWithAjax ? (w = Z.getTileAjaxHeaders(r, h, c), a.isPlainObject(this.ajaxHeaders) && (w = a.extend({}, this.ajaxHeaders, w))) : w = null, A = Z.getContext2D ? Z.getContext2D(r, h, c) : void 0, M = new a.Tile(
              r,
              l,
              o,
              g,
              T,
              b,
              A,
              this.loadTilesWithAjax,
              w,
              m,
              C,
              Z.getTileHashKey(r, h, c, b, w, C)
            ), this.getFlip() ? h === 0 && (M.isRightMost = !0) : h === d.x - 1 && (M.isRightMost = !0), c === d.y - 1 && (M.isBottomMost = !0), M.flipped = this.flipped, N[r][l][o] = M), M = N[r][l][o], M.lastTouchTime = f, M;
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
              var g = h.source, m = g.getClosestLevel();
              h._setTileLoaded(l, r, m, d);
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
              return h && a.console.error("Event 'tile-loaded' argument getCompletionCallback must be called synchronously. Its return value should be called asynchronously."), d++, m;
            }
            function m() {
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
            for (var c = null, g = -1, m = null, T, b, C, w, A, M, N = this._tilesLoaded.length - 1; N >= 0; N--)
              if (M = this._tilesLoaded[N], T = M.tile, !(T.level <= f || T.beingDrawn)) {
                if (!c) {
                  c = T, g = N, m = M;
                  continue;
                }
                w = T.lastTouchTime, b = c.lastTouchTime, A = T.level, C = c.level, (w < b || w === b && A > C) && (c = T, g = N, m = M);
              }
            c && g >= 0 && (this._unloadTile(m), d = g);
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
            var o = l.immediately || !1, r = l.layout || a.DEFAULT_SETTINGS.collectionLayout, f = l.rows || a.DEFAULT_SETTINGS.collectionRows, d = l.columns || a.DEFAULT_SETTINGS.collectionColumns, h = l.tileSize || a.DEFAULT_SETTINGS.collectionTileSize, c = l.tileMargin || a.DEFAULT_SETTINGS.collectionTileMargin, g = h + c, m;
            !l.rows && d ? m = d : m = Math.ceil(this._items.length / f);
            var T = 0, b = 0, C, w, A, M, N;
            this.setAutoRefigureSizes(!1);
            for (var Z = 0; Z < this._items.length; Z++)
              Z && Z % m === 0 && (r === "horizontal" ? (b += g, T = 0) : (T += g, b = 0)), C = this._items[Z], w = C.getBounds(), w.width > w.height ? A = h : A = h * (w.width / w.height), M = A * (w.height / w.width), N = new a.Point(
                T + (h - A) / 2,
                b + (h - M) / 2
              ), C.setPosition(N, o), C.setWidth(A, o), r === "horizontal" ? T += g : b += g;
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
              for (var h = f.getClippedBounds().getBoundingBox(), c = h.x, g = h.y, m = h.x + h.width, T = h.y + h.height, b = 1; b < this._items.length; b++)
                f = this._items[b], d = f.getBounds(), this._contentFactor = Math.max(
                  this._contentFactor,
                  f.getContentSize().x / d.width
                ), h = f.getClippedBounds().getBoundingBox(), c = Math.min(c, h.x), g = Math.min(g, h.y), m = Math.max(m, h.x + h.width), T = Math.max(T, h.y + h.height);
              this._homeBounds = new a.Rect(c, g, m - c, T - g), this._contentSize = new a.Point(
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
  })(rs)), rs.exports;
}
var jm = Um();
const Ei = /* @__PURE__ */ Rm(jm), xu = { TYPOGRAPHY: 2, ILLUSTRATION: 3, STAMP: 4 };
function wu(Y) {
  return Y.width < Y.height ? "vertical" : "horizontal";
}
function kl(Y) {
  return Y.direction === "vertical" || Y.direction === "horizontal" ? Y.direction : wu(Y);
}
function Fm(Y) {
  const K = Y.filter((a) => kl(a) === "vertical").length;
  return Y.length < K * 2 ? "vertical" : "horizontal";
}
function pu(Y) {
  return Y === "vertical" ? "縦書き" : "横書き";
}
function yd(Y, K) {
  return K === "auto" ? Y === "vertical" ? "rtl" : "ltr" : K;
}
function vu(Y, K) {
  return Y === "auto" ? "自動（" + (K === "vertical" ? "右から左" : "左から右") + "）" : Y === "rtl" ? "右から左" : "左から右";
}
function Gm(Y, K, a) {
  const l = yd(K, a);
  return [...Y].sort((o, r) => K === "vertical" ? (l === "ltr" ? o.x - r.x : r.x - o.x) || o.y - r.y : o.y - r.y || (l === "ltr" ? o.x - r.x : r.x - o.x)).map((o, r) => ({ ...o, readingOrder: r + 1 }));
}
const km = {
  [xu.ILLUSTRATION]: "図版",
  [xu.STAMP]: "印判"
}, Vm = ["nw", "n", "ne", "e", "se", "s", "sw", "w"], Ui = 6, dd = 24, gd = 36, md = 24;
function qm(Y, K, a) {
  const l = Math.max(Y.width, 1), o = Math.max(Y.height, 1), r = l * 3, f = Math.max(K - dd * 2, 1), d = Math.max(a - gd - md, 1), h = Math.max(Math.min(f / r, d / o), 1e-3), c = dd / h, g = gd / h, m = md / h;
  return new Ei.Rect(
    Y.x - l - c,
    Y.y - g,
    r + c * 2,
    o + g + m
  );
}
const Zm = ae.forwardRef(function({
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
  selectedRegion: m,
  onRegionDraw: T
}, b) {
  const C = ae.useRef(null), w = ae.useRef(null), A = ae.useRef(/* @__PURE__ */ new Map()), [M, N] = ae.useState(!1), [Z, ie] = ae.useState(!1), se = ae.useRef(null), [de, ue] = ae.useState(null), [Te, Ce] = ae.useState(null), [ke, Le] = ae.useState(null), [ve, Ze] = ae.useState(null), Ke = ae.useRef(f), Ie = ae.useRef(d), V = ae.useRef(h), ne = ae.useRef(a), ge = ae.useRef(o), ze = ae.useRef(r), He = ae.useRef(null), B = ae.useRef(() => {
  }), I = ae.useRef(g), J = ae.useRef(m), ce = ae.useRef(T);
  ae.useEffect(() => {
    Ke.current = f;
  }, [f]), ae.useEffect(() => {
    Ie.current = d;
  }, [d]), ae.useEffect(() => {
    V.current = h;
  }, [h]), ae.useEffect(() => {
    ne.current = a;
  }, [a]), ae.useEffect(() => {
    ge.current = o;
  }, [o]), ae.useEffect(() => {
    ze.current = r;
  }, [r]), ae.useEffect(() => {
    ce.current = T;
  }, [T]), ae.useImperativeHandle(b, () => ({
    scrollToLine(re) {
      const be = w.current, xe = be?.world.getItemAt(0), Ve = ne.current.find((tt) => tt.readingOrder === re), Ye = C.current;
      be && xe && Ve && Ye && be.viewport.fitBounds(xe.imageToViewportRectangle(
        qm(Ve, Ye.clientWidth, Ye.clientHeight)
      ));
    },
    getVisibleImageBounds() {
      const re = w.current, be = re?.world.getItemAt(0);
      if (!re || !be) return null;
      const xe = be.viewportToImageRectangle(re.viewport.getBounds());
      return { x: xe.x, y: xe.y, width: xe.width, height: xe.height };
    }
  }), []);
  const Ee = ae.useCallback((re, be) => {
    const xe = w.current, Ve = C.current.getBoundingClientRect();
    return xe.viewport.viewerElementToImageCoordinates(new Ei.Point(re - Ve.left, be - Ve.top));
  }, []), Be = ae.useCallback((re) => {
    const be = w.current, xe = be.viewport.imageToViewerElementCoordinates(new Ei.Point(re.x, re.y)), Ve = be.viewport.imageToViewerElementCoordinates(new Ei.Point(re.x + re.width, re.y + re.height));
    return { left: xe.x, top: xe.y, width: Ve.x - xe.x, height: Ve.y - xe.y };
  }, []), Fe = ae.useCallback(() => {
    const re = w.current, be = ze.current;
    if (!re || be == null || !ge.current || !re.world.getItemAt(0)) {
      Ce(null);
      return;
    }
    const xe = He.current ?? ne.current.find((Ve) => Ve.readingOrder === be);
    if (!xe) {
      Ce(null);
      return;
    }
    Ce(Be(xe));
  }, [Be]), lt = ae.useCallback(() => {
    const re = w.current, be = J.current;
    if (!re || !be || !re.world.getItemAt(0)) {
      Ze(null);
      return;
    }
    Ze(Be(be));
  }, [Be]);
  ae.useEffect(() => {
    B.current = () => {
      Fe(), lt();
    };
  }, [Fe, lt]), ae.useEffect(() => {
    J.current = m, lt();
  }, [m, M, lt]), ae.useEffect(() => {
    I.current = g;
    const re = w.current;
    re && re.setMouseNavEnabled(!g), C.current && (C.current.style.cursor = g ? "crosshair" : ""), g || Le(null);
  }, [g]), ae.useEffect(() => {
    if (!C.current) return;
    const re = C.current, be = Ei({
      element: re,
      showNavigationControl: !1,
      gestureSettingsMouse: { clickToZoom: !1, dblClickToZoom: !0 },
      visibilityRatio: 1,
      minZoomImageRatio: 0.8,
      maxZoomPixelRatio: 4,
      animationTime: 0.4,
      preserveImageSizeOnResize: !0
    });
    w.current = be, be.addHandler("update-viewport", () => B.current());
    let xe = -1;
    const Ve = (q) => {
      if (I.current || !ge.current || !be.world.getItemAt(0)) {
        xe !== -1 && (xe = -1, ue(null));
        return;
      }
      const oe = Ee(q.clientX, q.clientY), we = ne.current.find((x) => oe.x >= x.x && oe.x <= x.x + x.width && oe.y >= x.y && oe.y <= x.y + x.height);
      if (!we || we.raw == null) {
        xe !== -1 && (xe = -1, ue(null));
        return;
      }
      const fe = kl(we), ye = fe === "vertical" ? new Ei.Point(we.x + we.width, we.y) : new Ei.Point(we.x, we.y + we.height), Me = be.viewport.imageToViewerElementCoordinates(ye);
      xe = we.readingOrder, ue({
        order: we.readingOrder,
        text: we.raw || "（空）",
        x: fe === "vertical" ? Me.x + 8 : Math.max(4, Me.x),
        y: fe === "vertical" ? Math.max(4, Me.y) : Me.y + 8,
        direction: fe
      });
    }, Ye = () => {
      xe = -1, ue(null);
    };
    let tt = null;
    const wt = (q) => {
      I.current || (tt = { x: q.clientX, y: q.clientY });
    }, p = (q) => {
      if (I.current || !tt) return;
      const oe = Math.hypot(q.clientX - tt.x, q.clientY - tt.y);
      if (tt = null, oe > 5 || !be.world.getItemAt(0)) return;
      const we = Ee(q.clientX, q.clientY), fe = J.current;
      if (fe && !(we.x >= fe.x && we.x <= fe.x + fe.width && we.y >= fe.y && we.y <= fe.y + fe.height)) {
        ce.current(null);
        return;
      }
      if (!ge.current) return;
      const ye = ne.current.find((Me) => we.x >= Me.x && we.x <= Me.x + Me.width && we.y >= Me.y && we.y <= Me.y + Me.height);
      Ke.current(ye ? ye.readingOrder : null);
    };
    let E = null;
    const L = (q) => {
      !I.current || !be.world.getItemAt(0) || (E = { x: q.clientX, y: q.clientY }, re.setPointerCapture?.(q.pointerId), Le({ left: 0, top: 0, width: 0, height: 0 }));
    }, W = (q) => {
      if (!E) return;
      const oe = re.getBoundingClientRect(), we = E.x - oe.left, fe = E.y - oe.top, ye = q.clientX - oe.left, Me = q.clientY - oe.top;
      Le({ left: Math.min(we, ye), top: Math.min(fe, Me), width: Math.abs(ye - we), height: Math.abs(Me - fe) });
    }, le = (q) => {
      if (!E) return;
      const oe = E;
      E = null, Le(null);
      const we = be.world.getItemAt(0);
      if (!we) {
        ce.current(null);
        return;
      }
      const fe = Ee(oe.x, oe.y), ye = Ee(q.clientX, q.clientY), Me = we.getContentSize(), x = Math.max(0, Math.min(fe.x, ye.x)), y = Math.max(0, Math.min(fe.y, ye.y)), _ = Math.min(Me.x, Math.max(fe.x, ye.x)), D = Math.min(Me.y, Math.max(fe.y, ye.y)), k = _ - x, $ = D - y;
      ce.current(k >= 4 && $ >= 4 ? { x: Math.round(x), y: Math.round(y), width: Math.round(k), height: Math.round($) } : null);
    }, he = () => {
      E = null, tt = null, Le(null);
    };
    return re.addEventListener("pointermove", Ve), re.addEventListener("pointerleave", Ye), re.addEventListener("pointerdown", wt), re.addEventListener("pointerup", p), re.addEventListener("pointerdown", L), re.addEventListener("pointermove", W), re.addEventListener("pointerup", le), re.addEventListener("pointercancel", he), () => {
      re.removeEventListener("pointermove", Ve), re.removeEventListener("pointerleave", Ye), re.removeEventListener("pointerdown", wt), re.removeEventListener("pointerup", p), re.removeEventListener("pointerdown", L), re.removeEventListener("pointermove", W), re.removeEventListener("pointerup", le), re.removeEventListener("pointercancel", he), se.current?.(), be.destroy(), w.current = null;
    };
  }, [Ee]), ae.useEffect(() => {
    const re = w.current;
    if (!re || !K) return;
    se.current?.(), N(!1), ie(!1), ue(null), Ce(null);
    const be = () => N(!0), xe = () => ie(!0);
    return re.addHandler("open", be), re.addHandler("open-failed", xe), re.open({ type: "image", url: K, buildPyramid: !1 }), () => {
      re.removeHandler("open", be), re.removeHandler("open-failed", xe);
    };
  }, [K]), ae.useEffect(() => {
    const re = w.current;
    if (!re || !M) return;
    const be = re.world.getItemAt(0);
    if (be && (re.clearOverlays(), A.current.clear(), !!o)) {
      for (const xe of a) {
        const Ve = document.createElement("div");
        Ve.className = "osd-line" + (xe.classId === xu.TYPOGRAPHY ? " osd-line-type" : "");
        const Ye = document.createElement("span");
        Ye.className = "osd-order", Ye.textContent = String(xe.readingOrder), Ve.appendChild(Ye), re.addOverlay({ element: Ve, location: be.imageToViewportRectangle(new Ei.Rect(xe.x, xe.y, xe.width, xe.height)) }), A.current.set(xe.readingOrder, Ve);
      }
      for (const xe of l) {
        const Ve = document.createElement("div");
        Ve.className = "osd-region";
        const Ye = km[xe.classId];
        if (Ye) {
          const tt = document.createElement("span");
          tt.className = "osd-region-label", tt.textContent = Ye, Ve.appendChild(tt);
        }
        re.addOverlay({ element: Ve, location: be.imageToViewportRectangle(new Ei.Rect(xe.x, xe.y, xe.width, xe.height)) });
      }
      A.current.forEach((xe, Ve) => xe.classList.toggle("selected", Ve === r));
    }
  }, [M, a, l, o]), ae.useEffect(() => {
    A.current.forEach((re, be) => re.classList.toggle("selected", be === r)), Fe();
  }, [r, a, M, o, Fe]);
  const rt = ae.useCallback((re, be) => {
    re.stopPropagation(), re.preventDefault(), se.current?.();
    const xe = w.current, Ve = ze.current;
    if (!xe || Ve == null) return;
    const Ye = xe.world.getItemAt(0), tt = ne.current.find((fe) => fe.readingOrder === Ve);
    if (!Ye || !tt) return;
    const wt = Ye.getContentSize(), p = wt.x, E = wt.y, L = Ee(re.clientX, re.clientY), W = { x: tt.x, y: tt.y, width: tt.width, height: tt.height };
    re.currentTarget.setPointerCapture?.(re.pointerId);
    const he = (fe) => {
      const ye = Ee(fe.clientX, fe.clientY), Me = ye.x - L.x, x = ye.y - L.y;
      let { x: y, y: _, width: D, height: k } = W;
      be === "move" ? (y += Me, _ += x) : (be.includes("e") && (D += Me), be.includes("s") && (k += x), be.includes("w") && (y += Me, D -= Me), be.includes("n") && (_ += x, k -= x)), D < Ui && (be.includes("w") && (y = W.x + W.width - Ui), D = Ui), k < Ui && (be.includes("n") && (_ = W.y + W.height - Ui), k = Ui), y = Math.max(0, Math.min(y, p - Ui)), _ = Math.max(0, Math.min(_, E - Ui)), D = Math.max(Ui, Math.min(D, p - y)), k = Math.max(Ui, Math.min(k, E - _));
      const $ = { x: Math.round(y), y: Math.round(_), width: Math.round(D), height: Math.round(k) };
      He.current = $;
      const me = A.current.get(Ve);
      me && xe.updateOverlay(me, Ye.imageToViewportRectangle(new Ei.Rect($.x, $.y, $.width, $.height))), Ce(Be($));
    }, q = () => {
      window.removeEventListener("pointermove", he), window.removeEventListener("pointerup", we), window.removeEventListener("pointercancel", oe), se.current = null;
    }, oe = () => {
      q(), He.current = null;
      const fe = A.current.get(Ve);
      fe && xe.updateOverlay(fe, Ye.imageToViewportRectangle(new Ei.Rect(W.x, W.y, W.width, W.height))), Ce(Be(W));
    }, we = () => {
      q();
      const fe = He.current;
      He.current = null, fe && Ie.current(Ve, fe);
    };
    window.addEventListener("pointermove", he), window.addEventListener("pointerup", we), window.addEventListener("pointercancel", oe), se.current = oe;
  }, [Ee, Be]);
  return /* @__PURE__ */ R.jsxs("div", { className: "osd-root", children: [
    /* @__PURE__ */ R.jsx("div", { className: "osd-host", ref: C }),
    Z && /* @__PURE__ */ R.jsx("div", { className: "kobun-empty", role: "alert", children: "画像を開けません。ページを開き直してください。" }),
    ve && !ke && /* @__PURE__ */ R.jsx("div", { className: "osd-select-region", style: { left: ve.left, top: ve.top, width: ve.width, height: ve.height } }),
    ke && /* @__PURE__ */ R.jsx("div", { className: "osd-select-draw", style: { left: ke.left, top: ke.top, width: ke.width, height: ke.height } }),
    c && Te && /* @__PURE__ */ R.jsxs("div", { className: "edit-layer", style: { left: Te.left, top: Te.top, width: Te.width, height: Te.height }, children: [
      /* @__PURE__ */ R.jsx("div", { className: "edit-move", onPointerDown: (re) => rt(re, "move"), title: "ドラッグで移動" }),
      Vm.map((re) => /* @__PURE__ */ R.jsx("div", { className: `edit-h edit-${re}`, onPointerDown: (be) => rt(be, re) }, re)),
      /* @__PURE__ */ R.jsx(
        "button",
        {
          className: "edit-del",
          title: "この行を削除 (Delete)",
          onPointerDown: (re) => {
            re.stopPropagation(), re.preventDefault();
            const be = ze.current;
            be != null && V.current(be);
          },
          children: "×"
        }
      )
    ] }),
    de && /* @__PURE__ */ R.jsxs("div", { className: `osd-popup is-${de.direction}`, style: { left: de.x, top: de.y }, children: [
      /* @__PURE__ */ R.jsx("span", { className: "osd-popup-no", children: de.order }),
      /* @__PURE__ */ R.jsx("span", { className: "osd-popup-text", children: de.text })
    ] })
  ] });
}), Fi = document.getElementById("kobun-workspace"), Ne = Fi.dataset.canManage === "1", ji = Fi.dataset.canEditTranscription === "1", Xm = Fi.dataset.transcriptionScope === "all" ? "all" : "owned", pd = Fi.dataset.preferredModel || "", Td = (Y) => `${Fi.dataset.proxy}?endpoint=${encodeURIComponent(Y)}`;
async function Su(Y) {
  if (!Y.headers.get("content-type")?.includes("json")) throw new Error("ログイン状態と接続を確認し、ページを再読み込みしてください。");
  const K = await Y.json();
  if (!Y.ok) throw new Error(K.error || `通信に失敗しました (${Y.status})`);
  return K;
}
async function Gt(Y, K = "GET", a) {
  return Su(await fetch(Td(Y), {
    method: K,
    credentials: "same-origin",
    cache: "no-store",
    headers: { "Content-Type": "application/json", "X-Kobun-CSRF": Fi.dataset.csrf },
    body: a === void 0 ? void 0 : JSON.stringify(a)
  }));
}
const Fl = [
  { id: "source", title: "資料・ページ", description: "対象資料を選び、その資料の画像ページを選びます。" },
  { id: "layout", title: "レイアウト調整", description: "行の枠と読み順を確認してから、文字を認識します。" },
  { id: "transcription", title: "翻刻確認", description: "画像と照らし合わせ、認識した文字を直します。" },
  { id: "translation", title: "現代語訳（任意）", description: "必要に応じて翻訳する範囲と本文を確認し、訳文を作ります。" },
  { id: "publication", title: "確認・公開", description: "責任表示と権利情報を確認し、公開状態を変更します。" }
], ja = (Y) => ["queued", "running"].includes(Y?.job?.status || ""), Ym = (Y) => Y.publication_state === "reviewed" || Y.publication_state === "published" || Y.transcription_credit || Y.review_note || Object.keys(Y.transcription_metadata || {}).length > 0 ? "publication" : Y.translation || Y.translation_draft ? "translation" : Y.lines.length && Y.lines.every((K) => K.raw !== void 0) ? "transcription" : "layout", Im = (Y) => Y.map((K, a) => ({ ...K, readingOrder: a + 1 })), yu = { layout: "レイアウト認識", recognize: "文字認識", translate: "現代語訳", queued: "処理待ち", running: "処理中", human_edit: "レイアウトの手動修正", transcription_edit: "翻刻の修正", image_saved: "画像の保存", translation_input_edit: "翻訳用本文の編集", translation_manual: "現代語訳の入力・修正", translation_commercial: "商用LLMの現代語訳を取り込み", translation_delete: "現代語訳の削除", publication_draft: "下書きへ変更", publication_reviewed: "確認済みへ変更", publication_published: "公開", publication_metadata: "責任表示・研究成果情報の変更", interrupted: "中断", error: "処理失敗" }, vd = { draft: "下書き", reviewed: "確認済み", published: "公開中" };
function Un(Y) {
  return Object.fromEntries(Object.entries(Y).flatMap(([K, a]) => {
    const l = typeof a == "string" ? a.trim() : "";
    return l ? [[K, l]] : [];
  }));
}
function Gl(Y) {
  const K = Y.replace(/\r\n?/g, `
`).split(`
`).map((a) => a.replace(/[ \t]+$/u, ""));
  for (; K.length && K.at(-1) === ""; ) K.pop();
  return K;
}
function Qm(Y) {
  const K = Gl(Y), a = [];
  let l = null;
  const o = /^[［\[]\s*[一二三四五六七八九十百〇零0-9０-９]+\s*(?:オ|ウ|表|裏)\s*[］\]]$/u;
  for (const r of K)
    o.test(r.trim()) ? (l?.lines.length && a.push(l), l = { label: r.trim(), lines: [] }) : l && l.lines.push(r);
  return l?.lines.length && a.push(l), a.length ? a : [{ label: "テキスト全体", lines: K }];
}
function Tu(Y, K, a = "text/plain;charset=utf-8") {
  const l = URL.createObjectURL(new Blob([K], { type: a })), o = document.createElement("a");
  o.href = l, o.download = Y, o.click(), setTimeout(() => URL.revokeObjectURL(l), 1e3);
}
function Wm() {
  const Y = ae.useRef(null);
  return ae.useEffect(() => _m(Y.current), []), /* @__PURE__ */ R.jsx("div", { ref: Y });
}
function Km() {
  const Y = new URLSearchParams(location.search), [K, a] = ae.useState(Y.get("identifier") || ""), [l, o] = ae.useState(""), [r, f] = ae.useState(""), [d, h] = ae.useState([]), [c, g] = ae.useState(1), [m, T] = ae.useState(0), [b, C] = ae.useState([]), [w, A] = ae.useState(null), M = ae.useRef(null), [N, Z] = ae.useState("source"), [ie, se] = ae.useState([]), [de, ue] = ae.useState("auto"), [Te, Ce] = ae.useState(null), [ke, Le] = ae.useState(!1), [ve, Ze] = ae.useState([]), [Ke, Ie] = ae.useState([]), [V, ne] = ae.useState(!1), [ge, ze] = ae.useState(""), [He, B] = ae.useState(null), [I, J] = ae.useState(!1), [ce, Ee] = ae.useState(null), [Be, Fe] = ae.useState(!0), [lt, rt] = ae.useState(1), [re, be] = ae.useState(1), [xe, Ve] = ae.useState(""), [Ye, tt] = ae.useState(!1), [wt, p] = ae.useState(""), [E, L] = ae.useState(!1), [W, le] = ae.useState(!1), [he, q] = ae.useState("input"), [oe, we] = ae.useState(td), [fe, ye] = ae.useState(null), [Me, x] = ae.useState(!1), y = ae.useRef(null), [_, D] = ae.useState(!1), [k, $] = ae.useState(null), [me, Ue] = ae.useState(""), [De, zt] = ae.useState(""), [je, it] = ae.useState({}), [Gi, bi] = ae.useState(!1), [kt, jn] = ae.useState([]), [Ri, Vl] = ae.useState([]), [rn, Fn] = ae.useState(""), [ki, ql] = ae.useState([]), [Fa, Ga] = ae.useState([]), [ka, la] = ae.useState(""), Gn = ae.useRef(null), _e = V || ja(w), sn = ke || Ye || E, Ci = !!w && Ne && (me !== (w.review_note || "") || De !== (w.transcription_credit || "") || JSON.stringify(Un(je)) !== JSON.stringify(Un(w.transcription_metadata || {}))), yt = sn || Ci, Mt = ie.slice(lt - 1, re).map((O) => O.id), ui = !!ie.length && ie.every((O) => O.raw !== void 0), mt = !ke && !Ye ? w?.translation : null, ra = Fl.findIndex((O) => O.id === N), ei = Fm(ie), Va = ei === "vertical", Di = yd(ei, de), on = Va ? Di === "rtl" ? "ArrowRight" : "ArrowLeft" : "ArrowUp", Oi = Va ? Di === "rtl" ? "ArrowLeft" : "ArrowRight" : "ArrowDown", Ti = on === "ArrowRight" ? "→" : on === "ArrowLeft" ? "←" : "↑", Ai = Oi === "ArrowRight" ? "→" : Oi === "ArrowLeft" ? "←" : "↓", zi = Array.from(b.reduce((O, F) => {
    const pe = F.source.item_id, Oe = O.get(pe);
    return Oe ? Oe.count += 1 : O.set(pe, { id: pe, title: F.source.item_title, identifier: F.source.item_identifier || "", count: 1 }), O;
  }, /* @__PURE__ */ new Map()).values()), xt = d[0]?.item_id ?? w?.source.item_id ?? 0;
  function xi(O, F = !1) {
    M.current = O.id, A(O), se(O.lines), Le(!1), Ze([]), Ie([]), ue(O.reading_direction || "auto"), Ee(null), J(!1), $(null), D(!1), tt(!1), p(O.translation?.text || ""), L(!1), le(!1), ye(null), F || (Ue(O.review_note || ""), zt(O.transcription_credit || ""), it(O.transcription_metadata || {}), bi(Object.keys(O.transcription_metadata || {}).length === 0)), Ve(O.translation_draft?.text ?? O.translation?.input ?? O.lines.map((ot) => ot.raw || "").join(""));
    const pe = O.translation_draft?.line_ids ?? O.translation?.line_ids, Oe = O.lines.flatMap((ot, Ht) => !pe || pe.includes(ot.id) ? [Ht + 1] : []);
    rt(Oe[0] || 1), be(Oe.at(-1) || 1);
  }
  async function Bt(O) {
    ne(!0), ze("");
    try {
      await O();
    } catch (F) {
      ze(F.message);
    } finally {
      ne(!1);
    }
  }
  function Mi() {
    return !yt || window.confirm("保存していない変更があります。破棄してページを移動しますか。");
  }
  async function Zt(O = 1, F) {
    _e || O === 1 && !Mi() || await Bt(async () => {
      const pe = F ? `item_id=${encodeURIComponent(F)}` : `identifier=${encodeURIComponent(O === 1 ? K : l)}`, Oe = await Su(await fetch(`${Fi.dataset.pages}?${pe}&page=${O}`, { cache: "no-store" }));
      h(Oe.pages), f(Oe.title), g(O), T(Oe.total), a(Oe.identifier), o(Oe.identifier), O === 1 && (M.current = null, A(null), se([]), Le(!1), tt(!1), Z("source"));
    });
  }
  async function ss(O) {
    _e || !Mi() || await Bt(async () => {
      const F = b.find((Oe) => Oe.source.media_id === O.media_id);
      if (!Ne && !F) throw new Error("このページには保存済みの作業がありません。管理者が作業を作成してから修正できます。");
      const pe = F ? await Gt(`documents/${F.id}`) : await Gt("documents", "POST", { media_id: O.media_id });
      pe.source.item_identifier = O.item_identifier, xi(pe), Ce(null), Z(Ym(pe)), q(pe.translation ? "result" : "input"), C(await Gt("documents"));
    });
  }
  ae.useEffect(() => {
    const O = Sm(() => we(td()));
    return () => {
      O(), y.current?.abort();
    };
  }, []), ae.useEffect(() => {
    Gt("health").then(B).catch((O) => ze(O.message)), Gt("documents").then(C).catch(() => {
    }), Y.get("item_id") ? Zt(1, Y.get("item_id")) : Y.get("identifier") && Zt();
  }, []), ae.useEffect(() => {
    if (!w || !ja(w)) return;
    const O = w.id;
    let F = !1, pe;
    async function Oe() {
      try {
        const ot = await Gt(`documents/${O}`);
        if (F || M.current !== O) return;
        if (A(ot), ze(""), !ja(ot)) {
          xi(ot), ot.job?.status === "error" ? ze(ot.job.error || "処理に失敗しました。") : ot.job?.operation === "recognize" ? Z("transcription") : ot.job?.operation === "translate" && (Z("translation"), q("result"));
          return;
        }
      } catch (ot) {
        F || ze(`状態取得を再試行しています。${ot.message}`);
      }
      F || (pe = setTimeout(Oe, 1200));
    }
    return pe = setTimeout(Oe, 1e3), () => {
      F = !0, clearTimeout(pe);
    };
  }, [w?.id, w?.job?.id]), ae.useEffect(() => {
    const O = (F) => {
      (yt || Me) && (F.preventDefault(), F.returnValue = "");
    };
    return window.addEventListener("beforeunload", O), () => window.removeEventListener("beforeunload", O);
  }, [yt, Me]), ae.useEffect(() => {
    jn([]), Vl([]), Fn(""), ql([]), Ga([]), la("");
  }, [w?.id]);
  function Bi(O) {
    _e || N === "layout" && !Ne || N === "transcription" && !ji || (Ze([...ve.slice(-29), ie]), Ie([]), se(Im(O)), Le(!0), $(null));
  }
  function qa() {
    !ve.length || _e || (Ie([...Ke, ie]), se(ve[ve.length - 1]), Ze(ve.slice(0, -1)), Le(!0));
  }
  function Zl() {
    !Ke.length || _e || (Ze([...ve, ie]), se(Ke[Ke.length - 1]), Ie(Ke.slice(0, -1)), Le(!0));
  }
  function sa(O, F) {
    N === "layout" && Bi(ie.map((pe) => pe.readingOrder === O ? { ...pe, ...F, direction: wu(F), raw: void 0, machineRaw: void 0 } : pe));
  }
  function un(O) {
    N === "layout" && (Bi(ie.filter((F) => F.readingOrder !== O)), Ce(null));
  }
  function ti(O) {
    const F = ie.findIndex((Oe) => Oe.readingOrder === Te);
    if (N !== "layout" || F < 0 || F + O < 0 || F + O >= ie.length) return;
    const pe = [...ie];
    [pe[F], pe[F + O]] = [pe[F + O], pe[F]], Bi(pe), Ce(F + O + 1);
  }
  function Xt() {
    if (!w || !ce) return;
    const O = {
      ...ce,
      id: crypto.randomUUID(),
      confidence: 0,
      classId: 1,
      readingOrder: ie.length + 1,
      direction: wu(ce)
    };
    Bi([...ie, O]), Ce(O.readingOrder), J(!1), Ee(null);
  }
  function Xl(O) {
    if (!Ne || N !== "layout" || O === de || ie.some((pe) => pe.raw !== void 0) && !window.confirm("読み方向を変えると文字認識結果を解除します。保存済みの版は履歴に残ります。続けますか。")) return;
    const F = Gm(ie, ei, O).map((pe) => ({ ...pe, raw: void 0, machineRaw: void 0 }));
    ue(O), Bi(F), Ce(null);
  }
  ae.useEffect(() => {
    const O = (F) => {
      if (!(_e || !["layout", "transcription"].includes(N) || F.target.closest("input,textarea,select,[contenteditable]"))) {
        if ((F.ctrlKey || F.metaKey) && F.key.toLowerCase() === "z") {
          F.preventDefault(), F.shiftKey ? Zl() : qa();
          return;
        }
        N !== "layout" || Te === null || ((F.key === on || F.key === Oi) && (F.preventDefault(), F.stopImmediatePropagation(), ti(F.key === on ? -1 : 1)), (F.key === "Delete" || F.key === "Backspace") && (F.preventDefault(), un(Te)), F.key === "Escape" && Ce(null));
      }
    };
    return window.addEventListener("keydown", O, !0), () => window.removeEventListener("keydown", O, !0);
  });
  async function kn() {
    if (!w) throw new Error("ページを選択してください。");
    if (!ke) return w;
    const O = N === "transcription" ? await Gt(`documents/${w.id}/transcription`, "PUT", {
      base_revision: w.revision,
      lines: ie.map((F) => ({ id: F.id, raw: F.raw ?? "" }))
    }) : await Gt(`documents/${w.id}/layout`, "PUT", {
      base_revision: w.revision,
      lines: ie,
      reading_direction: de
    });
    return xi(O, !0), O;
  }
  async function Vi(O = !1) {
    const F = N === "translation" && E, pe = wt;
    if (F && fe && (fe.input !== xe || JSON.stringify(fe.line_ids) !== JSON.stringify(Mt)))
      throw new Error("生成後に翻訳用本文または行の範囲が変わっています。本文を元に戻すか、入力をキャンセルしてから作り直してください。");
    let Oe = await kn();
    return N === "translation" && (Ye || O && !Oe.translation_draft) && (Oe = await Gt(`documents/${Oe.id}/translation-input`, "PUT", {
      base_revision: Oe.revision,
      text: xe,
      line_ids: Mt
    }), xi(Oe, !0)), F && (Oe = await Gt(`documents/${Oe.id}/translation`, "PUT", {
      base_revision: Oe.revision,
      text: pe,
      input: Oe.translation_draft?.text ?? xe,
      line_ids: Oe.translation_draft?.line_ids ?? Mt,
      ...fe ? {
        method: "commercial",
        provider: fe.provider,
        model: fe.model,
        prompt_revision: fe.prompt_revision,
        human_edited: pe !== fe.text
      } : {}
    }), xi(Oe, !0)), Ne && (me !== (Oe.review_note || "") || De !== (Oe.transcription_credit || "") || JSON.stringify(Un(je)) !== JSON.stringify(Un(Oe.transcription_metadata || {}))) && (Oe = await Gt(`documents/${Oe.id}/review`, "PUT", {
      base_revision: Oe.revision,
      state: Oe.publication_state || "draft",
      note: me,
      credit: De,
      metadata: Un(je)
    }), xi(Oe)), Oe;
  }
  async function Za(O) {
    if (!_e) {
      if (N === "translation" && O !== "translation" && (Ye || E)) {
        if (!window.confirm("保存していない翻訳用本文または現代語訳の編集を破棄して移動しますか。")) return;
        Ve(w?.translation_draft?.text ?? w?.translation?.input ?? ie.map((F) => F.raw || "").join("")), tt(!1), p(w?.translation?.text || ""), L(!1), le(!1);
      }
      ke ? await Bt(async () => {
        await kn(), Z(O), O === "translation" && q("input");
      }) : (Z(O), O === "translation" && q("input")), J(!1), Ee(null);
    }
  }
  async function cn(O) {
    if (!w || _e || !Ne) return;
    if (O === "translate" && oe.provider !== "local") {
      if (!Em(xe)) return;
      await Bt(async () => {
        const pe = await Vi(!0), Oe = new AbortController();
        y.current = Oe, x(!0), q("result");
        try {
          const ot = await bm(pe.translation_draft.text, Oe.signal);
          ye({ ...ot, line_ids: pe.translation_draft.line_ids }), p(ot.text), L(!0), le(!0);
        } finally {
          y.current = null, x(!1);
        }
      });
      return;
    }
    const F = O === "layout" && ie.length > 0;
    F && !window.confirm("レイアウトと翻刻を再認識結果に置き換えます。保存済みの版は履歴に残ります。続けますか。") || O === "recognize" && ie.some((pe) => pe.raw) && !window.confirm("文字を再認識します。保存済みの翻刻は履歴に残ります。続けますか。") || await Bt(async () => {
      const pe = O === "translate" ? await Vi(!0) : await kn();
      A(await Gt(`documents/${pe.id}/jobs`, "POST", {
        operation: O,
        base_revision: pe.revision,
        force: F,
        line_ids: O === "translate" ? pe.translation_draft?.line_ids : void 0
      })), O === "translate" && q("result");
    });
  }
  function Xa(O, F) {
    if (!Ne || Ye && !window.confirm("翻訳用本文の編集を破棄し、選択した行から作り直しますか。")) return;
    const pe = Math.min(O, F), Oe = Math.max(O, F);
    rt(pe), be(Oe), Ve(ie.slice(pe - 1, Oe).map((ot) => ot.raw || "").join("")), tt(!0), q("input");
  }
  function Vt(O, F = kt) {
    const pe = Array.from(new Set(O)).filter((Oe) => !!F[Oe]).sort((Oe, ot) => Oe - ot);
    Vl(pe), Fn(pe.flatMap((Oe) => F[Oe].lines).join(`
`));
  }
  function Ya(O, F) {
    Vt(F ? [...Ri, O] : Ri.filter((pe) => pe !== O));
  }
  async function Yl(O) {
    if (O.size <= 0 || O.size > 1e7) {
      ze("取込ファイルは10 MB以内にしてください。");
      return;
    }
    await Bt(async () => {
      let F, pe = [], Oe = [];
      if (O.name.toLowerCase().endsWith(".docx")) {
        const ot = new FormData();
        ot.append("file", O);
        const Ht = await Su(await fetch(Fi.dataset.importUrl, {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
          headers: { "X-Kobun-CSRF": Fi.dataset.csrf },
          body: ot
        }));
        F = Ht.sections, pe = Ht.legend || [], Oe = Ht.notation || [], Ht.metadata && Object.keys(Ht.metadata).length && it((Ka) => ({ ...Ht.metadata, ...Un(Ka) }));
      } else if (O.name.toLowerCase().endsWith(".txt") || O.type.startsWith("text/"))
        F = Qm(await O.text());
      else
        throw new Error("Word（.docx）またはテキスト（.txt）ファイルを選択してください。");
      if (!F.length) throw new Error("取込可能な翻刻本文が見つかりません。");
      jn(F), ql(pe), Ga(Oe), la(`${O.name} · ${F.length}ページ候補`), Vt([0], F);
    });
  }
  async function Ia() {
    if (!w || _e || !ji) return;
    const O = Gl(rn);
    if (O.length !== ie.length) {
      ze(`取込テキストは${O.length}行、画像のレイアウトは${ie.length}行です。改行を調整して行数を一致させてください。`);
      return;
    }
    if (!O.some((F) => F.trim())) {
      ze("翻刻を1文字以上入力してください。");
      return;
    }
    ie.some((F) => F.raw?.trim()) && !window.confirm("現在の翻刻を取込テキストで置き換えます。保存済みの版は履歴に残ります。続けますか。") || (N === "layout" ? await Bt(async () => {
      const F = await kn();
      Ze([]), Ie([]), se(F.lines.map((pe, Oe) => ({ ...pe, raw: O[Oe] }))), Le(!0), Z("transcription"), Ce(null);
    }) : Bi(ie.map((F, pe) => ({ ...F, raw: O[pe] }))));
  }
  async function hn() {
    !w?.translation || _e || !Ne || window.confirm("この現代語訳を削除します。翻訳用本文と過去の履歴は残ります。よろしいですか。") && await Bt(async () => {
      const O = await Gt(`documents/${w.id}/translation`, "DELETE", { base_revision: w.revision });
      xi(O, !0), q("input");
    });
  }
  function oa() {
    !Ne || _e || (ye(null), p(w?.translation?.text || ""), L(!1), le(!0), q("result"));
  }
  function Il() {
    ye(null), p(w?.translation?.text || ""), L(!1), le(!1), w?.translation || q("input");
  }
  async function fn() {
    if (!(!w || !Ne || _e || !wt.trim())) {
      if (!E && w.translation) {
        le(!1);
        return;
      }
      await Bt(async () => {
        await Vi(!0), q("result");
      });
    }
  }
  async function os() {
    w && await Bt(async () => {
      const O = await Gt(`documents/${w.id}/history`);
      Tu(`${w.id}-record.json`, JSON.stringify({ document: w, history: O }, null, 2), "application/json");
    });
  }
  async function Ql() {
    if (_) {
      D(!1);
      return;
    }
    D(!0), w && k === null && await Bt(async () => $(await Gt(`documents/${w.id}/history`)));
  }
  async function Qa() {
    !w || _e || await Bt(async () => {
      await Vi(), Z("publication");
    });
  }
  async function dn(O) {
    !w || !Ne || _e || sn || await Bt(async () => xi(await Gt(`documents/${w.id}/review`, "PUT", {
      base_revision: w.revision,
      state: O,
      note: me,
      credit: De,
      metadata: Un(je)
    })));
  }
  const Wl = ie.find((O) => O.readingOrder === Te), Kl = !d.length || K !== l, Yt = w?.publication_state || "draft", ci = Object.keys(Un(je)).length, Wa = N === "source" ? Ne ? Kl ? "資料を開く" : "一覧からページを選んでください" : d.length ? "左から画像ページを選んでください" : "上から対象資料を選んでください" : N === "layout" ? Ne ? ie.length ? "調整を確定して文字認識" : "レイアウトを認識" : "レイアウトは閲覧のみ" : N === "transcription" ? ke ? Ne ? "翻刻の修正を保存して次へ" : "翻刻の修正を保存" : Ne ? "翻刻を確定して訳文の準備へ" : "翻刻は保存されています" : N === "translation" ? he === "result" ? W ? fe ? "生成した現代語訳を保存" : "入力した現代語訳を保存" : mt ? "確認・公開へ" : "現代語訳を入力" : Ne ? oe.provider === "local" ? "この本文を現代語訳" : `${uu[oe.provider]}でこの本文を現代語訳` : "現代語訳は実験機能です" : Yt === "draft" ? "確認済みにする" : Yt === "reviewed" ? "公開する" : "公開中", ua = _e || (N === "source" ? !K.trim() || !Kl : !w || (N === "layout" ? !Ne || !He?.ocr_ready : N === "transcription" ? !ji || !ui || !ie.some((O) => O.raw?.trim()) || !Ne && !ke : N === "translation" ? he === "result" ? W ? !Ne || !wt.trim() : !mt : !Ne || !xe.trim() || (oe.provider === "local" ? !He?.llm_ready : !oe.hasKey || !oe.model) : !Ne || !ui || !De.trim() || Yt === "published" || sn));
  function gn() {
    N === "source" ? Zt() : N === "layout" ? cn(ie.length ? "recognize" : "layout") : N === "transcription" ? Bt(async () => {
      await kn(), Ne && (Z("translation"), q("input"));
    }) : N === "translation" ? he === "result" && W ? fn() : he === "result" && mt ? Qa() : cn("translate") : Yt === "draft" ? dn("reviewed") : Yt === "reviewed" && dn("published");
  }
  return /* @__PURE__ */ R.jsxs("section", { className: "kobun-app", "aria-label": "古典籍の実験ワークスペース", children: [
    /* @__PURE__ */ R.jsxs("div", { className: "kobun-heading", children: [
      /* @__PURE__ */ R.jsxs("div", { className: "kobun-material-picker", children: [
        /* @__PURE__ */ R.jsx("label", { htmlFor: "kobun-material", children: "対象資料" }),
        /* @__PURE__ */ R.jsxs("select", { id: "kobun-material", value: xt || "", disabled: _e || !zi.length, onChange: (O) => O.target.value && void Zt(1, O.target.value), children: [
          /* @__PURE__ */ R.jsx("option", { value: "", children: "保存済み資料から選択" }),
          !!xt && !zi.some((O) => O.id === xt) && /* @__PURE__ */ R.jsx("option", { value: xt, children: r || w?.source.item_title }),
          zi.map((O) => /* @__PURE__ */ R.jsxs("option", { value: O.id, children: [
            O.title,
            " — ",
            O.identifier || "識別子なし",
            "（",
            O.count,
            "ページ作業済み）"
          ] }, O.id))
        ] })
      ] }),
      /* @__PURE__ */ R.jsxs("div", { className: "kobun-utilities", children: [
        /* @__PURE__ */ R.jsx("span", { className: "kobun-muted", children: Ne ? "管理者 · 全工程を操作可能" : ji ? `翻刻修正者 · ${Xm === "all" ? "閲覧可能な全資料" : "自分が所有する資料"}のみ` : "閲覧のみ" }),
        /* @__PURE__ */ R.jsx("span", { className: "kobun-muted", children: He ? `OCR ${He.ocr_ready ? "準備済み" : "未準備"} · 現代語訳 ${He.llm_ready ? "準備済み" : "未準備"}${He.llm_ready && pd && He.llm_model_id && He.llm_model_id !== pd ? "（設定と実行モデルが不一致）" : ""}` : "接続を確認中" }),
        w && /* @__PURE__ */ R.jsx("span", { className: `kobun-publication is-${w.publication_state || "draft"}`, children: vd[w.publication_state || "draft"] })
      ] })
    ] }),
    /* @__PURE__ */ R.jsx("ol", { className: "kobun-steps", "aria-label": "作業の手順", children: Fl.map((O, F) => /* @__PURE__ */ R.jsx("li", { children: /* @__PURE__ */ R.jsxs("button", { "aria-current": N === O.id ? "step" : void 0, disabled: _e || F === 1 && !w || F > 1 && !ui, onClick: () => Za(O.id), children: [
      /* @__PURE__ */ R.jsx("span", { children: F + 1 }),
      O.title
    ] }) }, O.id)) }),
    /* @__PURE__ */ R.jsx("div", { className: "kobun-record-toggle", children: /* @__PURE__ */ R.jsx(
      "button",
      {
        className: "kobun-link kobun-disclosure",
        "aria-expanded": _,
        "aria-controls": "kobun-work-history",
        disabled: !w || _e,
        onClick: () => {
          Ql();
        },
        children: "作業履歴"
      }
    ) }),
    ge && /* @__PURE__ */ R.jsxs("div", { role: "alert", className: "kobun-error", children: [
      ge,
      /* @__PURE__ */ R.jsx("button", { onClick: () => ze(""), "aria-label": "メッセージを閉じる", children: "×" })
    ] }),
    _ && w && /* @__PURE__ */ R.jsxs("div", { className: "kobun-record", id: "kobun-work-history", children: [
      /* @__PURE__ */ R.jsx("h3", { children: "作業履歴" }),
      /* @__PURE__ */ R.jsx("div", { className: "kobun-tools", children: /* @__PURE__ */ R.jsx("button", { disabled: _e || yt, onClick: os, children: "記録を保存 (.json)" }) }),
      k === null ? /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "履歴を読み込んでいます…" }) : k.length ? /* @__PURE__ */ R.jsx("ol", { id: "kobun-history-list", children: k.map((O) => /* @__PURE__ */ R.jsxs("li", { children: [
        "版 ",
        O.document.revision,
        " · ",
        yu[O.event] || O.event,
        " · ",
        new Date(O.recorded_at * 1e3).toLocaleString("ja-JP"),
        O.actor ? ` · ${O.actor.name} (${O.actor.role})` : ""
      ] }, O.document.revision)) }) : /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "過去の版はありません。" }),
      /* @__PURE__ */ R.jsxs("details", { children: [
        /* @__PURE__ */ R.jsx("summary", { children: "画像・処理条件" }),
        /* @__PURE__ */ R.jsx("pre", { children: JSON.stringify({ source: w.source, image_sha256: w.image_sha256, metrics: w.last_metrics }, null, 2) })
      ] })
    ] }),
    /* @__PURE__ */ R.jsxs("div", { className: "kobun-stage-description", children: [
      /* @__PURE__ */ R.jsx("b", { children: Fl[ra].title }),
      /* @__PURE__ */ R.jsx("span", { children: Fl[ra].description })
    ] }),
    N === "source" && (Ne ? /* @__PURE__ */ R.jsxs("form", { className: "kobun-source", onSubmit: (O) => {
      O.preventDefault(), ua || Zt();
    }, children: [
      /* @__PURE__ */ R.jsx("label", { htmlFor: "kobun-identifier", children: "別の資料を指定" }),
      /* @__PURE__ */ R.jsx("input", { id: "kobun-identifier", value: K, disabled: _e, placeholder: "dcterms:identifier または公開URL", onChange: (O) => a(O.target.value) }),
      /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "保存済み資料は上の「対象資料」から選べます。新しく取り込む資料は識別子、または Clean Url の公開URLで開きます。" })
    ] }) : /* @__PURE__ */ R.jsxs("div", { className: "kobun-source", children: [
      /* @__PURE__ */ R.jsx("p", { children: "上の「対象資料」から作業する資料を選んでください。" }),
      /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "権限範囲内で、保存済みの作業がある資料だけを表示しています。" })
    ] })),
    /* @__PURE__ */ R.jsxs("div", { className: "kobun-layout", children: [
      /* @__PURE__ */ R.jsxs("aside", { className: "kobun-pages", "aria-label": "画像ページ一覧", children: [
        /* @__PURE__ */ R.jsxs("div", { className: "kobun-page-context", children: [
          /* @__PURE__ */ R.jsx("span", { children: "選択中の資料" }),
          /* @__PURE__ */ R.jsx("strong", { children: r || "未選択" }),
          l && /* @__PURE__ */ R.jsx("small", { children: l })
        ] }),
        /* @__PURE__ */ R.jsxs("h3", { children: [
          "画像ページ ",
          m ? `(${m})` : ""
        ] }),
        !d.length && /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "対象資料を選ぶと、その資料の画像だけがここに並びます。" }),
        d.map((O) => {
          const F = b.some((pe) => pe.source.media_id === O.media_id);
          return /* @__PURE__ */ R.jsxs(
            "button",
            {
              className: w?.source.media_id === O.media_id ? "is-selected" : "",
              disabled: _e || !Ne && !F,
              title: !Ne && !F ? "管理者がまだ作業を作成していない画像です" : void 0,
              onClick: () => ss(O),
              children: [
                /* @__PURE__ */ R.jsx("b", { children: O.position }),
                /* @__PURE__ */ R.jsxs("span", { children: [
                  /* @__PURE__ */ R.jsx("strong", { children: O.title }),
                  /* @__PURE__ */ R.jsx("small", { children: F ? "作業済み" : "未着手" })
                ] })
              ]
            },
            O.media_id
          );
        }),
        m > 100 && /* @__PURE__ */ R.jsxs("div", { className: "kobun-tools", children: [
          /* @__PURE__ */ R.jsx("button", { disabled: c <= 1 || _e, onClick: () => Zt(c - 1), children: "前" }),
          /* @__PURE__ */ R.jsx("span", { children: c }),
          /* @__PURE__ */ R.jsx("button", { disabled: c * 100 >= m || _e, onClick: () => Zt(c + 1), children: "次" })
        ] })
      ] }),
      /* @__PURE__ */ R.jsxs("div", { className: "kobun-editor", children: [
        /* @__PURE__ */ R.jsxs("div", { className: "kobun-tools kobun-image-tools", children: [
          /* @__PURE__ */ R.jsxs("label", { children: [
            /* @__PURE__ */ R.jsx("input", { type: "checkbox", checked: Be, onChange: (O) => Fe(O.target.checked) }),
            "行の枠を表示"
          ] }),
          N === "layout" && /* @__PURE__ */ R.jsxs("label", { className: "kobun-reading-direction", children: [
            "読み方向",
            /* @__PURE__ */ R.jsxs(
              "select",
              {
                "aria-label": "読み方向",
                value: de,
                disabled: !w || _e || !Ne,
                onChange: (O) => Xl(O.target.value),
                children: [
                  /* @__PURE__ */ R.jsx("option", { value: "auto", children: "自動（縦: 右→左／横: 左→右）" }),
                  /* @__PURE__ */ R.jsx("option", { value: "ltr", children: "左から右" }),
                  /* @__PURE__ */ R.jsx("option", { value: "rtl", children: "右から左" })
                ]
              }
            )
          ] }),
          N === "layout" && Ne && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
            /* @__PURE__ */ R.jsx("button", { disabled: !w || _e, "aria-pressed": I, onClick: () => {
              J(!I), Ce(null);
            }, children: "枠を描く" }),
            I && /* @__PURE__ */ R.jsx("button", { disabled: !ce || _e, onClick: Xt, children: "描いた範囲を追加" })
          ] })
        ] }),
        /* @__PURE__ */ R.jsx("div", { className: "kobun-viewer viewer-wrap", children: w ? /* @__PURE__ */ R.jsx(
          Zm,
          {
            ref: Gn,
            dataUrl: Td(`documents/${w.id}/image`),
            lines: ie,
            regions: w.regions,
            showOverlays: Be,
            selectedOrder: _e ? null : Te,
            editable: N === "layout" && Ne && !_e,
            onSelectLine: _e ? () => {
            } : Ce,
            onUpdateLine: sa,
            onDeleteLine: un,
            regionMode: !_e && N === "layout" && I,
            selectedRegion: ce,
            onRegionDraw: Ee
          }
        ) : /* @__PURE__ */ R.jsxs("div", { className: "kobun-empty", children: [
          /* @__PURE__ */ R.jsx("b", { children: d.length ? "画像ページを選択してください" : "資料の画像を見ながら作業します" }),
          /* @__PURE__ */ R.jsx("p", { children: d.length ? "左の一覧から、作業する画像を開きます。" : Ne ? "資料の識別子を入力するか、上の対象資料から選んでください。" : "上の対象資料から選んでください。" })
        ] }) }),
        (N === "layout" && Ne || N === "transcription" && ji) && /* @__PURE__ */ R.jsxs("div", { className: "kobun-tools kobun-image-tools", children: [
          /* @__PURE__ */ R.jsx("button", { disabled: !ve.length || _e, onClick: qa, children: "元に戻す" }),
          /* @__PURE__ */ R.jsx("button", { disabled: !Ke.length || _e, onClick: Zl, children: "やり直す" }),
          N === "layout" && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
            /* @__PURE__ */ R.jsx("span", { className: "kobun-order-label", children: "読み順" }),
            /* @__PURE__ */ R.jsx(
              "button",
              {
                className: "kobun-order-arrow",
                "aria-label": `選択行を後ろへ（${Ai}キー）`,
                title: `読み順を後ろへ（${Ai}キー）`,
                disabled: Te === null || _e,
                onClick: () => ti(1),
                children: Ai
              }
            ),
            /* @__PURE__ */ R.jsx(
              "button",
              {
                className: "kobun-order-arrow",
                "aria-label": `選択行を前へ（${Ti}キー）`,
                title: `読み順を前へ（${Ti}キー）`,
                disabled: Te === null || _e,
                onClick: () => ti(-1),
                children: Ti
              }
            ),
            /* @__PURE__ */ R.jsx("button", { disabled: Te === null || _e, onClick: () => Te !== null && un(Te), children: "行を削除" })
          ] })
        ] }),
        /* @__PURE__ */ R.jsx("p", { className: "kobun-caption", children: w ? `${w.width} × ${w.height} px · ${ie.length}行${ie.length ? ` · ${pu(ei)} · 読み方向 ${vu(de, ei)}` : ""} · 版 ${w.revision}` : "ホイールで拡大・縮小、ドラッグで画像を移動できます。" })
      ] }),
      /* @__PURE__ */ R.jsxs("div", { className: "kobun-results", children: [
        N === "source" && /* @__PURE__ */ R.jsxs("div", { className: "kobun-guide", children: [
          /* @__PURE__ */ R.jsx("h3", { children: "一つのページを、順に確認" }),
          /* @__PURE__ */ R.jsx("p", { children: "画像の行を整え、翻刻を確かめ、その本文から現代語訳を作ります。" }),
          /* @__PURE__ */ R.jsx("p", { children: "次の操作は、画面下の緑色のボタンに表示されます。" }),
          /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "保存済みのページは、前回の作業から再開できます。" })
        ] }),
        (N === "layout" || N === "transcription") && !!ie.length && ji && /* @__PURE__ */ R.jsxs("div", { className: "kobun-transcription-actions", children: [
          /* @__PURE__ */ R.jsxs("details", { className: "kobun-import", children: [
            /* @__PURE__ */ R.jsx("summary", { children: "翻刻済みテキストを取り込む" }),
            /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "Wordの丁付ごとの本文、または1行を画像の1行に対応させたテキストを取り込めます。複数の丁付は文書内の順につないで反映します。" }),
            /* @__PURE__ */ R.jsxs("label", { className: "kobun-import-file", children: [
              "Word／テキストファイル",
              /* @__PURE__ */ R.jsx(
                "input",
                {
                  type: "file",
                  accept: ".docx,.txt,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  disabled: _e,
                  onChange: (O) => {
                    const F = O.currentTarget.files?.[0];
                    O.currentTarget.value = "", F && Yl(F);
                  }
                }
              )
            ] }),
            ka && /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: ka }),
            !!kt.length && /* @__PURE__ */ R.jsxs("fieldset", { className: "kobun-import-sections", children: [
              /* @__PURE__ */ R.jsx("legend", { children: "取り込むページ（複数選択できます）" }),
              kt.map((O, F) => /* @__PURE__ */ R.jsxs("label", { children: [
                /* @__PURE__ */ R.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: Ri.includes(F),
                    disabled: _e,
                    onChange: (pe) => Ya(F, pe.target.checked)
                  }
                ),
                /* @__PURE__ */ R.jsx("span", { children: O.label }),
                /* @__PURE__ */ R.jsxs("small", { children: [
                  O.lines.length,
                  "行"
                ] })
              ] }, `${O.label}-${F}`))
            ] }),
            !!Fa.length && /* @__PURE__ */ R.jsxs("p", { className: "kobun-muted", children: [
              "解析: ",
              Fa.join("／")
            ] }),
            !!ki.length && /* @__PURE__ */ R.jsxs("details", { children: [
              /* @__PURE__ */ R.jsxs("summary", { children: [
                "検出した凡例（",
                ki.length,
                "項目）"
              ] }),
              /* @__PURE__ */ R.jsx("ul", { children: ki.map((O, F) => /* @__PURE__ */ R.jsx("li", { children: O }, F)) })
            ] }),
            /* @__PURE__ */ R.jsx("label", { htmlFor: "kobun-import-text", children: "取込内容（1行＝画像の1行）" }),
            /* @__PURE__ */ R.jsx(
              "textarea",
              {
                id: "kobun-import-text",
                value: rn,
                disabled: _e,
                placeholder: "ここへ翻刻済みテキストを貼り付けることもできます。",
                onChange: (O) => Fn(O.target.value)
              }
            ),
            /* @__PURE__ */ R.jsxs("p", { className: Gl(rn).length === ie.length ? "kobun-import-count is-matched" : "kobun-import-count", children: [
              !!kt.length && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
                "選択 ",
                Ri.length,
                "ページ · "
              ] }),
              "取込 ",
              Gl(rn).length,
              "行 ／ レイアウト ",
              ie.length,
              "行"
            ] }),
            /* @__PURE__ */ R.jsx(
              "button",
              {
                className: "kobun-primary",
                disabled: _e || Gl(rn).length !== ie.length,
                onClick: () => {
                  Ia();
                },
                children: "選択したページを取り込む"
              }
            )
          ] }),
          N === "transcription" && /* @__PURE__ */ R.jsx("button", { className: "kobun-link", disabled: !ui, onClick: () => Tu(`${w.id}-transcription.txt`, ie.map((O) => O.raw || "").join(`
`)), children: "翻刻をダウンロード" })
        ] }),
        N === "layout" && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
          /* @__PURE__ */ R.jsx("h3", { children: "行の枠と読み順" }),
          /* @__PURE__ */ R.jsxs("p", { className: "kobun-muted", children: [
            "行を選ぶと画像上の枠を調整できます。番号の順に文字を読み取ります。",
            ie.length && Ne ? `${Ti}・${Ai}キー、または画像下の矢印で順番を入れ替えられます。` : ""
          ] }),
          !ie.length && /* @__PURE__ */ R.jsx("p", { children: "下の「レイアウトを認識」から始めます。" }),
          /* @__PURE__ */ R.jsxs("p", { className: "kobun-direction", "aria-live": "polite", children: [
            pu(ei),
            " · ",
            vu(de, ei)
          ] }),
          /* @__PURE__ */ R.jsx("ol", { className: `kobun-order is-${ei} reading-${Di}`, children: ie.map((O) => /* @__PURE__ */ R.jsx("li", { "data-line-id": O.id, className: `is-${kl(O)}`, children: /* @__PURE__ */ R.jsxs("button", { className: Te === O.readingOrder ? "is-selected" : "", onClick: () => {
            Ce(O.readingOrder), Gn.current?.scrollToLine(O.readingOrder);
          }, children: [
            /* @__PURE__ */ R.jsx("b", { children: O.readingOrder }),
            /* @__PURE__ */ R.jsx("span", { children: O.raw || `${Math.round(O.width)} × ${Math.round(O.height)} px` })
          ] }) }, O.id)) }),
          Wl && /* @__PURE__ */ R.jsxs("p", { className: "kobun-muted", children: [
            "行 ",
            Wl.readingOrder,
            " を選択中"
          ] }),
          !!ie.length && Ne && /* @__PURE__ */ R.jsxs("details", { children: [
            /* @__PURE__ */ R.jsx("summary", { children: "レイアウトをやり直す" }),
            /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "現在の枠と翻刻を置き換えます。保存済みの版は履歴に残ります。" }),
            /* @__PURE__ */ R.jsx("button", { disabled: _e || !He?.ocr_ready, onClick: () => cn("layout"), children: "レイアウトを再認識" })
          ] })
        ] }),
        N === "transcription" && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
          /* @__PURE__ */ R.jsx("h3", { children: "画像と翻刻を照合" }),
          /* @__PURE__ */ R.jsxs("p", { className: "kobun-muted", children: [
            "番号を押すと該当する行へ移動します。",
            ji ? "保存済みの翻刻も修正できます。" : "このアカウントは閲覧のみです。"
          ] }),
          ji && w?.translation && /* @__PURE__ */ R.jsx("p", { className: "kobun-notice", children: "翻刻を修正すると、現在の翻訳用本文と現代語訳は履歴に残したうえで解除されます。" }),
          !!ie.length && /* @__PURE__ */ R.jsxs("p", { className: "kobun-direction", "aria-live": "polite", children: [
            pu(ei),
            " · ",
            vu(de, ei)
          ] }),
          /* @__PURE__ */ R.jsx("ol", { className: `kobun-lines is-${ei} reading-${Di}`, children: ie.map((O) => /* @__PURE__ */ R.jsxs("li", { className: `${Te === O.readingOrder ? "is-selected " : ""}is-${kl(O)}`, children: [
            /* @__PURE__ */ R.jsx("button", { onClick: () => {
              Ce(O.readingOrder), Gn.current?.scrollToLine(O.readingOrder);
            }, children: O.readingOrder }),
            /* @__PURE__ */ R.jsx("textarea", { className: `is-${kl(O)}`, "aria-label": `行 ${O.readingOrder} の翻刻`, value: O.raw ?? "", disabled: _e || !ji, onChange: (F) => Bi(ie.map((pe) => pe.id === O.id ? { ...pe, raw: F.target.value } : pe)) })
          ] }, O.id)) })
        ] }),
        N === "translation" && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
          Ne && /* @__PURE__ */ R.jsx(Wm, {}),
          /* @__PURE__ */ R.jsxs("div", { className: "kobun-tabs", role: "tablist", "aria-label": "翻訳の表示", children: [
            /* @__PURE__ */ R.jsx("button", { id: "kobun-input-tab", role: "tab", "aria-selected": he === "input", "aria-controls": "kobun-input-panel", onClick: () => q("input"), children: "翻訳する本文" }),
            /* @__PURE__ */ R.jsx(
              "button",
              {
                id: "kobun-result-tab",
                role: "tab",
                "aria-selected": he === "result",
                "aria-controls": "kobun-result-panel",
                disabled: !Ne && !mt && !ja(w),
                onClick: () => {
                  q("result"), !mt && Ne && !W && oa();
                },
                children: "現代語訳"
              }
            )
          ] }),
          he === "input" ? /* @__PURE__ */ R.jsxs("div", { id: "kobun-input-panel", role: "tabpanel", "aria-labelledby": "kobun-input-tab", children: [
            /* @__PURE__ */ R.jsx("h3", { children: "翻訳する範囲" }),
            /* @__PURE__ */ R.jsxs("div", { className: "kobun-range", children: [
              /* @__PURE__ */ R.jsxs("label", { children: [
                "開始行",
                /* @__PURE__ */ R.jsx("select", { "aria-label": "翻訳の開始行", value: lt, disabled: _e || !Ne, onChange: (O) => Xa(Number(O.target.value), re), children: ie.map((O) => /* @__PURE__ */ R.jsx("option", { value: O.readingOrder, children: O.readingOrder }, O.id)) })
              ] }),
              /* @__PURE__ */ R.jsx("span", { children: "〜" }),
              /* @__PURE__ */ R.jsxs("label", { children: [
                "終了行",
                /* @__PURE__ */ R.jsx("select", { "aria-label": "翻訳の終了行", value: re, disabled: _e || !Ne, onChange: (O) => Xa(lt, Number(O.target.value)), children: ie.map((O) => /* @__PURE__ */ R.jsx("option", { value: O.readingOrder, children: O.readingOrder }, O.id)) })
              ] })
            ] }),
            /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "文や段落が途中で切れない範囲を選びます。画像上の改行はつなげています。見出しや注記は必要に応じて除いてください。" }),
            /* @__PURE__ */ R.jsx("label", { htmlFor: "kobun-translation-input", children: "翻訳用本文" }),
            /* @__PURE__ */ R.jsx("textarea", { id: "kobun-translation-input", value: xe, disabled: _e || !Ne, onChange: (O) => {
              Ve(O.target.value), tt(!0);
            } }),
            /* @__PURE__ */ R.jsxs("p", { className: "kobun-muted", children: [
              xe.length,
              "文字 · ここでの編集は翻刻には反映されません。現代語訳は実験的な補助機能です。"
            ] }),
            /* @__PURE__ */ R.jsxs("div", { className: "kobun-result-actions", children: [
              /* @__PURE__ */ R.jsx("button", { className: "kobun-link", disabled: _e || !Ne, onClick: () => Xa(lt, re), children: "選択した翻刻から作り直す" }),
              Ne && /* @__PURE__ */ R.jsx("button", { className: "kobun-link", disabled: _e, onClick: oa, children: mt ? "保存済みの現代語訳を修正" : "現代語訳を手入力" })
            ] })
          ] }) : /* @__PURE__ */ R.jsx("div", { id: "kobun-result-panel", role: "tabpanel", "aria-labelledby": "kobun-result-tab", children: Me ? /* @__PURE__ */ R.jsxs("div", { role: "status", children: [
            /* @__PURE__ */ R.jsx("p", { children: "商用LLMで訳文を生成しています…" }),
            /* @__PURE__ */ R.jsx("button", { onClick: () => y.current?.abort(), children: "生成を中止" })
          ] }) : ja(w) ? /* @__PURE__ */ R.jsx("p", { role: "status", children: "訳文を生成しています…" }) : W ? /* @__PURE__ */ R.jsxs("div", { className: "kobun-manual-translation", children: [
            fe && /* @__PURE__ */ R.jsxs("p", { className: "kobun-notice", children: [
              "商用LLMによる機械生成・未確認の訳です。確認して保存してください。使用モデル: ",
              fe.model,
              " · ",
              uu[fe.provider]
            ] }),
            /* @__PURE__ */ R.jsx("label", { htmlFor: "kobun-manual-translation", children: "現代語訳" }),
            /* @__PURE__ */ R.jsx(
              "textarea",
              {
                id: "kobun-manual-translation",
                value: wt,
                disabled: _e || !Ne,
                maxLength: 32e3,
                placeholder: "管理者が確認した現代語訳を入力してください。",
                onChange: (O) => {
                  p(O.target.value), L(!0);
                }
              }
            ),
            /* @__PURE__ */ R.jsxs("p", { className: "kobun-muted", children: [
              wt.length,
              "文字 · ",
              fe ? "商用LLMの訳として、モデル・取込者・版履歴を記録します。" : "管理者による入力として、入力者と版履歴を記録します。"
            ] }),
            /* @__PURE__ */ R.jsx("div", { className: "kobun-result-actions", children: /* @__PURE__ */ R.jsx("button", { disabled: _e, onClick: Il, children: "入力をキャンセル" }) })
          ] }) : mt ? /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
            /* @__PURE__ */ R.jsx("p", { className: "kobun-notice", children: mt.method === "manual" ? "管理者が入力した訳文です。" : "機械が生成した訳です。原文と照合して確認してください。" }),
            mt.review_warnings?.map((O) => /* @__PURE__ */ R.jsx("p", { className: "kobun-notice", children: O }, O)),
            /* @__PURE__ */ R.jsx("div", { className: "kobun-translation", children: mt.text }),
            /* @__PURE__ */ R.jsxs("p", { className: "kobun-muted", children: [
              mt.method === "manual" ? "管理者による入力" : mt.model,
              mt.provider ? ` · ${uu[mt.provider]}` : "",
              mt.human_edited ? " · 管理者による修正あり" : "",
              " · 行 ",
              lt,
              "〜",
              re
            ] }),
            !!mt.uncertainties?.length && /* @__PURE__ */ R.jsxs("div", { className: "kobun-uncertainties", children: [
              /* @__PURE__ */ R.jsx("h3", { children: "原文と照合する箇所" }),
              /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "読みの候補は機械による推定です。翻刻・翻訳用本文には自動反映しません。" }),
              /* @__PURE__ */ R.jsx("ul", { children: mt.uncertainties.map((O, F) => /* @__PURE__ */ R.jsxs("li", { children: [
                /* @__PURE__ */ R.jsx("q", { children: O.source }),
                /* @__PURE__ */ R.jsx("p", { children: O.reason }),
                O.reading && /* @__PURE__ */ R.jsxs("p", { children: [
                  "読みの候補：",
                  O.reading
                ] })
              ] }, F)) })
            ] }),
            /* @__PURE__ */ R.jsxs("details", { children: [
              /* @__PURE__ */ R.jsx("summary", { children: "この訳に使った本文" }),
              /* @__PURE__ */ R.jsx("p", { className: "kobun-prewrap", children: mt.input })
            ] }),
            /* @__PURE__ */ R.jsxs("div", { className: "kobun-result-actions", children: [
              /* @__PURE__ */ R.jsx("button", { className: "kobun-link", disabled: _e, onClick: () => Tu(`${w.id}-translation.txt`, mt.text), children: "訳文をダウンロード" }),
              Ne && /* @__PURE__ */ R.jsx("button", { className: "kobun-link", disabled: _e, onClick: oa, children: "この現代語訳を修正" }),
              Ne && /* @__PURE__ */ R.jsx("button", { className: "kobun-danger", disabled: _e, onClick: () => {
                hn();
              }, children: "この現代語訳を削除" })
            ] })
          ] }) : /* @__PURE__ */ R.jsx("p", { children: "翻訳する本文を確認してください。" }) })
        ] }),
        N === "publication" && w && /* @__PURE__ */ R.jsxs("section", { className: "kobun-publication-panel", children: [
          /* @__PURE__ */ R.jsxs("div", { className: "kobun-publication-summary", children: [
            /* @__PURE__ */ R.jsx("h3", { children: "公開状態" }),
            /* @__PURE__ */ R.jsx("p", { children: /* @__PURE__ */ R.jsx("span", { className: `kobun-publication is-${Yt}`, children: vd[Yt] }) }),
            /* @__PURE__ */ R.jsxs("dl", { children: [
              /* @__PURE__ */ R.jsx("dt", { children: "翻刻" }),
              /* @__PURE__ */ R.jsx("dd", { children: ui ? `${ie.length}行` : "未完成" }),
              /* @__PURE__ */ R.jsx("dt", { children: "現代語訳" }),
              /* @__PURE__ */ R.jsx("dd", { children: w.translation ? "あり" : "なし（翻刻だけでも公開できます）" })
            ] }),
            /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "公開中のデータだけが資料ページで機械生成結果より優先して表示されます。翻刻や訳文を変更すると下書きへ戻ります。" })
          ] }),
          /* @__PURE__ */ R.jsxs("label", { className: "kobun-required-field", children: [
            /* @__PURE__ */ R.jsxs("span", { className: "kobun-field-label", children: [
              "翻刻責任者 ",
              /* @__PURE__ */ R.jsx("b", { children: "必須" })
            ] }),
            /* @__PURE__ */ R.jsx(
              "input",
              {
                type: "text",
                value: De,
                disabled: !Ne || _e,
                maxLength: 500,
                placeholder: "氏名、担当グループ名など",
                onChange: (O) => zt(O.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "公開中の翻刻とともに、責任表示として公開ページへ表示します。" }),
          !De.trim() && Ne && /* @__PURE__ */ R.jsx("p", { className: "kobun-notice", children: "確認済みにするには、翻刻責任者を入力してください。" }),
          /* @__PURE__ */ R.jsxs(
            "details",
            {
              className: "kobun-attribution-disclosure",
              open: Gi,
              onToggle: (O) => bi(O.currentTarget.open),
              children: [
                /* @__PURE__ */ R.jsxs("summary", { children: [
                  "研究成果・権利情報（",
                  ci ? `${ci}項目入力済み` : "未入力",
                  "）"
                ] }),
                /* @__PURE__ */ R.jsxs("fieldset", { className: "kobun-attribution-editor", disabled: !Ne || _e, children: [
                  /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "作成者を研究成果として識別・引用できる情報と、利用条件を記録します。Word取込で検出した値は候補として自動入力されます。" }),
                  /* @__PURE__ */ R.jsxs("label", { className: "is-wide", children: [
                    "成果名",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.title || "",
                        maxLength: 500,
                        onChange: (O) => it((F) => ({ ...F, title: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { className: "is-wide", children: [
                    "作成者（1名につき1行）",
                    /* @__PURE__ */ R.jsx(
                      "textarea",
                      {
                        value: je.contributors || "",
                        maxLength: 2e3,
                        onChange: (O) => it((F) => ({ ...F, contributors: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { className: "is-wide", children: [
                    "作成者識別子（ORCID・researchmap等、対応する順に1名につき1行）",
                    /* @__PURE__ */ R.jsx(
                      "textarea",
                      {
                        value: je.contributor_identifiers || "",
                        maxLength: 2e3,
                        onChange: (O) => it((F) => ({ ...F, contributor_identifiers: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "所属",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.affiliation || "",
                        maxLength: 1e3,
                        onChange: (O) => it((F) => ({ ...F, affiliation: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "役割・分担",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.contribution_note || "",
                        maxLength: 2e3,
                        placeholder: "翻刻、校訂、資料調査など",
                        onChange: (O) => it((F) => ({ ...F, contribution_note: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "掲載誌",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.journal_title || "",
                        maxLength: 500,
                        onChange: (O) => it((F) => ({ ...F, journal_title: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "巻号",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.journal_issue || "",
                        maxLength: 200,
                        placeholder: "第30号",
                        onChange: (O) => it((F) => ({ ...F, journal_issue: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "雑誌識別子",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.journal_identifiers || "",
                        maxLength: 500,
                        placeholder: "ISSN 0000-0000／NCID AAXXXXXXXX",
                        onChange: (O) => it((F) => ({ ...F, journal_identifiers: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "刊行年",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.publication_year || "",
                        maxLength: 20,
                        inputMode: "numeric",
                        onChange: (O) => it((F) => ({ ...F, publication_year: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "発行日",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        type: "date",
                        value: je.publication_date || "",
                        maxLength: 30,
                        onChange: (O) => it((F) => ({ ...F, publication_date: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "掲載ページ",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.publication_pages || "",
                        maxLength: 100,
                        placeholder: "1–26",
                        onChange: (O) => it((F) => ({ ...F, publication_pages: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { className: "is-wide", children: [
                    "発行主体",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.publisher || "",
                        maxLength: 500,
                        onChange: (O) => it((F) => ({ ...F, publisher: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "DOI／恒久識別子",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.doi || "",
                        maxLength: 300,
                        onChange: (O) => it((F) => ({ ...F, doi: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "掲載先URL",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        type: "url",
                        value: je.publication_url || "",
                        maxLength: 2e3,
                        placeholder: "https://…",
                        onChange: (O) => it((F) => ({ ...F, publication_url: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "権利状態",
                    /* @__PURE__ */ R.jsxs(
                      "select",
                      {
                        value: je.rights_status || "",
                        onChange: (O) => it((F) => ({ ...F, rights_status: O.target.value })),
                        children: [
                          /* @__PURE__ */ R.jsx("option", { value: "", children: "未設定" }),
                          /* @__PURE__ */ R.jsx("option", { value: "copyrighted", children: "著作権あり" }),
                          /* @__PURE__ */ R.jsx("option", { value: "not_asserted", children: "翻刻本文について著作権を主張しない" }),
                          /* @__PURE__ */ R.jsx("option", { value: "undetermined", children: "権利状態を確認中" }),
                          /* @__PURE__ */ R.jsx("option", { value: "other", children: "その他・個別条件" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "権利者",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.rights_holder || "",
                        maxLength: 500,
                        onChange: (O) => it((F) => ({ ...F, rights_holder: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { className: "is-wide", children: [
                    "権利に関する説明",
                    /* @__PURE__ */ R.jsx(
                      "textarea",
                      {
                        value: je.rights_statement || "",
                        maxLength: 2e3,
                        placeholder: "翻刻本文、校訂、注釈など、権利表示の対象を明記してください。",
                        onChange: (O) => it((F) => ({ ...F, rights_statement: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "利用条件・ライセンス",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        value: je.license_label || "",
                        maxLength: 300,
                        placeholder: "CC BY 4.0 など",
                        onChange: (O) => it((F) => ({ ...F, license_label: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { children: [
                    "ライセンスURL",
                    /* @__PURE__ */ R.jsx(
                      "input",
                      {
                        type: "url",
                        value: je.license_url || "",
                        maxLength: 2e3,
                        placeholder: "https://…",
                        onChange: (O) => it((F) => ({ ...F, license_url: O.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ R.jsxs("label", { className: "is-wide", children: [
                    "推奨引用表記",
                    /* @__PURE__ */ R.jsx(
                      "textarea",
                      {
                        value: je.citation || "",
                        maxLength: 3e3,
                        onChange: (O) => it((F) => ({ ...F, citation: O.target.value }))
                      }
                    )
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ R.jsxs("label", { className: "kobun-review-note", children: [
            "確認メモ",
            /* @__PURE__ */ R.jsx(
              "textarea",
              {
                value: me,
                disabled: !Ne || _e,
                maxLength: 2e3,
                placeholder: "画像との照合範囲、未確認箇所、判断事項など",
                onChange: (O) => Ue(O.target.value)
              }
            )
          ] }),
          !Ne && /* @__PURE__ */ R.jsx("p", { className: "kobun-muted", children: "このアカウントでは公開状態を変更できません。" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ R.jsxs("div", { className: "kobun-actionbar", children: [
      /* @__PURE__ */ R.jsx("div", { className: "kobun-action-status", role: "status", children: Me ? /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
        /* @__PURE__ */ R.jsx("span", { className: "kobun-spinner" }),
        "商用LLMで現代語訳を生成中"
      ] }) : ja(w) ? /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
        /* @__PURE__ */ R.jsx("span", { className: "kobun-spinner" }),
        yu[w.job.operation],
        " · ",
        yu[w.job.status]
      ] }) : yt ? "未保存の変更があります" : w ? "変更は保存されています" : "資料を開いて開始" }),
      /* @__PURE__ */ R.jsxs("div", { className: "kobun-tools", children: [
        ra > 0 && /* @__PURE__ */ R.jsx("button", { disabled: _e, onClick: () => Za(Fl[ra - 1].id), children: "戻る" }),
        w && /* @__PURE__ */ R.jsx("button", { disabled: _e || !yt || ke && N === "transcription" && !ji || ke && N !== "transcription" && !Ne || Ye && !Ne || Ye && !xe.trim(), onClick: () => Bt(async () => {
          await Vi();
        }), children: N === "publication" ? "入力内容を保存" : "途中保存" }),
        N === "translation" && Ne && !W && !(he === "result" && mt) && /* @__PURE__ */ R.jsx(
          "button",
          {
            disabled: _e || E || Ye && !xe.trim(),
            onClick: () => {
              Qa();
            },
            children: mt ? "確認・公開へ" : "現代語訳を作らず確認・公開へ"
          }
        ),
        N === "publication" && Yt === "reviewed" && /* @__PURE__ */ R.jsx("button", { disabled: _e || sn, onClick: () => {
          dn("draft");
        }, children: "下書きへ戻す" }),
        N === "publication" && Yt === "published" && /* @__PURE__ */ R.jsx("button", { disabled: _e || sn, onClick: () => {
          dn("reviewed");
        }, children: "公開を取り下げる" }),
        /* @__PURE__ */ R.jsx("button", { className: "kobun-primary", disabled: ua, onClick: gn, children: Wa })
      ] })
    ] }),
    /* @__PURE__ */ R.jsxs("div", { className: "kobun-credit", children: [
      "レイアウト編集UI: ",
      /* @__PURE__ */ R.jsx("a", { href: "https://github.com/yuta1984/honkoku-ocr-web", target: "_blank", rel: "noreferrer", children: "みんなで翻刻OCR" }),
      "（Yuta Hashimoto, 2025）を改変 · ",
      /* @__PURE__ */ R.jsx("a", { href: "https://creativecommons.org/licenses/by/4.0/", target: "_blank", rel: "noreferrer", children: "CC BY 4.0" }),
      " · OCR: NDL古典籍OCR-Lite"
    ] })
  ] });
}
Pm.createRoot(Fi).render(/* @__PURE__ */ R.jsx(Km, {}));
