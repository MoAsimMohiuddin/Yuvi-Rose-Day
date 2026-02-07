# Rose Day ❤️ — Valentine's Single Page

A static, single-page Valentine’s Rose Day site with a **retro / traditional Indian wedding edit** vibe: emotional, cinematic, nostalgic.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

## Tech stack

- **React** (Vite)
- **Tailwind CSS**
- **GSAP** (rose animation & transitions)
- **Framer Motion** (UI transitions, gate)
- No router, no backend, no auth — one page, conditional rendering.

## Entry (question gate)

- A sequence of romantic questions is shown one by one.
- Each correct answer is **case-insensitive** and shows a cute acknowledgement message.
- Wrong answer → gentle shake + “Hmm… try again ❤️”.
- After the final correct answer → gate fades out → main Valentine page. Nothing is stored in `localStorage`.

## Customization

Edit **`src/config.js`** to change:

- `questions[]` — entry questions, answers, and success messages
- `preludeMessages` — short “before the rose” micro-moments
- `holdMessage` / `holdSpeed` — hold-to-bloom prompt and pacing
- `letterLines` — handwritten letter lines
- `wrongMessage` — message on wrong answer
- `imagePath` — path to couple photo (e.g. `/couple-placeholder.jpg`)
- `title` / `subtitle` — main page text (“Happy Rose Day ❤️”, “To my favorite person”)

Place your photo in **`public/couple-placeholder.jpg`** (or set `imagePath` to another path in `public/`). If the image is missing, a warm gradient placeholder is shown so the page still looks polished.
Place your instrumental audio file in **`public/wedding-instrumental.mp3`** or update `musicPath` in `src/config.js`.

## Structure

- `src/App.jsx` — conditional render: gate vs main page
- `src/components/QuestionGate.jsx` — question-based entry
- `src/components/RoseAnimation.jsx` — GSAP rose (bud → bloom)
- `src/components/PhotoReveal.jsx` — photo + Ken Burns + text overlay
- `src/components/FloatingPetals.jsx` — background petals
- `src/config.js` — copy and settings

## Build

```bash
npm run build
npm run preview
```
