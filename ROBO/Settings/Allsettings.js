import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Slider from "react-native-slider";
import SystemSetting from 'react-native-system-setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDeviceVolume from '../customhook/useDeviceVolume';
import firestore from '@react-native-firebase/firestore';

export default function Allsettings() {
  const {increaseFullDeviceVolume , handleVolumeChange} = useDeviceVolume()

    const [volume , setVolume] = useState()
    const [value , setValue] = useState()

 

  useEffect(()=> {

    console.log("Vol",volume);
    firestore()
  .collection('Sound')
  .doc("DEVBOTSOUND")
  .get()
  .then(documentSnapshot => {
    console.log('User exists: ', documentSnapshot.exists);

    if (documentSnapshot.exists) {
      console.log('User data: ', documentSnapshot.data());
      const { Voice } = documentSnapshot.data();
      console.log(Voice); // 0.56

      setVolume(Voice)
     
     
      console.log(volume);
  

    }
 
  });
  })

    

    return (
        <View style={styles.container}>
                 
                 <View style={{alignItems:'center' }}>

            <View style={{width:responsiveWidth(100) , height : responsiveHeight(15) , backgroundColor:'#0e010f' , flexDirection:'row' ,  top:responsiveHeight(4) }}>

            <Icon style={{left:responsiveWidth(4)}} name="sound" color="#fff" size={25} />

                <Text style={{color : '#fff' , fontSize:20 , fontWeight:'300' , left:responsiveWidth(6) ,  top:responsiveHeight(-0.1) }}>Volume settings</Text>

            </View>

            </View>

            <View style={{ flex: 1 , alignItems:'center' ,  }}>


        <View style={{width : responsiveWidth(98) , height : responsiveHeight(19) , backgroundColor:'#0e010f' , marginTop : 10 , borderRadius : 20}}>


        <Slider
        value={volume}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        onValueChange={handleVolumeChange}
      />

        

        </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0e010f"
    }
})