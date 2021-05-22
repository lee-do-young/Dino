import { API, graphqlOperation } from 'aws-amplify';
import { createGame, updateGame } from "./graphql/mutations"
import moment from "moment";

async function requestCreateGame({
  durationTime = 5
}){
  const createTime = moment()
  const res = await API.graphql(graphqlOperation(createGame, {
    input: {
        createTime: createTime.valueOf(),
        status: "waiting",
        duration: durationTime
    }
  }))
  console.log(res);
}

async function requestStartGame({
  gameId,
  durationTime = 5
}){
  const startTime = moment()
  const endTime = startTime.add(5, "m");
  const res = await API.graphql(graphqlOperation(updateGame, {
    input: {
        id: gameId,
        startTime: startTime.valueOf(),
        endTime: endTime.valueOf(),
        status: "start"
    }
  }))
  console.log(res);
}

async function subscribeGame({
  gameId
}){

}

module.exports = {
  requestCreateGame,
  requestStartGame,
  subscribeGame,
}