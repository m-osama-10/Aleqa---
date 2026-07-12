# Alieqa — حاسبة العليقة الذكية | Smart Feed Calculator

A production-grade **animal-feed ration calculator** with a **Supabase backend**, **offline-first sync**, **dynamic ads & settings**, **push notifications**, a full **admin dashboard**, and a companion **React Native / Expo mobile app**.

Built for Egyptian livestock farmers (cattle, buffalo, sheep, poultry) using a **Linear Programming** engine that computes the cheapest balanced ration meeting each animal's protein, energy, and fiber requirements.

---

## What's in this repository

| Path | What |
|------|------|
| `src/` | **Next.js 16 web app** — the live website + web version of the calculator (runs on port 3000) |
| `mobile-app/` | **React Native / Expo** mobile app source (SDK 52, RN 0.76) |
| `supabase/migrations/0001_init_alieqa.sql` | **Complete SQL migration** — 12 tables, RLS, indexes, triggers, policies, seed data, RPCs |
| `public/manifest.json` | PWA manifest for the web app |

---

## Tech stack

### Web (Next.js)
- **Next.js 16** App Router + **TypeScript 5**
- **Tailwind CSS 4** + **shadcn/ui** (New York)
- **@supabase/ssr** + **@supabase/supabase-js** (publishable key only — RLS enforced)
- **Zustand** for auth/app state
- Offline cache via `localStorage` + pending-ops queue + exponential-backoff retry

### Mobile (Expo)
- **Expo SDK 52** + **React Native 0.76** + **TypeScript**
- **React Navigation v7** (auth stack + bottom tabs + admin stack)
- **@supabase/supabase-js**
- **expo-notifications** for push, **AsyncStorage** for offline cache
- **Zustand** stores (auth, app, sync)
- Feature-based architecture: `api/ components/ hooks/ screens/ services/ store/ types/ utils/`

### Backend (Supabase)
- **PostgreSQL** with **Row Level Security** on every table
- 12 tables: `profiles, subscriptions, notifications, ads, settings, calculators, calculator_categories, favorites, history, feedback, app_versions, device_tokens`
- RPCs: `get_public_settings()`, `get_active_ads()`, `increment_ad_stat()`, `get_unread_count()`, `is_admin()`
- Auto-profile creation trigger on signup
- `updated_at` triggers, soft-delete columns, composite indexes

---

## Database schema overview

```
profiles ─┬─< subscriptions
          ├─< favorites ─> calculators ─> calculator_categories
          ├─< history ────> calculators
          ├─< feedback
          ├─< device_tokens
          └─< notifications (user_id or is_broadcast)

ads               (dynamic, served to all users)
settings          (dynamic key-value, public/private)
app_versions      (force-update checks)
```

Every table has:
- `id uuid pk default gen_random_uuid()`
- `created_at timestamptz default now()`
- `updated_at timestamptz` (trigger-maintained)
- `deleted_at timestamptz` (soft delete)
- Indexes on foreign keys + common query columns
- RLS policies (public read for catalogs; owner-only for user data; admin-only for management)

---

## Authentication

| Feature | Status |
|---------|--------|
| Email + password login | ✅ |
| Registration (email confirmation) | ✅ |
| Forgot password (reset email) | ✅ |
| Remember me (persisted session) | ✅ |
| Guest mode (local-only) | ✅ |
| Auto profile creation on signup | ✅ (DB trigger) |
| RLS-protected routes | ✅ |

---

## Offline support

- **Cache**: settings, ads, calculators, categories → `localStorage` (web) / `AsyncStorage` (mobile) with TTL
- **Pending ops queue**: favorites/history writes queue locally when offline
- **Auto-sync**: on `online` event + every 60s while online
- **Conflict handling**: last-write-wins via `updated_at`; soft-deletes idempotent
- **Retry**: exponential backoff (500ms × 2ⁿ, max 3 attempts)

---

## Ads (dynamic, never hardcoded)

Each ad has: `title, description, image_url, button_text, link_url, placement, priority, enabled, start_date, end_date, impressions, clicks`.

- Served via `get_active_ads(placement)` RPC (public, RLS-bypassed, safe)
- Impressions & clicks tracked via `increment_ad_stat()` RPC
- Admin can create/enable/disable/delete from the dashboard
- Master switch: `settings.ads_enabled`

---

## App settings (dynamic)

Loaded from Supabase `settings` table via `get_public_settings()` RPC. Includes:
`maintenance_mode, minimum_version, privacy_policy, terms, contact_email, support_url, facebook, whatsapp, telegram, app_name, primary_color, ads_enabled, max_history_items, max_favorites_items`

Maintenance mode blocks the app for everyone except admins.

---

## Notifications

- Web: in-app notification center (bell icon, unread badges)
- Mobile: **Expo Push Notifications** — token registered on login, stored in `device_tokens` table
- Admin can send **broadcast** (all users) or **targeted** notifications
- Types: `info, warning, success, error, ad, system`

---

## Admin dashboard

Accessible only to users with `role = 'admin'` in their profile. To make a user admin, run in SQL editor:
```sql
update profiles set role = 'admin' where email = 'you@example.com';
```

Dashboard sections:
1. **Overview** — KPI cards (users, calculators, active ads, open feedback)
2. **Users** — list, toggle admin role, soft-delete
3. **Ads** — CRUD ads, enable/disable, view stats
4. **Settings** — edit any setting (boolean toggle or text input)
5. **Notifications** — send broadcast/targeted notifications, view history
6. **Categories** — enable/disable/delete calculator categories
7. **Analytics** — ad impressions, clicks, CTR, favorites/history counts, recent feedback

---

## Running the web app

The dev server runs on port 3000:
```bash
bun install
bun run dev   # http://localhost:3000
```

Environment (already configured in `.env`):
```
NEXT_PUBLIC_SUPABASE_URL=https://lepdythxcdurjwncxnnt.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_nWluULZyJ-hU3f42jd0mbg_8iNXWxkp
```

### One-time Supabase setup
1. Open your Supabase project → **SQL Editor**
2. Paste the contents of `supabase/migrations/0001_init_alieqa.sql`
3. Run it — creates all tables, RLS, indexes, triggers, seeds
4. In Supabase → **Authentication → Providers → Email**: enable Email + Confirm email (optional)
5. (Optional) Promote yourself to admin:
   ```sql
   update profiles set role = 'admin' where email = 'you@example.com';
   ```

---

## Building the mobile APK

The mobile app lives in `mobile-app/`. To build an APK:

```bash
cd mobile-app

# 1. Install dependencies
npm install        # or: bun install / yarn install

# 2. Install EAS CLI (if not already)
npm install -g eas-cli

# 3. Log in to Expo
eas login

# 4. Configure the project (first time only)
eas build:configure

# 5. Build a production APK
eas build -p android --profile production

#    — or a preview/internal APK —
eas build -p android --profile preview
```

The `eas.json` is preconfigured with `buildType: "apk"` for both `preview` and `production` profiles.

### Local development (no EAS)
```bash
cd mobile-app
npm install
npx expo start                    # Metro bundler
# press 'a' to open on Android emulator, 'i' for iOS
```

### Mobile app credentials
Already embedded in `app.json` → `extra.supabaseUrl` and `extra.supabasePublishableKey`, plus `src/api/supabase.ts`. **Never use the service role key** — RLS enforces all access.

---

## Folder structure (web)

```
src/
  app/                  Next.js App Router
    layout.tsx          Root layout (RTL, dark mode, manifest)
    page.tsx            Single-page app (landing → auth → shell → admin)
  components/
    aleeqa/             Original calculator UI (landing, calculator, prices, rations, about)
    admin/              Admin dashboard (users, ads, settings, notifications, categories, analytics)
    auth/               Auth screen (login/register/forgot/guest)
    common/             AdBanner
    ui/                 shadcn/ui components
    app-shell.tsx       Main app shell (tabs, ads, offline indicator, auth gate)
    profile-screen.tsx  Profile / favorites / history / notifications / feedback / settings
  lib/
    supabase/           client.ts (browser) + server.ts (SSR)
    services/           settings, ads, calculators, favorites, history, notifications, auth
    store/              auth-store, app-store, auth-context (Zustand)
    offline/            cache, network, sync-engine
    feed-data.ts        Ingredient DB + animal profiles (9 species)
    feed-lp.ts          Linear programming ration optimizer
    ration-report.ts    Report generator (PDF/WhatsApp/print)
    i18n.tsx            Arabic + English translations
    storage.ts          localStorage hooks (prices, rations)
  types/
    db.ts               Database row types mirroring SQL schema
```

## Folder structure (mobile)

```
mobile-app/
  app.json              Expo config (plugins, permissions, EAS)
  eas.json              Build profiles (apk for preview + production)
  index.ts              Entry → registerRootComponent(App)
  src/
    App.tsx             Root (GestureHandler, SafeArea, StatusBar)
    api/                supabase, auth, calculators, favorites, history, ads, settings, notifications, deviceTokens, feedData
    components/         AdBanner, AdCard, RationResultCard, IngredientSlider, LoadingSpinner, EmptyState, ErrorView, OfflineBanner
    hooks/              useAuth, useCalculation, useFavorites, useHistory, useAds, useSettings, useNotifications, useOfflineSync, useNetworkStatus
    navigation/         AppNavigator (auth/main/admin stacks), types
    screens/
      auth/             Login, Register, ForgotPassword
      main/             Home, Calculator, Results, Favorites, History, Prices, Notifications, Settings, Profile, About, Feedback
      admin/            Dashboard, Users, Ads, Settings, Notifications, Categories, Analytics
    services/           storage (AsyncStorage), syncEngine, pushNotifications, rationOptimizer (LP solver)
    store/              authStore, appStore, syncStore (Zustand)
    types/              db.ts (mirrors web), index.ts
    utils/              constants, helpers, validation, i18n (ar/en, RTL)
```

---

## Security

- **RLS enabled on every table** — no `service_role` key in the app, ever
- **Publishable/anon key only** — safe to ship in client bundles
- `is_admin()` SQL function checks `profiles.role = 'admin'` for the current `auth.uid()`
- Admin-only policies on `ads, settings, calculator_categories, calculators, app_versions`
- Owner-only policies on `favorites, history, device_tokens, subscriptions`
- Input validation: Zod on web, manual validation on mobile
- Error handling + loading states + retry on every async path
- Soft-delete everywhere (`deleted_at`) — no destructive deletes

---

## License

Proprietary — Alieqa © 2025
