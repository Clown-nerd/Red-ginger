# Red Ginger Eatery website

A lightweight, responsive static website built from the supplied Instagram screenshots. The logo is cropped from the supplied profile screenshot; restaurant photography is cropped from the supplied post screenshots and exported as WebP in `assets/`.

## Preview

Open `index.html` in a browser. For local development, any static server works (for example, `npx serve .`). No build step or framework is required. Google Fonts and the Google Maps embed need an internet connection.

## Update restaurant content

Edit `content.js`:

- `phones`, `whatsapp`, `address`, `hours`, `instagram`, `orderUrl`, and `mapUrl` contain the restaurant details and links.
- `menuPdf` accepts a URL to the current full menu PDF. It is intentionally empty until one is provided.
- `menu` holds the six menu categories. Add entries shaped like `{ name: "…", description: "…", price: "…", tags: ["Vegetarian"] }`. Leave prices and descriptions blank until supplied by the restaurant.
- `experiences` contains the experience-card copy and image paths.
- `reservationEndpoint` is intentionally empty. Set it to your API endpoint to POST the confirmed booking request. The WhatsApp confirmation link remains available as a fallback.

The footer hours currently read “Hours to be confirmed”; replace this when confirmed. No opening hours, prices, menu descriptions, or booking availability have been invented. The booking form collects the guest’s preferred date and time and tells them the restaurant will confirm availability.

## Replace images

Put optimized WebP or AVIF images under `assets/`, then update their paths in `index.html` or `content.js`. The hero image is preloaded; below-the-fold images use lazy loading. Existing `.webp` files are crops of the provided screenshots, not externally sourced stock imagery.

## Reservations

The four-step dialog validates the guest’s setting, preferred date and time, name, phone, and optional email. To connect a backend, configure `reservationEndpoint` in `content.js`; the request sends a JSON booking object. The confirmation also provides a prefilled WhatsApp link and an `.ics` calendar download. Group and event enquiries open WhatsApp.
