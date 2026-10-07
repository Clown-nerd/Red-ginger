# Red Ginger Eatery — Cinematic Motion Redesign

## Implementation approach
- Keep the existing dependency-free static HTML/CSS/JS architecture.
- Preserve the restaurant content model in `content.js`, reservation dialog, menu filters, map, and contact actions.
- Add a cinematic motion layer with scroll-linked camera movement, staggered kinetic typography, shape-mask transitions, cursor parallax, and a subtle film grain treatment.
- Keep all motion progressive-enhancement only: the page remains readable and usable without JavaScript, and `prefers-reduced-motion` disables non-essential movement.
- Preview locally through a static server; do not push or publish until the user reviews it.

## Design direction
- **Design movement:** Midnight garden cinema / editorial hospitality.
- **Core principles:** typography as choreography; depth through layered image planes; quiet luxury through restraint; clear invitations over decoration.
- **Color philosophy:** near-black green gives the page a nocturnal, immersive stage; ember red owns the CTA moments; copper-gold signals warmth and wayfinding; paper cream keeps long-form copy readable.
- **Layout paradigm:** a sequence of cinematic scenes with offset content rails, full-bleed image moments, and intentional asymmetry rather than centered card grids.
- **Signature elements:** copper scene markers, expanding circular “portal” transitions, and image planes that drift at different speeds as the visitor scrolls.
- **Interaction philosophy:** hover reveals feel like camera focus pulls; links subtly travel toward the cursor; scene transitions are smooth and editorial, never noisy.
- **Animation:** hero text enters as a staggered title reveal; hero imagery slowly reframes; sections reveal on entry; cards lift with a soft lens flare; decorative geometry drifts at a lower frequency than content.
- **Typography system:** DM Sans for utility/navigation; Playfair Display italic for emotional emphasis; oversized editorial headlines with compact uppercase metadata.
- **Brand essence:** a garden-lit Indian and Pan-Asian escape in Parklands, designed for lingering — **warm, cinematic, unhurried**.
- **Brand voice:** direct, sensory, and invitational. Example lines: “Let the evening begin here.” / “Find a little room to breathe.”
- **Wordmark & logo:** retain the supplied logo as the trusted mark; frame it with a small copper orbit line in the motion layer rather than redrawing it.
- **Signature brand color:** ember red `#c82430`.

## Mobile optimization
- Touch/coarse-pointer devices skip the desktop cursor orb, continuous cursor RAF loop, and JavaScript parallax listener.
- Mobile keeps only short entrance/reveal motion, reduced-opacity grain, static orbit geometry, and tactile press feedback.
- Desktop hover transforms are removed from touch layouts to avoid sticky hover states and unnecessary GPU work.
- The existing reduced-motion media query remains the strongest override.

## Project structure
- `index.html` — semantic page scenes and existing reservation/menu surfaces.
- `style.css` — existing responsive system plus the cinematic motion layer.
- `app.js` — existing restaurant interactions plus motion enhancement hooks.
- `content.js` — restaurant facts, links, menu, and experience data.
- `assets/` — supplied photography and logo.
