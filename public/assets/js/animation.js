/*! jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license */
!(function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function (e) {
            if (!e.document)
              throw new Error("jQuery requires a window with a document");
            return t(e);
          })
    : t(e);
})("undefined" != typeof window ? window : this, function (C, e) {
  "use strict";
  var t = [],
    E = C.document,
    r = Object.getPrototypeOf,
    s = t.slice,
    g = t.concat,
    u = t.push,
    i = t.indexOf,
    n = {},
    o = n.toString,
    v = n.hasOwnProperty,
    a = v.toString,
    l = a.call(Object),
    y = {},
    m = function (e) {
      return "function" == typeof e && "number" != typeof e.nodeType;
    },
    x = function (e) {
      return null != e && e === e.window;
    },
    c = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function b(e, t, n) {
    var r,
      i,
      o = (n = n || E).createElement("script");
    if (((o.text = e), t))
      for (r in c)
        (i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
          o.setAttribute(r, i);
    n.head.appendChild(o).parentNode.removeChild(o);
  }
  function w(e) {
    return null == e
      ? e + ""
      : "object" == typeof e || "function" == typeof e
      ? n[o.call(e)] || "object"
      : typeof e;
  }
  var f = "3.4.1",
    k = function (e, t) {
      return new k.fn.init(e, t);
    },
    p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  function d(e) {
    var t = !!e && "length" in e && e.length,
      n = w(e);
    return (
      !m(e) &&
      !x(e) &&
      ("array" === n ||
        0 === t ||
        ("number" == typeof t && 0 < t && t - 1 in e))
    );
  }
  (k.fn = k.prototype =
    {
      jquery: f,
      constructor: k,
      length: 0,
      toArray: function () {
        return s.call(this);
      },
      get: function (e) {
        return null == e
          ? s.call(this)
          : e < 0
          ? this[e + this.length]
          : this[e];
      },
      pushStack: function (e) {
        var t = k.merge(this.constructor(), e);
        return (t.prevObject = this), t;
      },
      each: function (e) {
        return k.each(this, e);
      },
      map: function (n) {
        return this.pushStack(
          k.map(this, function (e, t) {
            return n.call(e, t, e);
          })
        );
      },
      slice: function () {
        return this.pushStack(s.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (e) {
        var t = this.length,
          n = +e + (e < 0 ? t : 0);
        return this.pushStack(0 <= n && n < t ? [this[n]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: u,
      sort: t.sort,
      splice: t.splice,
    }),
    (k.extend = k.fn.extend =
      function () {
        var e,
          t,
          n,
          r,
          i,
          o,
          a = arguments[0] || {},
          s = 1,
          u = arguments.length,
          l = !1;
        for (
          "boolean" == typeof a && ((l = a), (a = arguments[s] || {}), s++),
            "object" == typeof a || m(a) || (a = {}),
            s === u && ((a = this), s--);
          s < u;
          s++
        )
          if (null != (e = arguments[s]))
            for (t in e)
              (r = e[t]),
                "__proto__" !== t &&
                  a !== r &&
                  (l && r && (k.isPlainObject(r) || (i = Array.isArray(r)))
                    ? ((n = a[t]),
                      (o =
                        i && !Array.isArray(n)
                          ? []
                          : i || k.isPlainObject(n)
                          ? n
                          : {}),
                      (i = !1),
                      (a[t] = k.extend(l, o, r)))
                    : void 0 !== r && (a[t] = r));
        return a;
      }),
    k.extend({
      expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (e) {
        throw new Error(e);
      },
      noop: function () {},
      isPlainObject: function (e) {
        var t, n;
        return (
          !(!e || "[object Object]" !== o.call(e)) &&
          (!(t = r(e)) ||
            ("function" ==
              typeof (n = v.call(t, "constructor") && t.constructor) &&
              a.call(n) === l))
        );
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      globalEval: function (e, t) {
        b(e, { nonce: t && t.nonce });
      },
      each: function (e, t) {
        var n,
          r = 0;
        if (d(e)) {
          for (n = e.length; r < n; r++)
            if (!1 === t.call(e[r], r, e[r])) break;
        } else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
        return e;
      },
      trim: function (e) {
        return null == e ? "" : (e + "").replace(p, "");
      },
      makeArray: function (e, t) {
        var n = t || [];
        return (
          null != e &&
            (d(Object(e))
              ? k.merge(n, "string" == typeof e ? [e] : e)
              : u.call(n, e)),
          n
        );
      },
      inArray: function (e, t, n) {
        return null == t ? -1 : i.call(t, e, n);
      },
      merge: function (e, t) {
        for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
        return (e.length = i), e;
      },
      grep: function (e, t, n) {
        for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
          !t(e[i], i) !== a && r.push(e[i]);
        return r;
      },
      map: function (e, t, n) {
        var r,
          i,
          o = 0,
          a = [];
        if (d(e))
          for (r = e.length; o < r; o++)
            null != (i = t(e[o], o, n)) && a.push(i);
        else for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
        return g.apply([], a);
      },
      guid: 1,
      support: y,
    }),
    "function" == typeof Symbol && (k.fn[Symbol.iterator] = t[Symbol.iterator]),
    k.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (e, t) {
        n["[object " + t + "]"] = t.toLowerCase();
      }
    );
  var h = (function (n) {
    var e,
      d,
      b,
      o,
      i,
      h,
      f,
      g,
      w,
      u,
      l,
      T,
      C,
      a,
      E,
      v,
      s,
      c,
      y,
      k = "sizzle" + 1 * new Date(),
      m = n.document,
      S = 0,
      r = 0,
      p = ue(),
      x = ue(),
      N = ue(),
      A = ue(),
      D = function (e, t) {
        return e === t && (l = !0), 0;
      },
      j = {}.hasOwnProperty,
      t = [],
      q = t.pop,
      L = t.push,
      H = t.push,
      O = t.slice,
      P = function (e, t) {
        for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
        return -1;
      },
      R =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      M = "[\\x20\\t\\r\\n\\f]",
      I = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
      W =
        "\\[" +
        M +
        "*(" +
        I +
        ")(?:" +
        M +
        "*([*^$|!~]?=)" +
        M +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        I +
        "))|)" +
        M +
        "*\\]",
      $ =
        ":(" +
        I +
        ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        W +
        ")*)|.*)\\)|)",
      F = new RegExp(M + "+", "g"),
      B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
      _ = new RegExp("^" + M + "*," + M + "*"),
      z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
      U = new RegExp(M + "|>"),
      X = new RegExp($),
      V = new RegExp("^" + I + "$"),
      G = {
        ID: new RegExp("^#(" + I + ")"),
        CLASS: new RegExp("^\\.(" + I + ")"),
        TAG: new RegExp("^(" + I + "|[*])"),
        ATTR: new RegExp("^" + W),
        PSEUDO: new RegExp("^" + $),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            M +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            M +
            "*(?:([+-]|)" +
            M +
            "*(\\d+)|))" +
            M +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + R + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            M +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            M +
            "*((?:-\\d)?\\d*)" +
            M +
            "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      Y = /HTML$/i,
      Q = /^(?:input|select|textarea|button)$/i,
      J = /^h\d$/i,
      K = /^[^{]+\{\s*\[native \w/,
      Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ee = /[+~]/,
      te = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
      ne = function (e, t, n) {
        var r = "0x" + t - 65536;
        return r != r || n
          ? t
          : r < 0
          ? String.fromCharCode(r + 65536)
          : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
      },
      re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
      ie = function (e, t) {
        return t
          ? "\0" === e
            ? "\ufffd"
            : e.slice(0, -1) +
              "\\" +
              e.charCodeAt(e.length - 1).toString(16) +
              " "
          : "\\" + e;
      },
      oe = function () {
        T();
      },
      ae = be(
        function (e) {
          return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
        },
        { dir: "parentNode", next: "legend" }
      );
    try {
      H.apply((t = O.call(m.childNodes)), m.childNodes),
        t[m.childNodes.length].nodeType;
    } catch (e) {
      H = {
        apply: t.length
          ? function (e, t) {
              L.apply(e, O.call(t));
            }
          : function (e, t) {
              var n = e.length,
                r = 0;
              while ((e[n++] = t[r++]));
              e.length = n - 1;
            },
      };
    }
    function se(t, e, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f = e && e.ownerDocument,
        p = e ? e.nodeType : 9;
      if (
        ((n = n || []),
        "string" != typeof t || !t || (1 !== p && 9 !== p && 11 !== p))
      )
        return n;
      if (
        !r &&
        ((e ? e.ownerDocument || e : m) !== C && T(e), (e = e || C), E)
      ) {
        if (11 !== p && (u = Z.exec(t)))
          if ((i = u[1])) {
            if (9 === p) {
              if (!(a = e.getElementById(i))) return n;
              if (a.id === i) return n.push(a), n;
            } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i)
              return n.push(a), n;
          } else {
            if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
            if (
              (i = u[3]) &&
              d.getElementsByClassName &&
              e.getElementsByClassName
            )
              return H.apply(n, e.getElementsByClassName(i)), n;
          }
        if (
          d.qsa &&
          !A[t + " "] &&
          (!v || !v.test(t)) &&
          (1 !== p || "object" !== e.nodeName.toLowerCase())
        ) {
          if (((c = t), (f = e), 1 === p && U.test(t))) {
            (s = e.getAttribute("id"))
              ? (s = s.replace(re, ie))
              : e.setAttribute("id", (s = k)),
              (o = (l = h(t)).length);
            while (o--) l[o] = "#" + s + " " + xe(l[o]);
            (c = l.join(",")), (f = (ee.test(t) && ye(e.parentNode)) || e);
          }
          try {
            return H.apply(n, f.querySelectorAll(c)), n;
          } catch (e) {
            A(t, !0);
          } finally {
            s === k && e.removeAttribute("id");
          }
        }
      }
      return g(t.replace(B, "$1"), e, n, r);
    }
    function ue() {
      var r = [];
      return function e(t, n) {
        return (
          r.push(t + " ") > b.cacheLength && delete e[r.shift()],
          (e[t + " "] = n)
        );
      };
    }
    function le(e) {
      return (e[k] = !0), e;
    }
    function ce(e) {
      var t = C.createElement("fieldset");
      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), (t = null);
      }
    }
    function fe(e, t) {
      var n = e.split("|"),
        r = n.length;
      while (r--) b.attrHandle[n[r]] = t;
    }
    function pe(e, t) {
      var n = t && e,
        r =
          n &&
          1 === e.nodeType &&
          1 === t.nodeType &&
          e.sourceIndex - t.sourceIndex;
      if (r) return r;
      if (n) while ((n = n.nextSibling)) if (n === t) return -1;
      return e ? 1 : -1;
    }
    function de(t) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === t;
      };
    }
    function he(n) {
      return function (e) {
        var t = e.nodeName.toLowerCase();
        return ("input" === t || "button" === t) && e.type === n;
      };
    }
    function ge(t) {
      return function (e) {
        return "form" in e
          ? e.parentNode && !1 === e.disabled
            ? "label" in e
              ? "label" in e.parentNode
                ? e.parentNode.disabled === t
                : e.disabled === t
              : e.isDisabled === t || (e.isDisabled !== !t && ae(e) === t)
            : e.disabled === t
          : "label" in e && e.disabled === t;
      };
    }
    function ve(a) {
      return le(function (o) {
        return (
          (o = +o),
          le(function (e, t) {
            var n,
              r = a([], e.length, o),
              i = r.length;
            while (i--) e[(n = r[i])] && (e[n] = !(t[n] = e[n]));
          })
        );
      });
    }
    function ye(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }
    for (e in ((d = se.support = {}),
    (i = se.isXML =
      function (e) {
        var t = e.namespaceURI,
          n = (e.ownerDocument || e).documentElement;
        return !Y.test(t || (n && n.nodeName) || "HTML");
      }),
    (T = se.setDocument =
      function (e) {
        var t,
          n,
          r = e ? e.ownerDocument || e : m;
        return (
          r !== C &&
            9 === r.nodeType &&
            r.documentElement &&
            ((a = (C = r).documentElement),
            (E = !i(C)),
            m !== C &&
              (n = C.defaultView) &&
              n.top !== n &&
              (n.addEventListener
                ? n.addEventListener("unload", oe, !1)
                : n.attachEvent && n.attachEvent("onunload", oe)),
            (d.attributes = ce(function (e) {
              return (e.className = "i"), !e.getAttribute("className");
            })),
            (d.getElementsByTagName = ce(function (e) {
              return (
                e.appendChild(C.createComment("")),
                !e.getElementsByTagName("*").length
              );
            })),
            (d.getElementsByClassName = K.test(C.getElementsByClassName)),
            (d.getById = ce(function (e) {
              return (
                (a.appendChild(e).id = k),
                !C.getElementsByName || !C.getElementsByName(k).length
              );
            })),
            d.getById
              ? ((b.filter.ID = function (e) {
                  var t = e.replace(te, ne);
                  return function (e) {
                    return e.getAttribute("id") === t;
                  };
                }),
                (b.find.ID = function (e, t) {
                  if ("undefined" != typeof t.getElementById && E) {
                    var n = t.getElementById(e);
                    return n ? [n] : [];
                  }
                }))
              : ((b.filter.ID = function (e) {
                  var n = e.replace(te, ne);
                  return function (e) {
                    var t =
                      "undefined" != typeof e.getAttributeNode &&
                      e.getAttributeNode("id");
                    return t && t.value === n;
                  };
                }),
                (b.find.ID = function (e, t) {
                  if ("undefined" != typeof t.getElementById && E) {
                    var n,
                      r,
                      i,
                      o = t.getElementById(e);
                    if (o) {
                      if ((n = o.getAttributeNode("id")) && n.value === e)
                        return [o];
                      (i = t.getElementsByName(e)), (r = 0);
                      while ((o = i[r++]))
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                          return [o];
                    }
                    return [];
                  }
                })),
            (b.find.TAG = d.getElementsByTagName
              ? function (e, t) {
                  return "undefined" != typeof t.getElementsByTagName
                    ? t.getElementsByTagName(e)
                    : d.qsa
                    ? t.querySelectorAll(e)
                    : void 0;
                }
              : function (e, t) {
                  var n,
                    r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                  if ("*" === e) {
                    while ((n = o[i++])) 1 === n.nodeType && r.push(n);
                    return r;
                  }
                  return o;
                }),
            (b.find.CLASS =
              d.getElementsByClassName &&
              function (e, t) {
                if ("undefined" != typeof t.getElementsByClassName && E)
                  return t.getElementsByClassName(e);
              }),
            (s = []),
            (v = []),
            (d.qsa = K.test(C.querySelectorAll)) &&
              (ce(function (e) {
                (a.appendChild(e).innerHTML =
                  "<a id='" +
                  k +
                  "'></a><select id='" +
                  k +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  e.querySelectorAll("[msallowcapture^='']").length &&
                    v.push("[*^$]=" + M + "*(?:''|\"\")"),
                  e.querySelectorAll("[selected]").length ||
                    v.push("\\[" + M + "*(?:value|" + R + ")"),
                  e.querySelectorAll("[id~=" + k + "-]").length || v.push("~="),
                  e.querySelectorAll(":checked").length || v.push(":checked"),
                  e.querySelectorAll("a#" + k + "+*").length ||
                    v.push(".#.+[+~]");
              }),
              ce(function (e) {
                e.innerHTML =
                  "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = C.createElement("input");
                t.setAttribute("type", "hidden"),
                  e.appendChild(t).setAttribute("name", "D"),
                  e.querySelectorAll("[name=d]").length &&
                    v.push("name" + M + "*[*^$|!~]?="),
                  2 !== e.querySelectorAll(":enabled").length &&
                    v.push(":enabled", ":disabled"),
                  (a.appendChild(e).disabled = !0),
                  2 !== e.querySelectorAll(":disabled").length &&
                    v.push(":enabled", ":disabled"),
                  e.querySelectorAll("*,:x"),
                  v.push(",.*:");
              })),
            (d.matchesSelector = K.test(
              (c =
                a.matches ||
                a.webkitMatchesSelector ||
                a.mozMatchesSelector ||
                a.oMatchesSelector ||
                a.msMatchesSelector)
            )) &&
              ce(function (e) {
                (d.disconnectedMatch = c.call(e, "*")),
                  c.call(e, "[s!='']:x"),
                  s.push("!=", $);
              }),
            (v = v.length && new RegExp(v.join("|"))),
            (s = s.length && new RegExp(s.join("|"))),
            (t = K.test(a.compareDocumentPosition)),
            (y =
              t || K.test(a.contains)
                ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                      r = t && t.parentNode;
                    return (
                      e === r ||
                      !(
                        !r ||
                        1 !== r.nodeType ||
                        !(n.contains
                          ? n.contains(r)
                          : e.compareDocumentPosition &&
                            16 & e.compareDocumentPosition(r))
                      )
                    );
                  }
                : function (e, t) {
                    if (t) while ((t = t.parentNode)) if (t === e) return !0;
                    return !1;
                  }),
            (D = t
              ? function (e, t) {
                  if (e === t) return (l = !0), 0;
                  var n =
                    !e.compareDocumentPosition - !t.compareDocumentPosition;
                  return (
                    n ||
                    (1 &
                      (n =
                        (e.ownerDocument || e) === (t.ownerDocument || t)
                          ? e.compareDocumentPosition(t)
                          : 1) ||
                    (!d.sortDetached && t.compareDocumentPosition(e) === n)
                      ? e === C || (e.ownerDocument === m && y(m, e))
                        ? -1
                        : t === C || (t.ownerDocument === m && y(m, t))
                        ? 1
                        : u
                        ? P(u, e) - P(u, t)
                        : 0
                      : 4 & n
                      ? -1
                      : 1)
                  );
                }
              : function (e, t) {
                  if (e === t) return (l = !0), 0;
                  var n,
                    r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    s = [t];
                  if (!i || !o)
                    return e === C
                      ? -1
                      : t === C
                      ? 1
                      : i
                      ? -1
                      : o
                      ? 1
                      : u
                      ? P(u, e) - P(u, t)
                      : 0;
                  if (i === o) return pe(e, t);
                  n = e;
                  while ((n = n.parentNode)) a.unshift(n);
                  n = t;
                  while ((n = n.parentNode)) s.unshift(n);
                  while (a[r] === s[r]) r++;
                  return r
                    ? pe(a[r], s[r])
                    : a[r] === m
                    ? -1
                    : s[r] === m
                    ? 1
                    : 0;
                })),
          C
        );
      }),
    (se.matches = function (e, t) {
      return se(e, null, null, t);
    }),
    (se.matchesSelector = function (e, t) {
      if (
        ((e.ownerDocument || e) !== C && T(e),
        d.matchesSelector &&
          E &&
          !A[t + " "] &&
          (!s || !s.test(t)) &&
          (!v || !v.test(t)))
      )
        try {
          var n = c.call(e, t);
          if (
            n ||
            d.disconnectedMatch ||
            (e.document && 11 !== e.document.nodeType)
          )
            return n;
        } catch (e) {
          A(t, !0);
        }
      return 0 < se(t, C, null, [e]).length;
    }),
    (se.contains = function (e, t) {
      return (e.ownerDocument || e) !== C && T(e), y(e, t);
    }),
    (se.attr = function (e, t) {
      (e.ownerDocument || e) !== C && T(e);
      var n = b.attrHandle[t.toLowerCase()],
        r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
      return void 0 !== r
        ? r
        : d.attributes || !E
        ? e.getAttribute(t)
        : (r = e.getAttributeNode(t)) && r.specified
        ? r.value
        : null;
    }),
    (se.escape = function (e) {
      return (e + "").replace(re, ie);
    }),
    (se.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }),
    (se.uniqueSort = function (e) {
      var t,
        n = [],
        r = 0,
        i = 0;
      if (
        ((l = !d.detectDuplicates),
        (u = !d.sortStable && e.slice(0)),
        e.sort(D),
        l)
      ) {
        while ((t = e[i++])) t === e[i] && (r = n.push(i));
        while (r--) e.splice(n[r], 1);
      }
      return (u = null), e;
    }),
    (o = se.getText =
      function (e) {
        var t,
          n = "",
          r = 0,
          i = e.nodeType;
        if (i) {
          if (1 === i || 9 === i || 11 === i) {
            if ("string" == typeof e.textContent) return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
          } else if (3 === i || 4 === i) return e.nodeValue;
        } else while ((t = e[r++])) n += o(t);
        return n;
      }),
    ((b = se.selectors =
      {
        cacheLength: 50,
        createPseudo: le,
        match: G,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (e) {
            return (
              (e[1] = e[1].replace(te, ne)),
              (e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne)),
              "~=" === e[2] && (e[3] = " " + e[3] + " "),
              e.slice(0, 4)
            );
          },
          CHILD: function (e) {
            return (
              (e[1] = e[1].toLowerCase()),
              "nth" === e[1].slice(0, 3)
                ? (e[3] || se.error(e[0]),
                  (e[4] = +(e[4]
                    ? e[5] + (e[6] || 1)
                    : 2 * ("even" === e[3] || "odd" === e[3]))),
                  (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                : e[3] && se.error(e[0]),
              e
            );
          },
          PSEUDO: function (e) {
            var t,
              n = !e[6] && e[2];
            return G.CHILD.test(e[0])
              ? null
              : (e[3]
                  ? (e[2] = e[4] || e[5] || "")
                  : n &&
                    X.test(n) &&
                    (t = h(n, !0)) &&
                    (t = n.indexOf(")", n.length - t) - n.length) &&
                    ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                e.slice(0, 3));
          },
        },
        filter: {
          TAG: function (e) {
            var t = e.replace(te, ne).toLowerCase();
            return "*" === e
              ? function () {
                  return !0;
                }
              : function (e) {
                  return e.nodeName && e.nodeName.toLowerCase() === t;
                };
          },
          CLASS: function (e) {
            var t = p[e + " "];
            return (
              t ||
              ((t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) &&
                p(e, function (e) {
                  return t.test(
                    ("string" == typeof e.className && e.className) ||
                      ("undefined" != typeof e.getAttribute &&
                        e.getAttribute("class")) ||
                      ""
                  );
                }))
            );
          },
          ATTR: function (n, r, i) {
            return function (e) {
              var t = se.attr(e, n);
              return null == t
                ? "!=" === r
                : !r ||
                    ((t += ""),
                    "=" === r
                      ? t === i
                      : "!=" === r
                      ? t !== i
                      : "^=" === r
                      ? i && 0 === t.indexOf(i)
                      : "*=" === r
                      ? i && -1 < t.indexOf(i)
                      : "$=" === r
                      ? i && t.slice(-i.length) === i
                      : "~=" === r
                      ? -1 < (" " + t.replace(F, " ") + " ").indexOf(i)
                      : "|=" === r &&
                        (t === i || t.slice(0, i.length + 1) === i + "-"));
            };
          },
          CHILD: function (h, e, t, g, v) {
            var y = "nth" !== h.slice(0, 3),
              m = "last" !== h.slice(-4),
              x = "of-type" === e;
            return 1 === g && 0 === v
              ? function (e) {
                  return !!e.parentNode;
                }
              : function (e, t, n) {
                  var r,
                    i,
                    o,
                    a,
                    s,
                    u,
                    l = y !== m ? "nextSibling" : "previousSibling",
                    c = e.parentNode,
                    f = x && e.nodeName.toLowerCase(),
                    p = !n && !x,
                    d = !1;
                  if (c) {
                    if (y) {
                      while (l) {
                        a = e;
                        while ((a = a[l]))
                          if (
                            x
                              ? a.nodeName.toLowerCase() === f
                              : 1 === a.nodeType
                          )
                            return !1;
                        u = l = "only" === h && !u && "nextSibling";
                      }
                      return !0;
                    }
                    if (((u = [m ? c.firstChild : c.lastChild]), m && p)) {
                      (d =
                        (s =
                          (r =
                            (i =
                              (o = (a = c)[k] || (a[k] = {}))[a.uniqueID] ||
                              (o[a.uniqueID] = {}))[h] || [])[0] === S &&
                          r[1]) && r[2]),
                        (a = s && c.childNodes[s]);
                      while ((a = (++s && a && a[l]) || (d = s = 0) || u.pop()))
                        if (1 === a.nodeType && ++d && a === e) {
                          i[h] = [S, s, d];
                          break;
                        }
                    } else if (
                      (p &&
                        (d = s =
                          (r =
                            (i =
                              (o = (a = e)[k] || (a[k] = {}))[a.uniqueID] ||
                              (o[a.uniqueID] = {}))[h] || [])[0] === S && r[1]),
                      !1 === d)
                    )
                      while ((a = (++s && a && a[l]) || (d = s = 0) || u.pop()))
                        if (
                          (x
                            ? a.nodeName.toLowerCase() === f
                            : 1 === a.nodeType) &&
                          ++d &&
                          (p &&
                            ((i =
                              (o = a[k] || (a[k] = {}))[a.uniqueID] ||
                              (o[a.uniqueID] = {}))[h] = [S, d]),
                          a === e)
                        )
                          break;
                    return (d -= v) === g || (d % g == 0 && 0 <= d / g);
                  }
                };
          },
          PSEUDO: function (e, o) {
            var t,
              a =
                b.pseudos[e] ||
                b.setFilters[e.toLowerCase()] ||
                se.error("unsupported pseudo: " + e);
            return a[k]
              ? a(o)
              : 1 < a.length
              ? ((t = [e, e, "", o]),
                b.setFilters.hasOwnProperty(e.toLowerCase())
                  ? le(function (e, t) {
                      var n,
                        r = a(e, o),
                        i = r.length;
                      while (i--) e[(n = P(e, r[i]))] = !(t[n] = r[i]);
                    })
                  : function (e) {
                      return a(e, 0, t);
                    })
              : a;
          },
        },
        pseudos: {
          not: le(function (e) {
            var r = [],
              i = [],
              s = f(e.replace(B, "$1"));
            return s[k]
              ? le(function (e, t, n, r) {
                  var i,
                    o = s(e, null, r, []),
                    a = e.length;
                  while (a--) (i = o[a]) && (e[a] = !(t[a] = i));
                })
              : function (e, t, n) {
                  return (r[0] = e), s(r, null, n, i), (r[0] = null), !i.pop();
                };
          }),
          has: le(function (t) {
            return function (e) {
              return 0 < se(t, e).length;
            };
          }),
          contains: le(function (t) {
            return (
              (t = t.replace(te, ne)),
              function (e) {
                return -1 < (e.textContent || o(e)).indexOf(t);
              }
            );
          }),
          lang: le(function (n) {
            return (
              V.test(n || "") || se.error("unsupported lang: " + n),
              (n = n.replace(te, ne).toLowerCase()),
              function (e) {
                var t;
                do {
                  if (
                    (t = E
                      ? e.lang
                      : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                  )
                    return (
                      (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                    );
                } while ((e = e.parentNode) && 1 === e.nodeType);
                return !1;
              }
            );
          }),
          target: function (e) {
            var t = n.location && n.location.hash;
            return t && t.slice(1) === e.id;
          },
          root: function (e) {
            return e === a;
          },
          focus: function (e) {
            return (
              e === C.activeElement &&
              (!C.hasFocus || C.hasFocus()) &&
              !!(e.type || e.href || ~e.tabIndex)
            );
          },
          enabled: ge(!1),
          disabled: ge(!0),
          checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return (
              ("input" === t && !!e.checked) || ("option" === t && !!e.selected)
            );
          },
          selected: function (e) {
            return (
              e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
            );
          },
          empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeType < 6) return !1;
            return !0;
          },
          parent: function (e) {
            return !b.pseudos.empty(e);
          },
          header: function (e) {
            return J.test(e.nodeName);
          },
          input: function (e) {
            return Q.test(e.nodeName);
          },
          button: function (e) {
            var t = e.nodeName.toLowerCase();
            return ("input" === t && "button" === e.type) || "button" === t;
          },
          text: function (e) {
            var t;
            return (
              "input" === e.nodeName.toLowerCase() &&
              "text" === e.type &&
              (null == (t = e.getAttribute("type")) ||
                "text" === t.toLowerCase())
            );
          },
          first: ve(function () {
            return [0];
          }),
          last: ve(function (e, t) {
            return [t - 1];
          }),
          eq: ve(function (e, t, n) {
            return [n < 0 ? n + t : n];
          }),
          even: ve(function (e, t) {
            for (var n = 0; n < t; n += 2) e.push(n);
            return e;
          }),
          odd: ve(function (e, t) {
            for (var n = 1; n < t; n += 2) e.push(n);
            return e;
          }),
          lt: ve(function (e, t, n) {
            for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; ) e.push(r);
            return e;
          }),
          gt: ve(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
            return e;
          }),
        },
      }).pseudos.nth = b.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      b.pseudos[e] = de(e);
    for (e in { submit: !0, reset: !0 }) b.pseudos[e] = he(e);
    function me() {}
    function xe(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
      return r;
    }
    function be(s, e, t) {
      var u = e.dir,
        l = e.next,
        c = l || u,
        f = t && "parentNode" === c,
        p = r++;
      return e.first
        ? function (e, t, n) {
            while ((e = e[u])) if (1 === e.nodeType || f) return s(e, t, n);
            return !1;
          }
        : function (e, t, n) {
            var r,
              i,
              o,
              a = [S, p];
            if (n) {
              while ((e = e[u]))
                if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
            } else
              while ((e = e[u]))
                if (1 === e.nodeType || f)
                  if (
                    ((i =
                      (o = e[k] || (e[k] = {}))[e.uniqueID] ||
                      (o[e.uniqueID] = {})),
                    l && l === e.nodeName.toLowerCase())
                  )
                    e = e[u] || e;
                  else {
                    if ((r = i[c]) && r[0] === S && r[1] === p)
                      return (a[2] = r[2]);
                    if (((i[c] = a)[2] = s(e, t, n))) return !0;
                  }
            return !1;
          };
    }
    function we(i) {
      return 1 < i.length
        ? function (e, t, n) {
            var r = i.length;
            while (r--) if (!i[r](e, t, n)) return !1;
            return !0;
          }
        : i[0];
    }
    function Te(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
        (o = e[s]) && ((n && !n(o, r, i)) || (a.push(o), l && t.push(s)));
      return a;
    }
    function Ce(d, h, g, v, y, e) {
      return (
        v && !v[k] && (v = Ce(v)),
        y && !y[k] && (y = Ce(y, e)),
        le(function (e, t, n, r) {
          var i,
            o,
            a,
            s = [],
            u = [],
            l = t.length,
            c =
              e ||
              (function (e, t, n) {
                for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
                return n;
              })(h || "*", n.nodeType ? [n] : n, []),
            f = !d || (!e && h) ? c : Te(c, s, d, n, r),
            p = g ? (y || (e ? d : l || v) ? [] : t) : f;
          if ((g && g(f, p, n, r), v)) {
            (i = Te(p, u)), v(i, [], n, r), (o = i.length);
            while (o--) (a = i[o]) && (p[u[o]] = !(f[u[o]] = a));
          }
          if (e) {
            if (y || d) {
              if (y) {
                (i = []), (o = p.length);
                while (o--) (a = p[o]) && i.push((f[o] = a));
                y(null, (p = []), i, r);
              }
              o = p.length;
              while (o--)
                (a = p[o]) &&
                  -1 < (i = y ? P(e, a) : s[o]) &&
                  (e[i] = !(t[i] = a));
            }
          } else (p = Te(p === t ? p.splice(l, p.length) : p)), y ? y(null, t, p, r) : H.apply(t, p);
        })
      );
    }
    function Ee(e) {
      for (
        var i,
          t,
          n,
          r = e.length,
          o = b.relative[e[0].type],
          a = o || b.relative[" "],
          s = o ? 1 : 0,
          u = be(
            function (e) {
              return e === i;
            },
            a,
            !0
          ),
          l = be(
            function (e) {
              return -1 < P(i, e);
            },
            a,
            !0
          ),
          c = [
            function (e, t, n) {
              var r =
                (!o && (n || t !== w)) ||
                ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
              return (i = null), r;
            },
          ];
        s < r;
        s++
      )
        if ((t = b.relative[e[s].type])) c = [be(we(c), t)];
        else {
          if ((t = b.filter[e[s].type].apply(null, e[s].matches))[k]) {
            for (n = ++s; n < r; n++) if (b.relative[e[n].type]) break;
            return Ce(
              1 < s && we(c),
              1 < s &&
                xe(
                  e
                    .slice(0, s - 1)
                    .concat({ value: " " === e[s - 2].type ? "*" : "" })
                ).replace(B, "$1"),
              t,
              s < n && Ee(e.slice(s, n)),
              n < r && Ee((e = e.slice(n))),
              n < r && xe(e)
            );
          }
          c.push(t);
        }
      return we(c);
    }
    return (
      (me.prototype = b.filters = b.pseudos),
      (b.setFilters = new me()),
      (h = se.tokenize =
        function (e, t) {
          var n,
            r,
            i,
            o,
            a,
            s,
            u,
            l = x[e + " "];
          if (l) return t ? 0 : l.slice(0);
          (a = e), (s = []), (u = b.preFilter);
          while (a) {
            for (o in ((n && !(r = _.exec(a))) ||
              (r && (a = a.slice(r[0].length) || a), s.push((i = []))),
            (n = !1),
            (r = z.exec(a)) &&
              ((n = r.shift()),
              i.push({ value: n, type: r[0].replace(B, " ") }),
              (a = a.slice(n.length))),
            b.filter))
              !(r = G[o].exec(a)) ||
                (u[o] && !(r = u[o](r))) ||
                ((n = r.shift()),
                i.push({ value: n, type: o, matches: r }),
                (a = a.slice(n.length)));
            if (!n) break;
          }
          return t ? a.length : a ? se.error(e) : x(e, s).slice(0);
        }),
      (f = se.compile =
        function (e, t) {
          var n,
            v,
            y,
            m,
            x,
            r,
            i = [],
            o = [],
            a = N[e + " "];
          if (!a) {
            t || (t = h(e)), (n = t.length);
            while (n--) (a = Ee(t[n]))[k] ? i.push(a) : o.push(a);
            (a = N(
              e,
              ((v = o),
              (m = 0 < (y = i).length),
              (x = 0 < v.length),
              (r = function (e, t, n, r, i) {
                var o,
                  a,
                  s,
                  u = 0,
                  l = "0",
                  c = e && [],
                  f = [],
                  p = w,
                  d = e || (x && b.find.TAG("*", i)),
                  h = (S += null == p ? 1 : Math.random() || 0.1),
                  g = d.length;
                for (
                  i && (w = t === C || t || i);
                  l !== g && null != (o = d[l]);
                  l++
                ) {
                  if (x && o) {
                    (a = 0), t || o.ownerDocument === C || (T(o), (n = !E));
                    while ((s = v[a++]))
                      if (s(o, t || C, n)) {
                        r.push(o);
                        break;
                      }
                    i && (S = h);
                  }
                  m && ((o = !s && o) && u--, e && c.push(o));
                }
                if (((u += l), m && l !== u)) {
                  a = 0;
                  while ((s = y[a++])) s(c, f, t, n);
                  if (e) {
                    if (0 < u) while (l--) c[l] || f[l] || (f[l] = q.call(r));
                    f = Te(f);
                  }
                  H.apply(r, f),
                    i &&
                      !e &&
                      0 < f.length &&
                      1 < u + y.length &&
                      se.uniqueSort(r);
                }
                return i && ((S = h), (w = p)), c;
              }),
              m ? le(r) : r)
            )).selector = e;
          }
          return a;
        }),
      (g = se.select =
        function (e, t, n, r) {
          var i,
            o,
            a,
            s,
            u,
            l = "function" == typeof e && e,
            c = !r && h((e = l.selector || e));
          if (((n = n || []), 1 === c.length)) {
            if (
              2 < (o = c[0] = c[0].slice(0)).length &&
              "ID" === (a = o[0]).type &&
              9 === t.nodeType &&
              E &&
              b.relative[o[1].type]
            ) {
              if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0]))
                return n;
              l && (t = t.parentNode), (e = e.slice(o.shift().value.length));
            }
            i = G.needsContext.test(e) ? 0 : o.length;
            while (i--) {
              if (((a = o[i]), b.relative[(s = a.type)])) break;
              if (
                (u = b.find[s]) &&
                (r = u(
                  a.matches[0].replace(te, ne),
                  (ee.test(o[0].type) && ye(t.parentNode)) || t
                ))
              ) {
                if ((o.splice(i, 1), !(e = r.length && xe(o))))
                  return H.apply(n, r), n;
                break;
              }
            }
          }
          return (
            (l || f(e, c))(
              r,
              t,
              !E,
              n,
              !t || (ee.test(e) && ye(t.parentNode)) || t
            ),
            n
          );
        }),
      (d.sortStable = k.split("").sort(D).join("") === k),
      (d.detectDuplicates = !!l),
      T(),
      (d.sortDetached = ce(function (e) {
        return 1 & e.compareDocumentPosition(C.createElement("fieldset"));
      })),
      ce(function (e) {
        return (
          (e.innerHTML = "<a href='#'></a>"),
          "#" === e.firstChild.getAttribute("href")
        );
      }) ||
        fe("type|href|height|width", function (e, t, n) {
          if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }),
      (d.attributes &&
        ce(function (e) {
          return (
            (e.innerHTML = "<input/>"),
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
          );
        })) ||
        fe("value", function (e, t, n) {
          if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }),
      ce(function (e) {
        return null == e.getAttribute("disabled");
      }) ||
        fe(R, function (e, t, n) {
          var r;
          if (!n)
            return !0 === e[t]
              ? t.toLowerCase()
              : (r = e.getAttributeNode(t)) && r.specified
              ? r.value
              : null;
        }),
      se
    );
  })(C);
  (k.find = h),
    (k.expr = h.selectors),
    (k.expr[":"] = k.expr.pseudos),
    (k.uniqueSort = k.unique = h.uniqueSort),
    (k.text = h.getText),
    (k.isXMLDoc = h.isXML),
    (k.contains = h.contains),
    (k.escapeSelector = h.escape);
  var T = function (e, t, n) {
      var r = [],
        i = void 0 !== n;
      while ((e = e[t]) && 9 !== e.nodeType)
        if (1 === e.nodeType) {
          if (i && k(e).is(n)) break;
          r.push(e);
        }
      return r;
    },
    S = function (e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    },
    N = k.expr.match.needsContext;
  function A(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }
  var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function j(e, n, r) {
    return m(n)
      ? k.grep(e, function (e, t) {
          return !!n.call(e, t, e) !== r;
        })
      : n.nodeType
      ? k.grep(e, function (e) {
          return (e === n) !== r;
        })
      : "string" != typeof n
      ? k.grep(e, function (e) {
          return -1 < i.call(n, e) !== r;
        })
      : k.filter(n, e, r);
  }
  (k.filter = function (e, t, n) {
    var r = t[0];
    return (
      n && (e = ":not(" + e + ")"),
      1 === t.length && 1 === r.nodeType
        ? k.find.matchesSelector(r, e)
          ? [r]
          : []
        : k.find.matches(
            e,
            k.grep(t, function (e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    k.fn.extend({
      find: function (e) {
        var t,
          n,
          r = this.length,
          i = this;
        if ("string" != typeof e)
          return this.pushStack(
            k(e).filter(function () {
              for (t = 0; t < r; t++) if (k.contains(i[t], this)) return !0;
            })
          );
        for (n = this.pushStack([]), t = 0; t < r; t++) k.find(e, i[t], n);
        return 1 < r ? k.uniqueSort(n) : n;
      },
      filter: function (e) {
        return this.pushStack(j(this, e || [], !1));
      },
      not: function (e) {
        return this.pushStack(j(this, e || [], !0));
      },
      is: function (e) {
        return !!j(this, "string" == typeof e && N.test(e) ? k(e) : e || [], !1)
          .length;
      },
    });
  var q,
    L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((k.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;
    if (((n = n || q), "string" == typeof e)) {
      if (
        !(r =
          "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
            ? [null, e, null]
            : L.exec(e)) ||
        (!r[1] && t)
      )
        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
      if (r[1]) {
        if (
          ((t = t instanceof k ? t[0] : t),
          k.merge(
            this,
            k.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)
          ),
          D.test(r[1]) && k.isPlainObject(t))
        )
          for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        return this;
      }
      return (
        (i = E.getElementById(r[2])) && ((this[0] = i), (this.length = 1)), this
      );
    }
    return e.nodeType
      ? ((this[0] = e), (this.length = 1), this)
      : m(e)
      ? void 0 !== n.ready
        ? n.ready(e)
        : e(k)
      : k.makeArray(e, this);
  }).prototype = k.fn),
    (q = k(E));
  var H = /^(?:parents|prev(?:Until|All))/,
    O = { children: !0, contents: !0, next: !0, prev: !0 };
  function P(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType);
    return e;
  }
  k.fn.extend({
    has: function (e) {
      var t = k(e, this),
        n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) if (k.contains(this, t[e])) return !0;
      });
    },
    closest: function (e, t) {
      var n,
        r = 0,
        i = this.length,
        o = [],
        a = "string" != typeof e && k(e);
      if (!N.test(e))
        for (; r < i; r++)
          for (n = this[r]; n && n !== t; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (a
                ? -1 < a.index(n)
                : 1 === n.nodeType && k.find.matchesSelector(n, e))
            ) {
              o.push(n);
              break;
            }
      return this.pushStack(1 < o.length ? k.uniqueSort(o) : o);
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? i.call(k(e), this[0])
          : i.call(this, e.jquery ? e[0] : e)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (e, t) {
      return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    k.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return T(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
          return T(e, "parentNode", n);
        },
        next: function (e) {
          return P(e, "nextSibling");
        },
        prev: function (e) {
          return P(e, "previousSibling");
        },
        nextAll: function (e) {
          return T(e, "nextSibling");
        },
        prevAll: function (e) {
          return T(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
          return T(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
          return T(e, "previousSibling", n);
        },
        siblings: function (e) {
          return S((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return S(e.firstChild);
        },
        contents: function (e) {
          return "undefined" != typeof e.contentDocument
            ? e.contentDocument
            : (A(e, "template") && (e = e.content || e),
              k.merge([], e.childNodes));
        },
      },
      function (r, i) {
        k.fn[r] = function (e, t) {
          var n = k.map(this, i, e);
          return (
            "Until" !== r.slice(-5) && (t = e),
            t && "string" == typeof t && (n = k.filter(t, n)),
            1 < this.length &&
              (O[r] || k.uniqueSort(n), H.test(r) && n.reverse()),
            this.pushStack(n)
          );
        };
      }
    );
  var R = /[^\x20\t\r\n\f]+/g;
  function M(e) {
    return e;
  }
  function I(e) {
    throw e;
  }
  function W(e, t, n, r) {
    var i;
    try {
      e && m((i = e.promise))
        ? i.call(e).done(t).fail(n)
        : e && m((i = e.then))
        ? i.call(e, t, n)
        : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }
  (k.Callbacks = function (r) {
    var e, n;
    r =
      "string" == typeof r
        ? ((e = r),
          (n = {}),
          k.each(e.match(R) || [], function (e, t) {
            n[t] = !0;
          }),
          n)
        : k.extend({}, r);
    var i,
      t,
      o,
      a,
      s = [],
      u = [],
      l = -1,
      c = function () {
        for (a = a || r.once, o = i = !0; u.length; l = -1) {
          t = u.shift();
          while (++l < s.length)
            !1 === s[l].apply(t[0], t[1]) &&
              r.stopOnFalse &&
              ((l = s.length), (t = !1));
        }
        r.memory || (t = !1), (i = !1), a && (s = t ? [] : "");
      },
      f = {
        add: function () {
          return (
            s &&
              (t && !i && ((l = s.length - 1), u.push(t)),
              (function n(e) {
                k.each(e, function (e, t) {
                  m(t)
                    ? (r.unique && f.has(t)) || s.push(t)
                    : t && t.length && "string" !== w(t) && n(t);
                });
              })(arguments),
              t && !i && c()),
            this
          );
        },
        remove: function () {
          return (
            k.each(arguments, function (e, t) {
              var n;
              while (-1 < (n = k.inArray(t, s, n)))
                s.splice(n, 1), n <= l && l--;
            }),
            this
          );
        },
        has: function (e) {
          return e ? -1 < k.inArray(e, s) : 0 < s.length;
        },
        empty: function () {
          return s && (s = []), this;
        },
        disable: function () {
          return (a = u = []), (s = t = ""), this;
        },
        disabled: function () {
          return !s;
        },
        lock: function () {
          return (a = u = []), t || i || (s = t = ""), this;
        },
        locked: function () {
          return !!a;
        },
        fireWith: function (e, t) {
          return (
            a ||
              ((t = [e, (t = t || []).slice ? t.slice() : t]),
              u.push(t),
              i || c()),
            this
          );
        },
        fire: function () {
          return f.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!o;
        },
      };
    return f;
  }),
    k.extend({
      Deferred: function (e) {
        var o = [
            [
              "notify",
              "progress",
              k.Callbacks("memory"),
              k.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              k.Callbacks("once memory"),
              k.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              k.Callbacks("once memory"),
              k.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          i = "pending",
          a = {
            state: function () {
              return i;
            },
            always: function () {
              return s.done(arguments).fail(arguments), this;
            },
            catch: function (e) {
              return a.then(null, e);
            },
            pipe: function () {
              var i = arguments;
              return k
                .Deferred(function (r) {
                  k.each(o, function (e, t) {
                    var n = m(i[t[4]]) && i[t[4]];
                    s[t[1]](function () {
                      var e = n && n.apply(this, arguments);
                      e && m(e.promise)
                        ? e
                            .promise()
                            .progress(r.notify)
                            .done(r.resolve)
                            .fail(r.reject)
                        : r[t[0] + "With"](this, n ? [e] : arguments);
                    });
                  }),
                    (i = null);
                })
                .promise();
            },
            then: function (t, n, r) {
              var u = 0;
              function l(i, o, a, s) {
                return function () {
                  var n = this,
                    r = arguments,
                    e = function () {
                      var e, t;
                      if (!(i < u)) {
                        if ((e = a.apply(n, r)) === o.promise())
                          throw new TypeError("Thenable self-resolution");
                        (t =
                          e &&
                          ("object" == typeof e || "function" == typeof e) &&
                          e.then),
                          m(t)
                            ? s
                              ? t.call(e, l(u, o, M, s), l(u, o, I, s))
                              : (u++,
                                t.call(
                                  e,
                                  l(u, o, M, s),
                                  l(u, o, I, s),
                                  l(u, o, M, o.notifyWith)
                                ))
                            : (a !== M && ((n = void 0), (r = [e])),
                              (s || o.resolveWith)(n, r));
                      }
                    },
                    t = s
                      ? e
                      : function () {
                          try {
                            e();
                          } catch (e) {
                            k.Deferred.exceptionHook &&
                              k.Deferred.exceptionHook(e, t.stackTrace),
                              u <= i + 1 &&
                                (a !== I && ((n = void 0), (r = [e])),
                                o.rejectWith(n, r));
                          }
                        };
                  i
                    ? t()
                    : (k.Deferred.getStackHook &&
                        (t.stackTrace = k.Deferred.getStackHook()),
                      C.setTimeout(t));
                };
              }
              return k
                .Deferred(function (e) {
                  o[0][3].add(l(0, e, m(r) ? r : M, e.notifyWith)),
                    o[1][3].add(l(0, e, m(t) ? t : M)),
                    o[2][3].add(l(0, e, m(n) ? n : I));
                })
                .promise();
            },
            promise: function (e) {
              return null != e ? k.extend(e, a) : a;
            },
          },
          s = {};
        return (
          k.each(o, function (e, t) {
            var n = t[2],
              r = t[5];
            (a[t[1]] = n.add),
              r &&
                n.add(
                  function () {
                    i = r;
                  },
                  o[3 - e][2].disable,
                  o[3 - e][3].disable,
                  o[0][2].lock,
                  o[0][3].lock
                ),
              n.add(t[3].fire),
              (s[t[0]] = function () {
                return (
                  s[t[0] + "With"](this === s ? void 0 : this, arguments), this
                );
              }),
              (s[t[0] + "With"] = n.fireWith);
          }),
          a.promise(s),
          e && e.call(s, s),
          s
        );
      },
      when: function (e) {
        var n = arguments.length,
          t = n,
          r = Array(t),
          i = s.call(arguments),
          o = k.Deferred(),
          a = function (t) {
            return function (e) {
              (r[t] = this),
                (i[t] = 1 < arguments.length ? s.call(arguments) : e),
                --n || o.resolveWith(r, i);
            };
          };
        if (
          n <= 1 &&
          (W(e, o.done(a(t)).resolve, o.reject, !n),
          "pending" === o.state() || m(i[t] && i[t].then))
        )
          return o.then();
        while (t--) W(i[t], a(t), o.reject);
        return o.promise();
      },
    });
  var $ = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (k.Deferred.exceptionHook = function (e, t) {
    C.console &&
      C.console.warn &&
      e &&
      $.test(e.name) &&
      C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
  }),
    (k.readyException = function (e) {
      C.setTimeout(function () {
        throw e;
      });
    });
  var F = k.Deferred();
  function B() {
    E.removeEventListener("DOMContentLoaded", B),
      C.removeEventListener("load", B),
      k.ready();
  }
  (k.fn.ready = function (e) {
    return (
      F.then(e)["catch"](function (e) {
        k.readyException(e);
      }),
      this
    );
  }),
    k.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (e) {
        (!0 === e ? --k.readyWait : k.isReady) ||
          ((k.isReady = !0) !== e && 0 < --k.readyWait) ||
          F.resolveWith(E, [k]);
      },
    }),
    (k.ready.then = F.then),
    "complete" === E.readyState ||
    ("loading" !== E.readyState && !E.documentElement.doScroll)
      ? C.setTimeout(k.ready)
      : (E.addEventListener("DOMContentLoaded", B),
        C.addEventListener("load", B));
  var _ = function (e, t, n, r, i, o, a) {
      var s = 0,
        u = e.length,
        l = null == n;
      if ("object" === w(n))
        for (s in ((i = !0), n)) _(e, t, s, n[s], !0, o, a);
      else if (
        void 0 !== r &&
        ((i = !0),
        m(r) || (a = !0),
        l &&
          (a
            ? (t.call(e, r), (t = null))
            : ((l = t),
              (t = function (e, t, n) {
                return l.call(k(e), n);
              }))),
        t)
      )
        for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
      return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    },
    z = /^-ms-/,
    U = /-([a-z])/g;
  function X(e, t) {
    return t.toUpperCase();
  }
  function V(e) {
    return e.replace(z, "ms-").replace(U, X);
  }
  var G = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };
  function Y() {
    this.expando = k.expando + Y.uid++;
  }
  (Y.uid = 1),
    (Y.prototype = {
      cache: function (e) {
        var t = e[this.expando];
        return (
          t ||
            ((t = {}),
            G(e) &&
              (e.nodeType
                ? (e[this.expando] = t)
                : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0,
                  }))),
          t
        );
      },
      set: function (e, t, n) {
        var r,
          i = this.cache(e);
        if ("string" == typeof t) i[V(t)] = n;
        else for (r in t) i[V(r)] = t[r];
        return i;
      },
      get: function (e, t) {
        return void 0 === t
          ? this.cache(e)
          : e[this.expando] && e[this.expando][V(t)];
      },
      access: function (e, t, n) {
        return void 0 === t || (t && "string" == typeof t && void 0 === n)
          ? this.get(e, t)
          : (this.set(e, t, n), void 0 !== n ? n : t);
      },
      remove: function (e, t) {
        var n,
          r = e[this.expando];
        if (void 0 !== r) {
          if (void 0 !== t) {
            n = (t = Array.isArray(t)
              ? t.map(V)
              : (t = V(t)) in r
              ? [t]
              : t.match(R) || []).length;
            while (n--) delete r[t[n]];
          }
          (void 0 === t || k.isEmptyObject(r)) &&
            (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
        }
      },
      hasData: function (e) {
        var t = e[this.expando];
        return void 0 !== t && !k.isEmptyObject(t);
      },
    });
  var Q = new Y(),
    J = new Y(),
    K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Z = /[A-Z]/g;
  function ee(e, t, n) {
    var r, i;
    if (void 0 === n && 1 === e.nodeType)
      if (
        ((r = "data-" + t.replace(Z, "-$&").toLowerCase()),
        "string" == typeof (n = e.getAttribute(r)))
      ) {
        try {
          n =
            "true" === (i = n) ||
            ("false" !== i &&
              ("null" === i
                ? null
                : i === +i + ""
                ? +i
                : K.test(i)
                ? JSON.parse(i)
                : i));
        } catch (e) {}
        J.set(e, t, n);
      } else n = void 0;
    return n;
  }
  k.extend({
    hasData: function (e) {
      return J.hasData(e) || Q.hasData(e);
    },
    data: function (e, t, n) {
      return J.access(e, t, n);
    },
    removeData: function (e, t) {
      J.remove(e, t);
    },
    _data: function (e, t, n) {
      return Q.access(e, t, n);
    },
    _removeData: function (e, t) {
      Q.remove(e, t);
    },
  }),
    k.fn.extend({
      data: function (n, e) {
        var t,
          r,
          i,
          o = this[0],
          a = o && o.attributes;
        if (void 0 === n) {
          if (
            this.length &&
            ((i = J.get(o)), 1 === o.nodeType && !Q.get(o, "hasDataAttrs"))
          ) {
            t = a.length;
            while (t--)
              a[t] &&
                0 === (r = a[t].name).indexOf("data-") &&
                ((r = V(r.slice(5))), ee(o, r, i[r]));
            Q.set(o, "hasDataAttrs", !0);
          }
          return i;
        }
        return "object" == typeof n
          ? this.each(function () {
              J.set(this, n);
            })
          : _(
              this,
              function (e) {
                var t;
                if (o && void 0 === e)
                  return void 0 !== (t = J.get(o, n))
                    ? t
                    : void 0 !== (t = ee(o, n))
                    ? t
                    : void 0;
                this.each(function () {
                  J.set(this, n, e);
                });
              },
              null,
              e,
              1 < arguments.length,
              null,
              !0
            );
      },
      removeData: function (e) {
        return this.each(function () {
          J.remove(this, e);
        });
      },
    }),
    k.extend({
      queue: function (e, t, n) {
        var r;
        if (e)
          return (
            (t = (t || "fx") + "queue"),
            (r = Q.get(e, t)),
            n &&
              (!r || Array.isArray(n)
                ? (r = Q.access(e, t, k.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = k.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = k._queueHooks(e, t);
        "inprogress" === i && ((i = n.shift()), r--),
          i &&
            ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(
              e,
              function () {
                k.dequeue(e, t);
              },
              o
            )),
          !r && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return (
          Q.get(e, n) ||
          Q.access(e, n, {
            empty: k.Callbacks("once memory").add(function () {
              Q.remove(e, [t + "queue", n]);
            }),
          })
        );
      },
    }),
    k.fn.extend({
      queue: function (t, n) {
        var e = 2;
        return (
          "string" != typeof t && ((n = t), (t = "fx"), e--),
          arguments.length < e
            ? k.queue(this[0], t)
            : void 0 === n
            ? this
            : this.each(function () {
                var e = k.queue(this, t, n);
                k._queueHooks(this, t),
                  "fx" === t && "inprogress" !== e[0] && k.dequeue(this, t);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          k.dequeue(this, e);
        });
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        var n,
          r = 1,
          i = k.Deferred(),
          o = this,
          a = this.length,
          s = function () {
            --r || i.resolveWith(o, [o]);
          };
        "string" != typeof e && ((t = e), (e = void 0)), (e = e || "fx");
        while (a--)
          (n = Q.get(o[a], e + "queueHooks")) &&
            n.empty &&
            (r++, n.empty.add(s));
        return s(), i.promise(t);
      },
    });
  var te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    ne = new RegExp("^(?:([+-])=|)(" + te + ")([a-z%]*)$", "i"),
    re = ["Top", "Right", "Bottom", "Left"],
    ie = E.documentElement,
    oe = function (e) {
      return k.contains(e.ownerDocument, e);
    },
    ae = { composed: !0 };
  ie.getRootNode &&
    (oe = function (e) {
      return (
        k.contains(e.ownerDocument, e) || e.getRootNode(ae) === e.ownerDocument
      );
    });
  var se = function (e, t) {
      return (
        "none" === (e = t || e).style.display ||
        ("" === e.style.display && oe(e) && "none" === k.css(e, "display"))
      );
    },
    ue = function (e, t, n, r) {
      var i,
        o,
        a = {};
      for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o]);
      for (o in ((i = n.apply(e, r || [])), t)) e.style[o] = a[o];
      return i;
    };
  function le(e, t, n, r) {
    var i,
      o,
      a = 20,
      s = r
        ? function () {
            return r.cur();
          }
        : function () {
            return k.css(e, t, "");
          },
      u = s(),
      l = (n && n[3]) || (k.cssNumber[t] ? "" : "px"),
      c =
        e.nodeType &&
        (k.cssNumber[t] || ("px" !== l && +u)) &&
        ne.exec(k.css(e, t));
    if (c && c[3] !== l) {
      (u /= 2), (l = l || c[3]), (c = +u || 1);
      while (a--)
        k.style(e, t, c + l),
          (1 - o) * (1 - (o = s() / u || 0.5)) <= 0 && (a = 0),
          (c /= o);
      (c *= 2), k.style(e, t, c + l), (n = n || []);
    }
    return (
      n &&
        ((c = +c || +u || 0),
        (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
        r && ((r.unit = l), (r.start = c), (r.end = i))),
      i
    );
  }
  var ce = {};
  function fe(e, t) {
    for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
      (r = e[c]).style &&
        ((n = r.style.display),
        t
          ? ("none" === n &&
              ((l[c] = Q.get(r, "display") || null),
              l[c] || (r.style.display = "")),
            "" === r.style.display &&
              se(r) &&
              (l[c] =
                ((u = a = o = void 0),
                (a = (i = r).ownerDocument),
                (s = i.nodeName),
                (u = ce[s]) ||
                  ((o = a.body.appendChild(a.createElement(s))),
                  (u = k.css(o, "display")),
                  o.parentNode.removeChild(o),
                  "none" === u && (u = "block"),
                  (ce[s] = u)))))
          : "none" !== n && ((l[c] = "none"), Q.set(r, "display", n)));
    for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
    return e;
  }
  k.fn.extend({
    show: function () {
      return fe(this, !0);
    },
    hide: function () {
      return fe(this);
    },
    toggle: function (e) {
      return "boolean" == typeof e
        ? e
          ? this.show()
          : this.hide()
        : this.each(function () {
            se(this) ? k(this).show() : k(this).hide();
          });
    },
  });
  var pe = /^(?:checkbox|radio)$/i,
    de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    he = /^$|^module$|\/(?:java|ecma)script/i,
    ge = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
  function ve(e, t) {
    var n;
    return (
      (n =
        "undefined" != typeof e.getElementsByTagName
          ? e.getElementsByTagName(t || "*")
          : "undefined" != typeof e.querySelectorAll
          ? e.querySelectorAll(t || "*")
          : []),
      void 0 === t || (t && A(e, t)) ? k.merge([e], n) : n
    );
  }
  function ye(e, t) {
    for (var n = 0, r = e.length; n < r; n++)
      Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"));
  }
  (ge.optgroup = ge.option),
    (ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead),
    (ge.th = ge.td);
  var me,
    xe,
    be = /<|&#?\w+;/;
  function we(e, t, n, r, i) {
    for (
      var o,
        a,
        s,
        u,
        l,
        c,
        f = t.createDocumentFragment(),
        p = [],
        d = 0,
        h = e.length;
      d < h;
      d++
    )
      if ((o = e[d]) || 0 === o)
        if ("object" === w(o)) k.merge(p, o.nodeType ? [o] : o);
        else if (be.test(o)) {
          (a = a || f.appendChild(t.createElement("div"))),
            (s = (de.exec(o) || ["", ""])[1].toLowerCase()),
            (u = ge[s] || ge._default),
            (a.innerHTML = u[1] + k.htmlPrefilter(o) + u[2]),
            (c = u[0]);
          while (c--) a = a.lastChild;
          k.merge(p, a.childNodes), ((a = f.firstChild).textContent = "");
        } else p.push(t.createTextNode(o));
    (f.textContent = ""), (d = 0);
    while ((o = p[d++]))
      if (r && -1 < k.inArray(o, r)) i && i.push(o);
      else if (
        ((l = oe(o)), (a = ve(f.appendChild(o), "script")), l && ye(a), n)
      ) {
        c = 0;
        while ((o = a[c++])) he.test(o.type || "") && n.push(o);
      }
    return f;
  }
  (me = E.createDocumentFragment().appendChild(E.createElement("div"))),
    (xe = E.createElement("input")).setAttribute("type", "radio"),
    xe.setAttribute("checked", "checked"),
    xe.setAttribute("name", "t"),
    me.appendChild(xe),
    (y.checkClone = me.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (me.innerHTML = "<textarea>x</textarea>"),
    (y.noCloneChecked = !!me.cloneNode(!0).lastChild.defaultValue);
  var Te = /^key/,
    Ce = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    Ee = /^([^.]*)(?:\.(.+)|)/;
  function ke() {
    return !0;
  }
  function Se() {
    return !1;
  }
  function Ne(e, t) {
    return (
      (e ===
        (function () {
          try {
            return E.activeElement;
          } catch (e) {}
        })()) ==
      ("focus" === t)
    );
  }
  function Ae(e, t, n, r, i, o) {
    var a, s;
    if ("object" == typeof t) {
      for (s in ("string" != typeof n && ((r = r || n), (n = void 0)), t))
        Ae(e, s, n, r, t[s], o);
      return e;
    }
    if (
      (null == r && null == i
        ? ((i = n), (r = n = void 0))
        : null == i &&
          ("string" == typeof n
            ? ((i = r), (r = void 0))
            : ((i = r), (r = n), (n = void 0))),
      !1 === i)
    )
      i = Se;
    else if (!i) return e;
    return (
      1 === o &&
        ((a = i),
        ((i = function (e) {
          return k().off(e), a.apply(this, arguments);
        }).guid = a.guid || (a.guid = k.guid++))),
      e.each(function () {
        k.event.add(this, t, i, r, n);
      })
    );
  }
  function De(e, i, o) {
    o
      ? (Q.set(e, i, !1),
        k.event.add(e, i, {
          namespace: !1,
          handler: function (e) {
            var t,
              n,
              r = Q.get(this, i);
            if (1 & e.isTrigger && this[i]) {
              if (r.length)
                (k.event.special[i] || {}).delegateType && e.stopPropagation();
              else if (
                ((r = s.call(arguments)),
                Q.set(this, i, r),
                (t = o(this, i)),
                this[i](),
                r !== (n = Q.get(this, i)) || t ? Q.set(this, i, !1) : (n = {}),
                r !== n)
              )
                return (
                  e.stopImmediatePropagation(), e.preventDefault(), n.value
                );
            } else
              r.length &&
                (Q.set(this, i, {
                  value: k.event.trigger(
                    k.extend(r[0], k.Event.prototype),
                    r.slice(1),
                    this
                  ),
                }),
                e.stopImmediatePropagation());
          },
        }))
      : void 0 === Q.get(e, i) && k.event.add(e, i, ke);
  }
  (k.event = {
    global: {},
    add: function (t, e, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        v = Q.get(t);
      if (v) {
        n.handler && ((n = (o = n).handler), (i = o.selector)),
          i && k.find.matchesSelector(ie, i),
          n.guid || (n.guid = k.guid++),
          (u = v.events) || (u = v.events = {}),
          (a = v.handle) ||
            (a = v.handle =
              function (e) {
                return "undefined" != typeof k && k.event.triggered !== e.type
                  ? k.event.dispatch.apply(t, arguments)
                  : void 0;
              }),
          (l = (e = (e || "").match(R) || [""]).length);
        while (l--)
          (d = g = (s = Ee.exec(e[l]) || [])[1]),
            (h = (s[2] || "").split(".").sort()),
            d &&
              ((f = k.event.special[d] || {}),
              (d = (i ? f.delegateType : f.bindType) || d),
              (f = k.event.special[d] || {}),
              (c = k.extend(
                {
                  type: d,
                  origType: g,
                  data: r,
                  handler: n,
                  guid: n.guid,
                  selector: i,
                  needsContext: i && k.expr.match.needsContext.test(i),
                  namespace: h.join("."),
                },
                o
              )),
              (p = u[d]) ||
                (((p = u[d] = []).delegateCount = 0),
                (f.setup && !1 !== f.setup.call(t, r, h, a)) ||
                  (t.addEventListener && t.addEventListener(d, a))),
              f.add &&
                (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)),
              i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
              (k.event.global[d] = !0));
      }
    },
    remove: function (e, t, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        v = Q.hasData(e) && Q.get(e);
      if (v && (u = v.events)) {
        l = (t = (t || "").match(R) || [""]).length;
        while (l--)
          if (
            ((d = g = (s = Ee.exec(t[l]) || [])[1]),
            (h = (s[2] || "").split(".").sort()),
            d)
          ) {
            (f = k.event.special[d] || {}),
              (p = u[(d = (r ? f.delegateType : f.bindType) || d)] || []),
              (s =
                s[2] &&
                new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")),
              (a = o = p.length);
            while (o--)
              (c = p[o]),
                (!i && g !== c.origType) ||
                  (n && n.guid !== c.guid) ||
                  (s && !s.test(c.namespace)) ||
                  (r && r !== c.selector && ("**" !== r || !c.selector)) ||
                  (p.splice(o, 1),
                  c.selector && p.delegateCount--,
                  f.remove && f.remove.call(e, c));
            a &&
              !p.length &&
              ((f.teardown && !1 !== f.teardown.call(e, h, v.handle)) ||
                k.removeEvent(e, d, v.handle),
              delete u[d]);
          } else for (d in u) k.event.remove(e, d + t[l], n, r, !0);
        k.isEmptyObject(u) && Q.remove(e, "handle events");
      }
    },
    dispatch: function (e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s = k.event.fix(e),
        u = new Array(arguments.length),
        l = (Q.get(this, "events") || {})[s.type] || [],
        c = k.event.special[s.type] || {};
      for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
      if (
        ((s.delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, s))
      ) {
        (a = k.event.handlers.call(this, s, l)), (t = 0);
        while ((i = a[t++]) && !s.isPropagationStopped()) {
          (s.currentTarget = i.elem), (n = 0);
          while ((o = i.handlers[n++]) && !s.isImmediatePropagationStopped())
            (s.rnamespace &&
              !1 !== o.namespace &&
              !s.rnamespace.test(o.namespace)) ||
              ((s.handleObj = o),
              (s.data = o.data),
              void 0 !==
                (r = (
                  (k.event.special[o.origType] || {}).handle || o.handler
                ).apply(i.elem, u)) &&
                !1 === (s.result = r) &&
                (s.preventDefault(), s.stopPropagation()));
        }
        return c.postDispatch && c.postDispatch.call(this, s), s.result;
      }
    },
    handlers: function (e, t) {
      var n,
        r,
        i,
        o,
        a,
        s = [],
        u = t.delegateCount,
        l = e.target;
      if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
        for (; l !== this; l = l.parentNode || this)
          if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
            for (o = [], a = {}, n = 0; n < u; n++)
              void 0 === a[(i = (r = t[n]).selector + " ")] &&
                (a[i] = r.needsContext
                  ? -1 < k(i, this).index(l)
                  : k.find(i, this, null, [l]).length),
                a[i] && o.push(r);
            o.length && s.push({ elem: l, handlers: o });
          }
      return (
        (l = this), u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s
      );
    },
    addProp: function (t, e) {
      Object.defineProperty(k.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: m(e)
          ? function () {
              if (this.originalEvent) return e(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[t];
            },
        set: function (e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e,
          });
        },
      });
    },
    fix: function (e) {
      return e[k.expando] ? e : new k.Event(e);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (e) {
          var t = this || e;
          return (
            pe.test(t.type) && t.click && A(t, "input") && De(t, "click", ke),
            !1
          );
        },
        trigger: function (e) {
          var t = this || e;
          return (
            pe.test(t.type) && t.click && A(t, "input") && De(t, "click"), !0
          );
        },
        _default: function (e) {
          var t = e.target;
          return (
            (pe.test(t.type) &&
              t.click &&
              A(t, "input") &&
              Q.get(t, "click")) ||
            A(t, "a")
          );
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
  }),
    (k.removeEvent = function (e, t, n) {
      e.removeEventListener && e.removeEventListener(t, n);
    }),
    (k.Event = function (e, t) {
      if (!(this instanceof k.Event)) return new k.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            (void 0 === e.defaultPrevented && !1 === e.returnValue)
              ? ke
              : Se),
          (this.target =
            e.target && 3 === e.target.nodeType
              ? e.target.parentNode
              : e.target),
          (this.currentTarget = e.currentTarget),
          (this.relatedTarget = e.relatedTarget))
        : (this.type = e),
        t && k.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || Date.now()),
        (this[k.expando] = !0);
    }),
    (k.Event.prototype = {
      constructor: k.Event,
      isDefaultPrevented: Se,
      isPropagationStopped: Se,
      isImmediatePropagationStopped: Se,
      isSimulated: !1,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = ke),
          e && !this.isSimulated && e.preventDefault();
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = ke),
          e && !this.isSimulated && e.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = ke),
          e && !this.isSimulated && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    k.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (e) {
          var t = e.button;
          return null == e.which && Te.test(e.type)
            ? null != e.charCode
              ? e.charCode
              : e.keyCode
            : !e.which && void 0 !== t && Ce.test(e.type)
            ? 1 & t
              ? 1
              : 2 & t
              ? 3
              : 4 & t
              ? 2
              : 0
            : e.which;
        },
      },
      k.event.addProp
    ),
    k.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
      k.event.special[e] = {
        setup: function () {
          return De(this, e, Ne), !1;
        },
        trigger: function () {
          return De(this, e), !0;
        },
        delegateType: t,
      };
    }),
    k.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (e, i) {
        k.event.special[e] = {
          delegateType: i,
          bindType: i,
          handle: function (e) {
            var t,
              n = e.relatedTarget,
              r = e.handleObj;
            return (
              (n && (n === this || k.contains(this, n))) ||
                ((e.type = r.origType),
                (t = r.handler.apply(this, arguments)),
                (e.type = i)),
              t
            );
          },
        };
      }
    ),
    k.fn.extend({
      on: function (e, t, n, r) {
        return Ae(this, e, t, n, r);
      },
      one: function (e, t, n, r) {
        return Ae(this, e, t, n, r, 1);
      },
      off: function (e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj)
          return (
            (r = e.handleObj),
            k(e.delegateTarget).off(
              r.namespace ? r.origType + "." + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ("object" == typeof e) {
          for (i in e) this.off(i, t, e[i]);
          return this;
        }
        return (
          (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
          !1 === n && (n = Se),
          this.each(function () {
            k.event.remove(this, e, n, t);
          })
        );
      },
    });
  var je =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
    qe = /<script|<style|<link/i,
    Le = /checked\s*(?:[^=]|=\s*.checked.)/i,
    He = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function Oe(e, t) {
    return (
      (A(e, "table") &&
        A(11 !== t.nodeType ? t : t.firstChild, "tr") &&
        k(e).children("tbody")[0]) ||
      e
    );
  }
  function Pe(e) {
    return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
  }
  function Re(e) {
    return (
      "true/" === (e.type || "").slice(0, 5)
        ? (e.type = e.type.slice(5))
        : e.removeAttribute("type"),
      e
    );
  }
  function Me(e, t) {
    var n, r, i, o, a, s, u, l;
    if (1 === t.nodeType) {
      if (
        Q.hasData(e) &&
        ((o = Q.access(e)), (a = Q.set(t, o)), (l = o.events))
      )
        for (i in (delete a.handle, (a.events = {}), l))
          for (n = 0, r = l[i].length; n < r; n++) k.event.add(t, i, l[i][n]);
      J.hasData(e) && ((s = J.access(e)), (u = k.extend({}, s)), J.set(t, u));
    }
  }
  function Ie(n, r, i, o) {
    r = g.apply([], r);
    var e,
      t,
      a,
      s,
      u,
      l,
      c = 0,
      f = n.length,
      p = f - 1,
      d = r[0],
      h = m(d);
    if (h || (1 < f && "string" == typeof d && !y.checkClone && Le.test(d)))
      return n.each(function (e) {
        var t = n.eq(e);
        h && (r[0] = d.call(this, e, t.html())), Ie(t, r, i, o);
      });
    if (
      f &&
      ((t = (e = we(r, n[0].ownerDocument, !1, n, o)).firstChild),
      1 === e.childNodes.length && (e = t),
      t || o)
    ) {
      for (s = (a = k.map(ve(e, "script"), Pe)).length; c < f; c++)
        (u = e),
          c !== p &&
            ((u = k.clone(u, !0, !0)), s && k.merge(a, ve(u, "script"))),
          i.call(n[c], u, c);
      if (s)
        for (l = a[a.length - 1].ownerDocument, k.map(a, Re), c = 0; c < s; c++)
          (u = a[c]),
            he.test(u.type || "") &&
              !Q.access(u, "globalEval") &&
              k.contains(l, u) &&
              (u.src && "module" !== (u.type || "").toLowerCase()
                ? k._evalUrl &&
                  !u.noModule &&
                  k._evalUrl(u.src, {
                    nonce: u.nonce || u.getAttribute("nonce"),
                  })
                : b(u.textContent.replace(He, ""), u, l));
    }
    return n;
  }
  function We(e, t, n) {
    for (var r, i = t ? k.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
      n || 1 !== r.nodeType || k.cleanData(ve(r)),
        r.parentNode &&
          (n && oe(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
    return e;
  }
  k.extend({
    htmlPrefilter: function (e) {
      return e.replace(je, "<$1></$2>");
    },
    clone: function (e, t, n) {
      var r,
        i,
        o,
        a,
        s,
        u,
        l,
        c = e.cloneNode(!0),
        f = oe(e);
      if (
        !(
          y.noCloneChecked ||
          (1 !== e.nodeType && 11 !== e.nodeType) ||
          k.isXMLDoc(e)
        )
      )
        for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++)
          (s = o[r]),
            (u = a[r]),
            void 0,
            "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type)
              ? (u.checked = s.checked)
              : ("input" !== l && "textarea" !== l) ||
                (u.defaultValue = s.defaultValue);
      if (t)
        if (n)
          for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++)
            Me(o[r], a[r]);
        else Me(e, c);
      return (
        0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c
      );
    },
    cleanData: function (e) {
      for (var t, n, r, i = k.event.special, o = 0; void 0 !== (n = e[o]); o++)
        if (G(n)) {
          if ((t = n[Q.expando])) {
            if (t.events)
              for (r in t.events)
                i[r] ? k.event.remove(n, r) : k.removeEvent(n, r, t.handle);
            n[Q.expando] = void 0;
          }
          n[J.expando] && (n[J.expando] = void 0);
        }
    },
  }),
    k.fn.extend({
      detach: function (e) {
        return We(this, e, !0);
      },
      remove: function (e) {
        return We(this, e);
      },
      text: function (e) {
        return _(
          this,
          function (e) {
            return void 0 === e
              ? k.text(this)
              : this.empty().each(function () {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = e);
                });
          },
          null,
          e,
          arguments.length
        );
      },
      append: function () {
        return Ie(this, arguments, function (e) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            Oe(this, e).appendChild(e);
        });
      },
      prepend: function () {
        return Ie(this, arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = Oe(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return Ie(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return Ie(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++)
          1 === e.nodeType && (k.cleanData(ve(e, !1)), (e.textContent = ""));
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return k.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return _(
          this,
          function (e) {
            var t = this[0] || {},
              n = 0,
              r = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if (
              "string" == typeof e &&
              !qe.test(e) &&
              !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]
            ) {
              e = k.htmlPrefilter(e);
              try {
                for (; n < r; n++)
                  1 === (t = this[n] || {}).nodeType &&
                    (k.cleanData(ve(t, !1)), (t.innerHTML = e));
                t = 0;
              } catch (e) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function () {
        var n = [];
        return Ie(
          this,
          arguments,
          function (e) {
            var t = this.parentNode;
            k.inArray(this, n) < 0 &&
              (k.cleanData(ve(this)), t && t.replaceChild(e, this));
          },
          n
        );
      },
    }),
    k.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, a) {
        k.fn[e] = function (e) {
          for (var t, n = [], r = k(e), i = r.length - 1, o = 0; o <= i; o++)
            (t = o === i ? this : this.clone(!0)),
              k(r[o])[a](t),
              u.apply(n, t.get());
          return this.pushStack(n);
        };
      }
    );
  var $e = new RegExp("^(" + te + ")(?!px)[a-z%]+$", "i"),
    Fe = function (e) {
      var t = e.ownerDocument.defaultView;
      return (t && t.opener) || (t = C), t.getComputedStyle(e);
    },
    Be = new RegExp(re.join("|"), "i");
  function _e(e, t, n) {
    var r,
      i,
      o,
      a,
      s = e.style;
    return (
      (n = n || Fe(e)) &&
        ("" !== (a = n.getPropertyValue(t) || n[t]) ||
          oe(e) ||
          (a = k.style(e, t)),
        !y.pixelBoxStyles() &&
          $e.test(a) &&
          Be.test(t) &&
          ((r = s.width),
          (i = s.minWidth),
          (o = s.maxWidth),
          (s.minWidth = s.maxWidth = s.width = a),
          (a = n.width),
          (s.width = r),
          (s.minWidth = i),
          (s.maxWidth = o))),
      void 0 !== a ? a + "" : a
    );
  }
  function ze(e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      },
    };
  }
  !(function () {
    function e() {
      if (u) {
        (s.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
          (u.style.cssText =
            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
          ie.appendChild(s).appendChild(u);
        var e = C.getComputedStyle(u);
        (n = "1%" !== e.top),
          (a = 12 === t(e.marginLeft)),
          (u.style.right = "60%"),
          (o = 36 === t(e.right)),
          (r = 36 === t(e.width)),
          (u.style.position = "absolute"),
          (i = 12 === t(u.offsetWidth / 3)),
          ie.removeChild(s),
          (u = null);
      }
    }
    function t(e) {
      return Math.round(parseFloat(e));
    }
    var n,
      r,
      i,
      o,
      a,
      s = E.createElement("div"),
      u = E.createElement("div");
    u.style &&
      ((u.style.backgroundClip = "content-box"),
      (u.cloneNode(!0).style.backgroundClip = ""),
      (y.clearCloneStyle = "content-box" === u.style.backgroundClip),
      k.extend(y, {
        boxSizingReliable: function () {
          return e(), r;
        },
        pixelBoxStyles: function () {
          return e(), o;
        },
        pixelPosition: function () {
          return e(), n;
        },
        reliableMarginLeft: function () {
          return e(), a;
        },
        scrollboxSize: function () {
          return e(), i;
        },
      }));
  })();
  var Ue = ["Webkit", "Moz", "ms"],
    Xe = E.createElement("div").style,
    Ve = {};
  function Ge(e) {
    var t = k.cssProps[e] || Ve[e];
    return (
      t ||
      (e in Xe
        ? e
        : (Ve[e] =
            (function (e) {
              var t = e[0].toUpperCase() + e.slice(1),
                n = Ue.length;
              while (n--) if ((e = Ue[n] + t) in Xe) return e;
            })(e) || e))
    );
  }
  var Ye = /^(none|table(?!-c[ea]).+)/,
    Qe = /^--/,
    Je = { position: "absolute", visibility: "hidden", display: "block" },
    Ke = { letterSpacing: "0", fontWeight: "400" };
  function Ze(e, t, n) {
    var r = ne.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }
  function et(e, t, n, r, i, o) {
    var a = "width" === t ? 1 : 0,
      s = 0,
      u = 0;
    if (n === (r ? "border" : "content")) return 0;
    for (; a < 4; a += 2)
      "margin" === n && (u += k.css(e, n + re[a], !0, i)),
        r
          ? ("content" === n && (u -= k.css(e, "padding" + re[a], !0, i)),
            "margin" !== n &&
              (u -= k.css(e, "border" + re[a] + "Width", !0, i)))
          : ((u += k.css(e, "padding" + re[a], !0, i)),
            "padding" !== n
              ? (u += k.css(e, "border" + re[a] + "Width", !0, i))
              : (s += k.css(e, "border" + re[a] + "Width", !0, i)));
    return (
      !r &&
        0 <= o &&
        (u +=
          Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - 0.5
            )
          ) || 0),
      u
    );
  }
  function tt(e, t, n) {
    var r = Fe(e),
      i =
        (!y.boxSizingReliable() || n) &&
        "border-box" === k.css(e, "boxSizing", !1, r),
      o = i,
      a = _e(e, t, r),
      s = "offset" + t[0].toUpperCase() + t.slice(1);
    if ($e.test(a)) {
      if (!n) return a;
      a = "auto";
    }
    return (
      ((!y.boxSizingReliable() && i) ||
        "auto" === a ||
        (!parseFloat(a) && "inline" === k.css(e, "display", !1, r))) &&
        e.getClientRects().length &&
        ((i = "border-box" === k.css(e, "boxSizing", !1, r)),
        (o = s in e) && (a = e[s])),
      (a = parseFloat(a) || 0) +
        et(e, t, n || (i ? "border" : "content"), o, r, a) +
        "px"
    );
  }
  function nt(e, t, n, r, i) {
    return new nt.prototype.init(e, t, n, r, i);
  }
  k.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = _e(e, "opacity");
            return "" === n ? "1" : n;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: {},
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
          o,
          a,
          s = V(t),
          u = Qe.test(t),
          l = e.style;
        if (
          (u || (t = Ge(s)), (a = k.cssHooks[t] || k.cssHooks[s]), void 0 === n)
        )
          return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
        "string" === (o = typeof n) &&
          (i = ne.exec(n)) &&
          i[1] &&
          ((n = le(e, t, i)), (o = "number")),
          null != n &&
            n == n &&
            ("number" !== o ||
              u ||
              (n += (i && i[3]) || (k.cssNumber[s] ? "" : "px")),
            y.clearCloneStyle ||
              "" !== n ||
              0 !== t.indexOf("background") ||
              (l[t] = "inherit"),
            (a && "set" in a && void 0 === (n = a.set(e, n, r))) ||
              (u ? l.setProperty(t, n) : (l[t] = n)));
      }
    },
    css: function (e, t, n, r) {
      var i,
        o,
        a,
        s = V(t);
      return (
        Qe.test(t) || (t = Ge(s)),
        (a = k.cssHooks[t] || k.cssHooks[s]) &&
          "get" in a &&
          (i = a.get(e, !0, n)),
        void 0 === i && (i = _e(e, t, r)),
        "normal" === i && t in Ke && (i = Ke[t]),
        "" === n || n
          ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
          : i
      );
    },
  }),
    k.each(["height", "width"], function (e, u) {
      k.cssHooks[u] = {
        get: function (e, t, n) {
          if (t)
            return !Ye.test(k.css(e, "display")) ||
              (e.getClientRects().length && e.getBoundingClientRect().width)
              ? tt(e, u, n)
              : ue(e, Je, function () {
                  return tt(e, u, n);
                });
        },
        set: function (e, t, n) {
          var r,
            i = Fe(e),
            o = !y.scrollboxSize() && "absolute" === i.position,
            a = (o || n) && "border-box" === k.css(e, "boxSizing", !1, i),
            s = n ? et(e, u, n, a, i) : 0;
          return (
            a &&
              o &&
              (s -= Math.ceil(
                e["offset" + u[0].toUpperCase() + u.slice(1)] -
                  parseFloat(i[u]) -
                  et(e, u, "border", !1, i) -
                  0.5
              )),
            s &&
              (r = ne.exec(t)) &&
              "px" !== (r[3] || "px") &&
              ((e.style[u] = t), (t = k.css(e, u))),
            Ze(0, t, s)
          );
        },
      };
    }),
    (k.cssHooks.marginLeft = ze(y.reliableMarginLeft, function (e, t) {
      if (t)
        return (
          (parseFloat(_e(e, "marginLeft")) ||
            e.getBoundingClientRect().left -
              ue(e, { marginLeft: 0 }, function () {
                return e.getBoundingClientRect().left;
              })) + "px"
        );
    })),
    k.each({ margin: "", padding: "", border: "Width" }, function (i, o) {
      (k.cssHooks[i + o] = {
        expand: function (e) {
          for (
            var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e];
            t < 4;
            t++
          )
            n[i + re[t] + o] = r[t] || r[t - 2] || r[0];
          return n;
        },
      }),
        "margin" !== i && (k.cssHooks[i + o].set = Ze);
    }),
    k.fn.extend({
      css: function (e, t) {
        return _(
          this,
          function (e, t, n) {
            var r,
              i,
              o = {},
              a = 0;
            if (Array.isArray(t)) {
              for (r = Fe(e), i = t.length; a < i; a++)
                o[t[a]] = k.css(e, t[a], !1, r);
              return o;
            }
            return void 0 !== n ? k.style(e, t, n) : k.css(e, t);
          },
          e,
          t,
          1 < arguments.length
        );
      },
    }),
    (((k.Tween = nt).prototype = {
      constructor: nt,
      init: function (e, t, n, r, i, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = i || k.easing._default),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = o || (k.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = nt.propHooks[this.prop];
        return e && e.get ? e.get(this) : nt.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = nt.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = t =
                k.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : nt.propHooks._default.set(this),
          this
        );
      },
    }).init.prototype = nt.prototype),
    ((nt.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return 1 !== e.elem.nodeType ||
            (null != e.elem[e.prop] && null == e.elem.style[e.prop])
            ? e.elem[e.prop]
            : (t = k.css(e.elem, e.prop, "")) && "auto" !== t
            ? t
            : 0;
        },
        set: function (e) {
          k.fx.step[e.prop]
            ? k.fx.step[e.prop](e)
            : 1 !== e.elem.nodeType ||
              (!k.cssHooks[e.prop] && null == e.elem.style[Ge(e.prop)])
            ? (e.elem[e.prop] = e.now)
            : k.style(e.elem, e.prop, e.now + e.unit);
        },
      },
    }).scrollTop = nt.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    (k.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (k.fx = nt.prototype.init),
    (k.fx.step = {});
  var rt,
    it,
    ot,
    at,
    st = /^(?:toggle|show|hide)$/,
    ut = /queueHooks$/;
  function lt() {
    it &&
      (!1 === E.hidden && C.requestAnimationFrame
        ? C.requestAnimationFrame(lt)
        : C.setTimeout(lt, k.fx.interval),
      k.fx.tick());
  }
  function ct() {
    return (
      C.setTimeout(function () {
        rt = void 0;
      }),
      (rt = Date.now())
    );
  }
  function ft(e, t) {
    var n,
      r = 0,
      i = { height: e };
    for (t = t ? 1 : 0; r < 4; r += 2 - t)
      i["margin" + (n = re[r])] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i;
  }
  function pt(e, t, n) {
    for (
      var r,
        i = (dt.tweeners[t] || []).concat(dt.tweeners["*"]),
        o = 0,
        a = i.length;
      o < a;
      o++
    )
      if ((r = i[o].call(n, t, e))) return r;
  }
  function dt(o, e, t) {
    var n,
      a,
      r = 0,
      i = dt.prefilters.length,
      s = k.Deferred().always(function () {
        delete u.elem;
      }),
      u = function () {
        if (a) return !1;
        for (
          var e = rt || ct(),
            t = Math.max(0, l.startTime + l.duration - e),
            n = 1 - (t / l.duration || 0),
            r = 0,
            i = l.tweens.length;
          r < i;
          r++
        )
          l.tweens[r].run(n);
        return (
          s.notifyWith(o, [l, n, t]),
          n < 1 && i
            ? t
            : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
        );
      },
      l = s.promise({
        elem: o,
        props: k.extend({}, e),
        opts: k.extend(!0, { specialEasing: {}, easing: k.easing._default }, t),
        originalProperties: e,
        originalOptions: t,
        startTime: rt || ct(),
        duration: t.duration,
        tweens: [],
        createTween: function (e, t) {
          var n = k.Tween(
            o,
            l.opts,
            e,
            t,
            l.opts.specialEasing[e] || l.opts.easing
          );
          return l.tweens.push(n), n;
        },
        stop: function (e) {
          var t = 0,
            n = e ? l.tweens.length : 0;
          if (a) return this;
          for (a = !0; t < n; t++) l.tweens[t].run(1);
          return (
            e
              ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e]))
              : s.rejectWith(o, [l, e]),
            this
          );
        },
      }),
      c = l.props;
    for (
      !(function (e, t) {
        var n, r, i, o, a;
        for (n in e)
          if (
            ((i = t[(r = V(n))]),
            (o = e[n]),
            Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
            n !== r && ((e[r] = o), delete e[n]),
            (a = k.cssHooks[r]) && ("expand" in a))
          )
            for (n in ((o = a.expand(o)), delete e[r], o))
              (n in e) || ((e[n] = o[n]), (t[n] = i));
          else t[r] = i;
      })(c, l.opts.specialEasing);
      r < i;
      r++
    )
      if ((n = dt.prefilters[r].call(l, o, c, l.opts)))
        return (
          m(n.stop) &&
            (k._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
          n
        );
    return (
      k.map(c, pt, l),
      m(l.opts.start) && l.opts.start.call(o, l),
      l
        .progress(l.opts.progress)
        .done(l.opts.done, l.opts.complete)
        .fail(l.opts.fail)
        .always(l.opts.always),
      k.fx.timer(k.extend(u, { elem: o, anim: l, queue: l.opts.queue })),
      l
    );
  }
  (k.Animation = k.extend(dt, {
    tweeners: {
      "*": [
        function (e, t) {
          var n = this.createTween(e, t);
          return le(n.elem, e, ne.exec(t), n), n;
        },
      ],
    },
    tweener: function (e, t) {
      m(e) ? ((t = e), (e = ["*"])) : (e = e.match(R));
      for (var n, r = 0, i = e.length; r < i; r++)
        (n = e[r]),
          (dt.tweeners[n] = dt.tweeners[n] || []),
          dt.tweeners[n].unshift(t);
    },
    prefilters: [
      function (e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = "width" in t || "height" in t,
          p = this,
          d = {},
          h = e.style,
          g = e.nodeType && se(e),
          v = Q.get(e, "fxshow");
        for (r in (n.queue ||
          (null == (a = k._queueHooks(e, "fx")).unqueued &&
            ((a.unqueued = 0),
            (s = a.empty.fire),
            (a.empty.fire = function () {
              a.unqueued || s();
            })),
          a.unqueued++,
          p.always(function () {
            p.always(function () {
              a.unqueued--, k.queue(e, "fx").length || a.empty.fire();
            });
          })),
        t))
          if (((i = t[r]), st.test(i))) {
            if (
              (delete t[r],
              (o = o || "toggle" === i),
              i === (g ? "hide" : "show"))
            ) {
              if ("show" !== i || !v || void 0 === v[r]) continue;
              g = !0;
            }
            d[r] = (v && v[r]) || k.style(e, r);
          }
        if ((u = !k.isEmptyObject(t)) || !k.isEmptyObject(d))
          for (r in (f &&
            1 === e.nodeType &&
            ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
            null == (l = v && v.display) && (l = Q.get(e, "display")),
            "none" === (c = k.css(e, "display")) &&
              (l
                ? (c = l)
                : (fe([e], !0),
                  (l = e.style.display || l),
                  (c = k.css(e, "display")),
                  fe([e]))),
            ("inline" === c || ("inline-block" === c && null != l)) &&
              "none" === k.css(e, "float") &&
              (u ||
                (p.done(function () {
                  h.display = l;
                }),
                null == l && ((c = h.display), (l = "none" === c ? "" : c))),
              (h.display = "inline-block"))),
          n.overflow &&
            ((h.overflow = "hidden"),
            p.always(function () {
              (h.overflow = n.overflow[0]),
                (h.overflowX = n.overflow[1]),
                (h.overflowY = n.overflow[2]);
            })),
          (u = !1),
          d))
            u ||
              (v
                ? "hidden" in v && (g = v.hidden)
                : (v = Q.access(e, "fxshow", { display: l })),
              o && (v.hidden = !g),
              g && fe([e], !0),
              p.done(function () {
                for (r in (g || fe([e]), Q.remove(e, "fxshow"), d))
                  k.style(e, r, d[r]);
              })),
              (u = pt(g ? v[r] : 0, r, p)),
              r in v ||
                ((v[r] = u.start), g && ((u.end = u.start), (u.start = 0)));
      },
    ],
    prefilter: function (e, t) {
      t ? dt.prefilters.unshift(e) : dt.prefilters.push(e);
    },
  })),
    (k.speed = function (e, t, n) {
      var r =
        e && "object" == typeof e
          ? k.extend({}, e)
          : {
              complete: n || (!n && t) || (m(e) && e),
              duration: e,
              easing: (n && t) || (t && !m(t) && t),
            };
      return (
        k.fx.off
          ? (r.duration = 0)
          : "number" != typeof r.duration &&
            (r.duration in k.fx.speeds
              ? (r.duration = k.fx.speeds[r.duration])
              : (r.duration = k.fx.speeds._default)),
        (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
        (r.old = r.complete),
        (r.complete = function () {
          m(r.old) && r.old.call(this), r.queue && k.dequeue(this, r.queue);
        }),
        r
      );
    }),
    k.fn.extend({
      fadeTo: function (e, t, n, r) {
        return this.filter(se)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, r);
      },
      animate: function (t, e, n, r) {
        var i = k.isEmptyObject(t),
          o = k.speed(e, n, r),
          a = function () {
            var e = dt(this, k.extend({}, t), o);
            (i || Q.get(this, "finish")) && e.stop(!0);
          };
        return (
          (a.finish = a),
          i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        );
      },
      stop: function (i, e, o) {
        var a = function (e) {
          var t = e.stop;
          delete e.stop, t(o);
        };
        return (
          "string" != typeof i && ((o = e), (e = i), (i = void 0)),
          e && !1 !== i && this.queue(i || "fx", []),
          this.each(function () {
            var e = !0,
              t = null != i && i + "queueHooks",
              n = k.timers,
              r = Q.get(this);
            if (t) r[t] && r[t].stop && a(r[t]);
            else for (t in r) r[t] && r[t].stop && ut.test(t) && a(r[t]);
            for (t = n.length; t--; )
              n[t].elem !== this ||
                (null != i && n[t].queue !== i) ||
                (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
            (!e && o) || k.dequeue(this, i);
          })
        );
      },
      finish: function (a) {
        return (
          !1 !== a && (a = a || "fx"),
          this.each(function () {
            var e,
              t = Q.get(this),
              n = t[a + "queue"],
              r = t[a + "queueHooks"],
              i = k.timers,
              o = n ? n.length : 0;
            for (
              t.finish = !0,
                k.queue(this, a, []),
                r && r.stop && r.stop.call(this, !0),
                e = i.length;
              e--;

            )
              i[e].elem === this &&
                i[e].queue === a &&
                (i[e].anim.stop(!0), i.splice(e, 1));
            for (e = 0; e < o; e++)
              n[e] && n[e].finish && n[e].finish.call(this);
            delete t.finish;
          })
        );
      },
    }),
    k.each(["toggle", "show", "hide"], function (e, r) {
      var i = k.fn[r];
      k.fn[r] = function (e, t, n) {
        return null == e || "boolean" == typeof e
          ? i.apply(this, arguments)
          : this.animate(ft(r, !0), e, t, n);
      };
    }),
    k.each(
      {
        slideDown: ft("show"),
        slideUp: ft("hide"),
        slideToggle: ft("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, r) {
        k.fn[e] = function (e, t, n) {
          return this.animate(r, e, t, n);
        };
      }
    ),
    (k.timers = []),
    (k.fx.tick = function () {
      var e,
        t = 0,
        n = k.timers;
      for (rt = Date.now(); t < n.length; t++)
        (e = n[t])() || n[t] !== e || n.splice(t--, 1);
      n.length || k.fx.stop(), (rt = void 0);
    }),
    (k.fx.timer = function (e) {
      k.timers.push(e), k.fx.start();
    }),
    (k.fx.interval = 13),
    (k.fx.start = function () {
      it || ((it = !0), lt());
    }),
    (k.fx.stop = function () {
      it = null;
    }),
    (k.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (k.fn.delay = function (r, e) {
      return (
        (r = (k.fx && k.fx.speeds[r]) || r),
        (e = e || "fx"),
        this.queue(e, function (e, t) {
          var n = C.setTimeout(e, r);
          t.stop = function () {
            C.clearTimeout(n);
          };
        })
      );
    }),
    (ot = E.createElement("input")),
    (at = E.createElement("select").appendChild(E.createElement("option"))),
    (ot.type = "checkbox"),
    (y.checkOn = "" !== ot.value),
    (y.optSelected = at.selected),
    ((ot = E.createElement("input")).value = "t"),
    (ot.type = "radio"),
    (y.radioValue = "t" === ot.value);
  var ht,
    gt = k.expr.attrHandle;
  k.fn.extend({
    attr: function (e, t) {
      return _(this, k.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function (e) {
      return this.each(function () {
        k.removeAttr(this, e);
      });
    },
  }),
    k.extend({
      attr: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return "undefined" == typeof e.getAttribute
            ? k.prop(e, t, n)
            : ((1 === o && k.isXMLDoc(e)) ||
                (i =
                  k.attrHooks[t.toLowerCase()] ||
                  (k.expr.match.bool.test(t) ? ht : void 0)),
              void 0 !== n
                ? null === n
                  ? void k.removeAttr(e, t)
                  : i && "set" in i && void 0 !== (r = i.set(e, n, t))
                  ? r
                  : (e.setAttribute(t, n + ""), n)
                : i && "get" in i && null !== (r = i.get(e, t))
                ? r
                : null == (r = k.find.attr(e, t))
                ? void 0
                : r);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (!y.radioValue && "radio" === t && A(e, "input")) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          },
        },
      },
      removeAttr: function (e, t) {
        var n,
          r = 0,
          i = t && t.match(R);
        if (i && 1 === e.nodeType) while ((n = i[r++])) e.removeAttribute(n);
      },
    }),
    (ht = {
      set: function (e, t, n) {
        return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n;
      },
    }),
    k.each(k.expr.match.bool.source.match(/\w+/g), function (e, t) {
      var a = gt[t] || k.find.attr;
      gt[t] = function (e, t, n) {
        var r,
          i,
          o = t.toLowerCase();
        return (
          n ||
            ((i = gt[o]),
            (gt[o] = r),
            (r = null != a(e, t, n) ? o : null),
            (gt[o] = i)),
          r
        );
      };
    });
  var vt = /^(?:input|select|textarea|button)$/i,
    yt = /^(?:a|area)$/i;
  function mt(e) {
    return (e.match(R) || []).join(" ");
  }
  function xt(e) {
    return (e.getAttribute && e.getAttribute("class")) || "";
  }
  function bt(e) {
    return Array.isArray(e) ? e : ("string" == typeof e && e.match(R)) || [];
  }
  k.fn.extend({
    prop: function (e, t) {
      return _(this, k.prop, e, t, 1 < arguments.length);
    },
    removeProp: function (e) {
      return this.each(function () {
        delete this[k.propFix[e] || e];
      });
    },
  }),
    k.extend({
      prop: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && k.isXMLDoc(e)) ||
              ((t = k.propFix[t] || t), (i = k.propHooks[t])),
            void 0 !== n
              ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                ? r
                : (e[t] = n)
              : i && "get" in i && null !== (r = i.get(e, t))
              ? r
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = k.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : vt.test(e.nodeName) || (yt.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    y.optSelected ||
      (k.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function (e) {
          var t = e.parentNode;
          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        },
      }),
    k.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        k.propFix[this.toLowerCase()] = this;
      }
    ),
    k.fn.extend({
      addClass: function (t) {
        var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
        if (m(t))
          return this.each(function (e) {
            k(this).addClass(t.call(this, e, xt(this)));
          });
        if ((e = bt(t)).length)
          while ((n = this[u++]))
            if (((i = xt(n)), (r = 1 === n.nodeType && " " + mt(i) + " "))) {
              a = 0;
              while ((o = e[a++]))
                r.indexOf(" " + o + " ") < 0 && (r += o + " ");
              i !== (s = mt(r)) && n.setAttribute("class", s);
            }
        return this;
      },
      removeClass: function (t) {
        var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
        if (m(t))
          return this.each(function (e) {
            k(this).removeClass(t.call(this, e, xt(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if ((e = bt(t)).length)
          while ((n = this[u++]))
            if (((i = xt(n)), (r = 1 === n.nodeType && " " + mt(i) + " "))) {
              a = 0;
              while ((o = e[a++]))
                while (-1 < r.indexOf(" " + o + " "))
                  r = r.replace(" " + o + " ", " ");
              i !== (s = mt(r)) && n.setAttribute("class", s);
            }
        return this;
      },
      toggleClass: function (i, t) {
        var o = typeof i,
          a = "string" === o || Array.isArray(i);
        return "boolean" == typeof t && a
          ? t
            ? this.addClass(i)
            : this.removeClass(i)
          : m(i)
          ? this.each(function (e) {
              k(this).toggleClass(i.call(this, e, xt(this), t), t);
            })
          : this.each(function () {
              var e, t, n, r;
              if (a) {
                (t = 0), (n = k(this)), (r = bt(i));
                while ((e = r[t++]))
                  n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
              } else (void 0 !== i && "boolean" !== o) || ((e = xt(this)) && Q.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Q.get(this, "__className__") || ""));
            });
      },
      hasClass: function (e) {
        var t,
          n,
          r = 0;
        t = " " + e + " ";
        while ((n = this[r++]))
          if (1 === n.nodeType && -1 < (" " + mt(xt(n)) + " ").indexOf(t))
            return !0;
        return !1;
      },
    });
  var wt = /\r/g;
  k.fn.extend({
    val: function (n) {
      var r,
        e,
        i,
        t = this[0];
      return arguments.length
        ? ((i = m(n)),
          this.each(function (e) {
            var t;
            1 === this.nodeType &&
              (null == (t = i ? n.call(this, e, k(this).val()) : n)
                ? (t = "")
                : "number" == typeof t
                ? (t += "")
                : Array.isArray(t) &&
                  (t = k.map(t, function (e) {
                    return null == e ? "" : e + "";
                  })),
              ((r =
                k.valHooks[this.type] ||
                k.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in r &&
                void 0 !== r.set(this, t, "value")) ||
                (this.value = t));
          }))
        : t
        ? (r = k.valHooks[t.type] || k.valHooks[t.nodeName.toLowerCase()]) &&
          "get" in r &&
          void 0 !== (e = r.get(t, "value"))
          ? e
          : "string" == typeof (e = t.value)
          ? e.replace(wt, "")
          : null == e
          ? ""
          : e
        : void 0;
    },
  }),
    k.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = k.find.attr(e, "value");
            return null != t ? t : mt(k.text(e));
          },
        },
        select: {
          get: function (e) {
            var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              a = "select-one" === e.type,
              s = a ? null : [],
              u = a ? o + 1 : i.length;
            for (r = o < 0 ? u : a ? o : 0; r < u; r++)
              if (
                ((n = i[r]).selected || r === o) &&
                !n.disabled &&
                (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))
              ) {
                if (((t = k(n).val()), a)) return t;
                s.push(t);
              }
            return s;
          },
          set: function (e, t) {
            var n,
              r,
              i = e.options,
              o = k.makeArray(t),
              a = i.length;
            while (a--)
              ((r = i[a]).selected =
                -1 < k.inArray(k.valHooks.option.get(r), o)) && (n = !0);
            return n || (e.selectedIndex = -1), o;
          },
        },
      },
    }),
    k.each(["radio", "checkbox"], function () {
      (k.valHooks[this] = {
        set: function (e, t) {
          if (Array.isArray(t))
            return (e.checked = -1 < k.inArray(k(e).val(), t));
        },
      }),
        y.checkOn ||
          (k.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          });
    }),
    (y.focusin = "onfocusin" in C);
  var Tt = /^(?:focusinfocus|focusoutblur)$/,
    Ct = function (e) {
      e.stopPropagation();
    };
  k.extend(k.event, {
    trigger: function (e, t, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f,
        p = [n || E],
        d = v.call(e, "type") ? e.type : e,
        h = v.call(e, "namespace") ? e.namespace.split(".") : [];
      if (
        ((o = f = a = n = n || E),
        3 !== n.nodeType &&
          8 !== n.nodeType &&
          !Tt.test(d + k.event.triggered) &&
          (-1 < d.indexOf(".") && ((d = (h = d.split(".")).shift()), h.sort()),
          (u = d.indexOf(":") < 0 && "on" + d),
          ((e = e[k.expando]
            ? e
            : new k.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3),
          (e.namespace = h.join(".")),
          (e.rnamespace = e.namespace
            ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (e.result = void 0),
          e.target || (e.target = n),
          (t = null == t ? [e] : k.makeArray(t, [e])),
          (c = k.event.special[d] || {}),
          r || !c.trigger || !1 !== c.trigger.apply(n, t)))
      ) {
        if (!r && !c.noBubble && !x(n)) {
          for (
            s = c.delegateType || d, Tt.test(s + d) || (o = o.parentNode);
            o;
            o = o.parentNode
          )
            p.push(o), (a = o);
          a === (n.ownerDocument || E) &&
            p.push(a.defaultView || a.parentWindow || C);
        }
        i = 0;
        while ((o = p[i++]) && !e.isPropagationStopped())
          (f = o),
            (e.type = 1 < i ? s : c.bindType || d),
            (l = (Q.get(o, "events") || {})[e.type] && Q.get(o, "handle")) &&
              l.apply(o, t),
            (l = u && o[u]) &&
              l.apply &&
              G(o) &&
              ((e.result = l.apply(o, t)),
              !1 === e.result && e.preventDefault());
        return (
          (e.type = d),
          r ||
            e.isDefaultPrevented() ||
            (c._default && !1 !== c._default.apply(p.pop(), t)) ||
            !G(n) ||
            (u &&
              m(n[d]) &&
              !x(n) &&
              ((a = n[u]) && (n[u] = null),
              (k.event.triggered = d),
              e.isPropagationStopped() && f.addEventListener(d, Ct),
              n[d](),
              e.isPropagationStopped() && f.removeEventListener(d, Ct),
              (k.event.triggered = void 0),
              a && (n[u] = a))),
          e.result
        );
      }
    },
    simulate: function (e, t, n) {
      var r = k.extend(new k.Event(), n, { type: e, isSimulated: !0 });
      k.event.trigger(r, null, t);
    },
  }),
    k.fn.extend({
      trigger: function (e, t) {
        return this.each(function () {
          k.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var n = this[0];
        if (n) return k.event.trigger(e, t, n, !0);
      },
    }),
    y.focusin ||
      k.each({ focus: "focusin", blur: "focusout" }, function (n, r) {
        var i = function (e) {
          k.event.simulate(r, e.target, k.event.fix(e));
        };
        k.event.special[r] = {
          setup: function () {
            var e = this.ownerDocument || this,
              t = Q.access(e, r);
            t || e.addEventListener(n, i, !0), Q.access(e, r, (t || 0) + 1);
          },
          teardown: function () {
            var e = this.ownerDocument || this,
              t = Q.access(e, r) - 1;
            t
              ? Q.access(e, r, t)
              : (e.removeEventListener(n, i, !0), Q.remove(e, r));
          },
        };
      });
  var Et = C.location,
    kt = Date.now(),
    St = /\?/;
  k.parseXML = function (e) {
    var t;
    if (!e || "string" != typeof e) return null;
    try {
      t = new C.DOMParser().parseFromString(e, "text/xml");
    } catch (e) {
      t = void 0;
    }
    return (
      (t && !t.getElementsByTagName("parsererror").length) ||
        k.error("Invalid XML: " + e),
      t
    );
  };
  var Nt = /\[\]$/,
    At = /\r?\n/g,
    Dt = /^(?:submit|button|image|reset|file)$/i,
    jt = /^(?:input|select|textarea|keygen)/i;
  function qt(n, e, r, i) {
    var t;
    if (Array.isArray(e))
      k.each(e, function (e, t) {
        r || Nt.test(n)
          ? i(n, t)
          : qt(
              n + "[" + ("object" == typeof t && null != t ? e : "") + "]",
              t,
              r,
              i
            );
      });
    else if (r || "object" !== w(e)) i(n, e);
    else for (t in e) qt(n + "[" + t + "]", e[t], r, i);
  }
  (k.param = function (e, t) {
    var n,
      r = [],
      i = function (e, t) {
        var n = m(t) ? t() : t;
        r[r.length] =
          encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
      };
    if (null == e) return "";
    if (Array.isArray(e) || (e.jquery && !k.isPlainObject(e)))
      k.each(e, function () {
        i(this.name, this.value);
      });
    else for (n in e) qt(n, e[n], t, i);
    return r.join("&");
  }),
    k.fn.extend({
      serialize: function () {
        return k.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var e = k.prop(this, "elements");
          return e ? k.makeArray(e) : this;
        })
          .filter(function () {
            var e = this.type;
            return (
              this.name &&
              !k(this).is(":disabled") &&
              jt.test(this.nodeName) &&
              !Dt.test(e) &&
              (this.checked || !pe.test(e))
            );
          })
          .map(function (e, t) {
            var n = k(this).val();
            return null == n
              ? null
              : Array.isArray(n)
              ? k.map(n, function (e) {
                  return { name: t.name, value: e.replace(At, "\r\n") };
                })
              : { name: t.name, value: n.replace(At, "\r\n") };
          })
          .get();
      },
    });
  var Lt = /%20/g,
    Ht = /#.*$/,
    Ot = /([?&])_=[^&]*/,
    Pt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Rt = /^(?:GET|HEAD)$/,
    Mt = /^\/\//,
    It = {},
    Wt = {},
    $t = "*/".concat("*"),
    Ft = E.createElement("a");
  function Bt(o) {
    return function (e, t) {
      "string" != typeof e && ((t = e), (e = "*"));
      var n,
        r = 0,
        i = e.toLowerCase().match(R) || [];
      if (m(t))
        while ((n = i[r++]))
          "+" === n[0]
            ? ((n = n.slice(1) || "*"), (o[n] = o[n] || []).unshift(t))
            : (o[n] = o[n] || []).push(t);
    };
  }
  function _t(t, i, o, a) {
    var s = {},
      u = t === Wt;
    function l(e) {
      var r;
      return (
        (s[e] = !0),
        k.each(t[e] || [], function (e, t) {
          var n = t(i, o, a);
          return "string" != typeof n || u || s[n]
            ? u
              ? !(r = n)
              : void 0
            : (i.dataTypes.unshift(n), l(n), !1);
        }),
        r
      );
    }
    return l(i.dataTypes[0]) || (!s["*"] && l("*"));
  }
  function zt(e, t) {
    var n,
      r,
      i = k.ajaxSettings.flatOptions || {};
    for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && k.extend(!0, e, r), e;
  }
  (Ft.href = Et.href),
    k.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Et.href,
        type: "GET",
        isLocal:
          /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            Et.protocol
          ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": $t,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": k.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? zt(zt(e, k.ajaxSettings), t) : zt(k.ajaxSettings, e);
      },
      ajaxPrefilter: Bt(It),
      ajaxTransport: Bt(Wt),
      ajax: function (e, t) {
        "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
        var c,
          f,
          p,
          n,
          d,
          r,
          h,
          g,
          i,
          o,
          v = k.ajaxSetup({}, t),
          y = v.context || v,
          m = v.context && (y.nodeType || y.jquery) ? k(y) : k.event,
          x = k.Deferred(),
          b = k.Callbacks("once memory"),
          w = v.statusCode || {},
          a = {},
          s = {},
          u = "canceled",
          T = {
            readyState: 0,
            getResponseHeader: function (e) {
              var t;
              if (h) {
                if (!n) {
                  n = {};
                  while ((t = Pt.exec(p)))
                    n[t[1].toLowerCase() + " "] = (
                      n[t[1].toLowerCase() + " "] || []
                    ).concat(t[2]);
                }
                t = n[e.toLowerCase() + " "];
              }
              return null == t ? null : t.join(", ");
            },
            getAllResponseHeaders: function () {
              return h ? p : null;
            },
            setRequestHeader: function (e, t) {
              return (
                null == h &&
                  ((e = s[e.toLowerCase()] = s[e.toLowerCase()] || e),
                  (a[e] = t)),
                this
              );
            },
            overrideMimeType: function (e) {
              return null == h && (v.mimeType = e), this;
            },
            statusCode: function (e) {
              var t;
              if (e)
                if (h) T.always(e[T.status]);
                else for (t in e) w[t] = [w[t], e[t]];
              return this;
            },
            abort: function (e) {
              var t = e || u;
              return c && c.abort(t), l(0, t), this;
            },
          };
        if (
          (x.promise(T),
          (v.url = ((e || v.url || Et.href) + "").replace(
            Mt,
            Et.protocol + "//"
          )),
          (v.type = t.method || t.type || v.method || v.type),
          (v.dataTypes = (v.dataType || "*").toLowerCase().match(R) || [""]),
          null == v.crossDomain)
        ) {
          r = E.createElement("a");
          try {
            (r.href = v.url),
              (r.href = r.href),
              (v.crossDomain =
                Ft.protocol + "//" + Ft.host != r.protocol + "//" + r.host);
          } catch (e) {
            v.crossDomain = !0;
          }
        }
        if (
          (v.data &&
            v.processData &&
            "string" != typeof v.data &&
            (v.data = k.param(v.data, v.traditional)),
          _t(It, v, t, T),
          h)
        )
          return T;
        for (i in ((g = k.event && v.global) &&
          0 == k.active++ &&
          k.event.trigger("ajaxStart"),
        (v.type = v.type.toUpperCase()),
        (v.hasContent = !Rt.test(v.type)),
        (f = v.url.replace(Ht, "")),
        v.hasContent
          ? v.data &&
            v.processData &&
            0 ===
              (v.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
            (v.data = v.data.replace(Lt, "+"))
          : ((o = v.url.slice(f.length)),
            v.data &&
              (v.processData || "string" == typeof v.data) &&
              ((f += (St.test(f) ? "&" : "?") + v.data), delete v.data),
            !1 === v.cache &&
              ((f = f.replace(Ot, "$1")),
              (o = (St.test(f) ? "&" : "?") + "_=" + kt++ + o)),
            (v.url = f + o)),
        v.ifModified &&
          (k.lastModified[f] &&
            T.setRequestHeader("If-Modified-Since", k.lastModified[f]),
          k.etag[f] && T.setRequestHeader("If-None-Match", k.etag[f])),
        ((v.data && v.hasContent && !1 !== v.contentType) || t.contentType) &&
          T.setRequestHeader("Content-Type", v.contentType),
        T.setRequestHeader(
          "Accept",
          v.dataTypes[0] && v.accepts[v.dataTypes[0]]
            ? v.accepts[v.dataTypes[0]] +
                ("*" !== v.dataTypes[0] ? ", " + $t + "; q=0.01" : "")
            : v.accepts["*"]
        ),
        v.headers))
          T.setRequestHeader(i, v.headers[i]);
        if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h))
          return T.abort();
        if (
          ((u = "abort"),
          b.add(v.complete),
          T.done(v.success),
          T.fail(v.error),
          (c = _t(Wt, v, t, T)))
        ) {
          if (((T.readyState = 1), g && m.trigger("ajaxSend", [T, v]), h))
            return T;
          v.async &&
            0 < v.timeout &&
            (d = C.setTimeout(function () {
              T.abort("timeout");
            }, v.timeout));
          try {
            (h = !1), c.send(a, l);
          } catch (e) {
            if (h) throw e;
            l(-1, e);
          }
        } else l(-1, "No Transport");
        function l(e, t, n, r) {
          var i,
            o,
            a,
            s,
            u,
            l = t;
          h ||
            ((h = !0),
            d && C.clearTimeout(d),
            (c = void 0),
            (p = r || ""),
            (T.readyState = 0 < e ? 4 : 0),
            (i = (200 <= e && e < 300) || 304 === e),
            n &&
              (s = (function (e, t, n) {
                var r,
                  i,
                  o,
                  a,
                  s = e.contents,
                  u = e.dataTypes;
                while ("*" === u[0])
                  u.shift(),
                    void 0 === r &&
                      (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)
                  for (i in s)
                    if (s[i] && s[i].test(r)) {
                      u.unshift(i);
                      break;
                    }
                if (u[0] in n) o = u[0];
                else {
                  for (i in n) {
                    if (!u[0] || e.converters[i + " " + u[0]]) {
                      o = i;
                      break;
                    }
                    a || (a = i);
                  }
                  o = o || a;
                }
                if (o) return o !== u[0] && u.unshift(o), n[o];
              })(v, T, n)),
            (s = (function (e, t, n, r) {
              var i,
                o,
                a,
                s,
                u,
                l = {},
                c = e.dataTypes.slice();
              if (c[1])
                for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
              o = c.shift();
              while (o)
                if (
                  (e.responseFields[o] && (n[e.responseFields[o]] = t),
                  !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                  (u = o),
                  (o = c.shift()))
                )
                  if ("*" === o) o = u;
                  else if ("*" !== u && u !== o) {
                    if (!(a = l[u + " " + o] || l["* " + o]))
                      for (i in l)
                        if (
                          (s = i.split(" "))[1] === o &&
                          (a = l[u + " " + s[0]] || l["* " + s[0]])
                        ) {
                          !0 === a
                            ? (a = l[i])
                            : !0 !== l[i] && ((o = s[0]), c.unshift(s[1]));
                          break;
                        }
                    if (!0 !== a)
                      if (a && e["throws"]) t = a(t);
                      else
                        try {
                          t = a(t);
                        } catch (e) {
                          return {
                            state: "parsererror",
                            error: a
                              ? e
                              : "No conversion from " + u + " to " + o,
                          };
                        }
                  }
              return { state: "success", data: t };
            })(v, s, T, i)),
            i
              ? (v.ifModified &&
                  ((u = T.getResponseHeader("Last-Modified")) &&
                    (k.lastModified[f] = u),
                  (u = T.getResponseHeader("etag")) && (k.etag[f] = u)),
                204 === e || "HEAD" === v.type
                  ? (l = "nocontent")
                  : 304 === e
                  ? (l = "notmodified")
                  : ((l = s.state), (o = s.data), (i = !(a = s.error))))
              : ((a = l), (!e && l) || ((l = "error"), e < 0 && (e = 0))),
            (T.status = e),
            (T.statusText = (t || l) + ""),
            i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]),
            T.statusCode(w),
            (w = void 0),
            g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]),
            b.fireWith(y, [T, l]),
            g &&
              (m.trigger("ajaxComplete", [T, v]),
              --k.active || k.event.trigger("ajaxStop")));
        }
        return T;
      },
      getJSON: function (e, t, n) {
        return k.get(e, t, n, "json");
      },
      getScript: function (e, t) {
        return k.get(e, void 0, t, "script");
      },
    }),
    k.each(["get", "post"], function (e, i) {
      k[i] = function (e, t, n, r) {
        return (
          m(t) && ((r = r || n), (n = t), (t = void 0)),
          k.ajax(
            k.extend(
              { url: e, type: i, dataType: r, data: t, success: n },
              k.isPlainObject(e) && e
            )
          )
        );
      };
    }),
    (k._evalUrl = function (e, t) {
      return k.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        converters: { "text script": function () {} },
        dataFilter: function (e) {
          k.globalEval(e, t);
        },
      });
    }),
    k.fn.extend({
      wrapAll: function (e) {
        var t;
        return (
          this[0] &&
            (m(e) && (e = e.call(this[0])),
            (t = k(e, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (n) {
        return m(n)
          ? this.each(function (e) {
              k(this).wrapInner(n.call(this, e));
            })
          : this.each(function () {
              var e = k(this),
                t = e.contents();
              t.length ? t.wrapAll(n) : e.append(n);
            });
      },
      wrap: function (t) {
        var n = m(t);
        return this.each(function (e) {
          k(this).wrapAll(n ? t.call(this, e) : t);
        });
      },
      unwrap: function (e) {
        return (
          this.parent(e)
            .not("body")
            .each(function () {
              k(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (k.expr.pseudos.hidden = function (e) {
      return !k.expr.pseudos.visible(e);
    }),
    (k.expr.pseudos.visible = function (e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }),
    (k.ajaxSettings.xhr = function () {
      try {
        return new C.XMLHttpRequest();
      } catch (e) {}
    });
  var Ut = { 0: 200, 1223: 204 },
    Xt = k.ajaxSettings.xhr();
  (y.cors = !!Xt && "withCredentials" in Xt),
    (y.ajax = Xt = !!Xt),
    k.ajaxTransport(function (i) {
      var o, a;
      if (y.cors || (Xt && !i.crossDomain))
        return {
          send: function (e, t) {
            var n,
              r = i.xhr();
            if (
              (r.open(i.type, i.url, i.async, i.username, i.password),
              i.xhrFields)
            )
              for (n in i.xhrFields) r[n] = i.xhrFields[n];
            for (n in (i.mimeType &&
              r.overrideMimeType &&
              r.overrideMimeType(i.mimeType),
            i.crossDomain ||
              e["X-Requested-With"] ||
              (e["X-Requested-With"] = "XMLHttpRequest"),
            e))
              r.setRequestHeader(n, e[n]);
            (o = function (e) {
              return function () {
                o &&
                  ((o =
                    a =
                    r.onload =
                    r.onerror =
                    r.onabort =
                    r.ontimeout =
                    r.onreadystatechange =
                      null),
                  "abort" === e
                    ? r.abort()
                    : "error" === e
                    ? "number" != typeof r.status
                      ? t(0, "error")
                      : t(r.status, r.statusText)
                    : t(
                        Ut[r.status] || r.status,
                        r.statusText,
                        "text" !== (r.responseType || "text") ||
                          "string" != typeof r.responseText
                          ? { binary: r.response }
                          : { text: r.responseText },
                        r.getAllResponseHeaders()
                      ));
              };
            }),
              (r.onload = o()),
              (a = r.onerror = r.ontimeout = o("error")),
              void 0 !== r.onabort
                ? (r.onabort = a)
                : (r.onreadystatechange = function () {
                    4 === r.readyState &&
                      C.setTimeout(function () {
                        o && a();
                      });
                  }),
              (o = o("abort"));
            try {
              r.send((i.hasContent && i.data) || null);
            } catch (e) {
              if (o) throw e;
            }
          },
          abort: function () {
            o && o();
          },
        };
    }),
    k.ajaxPrefilter(function (e) {
      e.crossDomain && (e.contents.script = !1);
    }),
    k.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (e) {
          return k.globalEval(e), e;
        },
      },
    }),
    k.ajaxPrefilter("script", function (e) {
      void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }),
    k.ajaxTransport("script", function (n) {
      var r, i;
      if (n.crossDomain || n.scriptAttrs)
        return {
          send: function (e, t) {
            (r = k("<script>")
              .attr(n.scriptAttrs || {})
              .prop({ charset: n.scriptCharset, src: n.url })
              .on(
                "load error",
                (i = function (e) {
                  r.remove(),
                    (i = null),
                    e && t("error" === e.type ? 404 : 200, e.type);
                })
              )),
              E.head.appendChild(r[0]);
          },
          abort: function () {
            i && i();
          },
        };
    });
  var Vt,
    Gt = [],
    Yt = /(=)\?(?=&|$)|\?\?/;
  k.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = Gt.pop() || k.expando + "_" + kt++;
      return (this[e] = !0), e;
    },
  }),
    k.ajaxPrefilter("json jsonp", function (e, t, n) {
      var r,
        i,
        o,
        a =
          !1 !== e.jsonp &&
          (Yt.test(e.url)
            ? "url"
            : "string" == typeof e.data &&
              0 ===
                (e.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              Yt.test(e.data) &&
              "data");
      if (a || "jsonp" === e.dataTypes[0])
        return (
          (r = e.jsonpCallback =
            m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
          a
            ? (e[a] = e[a].replace(Yt, "$1" + r))
            : !1 !== e.jsonp &&
              (e.url += (St.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
          (e.converters["script json"] = function () {
            return o || k.error(r + " was not called"), o[0];
          }),
          (e.dataTypes[0] = "json"),
          (i = C[r]),
          (C[r] = function () {
            o = arguments;
          }),
          n.always(function () {
            void 0 === i ? k(C).removeProp(r) : (C[r] = i),
              e[r] && ((e.jsonpCallback = t.jsonpCallback), Gt.push(r)),
              o && m(i) && i(o[0]),
              (o = i = void 0);
          }),
          "script"
        );
    }),
    (y.createHTMLDocument =
      (((Vt = E.implementation.createHTMLDocument("").body).innerHTML =
        "<form></form><form></form>"),
      2 === Vt.childNodes.length)),
    (k.parseHTML = function (e, t, n) {
      return "string" != typeof e
        ? []
        : ("boolean" == typeof t && ((n = t), (t = !1)),
          t ||
            (y.createHTMLDocument
              ? (((r = (t =
                  E.implementation.createHTMLDocument("")).createElement(
                  "base"
                )).href = E.location.href),
                t.head.appendChild(r))
              : (t = E)),
          (o = !n && []),
          (i = D.exec(e))
            ? [t.createElement(i[1])]
            : ((i = we([e], t, o)),
              o && o.length && k(o).remove(),
              k.merge([], i.childNodes)));
      var r, i, o;
    }),
    (k.fn.load = function (e, t, n) {
      var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");
      return (
        -1 < s && ((r = mt(e.slice(s))), (e = e.slice(0, s))),
        m(t)
          ? ((n = t), (t = void 0))
          : t && "object" == typeof t && (i = "POST"),
        0 < a.length &&
          k
            .ajax({ url: e, type: i || "GET", dataType: "html", data: t })
            .done(function (e) {
              (o = arguments),
                a.html(r ? k("<div>").append(k.parseHTML(e)).find(r) : e);
            })
            .always(
              n &&
                function (e, t) {
                  a.each(function () {
                    n.apply(this, o || [e.responseText, t, e]);
                  });
                }
            ),
        this
      );
    }),
    k.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        k.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    (k.expr.pseudos.animated = function (t) {
      return k.grep(k.timers, function (e) {
        return t === e.elem;
      }).length;
    }),
    (k.offset = {
      setOffset: function (e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          u,
          l = k.css(e, "position"),
          c = k(e),
          f = {};
        "static" === l && (e.style.position = "relative"),
          (s = c.offset()),
          (o = k.css(e, "top")),
          (u = k.css(e, "left")),
          ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto")
            ? ((a = (r = c.position()).top), (i = r.left))
            : ((a = parseFloat(o) || 0), (i = parseFloat(u) || 0)),
          m(t) && (t = t.call(e, n, k.extend({}, s))),
          null != t.top && (f.top = t.top - s.top + a),
          null != t.left && (f.left = t.left - s.left + i),
          "using" in t ? t.using.call(e, f) : c.css(f);
      },
    }),
    k.fn.extend({
      offset: function (t) {
        if (arguments.length)
          return void 0 === t
            ? this
            : this.each(function (e) {
                k.offset.setOffset(this, t, e);
              });
        var e,
          n,
          r = this[0];
        return r
          ? r.getClientRects().length
            ? ((e = r.getBoundingClientRect()),
              (n = r.ownerDocument.defaultView),
              { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var e,
            t,
            n,
            r = this[0],
            i = { top: 0, left: 0 };
          if ("fixed" === k.css(r, "position")) t = r.getBoundingClientRect();
          else {
            (t = this.offset()),
              (n = r.ownerDocument),
              (e = r.offsetParent || n.documentElement);
            while (
              e &&
              (e === n.body || e === n.documentElement) &&
              "static" === k.css(e, "position")
            )
              e = e.parentNode;
            e &&
              e !== r &&
              1 === e.nodeType &&
              (((i = k(e).offset()).top += k.css(e, "borderTopWidth", !0)),
              (i.left += k.css(e, "borderLeftWidth", !0)));
          }
          return {
            top: t.top - i.top - k.css(r, "marginTop", !0),
            left: t.left - i.left - k.css(r, "marginLeft", !0),
          };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          var e = this.offsetParent;
          while (e && "static" === k.css(e, "position")) e = e.offsetParent;
          return e || ie;
        });
      },
    }),
    k.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (t, i) {
        var o = "pageYOffset" === i;
        k.fn[t] = function (e) {
          return _(
            this,
            function (e, t, n) {
              var r;
              if (
                (x(e) ? (r = e) : 9 === e.nodeType && (r = e.defaultView),
                void 0 === n)
              )
                return r ? r[i] : e[t];
              r
                ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset)
                : (e[t] = n);
            },
            t,
            e,
            arguments.length
          );
        };
      }
    ),
    k.each(["top", "left"], function (e, n) {
      k.cssHooks[n] = ze(y.pixelPosition, function (e, t) {
        if (t)
          return (t = _e(e, n)), $e.test(t) ? k(e).position()[n] + "px" : t;
      });
    }),
    k.each({ Height: "height", Width: "width" }, function (a, s) {
      k.each(
        { padding: "inner" + a, content: s, "": "outer" + a },
        function (r, o) {
          k.fn[o] = function (e, t) {
            var n = arguments.length && (r || "boolean" != typeof e),
              i = r || (!0 === e || !0 === t ? "margin" : "border");
            return _(
              this,
              function (e, t, n) {
                var r;
                return x(e)
                  ? 0 === o.indexOf("outer")
                    ? e["inner" + a]
                    : e.document.documentElement["client" + a]
                  : 9 === e.nodeType
                  ? ((r = e.documentElement),
                    Math.max(
                      e.body["scroll" + a],
                      r["scroll" + a],
                      e.body["offset" + a],
                      r["offset" + a],
                      r["client" + a]
                    ))
                  : void 0 === n
                  ? k.css(e, t, i)
                  : k.style(e, t, n, i);
              },
              s,
              n ? e : void 0,
              n
            );
          };
        }
      );
    }),
    k.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " "
      ),
      function (e, n) {
        k.fn[n] = function (e, t) {
          return 0 < arguments.length
            ? this.on(n, null, e, t)
            : this.trigger(n);
        };
      }
    ),
    k.fn.extend({
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
    }),
    k.fn.extend({
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
    }),
    (k.proxy = function (e, t) {
      var n, r, i;
      if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), m(e)))
        return (
          (r = s.call(arguments, 2)),
          ((i = function () {
            return e.apply(t || this, r.concat(s.call(arguments)));
          }).guid = e.guid =
            e.guid || k.guid++),
          i
        );
    }),
    (k.holdReady = function (e) {
      e ? k.readyWait++ : k.ready(!0);
    }),
    (k.isArray = Array.isArray),
    (k.parseJSON = JSON.parse),
    (k.nodeName = A),
    (k.isFunction = m),
    (k.isWindow = x),
    (k.camelCase = V),
    (k.type = w),
    (k.now = Date.now),
    (k.isNumeric = function (e) {
      var t = k.type(e);
      return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
    }),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return k;
      });
  var Qt = C.jQuery,
    Jt = C.$;
  return (
    (k.noConflict = function (e) {
      return C.$ === k && (C.$ = Jt), e && C.jQuery === k && (C.jQuery = Qt), k;
    }),
    e || (C.jQuery = C.$ = k),
    k
  );
});

/*!
 * Bootstrap v5.0.0 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t =
        "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
        e());
})(this, function () {
  "use strict";
  const t = (t) => {
      do {
        t += Math.floor(1e6 * Math.random());
      } while (document.getElementById(t));
      return t;
    },
    e = (t) => {
      let e = t.getAttribute("data-bs-target");
      if (!e || "#" === e) {
        let i = t.getAttribute("href");
        if (!i || (!i.includes("#") && !i.startsWith("."))) return null;
        i.includes("#") && !i.startsWith("#") && (i = "#" + i.split("#")[1]),
          (e = i && "#" !== i ? i.trim() : null);
      }
      return e;
    },
    i = (t) => {
      const i = e(t);
      return i && document.querySelector(i) ? i : null;
    },
    n = (t) => {
      const i = e(t);
      return i ? document.querySelector(i) : null;
    },
    s = (t) => {
      if (!t) return 0;
      let { transitionDuration: e, transitionDelay: i } =
        window.getComputedStyle(t);
      const n = Number.parseFloat(e),
        s = Number.parseFloat(i);
      return n || s
        ? ((e = e.split(",")[0]),
          (i = i.split(",")[0]),
          1e3 * (Number.parseFloat(e) + Number.parseFloat(i)))
        : 0;
    },
    o = (t) => {
      t.dispatchEvent(new Event("transitionend"));
    },
    r = (t) => (t[0] || t).nodeType,
    a = (t, e) => {
      let i = !1;
      const n = e + 5;
      t.addEventListener("transitionend", function e() {
        (i = !0), t.removeEventListener("transitionend", e);
      }),
        setTimeout(() => {
          i || o(t);
        }, n);
    },
    l = (t, e, i) => {
      Object.keys(i).forEach((n) => {
        const s = i[n],
          o = e[n],
          a =
            o && r(o)
              ? "element"
              : null == (l = o)
              ? "" + l
              : {}.toString
                  .call(l)
                  .match(/\s([a-z]+)/i)[1]
                  .toLowerCase();
        var l;
        if (!new RegExp(s).test(a))
          throw new TypeError(
            `${t.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${s}".`
          );
      });
    },
    c = (t) => {
      if (!t) return !1;
      if (t.style && t.parentNode && t.parentNode.style) {
        const e = getComputedStyle(t),
          i = getComputedStyle(t.parentNode);
        return (
          "none" !== e.display &&
          "none" !== i.display &&
          "hidden" !== e.visibility
        );
      }
      return !1;
    },
    d = (t) =>
      !t ||
      t.nodeType !== Node.ELEMENT_NODE ||
      !!t.classList.contains("disabled") ||
      (void 0 !== t.disabled
        ? t.disabled
        : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
    h = (t) => {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        const e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot
        ? t
        : t.parentNode
        ? h(t.parentNode)
        : null;
    },
    u = () => {},
    f = (t) => t.offsetHeight,
    p = () => {
      const { jQuery: t } = window;
      return t && !document.body.hasAttribute("data-bs-no-jquery") ? t : null;
    },
    g = () => "rtl" === document.documentElement.dir,
    m = (t, e) => {
      var i;
      (i = () => {
        const i = p();
        if (i) {
          const n = i.fn[t];
          (i.fn[t] = e.jQueryInterface),
            (i.fn[t].Constructor = e),
            (i.fn[t].noConflict = () => ((i.fn[t] = n), e.jQueryInterface));
        }
      }),
        "loading" === document.readyState
          ? document.addEventListener("DOMContentLoaded", i)
          : i();
    },
    _ = (t) => {
      "function" == typeof t && t();
    },
    b = new Map();
  var v = {
    set(t, e, i) {
      b.has(t) || b.set(t, new Map());
      const n = b.get(t);
      n.has(e) || 0 === n.size
        ? n.set(e, i)
        : console.error(
            `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
              Array.from(n.keys())[0]
            }.`
          );
    },
    get: (t, e) => (b.has(t) && b.get(t).get(e)) || null,
    remove(t, e) {
      if (!b.has(t)) return;
      const i = b.get(t);
      i.delete(e), 0 === i.size && b.delete(t);
    },
  };
  const y = /[^.]*(?=\..*)\.|.*/,
    w = /\..*/,
    E = /::\d+$/,
    T = {};
  let A = 1;
  const L = { mouseenter: "mouseover", mouseleave: "mouseout" },
    O = /^(mouseenter|mouseleave)/i,
    k = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function D(t, e) {
    return (e && `${e}::${A++}`) || t.uidEvent || A++;
  }
  function x(t) {
    const e = D(t);
    return (t.uidEvent = e), (T[e] = T[e] || {}), T[e];
  }
  function C(t, e, i = null) {
    const n = Object.keys(t);
    for (let s = 0, o = n.length; s < o; s++) {
      const o = t[n[s]];
      if (o.originalHandler === e && o.delegationSelector === i) return o;
    }
    return null;
  }
  function S(t, e, i) {
    const n = "string" == typeof e,
      s = n ? i : e;
    let o = P(t);
    return k.has(o) || (o = t), [n, s, o];
  }
  function N(t, e, i, n, s) {
    if ("string" != typeof e || !t) return;
    if ((i || ((i = n), (n = null)), O.test(e))) {
      const t = (t) =>
        function (e) {
          if (
            !e.relatedTarget ||
            (e.relatedTarget !== e.delegateTarget &&
              !e.delegateTarget.contains(e.relatedTarget))
          )
            return t.call(this, e);
        };
      n ? (n = t(n)) : (i = t(i));
    }
    const [o, r, a] = S(e, i, n),
      l = x(t),
      c = l[a] || (l[a] = {}),
      d = C(c, r, o ? i : null);
    if (d) return void (d.oneOff = d.oneOff && s);
    const h = D(r, e.replace(y, "")),
      u = o
        ? (function (t, e, i) {
            return function n(s) {
              const o = t.querySelectorAll(e);
              for (let { target: r } = s; r && r !== this; r = r.parentNode)
                for (let a = o.length; a--; )
                  if (o[a] === r)
                    return (
                      (s.delegateTarget = r),
                      n.oneOff && I.off(t, s.type, e, i),
                      i.apply(r, [s])
                    );
              return null;
            };
          })(t, i, n)
        : (function (t, e) {
            return function i(n) {
              return (
                (n.delegateTarget = t),
                i.oneOff && I.off(t, n.type, e),
                e.apply(t, [n])
              );
            };
          })(t, i);
    (u.delegationSelector = o ? i : null),
      (u.originalHandler = r),
      (u.oneOff = s),
      (u.uidEvent = h),
      (c[h] = u),
      t.addEventListener(a, u, o);
  }
  function j(t, e, i, n, s) {
    const o = C(e[i], n, s);
    o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent]);
  }
  function P(t) {
    return (t = t.replace(w, "")), L[t] || t;
  }
  const I = {
    on(t, e, i, n) {
      N(t, e, i, n, !1);
    },
    one(t, e, i, n) {
      N(t, e, i, n, !0);
    },
    off(t, e, i, n) {
      if ("string" != typeof e || !t) return;
      const [s, o, r] = S(e, i, n),
        a = r !== e,
        l = x(t),
        c = e.startsWith(".");
      if (void 0 !== o) {
        if (!l || !l[r]) return;
        return void j(t, l, r, o, s ? i : null);
      }
      c &&
        Object.keys(l).forEach((i) => {
          !(function (t, e, i, n) {
            const s = e[i] || {};
            Object.keys(s).forEach((o) => {
              if (o.includes(n)) {
                const n = s[o];
                j(t, e, i, n.originalHandler, n.delegationSelector);
              }
            });
          })(t, l, i, e.slice(1));
        });
      const d = l[r] || {};
      Object.keys(d).forEach((i) => {
        const n = i.replace(E, "");
        if (!a || e.includes(n)) {
          const e = d[i];
          j(t, l, r, e.originalHandler, e.delegationSelector);
        }
      });
    },
    trigger(t, e, i) {
      if ("string" != typeof e || !t) return null;
      const n = p(),
        s = P(e),
        o = e !== s,
        r = k.has(s);
      let a,
        l = !0,
        c = !0,
        d = !1,
        h = null;
      return (
        o &&
          n &&
          ((a = n.Event(e, i)),
          n(t).trigger(a),
          (l = !a.isPropagationStopped()),
          (c = !a.isImmediatePropagationStopped()),
          (d = a.isDefaultPrevented())),
        r
          ? ((h = document.createEvent("HTMLEvents")), h.initEvent(s, l, !0))
          : (h = new CustomEvent(e, { bubbles: l, cancelable: !0 })),
        void 0 !== i &&
          Object.keys(i).forEach((t) => {
            Object.defineProperty(h, t, { get: () => i[t] });
          }),
        d && h.preventDefault(),
        c && t.dispatchEvent(h),
        h.defaultPrevented && void 0 !== a && a.preventDefault(),
        h
      );
    },
  };
  class M {
    constructor(t) {
      (t = "string" == typeof t ? document.querySelector(t) : t) &&
        ((this._element = t),
        v.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      v.remove(this._element, this.constructor.DATA_KEY),
        I.off(this._element, "." + this.constructor.DATA_KEY),
        (this._element = null);
    }
    static getInstance(t) {
      return v.get(t, this.DATA_KEY);
    }
    static get VERSION() {
      return "5.0.0";
    }
  }
  class H extends M {
    static get DATA_KEY() {
      return "bs.alert";
    }
    close(t) {
      const e = t ? this._getRootElement(t) : this._element,
        i = this._triggerCloseEvent(e);
      null === i || i.defaultPrevented || this._removeElement(e);
    }
    _getRootElement(t) {
      return n(t) || t.closest(".alert");
    }
    _triggerCloseEvent(t) {
      return I.trigger(t, "close.bs.alert");
    }
    _removeElement(t) {
      if ((t.classList.remove("show"), !t.classList.contains("fade")))
        return void this._destroyElement(t);
      const e = s(t);
      I.one(t, "transitionend", () => this._destroyElement(t)), a(t, e);
    }
    _destroyElement(t) {
      t.parentNode && t.parentNode.removeChild(t),
        I.trigger(t, "closed.bs.alert");
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = v.get(this, "bs.alert");
        e || (e = new H(this)), "close" === t && e[t](this);
      });
    }
    static handleDismiss(t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }
  }
  I.on(
    document,
    "click.bs.alert.data-api",
    '[data-bs-dismiss="alert"]',
    H.handleDismiss(new H())
  ),
    m("alert", H);
  class R extends M {
    static get DATA_KEY() {
      return "bs.button";
    }
    toggle() {
      this._element.setAttribute(
        "aria-pressed",
        this._element.classList.toggle("active")
      );
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = v.get(this, "bs.button");
        e || (e = new R(this)), "toggle" === t && e[t]();
      });
    }
  }
  function B(t) {
    return (
      "true" === t ||
      ("false" !== t &&
        (t === Number(t).toString()
          ? Number(t)
          : "" === t || "null" === t
          ? null
          : t))
    );
  }
  function W(t) {
    return t.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
  }
  I.on(
    document,
    "click.bs.button.data-api",
    '[data-bs-toggle="button"]',
    (t) => {
      t.preventDefault();
      const e = t.target.closest('[data-bs-toggle="button"]');
      let i = v.get(e, "bs.button");
      i || (i = new R(e)), i.toggle();
    }
  ),
    m("button", R);
  const z = {
      setDataAttribute(t, e, i) {
        t.setAttribute("data-bs-" + W(e), i);
      },
      removeDataAttribute(t, e) {
        t.removeAttribute("data-bs-" + W(e));
      },
      getDataAttributes(t) {
        if (!t) return {};
        const e = {};
        return (
          Object.keys(t.dataset)
            .filter((t) => t.startsWith("bs"))
            .forEach((i) => {
              let n = i.replace(/^bs/, "");
              (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
                (e[n] = B(t.dataset[i]));
            }),
          e
        );
      },
      getDataAttribute: (t, e) => B(t.getAttribute("data-bs-" + W(e))),
      offset(t) {
        const e = t.getBoundingClientRect();
        return {
          top: e.top + document.body.scrollTop,
          left: e.left + document.body.scrollLeft,
        };
      },
      position: (t) => ({ top: t.offsetTop, left: t.offsetLeft }),
    },
    U = {
      find: (t, e = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(e, t)),
      findOne: (t, e = document.documentElement) =>
        Element.prototype.querySelector.call(e, t),
      children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)),
      parents(t, e) {
        const i = [];
        let n = t.parentNode;
        for (; n && n.nodeType === Node.ELEMENT_NODE && 3 !== n.nodeType; )
          n.matches(e) && i.push(n), (n = n.parentNode);
        return i;
      },
      prev(t, e) {
        let i = t.previousElementSibling;
        for (; i; ) {
          if (i.matches(e)) return [i];
          i = i.previousElementSibling;
        }
        return [];
      },
      next(t, e) {
        let i = t.nextElementSibling;
        for (; i; ) {
          if (i.matches(e)) return [i];
          i = i.nextElementSibling;
        }
        return [];
      },
    },
    $ = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    F = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    K = "next",
    Y = "prev",
    q = "left",
    V = "right";
  class X extends M {
    constructor(t, e) {
      super(t),
        (this._items = null),
        (this._interval = null),
        (this._activeElement = null),
        (this._isPaused = !1),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this.touchStartX = 0),
        (this.touchDeltaX = 0),
        (this._config = this._getConfig(e)),
        (this._indicatorsElement = U.findOne(
          ".carousel-indicators",
          this._element
        )),
        (this._touchSupported =
          "ontouchstart" in document.documentElement ||
          navigator.maxTouchPoints > 0),
        (this._pointerEvent = Boolean(window.PointerEvent)),
        this._addEventListeners();
    }
    static get Default() {
      return $;
    }
    static get DATA_KEY() {
      return "bs.carousel";
    }
    next() {
      this._isSliding || this._slide(K);
    }
    nextWhenVisible() {
      !document.hidden && c(this._element) && this.next();
    }
    prev() {
      this._isSliding || this._slide(Y);
    }
    pause(t) {
      t || (this._isPaused = !0),
        U.findOne(".carousel-item-next, .carousel-item-prev", this._element) &&
          (o(this._element), this.cycle(!0)),
        clearInterval(this._interval),
        (this._interval = null);
    }
    cycle(t) {
      t || (this._isPaused = !1),
        this._interval &&
          (clearInterval(this._interval), (this._interval = null)),
        this._config &&
          this._config.interval &&
          !this._isPaused &&
          (this._updateInterval(),
          (this._interval = setInterval(
            (document.visibilityState ? this.nextWhenVisible : this.next).bind(
              this
            ),
            this._config.interval
          )));
    }
    to(t) {
      this._activeElement = U.findOne(".active.carousel-item", this._element);
      const e = this._getItemIndex(this._activeElement);
      if (t > this._items.length - 1 || t < 0) return;
      if (this._isSliding)
        return void I.one(this._element, "slid.bs.carousel", () => this.to(t));
      if (e === t) return this.pause(), void this.cycle();
      const i = t > e ? K : Y;
      this._slide(i, this._items[t]);
    }
    dispose() {
      (this._items = null),
        (this._config = null),
        (this._interval = null),
        (this._isPaused = null),
        (this._isSliding = null),
        (this._activeElement = null),
        (this._indicatorsElement = null),
        super.dispose();
    }
    _getConfig(t) {
      return (t = { ...$, ...t }), l("carousel", t, F), t;
    }
    _handleSwipe() {
      const t = Math.abs(this.touchDeltaX);
      if (t <= 40) return;
      const e = t / this.touchDeltaX;
      (this.touchDeltaX = 0), e && this._slide(e > 0 ? V : q);
    }
    _addEventListeners() {
      this._config.keyboard &&
        I.on(this._element, "keydown.bs.carousel", (t) => this._keydown(t)),
        "hover" === this._config.pause &&
          (I.on(this._element, "mouseenter.bs.carousel", (t) => this.pause(t)),
          I.on(this._element, "mouseleave.bs.carousel", (t) => this.cycle(t))),
        this._config.touch &&
          this._touchSupported &&
          this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      const t = (t) => {
          !this._pointerEvent ||
          ("pen" !== t.pointerType && "touch" !== t.pointerType)
            ? this._pointerEvent || (this.touchStartX = t.touches[0].clientX)
            : (this.touchStartX = t.clientX);
        },
        e = (t) => {
          this.touchDeltaX =
            t.touches && t.touches.length > 1
              ? 0
              : t.touches[0].clientX - this.touchStartX;
        },
        i = (t) => {
          !this._pointerEvent ||
            ("pen" !== t.pointerType && "touch" !== t.pointerType) ||
            (this.touchDeltaX = t.clientX - this.touchStartX),
            this._handleSwipe(),
            "hover" === this._config.pause &&
              (this.pause(),
              this.touchTimeout && clearTimeout(this.touchTimeout),
              (this.touchTimeout = setTimeout(
                (t) => this.cycle(t),
                500 + this._config.interval
              )));
        };
      U.find(".carousel-item img", this._element).forEach((t) => {
        I.on(t, "dragstart.bs.carousel", (t) => t.preventDefault());
      }),
        this._pointerEvent
          ? (I.on(this._element, "pointerdown.bs.carousel", (e) => t(e)),
            I.on(this._element, "pointerup.bs.carousel", (t) => i(t)),
            this._element.classList.add("pointer-event"))
          : (I.on(this._element, "touchstart.bs.carousel", (e) => t(e)),
            I.on(this._element, "touchmove.bs.carousel", (t) => e(t)),
            I.on(this._element, "touchend.bs.carousel", (t) => i(t)));
    }
    _keydown(t) {
      /input|textarea/i.test(t.target.tagName) ||
        ("ArrowLeft" === t.key
          ? (t.preventDefault(), this._slide(V))
          : "ArrowRight" === t.key && (t.preventDefault(), this._slide(q)));
    }
    _getItemIndex(t) {
      return (
        (this._items =
          t && t.parentNode ? U.find(".carousel-item", t.parentNode) : []),
        this._items.indexOf(t)
      );
    }
    _getItemByOrder(t, e) {
      const i = t === K,
        n = t === Y,
        s = this._getItemIndex(e),
        o = this._items.length - 1;
      if (((n && 0 === s) || (i && s === o)) && !this._config.wrap) return e;
      const r = (s + (n ? -1 : 1)) % this._items.length;
      return -1 === r ? this._items[this._items.length - 1] : this._items[r];
    }
    _triggerSlideEvent(t, e) {
      const i = this._getItemIndex(t),
        n = this._getItemIndex(
          U.findOne(".active.carousel-item", this._element)
        );
      return I.trigger(this._element, "slide.bs.carousel", {
        relatedTarget: t,
        direction: e,
        from: n,
        to: i,
      });
    }
    _setActiveIndicatorElement(t) {
      if (this._indicatorsElement) {
        const e = U.findOne(".active", this._indicatorsElement);
        e.classList.remove("active"), e.removeAttribute("aria-current");
        const i = U.find("[data-bs-target]", this._indicatorsElement);
        for (let e = 0; e < i.length; e++)
          if (
            Number.parseInt(i[e].getAttribute("data-bs-slide-to"), 10) ===
            this._getItemIndex(t)
          ) {
            i[e].classList.add("active"),
              i[e].setAttribute("aria-current", "true");
            break;
          }
      }
    }
    _updateInterval() {
      const t =
        this._activeElement ||
        U.findOne(".active.carousel-item", this._element);
      if (!t) return;
      const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
      e
        ? ((this._config.defaultInterval =
            this._config.defaultInterval || this._config.interval),
          (this._config.interval = e))
        : (this._config.interval =
            this._config.defaultInterval || this._config.interval);
    }
    _slide(t, e) {
      const i = this._directionToOrder(t),
        n = U.findOne(".active.carousel-item", this._element),
        o = this._getItemIndex(n),
        r = e || this._getItemByOrder(i, n),
        l = this._getItemIndex(r),
        c = Boolean(this._interval),
        d = i === K,
        h = d ? "carousel-item-start" : "carousel-item-end",
        u = d ? "carousel-item-next" : "carousel-item-prev",
        p = this._orderToDirection(i);
      if (r && r.classList.contains("active")) this._isSliding = !1;
      else if (!this._triggerSlideEvent(r, p).defaultPrevented && n && r) {
        if (
          ((this._isSliding = !0),
          c && this.pause(),
          this._setActiveIndicatorElement(r),
          (this._activeElement = r),
          this._element.classList.contains("slide"))
        ) {
          r.classList.add(u), f(r), n.classList.add(h), r.classList.add(h);
          const t = s(n);
          I.one(n, "transitionend", () => {
            r.classList.remove(h, u),
              r.classList.add("active"),
              n.classList.remove("active", u, h),
              (this._isSliding = !1),
              setTimeout(() => {
                I.trigger(this._element, "slid.bs.carousel", {
                  relatedTarget: r,
                  direction: p,
                  from: o,
                  to: l,
                });
              }, 0);
          }),
            a(n, t);
        } else
          n.classList.remove("active"),
            r.classList.add("active"),
            (this._isSliding = !1),
            I.trigger(this._element, "slid.bs.carousel", {
              relatedTarget: r,
              direction: p,
              from: o,
              to: l,
            });
        c && this.cycle();
      }
    }
    _directionToOrder(t) {
      return [V, q].includes(t)
        ? g()
          ? t === q
            ? Y
            : K
          : t === q
          ? K
          : Y
        : t;
    }
    _orderToDirection(t) {
      return [K, Y].includes(t)
        ? g()
          ? t === Y
            ? q
            : V
          : t === Y
          ? V
          : q
        : t;
    }
    static carouselInterface(t, e) {
      let i = v.get(t, "bs.carousel"),
        n = { ...$, ...z.getDataAttributes(t) };
      "object" == typeof e && (n = { ...n, ...e });
      const s = "string" == typeof e ? e : n.slide;
      if ((i || (i = new X(t, n)), "number" == typeof e)) i.to(e);
      else if ("string" == typeof s) {
        if (void 0 === i[s]) throw new TypeError(`No method named "${s}"`);
        i[s]();
      } else n.interval && n.ride && (i.pause(), i.cycle());
    }
    static jQueryInterface(t) {
      return this.each(function () {
        X.carouselInterface(this, t);
      });
    }
    static dataApiClickHandler(t) {
      const e = n(this);
      if (!e || !e.classList.contains("carousel")) return;
      const i = { ...z.getDataAttributes(e), ...z.getDataAttributes(this) },
        s = this.getAttribute("data-bs-slide-to");
      s && (i.interval = !1),
        X.carouselInterface(e, i),
        s && v.get(e, "bs.carousel").to(s),
        t.preventDefault();
    }
  }
  I.on(
    document,
    "click.bs.carousel.data-api",
    "[data-bs-slide], [data-bs-slide-to]",
    X.dataApiClickHandler
  ),
    I.on(window, "load.bs.carousel.data-api", () => {
      const t = U.find('[data-bs-ride="carousel"]');
      for (let e = 0, i = t.length; e < i; e++)
        X.carouselInterface(t[e], v.get(t[e], "bs.carousel"));
    }),
    m("carousel", X);
  const Q = { toggle: !0, parent: "" },
    G = { toggle: "boolean", parent: "(string|element)" };
  class Z extends M {
    constructor(t, e) {
      super(t),
        (this._isTransitioning = !1),
        (this._config = this._getConfig(e)),
        (this._triggerArray = U.find(
          `[data-bs-toggle="collapse"][href="#${this._element.id}"],[data-bs-toggle="collapse"][data-bs-target="#${this._element.id}"]`
        ));
      const n = U.find('[data-bs-toggle="collapse"]');
      for (let t = 0, e = n.length; t < e; t++) {
        const e = n[t],
          s = i(e),
          o = U.find(s).filter((t) => t === this._element);
        null !== s &&
          o.length &&
          ((this._selector = s), this._triggerArray.push(e));
      }
      (this._parent = this._config.parent ? this._getParent() : null),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._element, this._triggerArray),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return Q;
    }
    static get DATA_KEY() {
      return "bs.collapse";
    }
    toggle() {
      this._element.classList.contains("show") ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._element.classList.contains("show"))
        return;
      let t, e;
      this._parent &&
        ((t = U.find(".show, .collapsing", this._parent).filter((t) =>
          "string" == typeof this._config.parent
            ? t.getAttribute("data-bs-parent") === this._config.parent
            : t.classList.contains("collapse")
        )),
        0 === t.length && (t = null));
      const i = U.findOne(this._selector);
      if (t) {
        const n = t.find((t) => i !== t);
        if (((e = n ? v.get(n, "bs.collapse") : null), e && e._isTransitioning))
          return;
      }
      if (I.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
      t &&
        t.forEach((t) => {
          i !== t && Z.collapseInterface(t, "hide"),
            e || v.set(t, "bs.collapse", null);
        });
      const n = this._getDimension();
      this._element.classList.remove("collapse"),
        this._element.classList.add("collapsing"),
        (this._element.style[n] = 0),
        this._triggerArray.length &&
          this._triggerArray.forEach((t) => {
            t.classList.remove("collapsed"),
              t.setAttribute("aria-expanded", !0);
          }),
        this.setTransitioning(!0);
      const o = "scroll" + (n[0].toUpperCase() + n.slice(1)),
        r = s(this._element);
      I.one(this._element, "transitionend", () => {
        this._element.classList.remove("collapsing"),
          this._element.classList.add("collapse", "show"),
          (this._element.style[n] = ""),
          this.setTransitioning(!1),
          I.trigger(this._element, "shown.bs.collapse");
      }),
        a(this._element, r),
        (this._element.style[n] = this._element[o] + "px");
    }
    hide() {
      if (this._isTransitioning || !this._element.classList.contains("show"))
        return;
      if (I.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
      const t = this._getDimension();
      (this._element.style[t] =
        this._element.getBoundingClientRect()[t] + "px"),
        f(this._element),
        this._element.classList.add("collapsing"),
        this._element.classList.remove("collapse", "show");
      const e = this._triggerArray.length;
      if (e > 0)
        for (let t = 0; t < e; t++) {
          const e = this._triggerArray[t],
            i = n(e);
          i &&
            !i.classList.contains("show") &&
            (e.classList.add("collapsed"), e.setAttribute("aria-expanded", !1));
        }
      this.setTransitioning(!0), (this._element.style[t] = "");
      const i = s(this._element);
      I.one(this._element, "transitionend", () => {
        this.setTransitioning(!1),
          this._element.classList.remove("collapsing"),
          this._element.classList.add("collapse"),
          I.trigger(this._element, "hidden.bs.collapse");
      }),
        a(this._element, i);
    }
    setTransitioning(t) {
      this._isTransitioning = t;
    }
    dispose() {
      super.dispose(),
        (this._config = null),
        (this._parent = null),
        (this._triggerArray = null),
        (this._isTransitioning = null);
    }
    _getConfig(t) {
      return (
        ((t = { ...Q, ...t }).toggle = Boolean(t.toggle)),
        l("collapse", t, G),
        t
      );
    }
    _getDimension() {
      return this._element.classList.contains("width") ? "width" : "height";
    }
    _getParent() {
      let { parent: t } = this._config;
      r(t)
        ? (void 0 === t.jquery && void 0 === t[0]) || (t = t[0])
        : (t = U.findOne(t));
      const e = `[data-bs-toggle="collapse"][data-bs-parent="${t}"]`;
      return (
        U.find(e, t).forEach((t) => {
          const e = n(t);
          this._addAriaAndCollapsedClass(e, [t]);
        }),
        t
      );
    }
    _addAriaAndCollapsedClass(t, e) {
      if (!t || !e.length) return;
      const i = t.classList.contains("show");
      e.forEach((t) => {
        i ? t.classList.remove("collapsed") : t.classList.add("collapsed"),
          t.setAttribute("aria-expanded", i);
      });
    }
    static collapseInterface(t, e) {
      let i = v.get(t, "bs.collapse");
      const n = {
        ...Q,
        ...z.getDataAttributes(t),
        ...("object" == typeof e && e ? e : {}),
      };
      if (
        (!i &&
          n.toggle &&
          "string" == typeof e &&
          /show|hide/.test(e) &&
          (n.toggle = !1),
        i || (i = new Z(t, n)),
        "string" == typeof e)
      ) {
        if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
        i[e]();
      }
    }
    static jQueryInterface(t) {
      return this.each(function () {
        Z.collapseInterface(this, t);
      });
    }
  }
  I.on(
    document,
    "click.bs.collapse.data-api",
    '[data-bs-toggle="collapse"]',
    function (t) {
      ("A" === t.target.tagName ||
        (t.delegateTarget && "A" === t.delegateTarget.tagName)) &&
        t.preventDefault();
      const e = z.getDataAttributes(this),
        n = i(this);
      U.find(n).forEach((t) => {
        const i = v.get(t, "bs.collapse");
        let n;
        i
          ? (null === i._parent &&
              "string" == typeof e.parent &&
              ((i._config.parent = e.parent), (i._parent = i._getParent())),
            (n = "toggle"))
          : (n = e),
          Z.collapseInterface(t, n);
      });
    }
  ),
    m("collapse", Z);
  var J = "top",
    tt = "bottom",
    et = "right",
    it = "left",
    nt = [J, tt, et, it],
    st = nt.reduce(function (t, e) {
      return t.concat([e + "-start", e + "-end"]);
    }, []),
    ot = [].concat(nt, ["auto"]).reduce(function (t, e) {
      return t.concat([e, e + "-start", e + "-end"]);
    }, []),
    rt = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function at(t) {
    return t ? (t.nodeName || "").toLowerCase() : null;
  }
  function lt(t) {
    if (null == t) return window;
    if ("[object Window]" !== t.toString()) {
      var e = t.ownerDocument;
      return (e && e.defaultView) || window;
    }
    return t;
  }
  function ct(t) {
    return t instanceof lt(t).Element || t instanceof Element;
  }
  function dt(t) {
    return t instanceof lt(t).HTMLElement || t instanceof HTMLElement;
  }
  function ht(t) {
    return (
      "undefined" != typeof ShadowRoot &&
      (t instanceof lt(t).ShadowRoot || t instanceof ShadowRoot)
    );
  }
  var ut = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (t) {
      var e = t.state;
      Object.keys(e.elements).forEach(function (t) {
        var i = e.styles[t] || {},
          n = e.attributes[t] || {},
          s = e.elements[t];
        dt(s) &&
          at(s) &&
          (Object.assign(s.style, i),
          Object.keys(n).forEach(function (t) {
            var e = n[t];
            !1 === e
              ? s.removeAttribute(t)
              : s.setAttribute(t, !0 === e ? "" : e);
          }));
      });
    },
    effect: function (t) {
      var e = t.state,
        i = {
          popper: {
            position: e.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(e.elements.popper.style, i.popper),
        (e.styles = i),
        e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow),
        function () {
          Object.keys(e.elements).forEach(function (t) {
            var n = e.elements[t],
              s = e.attributes[t] || {},
              o = Object.keys(
                e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]
              ).reduce(function (t, e) {
                return (t[e] = ""), t;
              }, {});
            dt(n) &&
              at(n) &&
              (Object.assign(n.style, o),
              Object.keys(s).forEach(function (t) {
                n.removeAttribute(t);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  function ft(t) {
    return t.split("-")[0];
  }
  function pt(t) {
    var e = t.getBoundingClientRect();
    return {
      width: e.width,
      height: e.height,
      top: e.top,
      right: e.right,
      bottom: e.bottom,
      left: e.left,
      x: e.left,
      y: e.top,
    };
  }
  function gt(t) {
    var e = pt(t),
      i = t.offsetWidth,
      n = t.offsetHeight;
    return (
      Math.abs(e.width - i) <= 1 && (i = e.width),
      Math.abs(e.height - n) <= 1 && (n = e.height),
      { x: t.offsetLeft, y: t.offsetTop, width: i, height: n }
    );
  }
  function mt(t, e) {
    var i = e.getRootNode && e.getRootNode();
    if (t.contains(e)) return !0;
    if (i && ht(i)) {
      var n = e;
      do {
        if (n && t.isSameNode(n)) return !0;
        n = n.parentNode || n.host;
      } while (n);
    }
    return !1;
  }
  function _t(t) {
    return lt(t).getComputedStyle(t);
  }
  function bt(t) {
    return ["table", "td", "th"].indexOf(at(t)) >= 0;
  }
  function vt(t) {
    return (
      (ct(t) ? t.ownerDocument : t.document) || window.document
    ).documentElement;
  }
  function yt(t) {
    return "html" === at(t)
      ? t
      : t.assignedSlot || t.parentNode || (ht(t) ? t.host : null) || vt(t);
  }
  function wt(t) {
    return dt(t) && "fixed" !== _t(t).position ? t.offsetParent : null;
  }
  function Et(t) {
    for (var e = lt(t), i = wt(t); i && bt(i) && "static" === _t(i).position; )
      i = wt(i);
    return i &&
      ("html" === at(i) || ("body" === at(i) && "static" === _t(i).position))
      ? e
      : i ||
          (function (t) {
            var e = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              dt(t) &&
              "fixed" === _t(t).position
            )
              return null;
            for (
              var i = yt(t);
              dt(i) && ["html", "body"].indexOf(at(i)) < 0;

            ) {
              var n = _t(i);
              if (
                "none" !== n.transform ||
                "none" !== n.perspective ||
                "paint" === n.contain ||
                -1 !== ["transform", "perspective"].indexOf(n.willChange) ||
                (e && "filter" === n.willChange) ||
                (e && n.filter && "none" !== n.filter)
              )
                return i;
              i = i.parentNode;
            }
            return null;
          })(t) ||
          e;
  }
  function Tt(t) {
    return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
  }
  var At = Math.max,
    Lt = Math.min,
    Ot = Math.round;
  function kt(t, e, i) {
    return At(t, Lt(e, i));
  }
  function Dt(t) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t);
  }
  function xt(t, e) {
    return e.reduce(function (e, i) {
      return (e[i] = t), e;
    }, {});
  }
  var Ct = {
      name: "arrow",
      enabled: !0,
      phase: "main",
      fn: function (t) {
        var e,
          i = t.state,
          n = t.name,
          s = t.options,
          o = i.elements.arrow,
          r = i.modifiersData.popperOffsets,
          a = ft(i.placement),
          l = Tt(a),
          c = [it, et].indexOf(a) >= 0 ? "height" : "width";
        if (o && r) {
          var d = (function (t, e) {
              return Dt(
                "number" !=
                  typeof (t =
                    "function" == typeof t
                      ? t(
                          Object.assign({}, e.rects, { placement: e.placement })
                        )
                      : t)
                  ? t
                  : xt(t, nt)
              );
            })(s.padding, i),
            h = gt(o),
            u = "y" === l ? J : it,
            f = "y" === l ? tt : et,
            p =
              i.rects.reference[c] +
              i.rects.reference[l] -
              r[l] -
              i.rects.popper[c],
            g = r[l] - i.rects.reference[l],
            m = Et(o),
            _ = m ? ("y" === l ? m.clientHeight || 0 : m.clientWidth || 0) : 0,
            b = p / 2 - g / 2,
            v = d[u],
            y = _ - h[c] - d[f],
            w = _ / 2 - h[c] / 2 + b,
            E = kt(v, w, y),
            T = l;
          i.modifiersData[n] = (((e = {})[T] = E), (e.centerOffset = E - w), e);
        }
      },
      effect: function (t) {
        var e = t.state,
          i = t.options.element,
          n = void 0 === i ? "[data-popper-arrow]" : i;
        null != n &&
          ("string" != typeof n || (n = e.elements.popper.querySelector(n))) &&
          mt(e.elements.popper, n) &&
          (e.elements.arrow = n);
      },
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"],
    },
    St = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Nt(t) {
    var e,
      i = t.popper,
      n = t.popperRect,
      s = t.placement,
      o = t.offsets,
      r = t.position,
      a = t.gpuAcceleration,
      l = t.adaptive,
      c = t.roundOffsets,
      d =
        !0 === c
          ? (function (t) {
              var e = t.x,
                i = t.y,
                n = window.devicePixelRatio || 1;
              return { x: Ot(Ot(e * n) / n) || 0, y: Ot(Ot(i * n) / n) || 0 };
            })(o)
          : "function" == typeof c
          ? c(o)
          : o,
      h = d.x,
      u = void 0 === h ? 0 : h,
      f = d.y,
      p = void 0 === f ? 0 : f,
      g = o.hasOwnProperty("x"),
      m = o.hasOwnProperty("y"),
      _ = it,
      b = J,
      v = window;
    if (l) {
      var y = Et(i),
        w = "clientHeight",
        E = "clientWidth";
      y === lt(i) &&
        "static" !== _t((y = vt(i))).position &&
        ((w = "scrollHeight"), (E = "scrollWidth")),
        (y = y),
        s === J && ((b = tt), (p -= y[w] - n.height), (p *= a ? 1 : -1)),
        s === it && ((_ = et), (u -= y[E] - n.width), (u *= a ? 1 : -1));
    }
    var T,
      A = Object.assign({ position: r }, l && St);
    return a
      ? Object.assign(
          {},
          A,
          (((T = {})[b] = m ? "0" : ""),
          (T[_] = g ? "0" : ""),
          (T.transform =
            (v.devicePixelRatio || 1) < 2
              ? "translate(" + u + "px, " + p + "px)"
              : "translate3d(" + u + "px, " + p + "px, 0)"),
          T)
        )
      : Object.assign(
          {},
          A,
          (((e = {})[b] = m ? p + "px" : ""),
          (e[_] = g ? u + "px" : ""),
          (e.transform = ""),
          e)
        );
  }
  var jt = {
      name: "computeStyles",
      enabled: !0,
      phase: "beforeWrite",
      fn: function (t) {
        var e = t.state,
          i = t.options,
          n = i.gpuAcceleration,
          s = void 0 === n || n,
          o = i.adaptive,
          r = void 0 === o || o,
          a = i.roundOffsets,
          l = void 0 === a || a,
          c = {
            placement: ft(e.placement),
            popper: e.elements.popper,
            popperRect: e.rects.popper,
            gpuAcceleration: s,
          };
        null != e.modifiersData.popperOffsets &&
          (e.styles.popper = Object.assign(
            {},
            e.styles.popper,
            Nt(
              Object.assign({}, c, {
                offsets: e.modifiersData.popperOffsets,
                position: e.options.strategy,
                adaptive: r,
                roundOffsets: l,
              })
            )
          )),
          null != e.modifiersData.arrow &&
            (e.styles.arrow = Object.assign(
              {},
              e.styles.arrow,
              Nt(
                Object.assign({}, c, {
                  offsets: e.modifiersData.arrow,
                  position: "absolute",
                  adaptive: !1,
                  roundOffsets: l,
                })
              )
            )),
          (e.attributes.popper = Object.assign({}, e.attributes.popper, {
            "data-popper-placement": e.placement,
          }));
      },
      data: {},
    },
    Pt = { passive: !0 },
    It = {
      name: "eventListeners",
      enabled: !0,
      phase: "write",
      fn: function () {},
      effect: function (t) {
        var e = t.state,
          i = t.instance,
          n = t.options,
          s = n.scroll,
          o = void 0 === s || s,
          r = n.resize,
          a = void 0 === r || r,
          l = lt(e.elements.popper),
          c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
        return (
          o &&
            c.forEach(function (t) {
              t.addEventListener("scroll", i.update, Pt);
            }),
          a && l.addEventListener("resize", i.update, Pt),
          function () {
            o &&
              c.forEach(function (t) {
                t.removeEventListener("scroll", i.update, Pt);
              }),
              a && l.removeEventListener("resize", i.update, Pt);
          }
        );
      },
      data: {},
    },
    Mt = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function Ht(t) {
    return t.replace(/left|right|bottom|top/g, function (t) {
      return Mt[t];
    });
  }
  var Rt = { start: "end", end: "start" };
  function Bt(t) {
    return t.replace(/start|end/g, function (t) {
      return Rt[t];
    });
  }
  function Wt(t) {
    var e = lt(t);
    return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
  }
  function zt(t) {
    return pt(vt(t)).left + Wt(t).scrollLeft;
  }
  function Ut(t) {
    var e = _t(t),
      i = e.overflow,
      n = e.overflowX,
      s = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(i + s + n);
  }
  function $t(t, e) {
    var i;
    void 0 === e && (e = []);
    var n = (function t(e) {
        return ["html", "body", "#document"].indexOf(at(e)) >= 0
          ? e.ownerDocument.body
          : dt(e) && Ut(e)
          ? e
          : t(yt(e));
      })(t),
      s = n === (null == (i = t.ownerDocument) ? void 0 : i.body),
      o = lt(n),
      r = s ? [o].concat(o.visualViewport || [], Ut(n) ? n : []) : n,
      a = e.concat(r);
    return s ? a : a.concat($t(yt(r)));
  }
  function Ft(t) {
    return Object.assign({}, t, {
      left: t.x,
      top: t.y,
      right: t.x + t.width,
      bottom: t.y + t.height,
    });
  }
  function Kt(t, e) {
    return "viewport" === e
      ? Ft(
          (function (t) {
            var e = lt(t),
              i = vt(t),
              n = e.visualViewport,
              s = i.clientWidth,
              o = i.clientHeight,
              r = 0,
              a = 0;
            return (
              n &&
                ((s = n.width),
                (o = n.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((r = n.offsetLeft), (a = n.offsetTop))),
              { width: s, height: o, x: r + zt(t), y: a }
            );
          })(t)
        )
      : dt(e)
      ? (function (t) {
          var e = pt(t);
          return (
            (e.top = e.top + t.clientTop),
            (e.left = e.left + t.clientLeft),
            (e.bottom = e.top + t.clientHeight),
            (e.right = e.left + t.clientWidth),
            (e.width = t.clientWidth),
            (e.height = t.clientHeight),
            (e.x = e.left),
            (e.y = e.top),
            e
          );
        })(e)
      : Ft(
          (function (t) {
            var e,
              i = vt(t),
              n = Wt(t),
              s = null == (e = t.ownerDocument) ? void 0 : e.body,
              o = At(
                i.scrollWidth,
                i.clientWidth,
                s ? s.scrollWidth : 0,
                s ? s.clientWidth : 0
              ),
              r = At(
                i.scrollHeight,
                i.clientHeight,
                s ? s.scrollHeight : 0,
                s ? s.clientHeight : 0
              ),
              a = -n.scrollLeft + zt(t),
              l = -n.scrollTop;
            return (
              "rtl" === _t(s || i).direction &&
                (a += At(i.clientWidth, s ? s.clientWidth : 0) - o),
              { width: o, height: r, x: a, y: l }
            );
          })(vt(t))
        );
  }
  function Yt(t) {
    return t.split("-")[1];
  }
  function qt(t) {
    var e,
      i = t.reference,
      n = t.element,
      s = t.placement,
      o = s ? ft(s) : null,
      r = s ? Yt(s) : null,
      a = i.x + i.width / 2 - n.width / 2,
      l = i.y + i.height / 2 - n.height / 2;
    switch (o) {
      case J:
        e = { x: a, y: i.y - n.height };
        break;
      case tt:
        e = { x: a, y: i.y + i.height };
        break;
      case et:
        e = { x: i.x + i.width, y: l };
        break;
      case it:
        e = { x: i.x - n.width, y: l };
        break;
      default:
        e = { x: i.x, y: i.y };
    }
    var c = o ? Tt(o) : null;
    if (null != c) {
      var d = "y" === c ? "height" : "width";
      switch (r) {
        case "start":
          e[c] = e[c] - (i[d] / 2 - n[d] / 2);
          break;
        case "end":
          e[c] = e[c] + (i[d] / 2 - n[d] / 2);
      }
    }
    return e;
  }
  function Vt(t, e) {
    void 0 === e && (e = {});
    var i = e,
      n = i.placement,
      s = void 0 === n ? t.placement : n,
      o = i.boundary,
      r = void 0 === o ? "clippingParents" : o,
      a = i.rootBoundary,
      l = void 0 === a ? "viewport" : a,
      c = i.elementContext,
      d = void 0 === c ? "popper" : c,
      h = i.altBoundary,
      u = void 0 !== h && h,
      f = i.padding,
      p = void 0 === f ? 0 : f,
      g = Dt("number" != typeof p ? p : xt(p, nt)),
      m = "popper" === d ? "reference" : "popper",
      _ = t.elements.reference,
      b = t.rects.popper,
      v = t.elements[u ? m : d],
      y = (function (t, e, i) {
        var n =
            "clippingParents" === e
              ? (function (t) {
                  var e = $t(yt(t)),
                    i =
                      ["absolute", "fixed"].indexOf(_t(t).position) >= 0 &&
                      dt(t)
                        ? Et(t)
                        : t;
                  return ct(i)
                    ? e.filter(function (t) {
                        return ct(t) && mt(t, i) && "body" !== at(t);
                      })
                    : [];
                })(t)
              : [].concat(e),
          s = [].concat(n, [i]),
          o = s[0],
          r = s.reduce(function (e, i) {
            var n = Kt(t, i);
            return (
              (e.top = At(n.top, e.top)),
              (e.right = Lt(n.right, e.right)),
              (e.bottom = Lt(n.bottom, e.bottom)),
              (e.left = At(n.left, e.left)),
              e
            );
          }, Kt(t, o));
        return (
          (r.width = r.right - r.left),
          (r.height = r.bottom - r.top),
          (r.x = r.left),
          (r.y = r.top),
          r
        );
      })(ct(v) ? v : v.contextElement || vt(t.elements.popper), r, l),
      w = pt(_),
      E = qt({ reference: w, element: b, strategy: "absolute", placement: s }),
      T = Ft(Object.assign({}, b, E)),
      A = "popper" === d ? T : w,
      L = {
        top: y.top - A.top + g.top,
        bottom: A.bottom - y.bottom + g.bottom,
        left: y.left - A.left + g.left,
        right: A.right - y.right + g.right,
      },
      O = t.modifiersData.offset;
    if ("popper" === d && O) {
      var k = O[s];
      Object.keys(L).forEach(function (t) {
        var e = [et, tt].indexOf(t) >= 0 ? 1 : -1,
          i = [J, tt].indexOf(t) >= 0 ? "y" : "x";
        L[t] += k[i] * e;
      });
    }
    return L;
  }
  function Xt(t, e) {
    void 0 === e && (e = {});
    var i = e,
      n = i.placement,
      s = i.boundary,
      o = i.rootBoundary,
      r = i.padding,
      a = i.flipVariations,
      l = i.allowedAutoPlacements,
      c = void 0 === l ? ot : l,
      d = Yt(n),
      h = d
        ? a
          ? st
          : st.filter(function (t) {
              return Yt(t) === d;
            })
        : nt,
      u = h.filter(function (t) {
        return c.indexOf(t) >= 0;
      });
    0 === u.length && (u = h);
    var f = u.reduce(function (e, i) {
      return (
        (e[i] = Vt(t, {
          placement: i,
          boundary: s,
          rootBoundary: o,
          padding: r,
        })[ft(i)]),
        e
      );
    }, {});
    return Object.keys(f).sort(function (t, e) {
      return f[t] - f[e];
    });
  }
  var Qt = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function (t) {
      var e = t.state,
        i = t.options,
        n = t.name;
      if (!e.modifiersData[n]._skip) {
        for (
          var s = i.mainAxis,
            o = void 0 === s || s,
            r = i.altAxis,
            a = void 0 === r || r,
            l = i.fallbackPlacements,
            c = i.padding,
            d = i.boundary,
            h = i.rootBoundary,
            u = i.altBoundary,
            f = i.flipVariations,
            p = void 0 === f || f,
            g = i.allowedAutoPlacements,
            m = e.options.placement,
            _ = ft(m),
            b =
              l ||
              (_ !== m && p
                ? (function (t) {
                    if ("auto" === ft(t)) return [];
                    var e = Ht(t);
                    return [Bt(t), e, Bt(e)];
                  })(m)
                : [Ht(m)]),
            v = [m].concat(b).reduce(function (t, i) {
              return t.concat(
                "auto" === ft(i)
                  ? Xt(e, {
                      placement: i,
                      boundary: d,
                      rootBoundary: h,
                      padding: c,
                      flipVariations: p,
                      allowedAutoPlacements: g,
                    })
                  : i
              );
            }, []),
            y = e.rects.reference,
            w = e.rects.popper,
            E = new Map(),
            T = !0,
            A = v[0],
            L = 0;
          L < v.length;
          L++
        ) {
          var O = v[L],
            k = ft(O),
            D = "start" === Yt(O),
            x = [J, tt].indexOf(k) >= 0,
            C = x ? "width" : "height",
            S = Vt(e, {
              placement: O,
              boundary: d,
              rootBoundary: h,
              altBoundary: u,
              padding: c,
            }),
            N = x ? (D ? et : it) : D ? tt : J;
          y[C] > w[C] && (N = Ht(N));
          var j = Ht(N),
            P = [];
          if (
            (o && P.push(S[k] <= 0),
            a && P.push(S[N] <= 0, S[j] <= 0),
            P.every(function (t) {
              return t;
            }))
          ) {
            (A = O), (T = !1);
            break;
          }
          E.set(O, P);
        }
        if (T)
          for (
            var I = function (t) {
                var e = v.find(function (e) {
                  var i = E.get(e);
                  if (i)
                    return i.slice(0, t).every(function (t) {
                      return t;
                    });
                });
                if (e) return (A = e), "break";
              },
              M = p ? 3 : 1;
            M > 0 && "break" !== I(M);
            M--
          );
        e.placement !== A &&
          ((e.modifiersData[n]._skip = !0), (e.placement = A), (e.reset = !0));
      }
    },
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  function Gt(t, e, i) {
    return (
      void 0 === i && (i = { x: 0, y: 0 }),
      {
        top: t.top - e.height - i.y,
        right: t.right - e.width + i.x,
        bottom: t.bottom - e.height + i.y,
        left: t.left - e.width - i.x,
      }
    );
  }
  function Zt(t) {
    return [J, et, tt, it].some(function (e) {
      return t[e] >= 0;
    });
  }
  var Jt = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function (t) {
        var e = t.state,
          i = t.name,
          n = e.rects.reference,
          s = e.rects.popper,
          o = e.modifiersData.preventOverflow,
          r = Vt(e, { elementContext: "reference" }),
          a = Vt(e, { altBoundary: !0 }),
          l = Gt(r, n),
          c = Gt(a, s, o),
          d = Zt(l),
          h = Zt(c);
        (e.modifiersData[i] = {
          referenceClippingOffsets: l,
          popperEscapeOffsets: c,
          isReferenceHidden: d,
          hasPopperEscaped: h,
        }),
          (e.attributes.popper = Object.assign({}, e.attributes.popper, {
            "data-popper-reference-hidden": d,
            "data-popper-escaped": h,
          }));
      },
    },
    te = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (t) {
        var e = t.state,
          i = t.options,
          n = t.name,
          s = i.offset,
          o = void 0 === s ? [0, 0] : s,
          r = ot.reduce(function (t, i) {
            return (
              (t[i] = (function (t, e, i) {
                var n = ft(t),
                  s = [it, J].indexOf(n) >= 0 ? -1 : 1,
                  o =
                    "function" == typeof i
                      ? i(Object.assign({}, e, { placement: t }))
                      : i,
                  r = o[0],
                  a = o[1];
                return (
                  (r = r || 0),
                  (a = (a || 0) * s),
                  [it, et].indexOf(n) >= 0 ? { x: a, y: r } : { x: r, y: a }
                );
              })(i, e.rects, o)),
              t
            );
          }, {}),
          a = r[e.placement],
          l = a.x,
          c = a.y;
        null != e.modifiersData.popperOffsets &&
          ((e.modifiersData.popperOffsets.x += l),
          (e.modifiersData.popperOffsets.y += c)),
          (e.modifiersData[n] = r);
      },
    },
    ee = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function (t) {
        var e = t.state,
          i = t.name;
        e.modifiersData[i] = qt({
          reference: e.rects.reference,
          element: e.rects.popper,
          strategy: "absolute",
          placement: e.placement,
        });
      },
      data: {},
    },
    ie = {
      name: "preventOverflow",
      enabled: !0,
      phase: "main",
      fn: function (t) {
        var e = t.state,
          i = t.options,
          n = t.name,
          s = i.mainAxis,
          o = void 0 === s || s,
          r = i.altAxis,
          a = void 0 !== r && r,
          l = i.boundary,
          c = i.rootBoundary,
          d = i.altBoundary,
          h = i.padding,
          u = i.tether,
          f = void 0 === u || u,
          p = i.tetherOffset,
          g = void 0 === p ? 0 : p,
          m = Vt(e, {
            boundary: l,
            rootBoundary: c,
            padding: h,
            altBoundary: d,
          }),
          _ = ft(e.placement),
          b = Yt(e.placement),
          v = !b,
          y = Tt(_),
          w = "x" === y ? "y" : "x",
          E = e.modifiersData.popperOffsets,
          T = e.rects.reference,
          A = e.rects.popper,
          L =
            "function" == typeof g
              ? g(Object.assign({}, e.rects, { placement: e.placement }))
              : g,
          O = { x: 0, y: 0 };
        if (E) {
          if (o || a) {
            var k = "y" === y ? J : it,
              D = "y" === y ? tt : et,
              x = "y" === y ? "height" : "width",
              C = E[y],
              S = E[y] + m[k],
              N = E[y] - m[D],
              j = f ? -A[x] / 2 : 0,
              P = "start" === b ? T[x] : A[x],
              I = "start" === b ? -A[x] : -T[x],
              M = e.elements.arrow,
              H = f && M ? gt(M) : { width: 0, height: 0 },
              R = e.modifiersData["arrow#persistent"]
                ? e.modifiersData["arrow#persistent"].padding
                : { top: 0, right: 0, bottom: 0, left: 0 },
              B = R[k],
              W = R[D],
              z = kt(0, T[x], H[x]),
              U = v ? T[x] / 2 - j - z - B - L : P - z - B - L,
              $ = v ? -T[x] / 2 + j + z + W + L : I + z + W + L,
              F = e.elements.arrow && Et(e.elements.arrow),
              K = F ? ("y" === y ? F.clientTop || 0 : F.clientLeft || 0) : 0,
              Y = e.modifiersData.offset
                ? e.modifiersData.offset[e.placement][y]
                : 0,
              q = E[y] + U - Y - K,
              V = E[y] + $ - Y;
            if (o) {
              var X = kt(f ? Lt(S, q) : S, C, f ? At(N, V) : N);
              (E[y] = X), (O[y] = X - C);
            }
            if (a) {
              var Q = "x" === y ? J : it,
                G = "x" === y ? tt : et,
                Z = E[w],
                nt = Z + m[Q],
                st = Z - m[G],
                ot = kt(f ? Lt(nt, q) : nt, Z, f ? At(st, V) : st);
              (E[w] = ot), (O[w] = ot - Z);
            }
          }
          e.modifiersData[n] = O;
        }
      },
      requiresIfExists: ["offset"],
    };
  function ne(t, e, i) {
    void 0 === i && (i = !1);
    var n,
      s,
      o = vt(e),
      r = pt(t),
      a = dt(e),
      l = { scrollLeft: 0, scrollTop: 0 },
      c = { x: 0, y: 0 };
    return (
      (a || (!a && !i)) &&
        (("body" !== at(e) || Ut(o)) &&
          (l =
            (n = e) !== lt(n) && dt(n)
              ? { scrollLeft: (s = n).scrollLeft, scrollTop: s.scrollTop }
              : Wt(n)),
        dt(e)
          ? (((c = pt(e)).x += e.clientLeft), (c.y += e.clientTop))
          : o && (c.x = zt(o))),
      {
        x: r.left + l.scrollLeft - c.x,
        y: r.top + l.scrollTop - c.y,
        width: r.width,
        height: r.height,
      }
    );
  }
  var se = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function oe() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    return !e.some(function (t) {
      return !(t && "function" == typeof t.getBoundingClientRect);
    });
  }
  function re(t) {
    void 0 === t && (t = {});
    var e = t,
      i = e.defaultModifiers,
      n = void 0 === i ? [] : i,
      s = e.defaultOptions,
      o = void 0 === s ? se : s;
    return function (t, e, i) {
      void 0 === i && (i = o);
      var s,
        r,
        a = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, se, o),
          modifiersData: {},
          elements: { reference: t, popper: e },
          attributes: {},
          styles: {},
        },
        l = [],
        c = !1,
        d = {
          state: a,
          setOptions: function (i) {
            h(),
              (a.options = Object.assign({}, o, a.options, i)),
              (a.scrollParents = {
                reference: ct(t)
                  ? $t(t)
                  : t.contextElement
                  ? $t(t.contextElement)
                  : [],
                popper: $t(e),
              });
            var s,
              r,
              c = (function (t) {
                var e = (function (t) {
                  var e = new Map(),
                    i = new Set(),
                    n = [];
                  return (
                    t.forEach(function (t) {
                      e.set(t.name, t);
                    }),
                    t.forEach(function (t) {
                      i.has(t.name) ||
                        (function t(s) {
                          i.add(s.name),
                            []
                              .concat(
                                s.requires || [],
                                s.requiresIfExists || []
                              )
                              .forEach(function (n) {
                                if (!i.has(n)) {
                                  var s = e.get(n);
                                  s && t(s);
                                }
                              }),
                            n.push(s);
                        })(t);
                    }),
                    n
                  );
                })(t);
                return rt.reduce(function (t, i) {
                  return t.concat(
                    e.filter(function (t) {
                      return t.phase === i;
                    })
                  );
                }, []);
              })(
                ((s = [].concat(n, a.options.modifiers)),
                (r = s.reduce(function (t, e) {
                  var i = t[e.name];
                  return (
                    (t[e.name] = i
                      ? Object.assign({}, i, e, {
                          options: Object.assign({}, i.options, e.options),
                          data: Object.assign({}, i.data, e.data),
                        })
                      : e),
                    t
                  );
                }, {})),
                Object.keys(r).map(function (t) {
                  return r[t];
                }))
              );
            return (
              (a.orderedModifiers = c.filter(function (t) {
                return t.enabled;
              })),
              a.orderedModifiers.forEach(function (t) {
                var e = t.name,
                  i = t.options,
                  n = void 0 === i ? {} : i,
                  s = t.effect;
                if ("function" == typeof s) {
                  var o = s({ state: a, name: e, instance: d, options: n });
                  l.push(o || function () {});
                }
              }),
              d.update()
            );
          },
          forceUpdate: function () {
            if (!c) {
              var t = a.elements,
                e = t.reference,
                i = t.popper;
              if (oe(e, i)) {
                (a.rects = {
                  reference: ne(e, Et(i), "fixed" === a.options.strategy),
                  popper: gt(i),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (t) {
                    return (a.modifiersData[t.name] = Object.assign(
                      {},
                      t.data
                    ));
                  });
                for (var n = 0; n < a.orderedModifiers.length; n++)
                  if (!0 !== a.reset) {
                    var s = a.orderedModifiers[n],
                      o = s.fn,
                      r = s.options,
                      l = void 0 === r ? {} : r,
                      h = s.name;
                    "function" == typeof o &&
                      (a =
                        o({ state: a, options: l, name: h, instance: d }) || a);
                  } else (a.reset = !1), (n = -1);
              }
            }
          },
          update:
            ((s = function () {
              return new Promise(function (t) {
                d.forceUpdate(), t(a);
              });
            }),
            function () {
              return (
                r ||
                  (r = new Promise(function (t) {
                    Promise.resolve().then(function () {
                      (r = void 0), t(s());
                    });
                  })),
                r
              );
            }),
          destroy: function () {
            h(), (c = !0);
          },
        };
      if (!oe(t, e)) return d;
      function h() {
        l.forEach(function (t) {
          return t();
        }),
          (l = []);
      }
      return (
        d.setOptions(i).then(function (t) {
          !c && i.onFirstUpdate && i.onFirstUpdate(t);
        }),
        d
      );
    };
  }
  var ae = re(),
    le = re({ defaultModifiers: [It, ee, jt, ut] }),
    ce = re({ defaultModifiers: [It, ee, jt, ut, te, Qt, ie, Ct, Jt] }),
    de = Object.freeze({
      __proto__: null,
      popperGenerator: re,
      detectOverflow: Vt,
      createPopperBase: ae,
      createPopper: ce,
      createPopperLite: le,
      top: J,
      bottom: tt,
      right: et,
      left: it,
      auto: "auto",
      basePlacements: nt,
      start: "start",
      end: "end",
      clippingParents: "clippingParents",
      viewport: "viewport",
      popper: "popper",
      reference: "reference",
      variationPlacements: st,
      placements: ot,
      beforeRead: "beforeRead",
      read: "read",
      afterRead: "afterRead",
      beforeMain: "beforeMain",
      main: "main",
      afterMain: "afterMain",
      beforeWrite: "beforeWrite",
      write: "write",
      afterWrite: "afterWrite",
      modifierPhases: rt,
      applyStyles: ut,
      arrow: Ct,
      computeStyles: jt,
      eventListeners: It,
      flip: Qt,
      hide: Jt,
      offset: te,
      popperOffsets: ee,
      preventOverflow: ie,
    });
  const he = new RegExp("ArrowUp|ArrowDown|Escape"),
    ue = g() ? "top-end" : "top-start",
    fe = g() ? "top-start" : "top-end",
    pe = g() ? "bottom-end" : "bottom-start",
    ge = g() ? "bottom-start" : "bottom-end",
    me = g() ? "left-start" : "right-start",
    _e = g() ? "right-start" : "left-start",
    be = {
      offset: [0, 2],
      boundary: "clippingParents",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
      autoClose: !0,
    },
    ve = {
      offset: "(array|string|function)",
      boundary: "(string|element)",
      reference: "(string|element|object)",
      display: "string",
      popperConfig: "(null|object|function)",
      autoClose: "(boolean|string)",
    };
  class ye extends M {
    constructor(t, e) {
      super(t),
        (this._popper = null),
        (this._config = this._getConfig(e)),
        (this._menu = this._getMenuElement()),
        (this._inNavbar = this._detectNavbar()),
        this._addEventListeners();
    }
    static get Default() {
      return be;
    }
    static get DefaultType() {
      return ve;
    }
    static get DATA_KEY() {
      return "bs.dropdown";
    }
    toggle() {
      d(this._element) ||
        (this._element.classList.contains("show") ? this.hide() : this.show());
    }
    show() {
      if (d(this._element) || this._menu.classList.contains("show")) return;
      const t = ye.getParentFromElement(this._element),
        e = { relatedTarget: this._element };
      if (!I.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
        if (this._inNavbar) z.setDataAttribute(this._menu, "popper", "none");
        else {
          if (void 0 === de)
            throw new TypeError(
              "Bootstrap's dropdowns require Popper (https://popper.js.org)"
            );
          let e = this._element;
          "parent" === this._config.reference
            ? (e = t)
            : r(this._config.reference)
            ? ((e = this._config.reference),
              void 0 !== this._config.reference.jquery &&
                (e = this._config.reference[0]))
            : "object" == typeof this._config.reference &&
              (e = this._config.reference);
          const i = this._getPopperConfig(),
            n = i.modifiers.find(
              (t) => "applyStyles" === t.name && !1 === t.enabled
            );
          (this._popper = ce(e, this._menu, i)),
            n && z.setDataAttribute(this._menu, "popper", "static");
        }
        "ontouchstart" in document.documentElement &&
          !t.closest(".navbar-nav") &&
          []
            .concat(...document.body.children)
            .forEach((t) => I.on(t, "mouseover", u)),
          this._element.focus(),
          this._element.setAttribute("aria-expanded", !0),
          this._menu.classList.toggle("show"),
          this._element.classList.toggle("show"),
          I.trigger(this._element, "shown.bs.dropdown", e);
      }
    }
    hide() {
      if (d(this._element) || !this._menu.classList.contains("show")) return;
      const t = { relatedTarget: this._element };
      this._completeHide(t);
    }
    dispose() {
      (this._menu = null),
        this._popper && (this._popper.destroy(), (this._popper = null)),
        super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _addEventListeners() {
      I.on(this._element, "click.bs.dropdown", (t) => {
        t.preventDefault(), this.toggle();
      });
    }
    _completeHide(t) {
      I.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented ||
        ("ontouchstart" in document.documentElement &&
          []
            .concat(...document.body.children)
            .forEach((t) => I.off(t, "mouseover", u)),
        this._popper && this._popper.destroy(),
        this._menu.classList.remove("show"),
        this._element.classList.remove("show"),
        this._element.setAttribute("aria-expanded", "false"),
        z.removeDataAttribute(this._menu, "popper"),
        I.trigger(this._element, "hidden.bs.dropdown", t));
    }
    _getConfig(t) {
      if (
        ((t = {
          ...this.constructor.Default,
          ...z.getDataAttributes(this._element),
          ...t,
        }),
        l("dropdown", t, this.constructor.DefaultType),
        "object" == typeof t.reference &&
          !r(t.reference) &&
          "function" != typeof t.reference.getBoundingClientRect)
      )
        throw new TypeError(
          "dropdown".toUpperCase() +
            ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.'
        );
      return t;
    }
    _getMenuElement() {
      return U.next(this._element, ".dropdown-menu")[0];
    }
    _getPlacement() {
      const t = this._element.parentNode;
      if (t.classList.contains("dropend")) return me;
      if (t.classList.contains("dropstart")) return _e;
      const e =
        "end" ===
        getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return t.classList.contains("dropup") ? (e ? fe : ue) : e ? ge : pe;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: t } = this._config;
      return "string" == typeof t
        ? t.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _getPopperConfig() {
      const t = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          { name: "offset", options: { offset: this._getOffset() } },
        ],
      };
      return (
        "static" === this._config.display &&
          (t.modifiers = [{ name: "applyStyles", enabled: !1 }]),
        {
          ...t,
          ...("function" == typeof this._config.popperConfig
            ? this._config.popperConfig(t)
            : this._config.popperConfig),
        }
      );
    }
    _selectMenuItem(t) {
      const e = U.find(
        ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        this._menu
      ).filter(c);
      if (!e.length) return;
      let i = e.indexOf(t.target);
      "ArrowUp" === t.key && i > 0 && i--,
        "ArrowDown" === t.key && i < e.length - 1 && i++,
        (i = -1 === i ? 0 : i),
        e[i].focus();
    }
    static dropdownInterface(t, e) {
      let i = v.get(t, "bs.dropdown");
      if (
        (i || (i = new ye(t, "object" == typeof e ? e : null)),
        "string" == typeof e)
      ) {
        if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
        i[e]();
      }
    }
    static jQueryInterface(t) {
      return this.each(function () {
        ye.dropdownInterface(this, t);
      });
    }
    static clearMenus(t) {
      if (t) {
        if (2 === t.button || ("keyup" === t.type && "Tab" !== t.key)) return;
        if (/input|select|option|textarea|form/i.test(t.target.tagName)) return;
      }
      const e = U.find('[data-bs-toggle="dropdown"]');
      for (let i = 0, n = e.length; i < n; i++) {
        const n = v.get(e[i], "bs.dropdown");
        if (!n || !1 === n._config.autoClose) continue;
        if (!n._element.classList.contains("show")) continue;
        const s = { relatedTarget: n._element };
        if (t) {
          const e = t.composedPath(),
            i = e.includes(n._menu);
          if (
            e.includes(n._element) ||
            ("inside" === n._config.autoClose && !i) ||
            ("outside" === n._config.autoClose && i)
          )
            continue;
          if (
            "keyup" === t.type &&
            "Tab" === t.key &&
            n._menu.contains(t.target)
          )
            continue;
          "click" === t.type && (s.clickEvent = t);
        }
        n._completeHide(s);
      }
    }
    static getParentFromElement(t) {
      return n(t) || t.parentNode;
    }
    static dataApiKeydownHandler(t) {
      if (
        /input|textarea/i.test(t.target.tagName)
          ? "Space" === t.key ||
            ("Escape" !== t.key &&
              (("ArrowDown" !== t.key && "ArrowUp" !== t.key) ||
                t.target.closest(".dropdown-menu")))
          : !he.test(t.key)
      )
        return;
      const e = this.classList.contains("show");
      if (!e && "Escape" === t.key) return;
      if ((t.preventDefault(), t.stopPropagation(), d(this))) return;
      const i = () =>
        this.matches('[data-bs-toggle="dropdown"]')
          ? this
          : U.prev(this, '[data-bs-toggle="dropdown"]')[0];
      if ("Escape" === t.key) return i().focus(), void ye.clearMenus();
      e || ("ArrowUp" !== t.key && "ArrowDown" !== t.key)
        ? e && "Space" !== t.key
          ? ye.getInstance(i())._selectMenuItem(t)
          : ye.clearMenus()
        : i().click();
    }
  }
  I.on(
    document,
    "keydown.bs.dropdown.data-api",
    '[data-bs-toggle="dropdown"]',
    ye.dataApiKeydownHandler
  ),
    I.on(
      document,
      "keydown.bs.dropdown.data-api",
      ".dropdown-menu",
      ye.dataApiKeydownHandler
    ),
    I.on(document, "click.bs.dropdown.data-api", ye.clearMenus),
    I.on(document, "keyup.bs.dropdown.data-api", ye.clearMenus),
    I.on(
      document,
      "click.bs.dropdown.data-api",
      '[data-bs-toggle="dropdown"]',
      function (t) {
        t.preventDefault(), ye.dropdownInterface(this);
      }
    ),
    m("dropdown", ye);
  const we = () => {
      const t = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t);
    },
    Ee = (t = we()) => {
      Te(),
        Ae("body", "paddingRight", (e) => e + t),
        Ae(
          ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          "paddingRight",
          (e) => e + t
        ),
        Ae(".sticky-top", "marginRight", (e) => e - t);
    },
    Te = () => {
      const t = document.body.style.overflow;
      t && z.setDataAttribute(document.body, "overflow", t),
        (document.body.style.overflow = "hidden");
    },
    Ae = (t, e, i) => {
      const n = we();
      U.find(t).forEach((t) => {
        if (t !== document.body && window.innerWidth > t.clientWidth + n)
          return;
        const s = t.style[e],
          o = window.getComputedStyle(t)[e];
        z.setDataAttribute(t, e, s),
          (t.style[e] = i(Number.parseFloat(o)) + "px");
      });
    },
    Le = () => {
      Oe("body", "overflow"),
        Oe("body", "paddingRight"),
        Oe(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", "paddingRight"),
        Oe(".sticky-top", "marginRight");
    },
    Oe = (t, e) => {
      U.find(t).forEach((t) => {
        const i = z.getDataAttribute(t, e);
        void 0 === i
          ? t.style.removeProperty(e)
          : (z.removeDataAttribute(t, e), (t.style[e] = i));
      });
    },
    ke = {
      isVisible: !0,
      isAnimated: !1,
      rootElement: document.body,
      clickCallback: null,
    },
    De = {
      isVisible: "boolean",
      isAnimated: "boolean",
      rootElement: "element",
      clickCallback: "(function|null)",
    };
  class xe {
    constructor(t) {
      (this._config = this._getConfig(t)),
        (this._isAppended = !1),
        (this._element = null);
    }
    show(t) {
      this._config.isVisible
        ? (this._append(),
          this._config.isAnimated && f(this._getElement()),
          this._getElement().classList.add("show"),
          this._emulateAnimation(() => {
            _(t);
          }))
        : _(t);
    }
    hide(t) {
      this._config.isVisible
        ? (this._getElement().classList.remove("show"),
          this._emulateAnimation(() => {
            this.dispose(), _(t);
          }))
        : _(t);
    }
    _getElement() {
      if (!this._element) {
        const t = document.createElement("div");
        (t.className = "modal-backdrop"),
          this._config.isAnimated && t.classList.add("fade"),
          (this._element = t);
      }
      return this._element;
    }
    _getConfig(t) {
      return (
        (t = { ...ke, ...("object" == typeof t ? t : {}) }),
        l("backdrop", t, De),
        t
      );
    }
    _append() {
      this._isAppended ||
        (this._config.rootElement.appendChild(this._getElement()),
        I.on(this._getElement(), "mousedown.bs.backdrop", () => {
          _(this._config.clickCallback);
        }),
        (this._isAppended = !0));
    }
    dispose() {
      this._isAppended &&
        (I.off(this._element, "mousedown.bs.backdrop"),
        this._getElement().parentNode.removeChild(this._element),
        (this._isAppended = !1));
    }
    _emulateAnimation(t) {
      if (!this._config.isAnimated) return void _(t);
      const e = s(this._getElement());
      I.one(this._getElement(), "transitionend", () => _(t)),
        a(this._getElement(), e);
    }
  }
  const Ce = { backdrop: !0, keyboard: !0, focus: !0 },
    Se = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
    };
  class Ne extends M {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._dialog = U.findOne(".modal-dialog", this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._isShown = !1),
        (this._ignoreBackdropClick = !1),
        (this._isTransitioning = !1);
    }
    static get Default() {
      return Ce;
    }
    static get DATA_KEY() {
      return "bs.modal";
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      if (this._isShown || this._isTransitioning) return;
      this._isAnimated() && (this._isTransitioning = !0);
      const e = I.trigger(this._element, "show.bs.modal", { relatedTarget: t });
      this._isShown ||
        e.defaultPrevented ||
        ((this._isShown = !0),
        Ee(),
        document.body.classList.add("modal-open"),
        this._adjustDialog(),
        this._setEscapeEvent(),
        this._setResizeEvent(),
        I.on(
          this._element,
          "click.dismiss.bs.modal",
          '[data-bs-dismiss="modal"]',
          (t) => this.hide(t)
        ),
        I.on(this._dialog, "mousedown.dismiss.bs.modal", () => {
          I.one(this._element, "mouseup.dismiss.bs.modal", (t) => {
            t.target === this._element && (this._ignoreBackdropClick = !0);
          });
        }),
        this._showBackdrop(() => this._showElement(t)));
    }
    hide(t) {
      if ((t && t.preventDefault(), !this._isShown || this._isTransitioning))
        return;
      if (I.trigger(this._element, "hide.bs.modal").defaultPrevented) return;
      this._isShown = !1;
      const e = this._isAnimated();
      if (
        (e && (this._isTransitioning = !0),
        this._setEscapeEvent(),
        this._setResizeEvent(),
        I.off(document, "focusin.bs.modal"),
        this._element.classList.remove("show"),
        I.off(this._element, "click.dismiss.bs.modal"),
        I.off(this._dialog, "mousedown.dismiss.bs.modal"),
        e)
      ) {
        const t = s(this._element);
        I.one(this._element, "transitionend", (t) => this._hideModal(t)),
          a(this._element, t);
      } else this._hideModal();
    }
    dispose() {
      [window, this._dialog].forEach((t) => I.off(t, ".bs.modal")),
        super.dispose(),
        I.off(document, "focusin.bs.modal"),
        (this._config = null),
        (this._dialog = null),
        this._backdrop.dispose(),
        (this._backdrop = null),
        (this._isShown = null),
        (this._ignoreBackdropClick = null),
        (this._isTransitioning = null);
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new xe({
        isVisible: Boolean(this._config.backdrop),
        isAnimated: this._isAnimated(),
      });
    }
    _getConfig(t) {
      return (
        (t = { ...Ce, ...z.getDataAttributes(this._element), ...t }),
        l("modal", t, Se),
        t
      );
    }
    _showElement(t) {
      const e = this._isAnimated(),
        i = U.findOne(".modal-body", this._dialog);
      (this._element.parentNode &&
        this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
        document.body.appendChild(this._element),
        (this._element.style.display = "block"),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        (this._element.scrollTop = 0),
        i && (i.scrollTop = 0),
        e && f(this._element),
        this._element.classList.add("show"),
        this._config.focus && this._enforceFocus();
      const n = () => {
        this._config.focus && this._element.focus(),
          (this._isTransitioning = !1),
          I.trigger(this._element, "shown.bs.modal", { relatedTarget: t });
      };
      if (e) {
        const t = s(this._dialog);
        I.one(this._dialog, "transitionend", n), a(this._dialog, t);
      } else n();
    }
    _enforceFocus() {
      I.off(document, "focusin.bs.modal"),
        I.on(document, "focusin.bs.modal", (t) => {
          document === t.target ||
            this._element === t.target ||
            this._element.contains(t.target) ||
            this._element.focus();
        });
    }
    _setEscapeEvent() {
      this._isShown
        ? I.on(this._element, "keydown.dismiss.bs.modal", (t) => {
            this._config.keyboard && "Escape" === t.key
              ? (t.preventDefault(), this.hide())
              : this._config.keyboard ||
                "Escape" !== t.key ||
                this._triggerBackdropTransition();
          })
        : I.off(this._element, "keydown.dismiss.bs.modal");
    }
    _setResizeEvent() {
      this._isShown
        ? I.on(window, "resize.bs.modal", () => this._adjustDialog())
        : I.off(window, "resize.bs.modal");
    }
    _hideModal() {
      (this._element.style.display = "none"),
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove("modal-open"),
            this._resetAdjustments(),
            Le(),
            I.trigger(this._element, "hidden.bs.modal");
        });
    }
    _showBackdrop(t) {
      I.on(this._element, "click.dismiss.bs.modal", (t) => {
        this._ignoreBackdropClick
          ? (this._ignoreBackdropClick = !1)
          : t.target === t.currentTarget &&
            (!0 === this._config.backdrop
              ? this.hide()
              : "static" === this._config.backdrop &&
                this._triggerBackdropTransition());
      }),
        this._backdrop.show(t);
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (I.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented)
        return;
      const t =
        this._element.scrollHeight > document.documentElement.clientHeight;
      t || (this._element.style.overflowY = "hidden"),
        this._element.classList.add("modal-static");
      const e = s(this._dialog);
      I.off(this._element, "transitionend"),
        I.one(this._element, "transitionend", () => {
          this._element.classList.remove("modal-static"),
            t ||
              (I.one(this._element, "transitionend", () => {
                this._element.style.overflowY = "";
              }),
              a(this._element, e));
        }),
        a(this._element, e),
        this._element.focus();
    }
    _adjustDialog() {
      const t =
          this._element.scrollHeight > document.documentElement.clientHeight,
        e = we(),
        i = e > 0;
      ((!i && t && !g()) || (i && !t && g())) &&
        (this._element.style.paddingLeft = e + "px"),
        ((i && !t && !g()) || (!i && t && g())) &&
          (this._element.style.paddingRight = e + "px");
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ""),
        (this._element.style.paddingRight = "");
    }
    static jQueryInterface(t, e) {
      return this.each(function () {
        const i =
          Ne.getInstance(this) || new Ne(this, "object" == typeof t ? t : {});
        if ("string" == typeof t) {
          if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
          i[t](e);
        }
      });
    }
  }
  I.on(
    document,
    "click.bs.modal.data-api",
    '[data-bs-toggle="modal"]',
    function (t) {
      const e = n(this);
      ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
        I.one(e, "show.bs.modal", (t) => {
          t.defaultPrevented ||
            I.one(e, "hidden.bs.modal", () => {
              c(this) && this.focus();
            });
        }),
        (Ne.getInstance(e) || new Ne(e)).toggle(this);
    }
  ),
    m("modal", Ne);
  const je = { backdrop: !0, keyboard: !0, scroll: !1 },
    Pe = { backdrop: "boolean", keyboard: "boolean", scroll: "boolean" };
  class Ie extends M {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        this._addEventListeners();
    }
    static get Default() {
      return je;
    }
    static get DATA_KEY() {
      return "bs.offcanvas";
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      if (this._isShown) return;
      if (
        I.trigger(this._element, "show.bs.offcanvas", { relatedTarget: t })
          .defaultPrevented
      )
        return;
      (this._isShown = !0),
        (this._element.style.visibility = "visible"),
        this._backdrop.show(),
        this._config.scroll ||
          (Ee(), this._enforceFocusOnElement(this._element)),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add("show");
      const e = s(this._element);
      I.one(this._element, "transitionend", () => {
        I.trigger(this._element, "shown.bs.offcanvas", { relatedTarget: t });
      }),
        a(this._element, e);
    }
    hide() {
      if (!this._isShown) return;
      if (I.trigger(this._element, "hide.bs.offcanvas").defaultPrevented)
        return;
      I.off(document, "focusin.bs.offcanvas"),
        this._element.blur(),
        (this._isShown = !1),
        this._element.classList.remove("show"),
        this._backdrop.hide();
      const t = s(this._element);
      I.one(this._element, "transitionend", () => {
        this._element.setAttribute("aria-hidden", !0),
          this._element.removeAttribute("aria-modal"),
          this._element.removeAttribute("role"),
          (this._element.style.visibility = "hidden"),
          this._config.scroll || Le(),
          I.trigger(this._element, "hidden.bs.offcanvas");
      }),
        a(this._element, t);
    }
    dispose() {
      this._backdrop.dispose(),
        super.dispose(),
        I.off(document, "focusin.bs.offcanvas"),
        (this._config = null),
        (this._backdrop = null);
    }
    _getConfig(t) {
      return (
        (t = {
          ...je,
          ...z.getDataAttributes(this._element),
          ...("object" == typeof t ? t : {}),
        }),
        l("offcanvas", t, Pe),
        t
      );
    }
    _initializeBackDrop() {
      return new xe({
        isVisible: this._config.backdrop,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: () => this.hide(),
      });
    }
    _enforceFocusOnElement(t) {
      I.off(document, "focusin.bs.offcanvas"),
        I.on(document, "focusin.bs.offcanvas", (e) => {
          document === e.target ||
            t === e.target ||
            t.contains(e.target) ||
            t.focus();
        }),
        t.focus();
    }
    _addEventListeners() {
      I.on(
        this._element,
        "click.dismiss.bs.offcanvas",
        '[data-bs-dismiss="offcanvas"]',
        () => this.hide()
      ),
        I.on(this._element, "keydown.dismiss.bs.offcanvas", (t) => {
          this._config.keyboard && "Escape" === t.key && this.hide();
        });
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e =
          v.get(this, "bs.offcanvas") ||
          new Ie(this, "object" == typeof t ? t : {});
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  I.on(
    document,
    "click.bs.offcanvas.data-api",
    '[data-bs-toggle="offcanvas"]',
    function (t) {
      const e = n(this);
      if ((["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this)))
        return;
      I.one(e, "hidden.bs.offcanvas", () => {
        c(this) && this.focus();
      });
      const i = U.findOne(".offcanvas.show");
      i && i !== e && Ie.getInstance(i).hide(),
        (v.get(e, "bs.offcanvas") || new Ie(e)).toggle(this);
    }
  ),
    I.on(window, "load.bs.offcanvas.data-api", () => {
      U.find(".offcanvas.show").forEach((t) =>
        (v.get(t, "bs.offcanvas") || new Ie(t)).show()
      );
    }),
    m("offcanvas", Ie);
  const Me = new Set([
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ]),
    He = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,
    Re =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    Be = (t, e) => {
      const i = t.nodeName.toLowerCase();
      if (e.includes(i))
        return (
          !Me.has(i) || Boolean(He.test(t.nodeValue) || Re.test(t.nodeValue))
        );
      const n = e.filter((t) => t instanceof RegExp);
      for (let t = 0, e = n.length; t < e; t++) if (n[t].test(i)) return !0;
      return !1;
    };
  function We(t, e, i) {
    if (!t.length) return t;
    if (i && "function" == typeof i) return i(t);
    const n = new window.DOMParser().parseFromString(t, "text/html"),
      s = Object.keys(e),
      o = [].concat(...n.body.querySelectorAll("*"));
    for (let t = 0, i = o.length; t < i; t++) {
      const i = o[t],
        n = i.nodeName.toLowerCase();
      if (!s.includes(n)) {
        i.parentNode.removeChild(i);
        continue;
      }
      const r = [].concat(...i.attributes),
        a = [].concat(e["*"] || [], e[n] || []);
      r.forEach((t) => {
        Be(t, a) || i.removeAttribute(t.nodeName);
      });
    }
    return n.body.innerHTML;
  }
  const ze = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    Ue = new Set(["sanitize", "allowList", "sanitizeFn"]),
    $e = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(array|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacements: "array",
      boundary: "(string|element)",
      customClass: "(string|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      allowList: "object",
      popperConfig: "(null|object|function)",
    },
    Fe = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: g() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: g() ? "right" : "left",
    },
    Ke = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: [0, 0],
      container: !1,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      boundary: "clippingParents",
      customClass: "",
      sanitize: !0,
      sanitizeFn: null,
      allowList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      popperConfig: null,
    },
    Ye = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip",
    };
  class qe extends M {
    constructor(t, e) {
      if (void 0 === de)
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(t),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._hoverState = ""),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this.config = this._getConfig(e)),
        (this.tip = null),
        this._setListeners();
    }
    static get Default() {
      return Ke;
    }
    static get NAME() {
      return "tooltip";
    }
    static get DATA_KEY() {
      return "bs.tooltip";
    }
    static get Event() {
      return Ye;
    }
    static get EVENT_KEY() {
      return ".bs.tooltip";
    }
    static get DefaultType() {
      return $e;
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle(t) {
      if (this._isEnabled)
        if (t) {
          const e = this._initializeOnDelegatedTarget(t);
          (e._activeTrigger.click = !e._activeTrigger.click),
            e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e);
        } else {
          if (this.getTipElement().classList.contains("show"))
            return void this._leave(null, this);
          this._enter(null, this);
        }
    }
    dispose() {
      clearTimeout(this._timeout),
        I.off(
          this._element.closest(".modal"),
          "hide.bs.modal",
          this._hideModalHandler
        ),
        this.tip &&
          this.tip.parentNode &&
          this.tip.parentNode.removeChild(this.tip),
        (this._isEnabled = null),
        (this._timeout = null),
        (this._hoverState = null),
        (this._activeTrigger = null),
        this._popper && this._popper.destroy(),
        (this._popper = null),
        (this.config = null),
        (this.tip = null),
        super.dispose();
    }
    show() {
      if ("none" === this._element.style.display)
        throw new Error("Please use show on visible elements");
      if (!this.isWithContent() || !this._isEnabled) return;
      const e = I.trigger(this._element, this.constructor.Event.SHOW),
        i = h(this._element),
        n =
          null === i
            ? this._element.ownerDocument.documentElement.contains(
                this._element
              )
            : i.contains(this._element);
      if (e.defaultPrevented || !n) return;
      const o = this.getTipElement(),
        r = t(this.constructor.NAME);
      o.setAttribute("id", r),
        this._element.setAttribute("aria-describedby", r),
        this.setContent(),
        this.config.animation && o.classList.add("fade");
      const l =
          "function" == typeof this.config.placement
            ? this.config.placement.call(this, o, this._element)
            : this.config.placement,
        c = this._getAttachment(l);
      this._addAttachmentClass(c);
      const d = this._getContainer();
      v.set(o, this.constructor.DATA_KEY, this),
        this._element.ownerDocument.documentElement.contains(this.tip) ||
          (d.appendChild(o),
          I.trigger(this._element, this.constructor.Event.INSERTED)),
        this._popper
          ? this._popper.update()
          : (this._popper = ce(this._element, o, this._getPopperConfig(c))),
        o.classList.add("show");
      const f =
        "function" == typeof this.config.customClass
          ? this.config.customClass()
          : this.config.customClass;
      f && o.classList.add(...f.split(" ")),
        "ontouchstart" in document.documentElement &&
          [].concat(...document.body.children).forEach((t) => {
            I.on(t, "mouseover", u);
          });
      const p = () => {
        const t = this._hoverState;
        (this._hoverState = null),
          I.trigger(this._element, this.constructor.Event.SHOWN),
          "out" === t && this._leave(null, this);
      };
      if (this.tip.classList.contains("fade")) {
        const t = s(this.tip);
        I.one(this.tip, "transitionend", p), a(this.tip, t);
      } else p();
    }
    hide() {
      if (!this._popper) return;
      const t = this.getTipElement(),
        e = () => {
          this._isWithActiveTrigger() ||
            ("show" !== this._hoverState &&
              t.parentNode &&
              t.parentNode.removeChild(t),
            this._cleanTipClass(),
            this._element.removeAttribute("aria-describedby"),
            I.trigger(this._element, this.constructor.Event.HIDDEN),
            this._popper && (this._popper.destroy(), (this._popper = null)));
        };
      if (
        !I.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented
      ) {
        if (
          (t.classList.remove("show"),
          "ontouchstart" in document.documentElement &&
            []
              .concat(...document.body.children)
              .forEach((t) => I.off(t, "mouseover", u)),
          (this._activeTrigger.click = !1),
          (this._activeTrigger.focus = !1),
          (this._activeTrigger.hover = !1),
          this.tip.classList.contains("fade"))
        ) {
          const i = s(t);
          I.one(t, "transitionend", e), a(t, i);
        } else e();
        this._hoverState = "";
      }
    }
    update() {
      null !== this._popper && this._popper.update();
    }
    isWithContent() {
      return Boolean(this.getTitle());
    }
    getTipElement() {
      if (this.tip) return this.tip;
      const t = document.createElement("div");
      return (
        (t.innerHTML = this.config.template),
        (this.tip = t.children[0]),
        this.tip
      );
    }
    setContent() {
      const t = this.getTipElement();
      this.setElementContent(U.findOne(".tooltip-inner", t), this.getTitle()),
        t.classList.remove("fade", "show");
    }
    setElementContent(t, e) {
      if (null !== t)
        return "object" == typeof e && r(e)
          ? (e.jquery && (e = e[0]),
            void (this.config.html
              ? e.parentNode !== t && ((t.innerHTML = ""), t.appendChild(e))
              : (t.textContent = e.textContent)))
          : void (this.config.html
              ? (this.config.sanitize &&
                  (e = We(e, this.config.allowList, this.config.sanitizeFn)),
                (t.innerHTML = e))
              : (t.textContent = e));
    }
    getTitle() {
      let t = this._element.getAttribute("data-bs-original-title");
      return (
        t ||
          (t =
            "function" == typeof this.config.title
              ? this.config.title.call(this._element)
              : this.config.title),
        t
      );
    }
    updateAttachment(t) {
      return "right" === t ? "end" : "left" === t ? "start" : t;
    }
    _initializeOnDelegatedTarget(t, e) {
      const i = this.constructor.DATA_KEY;
      return (
        (e = e || v.get(t.delegateTarget, i)) ||
          ((e = new this.constructor(
            t.delegateTarget,
            this._getDelegateConfig()
          )),
          v.set(t.delegateTarget, i, e)),
        e
      );
    }
    _getOffset() {
      const { offset: t } = this.config;
      return "string" == typeof t
        ? t.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _getPopperConfig(t) {
      const e = {
        placement: t,
        modifiers: [
          {
            name: "flip",
            options: { fallbackPlacements: this.config.fallbackPlacements },
          },
          { name: "offset", options: { offset: this._getOffset() } },
          {
            name: "preventOverflow",
            options: { boundary: this.config.boundary },
          },
          {
            name: "arrow",
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: "onChange",
            enabled: !0,
            phase: "afterWrite",
            fn: (t) => this._handlePopperPlacementChange(t),
          },
        ],
        onFirstUpdate: (t) => {
          t.options.placement !== t.placement &&
            this._handlePopperPlacementChange(t);
        },
      };
      return {
        ...e,
        ...("function" == typeof this.config.popperConfig
          ? this.config.popperConfig(e)
          : this.config.popperConfig),
      };
    }
    _addAttachmentClass(t) {
      this.getTipElement().classList.add(
        "bs-tooltip-" + this.updateAttachment(t)
      );
    }
    _getContainer() {
      return !1 === this.config.container
        ? document.body
        : r(this.config.container)
        ? this.config.container
        : U.findOne(this.config.container);
    }
    _getAttachment(t) {
      return Fe[t.toUpperCase()];
    }
    _setListeners() {
      this.config.trigger.split(" ").forEach((t) => {
        if ("click" === t)
          I.on(
            this._element,
            this.constructor.Event.CLICK,
            this.config.selector,
            (t) => this.toggle(t)
          );
        else if ("manual" !== t) {
          const e =
              "hover" === t
                ? this.constructor.Event.MOUSEENTER
                : this.constructor.Event.FOCUSIN,
            i =
              "hover" === t
                ? this.constructor.Event.MOUSELEAVE
                : this.constructor.Event.FOCUSOUT;
          I.on(this._element, e, this.config.selector, (t) => this._enter(t)),
            I.on(this._element, i, this.config.selector, (t) => this._leave(t));
        }
      }),
        (this._hideModalHandler = () => {
          this._element && this.hide();
        }),
        I.on(
          this._element.closest(".modal"),
          "hide.bs.modal",
          this._hideModalHandler
        ),
        this.config.selector
          ? (this.config = { ...this.config, trigger: "manual", selector: "" })
          : this._fixTitle();
    }
    _fixTitle() {
      const t = this._element.getAttribute("title"),
        e = typeof this._element.getAttribute("data-bs-original-title");
      (t || "string" !== e) &&
        (this._element.setAttribute("data-bs-original-title", t || ""),
        !t ||
          this._element.getAttribute("aria-label") ||
          this._element.textContent ||
          this._element.setAttribute("aria-label", t),
        this._element.setAttribute("title", ""));
    }
    _enter(t, e) {
      (e = this._initializeOnDelegatedTarget(t, e)),
        t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
        e.getTipElement().classList.contains("show") || "show" === e._hoverState
          ? (e._hoverState = "show")
          : (clearTimeout(e._timeout),
            (e._hoverState = "show"),
            e.config.delay && e.config.delay.show
              ? (e._timeout = setTimeout(() => {
                  "show" === e._hoverState && e.show();
                }, e.config.delay.show))
              : e.show());
    }
    _leave(t, e) {
      (e = this._initializeOnDelegatedTarget(t, e)),
        t &&
          (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] =
            e._element.contains(t.relatedTarget)),
        e._isWithActiveTrigger() ||
          (clearTimeout(e._timeout),
          (e._hoverState = "out"),
          e.config.delay && e.config.delay.hide
            ? (e._timeout = setTimeout(() => {
                "out" === e._hoverState && e.hide();
              }, e.config.delay.hide))
            : e.hide());
    }
    _isWithActiveTrigger() {
      for (const t in this._activeTrigger)
        if (this._activeTrigger[t]) return !0;
      return !1;
    }
    _getConfig(t) {
      const e = z.getDataAttributes(this._element);
      return (
        Object.keys(e).forEach((t) => {
          Ue.has(t) && delete e[t];
        }),
        t &&
          "object" == typeof t.container &&
          t.container.jquery &&
          (t.container = t.container[0]),
        "number" ==
          typeof (t = {
            ...this.constructor.Default,
            ...e,
            ...("object" == typeof t && t ? t : {}),
          }).delay && (t.delay = { show: t.delay, hide: t.delay }),
        "number" == typeof t.title && (t.title = t.title.toString()),
        "number" == typeof t.content && (t.content = t.content.toString()),
        l("tooltip", t, this.constructor.DefaultType),
        t.sanitize && (t.template = We(t.template, t.allowList, t.sanitizeFn)),
        t
      );
    }
    _getDelegateConfig() {
      const t = {};
      if (this.config)
        for (const e in this.config)
          this.constructor.Default[e] !== this.config[e] &&
            (t[e] = this.config[e]);
      return t;
    }
    _cleanTipClass() {
      const t = this.getTipElement(),
        e = t.getAttribute("class").match(ze);
      null !== e &&
        e.length > 0 &&
        e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
    }
    _handlePopperPlacementChange(t) {
      const { state: e } = t;
      e &&
        ((this.tip = e.elements.popper),
        this._cleanTipClass(),
        this._addAttachmentClass(this._getAttachment(e.placement)));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = v.get(this, "bs.tooltip");
        const i = "object" == typeof t && t;
        if (
          (e || !/dispose|hide/.test(t)) &&
          (e || (e = new qe(this, i)), "string" == typeof t)
        ) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  m("tooltip", qe);
  const Ve = new RegExp("(^|\\s)bs-popover\\S+", "g"),
    Xe = {
      ...qe.Default,
      placement: "right",
      offset: [0, 8],
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    },
    Qe = { ...qe.DefaultType, content: "(string|element|function)" },
    Ge = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover",
    };
  class Ze extends qe {
    static get Default() {
      return Xe;
    }
    static get NAME() {
      return "popover";
    }
    static get DATA_KEY() {
      return "bs.popover";
    }
    static get Event() {
      return Ge;
    }
    static get EVENT_KEY() {
      return ".bs.popover";
    }
    static get DefaultType() {
      return Qe;
    }
    isWithContent() {
      return this.getTitle() || this._getContent();
    }
    setContent() {
      const t = this.getTipElement();
      this.setElementContent(U.findOne(".popover-header", t), this.getTitle());
      let e = this._getContent();
      "function" == typeof e && (e = e.call(this._element)),
        this.setElementContent(U.findOne(".popover-body", t), e),
        t.classList.remove("fade", "show");
    }
    _addAttachmentClass(t) {
      this.getTipElement().classList.add(
        "bs-popover-" + this.updateAttachment(t)
      );
    }
    _getContent() {
      return (
        this._element.getAttribute("data-bs-content") || this.config.content
      );
    }
    _cleanTipClass() {
      const t = this.getTipElement(),
        e = t.getAttribute("class").match(Ve);
      null !== e &&
        e.length > 0 &&
        e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = v.get(this, "bs.popover");
        const i = "object" == typeof t ? t : null;
        if (
          (e || !/dispose|hide/.test(t)) &&
          (e || ((e = new Ze(this, i)), v.set(this, "bs.popover", e)),
          "string" == typeof t)
        ) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  m("popover", Ze);
  const Je = { offset: 10, method: "auto", target: "" },
    ti = { offset: "number", method: "string", target: "(string|element)" };
  class ei extends M {
    constructor(t, e) {
      super(t),
        (this._scrollElement =
          "BODY" === this._element.tagName ? window : this._element),
        (this._config = this._getConfig(e)),
        (this._selector = `${this._config.target} .nav-link, ${this._config.target} .list-group-item, ${this._config.target} .dropdown-item`),
        (this._offsets = []),
        (this._targets = []),
        (this._activeTarget = null),
        (this._scrollHeight = 0),
        I.on(this._scrollElement, "scroll.bs.scrollspy", () => this._process()),
        this.refresh(),
        this._process();
    }
    static get Default() {
      return Je;
    }
    static get DATA_KEY() {
      return "bs.scrollspy";
    }
    refresh() {
      const t =
          this._scrollElement === this._scrollElement.window
            ? "offset"
            : "position",
        e = "auto" === this._config.method ? t : this._config.method,
        n = "position" === e ? this._getScrollTop() : 0;
      (this._offsets = []),
        (this._targets = []),
        (this._scrollHeight = this._getScrollHeight()),
        U.find(this._selector)
          .map((t) => {
            const s = i(t),
              o = s ? U.findOne(s) : null;
            if (o) {
              const t = o.getBoundingClientRect();
              if (t.width || t.height) return [z[e](o).top + n, s];
            }
            return null;
          })
          .filter((t) => t)
          .sort((t, e) => t[0] - e[0])
          .forEach((t) => {
            this._offsets.push(t[0]), this._targets.push(t[1]);
          });
    }
    dispose() {
      super.dispose(),
        I.off(this._scrollElement, ".bs.scrollspy"),
        (this._scrollElement = null),
        (this._config = null),
        (this._selector = null),
        (this._offsets = null),
        (this._targets = null),
        (this._activeTarget = null),
        (this._scrollHeight = null);
    }
    _getConfig(e) {
      if (
        "string" !=
          typeof (e = {
            ...Je,
            ...z.getDataAttributes(this._element),
            ...("object" == typeof e && e ? e : {}),
          }).target &&
        r(e.target)
      ) {
        let { id: i } = e.target;
        i || ((i = t("scrollspy")), (e.target.id = i)), (e.target = "#" + i);
      }
      return l("scrollspy", e, ti), e;
    }
    _getScrollTop() {
      return this._scrollElement === window
        ? this._scrollElement.pageYOffset
        : this._scrollElement.scrollTop;
    }
    _getScrollHeight() {
      return (
        this._scrollElement.scrollHeight ||
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        )
      );
    }
    _getOffsetHeight() {
      return this._scrollElement === window
        ? window.innerHeight
        : this._scrollElement.getBoundingClientRect().height;
    }
    _process() {
      const t = this._getScrollTop() + this._config.offset,
        e = this._getScrollHeight(),
        i = this._config.offset + e - this._getOffsetHeight();
      if ((this._scrollHeight !== e && this.refresh(), t >= i)) {
        const t = this._targets[this._targets.length - 1];
        this._activeTarget !== t && this._activate(t);
      } else {
        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)
          return (this._activeTarget = null), void this._clear();
        for (let e = this._offsets.length; e--; )
          this._activeTarget !== this._targets[e] &&
            t >= this._offsets[e] &&
            (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) &&
            this._activate(this._targets[e]);
      }
    }
    _activate(t) {
      (this._activeTarget = t), this._clear();
      const e = this._selector
          .split(",")
          .map((e) => `${e}[data-bs-target="${t}"],${e}[href="${t}"]`),
        i = U.findOne(e.join(","));
      i.classList.contains("dropdown-item")
        ? (U.findOne(".dropdown-toggle", i.closest(".dropdown")).classList.add(
            "active"
          ),
          i.classList.add("active"))
        : (i.classList.add("active"),
          U.parents(i, ".nav, .list-group").forEach((t) => {
            U.prev(t, ".nav-link, .list-group-item").forEach((t) =>
              t.classList.add("active")
            ),
              U.prev(t, ".nav-item").forEach((t) => {
                U.children(t, ".nav-link").forEach((t) =>
                  t.classList.add("active")
                );
              });
          })),
        I.trigger(this._scrollElement, "activate.bs.scrollspy", {
          relatedTarget: t,
        });
    }
    _clear() {
      U.find(this._selector)
        .filter((t) => t.classList.contains("active"))
        .forEach((t) => t.classList.remove("active"));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e =
          ei.getInstance(this) || new ei(this, "object" == typeof t ? t : {});
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  I.on(window, "load.bs.scrollspy.data-api", () => {
    U.find('[data-bs-spy="scroll"]').forEach((t) => new ei(t));
  }),
    m("scrollspy", ei);
  class ii extends M {
    static get DATA_KEY() {
      return "bs.tab";
    }
    show() {
      if (
        this._element.parentNode &&
        this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
        this._element.classList.contains("active")
      )
        return;
      let t;
      const e = n(this._element),
        i = this._element.closest(".nav, .list-group");
      if (i) {
        const e =
          "UL" === i.nodeName || "OL" === i.nodeName
            ? ":scope > li > .active"
            : ".active";
        (t = U.find(e, i)), (t = t[t.length - 1]);
      }
      const s = t
        ? I.trigger(t, "hide.bs.tab", { relatedTarget: this._element })
        : null;
      if (
        I.trigger(this._element, "show.bs.tab", { relatedTarget: t })
          .defaultPrevented ||
        (null !== s && s.defaultPrevented)
      )
        return;
      this._activate(this._element, i);
      const o = () => {
        I.trigger(t, "hidden.bs.tab", { relatedTarget: this._element }),
          I.trigger(this._element, "shown.bs.tab", { relatedTarget: t });
      };
      e ? this._activate(e, e.parentNode, o) : o();
    }
    _activate(t, e, i) {
      const n = (
          !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
            ? U.children(e, ".active")
            : U.find(":scope > li > .active", e)
        )[0],
        o = i && n && n.classList.contains("fade"),
        r = () => this._transitionComplete(t, n, i);
      if (n && o) {
        const t = s(n);
        n.classList.remove("show"), I.one(n, "transitionend", r), a(n, t);
      } else r();
    }
    _transitionComplete(t, e, i) {
      if (e) {
        e.classList.remove("active");
        const t = U.findOne(":scope > .dropdown-menu .active", e.parentNode);
        t && t.classList.remove("active"),
          "tab" === e.getAttribute("role") &&
            e.setAttribute("aria-selected", !1);
      }
      t.classList.add("active"),
        "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0),
        f(t),
        t.classList.contains("fade") && t.classList.add("show");
      let n = t.parentNode;
      if (
        (n && "LI" === n.nodeName && (n = n.parentNode),
        n && n.classList.contains("dropdown-menu"))
      ) {
        const e = t.closest(".dropdown");
        e &&
          U.find(".dropdown-toggle", e).forEach((t) =>
            t.classList.add("active")
          ),
          t.setAttribute("aria-expanded", !0);
      }
      i && i();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = v.get(this, "bs.tab") || new ii(this);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  I.on(
    document,
    "click.bs.tab.data-api",
    '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    function (t) {
      ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
        d(this) || (v.get(this, "bs.tab") || new ii(this)).show();
    }
  ),
    m("tab", ii);
  const ni = { animation: "boolean", autohide: "boolean", delay: "number" },
    si = { animation: !0, autohide: !0, delay: 5e3 };
  class oi extends M {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._timeout = null),
        this._setListeners();
    }
    static get DefaultType() {
      return ni;
    }
    static get Default() {
      return si;
    }
    static get DATA_KEY() {
      return "bs.toast";
    }
    show() {
      if (I.trigger(this._element, "show.bs.toast").defaultPrevented) return;
      this._clearTimeout(),
        this._config.animation && this._element.classList.add("fade");
      const t = () => {
        this._element.classList.remove("showing"),
          this._element.classList.add("show"),
          I.trigger(this._element, "shown.bs.toast"),
          this._config.autohide &&
            (this._timeout = setTimeout(() => {
              this.hide();
            }, this._config.delay));
      };
      if (
        (this._element.classList.remove("hide"),
        f(this._element),
        this._element.classList.add("showing"),
        this._config.animation)
      ) {
        const e = s(this._element);
        I.one(this._element, "transitionend", t), a(this._element, e);
      } else t();
    }
    hide() {
      if (!this._element.classList.contains("show")) return;
      if (I.trigger(this._element, "hide.bs.toast").defaultPrevented) return;
      const t = () => {
        this._element.classList.add("hide"),
          I.trigger(this._element, "hidden.bs.toast");
      };
      if ((this._element.classList.remove("show"), this._config.animation)) {
        const e = s(this._element);
        I.one(this._element, "transitionend", t), a(this._element, e);
      } else t();
    }
    dispose() {
      this._clearTimeout(),
        this._element.classList.contains("show") &&
          this._element.classList.remove("show"),
        super.dispose(),
        (this._config = null);
    }
    _getConfig(t) {
      return (
        (t = {
          ...si,
          ...z.getDataAttributes(this._element),
          ...("object" == typeof t && t ? t : {}),
        }),
        l("toast", t, this.constructor.DefaultType),
        t
      );
    }
    _setListeners() {
      I.on(
        this._element,
        "click.dismiss.bs.toast",
        '[data-bs-dismiss="toast"]',
        () => this.hide()
      );
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = v.get(this, "bs.toast");
        if (
          (e || (e = new oi(this, "object" == typeof t && t)),
          "string" == typeof t)
        ) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  return (
    m("toast", oi),
    {
      Alert: H,
      Button: R,
      Carousel: X,
      Collapse: Z,
      Dropdown: ye,
      Modal: Ne,
      Offcanvas: Ie,
      Popover: Ze,
      ScrollSpy: ei,
      Tab: ii,
      Toast: oi,
      Tooltip: qe,
    }
  );
});
//# sourceMappingURL=bootstrap.bundle.min.js.map
/*! WOW wow.js - v1.3.0 - 2016-10-04
 * https://wowjs.uk
 * Copyright (c) 2016 Thomas Grainger; Licensed MIT */ !(function (a, b) {
  if ("function" == typeof define && define.amd)
    define(["module", "exports"], b);
  else if ("undefined" != typeof exports) b(module, exports);
  else {
    var c = { exports: {} };
    b(c, c.exports), (a.WOW = c.exports);
  }
})(this, function (a, b) {
  "use strict";
  function c(a, b) {
    if (!(a instanceof b))
      throw new TypeError("Cannot call a class as a function");
  }
  function d(a, b) {
    return b.indexOf(a) >= 0;
  }
  function e(a, b) {
    for (var c in b)
      if (null == a[c]) {
        var d = b[c];
        a[c] = d;
      }
    return a;
  }
  function f(a) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      a
    );
  }
  function g(a) {
    var b =
        arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
      c = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
      d =
        arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3],
      e = void 0;
    return (
      null != document.createEvent
        ? ((e = document.createEvent("CustomEvent")),
          e.initCustomEvent(a, b, c, d))
        : null != document.createEventObject
        ? ((e = document.createEventObject()), (e.eventType = a))
        : (e.eventName = a),
      e
    );
  }
  function h(a, b) {
    null != a.dispatchEvent
      ? a.dispatchEvent(b)
      : b in (null != a)
      ? a[b]()
      : "on" + b in (null != a) && a["on" + b]();
  }
  function i(a, b, c) {
    null != a.addEventListener
      ? a.addEventListener(b, c, !1)
      : null != a.attachEvent
      ? a.attachEvent("on" + b, c)
      : (a[b] = c);
  }
  function j(a, b, c) {
    null != a.removeEventListener
      ? a.removeEventListener(b, c, !1)
      : null != a.detachEvent
      ? a.detachEvent("on" + b, c)
      : delete a[b];
  }
  function k() {
    return "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.clientHeight;
  }
  Object.defineProperty(b, "__esModule", { value: !0 });
  var l,
    m,
    n = (function () {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          (d.enumerable = d.enumerable || !1),
            (d.configurable = !0),
            "value" in d && (d.writable = !0),
            Object.defineProperty(a, d.key, d);
        }
      }
      return function (b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
      };
    })(),
    o =
      window.WeakMap ||
      window.MozWeakMap ||
      (function () {
        function a() {
          c(this, a), (this.keys = []), (this.values = []);
        }
        return (
          n(a, [
            {
              key: "get",
              value: function (a) {
                for (var b = 0; b < this.keys.length; b++) {
                  var c = this.keys[b];
                  if (c === a) return this.values[b];
                }
              },
            },
            {
              key: "set",
              value: function (a, b) {
                for (var c = 0; c < this.keys.length; c++) {
                  var d = this.keys[c];
                  if (d === a) return (this.values[c] = b), this;
                }
                return this.keys.push(a), this.values.push(b), this;
              },
            },
          ]),
          a
        );
      })(),
    p =
      window.MutationObserver ||
      window.WebkitMutationObserver ||
      window.MozMutationObserver ||
      ((m = l =
        (function () {
          function a() {
            c(this, a),
              "undefined" != typeof console &&
                null !== console &&
                (console.warn(
                  "MutationObserver is not supported by your browser."
                ),
                console.warn(
                  "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                ));
          }
          return n(a, [{ key: "observe", value: function () {} }]), a;
        })()),
      (l.notSupported = !0),
      m),
    q =
      window.getComputedStyle ||
      function (a) {
        var b = /(\-([a-z]){1})/g;
        return {
          getPropertyValue: function (c) {
            "float" === c && (c = "styleFloat"),
              b.test(c) &&
                c.replace(b, function (a, b) {
                  return b.toUpperCase();
                });
            var d = a.currentStyle;
            return (null != d ? d[c] : void 0) || null;
          },
        };
      },
    r = (function () {
      function a() {
        var b =
          arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        c(this, a),
          (this.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null,
            resetAnimation: !0,
          }),
          (this.animate = (function () {
            return "requestAnimationFrame" in window
              ? function (a) {
                  return window.requestAnimationFrame(a);
                }
              : function (a) {
                  return a();
                };
          })()),
          (this.vendors = ["moz", "webkit"]),
          (this.start = this.start.bind(this)),
          (this.resetAnimation = this.resetAnimation.bind(this)),
          (this.scrollHandler = this.scrollHandler.bind(this)),
          (this.scrollCallback = this.scrollCallback.bind(this)),
          (this.scrolled = !0),
          (this.config = e(b, this.defaults)),
          null != b.scrollContainer &&
            (this.config.scrollContainer = document.querySelector(
              b.scrollContainer
            )),
          (this.animationNameCache = new o()),
          (this.wowEvent = g(this.config.boxClass));
      }
      return (
        n(a, [
          {
            key: "init",
            value: function () {
              (this.element = window.document.documentElement),
                d(document.readyState, ["interactive", "complete"])
                  ? this.start()
                  : i(document, "DOMContentLoaded", this.start),
                (this.finished = []);
            },
          },
          {
            key: "start",
            value: function () {
              var a = this;
              if (
                ((this.stopped = !1),
                (this.boxes = [].slice.call(
                  this.element.querySelectorAll("." + this.config.boxClass)
                )),
                (this.all = this.boxes.slice(0)),
                this.boxes.length)
              )
                if (this.disabled()) this.resetStyle();
                else
                  for (var b = 0; b < this.boxes.length; b++) {
                    var c = this.boxes[b];
                    this.applyStyle(c, !0);
                  }
              if (
                (this.disabled() ||
                  (i(
                    this.config.scrollContainer || window,
                    "scroll",
                    this.scrollHandler
                  ),
                  i(window, "resize", this.scrollHandler),
                  (this.interval = setInterval(this.scrollCallback, 50))),
                this.config.live)
              ) {
                var d = new p(function (b) {
                  for (var c = 0; c < b.length; c++)
                    for (var d = b[c], e = 0; e < d.addedNodes.length; e++) {
                      var f = d.addedNodes[e];
                      a.doSync(f);
                    }
                });
                d.observe(document.body, { childList: !0, subtree: !0 });
              }
            },
          },
          {
            key: "stop",
            value: function () {
              (this.stopped = !0),
                j(
                  this.config.scrollContainer || window,
                  "scroll",
                  this.scrollHandler
                ),
                j(window, "resize", this.scrollHandler),
                null != this.interval && clearInterval(this.interval);
            },
          },
          {
            key: "sync",
            value: function () {
              p.notSupported && this.doSync(this.element);
            },
          },
          {
            key: "doSync",
            value: function (a) {
              if (
                (("undefined" != typeof a && null !== a) || (a = this.element),
                1 === a.nodeType)
              ) {
                a = a.parentNode || a;
                for (
                  var b = a.querySelectorAll("." + this.config.boxClass), c = 0;
                  c < b.length;
                  c++
                ) {
                  var e = b[c];
                  d(e, this.all) ||
                    (this.boxes.push(e),
                    this.all.push(e),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(e, !0),
                    (this.scrolled = !0));
                }
              }
            },
          },
          {
            key: "show",
            value: function (a) {
              return (
                this.applyStyle(a),
                (a.className = a.className + " " + this.config.animateClass),
                null != this.config.callback && this.config.callback(a),
                h(a, this.wowEvent),
                this.config.resetAnimation &&
                  (i(a, "animationend", this.resetAnimation),
                  i(a, "oanimationend", this.resetAnimation),
                  i(a, "webkitAnimationEnd", this.resetAnimation),
                  i(a, "MSAnimationEnd", this.resetAnimation)),
                a
              );
            },
          },
          {
            key: "applyStyle",
            value: function (a, b) {
              var c = this,
                d = a.getAttribute("data-wow-duration"),
                e = a.getAttribute("data-wow-delay"),
                f = a.getAttribute("data-wow-iteration");
              return this.animate(function () {
                return c.customStyle(a, b, d, e, f);
              });
            },
          },
          {
            key: "resetStyle",
            value: function () {
              for (var a = 0; a < this.boxes.length; a++) {
                var b = this.boxes[a];
                b.style.visibility = "visible";
              }
            },
          },
          {
            key: "resetAnimation",
            value: function (a) {
              if (a.type.toLowerCase().indexOf("animationend") >= 0) {
                var b = a.target || a.srcElement;
                b.className = b.className
                  .replace(this.config.animateClass, "")
                  .trim();
              }
            },
          },
          {
            key: "customStyle",
            value: function (a, b, c, d, e) {
              return (
                b && this.cacheAnimationName(a),
                (a.style.visibility = b ? "hidden" : "visible"),
                c && this.vendorSet(a.style, { animationDuration: c }),
                d && this.vendorSet(a.style, { animationDelay: d }),
                e && this.vendorSet(a.style, { animationIterationCount: e }),
                this.vendorSet(a.style, {
                  animationName: b ? "none" : this.cachedAnimationName(a),
                }),
                a
              );
            },
          },
          {
            key: "vendorSet",
            value: function (a, b) {
              for (var c in b)
                if (b.hasOwnProperty(c)) {
                  var d = b[c];
                  a["" + c] = d;
                  for (var e = 0; e < this.vendors.length; e++) {
                    var f = this.vendors[e];
                    a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = d;
                  }
                }
            },
          },
          {
            key: "vendorCSS",
            value: function (a, b) {
              for (
                var c = q(a), d = c.getPropertyCSSValue(b), e = 0;
                e < this.vendors.length;
                e++
              ) {
                var f = this.vendors[e];
                d = d || c.getPropertyCSSValue("-" + f + "-" + b);
              }
              return d;
            },
          },
          {
            key: "animationName",
            value: function (a) {
              var b = void 0;
              try {
                b = this.vendorCSS(a, "animation-name").cssText;
              } catch (c) {
                b = q(a).getPropertyValue("animation-name");
              }
              return "none" === b ? "" : b;
            },
          },
          {
            key: "cacheAnimationName",
            value: function (a) {
              return this.animationNameCache.set(a, this.animationName(a));
            },
          },
          {
            key: "cachedAnimationName",
            value: function (a) {
              return this.animationNameCache.get(a);
            },
          },
          {
            key: "scrollHandler",
            value: function () {
              this.scrolled = !0;
            },
          },
          {
            key: "scrollCallback",
            value: function () {
              if (this.scrolled) {
                this.scrolled = !1;
                for (var a = [], b = 0; b < this.boxes.length; b++) {
                  var c = this.boxes[b];
                  if (c) {
                    if (this.isVisible(c)) {
                      this.show(c);
                      continue;
                    }
                    a.push(c);
                  }
                }
                (this.boxes = a),
                  this.boxes.length || this.config.live || this.stop();
              }
            },
          },
          {
            key: "offsetTop",
            value: function (a) {
              for (; void 0 === a.offsetTop; ) a = a.parentNode;
              for (var b = a.offsetTop; a.offsetParent; )
                (a = a.offsetParent), (b += a.offsetTop);
              return b;
            },
          },
          {
            key: "isVisible",
            value: function (a) {
              var b = a.getAttribute("data-wow-offset") || this.config.offset,
                c =
                  (this.config.scrollContainer &&
                    this.config.scrollContainer.scrollTop) ||
                  window.pageYOffset,
                d = c + Math.min(this.element.clientHeight, k()) - b,
                e = this.offsetTop(a),
                f = e + a.clientHeight;
              return d >= e && f >= c;
            },
          },
          {
            key: "disabled",
            value: function () {
              return !this.config.mobile && f(navigator.userAgent);
            },
          },
        ]),
        a
      );
    })();
  (b["default"] = r), (a.exports = b["default"]);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvdy5taW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIFdPVyB3b3cuanMgLSB2MS4zLjAgLSAyMDE2LTEwLTA0XHJcbiogaHR0cHM6Ly93b3dqcy51a1xyXG4qIENvcHlyaWdodCAoYykgMjAxNiBUaG9tYXMgR3JhaW5nZXI7IExpY2Vuc2VkIE1JVCAqLyFmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW1wibW9kdWxlXCIsXCJleHBvcnRzXCJdLGIpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpYihtb2R1bGUsZXhwb3J0cyk7ZWxzZXt2YXIgYz17ZXhwb3J0czp7fX07YihjLGMuZXhwb3J0cyksYS5XT1c9Yy5leHBvcnRzfX0odGhpcyxmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGMoYSxiKXtpZighKGEgaW5zdGFuY2VvZiBiKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfWZ1bmN0aW9uIGQoYSxiKXtyZXR1cm4gYi5pbmRleE9mKGEpPj0wfWZ1bmN0aW9uIGUoYSxiKXtmb3IodmFyIGMgaW4gYilpZihudWxsPT1hW2NdKXt2YXIgZD1iW2NdO2FbY109ZH1yZXR1cm4gYX1mdW5jdGlvbiBmKGEpe3JldHVybi9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChhKX1mdW5jdGlvbiBnKGEpe3ZhciBiPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT8hMTphcmd1bWVudHNbMV0sYz1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/ITE6YXJndW1lbnRzWzJdLGQ9YXJndW1lbnRzLmxlbmd0aDw9M3x8dm9pZCAwPT09YXJndW1lbnRzWzNdP251bGw6YXJndW1lbnRzWzNdLGU9dm9pZCAwO3JldHVybiBudWxsIT1kb2N1bWVudC5jcmVhdGVFdmVudD8oZT1kb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpLGUuaW5pdEN1c3RvbUV2ZW50KGEsYixjLGQpKTpudWxsIT1kb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdD8oZT1kb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpLGUuZXZlbnRUeXBlPWEpOmUuZXZlbnROYW1lPWEsZX1mdW5jdGlvbiBoKGEsYil7bnVsbCE9YS5kaXNwYXRjaEV2ZW50P2EuZGlzcGF0Y2hFdmVudChiKTpiIGluKG51bGwhPWEpP2FbYl0oKTpcIm9uXCIrYiBpbihudWxsIT1hKSYmYVtcIm9uXCIrYl0oKX1mdW5jdGlvbiBpKGEsYixjKXtudWxsIT1hLmFkZEV2ZW50TGlzdGVuZXI/YS5hZGRFdmVudExpc3RlbmVyKGIsYywhMSk6bnVsbCE9YS5hdHRhY2hFdmVudD9hLmF0dGFjaEV2ZW50KFwib25cIitiLGMpOmFbYl09Y31mdW5jdGlvbiBqKGEsYixjKXtudWxsIT1hLnJlbW92ZUV2ZW50TGlzdGVuZXI/YS5yZW1vdmVFdmVudExpc3RlbmVyKGIsYywhMSk6bnVsbCE9YS5kZXRhY2hFdmVudD9hLmRldGFjaEV2ZW50KFwib25cIitiLGMpOmRlbGV0ZSBhW2JdfWZ1bmN0aW9uIGsoKXtyZXR1cm5cImlubmVySGVpZ2h0XCJpbiB3aW5kb3c/d2luZG93LmlubmVySGVpZ2h0OmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR9T2JqZWN0LmRlZmluZVByb3BlcnR5KGIsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGwsbSxuPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhLGIpe2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXt2YXIgZD1iW2NdO2QuZW51bWVyYWJsZT1kLmVudW1lcmFibGV8fCExLGQuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIGQmJihkLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxkLmtleSxkKX19cmV0dXJuIGZ1bmN0aW9uKGIsYyxkKXtyZXR1cm4gYyYmYShiLnByb3RvdHlwZSxjKSxkJiZhKGIsZCksYn19KCksbz13aW5kb3cuV2Vha01hcHx8d2luZG93Lk1veldlYWtNYXB8fGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYSgpe2ModGhpcyxhKSx0aGlzLmtleXM9W10sdGhpcy52YWx1ZXM9W119cmV0dXJuIG4oYSxbe2tleTpcImdldFwiLHZhbHVlOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj0wO2I8dGhpcy5rZXlzLmxlbmd0aDtiKyspe3ZhciBjPXRoaXMua2V5c1tiXTtpZihjPT09YSlyZXR1cm4gdGhpcy52YWx1ZXNbYl19fX0se2tleTpcInNldFwiLHZhbHVlOmZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPTA7Yzx0aGlzLmtleXMubGVuZ3RoO2MrKyl7dmFyIGQ9dGhpcy5rZXlzW2NdO2lmKGQ9PT1hKXJldHVybiB0aGlzLnZhbHVlc1tjXT1iLHRoaXN9cmV0dXJuIHRoaXMua2V5cy5wdXNoKGEpLHRoaXMudmFsdWVzLnB1c2goYiksdGhpc319XSksYX0oKSxwPXdpbmRvdy5NdXRhdGlvbk9ic2VydmVyfHx3aW5kb3cuV2Via2l0TXV0YXRpb25PYnNlcnZlcnx8d2luZG93Lk1vek11dGF0aW9uT2JzZXJ2ZXJ8fChtPWw9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKCl7Yyh0aGlzLGEpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBjb25zb2xlJiZudWxsIT09Y29uc29sZSYmKGNvbnNvbGUud2FybihcIk11dGF0aW9uT2JzZXJ2ZXIgaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGJyb3dzZXIuXCIpLGNvbnNvbGUud2FybihcIldPVy5qcyBjYW5ub3QgZGV0ZWN0IGRvbSBtdXRhdGlvbnMsIHBsZWFzZSBjYWxsIC5zeW5jKCkgYWZ0ZXIgbG9hZGluZyBuZXcgY29udGVudC5cIikpfXJldHVybiBuKGEsW3trZXk6XCJvYnNlcnZlXCIsdmFsdWU6ZnVuY3Rpb24oKXt9fV0pLGF9KCksbC5ub3RTdXBwb3J0ZWQ9ITAsbSkscT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZXx8ZnVuY3Rpb24oYSl7dmFyIGI9LyhcXC0oW2Etel0pezF9KS9nO3JldHVybntnZXRQcm9wZXJ0eVZhbHVlOmZ1bmN0aW9uKGMpe1wiZmxvYXRcIj09PWMmJihjPVwic3R5bGVGbG9hdFwiKSxiLnRlc3QoYykmJmMucmVwbGFjZShiLGZ1bmN0aW9uKGEsYil7cmV0dXJuIGIudG9VcHBlckNhc2UoKX0pO3ZhciBkPWEuY3VycmVudFN0eWxlO3JldHVybihudWxsIT1kP2RbY106dm9pZCAwKXx8bnVsbH19fSxyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYSgpe3ZhciBiPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT97fTphcmd1bWVudHNbMF07Yyh0aGlzLGEpLHRoaXMuZGVmYXVsdHM9e2JveENsYXNzOlwid293XCIsYW5pbWF0ZUNsYXNzOlwiYW5pbWF0ZWRcIixvZmZzZXQ6MCxtb2JpbGU6ITAsbGl2ZTohMCxjYWxsYmFjazpudWxsLHNjcm9sbENvbnRhaW5lcjpudWxsLHJlc2V0QW5pbWF0aW9uOiEwfSx0aGlzLmFuaW1hdGU9ZnVuY3Rpb24oKXtyZXR1cm5cInJlcXVlc3RBbmltYXRpb25GcmFtZVwiaW4gd2luZG93P2Z1bmN0aW9uKGEpe3JldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGEpfTpmdW5jdGlvbihhKXtyZXR1cm4gYSgpfX0oKSx0aGlzLnZlbmRvcnM9W1wibW96XCIsXCJ3ZWJraXRcIl0sdGhpcy5zdGFydD10aGlzLnN0YXJ0LmJpbmQodGhpcyksdGhpcy5yZXNldEFuaW1hdGlvbj10aGlzLnJlc2V0QW5pbWF0aW9uLmJpbmQodGhpcyksdGhpcy5zY3JvbGxIYW5kbGVyPXRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kKHRoaXMpLHRoaXMuc2Nyb2xsQ2FsbGJhY2s9dGhpcy5zY3JvbGxDYWxsYmFjay5iaW5kKHRoaXMpLHRoaXMuc2Nyb2xsZWQ9ITAsdGhpcy5jb25maWc9ZShiLHRoaXMuZGVmYXVsdHMpLG51bGwhPWIuc2Nyb2xsQ29udGFpbmVyJiYodGhpcy5jb25maWcuc2Nyb2xsQ29udGFpbmVyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYi5zY3JvbGxDb250YWluZXIpKSx0aGlzLmFuaW1hdGlvbk5hbWVDYWNoZT1uZXcgbyx0aGlzLndvd0V2ZW50PWcodGhpcy5jb25maWcuYm94Q2xhc3MpfXJldHVybiBuKGEsW3trZXk6XCJpbml0XCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnQ9d2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxkKGRvY3VtZW50LnJlYWR5U3RhdGUsW1wiaW50ZXJhY3RpdmVcIixcImNvbXBsZXRlXCJdKT90aGlzLnN0YXJ0KCk6aShkb2N1bWVudCxcIkRPTUNvbnRlbnRMb2FkZWRcIix0aGlzLnN0YXJ0KSx0aGlzLmZpbmlzaGVkPVtdfX0se2tleTpcInN0YXJ0XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2lmKHRoaXMuc3RvcHBlZD0hMSx0aGlzLmJveGVzPVtdLnNsaWNlLmNhbGwodGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrdGhpcy5jb25maWcuYm94Q2xhc3MpKSx0aGlzLmFsbD10aGlzLmJveGVzLnNsaWNlKDApLHRoaXMuYm94ZXMubGVuZ3RoKWlmKHRoaXMuZGlzYWJsZWQoKSl0aGlzLnJlc2V0U3R5bGUoKTtlbHNlIGZvcih2YXIgYj0wO2I8dGhpcy5ib3hlcy5sZW5ndGg7YisrKXt2YXIgYz10aGlzLmJveGVzW2JdO3RoaXMuYXBwbHlTdHlsZShjLCEwKX1pZih0aGlzLmRpc2FibGVkKCl8fChpKHRoaXMuY29uZmlnLnNjcm9sbENvbnRhaW5lcnx8d2luZG93LFwic2Nyb2xsXCIsdGhpcy5zY3JvbGxIYW5kbGVyKSxpKHdpbmRvdyxcInJlc2l6ZVwiLHRoaXMuc2Nyb2xsSGFuZGxlciksdGhpcy5pbnRlcnZhbD1zZXRJbnRlcnZhbCh0aGlzLnNjcm9sbENhbGxiYWNrLDUwKSksdGhpcy5jb25maWcubGl2ZSl7dmFyIGQ9bmV3IHAoZnVuY3Rpb24oYil7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspZm9yKHZhciBkPWJbY10sZT0wO2U8ZC5hZGRlZE5vZGVzLmxlbmd0aDtlKyspe3ZhciBmPWQuYWRkZWROb2Rlc1tlXTthLmRvU3luYyhmKX19KTtkLm9ic2VydmUoZG9jdW1lbnQuYm9keSx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KX19fSx7a2V5Olwic3RvcFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5zdG9wcGVkPSEwLGoodGhpcy5jb25maWcuc2Nyb2xsQ29udGFpbmVyfHx3aW5kb3csXCJzY3JvbGxcIix0aGlzLnNjcm9sbEhhbmRsZXIpLGood2luZG93LFwicmVzaXplXCIsdGhpcy5zY3JvbGxIYW5kbGVyKSxudWxsIT10aGlzLmludGVydmFsJiZjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpfX0se2tleTpcInN5bmNcIix2YWx1ZTpmdW5jdGlvbigpe3Aubm90U3VwcG9ydGVkJiZ0aGlzLmRvU3luYyh0aGlzLmVsZW1lbnQpfX0se2tleTpcImRvU3luY1wiLHZhbHVlOmZ1bmN0aW9uKGEpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBhJiZudWxsIT09YXx8KGE9dGhpcy5lbGVtZW50KSwxPT09YS5ub2RlVHlwZSl7YT1hLnBhcmVudE5vZGV8fGE7Zm9yKHZhciBiPWEucXVlcnlTZWxlY3RvckFsbChcIi5cIit0aGlzLmNvbmZpZy5ib3hDbGFzcyksYz0wO2M8Yi5sZW5ndGg7YysrKXt2YXIgZT1iW2NdO2QoZSx0aGlzLmFsbCl8fCh0aGlzLmJveGVzLnB1c2goZSksdGhpcy5hbGwucHVzaChlKSx0aGlzLnN0b3BwZWR8fHRoaXMuZGlzYWJsZWQoKT90aGlzLnJlc2V0U3R5bGUoKTp0aGlzLmFwcGx5U3R5bGUoZSwhMCksdGhpcy5zY3JvbGxlZD0hMCl9fX19LHtrZXk6XCJzaG93XCIsdmFsdWU6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYXBwbHlTdHlsZShhKSxhLmNsYXNzTmFtZT1hLmNsYXNzTmFtZStcIiBcIit0aGlzLmNvbmZpZy5hbmltYXRlQ2xhc3MsbnVsbCE9dGhpcy5jb25maWcuY2FsbGJhY2smJnRoaXMuY29uZmlnLmNhbGxiYWNrKGEpLGgoYSx0aGlzLndvd0V2ZW50KSx0aGlzLmNvbmZpZy5yZXNldEFuaW1hdGlvbiYmKGkoYSxcImFuaW1hdGlvbmVuZFwiLHRoaXMucmVzZXRBbmltYXRpb24pLGkoYSxcIm9hbmltYXRpb25lbmRcIix0aGlzLnJlc2V0QW5pbWF0aW9uKSxpKGEsXCJ3ZWJraXRBbmltYXRpb25FbmRcIix0aGlzLnJlc2V0QW5pbWF0aW9uKSxpKGEsXCJNU0FuaW1hdGlvbkVuZFwiLHRoaXMucmVzZXRBbmltYXRpb24pKSxhfX0se2tleTpcImFwcGx5U3R5bGVcIix2YWx1ZTpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMsZD1hLmdldEF0dHJpYnV0ZShcImRhdGEtd293LWR1cmF0aW9uXCIpLGU9YS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdvdy1kZWxheVwiKSxmPWEuZ2V0QXR0cmlidXRlKFwiZGF0YS13b3ctaXRlcmF0aW9uXCIpO3JldHVybiB0aGlzLmFuaW1hdGUoZnVuY3Rpb24oKXtyZXR1cm4gYy5jdXN0b21TdHlsZShhLGIsZCxlLGYpfSl9fSx7a2V5OlwicmVzZXRTdHlsZVwiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPTA7YTx0aGlzLmJveGVzLmxlbmd0aDthKyspe3ZhciBiPXRoaXMuYm94ZXNbYV07Yi5zdHlsZS52aXNpYmlsaXR5PVwidmlzaWJsZVwifX19LHtrZXk6XCJyZXNldEFuaW1hdGlvblwiLHZhbHVlOmZ1bmN0aW9uKGEpe2lmKGEudHlwZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJhbmltYXRpb25lbmRcIik+PTApe3ZhciBiPWEudGFyZ2V0fHxhLnNyY0VsZW1lbnQ7Yi5jbGFzc05hbWU9Yi5jbGFzc05hbWUucmVwbGFjZSh0aGlzLmNvbmZpZy5hbmltYXRlQ2xhc3MsXCJcIikudHJpbSgpfX19LHtrZXk6XCJjdXN0b21TdHlsZVwiLHZhbHVlOmZ1bmN0aW9uKGEsYixjLGQsZSl7cmV0dXJuIGImJnRoaXMuY2FjaGVBbmltYXRpb25OYW1lKGEpLGEuc3R5bGUudmlzaWJpbGl0eT1iP1wiaGlkZGVuXCI6XCJ2aXNpYmxlXCIsYyYmdGhpcy52ZW5kb3JTZXQoYS5zdHlsZSx7YW5pbWF0aW9uRHVyYXRpb246Y30pLGQmJnRoaXMudmVuZG9yU2V0KGEuc3R5bGUse2FuaW1hdGlvbkRlbGF5OmR9KSxlJiZ0aGlzLnZlbmRvclNldChhLnN0eWxlLHthbmltYXRpb25JdGVyYXRpb25Db3VudDplfSksdGhpcy52ZW5kb3JTZXQoYS5zdHlsZSx7YW5pbWF0aW9uTmFtZTpiP1wibm9uZVwiOnRoaXMuY2FjaGVkQW5pbWF0aW9uTmFtZShhKX0pLGF9fSx7a2V5OlwidmVuZG9yU2V0XCIsdmFsdWU6ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGMgaW4gYilpZihiLmhhc093blByb3BlcnR5KGMpKXt2YXIgZD1iW2NdO2FbXCJcIitjXT1kO2Zvcih2YXIgZT0wO2U8dGhpcy52ZW5kb3JzLmxlbmd0aDtlKyspe3ZhciBmPXRoaXMudmVuZG9yc1tlXTthW1wiXCIrZitjLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Muc3Vic3RyKDEpXT1kfX19fSx7a2V5OlwidmVuZG9yQ1NTXCIsdmFsdWU6ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9cShhKSxkPWMuZ2V0UHJvcGVydHlDU1NWYWx1ZShiKSxlPTA7ZTx0aGlzLnZlbmRvcnMubGVuZ3RoO2UrKyl7dmFyIGY9dGhpcy52ZW5kb3JzW2VdO2Q9ZHx8Yy5nZXRQcm9wZXJ0eUNTU1ZhbHVlKFwiLVwiK2YrXCItXCIrYil9cmV0dXJuIGR9fSx7a2V5OlwiYW5pbWF0aW9uTmFtZVwiLHZhbHVlOmZ1bmN0aW9uKGEpe3ZhciBiPXZvaWQgMDt0cnl7Yj10aGlzLnZlbmRvckNTUyhhLFwiYW5pbWF0aW9uLW5hbWVcIikuY3NzVGV4dH1jYXRjaChjKXtiPXEoYSkuZ2V0UHJvcGVydHlWYWx1ZShcImFuaW1hdGlvbi1uYW1lXCIpfXJldHVyblwibm9uZVwiPT09Yj9cIlwiOmJ9fSx7a2V5OlwiY2FjaGVBbmltYXRpb25OYW1lXCIsdmFsdWU6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYW5pbWF0aW9uTmFtZUNhY2hlLnNldChhLHRoaXMuYW5pbWF0aW9uTmFtZShhKSl9fSx7a2V5OlwiY2FjaGVkQW5pbWF0aW9uTmFtZVwiLHZhbHVlOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmFuaW1hdGlvbk5hbWVDYWNoZS5nZXQoYSl9fSx7a2V5Olwic2Nyb2xsSGFuZGxlclwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxlZD0hMH19LHtrZXk6XCJzY3JvbGxDYWxsYmFja1wiLHZhbHVlOmZ1bmN0aW9uKCl7aWYodGhpcy5zY3JvbGxlZCl7dGhpcy5zY3JvbGxlZD0hMTtmb3IodmFyIGE9W10sYj0wO2I8dGhpcy5ib3hlcy5sZW5ndGg7YisrKXt2YXIgYz10aGlzLmJveGVzW2JdO2lmKGMpe2lmKHRoaXMuaXNWaXNpYmxlKGMpKXt0aGlzLnNob3coYyk7Y29udGludWV9YS5wdXNoKGMpfX10aGlzLmJveGVzPWEsdGhpcy5ib3hlcy5sZW5ndGh8fHRoaXMuY29uZmlnLmxpdmV8fHRoaXMuc3RvcCgpfX19LHtrZXk6XCJvZmZzZXRUb3BcIix2YWx1ZTpmdW5jdGlvbihhKXtmb3IoO3ZvaWQgMD09PWEub2Zmc2V0VG9wOylhPWEucGFyZW50Tm9kZTtmb3IodmFyIGI9YS5vZmZzZXRUb3A7YS5vZmZzZXRQYXJlbnQ7KWE9YS5vZmZzZXRQYXJlbnQsYis9YS5vZmZzZXRUb3A7cmV0dXJuIGJ9fSx7a2V5OlwiaXNWaXNpYmxlXCIsdmFsdWU6ZnVuY3Rpb24oYSl7dmFyIGI9YS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdvdy1vZmZzZXRcIil8fHRoaXMuY29uZmlnLm9mZnNldCxjPXRoaXMuY29uZmlnLnNjcm9sbENvbnRhaW5lciYmdGhpcy5jb25maWcuc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcHx8d2luZG93LnBhZ2VZT2Zmc2V0LGQ9YytNYXRoLm1pbih0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0LGsoKSktYixlPXRoaXMub2Zmc2V0VG9wKGEpLGY9ZSthLmNsaWVudEhlaWdodDtyZXR1cm4gZD49ZSYmZj49Y319LHtrZXk6XCJkaXNhYmxlZFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIXRoaXMuY29uZmlnLm1vYmlsZSYmZihuYXZpZ2F0b3IudXNlckFnZW50KX19XSksYX0oKTtiW1wiZGVmYXVsdFwiXT1yLGEuZXhwb3J0cz1iW1wiZGVmYXVsdFwiXX0pO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7In0=
!(function (n) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (e) {
        return n(e);
      })
    : "object" == typeof module && "object" == typeof module.exports
    ? (exports = n(require("jquery")))
    : n(jQuery);
})(function (n) {
  function e(n) {
    var e = 7.5625,
      t = 2.75;
    return n < 1 / t
      ? e * n * n
      : n < 2 / t
      ? e * (n -= 1.5 / t) * n + 0.75
      : n < 2.5 / t
      ? e * (n -= 2.25 / t) * n + 0.9375
      : e * (n -= 2.625 / t) * n + 0.984375;
  }
  void 0 !== n.easing && (n.easing.jswing = n.easing.swing);
  var t = Math.pow,
    u = Math.sqrt,
    r = Math.sin,
    i = Math.cos,
    a = Math.PI,
    c = 1.70158,
    o = 1.525 * c,
    s = (2 * a) / 3,
    f = (2 * a) / 4.5;
  n.extend(n.easing, {
    def: "easeOutQuad",
    swing: function (e) {
      return n.easing[n.easing.def](e);
    },
    easeInQuad: function (n) {
      return n * n;
    },
    easeOutQuad: function (n) {
      return 1 - (1 - n) * (1 - n);
    },
    easeInOutQuad: function (n) {
      return n < 0.5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2;
    },
    easeInCubic: function (n) {
      return n * n * n;
    },
    easeOutCubic: function (n) {
      return 1 - t(1 - n, 3);
    },
    easeInOutCubic: function (n) {
      return n < 0.5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2;
    },
    easeInQuart: function (n) {
      return n * n * n * n;
    },
    easeOutQuart: function (n) {
      return 1 - t(1 - n, 4);
    },
    easeInOutQuart: function (n) {
      return n < 0.5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2;
    },
    easeInQuint: function (n) {
      return n * n * n * n * n;
    },
    easeOutQuint: function (n) {
      return 1 - t(1 - n, 5);
    },
    easeInOutQuint: function (n) {
      return n < 0.5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2;
    },
    easeInSine: function (n) {
      return 1 - i((n * a) / 2);
    },
    easeOutSine: function (n) {
      return r((n * a) / 2);
    },
    easeInOutSine: function (n) {
      return -(i(a * n) - 1) / 2;
    },
    easeInExpo: function (n) {
      return 0 === n ? 0 : t(2, 10 * n - 10);
    },
    easeOutExpo: function (n) {
      return 1 === n ? 1 : 1 - t(2, -10 * n);
    },
    easeInOutExpo: function (n) {
      return 0 === n
        ? 0
        : 1 === n
        ? 1
        : n < 0.5
        ? t(2, 20 * n - 10) / 2
        : (2 - t(2, -20 * n + 10)) / 2;
    },
    easeInCirc: function (n) {
      return 1 - u(1 - t(n, 2));
    },
    easeOutCirc: function (n) {
      return u(1 - t(n - 1, 2));
    },
    easeInOutCirc: function (n) {
      return n < 0.5
        ? (1 - u(1 - t(2 * n, 2))) / 2
        : (u(1 - t(-2 * n + 2, 2)) + 1) / 2;
    },
    easeInElastic: function (n) {
      return 0 === n
        ? 0
        : 1 === n
        ? 1
        : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s);
    },
    easeOutElastic: function (n) {
      return 0 === n
        ? 0
        : 1 === n
        ? 1
        : t(2, -10 * n) * r((10 * n - 0.75) * s) + 1;
    },
    easeInOutElastic: function (n) {
      return 0 === n
        ? 0
        : 1 === n
        ? 1
        : n < 0.5
        ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2
        : (t(2, -20 * n + 10) * r((20 * n - 11.125) * f)) / 2 + 1;
    },
    easeInBack: function (n) {
      return (c + 1) * n * n * n - c * n * n;
    },
    easeOutBack: function (n) {
      return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2);
    },
    easeInOutBack: function (n) {
      return n < 0.5
        ? (t(2 * n, 2) * (7.189819 * n - o)) / 2
        : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2;
    },
    easeInBounce: function (n) {
      return 1 - e(1 - n);
    },
    easeOutBounce: e,
    easeInOutBounce: function (n) {
      return n < 0.5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2;
    },
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVhc2luZy5taW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKG4pe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wianF1ZXJ5XCJdLGZ1bmN0aW9uKGUpe3JldHVybiBuKGUpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZS5leHBvcnRzP2V4cG9ydHM9bihyZXF1aXJlKFwianF1ZXJ5XCIpKTpuKGpRdWVyeSl9KGZ1bmN0aW9uKG4pe2Z1bmN0aW9uIGUobil7dmFyIGU9Ny41NjI1LHQ9Mi43NTtyZXR1cm4gbjwxL3Q/ZSpuKm46bjwyL3Q/ZSoobi09MS41L3QpKm4rLjc1Om48Mi41L3Q/ZSoobi09Mi4yNS90KSpuKy45Mzc1OmUqKG4tPTIuNjI1L3QpKm4rLjk4NDM3NX12b2lkIDAhPT1uLmVhc2luZyYmKG4uZWFzaW5nLmpzd2luZz1uLmVhc2luZy5zd2luZyk7dmFyIHQ9TWF0aC5wb3csdT1NYXRoLnNxcnQscj1NYXRoLnNpbixpPU1hdGguY29zLGE9TWF0aC5QSSxjPTEuNzAxNTgsbz0xLjUyNSpjLHM9MiphLzMsZj0yKmEvNC41O24uZXh0ZW5kKG4uZWFzaW5nLHtkZWY6XCJlYXNlT3V0UXVhZFwiLHN3aW5nOmZ1bmN0aW9uKGUpe3JldHVybiBuLmVhc2luZ1tuLmVhc2luZy5kZWZdKGUpfSxlYXNlSW5RdWFkOmZ1bmN0aW9uKG4pe3JldHVybiBuKm59LGVhc2VPdXRRdWFkOmZ1bmN0aW9uKG4pe3JldHVybiAxLSgxLW4pKigxLW4pfSxlYXNlSW5PdXRRdWFkOmZ1bmN0aW9uKG4pe3JldHVybiBuPC41PzIqbipuOjEtdCgtMipuKzIsMikvMn0sZWFzZUluQ3ViaWM6ZnVuY3Rpb24obil7cmV0dXJuIG4qbipufSxlYXNlT3V0Q3ViaWM6ZnVuY3Rpb24obil7cmV0dXJuIDEtdCgxLW4sMyl9LGVhc2VJbk91dEN1YmljOmZ1bmN0aW9uKG4pe3JldHVybiBuPC41PzQqbipuKm46MS10KC0yKm4rMiwzKS8yfSxlYXNlSW5RdWFydDpmdW5jdGlvbihuKXtyZXR1cm4gbipuKm4qbn0sZWFzZU91dFF1YXJ0OmZ1bmN0aW9uKG4pe3JldHVybiAxLXQoMS1uLDQpfSxlYXNlSW5PdXRRdWFydDpmdW5jdGlvbihuKXtyZXR1cm4gbjwuNT84Km4qbipuKm46MS10KC0yKm4rMiw0KS8yfSxlYXNlSW5RdWludDpmdW5jdGlvbihuKXtyZXR1cm4gbipuKm4qbipufSxlYXNlT3V0UXVpbnQ6ZnVuY3Rpb24obil7cmV0dXJuIDEtdCgxLW4sNSl9LGVhc2VJbk91dFF1aW50OmZ1bmN0aW9uKG4pe3JldHVybiBuPC41PzE2Km4qbipuKm4qbjoxLXQoLTIqbisyLDUpLzJ9LGVhc2VJblNpbmU6ZnVuY3Rpb24obil7cmV0dXJuIDEtaShuKmEvMil9LGVhc2VPdXRTaW5lOmZ1bmN0aW9uKG4pe3JldHVybiByKG4qYS8yKX0sZWFzZUluT3V0U2luZTpmdW5jdGlvbihuKXtyZXR1cm4tKGkoYSpuKS0xKS8yfSxlYXNlSW5FeHBvOmZ1bmN0aW9uKG4pe3JldHVybiAwPT09bj8wOnQoMiwxMCpuLTEwKX0sZWFzZU91dEV4cG86ZnVuY3Rpb24obil7cmV0dXJuIDE9PT1uPzE6MS10KDIsLTEwKm4pfSxlYXNlSW5PdXRFeHBvOmZ1bmN0aW9uKG4pe3JldHVybiAwPT09bj8wOjE9PT1uPzE6bjwuNT90KDIsMjAqbi0xMCkvMjooMi10KDIsLTIwKm4rMTApKS8yfSxlYXNlSW5DaXJjOmZ1bmN0aW9uKG4pe3JldHVybiAxLXUoMS10KG4sMikpfSxlYXNlT3V0Q2lyYzpmdW5jdGlvbihuKXtyZXR1cm4gdSgxLXQobi0xLDIpKX0sZWFzZUluT3V0Q2lyYzpmdW5jdGlvbihuKXtyZXR1cm4gbjwuNT8oMS11KDEtdCgyKm4sMikpKS8yOih1KDEtdCgtMipuKzIsMikpKzEpLzJ9LGVhc2VJbkVsYXN0aWM6ZnVuY3Rpb24obil7cmV0dXJuIDA9PT1uPzA6MT09PW4/MTotdCgyLDEwKm4tMTApKnIoKDEwKm4tMTAuNzUpKnMpfSxlYXNlT3V0RWxhc3RpYzpmdW5jdGlvbihuKXtyZXR1cm4gMD09PW4/MDoxPT09bj8xOnQoMiwtMTAqbikqcigoMTAqbi0uNzUpKnMpKzF9LGVhc2VJbk91dEVsYXN0aWM6ZnVuY3Rpb24obil7cmV0dXJuIDA9PT1uPzA6MT09PW4/MTpuPC41Py0odCgyLDIwKm4tMTApKnIoKDIwKm4tMTEuMTI1KSpmKSkvMjp0KDIsLTIwKm4rMTApKnIoKDIwKm4tMTEuMTI1KSpmKS8yKzF9LGVhc2VJbkJhY2s6ZnVuY3Rpb24obil7cmV0dXJuKGMrMSkqbipuKm4tYypuKm59LGVhc2VPdXRCYWNrOmZ1bmN0aW9uKG4pe3JldHVybiAxKyhjKzEpKnQobi0xLDMpK2MqdChuLTEsMil9LGVhc2VJbk91dEJhY2s6ZnVuY3Rpb24obil7cmV0dXJuIG48LjU/dCgyKm4sMikqKDcuMTg5ODE5Km4tbykvMjoodCgyKm4tMiwyKSooKG8rMSkqKDIqbi0yKStvKSsyKS8yfSxlYXNlSW5Cb3VuY2U6ZnVuY3Rpb24obil7cmV0dXJuIDEtZSgxLW4pfSxlYXNlT3V0Qm91bmNlOmUsZWFzZUluT3V0Qm91bmNlOmZ1bmN0aW9uKG4pe3JldHVybiBuPC41PygxLWUoMS0yKm4pKS8yOigxK2UoMipuLTEpKS8yfX0pfSk7XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOyJ9
/*!
Waypoints - 4.0.1
Copyright Â© 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!(function () {
  "use strict";
  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    (this.key = "waypoint-" + e),
      (this.options = t.Adapter.extend({}, t.defaults, o)),
      (this.element = this.options.element),
      (this.adapter = new t.Adapter(this.element)),
      (this.callback = o.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.context = t.Context.findOrCreateByElement(this.options.context)),
      t.offsetAliases[this.options.offset] &&
        (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      (i[this.key] = this),
      (e += 1);
  }
  var e = 0,
    i = {};
  (t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }),
    (t.prototype.trigger = function (t) {
      this.enabled && this.callback && this.callback.apply(this, t);
    }),
    (t.prototype.destroy = function () {
      this.context.remove(this), this.group.remove(this), delete i[this.key];
    }),
    (t.prototype.disable = function () {
      return (this.enabled = !1), this;
    }),
    (t.prototype.enable = function () {
      return this.context.refresh(), (this.enabled = !0), this;
    }),
    (t.prototype.next = function () {
      return this.group.next(this);
    }),
    (t.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (t.invokeAll = function (t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }),
    (t.destroyAll = function () {
      t.invokeAll("destroy");
    }),
    (t.disableAll = function () {
      t.invokeAll("disable");
    }),
    (t.enableAll = function () {
      t.Context.refreshAll();
      for (var e in i) i[e].enabled = !0;
      return this;
    }),
    (t.refreshAll = function () {
      t.Context.refreshAll();
    }),
    (t.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (t.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (t.adapters = []),
    (t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (t.offsetAliases = {
      "bottom-in-view": function () {
        return this.context.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.context.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = t);
})(),
  (function () {
    "use strict";
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      (this.element = t),
        (this.Adapter = n.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = "waypoint-context-" + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (o[t.waypointContextKey] = this),
        (i += 1),
        n.windowContext ||
          ((n.windowContext = !0), (n.windowContext = new e(window))),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
    (e.prototype.add = function (t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      (this.waypoints[e][t.key] = t), this.refresh();
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical),
          i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          e.handleResize(), (e.didResize = !1);
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
          e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          e.handleScroll(), (e.didScroll = !1);
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
          (!e.didScroll || n.isTouch) &&
            ((e.didScroll = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function () {
        n.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var i in e) {
          var o = e[i],
            n = o.newScroll > o.oldScroll,
            r = n ? o.forward : o.backward;
          for (var s in this.waypoints[i]) {
            var a = this.waypoints[i][s];
            if (null !== a.triggerPoint) {
              var l = o.oldScroll < a.triggerPoint,
                h = o.newScroll >= a.triggerPoint,
                p = l && h,
                u = !l && !h;
              (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
            }
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? n.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? n.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          o = {};
        this.handleScroll(),
          (t = {
            horizontal: {
              contextOffset: e ? 0 : i.left,
              contextScroll: e ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              contextOffset: e ? 0 : i.top,
              contextScroll: e ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          });
        for (var r in t) {
          var s = t[r];
          for (var a in this.waypoints[r]) {
            var l,
              h,
              p,
              u,
              c,
              d = this.waypoints[r][a],
              f = d.options.offset,
              w = d.triggerPoint,
              y = 0,
              g = null == w;
            d.element !== d.element.window &&
              (y = d.adapter.offset()[s.offsetProp]),
              "function" == typeof f
                ? (f = f.apply(d))
                : "string" == typeof f &&
                  ((f = parseFloat(f)),
                  d.options.offset.indexOf("%") > -1 &&
                    (f = Math.ceil((s.contextDimension * f) / 100))),
              (l = s.contextScroll - s.contextOffset),
              (d.triggerPoint = Math.floor(y + l - f)),
              (h = w < s.oldScroll),
              (p = d.triggerPoint >= s.oldScroll),
              (u = h && p),
              (c = !h && !p),
              !g && u
                ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                : !g && c
                ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                : g &&
                  s.oldScroll >= d.triggerPoint &&
                  (d.queueTrigger(s.forward), (o[d.group.id] = d.group));
          }
        }
        return (
          n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers();
          }),
          this
        );
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function () {
        for (var t in o) o[t].refresh();
      }),
      (e.findByElement = function (t) {
        return o[t.waypointContextKey];
      }),
      (window.onload = function () {
        r && r(), e.refreshAll();
      }),
      (n.requestAnimationFrame = function (e) {
        var i =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t;
        i.call(window, e);
      }),
      (n.Context = e);
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      (this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (o[this.axis][this.name] = this);
    }
    var o = { vertical: {}, horizontal: {} },
      n = window.Waypoint;
    (i.prototype.add = function (t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
            n = "up" === i || "left" === i;
          o.sort(n ? e : t);
          for (var r = 0, s = o.length; s > r; r += 1) {
            var a = o[r];
            (a.options.continuous || r === o.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function () {
        return this.waypoints[0];
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t);
      }),
      (n.Group = i);
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    e.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (e, i) {
        t.prototype[i] = function () {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      }
    ),
      e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o];
      }),
      i.adapters.push({ name: "jquery", Adapter: t }),
      (i.Adapter = t);
  })(),
  (function () {
    "use strict";
    function t(t) {
      return function () {
        var i = [],
          o = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
          this.each(function () {
            var n = t.extend({}, o, { element: this });
            "string" == typeof n.context &&
              (n.context = t(this).closest(n.context)[0]),
              i.push(new e(n));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
  })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndheXBvaW50cy5taW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG5XYXlwb2ludHMgLSA0LjAuMVxuQ29weXJpZ2h0IMKpIDIwMTEtMjAxNiBDYWxlYiBUcm91Z2h0b25cbkxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbmh0dHBzOi8vZ2l0aHViLmNvbS9pbWFrZXdlYnRoaW5ncy93YXlwb2ludHMvYmxvYi9tYXN0ZXIvbGljZW5zZXMudHh0XG4qL1xuIWZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdChvKXtpZighbyl0aHJvdyBuZXcgRXJyb3IoXCJObyBvcHRpb25zIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvclwiKTtpZighby5lbGVtZW50KXRocm93IG5ldyBFcnJvcihcIk5vIGVsZW1lbnQgb3B0aW9uIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvclwiKTtpZighby5oYW5kbGVyKXRocm93IG5ldyBFcnJvcihcIk5vIGhhbmRsZXIgb3B0aW9uIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvclwiKTt0aGlzLmtleT1cIndheXBvaW50LVwiK2UsdGhpcy5vcHRpb25zPXQuQWRhcHRlci5leHRlbmQoe30sdC5kZWZhdWx0cyxvKSx0aGlzLmVsZW1lbnQ9dGhpcy5vcHRpb25zLmVsZW1lbnQsdGhpcy5hZGFwdGVyPW5ldyB0LkFkYXB0ZXIodGhpcy5lbGVtZW50KSx0aGlzLmNhbGxiYWNrPW8uaGFuZGxlcix0aGlzLmF4aXM9dGhpcy5vcHRpb25zLmhvcml6b250YWw/XCJob3Jpem9udGFsXCI6XCJ2ZXJ0aWNhbFwiLHRoaXMuZW5hYmxlZD10aGlzLm9wdGlvbnMuZW5hYmxlZCx0aGlzLnRyaWdnZXJQb2ludD1udWxsLHRoaXMuZ3JvdXA9dC5Hcm91cC5maW5kT3JDcmVhdGUoe25hbWU6dGhpcy5vcHRpb25zLmdyb3VwLGF4aXM6dGhpcy5heGlzfSksdGhpcy5jb250ZXh0PXQuQ29udGV4dC5maW5kT3JDcmVhdGVCeUVsZW1lbnQodGhpcy5vcHRpb25zLmNvbnRleHQpLHQub2Zmc2V0QWxpYXNlc1t0aGlzLm9wdGlvbnMub2Zmc2V0XSYmKHRoaXMub3B0aW9ucy5vZmZzZXQ9dC5vZmZzZXRBbGlhc2VzW3RoaXMub3B0aW9ucy5vZmZzZXRdKSx0aGlzLmdyb3VwLmFkZCh0aGlzKSx0aGlzLmNvbnRleHQuYWRkKHRoaXMpLGlbdGhpcy5rZXldPXRoaXMsZSs9MX12YXIgZT0wLGk9e307dC5wcm90b3R5cGUucXVldWVUcmlnZ2VyPWZ1bmN0aW9uKHQpe3RoaXMuZ3JvdXAucXVldWVUcmlnZ2VyKHRoaXMsdCl9LHQucHJvdG90eXBlLnRyaWdnZXI9ZnVuY3Rpb24odCl7dGhpcy5lbmFibGVkJiZ0aGlzLmNhbGxiYWNrJiZ0aGlzLmNhbGxiYWNrLmFwcGx5KHRoaXMsdCl9LHQucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmNvbnRleHQucmVtb3ZlKHRoaXMpLHRoaXMuZ3JvdXAucmVtb3ZlKHRoaXMpLGRlbGV0ZSBpW3RoaXMua2V5XX0sdC5wcm90b3R5cGUuZGlzYWJsZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuYWJsZWQ9ITEsdGhpc30sdC5wcm90b3R5cGUuZW5hYmxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dC5yZWZyZXNoKCksdGhpcy5lbmFibGVkPSEwLHRoaXN9LHQucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ncm91cC5uZXh0KHRoaXMpfSx0LnByb3RvdHlwZS5wcmV2aW91cz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdyb3VwLnByZXZpb3VzKHRoaXMpfSx0Lmludm9rZUFsbD1mdW5jdGlvbih0KXt2YXIgZT1bXTtmb3IodmFyIG8gaW4gaSllLnB1c2goaVtvXSk7Zm9yKHZhciBuPTAscj1lLmxlbmd0aDtyPm47bisrKWVbbl1bdF0oKX0sdC5kZXN0cm95QWxsPWZ1bmN0aW9uKCl7dC5pbnZva2VBbGwoXCJkZXN0cm95XCIpfSx0LmRpc2FibGVBbGw9ZnVuY3Rpb24oKXt0Lmludm9rZUFsbChcImRpc2FibGVcIil9LHQuZW5hYmxlQWxsPWZ1bmN0aW9uKCl7dC5Db250ZXh0LnJlZnJlc2hBbGwoKTtmb3IodmFyIGUgaW4gaSlpW2VdLmVuYWJsZWQ9ITA7cmV0dXJuIHRoaXN9LHQucmVmcmVzaEFsbD1mdW5jdGlvbigpe3QuQ29udGV4dC5yZWZyZXNoQWxsKCl9LHQudmlld3BvcnRIZWlnaHQ9ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0fSx0LnZpZXdwb3J0V2lkdGg9ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofSx0LmFkYXB0ZXJzPVtdLHQuZGVmYXVsdHM9e2NvbnRleHQ6d2luZG93LGNvbnRpbnVvdXM6ITAsZW5hYmxlZDohMCxncm91cDpcImRlZmF1bHRcIixob3Jpem9udGFsOiExLG9mZnNldDowfSx0Lm9mZnNldEFsaWFzZXM9e1wiYm90dG9tLWluLXZpZXdcIjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbnRleHQuaW5uZXJIZWlnaHQoKS10aGlzLmFkYXB0ZXIub3V0ZXJIZWlnaHQoKX0sXCJyaWdodC1pbi12aWV3XCI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0LmlubmVyV2lkdGgoKS10aGlzLmFkYXB0ZXIub3V0ZXJXaWR0aCgpfX0sd2luZG93LldheXBvaW50PXR9KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3dpbmRvdy5zZXRUaW1lb3V0KHQsMWUzLzYwKX1mdW5jdGlvbiBlKHQpe3RoaXMuZWxlbWVudD10LHRoaXMuQWRhcHRlcj1uLkFkYXB0ZXIsdGhpcy5hZGFwdGVyPW5ldyB0aGlzLkFkYXB0ZXIodCksdGhpcy5rZXk9XCJ3YXlwb2ludC1jb250ZXh0LVwiK2ksdGhpcy5kaWRTY3JvbGw9ITEsdGhpcy5kaWRSZXNpemU9ITEsdGhpcy5vbGRTY3JvbGw9e3g6dGhpcy5hZGFwdGVyLnNjcm9sbExlZnQoKSx5OnRoaXMuYWRhcHRlci5zY3JvbGxUb3AoKX0sdGhpcy53YXlwb2ludHM9e3ZlcnRpY2FsOnt9LGhvcml6b250YWw6e319LHQud2F5cG9pbnRDb250ZXh0S2V5PXRoaXMua2V5LG9bdC53YXlwb2ludENvbnRleHRLZXldPXRoaXMsaSs9MSxuLndpbmRvd0NvbnRleHR8fChuLndpbmRvd0NvbnRleHQ9ITAsbi53aW5kb3dDb250ZXh0PW5ldyBlKHdpbmRvdykpLHRoaXMuY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlcigpLHRoaXMuY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlcigpfXZhciBpPTAsbz17fSxuPXdpbmRvdy5XYXlwb2ludCxyPXdpbmRvdy5vbmxvYWQ7ZS5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3ZhciBlPXQub3B0aW9ucy5ob3Jpem9udGFsP1wiaG9yaXpvbnRhbFwiOlwidmVydGljYWxcIjt0aGlzLndheXBvaW50c1tlXVt0LmtleV09dCx0aGlzLnJlZnJlc2goKX0sZS5wcm90b3R5cGUuY2hlY2tFbXB0eT1mdW5jdGlvbigpe3ZhciB0PXRoaXMuQWRhcHRlci5pc0VtcHR5T2JqZWN0KHRoaXMud2F5cG9pbnRzLmhvcml6b250YWwpLGU9dGhpcy5BZGFwdGVyLmlzRW1wdHlPYmplY3QodGhpcy53YXlwb2ludHMudmVydGljYWwpLGk9dGhpcy5lbGVtZW50PT10aGlzLmVsZW1lbnQud2luZG93O3QmJmUmJiFpJiYodGhpcy5hZGFwdGVyLm9mZihcIi53YXlwb2ludHNcIiksZGVsZXRlIG9bdGhpcy5rZXldKX0sZS5wcm90b3R5cGUuY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlcj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtlLmhhbmRsZVJlc2l6ZSgpLGUuZGlkUmVzaXplPSExfXZhciBlPXRoaXM7dGhpcy5hZGFwdGVyLm9uKFwicmVzaXplLndheXBvaW50c1wiLGZ1bmN0aW9uKCl7ZS5kaWRSZXNpemV8fChlLmRpZFJlc2l6ZT0hMCxuLnJlcXVlc3RBbmltYXRpb25GcmFtZSh0KSl9KX0sZS5wcm90b3R5cGUuY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlcj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtlLmhhbmRsZVNjcm9sbCgpLGUuZGlkU2Nyb2xsPSExfXZhciBlPXRoaXM7dGhpcy5hZGFwdGVyLm9uKFwic2Nyb2xsLndheXBvaW50c1wiLGZ1bmN0aW9uKCl7KCFlLmRpZFNjcm9sbHx8bi5pc1RvdWNoKSYmKGUuZGlkU2Nyb2xsPSEwLG4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHQpKX0pfSxlLnByb3RvdHlwZS5oYW5kbGVSZXNpemU9ZnVuY3Rpb24oKXtuLkNvbnRleHQucmVmcmVzaEFsbCgpfSxlLnByb3RvdHlwZS5oYW5kbGVTY3JvbGw9ZnVuY3Rpb24oKXt2YXIgdD17fSxlPXtob3Jpem9udGFsOntuZXdTY3JvbGw6dGhpcy5hZGFwdGVyLnNjcm9sbExlZnQoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueCxmb3J3YXJkOlwicmlnaHRcIixiYWNrd2FyZDpcImxlZnRcIn0sdmVydGljYWw6e25ld1Njcm9sbDp0aGlzLmFkYXB0ZXIuc2Nyb2xsVG9wKCksb2xkU2Nyb2xsOnRoaXMub2xkU2Nyb2xsLnksZm9yd2FyZDpcImRvd25cIixiYWNrd2FyZDpcInVwXCJ9fTtmb3IodmFyIGkgaW4gZSl7dmFyIG89ZVtpXSxuPW8ubmV3U2Nyb2xsPm8ub2xkU2Nyb2xsLHI9bj9vLmZvcndhcmQ6by5iYWNrd2FyZDtmb3IodmFyIHMgaW4gdGhpcy53YXlwb2ludHNbaV0pe3ZhciBhPXRoaXMud2F5cG9pbnRzW2ldW3NdO2lmKG51bGwhPT1hLnRyaWdnZXJQb2ludCl7dmFyIGw9by5vbGRTY3JvbGw8YS50cmlnZ2VyUG9pbnQsaD1vLm5ld1Njcm9sbD49YS50cmlnZ2VyUG9pbnQscD1sJiZoLHU9IWwmJiFoOyhwfHx1KSYmKGEucXVldWVUcmlnZ2VyKHIpLHRbYS5ncm91cC5pZF09YS5ncm91cCl9fX1mb3IodmFyIGMgaW4gdCl0W2NdLmZsdXNoVHJpZ2dlcnMoKTt0aGlzLm9sZFNjcm9sbD17eDplLmhvcml6b250YWwubmV3U2Nyb2xsLHk6ZS52ZXJ0aWNhbC5uZXdTY3JvbGx9fSxlLnByb3RvdHlwZS5pbm5lckhlaWdodD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVsZW1lbnQ9PXRoaXMuZWxlbWVudC53aW5kb3c/bi52aWV3cG9ydEhlaWdodCgpOnRoaXMuYWRhcHRlci5pbm5lckhlaWdodCgpfSxlLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24odCl7ZGVsZXRlIHRoaXMud2F5cG9pbnRzW3QuYXhpc11bdC5rZXldLHRoaXMuY2hlY2tFbXB0eSgpfSxlLnByb3RvdHlwZS5pbm5lcldpZHRoPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWxlbWVudD09dGhpcy5lbGVtZW50LndpbmRvdz9uLnZpZXdwb3J0V2lkdGgoKTp0aGlzLmFkYXB0ZXIuaW5uZXJXaWR0aCgpfSxlLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIHQ9W107Zm9yKHZhciBlIGluIHRoaXMud2F5cG9pbnRzKWZvcih2YXIgaSBpbiB0aGlzLndheXBvaW50c1tlXSl0LnB1c2godGhpcy53YXlwb2ludHNbZV1baV0pO2Zvcih2YXIgbz0wLG49dC5sZW5ndGg7bj5vO28rKyl0W29dLmRlc3Ryb3koKX0sZS5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbigpe3ZhciB0LGU9dGhpcy5lbGVtZW50PT10aGlzLmVsZW1lbnQud2luZG93LGk9ZT92b2lkIDA6dGhpcy5hZGFwdGVyLm9mZnNldCgpLG89e307dGhpcy5oYW5kbGVTY3JvbGwoKSx0PXtob3Jpem9udGFsOntjb250ZXh0T2Zmc2V0OmU/MDppLmxlZnQsY29udGV4dFNjcm9sbDplPzA6dGhpcy5vbGRTY3JvbGwueCxjb250ZXh0RGltZW5zaW9uOnRoaXMuaW5uZXJXaWR0aCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC54LGZvcndhcmQ6XCJyaWdodFwiLGJhY2t3YXJkOlwibGVmdFwiLG9mZnNldFByb3A6XCJsZWZ0XCJ9LHZlcnRpY2FsOntjb250ZXh0T2Zmc2V0OmU/MDppLnRvcCxjb250ZXh0U2Nyb2xsOmU/MDp0aGlzLm9sZFNjcm9sbC55LGNvbnRleHREaW1lbnNpb246dGhpcy5pbm5lckhlaWdodCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC55LGZvcndhcmQ6XCJkb3duXCIsYmFja3dhcmQ6XCJ1cFwiLG9mZnNldFByb3A6XCJ0b3BcIn19O2Zvcih2YXIgciBpbiB0KXt2YXIgcz10W3JdO2Zvcih2YXIgYSBpbiB0aGlzLndheXBvaW50c1tyXSl7dmFyIGwsaCxwLHUsYyxkPXRoaXMud2F5cG9pbnRzW3JdW2FdLGY9ZC5vcHRpb25zLm9mZnNldCx3PWQudHJpZ2dlclBvaW50LHk9MCxnPW51bGw9PXc7ZC5lbGVtZW50IT09ZC5lbGVtZW50LndpbmRvdyYmKHk9ZC5hZGFwdGVyLm9mZnNldCgpW3Mub2Zmc2V0UHJvcF0pLFwiZnVuY3Rpb25cIj09dHlwZW9mIGY/Zj1mLmFwcGx5KGQpOlwic3RyaW5nXCI9PXR5cGVvZiBmJiYoZj1wYXJzZUZsb2F0KGYpLGQub3B0aW9ucy5vZmZzZXQuaW5kZXhPZihcIiVcIik+LTEmJihmPU1hdGguY2VpbChzLmNvbnRleHREaW1lbnNpb24qZi8xMDApKSksbD1zLmNvbnRleHRTY3JvbGwtcy5jb250ZXh0T2Zmc2V0LGQudHJpZ2dlclBvaW50PU1hdGguZmxvb3IoeStsLWYpLGg9dzxzLm9sZFNjcm9sbCxwPWQudHJpZ2dlclBvaW50Pj1zLm9sZFNjcm9sbCx1PWgmJnAsYz0haCYmIXAsIWcmJnU/KGQucXVldWVUcmlnZ2VyKHMuYmFja3dhcmQpLG9bZC5ncm91cC5pZF09ZC5ncm91cCk6IWcmJmM/KGQucXVldWVUcmlnZ2VyKHMuZm9yd2FyZCksb1tkLmdyb3VwLmlkXT1kLmdyb3VwKTpnJiZzLm9sZFNjcm9sbD49ZC50cmlnZ2VyUG9pbnQmJihkLnF1ZXVlVHJpZ2dlcihzLmZvcndhcmQpLG9bZC5ncm91cC5pZF09ZC5ncm91cCl9fXJldHVybiBuLnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe2Zvcih2YXIgdCBpbiBvKW9bdF0uZmx1c2hUcmlnZ2VycygpfSksdGhpc30sZS5maW5kT3JDcmVhdGVCeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIGUuZmluZEJ5RWxlbWVudCh0KXx8bmV3IGUodCl9LGUucmVmcmVzaEFsbD1mdW5jdGlvbigpe2Zvcih2YXIgdCBpbiBvKW9bdF0ucmVmcmVzaCgpfSxlLmZpbmRCeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIG9bdC53YXlwb2ludENvbnRleHRLZXldfSx3aW5kb3cub25sb2FkPWZ1bmN0aW9uKCl7ciYmcigpLGUucmVmcmVzaEFsbCgpfSxuLnJlcXVlc3RBbmltYXRpb25GcmFtZT1mdW5jdGlvbihlKXt2YXIgaT13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx0O2kuY2FsbCh3aW5kb3csZSl9LG4uQ29udGV4dD1lfSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0LGUpe3JldHVybiB0LnRyaWdnZXJQb2ludC1lLnRyaWdnZXJQb2ludH1mdW5jdGlvbiBlKHQsZSl7cmV0dXJuIGUudHJpZ2dlclBvaW50LXQudHJpZ2dlclBvaW50fWZ1bmN0aW9uIGkodCl7dGhpcy5uYW1lPXQubmFtZSx0aGlzLmF4aXM9dC5heGlzLHRoaXMuaWQ9dGhpcy5uYW1lK1wiLVwiK3RoaXMuYXhpcyx0aGlzLndheXBvaW50cz1bXSx0aGlzLmNsZWFyVHJpZ2dlclF1ZXVlcygpLG9bdGhpcy5heGlzXVt0aGlzLm5hbWVdPXRoaXN9dmFyIG89e3ZlcnRpY2FsOnt9LGhvcml6b250YWw6e319LG49d2luZG93LldheXBvaW50O2kucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0aGlzLndheXBvaW50cy5wdXNoKHQpfSxpLnByb3RvdHlwZS5jbGVhclRyaWdnZXJRdWV1ZXM9ZnVuY3Rpb24oKXt0aGlzLnRyaWdnZXJRdWV1ZXM9e3VwOltdLGRvd246W10sbGVmdDpbXSxyaWdodDpbXX19LGkucHJvdG90eXBlLmZsdXNoVHJpZ2dlcnM9ZnVuY3Rpb24oKXtmb3IodmFyIGkgaW4gdGhpcy50cmlnZ2VyUXVldWVzKXt2YXIgbz10aGlzLnRyaWdnZXJRdWV1ZXNbaV0sbj1cInVwXCI9PT1pfHxcImxlZnRcIj09PWk7by5zb3J0KG4/ZTp0KTtmb3IodmFyIHI9MCxzPW8ubGVuZ3RoO3M+cjtyKz0xKXt2YXIgYT1vW3JdOyhhLm9wdGlvbnMuY29udGludW91c3x8cj09PW8ubGVuZ3RoLTEpJiZhLnRyaWdnZXIoW2ldKX19dGhpcy5jbGVhclRyaWdnZXJRdWV1ZXMoKX0saS5wcm90b3R5cGUubmV4dD1mdW5jdGlvbihlKXt0aGlzLndheXBvaW50cy5zb3J0KHQpO3ZhciBpPW4uQWRhcHRlci5pbkFycmF5KGUsdGhpcy53YXlwb2ludHMpLG89aT09PXRoaXMud2F5cG9pbnRzLmxlbmd0aC0xO3JldHVybiBvP251bGw6dGhpcy53YXlwb2ludHNbaSsxXX0saS5wcm90b3R5cGUucHJldmlvdXM9ZnVuY3Rpb24oZSl7dGhpcy53YXlwb2ludHMuc29ydCh0KTt2YXIgaT1uLkFkYXB0ZXIuaW5BcnJheShlLHRoaXMud2F5cG9pbnRzKTtyZXR1cm4gaT90aGlzLndheXBvaW50c1tpLTFdOm51bGx9LGkucHJvdG90eXBlLnF1ZXVlVHJpZ2dlcj1mdW5jdGlvbih0LGUpe3RoaXMudHJpZ2dlclF1ZXVlc1tlXS5wdXNoKHQpfSxpLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24odCl7dmFyIGU9bi5BZGFwdGVyLmluQXJyYXkodCx0aGlzLndheXBvaW50cyk7ZT4tMSYmdGhpcy53YXlwb2ludHMuc3BsaWNlKGUsMSl9LGkucHJvdG90eXBlLmZpcnN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMud2F5cG9pbnRzWzBdfSxpLnByb3RvdHlwZS5sYXN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMud2F5cG9pbnRzW3RoaXMud2F5cG9pbnRzLmxlbmd0aC0xXX0saS5maW5kT3JDcmVhdGU9ZnVuY3Rpb24odCl7cmV0dXJuIG9bdC5heGlzXVt0Lm5hbWVdfHxuZXcgaSh0KX0sbi5Hcm91cD1pfSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXt0aGlzLiRlbGVtZW50PWUodCl9dmFyIGU9d2luZG93LmpRdWVyeSxpPXdpbmRvdy5XYXlwb2ludDtlLmVhY2goW1wiaW5uZXJIZWlnaHRcIixcImlubmVyV2lkdGhcIixcIm9mZlwiLFwib2Zmc2V0XCIsXCJvblwiLFwib3V0ZXJIZWlnaHRcIixcIm91dGVyV2lkdGhcIixcInNjcm9sbExlZnRcIixcInNjcm9sbFRvcFwiXSxmdW5jdGlvbihlLGkpe3QucHJvdG90eXBlW2ldPWZ1bmN0aW9uKCl7dmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtyZXR1cm4gdGhpcy4kZWxlbWVudFtpXS5hcHBseSh0aGlzLiRlbGVtZW50LHQpfX0pLGUuZWFjaChbXCJleHRlbmRcIixcImluQXJyYXlcIixcImlzRW1wdHlPYmplY3RcIl0sZnVuY3Rpb24oaSxvKXt0W29dPWVbb119KSxpLmFkYXB0ZXJzLnB1c2goe25hbWU6XCJqcXVlcnlcIixBZGFwdGVyOnR9KSxpLkFkYXB0ZXI9dH0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGk9W10sbz1hcmd1bWVudHNbMF07cmV0dXJuIHQuaXNGdW5jdGlvbihhcmd1bWVudHNbMF0pJiYobz10LmV4dGVuZCh7fSxhcmd1bWVudHNbMV0pLG8uaGFuZGxlcj1hcmd1bWVudHNbMF0pLHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuPXQuZXh0ZW5kKHt9LG8se2VsZW1lbnQ6dGhpc30pO1wic3RyaW5nXCI9PXR5cGVvZiBuLmNvbnRleHQmJihuLmNvbnRleHQ9dCh0aGlzKS5jbG9zZXN0KG4uY29udGV4dClbMF0pLGkucHVzaChuZXcgZShuKSl9KSxpfX12YXIgZT13aW5kb3cuV2F5cG9pbnQ7d2luZG93LmpRdWVyeSYmKHdpbmRvdy5qUXVlcnkuZm4ud2F5cG9pbnQ9dCh3aW5kb3cualF1ZXJ5KSksd2luZG93LlplcHRvJiYod2luZG93LlplcHRvLmZuLndheXBvaW50PXQod2luZG93LlplcHRvKSl9KCk7Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUMsQ0FBQyxDQUFDO0FBQ0gsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakIsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQ3JDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDL0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRztBQUNwRSxDQUFDLENBQUM7QUFDRixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9
/*!
 * jquery.counterup.js 2.1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Amended by Jeremy Paris, Ciro Mattia Gonano and others
 *
 * Date: Feb 24, 2017
 */
(function ($) {
  "use strict";
  $.fn.counterUp = function (options) {
    var settings = $.extend(
        {
          time: 400,
          delay: 10,
          offset: 100,
          beginAt: 0,
          formatter: false,
          context: "window",
          callback: function () {},
        },
        options
      ),
      s;
    return this.each(function () {
      var $this = $(this),
        counter = {
          time: $(this).data("counterup-time") || settings.time,
          delay: $(this).data("counterup-delay") || settings.delay,
          offset: $(this).data("counterup-offset") || settings.offset,
          beginAt: $(this).data("counterup-beginat") || settings.beginAt,
          context: $(this).data("counterup-context") || settings.context,
        };
      var counterUpper = function () {
        var nums = [];
        var divisions = counter.time / counter.delay;
        var num = $(this).attr("data-num")
          ? $(this).attr("data-num")
          : $this.text();
        var isComma = /[0-9]+,[0-9]+/.test(num);
        num = num.replace(/,/g, "");
        var decimalPlaces = (num.split(".")[1] || []).length;
        if (counter.beginAt > num) counter.beginAt = num;
        var isTime = /[0-9]+:[0-9]+:[0-9]+/.test(num);
        if (isTime) {
          var times = num.split(":"),
            m = 1;
          s = 0;
          while (times.length > 0) {
            s += m * parseInt(times.pop(), 10);
            m *= 60;
          }
        }
        for (var i = divisions; i >= (counter.beginAt / num) * divisions; i--) {
          var newNum = parseFloat((num / divisions) * i).toFixed(decimalPlaces);
          if (isTime) {
            newNum = parseInt((s / divisions) * i);
            var hours = parseInt(newNum / 3600) % 24;
            var minutes = parseInt(newNum / 60) % 60;
            var seconds = parseInt(newNum % 60, 10);
            newNum =
              (hours < 10 ? "0" + hours : hours) +
              ":" +
              (minutes < 10 ? "0" + minutes : minutes) +
              ":" +
              (seconds < 10 ? "0" + seconds : seconds);
          }
          if (isComma) {
            while (/(\d+)(\d{3})/.test(newNum.toString())) {
              newNum = newNum
                .toString()
                .replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
            }
          }
          if (settings.formatter) {
            newNum = settings.formatter.call(this, newNum);
          }
          nums.unshift(newNum);
        }
        $this.data("counterup-nums", nums);
        $this.text(counter.beginAt);
        var f = function () {
          if (!$this.data("counterup-nums")) {
            settings.callback.call(this);
            return;
          }
          $this.html($this.data("counterup-nums").shift());
          if ($this.data("counterup-nums").length) {
            setTimeout($this.data("counterup-func"), counter.delay);
          } else {
            $this.data("counterup-nums", null);
            $this.data("counterup-func", null);
            settings.callback.call(this);
          }
        };
        $this.data("counterup-func", f);
        setTimeout($this.data("counterup-func"), counter.delay);
      };
      $this.waypoint(
        function (direction) {
          counterUpper();
          this.destroy();
        },
        { offset: counter.offset + "%", context: counter.context }
      );
    });
  };
})(jQuery);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXJ1cC5taW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBqcXVlcnkuY291bnRlcnVwLmpzIDIuMS4wXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIEJlbmphbWluIEludGFsIGh0dHA6Ly9nYW1iaXQucGggQGJmaW50YWxcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBHUEwgdjIgTGljZW5zZVxuICpcbiAqIEFtZW5kZWQgYnkgSmVyZW15IFBhcmlzLCBDaXJvIE1hdHRpYSBHb25hbm8gYW5kIG90aGVyc1xuICpcbiAqIERhdGU6IEZlYiAyNCwgMjAxN1xuICovXG4oZnVuY3Rpb24gKCQpIHsgXCJ1c2Ugc3RyaWN0XCI7ICQuZm4uY291bnRlclVwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHsgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoeyB0aW1lOiA0MDAsIGRlbGF5OiAxMCwgb2Zmc2V0OiAxMDAsIGJlZ2luQXQ6IDAsIGZvcm1hdHRlcjogZmFsc2UsIGNvbnRleHQ6IFwid2luZG93XCIsIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7IH0gfSwgb3B0aW9ucyksIHM7IHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkgeyB2YXIgJHRoaXMgPSAkKHRoaXMpLCBjb3VudGVyID0geyB0aW1lOiAkKHRoaXMpLmRhdGEoXCJjb3VudGVydXAtdGltZVwiKSB8fCBzZXR0aW5ncy50aW1lLCBkZWxheTogJCh0aGlzKS5kYXRhKFwiY291bnRlcnVwLWRlbGF5XCIpIHx8IHNldHRpbmdzLmRlbGF5LCBvZmZzZXQ6ICQodGhpcykuZGF0YShcImNvdW50ZXJ1cC1vZmZzZXRcIikgfHwgc2V0dGluZ3Mub2Zmc2V0LCBiZWdpbkF0OiAkKHRoaXMpLmRhdGEoXCJjb3VudGVydXAtYmVnaW5hdFwiKSB8fCBzZXR0aW5ncy5iZWdpbkF0LCBjb250ZXh0OiAkKHRoaXMpLmRhdGEoXCJjb3VudGVydXAtY29udGV4dFwiKSB8fCBzZXR0aW5ncy5jb250ZXh0IH07IHZhciBjb3VudGVyVXBwZXIgPSBmdW5jdGlvbiAoKSB7IHZhciBudW1zID0gW107IHZhciBkaXZpc2lvbnMgPSBjb3VudGVyLnRpbWUgLyBjb3VudGVyLmRlbGF5OyB2YXIgbnVtID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1udW1cIikgPyAkKHRoaXMpLmF0dHIoXCJkYXRhLW51bVwiKSA6ICR0aGlzLnRleHQoKTsgdmFyIGlzQ29tbWEgPSAvWzAtOV0rLFswLTldKy8udGVzdChudW0pOyBudW0gPSBudW0ucmVwbGFjZSgvLC9nLCBcIlwiKTsgdmFyIGRlY2ltYWxQbGFjZXMgPSAobnVtLnNwbGl0KFwiLlwiKVsxXSB8fCBbXSkubGVuZ3RoOyBpZiAoY291bnRlci5iZWdpbkF0ID4gbnVtKSBjb3VudGVyLmJlZ2luQXQgPSBudW07IHZhciBpc1RpbWUgPSAvWzAtOV0rOlswLTldKzpbMC05XSsvLnRlc3QobnVtKTsgaWYgKGlzVGltZSkgeyB2YXIgdGltZXMgPSBudW0uc3BsaXQoXCI6XCIpLCBtID0gMTsgcyA9IDA7IHdoaWxlICh0aW1lcy5sZW5ndGggPiAwKSB7IHMgKz0gbSAqIHBhcnNlSW50KHRpbWVzLnBvcCgpLCAxMCk7IG0gKj0gNjAgfSB9IGZvciAodmFyIGkgPSBkaXZpc2lvbnM7IGkgPj0gY291bnRlci5iZWdpbkF0IC8gbnVtICogZGl2aXNpb25zOyBpLS0pIHsgdmFyIG5ld051bSA9IHBhcnNlRmxvYXQobnVtIC8gZGl2aXNpb25zICogaSkudG9GaXhlZChkZWNpbWFsUGxhY2VzKTsgaWYgKGlzVGltZSkgeyBuZXdOdW0gPSBwYXJzZUludChzIC8gZGl2aXNpb25zICogaSk7IHZhciBob3VycyA9IHBhcnNlSW50KG5ld051bSAvIDM2MDApICUgMjQ7IHZhciBtaW51dGVzID0gcGFyc2VJbnQobmV3TnVtIC8gNjApICUgNjA7IHZhciBzZWNvbmRzID0gcGFyc2VJbnQobmV3TnVtICUgNjAsIDEwKTsgbmV3TnVtID0gKGhvdXJzIDwgMTAgPyBcIjBcIiArIGhvdXJzIDogaG91cnMpICsgXCI6XCIgKyAobWludXRlcyA8IDEwID8gXCIwXCIgKyBtaW51dGVzIDogbWludXRlcykgKyBcIjpcIiArIChzZWNvbmRzIDwgMTAgPyBcIjBcIiArIHNlY29uZHMgOiBzZWNvbmRzKSB9IGlmIChpc0NvbW1hKSB7IHdoaWxlICgvKFxcZCspKFxcZHszfSkvLnRlc3QobmV3TnVtLnRvU3RyaW5nKCkpKSB7IG5ld051bSA9IG5ld051bS50b1N0cmluZygpLnJlcGxhY2UoLyhcXGQrKShcXGR7M30pLywgXCIkMVwiICsgXCIsXCIgKyBcIiQyXCIpIH0gfSBpZiAoc2V0dGluZ3MuZm9ybWF0dGVyKSB7IG5ld051bSA9IHNldHRpbmdzLmZvcm1hdHRlci5jYWxsKHRoaXMsIG5ld051bSkgfSBudW1zLnVuc2hpZnQobmV3TnVtKSB9ICR0aGlzLmRhdGEoXCJjb3VudGVydXAtbnVtc1wiLCBudW1zKTsgJHRoaXMudGV4dChjb3VudGVyLmJlZ2luQXQpOyB2YXIgZiA9IGZ1bmN0aW9uICgpIHsgaWYgKCEkdGhpcy5kYXRhKFwiY291bnRlcnVwLW51bXNcIikpIHsgc2V0dGluZ3MuY2FsbGJhY2suY2FsbCh0aGlzKTsgcmV0dXJuIH0gJHRoaXMuaHRtbCgkdGhpcy5kYXRhKFwiY291bnRlcnVwLW51bXNcIikuc2hpZnQoKSk7IGlmICgkdGhpcy5kYXRhKFwiY291bnRlcnVwLW51bXNcIikubGVuZ3RoKSB7IHNldFRpbWVvdXQoJHRoaXMuZGF0YShcImNvdW50ZXJ1cC1mdW5jXCIpLCBjb3VudGVyLmRlbGF5KSB9IGVsc2UgeyAkdGhpcy5kYXRhKFwiY291bnRlcnVwLW51bXNcIiwgbnVsbCk7ICR0aGlzLmRhdGEoXCJjb3VudGVydXAtZnVuY1wiLCBudWxsKTsgc2V0dGluZ3MuY2FsbGJhY2suY2FsbCh0aGlzKSB9IH07ICR0aGlzLmRhdGEoXCJjb3VudGVydXAtZnVuY1wiLCBmKTsgc2V0VGltZW91dCgkdGhpcy5kYXRhKFwiY291bnRlcnVwLWZ1bmNcIiksIGNvdW50ZXIuZGVsYXkpIH07ICR0aGlzLndheXBvaW50KGZ1bmN0aW9uIChkaXJlY3Rpb24pIHsgY291bnRlclVwcGVyKCk7IHRoaXMuZGVzdHJveSgpIH0sIHsgb2Zmc2V0OiBjb3VudGVyLm9mZnNldCArIFwiJVwiLCBjb250ZXh0OiBjb3VudGVyLmNvbnRleHQgfSkgfSkgfSB9KShqUXVlcnkpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDM0QsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPO0FBQ3BDLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNO0FBQ3pELENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7In0=
/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"],
        },
      }),
      a.each(
        ["onResize", "onThrottledResize"],
        a.proxy(function (b, c) {
          this._handlers[c] = a.proxy(this[c], this);
        }, this)
      ),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Workers,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  (e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Type = { Event: "event", State: "state" }),
    (e.Plugins = {}),
    (e.Workers = [
      {
        filter: ["width", "settings"],
        run: function () {
          this._width = this.$element.width();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          this.$stage.children(".cloned").remove();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
              width: "auto",
              "margin-left": d ? b : "",
              "margin-right": d ? "" : b,
            };
          !c && this.$stage.children().css(e), (a.css = e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];
          for (a.items = { merge: !1, width: b }; d--; )
            (c = this._mergers[d]),
              (c =
                (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
                c),
              (a.items.merge = c > 1 || a.items.merge),
              (f[d] = e ? b * c : this._items[d].width());
          this._widths = f;
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
            h = "",
            i = "";
          for (g /= 2; g--; )
            b.push(this.normalize(b.length / 2, !0)),
              (h += c[b[b.length - 1]][0].outerHTML),
              b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
              (i = c[b[b.length - 1]][0].outerHTML + i);
          (this._clones = b),
            a(h).addClass("cloned").appendTo(this.$stage),
            a(i).addClass("cloned").prependTo(this.$stage);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          for (
            var a = this.settings.rtl ? 1 : -1,
              b = this._clones.length + this._items.length,
              c = -1,
              d = 0,
              e = 0,
              f = [];
            ++c < b;

          )
            (d = f[c - 1] || 0),
              (e = this._widths[this.relative(c)] + this.settings.margin),
              f.push(d + e * a);
          this._coordinates = f;
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
              width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
              "padding-left": a || "",
              "padding-right": a || "",
            };
          this.$stage.css(c);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
          if (c && a.items.merge)
            for (; b--; )
              (a.css.width = this._widths[this.relative(b)]),
                d.eq(b).css(a.css);
          else c && ((a.css.width = a.items.width), d.css(a.css));
        },
      },
      {
        filter: ["items"],
        run: function () {
          this._coordinates.length < 1 && this.$stage.removeAttr("style");
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          (a.current = a.current ? this.$stage.children().index(a.current) : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current)
            )),
            this.reset(a.current);
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; c < d; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage.children(".active").removeClass("active"),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass("active"),
            this.settings.center &&
              (this.$stage.children(".center").removeClass("center"),
              this.$stage.children().eq(this.current()).addClass("center"));
        },
      },
    ]),
    (e.prototype.initialize = function () {
      if (
        (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading"))
      ) {
        var b, c, e;
        (b = this.$element.find("img")),
          (c = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (e = this.$element.children(c).width()),
          b.length && e <= 0 && this.preloadAutoWidthImages(b);
      }
      this.$element.addClass(this.options.loadingClass),
        (this.$stage = a(
          "<" +
            this.settings.stageElement +
            ' class="' +
            this.settings.stageClass +
            '"/>'
        ).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.$element.is(":visible")
          ? this.refresh()
          : this.invalidate("width"),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          "function" == typeof e.stagePadding &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + d
                )
            ))
        : (e = a.extend({}, this.options)),
        this.trigger("change", { property: { name: "settings", value: e } }),
        (this._breakpoint = d),
        (this.settings = e),
        this.invalidate("settings"),
        this.trigger("changed", {
          property: { name: "settings", value: this.settings },
        });
    }),
    (e.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        b < c;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      (this._invalidated = {}), !this.is("valid") && this.enter("valid");
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed");
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.$element.is(":visible") &&
        (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented()
          ? (this.leave("resizing"), !1)
          : (this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            void this.trigger("resized")))
      );
    }),
    (e.prototype.registerEventHandlers = function () {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + ".owl.core",
          a.proxy(this.onTransitionEnd, this)
        ),
        this.settings.responsive !== !1 &&
          this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
          this.$stage.on(
            "dragstart.owl.core selectstart.owl.core",
            function () {
              return !1;
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            a.proxy(this.onDragStart, this)
          ),
          this.$stage.on(
            "touchcancel.owl.core",
            a.proxy(this.onDragEnd, this)
          ));
    }),
    (e.prototype.onDragStart = function (b) {
      var d = null;
      3 !== b.which &&
        (a.support.transform
          ? ((d = this.$stage
              .css("transform")
              .replace(/.*\(|\)| /g, "")
              .split(",")),
            (d = {
              x: d[16 === d.length ? 12 : 4],
              y: d[16 === d.length ? 13 : 5],
            }))
          : ((d = this.$stage.position()),
            (d = {
              x: this.settings.rtl
                ? d.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : d.left,
              y: d.top,
            })),
        this.is("animating") &&
          (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
          this.invalidate("position")),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === b.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          "mouseup.owl.core touchend.owl.core",
          a.proxy(this.onDragEnd, this)
        ),
        a(c).one(
          "mousemove.owl.core touchmove.owl.core",
          a.proxy(function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on(
              "mousemove.owl.core touchmove.owl.core",
              a.proxy(this.onDragMove, this)
            ),
              (Math.abs(d.x) < Math.abs(d.y) && this.is("valid")) ||
                (b.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"));
          }, this)
        ));
    }),
    (e.prototype.onDragMove = function (a) {
      var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
      this.is("dragging") &&
        (a.preventDefault(),
        this.settings.loop
          ? ((b = this.coordinates(this.minimum())),
            (c = this.coordinates(this.maximum() + 1) - b),
            (f.x = ((((f.x - b) % c) + c) % c) + b))
          : ((b = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (c = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
            (f.x = Math.max(Math.min(f.x, b + d), c + d))),
        (this._drag.stage.current = f),
        this.animate(f.x));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
      a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
          this.invalidate("position"),
          this.update(),
          (this._drag.direction = f),
          (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one("click.owl.core", function () {
              return !1;
            })),
        this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
    }),
    (e.prototype.closest = function (b, c) {
      var d = -1,
        e = 30,
        f = this.width(),
        g = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            g,
            a.proxy(function (a, h) {
              return (
                "left" === c && b > h - e && b < h + e
                  ? (d = a)
                  : "right" === c && b > h - f - e && b < h - f + e
                  ? (d = a + 1)
                  : this.op(b, "<", h) &&
                    this.op(b, ">", g[a + 1] || h - f) &&
                    (d = "left" === c ? a + 1 : a),
                d === -1
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", g[this.minimum()])
            ? (d = b = this.minimum())
            : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())),
        d
      );
    }),
    (e.prototype.animate = function (b) {
      var c = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px,0px)",
              transition: this.speed() / 1e3 + "s",
            })
          : c
          ? this.$stage.animate(
              { left: b + "px" },
              this.speed(),
              this.settings.fallbackEasing,
              a.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: b + "px" });
    }),
    (e.prototype.is = function (a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (b) {
      return (
        "string" === a.type(b) &&
          ((this._invalidated[b] = !0),
          this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function (a, b) {
          return b;
        })
      );
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)),
        a !== d &&
          ((this._speed = 0),
          (this._current = a),
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(a)),
          this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (a, b) {
      var c = this._items.length,
        e = b ? 0 : this._clones.length;
      return (
        !this.isNumeric(a) || c < 1
          ? (a = d)
          : (a < 0 || a >= c + e) &&
            (a = ((((a - e / 2) % c) + c) % c) + e / 2),
        a
      );
    }),
    (e.prototype.relative = function (a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0);
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
      else if (e.autoWidth || e.merge) {
        for (
          b = this._items.length,
            c = this._items[--b].width(),
            d = this.$element.width();
          b-- &&
          ((c += this._items[b].width() + this.settings.margin), !(c > d));

        );
        f = b + 1;
      } else
        f = e.center ? this._items.length - 1 : this._items.length - e.items;
      return a && (f -= this._clones.length / 2), Math.max(f, 0);
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c,
        e = 1,
        f = b - 1;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((e = -1), (f = b + 1)),
              (c = this._coordinates[b]),
              (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e))
            : (c = this._coordinates[f] || 0),
          (c = Math.ceil(c)));
    }),
    (e.prototype.duration = function (a, b, c) {
      return 0 === c
        ? 0
        : Math.min(Math.max(Math.abs(b - a), 1), 6) *
            Math.abs(c || this.settings.smartSpeed);
    }),
    (e.prototype.to = function (a, b) {
      var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g),
          (a = c + e),
          (d = ((((a - h) % g) + g) % g) + h),
          d !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c)))
        : this.settings.rewind
        ? ((i += 1), (a = ((a % i) + i) % i))
        : (a = Math.max(h, Math.min(i, a))),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.$element.is(":visible") && this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.onTransitionEnd = function (a) {
      if (
        a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      )
        return !1;
      this.leave("animating"), this.trigger("translated");
    }),
    (e.prototype.viewport = function () {
      var d;
      return (
        this.options.responsiveBaseElement !== b
          ? (d = a(this.options.responsiveBaseElement).width())
          : b.innerWidth
          ? (d = b.innerWidth)
          : c.documentElement && c.documentElement.clientWidth
          ? (d = c.documentElement.clientWidth)
          : console.warn("Can not detect viewport width."),
        d
      );
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (b, c) {
      var e = this.relative(this._current);
      (c = c === d ? this._items.length : this.normalize(c, !0)),
        (b = b instanceof jQuery ? b : a(b)),
        this.trigger("add", { content: b, position: c }),
        (b = this.prepare(b)),
        0 === this._items.length || c === this._items.length
          ? (0 === this._items.length && this.$stage.append(b),
            0 !== this._items.length && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(
              c,
              0,
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", { content: b, position: c });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)),
        a !== d &&
          (this.trigger("remove", { content: this._items[a], position: a }),
          this._items[a].remove(),
          this._items.splice(a, 1),
          this._mergers.splice(a, 1),
          this.invalidate("items"),
          this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      b.each(
        a.proxy(function (b, c) {
          this.enter("pre-loading"),
            (c = a(c)),
            a(new Image())
              .one(
                "load",
                a.proxy(function (a) {
                  c.attr("src", a.target.src),
                    c.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") &&
                      !this.is("initializing") &&
                      this.refresh();
                }, this)
              )
              .attr(
                "src",
                c.attr("src") || c.attr("data-src") || c.attr("data-src-retina")
              );
        }, this)
      );
    }),
    (e.prototype.destroy = function () {
      this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        this.settings.responsive !== !1 &&
          (b.clearTimeout(this.resizeTimer),
          this.off(b, "resize", this._handlers.onThrottledResize));
      for (var d in this._plugins) this._plugins[d].destroy();
      this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            "class",
            this.$element
              .attr("class")
              .replace(
                new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                ""
              )
          )
          .removeData("owl.carousel");
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : a < c;
        case ">":
          return d ? a < c : a > c;
        case ">=":
          return d ? a <= c : a >= c;
        case "<=":
          return d ? a >= c : a <= c;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d, f, g) {
      var h = { item: { count: this._items.length, index: this.current() } },
        i = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        j = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, h, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j);
          }),
          this.register({ type: e.Type.Event, name: b }),
          this.$element.trigger(j),
          this.settings &&
            "function" == typeof this.settings[i] &&
            this.settings[i].call(this, j)),
        j
      );
    }),
    (e.prototype.enter = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++;
        }, this)
      );
    }),
    (e.prototype.leave = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b]--;
        }, this)
      );
    }),
    (e.prototype.register = function (b) {
      if (b.type === e.Type.Event) {
        if (
          (a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl)
        ) {
          var c = a.event.special[b.name]._default;
          (a.event.special[b.name]._default = function (a) {
            return !c ||
              !c.apply ||
              (a.namespace && a.namespace.indexOf("owl") !== -1)
              ? a.namespace && a.namespace.indexOf("owl") > -1
              : c.apply(this, arguments);
          }),
            (a.event.special[b.name].owl = !0);
        }
      } else
        b.type === e.Type.State &&
          (this._states.tags[b.name]
            ? (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags
              ))
            : (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function (c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d;
            }, this)
          )));
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.pointer = function (a) {
      var c = { x: null, y: null };
      return (
        (a = a.originalEvent || a || b.event),
        (a =
          a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : a),
        a.pageX
          ? ((c.x = a.pageX), (c.y = a.pageY))
          : ((c.x = a.clientX), (c.y = a.clientY)),
        c
      );
    }),
    (e.prototype.isNumeric = function (a) {
      return !isNaN(parseFloat(a));
    }),
    (e.prototype.difference = function (a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }),
    (a.fn.owlCarousel = function (b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var d = a(this),
          f = d.data("owl.carousel");
        f ||
          ((f = new e(this, "object" == typeof b && b)),
          d.data("owl.carousel", f),
          a.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove",
            ],
            function (b, c) {
              f.register({ type: e.Type.Event, name: c }),
                f.$element.on(
                  c + ".owl.carousel.core",
                  a.proxy(function (a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c]));
                  }, f)
                );
            }
          )),
          "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (e.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.$element.is(":visible")),
          (this._interval = b.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (e.prototype.refresh = function () {
        this._core.$element.is(":visible") !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (e.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
            a.proxy(function (b) {
              if (
                b.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((b.property && "position" == b.property.name) ||
                  "initialized" == b.type)
              )
                for (
                  var c = this._core.settings,
                    e = (c.center && Math.ceil(c.items / 2)) || c.items,
                    f = (c.center && e * -1) || 0,
                    g =
                      (b.property && b.property.value !== d
                        ? b.property.value
                        : this._core.current()) + f,
                    h = this._core.clones().length,
                    i = a.proxy(function (a, b) {
                      this.load(b);
                    }, this);
                  f++ < e;

                )
                  this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++;
            }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { lazyLoad: !1 }),
      (e.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": 'url("' + g + '")',
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (
            a
          ) {
            a.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              "position" == a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (e.prototype.update = function () {
        var b = this._core._current,
          c = b + this._core.settings.items,
          d = this._core.$stage.children().toArray().slice(b, c),
          e = [],
          f = 0;
        a.each(d, function (b, c) {
          e.push(a(c).height());
        }),
          (f = Math.max.apply(null, e)),
          this._core.$stage
            .parent()
            .height(f)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" === a.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content).find(".owl-video");
              c.length &&
                (c.css("display", "none"), this.fetch(c, a(b.content)));
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (e.prototype.fetch = function (a, b) {
        var c = (function () {
            return a.attr("data-vimeo-id")
              ? "vimeo"
              : a.attr("data-vzaar-id")
              ? "vzaar"
              : "youtube";
          })(),
          d =
            a.attr("data-vimeo-id") ||
            a.attr("data-youtube-id") ||
            a.attr("data-vzaar-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
          if (!(d[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          c = "vzaar";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (e.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"'
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (a) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? '<div class="owl-video-tn ' +
                  j +
                  '" ' +
                  i +
                  '="' +
                  a +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  a +
                  ')"></div>'),
              b.after(d),
              b.after(e);
          };
        if (
          (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length)
        )
          return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type
          ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"), l(f))
          : "vimeo" === c.type
          ? a.ajax({
              type: "GET",
              url: "//vimeo.com/api/v2/video/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a[0].thumbnail_large), l(f);
              },
            })
          : "vzaar" === c.type &&
            a.ajax({
              type: "GET",
              url: "//vzaar.com/api/videos/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a.framegrab_url), l(f);
              },
            });
      }),
      (e.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (e.prototype.play = function (b) {
        var c,
          d = a(b.target),
          e = d.closest("." + this._core.settings.itemClass),
          f = this._videos[e.attr("data-video")],
          g = f.width || "100%",
          h = f.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (e = this._core.items(this._core.relative(e.index()))),
          this._core.reset(e.index()),
          "youtube" === f.type
            ? (c =
                '<iframe width="' +
                g +
                '" height="' +
                h +
                '" src="//www.youtube.com/embed/' +
                f.id +
                "?autoplay=1&rel=0&v=" +
                f.id +
                '" frameborder="0" allowfullscreen></iframe>')
            : "vimeo" === f.type
            ? (c =
                '<iframe src="//player.vimeo.com/video/' +
                f.id +
                '?autoplay=1" width="' +
                g +
                '" height="' +
                h +
                '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            : "vzaar" === f.type &&
              (c =
                '<iframe frameborder="0"height="' +
                h +
                '"width="' +
                g +
                '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                f.id +
                '/player?autoplay=true"></iframe>'),
          a('<div class="owl-video-frame">' + c + "</div>").insertAfter(
            e.find(".owl-video")
          ),
          (this._playing = e.addClass("owl-video-playing")));
      }),
      (e.prototype.isInFullScreen = function () {
        var b =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame");
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              a.namespace && (this.swapping = "translated" == a.type);
            }, this),
          "translate.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)),
            f &&
              e
                .one(a.support.animation.end, c)
                .addClass("animated owl-animated-in")
                .addClass(f));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._timeout = null),
        (this._paused = !1),
        (this._handlers = {
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "settings" === a.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : a.namespace &&
                "position" === a.property.name &&
                this._core.settings.autoplay &&
                this._setAutoPlayInterval();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            a.namespace && this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function (a) {
            a.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, e.Defaults, this._core.options));
    };
    (e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (e.prototype.play = function (a, b) {
        (this._paused = !1),
          this._core.is("rotating") ||
            (this._core.enter("rotating"), this._setAutoPlayInterval());
      }),
      (e.prototype._getNextTimeout = function (d, e) {
        return (
          this._timeout && b.clearTimeout(this._timeout),
          b.setTimeout(
            a.proxy(function () {
              this._paused ||
                this._core.is("busy") ||
                this._core.is("interacting") ||
                c.hidden ||
                this._core.next(e || this._core.settings.autoplaySpeed);
            }, this),
            d || this._core.settings.autoplayTimeout
          )
        );
      }),
      (e.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout();
      }),
      (e.prototype.stop = function () {
        this._core.is("rotating") &&
          (b.clearTimeout(this._timeout), this._core.leave("rotating"));
      }),
      (e.prototype.pause = function () {
        this._core.is("rotating") && (this._paused = !0);
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (b) {
      (this._core = b),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            b.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(b.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "position" == a.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (e.Defaults = {
      nav: !1,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function () {
        var b,
          c = this._core.settings;
        (this._controls.$relative = (
          c.navContainer
            ? a(c.navContainer)
            : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
          (this._controls.$previous = a("<" + c.navElement + ">")
            .addClass(c.navClass[0])
            .html(c.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.prev(c.navSpeed);
              }, this)
            )),
          (this._controls.$next = a("<" + c.navElement + ">")
            .addClass(c.navClass[1])
            .html(c.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.next(c.navSpeed);
              }, this)
            )),
          c.dotsData ||
            (this._templates = [
              a("<div>")
                .addClass(c.dotClass)
                .append(a("<span>"))
                .prop("outerHTML"),
            ]),
          (this._controls.$absolute = (
            c.dotsContainer
              ? a(c.dotsContainer)
              : a("<div>").addClass(c.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "div",
            a.proxy(function (b) {
              var d = a(b.target).parent().is(this._controls.$absolute)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(d, c.dotsSpeed);
            }, this)
          );
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
      }),
      (e.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (e.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.clones().length / 2,
          e = d + this._core.items().length,
          f = this._core.maximum(!0),
          g = this._core.settings,
          h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if (
          ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
          g.dots || "page" == g.slideBy)
        )
          for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
              if (
                (this._pages.push({
                  start: Math.min(f, a - d),
                  end: a - d + h - 1,
                }),
                Math.min(f, a - d) === f)
              )
                break;
              (b = 0), ++c;
            }
            b += this._core.mergers(this._core.relative(a));
          }
      }),
      (e.prototype.draw = function () {
        var b,
          c = this._core.settings,
          d = this._core.items().length <= c.items,
          e = this._core.relative(this._core.current()),
          f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
          c.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !f && e <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !f && e >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !c.dots || d),
          c.dots &&
            ((b =
              this._pages.length - this._controls.$absolute.children().length),
            c.dotsData && 0 !== b
              ? this._controls.$absolute.html(this._templates.join(""))
              : b > 0
              ? this._controls.$absolute.append(
                  new Array(b + 1).join(this._templates[0])
                )
              : b < 0 && this._controls.$absolute.children().slice(b).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (e.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items),
        };
      }),
      (e.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(
            this._pages,
            a.proxy(function (a, c) {
              return a.start <= b && a.end >= b;
            }, this)
          )
          .pop();
      }),
      (e.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (e.prototype.to = function (b, c, d) {
        var e;
        !d && this._pages.length
          ? ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ))
          : a.proxy(this._overrides.to, this._core)(b, c);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (c) {
      (this._core = c),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (c) {
            c.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!c) return;
              this._hashes[c] = b.content;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (c) {
            if (c.namespace && "position" === c.property.name) {
              var d = this._core.items(
                  this._core.relative(this._core.current())
                ),
                e = a
                  .map(this._hashes, function (a, b) {
                    return a === d ? b : null;
                  })
                  .join();
              if (!e || b.location.hash.slice(1) === e) return;
              b.location.hash = e;
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function (a) {
            var c = b.location.hash.substring(1),
              e = this._core.$stage.children(),
              f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d &&
              f !== this._core.current() &&
              this._core.to(this._core.relative(f), !1, !0);
          }, this)
        );
    };
    (e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    function e(b, c) {
      var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
      return (
        a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
          if (g[b] !== d) return (e = !c || b), !1;
        }),
        e
      );
    }
    function f(a) {
      return e(a, !0);
    }
    var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      },
      j = {
        csstransforms: function () {
          return !!e("transform");
        },
        csstransforms3d: function () {
          return !!e("perspective");
        },
        csstransitions: function () {
          return !!e("transition");
        },
        cssanimations: function () {
          return !!e("animation");
        },
      };
    j.csstransitions() &&
      ((a.support.transition = new String(f("transition"))),
      (a.support.transition.end = i.transition.end[a.support.transition])),
      j.cssanimations() &&
        ((a.support.animation = new String(f("animation"))),
        (a.support.animation.end = i.animation.end[a.support.animation])),
      j.csstransforms() &&
        ((a.support.transform = new String(f("transform"))),
        (a.support.transform3d = j.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm93bC5jYXJvdXNlbC5taW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBPd2wgQ2Fyb3VzZWwgdjIuMi4xXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE3IERhdmlkIERldXRzY2hcbiAqIExpY2Vuc2VkIHVuZGVyICAoKVxuICovXG4hZnVuY3Rpb24oYSxiLGMsZCl7ZnVuY3Rpb24gZShiLGMpe3RoaXMuc2V0dGluZ3M9bnVsbCx0aGlzLm9wdGlvbnM9YS5leHRlbmQoe30sZS5EZWZhdWx0cyxjKSx0aGlzLiRlbGVtZW50PWEoYiksdGhpcy5faGFuZGxlcnM9e30sdGhpcy5fcGx1Z2lucz17fSx0aGlzLl9zdXByZXNzPXt9LHRoaXMuX2N1cnJlbnQ9bnVsbCx0aGlzLl9zcGVlZD1udWxsLHRoaXMuX2Nvb3JkaW5hdGVzPVtdLHRoaXMuX2JyZWFrcG9pbnQ9bnVsbCx0aGlzLl93aWR0aD1udWxsLHRoaXMuX2l0ZW1zPVtdLHRoaXMuX2Nsb25lcz1bXSx0aGlzLl9tZXJnZXJzPVtdLHRoaXMuX3dpZHRocz1bXSx0aGlzLl9pbnZhbGlkYXRlZD17fSx0aGlzLl9waXBlPVtdLHRoaXMuX2RyYWc9e3RpbWU6bnVsbCx0YXJnZXQ6bnVsbCxwb2ludGVyOm51bGwsc3RhZ2U6e3N0YXJ0Om51bGwsY3VycmVudDpudWxsfSxkaXJlY3Rpb246bnVsbH0sdGhpcy5fc3RhdGVzPXtjdXJyZW50Ont9LHRhZ3M6e2luaXRpYWxpemluZzpbXCJidXN5XCJdLGFuaW1hdGluZzpbXCJidXN5XCJdLGRyYWdnaW5nOltcImludGVyYWN0aW5nXCJdfX0sYS5lYWNoKFtcIm9uUmVzaXplXCIsXCJvblRocm90dGxlZFJlc2l6ZVwiXSxhLnByb3h5KGZ1bmN0aW9uKGIsYyl7dGhpcy5faGFuZGxlcnNbY109YS5wcm94eSh0aGlzW2NdLHRoaXMpfSx0aGlzKSksYS5lYWNoKGUuUGx1Z2lucyxhLnByb3h5KGZ1bmN0aW9uKGEsYil7dGhpcy5fcGx1Z2luc1thLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpK2Euc2xpY2UoMSldPW5ldyBiKHRoaXMpfSx0aGlzKSksYS5lYWNoKGUuV29ya2VycyxhLnByb3h5KGZ1bmN0aW9uKGIsYyl7dGhpcy5fcGlwZS5wdXNoKHtmaWx0ZXI6Yy5maWx0ZXIscnVuOmEucHJveHkoYy5ydW4sdGhpcyl9KX0sdGhpcykpLHRoaXMuc2V0dXAoKSx0aGlzLmluaXRpYWxpemUoKX1lLkRlZmF1bHRzPXtpdGVtczozLGxvb3A6ITEsY2VudGVyOiExLHJld2luZDohMSxtb3VzZURyYWc6ITAsdG91Y2hEcmFnOiEwLHB1bGxEcmFnOiEwLGZyZWVEcmFnOiExLG1hcmdpbjowLHN0YWdlUGFkZGluZzowLG1lcmdlOiExLG1lcmdlRml0OiEwLGF1dG9XaWR0aDohMSxzdGFydFBvc2l0aW9uOjAscnRsOiExLHNtYXJ0U3BlZWQ6MjUwLGZsdWlkU3BlZWQ6ITEsZHJhZ0VuZFNwZWVkOiExLHJlc3BvbnNpdmU6e30scmVzcG9uc2l2ZVJlZnJlc2hSYXRlOjIwMCxyZXNwb25zaXZlQmFzZUVsZW1lbnQ6YixmYWxsYmFja0Vhc2luZzpcInN3aW5nXCIsaW5mbzohMSxuZXN0ZWRJdGVtU2VsZWN0b3I6ITEsaXRlbUVsZW1lbnQ6XCJkaXZcIixzdGFnZUVsZW1lbnQ6XCJkaXZcIixyZWZyZXNoQ2xhc3M6XCJvd2wtcmVmcmVzaFwiLGxvYWRlZENsYXNzOlwib3dsLWxvYWRlZFwiLGxvYWRpbmdDbGFzczpcIm93bC1sb2FkaW5nXCIscnRsQ2xhc3M6XCJvd2wtcnRsXCIscmVzcG9uc2l2ZUNsYXNzOlwib3dsLXJlc3BvbnNpdmVcIixkcmFnQ2xhc3M6XCJvd2wtZHJhZ1wiLGl0ZW1DbGFzczpcIm93bC1pdGVtXCIsc3RhZ2VDbGFzczpcIm93bC1zdGFnZVwiLHN0YWdlT3V0ZXJDbGFzczpcIm93bC1zdGFnZS1vdXRlclwiLGdyYWJDbGFzczpcIm93bC1ncmFiXCJ9LGUuV2lkdGg9e0RlZmF1bHQ6XCJkZWZhdWx0XCIsSW5uZXI6XCJpbm5lclwiLE91dGVyOlwib3V0ZXJcIn0sZS5UeXBlPXtFdmVudDpcImV2ZW50XCIsU3RhdGU6XCJzdGF0ZVwifSxlLlBsdWdpbnM9e30sZS5Xb3JrZXJzPVt7ZmlsdGVyOltcIndpZHRoXCIsXCJzZXR0aW5nc1wiXSxydW46ZnVuY3Rpb24oKXt0aGlzLl93aWR0aD10aGlzLiRlbGVtZW50LndpZHRoKCl9fSx7ZmlsdGVyOltcIndpZHRoXCIsXCJpdGVtc1wiLFwic2V0dGluZ3NcIl0scnVuOmZ1bmN0aW9uKGEpe2EuY3VycmVudD10aGlzLl9pdGVtcyYmdGhpcy5faXRlbXNbdGhpcy5yZWxhdGl2ZSh0aGlzLl9jdXJyZW50KV19fSx7ZmlsdGVyOltcIml0ZW1zXCIsXCJzZXR0aW5nc1wiXSxydW46ZnVuY3Rpb24oKXt0aGlzLiRzdGFnZS5jaGlsZHJlbihcIi5jbG9uZWRcIikucmVtb3ZlKCl9fSx7ZmlsdGVyOltcIndpZHRoXCIsXCJpdGVtc1wiLFwic2V0dGluZ3NcIl0scnVuOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuc2V0dGluZ3MubWFyZ2lufHxcIlwiLGM9IXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLGQ9dGhpcy5zZXR0aW5ncy5ydGwsZT17d2lkdGg6XCJhdXRvXCIsXCJtYXJnaW4tbGVmdFwiOmQ/YjpcIlwiLFwibWFyZ2luLXJpZ2h0XCI6ZD9cIlwiOmJ9OyFjJiZ0aGlzLiRzdGFnZS5jaGlsZHJlbigpLmNzcyhlKSxhLmNzcz1lfX0se2ZpbHRlcjpbXCJ3aWR0aFwiLFwiaXRlbXNcIixcInNldHRpbmdzXCJdLHJ1bjpmdW5jdGlvbihhKXt2YXIgYj0odGhpcy53aWR0aCgpL3RoaXMuc2V0dGluZ3MuaXRlbXMpLnRvRml4ZWQoMyktdGhpcy5zZXR0aW5ncy5tYXJnaW4sYz1udWxsLGQ9dGhpcy5faXRlbXMubGVuZ3RoLGU9IXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLGY9W107Zm9yKGEuaXRlbXM9e21lcmdlOiExLHdpZHRoOmJ9O2QtLTspYz10aGlzLl9tZXJnZXJzW2RdLGM9dGhpcy5zZXR0aW5ncy5tZXJnZUZpdCYmTWF0aC5taW4oYyx0aGlzLnNldHRpbmdzLml0ZW1zKXx8YyxhLml0ZW1zLm1lcmdlPWM+MXx8YS5pdGVtcy5tZXJnZSxmW2RdPWU/YipjOnRoaXMuX2l0ZW1zW2RdLndpZHRoKCk7dGhpcy5fd2lkdGhzPWZ9fSx7ZmlsdGVyOltcIml0ZW1zXCIsXCJzZXR0aW5nc1wiXSxydW46ZnVuY3Rpb24oKXt2YXIgYj1bXSxjPXRoaXMuX2l0ZW1zLGQ9dGhpcy5zZXR0aW5ncyxlPU1hdGgubWF4KDIqZC5pdGVtcyw0KSxmPTIqTWF0aC5jZWlsKGMubGVuZ3RoLzIpLGc9ZC5sb29wJiZjLmxlbmd0aD9kLnJld2luZD9lOk1hdGgubWF4KGUsZik6MCxoPVwiXCIsaT1cIlwiO2ZvcihnLz0yO2ctLTspYi5wdXNoKHRoaXMubm9ybWFsaXplKGIubGVuZ3RoLzIsITApKSxoKz1jW2JbYi5sZW5ndGgtMV1dWzBdLm91dGVySFRNTCxiLnB1c2godGhpcy5ub3JtYWxpemUoYy5sZW5ndGgtMS0oYi5sZW5ndGgtMSkvMiwhMCkpLGk9Y1tiW2IubGVuZ3RoLTFdXVswXS5vdXRlckhUTUwraTt0aGlzLl9jbG9uZXM9YixhKGgpLmFkZENsYXNzKFwiY2xvbmVkXCIpLmFwcGVuZFRvKHRoaXMuJHN0YWdlKSxhKGkpLmFkZENsYXNzKFwiY2xvbmVkXCIpLnByZXBlbmRUbyh0aGlzLiRzdGFnZSl9fSx7ZmlsdGVyOltcIndpZHRoXCIsXCJpdGVtc1wiLFwic2V0dGluZ3NcIl0scnVuOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMuc2V0dGluZ3MucnRsPzE6LTEsYj10aGlzLl9jbG9uZXMubGVuZ3RoK3RoaXMuX2l0ZW1zLmxlbmd0aCxjPS0xLGQ9MCxlPTAsZj1bXTsrK2M8YjspZD1mW2MtMV18fDAsZT10aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShjKV0rdGhpcy5zZXR0aW5ncy5tYXJnaW4sZi5wdXNoKGQrZSphKTt0aGlzLl9jb29yZGluYXRlcz1mfX0se2ZpbHRlcjpbXCJ3aWR0aFwiLFwiaXRlbXNcIixcInNldHRpbmdzXCJdLHJ1bjpmdW5jdGlvbigpe3ZhciBhPXRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nLGI9dGhpcy5fY29vcmRpbmF0ZXMsYz17d2lkdGg6TWF0aC5jZWlsKE1hdGguYWJzKGJbYi5sZW5ndGgtMV0pKSsyKmEsXCJwYWRkaW5nLWxlZnRcIjphfHxcIlwiLFwicGFkZGluZy1yaWdodFwiOmF8fFwiXCJ9O3RoaXMuJHN0YWdlLmNzcyhjKX19LHtmaWx0ZXI6W1wid2lkdGhcIixcIml0ZW1zXCIsXCJzZXR0aW5nc1wiXSxydW46ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoLGM9IXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLGQ9dGhpcy4kc3RhZ2UuY2hpbGRyZW4oKTtpZihjJiZhLml0ZW1zLm1lcmdlKWZvcig7Yi0tOylhLmNzcy53aWR0aD10aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShiKV0sZC5lcShiKS5jc3MoYS5jc3MpO2Vsc2UgYyYmKGEuY3NzLndpZHRoPWEuaXRlbXMud2lkdGgsZC5jc3MoYS5jc3MpKX19LHtmaWx0ZXI6W1wiaXRlbXNcIl0scnVuOmZ1bmN0aW9uKCl7dGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoPDEmJnRoaXMuJHN0YWdlLnJlbW92ZUF0dHIoXCJzdHlsZVwiKX19LHtmaWx0ZXI6W1wid2lkdGhcIixcIml0ZW1zXCIsXCJzZXR0aW5nc1wiXSxydW46ZnVuY3Rpb24oYSl7YS5jdXJyZW50PWEuY3VycmVudD90aGlzLiRzdGFnZS5jaGlsZHJlbigpLmluZGV4KGEuY3VycmVudCk6MCxhLmN1cnJlbnQ9TWF0aC5tYXgodGhpcy5taW5pbXVtKCksTWF0aC5taW4odGhpcy5tYXhpbXVtKCksYS5jdXJyZW50KSksdGhpcy5yZXNldChhLmN1cnJlbnQpfX0se2ZpbHRlcjpbXCJwb3NpdGlvblwiXSxydW46ZnVuY3Rpb24oKXt0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyh0aGlzLl9jdXJyZW50KSl9fSx7ZmlsdGVyOltcIndpZHRoXCIsXCJwb3NpdGlvblwiLFwiaXRlbXNcIixcInNldHRpbmdzXCJdLHJ1bjpmdW5jdGlvbigpe3ZhciBhLGIsYyxkLGU9dGhpcy5zZXR0aW5ncy5ydGw/MTotMSxmPTIqdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcsZz10aGlzLmNvb3JkaW5hdGVzKHRoaXMuY3VycmVudCgpKStmLGg9Zyt0aGlzLndpZHRoKCkqZSxpPVtdO2ZvcihjPTAsZD10aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7YzxkO2MrKylhPXRoaXMuX2Nvb3JkaW5hdGVzW2MtMV18fDAsYj1NYXRoLmFicyh0aGlzLl9jb29yZGluYXRlc1tjXSkrZiplLCh0aGlzLm9wKGEsXCI8PVwiLGcpJiZ0aGlzLm9wKGEsXCI+XCIsaCl8fHRoaXMub3AoYixcIjxcIixnKSYmdGhpcy5vcChiLFwiPlwiLGgpKSYmaS5wdXNoKGMpO3RoaXMuJHN0YWdlLmNoaWxkcmVuKFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSx0aGlzLiRzdGFnZS5jaGlsZHJlbihcIjplcShcIitpLmpvaW4oXCIpLCA6ZXEoXCIpK1wiKVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKSx0aGlzLnNldHRpbmdzLmNlbnRlciYmKHRoaXMuJHN0YWdlLmNoaWxkcmVuKFwiLmNlbnRlclwiKS5yZW1vdmVDbGFzcyhcImNlbnRlclwiKSx0aGlzLiRzdGFnZS5jaGlsZHJlbigpLmVxKHRoaXMuY3VycmVudCgpKS5hZGRDbGFzcyhcImNlbnRlclwiKSl9fV0sZS5wcm90b3R5cGUuaW5pdGlhbGl6ZT1mdW5jdGlvbigpe2lmKHRoaXMuZW50ZXIoXCJpbml0aWFsaXppbmdcIiksdGhpcy50cmlnZ2VyKFwiaW5pdGlhbGl6ZVwiKSx0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKHRoaXMuc2V0dGluZ3MucnRsQ2xhc3MsdGhpcy5zZXR0aW5ncy5ydGwpLHRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoJiYhdGhpcy5pcyhcInByZS1sb2FkaW5nXCIpKXt2YXIgYixjLGU7Yj10aGlzLiRlbGVtZW50LmZpbmQoXCJpbWdcIiksYz10aGlzLnNldHRpbmdzLm5lc3RlZEl0ZW1TZWxlY3Rvcj9cIi5cIit0aGlzLnNldHRpbmdzLm5lc3RlZEl0ZW1TZWxlY3RvcjpkLGU9dGhpcy4kZWxlbWVudC5jaGlsZHJlbihjKS53aWR0aCgpLGIubGVuZ3RoJiZlPD0wJiZ0aGlzLnByZWxvYWRBdXRvV2lkdGhJbWFnZXMoYil9dGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMubG9hZGluZ0NsYXNzKSx0aGlzLiRzdGFnZT1hKFwiPFwiK3RoaXMuc2V0dGluZ3Muc3RhZ2VFbGVtZW50KycgY2xhc3M9XCInK3RoaXMuc2V0dGluZ3Muc3RhZ2VDbGFzcysnXCIvPicpLndyYXAoJzxkaXYgY2xhc3M9XCInK3RoaXMuc2V0dGluZ3Muc3RhZ2VPdXRlckNsYXNzKydcIi8+JyksdGhpcy4kZWxlbWVudC5hcHBlbmQodGhpcy4kc3RhZ2UucGFyZW50KCkpLHRoaXMucmVwbGFjZSh0aGlzLiRlbGVtZW50LmNoaWxkcmVuKCkubm90KHRoaXMuJHN0YWdlLnBhcmVudCgpKSksdGhpcy4kZWxlbWVudC5pcyhcIjp2aXNpYmxlXCIpP3RoaXMucmVmcmVzaCgpOnRoaXMuaW52YWxpZGF0ZShcIndpZHRoXCIpLHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLmxvYWRpbmdDbGFzcykuYWRkQ2xhc3ModGhpcy5vcHRpb25zLmxvYWRlZENsYXNzKSx0aGlzLnJlZ2lzdGVyRXZlbnRIYW5kbGVycygpLHRoaXMubGVhdmUoXCJpbml0aWFsaXppbmdcIiksdGhpcy50cmlnZ2VyKFwiaW5pdGlhbGl6ZWRcIil9LGUucHJvdG90eXBlLnNldHVwPWZ1bmN0aW9uKCl7dmFyIGI9dGhpcy52aWV3cG9ydCgpLGM9dGhpcy5vcHRpb25zLnJlc3BvbnNpdmUsZD0tMSxlPW51bGw7Yz8oYS5lYWNoKGMsZnVuY3Rpb24oYSl7YTw9YiYmYT5kJiYoZD1OdW1iZXIoYSkpfSksZT1hLmV4dGVuZCh7fSx0aGlzLm9wdGlvbnMsY1tkXSksXCJmdW5jdGlvblwiPT10eXBlb2YgZS5zdGFnZVBhZGRpbmcmJihlLnN0YWdlUGFkZGluZz1lLnN0YWdlUGFkZGluZygpKSxkZWxldGUgZS5yZXNwb25zaXZlLGUucmVzcG9uc2l2ZUNsYXNzJiZ0aGlzLiRlbGVtZW50LmF0dHIoXCJjbGFzc1wiLHRoaXMuJGVsZW1lbnQuYXR0cihcImNsYXNzXCIpLnJlcGxhY2UobmV3IFJlZ0V4cChcIihcIit0aGlzLm9wdGlvbnMucmVzcG9uc2l2ZUNsYXNzK1wiLSlcXFxcUytcXFxcc1wiLFwiZ1wiKSxcIiQxXCIrZCkpKTplPWEuZXh0ZW5kKHt9LHRoaXMub3B0aW9ucyksdGhpcy50cmlnZ2VyKFwiY2hhbmdlXCIse3Byb3BlcnR5OntuYW1lOlwic2V0dGluZ3NcIix2YWx1ZTplfX0pLHRoaXMuX2JyZWFrcG9pbnQ9ZCx0aGlzLnNldHRpbmdzPWUsdGhpcy5pbnZhbGlkYXRlKFwic2V0dGluZ3NcIiksdGhpcy50cmlnZ2VyKFwiY2hhbmdlZFwiLHtwcm9wZXJ0eTp7bmFtZTpcInNldHRpbmdzXCIsdmFsdWU6dGhpcy5zZXR0aW5nc319KX0sZS5wcm90b3R5cGUub3B0aW9uc0xvZ2ljPWZ1bmN0aW9uKCl7dGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgmJih0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZz0hMSx0aGlzLnNldHRpbmdzLm1lcmdlPSExKX0sZS5wcm90b3R5cGUucHJlcGFyZT1mdW5jdGlvbihiKXt2YXIgYz10aGlzLnRyaWdnZXIoXCJwcmVwYXJlXCIse2NvbnRlbnQ6Yn0pO3JldHVybiBjLmRhdGF8fChjLmRhdGE9YShcIjxcIit0aGlzLnNldHRpbmdzLml0ZW1FbGVtZW50K1wiLz5cIikuYWRkQ2xhc3ModGhpcy5vcHRpb25zLml0ZW1DbGFzcykuYXBwZW5kKGIpKSx0aGlzLnRyaWdnZXIoXCJwcmVwYXJlZFwiLHtjb250ZW50OmMuZGF0YX0pLGMuZGF0YX0sZS5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKCl7Zm9yKHZhciBiPTAsYz10aGlzLl9waXBlLmxlbmd0aCxkPWEucHJveHkoZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXNbYV19LHRoaXMuX2ludmFsaWRhdGVkKSxlPXt9O2I8YzspKHRoaXMuX2ludmFsaWRhdGVkLmFsbHx8YS5ncmVwKHRoaXMuX3BpcGVbYl0uZmlsdGVyLGQpLmxlbmd0aD4wKSYmdGhpcy5fcGlwZVtiXS5ydW4oZSksYisrO3RoaXMuX2ludmFsaWRhdGVkPXt9LCF0aGlzLmlzKFwidmFsaWRcIikmJnRoaXMuZW50ZXIoXCJ2YWxpZFwiKX0sZS5wcm90b3R5cGUud2lkdGg9ZnVuY3Rpb24oYSl7c3dpdGNoKGE9YXx8ZS5XaWR0aC5EZWZhdWx0KXtjYXNlIGUuV2lkdGguSW5uZXI6Y2FzZSBlLldpZHRoLk91dGVyOnJldHVybiB0aGlzLl93aWR0aDtkZWZhdWx0OnJldHVybiB0aGlzLl93aWR0aC0yKnRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nK3RoaXMuc2V0dGluZ3MubWFyZ2lufX0sZS5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbigpe3RoaXMuZW50ZXIoXCJyZWZyZXNoaW5nXCIpLHRoaXMudHJpZ2dlcihcInJlZnJlc2hcIiksdGhpcy5zZXR1cCgpLHRoaXMub3B0aW9uc0xvZ2ljKCksdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKSx0aGlzLnVwZGF0ZSgpLHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyksdGhpcy5sZWF2ZShcInJlZnJlc2hpbmdcIiksdGhpcy50cmlnZ2VyKFwicmVmcmVzaGVkXCIpfSxlLnByb3RvdHlwZS5vblRocm90dGxlZFJlc2l6ZT1mdW5jdGlvbigpe2IuY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpLHRoaXMucmVzaXplVGltZXI9Yi5zZXRUaW1lb3V0KHRoaXMuX2hhbmRsZXJzLm9uUmVzaXplLHRoaXMuc2V0dGluZ3MucmVzcG9uc2l2ZVJlZnJlc2hSYXRlKX0sZS5wcm90b3R5cGUub25SZXNpemU9ZnVuY3Rpb24oKXtyZXR1cm4hIXRoaXMuX2l0ZW1zLmxlbmd0aCYmKHRoaXMuX3dpZHRoIT09dGhpcy4kZWxlbWVudC53aWR0aCgpJiYoISF0aGlzLiRlbGVtZW50LmlzKFwiOnZpc2libGVcIikmJih0aGlzLmVudGVyKFwicmVzaXppbmdcIiksdGhpcy50cmlnZ2VyKFwicmVzaXplXCIpLmlzRGVmYXVsdFByZXZlbnRlZCgpPyh0aGlzLmxlYXZlKFwicmVzaXppbmdcIiksITEpOih0aGlzLmludmFsaWRhdGUoXCJ3aWR0aFwiKSx0aGlzLnJlZnJlc2goKSx0aGlzLmxlYXZlKFwicmVzaXppbmdcIiksdm9pZCB0aGlzLnRyaWdnZXIoXCJyZXNpemVkXCIpKSkpKX0sZS5wcm90b3R5cGUucmVnaXN0ZXJFdmVudEhhbmRsZXJzPWZ1bmN0aW9uKCl7YS5zdXBwb3J0LnRyYW5zaXRpb24mJnRoaXMuJHN0YWdlLm9uKGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCtcIi5vd2wuY29yZVwiLGEucHJveHkodGhpcy5vblRyYW5zaXRpb25FbmQsdGhpcykpLHRoaXMuc2V0dGluZ3MucmVzcG9uc2l2ZSE9PSExJiZ0aGlzLm9uKGIsXCJyZXNpemVcIix0aGlzLl9oYW5kbGVycy5vblRocm90dGxlZFJlc2l6ZSksdGhpcy5zZXR0aW5ncy5tb3VzZURyYWcmJih0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMub3B0aW9ucy5kcmFnQ2xhc3MpLHRoaXMuJHN0YWdlLm9uKFwibW91c2Vkb3duLm93bC5jb3JlXCIsYS5wcm94eSh0aGlzLm9uRHJhZ1N0YXJ0LHRoaXMpKSx0aGlzLiRzdGFnZS5vbihcImRyYWdzdGFydC5vd2wuY29yZSBzZWxlY3RzdGFydC5vd2wuY29yZVwiLGZ1bmN0aW9uKCl7cmV0dXJuITF9KSksdGhpcy5zZXR0aW5ncy50b3VjaERyYWcmJih0aGlzLiRzdGFnZS5vbihcInRvdWNoc3RhcnQub3dsLmNvcmVcIixhLnByb3h5KHRoaXMub25EcmFnU3RhcnQsdGhpcykpLHRoaXMuJHN0YWdlLm9uKFwidG91Y2hjYW5jZWwub3dsLmNvcmVcIixhLnByb3h5KHRoaXMub25EcmFnRW5kLHRoaXMpKSl9LGUucHJvdG90eXBlLm9uRHJhZ1N0YXJ0PWZ1bmN0aW9uKGIpe3ZhciBkPW51bGw7MyE9PWIud2hpY2gmJihhLnN1cHBvcnQudHJhbnNmb3JtPyhkPXRoaXMuJHN0YWdlLmNzcyhcInRyYW5zZm9ybVwiKS5yZXBsYWNlKC8uKlxcKHxcXCl8IC9nLFwiXCIpLnNwbGl0KFwiLFwiKSxkPXt4OmRbMTY9PT1kLmxlbmd0aD8xMjo0XSx5OmRbMTY9PT1kLmxlbmd0aD8xMzo1XX0pOihkPXRoaXMuJHN0YWdlLnBvc2l0aW9uKCksZD17eDp0aGlzLnNldHRpbmdzLnJ0bD9kLmxlZnQrdGhpcy4kc3RhZ2Uud2lkdGgoKS10aGlzLndpZHRoKCkrdGhpcy5zZXR0aW5ncy5tYXJnaW46ZC5sZWZ0LHk6ZC50b3B9KSx0aGlzLmlzKFwiYW5pbWF0aW5nXCIpJiYoYS5zdXBwb3J0LnRyYW5zZm9ybT90aGlzLmFuaW1hdGUoZC54KTp0aGlzLiRzdGFnZS5zdG9wKCksdGhpcy5pbnZhbGlkYXRlKFwicG9zaXRpb25cIikpLHRoaXMuJGVsZW1lbnQudG9nZ2xlQ2xhc3ModGhpcy5vcHRpb25zLmdyYWJDbGFzcyxcIm1vdXNlZG93blwiPT09Yi50eXBlKSx0aGlzLnNwZWVkKDApLHRoaXMuX2RyYWcudGltZT0obmV3IERhdGUpLmdldFRpbWUoKSx0aGlzLl9kcmFnLnRhcmdldD1hKGIudGFyZ2V0KSx0aGlzLl9kcmFnLnN0YWdlLnN0YXJ0PWQsdGhpcy5fZHJhZy5zdGFnZS5jdXJyZW50PWQsdGhpcy5fZHJhZy5wb2ludGVyPXRoaXMucG9pbnRlcihiKSxhKGMpLm9uKFwibW91c2V1cC5vd2wuY29yZSB0b3VjaGVuZC5vd2wuY29yZVwiLGEucHJveHkodGhpcy5vbkRyYWdFbmQsdGhpcykpLGEoYykub25lKFwibW91c2Vtb3ZlLm93bC5jb3JlIHRvdWNobW92ZS5vd2wuY29yZVwiLGEucHJveHkoZnVuY3Rpb24oYil7dmFyIGQ9dGhpcy5kaWZmZXJlbmNlKHRoaXMuX2RyYWcucG9pbnRlcix0aGlzLnBvaW50ZXIoYikpO2EoYykub24oXCJtb3VzZW1vdmUub3dsLmNvcmUgdG91Y2htb3ZlLm93bC5jb3JlXCIsYS5wcm94eSh0aGlzLm9uRHJhZ01vdmUsdGhpcykpLE1hdGguYWJzKGQueCk8TWF0aC5hYnMoZC55KSYmdGhpcy5pcyhcInZhbGlkXCIpfHwoYi5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuZW50ZXIoXCJkcmFnZ2luZ1wiKSx0aGlzLnRyaWdnZXIoXCJkcmFnXCIpKX0sdGhpcykpKX0sZS5wcm90b3R5cGUub25EcmFnTW92ZT1mdW5jdGlvbihhKXt2YXIgYj1udWxsLGM9bnVsbCxkPW51bGwsZT10aGlzLmRpZmZlcmVuY2UodGhpcy5fZHJhZy5wb2ludGVyLHRoaXMucG9pbnRlcihhKSksZj10aGlzLmRpZmZlcmVuY2UodGhpcy5fZHJhZy5zdGFnZS5zdGFydCxlKTt0aGlzLmlzKFwiZHJhZ2dpbmdcIikmJihhLnByZXZlbnREZWZhdWx0KCksdGhpcy5zZXR0aW5ncy5sb29wPyhiPXRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpLGM9dGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSsxKS1iLGYueD0oKGYueC1iKSVjK2MpJWMrYik6KGI9dGhpcy5zZXR0aW5ncy5ydGw/dGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSk6dGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSksYz10aGlzLnNldHRpbmdzLnJ0bD90aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTp0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKSxkPXRoaXMuc2V0dGluZ3MucHVsbERyYWc/LTEqZS54LzU6MCxmLng9TWF0aC5tYXgoTWF0aC5taW4oZi54LGIrZCksYytkKSksdGhpcy5fZHJhZy5zdGFnZS5jdXJyZW50PWYsdGhpcy5hbmltYXRlKGYueCkpfSxlLnByb3RvdHlwZS5vbkRyYWdFbmQ9ZnVuY3Rpb24oYil7dmFyIGQ9dGhpcy5kaWZmZXJlbmNlKHRoaXMuX2RyYWcucG9pbnRlcix0aGlzLnBvaW50ZXIoYikpLGU9dGhpcy5fZHJhZy5zdGFnZS5jdXJyZW50LGY9ZC54PjBedGhpcy5zZXR0aW5ncy5ydGw/XCJsZWZ0XCI6XCJyaWdodFwiO2EoYykub2ZmKFwiLm93bC5jb3JlXCIpLHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLmdyYWJDbGFzcyksKDAhPT1kLngmJnRoaXMuaXMoXCJkcmFnZ2luZ1wiKXx8IXRoaXMuaXMoXCJ2YWxpZFwiKSkmJih0aGlzLnNwZWVkKHRoaXMuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkfHx0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpLHRoaXMuY3VycmVudCh0aGlzLmNsb3Nlc3QoZS54LDAhPT1kLng/Zjp0aGlzLl9kcmFnLmRpcmVjdGlvbikpLHRoaXMuaW52YWxpZGF0ZShcInBvc2l0aW9uXCIpLHRoaXMudXBkYXRlKCksdGhpcy5fZHJhZy5kaXJlY3Rpb249ZiwoTWF0aC5hYnMoZC54KT4zfHwobmV3IERhdGUpLmdldFRpbWUoKS10aGlzLl9kcmFnLnRpbWU+MzAwKSYmdGhpcy5fZHJhZy50YXJnZXQub25lKFwiY2xpY2sub3dsLmNvcmVcIixmdW5jdGlvbigpe3JldHVybiExfSkpLHRoaXMuaXMoXCJkcmFnZ2luZ1wiKSYmKHRoaXMubGVhdmUoXCJkcmFnZ2luZ1wiKSx0aGlzLnRyaWdnZXIoXCJkcmFnZ2VkXCIpKX0sZS5wcm90b3R5cGUuY2xvc2VzdD1mdW5jdGlvbihiLGMpe3ZhciBkPS0xLGU9MzAsZj10aGlzLndpZHRoKCksZz10aGlzLmNvb3JkaW5hdGVzKCk7cmV0dXJuIHRoaXMuc2V0dGluZ3MuZnJlZURyYWd8fGEuZWFjaChnLGEucHJveHkoZnVuY3Rpb24oYSxoKXtyZXR1cm5cImxlZnRcIj09PWMmJmI+aC1lJiZiPGgrZT9kPWE6XCJyaWdodFwiPT09YyYmYj5oLWYtZSYmYjxoLWYrZT9kPWErMTp0aGlzLm9wKGIsXCI8XCIsaCkmJnRoaXMub3AoYixcIj5cIixnW2ErMV18fGgtZikmJihkPVwibGVmdFwiPT09Yz9hKzE6YSksZD09PS0xfSx0aGlzKSksdGhpcy5zZXR0aW5ncy5sb29wfHwodGhpcy5vcChiLFwiPlwiLGdbdGhpcy5taW5pbXVtKCldKT9kPWI9dGhpcy5taW5pbXVtKCk6dGhpcy5vcChiLFwiPFwiLGdbdGhpcy5tYXhpbXVtKCldKSYmKGQ9Yj10aGlzLm1heGltdW0oKSkpLGR9LGUucHJvdG90eXBlLmFuaW1hdGU9ZnVuY3Rpb24oYil7dmFyIGM9dGhpcy5zcGVlZCgpPjA7dGhpcy5pcyhcImFuaW1hdGluZ1wiKSYmdGhpcy5vblRyYW5zaXRpb25FbmQoKSxjJiYodGhpcy5lbnRlcihcImFuaW1hdGluZ1wiKSx0aGlzLnRyaWdnZXIoXCJ0cmFuc2xhdGVcIikpLGEuc3VwcG9ydC50cmFuc2Zvcm0zZCYmYS5zdXBwb3J0LnRyYW5zaXRpb24/dGhpcy4kc3RhZ2UuY3NzKHt0cmFuc2Zvcm06XCJ0cmFuc2xhdGUzZChcIitiK1wicHgsMHB4LDBweClcIix0cmFuc2l0aW9uOnRoaXMuc3BlZWQoKS8xZTMrXCJzXCJ9KTpjP3RoaXMuJHN0YWdlLmFuaW1hdGUoe2xlZnQ6YitcInB4XCJ9LHRoaXMuc3BlZWQoKSx0aGlzLnNldHRpbmdzLmZhbGxiYWNrRWFzaW5nLGEucHJveHkodGhpcy5vblRyYW5zaXRpb25FbmQsdGhpcykpOnRoaXMuJHN0YWdlLmNzcyh7bGVmdDpiK1wicHhcIn0pfSxlLnByb3RvdHlwZS5pcz1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5fc3RhdGVzLmN1cnJlbnRbYV0mJnRoaXMuX3N0YXRlcy5jdXJyZW50W2FdPjB9LGUucHJvdG90eXBlLmN1cnJlbnQ9ZnVuY3Rpb24oYSl7aWYoYT09PWQpcmV0dXJuIHRoaXMuX2N1cnJlbnQ7aWYoMD09PXRoaXMuX2l0ZW1zLmxlbmd0aClyZXR1cm4gZDtpZihhPXRoaXMubm9ybWFsaXplKGEpLHRoaXMuX2N1cnJlbnQhPT1hKXt2YXIgYj10aGlzLnRyaWdnZXIoXCJjaGFuZ2VcIix7cHJvcGVydHk6e25hbWU6XCJwb3NpdGlvblwiLHZhbHVlOmF9fSk7Yi5kYXRhIT09ZCYmKGE9dGhpcy5ub3JtYWxpemUoYi5kYXRhKSksdGhpcy5fY3VycmVudD1hLHRoaXMuaW52YWxpZGF0ZShcInBvc2l0aW9uXCIpLHRoaXMudHJpZ2dlcihcImNoYW5nZWRcIix7cHJvcGVydHk6e25hbWU6XCJwb3NpdGlvblwiLHZhbHVlOnRoaXMuX2N1cnJlbnR9fSl9cmV0dXJuIHRoaXMuX2N1cnJlbnR9LGUucHJvdG90eXBlLmludmFsaWRhdGU9ZnVuY3Rpb24oYil7cmV0dXJuXCJzdHJpbmdcIj09PWEudHlwZShiKSYmKHRoaXMuX2ludmFsaWRhdGVkW2JdPSEwLHRoaXMuaXMoXCJ2YWxpZFwiKSYmdGhpcy5sZWF2ZShcInZhbGlkXCIpKSxhLm1hcCh0aGlzLl9pbnZhbGlkYXRlZCxmdW5jdGlvbihhLGIpe3JldHVybiBifSl9LGUucHJvdG90eXBlLnJlc2V0PWZ1bmN0aW9uKGEpe2E9dGhpcy5ub3JtYWxpemUoYSksYSE9PWQmJih0aGlzLl9zcGVlZD0wLHRoaXMuX2N1cnJlbnQ9YSx0aGlzLnN1cHByZXNzKFtcInRyYW5zbGF0ZVwiLFwidHJhbnNsYXRlZFwiXSksdGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXMoYSkpLHRoaXMucmVsZWFzZShbXCJ0cmFuc2xhdGVcIixcInRyYW5zbGF0ZWRcIl0pKX0sZS5wcm90b3R5cGUubm9ybWFsaXplPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5faXRlbXMubGVuZ3RoLGU9Yj8wOnRoaXMuX2Nsb25lcy5sZW5ndGg7cmV0dXJuIXRoaXMuaXNOdW1lcmljKGEpfHxjPDE/YT1kOihhPDB8fGE+PWMrZSkmJihhPSgoYS1lLzIpJWMrYyklYytlLzIpLGF9LGUucHJvdG90eXBlLnJlbGF0aXZlPWZ1bmN0aW9uKGEpe3JldHVybiBhLT10aGlzLl9jbG9uZXMubGVuZ3RoLzIsdGhpcy5ub3JtYWxpemUoYSwhMCl9LGUucHJvdG90eXBlLm1heGltdW09ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGU9dGhpcy5zZXR0aW5ncyxmPXRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aDtpZihlLmxvb3ApZj10aGlzLl9jbG9uZXMubGVuZ3RoLzIrdGhpcy5faXRlbXMubGVuZ3RoLTE7ZWxzZSBpZihlLmF1dG9XaWR0aHx8ZS5tZXJnZSl7Zm9yKGI9dGhpcy5faXRlbXMubGVuZ3RoLGM9dGhpcy5faXRlbXNbLS1iXS53aWR0aCgpLGQ9dGhpcy4kZWxlbWVudC53aWR0aCgpO2ItLSYmKGMrPXRoaXMuX2l0ZW1zW2JdLndpZHRoKCkrdGhpcy5zZXR0aW5ncy5tYXJnaW4sIShjPmQpKTspO2Y9YisxfWVsc2UgZj1lLmNlbnRlcj90aGlzLl9pdGVtcy5sZW5ndGgtMTp0aGlzLl9pdGVtcy5sZW5ndGgtZS5pdGVtcztyZXR1cm4gYSYmKGYtPXRoaXMuX2Nsb25lcy5sZW5ndGgvMiksTWF0aC5tYXgoZiwwKX0sZS5wcm90b3R5cGUubWluaW11bT1mdW5jdGlvbihhKXtyZXR1cm4gYT8wOnRoaXMuX2Nsb25lcy5sZW5ndGgvMn0sZS5wcm90b3R5cGUuaXRlbXM9ZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1kP3RoaXMuX2l0ZW1zLnNsaWNlKCk6KGE9dGhpcy5ub3JtYWxpemUoYSwhMCksdGhpcy5faXRlbXNbYV0pfSxlLnByb3RvdHlwZS5tZXJnZXJzPWZ1bmN0aW9uKGEpe3JldHVybiBhPT09ZD90aGlzLl9tZXJnZXJzLnNsaWNlKCk6KGE9dGhpcy5ub3JtYWxpemUoYSwhMCksdGhpcy5fbWVyZ2Vyc1thXSl9LGUucHJvdG90eXBlLmNsb25lcz1mdW5jdGlvbihiKXt2YXIgYz10aGlzLl9jbG9uZXMubGVuZ3RoLzIsZT1jK3RoaXMuX2l0ZW1zLmxlbmd0aCxmPWZ1bmN0aW9uKGEpe3JldHVybiBhJTI9PT0wP2UrYS8yOmMtKGErMSkvMn07cmV0dXJuIGI9PT1kP2EubWFwKHRoaXMuX2Nsb25lcyxmdW5jdGlvbihhLGIpe3JldHVybiBmKGIpfSk6YS5tYXAodGhpcy5fY2xvbmVzLGZ1bmN0aW9uKGEsYyl7cmV0dXJuIGE9PT1iP2YoYyk6bnVsbH0pfSxlLnByb3RvdHlwZS5zcGVlZD1mdW5jdGlvbihhKXtyZXR1cm4gYSE9PWQmJih0aGlzLl9zcGVlZD1hKSx0aGlzLl9zcGVlZH0sZS5wcm90b3R5cGUuY29vcmRpbmF0ZXM9ZnVuY3Rpb24oYil7dmFyIGMsZT0xLGY9Yi0xO3JldHVybiBiPT09ZD9hLm1hcCh0aGlzLl9jb29yZGluYXRlcyxhLnByb3h5KGZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMuY29vcmRpbmF0ZXMoYil9LHRoaXMpKToodGhpcy5zZXR0aW5ncy5jZW50ZXI/KHRoaXMuc2V0dGluZ3MucnRsJiYoZT0tMSxmPWIrMSksYz10aGlzLl9jb29yZGluYXRlc1tiXSxjKz0odGhpcy53aWR0aCgpLWMrKHRoaXMuX2Nvb3JkaW5hdGVzW2ZdfHwwKSkvMiplKTpjPXRoaXMuX2Nvb3JkaW5hdGVzW2ZdfHwwLGM9TWF0aC5jZWlsKGMpKX0sZS5wcm90b3R5cGUuZHVyYXRpb249ZnVuY3Rpb24oYSxiLGMpe3JldHVybiAwPT09Yz8wOk1hdGgubWluKE1hdGgubWF4KE1hdGguYWJzKGItYSksMSksNikqTWF0aC5hYnMoY3x8dGhpcy5zZXR0aW5ncy5zbWFydFNwZWVkKX0sZS5wcm90b3R5cGUudG89ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmN1cnJlbnQoKSxkPW51bGwsZT1hLXRoaXMucmVsYXRpdmUoYyksZj0oZT4wKS0oZTwwKSxnPXRoaXMuX2l0ZW1zLmxlbmd0aCxoPXRoaXMubWluaW11bSgpLGk9dGhpcy5tYXhpbXVtKCk7dGhpcy5zZXR0aW5ncy5sb29wPyghdGhpcy5zZXR0aW5ncy5yZXdpbmQmJk1hdGguYWJzKGUpPmcvMiYmKGUrPWYqLTEqZyksYT1jK2UsZD0oKGEtaCklZytnKSVnK2gsZCE9PWEmJmQtZTw9aSYmZC1lPjAmJihjPWQtZSxhPWQsdGhpcy5yZXNldChjKSkpOnRoaXMuc2V0dGluZ3MucmV3aW5kPyhpKz0xLGE9KGElaStpKSVpKTphPU1hdGgubWF4KGgsTWF0aC5taW4oaSxhKSksdGhpcy5zcGVlZCh0aGlzLmR1cmF0aW9uKGMsYSxiKSksdGhpcy5jdXJyZW50KGEpLHRoaXMuJGVsZW1lbnQuaXMoXCI6dmlzaWJsZVwiKSYmdGhpcy51cGRhdGUoKX0sZS5wcm90b3R5cGUubmV4dD1mdW5jdGlvbihhKXthPWF8fCExLHRoaXMudG8odGhpcy5yZWxhdGl2ZSh0aGlzLmN1cnJlbnQoKSkrMSxhKX0sZS5wcm90b3R5cGUucHJldj1mdW5jdGlvbihhKXthPWF8fCExLHRoaXMudG8odGhpcy5yZWxhdGl2ZSh0aGlzLmN1cnJlbnQoKSktMSxhKX0sZS5wcm90b3R5cGUub25UcmFuc2l0aW9uRW5kPWZ1bmN0aW9uKGEpe2lmKGEhPT1kJiYoYS5zdG9wUHJvcGFnYXRpb24oKSwoYS50YXJnZXR8fGEuc3JjRWxlbWVudHx8YS5vcmlnaW5hbFRhcmdldCkhPT10aGlzLiRzdGFnZS5nZXQoMCkpKXJldHVybiExO3RoaXMubGVhdmUoXCJhbmltYXRpbmdcIiksdGhpcy50cmlnZ2VyKFwidHJhbnNsYXRlZFwiKX0sZS5wcm90b3R5cGUudmlld3BvcnQ9ZnVuY3Rpb24oKXt2YXIgZDtyZXR1cm4gdGhpcy5vcHRpb25zLnJlc3BvbnNpdmVCYXNlRWxlbWVudCE9PWI/ZD1hKHRoaXMub3B0aW9ucy5yZXNwb25zaXZlQmFzZUVsZW1lbnQpLndpZHRoKCk6Yi5pbm5lcldpZHRoP2Q9Yi5pbm5lcldpZHRoOmMuZG9jdW1lbnRFbGVtZW50JiZjLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aD9kPWMuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoOmNvbnNvbGUud2FybihcIkNhbiBub3QgZGV0ZWN0IHZpZXdwb3J0IHdpZHRoLlwiKSxkfSxlLnByb3RvdHlwZS5yZXBsYWNlPWZ1bmN0aW9uKGIpe3RoaXMuJHN0YWdlLmVtcHR5KCksdGhpcy5faXRlbXM9W10sYiYmKGI9YiBpbnN0YW5jZW9mIGpRdWVyeT9iOmEoYikpLHRoaXMuc2V0dGluZ3MubmVzdGVkSXRlbVNlbGVjdG9yJiYoYj1iLmZpbmQoXCIuXCIrdGhpcy5zZXR0aW5ncy5uZXN0ZWRJdGVtU2VsZWN0b3IpKSxiLmZpbHRlcihmdW5jdGlvbigpe3JldHVybiAxPT09dGhpcy5ub2RlVHlwZX0pLmVhY2goYS5wcm94eShmdW5jdGlvbihhLGIpe2I9dGhpcy5wcmVwYXJlKGIpLHRoaXMuJHN0YWdlLmFwcGVuZChiKSx0aGlzLl9pdGVtcy5wdXNoKGIpLHRoaXMuX21lcmdlcnMucHVzaCgxKmIuZmluZChcIltkYXRhLW1lcmdlXVwiKS5hZGRCYWNrKFwiW2RhdGEtbWVyZ2VdXCIpLmF0dHIoXCJkYXRhLW1lcmdlXCIpfHwxKX0sdGhpcykpLHRoaXMucmVzZXQodGhpcy5pc051bWVyaWModGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uKT90aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb246MCksdGhpcy5pbnZhbGlkYXRlKFwiaXRlbXNcIil9LGUucHJvdG90eXBlLmFkZD1mdW5jdGlvbihiLGMpe3ZhciBlPXRoaXMucmVsYXRpdmUodGhpcy5fY3VycmVudCk7Yz1jPT09ZD90aGlzLl9pdGVtcy5sZW5ndGg6dGhpcy5ub3JtYWxpemUoYywhMCksYj1iIGluc3RhbmNlb2YgalF1ZXJ5P2I6YShiKSx0aGlzLnRyaWdnZXIoXCJhZGRcIix7Y29udGVudDpiLHBvc2l0aW9uOmN9KSxiPXRoaXMucHJlcGFyZShiKSwwPT09dGhpcy5faXRlbXMubGVuZ3RofHxjPT09dGhpcy5faXRlbXMubGVuZ3RoPygwPT09dGhpcy5faXRlbXMubGVuZ3RoJiZ0aGlzLiRzdGFnZS5hcHBlbmQoYiksMCE9PXRoaXMuX2l0ZW1zLmxlbmd0aCYmdGhpcy5faXRlbXNbYy0xXS5hZnRlcihiKSx0aGlzLl9pdGVtcy5wdXNoKGIpLHRoaXMuX21lcmdlcnMucHVzaCgxKmIuZmluZChcIltkYXRhLW1lcmdlXVwiKS5hZGRCYWNrKFwiW2RhdGEtbWVyZ2VdXCIpLmF0dHIoXCJkYXRhLW1lcmdlXCIpfHwxKSk6KHRoaXMuX2l0ZW1zW2NdLmJlZm9yZShiKSx0aGlzLl9pdGVtcy5zcGxpY2UoYywwLGIpLHRoaXMuX21lcmdlcnMuc3BsaWNlKGMsMCwxKmIuZmluZChcIltkYXRhLW1lcmdlXVwiKS5hZGRCYWNrKFwiW2RhdGEtbWVyZ2VdXCIpLmF0dHIoXCJkYXRhLW1lcmdlXCIpfHwxKSksdGhpcy5faXRlbXNbZV0mJnRoaXMucmVzZXQodGhpcy5faXRlbXNbZV0uaW5kZXgoKSksdGhpcy5pbnZhbGlkYXRlKFwiaXRlbXNcIiksdGhpcy50cmlnZ2VyKFwiYWRkZWRcIix7Y29udGVudDpiLHBvc2l0aW9uOmN9KX0sZS5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKGEpe2E9dGhpcy5ub3JtYWxpemUoYSwhMCksYSE9PWQmJih0aGlzLnRyaWdnZXIoXCJyZW1vdmVcIix7Y29udGVudDp0aGlzLl9pdGVtc1thXSxwb3NpdGlvbjphfSksdGhpcy5faXRlbXNbYV0ucmVtb3ZlKCksdGhpcy5faXRlbXMuc3BsaWNlKGEsMSksdGhpcy5fbWVyZ2Vycy5zcGxpY2UoYSwxKSx0aGlzLmludmFsaWRhdGUoXCJpdGVtc1wiKSx0aGlzLnRyaWdnZXIoXCJyZW1vdmVkXCIse2NvbnRlbnQ6bnVsbCxwb3NpdGlvbjphfSkpfSxlLnByb3RvdHlwZS5wcmVsb2FkQXV0b1dpZHRoSW1hZ2VzPWZ1bmN0aW9uKGIpe2IuZWFjaChhLnByb3h5KGZ1bmN0aW9uKGIsYyl7dGhpcy5lbnRlcihcInByZS1sb2FkaW5nXCIpLGM9YShjKSxhKG5ldyBJbWFnZSkub25lKFwibG9hZFwiLGEucHJveHkoZnVuY3Rpb24oYSl7Yy5hdHRyKFwic3JjXCIsYS50YXJnZXQuc3JjKSxjLmNzcyhcIm9wYWNpdHlcIiwxKSx0aGlzLmxlYXZlKFwicHJlLWxvYWRpbmdcIiksIXRoaXMuaXMoXCJwcmUtbG9hZGluZ1wiKSYmIXRoaXMuaXMoXCJpbml0aWFsaXppbmdcIikmJnRoaXMucmVmcmVzaCgpfSx0aGlzKSkuYXR0cihcInNyY1wiLGMuYXR0cihcInNyY1wiKXx8Yy5hdHRyKFwiZGF0YS1zcmNcIil8fGMuYXR0cihcImRhdGEtc3JjLXJldGluYVwiKSl9LHRoaXMpKX0sZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuJGVsZW1lbnQub2ZmKFwiLm93bC5jb3JlXCIpLHRoaXMuJHN0YWdlLm9mZihcIi5vd2wuY29yZVwiKSxhKGMpLm9mZihcIi5vd2wuY29yZVwiKSx0aGlzLnNldHRpbmdzLnJlc3BvbnNpdmUhPT0hMSYmKGIuY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpLHRoaXMub2ZmKGIsXCJyZXNpemVcIix0aGlzLl9oYW5kbGVycy5vblRocm90dGxlZFJlc2l6ZSkpO2Zvcih2YXIgZCBpbiB0aGlzLl9wbHVnaW5zKXRoaXMuX3BsdWdpbnNbZF0uZGVzdHJveSgpO3RoaXMuJHN0YWdlLmNoaWxkcmVuKFwiLmNsb25lZFwiKS5yZW1vdmUoKSx0aGlzLiRzdGFnZS51bndyYXAoKSx0aGlzLiRzdGFnZS5jaGlsZHJlbigpLmNvbnRlbnRzKCkudW53cmFwKCksdGhpcy4kc3RhZ2UuY2hpbGRyZW4oKS51bndyYXAoKSx0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpLnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5sb2FkaW5nQ2xhc3MpLnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5sb2FkZWRDbGFzcykucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLnJ0bENsYXNzKS5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuZHJhZ0NsYXNzKS5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuZ3JhYkNsYXNzKS5hdHRyKFwiY2xhc3NcIix0aGlzLiRlbGVtZW50LmF0dHIoXCJjbGFzc1wiKS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnJlc3BvbnNpdmVDbGFzcytcIi1cXFxcUytcXFxcc1wiLFwiZ1wiKSxcIlwiKSkucmVtb3ZlRGF0YShcIm93bC5jYXJvdXNlbFwiKX0sZS5wcm90b3R5cGUub3A9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMuc2V0dGluZ3MucnRsO3N3aXRjaChiKXtjYXNlXCI8XCI6cmV0dXJuIGQ/YT5jOmE8YztjYXNlXCI+XCI6cmV0dXJuIGQ/YTxjOmE+YztjYXNlXCI+PVwiOnJldHVybiBkP2E8PWM6YT49YztjYXNlXCI8PVwiOnJldHVybiBkP2E+PWM6YTw9Y319LGUucHJvdG90eXBlLm9uPWZ1bmN0aW9uKGEsYixjLGQpe2EuYWRkRXZlbnRMaXN0ZW5lcj9hLmFkZEV2ZW50TGlzdGVuZXIoYixjLGQpOmEuYXR0YWNoRXZlbnQmJmEuYXR0YWNoRXZlbnQoXCJvblwiK2IsYyl9LGUucHJvdG90eXBlLm9mZj1mdW5jdGlvbihhLGIsYyxkKXthLnJlbW92ZUV2ZW50TGlzdGVuZXI/YS5yZW1vdmVFdmVudExpc3RlbmVyKGIsYyxkKTphLmRldGFjaEV2ZW50JiZhLmRldGFjaEV2ZW50KFwib25cIitiLGMpfSxlLnByb3RvdHlwZS50cmlnZ2VyPWZ1bmN0aW9uKGIsYyxkLGYsZyl7dmFyIGg9e2l0ZW06e2NvdW50OnRoaXMuX2l0ZW1zLmxlbmd0aCxpbmRleDp0aGlzLmN1cnJlbnQoKX19LGk9YS5jYW1lbENhc2UoYS5ncmVwKFtcIm9uXCIsYixkXSxmdW5jdGlvbihhKXtyZXR1cm4gYX0pLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCkpLGo9YS5FdmVudChbYixcIm93bFwiLGR8fFwiY2Fyb3VzZWxcIl0uam9pbihcIi5cIikudG9Mb3dlckNhc2UoKSxhLmV4dGVuZCh7cmVsYXRlZFRhcmdldDp0aGlzfSxoLGMpKTtyZXR1cm4gdGhpcy5fc3VwcmVzc1tiXXx8KGEuZWFjaCh0aGlzLl9wbHVnaW5zLGZ1bmN0aW9uKGEsYil7Yi5vblRyaWdnZXImJmIub25UcmlnZ2VyKGopfSksdGhpcy5yZWdpc3Rlcih7dHlwZTplLlR5cGUuRXZlbnQsbmFtZTpifSksdGhpcy4kZWxlbWVudC50cmlnZ2VyKGopLHRoaXMuc2V0dGluZ3MmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMuc2V0dGluZ3NbaV0mJnRoaXMuc2V0dGluZ3NbaV0uY2FsbCh0aGlzLGopKSxqfSxlLnByb3RvdHlwZS5lbnRlcj1mdW5jdGlvbihiKXthLmVhY2goW2JdLmNvbmNhdCh0aGlzLl9zdGF0ZXMudGFnc1tiXXx8W10pLGEucHJveHkoZnVuY3Rpb24oYSxiKXt0aGlzLl9zdGF0ZXMuY3VycmVudFtiXT09PWQmJih0aGlzLl9zdGF0ZXMuY3VycmVudFtiXT0wKSx0aGlzLl9zdGF0ZXMuY3VycmVudFtiXSsrfSx0aGlzKSl9LGUucHJvdG90eXBlLmxlYXZlPWZ1bmN0aW9uKGIpe2EuZWFjaChbYl0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW2JdfHxbXSksYS5wcm94eShmdW5jdGlvbihhLGIpe3RoaXMuX3N0YXRlcy5jdXJyZW50W2JdLS19LHRoaXMpKX0sZS5wcm90b3R5cGUucmVnaXN0ZXI9ZnVuY3Rpb24oYil7aWYoYi50eXBlPT09ZS5UeXBlLkV2ZW50KXtpZihhLmV2ZW50LnNwZWNpYWxbYi5uYW1lXXx8KGEuZXZlbnQuc3BlY2lhbFtiLm5hbWVdPXt9KSwhYS5ldmVudC5zcGVjaWFsW2IubmFtZV0ub3dsKXt2YXIgYz1hLmV2ZW50LnNwZWNpYWxbYi5uYW1lXS5fZGVmYXVsdDthLmV2ZW50LnNwZWNpYWxbYi5uYW1lXS5fZGVmYXVsdD1mdW5jdGlvbihhKXtyZXR1cm4hY3x8IWMuYXBwbHl8fGEubmFtZXNwYWNlJiZhLm5hbWVzcGFjZS5pbmRleE9mKFwib3dsXCIpIT09LTE/YS5uYW1lc3BhY2UmJmEubmFtZXNwYWNlLmluZGV4T2YoXCJvd2xcIik+LTE6Yy5hcHBseSh0aGlzLGFyZ3VtZW50cyl9LGEuZXZlbnQuc3BlY2lhbFtiLm5hbWVdLm93bD0hMH19ZWxzZSBiLnR5cGU9PT1lLlR5cGUuU3RhdGUmJih0aGlzLl9zdGF0ZXMudGFnc1tiLm5hbWVdP3RoaXMuX3N0YXRlcy50YWdzW2IubmFtZV09dGhpcy5fc3RhdGVzLnRhZ3NbYi5uYW1lXS5jb25jYXQoYi50YWdzKTp0aGlzLl9zdGF0ZXMudGFnc1tiLm5hbWVdPWIudGFncyx0aGlzLl9zdGF0ZXMudGFnc1tiLm5hbWVdPWEuZ3JlcCh0aGlzLl9zdGF0ZXMudGFnc1tiLm5hbWVdLGEucHJveHkoZnVuY3Rpb24oYyxkKXtyZXR1cm4gYS5pbkFycmF5KGMsdGhpcy5fc3RhdGVzLnRhZ3NbYi5uYW1lXSk9PT1kfSx0aGlzKSkpfSxlLnByb3RvdHlwZS5zdXBwcmVzcz1mdW5jdGlvbihiKXthLmVhY2goYixhLnByb3h5KGZ1bmN0aW9uKGEsYil7dGhpcy5fc3VwcmVzc1tiXT0hMH0sdGhpcykpfSxlLnByb3RvdHlwZS5yZWxlYXNlPWZ1bmN0aW9uKGIpe2EuZWFjaChiLGEucHJveHkoZnVuY3Rpb24oYSxiKXtkZWxldGUgdGhpcy5fc3VwcmVzc1tiXX0sdGhpcykpfSxlLnByb3RvdHlwZS5wb2ludGVyPWZ1bmN0aW9uKGEpe3ZhciBjPXt4Om51bGwseTpudWxsfTtyZXR1cm4gYT1hLm9yaWdpbmFsRXZlbnR8fGF8fGIuZXZlbnQsYT1hLnRvdWNoZXMmJmEudG91Y2hlcy5sZW5ndGg/YS50b3VjaGVzWzBdOmEuY2hhbmdlZFRvdWNoZXMmJmEuY2hhbmdlZFRvdWNoZXMubGVuZ3RoP2EuY2hhbmdlZFRvdWNoZXNbMF06YSxhLnBhZ2VYPyhjLng9YS5wYWdlWCxjLnk9YS5wYWdlWSk6KGMueD1hLmNsaWVudFgsYy55PWEuY2xpZW50WSksY30sZS5wcm90b3R5cGUuaXNOdW1lcmljPWZ1bmN0aW9uKGEpe3JldHVybiFpc05hTihwYXJzZUZsb2F0KGEpKX0sZS5wcm90b3R5cGUuZGlmZmVyZW5jZT1mdW5jdGlvbihhLGIpe3JldHVybnt4OmEueC1iLngseTphLnktYi55fX0sYS5mbi5vd2xDYXJvdXNlbD1mdW5jdGlvbihiKXt2YXIgYz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBkPWEodGhpcyksZj1kLmRhdGEoXCJvd2wuY2Fyb3VzZWxcIik7Znx8KGY9bmV3IGUodGhpcyxcIm9iamVjdFwiPT10eXBlb2YgYiYmYiksZC5kYXRhKFwib3dsLmNhcm91c2VsXCIsZiksYS5lYWNoKFtcIm5leHRcIixcInByZXZcIixcInRvXCIsXCJkZXN0cm95XCIsXCJyZWZyZXNoXCIsXCJyZXBsYWNlXCIsXCJhZGRcIixcInJlbW92ZVwiXSxmdW5jdGlvbihiLGMpe2YucmVnaXN0ZXIoe3R5cGU6ZS5UeXBlLkV2ZW50LG5hbWU6Y30pLGYuJGVsZW1lbnQub24oYytcIi5vd2wuY2Fyb3VzZWwuY29yZVwiLGEucHJveHkoZnVuY3Rpb24oYSl7YS5uYW1lc3BhY2UmJmEucmVsYXRlZFRhcmdldCE9PXRoaXMmJih0aGlzLnN1cHByZXNzKFtjXSksZltjXS5hcHBseSh0aGlzLFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpKSx0aGlzLnJlbGVhc2UoW2NdKSl9LGYpKX0pKSxcInN0cmluZ1wiPT10eXBlb2YgYiYmXCJfXCIhPT1iLmNoYXJBdCgwKSYmZltiXS5hcHBseShmLGMpfSl9LGEuZm4ub3dsQ2Fyb3VzZWwuQ29uc3RydWN0b3I9ZX0od2luZG93LlplcHRvfHx3aW5kb3cualF1ZXJ5LHdpbmRvdyxkb2N1bWVudCksZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9ZnVuY3Rpb24oYil7dGhpcy5fY29yZT1iLHRoaXMuX2ludGVydmFsPW51bGwsdGhpcy5fdmlzaWJsZT1udWxsLHRoaXMuX2hhbmRsZXJzPXtcImluaXRpYWxpemVkLm93bC5jYXJvdXNlbFwiOmEucHJveHkoZnVuY3Rpb24oYSl7YS5uYW1lc3BhY2UmJnRoaXMuX2NvcmUuc2V0dGluZ3MuYXV0b1JlZnJlc2gmJnRoaXMud2F0Y2goKX0sdGhpcyl9LHRoaXMuX2NvcmUub3B0aW9ucz1hLmV4dGVuZCh7fSxlLkRlZmF1bHRzLHRoaXMuX2NvcmUub3B0aW9ucyksdGhpcy5fY29yZS4kZWxlbWVudC5vbih0aGlzLl9oYW5kbGVycyl9O2UuRGVmYXVsdHM9e2F1dG9SZWZyZXNoOiEwLGF1dG9SZWZyZXNoSW50ZXJ2YWw6NTAwfSxlLnByb3RvdHlwZS53YXRjaD1mdW5jdGlvbigpe3RoaXMuX2ludGVydmFsfHwodGhpcy5fdmlzaWJsZT10aGlzLl9jb3JlLiRlbGVtZW50LmlzKFwiOnZpc2libGVcIiksdGhpcy5faW50ZXJ2YWw9Yi5zZXRJbnRlcnZhbChhLnByb3h5KHRoaXMucmVmcmVzaCx0aGlzKSx0aGlzLl9jb3JlLnNldHRpbmdzLmF1dG9SZWZyZXNoSW50ZXJ2YWwpKX0sZS5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbigpe3RoaXMuX2NvcmUuJGVsZW1lbnQuaXMoXCI6dmlzaWJsZVwiKSE9PXRoaXMuX3Zpc2libGUmJih0aGlzLl92aXNpYmxlPSF0aGlzLl92aXNpYmxlLHRoaXMuX2NvcmUuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoXCJvd2wtaGlkZGVuXCIsIXRoaXMuX3Zpc2libGUpLHRoaXMuX3Zpc2libGUmJnRoaXMuX2NvcmUuaW52YWxpZGF0ZShcIndpZHRoXCIpJiZ0aGlzLl9jb3JlLnJlZnJlc2goKSl9LGUucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt2YXIgYSxjO2IuY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7Zm9yKGEgaW4gdGhpcy5faGFuZGxlcnMpdGhpcy5fY29yZS4kZWxlbWVudC5vZmYoYSx0aGlzLl9oYW5kbGVyc1thXSk7Zm9yKGMgaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykpXCJmdW5jdGlvblwiIT10eXBlb2YgdGhpc1tjXSYmKHRoaXNbY109bnVsbCl9LGEuZm4ub3dsQ2Fyb3VzZWwuQ29uc3RydWN0b3IuUGx1Z2lucy5BdXRvUmVmcmVzaD1lfSh3aW5kb3cuWmVwdG98fHdpbmRvdy5qUXVlcnksd2luZG93LGRvY3VtZW50KSxmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1mdW5jdGlvbihiKXt0aGlzLl9jb3JlPWIsdGhpcy5fbG9hZGVkPVtdLHRoaXMuX2hhbmRsZXJzPXtcImluaXRpYWxpemVkLm93bC5jYXJvdXNlbCBjaGFuZ2Uub3dsLmNhcm91c2VsIHJlc2l6ZWQub3dsLmNhcm91c2VsXCI6YS5wcm94eShmdW5jdGlvbihiKXtpZihiLm5hbWVzcGFjZSYmdGhpcy5fY29yZS5zZXR0aW5ncyYmdGhpcy5fY29yZS5zZXR0aW5ncy5sYXp5TG9hZCYmKGIucHJvcGVydHkmJlwicG9zaXRpb25cIj09Yi5wcm9wZXJ0eS5uYW1lfHxcImluaXRpYWxpemVkXCI9PWIudHlwZSkpZm9yKHZhciBjPXRoaXMuX2NvcmUuc2V0dGluZ3MsZT1jLmNlbnRlciYmTWF0aC5jZWlsKGMuaXRlbXMvMil8fGMuaXRlbXMsZj1jLmNlbnRlciYmZSotMXx8MCxnPShiLnByb3BlcnR5JiZiLnByb3BlcnR5LnZhbHVlIT09ZD9iLnByb3BlcnR5LnZhbHVlOnRoaXMuX2NvcmUuY3VycmVudCgpKStmLGg9dGhpcy5fY29yZS5jbG9uZXMoKS5sZW5ndGgsaT1hLnByb3h5KGZ1bmN0aW9uKGEsYil7dGhpcy5sb2FkKGIpfSx0aGlzKTtmKys8ZTspdGhpcy5sb2FkKGgvMit0aGlzLl9jb3JlLnJlbGF0aXZlKGcpKSxoJiZhLmVhY2godGhpcy5fY29yZS5jbG9uZXModGhpcy5fY29yZS5yZWxhdGl2ZShnKSksaSksZysrfSx0aGlzKX0sdGhpcy5fY29yZS5vcHRpb25zPWEuZXh0ZW5kKHt9LGUuRGVmYXVsdHMsdGhpcy5fY29yZS5vcHRpb25zKSx0aGlzLl9jb3JlLiRlbGVtZW50Lm9uKHRoaXMuX2hhbmRsZXJzKX07ZS5EZWZhdWx0cz17bGF6eUxvYWQ6ITF9LGUucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYyl7dmFyIGQ9dGhpcy5fY29yZS4kc3RhZ2UuY2hpbGRyZW4oKS5lcShjKSxlPWQmJmQuZmluZChcIi5vd2wtbGF6eVwiKTshZXx8YS5pbkFycmF5KGQuZ2V0KDApLHRoaXMuX2xvYWRlZCk+LTF8fChlLmVhY2goYS5wcm94eShmdW5jdGlvbihjLGQpe3ZhciBlLGY9YShkKSxnPWIuZGV2aWNlUGl4ZWxSYXRpbz4xJiZmLmF0dHIoXCJkYXRhLXNyYy1yZXRpbmFcIil8fGYuYXR0cihcImRhdGEtc3JjXCIpO3RoaXMuX2NvcmUudHJpZ2dlcihcImxvYWRcIix7ZWxlbWVudDpmLHVybDpnfSxcImxhenlcIiksZi5pcyhcImltZ1wiKT9mLm9uZShcImxvYWQub3dsLmxhenlcIixhLnByb3h5KGZ1bmN0aW9uKCl7Zi5jc3MoXCJvcGFjaXR5XCIsMSksdGhpcy5fY29yZS50cmlnZ2VyKFwibG9hZGVkXCIse2VsZW1lbnQ6Zix1cmw6Z30sXCJsYXp5XCIpfSx0aGlzKSkuYXR0cihcInNyY1wiLGcpOihlPW5ldyBJbWFnZSxlLm9ubG9hZD1hLnByb3h5KGZ1bmN0aW9uKCl7Zi5jc3Moe1wiYmFja2dyb3VuZC1pbWFnZVwiOid1cmwoXCInK2crJ1wiKScsb3BhY2l0eTpcIjFcIn0pLHRoaXMuX2NvcmUudHJpZ2dlcihcImxvYWRlZFwiLHtlbGVtZW50OmYsdXJsOmd9LFwibGF6eVwiKX0sdGhpcyksZS5zcmM9Zyl9LHRoaXMpKSx0aGlzLl9sb2FkZWQucHVzaChkLmdldCgwKSkpfSxlLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIGEsYjtmb3IoYSBpbiB0aGlzLmhhbmRsZXJzKXRoaXMuX2NvcmUuJGVsZW1lbnQub2ZmKGEsdGhpcy5oYW5kbGVyc1thXSk7Zm9yKGIgaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykpXCJmdW5jdGlvblwiIT10eXBlb2YgdGhpc1tiXSYmKHRoaXNbYl09bnVsbCl9LGEuZm4ub3dsQ2Fyb3VzZWwuQ29uc3RydWN0b3IuUGx1Z2lucy5MYXp5PWV9KHdpbmRvdy5aZXB0b3x8d2luZG93LmpRdWVyeSx3aW5kb3csZG9jdW1lbnQpLGZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPWZ1bmN0aW9uKGIpe3RoaXMuX2NvcmU9Yix0aGlzLl9oYW5kbGVycz17XCJpbml0aWFsaXplZC5vd2wuY2Fyb3VzZWwgcmVmcmVzaGVkLm93bC5jYXJvdXNlbFwiOmEucHJveHkoZnVuY3Rpb24oYSl7YS5uYW1lc3BhY2UmJnRoaXMuX2NvcmUuc2V0dGluZ3MuYXV0b0hlaWdodCYmdGhpcy51cGRhdGUoKX0sdGhpcyksXCJjaGFuZ2VkLm93bC5jYXJvdXNlbFwiOmEucHJveHkoZnVuY3Rpb24oYSl7YS5uYW1lc3BhY2UmJnRoaXMuX2NvcmUuc2V0dGluZ3MuYXV0b0hlaWdodCYmXCJwb3NpdGlvblwiPT1hLnByb3BlcnR5Lm5hbWUmJnRoaXMudXBkYXRlKCl9LHRoaXMpLFwibG9hZGVkLm93bC5sYXp5XCI6YS5wcm94eShmdW5jdGlvbihhKXthLm5hbWVzcGFjZSYmdGhpcy5fY29yZS5zZXR0aW5ncy5hdXRvSGVpZ2h0JiZhLmVsZW1lbnQuY2xvc2VzdChcIi5cIit0aGlzLl9jb3JlLnNldHRpbmdzLml0ZW1DbGFzcykuaW5kZXgoKT09PXRoaXMuX2NvcmUuY3VycmVudCgpJiZ0aGlzLnVwZGF0ZSgpfSx0aGlzKX0sdGhpcy5fY29yZS5vcHRpb25zPWEuZXh0ZW5kKHt9LGUuRGVmYXVsdHMsdGhpcy5fY29yZS5vcHRpb25zKSx0aGlzLl9jb3JlLiRlbGVtZW50Lm9uKHRoaXMuX2hhbmRsZXJzKX07ZS5EZWZhdWx0cz17YXV0b0hlaWdodDohMSxhdXRvSGVpZ2h0Q2xhc3M6XCJvd2wtaGVpZ2h0XCJ9LGUucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbigpe3ZhciBiPXRoaXMuX2NvcmUuX2N1cnJlbnQsYz1iK3RoaXMuX2NvcmUuc2V0dGluZ3MuaXRlbXMsZD10aGlzLl9jb3JlLiRzdGFnZS5jaGlsZHJlbigpLnRvQXJyYXkoKS5zbGljZShiLGMpLGU9W10sZj0wO2EuZWFjaChkLGZ1bmN0aW9uKGIsYyl7ZS5wdXNoKGEoYykuaGVpZ2h0KCkpfSksZj1NYXRoLm1heC5hcHBseShudWxsLGUpLHRoaXMuX2NvcmUuJHN0YWdlLnBhcmVudCgpLmhlaWdodChmKS5hZGRDbGFzcyh0aGlzLl9jb3JlLnNldHRpbmdzLmF1dG9IZWlnaHRDbGFzcyl9LGUucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt2YXIgYSxiO2ZvcihhIGluIHRoaXMuX2hhbmRsZXJzKXRoaXMuX2NvcmUuJGVsZW1lbnQub2ZmKGEsdGhpcy5faGFuZGxlcnNbYV0pO2ZvcihiIGluIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpKVwiZnVuY3Rpb25cIiE9dHlwZW9mIHRoaXNbYl0mJih0aGlzW2JdPW51bGwpfSxhLmZuLm93bENhcm91c2VsLkNvbnN0cnVjdG9yLlBsdWdpbnMuQXV0b0hlaWdodD1lfSh3aW5kb3cuWmVwdG98fHdpbmRvdy5qUXVlcnksd2luZG93LGRvY3VtZW50KSxmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1mdW5jdGlvbihiKXt0aGlzLl9jb3JlPWIsdGhpcy5fdmlkZW9zPXt9LHRoaXMuX3BsYXlpbmc9bnVsbCx0aGlzLl9oYW5kbGVycz17XCJpbml0aWFsaXplZC5vd2wuY2Fyb3VzZWxcIjphLnByb3h5KGZ1bmN0aW9uKGEpe2EubmFtZXNwYWNlJiZ0aGlzLl9jb3JlLnJlZ2lzdGVyKHt0eXBlOlwic3RhdGVcIixuYW1lOlwicGxheWluZ1wiLHRhZ3M6W1wiaW50ZXJhY3RpbmdcIl19KX0sdGhpcyksXCJyZXNpemUub3dsLmNhcm91c2VsXCI6YS5wcm94eShmdW5jdGlvbihhKXthLm5hbWVzcGFjZSYmdGhpcy5fY29yZS5zZXR0aW5ncy52aWRlbyYmdGhpcy5pc0luRnVsbFNjcmVlbigpJiZhLnByZXZlbnREZWZhdWx0KCl9LHRoaXMpLFwicmVmcmVzaGVkLm93bC5jYXJvdXNlbFwiOmEucHJveHkoZnVuY3Rpb24oYSl7YS5uYW1lc3BhY2UmJnRoaXMuX2NvcmUuaXMoXCJyZXNpemluZ1wiKSYmdGhpcy5fY29yZS4kc3RhZ2UuZmluZChcIi5jbG9uZWQgLm93bC12aWRlby1mcmFtZVwiKS5yZW1vdmUoKX0sdGhpcyksXCJjaGFuZ2VkLm93bC5jYXJvdXNlbFwiOmEucHJveHkoZnVuY3Rpb24oYSl7YS5uYW1lc3BhY2UmJlwicG9zaXRpb25cIj09PWEucHJvcGVydHkubmFtZSYmdGhpcy5fcGxheWluZyYmdGhpcy5zdG9wKCl9LHRoaXMpLFwicHJlcGFyZWQub3dsLmNhcm91c2VsXCI6YS5wcm94eShmdW5jdGlvbihiKXtpZihiLm5hbWVzcGFjZSl7dmFyIGM9YShiLmNvbnRlbnQpLmZpbmQoXCIub3dsLXZpZGVvXCIpO2MubGVuZ3RoJiYoYy5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpLHRoaXMuZmV0Y2goYyxhKGIuY29udGVudCkpKX19LHRoaXMpfSx0aGlzLl9jb3JlLm9wdGlvbnM9YS5leHRlbmQoe30sZS5EZWZhdWx0cyx0aGlzLl9jb3JlLm9wdGlvbnMpLHRoaXMuX2NvcmUuJGVsZW1lbnQub24odGhpcy5faGFuZGxlcnMpLHRoaXMuX2NvcmUuJGVsZW1lbnQub24oXCJjbGljay5vd2wudmlkZW9cIixcIi5vd2wtdmlkZW8tcGxheS1pY29uXCIsYS5wcm94eShmdW5jdGlvbihhKXt0aGlzLnBsYXkoYSl9LHRoaXMpKX07ZS5EZWZhdWx0cz17dmlkZW86ITEsdmlkZW9IZWlnaHQ6ITEsdmlkZW9XaWR0aDohMX0sZS5wcm90b3R5cGUuZmV0Y2g9ZnVuY3Rpb24oYSxiKXt2YXIgYz1mdW5jdGlvbigpe3JldHVybiBhLmF0dHIoXCJkYXRhLXZpbWVvLWlkXCIpP1widmltZW9cIjphLmF0dHIoXCJkYXRhLXZ6YWFyLWlkXCIpP1widnphYXJcIjpcInlvdXR1YmVcIn0oKSxkPWEuYXR0cihcImRhdGEtdmltZW8taWRcIil8fGEuYXR0cihcImRhdGEteW91dHViZS1pZFwiKXx8YS5hdHRyKFwiZGF0YS12emFhci1pZFwiKSxlPWEuYXR0cihcImRhdGEtd2lkdGhcIil8fHRoaXMuX2NvcmUuc2V0dGluZ3MudmlkZW9XaWR0aCxmPWEuYXR0cihcImRhdGEtaGVpZ2h0XCIpfHx0aGlzLl9jb3JlLnNldHRpbmdzLnZpZGVvSGVpZ2h0LGc9YS5hdHRyKFwiaHJlZlwiKTtpZighZyl0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHZpZGVvIFVSTC5cIik7aWYoZD1nLm1hdGNoKC8oaHR0cDp8aHR0cHM6fClcXC9cXC8ocGxheWVyLnx3d3cufGFwcC4pPyh2aW1lb1xcLmNvbXx5b3V0dShiZVxcLmNvbXxcXC5iZXxiZVxcLmdvb2dsZWFwaXNcXC5jb20pfHZ6YWFyXFwuY29tKVxcLyh2aWRlb1xcL3x2aWRlb3NcXC98ZW1iZWRcXC98Y2hhbm5lbHNcXC8uK1xcL3xncm91cHNcXC8uK1xcL3x3YXRjaFxcP3Y9fHZcXC8pPyhbQS1aYS16MC05Ll8lLV0qKShcXCZcXFMrKT8vKSxkWzNdLmluZGV4T2YoXCJ5b3V0dVwiKT4tMSljPVwieW91dHViZVwiO2Vsc2UgaWYoZFszXS5pbmRleE9mKFwidmltZW9cIik+LTEpYz1cInZpbWVvXCI7ZWxzZXtpZighKGRbM10uaW5kZXhPZihcInZ6YWFyXCIpPi0xKSl0aHJvdyBuZXcgRXJyb3IoXCJWaWRlbyBVUkwgbm90IHN1cHBvcnRlZC5cIik7Yz1cInZ6YWFyXCJ9ZD1kWzZdLHRoaXMuX3ZpZGVvc1tnXT17dHlwZTpjLGlkOmQsd2lkdGg6ZSxoZWlnaHQ6Zn0sYi5hdHRyKFwiZGF0YS12aWRlb1wiLGcpLHRoaXMudGh1bWJuYWlsKGEsdGhpcy5fdmlkZW9zW2ddKX0sZS5wcm90b3R5cGUudGh1bWJuYWlsPWZ1bmN0aW9uKGIsYyl7dmFyIGQsZSxmLGc9Yy53aWR0aCYmYy5oZWlnaHQ/J3N0eWxlPVwid2lkdGg6JytjLndpZHRoK1wicHg7aGVpZ2h0OlwiK2MuaGVpZ2h0KydweDtcIic6XCJcIixoPWIuZmluZChcImltZ1wiKSxpPVwic3JjXCIsaj1cIlwiLGs9dGhpcy5fY29yZS5zZXR0aW5ncyxsPWZ1bmN0aW9uKGEpe2U9JzxkaXYgY2xhc3M9XCJvd2wtdmlkZW8tcGxheS1pY29uXCI+PC9kaXY+JyxkPWsubGF6eUxvYWQ/JzxkaXYgY2xhc3M9XCJvd2wtdmlkZW8tdG4gJytqKydcIiAnK2krJz1cIicrYSsnXCI+PC9kaXY+JzonPGRpdiBjbGFzcz1cIm93bC12aWRlby10blwiIHN0eWxlPVwib3BhY2l0eToxO2JhY2tncm91bmQtaW1hZ2U6dXJsKCcrYSsnKVwiPjwvZGl2PicsYi5hZnRlcihkKSxiLmFmdGVyKGUpfTtpZihiLndyYXAoJzxkaXYgY2xhc3M9XCJvd2wtdmlkZW8td3JhcHBlclwiJytnK1wiPjwvZGl2PlwiKSx0aGlzLl9jb3JlLnNldHRpbmdzLmxhenlMb2FkJiYoaT1cImRhdGEtc3JjXCIsaj1cIm93bC1sYXp5XCIpLGgubGVuZ3RoKXJldHVybiBsKGguYXR0cihpKSksaC5yZW1vdmUoKSwhMTtcInlvdXR1YmVcIj09PWMudHlwZT8oZj1cIi8vaW1nLnlvdXR1YmUuY29tL3ZpL1wiK2MuaWQrXCIvaHFkZWZhdWx0LmpwZ1wiLGwoZikpOlwidmltZW9cIj09PWMudHlwZT9hLmFqYXgoe3R5cGU6XCJHRVRcIix1cmw6XCIvL3ZpbWVvLmNvbS9hcGkvdjIvdmlkZW8vXCIrYy5pZCtcIi5qc29uXCIsanNvbnA6XCJjYWxsYmFja1wiLGRhdGFUeXBlOlwianNvbnBcIixzdWNjZXNzOmZ1bmN0aW9uKGEpe2Y9YVswXS50aHVtYm5haWxfbGFyZ2UsbChmKX19KTpcInZ6YWFyXCI9PT1jLnR5cGUmJmEuYWpheCh7dHlwZTpcIkdFVFwiLHVybDpcIi8vdnphYXIuY29tL2FwaS92aWRlb3MvXCIrYy5pZCtcIi5qc29uXCIsanNvbnA6XCJjYWxsYmFja1wiLGRhdGFUeXBlOlwianNvbnBcIixzdWNjZXNzOmZ1bmN0aW9uKGEpe2Y9YS5mcmFtZWdyYWJfdXJsLGwoZil9fSl9LGUucHJvdG90eXBlLnN0b3A9ZnVuY3Rpb24oKXt0aGlzLl9jb3JlLnRyaWdnZXIoXCJzdG9wXCIsbnVsbCxcInZpZGVvXCIpLHRoaXMuX3BsYXlpbmcuZmluZChcIi5vd2wtdmlkZW8tZnJhbWVcIikucmVtb3ZlKCksdGhpcy5fcGxheWluZy5yZW1vdmVDbGFzcyhcIm93bC12aWRlby1wbGF5aW5nXCIpLHRoaXMuX3BsYXlpbmc9bnVsbCx0aGlzLl9jb3JlLmxlYXZlKFwicGxheWluZ1wiKSx0aGlzLl9jb3JlLnRyaWdnZXIoXCJzdG9wcGVkXCIsbnVsbCxcInZpZGVvXCIpfSxlLnByb3RvdHlwZS5wbGF5PWZ1bmN0aW9uKGIpe3ZhciBjLGQ9YShiLnRhcmdldCksZT1kLmNsb3Nlc3QoXCIuXCIrdGhpcy5fY29yZS5zZXR0aW5ncy5pdGVtQ2xhc3MpLGY9dGhpcy5fdmlkZW9zW2UuYXR0cihcImRhdGEtdmlkZW9cIildLGc9Zi53aWR0aHx8XCIxMDAlXCIsaD1mLmhlaWdodHx8dGhpcy5fY29yZS4kc3RhZ2UuaGVpZ2h0KCk7dGhpcy5fcGxheWluZ3x8KHRoaXMuX2NvcmUuZW50ZXIoXCJwbGF5aW5nXCIpLHRoaXMuX2NvcmUudHJpZ2dlcihcInBsYXlcIixudWxsLFwidmlkZW9cIiksZT10aGlzLl9jb3JlLml0ZW1zKHRoaXMuX2NvcmUucmVsYXRpdmUoZS5pbmRleCgpKSksdGhpcy5fY29yZS5yZXNldChlLmluZGV4KCkpLFwieW91dHViZVwiPT09Zi50eXBlP2M9JzxpZnJhbWUgd2lkdGg9XCInK2crJ1wiIGhlaWdodD1cIicraCsnXCIgc3JjPVwiLy93d3cueW91dHViZS5jb20vZW1iZWQvJytmLmlkK1wiP2F1dG9wbGF5PTEmcmVsPTAmdj1cIitmLmlkKydcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JzpcInZpbWVvXCI9PT1mLnR5cGU/Yz0nPGlmcmFtZSBzcmM9XCIvL3BsYXllci52aW1lby5jb20vdmlkZW8vJytmLmlkKyc/YXV0b3BsYXk9MVwiIHdpZHRoPVwiJytnKydcIiBoZWlnaHQ9XCInK2grJ1wiIGZyYW1lYm9yZGVyPVwiMFwiIHdlYmtpdGFsbG93ZnVsbHNjcmVlbiBtb3phbGxvd2Z1bGxzY3JlZW4gYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPic6XCJ2emFhclwiPT09Zi50eXBlJiYoYz0nPGlmcmFtZSBmcmFtZWJvcmRlcj1cIjBcImhlaWdodD1cIicraCsnXCJ3aWR0aD1cIicrZysnXCIgYWxsb3dmdWxsc2NyZWVuIG1vemFsbG93ZnVsbHNjcmVlbiB3ZWJraXRBbGxvd0Z1bGxTY3JlZW4gc3JjPVwiLy92aWV3LnZ6YWFyLmNvbS8nK2YuaWQrJy9wbGF5ZXI/YXV0b3BsYXk9dHJ1ZVwiPjwvaWZyYW1lPicpLGEoJzxkaXYgY2xhc3M9XCJvd2wtdmlkZW8tZnJhbWVcIj4nK2MrXCI8L2Rpdj5cIikuaW5zZXJ0QWZ0ZXIoZS5maW5kKFwiLm93bC12aWRlb1wiKSksdGhpcy5fcGxheWluZz1lLmFkZENsYXNzKFwib3dsLXZpZGVvLXBsYXlpbmdcIikpfSxlLnByb3RvdHlwZS5pc0luRnVsbFNjcmVlbj1mdW5jdGlvbigpe3ZhciBiPWMuZnVsbHNjcmVlbkVsZW1lbnR8fGMubW96RnVsbFNjcmVlbkVsZW1lbnR8fGMud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQ7cmV0dXJuIGImJmEoYikucGFyZW50KCkuaGFzQ2xhc3MoXCJvd2wtdmlkZW8tZnJhbWVcIil9LGUucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt2YXIgYSxiO3RoaXMuX2NvcmUuJGVsZW1lbnQub2ZmKFwiY2xpY2sub3dsLnZpZGVvXCIpO2ZvcihhIGluIHRoaXMuX2hhbmRsZXJzKXRoaXMuX2NvcmUuJGVsZW1lbnQub2ZmKGEsdGhpcy5faGFuZGxlcnNbYV0pO2ZvcihiIGluIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpKVwiZnVuY3Rpb25cIiE9dHlwZW9mIHRoaXNbYl0mJih0aGlzW2JdPW51bGwpfSxhLmZuLm93bENhcm91c2VsLkNvbnN0cnVjdG9yLlBsdWdpbnMuVmlkZW89ZX0od2luZG93LlplcHRvfHx3aW5kb3cualF1ZXJ5LHdpbmRvdyxkb2N1bWVudCksZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9ZnVuY3Rpb24oYil7dGhpcy5jb3JlPWIsdGhpcy5jb3JlLm9wdGlvbnM9YS5leHRlbmQoe30sZS5EZWZhdWx0cyx0aGlzLmNvcmUub3B0aW9ucyksdGhpcy5zd2FwcGluZz0hMCx0aGlzLnByZXZpb3VzPWQsdGhpcy5uZXh0PWQsdGhpcy5oYW5kbGVycz17XCJjaGFuZ2Uub3dsLmNhcm91c2VsXCI6YS5wcm94eShmdW5jdGlvbihhKXthLm5hbWVzcGFjZSYmXCJwb3NpdGlvblwiPT1hLnByb3BlcnR5Lm5hbWUmJih0aGlzLnByZXZpb3VzPXRoaXMuY29yZS5jdXJyZW50KCksdGhpcy5uZXh0PWEucHJvcGVydHkudmFsdWUpfSx0aGlzKSxcImRyYWcub3dsLmNhcm91c2VsIGRyYWdnZWQub3dsLmNhcm91c2VsIHRyYW5zbGF0ZWQub3dsLmNhcm91c2VsXCI6YS5wcm94eShmdW5jdGlvbihhKXthLm5hbWVzcGFjZSYmKHRoaXMuc3dhcHBpbmc9XCJ0cmFuc2xhdGVkXCI9PWEudHlwZSl9LHRoaXMpLFwidHJhbnNsYXRlLm93bC5jYXJvdXNlbFwiOmEucHJveHkoZnVuY3Rpb24oYSl7YS5uYW1lc3BhY2UmJnRoaXMuc3dhcHBpbmcmJih0aGlzLmNvcmUub3B0aW9ucy5hbmltYXRlT3V0fHx0aGlzLmNvcmUub3B0aW9ucy5hbmltYXRlSW4pJiZ0aGlzLnN3YXAoKX0sdGhpcyl9LHRoaXMuY29yZS4kZWxlbWVudC5vbih0aGlzLmhhbmRsZXJzKX07ZS5EZWZhdWx0cz17YW5pbWF0ZU91dDohMSxhbmltYXRlSW46ITF9LGUucHJvdG90eXBlLnN3YXA9ZnVuY3Rpb24oKXtpZigxPT09dGhpcy5jb3JlLnNldHRpbmdzLml0ZW1zJiZhLnN1cHBvcnQuYW5pbWF0aW9uJiZhLnN1cHBvcnQudHJhbnNpdGlvbil7dGhpcy5jb3JlLnNwZWVkKDApO3ZhciBiLGM9YS5wcm94eSh0aGlzLmNsZWFyLHRoaXMpLGQ9dGhpcy5jb3JlLiRzdGFnZS5jaGlsZHJlbigpLmVxKHRoaXMucHJldmlvdXMpLGU9dGhpcy5jb3JlLiRzdGFnZS5jaGlsZHJlbigpLmVxKHRoaXMubmV4dCksZj10aGlzLmNvcmUuc2V0dGluZ3MuYW5pbWF0ZUluLGc9dGhpcy5jb3JlLnNldHRpbmdzLmFuaW1hdGVPdXQ7dGhpcy5jb3JlLmN1cnJlbnQoKSE9PXRoaXMucHJldmlvdXMmJihnJiYoYj10aGlzLmNvcmUuY29vcmRpbmF0ZXModGhpcy5wcmV2aW91cyktdGhpcy5jb3JlLmNvb3JkaW5hdGVzKHRoaXMubmV4dCksZC5vbmUoYS5zdXBwb3J0LmFuaW1hdGlvbi5lbmQsYykuY3NzKHtsZWZ0OmIrXCJweFwifSkuYWRkQ2xhc3MoXCJhbmltYXRlZCBvd2wtYW5pbWF0ZWQtb3V0XCIpLmFkZENsYXNzKGcpKSxmJiZlLm9uZShhLnN1cHBvcnQuYW5pbWF0aW9uLmVuZCxjKS5hZGRDbGFzcyhcImFuaW1hdGVkIG93bC1hbmltYXRlZC1pblwiKS5hZGRDbGFzcyhmKSl9fSxlLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbihiKXthKGIudGFyZ2V0KS5jc3Moe2xlZnQ6XCJcIn0pLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZWQgb3dsLWFuaW1hdGVkLW91dCBvd2wtYW5pbWF0ZWQtaW5cIikucmVtb3ZlQ2xhc3ModGhpcy5jb3JlLnNldHRpbmdzLmFuaW1hdGVJbikucmVtb3ZlQ2xhc3ModGhpcy5jb3JlLnNldHRpbmdzLmFuaW1hdGVPdXQpLHRoaXMuY29yZS5vblRyYW5zaXRpb25FbmQoKX0sZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3ZhciBhLGI7Zm9yKGEgaW4gdGhpcy5oYW5kbGVycyl0aGlzLmNvcmUuJGVsZW1lbnQub2ZmKGEsdGhpcy5oYW5kbGVyc1thXSk7Zm9yKGIgaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykpXCJmdW5jdGlvblwiIT10eXBlb2YgdGhpc1tiXSYmKHRoaXNbYl09bnVsbCl9LFxuYS5mbi5vd2xDYXJvdXNlbC5Db25zdHJ1Y3Rvci5QbHVnaW5zLkFuaW1hdGU9ZX0od2luZG93LlplcHRvfHx3aW5kb3cualF1ZXJ5LHdpbmRvdyxkb2N1bWVudCksZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9ZnVuY3Rpb24oYil7dGhpcy5fY29yZT1iLHRoaXMuX3RpbWVvdXQ9bnVsbCx0aGlzLl9wYXVzZWQ9ITEsdGhpcy5faGFuZGxlcnM9e1wiY2hhbmdlZC5vd2wuY2Fyb3VzZWxcIjphLnByb3h5KGZ1bmN0aW9uKGEpe2EubmFtZXNwYWNlJiZcInNldHRpbmdzXCI9PT1hLnByb3BlcnR5Lm5hbWU/dGhpcy5fY29yZS5zZXR0aW5ncy5hdXRvcGxheT90aGlzLnBsYXkoKTp0aGlzLnN0b3AoKTphLm5hbWVzcGFjZSYmXCJwb3NpdGlvblwiPT09YS5wcm9wZXJ0eS5uYW1lJiZ0aGlzLl9jb3JlLnNldHRpbmdzLmF1dG9wbGF5JiZ0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCl9LHRoaXMpLFwiaW5pdGlhbGl6ZWQub3dsLmNhcm91c2VsXCI6YS5wcm94eShmdW5jdGlvbihhKXthLm5hbWVzcGFjZSYmdGhpcy5fY29yZS5zZXR0aW5ncy5hdXRvcGxheSYmdGhpcy5wbGF5KCl9LHRoaXMpLFwicGxheS5vd2wuYXV0b3BsYXlcIjphLnByb3h5KGZ1bmN0aW9uKGEsYixjKXthLm5hbWVzcGFjZSYmdGhpcy5wbGF5KGIsYyl9LHRoaXMpLFwic3RvcC5vd2wuYXV0b3BsYXlcIjphLnByb3h5KGZ1bmN0aW9uKGEpe2EubmFtZXNwYWNlJiZ0aGlzLnN0b3AoKX0sdGhpcyksXCJtb3VzZW92ZXIub3dsLmF1dG9wbGF5XCI6YS5wcm94eShmdW5jdGlvbigpe3RoaXMuX2NvcmUuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlJiZ0aGlzLl9jb3JlLmlzKFwicm90YXRpbmdcIikmJnRoaXMucGF1c2UoKX0sdGhpcyksXCJtb3VzZWxlYXZlLm93bC5hdXRvcGxheVwiOmEucHJveHkoZnVuY3Rpb24oKXt0aGlzLl9jb3JlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSYmdGhpcy5fY29yZS5pcyhcInJvdGF0aW5nXCIpJiZ0aGlzLnBsYXkoKX0sdGhpcyksXCJ0b3VjaHN0YXJ0Lm93bC5jb3JlXCI6YS5wcm94eShmdW5jdGlvbigpe3RoaXMuX2NvcmUuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlJiZ0aGlzLl9jb3JlLmlzKFwicm90YXRpbmdcIikmJnRoaXMucGF1c2UoKX0sdGhpcyksXCJ0b3VjaGVuZC5vd2wuY29yZVwiOmEucHJveHkoZnVuY3Rpb24oKXt0aGlzLl9jb3JlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSYmdGhpcy5wbGF5KCl9LHRoaXMpfSx0aGlzLl9jb3JlLiRlbGVtZW50Lm9uKHRoaXMuX2hhbmRsZXJzKSx0aGlzLl9jb3JlLm9wdGlvbnM9YS5leHRlbmQoe30sZS5EZWZhdWx0cyx0aGlzLl9jb3JlLm9wdGlvbnMpfTtlLkRlZmF1bHRzPXthdXRvcGxheTohMSxhdXRvcGxheVRpbWVvdXQ6NWUzLGF1dG9wbGF5SG92ZXJQYXVzZTohMSxhdXRvcGxheVNwZWVkOiExfSxlLnByb3RvdHlwZS5wbGF5PWZ1bmN0aW9uKGEsYil7dGhpcy5fcGF1c2VkPSExLHRoaXMuX2NvcmUuaXMoXCJyb3RhdGluZ1wiKXx8KHRoaXMuX2NvcmUuZW50ZXIoXCJyb3RhdGluZ1wiKSx0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCkpfSxlLnByb3RvdHlwZS5fZ2V0TmV4dFRpbWVvdXQ9ZnVuY3Rpb24oZCxlKXtyZXR1cm4gdGhpcy5fdGltZW91dCYmYi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCksYi5zZXRUaW1lb3V0KGEucHJveHkoZnVuY3Rpb24oKXt0aGlzLl9wYXVzZWR8fHRoaXMuX2NvcmUuaXMoXCJidXN5XCIpfHx0aGlzLl9jb3JlLmlzKFwiaW50ZXJhY3RpbmdcIil8fGMuaGlkZGVufHx0aGlzLl9jb3JlLm5leHQoZXx8dGhpcy5fY29yZS5zZXR0aW5ncy5hdXRvcGxheVNwZWVkKX0sdGhpcyksZHx8dGhpcy5fY29yZS5zZXR0aW5ncy5hdXRvcGxheVRpbWVvdXQpfSxlLnByb3RvdHlwZS5fc2V0QXV0b1BsYXlJbnRlcnZhbD1mdW5jdGlvbigpe3RoaXMuX3RpbWVvdXQ9dGhpcy5fZ2V0TmV4dFRpbWVvdXQoKX0sZS5wcm90b3R5cGUuc3RvcD1mdW5jdGlvbigpe3RoaXMuX2NvcmUuaXMoXCJyb3RhdGluZ1wiKSYmKGIuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpLHRoaXMuX2NvcmUubGVhdmUoXCJyb3RhdGluZ1wiKSl9LGUucHJvdG90eXBlLnBhdXNlPWZ1bmN0aW9uKCl7dGhpcy5fY29yZS5pcyhcInJvdGF0aW5nXCIpJiYodGhpcy5fcGF1c2VkPSEwKX0sZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3ZhciBhLGI7dGhpcy5zdG9wKCk7Zm9yKGEgaW4gdGhpcy5faGFuZGxlcnMpdGhpcy5fY29yZS4kZWxlbWVudC5vZmYoYSx0aGlzLl9oYW5kbGVyc1thXSk7Zm9yKGIgaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykpXCJmdW5jdGlvblwiIT10eXBlb2YgdGhpc1tiXSYmKHRoaXNbYl09bnVsbCl9LGEuZm4ub3dsQ2Fyb3VzZWwuQ29uc3RydWN0b3IuUGx1Z2lucy5hdXRvcGxheT1lfSh3aW5kb3cuWmVwdG98fHdpbmRvdy5qUXVlcnksd2luZG93LGRvY3VtZW50KSxmdW5jdGlvbihhLGIsYyxkKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1mdW5jdGlvbihiKXt0aGlzLl9jb3JlPWIsdGhpcy5faW5pdGlhbGl6ZWQ9ITEsdGhpcy5fcGFnZXM9W10sdGhpcy5fY29udHJvbHM9e30sdGhpcy5fdGVtcGxhdGVzPVtdLHRoaXMuJGVsZW1lbnQ9dGhpcy5fY29yZS4kZWxlbWVudCx0aGlzLl9vdmVycmlkZXM9e25leHQ6dGhpcy5fY29yZS5uZXh0LHByZXY6dGhpcy5fY29yZS5wcmV2LHRvOnRoaXMuX2NvcmUudG99LHRoaXMuX2hhbmRsZXJzPXtcInByZXBhcmVkLm93bC5jYXJvdXNlbFwiOmEucHJveHkoZnVuY3Rpb24oYil7Yi5uYW1lc3BhY2UmJnRoaXMuX2NvcmUuc2V0dGluZ3MuZG90c0RhdGEmJnRoaXMuX3RlbXBsYXRlcy5wdXNoKCc8ZGl2IGNsYXNzPVwiJyt0aGlzLl9jb3JlLnNldHRpbmdzLmRvdENsYXNzKydcIj4nK2EoYi5jb250ZW50KS5maW5kKFwiW2RhdGEtZG90XVwiKS5hZGRCYWNrKFwiW2RhdGEtZG90XVwiKS5hdHRyKFwiZGF0YS1kb3RcIikrXCI8L2Rpdj5cIil9LHRoaXMpLFwiYWRkZWQub3dsLmNhcm91c2VsXCI6YS5wcm94eShmdW5jdGlvbihhKXthLm5hbWVzcGFjZSYmdGhpcy5fY29yZS5zZXR0aW5ncy5kb3RzRGF0YSYmdGhpcy5fdGVtcGxhdGVzLnNwbGljZShhLnBvc2l0aW9uLDAsdGhpcy5fdGVtcGxhdGVzLnBvcCgpKX0sdGhpcyksXCJyZW1vdmUub3dsLmNhcm91c2VsXCI6YS5wcm94eShmdW5jdGlvbihhKXthLm5hbWVzcGFjZSYmdGhpcy5fY29yZS5zZXR0aW5ncy5kb3RzRGF0YSYmdGhpcy5fdGVtcGxhdGVzLnNwbGljZShhLnBvc2l0aW9uLDEpfSx0aGlzKSxcImNoYW5nZWQub3dsLmNhcm91c2VsXCI6YS5wcm94eShmdW5jdGlvbihhKXthLm5hbWVzcGFjZSYmXCJwb3NpdGlvblwiPT1hLnByb3BlcnR5Lm5hbWUmJnRoaXMuZHJhdygpfSx0aGlzKSxcImluaXRpYWxpemVkLm93bC5jYXJvdXNlbFwiOmEucHJveHkoZnVuY3Rpb24oYSl7YS5uYW1lc3BhY2UmJiF0aGlzLl9pbml0aWFsaXplZCYmKHRoaXMuX2NvcmUudHJpZ2dlcihcImluaXRpYWxpemVcIixudWxsLFwibmF2aWdhdGlvblwiKSx0aGlzLmluaXRpYWxpemUoKSx0aGlzLnVwZGF0ZSgpLHRoaXMuZHJhdygpLHRoaXMuX2luaXRpYWxpemVkPSEwLHRoaXMuX2NvcmUudHJpZ2dlcihcImluaXRpYWxpemVkXCIsbnVsbCxcIm5hdmlnYXRpb25cIikpfSx0aGlzKSxcInJlZnJlc2hlZC5vd2wuY2Fyb3VzZWxcIjphLnByb3h5KGZ1bmN0aW9uKGEpe2EubmFtZXNwYWNlJiZ0aGlzLl9pbml0aWFsaXplZCYmKHRoaXMuX2NvcmUudHJpZ2dlcihcInJlZnJlc2hcIixudWxsLFwibmF2aWdhdGlvblwiKSx0aGlzLnVwZGF0ZSgpLHRoaXMuZHJhdygpLHRoaXMuX2NvcmUudHJpZ2dlcihcInJlZnJlc2hlZFwiLG51bGwsXCJuYXZpZ2F0aW9uXCIpKX0sdGhpcyl9LHRoaXMuX2NvcmUub3B0aW9ucz1hLmV4dGVuZCh7fSxlLkRlZmF1bHRzLHRoaXMuX2NvcmUub3B0aW9ucyksdGhpcy4kZWxlbWVudC5vbih0aGlzLl9oYW5kbGVycyl9O2UuRGVmYXVsdHM9e25hdjohMSxuYXZUZXh0OltcInByZXZcIixcIm5leHRcIl0sbmF2U3BlZWQ6ITEsbmF2RWxlbWVudDpcImRpdlwiLG5hdkNvbnRhaW5lcjohMSxuYXZDb250YWluZXJDbGFzczpcIm93bC1uYXZcIixuYXZDbGFzczpbXCJvd2wtcHJldlwiLFwib3dsLW5leHRcIl0sc2xpZGVCeToxLGRvdENsYXNzOlwib3dsLWRvdFwiLGRvdHNDbGFzczpcIm93bC1kb3RzXCIsZG90czohMCxkb3RzRWFjaDohMSxkb3RzRGF0YTohMSxkb3RzU3BlZWQ6ITEsZG90c0NvbnRhaW5lcjohMX0sZS5wcm90b3R5cGUuaW5pdGlhbGl6ZT1mdW5jdGlvbigpe3ZhciBiLGM9dGhpcy5fY29yZS5zZXR0aW5nczt0aGlzLl9jb250cm9scy4kcmVsYXRpdmU9KGMubmF2Q29udGFpbmVyP2EoYy5uYXZDb250YWluZXIpOmEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhjLm5hdkNvbnRhaW5lckNsYXNzKS5hcHBlbmRUbyh0aGlzLiRlbGVtZW50KSkuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKSx0aGlzLl9jb250cm9scy4kcHJldmlvdXM9YShcIjxcIitjLm5hdkVsZW1lbnQrXCI+XCIpLmFkZENsYXNzKGMubmF2Q2xhc3NbMF0pLmh0bWwoYy5uYXZUZXh0WzBdKS5wcmVwZW5kVG8odGhpcy5fY29udHJvbHMuJHJlbGF0aXZlKS5vbihcImNsaWNrXCIsYS5wcm94eShmdW5jdGlvbihhKXt0aGlzLnByZXYoYy5uYXZTcGVlZCl9LHRoaXMpKSx0aGlzLl9jb250cm9scy4kbmV4dD1hKFwiPFwiK2MubmF2RWxlbWVudCtcIj5cIikuYWRkQ2xhc3MoYy5uYXZDbGFzc1sxXSkuaHRtbChjLm5hdlRleHRbMV0pLmFwcGVuZFRvKHRoaXMuX2NvbnRyb2xzLiRyZWxhdGl2ZSkub24oXCJjbGlja1wiLGEucHJveHkoZnVuY3Rpb24oYSl7dGhpcy5uZXh0KGMubmF2U3BlZWQpfSx0aGlzKSksYy5kb3RzRGF0YXx8KHRoaXMuX3RlbXBsYXRlcz1bYShcIjxkaXY+XCIpLmFkZENsYXNzKGMuZG90Q2xhc3MpLmFwcGVuZChhKFwiPHNwYW4+XCIpKS5wcm9wKFwib3V0ZXJIVE1MXCIpXSksdGhpcy5fY29udHJvbHMuJGFic29sdXRlPShjLmRvdHNDb250YWluZXI/YShjLmRvdHNDb250YWluZXIpOmEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhjLmRvdHNDbGFzcykuYXBwZW5kVG8odGhpcy4kZWxlbWVudCkpLmFkZENsYXNzKFwiZGlzYWJsZWRcIiksdGhpcy5fY29udHJvbHMuJGFic29sdXRlLm9uKFwiY2xpY2tcIixcImRpdlwiLGEucHJveHkoZnVuY3Rpb24oYil7dmFyIGQ9YShiLnRhcmdldCkucGFyZW50KCkuaXModGhpcy5fY29udHJvbHMuJGFic29sdXRlKT9hKGIudGFyZ2V0KS5pbmRleCgpOmEoYi50YXJnZXQpLnBhcmVudCgpLmluZGV4KCk7Yi5wcmV2ZW50RGVmYXVsdCgpLHRoaXMudG8oZCxjLmRvdHNTcGVlZCl9LHRoaXMpKTtmb3IoYiBpbiB0aGlzLl9vdmVycmlkZXMpdGhpcy5fY29yZVtiXT1hLnByb3h5KHRoaXNbYl0sdGhpcyl9LGUucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt2YXIgYSxiLGMsZDtmb3IoYSBpbiB0aGlzLl9oYW5kbGVycyl0aGlzLiRlbGVtZW50Lm9mZihhLHRoaXMuX2hhbmRsZXJzW2FdKTtmb3IoYiBpbiB0aGlzLl9jb250cm9scyl0aGlzLl9jb250cm9sc1tiXS5yZW1vdmUoKTtmb3IoZCBpbiB0aGlzLm92ZXJpZGVzKXRoaXMuX2NvcmVbZF09dGhpcy5fb3ZlcnJpZGVzW2RdO2ZvcihjIGluIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpKVwiZnVuY3Rpb25cIiE9dHlwZW9mIHRoaXNbY10mJih0aGlzW2NdPW51bGwpfSxlLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24oKXt2YXIgYSxiLGMsZD10aGlzLl9jb3JlLmNsb25lcygpLmxlbmd0aC8yLGU9ZCt0aGlzLl9jb3JlLml0ZW1zKCkubGVuZ3RoLGY9dGhpcy5fY29yZS5tYXhpbXVtKCEwKSxnPXRoaXMuX2NvcmUuc2V0dGluZ3MsaD1nLmNlbnRlcnx8Zy5hdXRvV2lkdGh8fGcuZG90c0RhdGE/MTpnLmRvdHNFYWNofHxnLml0ZW1zO2lmKFwicGFnZVwiIT09Zy5zbGlkZUJ5JiYoZy5zbGlkZUJ5PU1hdGgubWluKGcuc2xpZGVCeSxnLml0ZW1zKSksZy5kb3RzfHxcInBhZ2VcIj09Zy5zbGlkZUJ5KWZvcih0aGlzLl9wYWdlcz1bXSxhPWQsYj0wLGM9MDthPGU7YSsrKXtpZihiPj1ofHwwPT09Yil7aWYodGhpcy5fcGFnZXMucHVzaCh7c3RhcnQ6TWF0aC5taW4oZixhLWQpLGVuZDphLWQraC0xfSksTWF0aC5taW4oZixhLWQpPT09ZilicmVhaztiPTAsKytjfWIrPXRoaXMuX2NvcmUubWVyZ2Vycyh0aGlzLl9jb3JlLnJlbGF0aXZlKGEpKX19LGUucHJvdG90eXBlLmRyYXc9ZnVuY3Rpb24oKXt2YXIgYixjPXRoaXMuX2NvcmUuc2V0dGluZ3MsZD10aGlzLl9jb3JlLml0ZW1zKCkubGVuZ3RoPD1jLml0ZW1zLGU9dGhpcy5fY29yZS5yZWxhdGl2ZSh0aGlzLl9jb3JlLmN1cnJlbnQoKSksZj1jLmxvb3B8fGMucmV3aW5kO3RoaXMuX2NvbnRyb2xzLiRyZWxhdGl2ZS50b2dnbGVDbGFzcyhcImRpc2FibGVkXCIsIWMubmF2fHxkKSxjLm5hdiYmKHRoaXMuX2NvbnRyb2xzLiRwcmV2aW91cy50b2dnbGVDbGFzcyhcImRpc2FibGVkXCIsIWYmJmU8PXRoaXMuX2NvcmUubWluaW11bSghMCkpLHRoaXMuX2NvbnRyb2xzLiRuZXh0LnRvZ2dsZUNsYXNzKFwiZGlzYWJsZWRcIiwhZiYmZT49dGhpcy5fY29yZS5tYXhpbXVtKCEwKSkpLHRoaXMuX2NvbnRyb2xzLiRhYnNvbHV0ZS50b2dnbGVDbGFzcyhcImRpc2FibGVkXCIsIWMuZG90c3x8ZCksYy5kb3RzJiYoYj10aGlzLl9wYWdlcy5sZW5ndGgtdGhpcy5fY29udHJvbHMuJGFic29sdXRlLmNoaWxkcmVuKCkubGVuZ3RoLGMuZG90c0RhdGEmJjAhPT1iP3RoaXMuX2NvbnRyb2xzLiRhYnNvbHV0ZS5odG1sKHRoaXMuX3RlbXBsYXRlcy5qb2luKFwiXCIpKTpiPjA/dGhpcy5fY29udHJvbHMuJGFic29sdXRlLmFwcGVuZChuZXcgQXJyYXkoYisxKS5qb2luKHRoaXMuX3RlbXBsYXRlc1swXSkpOmI8MCYmdGhpcy5fY29udHJvbHMuJGFic29sdXRlLmNoaWxkcmVuKCkuc2xpY2UoYikucmVtb3ZlKCksdGhpcy5fY29udHJvbHMuJGFic29sdXRlLmZpbmQoXCIuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLHRoaXMuX2NvbnRyb2xzLiRhYnNvbHV0ZS5jaGlsZHJlbigpLmVxKGEuaW5BcnJheSh0aGlzLmN1cnJlbnQoKSx0aGlzLl9wYWdlcykpLmFkZENsYXNzKFwiYWN0aXZlXCIpKX0sZS5wcm90b3R5cGUub25UcmlnZ2VyPWZ1bmN0aW9uKGIpe3ZhciBjPXRoaXMuX2NvcmUuc2V0dGluZ3M7Yi5wYWdlPXtpbmRleDphLmluQXJyYXkodGhpcy5jdXJyZW50KCksdGhpcy5fcGFnZXMpLGNvdW50OnRoaXMuX3BhZ2VzLmxlbmd0aCxzaXplOmMmJihjLmNlbnRlcnx8Yy5hdXRvV2lkdGh8fGMuZG90c0RhdGE/MTpjLmRvdHNFYWNofHxjLml0ZW1zKX19LGUucHJvdG90eXBlLmN1cnJlbnQ9ZnVuY3Rpb24oKXt2YXIgYj10aGlzLl9jb3JlLnJlbGF0aXZlKHRoaXMuX2NvcmUuY3VycmVudCgpKTtyZXR1cm4gYS5ncmVwKHRoaXMuX3BhZ2VzLGEucHJveHkoZnVuY3Rpb24oYSxjKXtyZXR1cm4gYS5zdGFydDw9YiYmYS5lbmQ+PWJ9LHRoaXMpKS5wb3AoKX0sZS5wcm90b3R5cGUuZ2V0UG9zaXRpb249ZnVuY3Rpb24oYil7dmFyIGMsZCxlPXRoaXMuX2NvcmUuc2V0dGluZ3M7cmV0dXJuXCJwYWdlXCI9PWUuc2xpZGVCeT8oYz1hLmluQXJyYXkodGhpcy5jdXJyZW50KCksdGhpcy5fcGFnZXMpLGQ9dGhpcy5fcGFnZXMubGVuZ3RoLGI/KytjOi0tYyxjPXRoaXMuX3BhZ2VzWyhjJWQrZCklZF0uc3RhcnQpOihjPXRoaXMuX2NvcmUucmVsYXRpdmUodGhpcy5fY29yZS5jdXJyZW50KCkpLGQ9dGhpcy5fY29yZS5pdGVtcygpLmxlbmd0aCxiP2MrPWUuc2xpZGVCeTpjLT1lLnNsaWRlQnkpLGN9LGUucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oYil7YS5wcm94eSh0aGlzLl9vdmVycmlkZXMudG8sdGhpcy5fY29yZSkodGhpcy5nZXRQb3NpdGlvbighMCksYil9LGUucHJvdG90eXBlLnByZXY9ZnVuY3Rpb24oYil7YS5wcm94eSh0aGlzLl9vdmVycmlkZXMudG8sdGhpcy5fY29yZSkodGhpcy5nZXRQb3NpdGlvbighMSksYil9LGUucHJvdG90eXBlLnRvPWZ1bmN0aW9uKGIsYyxkKXt2YXIgZTshZCYmdGhpcy5fcGFnZXMubGVuZ3RoPyhlPXRoaXMuX3BhZ2VzLmxlbmd0aCxhLnByb3h5KHRoaXMuX292ZXJyaWRlcy50byx0aGlzLl9jb3JlKSh0aGlzLl9wYWdlc1soYiVlK2UpJWVdLnN0YXJ0LGMpKTphLnByb3h5KHRoaXMuX292ZXJyaWRlcy50byx0aGlzLl9jb3JlKShiLGMpfSxhLmZuLm93bENhcm91c2VsLkNvbnN0cnVjdG9yLlBsdWdpbnMuTmF2aWdhdGlvbj1lfSh3aW5kb3cuWmVwdG98fHdpbmRvdy5qUXVlcnksd2luZG93LGRvY3VtZW50KSxmdW5jdGlvbihhLGIsYyxkKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1mdW5jdGlvbihjKXt0aGlzLl9jb3JlPWMsdGhpcy5faGFzaGVzPXt9LHRoaXMuJGVsZW1lbnQ9dGhpcy5fY29yZS4kZWxlbWVudCx0aGlzLl9oYW5kbGVycz17XCJpbml0aWFsaXplZC5vd2wuY2Fyb3VzZWxcIjphLnByb3h5KGZ1bmN0aW9uKGMpe2MubmFtZXNwYWNlJiZcIlVSTEhhc2hcIj09PXRoaXMuX2NvcmUuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiYmYShiKS50cmlnZ2VyKFwiaGFzaGNoYW5nZS5vd2wubmF2aWdhdGlvblwiKX0sdGhpcyksXCJwcmVwYXJlZC5vd2wuY2Fyb3VzZWxcIjphLnByb3h5KGZ1bmN0aW9uKGIpe2lmKGIubmFtZXNwYWNlKXt2YXIgYz1hKGIuY29udGVudCkuZmluZChcIltkYXRhLWhhc2hdXCIpLmFkZEJhY2soXCJbZGF0YS1oYXNoXVwiKS5hdHRyKFwiZGF0YS1oYXNoXCIpO2lmKCFjKXJldHVybjt0aGlzLl9oYXNoZXNbY109Yi5jb250ZW50fX0sdGhpcyksXCJjaGFuZ2VkLm93bC5jYXJvdXNlbFwiOmEucHJveHkoZnVuY3Rpb24oYyl7aWYoYy5uYW1lc3BhY2UmJlwicG9zaXRpb25cIj09PWMucHJvcGVydHkubmFtZSl7dmFyIGQ9dGhpcy5fY29yZS5pdGVtcyh0aGlzLl9jb3JlLnJlbGF0aXZlKHRoaXMuX2NvcmUuY3VycmVudCgpKSksZT1hLm1hcCh0aGlzLl9oYXNoZXMsZnVuY3Rpb24oYSxiKXtyZXR1cm4gYT09PWQ/YjpudWxsfSkuam9pbigpO2lmKCFlfHxiLmxvY2F0aW9uLmhhc2guc2xpY2UoMSk9PT1lKXJldHVybjtiLmxvY2F0aW9uLmhhc2g9ZX19LHRoaXMpfSx0aGlzLl9jb3JlLm9wdGlvbnM9YS5leHRlbmQoe30sZS5EZWZhdWx0cyx0aGlzLl9jb3JlLm9wdGlvbnMpLHRoaXMuJGVsZW1lbnQub24odGhpcy5faGFuZGxlcnMpLGEoYikub24oXCJoYXNoY2hhbmdlLm93bC5uYXZpZ2F0aW9uXCIsYS5wcm94eShmdW5jdGlvbihhKXt2YXIgYz1iLmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpLGU9dGhpcy5fY29yZS4kc3RhZ2UuY2hpbGRyZW4oKSxmPXRoaXMuX2hhc2hlc1tjXSYmZS5pbmRleCh0aGlzLl9oYXNoZXNbY10pO2YhPT1kJiZmIT09dGhpcy5fY29yZS5jdXJyZW50KCkmJnRoaXMuX2NvcmUudG8odGhpcy5fY29yZS5yZWxhdGl2ZShmKSwhMSwhMCl9LHRoaXMpKX07ZS5EZWZhdWx0cz17VVJMaGFzaExpc3RlbmVyOiExfSxlLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIGMsZDthKGIpLm9mZihcImhhc2hjaGFuZ2Uub3dsLm5hdmlnYXRpb25cIik7Zm9yKGMgaW4gdGhpcy5faGFuZGxlcnMpdGhpcy5fY29yZS4kZWxlbWVudC5vZmYoYyx0aGlzLl9oYW5kbGVyc1tjXSk7Zm9yKGQgaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykpXCJmdW5jdGlvblwiIT10eXBlb2YgdGhpc1tkXSYmKHRoaXNbZF09bnVsbCl9LGEuZm4ub3dsQ2Fyb3VzZWwuQ29uc3RydWN0b3IuUGx1Z2lucy5IYXNoPWV9KHdpbmRvdy5aZXB0b3x8d2luZG93LmpRdWVyeSx3aW5kb3csZG9jdW1lbnQpLGZ1bmN0aW9uKGEsYixjLGQpe2Z1bmN0aW9uIGUoYixjKXt2YXIgZT0hMSxmPWIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrYi5zbGljZSgxKTtyZXR1cm4gYS5lYWNoKChiK1wiIFwiK2guam9pbihmK1wiIFwiKStmKS5zcGxpdChcIiBcIiksZnVuY3Rpb24oYSxiKXtpZihnW2JdIT09ZClyZXR1cm4gZT0hY3x8YiwhMX0pLGV9ZnVuY3Rpb24gZihhKXtyZXR1cm4gZShhLCEwKX12YXIgZz1hKFwiPHN1cHBvcnQ+XCIpLmdldCgwKS5zdHlsZSxoPVwiV2Via2l0IE1veiBPIG1zXCIuc3BsaXQoXCIgXCIpLGk9e3RyYW5zaXRpb246e2VuZDp7V2Via2l0VHJhbnNpdGlvbjpcIndlYmtpdFRyYW5zaXRpb25FbmRcIixNb3pUcmFuc2l0aW9uOlwidHJhbnNpdGlvbmVuZFwiLE9UcmFuc2l0aW9uOlwib1RyYW5zaXRpb25FbmRcIix0cmFuc2l0aW9uOlwidHJhbnNpdGlvbmVuZFwifX0sYW5pbWF0aW9uOntlbmQ6e1dlYmtpdEFuaW1hdGlvbjpcIndlYmtpdEFuaW1hdGlvbkVuZFwiLE1vekFuaW1hdGlvbjpcImFuaW1hdGlvbmVuZFwiLE9BbmltYXRpb246XCJvQW5pbWF0aW9uRW5kXCIsYW5pbWF0aW9uOlwiYW5pbWF0aW9uZW5kXCJ9fX0saj17Y3NzdHJhbnNmb3JtczpmdW5jdGlvbigpe3JldHVybiEhZShcInRyYW5zZm9ybVwiKX0sY3NzdHJhbnNmb3JtczNkOmZ1bmN0aW9uKCl7cmV0dXJuISFlKFwicGVyc3BlY3RpdmVcIil9LGNzc3RyYW5zaXRpb25zOmZ1bmN0aW9uKCl7cmV0dXJuISFlKFwidHJhbnNpdGlvblwiKX0sY3NzYW5pbWF0aW9uczpmdW5jdGlvbigpe3JldHVybiEhZShcImFuaW1hdGlvblwiKX19O2ouY3NzdHJhbnNpdGlvbnMoKSYmKGEuc3VwcG9ydC50cmFuc2l0aW9uPW5ldyBTdHJpbmcoZihcInRyYW5zaXRpb25cIikpLGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZD1pLnRyYW5zaXRpb24uZW5kW2Euc3VwcG9ydC50cmFuc2l0aW9uXSksai5jc3NhbmltYXRpb25zKCkmJihhLnN1cHBvcnQuYW5pbWF0aW9uPW5ldyBTdHJpbmcoZihcImFuaW1hdGlvblwiKSksYS5zdXBwb3J0LmFuaW1hdGlvbi5lbmQ9aS5hbmltYXRpb24uZW5kW2Euc3VwcG9ydC5hbmltYXRpb25dKSxqLmNzc3RyYW5zZm9ybXMoKSYmKGEuc3VwcG9ydC50cmFuc2Zvcm09bmV3IFN0cmluZyhmKFwidHJhbnNmb3JtXCIpKSxhLnN1cHBvcnQudHJhbnNmb3JtM2Q9ai5jc3N0cmFuc2Zvcm1zM2QoKSl9KHdpbmRvdy5aZXB0b3x8d2luZG93LmpRdWVyeSx3aW5kb3csZG9jdW1lbnQpOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO0FBQ3BDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2h3K0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMifQ==
