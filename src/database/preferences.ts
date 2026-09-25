import {execute, rows} from './db';
import type {Preferences} from '../types/domain';

export const DEFAULT_PREFERENCES: Preferences = {currency:'NGN',theme:'dark',monthlyIncome:0,notificationEnabled:true,notificationCategories:{debt:true,budget:true,savings:true,bill:true,custom:true},appLockEnabled:false,biometricEnabled:false,autoLockMinutes:5,onboardingComplete:false};
export const loadPreferences = async ():Promise<Preferences> => {
  const data = await rows<{key:string;value:string}>('SELECT key,value FROM preferences');
  const out:any = {...DEFAULT_PREFERENCES};
  for(const row of data){ try { out[row.key]=JSON.parse(row.value); } catch { out[row.key]=row.value; } }
  return out as Preferences;
};
export const setPreference = async <K extends keyof Preferences>(key:K,value:Preferences[K]) => {
  await execute('INSERT OR REPLACE INTO preferences(key,value,updated_at) VALUES(?,?,?)',[key,JSON.stringify(value),new Date().toISOString()]);
};
export const savePreferences = async (prefs:Preferences) => { for(const [k,v] of Object.entries(prefs)) await setPreference(k as keyof Preferences,v as any); };
