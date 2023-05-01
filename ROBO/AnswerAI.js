import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useEffect , useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import {TextAnimationFadeIn, TextAnimationZoom, TextAnimationRain, TextAnimationSlideDown, TextAnimationSlideUp, TextAnimationSlideLeft, TextAnimationSlideRight, TextAnimationShake, TextAnimationReverse, TextAnimationDeZoom} from 'react-native-text-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AnimatedText from './AnimatedText'

export default function AnswerAI({Data}) {

let data = Data;
// const [StopT , setStopT] = useState(null) 
// const navigation = useNavigation()
// useEffect(() => {
//    setStopT(true)

//   return () => {
// setStopT(false)  
// }
// }, [])
//   const StoppingF = () =>{ 

    
//     navigation.navigate("AI",{StopT})
//   }
//     const route = useRoute()
    const Dimention = useWindowDimensions() ;
//     const {data  } = route.params  




   
  
    const Ipsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, , letterSpacing: 3, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  return (
    <View style={styles.container}>

{/* <View style={{width:Dimention.width , height : Dimention.height / 12   , justifyContent:'flex-start'}}> */}

{/* <TouchableOpacity onPress={StoppingF} style={{top:8 , left:18 , width:40 , height : 40 , alignItems:'center' , justifyContent:'center' , borderRadius:200}}>

<Icon name="arrow-back-ios" size={29}  color="#fff"/>

</TouchableOpacity> */}

{/* </View> */}
<View style={{flex:1,}}>
    <View style={{alignItems:'center',justifyContent:'center'}}>
    <AnimatedText text ={data}/>

    </View>

        <ScrollView>
            <View style={{width:Dimention.width  , backgroundColor:'#000' , alignItems:'center' ,}}>

                <View style={{width:Dimention.width  - 40, height : Dimention.height /2.5 , backgroundColor:'#000' , top:20}}>
                </View>



            </View>

        </ScrollView>
        </View>

        <View style={{width: Dimention.width , height : Dimention.height /2 , backgroundColor:'#000'}}>


            <View style={{alignItems:'center' , justifyContent:'center' , }}>
                <Image style={{width:"100%" , height:"100%" , top:-10}} source={require('../assets/SoundL.gif')}/>
            </View>

        </View>
   </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        backgroundColor:'#000' , 
        justifyContent:'space-evenly'
    }
})