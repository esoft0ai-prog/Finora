import React from 'react';import {View,StyleSheet} from 'react-native';import {usePalette} from '../theme/theme';
export const ProgressBar=({value}:{value:number})=>{const p=usePalette();return <View accessibilityRole="progressbar" accessibilityValue={{min:0,max:100,now:Math.round(value)}} style={[styles.track,{backgroundColor:p.surface2}]}><View style={[styles.fill,{width:`${Math.max(0,Math.min(100,value))}%`,backgroundColor:value>100?p.danger:p.primary}]}/></View>};
const styles=StyleSheet.create({track:{height:8,borderRadius:999,overflow:'hidden'},fill:{height:'100%',borderRadius:999}});
