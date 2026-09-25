export const SCHEMA_VERSION = 1;
export const TABLES = ['accounts','categories','transactions','tags','transaction_tags','budgets','budget_categories','debts','debt_payments','savings_goals','recurring_transactions','reminders','notifications','financial_events','audit_logs'] as const;

export const MIGRATION_1 = [
`PRAGMA foreign_keys = ON`,
`CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS preferences (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL, updated_at TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS accounts (
 id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, opening_balance REAL NOT NULL DEFAULT 0,
 current_balance REAL NOT NULL DEFAULT 0, currency TEXT NOT NULL DEFAULT 'NGN', type TEXT NOT NULL,
 is_demo INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS categories (
 id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, kind TEXT NOT NULL, icon TEXT,
 is_system INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 UNIQUE(name, kind))`,
`CREATE TABLE IF NOT EXISTS transactions (
 id TEXT PRIMARY KEY NOT NULL, type TEXT NOT NULL, amount REAL NOT NULL CHECK(amount > 0), currency TEXT NOT NULL,
 date TEXT NOT NULL, time TEXT NOT NULL, category_id TEXT, description TEXT NOT NULL, account_id TEXT NOT NULL,
 to_account_id TEXT, payment_method TEXT, notes TEXT, reference TEXT, recurring_id TEXT, is_demo INTEGER NOT NULL DEFAULT 0,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL,
 FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE RESTRICT,
 FOREIGN KEY(to_account_id) REFERENCES accounts(id) ON DELETE RESTRICT)`,
`CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date)`,
`CREATE INDEX IF NOT EXISTS idx_transactions_type_date ON transactions(type,date)`,
`CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id,date)`,
`CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category_id,date)`,
`CREATE TABLE IF NOT EXISTS tags (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS transaction_tags (
 transaction_id TEXT NOT NULL, tag_id TEXT NOT NULL, PRIMARY KEY(transaction_id,tag_id),
 FOREIGN KEY(transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
 FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE)`,
`CREATE TABLE IF NOT EXISTS budgets (
 id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, period_type TEXT NOT NULL, amount REAL NOT NULL CHECK(amount > 0),
 start_date TEXT NOT NULL, end_date TEXT NOT NULL, category_id TEXT, account_id TEXT, currency TEXT NOT NULL,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL,
 FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE SET NULL)`,
`CREATE INDEX IF NOT EXISTS idx_budgets_period ON budgets(start_date,end_date)`,
`CREATE TABLE IF NOT EXISTS budget_categories (
 budget_id TEXT NOT NULL, category_id TEXT NOT NULL, allocated_amount REAL,
 PRIMARY KEY(budget_id,category_id), FOREIGN KEY(budget_id) REFERENCES budgets(id) ON DELETE CASCADE,
 FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE)`,
`CREATE TABLE IF NOT EXISTS debts (
 id TEXT PRIMARY KEY NOT NULL, lender_name TEXT NOT NULL, debt_type TEXT NOT NULL,
 principal_amount REAL NOT NULL CHECK(principal_amount > 0), current_balance REAL NOT NULL CHECK(current_balance >= 0),
 interest_rate REAL NOT NULL DEFAULT 0, interest_type TEXT NOT NULL, payment_frequency TEXT NOT NULL,
 minimum_payment REAL NOT NULL DEFAULT 0, due_date TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT,
 penalty REAL NOT NULL DEFAULT 0, notes TEXT, status TEXT NOT NULL DEFAULT 'active', currency TEXT NOT NULL,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
`CREATE INDEX IF NOT EXISTS idx_debts_due ON debts(status,due_date)`,
`CREATE TABLE IF NOT EXISTS debt_payments (
 id TEXT PRIMARY KEY NOT NULL, debt_id TEXT NOT NULL, amount REAL NOT NULL CHECK(amount > 0), paid_at TEXT NOT NULL,
 transaction_id TEXT, notes TEXT, created_at TEXT NOT NULL,
 FOREIGN KEY(debt_id) REFERENCES debts(id) ON DELETE CASCADE,
 FOREIGN KEY(transaction_id) REFERENCES transactions(id) ON DELETE SET NULL)`,
`CREATE INDEX IF NOT EXISTS idx_debt_payments_debt ON debt_payments(debt_id,paid_at)`,
`CREATE TABLE IF NOT EXISTS savings_goals (
 id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, target_amount REAL NOT NULL CHECK(target_amount > 0),
 current_amount REAL NOT NULL DEFAULT 0 CHECK(current_amount >= 0), deadline TEXT NOT NULL, currency TEXT NOT NULL,
 account_id TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE SET NULL)`,
`CREATE TABLE IF NOT EXISTS recurring_transactions (
 id TEXT PRIMARY KEY NOT NULL, template_json TEXT NOT NULL, frequency TEXT NOT NULL, interval_value INTEGER NOT NULL DEFAULT 1,
 next_run_at TEXT NOT NULL, end_at TEXT, enabled INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
`CREATE INDEX IF NOT EXISTS idx_recurring_due ON recurring_transactions(enabled,next_run_at)`,
`CREATE TABLE IF NOT EXISTS reminders (
 id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, message TEXT NOT NULL, scheduled_at TEXT NOT NULL,
 category TEXT NOT NULL, entity_id TEXT, repeat_frequency TEXT, enabled INTEGER NOT NULL DEFAULT 1,
 notification_id TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
`CREATE INDEX IF NOT EXISTS idx_reminders_due ON reminders(enabled,scheduled_at)`,
`CREATE TABLE IF NOT EXISTS notifications (
 id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL, category TEXT NOT NULL,
 delivered_at TEXT NOT NULL, read_at TEXT)`,
`CREATE TABLE IF NOT EXISTS financial_events (
 id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, event_type TEXT NOT NULL, date TEXT NOT NULL,
 amount REAL, currency TEXT, entity_id TEXT, created_at TEXT NOT NULL)`,
`CREATE INDEX IF NOT EXISTS idx_events_date ON financial_events(date,event_type)`,
`CREATE TABLE IF NOT EXISTS audit_logs (
 id TEXT PRIMARY KEY NOT NULL, action TEXT NOT NULL, entity_type TEXT NOT NULL, entity_id TEXT,
 details_json TEXT, created_at TEXT NOT NULL)`,
`INSERT OR REPLACE INTO app_meta(key,value) VALUES('schema_version','1')`
];
