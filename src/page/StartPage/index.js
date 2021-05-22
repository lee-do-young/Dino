import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import useUser from "../../hook/User"

function StartPage({ navigation }){
  const { userInfo, loadUserInfo  } = useUser();
  useEffect(() => {
    loadUserInfo();
  }, [])

  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>StartPage</Text>
    <Button title={"Start game"} onPress={()=>{
      navigation.navigate('game')
    }}/>
  </View>
}

export default StartPage;