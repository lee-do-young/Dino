import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

function GamePage({ navigation }){

  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>GamePage</Text>
    <Button title={"Finish game"} onPress={()=>{
      navigation.navigate('end')
    }}/>
  </View>
}

export default GamePage;