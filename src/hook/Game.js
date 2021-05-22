import { useContext } from 'react';
import { UserContext } from '../context';

const USER_INFO_KEY = "@userInfo"

const useUser = () => {
  const [ userState, setUserState ] = useContext(UserContext);

  async function loadUserInfo(){
    const userInfo = await AsyncStorage.getItem(USER_INFO_KEY)
    if(userInfo!==null){
      setUserState(userInfo)
    }
  }

  async function changeUserName(userName){
    const stringfiedInfo = JSON.stringify({
      ...userState,
      userName,
    })
    AsyncStorage.setItem(USER_INFO_KEY, stringfiedInfo)
  }

  async function storeUserInfo(userInfo){
    const stringfiedInfo = JSON.stringify({
      ...userState,
      ...userInfo,
    })
    AsyncStorage.setItem(USER_INFO_KEY, userName)
  }

  return {
    loadUserInfo,
    changeUserName,
    storeUserInfo,
  }
}

export default useUser;