import { StyleSheet, Text, View, TouchableOpacity, Image, useWindowDimensions, NativeEventEmitter, LogBox, ImageBackground, TextInput,Button } from 'react-native'
import React, { useState, useEffect,useCallback } from 'react'
import Voice from '@react-native-community/voice';
import { ScrollView } from 'react-native-gesture-handler';
import SystemSetting from 'react-native-system-setting';
import Tts from 'react-native-tts';
import axios from "axios";

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { TextAnimationFadeIn, TextAnimationZoom, TextAnimationRain, TextAnimationSlideDown, TextAnimationSlideUp, TextAnimationSlideLeft, TextAnimationSlideRight, TextAnimationShake, TextAnimationReverse, TextAnimationDeZoom } from 'react-native-text-effects';
import { useNavigation, useRoute } from '@react-navigation/native';
import AnswerAI from './AnswerAI';
import useDeviceVolume from './customhook/useDeviceVolume'





export default function AI(props) {



//   const route = useRoute()
// /

//    useEffect(()=>{
    
//     if (props.route.params) {

//       const {StopT} = props.route.params
//        console.log("8888888",props.route.params);
      
//     }

    
//    },[props])
   


  LogBox.ignoreLogs(['new NativeEventEmitter']);  // Ignore log notification by message
  LogBox.ignoreAllLogs();  // Ignore all log notifications

  const { width, height } = useWindowDimensions()
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [recognized, setRecognized] = useState('');
  const [message, setMessage] = useState([]);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState()
  const [IsRecording, setIsRecording] = useState('')
  const [IsSpeak, setIsSpeak] = useState('')
  const [IsTriger, setIsTriger] = useState(false)
  const [assestant, setAssistanc] = useState(false)
  const [subTrigger, setSubtrigger] = useState(false)
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("The output message");
  const [IsOrNot, setIsOrNot] = useState(false)
  const [StartT, setStartT] = useState(false)
  const [WelcomSp, setWelcomSp] = useState('')
  const [secondS, setSecondS] = useState(false)
  const [startTime, setstartTime] = useState(new Date())
  const { volume, increaseFullDeviceVolume,decreaseFullDeviceVolume  } = useDeviceVolume();


  const setRecodingResult = (data) => {

    setResult(data)
  }


  Voice.onSpeechEnd = () => setIsRecording(false)
  Voice.onSpeechError = err => setError(err.error)
  Voice.onSpeechResults = (result) => setRecodingResult(result.value[0])


  // const handleTextInputMessage = (text) => {
  //   console.log(text);
  //   setInputMessage(text);
  // };


  // useEffect(()=>{
  //   setInterval(() => {
  //     setStartT(true)

  //   }, 2500);
  // })


  // Start recording //

  const startRecording = async () => {
    decreaseFullDeviceVolume()
    // Voice.onSpeechRecognized((res)=>console.log(res))
    console.log('====================================');
    console.log('Recoding voice',IsTriger);
    console.log('====================================');
    await Voice.start('en-US');



  };



  // Start recording //


  //Stop recording //


  const stopRecording = async () => {
    // console.log("stpo recoding*****");
    setStarted(false)
    setLoading(false)
    setIsOrNot(true)
    await Voice.stop()

  }

  function stop() {
    Tts.stop();
  }

  //Stop recording //



  // jestin xavier
  useEffect(() => {
    if (!IsTriger) {
      startRecording()
    }
    else {
      stopRecording()
    }
  }, [startRecording, IsTriger])




  const TextToSpeech = (data) => {
    increaseFullDeviceVolume()
    // console.log(IsTriger,'text to speech');
    // if(IsTriger){

    Tts.addEventListener('tts-finish', () => {
      console.log('Speech finished')
      triggerGenerate(false)

    });
    Tts.speak(data, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },

    }


    )
    //  }
  }


/**
 * 
 * @param {boolean} boolean 
 * this function is used to controll the trigger of the mic when it start to speaking 
 */
const triggerGenerate = useCallback(
  (data) => {
    setIsTriger(data)
    if (!data) {
      Responcenavigate(false)
    }
  },
  [setIsTriger],
)

const initialSetResult = useCallback(
  () => {
    setResult("")
  },
  [setResult],
)



const assistanceTrigger = useCallback(
  (data) => {
    setAssistanc(data)
  },
  [setAssistanc],
)


 


  useEffect(() => {

    console.log(result, result === "Alexa" || result === "hi Alexa" || result === "hey Alexa", "******hey dana*****");
    // if (result === "Dana" || result === "hi Dana" || result === "hey Dana" || result == "hi Dyna" || result === "hi Diana"  ) {

    if ((result === "Alexa" || result === "hi Alexa" || result === "hey Alexa" || result.includes("Alexa")) && !assestant) {
      triggerGenerate(true)
      initialSetResult()
      TextToSpeech("HI i am Alexa from Devlacus")
      assistanceTrigger(true)
    }

    const timeDifference = new Date() - startTime;

    if (timeDifference > 15000 && result.length < 0 && assestant) {
      assistanceTrigger(true)
    }


  }, [result])




  const Responcenavigate = (data) => {

    setSecondS(data)

  }

  useEffect(() => {
    console.log(secondS)
  }, [secondS])




  useEffect(() => {
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    if (result.length > 0) {
      // VoiceController(true)
      let FilterData = result.replace(/alexa/gi, "");
      if (!IsTriger && assestant) {
        axios({
          method: "post",
          url: "https://api.openai.com/v1/chat/completions",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer sk-"
          },
          data: {
            messages: [{ role: "user", content: FilterData }],
            model: "gpt-3.5-turbo"
          }
        })
          .then((res) => {
            console.log(res.data);
            const message = res.data?.choices[0]?.message?.content;
            console.log(message);
        
            setIsSpeak(message?.trim());
            increaseFullDeviceVolume();
            TextToSpeech(message);
            
            Responcenavigate(true);
            triggerGenerate(true);
          })
          .catch((error) => {
            console.error(error);
          });      
      }
      
    }
  }, [result])




  const Dimention = useWindowDimensions();



  useEffect(() => {

  })


  return (
    <View style={styles.container}>




     {!secondS? <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'space-between' }}>




        <View style={{ top: 40, alignItems: 'center' }}>



          <ImageBackground style={{ height: responsiveWidth(30), width: responsiveWidth(30) }} imageStyle={{ borderRadius: 200, flex: 1 }} source={{ uri: "https://i.pinimg.com/originals/fd/9f/6d/fd9f6dfa7872b4fa35a44d218cc77823.gif" }}>

          </ImageBackground>



          <View style={{ alignItems: 'center', flex: 1 }}>

            {/* <View style={{ width: 244, height: 244, backgroundColor: '#000', alignItems: 'center' }}>

              <Text style={{ color: '#fff', fontSize: 25, fontWeight: '200' }}>{result}</Text>

            </View> */}


            <View style={{ alignItems: 'center', }}>
              <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '300' }}>{result}</Text>

              {assestant ?

                (result.length > 0 ? null : <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '300' }} >Listening....</Text>)

                : <TextAnimationFadeIn style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '300' }} value={"Call Me Alexa"} delay={100} duration={1000} />
              }



            </View>


          </View>

          <View>
      <Text>Device Volume: {Math.round(volume * 100)}</Text>
      <Button title="Decrease Volume" onPress={decreaseFullDeviceVolume} />
      <Button title="Increase Volume" onPress={increaseFullDeviceVolume} />
    </View>
        </View>





        <TouchableOpacity onPress={() => startRecording()} style={styles.floatingButton}>
          <View style={styles.buttonContainer}>
            {result == false ?



              <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 200, elevation: 4, }} source={{ uri: 'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-66994.jpg' }}>

                <Image style={{ width: responsiveWidth(2), height: responsiveWidth(2) }} source={require('../assets/Mic.png')} />

              </ImageBackground>



              :

              // <TouchableOpacity style={{alignItems:'center' , justifyContent:'center'}} onPress={() => stop()}>

              //   <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 200, elevation: 4, }} source={require('../assets/But.png')}>


              //   </ImageBackground>
              // </TouchableOpacity>
              <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: "#19ecf7", borderRadius: 200 }} imageStyle={{ borderRadius: 200, elevation: 4, }} source={{ uri: 'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-66994.jpg' }}>

                <Image style={{ width: responsiveWidth(2), height: responsiveWidth(2) }} source={require('../assets/Mic.png')} />

              </ImageBackground>
            }
          </View>

        </TouchableOpacity>

      </View>
    :
    <AnswerAI Data = {IsSpeak} />  
    
    }




    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',

  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: 30,
    backgroundColor: '#5a40ad',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // for android shadow effect
    shadowColor: '#000', // for ios shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 200
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },


})