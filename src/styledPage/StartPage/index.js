import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, TouchableOpacity } from 'react-native';
import useUser from "../../hook/User"
import fontPixel from "../../font/Pixeled.ttf"

const styles = StyleSheet.create({
  inputbox: {
    position: "absolute",
    left: 61,
    top: 40,
  },
  inputImage: {
    height: 43,
    width: 175,
  },
  inputText: {
    textAlign: "center",
    textAlignVertical: 'center',
    paddingTop: 5,
    fontSize: 20,
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    position: "absolute",
    width: 78.28,
    height: 70,
    left: 268,
    top: 120,
  },
  tinyLogo2: {
    position: "absolute",
    width: 78.28,
    height: 70,
    left: 268,
    top: 205,
  },
  tinyCaption: {
    position: "absolute",
    width: 56,
    height: 22,
    left: 358,
    top: 140,
  },
  tinyCaption2: {
    position: "absolute",
    width: 56,
    height: 10,
    left: 358,
    top: 230,
  },
  tinyBelow: {
    position: "absolute",
    width: 146,
    height: 38,
    left: 79,
    top: 290,
  },
  tinyBelow2:{
    position: "absolute",
    width: 146,
    height: 38,
    left: 249,
    top: 290,
  },
  logo: {
    width: 66,
    height: 58,
  },
  character: {
    position: "absolute",
    width: 290,
    height: 290,
    left: -20,
    top: 43,
  },
  runbg: {
    position: "absolute",
    left: 430,
    top: 60,
  },
  runbgBox: {
    width: 371*3/4,
    height: 324*3/4,
  },
  runBtnBoxBox: {
    position: "absolute",
    left: 50,
    top: 120,
    zIndex: 1,
  },
  runBtnBox: {
    width: 180,
    height: 90,
  },
  runTimeBox: {
    position: "absolute",
    left: 22,
    top: 40,
    zIndex: 1,
  },
  timeSetting: {
    textAlign: 'center',
    textAlignVertical: 'center',
    position: "absolute",
    width: 197,
    height: 58,
    fontSize: 52,
    lineHeight: 42,
    color: "#FFF5DB",
  },
  plus: {
    position: "absolute",
    width: 42,
    height: 28,
    left: 200,
    top: 30,
    zIndex: 2,
  },
  minus: {
    position: "absolute",
    width: 42,
    height: 28,
    left: 200,
    top: 65,
    zIndex: 2,
  },
  plusMinusBox: {
    width: 42,
    height: 28,
  },
});

function StartPage({ navigation }){
  const [text, onChangeText] = useState();
  const [time, setTime] = useState(5);
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const {changeTime, loadUserInfo, changeUserName, storeUserInfo } = useUser();
  
  useEffect(() => {   
    let userState = loadUserInfo();
    userState.then((value) => {
      onChangeText(value.username);
      setTime(value.time);
    })
    setText(text);
    timeShow(time);
  }, [])

  function setText(text){
    onChangeText(text);
    changeUserName(text);
  }

  async function plustime() {
    if (time<300){
      timeShow(time+5);
  }
  }
  async function minustime(){
    if (time>5){
      timeShow(time-5);
    }
  }
  async function timeShow(timeArg){
    setTime(timeArg);
    changeTime(timeArg);
    let min = parseInt(timeArg/60);
    let sec = timeArg%60;
    let minStr = "0" + min.toString();
    let secStr = sec.toString();
    if (secStr.length == 1) {secStr= "0"+secStr;}
    setMinute(minStr);
    setSecond(secStr);
    console.log(time, minStr,secStr);
  }


  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#FFF5DB"}}>
    
    <Image
        style={styles.tinyLogo}
        source={require('../../image/player_c.png')}
      />
    <Image
        style={styles.tinyLogo2}
        source={require('../../image/zombi_c.png')}
      />
    <Image
        style={styles.tinyCaption}
        source={require('../../image/now.png')}
      />
    <Image
        style={styles.tinyCaption2}
        source={require('../../image/catched.png')}
      />

    <Image
        style={styles.tinyBelow}
        source={require('../../image/ate.png')}
      />
    <Image
        style={styles.tinyBelow2}
        source={require('../../image/survived.png')}
      />    
    
    <Image
        style={styles.character}
        source={require('../../image/character.gif')}
      />
    
    <View style={styles.inputbox}>
      <ImageBackground source={require("../../image/nickname_w.png")} style={styles.inputImage}>
        <TextInput placeholder="Nickname" name="name" value={text} style={styles.inputText}
                onChangeText={text => setText(text)} ></TextInput>
      </ImageBackground>
    </View>
    <View style={styles.runbg}>
      <ImageBackground source={require("../../image/green_b.png")} style={styles.runbgBox}>
        <View style={styles.plus}>
          <TouchableOpacity onPress={()=>{plustime()}} >
            <ImageBackground source={require('../../image/plus.png')} style={styles.plusMinusBox}/>
          </TouchableOpacity>
        </View>
        <View style={styles.minus}>
          <TouchableOpacity onPress={()=>{minustime()}} >
            <ImageBackground source={require('../../image/minus.png')} style={styles.plusMinusBox}/>
          </TouchableOpacity>
        </View>
        <View style={styles.runTimeBox}> 
          <Text style={styles.timeSetting}>{minute}:{second}</Text>
        </View>
        <View style={styles.runBtnBoxBox}>
          <TouchableOpacity onPress={()=>{navigation.navigate('game') }} >
            <ImageBackground source={require("../../image/run.png")} style={styles.runBtnBox} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    
  </View>
}

export default StartPage;