# Pokemon Brew

## About

An online battle simulator for the first generation of Pokémon! Playable
at [https://olliee2.itch.io/pokemon-brew](https://olliee2.itch.io/pokemon-brew).

## Usage & Hosting

### Local Development

1. Clone the repository:
   ```sh
   git clone https://github.com/olliee2/pokemon-ts.git
   cd pokemon-ts
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build and run the project:
   ```sh
   npm run start
   ```
   This will start a local server on which you can play in your browser.

### Deploying to Cloudflare Pages

1. Push your repository to GitHub (or another git provider).
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) and create a new project from your repository.
3. Set the build command to `npm run build`.
4. Deploy!

The game will be available at your Cloudflare Pages URL.
