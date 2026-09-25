import assert from 'node:assert/strict';

const calculateDebtTotalPayable=(p,r,t,m=12)=>t==='none'?p:t==='fixed'?p+Math.max(0,r):t==='percentage'?p*(1+Math.max(0,r)/100):p*(1+(Math.max(0,r)/100)*(m/12));
const paymentsRemaining=(balance,minimum)=>minimum>0?Math.ceil(Math.max(0,balance)/minimum):0;
const debtToIncome=(monthlyDebt,monthlyIncome)=>monthlyIncome>0?(monthlyDebt/monthlyIncome)*100:(monthlyDebt>0?100:0);
const daysBetween=(a,b)=>Math.ceil((new Date(`${b}T12:00:00`).getTime()-new Date(`${a}T12:00:00`).getTime())/86400000);
const budgetStatus=(limit,spent,start,end,today)=>{const totalDays=Math.max(1,daysBetween(start,end)+1);const elapsed=Math.max(1,Math.min(totalDays,daysBetween(start,today)+1));const remaining=Math.max(0,limit-spent);const pace=spent/elapsed;const projected=pace*totalDays;return {remaining,pace,projected,willExceed:projected>limit};};
assert.equal(calculateDebtTotalPayable(100000,15000,'fixed'),115000);
assert.equal(calculateDebtTotalPayable(200000,10,'percentage'),220000.00000000003);
assert.equal(paymentsRemaining(105000,20000),6);
assert.equal(debtToIncome(50000,250000),20);
const b=budgetStatus(50000,20000,'2026-09-01','2026-09-30','2026-09-10');
assert.equal(b.remaining,30000); assert.equal(b.pace,2000); assert.equal(b.willExceed,true);
console.log('Finora deterministic calculation smoke tests: PASS');
