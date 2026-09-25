export const currencySymbol = (code:string) => ({NGN:'₦',USD:'$',GBP:'£',EUR:'€'} as Record<string,string>)[code] ?? `${code} `;
export const formatMoney = (amount:number, currency='NGN') => `${currencySymbol(currency)}${Math.abs(amount).toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:2})}`;
