# Verdant

Verdant is a houseplant care and neighborhood swap dashboard. It gives each plant one practical care guide, keeps daily tasks in one place, and makes it easy to discover nearby cuttings and supplies.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The app is a client-side demo; plant care logs, new plants, and swap messages are held in memory and reset when the page reloads.

## Deploy to GitHub Pages

1. Create an empty GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and set the build source to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds the Vite app and publishes `dist` whenever you push to `main`. You can also start it from the **Actions** tab with **Run workflow**.
4. When the workflow succeeds, open **Settings → Pages** to find the published URL. For a project repository, it will usually be `https://YOUR-NAME.github.io/REPOSITORY/`.

Vite reads the repository name from GitHub Actions and sets the matching base path. Local development continues to use `/`.

## Checks

```sh
npm run lint
npm run build
```

## Included flows

- Browse sample plants and open each plant's consolidated care profile.
- Log watering and complete the day's care tasks.
- Add a plant to the collection and search plants or swap listings.
- Browse local swap listings and send an in-app message confirmation.

Plant photos are loaded from Unsplash, and the display fonts are loaded from Google Fonts, so those visual assets need an internet connection.
