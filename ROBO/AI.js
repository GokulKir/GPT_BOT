import { StyleSheet, Text, View, TouchableOpacity, Image, useWindowDimensions, NativeEventEmitter, LogBox, ImageBackground, TextInput, } from 'react-native'
import React, { useState, useEffect } from 'react'
import Voice from '@react-native-community/voice';
import { ScrollView } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import axios from "axios";
import { Modal, Portal, Button, Provider , Snackbar } from 'react-native-paper';
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










export default function AI(props) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};


//   const route = useRoute()
// /

//    useEffect(()=>{
    
//     if (props.route.params) {

//       const {StopT} = props.route.params
//        console.log("8888888",props.route.params);
      
//     }

    
//    },[props])



 const StopRecording = () => {
  Tts.addEventListener
  Voice.destroy()
  Tts.stop()
  
}

const NetworkError = () =>{


}



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
    // Voice.onSpeechRecognized((res)=>console.log(res))

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

  /**
   * Gokul code
   */
  function stop() {
    Tts.stop();
    Voice.destroy() 
    setSecondS(false)

  }

  const Return = () =>{ 

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
    // console.log(IsTriger,'text to speech');
    // if(IsTriger){

    Tts.addEventListener('tts-finish', () => {
      triggerGenerate(false)
      console.log('Speech finished')
    });
    Tts.speak(data, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.9,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },

    }


    )
    //  }
  }



  const triggerGenerate = (data) => {
    setIsTriger(data)
    if (!data) {
      Responcenavigate(false)

    }
  }
  const initialSetResult = () => {
    setResult("")
  }
  const assistanceTrigger = (data) => {
    setAssistanc(data)
  }


  useEffect(() => {

    console.log(result, result === "Alexa" || result === "hi Alexa" || result === "hey Alexa", "******hey Alexa*****");
    // if (result === "Dana" || result === "hi Dana" || result === "hey Dana" || result == "hi Dyna" || result === "hi Diana"  ) {

    if ((result === "Alexa" || result === "hi Alexa" || result === "hey Alexa" || result.includes("Alexa")) && !assestant ) {
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



  const VoiceController = (data) => {
    setIsTriger(data)

  }

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
            Authorization: "Bearer "
          },
          data: {
            messages: [{ role: "user", content: FilterData }],
            model: "gpt-3.5-turbo"
          }
        })
          .then((res) => {
            console.log(res.data);
            console.log(res.data?.choices[0].message?.content);
        
            Responcenavigate(true);
        
            setIsSpeak(res.data?.choices[0].message?.content.trim());
            TextToSpeech(res.data?.choices[0].message?.content);
          })
          .catch((error) => {
            console.error(error);
            console.log(error.message);
           showModal()
          });
        
      }
    }
  }, [result])
/**
 * The DistroySpeech function is used to distroy the text to speech and it will navigate to home screen
 */
   const DistroySpeech = () => {
    Tts.addEventListener
    // Voice.destroy()
    Tts.stop()
    Responcenavigate(false)
    startRecording()
    setResult("")
  }


  const Dimention = useWindowDimensions();




  useEffect(() => {

  })


  return (
    <View style={styles.container}>




     {!secondS? <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'space-between' }}>



<View style={{top:40}}>
     {visible == true ?  
     
     <View style={{width : responsiveWidth(50) , height:responsiveHeight(70) , backgroundColor:'#000' , elevation:3  , borderRadius:40 , borderWidth:1 , borderColor:'#DDD'}}>
     <Provider >


<Button style={{marginTop: 30}} onPress={showModal}>
 Show
</Button>
</Provider> 

</View>

: 
<ImageBackground style={{ height: responsiveWidth(30), width: responsiveWidth(30) }} imageStyle={{ borderRadius: 200, flex: 1 }} source={{ uri: "https://i.pinimg.com/originals/fd/9f/6d/fd9f6dfa7872b4fa35a44d218cc77823.gif" }}>

</ImageBackground>


    
    }

         


          <View style={{ alignItems: 'center', flex: 1 }}>

            {/* <View style={{ width: 244, height: 244, backgroundColor: '#000', alignItems: 'center' }}>

              <Text style={{ color: '#fff', fontSize: 25, fontWeight: '200' }}>{result}</Text>

            </View> */}

              
            <View style={{ alignItems: 'center', }}>

            {visible === true  ?  
               
               null

              :  <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '300' }}>{result}</Text>

            }

              {assestant ?

                (result.length > 0 ? null : <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '300' }} >Listening....</Text>)

                : <TextAnimationFadeIn style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '300' }} value={"Call Me Alexa"} delay={100} duration={1000} />
              }



            </View>
           
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
    <AnswerAI Data = {IsSpeak} stop = {DistroySpeech} />  
    
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