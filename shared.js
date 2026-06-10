// ============================================================
// shared.js
// 테마 프리셋, 폰트 목록, 기본 데이터, Firebase 초기화, 유틸.
// index.html / admin.html 양쪽에서 import 합니다.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase, ref, onValue, set, update, get
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { firebaseConfig, dbRoot } from "./config.js";

// ── Firebase 초기화 ─────────────────────────────────────────
export const app = initializeApp(firebaseConfig);
export const db  = getDatabase(app);
export const rootRef = ref(db, dbRoot);
export { ref, onValue, set, update, get };

// ── 폰트 레지스트리 ─────────────────────────────────────────
// index.html / admin.html 의 <link> 태그에서 한꺼번에 로드합니다.
export const FONTS = [
  { name: "Noto Sans KR",   family: "'Noto Sans KR', sans-serif" },
  { name: "검은고딕",       family: "'Black Han Sans', sans-serif" },
  { name: "주아",           family: "'Jua', sans-serif" },
  { name: "도현",           family: "'Do Hyeon', sans-serif" },
  { name: "나눔고딕",       family: "'Nanum Gothic', sans-serif" },
  { name: "나눔펜",         family: "'Nanum Pen Script', cursive" },
  { name: "고운돋움",       family: "'Gowun Dodum', sans-serif" },
  { name: "고운바탕",       family: "'Gowun Batang', serif" },
  { name: "하이멜로디",     family: "'Hi Melody', cursive" },
  { name: "큐트",           family: "'Cute Font', cursive" },
  { name: "동해독도",       family: "'East Sea Dokdo', cursive" },
  { name: "선플라워",       family: "'Sunflower', sans-serif" },
  { name: "Share Tech Mono",family: "'Share Tech Mono', monospace" }
];

// ── 테마 프리셋 ─────────────────────────────────────────────
// 각 테마는 CSS 변수로 매핑. 항목별 라벨색은 별도 override 가능.
export const THEMES = {
  clean: {
    name: "투명·기본",
    vars: {
      "--panel-bg":      "transparent",
      "--panel-border":  "transparent",
      "--panel-radius":  "0",
      "--panel-padding": "0",
      "--row-gap":       "2px",
      "--amount-color":  "#FFFFFF",
      "--amount-size":   "24px",
      "--amount-weight": "800",
      "--label-color":   "#FFFFFF",
      "--label-size":    "24px",
      "--label-weight":  "700",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "2px 2px 4px rgba(0,0,0,0.95), -1px -1px 2px rgba(0,0,0,0.7)"
    }
  },
  outlineB: {
    name: "투명·검정외곽",
    vars: {
      "--panel-bg":      "transparent",
      "--panel-border":  "transparent",
      "--panel-radius":  "0",
      "--panel-padding": "0",
      "--row-gap":       "2px",
      "--amount-color":  "#FFFFFF",
      "--amount-size":   "24px",
      "--amount-weight": "900",
      "--label-color":   "#FFFFFF",
      "--label-size":    "24px",
      "--label-weight":  "800",
      "--font-family":   "'Black Han Sans', sans-serif",
      "--text-shadow":   "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -2px 0 0 #000, 2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000, 0 0 6px rgba(0,0,0,0.65)"
    }
  },
  outlineW: {
    name: "투명·흰외곽",
    vars: {
      "--panel-bg":      "transparent",
      "--panel-border":  "transparent",
      "--panel-radius":  "0",
      "--panel-padding": "0",
      "--row-gap":       "2px",
      "--amount-color":  "#1A1A1A",
      "--amount-size":   "24px",
      "--amount-weight": "900",
      "--label-color":   "#1A1A1A",
      "--label-size":    "24px",
      "--label-weight":  "800",
      "--font-family":   "'Black Han Sans', sans-serif",
      "--text-shadow":   "-2px -2px 0 #FFF, 2px -2px 0 #FFF, -2px 2px 0 #FFF, 2px 2px 0 #FFF, -2px 0 0 #FFF, 2px 0 0 #FFF, 0 -2px 0 #FFF, 0 2px 0 #FFF, 0 0 6px rgba(255,255,255,0.75)"
    }
  },
  softHalo: {
    name: "투명·소프트섀도",
    vars: {
      "--panel-bg":      "transparent",
      "--panel-border":  "transparent",
      "--panel-radius":  "0",
      "--panel-padding": "0",
      "--row-gap":       "2px",
      "--amount-color":  "#FFFFFF",
      "--amount-size":   "24px",
      "--amount-weight": "700",
      "--label-color":   "#FFFFFF",
      "--label-size":    "24px",
      "--label-weight":  "600",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "0 0 18px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.9)"
    }
  },
  goldGlow: {
    name: "투명·골드빛",
    vars: {
      "--panel-bg":      "transparent",
      "--panel-border":  "transparent",
      "--panel-radius":  "0",
      "--panel-padding": "0",
      "--row-gap":       "2px",
      "--amount-color":  "#FFD24A",
      "--amount-size":   "24px",
      "--amount-weight": "800",
      "--label-color":   "#FFFFFF",
      "--label-size":    "24px",
      "--label-weight":  "700",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "-1px -1px 0 #4A2A00, 1px -1px 0 #4A2A00, -1px 1px 0 #4A2A00, 1px 1px 0 #4A2A00, 0 0 10px rgba(255,200,80,0.75), 0 0 20px rgba(255,160,0,0.5)"
    }
  },
  pinkGlow: {
    name: "투명·핑크빛",
    vars: {
      "--panel-bg":      "transparent",
      "--panel-border":  "transparent",
      "--panel-radius":  "0",
      "--panel-padding": "0",
      "--row-gap":       "2px",
      "--amount-color":  "#FFFFFF",
      "--amount-size":   "24px",
      "--amount-weight": "800",
      "--label-color":   "#FFC6E0",
      "--label-size":    "24px",
      "--label-weight":  "700",
      "--font-family":   "'Jua', sans-serif",
      "--text-shadow":   "-1px -1px 0 #6A1A45, 1px -1px 0 #6A1A45, -1px 1px 0 #6A1A45, 1px 1px 0 #6A1A45, 0 0 12px rgba(255,100,180,0.75), 0 0 22px rgba(255,60,150,0.5)"
    }
  },
  cyanGlow: {
    name: "투명·시안빛",
    vars: {
      "--panel-bg":      "transparent",
      "--panel-border":  "transparent",
      "--panel-radius":  "0",
      "--panel-padding": "0",
      "--row-gap":       "2px",
      "--amount-color":  "#A8F4FF",
      "--amount-size":   "24px",
      "--amount-weight": "800",
      "--label-color":   "#FFFFFF",
      "--label-size":    "24px",
      "--label-weight":  "700",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "-1px -1px 0 #003040, 1px -1px 0 #003040, -1px 1px 0 #003040, 1px 1px 0 #003040, 0 0 10px rgba(120,230,255,0.75), 0 0 22px rgba(0,180,230,0.55)"
    }
  },
  popArt: {
    name: "투명·팝아트",
    vars: {
      "--panel-bg":      "transparent",
      "--panel-border":  "transparent",
      "--panel-radius":  "0",
      "--panel-padding": "0",
      "--row-gap":       "3px",
      "--amount-color":  "#FFEC44",
      "--amount-size":   "24px",
      "--amount-weight": "900",
      "--label-color":   "#FFFFFF",
      "--label-size":    "24px",
      "--label-weight":  "800",
      "--font-family":   "'Black Han Sans', sans-serif",
      "--text-shadow":   "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -2px 0 0 #000, 2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000, 3px 3px 0 #FF3D00"
    }
  },
  classic: {
    name: "클래식",
    vars: {
      "--panel-bg":      "rgba(20, 18, 25, 0.82)",
      "--panel-border":  "rgba(255, 255, 255, 0.15)",
      "--panel-radius":  "8px",
      "--panel-padding": "6px 12px",
      "--row-gap":       "2px",
      "--amount-color":  "#FFC940",
      "--amount-size":   "24px",
      "--amount-weight": "800",
      "--label-color":   "#FFFFFF",
      "--label-size":    "24px",
      "--label-weight":  "700",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "1px 1px 2px rgba(0,0,0,0.85)"
    }
  },
  neon: {
    name: "네온",
    vars: {
      "--panel-bg":      "rgba(8, 6, 20, 0.72)",
      "--panel-border":  "rgba(0, 255, 255, 0.35)",
      "--panel-radius":  "10px",
      "--panel-padding": "8px 14px",
      "--row-gap":       "3px",
      "--amount-color":  "#00F0FF",
      "--amount-size":   "24px",
      "--amount-weight": "800",
      "--label-color":   "#FF3DCB",
      "--label-size":    "24px",
      "--label-weight":  "700",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "0 0 6px rgba(0,240,255,0.7), 0 0 12px rgba(255,61,203,0.4)"
    }
  },
  minimal: {
    name: "미니멀",
    vars: {
      "--panel-bg":      "rgba(0, 0, 0, 0.55)",
      "--panel-border":  "rgba(255, 255, 255, 0.10)",
      "--panel-radius":  "4px",
      "--panel-padding": "6px 12px",
      "--row-gap":       "2px",
      "--amount-color":  "#FFFFFF",
      "--amount-size":   "22px",
      "--amount-weight": "600",
      "--label-color":   "rgba(255,255,255,0.85)",
      "--label-size":    "22px",
      "--label-weight":  "400",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "0 1px 2px rgba(0,0,0,0.6)"
    }
  },
  pinkbling: {
    name: "핑크블링",
    vars: {
      "--panel-bg":      "rgba(40, 8, 30, 0.78)",
      "--panel-border":  "rgba(255, 182, 220, 0.4)",
      "--panel-radius":  "12px",
      "--panel-padding": "8px 14px",
      "--row-gap":       "3px",
      "--amount-color":  "#FFD96A",
      "--amount-size":   "24px",
      "--amount-weight": "800",
      "--label-color":   "#FFB6DC",
      "--label-size":    "24px",
      "--label-weight":  "700",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "0 0 8px rgba(255,105,180,0.6), 1px 1px 2px rgba(0,0,0,0.8)"
    }
  },
  cyber: {
    name: "사이버",
    vars: {
      "--panel-bg":      "rgba(0, 12, 8, 0.75)",
      "--panel-border":  "rgba(0, 255, 130, 0.5)",
      "--panel-radius":  "2px",
      "--panel-padding": "6px 12px",
      "--row-gap":       "2px",
      "--amount-color":  "#00FF88",
      "--amount-size":   "23px",
      "--amount-weight": "800",
      "--label-color":   "#A8FFCB",
      "--label-size":    "23px",
      "--label-weight":  "600",
      "--font-family":   "'Share Tech Mono', monospace",
      "--text-shadow":   "0 0 4px #00FF88, 0 0 10px rgba(0,255,136,0.4)"
    }
  },
  gold: {
    name: "블랙골드",
    vars: {
      "--panel-bg":      "rgba(15, 12, 5, 0.92)",
      "--panel-border":  "rgba(255, 215, 0, 0.55)",
      "--panel-radius":  "6px",
      "--panel-padding": "8px 14px",
      "--row-gap":       "3px",
      "--amount-color":  "#FFD700",
      "--amount-size":   "24px",
      "--amount-weight": "800",
      "--label-color":   "#FFF8DC",
      "--label-size":    "24px",
      "--label-weight":  "700",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "0 0 6px rgba(255,215,0,0.5), 1px 1px 2px rgba(0,0,0,0.95)"
    }
  },
  vintage: {
    name: "빈티지",
    vars: {
      "--panel-bg":      "rgba(75, 50, 30, 0.85)",
      "--panel-border":  "rgba(200, 170, 120, 0.45)",
      "--panel-radius":  "4px",
      "--panel-padding": "8px 14px",
      "--row-gap":       "2px",
      "--amount-color":  "#E8C685",
      "--amount-size":   "24px",
      "--amount-weight": "700",
      "--label-color":   "#F5E6CC",
      "--label-size":    "24px",
      "--label-weight":  "500",
      "--font-family":   "'Gowun Batang', serif",
      "--text-shadow":   "1px 1px 2px rgba(0,0,0,0.7)"
    }
  },
  ice: {
    name: "아이스",
    vars: {
      "--panel-bg":      "rgba(180, 220, 240, 0.25)",
      "--panel-border":  "rgba(255, 255, 255, 0.55)",
      "--panel-radius":  "12px",
      "--panel-padding": "8px 14px",
      "--row-gap":       "3px",
      "--amount-color":  "#FFFFFF",
      "--amount-size":   "24px",
      "--amount-weight": "700",
      "--label-color":   "#CDE9F7",
      "--label-size":    "24px",
      "--label-weight":  "600",
      "--font-family":   "'Noto Sans KR', sans-serif",
      "--text-shadow":   "0 0 6px rgba(150,210,240,0.8), 1px 1px 2px rgba(0,0,0,0.6)"
    }
  },
  arcade: {
    name: "아케이드",
    vars: {
      "--panel-bg":      "#000000",
      "--panel-border":  "rgba(255, 0, 255, 0.9)",
      "--panel-radius":  "0",
      "--panel-padding": "6px 12px",
      "--row-gap":       "3px",
      "--amount-color":  "#00FFFF",
      "--amount-size":   "22px",
      "--amount-weight": "700",
      "--label-color":   "#FFFF00",
      "--label-size":    "22px",
      "--label-weight":  "700",
      "--font-family":   "'Share Tech Mono', monospace",
      "--text-shadow":   "2px 2px 0 #FF00FF"
    }
  },
  paper: {
    name: "메모지",
    vars: {
      "--panel-bg":      "rgba(255, 250, 235, 0.94)",
      "--panel-border":  "rgba(80, 60, 40, 0.18)",
      "--panel-radius":  "4px",
      "--panel-padding": "10px 16px",
      "--row-gap":       "2px",
      "--amount-color":  "#3A2A1C",
      "--amount-size":   "23px",
      "--amount-weight": "700",
      "--label-color":   "#5A4838",
      "--label-size":    "23px",
      "--label-weight":  "500",
      "--font-family":   "'Nanum Pen Script', cursive",
      "--text-shadow":   "none"
    }
  },
  kawaii: {
    name: "카와이",
    vars: {
      "--panel-bg":      "rgba(255, 232, 245, 0.86)",
      "--panel-border":  "rgba(255, 150, 200, 0.6)",
      "--panel-radius":  "16px",
      "--panel-padding": "8px 16px",
      "--row-gap":       "3px",
      "--amount-color":  "#FF4080",
      "--amount-size":   "24px",
      "--amount-weight": "700",
      "--label-color":   "#7A3A6A",
      "--label-size":    "24px",
      "--label-weight":  "600",
      "--font-family":   "'Jua', sans-serif",
      "--text-shadow":   "1px 1px 0 rgba(255,255,255,0.6)"
    }
  }
};

// ── 기본 데이터 ─────────────────────────────────────────────
export const DEFAULT_DATA = {
  config: {
    activeTheme:  "clean",
    fontFamily:   "",          // 비우면 테마 기본 폰트 사용
    pageInterval: 5000,
    transitionMs: 500,
    transitionType: "fade",    // fade/slide/slideup/zoomin/zoomout/blur/rotate/none
    canvasWidth:  300,
    canvasHeight: 400
  },
  pages: [
    {
      id: "p1", name: "VIP 등급", theme: null, fontFamily: null,
      items: [
        { amount: "100,000",   label: "제킹시크", color: null },
        { amount: "200,000",   label: "VIP",     color: null },
        { amount: "500,000",   label: "VVIP",    color: null },
        { amount: "1,000,000", label: "GOD",     color: null }
      ]
    },
    {
      id: "p2", name: "1만원대", theme: null, fontFamily: null,
      items: [
        { amount: "15,000", label: "핫해",       color: null },
        { amount: "15,500", label: "섹소폰매직", color: null },
        { amount: "16,000", label: "아웃송",     color: null },
        { amount: "16,500", label: "러브쉐이크", color: null },
        { amount: "17,000", label: "올브리뉴",   color: null },
        { amount: "17,500", label: "핑크레이디", color: null },
        { amount: "18,000", label: "띵띵땅땅",   color: null },
        { amount: "18,500", label: "구찌보이",   color: null },
        { amount: "19,000", label: "헤비머신건", color: null },
        { amount: "19,500", label: "진압해",     color: null }
      ]
    },
    {
      id: "p3", name: "2만원대", theme: null, fontFamily: null,
      items: [
        { amount: "20,000", label: "몸",         color: null },
        { amount: "20,500", label: "터미널",     color: null },
        { amount: "21,000", label: "할것",       color: null },
        { amount: "21,500", label: "호영레이블", color: null },
        { amount: "22,000", label: "인더클럽",   color: null },
        { amount: "22,500", label: "see봐레쓰고", color: null },
        { amount: "23,000", label: "드라군",     color: null },
        { amount: "23,500", label: "계엄령",     color: null },
        { amount: "24,000", label: "잭슨",       color: null },
        { amount: "24,500", label: "죽쟀다",     color: null }
      ]
    },
    {
      id: "p4", name: "3만원대~", theme: null, fontFamily: null,
      items: [
        { amount: "25,000", label: "더블킥",     color: null },
        { amount: "27,500", label: "메가폰",     color: null },
        { amount: "30,000", label: "트리플샷",   color: null },
        { amount: "35,000", label: "헤드샷",     color: null },
        { amount: "40,000", label: "스나이퍼",   color: null },
        { amount: "45,000", label: "킹메이커",   color: null }
      ]
    }
  ]
};

// ── 유틸 ────────────────────────────────────────────────────
function pickFont(themeKey, override) {
  if (override) {
    const f = FONTS.find(x => x.name === override);
    if (f) return f.family;
  }
  const t = THEMES[themeKey] || THEMES.clean;
  return t.vars["--font-family"];
}

export function applyTheme(rootEl, themeKey, fontOverride) {
  const t = THEMES[themeKey] || THEMES.clean;
  for (const [k, v] of Object.entries(t.vars)) rootEl.style.setProperty(k, v);
  rootEl.style.setProperty("--font-family", pickFont(themeKey, fontOverride));
}

// 페이지 카드에 부분 override를 적용 (전역 폰트가 있으면 그게 이김)
export function applyPageOverride(cardEl, page, globalFont) {
  if (page.theme && THEMES[page.theme]) {
    const t = THEMES[page.theme];
    for (const [k, v] of Object.entries(t.vars)) {
      // 전역 폰트가 지정돼 있으면 페이지 테마의 폰트는 무시
      if (k === "--font-family" && globalFont) continue;
      cardEl.style.setProperty(k, v);
    }
  }
  if (page.fontFamily) {
    const f = FONTS.find(x => x.name === page.fontFamily);
    if (f) cardEl.style.setProperty("--font-family", f.family);
  }
}

// 캔버스 높이 + 테마에서 최대 항목 수 계산.
// 보수적으로 잡아서 잘림 방지.
export function maxItemsPerPage(canvasHeight, themeKey, hasHeader = false) {
  const t = THEMES[themeKey] || THEMES.clean;
  const fontSize  = parseInt(t.vars["--amount-size"]) || 24;
  const rowGap    = parseInt(t.vars["--row-gap"]) || 2;
  const padTop    = parseInt((t.vars["--panel-padding"] || "0").split(/\s+/)[0]) || 0;
  const padBot    = padTop;
  const lineH     = Math.ceil(fontSize * 1.35);   // 한글 line-height 여유
  let available   = canvasHeight - padTop - padBot;
  // 헤더가 있으면 한 줄 + 여백만큼 항목 공간을 줄여 잘림 방지
  if (hasHeader) available -= Math.ceil(fontSize * 1.15 * 1.2) + 10;
  return Math.max(1, Math.floor((available + rowGap) / (lineH + rowGap)));
}

function toArray(v) {
  if (Array.isArray(v)) return v.filter(x => x != null);
  if (v && typeof v === "object") return Object.values(v).filter(x => x != null);
  return [];
}

export function normalizeData(data) {
  const d = {
    config: { ...DEFAULT_DATA.config, ...(data?.config || {}) },
    pages:  toArray(data?.pages)
  };
  if (!d.pages.length) d.pages = DEFAULT_DATA.pages;
  d.pages = d.pages.map(p => ({
    id:         p.id || ("p" + Math.random().toString(36).slice(2,8)),
    name:       p.name || "(이름 없음)",
    header:     p.header || "",
    theme:      p.theme || null,
    fontFamily: p.fontFamily || null,
    items:      toArray(p?.items)
  }));
  return d;
}
