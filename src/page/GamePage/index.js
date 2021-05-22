import moment from "moment";
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
      Speed: {player.speed|| 0}
    </Text>
    <Text>
      Distance: {player.distance|| 0}
    </Text>
  </React.Fragment>
}

 
function GamePage({ navigation }){
  const { uid, gameInfo, startGame, finishGame, updateAgentsPosition } = useGame();
  const [ playerList, setPlayerList] = useState([]);
  
  const [ velocity, setVelocity ] = useState(1);
  const [ distance, setDistance ] = useState(0);
  const [ stepTime, setStepTime ] = useState(new Date());

  function updatePosition(){
    // Update all agents position
    if(!gameInfo || gameInfo.status!=="start"){
      return 
    }
    const currentPlayers = [...Object.keys(gameInfo.gameData).map(uid=>{
      return {
        ...gameInfo.gameData[uid],
        uid,
      }
    })]
    const updatedData = {
      [uid]: {
        ...gameInfo.gameData[uid],
        speed: velocity,
        distance: gameInfo.gameData[uid].distance+velocity*2,
      },
    }
    currentPlayers.forEach(player=>{
      if(player.uid!==uid){
        const prevDistance = player.distance;
        updatedData[player.uid]={
          ...gameInfo.gameData[player.uid],
          speed: player.speed,
          distance: prevDistance + player.speed*0.5,
        }
      }
    })
    updateAgentsPosition({
      updatedData
    })

  }
  
  useEffect(() => {
    const updateDistance = setInterval(()=>{
      updatePosition();
    }, 500);
    if(gameInfo&&gameInfo.gameData){
      setPlayerList([...Object.keys(gameInfo.gameData).map(uid=>{
        return {
          ...gameInfo.gameData[uid],
          uid,
        }
      })])
    }
    return ()=>{
      clearInterval(updateDistance)
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
          const movedDistance = distance+10;
          setDistance(movedDistance)
          if(!time){
            setStepTime(moment())
          }else{
            const timeDiff = moment() - stepTime;
            setVelocity(movedDistance/timeDiff);
          }
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
      <Text>velocity: {velocity}</Text>
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
          userName: "user",
          userSpeed: 1,
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