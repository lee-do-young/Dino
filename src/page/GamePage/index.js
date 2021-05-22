import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import useGame from "../../hook/Game";

function Player({player}){

  return <React.Fragment>
    <Text>
      {player.name||"No name"}
    </Text>
  </React.Fragment>
}
 
function GamePage({ navigation }){
  const { gameInfo, playerInfoArray, startGame, finishGame } = useGame();
  
  useEffect(() => {
  }, [gameInfo, playerInfoArray])

  function renderGameInfo(){
    return <React.Fragment>
      <Text>{gameInfo.status}</Text>
      <Text>createTime: {gameInfo.createTime}</Text>
      <Text>startTime: {gameInfo.startTime}</Text>
      <Text>endTime: {gameInfo.endTime}</Text>
    </React.Fragment>
  }

  function renderPlayerList(){
    return <React.Fragment>
      {playerInfoArray.map(player => {
        return <Player player={player}/>
      })}
    </React.Fragment>
  }


  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>GamePage</Text>
    <Button title={"End game"} onPress={()=>{
      finishGame();
    }}/>
    <Button title={"Start game"} onPress={()=>{
      startGame({
        duration: 7
      });
    }}/>
    <Button title={"End game"} onPress={()=>{
      finishGame();
    }}/>
    <Button title={"Next page"} onPress={()=>{
      navigation.navigate('end')
    }}/>
    {gameInfo?renderGameInfo():null}
    {playerInfoArray.length>0?renderPlayerList():null}
  </View>
}

export default GamePage;