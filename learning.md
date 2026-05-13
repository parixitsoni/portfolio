# Frontend Learning Notes — Parixit Soni

> Frontend Developer | React.js & Next.js Specialist
> Last Updated: May 2026

---

## React

### useEffect
**Complexity:** ⭐⭐ | **Company Level:** Mid-level

**Concept:** Side effects handle karne ke liye — API calls, timers, subscriptions.

**3 cases:**
```js
useEffect(() => { fetchData(); }, []);        // sirf ek baar — mount pe
useEffect(() => { fetchData(); });             // har render pe
useEffect(() => { fetchData(); }, [userId]);   // jab userId change ho
```

**Cleanup:**
```js
useEffect(() => {
  const timer = setTimeout(() => fetchData(), 3000);
  return () => clearTimeout(timer); // cleanup — memory leak rokta hai
}, []);
```

---

### useState — Batching
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

**Concept:** Component ka local state manage karna.

**Batching — React 18:**
```js
// Same value — re-render nahi hoga (primitive)
setName("Parixit");
setName("Parixit"); // skip

// Multiple updates — sirf 1 re-render
setName("Parixit");
setAge(25);

// Functional update — latest value ke liye (stale state fix)
setCount(prev => prev + 1); // correct
setCount(prev => prev + 1); // 0 → 1 → 2

// Stale problem
setCount(count + 1); // 0 → 1
setCount(count + 1); // 0 → 1 — result: 1 ❌
```

---

### useCallback vs useMemo vs React.memo
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

| Hook | Kya karta hai | Kab use karo |
|------|--------------|--------------|
| `React.memo` | Component memoize | Parent re-render pe child rokna |
| `useCallback` | Function memoize | Child ko same function reference dena |
| `useMemo` | Value memoize | Expensive calculation cache karna |

> **Rule:** React.memo = component | useCallback = function | useMemo = value

```js
// React.memo — component wrap
const Child = React.memo(({ onClick }) => <button onClick={onClick}>Click</button>);

// useCallback — function memoize
const handleClick = useCallback(() => doSomething(id), [id]);

// useMemo — value memoize
const filtered = useMemo(() => items.filter(i => i.active), [items]);
```

---

### React Strict Mode
**Complexity:** ⭐⭐ | **Company Level:** Mid-level

- Development mein useEffect **2 baar** run karta hai
- Production pe koi effect nahi
- Deprecated methods detect karta hai

---

## Redux & State Management

### Redux Toolkit vs Context API
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

| | Context API | Redux | Redux Toolkit |
|--|-------------|-------|---------------|
| Setup | Zero | Heavy | Simple |
| Re-renders | Sab re-render | Selective | Selective |
| DevTools | No | Yes | Yes |
| Boilerplate | Low | High | Low |
| Use case | Theme, lang | Complex state | Complex state |

**createSlice:**
```js
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isLoggedIn: false },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    }
  }
});

export const { login, logout } = authSlice.actions;
```

**useSelector + useDispatch:**
```js
const { user } = useSelector(state => state.auth);
const dispatch = useDispatch();
dispatch(login({ name: "Parixit" }));
```

---

### Redux Thunk vs Saga
**Complexity:** ⭐⭐⭐⭐ | **Company Level:** Senior / MNC

| | Thunk | Saga |
|--|-------|------|
| Async | Simple API calls | Complex flows |
| Syntax | async/await | Generator functions |
| Use case | Most apps | Large enterprise apps |

```js
// Thunk — createAsyncThunk
const fetchUser = createAsyncThunk('user/fetch', async (id) => {
  const res = await fetch(`/api/user/${id}`);
  return res.json();
});

// Saga — generator function
function* fetchUserSaga(action) {
  try {
    const user = yield call(fetchUser, action.payload);
    yield put(fetchSuccess(user));
  } catch(err) {
    yield put(fetchFailed(err));
  }
}
```

---

### Same State Dispatch — Re-render Hoga?
**Complexity:** ⭐⭐⭐⭐ | **Company Level:** MNC

| | Primitive same | Object same |
|---|---|---|
| useState | No re-render | Re-render (naya reference) |
| Redux Toolkit | No re-render | No re-render (shallow compare) |

---

## Next.js

### Rendering Patterns
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

| Pattern | Full Form | Kab |
|---------|-----------|-----|
| CSR | Client Side Rendering | Dashboard, admin — SEO matter nahi |
| SSR | Server Side Rendering | Real time data — user profile |
| SSG | Static Site Generation | Blog, landing pages |
| ISR | Incremental Static Regeneration | E-commerce — data thoda change hota hai |

---

### Token Storage
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

| Storage | XSS Safe | Refresh Safe |
|---------|----------|--------------|
| localStorage | No ❌ | Yes |
| Cookie (httpOnly) | Yes ✅ | Yes |
| Memory/State | Yes ✅ | No ❌ |

> httpOnly cookie — JavaScript access nahi kar sakti — best option for tokens.

---

## JavaScript

### Event Loop
**Complexity:** ⭐⭐⭐⭐ | **Company Level:** MNC

```
Call Stack → khaali hua?
    ↓
Microtask Queue — Promises, async/await (PEHLE)
    ↓
Callback Queue — setTimeout, setInterval (BAAD MEIN)
```

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2
// Kyun: 1,4 sync | 3 microtask | 2 callback queue
```

---

### Closures
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

**Short note:** Inner function outer function ke variables access karta hai — even after outer function complete ho jaaye.

```js
function counter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  }
}
const increment = counter();
increment(); // 1
increment(); // 2 — count abhi bhi accessible hai
increment(); // 3
```

---

### Promises
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

```js
// Promise.all — ek fail = sab fail
Promise.all([api1(), api2()]).then(results => {});

// Promise.allSettled — sab complete hone deta hai
Promise.allSettled([api1(), api2()]).then(results => {
  results.forEach(r => {
    if (r.status === "fulfilled") console.log(r.value);
    else console.log(r.reason);
  });
});
```

---

### var vs let vs const
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

```js
// var — function scoped, hoisted
// let — block scoped
// const — block scoped, reference lock

const arr = [1, 2, 3];
arr.push(4);    // ✅ — reference same, andar data badla
arr = [5, 6];   // ❌ — reference badal raha hai

// var loop bug
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // 3, 3, 3 ❌
}

// Fix 1 — let use karo
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // 0, 1, 2 ✅
}

// Fix 2 — IIFE
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 1000))(i); // 0, 1, 2 ✅
}
```

---

### Primitive vs Reference Types
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

```
Primitive — string, number, boolean, null, undefined
  → direct value store hoti hai
  → const se change nahi ho sakti

Reference — array, object, function
  → memory address store hota hai
  → const se andar data change ho sakta hai
```

---

### this — Regular vs Arrow Function
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

```js
// Regular — this caller pe depend karta hai
const obj = {
  name: "Parixit",
  greet: function() { console.log(this.name); } // "Parixit"
};

// Arrow — this parent scope se aata hai (lexical)
const obj2 = {
  name: "Parixit",
  greet: () => { console.log(this.name); } // undefined
};
```

---

### map vs forEach
**Complexity:** ⭐⭐ | **Company Level:** Mid-level

| | map | forEach |
|---|---|---|
| Return | Naya array | undefined |
| Chaining | Yes | No |
| Use case | Transform data | Side effects |

```js
// map — naya array return karta hai
[1,2,3].map(n => n * 2); // [2, 4, 6]

// forEach — kuch return nahi, sirf loop
[1,2,3].forEach(n => console.log(n));
```

---

### typeof
**Complexity:** ⭐⭐ | **Company Level:** Mid-level

```js
typeof null        // "object" — JS bug!
typeof undefined   // "undefined"
typeof []          // "object"
typeof {}          // "object"
typeof ""          // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof function(){} // "function"
```

---

### === vs ==
**Complexity:** ⭐⭐ | **Company Level:** Mid-level

```js
"5" == 5   // true  — type convert karta hai (loose equality)
"5" === 5  // false — type check bhi karta hai (strict equality)
null == undefined  // true
null === undefined // false
```

> **Rule:** Hamesha `===` use karo unless type coercion deliberately chahiye.

---

## CSS

### Flexbox vs Grid
**Complexity:** ⭐⭐ | **Company Level:** Mid-level

```
Flexbox — 1D — row ya column
Grid    — 2D — rows aur columns dono
```

```css
/* Flexbox */
.navbar { display: flex; justify-content: space-between; align-items: center; }

/* Grid */
.dashboard { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
```

---

### Position
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior

| Position | Behavior | Use case |
|----------|----------|----------|
| relative | Apni jagah se shift, space rehti hai | Child ka anchor |
| absolute | Nearest positioned parent ke corner pe | Tooltip, dropdown |
| fixed | Viewport pe fix — scroll pe nahi hilta | Navbar, chat button |
| sticky | Scroll pe ek jagah chipak jaata hai | Table header |

---

### Display None vs Visibility Hidden vs Opacity 0
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior

| | Space leta hai | Clickable |
|---|---|---|
| display:none | No | No |
| visibility:hidden | Yes | No |
| opacity:0 | Yes | Yes |

---

## Performance

### Core Web Vitals
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

| Metric | Full Form | Good Score | Fix |
|--------|-----------|------------|-----|
| LCP | Largest Contentful Paint | < 2.5s | Image optimize, lazy load |
| CLS | Cumulative Layout Shift | < 0.1 | Image dimensions define |
| FID | First Input Delay | < 100ms | JS optimize |
| INP | Interaction to Next Paint | < 200ms | Event handlers optimize |

**Tools:** Lighthouse, PageSpeed Insights, Chrome DevTools, Google Search Console

---

### Performance Fixes
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior

```js
// Code Splitting
const Dashboard = React.lazy(() => import('./Dashboard'));
<Suspense fallback={<Loader />}><Dashboard /></Suspense>

// Image Optimization — Next.js
import Image from 'next/image';
<Image src="/hero.jpg" width={800} height={600} loading="lazy" />

// API Caching — React Query
const { data } = useQuery({ queryKey: ['users'], staleTime: 5 * 60 * 1000 });
```

---

### AbortController — API Timeout
**Complexity:** ⭐⭐⭐⭐ | **Company Level:** MNC

```js
useEffect(() => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120000); // 2 min

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name === 'AbortError') setError('Request timed out');
    })
    .finally(() => clearTimeout(timer));

  return () => controller.abort(); // cleanup
}, []);
```

---

## Web Fundamentals

### Semantic HTML
**Complexity:** ⭐⭐ | **Company Level:** Mid-level

```html
<!-- Non-semantic -->
<div class="header">...</div>

<!-- Semantic -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>
<article>...</article>
<section>...</section>
```
**Fayde:** SEO, Accessibility, Code readability

---

### CORS — Cross Origin Resource Sharing
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior

- Browser ka security feature
- Alag domain/port/protocol pe request block hoti hai
- Fix — backend pe `Access-Control-Allow-Origin` header
- Postman mein CORS nahi hota — sirf browser mein

```js
app.use(cors({ origin: 'http://localhost:3000' }));
```

---

## Testing

### React Testing Library Queries
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior

| Query | Behavior | Use case |
|-------|----------|----------|
| getBy | Error if not found | Element hona chahiye |
| queryBy | null if not found | Element nahi hai verify |
| findBy | Returns promise | Async element |

**Priority:** getByRole > getByLabelText > getByText > getByTestId

---

## TypeScript

### Basics
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

```ts
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

// React component props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => (
  <button onClick={onClick} disabled={disabled}>{label}</button>
);

// useState with type
const [user, setUser] = useState<User | null>(null);

// Union types
type ID = string | number;
type Status = 'active' | 'inactive' | 'pending';
```

---

## Coding Questions

### Nested Array Flatten — Without inbuilt methods
**Complexity:** ⭐⭐⭐ | **Company Level:** Senior / MNC

```js
function flattenArray(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const flattened = flattenArray(arr[i]); // recursion
      for (let j = 0; j < flattened.length; j++) {
        result.push(flattened[j]);
      }
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

flattenArray([1, [2, [3, [4]]], 5]); // [1, 2, 3, 4, 5]
```

---

### String Replace
**Complexity:** ⭐ | **Company Level:** Entry

```js
const str = "Parixit";
str.replace("Parixit", "Adobe");           // "Adobe"
str.replace(/Parixit/g, "Adobe");          // multiple occurrences
str.split("Parixit").join("Adobe");        // split + join method
```

---

### Tricky Output Questions
**Complexity:** ⭐⭐⭐⭐ | **Company Level:** MNC

```js
// Q1 — Event Loop
console.log(1);
setTimeout(() => console.log(3), 0);
Promise.resolve().then(() => console.log(4));
console.log(5);
// Output: 1, 5, 4, 3

// Q2 — var loop bug
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 3, 3, 3

// Fix — let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 0, 1, 2

// Fix — IIFE
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 1000))(i);
}
// Output: 0, 1, 2

// Q3 — useState batching
const handleClick = () => {
  setCount(count + 1); // stale value
  setCount(count + 1); // same — 1
};
// Fix:
setCount(prev => prev + 1);
setCount(prev => prev + 1); // 2
```

---

*Notes by Parixit Soni — Updated regularly*