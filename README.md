# arclen-glass

Glassmorphism design system shared across Arclen projects.

## Install

```bash
npm install cam575/arclen-glass
```

## Setup

Add to your global CSS:

```css
@import 'arclen-glass/src/glass.css';
```

Your app must define these CSS custom properties (see glass.css header for details):

- `--accent-rgb` (e.g. `232, 93, 4`)
- `--bg-primary` (e.g. `#0d0d0d`)
- `--text-primary` (e.g. `#ffffff`)
- `--radius-2xl` (e.g. `24px`)

## Usage

```tsx
import { GlassCard, GlassButton, GlassBadge } from 'arclen-glass'
import { accent, backgrounds, text } from 'arclen-glass'
```
