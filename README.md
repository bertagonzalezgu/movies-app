# Movies

A single-page application for managing movie preferences: explore real-time data from TMDB, save your favorites, rate them from 1 to 10, and check out full detail pages for movies, actors and directors.

## Demo

**Live demo:** [https://bertagonzalezgu.github.io/movies-app/](https://bertagonzalezgu.github.io/movies-app/)

## Features

- **Catalog exploration**: popular movies listing with search, genre filtering and sorting (popularity, rating, release date).
- **Full detail pages**:
  - **Movie**: synopsis, cast, director, release date, runtime, genres and trailer (YouTube embed).
  - **Actor**: biography, photo, birth date and place, full filmography.
  - **Director**: same format as actor, filtering their filmography as director.
- **Authentication**: email/password sign up and login, plus Google social login (Firebase Auth).
- **Favorites and personal ranking**: mark/unmark movies as favorites, rate them from 1 to 10, edit or remove the rating, all persisted per user in Firestore.
- **Accessible navigation**: protected routes for the personal area, full keyboard navigation, ARIA labels, and WCAG AA color contrast compliance.
- **Mobile-first design** with adaptive navigation (side bar on desktop, bottom bar on mobile).

## 🛠️ Tech stack

| Area | Technology |
|---|---|
| Framework | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM v7 |
| Movie data | [TMDB API v3](https://developer.themoviedb.org/reference/intro/getting-started) |
| Authentication | Firebase Authentication (email/password + Google) |
| Database | Cloud Firestore |
| HTTP requests | Axios |
| Testing | Vitest + React Testing Library |
| Deployment | Vercel |

## Project structure

```
src/
├── assets/                    # Icons, images, placeholders
├── components/                # Navbar, Footer (shared global components)
├── features/
│   ├── auth/
│   │   ├── components/        # RegisterForm, LoginForm
│   │   ├── context/           # AuthContext, AuthProvider, useAuth, ProtectedRoute
│   │   ├── pages/              # RegisterPage, LoginPage, ProfilePage
│   │   └── services/           # firebaseConfig.ts, authService.ts
│   ├── favorites/
│   │   ├── components/        # RatingStars
│   │   ├── pages/               # FavoritesPage
│   │   └── services/            # favoritesService.ts (Firestore)
│   └── movies/
│       ├── components/        # MovieCard, MovieGrid, SearchBar, CastList
│       ├── hooks/              # useMovieDetail, useFavorite, usePersonDetail
│       ├── pages/                # HomePage, ExplorePage, MovieDetailPage,
│       │                          ActorDetailPage, DirectorDetailPage
│       ├── services/             # tmdbAPI.ts
│       └── types/                # movies.types.ts, credits.types.ts, person.types.ts
├── routes/
│   ├── App.jsx                 # Route definitions
│   └── Layout.tsx               # Navbar + Outlet + Footer
├── styles/
│   └── index.css
└── main.jsx
```

## Getting started

### Prerequisites

- Node.js 18+
- A [TMDB](https://www.themoviedb.org/) account with an API Key
- A [Firebase](https://console.firebase.google.com/) project with **Authentication** (Email/Password and Google enabled) and **Cloud Firestore** enabled

### 1. Clone and install dependencies

```bash
git clone https://github.com/bertagonzalezgu/movies-app.git
cd project-movies-app
npm install
```

### 2. Environment variables

Create a `.env` file in the project root with:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> All variables must have the `VITE_` prefix so Vite exposes them to the frontend.

### 3. Run in development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Run tests

```bash
npm run test
```

Includes:
- Includes:
- Behavior-driven test scenarios (search, favorites, rating) written
  as Given/When/Then comments within Vitest + React Testing Library
  tests — not full Gherkin/Cucumber syntax with .feature files.

### 5. Production build

```bash
npm run build
```

## External services setup

### TMDB

1. Create an account at [themoviedb.org](https://www.themoviedb.org/).
2. Go to **Settings → API** and request a "Developer" type API Key.
3. Copy the **API Key (v3 auth)** into your `.env`.

### Firebase

1. Create a project in the [Firebase console](https://console.firebase.google.com/).
2. Register a web app (`</>`) and copy the config into your `.env`.
3. In **Authentication → Sign-in method**, enable the **Email/Password** and **Google** providers.
4. In **Firestore Database**, create the database (test mode is enough for development).

## Data model (Firestore)

`favorites` collection, one document per user/movie combination (composite ID `{userId}_{movieId}`):

```json
{
  "userId": "abc123",
  "movieId": 550,
  "movieTitle": "Fight Club",
  "moviePoster": "/poster.jpg",
  "rating": 8
}
```

## Firestore security rules

Access to the `favorites` collection is restricted so that a
user can only read, create, update or delete their own favorite
documents:

\`\`\`
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null
                          && request.auth.uid == resource.data.userId;

      allow create: if request.auth != null
                    && request.auth.uid == request.resource.data.userId;
    }
  }
}
\`\`\`

## Accessibility

The project follows **WCAG 2.1 AA** guidelines:
- ARIA labels and roles on forms, state buttons (`aria-pressed`, `aria-current`) and error messages (`role="alert"`).
- Full keyboard navigation across all interactive elements.
- Color contrast verified with [axe DevTools](https://www.deque.com/axe/devtools/).
- Semantic structure (`<main>`, `<header>`, `<article>`) across all pages.

> Note: accessibility issues detected inside the YouTube player `<iframe>` (trailer) belong to third-party embedded content, not to the application's own code.

## Implementation notes

- Favorites store a copy of `movieTitle`/`moviePoster` to avoid repeated TMDB requests when listing `/favorites`.
- The trailer includes a fallback "Watch on YouTube" link in case the embedded `<iframe>` is blocked by the browser or by the video's regional restrictions.
- Data loading and favorites logic is extracted into custom hooks (`useMovieDetail`, `useFavorite`, `usePersonDetail`) to keep page components focused on the UI.

## Author

Berta González Güell

## License

Academic project developed as part of the specialization program.