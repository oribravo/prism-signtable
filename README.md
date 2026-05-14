# 프리즘 라이브 시그표

PRISM Live의 웹소스로 들어가는 **표시 페이지**와, 폰에서 접속해 실시간으로 수정하는 **관리 페이지**로 구성된 라이브 오버레이입니다. 정적 파일은 GitHub Pages가 호스팅하고, 실시간 데이터는 Firebase Realtime Database가 다리 역할을 합니다.

```
[관리 페이지 (폰)] ──쓰기──► Firebase Realtime DB ──구독──► [표시 페이지 (PRISM 웹소스)]
```

표시 페이지는 화면 우측 상단에 위치한 **회전 가격표 패널** 하나만 그립니다. 페이지를 여러 개 만들어 두면 설정한 주기로 자동 순환합니다.

## 파일 구성

```
index.html   표시 페이지 (PRISM에 URL로 넣음)
admin.html   관리 페이지 (폰 즐겨찾기로)
shared.js    테마 정의 + Firebase 초기화 + 유틸
config.js    ⭐ Firebase 키 (직접 수정 필요)
README.md    이 문서
```

`config.js`만 본인 Firebase 값으로 채우면 됩니다.

---

## 1. Firebase 프로젝트 만들기 (5분)

1. <https://console.firebase.google.com> 접속 → **프로젝트 추가**.
2. 이름 아무거나 (예: `prism-signtable`). Google Analytics는 **사용 안 함** 선택해도 됨.
3. 좌측 메뉴 → **빌드 → Realtime Database** → **데이터베이스 만들기**.
   - 위치: `asia-southeast1` 같은 가까운 리전 추천.
   - 보안 규칙: **테스트 모드**로 시작.
4. 프로젝트 설정(⚙️ 톱니바퀴) → **내 앱** → **웹 앱 추가**(`</>` 아이콘).
   - 닉네임 아무거나. **호스팅 설정은 체크하지 않습니다.** (GitHub Pages 쓸 거임)
   - 다음 화면에 나오는 `firebaseConfig` 객체를 복사해두세요.

### config.js 채우기

`config.js`를 열어 값을 방금 복사한 값으로 교체:

```js
export const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "prism-signtable.firebaseapp.com",
  databaseURL:       "https://prism-signtable-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "prism-signtable",
  storageBucket:     "prism-signtable.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef"
};
```

> ⚠️ `databaseURL` 이 빠지는 경우가 많아요. Firebase 콘솔의 **Realtime Database** 페이지 상단에 표시된 URL을 직접 넣어주세요.

---

## 2. GitHub에 올리고 Pages로 배포

1. GitHub에 새 저장소 생성.
2. 이 폴더의 파일들을 그대로 푸시:
   ```bash
   cd "프리즘 라이브 시그표"
   git init
   git add .
   git commit -m "init signtable overlay"
   git branch -M main
   git remote add origin https://github.com/<본인계정>/<저장소명>.git
   git push -u origin main
   ```
3. GitHub 저장소 → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / 폴더 `/(root)` → **Save**.
4. 1~2분 뒤 다음 URL이 활성화됩니다:
   - 표시 페이지: `https://<본인계정>.github.io/<저장소명>/`
   - 관리 페이지: `https://<본인계정>.github.io/<저장소명>/admin.html`

---

## 3. PRISM Live에 연결

1. PRISM Live 모바일 앱 실행 → 송출 화면에서 **소스 추가** → **웹소스**(또는 "웹 페이지" / "Browser Source") 선택.
2. URL 칸에 표시 페이지 주소 입력: `https://<본인계정>.github.io/<저장소명>/`
3. 해상도: **720 × 1280** (캔버스가 그 사이즈로 설계됨).
4. 배경: **투명**으로.
5. 위치/크기: 전체 화면 오버레이로 배치. 패널은 페이지 내부에서 자동으로 우측 상단에 자리 잡습니다.

> 일부 PRISM 빌드의 모바일 웹소스는 자바스크립트가 제한적일 수 있습니다. 출력이 안 되면 §5 트러블슈팅을 보세요.

폰에서 관리 페이지 URL을 즐겨찾기 또는 홈화면에 추가해 두면, 방송 중에도 한 손으로 가격 수정이 가능합니다.

---

## 4. 사용법

**관리 페이지**

- **전체 설정**: 테마 프리셋 5종, 페이지 전환 주기, 페이드 시간.
- **회전 페이지**: 페이지를 N개 만들면 표시 페이지에서 순차적으로 루프됩니다.
  - 페이지마다 **개별 테마** 선택 가능 (예: VIP 페이지만 핑크블링).
  - 항목마다 **라벨 색상 override** 가능 (색상 점 클릭 → 컬러피커, ⟲로 초기화).
  - 페이지 이름은 클릭해서 바로 수정.
  - ▲▼로 순서 변경, ×로 삭제.
- 모든 변경사항은 **입력 즉시 자동 저장**되고 1초 이내 송출 화면에 반영됩니다.

**테마 프리셋**

| 키 | 분위기 |
|---|---|
| `classic`   | 노란 숫자 + 흰 라벨 (현재 GIF 느낌) |
| `neon`      | 시안 + 핑크 네온 글로우 |
| `minimal`   | 흰 단색 + 얇은 테두리 |
| `pinkbling` | 핑크 + 골드 |
| `cyber`     | 모노스페이스 그린 |

테마를 더 추가하거나 색을 미세 조정하고 싶으면 `shared.js`의 `THEMES` 객체에서 CSS 변수만 바꾸면 됩니다.

---

## 5. 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| 표시 페이지가 빈 화면 | 1) `config.js`의 `databaseURL`이 비어있음, 또는 잘못된 리전 URL. 콘솔의 Realtime Database 페이지 상단 URL을 그대로 복사. 2) GitHub Pages 빌드가 아직 안 끝남(첫 배포는 1~2분 대기). |
| 좌측 하단에 "DB 연결 실패" | Firebase 규칙이 잠긴 상태. Database → 규칙 탭에서 테스트 모드로 다시 열기. |
| 폰트가 깨짐 | Noto Sans KR이 Google Fonts에서 로드. 인터넷 약하면 시스템 폰트로 폴백. |
| PRISM에서 투명배경이 안 됨 | PRISM 모바일이 일부 빌드에서 투명 webview 미지원. 표시 페이지 배경을 키잉용 단색으로 바꾼 뒤 PRISM에서 크로마키 처리 검토. |
| 페이지가 한 장만 보이고 회전 안 함 | 페이지가 1개일 때는 회전 없음(정상). 2개 이상 추가하면 회전 시작. |
| 항목별 색이 안 먹음 | 라벨 색만 override됩니다. 금액 색 override는 현재 미지원(필요하면 추가). |

---

## 6. 확장 아이디어

- 항목별 폰트/굵기/크기/금액색 override
- 후원 알림과 연동 — 특정 금액이 들어오면 해당 행 깜빡임
- 패널 위치 좌표 지정 (좌측/우측/하단 전환)
- 즉시 강조: 관리 페이지에서 항목을 길게 누르면 표시 페이지에서 잠시 빛남
- 페이지 단위 일시 숨김

원하시는 거 알려주시면 추가 작업해 드릴게요.
