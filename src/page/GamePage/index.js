import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import useGame from "../../hook/Game";
import * as Location from 'expo-location';

function Player({player}){

  return <React.Fragment>
    <Text>
      {player.uid||"No name"}
    </Text>
    <Text>
      Distance: {player.distance|| 0}
    </Text>
  </React.Fragment>
}

 
function GamePage({ navigation }){
  const { uid, gameInfo, startGame, finishGame, updateUserDistance } = useGame();
  const [ playerList, setPlayerList] = useState([]);
  const [ distance, setDistance ] = useState(0);
  const [ loading, setLoading] = useState(false);
  
  async function requestUpdateDistance(){
    setLoading(true);
    await updateUserDistance({uid, distance});
    setLoading(false);
  }

  useEffect(()=>{
    if(!loading){
      console.log("requestUpdateDistance");
      requestUpdateDistance();
    }
  }, [distance])
  
  useEffect(() => {
    if(gameInfo&&gameInfo.gameData){
      setPlayerList([...Object.keys(gameInfo.gameData).map(uid=>{
        return {
          ...gameInfo.gameData[uid],
          uid,
        }
      })])
      if(gameInfo.status==="start"){
        setDistance(100);
      }
    }else{
      setPlayerList([])
    }
  }, [gameInfo])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 10,
       },
      (loc) => {
        if(gameInfo&&gameInfo.status==="start"){
          console.log("update distance")
          const movedDistance = distance+10;
          setDistance(movedDistance)
        }
      }
    );
    })();
  }, []);

  function renderGameInfo(){
    return <React.Fragment>
      <Text>{gameInfo.status}</Text>
      <Text>uid: {uid}</Text>
      <Text>distance: {distance}</Text>
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
    {!gameInfo?
      <Button title={"Start game"} onPress={()=>{
        startGame({
          duration: 3,
          userName: "user"
        });
        setDistance(0);
      }}/>:
      <Button title={"End game"} onPress={()=>{
        finishGame();
      }}/>
    }
    <Button title={"Next page"} onPress={()=>{
      navigation.navigate('end')
    }}/>
    {gameInfo?renderGameInfo():null}
    {playerList?renderPlayerList():null}
  </View>
}

export default GamePage;