import moment from "moment";
import { useContext } from 'react';
import { GameContext } from '../context';
import { searchGame, updateGameState, requestCreateGame, subscribeOnUpdateGame, requestCreatePlayer } from "../utils";

const MATCHING_WAITING_TIME = 10 * 1000; // 1 min

export default function useGame(){
  const [ gameState, setGameState ] = useContext(GameContext);

  async function startGame({ duration }){
    let myGame;
    let isHost = false;
    const availableGames = await searchGame({ duration })
    
    if(availableGames.length> 0){
      myGame = availableGames[0]
      
    }else{
      myGame = await requestCreateGame({duration})
      isHost = true;
    }

    // Start Subscribe game
    const gameSubscription = await subscribeOnUpdateGame({
      gameId: myGame.id,
      hook: (gameInfo)=>{
        console.log(gameInfo);
      }
    })

    const createdPlayer = await requestCreatePlayer({
      gameId: myGame.id,
      name: "newUesr"
    })
    console.log(createdPlayer);
    setGameState((prev) => ({
      ...prev,
      gameInfo: myGame,
      gameSubscription,
    }))

    if(isHost){
      // Reserve start game;
      setTimeout(()=>{
        const newGameInfo = {
          id:myGame.id,
          status: "start"
        }
        updateGameState({
          gameInfo: newGameInfo
        })
      }, MATCHING_WAITING_TIME)
    }
    
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
  }

  return {
    gameInfo: gameState.gameInfo,
    playerInfoArray: gameState.playerInfoArray,
    startGame,
    finishGame,
  }
}