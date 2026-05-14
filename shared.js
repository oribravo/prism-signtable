// ============================================================
// shared.js
// 테마 프리셋, 기본 데이터, Firebase 초기화, 유틸리티 함수.
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

// ── 테마 프리셋 5종 ─────────────────────────────────────────
// 각 테마는 CSS 변수로 매핑됩니다. 항목별 색상 override 가능.
export const THEMES = {
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
      "--font-family":   "'Noto Sans KR', 'Malgun Gothic', sans-serif",
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
      "--font-family":   "'Share Tech Mono', 'Noto Sans KR', monospace",
      "--text-shadow":   "0 0 4px #00FF88, 0 0 10px rgba(0,255,136,0.4)"
    }
  }
};

// ── 기본 데이터 (DB가 비어있을 때 사용) ─────────────────────
export const DEFAULT_DATA = {
  config: {
    activeTheme: "classic",
    pageInterval: 5000,
    transitionMs: 500
  },
  pages: [
    {
      id: "p1", name: "VIP 등급", theme: null,
      items: [
        { amount: "100,000",   label: "제킹시크", color: null },
        { amount: "200,000",   label: "VIP",     color: null },
        { amount: "500,000",   label: "VVIP",    color: null },
        { amount: "1,000,000", label: "GOD",     color: null }
      ]
    },
    {
      id: "p2", name: "1만원대", theme: null,
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
      id: "p3", name: "2만원대", theme: null,
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
    }
  ]
};

// ── 유틸: 테마 CSS 변수 적용 ───────────────────────────────
export function applyTheme(rootEl, themeKey) {
  const t = THEMES[themeKey] || THEMES.classic;
  for (const [k, v] of Object.entries(t.vars)) {
    rootEl.style.setProperty(k, v);
  }
}

// ── 유틸: 데이터 정합성 보정 ───────────────────────────────
// Firebase가 배열에 빈 칸이 있으면 객체로 돌려주는 경우가 있어 보정.
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
  // 각 페이지의 items도 보정
  d.pages = d.pages.map(p => ({
    ...p,
    items: toArray(p?.items)
  }));
  return d;
}
