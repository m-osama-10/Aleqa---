# Alieqa — React Native / Expo Mobile App

> حاسبة العليقة الذكية للمربي المصري — Smart feed-ration calculator for Egyptian farmers.

A production-ready Expo (SDK 52, React Native 0.76) mobile app that replicates
the [Alieqa web tool](../src/). It calculates the cheapest **balanced** or
**economy** animal-feed ration for Egyptian-market ingredients using a Linear
Programming (Simplex) solver running entirely on-device — **works offline**.

## Features

- 🌾 **LP ration solver** (Simplex) — same engine as the web version, runs 100% on-device.
- 🐄 **9 animal profiles** — dairy cow, dairy buffalo, fattening buffalo, calf, sheep, layer, layer breeder, broiler, broiler starter.
- 🥗 **6 ingredients** — corn, soybean meal, wheat bran, hay, straw, premix — with editable per-market prices.
- 💰 **Cost optimization** — balanced or economy mode, daily/monthly totals, per-head & per-bird cost, savings.
- 🌐 **Arabic (RTL) + English (LTR)** — fully translated, persisted locale.
- 📴 **Offline-first** — AsyncStorage cache for calculators, categories, favorites, history, settings, ads. Sync queue when back online.
- 🔐 **Supabase auth** — email/password, password reset, guest mode.
- 🔔 **Expo Push Notifications** — token registered to `device_tokens`, in-app notification center.
- 💾 **Favorites + History** — backed by Supabase RLS.
- 📢 **Ad system** — banner + card ads from Supabase `ads` table.
- 🛠️ **Admin suite** — dashboard, users, ads, settings, notifications, categories, analytics (admin role only).
- 📲 **APK-ready** — `eas build -p android --profile production`.

## Tech Stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Expo SDK 52, React Native 0.76                       |
| Language       | TypeScript 5.3 (strict)                             |
| Navigation     | @react-navigation/native v7 (native-stack + bottom-tabs) |
| State          | Zustand 4.5                                         |
| Backend        | @supabase/supabase-js v2 (URL + publishable key)    |
| Storage        | @react-native-async-storage/async-storage           |
| Push           | expo-notifications + expo-device                    |
| Secure storage | expo-secure-store (auth tokens)                     |
| Icons          | @expo/vector-icons                                  |
| Architecture   | Feature-based (`api/`, `screens/`, `store/`, `hooks/`, `services/`, `components/`) |

## Project Structure

```
mobile-app/
├── app.json              Expo config (name "Alieqa", bundleId "app.alieqa")
├── package.json
├── tsconfig.json
├── babel.config.js
├── eas.json              Build profiles: development / preview / production
├── index.ts              App entry — registerRootComponent(App)
└── src/
    ├── App.tsx           Root: providers + AppNavigator
    ├── api/              Supabase clients + typed CRUD modules
    ├── components/       Reusable UI: AdBanner, RationResultCard, IngredientSlider, ...
    ├── hooks/            useAuth, useCalculation, useFavorites, ...
    ├── navigation/       AppNavigator + route param types
    ├── screens/
    │   ├── auth/         Login, Register, ForgotPassword
    │   ├── main/         Home, Calculator, Results, Favorites, History,
    │   │                 Prices, Notifications, Settings, Profile, About, Feedback
    │   └── admin/        Dashboard, Users, Ads, Settings, Notifications,
    │                     Categories, Analytics
    ├── services/         storage, syncEngine, pushNotifications, rationOptimizer
    ├── store/            authStore, appStore, syncStore (Zustand)
    ├── types/            db (mirror of web) + index
    ├── utils/            constants, helpers, validation, i18n
    └── assets/           (placeholder for icons/splash)
```

## Setup

### Prerequisites
- Node.js ≥ 18
- Expo CLI: `npm i -g eas-cli`
- Android Studio (for local Android builds) or EAS Build (cloud builds)
- A Supabase project with the schema from `supabase/migrations/0001_init_alieqa.sql` applied

### Install & Run

```bash
cd mobile-app
npm install              # or: bun install
cp .env.example .env     # then edit if you forked the Supabase project

# Start the dev server (Expo Go on your phone, or an emulator)
npx expo start
```

### Build the APK

```bash
# 1. Log in to EAS (first time only)
eas login

# 2. Production APK (release-ready)
eas build -p android --profile production

# 3. Preview APK (internal distribution)
eas build -p android --profile preview

# 4. Submit to Google Play (after production build)
eas submit -p android --latest
```

The production profile builds a standalone `.apk` signed with a generated
keystore (or your own if configured). Download URL appears in the EAS dashboard
once the build finishes.

## Environment Variables

| Var                                  | Source             | Required |
| ------------------------------------ | ------------------ | -------- |
| `EXPO_PUBLIC_SUPABASE_URL`           | `.env` / app.json  | ✅        |
| `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `.env` / app.json | ✅        |

Both are pre-populated in `.env.example` and `app.json` with the project's
publishable key.

## Database Tables

All tables have **Row-Level Security** enabled. The app only uses the
publishable/anon key — every read/write is enforced server-side.

| Table                  | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `profiles`             | User profile, role (user/admin), locale, theme |
| `subscriptions`        | Free / Pro / Premium plan tracking           |
| `notifications`        | In-app + push notifications                  |
| `ads`                  | Banner & card ads by placement               |
| `settings`             | Public/private app config (key/value)        |
| `calculators`          | Catalog of calculators (with config JSON)    |
| `calculator_categories`| Categories to group calculators              |
| `favorites`            | User's saved rations (per user RLS)          |
| `history`              | User's calculation history (per user RLS)    |
| `feedback`             | User-submitted feedback + rating             |
| `app_versions`         | Force-update + release notes                 |
| `device_tokens`        | Expo push tokens for notifications           |

## License & Disclaimer

A pure calculation tool — sells nothing, supplies nothing. Nutritional values
are approximate, based on NRC averages tuned for the Egyptian market. For large
production flocks consult a nutritionist. © Alieqa.
