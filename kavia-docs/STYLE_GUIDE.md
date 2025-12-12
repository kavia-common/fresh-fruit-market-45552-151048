# UI/UX Style Guide

This document describes the visual and interaction guidelines for the Fresh Fruit Market frontend. The theme is “Ocean Professional” with a modern, minimalist aesthetic and subtle retro accents.

## Theme Palette

Defined as CSS variables in src/App.css:
- Primary: var(--text-secondary) as accent in current scaffold; transition to #2563EB when adopting full palette.
- Backgrounds: --bg-primary and --bg-secondary
- Text: --text-primary and --text-secondary
- Borders: --border-color
- Buttons: --button-bg and --button-text

Dark mode overrides are provided via [data-theme="dark"].

## Visual Language

- Modern and clean:
  - Use generous white space, rounded corners (8–16px), and subtle shadows for depth.
  - Prefer light borders (rgba(0,0,0,0.06–0.12)) to separate sections.
- Retro accents:
  - Subtle gradients or animated logo can provide visual interest without clutter.
- Motion:
  - Keep transitions smooth and understated for hover/focus states.

## Components

- Header:
  - Clear brand/title area with a theme toggle.
- Buttons:
  - Rounded corners, strong contrast, visible focus outline.
- Layout:
  - Responsive spacing; ensure elements adapt gracefully to small viewports.

## Typography

- System sans-serif stack defined in src/index.css.
- Headings: moderate letter-spacing; avoid overly large sizes.
- Body: comfortable line-height; prioritize readability.

## Accessibility

- Maintain color contrast (prefer AA minimum).
- Ensure focus outlines remain visible. The scaffold defines clear focus ring transitions.
- Use semantic elements and aria-labels for non-text UI (e.g., theme toggle).

## Theming Usage

- Apply colors via CSS variables instead of hard-coded values.
- Respect dark mode by reading variables (e.g., var(--bg-primary), var(--text-primary)).
- For new components, include minimal inline styles or a dedicated CSS module/file, but stay consistent with existing tokens.

## Do/Don’t

- Do:
  - Keep layouts simple and content-forward.
  - Use a consistent accent color for actions and links.
  - Prefer subtle gradients and small motion cues.
- Don’t:
  - Overuse heavy gradients or animations.
  - Introduce new color tokens without updating variables and validating contrast.
