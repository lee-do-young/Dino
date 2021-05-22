import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

function TutorialPage({ navigation }){

  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>TutorialPage</Text>
    <Button title="Done" onPress={()=>{
      navigation.navigate('start')
    }}/>
  </View>
}

export default TutorialPage;