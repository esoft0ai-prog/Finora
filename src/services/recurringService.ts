import {execute,rows} from '../database/db';
import {createTransaction,type TransactionInput} from './transactionService';
import {nextOccurrence} from '../calculations/finance';
import {uuid} from '../utils/id';
import type {Frequency,RecurringTransaction} from '../types/domain';

export const createRecurringTransaction=async(input:{template:TransactionInput;frequency:Frequency;intervalValue?:number;nextRunAt:string;endAt?:string|null})=>{
  const next=new Date(input.nextRunAt); if(Number.isNaN(next.getTime()))throw new Error('Invalid next occurrence date.');
  if(input.endAt && new Date(input.endAt).getTime()<next.getTime())throw new Error('End date must be after the first occurrence.');
  const id=uuid(),now=new Date().toISOString();
  await execute('INSERT INTO recurring_transactions(id,template_json,frequency,interval_value,next_run_at,end_at,enabled,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?)',[id,JSON.stringify(input.template),input.frequency,Math.max(1,input.intervalValue||1),next.toISOString(),input.endAt??null,1,now,now]);
  return id;
};
export const listRecurringTransactions=async():Promise<RecurringTransaction[]> => (await rows<any>('SELECT * FROM recurring_transactions ORDER BY enabled DESC,next_run_at')).map(r=>({id:r.id,templateJson:r.template_json,frequency:r.frequency,intervalValue:r.interval_value,nextRunAt:r.next_run_at,endAt:r.end_at,enabled:Boolean(r.enabled),createdAt:r.created_at,updatedAt:r.updated_at}));
export const setRecurringEnabled=(id:string,enabled:boolean)=>execute('UPDATE recurring_transactions SET enabled=?,updated_at=? WHERE id=?',[enabled?1:0,new Date().toISOString(),id]);
export const deleteRecurringTransaction=(id:string)=>execute('DELETE FROM recurring_transactions WHERE id=?',[id]);

// Materialize occurrences that are actually due. Future occurrences remain schedules so they do not distort balances.
export const reconcileRecurringTransactions=async()=>{
  const now=new Date(); const due=await rows<any>('SELECT * FROM recurring_transactions WHERE enabled=1 AND next_run_at<=? ORDER BY next_run_at',[now.toISOString()]);
  let created=0;
  for(const item of due){
    let next=item.next_run_at as string; let guard=0;
    while(new Date(next).getTime()<=now.getTime()&&guard++<366){
      if(item.end_at&&new Date(next).getTime()>new Date(item.end_at).getTime()){await setRecurringEnabled(item.id,false);break;}
      const template=JSON.parse(item.template_json) as TransactionInput; const d=new Date(next);
      const date=d.toISOString().slice(0,10),time=d.toTimeString().slice(0,5);
      const existing=(await rows<any>('SELECT id FROM transactions WHERE recurring_id=? AND date=? AND time=? LIMIT 1',[item.id,date,time]))[0];
      if(!existing){await createTransaction({...template,date,time,recurringId:item.id},true);created++;}
      next=nextOccurrence(next,item.frequency,item.interval_value);
    }
    const ended=item.end_at&&new Date(next).getTime()>new Date(item.end_at).getTime();
    await execute('UPDATE recurring_transactions SET next_run_at=?,enabled=?,updated_at=? WHERE id=?',[next,ended?0:1,new Date().toISOString(),item.id]);
  }
  return created;
};
