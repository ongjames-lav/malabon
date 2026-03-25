# TODO_ui-architect.md

## ✅ Context
- **Framework**: React 18 + Next.js (App Router)
- **Platform**: Web (Responsive, not mobile-first app, but mobile-friendly)
- **Status**: Refactoring from "Malabon Finds" to "Lakbay Malabon"
- **Design Inspiration**: Water-inspired, modern, minimal, AI-enhanced.

---

## ✅ Design Token System

### Colors (Water Theme)
| Token | Hex | Usage |
|-------|-----|-------|
| `aqua-primary` | `#00C2FF` | Main CTA, brand identity, highlights |
| `aqua-soft` | `#E0F7FA` | Background accents, hover states |
| `deep-ocean` | `#003B5C` | Typography, secondary buttons, footer |
| `surface-light` | `#F8FDFF` | Page background, cards |
| `surface-dark` | `#0B1120` | Dark mode background |

### Typography
- **Primary Font**: `Inter` (or `Outfit` for a more premium look)
- **Headings**: `Outfit`, Bold (700+)
- **Body**: `Inter`, Regular/Medium (400/500)
- **Scale**: Base 16px, 1.25 ratio (Major Third)

### Spacing & Layout
- **Base Unit**: `8px`
- **Grid**: 12-column liquid layout, `gap: 24px`
- **Border Radius**: `12px` (Rounded corners for friendly feel)
- **Shadows**: Soft, diffuse indigo/blue shadows (`0 8px 30px rgba(0, 194, 255, 0.08)`)

---

## ✅ Component Plan (Atomic Design)

### 🧪 Atoms
- **Button**: Custom variant support (primary, secondary, ghost). Includes loading states and Lucide icons.
- **Input**: Themed input with aqua focus ring.
- **Typography**: Responsive heading and body components.
- **Icon**: Wrapper for `lucide-react` icons with consistent sizing.
- **Badge**: Tiny labels for tags like "Hidden Gem" or "Halal".

### 🧬 Molecules
- **Navbar**: Floating blur effects (Glassmorphism), links to Explore, Food, Itinerary.
- **SearchBar**: Predictive search for places and food.
- **ChatInput**: Message box for AI Companion with voice-to-text placeholder.
- **Card (Place/Food)**: Visual-heavy cards with image, rating, and quick-save button.
- **FilterBar**: Horizontal scrollable categories for quick filtering.

### 🏗️ Organisms
- **HeroSection**: "Tap and Go, Let the App Show!" slogan with dynamic Malabon video/image background.
- **AIChatPanel**: Split-screen or overlay chat interface with Malabon-themed bot persona.
- **ExploreGrid**: Responsive grid of place/food cards with pagination/infinite scroll.
- **MapSection**: Leaflet integration showing nearby spots and routes.
- **ItineraryBuilder**: Drag-and-drop or checklist-based timeline for trip planning.
- **PartnerSection**: High-conversion enrollment form for local businesses.
- **Footer**: Detailed site map and social links.

---

## ✅ Component Items Detail

For each component:
- **API**: TypeScript interfaces defined in `types/components.d.ts`
- **Accessibility**: ARIA labels, semantic HTML, `tabIndex` for keyboard nav.
- **Storybook**: Included in `components/[atomic-level]/[ComponentName].stories.tsx`
- **Tests**: Vitest for unit tests, Playwright for accessibility checks.

---

## ✅ Required Features Implementation

1. **AI Chat UI**: 
   - Conversational flow with suggested prompts ("Where should I eat?", "Best hidden gems?").
   - "Buddy" persona mirroring the logo's tricycle character.
2. **Explore System**: 
   - Grid toggles between List/Map view.
   - Smart filters based on user vibe (e.g., "Chill", "Foodie", "History").
3. **Booking UI**: 
   - Simple inquiry flow connecting users directly to partners or external platforms.
4. **Partner Onboarding**: 
   - "Join the Wave" landing section with a simple multi-step form.
5. **Itinerary Builder**: 
   - AI-recommended paths ("Food Crawl in Concepcion", "Legacy Tour").

---

## ✅ Proposed Code Changes

### Folder Structure
```bash
/client
 ├── app
 │   ├── (marketing)    # Landing, About, Partner
 │   ├── (platform)     # Explore, AI Companion, Itinerary
 │   ├── api            # Mock AI and Data routes
 │   └── globals.css    # Design tokens
 ├── components
 │   ├── atoms
 │   ├── molecules
 │   └── organisms
 ├── constants          # Navigation menus, static content
 ├── context            # UIState, UserState
 ├── hooks              # useChat, useExplorer, useGeolocation
 └── types              # TS Interfaces
```

### Sample Component (Atom/Button.tsx)
```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const Button = ({ className, variant = 'primary', isLoading, ...props }: ButtonProps) => {
  const styles = {
    primary: 'bg-aqua-primary text-white hover:bg-aqua-primary/90',
    secondary: 'bg-deep-ocean text-white hover:bg-deep-ocean/90',
    ghost: 'bg-transparent text-aqua-primary border border-aqua-primary hover:bg-aqua-soft',
  };

  return (
    <button
      className={twMerge('px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50', styles[variant], className)}
      disabled={isLoading}
      {...props}
    />
  );
};
```

---

## ✅ Commands

### Install Dependencies
```bash
npm install framer-motion lucide-react clsx tailwind-merge leaflet react-leaflet
```

### Run Dev Server
```bash
npm run dev
```

### Build & Test
```bash
npm run build
npm test # Once vitest is configured
```

---

## 🔍 Quality Checklist
- [ ] WCAG 2.1 AA Compliance
- [ ] 100% TypeScript Coverage
- [ ] Responsive Design Testing (Mobile/Tablet/Desktop)
- [ ] LCP / CLS Performance Benchmarking
- [ ] Dark Mode Support
