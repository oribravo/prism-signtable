// ============================================================
// config.js
// Firebase 설정. 셋업 방법은 README.md 참고.
// ============================================================

// Firebase 콘솔 → 프로젝트 설정 → "내 앱"에서 복사한 값으로 채워주세요.
export const firebaseConfig = {
  apiKey:            "AIzaSyCQDqymj4vsoX-3C8nQ_-FtP2NcyCUEoqQ",
  authDomain:        "prism-sigtable.firebaseapp.com",
  databaseURL:       "https://prism-sigtable-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "prism-sigtable",
  storageBucket:     "prism-sigtable.firebasestorage.app",
  messagingSenderId: "209657061204",
  appId:             "1:209657061204:web:55c93d48e092f9b372b2c1"
};

// 데이터베이스 내 데이터가 저장될 루트 키. 보통 변경 불필요.
export const dbRoot = "signtable";
