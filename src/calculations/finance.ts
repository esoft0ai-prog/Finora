import type {Debt, FinancialHealthScore} from '../types/domain';
import {daysBetween, localISODate} from '../utils/date';

export const calculateDebtTotalPayable = (principal:number, rate:number, type:'fixed'|'percentage'|'simple'|'none', months=12) => {
  if(type==='none') return principal;
  if(type==='fixed') return principal + Math.max(0,rate);
  if(type==='percentage') return principal * (1 + Math.max(0,rate)/100);
  return principal * (1 + (Math.max(0,rate)/100) * (months/12));
};
export const estimateInterest = (principal:number, rate:number, type:'fixed'|'percentage'|'simple'|'none', months=12) => Math.max(0,calculateDebtTotalPayable(principal,rate,type,months)-principal);
export const paymentsRemaining = (balance:number, minimum:number) => minimum>0 ? Math.ceil(Math.max(0,balance)/minimum) : 0;
export const debtToIncome = (monthlyDebt:number, monthlyIncome:number) => monthlyIncome>0 ? (monthlyDebt/monthlyIncome)*100 : (monthlyDebt>0?100:0);
export const payoffDate = (debt:Pick<Debt,'currentBalance'|'minimumPayment'|'paymentFrequency'>, from=new Date()) => {
  const remaining=paymentsRemaining(debt.currentBalance,debt.minimumPayment); if(!remaining) return null;
  const days = debt.paymentFrequency==='daily'?remaining:debt.paymentFrequency==='weekly'?remaining*7:debt.paymentFrequency==='biweekly'?remaining*14:debt.paymentFrequency==='quarterly'?remaining*91:debt.paymentFrequency==='yearly'?remaining*365:remaining*30;
  const d=new Date(from); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10);
};
export const budgetStatus = (limit:number,spent:number,start:string,end:string,today=localISODate()) => {
  const totalDays=Math.max(1,daysBetween(start,end)+1); const elapsed=Math.max(1,Math.min(totalDays,daysBetween(start,today)+1)); const remaining=Math.max(0,limit-spent);
  const percentage=limit>0?(spent/limit)*100:0; const pace=spent/elapsed; const projected=pace*totalDays; const daysRemaining=Math.max(0,daysBetween(today,end));
  const daysUntilExceeded=pace>0&&remaining>0?Math.ceil(remaining/pace):(remaining<=0?0:null);
  return {spent,remaining,percentage,daysRemaining,pace,projected,willExceed:projected>limit,daysUntilExceeded};
};
export const savingsProgress = (target:number,current:number,deadline:string,today=localISODate()) => {
  const remaining=Math.max(0,target-current); const days=Math.max(1,daysBetween(today,deadline)); const weeks=Math.max(1,days/7); const months=Math.max(1,days/30.4375);
  return {percentage:target>0?Math.min(100,(current/target)*100):0,remaining,requiredWeekly:remaining/weeks,requiredMonthly:remaining/months,daysRemaining:Math.max(0,days),onTrack:remaining===0};
};
export const financialHealthScore = (input:{income:number;expenses:number;savings:number;monthlyDebt:number;budgetUsedPercent:number;onTimePaymentRatio:number;debtReductionPercent:number;}):FinancialHealthScore => {
  const savingsRate=input.income>0?Math.max(0,(input.savings/input.income)*100):0;
  const dti=debtToIncome(input.monthlyDebt,input.income);
  const savings=Math.round(Math.min(20,savingsRate/20*20));
  const debtBurden=Math.round(Math.max(0,20-(Math.min(60,dti)/60)*20));
  const budgetDiscipline=Math.round(input.budgetUsedPercent<=100?20:Math.max(0,20-(input.budgetUsedPercent-100)/5));
  const cashFlow=Math.round(input.income>0?Math.max(0,Math.min(20,((input.income-input.expenses)/input.income+0.25)*16)):0);
  const paymentConsistency=Math.round(Math.max(0,Math.min(20,input.onTimePaymentRatio*16 + Math.min(4,input.debtReductionPercent/10))));
  const total=Math.max(0,Math.min(100,savings+debtBurden+budgetDiscipline+cashFlow+paymentConsistency));
  return {total,savings,debtBurden,budgetDiscipline,cashFlow,paymentConsistency,explanation:[`Savings rate contributes ${savings}/20.`,`Debt burden contributes ${debtBurden}/20.`,`Budget discipline contributes ${budgetDiscipline}/20.`,`Cash flow contributes ${cashFlow}/20.`,`Payment consistency contributes ${paymentConsistency}/20.`]};
};
export const nextOccurrence = (dateTime:string,frequency:string,interval=1) => { const d=new Date(dateTime); const n=Math.max(1,interval); if(frequency==='daily') d.setDate(d.getDate()+n); else if(frequency==='weekly') d.setDate(d.getDate()+7*n); else if(frequency==='biweekly') d.setDate(d.getDate()+14*n); else if(frequency==='quarterly') d.setMonth(d.getMonth()+3*n); else if(frequency==='yearly') d.setFullYear(d.getFullYear()+n); else if(frequency==='custom') d.setDate(d.getDate()+n); else d.setMonth(d.getMonth()+n); return d.toISOString(); };
