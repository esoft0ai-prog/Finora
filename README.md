# Finora

**Personal Finance & Debt Intelligence**

Finora is an offline-first React Native Android personal-finance application designed primarily for Nigerian users while keeping currency and domain models extensible. The default currency is NGN. Core finance, debt, budgeting, reminders, reports, backup/restore, search, app lock and the deterministic financial assistant run on-device without accounts, Firebase, backend APIs, advertising or analytics services.

## Feature set

- Dashboard with balance, income, expenses, cash flow, debt, savings, budget remaining, commitments and explainable health score.
- Dashboard periods: today, week, month, last month, 3 months, 6 months, year and custom dates.
- Income, expense, transfer, debt repayment, loan receipt and savings transactions.
- Multiple local accounts/wallets; transfers are excluded from income/expense totals.
- Weekly, monthly, category and custom budgets with local spending-pace projection.
- Debt/loan records, interest calculations, repayment history, payoff projection and reminders.
- Savings goals with percentage, remaining target and required weekly/monthly saving calculations.
- Recurring local transaction schedules with catch-up of due occurrences.
- Financial calendar, upcoming/overdue commitments and local reminders.
- Reports for category spending and monthly cash flow.
- Deterministic offline assistant for common financial questions and affordability analysis.
- Search across transactions, debts, goals, accounts, categories and notes.
- JSON full backup, CSV transaction export, validated merge/replace restore.
- PIN and optional biometric app lock using Android Keystore-backed credentials.
- Dark-first UI with light/system alternatives.
- Optional clearly tagged demo data.

## Technology

- React Native 0.87.1 / React 19.2 / TypeScript
- React Native New Architecture + Hermes
- Nitro SQLite for structured local data
- Zustand for app state
- Notifee for local Android notifications and timestamp alarms
- React Navigation 7
- react-native-keychain for protected app-lock credentials
- react-native-file-access, Android document picker and share sheet for portable backups

## Privacy and offline architecture

The release manifest deliberately contains **no `INTERNET` permission**. Android Metro networking is declared only in `src/debug/AndroidManifest.xml` for development. Finora requests no location, contacts, SMS, call logs, camera or microphone access. Data lives in the app-private SQLite database unless the user explicitly exports it.

See `SECURITY.md` for the exact protection model and its limits.

## Quick development setup

Requirements: Node.js 22.13+, JDK 17+ (JDK 21 is fine), Android Studio/Android SDK, Android SDK platform matching compileSdk 37, and an Android device or emulator.

```bash
npm install
npm start
npm run android
```

## Build APK

Debug:

```bash
npm install
cd android
./gradlew assembleDebug
```

Output:

`android/app/build/outputs/apk/debug/app-debug.apk`

Release:

```bash
cd android
./gradlew assembleRelease
```

Output:

`android/app/build/outputs/apk/release/app-release.apk`

Without `android/keystore.properties`, the project deliberately falls back to the debug key so a locally installable release-mode APK can still be produced for testing/sideloading. For any long-lived distribution, create and preserve your own release keystore as documented in `BUILD_ANDROID.md`.

## Sideload installation

Copy the APK to the Android device using USB, WhatsApp/Telegram, Drive, GitHub Releases or another file transfer method. Android may ask the user to allow **Install unknown apps** for the file manager/browser used to open the APK. Existing installations can only be upgraded by an APK signed with the same signing key.

Google Play is not required.

## Database

Schema version 1 includes preferences, accounts, categories, transactions, tags, budgets, debts, repayments, savings goals, recurring schedules, reminders, notification history, financial events and audit logs. Foreign keys and indexes are enabled and migrations run at startup. See `DATABASE.md`.

## Backup and restore

A complete backup contains a versioned envelope, creation date, record counts, all application tables and a checksum. Import validates the envelope and checksum before restore. The UI requires explicit selection of merge or replace; it never silently replaces data. Merge uses primary-key identity to ignore duplicates. CSV export is available for transactions.

## Notifications

Finora creates a high-importance local Android notification channel. Debt reminders and custom reminders are scheduled with timestamp triggers and `AlarmManager`-compatible handling. Reconciliation at startup/foreground recreates missing future triggers from SQLite. Exact-alarm availability is surfaced in Settings. See `ARCHITECTURE.md` and `BUILD_ANDROID.md`.

## Tests

```bash
npm test
npm run typecheck
node scripts/selftest.mjs
```

Pure deterministic calculation tests cover debt, budgets, savings, health score, recurring date math and date helpers. Device QA cases for CRUD, reboot reminders, backup/restore, app lock and release install are in `TESTING.md`.

## Documentation

- `ARCHITECTURE.md`
- `DATABASE.md`
- `SECURITY.md`
- `TESTING.md`
- `BUILD_ANDROID.md`
- `KNOWN_LIMITATIONS.md`

## Future extension points

Repositories/services isolate the local domain from UI so optional cloud sync, user accounts, bank-statement import, open-banking adapters, AI providers, multi-device sync, family/business finance and a web dashboard can be added later without making the current application cloud-dependent.
