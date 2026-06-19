// rpow2.xyz landing page i18n: lightweight, zero-dependency (zh/en/ja/ko).
// Language selection: localStorage["rpow_lang"] -> navigator.language -> default en.
// HTML-bearing strings (links/strong) are rendered by App via dangerouslySetInnerHTML
// (all copy is maintained by this repo's author and is trusted).
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const LKEY = "rpow_lang";

export const LANGS = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

const dict = {
  en: {
    "tagline": "a community ecosystem for $RPOW",
    "about.title": "ABOUT",
    "about.lead":
      'rpow2.xyz is a community-driven ecosystem of open tools around <strong>$RPOW</strong>, built and maintained by independent developers.',
    "about.lead2":
      "$RPOW is a modern tribute to Hal Finney's original RPOW, with a fixed supply of 21,000,000.",
    "tools.title": "ECOSYSTEM",
    "tool.pool.name": "mining pool",
    "tool.pool.desc": "Sign up and mine $RPOW: one click in the browser, or run GPUs with Docker.",
    "tool.pool.f1": "no install · one-click browser mining (WebGPU, CPU fallback)",
    "tool.pool.f2": "pro · GPU mining via Docker, tuned for higher hashrate, scales across machines",
    "tool.pool.f3": "no throttle · the mainnet rate-limits per-account requests; this pool doesn't",
    "tool.pool.cta": "open pool →",
    "tool.next.name": "more tools",
    "tool.next.desc": "more ecosystem tools are on the way.",
    "tool.next.cta": "stay tuned",
    "badge.live": "LIVE",
    "badge.soon": "SOON",
    "footer.disclaimer": '<a href="https://x.com/chaoxiweng" target="_blank" rel="noopener">@chaoxiweng</a>',
  },

  zh: {
    "tagline": "$RPOW 的社区生态",
    "about.title": "关于",
    "about.lead":
      'rpow2.xyz 是围绕 <strong>$RPOW</strong> 打造的社区开放工具生态，由独立开发者开发并维护。',
    "about.lead2":
      "$RPOW 是对 Hal Finney 原始 RPOW 的现代致敬，总量固定 21,000,000。",
    "tools.title": "生态",
    "tool.pool.name": "矿池",
    "tool.pool.desc": "注册即挖 $RPOW：浏览器一键开挖，或用 Docker 驱动 GPU 专业挖矿。",
    "tool.pool.f1": "免安装 · 浏览器一键挖矿（WebGPU 加速，自动回退 CPU）",
    "tool.pool.f2": "专业级 · Docker 驱动 GPU 并针对显卡深度优化，可多机横向扩容",
    "tool.pool.f3": "不限速 · 官网会限制账号请求频率，本矿池不限",
    "tool.pool.cta": "打开矿池 →",
    "tool.next.name": "更多工具",
    "tool.next.desc": "更多生态工具正在路上。",
    "tool.next.cta": "敬请期待",
    "badge.live": "已上线",
    "badge.soon": "即将",
    "footer.disclaimer": '<a href="https://x.com/chaoxiweng" target="_blank" rel="noopener">@chaoxiweng</a>',
  },

  ja: {
    "tagline": "$RPOW のコミュニティ・エコシステム",
    "about.title": "概要",
    "about.lead":
      'rpow2.xyz は <strong>$RPOW</strong> を中心としたコミュニティ主導のオープンツール・エコシステムで、独立した開発者が開発・運営しています。',
    "about.lead2":
      "$RPOW は Hal Finney の original RPOW への現代的なオマージュで、総供給量は 21,000,000 で固定です。",
    "tools.title": "エコシステム",
    "tool.pool.name": "マイニングプール",
    "tool.pool.desc": "登録してすぐ $RPOW をマイニング：ブラウザでワンクリック、または Docker で GPU を回す。",
    "tool.pool.f1": "インストール不要 · ブラウザでワンクリック採掘（WebGPU、CPU フォールバック）",
    "tool.pool.f2": "プロ向け · Docker による GPU 採掘、GPU 向けに最適化され複数マシンに水平スケール",
    "tool.pool.f3": "速度制限なし · 公式はアカウント単位でリクエストを制限しますが、本プールは無制限",
    "tool.pool.cta": "プールを開く →",
    "tool.next.name": "その他のツール",
    "tool.next.desc": "さらなるエコシステムツールを準備中です。",
    "tool.next.cta": "お楽しみに",
    "badge.live": "稼働中",
    "badge.soon": "近日",
    "footer.disclaimer": '<a href="https://x.com/chaoxiweng" target="_blank" rel="noopener">@chaoxiweng</a>',
  },

  ko: {
    "tagline": "$RPOW를 위한 커뮤니티 생태계",
    "about.title": "소개",
    "about.lead":
      'rpow2.xyz는 <strong>$RPOW</strong>를 중심으로 한 커뮤니티 주도의 오픈 도구 생태계로, 독립 개발자들이 개발하고 운영합니다.',
    "about.lead2":
      "$RPOW는 Hal Finney의 original RPOW에 대한 현대적 헌정이며, 총공급량은 21,000,000으로 고정됩니다.",
    "tools.title": "생태계",
    "tool.pool.name": "마이닝 풀",
    "tool.pool.desc": "가입하고 바로 $RPOW 채굴: 브라우저에서 원클릭, 또는 Docker로 GPU 구동.",
    "tool.pool.f1": "설치 불필요 · 브라우저 원클릭 채굴(WebGPU, CPU 폴백)",
    "tool.pool.f2": "전문가용 · Docker 기반 GPU 채굴, GPU에 최적화되어 여러 머신으로 수평 확장",
    "tool.pool.f3": "속도 제한 없음 · 공식은 계정별 요청을 제한하지만 본 풀은 무제한",
    "tool.pool.cta": "풀 열기 →",
    "tool.next.name": "더 많은 도구",
    "tool.next.desc": "더 많은 생태계 도구가 준비 중입니다.",
    "tool.next.cta": "기대해 주세요",
    "badge.live": "운영 중",
    "badge.soon": "곧",
    "footer.disclaimer": '<a href="https://x.com/chaoxiweng" target="_blank" rel="noopener">@chaoxiweng</a>',
  },
};

function detectLang() {
  try {
    const saved = localStorage.getItem(LKEY);
    if (saved && dict[saved]) return saved;
    const cands = [];
    if (Array.isArray(navigator.languages)) cands.push(...navigator.languages);
    if (navigator.language) cands.push(navigator.language);
    for (const raw of cands) {
      const nav = String(raw || "").toLowerCase();
      if (nav.startsWith("zh")) return "zh";
      if (nav.startsWith("ja")) return "ja";
      if (nav.startsWith("ko")) return "ko";
      if (nav.startsWith("en")) return "en";
    }
  } catch (e) { /* ignore */ }
  return "en";
}

function translate(lang, key) {
  const table = dict[lang] || dict.en;
  let s = table[key];
  if (s == null) s = dict.en[key];
  return s == null ? key : s;
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = useCallback((l) => {
    if (!dict[l]) return;
    setLangState(l);
    try { localStorage.setItem(LKEY, l); } catch (e) { /* ignore */ }
  }, []);

  const t = useCallback((key) => translate(lang, key), [lang]);

  useEffect(() => { try { document.documentElement.lang = lang; } catch (e) {} }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
