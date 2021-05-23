import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

function TutorialPage({ navigation }){

  const styles = StyleSheet.create({
    container: {
    }
  });

  const [ images, setImages ] = useState([]);
  useEffect(() => {  
    const imageList = [
      require('../../image/intro1.png'), 
      require('../../image/intro2.png'),
      require('../../image/intro3.jpeg'),
    ]
    setImages(imageList)
  }, [])

  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <SliderBox
      images={images} styles={styles.container}
      sliderBoxHeight={360}
      parentWidth={780}
      onCurrentImagePressed={() => {navigation.navigate('start')}}
    />
    {/* <Button title="Done" onPress={()=>{
      navigation.navigate('start')
    }}/> */}
    
  </View>
}

export default TutorialPage;