# arclen-brand

Arclen brand system — components, tokens, and design primitives shared across Arclen projects.

Formerly published as `arclen-glass`. Renamed in v2.0.0 to reflect broader scope (components + tokens + brand primitives).

## Install

```bash
npm install cam575/arclen-brand
```

## Setup

Add to your global CSS:

```css
@import 'arclen-brand/src/glass.css';
```

Your app must define these CSS custom properties (see glass.css header for details):

- `--accent-rgb` (e.g. `232, 93, 4`)
- `--bg-primary` (e.g. `#0d0d0d`)
- `--text-primary` (e.g. `#ffffff`)
- `--radius-2xl` (e.g. `24px`)

## Usage

```tsx
import { GlassCard, GlassButton, GlassBadge } from 'arclen-brand'
import { accent, backgrounds, text } from 'arclen-brand'
```
