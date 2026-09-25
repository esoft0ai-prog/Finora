# Finora Testing

## Automated tests

`__tests__` contains Jest tests for debt/interest/payoff calculations, budget pacing, savings goals, explainable financial-health scoring, recurring frequency calculations and date helpers.

Run:

```bash
npm test
npm run typecheck
```

A dependency-free deterministic smoke test is also included:

```bash
node scripts/selftest.mjs
```

## Device/integration QA checklist

1. Fresh install: onboarding completes without network and creates the initial account.
2. Transactions: add/edit/delete income and expenses; balances recalculate exactly.
3. Transfers: source decreases, destination increases, income/expense reports stay unchanged.
4. Debt: create a debt, record repayments, verify outstanding balance/status and repayment history.
5. Budgets: create a category budget, add matching expenses, verify remaining/percentage/pace warning.
6. Savings: create goal, contribute, verify percentage and required weekly/monthly calculations.
7. Recurring: create due recurrence, close/reopen app, ensure occurrence materializes once only.
8. Notifications: grant permission, schedule a reminder, remove app from recents and verify delivery.
9. Reboot: with exact alarm support enabled, reboot and verify future trigger; reopen Finora to reconcile if the OEM cleared alarms.
10. Backup: export JSON, inspect record counts, import merge, verify duplicates are not duplicated.
11. Replace restore: export, create new data, restore replace only after explicit confirmation, verify counts/balances.
12. Corrupt backup: modify JSON without updating checksum and confirm restore is rejected.
13. App lock: enable PIN, background beyond timeout, verify lock; test wrong PIN and biometrics if supported.
14. Search: verify matches across transactions, notes, accounts, debts, goals and categories.
15. Release: install `app-release.apk` with network disabled and exercise all core features.

## Static quality checks

The project should have no unresolved relative imports, TODO/FIXME implementation markers, TypeScript errors, or unexpected release permissions. Inspect the merged release manifest before distribution.
