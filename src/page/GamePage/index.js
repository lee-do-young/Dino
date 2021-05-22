import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import useGame from "../../hook/Game";

function Player({player}){

  return <React.Fragment>
    <Text>
      {player.uid||"No name"}
    </Text>
  </React.Fragment>
}
 
function GamePage({ navigation }){
  const { uid, gameInfo, startGame, finishGame } = useGame();
  const [ playerList, setPlayerList] = useState([]);
  
  useEffect(() => {
    if(gameInfo&&gameInfo.gameData){
      setPlayerList([...Object.keys(gameInfo.gameData).map(uid=>{
        return {
          ...gameInfo.gameData[uid],
          uid,
        }
      })])
    }else{
      setPlayerList([])
    }
  }, [gameInfo])

  function renderGameInfo(){
    return <React.Fragment>
      <Text>{gameInfo.status}</Text>
      <Text>uid: {uid}</Text>
      <Text>createTime: {gameInfo.createTime}</Text>
      <Text>startTime: {gameInfo.startTime}</Text>
      <Text>endTime: {gameInfo.endTime}</Text>
    </React.Fragment>
  }

  function renderPlayerList(){
    return <React.Fragment>
      {playerList.map(player => {
        return <Player key={player.id} player={player}/>
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
        duration: 7,
        userName: "user"
      });
    }}/>
    <Button title={"End game"} onPress={()=>{
      finishGame();
    }}/>
    <Button title={"Next page"} onPress={()=>{
      navigation.navigate('end')
    }}/>
    {gameInfo?renderGameInfo():null}
    {playerList?renderPlayerList():null}
  </View>
}

export default GamePage;