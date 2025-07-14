## 🧠 클라이언트 상태관리란?

클라이언트 상태관리는 **사용자의 브라우저(또는 프론트엔드 앱)에서 일시적으로 유지되는 데이터**를 의미합니다.  
예를 들면, 사용자가 입력한 값, UI의 열림/닫힘 상태, 필터 선택값, 정렬 옵션 등입니다.  
이러한 상태를 **어떻게 저장하고, 어떻게 컴포넌트에 전달할지**에 따라 개발의 유지보수성과 확장성이 크게 달라집니다.

React에서는 다양한 상태관리 방식이 존재하며, 이 프로젝트에서는 그 대표적인 5가지를 비교합니다:

- `useState`
- `Prop Drilling`
- `Context API`
- `Redux Toolkit`
- `Zustand`

<br>

- 데모 링크: [올림픽 매달 트래커](https://olympic-version.vercel.app/)
- 주요 기능: 입력 / 수정 / 삭제 / 정렬 / 저장(localStorage)

---

## 🧭 각 상태관리 방식의 특징, 장단점, 한계점

| 방식            | 핵심 개념                           | 장점                               | 단점 / 한계점                       | 적합한 상황                       |
| --------------- | ----------------------------------- | ---------------------------------- | ----------------------------------- | --------------------------------- |
| `useState`      | 컴포넌트 내부 상태 관리             | 간단, 빠름, 직관적                 | 전역 공유 불가, 재사용 어려움       | 로컬 UI 상태 (ex. 모달 열기/닫기) |
| `Prop Drilling` | 상위 → 하위로 상태 전달             | 구조 명확, 제어 쉬움               | 중첩 깊어지면 복잡, 유지보수 어려움 | 컴포넌트 수가 적고 명확할 때      |
| `Context API`   | 전역 Provider로 상태 공유           | 전역 관리 가능, Redux 없이도 됨    | 리렌더링 범위 넓음, 성능 저하 가능  | 소규모 앱의 테마, 로그인 등       |
| `Redux Toolkit` | 상태+액션을 모듈화, 전역 store 관리 | 정형화, 확장성 최고, Devtools 지원 | 코드량 많음, 진입장벽 있음          | 복잡한 앱, 대규모 상태 관리       |
| `Zustand`       | 최소 코드로 전역 상태 관리          | 가볍고 직관적, 미들웨어 유연       | 상태 구조 커지면 관리 어려움        | 중소 규모 앱, 빠른 프로토타입     |

---

## 🔍 각 방식의 차이점 요약

| 비교 항목     | useState  | props | context | redux-toolkit       | zustand                   |
| ------------- | --------- | ----- | ------- | ------------------- | ------------------------- |
| 전역 관리     | ❌        | ❌    | ⭕      | ⭕                  | ⭕                        |
| 구조화 수준   | 낮음      | 중간  | 중간    | 높음                | 낮음~중                   |
| 러닝 커브     | 가장 낮음 | 낮음  | 중간    | 높음                | 낮음                      |
| 미들웨어 확장 | ❌        | ❌    | ❌      | ⭕ (thunk, saga 등) | ⭕ (persist, devtools 등) |
| DevTools 지원 | ❌        | ❌    | ❌      | ⭕                  | ⭕ (설정 필요)            |
| 상태 분리도   | 낮음      | 낮음  | 중간    | 높음                | 선택적                    |

---

## 🧵 기술 선택 기준은?

상태관리에는 **정답**이 없고 **상황에 맞는 선택**만 있습니다.  
따라서 각 기술의 트레이드오프를 이해하고, 아래 기준에 따라 적절히 선택하는 것이 중요합니다:

- 상태가 단순하고 컴포넌트 간 공유가 필요 없을 경우 → `useState`
- 상태를 명시적으로 흐르게 하고 싶을 경우 → `props`
- 전역 설정, 로그인 상태, 테마 설정 등 → `Context API`
- 복잡한 상태 흐름, 비동기 처리, 액션 추적이 필요한 경우 → `Redux Toolkit`
- 빠르게 프로토타입 만들고 싶고, 코드 양을 줄이고 싶다면 → `Zustand`

---

## 🧨 상태관리의 한계점과 주의사항

1. **Context API는 만능이 아니다**

   - 전역 상태가 많아질수록 성능 이슈 발생
   - 상태 단위로 분리하지 않으면 "전체 앱이 리렌더링" 될 수 있음

2. **Redux는 강력하지만 무겁다**

   - 코드가 많고 설정이 복잡해질 수 있음
   - 단순한 앱에는 오히려 역효과

3. **Zustand는 자유롭지만 위험하다**

   - 구조 강제가 없어서 개발자 실수에 취약
   - 팀 프로젝트에선 일관된 설계가 필요

4. **useState만으로는 확장에 한계가 있다**
   - 하나의 상태를 여러 컴포넌트가 공유해야 하는 순간부터 구조가 깨지기 시작함

---

## 📦 이 프로젝트에서 구현한 방식별 구조

| 브랜치명  | 사용 기술       | 설명                                      |
| --------- | --------------- | ----------------------------------------- |
| `state`   | `useState`      | 가장 기본적인 상태관리 방식               |
| `props`   | `Prop Drilling` | 상위 상태를 하위로 전달                   |
| `context` | `Context API`   | 전역 상태 공유, custom hook 사용          |
| `redux`   | `Redux Toolkit` | 정형화된 구조, slice 기반                 |
| `zustand` | `Zustand`       | 간결하고 빠른 전역 상태관리, persist 적용 |

---

## ⏳ 비동기 처리 지원 비교

| 방식            | 비동기 처리 방식                         | 특징 및 주의점                         |
| --------------- | ---------------------------------------- | -------------------------------------- |
| `useState`      | ❌ 직접 처리 X, useEffect 조합 필요      | 비동기 상태 흐름을 구조화하기 어려움   |
| `Prop Drilling` | ❌ 직접 처리 X                           | 비동기 로직은 상위에서 처리해야 안정적 |
| `Context API`   | 🔸 가능하나 성능 저하 주의               | 비동기 후 setContext 시 리렌더 이슈    |
| `Redux Toolkit` | ⭕ `createAsyncThunk` 등으로 구조화 가능 | 명확한 로딩/에러 상태 처리 가능        |
| `Zustand`       | ⭕ 상태함수 내부에서 비동기 직접 가능    | 자유도가 높지만, 일관된 패턴 필요      |

---

## 🧩 상태 간 의존성 관리

여러 상태가 서로 영향을 줄 때, 구조가 꼬이기 쉬운데 각 방식의 대응력은 다음과 같음:

| 방식            | 상태 간 의존성 대응력            | 비고                         |
| --------------- | -------------------------------- | ---------------------------- |
| `useState`      | 매우 낮음 – 복잡도 증가 시 취약  | 단순 UI 상태 전용            |
| `props`         | 낮음 – 상태 흐름 추적 어려움     | 유지보수 난이도 ↑            |
| `Context API`   | 중간 – context 분리로 대응 가능  | 분리 설계 중요               |
| `Redux Toolkit` | 매우 강함                        | slice 간 결합 구조 설계 유리 |
| `Zustand`       | 중간 – 자유도는 높으나 혼란 가능 | custom store 분리 필수       |

---

## 🧭 상태관리 기술 선택 가이드 요약

| 상황                                              | 추천 방식       |
| ------------------------------------------------- | --------------- |
| 간단한 로컬 상태만 있을 때                        | `useState`      |
| 부모 → 자식 단순 상태 전달이 필요한 구조일 때     | `Prop Drilling` |
| 로그인 상태, 테마 등 전역 설정이 필요할 때        | `Context API`   |
| 상태가 많고, 비동기/복잡 로직까지 다뤄야 할 때    | `Redux Toolkit` |
| 빠르게 MVP/프로토타입 만들거나 개인 프로젝트일 때 | `Zustand`       |

---

## ⚠️ 추가 주의점: 성능과 구조화

- Context API는 값 하나 바뀌면 관련 없는 하위 컴포넌트까지 리렌더링되는 구조이므로, React.memo나 context 분할 필수
- Redux Toolkit은 slice별 분리로 인해 모듈화가 잘 되지만, 작은 앱에서는 오히려 복잡하고 과한 설계가 될 수 있음
- Zustand는 직관적이지만 자유도가 너무 높아서, 실무에서는 팀 내 store 분리 기준, 네이밍 컨벤션을 명확히 정해야 실수 줄일 수 있음

---

## 🧪 DevTools & 비동기 상태 추적 팁

- ✅ Redux Toolkit은 DevTools로 상태 추적이 매우 편리하며 createAsyncThunk로 비동기 로직 구조화 가능
- ✅ Zustand도 devtools 미들웨어 설정 시 실시간 상태 확인 가능
- ✅ Dev 환경에선 상태 흐름 추적, 실시간 디버깅을 위해 DevTools 사용을 강력히 권장

---

## 💡 실전 예시 코드 (메달 상태 변경)

### `useState`

```tsx
const [medal, setMedal] = useState({ country: '', gold: 0 });

<Input name="country" onChange={(e) => setMedal({ ...medal, country: e.target.value })} />;
```

### `props`

```tsx
<form onSubmit={onCreate}>

<Input value={medal.country} onChange={(e) => setMedal({ ...medal, country: e.target.value })} />

```

### `Context API`

```tsx
const { medal, onChange } = useContext(MedalContext);

<Input value={medal.country} onChange={(e) => onChange({ ...medal, country: e.target.value })} />;
```

### `Redux Toolkit`

```tsx
const dispatch = useDispatch();
const medal = useSelector((state) => state.olympic.medal);

<Input name="country" onChange={(e) => dispatch(setMedal({ country: e.target.value }))} />;
```

### `Zustand`

```tsx
const { medal, onChanged } = useOlympicStore();

<Input name="country" value={medal.country} onChange={(e) => onChanged({ country: e.target.value })} />;
```

## 🎯 결론

이 프로젝트는 단순한 CRUD 기능을 5가지 상태관리 방식으로 각각 구현함으로써,  
**각 기술의 실제 사용성, 구조적 차이, 유지보수 난이도, 개발자 경험 등을 비교 분석**하는 실험형 학습 프로젝트입니다.

단순히 구현에 그치지 않고,

- 어떤 기술이 어떤 상황에 적합한지
- 어떻게 선택하고 판단할 수 있는지
  를 몸으로 익히는 데 목적이 있습니다.
