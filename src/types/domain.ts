export type UUID = string;
export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | string;
export type TransactionType = 'income'|'expense'|'transfer'|'debt_repayment'|'loan_received'|'savings_deposit'|'savings_withdrawal';
export type AccountType = 'cash'|'bank'|'mobile_wallet'|'savings'|'business'|'other';
export type Frequency = 'daily'|'weekly'|'biweekly'|'monthly'|'quarterly'|'yearly'|'custom';
export type DebtType = 'personal_loan'|'bank_loan'|'loan_app'|'family_debt'|'friend_debt'|'business_debt'|'credit_purchase'|'other';
export type InterestType = 'fixed'|'percentage'|'simple'|'none';

export interface Account {id: UUID; name: string; openingBalance: number; currentBalance: number; currency: CurrencyCode; type: AccountType; isDemo: boolean; createdAt: string; updatedAt: string;}
export interface Category {id: UUID; name: string; kind: 'income'|'expense'|'both'; icon?: string; isSystem: boolean; createdAt: string; updatedAt: string;}
export interface Transaction {id: UUID; type: TransactionType; amount: number; currency: CurrencyCode; date: string; time: string; categoryId?: UUID|null; description: string; accountId: UUID; toAccountId?: UUID|null; paymentMethod?: string|null; notes?: string|null; reference?: string|null; tags?: string[]; recurringId?: UUID|null; isDemo: boolean; createdAt: string; updatedAt: string;}
export interface Budget {id: UUID; name: string; periodType: 'weekly'|'monthly'|'custom'; amount: number; startDate: string; endDate: string; categoryId?: UUID|null; accountId?: UUID|null; currency: CurrencyCode; createdAt: string; updatedAt: string;}
export interface Debt {id: UUID; lenderName: string; debtType: DebtType; principalAmount: number; currentBalance: number; interestRate: number; interestType: InterestType; paymentFrequency: Frequency; minimumPayment: number; dueDate: string; startDate: string; endDate?: string|null; penalty: number; notes?: string|null; status: 'active'|'paid'|'overdue'|'paused'; currency: CurrencyCode; createdAt: string; updatedAt: string;}
export interface DebtPayment {id: UUID; debtId: UUID; amount: number; paidAt: string; transactionId?: UUID|null; notes?: string|null; createdAt: string;}
export interface SavingsGoal {id: UUID; name: string; targetAmount: number; currentAmount: number; deadline: string; currency: CurrencyCode; accountId?: UUID|null; createdAt: string; updatedAt: string;}
export interface Reminder {id: UUID; title: string; message: string; scheduledAt: string; category: 'debt'|'budget'|'savings'|'bill'|'custom'; entityId?: UUID|null; repeatFrequency?: Frequency|null; enabled: boolean; notificationId?: string|null; createdAt: string; updatedAt: string;}
export interface RecurringTransaction {id: UUID; templateJson: string; frequency: Frequency; intervalValue: number; nextRunAt: string; endAt?: string|null; enabled: boolean; createdAt: string; updatedAt: string;}
export interface NotificationRecord {id: UUID; title: string; body: string; category: string; deliveredAt: string; readAt?: string|null;}
export interface FinancialEvent {id: UUID; title: string; eventType: string; date: string; amount?: number|null; currency?: CurrencyCode|null; entityId?: UUID|null; createdAt: string;}
export interface Preferences {currency: CurrencyCode; theme: 'dark'|'light'|'system'; monthlyIncome: number; notificationEnabled: boolean; notificationCategories:{debt:boolean;budget:boolean;savings:boolean;bill:boolean;custom:boolean}; appLockEnabled: boolean; biometricEnabled: boolean; autoLockMinutes: number; onboardingComplete: boolean;}
export interface DashboardMetrics {balance: number; income: number; expenses: number; netCashFlow: number; totalDebt: number; monthlyDebtObligation: number; savings: number; budgetRemaining: number; upcomingPayments: number; upcomingReminders: number; healthScore: FinancialHealthScore;}
export interface FinancialHealthScore {total: number; savings: number; debtBurden: number; budgetDiscipline: number; cashFlow: number; paymentConsistency: number; explanation: string[];}
export interface BackupEnvelope {format: 'finora-backup'; version: 1; appVersion: string; createdAt: string; recordCounts: Record<string, number>; data: Record<string, unknown[]>; checksum: string;}
