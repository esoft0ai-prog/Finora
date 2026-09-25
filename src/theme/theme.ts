import {useColorScheme} from 'react-native';import {useAppStore} from '../state/useAppStore';
export const dark={bg:'#071014',surface:'#0d1b22',surface2:'#122630',border:'#1d3a45',text:'#f2f7f8',muted:'#8ea5ad',primary:'#53e0b1',primaryDim:'#183f36',danger:'#ff6b75',warning:'#ffc857',success:'#53e0b1',info:'#65b9ff'};
export const light={bg:'#f4f8f8',surface:'#ffffff',surface2:'#eaf2f1',border:'#d5e2e0',text:'#102025',muted:'#647b82',primary:'#087f66',primaryDim:'#d9f4ec',danger:'#c93645',warning:'#9b6500',success:'#087f66',info:'#156ba7'};
export const usePalette=()=>{const pref=useAppStore(s=>s.preferences.theme);const sys=useColorScheme();return pref==='light'?light:pref==='dark'?dark:sys==='light'?light:dark;};
export type Palette=typeof dark;
