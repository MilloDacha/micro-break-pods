# Micro-Break Pods 🟢

**Interactive Product Prototype** — IIM Kozhikode · Innovation & Design Thinking

> "5 minutes to reset before your next class."

---

## About

Micro-Break Pods are semi-enclosed recovery units designed for high-pressure academic environments. This repository contains the interactive web prototype demonstrating the product concept, simulated pod experience, persona research, and business model.

**Course:** Innovation & Design Thinking (PGP Year 1)
**Institution:** IIM Kozhikode

---

## Live Demo

Open `index.html` directly in a browser, or deploy via GitHub Pages (see below).

**No build step required.** Plain HTML, CSS, and JavaScript only.

---

## Features of the Prototype

| Section | What It Shows |
|---|---|
| **Hero** | Product intro with animated pod illustration |
| **Problem** | 4 core student pain points |
| **Features** | 6 pod features mapped to student needs |
| **Persona** | Aarav Nair — daily timeline, pain points, coping behaviours |
| **Interactive Demo** | Full pod simulator with timer, lighting moods, breathing guide |
| **Competitor Table** | Comparison across 5 alternatives |
| **Business Model Canvas** | Full BMC with financials |

---

## How to Run

### Option 1 — Open locally
```bash
git clone https://github.com/YOUR_USERNAME/micro-break-pods.git
cd micro-break-pods
# Open index.html in any browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Option 2 — GitHub Pages
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site will be live at `https://YOUR_USERNAME.github.io/micro-break-pods`

---

## Project Structure

```
micro-break-pods/
├── index.html          # Main page (all sections)
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Pod simulation logic, timer, interactions
└── README.md
```

---

## Using the Pod Simulator

1. Scroll to the **"Step inside the Pod"** section
2. Choose a session length: **5 min** or **10 min**
3. Pick a lighting mood: Warm / Cool / Dim
4. Select ambient sound (Silence / Rain / Forest / Breathing Guide)
5. Optionally toggle the visual breathing guide
6. Click **Begin Session**

The countdown timer, animated ring, lighting atmosphere, and breathing animation all activate to simulate the pod experience.

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure and semantic markup |
| CSS3 | Layout, animations, responsive design |
| Vanilla JS | Timer logic, state management, DOM interactions |

No frameworks, no dependencies, no build tools.

---

## Design Decisions

- **Teal-dominant palette** — calm, restorative, health-adjacent without being clinical
- **Dark demo section** — simulates the actual dim pod environment
- **Sticky persona card** — lets users scroll through insights while keeping Aarav's profile in view
- **Business Model Canvas** — reproduces the standard BMC grid layout in pure CSS Grid

---

*Built as an academic prototype for the Innovation & Design Thinking course at IIM Kozhikode.*
