import {isValidDate} from './date';
export const positiveAmount = (value:unknown, field='Amount') => { const n=Number(value); if(!Number.isFinite(n)||n<=0) throw new Error(`${field} must be greater than zero.`); return n; };
export const nonNegative = (value:unknown, field='Value') => { const n=Number(value); if(!Number.isFinite(n)||n<0) throw new Error(`${field} cannot be negative.`); return n; };
export const required = (value:unknown, field='Field') => { const s=String(value??'').trim(); if(!s) throw new Error(`${field} is required.`); return s; };
export const validDate = (value:string, field='Date') => { if(!isValidDate(value)) throw new Error(`${field} must use YYYY-MM-DD.`); return value; };
