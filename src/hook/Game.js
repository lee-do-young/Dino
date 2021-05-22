import uuid from 'react-native-uuid';
import moment from "moment";
import { useContext } from 'react';
import { GameContext } from '../context';
import { searchGame, updateGameState, requestCreateGame, subscribeOnUpdateGame } from "../utils";

const MATCHING_WAITING_TIME = 10 * 1000; // 1 min
const MAX_PEOPLE_IN_GAME = 3;

export default function useGame(){
  const [ gameState, setGameState ] = useContext(GameContext);

  async function startGame({ duration, userName }){
    if(gameState.gameSubscription){
      gameState.gameSubscription.unsubscribe();
    }
    if(gameState.playerSubscriptionArray){
      gameState.playerSubscriptionArray.forEach(subs=>{
        subs.unsubscribe();
      })
    }
    let myGame;
    let isHost = false;
    const uid = uuid.v4();
    const availableGames = await searchGame({ duration })
    console.log(availableGames.length);
    if(availableGames.length> 0){
      myGame = availableGames[0]
      const gameData = JSON.parse(availableGames[0].gameData);
      const gameInfo = {
        id:availableGames[0].id,
        gameData: JSON.stringify({
          ...gameData,
          [uid]: {
            name: userName,
            distance: 0,
          }
        }),
      }
      if(Object.keys(gameData).length + 1 >= MAX_PEOPLE_IN_GAME){
        const startTime = moment();
        const endTime = startTime.add(duration, "m");
        gameInfo["status"] = "start"
        gameInfo["startTime"] = `${startTime.format("YYYY-MM-DDThh:mm:ss.SSS")}Z`
        gameInfo["endTime"] = `${endTime.format("YYYY-MM-DDThh:mm:ss.SSS")}Z`
      }
      myGame = await updateGameState({
        gameInfo: gameInfo
      })
    }else{
      myGame = await requestCreateGame({duration, gameData: {
        [uid]: {
          name: userName,
          distance: 0,
        }
      }})
      isHost = true;
    }
    let timeoutCleared = false;
    let timeoutStart;
    let endTimeStop;
    if(isHost){
      // Reserve start game;
      timeoutStart = setTimeout(()=>{
        const startTime = moment();
        const endTime = startTime.add(duration, "m");
        const newGameInfo = {
          id:myGame.id,
          status: "start",
          startTime: `${startTime.format("YYYY-MM-DDThh:mm:ss.SSS")}Z`,
          endTime: `${endTime.format("YYYY-MM-DDThh:mm:ss.SSS")}Z`,
        }
        updateGameState({
          gameInfo: newGameInfo
        })
        endTimeStop = setTimeout(() => {
          const newGameInfo = {
            id:myGame.id,
            status: "finished",
          }
          updateGameState({
            gameInfo: newGameInfo
          })
        }, duration*60*1000)
      }, MATCHING_WAITING_TIME)
    }

    // Start Subscribe game
    const gameSubscription = subscribeOnUpdateGame({
      gameId: myGame.id,
      hook: (gameInfo)=>{
        const parsedGameInfo = {...gameInfo, gameData: JSON.parse(gameInfo.gameData)}
        if(isHost && parsedGameInfo.status==="start"){
          if(!Number.isInteger(timeoutStart)){
            timeoutStart.unsubscribe();
          }
          if(!endTimeStop){
            endTimeStop = setTimeout(() => {
              const newGameInfo = {
                id:myGame.id,
                status: "finished",
              }
              updateGameState({
                gameInfo: newGameInfo
              })
            }, duration*60*500)
          }
        }
        setGameState(prev=>({
          ...prev,
          gameInfo: parsedGameInfo,
        }))
      }
    })

    setGameState((prev) => ({
      ...prev,
      gameInfo: {...myGame, gameData: JSON.parse(myGame.gameData)},
      gameSubscription,
      uid,
    }))
  }

  async function finishGame(){
    if(gameState.gameSubscription){
      gameState.gameSubscription.unsubscribe();
    }
    if(gameState.playerSubscriptionArray){
      gameState.playerSubscriptionArray.forEach(subs=>{
        subs.unsubscribe();
      })
    }
    setGameState(prev=>({
      gameInfo: null,
      gameSubscription: null,
      playerSubscriptionArray: [],
      playerInfoArray: [],
    }))
  }

  return {
    uid: gameState.uid,
    gameInfo: gameState.gameInfo,
    startGame,
    finishGame,
  }
}