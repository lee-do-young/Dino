import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

function EndPage({ navigation }){

  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>EndPage</Text>
    <Button title={"Restart"} onPress={()=>{
      navigation.navigate('game')
    }}/>
    <Button title={"back to Start"} onPress={()=>{
      navigation.navigate('start')
    }}/>
  </View>
}

export default EndPage;