# 📝 과제 2. Vanilla JS Todo 앱 React 마이그레이션

---

## 📁 프로젝트 구조

todo-react/
├── index.html              # React 앱이 마운트되는 HTML 진입 파일
├── package.json            # 프로젝트 의존성 및 실행 스크립트
├── vite.config.js          # Vite, React, Tailwind CSS 설정
└── src/
    ├── main.jsx            # React 앱 렌더링 진입점
    ├── App.jsx             # 전체 앱 화면 조합
    ├── components/         # UI 컴포넌트
    ├── hooks/              # Todo 상태 관리 로직
    ├── utils/              # 날짜, Todo 유틸 함수
    └── styles/index.css    # Tailwind CSS 및 전역 스타일

---

## ✅ 구현 기능

기본 미션

Todo CRUD (생성 / 수정 / 완료 처리 / 삭제)
상태별 필터링 (전체 / 진행 중 / 완료)
일간 뷰 (선택 날짜별 Todo 관리)
로컬스토리지 연동 (새로고침 후에도 데이터 유지)

도전 미션

주간 뷰 (월요일부터 일요일까지 날짜별 Todo 현황)

추가 개선

Enter / Shift + Enter 입력 동작 개선
라이트 / 다크 모드
Todo 액션 버튼 상태별 색상 개선

---

## 🛠️ 활용 스택

React
Vite
Tailwind CSS
JavaScript
Web Storage API (localStorage)

---

## 기능 구현 체크리스트

- [x]  필수 기능이 모두 구현되어 있다
- [x]  필요에 따라, README.md에 구현한 기능에 대한 설명을 작성했다
- [x]  예외 상황에서도 오류 없이 동작한다 (ex. 빈 입력값 제출, 데이터 없는 상태 등)
- [x]  새로고침 후에도 데이터가 유지되거나 의도한 대로 초기화된다

### 코드 품질

- [x]  불필요한 `console.log`, 주석 처리된 사용하지 않는 코드가 제거되어 있다
- [x]  변수명과 함수명이 역할을 명확히 나타낸다
- [x]  중복 코드가 없고, 반복되는 로직은 함수로 분리되어 있다
- [x]  들여쓰기와 코드 포맷이 일관되게 유지되어 있다

### UI/UX

- [x]  모든 기능이 UI 상에서 명확하게 인지 가능하다
- [x]  빈 상태(데이터 없음)에 대한 화면 처리가 되어 있다

### 브라우저 검증

- [x]  크롬 기준 콘솔에 에러가 없다
- [x]  주요 기능을 직접 클릭하며 E2E 흐름을 확인했다

### 프로젝트 구조

- [x]  파일과 폴더 구조가 정리되어 있다
- [x]  불필요한 파일이 포함되어 있지 않다 (ex. node_modules, .DS_Store 등)
