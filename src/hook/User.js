import React, { useContext } from 'react';
import { UserContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const USER_INFO_KEY = "@userInfo"

export default function useUser(){
  const [ userState, setUserState ] = useContext(UserContext);

  async function loadUserInfo(){
    const userInfo = await AsyncStorage.getItem(USER_INFO_KEY)
    if(userInfo!==null){
      setUserState(userInfo)
    }
  }

  async function changeUserName(userName){
    const stringfiedInfo = JSON.stringify({
      ...userState.userInfo,
      userName,
    })
    return AsyncStorage.setItem(USER_INFO_KEY, stringfiedInfo)
  }

  async function storeUserInfo(userInfo){
    const stringfiedInfo = JSON.stringify({
      ...userState.userInfo,
      ...userInfo,
    })
    return AsyncStorage.setItem(USER_INFO_KEY, stringfiedInfo)
  }

  return {
    userInfo: userState.userInfo,
    loadUserInfo,
    changeUserName,
    storeUserInfo,
  }
}