# Portfolio — Mirosław Wandyk

Statyczne portfolio w stylu [CSS Showcase](../CssShowcase): efekty CSS, bento grid, flip-cardy z opisami projektów, globe 3D, dark/light theme.

**Live:** https://Barosz30.github.io/Portfolio

## Uruchomienie

### Podgląd lokalny (bez npm)

```powershell
.\serve.ps1
```

→ http://localhost:8081

### Dev / build (Vite)

```powershell
npm install
npm run dev      # http://localhost:8080
npm run build    # folder dist/
npm run deploy   # GitHub Pages (gh-pages)
```

## Struktura

```
Portfolio/
├── index.html          # strona główna
├── public/
│   ├── css/            # style (variables, base, effects, sections)
│   ├── js/main.js      # interakcje (globe, tilt, flip, theme…)
│   └── cv.html         # CV do pobrania (przycisk „ucieka”)
├── vite.config.ts      # base: /Portfolio/ (GitHub Pages)
└── serve.ps1           # prosty serwer HTTP (PowerShell)
```

## Projekty na stronie

6 flip-cardów w układzie bento: MechaShop (front + back), Product Catalog, Games Database, Bike Shop Landing, Match-3 PWA.

Przód karty — tytuł i skrót. Tył — pełny opis, stack, linki GitHub + demo.

## Uwagi

Stary kod React (`src/`) został usunięty. Jeśli został pusty folder `src/assets/images/` (zablokowane pliki PNG), usuń go ręcznie w Explorerze.

## Bezpieczeństwo

Projekt używa minimalnych zależności (`vite`, `gh-pages`). Stary `tailwind.config.js` z obfuskowanym kodem został usunięty — po `git pull` uruchom `npm audit`.
