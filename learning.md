# Frontend Learning Notes

## React

### useEffect
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

### useState
**Concept:** Component ka local state manage karna.

**Batching — React 18:**
```js
// Same value — re-render nahi hoga (primitive)
setName("Parixit");
setName("Parixit"); // skip

// Multiple updates — sirf 1 re-render
setName("Parixit");
setAge(25);

// Functional update — latest value ke liye
setCount(prev => prev + 1); // hamesha latest value
setCount(prev => prev + 1); // 0 → 1 → 2
```

---

### useCallback vs useMemo vs React.memo

| Hook | Kya karta hai | Kab use karo |
|------|--------------|--------------|
| `React.memo` | Component memoize | Parent re-render pe child rokna |
| `useCallback` | Function memoize | Child ko same function reference dena |
| `useMemo` | Value memoize | Expensive calculation cache karna |

```js
// React.memo — component wrap
const Child = React.memo(({ onClick }) => <button onClick={onClick}>Click</button>);

// useCallback — function memoize
const handleClick = useCallback(() => doSomething(id), [id]);

// useMemo — value memoize
const filtered = useMemo(() => items.filter(i => i.active), [items]);
```

---

### Redux Toolkit vs Context API

| | Context API | Redux Toolkit |
|--|-------------|---------------|
| Setup | Zero | Simple |
| Re-renders | Sab re-render hote hain | Sirf relevant component |
| DevTools | No | Yes |
| Use case | Simple state (theme, lang) | Complex state (large apps) |

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
```

---

### React Strict Mode
- Development mein useEffect **2 baar** run karta hai
- Production pe koi effect nahi
- Deprecated methods detect karta hai

---

## Next.js

### Rendering Patterns

| Pattern | Full Form | Kab |
|---------|-----------|-----|
| CSR | Client Side Rendering | Dashboard, admin — SEO matter nahi |
| SSR | Server Side Rendering | Real time data — user profile |
| SSG | Static Site Generation | Blog, landing pages |
| ISR | Incremental Static Regeneration | E-commerce — data thoda change hota hai |

---

### Token Storage
```
LocalStorage  — XSS risk ❌
Cookies       — httpOnly + sameSite = secure ✅
Memory/State  — page refresh pe gone ❌
```

---

## JavaScript

### Event Loop
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
```

---

### Closures
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
```

---

### Promises
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

// Fix — let use karo
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // 0, 1, 2 ✅
}
```

---

### Primitive vs Reference Types
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
```js
// Regular — this caller pe depend karta hai
const obj = {
  name: "Parixit",
  greet: function() { console.log(this.name); } // "Parixit"
};

// Arrow — this parent scope se aata hai
const obj2 = {
  name: "Parixit",
  greet: () => { console.log(this.name); } // undefined
};
```

---

### map vs forEach
```js
// map — naya array return karta hai
[1,2,3].map(n => n * 2); // [2, 4, 6]

// forEach — kuch return nahi, sirf loop
[1,2,3].forEach(n => console.log(n));
```

---

### typeof
```js
typeof null        // "object" — JS bug
typeof undefined   // "undefined"
typeof []          // "object"
typeof {}          // "object"
typeof ""          // "string"
typeof 42          // "number"
typeof true        // "boolean"
```

---

## CSS

### Flexbox vs Grid
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
```
relative  — apni jagah se shift, space rehti hai
absolute  — nearest positioned parent ke corner pe
fixed     — viewport pe fix — scroll pe nahi hilta
sticky    — scroll pe ek jagah chipak jaata hai
```

---

### Display None vs Visibility Hidden vs Opacity 0
```
display: none       — element gone, space bhi nahi
visibility: hidden  — invisible, space rehti hai
opacity: 0          — invisible, space hai, clickable bhi hai
```

---

## Performance

### Core Web Vitals

| Metric | Full Form | Good Score |
|--------|-----------|------------|
| LCP | Largest Contentful Paint | < 2.5s |
| CLS | Cumulative Layout Shift | < 0.1 |
| FID | First Input Delay | < 100ms |
| INP | Interaction to Next Paint | < 200ms |

**Tools:** Lighthouse, PageSpeed Insights, Chrome DevTools, Google Search Console

---

### Performance Fixes
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

## Other Important Topics

### Semantic HTML
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
- Browser ka security feature
- Alag domain/port/protocol pe request block hoti hai
- Fix — backend pe `Access-Control-Allow-Origin` header
- Postman mein CORS nahi hota — sirf browser mein

---

### AbortController — API Timeout
```js
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 120000); // 2 min

try {
  const res = await fetch('/api/data', { signal: controller.signal });
  clearTimeout(timer); // response aaya — timer cancel
  return res.json();
} catch(err) {
  if (err.name === 'AbortError') throw new Error('Request timed out');
}
```

---

### TypeScript Basics
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

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// useState with type
const [user, setUser] = useState<User | null>(null);
```

---

## Coding Questions

### Nested Array Flatten — Without inbuilt methods
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
```js
const str = "Parixit";
str.replace("Parixit", "Adobe");           // "Adobe"
str.replace(/Parixit/g, "Adobe");          // multiple occurrences
str.split("Parixit").join("Adobe");        // split + join method
```

---

### Tricky Output Questions
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

// Q3 — useState batching
const handleClick = () => {
  setCount(count + 1); // stale value
  setCount(count + 1); // same — 1
};
// Fix:
setCount(prev => prev + 1);
setCount(prev => prev + 1); // 2
```