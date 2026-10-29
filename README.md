# Daniel Torri

Personal engineering portfolio at [dantorri.github.io](https://dantorri.github.io/), covering robotics, underwater RF, embedded control, and machine learning.

## Run locally

No build step or package installation is required. From this directory:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765`.

## Edit

- `index.html`: introduction, project index, background, and contact.
- `projects/`: individual project accounts.
- `style.css`: typography, layout, responsive and print styles.
- `script.js`: optional CAD view selection and user-controlled gait playback.
- `assets/`: original project visuals and self-hosted fonts, including font licenses.

Core content works without JavaScript. Animated media loads only when requested. There are no analytics, third-party scripts, or external font requests.

The site is published from the root of `main` through GitHub Pages. Update `sitemap.xml` when adding a page.

See [CONTENT_SOURCES.md](CONTENT_SOURCES.md) for factual provenance and asset attribution, and [DESIGN.md](DESIGN.md) for the visual system.
