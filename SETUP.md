# Bhas Karmarkar — Site Guide

Everything you need to run, edit, and deploy your site.

---

## Quick Reference

| Task | File to edit |
|---|---|
| Update bio, experience, skills, projects, publications | `public/profile.json` |
| Add a trip card or carousel photo | `public/travel-data.json` |
| Add a blog article card | `public/blog-data.json` |
| Write a trip itinerary | `src/content/trips/your-trip.md` |
| Write a research article | `src/content/research/your-article.md` |
| Add photos | `public/images/` |

---

## Running Locally

```bash
# In your astro-site folder
npm run dev
```

Open `http://localhost:4321` — the full site appears with map, carousel, everything working.

Stop the server: `Ctrl + C`

---

## Making It Live — GitHub Pages

### First time only

**1. Create the repo on GitHub**
- Go to github.com → **+** → **New repository**
- Name it exactly: `bhaskarmarkar.github.io`
- Set to **Public** → **Create repository**

**2. Push your code**
```bash
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/bhaskarmarkar/bhaskarmarkar.github.io.git
git push -u origin main
```

**3. Enable GitHub Pages**
- Go to your repo → **Settings** → **Pages**
- Under **Source** → select **GitHub Actions**
- Click **Save**

Wait ~2 minutes. Site is live at: **https://bhaskarmarkar.github.io**

### After first deploy — pushing updates

```bash
git add .
git commit -m "Brief description of what changed"
git push
```

Site updates automatically within 2 minutes.

---

## Migrating to Netlify (for private code)

Use this when you want your source code hidden but site still public.

**1. Make your GitHub repo private**
- Repo → Settings → scroll to bottom → **Change repository visibility** → Private

**2. Create Netlify account**
- Go to netlify.com → Sign up with GitHub

**3. Connect your repo**
- Netlify dashboard → **Add new site** → **Import an existing project**
- Choose GitHub → select `bhaskarmarkar.github.io`
- Build command: `npm run build`
- Publish directory: `dist`
- Click **Deploy site**

**4. Delete the GitHub Actions workflow**
- Delete `.github/workflows/deploy.yml` from your repo
- You no longer need it — Netlify handles builds

**5. Update astro.config.mjs**
```js
// Remove the base line — change from:
export default defineConfig({
  site: 'https://bhaskarmarkar.github.io',
  base: '/',
  integrations: [],
});

// To:
export default defineConfig({
  site: 'https://bhaskarmarkar.netlify.app',
  integrations: [],
});
```

**6. Push and deploy**
```bash
git add .
git commit -m "Migrate to Netlify"
git push
```

Netlify builds and deploys automatically. Your code is now private.

> If you add a custom domain later (e.g. bhaskarmarkar.com), update `site:` in `astro.config.mjs` to match.

---

## Adding Content

### Add a New Trip

**Step 1 — Edit `public/travel-data.json`**

Add to the `"trips"` array:
```json
{
  "id": "germany",
  "title": "Hamburg & The North Sea",
  "volume": "Volume II",
  "days": 7,
  "excerpt": "From the Elbe to Sankt Peter-Ording — maritime engineering and coastal resilience.",
  "image": "/images/hamburg-harbor.jpg",
  "imageFallback": "#4a6b7c",
  "file": "/trips/germany",
  "cities": [
    { "name": "Hamburg, Germany",             "lon": 10.00, "lat": 53.55 },
    { "name": "Sankt Peter-Ording, Germany",  "lon": 8.63,  "lat": 54.32 }
  ]
}
```

**Step 2 — Create `src/content/trips/germany.md`**

Copy `japan.md` as a template and edit:
```markdown
---
title: "Hamburg & The North Sea"
subtitle: "Maritime engineering and coastal resilience."
volume: "Volume II"
days: 7
route: "Hamburg → Sankt Peter-Ording"
---

<div class="day-section">
<div class="day-label">Day 1</div>

### Arriving by the Elbe

Your writing here...

<div class="photo-grid cols-2">
  <img src="/images/Germany/hamburg-1.jpg" alt="Hamburg harbor">
  <img src="/images/Germany/hamburg-2.jpg" alt="Speicherstadt">
</div>
</div>

<div class="divider"></div>
```

**Step 3 — Add photos**

Put photos in `public/images/Germany/` (or wherever you prefer).

**Step 4 — Add visited cities to the map**

Cities in `"trips"` automatically appear on the map. For cities you visited but haven't written about, add to `"visited"`:
```json
{ "name": "Bangkok, Thailand", "lon": 100.52, "lat": 13.75 }
```

**Step 5 — Add carousel photos (optional)**

Add to the `"photos"` array in `travel-data.json`:
```json
{ "src": "/images/hamburg-harbor.jpg", "caption": "Speicherstadt at dusk", "location": "Hamburg, Germany" }
```

---

### Add a New Research Article

**Step 1 — Count the words in your article**

Open your article in any word processor and check the word count. You'll need this for the read time.

**Step 2 — Edit `public/blog-data.json`**

Add to the `"articles"` array (newest first):
```json
{
  "id": "robotics-india",
  "title": "Robotics in Indian <em>Manufacturing</em>",
  "deck": "On the gap between automation ambition and shop-floor reality.",
  "topics": ["tech"],
  "date": "May 2026",
  "excerpt": "Why India's automation story is more complicated than the headline numbers suggest.",
  "wordCount": 1800,
  "file": "/research/robotics-india"
}
```

> `readTime` and `featured` are calculated automatically:
> - **readTime** = wordCount ÷ 200, rounded up
> - **featured** = always the most recent article by date

**Step 3 — Create `src/content/research/robotics-india.md`**

Copy `mfg-puzzle.md` as a template:
```markdown
---
title: "Robotics in Indian <em>Manufacturing</em>"
deck: "On the gap between automation ambition and shop-floor reality."
topics: ["tech"]
date: "May 2026"
stats:
  - { value: "5.8M", label: "Target robots by 2030" }
---

## Your First Section

Your article text here...

> A pullquote looks like this.

<div class="data-note"><strong>Key stat:</strong> Your callout box.</div>

## Another Section

More text...

<div class="conclusion"><p>Your concluding thought.</p></div>
```

**Topics available:** `"economics"` · `"policy"` · `"tech"`

---

### Update the About Page

Edit `public/profile.json`. The page re-renders automatically.

**Change bio:**
```json
"bio": "Your updated bio text here."
```

**Add a new job** (add to the top of `"experience"` array):
```json
{
  "period": "Jan 2027 – Present",
  "org": "Company Name",
  "orgSub": "Division or Programme",
  "location": "City, Country",
  "role": "Your Role Title",
  "bullets": [
    "Achievement with <strong>key metric</strong>.",
    "Another thing you did."
  ]
}
```

**Add a skill:**
```json
{ "group": "Software", "items": ["MATLAB", "Python", "New Skill Here"] }
```

**Add a publication:**
```json
{
  "number": "03",
  "title": "Your Paper Title",
  "url": "https://link-to-paper.com",
  "venue": "Journal Name · Month Year"
}
```

---

## Photo Guidelines

| Rule | Detail |
|---|---|
| Location | `public/images/` or subfolders like `public/images/Japan/` |
| Path in JSON | Always start with `/images/...` |
| File names | Lowercase, no spaces: `hamburg-harbor.jpg` not `Hamburg Harbor.jpg` |
| Format | `.jpg` for photos, `.png` for graphics |
| Size | Keep under 2MB — compress at tinypng.com |
| Profile photo | `public/images/profile.jpg` — at least 800×1000px |

---

## City Coordinates

```
Pune, India                  lon:  73.86,  lat:  18.52
Tokyo, Japan                 lon: 139.69,  lat:  35.69
Osaka, Japan                 lon: 135.50,  lat:  34.69
Kyoto, Japan                 lon: 135.77,  lat:  35.01
Ha Giang, Vietnam            lon: 104.98,  lat:  22.82
New York, USA                lon: -74.01,  lat:  40.71
San Francisco, USA           lon: -122.42, lat:  37.77
Blacksburg, USA              lon: -80.41,  lat:  37.23
Hamburg, Germany             lon:  10.00,  lat:  53.55
Sankt Peter-Ording, Germany  lon:   8.63,  lat:  54.32
Dubai, UAE                   lon:  55.30,  lat:  25.20
Singapore                    lon: 103.82,  lat:   1.35
Jakarta, Indonesia           lon: 106.83,  lat:  -6.21
Kuala Lumpur, Malaysia       lon: 101.69,  lat:   3.14
Bangkok, Thailand            lon: 100.52,  lat:  13.75
London, UK                   lon:  -0.12,  lat:  51.51
Amsterdam, Netherlands       lon:   4.90,  lat:  52.37
Paris, France                lon:   2.35,  lat:  48.85
```

More at: https://www.latlong.net

---

## Markdown Reference

```markdown
## Section Heading

Regular paragraph text.

**Bold text** for emphasis within sentences.

> This becomes a styled pullquote — large italic text.

<div class="data-note"><strong>Label:</strong> Callout box for stats or key facts.</div>

<div class="conclusion"><p>Closing thought — appears with a red left border.</p></div>
```

**Photo grid in trip pages:**
```html
<div class="photo-grid cols-2">
  <img src="/images/Japan/photo1.jpg" alt="Description">
  <img src="/images/Japan/photo2.jpg" alt="Description">
</div>

<div class="divider"></div>
```

---

## File Structure Reference

```
astro-site/
├── public/
│   ├── profile.json          ← About page data
│   ├── travel-data.json      ← Travel page data
│   ├── blog-data.json        ← Research page data
│   ├── world.svg             ← World map
│   └── images/
│       ├── profile.jpg
│       ├── Japan/
│       └── [your folders]
├── src/
│   ├── content/
│   │   ├── trips/
│   │   │   └── japan.md      ← Trip itineraries
│   │   └── research/
│   │       └── mfg-puzzle.md ← Articles
│   ├── layouts/
│   │   ├── TripLayout.astro
│   │   └── ResearchLayout.astro
│   └── pages/
│       ├── index.astro       ← About page
│       ├── travel.astro      ← Travel index
│       ├── research.astro    ← Research index
│       ├── trips/[slug].astro
│       └── research/[slug].astro
├── astro.config.mjs
└── package.json
```

---

## Troubleshooting

**Site not updating after push**
Wait 2 minutes. Then hard-refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac).

**Map not showing**
The map fetches from a CDN — it needs internet. It won't work if you open files directly. Run `npm run dev` instead.

**Article read time shows —**
You haven't added `wordCount` to `blog-data.json`. Count the words in your article and add it.

**JSON syntax error (page won't load)**
Validate at jsonlint.com. Most common mistakes:
- Missing comma between items (required between all but the last)
- Trailing comma after the last item (not allowed)
- Single quotes instead of double quotes

**Build fails on GitHub/Netlify**
Check the Actions tab on GitHub (or Deploys on Netlify) for the error message. Most common cause is a JSON syntax error in one of the `public/` data files.

**Something looks broken**
Come back to Claude, paste the file you edited, and describe what's wrong.