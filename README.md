# TigerCook 🍳

An AI-powered recipe generator for college students. Enter your budget, servings, cooking time, diet, and cuisine preference — TigerCook calls GPT-3.5-turbo and returns a fully structured recipe with ingredients, steps, and nutrition data.

**Live demo:** [main.da2b7mgpkz0d5.amplifyapp.com](https://main.da2b7mgpkz0d5.amplifyapp.com)

---

## Features

- **AI Recipe Generator** — 5 user constraints (budget, servings, time, diet, cuisine) sent to GPT-3.5-turbo, response parsed as structured JSON
- **Explore** — Browse 8 curated recipes with real-time search
- **Favorites** — Save AI-generated recipes to Firebase Firestore, view and delete them anytime
- **Authentication** — Email/password sign-up, login, forgot password, and profile management via Firebase Auth
- **Grocery links** — One-click redirect to Walmart and Kroger to buy ingredients

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router 7, Tailwind CSS 4 |
| Build | Vite 6 |
| Auth & Database | Firebase Auth, Firebase Firestore |
| AI | OpenAI GPT-3.5-turbo API |
| Testing | Vitest, React Testing Library, Playwright |
| CI | GitHub Actions |
| Deployment | AWS Amplify |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Firebase project with Auth and Firestore enabled
- An OpenAI API key

### Setup

```bash
git clone https://github.com/Vicientt/tigercook.git
cd tigercook
npm install
```

Create a `.env` file at the project root:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_OPENAI_API_KEY=your_openai_key
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Testing

The project has **25 automated tests** across 3 tiers.

### Unit + Frontend tests (no setup needed)

```bash
npm run test:unit      # 7 unit tests — prompt builder, recipes data, Firestore util
npm run test:frontend  # 12 component tests — Login, SignUp, ForgotPassword, etc.
```

### E2E tests (requires Firebase emulators)

**1. Install Firebase CLI and Playwright browser:**

```bash
npm install -g firebase-tools
npx playwright install chromium
```

**2. Start Firebase emulators in a separate terminal:**

```bash
firebase emulators:start --only auth,firestore --project your_project_id
```

**3. Run E2E tests:**

```bash
VITE_USE_FIREBASE_EMULATOR=true npm run test:e2e
```

The E2E suite covers login, recipe generation (with mocked OpenAI), the full save-to-Firestore flow, and the Favorites page — all without using real API credentials.

---

## Project Structure

```
src/
├── app/          # Router and App root
├── components/   # Header, Footer, ProtectedRoute, UI primitives
├── hooks/        # useAuth
├── pages/        # Login, SignUp, ForgotPassword, Dashboard, GenerateRecipe,
│                 # AIResult, Explore, Favorite, Profile
├── utils/        # recipeGenerationPrompt, getUserRecipes, recipes (static data)
├── firebase.js   # Firebase init + emulator connector
└── tests/
    ├── frontend/ # React Testing Library component tests
    └── unit/     # Pure function tests
e2e/              # Playwright E2E specs
.github/
└── workflows/
    └── ci.yml    # GitHub Actions CI pipeline
```

---

## CI Pipeline

GitHub Actions runs on every push and pull request to `main`:

- **Job 1 — Unit & Frontend:** runs all Vitest tests with no external services
- **Job 2 — E2E:** spins up Firebase Auth + Firestore emulators, starts the Vite dev server, then runs Playwright against the full app
