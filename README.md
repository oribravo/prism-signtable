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

## 3. PRISM Live / OBS에 연결

표시 페이지의 캔버스는 **패널 크기와 동일한 300 × 400**으로 설계되어 있습니다. 웹소스 박스 자체를 송출 화면에서 끌어다 원하는 위치에 놓으면 끝.

### PRISM Live 모바일

1. PRISM Live 앱 실행 → 송출 화면에서 **소스 추가** → **웹소스**(또는 "웹 페이지" / "Browser Source") 선택.
2. **URL**: `https://<본인계정>.github.io/<저장소명>/`
3. **너비**: `300`, **높이**: `400`
4. **배경 투명**: 체크
5. 송출 캔버스에서 박스를 원하는 자리(예: 우측 상단)로 드래그.

### OBS Studio

1. **소스 추가 → 브라우저(Browser)**
2. **URL**: 표시 페이지 주소
3. **너비**: `300`, **높이**: `400`
4. **사용자 정의 CSS**: 비우기
5. **OBS가 보이지 않을 때 소스 종료**: 끔

> 일부 PRISM 빌드의 모바일 웹소스는 자바스크립트가 제한적일 수 있습니다. 출력이 안 되면 §5 트러블슈팅을 보세요.

### 캔버스 크기 변경 (선택)

항목이 많아져서 잘리거나, 더 작게 쓰고 싶으면 URL에 파라미터 추가:

```
.../prism-signtable/?w=320&h=480
```

`w`, `h`는 픽셀 단위. PRISM/OBS의 소스 너비·높이도 같은 값으로 맞춰주세요.

폰에서 관리 페이지 URL을 즐겨찾기 또는 홈화면에 추가해 두면, 방송 중에도 한 손으로 가격 수정이 가능합니다.

---

## 4. 사용법

**관리 페이지**

- **전체 설정**: 테마 프리셋, 전역 폰트, 페이지 전환 주기, 페이드 시간, 캔버스 너비·높이.
- **회전 페이지**: 페이지 N개를 만들면 표시 페이지에서 순차적으로 루프됩니다(기본 4페이지).
  - 페이지마다 **개별 테마/폰트** 선택 가능 (예: VIP 페이지만 핑크블링).
  - 항목마다 **라벨 색상 override** 가능 (색상 점 클릭 → 컬러피커, ⟲로 초기화).
  - 페이지 이름은 클릭해서 바로 수정.
  - ▲▼로 순서 변경, ×로 삭제.
  - **항목수 / 최대** 뱃지가 헤더에 표시됩니다. 한도에 도달하면 "+ 항목 추가" 버튼이 비활성화돼서 잘림을 방지합니다.
- 모든 변경사항은 **입력 즉시 자동 저장**되고 1초 이내 송출 화면에 반영됩니다.

**테마 프리셋 19종** (상위 8종이 투명배경 — OBS/PRISM에서 가장 많이 쓰임)

| 키 | 분위기 |
|---|---|
| `clean`     | 투명 + 흰글자 + 강한 그림자 — 기본값 |
| `outlineB`  | 투명 + 흰글자 + 두꺼운 검정 외곽선 (검은고딕) |
| `outlineW`  | 투명 + 검정글자 + 두꺼운 흰 외곽선 (밝은 배경용) |
| `softHalo`  | 투명 + 글자 뒤 부드러운 검정 후광 (배경 어떤 색이든 가독성) |
| `goldGlow`  | 투명 + 골드 네온 글로우 + 진한 외곽 |
| `pinkGlow`  | 투명 + 핑크 네온 글로우 (주아체) |
| `cyanGlow`  | 투명 + 시안 네온 글로우 (게임/방송 톤) |
| `popArt`    | 투명 + 노랑글자 + 검정외곽 + 빨강 오프셋 (팝아트 느낌) |
| `classic`   | 노란 숫자 + 흰 라벨 (기존 GIF 느낌) |
| `neon`      | 시안 + 핑크 네온 글로우 |
| `minimal`   | 흰 단색 + 얇은 테두리 |
| `pinkbling` | 핑크 + 골드 |
| `cyber`     | 모노스페이스 그린 |
| `gold`      | 블랙 + 골드 (고급) |
| `vintage`   | 세피아 + 크림 (바탕체 느낌) |
| `ice`       | 반투명 푸른 글래스 |
| `arcade`    | 검정 + 핑크/시안/노랑 (레트로 8비트) |
| `paper`     | 메모지 화이트 + 손글씨 |
| `kawaii`    | 파스텔 핑크 |

**선택 가능한 폰트 13종**

Noto Sans KR · 검은고딕 · 주아 · 도현 · 나눔고딕 · 나눔펜 · 고운돋움 · 고운바탕 · 하이멜로디 · 큐트 · 동해독도 · 선플라워 · Share Tech Mono

테마와 별도로 전역 폰트를 선택할 수 있고, 페이지마다 별도 폰트 지정도 가능합니다. "(테마 기본)"으로 두면 테마가 정한 폰트가 적용됩니다.

테마를 더 추가하거나 색을 미세 조정하고 싶으면 `shared.js`의 `THEMES` 객체에서 CSS 변수만 바꾸면 됩니다.

**페이지당 항목수 한도**

캔버스 높이 + 테마의 폰트 크기·여백을 바탕으로 자동 계산됩니다. 예: 캔버스 높이 400 + `clean` 테마 → 약 12개. 더 많이 넣고 싶으면 캔버스 높이를 늘리세요.

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
