# Finora Architecture

## Principles

Finora is local-first, deterministic and dependency-minimal. Screens do not own persistence rules. SQLite is the system of record; Zustand is a refreshable UI cache, not a second database. Services own domain invariants such as transaction validation, debt repayment, recurring materialization, backup validation and notification scheduling.

## Layers

1. **UI**: `src/screens`, `src/components`, `src/theme`.
2. **Navigation**: `src/navigation`.
3. **State**: `src/state/useAppStore.ts` coordinates loading and preferences.
4. **Domain calculations**: `src/calculations/finance.ts`, pure/testable functions.
5. **Services**: transactional use cases, notifications, backup, assistant, security, search and analytics.
6. **Repositories/database**: normalized SQLite schema, migrations, parameterized queries.
7. **Android native shell**: React Native New Architecture, Hermes, notification/alarm permissions and signing/build configuration.

## Data flow

User action → Screen validation → Domain service → parameterized SQLite mutation → audit log/balance recalculation → Zustand refresh → UI.

Account balances are derived from opening balances plus transaction history dated no later than today. Editing or deleting a transaction triggers a full local balance recalculation. Transfers debit one account and credit another without appearing as income or expense.

## Recurring transactions

A recurring schedule stores a JSON transaction template plus frequency, interval, next run and optional end date. On application startup and foreground resume, Finora materializes only occurrences whose scheduled time has arrived. A recurring ID + date/time lookup makes reconciliation idempotent. Future ledger entries are not pre-created, preventing future expenses/income from changing the present account balance.

## Local assistant

`assistantService.ts` performs lightweight local intent matching and executes deterministic queries/calculations against SQLite. It does not call or impersonate an LLM. Its response includes the numerical basis where practical. The service boundary allows an optional AI adapter in a future build without changing the local data model.

## Notifications

SQLite reminders are the durable schedule record. Notifee is the Android scheduling surface. Finora creates high-importance local notifications and reconciles future triggers at startup/foreground. Debt reminder creation schedules multiple offsets before the due date plus an overdue reminder. The database history table prevents duplicate notification-history rows.

## Backup

Export serializes every application table into a versioned envelope with record counts and an integrity checksum. Import validates format/version/checksum before any mutation. Replace is ordered to respect foreign keys; merge uses primary-key identity and `INSERT OR IGNORE` semantics.

## Extensibility

Interfaces and service boundaries allow later sync providers, bank imports, cloud identity or AI providers to be added beside the local implementation. The release app requires none of them.
