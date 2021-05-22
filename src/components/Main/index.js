import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestCreateGame } from "../../utils";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});


export default function Main() {

  const [ userName, setUserName ] = useState("");

  async function loadUserName(){
    const res = await AsyncStorage.getItem('@userName')
    if(res!==null){
      setUserName(res)
    }
  }

  function configureUserName(){
    AsyncStorage.setItem('@userName', userName)
  }
  useEffect(( )=>{
    loadUserName();
  }, [])

  useEffect(( )=>{
    configureUserName();
  }, [userName])

  return (
    <View>
      <Text>Hello!</Text>
      <TextInput placeholder="Nickname" style={styles.input} value={userName} onChangeText={setUserName} />
      {userName.length>0?<Button title="Start game" onPress={requestCreateGame}/>:null}
    </View>
  );
}


