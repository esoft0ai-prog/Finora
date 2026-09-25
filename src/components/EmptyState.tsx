import React from 'react';import {View,StyleSheet} from 'react-native';import {H2,Txt} from './Typography';
export const EmptyState=({title,body}:{title:string;body:string})=><View style={styles.box}><H2>{title}</H2><Txt muted style={{textAlign:'center'}}>{body}</Txt></View>;
const styles=StyleSheet.create({box:{paddingVertical:36,paddingHorizontal:20,alignItems:'center',gap:8}});
