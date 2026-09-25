import React from 'react';import {View,StyleSheet,type ViewStyle} from 'react-native';import {usePalette} from '../theme/theme';
export const Card=({children,style}:{children:React.ReactNode;style?:ViewStyle})=>{const p=usePalette();return <View style={[styles.card,{backgroundColor:p.surface,borderColor:p.border},style]}>{children}</View>};
const styles=StyleSheet.create({card:{borderWidth:1,borderRadius:20,padding:16,gap:10}});
