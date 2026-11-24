import { c as fn, j as e, r as o, p as vn, I as kn, d as at, a as st, l as rt, b as wn, e as Jt, f as yn } from "./viewer-CliHQYVE.js";
import { llmState as Xt, subscribeLlm as _n, providerNames as lt, mountLlmSettings as Nn, confirmCommercial as Cn, translateCommercial as Sn } from "./llm.js";
const D = document.getElementById("kobun-workspace"), c = D.dataset.canManage === "1", L = D.dataset.canEditTranscription === "1", Ln = D.dataset.transcriptionScope === "all" ? "all" : "owned", qt = (a) => `${D.dataset.proxy}?endpoint=${encodeURIComponent(a)}`;
async function ct(a) {
  if (!a.headers.get("content-type")?.includes("json")) throw new Error("ログイン状態と接続を確認し、ページを再読み込みしてください。");
  const m = await a.json();
  if (!a.ok) throw new Error(m.error || `通信に失敗しました (${a.status})`);
  return m;
}
async function v(a, m = "GET", b) {
  return ct(await fetch(qt(a), {
    method: m,
    credentials: "same-origin",
    cache: "no-store",
    headers: { "Content-Type": "application/json", "X-Kobun-CSRF": D.dataset.csrf },
    body: b === void 0 ? void 0 : JSON.stringify(b)
  }));
}
const fe = [
  { id: "source", title: "資料・ページ", description: "対象資料を選び、その資料の画像ページを選びます。" },
  { id: "layout", title: "レイアウト調整", description: "行の枠と読み順を確認してから、文字を認識します。" },
  { id: "transcription", title: "翻刻確認", description: "画像と照らし合わせ、認識した文字を直します。" },
  { id: "translation", title: "現代語訳（任意）", description: "必要に応じて翻訳する範囲と本文を確認し、訳文を作ります。" },
  { id: "publication", title: "確認・公開", description: "責任表示と権利情報を確認し、公開状態を変更します。" }
], z = (a) => ["queued", "running"].includes(a?.job?.status || ""), $n = (a) => a.publication_state === "reviewed" || a.publication_state === "published" || a.transcription_credit || a.review_note || Object.keys(a.transcription_metadata || {}).length > 0 ? "publication" : a.translation || a.translation_draft ? "translation" : a.lines.length && a.lines.every((m) => m.raw !== void 0) ? "transcription" : "layout", On = (a) => a.map((m, b) => ({ ...m, readingOrder: b + 1 })), ke = { layout: "レイアウト認識", recognize: "文字認識", translate: "現代語訳", queued: "処理待ち", running: "処理中", human_edit: "レイアウトの手動修正", transcription_edit: "翻刻の修正", image_saved: "画像の保存", translation_input_edit: "翻訳用本文の編集", translation_manual: "現代語訳の入力・修正", translation_commercial: "商用LLMの現代語訳を取り込み", translation_delete: "現代語訳の削除", publication_draft: "下書きへ変更", publication_reviewed: "確認済みへ変更", publication_published: "公開", publication_metadata: "責任表示・研究成果情報の変更", interrupted: "中断", error: "処理失敗" }, Wt = { draft: "下書き", reviewed: "確認済み", published: "公開中" };
function Kt(a) {
  return (!a.status || ["image", "image_saved"].includes(a.status)) && (!a.publication_state || a.publication_state === "draft") && !a.job && a.lines.length === 0 && a.regions.length === 0 && !a.translation && !a.translation_draft && !a.transcription_credit?.trim() && !a.review_note?.trim() && !Object.values(a.transcription_metadata || {}).some((m) => m?.trim()) && Object.keys(a.provenance || {}).length === 0;
}
function Rn(a) {
  return [
    a.started ? `${a.started}ページ着手済み` : "",
    a.imageOnly ? `画像読込のみ ${a.imageOnly}ページ` : ""
  ].filter(Boolean).join("・");
}
function Tn(a) {
  if (!a) return { label: "未着手" };
  if (Kt(a)) return { label: "画像読込のみ" };
  const m = a.lines.length > 0 && a.lines.every((g) => g.raw !== void 0);
  let b = a.publication_state === "published" ? "公開中" : a.publication_state === "reviewed" ? "確認済み" : m ? a.transcription_credit?.trim() || a.review_note?.trim() ? "確認・公開" : a.translation || a.translation_draft ? "現代語訳" : "翻刻確認" : "レイアウト調整";
  return z(a) ? (b = a.job?.operation === "translate" ? "現代語訳" : "レイアウト調整", { label: b, detail: `${ke[a.job.operation] || "処理"}${a.job.status === "queued" ? "待ち" : "中"}` }) : { label: b, ...a.job?.status === "error" ? { detail: `${ke[a.job.operation] || "処理"}に失敗` } : {} };
}
function A(a) {
  return Object.fromEntries(Object.entries(a).flatMap(([m, b]) => {
    const g = typeof b == "string" ? b.trim() : "";
    return g ? [[m, g]] : [];
  }));
}
function ve(a) {
  const m = a.replace(/\r\n?/g, `
`).split(`
`).map((b) => b.replace(/[ \t]+$/u, ""));
  for (; m.length && m.at(-1) === ""; ) m.pop();
  return m;
}
function Dn(a) {
  const m = ve(a), b = [];
  let g = null;
  const F = /^[［\[]\s*[一二三四五六七八九十百〇零0-9０-９]+\s*(?:オ|ウ|表|裏)\s*[］\]]$/u;
  for (const V of m)
    F.test(V.trim()) ? (g?.lines.length && b.push(g), g = { label: V.trim(), lines: [] }) : g && g.lines.push(V);
  return g?.lines.length && b.push(g), b.length ? b : [{ label: "テキスト全体", lines: m }];
}
function ot(a, m, b = "text/plain;charset=utf-8") {
  const g = URL.createObjectURL(new Blob([m], { type: b })), F = document.createElement("a");
  F.href = g, F.download = a, F.click(), setTimeout(() => URL.revokeObjectURL(g), 1e3);
}
function En() {
  const a = o.useRef(null);
  return o.useEffect(() => Nn(a.current), []), /* @__PURE__ */ e.jsx("div", { ref: a });
}
function In() {
  const a = new URLSearchParams(location.search), [m, b] = o.useState(a.get("identifier") || ""), [g, F] = o.useState(""), [V, zt] = o.useState(""), [B, Vt] = o.useState([]), [ae, Ht] = o.useState(1), [we, Yt] = o.useState(0), [dt, Be] = o.useState([]), [i, ye] = o.useState(null), Je = o.useRef(null), [d, $] = o.useState("source"), [u, H] = o.useState([]), [J, ut] = o.useState("auto"), [_, N] = o.useState(null), [E, Y] = o.useState(!1), [X, se] = o.useState([]), [G, re] = o.useState([]), [Gt, ht] = o.useState(!1), [mt, S] = o.useState(""), [I, Qt] = o.useState(null), [_e, Ne] = o.useState(!1), [le, Ce] = o.useState(null), [pt, Zt] = o.useState(!0), [oe, bt] = o.useState(1), [ce, xt] = o.useState(1), [O, Se] = o.useState(""), [M, de] = o.useState(!1), [ue, Q] = o.useState(""), [he, Z] = o.useState(!1), [ee, te] = o.useState(!1), [U, w] = o.useState("input"), [ne, en] = o.useState(Xt), [y, Le] = o.useState(null), [$e, gt] = o.useState(!1), Oe = o.useRef(null), [Xe, We] = o.useState(!1), [Re, qe] = o.useState(null), [me, jt] = o.useState(""), [W, ft] = o.useState(""), [p, x] = o.useState({}), [tn, vt] = o.useState(!1), [Te, kt] = o.useState([]), [De, wt] = o.useState([]), [pe, Ke] = o.useState(""), [ze, yt] = o.useState([]), [_t, Nt] = o.useState([]), [Ct, St] = o.useState(""), Ve = o.useRef(null), r = Gt || z(i), be = E || M || he, nn = !!i && c && (me !== (i.review_note || "") || W !== (i.transcription_credit || "") || JSON.stringify(A(p)) !== JSON.stringify(A(i.transcription_metadata || {}))), ie = be || nn, He = u.slice(oe - 1, ce).map((t) => t.id), xe = !!u.length && u.every((t) => t.raw !== void 0), j = !E && !M ? i?.translation : null, Ee = fe.findIndex((t) => t.id === d), C = vn(u), Lt = C === "vertical", Ie = yn(C, J), Me = Lt ? Ie === "rtl" ? "ArrowRight" : "ArrowLeft" : "ArrowUp", Ye = Lt ? Ie === "rtl" ? "ArrowLeft" : "ArrowRight" : "ArrowDown", Ue = Me === "ArrowRight" ? "→" : Me === "ArrowLeft" ? "←" : "↑", Pe = Ye === "ArrowRight" ? "→" : Ye === "ArrowLeft" ? "←" : "↓", Ge = new Map(dt.map((t) => [t.source.media_id, t]));
  i && Ge.set(i.source.media_id, i);
  const Qe = Array.from(Array.from(Ge.values()).reduce((t, n) => {
    const s = n.source.item_id, l = t.get(s) || {
      id: s,
      title: n.source.item_title,
      identifier: n.source.item_identifier || "",
      started: 0,
      imageOnly: 0
    };
    return Kt(n) ? l.imageOnly += 1 : l.started += 1, t.set(s, l), t;
  }, /* @__PURE__ */ new Map()).values()), Ae = B[0]?.item_id ?? i?.source.item_id ?? 0;
  function P(t, n = !1) {
    Je.current = t.id, ye(t), H(t.lines), Y(!1), se([]), re([]), Be((h) => h.some((f) => f.id === t.id) ? h.map((f) => f.id === t.id ? t : f) : [...h, t]), ut(t.reading_direction || "auto"), Ce(null), Ne(!1), qe(null), We(!1), de(!1), Q(t.translation?.text || ""), Z(!1), te(!1), Le(null), n || (jt(t.review_note || ""), ft(t.transcription_credit || ""), x(t.transcription_metadata || {}), vt(Object.keys(t.transcription_metadata || {}).length === 0)), Se(t.translation_draft?.text ?? t.translation?.input ?? t.lines.map((h) => h.raw || "").join(""));
    const s = t.translation_draft?.line_ids ?? t.translation?.line_ids, l = t.lines.flatMap((h, f) => !s || s.includes(h.id) ? [f + 1] : []);
    bt(l[0] || 1), xt(l.at(-1) || 1);
  }
  async function k(t) {
    ht(!0), S("");
    try {
      await t();
    } catch (n) {
      S(n.message);
    } finally {
      ht(!1);
    }
  }
  function $t() {
    return !ie || window.confirm("保存していない変更があります。破棄してページを移動しますか。");
  }
  async function q(t = 1, n, s, l) {
    r || t === 1 && !$t() || await k(async () => {
      const h = n ? `item_id=${encodeURIComponent(n)}` : `identifier=${encodeURIComponent(t === 1 ? m : g)}`, f = s ? `&media_id=${encodeURIComponent(s)}` : "", T = await ct(await fetch(`${D.dataset.pages}?${h}&page=${t}${f}`, { cache: "no-store" }));
      if (Vt(T.pages), zt(T.title), Ht(T.page || t), Yt(T.total), b(T.identifier), F(T.identifier), t === 1 && (Je.current = null, ye(null), H([]), Y(!1), de(!1), $("source")), s) {
        const Ft = T.pages.find((jn) => jn.media_id === Number(s));
        if (!Ft) throw new Error("指定画像が見つかりません。画像ページ一覧から選び直してください。");
        const Bt = await (l ?? v("documents"));
        Be(Bt), await Ot(Ft, Bt, !0);
      }
    });
  }
  async function Ot(t, n, s = !1) {
    const l = n.find((f) => f.source.media_id === t.media_id);
    if (!c && !l) throw new Error("このページには保存済みの作業がありません。管理者が作業を作成してから修正できます。");
    const h = l ? await v(`documents/${l.id}`) : await v("documents", "POST", { media_id: t.media_id });
    h.source.item_identifier = t.item_identifier, P(h), N(null), $(!c || s && h.lines.length > 0 && h.lines.every((f) => f.raw !== void 0) ? "transcription" : $n(h)), w(h.translation ? "result" : "input");
  }
  async function an(t) {
    r || !$t() || await k(async () => {
      await Ot(t, dt);
    });
  }
  o.useEffect(() => {
    const t = _n(() => en(Xt()));
    return () => {
      t(), Oe.current?.abort();
    };
  }, []), o.useEffect(() => {
    v("health").then(Qt).catch((n) => S(n.message));
    const t = v("documents");
    t.then(Be).catch(() => {
    }), a.get("item_id") ? q(1, a.get("item_id"), a.get("media_id") || void 0, t) : a.get("identifier") && q(1, void 0, a.get("media_id") || void 0, t);
  }, []), o.useEffect(() => {
    if (!i || !z(i)) return;
    const t = i.id;
    let n = !1, s;
    async function l() {
      try {
        const h = await v(`documents/${t}`);
        if (n || Je.current !== t) return;
        if (ye(h), S(""), !z(h)) {
          P(h), h.job?.status === "error" ? S(h.job.error || "処理に失敗しました。") : h.job?.operation === "recognize" ? $("transcription") : h.job?.operation === "translate" && ($("translation"), w("result"));
          return;
        }
      } catch (h) {
        n || S(`状態取得を再試行しています。${h.message}`);
      }
      n || (s = setTimeout(l, 1200));
    }
    return s = setTimeout(l, 1e3), () => {
      n = !0, clearTimeout(s);
    };
  }, [i?.id, i?.job?.id]), o.useEffect(() => {
    const t = (n) => {
      (ie || $e) && (n.preventDefault(), n.returnValue = "");
    };
    return window.addEventListener("beforeunload", t), () => window.removeEventListener("beforeunload", t);
  }, [ie, $e]), o.useEffect(() => {
    kt([]), wt([]), Ke(""), yt([]), Nt([]), St("");
  }, [i?.id]);
  function K(t) {
    r || d === "layout" && !c || d === "transcription" && !L || (se([...X.slice(-29), u]), re([]), H(On(t)), Y(!0), qe(null));
  }
  function Rt() {
    !X.length || r || (re([...G, u]), H(X[X.length - 1]), se(X.slice(0, -1)), Y(!0));
  }
  function Tt() {
    !G.length || r || (se([...X, u]), H(G[G.length - 1]), re(G.slice(0, -1)), Y(!0));
  }
  function sn(t, n) {
    d === "layout" && K(u.map((s) => s.readingOrder === t ? { ...s, ...n, direction: Jt(n), raw: void 0, machineRaw: void 0 } : s));
  }
  function Ze(t) {
    d === "layout" && (K(u.filter((n) => n.readingOrder !== t)), N(null));
  }
  function et(t) {
    const n = u.findIndex((l) => l.readingOrder === _);
    if (d !== "layout" || n < 0 || n + t < 0 || n + t >= u.length) return;
    const s = [...u];
    [s[n], s[n + t]] = [s[n + t], s[n]], K(s), N(n + t + 1);
  }
  function rn() {
    if (!i || !le) return;
    const t = {
      ...le,
      id: crypto.randomUUID(),
      confidence: 0,
      classId: 1,
      readingOrder: u.length + 1,
      direction: Jt(le)
    };
    K([...u, t]), N(t.readingOrder), Ne(!1), Ce(null);
  }
  function ln(t) {
    if (!c || d !== "layout" || t === J || u.some((s) => s.raw !== void 0) && !window.confirm("読み方向を変えると文字認識結果を解除します。保存済みの版は履歴に残ります。続けますか。")) return;
    const n = wn(u, C, t).map((s) => ({ ...s, raw: void 0, machineRaw: void 0 }));
    ut(t), K(n), N(null);
  }
  o.useEffect(() => {
    const t = (n) => {
      if (!(r || !["layout", "transcription"].includes(d) || n.target.closest("input,textarea,select,[contenteditable]"))) {
        if ((n.ctrlKey || n.metaKey) && n.key.toLowerCase() === "z") {
          n.preventDefault(), n.shiftKey ? Tt() : Rt();
          return;
        }
        d !== "layout" || _ === null || ((n.key === Me || n.key === Ye) && (n.preventDefault(), n.stopImmediatePropagation(), et(n.key === Me ? -1 : 1)), (n.key === "Delete" || n.key === "Backspace") && (n.preventDefault(), Ze(_)), n.key === "Escape" && N(null));
      }
    };
    return window.addEventListener("keydown", t, !0), () => window.removeEventListener("keydown", t, !0);
  });
  async function ge() {
    if (!i) throw new Error("ページを選択してください。");
    if (!E) return i;
    const t = d === "transcription" ? await v(`documents/${i.id}/transcription`, "PUT", {
      base_revision: i.revision,
      lines: u.map((n) => ({ id: n.id, raw: n.raw ?? "" }))
    }) : await v(`documents/${i.id}/layout`, "PUT", {
      base_revision: i.revision,
      lines: u,
      reading_direction: J
    });
    return P(t, !0), t;
  }
  async function je(t = !1) {
    const n = d === "translation" && he, s = ue;
    if (n && y && (y.input !== O || JSON.stringify(y.line_ids) !== JSON.stringify(He)))
      throw new Error("生成後に翻訳用本文または行の範囲が変わっています。本文を元に戻すか、入力をキャンセルしてから作り直してください。");
    let l = await ge();
    return d === "translation" && (M || t && !l.translation_draft) && (l = await v(`documents/${l.id}/translation-input`, "PUT", {
      base_revision: l.revision,
      text: O,
      line_ids: He
    }), P(l, !0)), n && (l = await v(`documents/${l.id}/translation`, "PUT", {
      base_revision: l.revision,
      text: s,
      input: l.translation_draft?.text ?? O,
      line_ids: l.translation_draft?.line_ids ?? He,
      ...y ? {
        method: "commercial",
        provider: y.provider,
        model: y.model,
        prompt_revision: y.prompt_revision,
        human_edited: s !== y.text
      } : {}
    }), P(l, !0)), c && (me !== (l.review_note || "") || W !== (l.transcription_credit || "") || JSON.stringify(A(p)) !== JSON.stringify(A(l.transcription_metadata || {}))) && (l = await v(`documents/${l.id}/review`, "PUT", {
      base_revision: l.revision,
      state: l.publication_state || "draft",
      note: me,
      credit: W,
      metadata: A(p)
    }), P(l)), l;
  }
  async function Dt(t) {
    if (!r) {
      if (d === "translation" && t !== "translation" && (M || he)) {
        if (!window.confirm("保存していない翻訳用本文または現代語訳の編集を破棄して移動しますか。")) return;
        Se(i?.translation_draft?.text ?? i?.translation?.input ?? u.map((n) => n.raw || "").join("")), de(!1), Q(i?.translation?.text || ""), Z(!1), te(!1);
      }
      E ? await k(async () => {
        await ge(), $(t), t === "translation" && w("input");
      }) : ($(t), t === "translation" && w("input")), Ne(!1), Ce(null);
    }
  }
  async function tt(t) {
    if (!i || r || !c) return;
    if (t === "translate" && ne.provider !== "local") {
      if (!Cn(O)) return;
      await k(async () => {
        const s = await je(!0), l = new AbortController();
        Oe.current = l, gt(!0), w("result");
        try {
          const h = await Sn(s.translation_draft.text, l.signal);
          Le({ ...h, line_ids: s.translation_draft.line_ids }), Q(h.text), Z(!0), te(!0);
        } finally {
          Oe.current = null, gt(!1);
        }
      });
      return;
    }
    const n = t === "layout" && u.length > 0;
    n && !window.confirm("レイアウトと翻刻を再認識結果に置き換えます。保存済みの版は履歴に残ります。続けますか。") || t === "recognize" && u.some((s) => s.raw) && !window.confirm("文字を再認識します。保存済みの翻刻は履歴に残ります。続けますか。") || await k(async () => {
      const s = t === "translate" ? await je(!0) : await ge();
      ye(await v(`documents/${s.id}/jobs`, "POST", {
        operation: t,
        base_revision: s.revision,
        force: n,
        line_ids: t === "translate" ? s.translation_draft?.line_ids : void 0
      })), t === "translate" && w("result");
    });
  }
  function nt(t, n) {
    if (!c || M && !window.confirm("翻訳用本文の編集を破棄し、選択した行から作り直しますか。")) return;
    const s = Math.min(t, n), l = Math.max(t, n);
    bt(s), xt(l), Se(u.slice(s - 1, l).map((h) => h.raw || "").join("")), de(!0), w("input");
  }
  function Et(t, n = Te) {
    const s = Array.from(new Set(t)).filter((l) => !!n[l]).sort((l, h) => l - h);
    wt(s), Ke(s.flatMap((l) => n[l].lines).join(`
`));
  }
  function on(t, n) {
    Et(n ? [...De, t] : De.filter((s) => s !== t));
  }
  async function cn(t) {
    if (t.size <= 0 || t.size > 1e7) {
      S("取込ファイルは10 MB以内にしてください。");
      return;
    }
    await k(async () => {
      let n, s = [], l = [];
      if (t.name.toLowerCase().endsWith(".docx")) {
        const h = new FormData();
        h.append("file", t);
        const f = await ct(await fetch(D.dataset.importUrl, {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
          headers: { "X-Kobun-CSRF": D.dataset.csrf },
          body: h
        }));
        n = f.sections, s = f.legend || [], l = f.notation || [], f.metadata && Object.keys(f.metadata).length && x((T) => ({ ...f.metadata, ...A(T) }));
      } else if (t.name.toLowerCase().endsWith(".txt") || t.type.startsWith("text/"))
        n = Dn(await t.text());
      else
        throw new Error("Word（.docx）またはテキスト（.txt）ファイルを選択してください。");
      if (!n.length) throw new Error("取込可能な翻刻本文が見つかりません。");
      kt(n), yt(s), Nt(l), St(`${t.name} · ${n.length}ページ候補`), Et([0], n);
    });
  }
  async function dn() {
    if (!i || r || !L) return;
    const t = ve(pe);
    if (t.length !== u.length) {
      S(`取込テキストは${t.length}行、画像のレイアウトは${u.length}行です。改行を調整して行数を一致させてください。`);
      return;
    }
    if (!t.some((n) => n.trim())) {
      S("翻刻を1文字以上入力してください。");
      return;
    }
    u.some((n) => n.raw?.trim()) && !window.confirm("現在の翻刻を取込テキストで置き換えます。保存済みの版は履歴に残ります。続けますか。") || (d === "layout" ? await k(async () => {
      const n = await ge();
      se([]), re([]), H(n.lines.map((s, l) => ({ ...s, raw: t[l] }))), Y(!0), $("transcription"), N(null);
    }) : K(u.map((n, s) => ({ ...n, raw: t[s] }))));
  }
  async function un() {
    !i?.translation || r || !c || window.confirm("この現代語訳を削除します。翻訳用本文と過去の履歴は残ります。よろしいですか。") && await k(async () => {
      const t = await v(`documents/${i.id}/translation`, "DELETE", { base_revision: i.revision });
      P(t, !0), w("input");
    });
  }
  function it() {
    !c || r || (Le(null), Q(i?.translation?.text || ""), Z(!1), te(!0), w("result"));
  }
  function hn() {
    Le(null), Q(i?.translation?.text || ""), Z(!1), te(!1), i?.translation || w("input");
  }
  async function mn() {
    if (!(!i || !c || r || !ue.trim())) {
      if (!he && i.translation) {
        te(!1);
        return;
      }
      await k(async () => {
        await je(!0), w("result");
      });
    }
  }
  async function pn() {
    i && await k(async () => {
      const t = await v(`documents/${i.id}/history`);
      ot(`${i.id}-record.json`, JSON.stringify({ document: i, history: t }, null, 2), "application/json");
    });
  }
  async function bn() {
    if (Xe) {
      We(!1);
      return;
    }
    We(!0), i && Re === null && await k(async () => qe(await v(`documents/${i.id}/history`)));
  }
  async function It() {
    !i || r || await k(async () => {
      await je(), $("publication");
    });
  }
  async function Fe(t) {
    !i || !c || r || be || await k(async () => P(await v(`documents/${i.id}/review`, "PUT", {
      base_revision: i.revision,
      state: t,
      note: me,
      credit: W,
      metadata: A(p)
    })));
  }
  const Mt = u.find((t) => t.readingOrder === _), Ut = !B.length || m !== g, R = i?.publication_state || "draft", Pt = Object.keys(A(p)).length, xn = d === "source" ? c ? Ut ? "資料を開く" : "一覧からページを選んでください" : B.length ? "左から画像ページを選んでください" : "上から対象資料を選んでください" : d === "layout" ? c ? u.length ? "調整を確定して文字認識" : "レイアウトを認識" : "レイアウトは閲覧のみ" : d === "transcription" ? E ? c ? "翻刻の修正を保存して次へ" : "翻刻の修正を保存" : c ? "翻刻を確定して訳文の準備へ" : "翻刻は保存されています" : d === "translation" ? U === "result" ? ee ? y ? "生成した現代語訳を保存" : "入力した現代語訳を保存" : j ? "確認・公開へ" : "現代語訳を入力" : c ? ne.provider === "local" ? "この本文を現代語訳" : `${lt[ne.provider]}でこの本文を現代語訳` : "現代語訳は実験機能です" : R === "draft" ? "確認済みにする" : R === "reviewed" ? "公開する" : "公開中", At = r || (d === "source" ? !m.trim() || !Ut : !i || (d === "layout" ? !c || !I?.ocr_ready : d === "transcription" ? !L || !xe || !u.some((t) => t.raw?.trim()) || !c && !E : d === "translation" ? U === "result" ? ee ? !c || !ue.trim() : !j : !c || !O.trim() || (ne.provider === "local" ? !I?.llm_ready : !ne.hasKey || !ne.model) : !c || !xe || !W.trim() || R === "published" || be));
  function gn() {
    d === "source" ? q() : d === "layout" ? tt(u.length ? "recognize" : "layout") : d === "transcription" ? k(async () => {
      await ge(), c && ($("translation"), w("input"));
    }) : d === "translation" ? U === "result" && ee ? mn() : U === "result" && j ? It() : tt("translate") : R === "draft" ? Fe("reviewed") : R === "reviewed" && Fe("published");
  }
  return /* @__PURE__ */ e.jsxs("section", { className: "kobun-app", "aria-label": "古典籍の実験ワークスペース", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "kobun-heading", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "kobun-material-picker", children: [
        /* @__PURE__ */ e.jsx("label", { htmlFor: "kobun-material", children: "対象資料" }),
        /* @__PURE__ */ e.jsxs("select", { id: "kobun-material", value: Ae || "", disabled: r || !Qe.length, onChange: (t) => t.target.value && void q(1, t.target.value), children: [
          /* @__PURE__ */ e.jsx("option", { value: "", children: "保存済み資料から選択" }),
          !!Ae && !Qe.some((t) => t.id === Ae) && /* @__PURE__ */ e.jsxs("option", { value: Ae, children: [
            V || i?.source.item_title,
            " — ",
            g || i?.source.item_identifier || "識別子なし",
            "（未着手）"
          ] }),
          Qe.map((t) => /* @__PURE__ */ e.jsxs("option", { value: t.id, children: [
            t.title,
            " — ",
            t.identifier || "識別子なし",
            "（",
            Rn(t),
            "）"
          ] }, t.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "kobun-utilities", children: [
        /* @__PURE__ */ e.jsx("span", { className: "kobun-muted", children: c ? "管理者 · 全工程を操作可能" : L ? `翻刻修正者 · ${Ln === "all" ? "閲覧可能な全資料" : "自分が所有する資料"}のみ` : "閲覧のみ" }),
        /* @__PURE__ */ e.jsx("span", { className: "kobun-muted", children: I ? `OCR ${I.ocr_ready ? "準備済み" : "未準備"} · 現代語訳 ${I.llm_ready ? "準備済み" : "未準備"}${I.llm_model ? ` · ${I.llm_model}` : ""}` : "接続を確認中" }),
        i && /* @__PURE__ */ e.jsx("span", { className: `kobun-publication is-${i.publication_state || "draft"}`, children: Wt[i.publication_state || "draft"] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("ol", { className: "kobun-steps", "aria-label": "作業の手順", children: fe.map((t, n) => /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsxs("button", { "aria-current": d === t.id ? "step" : void 0, disabled: r || n === 1 && !i || n > 1 && !xe, onClick: () => Dt(t.id), children: [
      /* @__PURE__ */ e.jsx("span", { children: n + 1 }),
      t.title
    ] }) }, t.id)) }),
    /* @__PURE__ */ e.jsx("div", { className: "kobun-record-toggle", children: /* @__PURE__ */ e.jsx(
      "button",
      {
        className: "kobun-link kobun-disclosure",
        "aria-expanded": Xe,
        "aria-controls": "kobun-work-history",
        disabled: !i || r,
        onClick: () => {
          bn();
        },
        children: "作業履歴"
      }
    ) }),
    mt && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "kobun-error", children: [
      mt,
      /* @__PURE__ */ e.jsx("button", { onClick: () => S(""), "aria-label": "メッセージを閉じる", children: "×" })
    ] }),
    Xe && i && /* @__PURE__ */ e.jsxs("div", { className: "kobun-record", id: "kobun-work-history", children: [
      /* @__PURE__ */ e.jsx("h3", { children: "作業履歴" }),
      /* @__PURE__ */ e.jsx("div", { className: "kobun-tools", children: /* @__PURE__ */ e.jsx("button", { disabled: r || ie, onClick: pn, children: "記録を保存 (.json)" }) }),
      Re === null ? /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "履歴を読み込んでいます…" }) : Re.length ? /* @__PURE__ */ e.jsx("ol", { id: "kobun-history-list", children: Re.map((t) => /* @__PURE__ */ e.jsxs("li", { children: [
        "版 ",
        t.document.revision,
        " · ",
        ke[t.event] || t.event,
        " · ",
        new Date(t.recorded_at * 1e3).toLocaleString("ja-JP"),
        t.actor ? ` · ${t.actor.name} (${t.actor.role})` : ""
      ] }, t.document.revision)) }) : /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "過去の版はありません。" }),
      /* @__PURE__ */ e.jsxs("details", { children: [
        /* @__PURE__ */ e.jsx("summary", { children: "画像・処理条件" }),
        /* @__PURE__ */ e.jsx("pre", { children: JSON.stringify({ source: i.source, image_sha256: i.image_sha256, metrics: i.last_metrics }, null, 2) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "kobun-stage-description", children: [
      /* @__PURE__ */ e.jsx("b", { children: fe[Ee].title }),
      /* @__PURE__ */ e.jsx("span", { children: fe[Ee].description })
    ] }),
    d === "source" && (c ? /* @__PURE__ */ e.jsxs("form", { className: "kobun-source", onSubmit: (t) => {
      t.preventDefault(), At || q();
    }, children: [
      /* @__PURE__ */ e.jsx("label", { htmlFor: "kobun-identifier", children: "別の資料を指定" }),
      /* @__PURE__ */ e.jsx("input", { id: "kobun-identifier", value: m, disabled: r, placeholder: "dcterms:identifier または公開URL", onChange: (t) => b(t.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "保存済み資料は上の「対象資料」から選べます。新しく取り込む資料は識別子、または Clean Url の公開URLで開きます。" })
    ] }) : /* @__PURE__ */ e.jsxs("div", { className: "kobun-source", children: [
      /* @__PURE__ */ e.jsx("p", { children: "上の「対象資料」から作業する資料を選んでください。" }),
      /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "権限範囲内で、保存済みの作業がある資料だけを表示しています。" })
    ] })),
    /* @__PURE__ */ e.jsxs("div", { className: "kobun-layout", children: [
      /* @__PURE__ */ e.jsxs("aside", { className: "kobun-pages", "aria-label": "画像ページ一覧", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "kobun-page-context", children: [
          /* @__PURE__ */ e.jsx("span", { children: "選択中の資料" }),
          /* @__PURE__ */ e.jsx("strong", { children: V || "未選択" }),
          g && /* @__PURE__ */ e.jsx("small", { children: g })
        ] }),
        /* @__PURE__ */ e.jsxs("h3", { children: [
          "画像ページ ",
          we ? `(${we})` : ""
        ] }),
        !B.length && /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "対象資料を選ぶと、その資料の画像だけがここに並びます。" }),
        B.map((t) => {
          const n = Ge.get(t.media_id), s = Tn(n);
          return /* @__PURE__ */ e.jsxs(
            "button",
            {
              className: i?.source.media_id === t.media_id ? "is-selected" : "",
              disabled: r || !c && !n,
              title: !c && !n ? "管理者がまだ作業を作成していない画像です" : void 0,
              onClick: () => an(t),
              children: [
                /* @__PURE__ */ e.jsx("b", { children: t.position }),
                /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx("strong", { children: t.title }) }),
                /* @__PURE__ */ e.jsx("small", { children: s.label }),
                s.detail && /* @__PURE__ */ e.jsx("small", { role: "status", children: s.detail })
              ]
            },
            t.media_id
          );
        }),
        we > 100 && /* @__PURE__ */ e.jsxs("div", { className: "kobun-tools", children: [
          /* @__PURE__ */ e.jsx("button", { disabled: ae <= 1 || r, onClick: () => q(ae - 1), children: "前" }),
          /* @__PURE__ */ e.jsx("span", { children: ae }),
          /* @__PURE__ */ e.jsx("button", { disabled: ae * 100 >= we || r, onClick: () => q(ae + 1), children: "次" })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "kobun-editor", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "kobun-tools kobun-image-tools", children: [
          /* @__PURE__ */ e.jsxs("label", { children: [
            /* @__PURE__ */ e.jsx("input", { type: "checkbox", checked: pt, onChange: (t) => Zt(t.target.checked) }),
            "行の枠を表示"
          ] }),
          d === "layout" && /* @__PURE__ */ e.jsxs("label", { className: "kobun-reading-direction", children: [
            "読み方向",
            /* @__PURE__ */ e.jsxs(
              "select",
              {
                "aria-label": "読み方向",
                value: J,
                disabled: !i || r || !c,
                onChange: (t) => ln(t.target.value),
                children: [
                  /* @__PURE__ */ e.jsx("option", { value: "auto", children: "自動（縦: 右→左／横: 左→右）" }),
                  /* @__PURE__ */ e.jsx("option", { value: "ltr", children: "左から右" }),
                  /* @__PURE__ */ e.jsx("option", { value: "rtl", children: "右から左" })
                ]
              }
            )
          ] }),
          d === "layout" && c && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx("button", { disabled: !i || r, "aria-pressed": _e, onClick: () => {
              Ne(!_e), N(null);
            }, children: "枠を描く" }),
            _e && /* @__PURE__ */ e.jsx("button", { disabled: !le || r, onClick: rn, children: "描いた範囲を追加" })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "kobun-viewer viewer-wrap", children: i ? /* @__PURE__ */ e.jsx(
          kn,
          {
            ref: Ve,
            dataUrl: qt(`documents/${i.id}/image`),
            lines: u,
            regions: i.regions,
            showOverlays: pt,
            selectedOrder: r ? null : _,
            editable: d === "layout" && c && !r,
            onSelectLine: r ? () => {
            } : N,
            onUpdateLine: sn,
            onDeleteLine: Ze,
            regionMode: !r && d === "layout" && _e,
            selectedRegion: le,
            onRegionDraw: Ce
          }
        ) : /* @__PURE__ */ e.jsxs("div", { className: "kobun-empty", children: [
          /* @__PURE__ */ e.jsx("b", { children: B.length ? "画像ページを選択してください" : "資料の画像を見ながら作業します" }),
          /* @__PURE__ */ e.jsx("p", { children: B.length ? "左の一覧から、作業する画像を開きます。" : c ? "資料の識別子を入力するか、上の対象資料から選んでください。" : "上の対象資料から選んでください。" })
        ] }) }),
        (d === "layout" && c || d === "transcription" && L) && /* @__PURE__ */ e.jsxs("div", { className: "kobun-tools kobun-image-tools", children: [
          /* @__PURE__ */ e.jsx("button", { disabled: !X.length || r, onClick: Rt, children: "元に戻す" }),
          /* @__PURE__ */ e.jsx("button", { disabled: !G.length || r, onClick: Tt, children: "やり直す" }),
          d === "layout" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx("span", { className: "kobun-order-label", children: "読み順" }),
            /* @__PURE__ */ e.jsx(
              "button",
              {
                className: "kobun-order-arrow",
                "aria-label": `選択行を後ろへ（${Pe}キー）`,
                title: `読み順を後ろへ（${Pe}キー）`,
                disabled: _ === null || r,
                onClick: () => et(1),
                children: Pe
              }
            ),
            /* @__PURE__ */ e.jsx(
              "button",
              {
                className: "kobun-order-arrow",
                "aria-label": `選択行を前へ（${Ue}キー）`,
                title: `読み順を前へ（${Ue}キー）`,
                disabled: _ === null || r,
                onClick: () => et(-1),
                children: Ue
              }
            ),
            /* @__PURE__ */ e.jsx("button", { disabled: _ === null || r, onClick: () => _ !== null && Ze(_), children: "行を削除" })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("p", { className: "kobun-caption", children: i ? `${i.width} × ${i.height} px · ${u.length}行${u.length ? ` · ${at(C)} · 読み方向 ${st(J, C)}` : ""} · 版 ${i.revision}` : "ホイールで拡大・縮小、ドラッグで画像を移動できます。" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "kobun-results", children: [
        d === "source" && /* @__PURE__ */ e.jsxs("div", { className: "kobun-guide", children: [
          /* @__PURE__ */ e.jsx("h3", { children: "一つのページを、順に確認" }),
          /* @__PURE__ */ e.jsx("p", { children: "画像の行を整え、翻刻を確かめ、その本文から現代語訳を作ります。" }),
          /* @__PURE__ */ e.jsx("p", { children: "次の操作は、画面下の緑色のボタンに表示されます。" }),
          /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "保存済みのページは、前回の作業から再開できます。" })
        ] }),
        (d === "layout" || d === "transcription") && !!u.length && L && /* @__PURE__ */ e.jsxs("div", { className: "kobun-transcription-actions", children: [
          /* @__PURE__ */ e.jsxs("details", { className: "kobun-import", children: [
            /* @__PURE__ */ e.jsx("summary", { children: "翻刻済みテキストを取り込む" }),
            /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "Wordの丁付ごとの本文、または1行を画像の1行に対応させたテキストを取り込めます。複数の丁付は文書内の順につないで反映します。" }),
            /* @__PURE__ */ e.jsxs("label", { className: "kobun-import-file", children: [
              "Word／テキストファイル",
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "file",
                  accept: ".docx,.txt,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  disabled: r,
                  onChange: (t) => {
                    const n = t.currentTarget.files?.[0];
                    t.currentTarget.value = "", n && cn(n);
                  }
                }
              )
            ] }),
            Ct && /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: Ct }),
            !!Te.length && /* @__PURE__ */ e.jsxs("fieldset", { className: "kobun-import-sections", children: [
              /* @__PURE__ */ e.jsx("legend", { children: "取り込むページ（複数選択できます）" }),
              Te.map((t, n) => /* @__PURE__ */ e.jsxs("label", { children: [
                /* @__PURE__ */ e.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: De.includes(n),
                    disabled: r,
                    onChange: (s) => on(n, s.target.checked)
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { children: t.label }),
                /* @__PURE__ */ e.jsxs("small", { children: [
                  t.lines.length,
                  "行"
                ] })
              ] }, `${t.label}-${n}`))
            ] }),
            !!_t.length && /* @__PURE__ */ e.jsxs("p", { className: "kobun-muted", children: [
              "解析: ",
              _t.join("／")
            ] }),
            !!ze.length && /* @__PURE__ */ e.jsxs("details", { children: [
              /* @__PURE__ */ e.jsxs("summary", { children: [
                "検出した凡例（",
                ze.length,
                "項目）"
              ] }),
              /* @__PURE__ */ e.jsx("ul", { children: ze.map((t, n) => /* @__PURE__ */ e.jsx("li", { children: t }, n)) })
            ] }),
            /* @__PURE__ */ e.jsx("label", { htmlFor: "kobun-import-text", children: "取込内容（1行＝画像の1行）" }),
            /* @__PURE__ */ e.jsx(
              "textarea",
              {
                id: "kobun-import-text",
                value: pe,
                disabled: r,
                placeholder: "ここへ翻刻済みテキストを貼り付けることもできます。",
                onChange: (t) => Ke(t.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("p", { className: ve(pe).length === u.length ? "kobun-import-count is-matched" : "kobun-import-count", children: [
              !!Te.length && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                "選択 ",
                De.length,
                "ページ · "
              ] }),
              "取込 ",
              ve(pe).length,
              "行 ／ レイアウト ",
              u.length,
              "行"
            ] }),
            /* @__PURE__ */ e.jsx(
              "button",
              {
                className: "kobun-primary",
                disabled: r || ve(pe).length !== u.length,
                onClick: () => {
                  dn();
                },
                children: "選択したページを取り込む"
              }
            )
          ] }),
          d === "transcription" && /* @__PURE__ */ e.jsx("button", { className: "kobun-link", disabled: !xe, onClick: () => ot(`${i.id}-transcription.txt`, u.map((t) => t.raw || "").join(`
`)), children: "翻刻をダウンロード" })
        ] }),
        d === "layout" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("h3", { children: "行の枠と読み順" }),
          /* @__PURE__ */ e.jsxs("p", { className: "kobun-muted", children: [
            "行を選ぶと画像上の枠を調整できます。番号の順に文字を読み取ります。",
            u.length && c ? `${Ue}・${Pe}キー、または画像下の矢印で順番を入れ替えられます。` : ""
          ] }),
          !u.length && /* @__PURE__ */ e.jsx("p", { children: "下の「レイアウトを認識」から始めます。" }),
          /* @__PURE__ */ e.jsxs("p", { className: "kobun-direction", "aria-live": "polite", children: [
            at(C),
            " · ",
            st(J, C)
          ] }),
          /* @__PURE__ */ e.jsx("ol", { className: `kobun-order is-${C} reading-${Ie}`, children: u.map((t) => /* @__PURE__ */ e.jsx("li", { "data-line-id": t.id, className: `is-${rt(t)}`, children: /* @__PURE__ */ e.jsxs("button", { className: _ === t.readingOrder ? "is-selected" : "", onClick: () => {
            N(t.readingOrder), Ve.current?.scrollToLine(t.readingOrder);
          }, children: [
            /* @__PURE__ */ e.jsx("b", { children: t.readingOrder }),
            /* @__PURE__ */ e.jsx("span", { children: t.raw || `${Math.round(t.width)} × ${Math.round(t.height)} px` })
          ] }) }, t.id)) }),
          Mt && /* @__PURE__ */ e.jsxs("p", { className: "kobun-muted", children: [
            "行 ",
            Mt.readingOrder,
            " を選択中"
          ] }),
          !!u.length && c && /* @__PURE__ */ e.jsxs("details", { children: [
            /* @__PURE__ */ e.jsx("summary", { children: "レイアウトをやり直す" }),
            /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "現在の枠と翻刻を置き換えます。保存済みの版は履歴に残ります。" }),
            /* @__PURE__ */ e.jsx("button", { disabled: r || !I?.ocr_ready, onClick: () => tt("layout"), children: "レイアウトを再認識" })
          ] })
        ] }),
        d === "transcription" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("h3", { children: "画像と翻刻を照合" }),
          /* @__PURE__ */ e.jsxs("p", { className: "kobun-muted", children: [
            "番号を押すと該当する行へ移動します。",
            L ? "保存済みの翻刻も修正できます。" : "このアカウントは閲覧のみです。"
          ] }),
          L && i?.translation && /* @__PURE__ */ e.jsx("p", { className: "kobun-notice", children: "翻刻を修正すると、現在の翻訳用本文と現代語訳は履歴に残したうえで解除されます。" }),
          !!u.length && /* @__PURE__ */ e.jsxs("p", { className: "kobun-direction", "aria-live": "polite", children: [
            at(C),
            " · ",
            st(J, C)
          ] }),
          /* @__PURE__ */ e.jsx("ol", { className: `kobun-lines is-${C} reading-${Ie}`, children: u.map((t) => /* @__PURE__ */ e.jsxs("li", { className: `${_ === t.readingOrder ? "is-selected " : ""}is-${rt(t)}`, children: [
            /* @__PURE__ */ e.jsx("button", { onClick: () => {
              N(t.readingOrder), Ve.current?.scrollToLine(t.readingOrder);
            }, children: t.readingOrder }),
            /* @__PURE__ */ e.jsx("textarea", { className: `is-${rt(t)}`, "aria-label": `行 ${t.readingOrder} の翻刻`, value: t.raw ?? "", disabled: r || !L, onChange: (n) => K(u.map((s) => s.id === t.id ? { ...s, raw: n.target.value } : s)) })
          ] }, t.id)) })
        ] }),
        d === "translation" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c && /* @__PURE__ */ e.jsx(En, {}),
          /* @__PURE__ */ e.jsxs("div", { className: "kobun-tabs", role: "tablist", "aria-label": "翻訳の表示", children: [
            /* @__PURE__ */ e.jsx("button", { id: "kobun-input-tab", role: "tab", "aria-selected": U === "input", "aria-controls": "kobun-input-panel", onClick: () => w("input"), children: "翻訳する本文" }),
            /* @__PURE__ */ e.jsx(
              "button",
              {
                id: "kobun-result-tab",
                role: "tab",
                "aria-selected": U === "result",
                "aria-controls": "kobun-result-panel",
                disabled: !c && !j && !z(i),
                onClick: () => {
                  w("result"), !j && c && !ee && it();
                },
                children: "現代語訳"
              }
            )
          ] }),
          U === "input" ? /* @__PURE__ */ e.jsxs("div", { id: "kobun-input-panel", role: "tabpanel", "aria-labelledby": "kobun-input-tab", children: [
            /* @__PURE__ */ e.jsx("h3", { children: "翻訳する範囲" }),
            /* @__PURE__ */ e.jsxs("div", { className: "kobun-range", children: [
              /* @__PURE__ */ e.jsxs("label", { children: [
                "開始行",
                /* @__PURE__ */ e.jsx("select", { "aria-label": "翻訳の開始行", value: oe, disabled: r || !c, onChange: (t) => nt(Number(t.target.value), ce), children: u.map((t) => /* @__PURE__ */ e.jsx("option", { value: t.readingOrder, children: t.readingOrder }, t.id)) })
              ] }),
              /* @__PURE__ */ e.jsx("span", { children: "〜" }),
              /* @__PURE__ */ e.jsxs("label", { children: [
                "終了行",
                /* @__PURE__ */ e.jsx("select", { "aria-label": "翻訳の終了行", value: ce, disabled: r || !c, onChange: (t) => nt(oe, Number(t.target.value)), children: u.map((t) => /* @__PURE__ */ e.jsx("option", { value: t.readingOrder, children: t.readingOrder }, t.id)) })
              ] })
            ] }),
            /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "文や段落が途中で切れない範囲を選びます。画像上の改行はつなげています。見出しや注記は必要に応じて除いてください。" }),
            /* @__PURE__ */ e.jsx("label", { htmlFor: "kobun-translation-input", children: "翻訳用本文" }),
            /* @__PURE__ */ e.jsx("textarea", { id: "kobun-translation-input", value: O, disabled: r || !c, onChange: (t) => {
              Se(t.target.value), de(!0);
            } }),
            /* @__PURE__ */ e.jsxs("p", { className: "kobun-muted", children: [
              O.length,
              "文字 · ここでの編集は翻刻には反映されません。現代語訳は実験的な補助機能です。"
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "kobun-result-actions", children: [
              /* @__PURE__ */ e.jsx("button", { className: "kobun-link", disabled: r || !c, onClick: () => nt(oe, ce), children: "選択した翻刻から作り直す" }),
              c && /* @__PURE__ */ e.jsx("button", { className: "kobun-link", disabled: r, onClick: it, children: j ? "保存済みの現代語訳を修正" : "現代語訳を手入力" })
            ] })
          ] }) : /* @__PURE__ */ e.jsx("div", { id: "kobun-result-panel", role: "tabpanel", "aria-labelledby": "kobun-result-tab", children: $e ? /* @__PURE__ */ e.jsxs("div", { role: "status", children: [
            /* @__PURE__ */ e.jsx("p", { children: "商用LLMで訳文を生成しています…" }),
            /* @__PURE__ */ e.jsx("button", { onClick: () => Oe.current?.abort(), children: "生成を中止" })
          ] }) : z(i) ? /* @__PURE__ */ e.jsx("p", { role: "status", children: "訳文を生成しています…" }) : ee ? /* @__PURE__ */ e.jsxs("div", { className: "kobun-manual-translation", children: [
            y && /* @__PURE__ */ e.jsxs("p", { className: "kobun-notice", children: [
              "商用LLMによる機械生成・未確認の訳です。確認して保存してください。使用モデル: ",
              y.model,
              " · ",
              lt[y.provider]
            ] }),
            /* @__PURE__ */ e.jsx("label", { htmlFor: "kobun-manual-translation", children: "現代語訳" }),
            /* @__PURE__ */ e.jsx(
              "textarea",
              {
                id: "kobun-manual-translation",
                value: ue,
                disabled: r || !c,
                maxLength: 32e3,
                placeholder: "管理者が確認した現代語訳を入力してください。",
                onChange: (t) => {
                  Q(t.target.value), Z(!0);
                }
              }
            ),
            /* @__PURE__ */ e.jsxs("p", { className: "kobun-muted", children: [
              ue.length,
              "文字 · ",
              y ? "商用LLMの訳として、モデル・取込者・版履歴を記録します。" : "管理者による入力として、入力者と版履歴を記録します。"
            ] }),
            /* @__PURE__ */ e.jsx("div", { className: "kobun-result-actions", children: /* @__PURE__ */ e.jsx("button", { disabled: r, onClick: hn, children: "入力をキャンセル" }) })
          ] }) : j ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx("p", { className: "kobun-notice", children: j.method === "manual" ? "管理者が入力した訳文です。" : "機械が生成した訳です。原文と照合して確認してください。" }),
            j.review_warnings?.map((t) => /* @__PURE__ */ e.jsx("p", { className: "kobun-notice", children: t }, t)),
            /* @__PURE__ */ e.jsx("div", { className: "kobun-translation", children: j.text }),
            /* @__PURE__ */ e.jsxs("p", { className: "kobun-muted", children: [
              j.method === "manual" ? "管理者による入力" : j.model,
              j.provider ? ` · ${lt[j.provider]}` : "",
              j.human_edited ? " · 管理者による修正あり" : "",
              " · 行 ",
              oe,
              "〜",
              ce
            ] }),
            !!j.uncertainties?.length && /* @__PURE__ */ e.jsxs("div", { className: "kobun-uncertainties", children: [
              /* @__PURE__ */ e.jsx("h3", { children: "原文と照合する箇所" }),
              /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "読みの候補は機械による推定です。翻刻・翻訳用本文には自動反映しません。" }),
              /* @__PURE__ */ e.jsx("ul", { children: j.uncertainties.map((t, n) => /* @__PURE__ */ e.jsxs("li", { children: [
                /* @__PURE__ */ e.jsx("q", { children: t.source }),
                /* @__PURE__ */ e.jsx("p", { children: t.reason }),
                t.reading && /* @__PURE__ */ e.jsxs("p", { children: [
                  "読みの候補：",
                  t.reading
                ] })
              ] }, n)) })
            ] }),
            /* @__PURE__ */ e.jsxs("details", { children: [
              /* @__PURE__ */ e.jsx("summary", { children: "この訳に使った本文" }),
              /* @__PURE__ */ e.jsx("p", { className: "kobun-prewrap", children: j.input })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "kobun-result-actions", children: [
              /* @__PURE__ */ e.jsx("button", { className: "kobun-link", disabled: r, onClick: () => ot(`${i.id}-translation.txt`, j.text), children: "訳文をダウンロード" }),
              c && /* @__PURE__ */ e.jsx("button", { className: "kobun-link", disabled: r, onClick: it, children: "この現代語訳を修正" }),
              c && /* @__PURE__ */ e.jsx("button", { className: "kobun-danger", disabled: r, onClick: () => {
                un();
              }, children: "この現代語訳を削除" })
            ] })
          ] }) : /* @__PURE__ */ e.jsx("p", { children: "翻訳する本文を確認してください。" }) })
        ] }),
        d === "publication" && i && /* @__PURE__ */ e.jsxs("section", { className: "kobun-publication-panel", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "kobun-publication-summary", children: [
            /* @__PURE__ */ e.jsx("h3", { children: "公開状態" }),
            /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsx("span", { className: `kobun-publication is-${R}`, children: Wt[R] }) }),
            /* @__PURE__ */ e.jsxs("dl", { children: [
              /* @__PURE__ */ e.jsx("dt", { children: "翻刻" }),
              /* @__PURE__ */ e.jsx("dd", { children: xe ? `${u.length}行` : "未完成" }),
              /* @__PURE__ */ e.jsx("dt", { children: "現代語訳" }),
              /* @__PURE__ */ e.jsx("dd", { children: i.translation ? "あり" : "なし（翻刻だけでも公開できます）" })
            ] }),
            /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "公開中のデータだけが資料ページで機械生成結果より優先して表示されます。翻刻や訳文を変更すると下書きへ戻ります。" })
          ] }),
          /* @__PURE__ */ e.jsxs("label", { className: "kobun-required-field", children: [
            /* @__PURE__ */ e.jsxs("span", { className: "kobun-field-label", children: [
              "翻刻責任者 ",
              /* @__PURE__ */ e.jsx("b", { children: "必須" })
            ] }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "text",
                value: W,
                disabled: !c || r,
                maxLength: 500,
                placeholder: "氏名、担当グループ名など",
                onChange: (t) => ft(t.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "公開中の翻刻とともに、責任表示として公開ページへ表示します。" }),
          !W.trim() && c && /* @__PURE__ */ e.jsx("p", { className: "kobun-notice", children: "確認済みにするには、翻刻責任者を入力してください。" }),
          /* @__PURE__ */ e.jsxs(
            "details",
            {
              className: "kobun-attribution-disclosure",
              open: tn,
              onToggle: (t) => vt(t.currentTarget.open),
              children: [
                /* @__PURE__ */ e.jsxs("summary", { children: [
                  "研究成果・権利情報（",
                  Pt ? `${Pt}項目入力済み` : "未入力",
                  "）"
                ] }),
                /* @__PURE__ */ e.jsxs("fieldset", { className: "kobun-attribution-editor", disabled: !c || r, children: [
                  /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "作成者を研究成果として識別・引用できる情報と、利用条件を記録します。Word取込で検出した値は候補として自動入力されます。" }),
                  /* @__PURE__ */ e.jsxs("label", { className: "is-wide", children: [
                    "成果名",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.title || "",
                        maxLength: 500,
                        onChange: (t) => x((n) => ({ ...n, title: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { className: "is-wide", children: [
                    "作成者（1名につき1行）",
                    /* @__PURE__ */ e.jsx(
                      "textarea",
                      {
                        value: p.contributors || "",
                        maxLength: 2e3,
                        onChange: (t) => x((n) => ({ ...n, contributors: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { className: "is-wide", children: [
                    "作成者識別子（ORCID・researchmap等、対応する順に1名につき1行）",
                    /* @__PURE__ */ e.jsx(
                      "textarea",
                      {
                        value: p.contributor_identifiers || "",
                        maxLength: 2e3,
                        onChange: (t) => x((n) => ({ ...n, contributor_identifiers: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "所属",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.affiliation || "",
                        maxLength: 1e3,
                        onChange: (t) => x((n) => ({ ...n, affiliation: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "役割・分担",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.contribution_note || "",
                        maxLength: 2e3,
                        placeholder: "翻刻、校訂、資料調査など",
                        onChange: (t) => x((n) => ({ ...n, contribution_note: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "掲載誌",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.journal_title || "",
                        maxLength: 500,
                        onChange: (t) => x((n) => ({ ...n, journal_title: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "巻号",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.journal_issue || "",
                        maxLength: 200,
                        placeholder: "第30号",
                        onChange: (t) => x((n) => ({ ...n, journal_issue: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "雑誌識別子",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.journal_identifiers || "",
                        maxLength: 500,
                        placeholder: "ISSN 0000-0000／NCID AAXXXXXXXX",
                        onChange: (t) => x((n) => ({ ...n, journal_identifiers: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "刊行年",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.publication_year || "",
                        maxLength: 20,
                        inputMode: "numeric",
                        onChange: (t) => x((n) => ({ ...n, publication_year: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "発行日",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        type: "date",
                        value: p.publication_date || "",
                        maxLength: 30,
                        onChange: (t) => x((n) => ({ ...n, publication_date: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "掲載ページ",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.publication_pages || "",
                        maxLength: 100,
                        placeholder: "1–26",
                        onChange: (t) => x((n) => ({ ...n, publication_pages: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { className: "is-wide", children: [
                    "発行主体",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.publisher || "",
                        maxLength: 500,
                        onChange: (t) => x((n) => ({ ...n, publisher: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "DOI／恒久識別子",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.doi || "",
                        maxLength: 300,
                        onChange: (t) => x((n) => ({ ...n, doi: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "掲載先URL",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        type: "url",
                        value: p.publication_url || "",
                        maxLength: 2e3,
                        placeholder: "https://…",
                        onChange: (t) => x((n) => ({ ...n, publication_url: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "権利状態",
                    /* @__PURE__ */ e.jsxs(
                      "select",
                      {
                        value: p.rights_status || "",
                        onChange: (t) => x((n) => ({ ...n, rights_status: t.target.value })),
                        children: [
                          /* @__PURE__ */ e.jsx("option", { value: "", children: "未設定" }),
                          /* @__PURE__ */ e.jsx("option", { value: "copyrighted", children: "著作権あり" }),
                          /* @__PURE__ */ e.jsx("option", { value: "not_asserted", children: "翻刻本文について著作権を主張しない" }),
                          /* @__PURE__ */ e.jsx("option", { value: "undetermined", children: "権利状態を確認中" }),
                          /* @__PURE__ */ e.jsx("option", { value: "other", children: "その他・個別条件" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "権利者",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.rights_holder || "",
                        maxLength: 500,
                        onChange: (t) => x((n) => ({ ...n, rights_holder: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { className: "is-wide", children: [
                    "権利に関する説明",
                    /* @__PURE__ */ e.jsx(
                      "textarea",
                      {
                        value: p.rights_statement || "",
                        maxLength: 2e3,
                        placeholder: "翻刻本文、校訂、注釈など、権利表示の対象を明記してください。",
                        onChange: (t) => x((n) => ({ ...n, rights_statement: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "利用条件・ライセンス",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        value: p.license_label || "",
                        maxLength: 300,
                        placeholder: "CC BY 4.0 など",
                        onChange: (t) => x((n) => ({ ...n, license_label: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { children: [
                    "ライセンスURL",
                    /* @__PURE__ */ e.jsx(
                      "input",
                      {
                        type: "url",
                        value: p.license_url || "",
                        maxLength: 2e3,
                        placeholder: "https://…",
                        onChange: (t) => x((n) => ({ ...n, license_url: t.target.value }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsxs("label", { className: "is-wide", children: [
                    "推奨引用表記",
                    /* @__PURE__ */ e.jsx(
                      "textarea",
                      {
                        value: p.citation || "",
                        maxLength: 3e3,
                        onChange: (t) => x((n) => ({ ...n, citation: t.target.value }))
                      }
                    )
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsxs("label", { className: "kobun-review-note", children: [
            "確認メモ",
            /* @__PURE__ */ e.jsx(
              "textarea",
              {
                value: me,
                disabled: !c || r,
                maxLength: 2e3,
                placeholder: "画像との照合範囲、未確認箇所、判断事項など",
                onChange: (t) => jt(t.target.value)
              }
            )
          ] }),
          !c && /* @__PURE__ */ e.jsx("p", { className: "kobun-muted", children: "このアカウントでは公開状態を変更できません。" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "kobun-actionbar", children: [
      /* @__PURE__ */ e.jsx("div", { className: "kobun-action-status", role: "status", children: $e ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { className: "kobun-spinner" }),
        "商用LLMで現代語訳を生成中"
      ] }) : z(i) ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { className: "kobun-spinner" }),
        ke[i.job.operation],
        " · ",
        i.job.status === "queued" ? `処理待ち（前に${i.job.jobs_ahead || 0}件）` : ke[i.job.status]
      ] }) : ie ? "未保存の変更があります" : i ? "変更は保存されています" : "資料を開いて開始" }),
      /* @__PURE__ */ e.jsxs("div", { className: "kobun-tools", children: [
        Ee > 0 && /* @__PURE__ */ e.jsx("button", { disabled: r, onClick: () => Dt(fe[Ee - 1].id), children: "戻る" }),
        i && /* @__PURE__ */ e.jsx("button", { disabled: r || !ie || E && d === "transcription" && !L || E && d !== "transcription" && !c || M && !c || M && !O.trim(), onClick: () => k(async () => {
          await je();
        }), children: d === "publication" ? "入力内容を保存" : "途中保存" }),
        d === "translation" && c && !ee && !(U === "result" && j) && /* @__PURE__ */ e.jsx(
          "button",
          {
            disabled: r || he || M && !O.trim(),
            onClick: () => {
              It();
            },
            children: j ? "確認・公開へ" : "現代語訳を作らず確認・公開へ"
          }
        ),
        d === "publication" && R === "reviewed" && /* @__PURE__ */ e.jsx("button", { disabled: r || be, onClick: () => {
          Fe("draft");
        }, children: "下書きへ戻す" }),
        d === "publication" && R === "published" && /* @__PURE__ */ e.jsx("button", { disabled: r || be, onClick: () => {
          Fe("reviewed");
        }, children: "公開を取り下げる" }),
        /* @__PURE__ */ e.jsx("button", { className: "kobun-primary", disabled: At, onClick: gn, children: xn })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "kobun-credit", children: [
      "レイアウト編集UI: ",
      /* @__PURE__ */ e.jsx("a", { href: "https://github.com/yuta1984/honkoku-ocr-web", target: "_blank", rel: "noreferrer", children: "みんなで翻刻OCR" }),
      "（Yuta Hashimoto, 2025）を改変 · ",
      /* @__PURE__ */ e.jsx("a", { href: "https://creativecommons.org/licenses/by/4.0/", target: "_blank", rel: "noreferrer", children: "CC BY 4.0" }),
      " · OCR: NDL古典籍OCR-Lite"
    ] })
  ] });
}
fn.createRoot(D).render(/* @__PURE__ */ e.jsx(In, {}));
