import {execute, one} from './db';
import {uuid} from '../utils/id';

const incomes = ['Salary','Business','Freelance','Investment','Gift','Other Income'];
const expenses = ['Food','Transport','Rent','Electricity','Internet','Education','Health','Family','Entertainment','Shopping','Debt Repayment','Business Expense','Other Expense'];

export const seedDefaults = async () => {
  const now = new Date().toISOString();
  for (const name of incomes) await execute('INSERT OR IGNORE INTO categories(id,name,kind,is_system,created_at,updated_at) VALUES(?,?,?,?,?,?)',[uuid(),name,'income',1,now,now]);
  for (const name of expenses) await execute('INSERT OR IGNORE INTO categories(id,name,kind,is_system,created_at,updated_at) VALUES(?,?,?,?,?,?)',[uuid(),name,'expense',1,now,now]);
  const account = await one<{id:string}>('SELECT id FROM accounts LIMIT 1');
  if (!account) await execute('INSERT INTO accounts(id,name,opening_balance,current_balance,currency,type,is_demo,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?)',[uuid(),'Cash',0,0,'NGN','cash',0,now,now]);
};
