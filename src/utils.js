import { API, graphqlOperation } from 'aws-amplify';
import { createGame, updateGame, createPlayer } from "./graphql/mutations"
import { listGames } from "./graphql/queries"
import { onUpdateGame } from "./graphql/subscriptions";
import moment from "moment";


async function searchGame({
  duration
}){
  let filter = {
    duration: {
      eq: duration
    },
    status: {
      eq: "waiting" 
    }
  };
  const res = await API.graphql({
    query: listGames,
    variables: {
      filter
    }
  })
  return res.data.listGames.items;
}

async function updateGameState({
  gameInfo
}){
  const res = await API.graphql({
    query: updateGame,
    variables: {
      input: gameInfo
    }
  }
  )
  return res.data.updateGame;
}


async function requestCreateGame({
  duration = 5,
}){
  const createTime = `${moment().format("YYYY-MM-DDThh:mm:ss.SSS")}Z`;
  console.log(createTime)
  const createdGame = await API.graphql(graphqlOperation(createGame, {
    input: {
        status: "waiting",
        duration,
        createTime,
    }
  }))
  return createdGame.data.createGame
}

async function requestStartGame({
  gameId,
  duration = 5,
}){
  const startTime = moment();
  const endTime = startTime.add(duration, "m");
  return API.graphql(graphqlOperation(updateGame, {
    input: {
        id: gameId,
        status: "start",
        startTime: startTime.format("YYYY-MM-DDThh:mm:ss.sssZ"),
        endTime: endTime.format("YYYY-MM-DDThh:mm:ss.sssZ"),
    }
  }))
}

async function subscribeOnUpdateGame({ gameId, hook }){
  return API.graphql(
    graphqlOperation(onUpdateGame), {
      id: gameId
    }
  ).subscribe({
    next: ({provider, value}) => {
      console.log("data", value.data.onUpdateGame);
      // hook(value.data.onUpdateGame)
    },
    error: error=> console.warn(error)
  })
}

async function requestCreatePlayer({
  gameId,
  name,
}){
  console.log("requestCreatePlayer", gameId);
  const createdPlayer = await API.graphql(graphqlOperation(createPlayer, {
    input: {
      name,
      distance: 0,
      playerGameId: gameId,
    }
  }))
  return createdPlayer.data.createPlayer
}

async function requestUpdatePlayer({
  playerId,
  distance
}){
  return API.graphql(graphqlOperation(updatePlayer, {
    input: {
      id: playerId,
      distance: distance,
    }
  }))
}


module.exports = {
  searchGame,
  updateGameState,
  requestCreateGame,
  requestStartGame,
  subscribeOnUpdateGame,
  requestCreatePlayer,
  requestUpdatePlayer,
}