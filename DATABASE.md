# Finora Database

Finora uses a local SQLite database named `finora.sqlite`. Foreign keys are enabled at connection startup. Schema migrations are versioned through `app_meta.schema_version`.

## Tables

- `preferences`: serialized app preferences.
- `accounts`: wallets/accounts, opening and recalculated current balances.
- `categories`: system and user categories.
- `transactions`: all ledger movement with optional category, transfer destination, recurring schedule and notes/reference.
- `tags`, `transaction_tags`: normalized many-to-many tagging.
- `budgets`, `budget_categories`: budget limits and category allocations.
- `debts`: principal, outstanding balance, interest model, minimum payment and due dates.
- `debt_payments`: immutable repayment history tied to optional ledger transaction.
- `savings_goals`: target, current amount and deadline.
- `recurring_transactions`: local recurrence templates and next-run cursor.
- `reminders`: durable local schedule metadata.
- `notifications`: notification history.
- `financial_events`: generic calendar events.
- `audit_logs`: create/update/delete activity metadata.

## Integrity

Primary keys are app-generated IDs. Monetary amounts that must be positive are constrained with SQLite `CHECK` clauses. Foreign keys use `CASCADE`, `SET NULL` or `RESTRICT` according to ownership semantics. Indexes cover transaction dates/types/accounts/categories, budgets, debt due dates, repayment histories, recurrence schedules, reminders and calendar events.

All normal user-provided values are passed as SQL parameters. Dynamic table identifiers are limited to hard-coded internal allowlists or schema constants.

## Balance model

`accounts.current_balance` is a cached derived value. It is recalculated from opening balance and effective transaction history after transaction mutations and restore. Transfers are net-neutral globally. Future-dated transactions are excluded until their date arrives.

## Migration policy

`src/database/schema.ts` contains schema version and migration SQL. Future schema changes should add an ordered migration rather than modifying an already-shipped migration in place.
