import { c as W, j as t, r as o, p as Z, b as ee, I as te, e as Y, f as re } from "./viewer-e2wgwl0s.js";
const X = (l) => l.map((h, b) => ({ ...h, readingOrder: b + 1 }));
function ae(l, h, b) {
  const i = W.createRoot(l), f = { current: !1 };
  return i.render(/* @__PURE__ */ t.jsx(ne, { layout: h, options: b, dirty: f })), { destroy: () => i.unmount(), isDirty: () => f.current };
}
function ne({ layout: l, options: h, dirty: b }) {
  const [i, f] = o.useState(X(l.lines)), [x, A] = o.useState(l.reading_direction || "auto"), [m, u] = o.useState(null), [k, D] = o.useState([]), [C, M] = o.useState([]), [v, K] = o.useState(!1), [j, N] = o.useState(null), [s, U] = o.useState(!1), [E, y] = o.useState(""), O = o.useRef(null), w = o.useRef(!0), $ = o.useRef(null);
  o.useEffect(() => (w.current = !0, $.current?.focus({ preventScroll: !0 }), () => {
    w.current = !1;
  }), []);
  const a = i.find((e) => e.id === m), g = Z(i.length ? i : l.lines), S = re(g, x), B = g === "vertical" ? S === "rtl" ? "ArrowRight" : "ArrowLeft" : "ArrowUp", z = g === "vertical" ? S === "rtl" ? "ArrowLeft" : "ArrowRight" : "ArrowDown", R = () => ({ lines: i, direction: x });
  function p(e, r = x) {
    s || (D((n) => [...n.slice(-29), R()]), M([]), f(X(e)), A(r), b.current = !0, y(""));
  }
  function _(e) {
    const r = e ? k : C, n = r.at(-1);
    !n || s || (e ? (M((c) => [...c, R()]), D(k.slice(0, -1))) : (D((c) => [...c, R()]), M(C.slice(0, -1))), f(n.lines), A(n.direction), b.current = !0);
  }
  function H(e) {
    u(i.find((r) => r.readingOrder === e)?.id || null);
  }
  function P(e) {
    const r = i.findIndex((d) => d.id === m);
    if (r < 0 || e < 0 || e >= i.length || r === e || s) return;
    const n = [...i], [c] = n.splice(r, 1);
    n.splice(e, 0, c), p(n);
  }
  function I(e) {
    P(i.findIndex((r) => r.id === m) + e);
  }
  function F(e, r) {
    p(i.map((n) => n.readingOrder === e ? { ...n, ...r, direction: Y(r), raw: void 0 } : n));
  }
  function L(e) {
    p(i.filter((r) => r.readingOrder !== e)), u(null);
  }
  function V(e) {
    if (i.length >= 500) {
      y("行枠は500件まで追加できます。");
      return;
    }
    const r = {
      ...e,
      id: crypto.randomUUID(),
      classId: 1,
      confidence: 0,
      readingOrder: i.length + 1,
      direction: Y(e)
    };
    p([...i, r]), u(r.id), K(!1), N(null);
  }
  function q() {
    const e = O.current?.getVisibleImageBounds() || { x: 0, y: 0, width: l.width, height: l.height }, r = Math.max(4, Math.min(l.width, Math.round(e.width * (g === "vertical" ? 0.12 : 0.7)))), n = Math.max(4, Math.min(l.height, Math.round(e.height * (g === "vertical" ? 0.7 : 0.12))));
    V({
      x: Math.round(Math.max(0, Math.min(l.width - r, e.x + (e.width - r) / 2))),
      y: Math.round(Math.max(0, Math.min(l.height - n, e.y + (e.height - n) / 2))),
      width: r,
      height: n
    });
  }
  async function G() {
    if (!(!i.length || s)) {
      U(!0), y("");
      try {
        await h.onSubmit({
          id: l.id,
          base_revision: l.revision,
          reading_direction: x,
          lines: i.map(({ id: e, x: r, y: n, width: c, height: d }) => ({ id: e, x: r, y: n, width: c, height: d }))
        });
      } catch (e) {
        w.current && y(e.message);
      } finally {
        w.current && U(!1);
      }
    }
  }
  return /* @__PURE__ */ t.jsxs("section", { ref: $, tabIndex: -1, className: "kobun-public-layout", "aria-label": "自分用のレイアウト調整", "aria-busy": s, onKeyDown: (e) => {
    if (!e.target.closest("input,textarea,select")) {
      if ((e.key === "Delete" || e.key === "Backspace") && a && !s) {
        e.preventDefault(), L(a.readingOrder);
        return;
      }
      (e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "z" ? (e.preventDefault(), _(!e.shiftKey)) : e.key.toLowerCase() === "y" && (e.preventDefault(), _(!1)));
    }
  }, children: [
    /* @__PURE__ */ t.jsx("p", { className: "kobun-public-layout__notice", children: "自分用の未確認の翻刻を作り直します。他の訪問者の結果には反映されません。" }),
    /* @__PURE__ */ t.jsxs("div", { className: "kobun-public-layout__toolbar", children: [
      /* @__PURE__ */ t.jsxs("label", { children: [
        "読み方向",
        /* @__PURE__ */ t.jsxs(
          "select",
          {
            "aria-label": "レイアウトの読み方向",
            value: x,
            disabled: s,
            onChange: (e) => {
              const r = e.target.value;
              p(ee(i, g, r), r);
            },
            children: [
              /* @__PURE__ */ t.jsx("option", { value: "auto", children: "自動（縦: 右→左／横: 左→右）" }),
              /* @__PURE__ */ t.jsx("option", { value: "ltr", children: "左から右" }),
              /* @__PURE__ */ t.jsx("option", { value: "rtl", children: "右から左" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ t.jsx("button", { type: "button", disabled: !k.length || s, onClick: () => _(!0), children: "元に戻す" }),
      /* @__PURE__ */ t.jsx("button", { type: "button", disabled: !C.length || s, onClick: () => _(!1), children: "やり直す" })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "kobun-public-layout__viewer viewer-wrap", children: /* @__PURE__ */ t.jsx(
      te,
      {
        ref: O,
        dataUrl: h.imageUrl,
        lines: i,
        regions: [],
        showOverlays: !0,
        selectedOrder: a?.readingOrder ?? null,
        editable: !s,
        onSelectLine: H,
        onUpdateLine: F,
        onDeleteLine: L,
        regionMode: v && !s,
        selectedRegion: j,
        onRegionDraw: N
      }
    ) }),
    /* @__PURE__ */ t.jsxs("div", { className: "kobun-public-layout__toolbar", children: [
      /* @__PURE__ */ t.jsx("button", { type: "button", "aria-pressed": v, disabled: s || i.length >= 500, onClick: () => {
        K(!v), N(null), u(null);
      }, children: "枠を描く" }),
      v && /* @__PURE__ */ t.jsx("button", { type: "button", disabled: !j || s, onClick: () => j && V(j), children: "描いた枠を追加" }),
      /* @__PURE__ */ t.jsx("button", { type: "button", disabled: !a || s, onClick: () => a && L(a.readingOrder), children: "選択した行を削除" })
    ] }),
    /* @__PURE__ */ t.jsx("p", { className: "kobun-public-layout__hint", children: "行枠を選んで移動・サイズ変更できます。行一覧ではドラッグ、矢印キー、前後ボタンで順番を変えられます。" }),
    !i.length && /* @__PURE__ */ t.jsx("p", { className: "kobun-public-layout__hint", children: "行枠がありません。「枠を描く」か「行枠の詳しい調整」から追加してください。" }),
    /* @__PURE__ */ t.jsx("ol", { className: `kobun-public-layout__order is-${g} reading-${S}`, "aria-label": "行の読み順", onKeyDown: (e) => {
      (e.key === B || e.key === z) && (e.preventDefault(), I(e.key === B ? -1 : 1));
    }, children: i.map((e, r) => /* @__PURE__ */ t.jsx("li", { children: /* @__PURE__ */ t.jsxs(
      "button",
      {
        type: "button",
        disabled: s,
        draggable: !s,
        className: m === e.id ? "is-selected" : "",
        "aria-pressed": m === e.id,
        "aria-label": `行 ${r + 1} を選択`,
        onClick: () => {
          u(e.id), O.current?.scrollToLine(e.readingOrder);
        },
        onFocus: () => u(e.id),
        onDragStart: (n) => {
          u(e.id), n.dataTransfer.setData("text/plain", e.id);
        },
        onDragOver: (n) => n.preventDefault(),
        onDrop: (n) => {
          n.preventDefault();
          const c = n.dataTransfer.getData("text/plain"), d = i.findIndex((Q) => Q.id === c);
          if (d < 0 || d === r) return;
          const T = [...i], [J] = T.splice(d, 1);
          T.splice(r, 0, J), p(T), u(c);
        },
        children: [
          /* @__PURE__ */ t.jsx("b", { children: r + 1 }),
          /* @__PURE__ */ t.jsx("span", { children: e.raw || "（未認識）" })
        ]
      }
    ) }, e.id)) }),
    /* @__PURE__ */ t.jsxs("div", { className: "kobun-public-layout__toolbar", children: [
      /* @__PURE__ */ t.jsx("button", { type: "button", disabled: !a || a.readingOrder === 1 || s, onClick: () => I(-1), children: "選択行を前へ" }),
      /* @__PURE__ */ t.jsx("button", { type: "button", disabled: !a || a.readingOrder === i.length || s, onClick: () => I(1), children: "選択行を後ろへ" }),
      /* @__PURE__ */ t.jsxs("span", { children: [
        i.length,
        "行",
        a ? ` · 行 ${a.readingOrder} を選択中` : ""
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("details", { children: [
      /* @__PURE__ */ t.jsx("summary", { children: "行枠の詳しい調整" }),
      /* @__PURE__ */ t.jsx("p", { className: "kobun-public-layout__hint", children: "座標と大きさを数値でも変更できます。" }),
      /* @__PURE__ */ t.jsx("button", { type: "button", disabled: s || i.length >= 500, onClick: q, children: "中央に行を追加" }),
      a && /* @__PURE__ */ t.jsx("div", { className: "kobun-public-layout__coordinates", children: ["x", "y", "width", "height"].map((e, r) => /* @__PURE__ */ t.jsxs("label", { children: [
        ["X座標", "Y座標", "幅", "高さ"][r],
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "number",
            "aria-label": ["行枠のX座標", "行枠のY座標", "行枠の幅", "行枠の高さ"][r],
            defaultValue: Math.round(a[e]),
            min: r < 2 ? 0 : 4,
            disabled: s,
            onChange: () => {
              b.current = !0;
            },
            onKeyDown: (n) => {
              n.key === "Enter" && (n.preventDefault(), n.currentTarget.blur());
            },
            onBlur: (n) => {
              if (!Number.isFinite(n.currentTarget.valueAsNumber)) {
                n.currentTarget.value = String(Math.round(a[e]));
                return;
              }
              const c = e === "x" ? l.width - a.width : e === "y" ? l.height - a.height : e === "width" ? l.width - a.x : l.height - a.y, d = Math.max(r < 2 ? 0 : 4, Math.min(c, Math.round(n.currentTarget.valueAsNumber)));
              if (d === a[e]) {
                n.currentTarget.value = String(d);
                return;
              }
              F(a.readingOrder, { x: a.x, y: a.y, width: a.width, height: a.height, [e]: d });
            }
          },
          `${a.id}-${e}-${Math.round(a[e])}`
        )
      ] }, e)) })
    ] }),
    E && /* @__PURE__ */ t.jsx("p", { role: "alert", className: "kobun-public-layout__error", children: E }),
    /* @__PURE__ */ t.jsxs("p", { className: "kobun-public-layout__credit", children: [
      "編集UI: ",
      /* @__PURE__ */ t.jsx("a", { href: "https://github.com/yuta1984/honkoku-ocr-web", target: "_blank", rel: "noopener noreferrer", children: "みんなで翻刻OCR" }),
      "（橋本雄太、",
      /* @__PURE__ */ t.jsx("a", { href: "https://creativecommons.org/licenses/by/4.0/", target: "_blank", rel: "noopener noreferrer", children: "CC BY 4.0" }),
      "）を改変。"
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "kobun-public-layout__actions", children: [
      /* @__PURE__ */ t.jsx("button", { type: "button", className: "is-primary", disabled: s || !i.length, onClick: () => {
        G();
      }, children: s ? "再認識を開始しています…" : "このレイアウトで翻刻する" }),
      /* @__PURE__ */ t.jsx("button", { type: "button", disabled: s, onClick: h.onCancel, children: "結果に戻る" })
    ] })
  ] });
}
export {
  ae as mountPublicLayout
};
