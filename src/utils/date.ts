const pad = (n:number) => String(n).padStart(2,'0');
export const localISODate = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
export const localTime = (d = new Date()) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
export const startOfMonth = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-01`;
export const endOfMonth = (d = new Date()) => localISODate(new Date(d.getFullYear(), d.getMonth()+1, 0));
export const addDays = (date:string, days:number) => { const d = new Date(`${date}T12:00:00`); d.setDate(d.getDate()+days); return localISODate(d); };
export const daysBetween = (a:string,b:string) => Math.ceil((new Date(`${b}T12:00:00`).getTime()-new Date(`${a}T12:00:00`).getTime())/86400000);
export const isValidDate = (v:string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(new Date(`${v}T12:00:00`).getTime());
export const monthBounds = (offset=0) => { const d=new Date(); d.setMonth(d.getMonth()+offset); return {start:startOfMonth(d), end:endOfMonth(d)}; };
