import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import useGame from "../../hook/Game";
 
function GamePage({ navigation }){
  const { gameInfo, startGame, finishGame } = useGame();
  
  useEffect(() => {
    console.log(gameInfo);
  }, [])

  useEffect(() => {
    console.log(gameInfo);
  }, [gameInfo])


  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>GamePage</Text>
    <Button title={"Finish game"} onPress={()=>{
      finishGame();
      navigation.navigate('end')
    }}/>
    <Button title={"search game"} onPress={()=>{
      startGame({
        duration: 7
      });
    }}/>
  </View>
}

export default GamePage;