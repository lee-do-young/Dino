import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

function StartPage({ navigation }){

  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>StartPage</Text>
    <Button title={"Start game"} onPress={()=>{
      navigation.navigate('game')
    }}/>
  </View>
}

export default StartPage;