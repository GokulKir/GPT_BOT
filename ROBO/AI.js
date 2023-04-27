import { StyleSheet, Text, View, TouchableOpacity, Image, useWindowDimensions, NativeEventEmitter, LogBox, ImageBackground, TextInput ,  } from 'react-native'
import React, { useState, useEffect } from 'react'
import Voice from '@react-native-community/voice';
import { ScrollView } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
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
import {TextAnimationFadeIn, TextAnimationZoom, TextAnimationRain, TextAnimationSlideDown, TextAnimationSlideUp, TextAnimationSlideLeft, TextAnimationSlideRight, TextAnimationShake, TextAnimationReverse, TextAnimationDeZoom} from 'react-native-text-effects';

export default function AI() {

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
  const [IsOrNot , setIsOrNot] = useState(false)
  const [StartT , setStartT] = useState(false)
  const [WelcomSp , setWelcomSp] = useState('')

  const setRecodingResult = (data)=>{
    
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

  function stop() {
    Tts.stop();
  }

    //Stop recording //

  

  // jestin xavier
  useEffect(() => {
 if(!IsTriger){
   startRecording()
 }
 else{
  stopRecording()
 }
  }, [startRecording,IsTriger])




  const TextToSpeech = (data)=>{
    // console.log(IsTriger,'text to speech');
// if(IsTriger){

Tts.addEventListener('tts-finish', () => {
  triggerGenerate(false)
  console.log('Speech finished')
} );
 Tts.speak(data, {
    androidParams: {
      KEY_PARAM_PAN: -1,
      KEY_PARAM_VOLUME: 0.3,
      KEY_PARAM_STREAM: 'STREAM_MUSIC',
    },
   
  }
  

 )
//  }
  }



const triggerGenerate =(data)=>{
  setIsTriger(data)
}
const initialSetResult = ()=>{
  setResult("")
}
const assistanceTrigger = (data) =>{
  setAssistanc(data)
}


  useEffect(() => {

    console.log(result, result === "Alexa" || result === "hi Alexa" || result === "hey Alexa", "******hey dana*****");
    // if (result === "Dana" || result === "hi Dana" || result === "hey Dana" || result == "hi Dyna" || result === "hi Diana"  ) {
   
    if ((result === "Daliya" || result === "hi Daliya" || result === "hey Daliya") && !assestant) {
      triggerGenerate(true)
      initialSetResult()
      TextToSpeech("HI i am Daliya ")
      assistanceTrigger(true)
    } 
    

  }, [result])



const VoiceController =  (data)=>{
  setIsTriger(data)
  
}



  useEffect(() => {
    console.log('====================================');
    console.log(result );
    console.log('====================================');
    if (result.length > 0 ) {
      // VoiceController(true)
      if(!IsTriger && assestant ){
        fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            // "prompt": inputMessage,
            messages: [{ role: "user", content: result }],
            // "model": "text-davinci-003",
            model: "gpt-3.5-turbo",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            console.log(data?.choices[0].message?.content);
            setIsSpeak(data?.choices[0].message?.content)
            TextToSpeech(data?.choices[0].message?.content)
            
            
            triggerGenerate(true)
            // Tts.speak(data?.choices[0].message?.content, {
            //   androidParams: {
            //     KEY_PARAM_PAN: -1,
            //     KEY_PARAM_VOLUME: 0.5,
            //     KEY_PARAM_STREAM: 'STREAM_MUSIC',
            //   },
            // });
    
          
    
          })  
          // setTimeout(function (){
          //   VoiceController(false)
          // }
          //   , 5000);
          
        }
    }
  }, [result])

  // useEffect(() => {
  //   console.log("isTrigger = ",IsTriger," trigger*****");
  //   if(voiceJSusTrigr){
  //   fetch("https://api.openai.com/v1/chat/completions", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "Bearer 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",
  //     },
  //     body: JSON.stringify({
  //       // "prompt": inputMessage,
  //       messages: [{ role: "user", content: result }],
  //       // "model": "text-davinci-003",
  //       model: "gpt-3.5-turbo",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data?.choices[0].message?.content);
  //       setIsSpeak(data?.choices[0].message?.content)
  //       TextToSpeech(data?.choices[0].message?.content)

  //       // Tts.speak(data?.choices[0].message?.content, {
  //       //   androidParams: {
  //       //     KEY_PARAM_PAN: -1,
  //       //     KEY_PARAM_VOLUME: 0.5,
  //       //     KEY_PARAM_STREAM: 'STREAM_MUSIC',
  //       //   },
  //       // });

      

  //     })  
  //     // setTimeout(function (){
  //     //   VoiceController(false)
  //     // }
  //     //   , 5000);
      
  //   }

  // }, [IsTriger])
  
  





  // const onSpeechResults = async (e) => {
  //   setRecognized(e.value[0]);
  //   console.log(e.value[0]);
  //   if (recognized === 'start conversation') {
  //     const response = await axios.post("https://api.openai.com/v1/chat/completions", {
  //       prompt: 'start conversation',
  //       max_tokens: 100,
  //       n: 1,
  //       stop: '.',
  //       temperature: 0.5,
  //     }, {
  //       headers: {
  //         'Authorization': 'Bearer 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',
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     setMessage(response.data.choices[0].text);
  //   } else if (recognized === 'send message') {
  //     const response = await axios.post("https://api.openai.com/v1/chat/completions", {
  //       prompt: 'send message',
  //       max_tokens: 100,
  //       n: 1,
  //       stop: '.',
  //       temperature: 0.5,
  //     }, {
  //       headers: {
  //         'Authorization': 'Bearer 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',
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     setMessage(response.data.choices[0].text);
  //   } else if (recognized === 'end conversation') {
  //     setMessage('Goodbye!');
  //   }
  // };

  // Voice.onSpeechResults = onSpeechResults;



  // useEffect(() => {
  //   console.log(result);
  // })



   const Dimention = useWindowDimensions() ;


   useEffect(() => {
   
   })


  return (
    <View style={styles.container}>


   
   

  <View style={{flex : 1 , backgroundColor:'#000' , alignItems:'center' , justifyContent:'space-between' }}>

    

  <View style={{top:40 , alignItems:'center'}}>

    <ImageBackground style={{height:responsiveWidth(30) , width:responsiveWidth(30)  }} imageStyle={{borderRadius:200}} source={{uri : "https://i.pinimg.com/originals/fd/9f/6d/fd9f6dfa7872b4fa35a44d218cc77823.gif"}}>

    </ImageBackground>



    <View style={{alignItems:'center' ,}}>

      <View style={{ width:244 , height:244 , backgroundColor:'#000'  , alignItems:'center'}}>

      <Text style={{color:'#fff' , fontSize:25 , fontWeight:'200'}}>{result}</Text>

      </View>


      <View style={{alignItems:'center'}}>

        {IsSpeak.length > 0 ?         <TextAnimationFadeIn style={{color:'#fff' , fontSize:responsiveFontSize(2.5), fontWeight:'300' }} value={IsSpeak} delay={100} duration={1000}  />

 :   <TextAnimationFadeIn style={{color:'#fff' , fontSize:responsiveFontSize(2.5), fontWeight:'300' }} value={"Listening..."} delay={100} duration={1000}  /> }


</View>


    </View>
   

    </View>
    
    
   

     
        <TouchableOpacity onPress={() => startRecording()} style={styles.floatingButton}>
          <View style={styles.buttonContainer}>
            {result == false ?



              <ImageBackground  style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 200, elevation: 4, }} source={{ uri: 'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-66994.jpg' }}>

                <Image style={{ width: 70, height: 70 }} source={require('../assets/Mic.png')} />

              </ImageBackground>



              :

              // <TouchableOpacity style={{alignItems:'center' , justifyContent:'center'}} onPress={() => stop()}>

              //   <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 200, elevation: 4, }} source={require('../assets/But.png')}>


              //   </ImageBackground>
              // </TouchableOpacity>
              <ImageBackground  style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 200, elevation: 4, }} source={{ uri: 'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-66994.jpg' }}>

              <Image style={{ width: 30, height: 30 }} source={require('../assets/Mic.png')} />

            </ImageBackground>
            }
          </View>
        </TouchableOpacity>

        </View>



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
    borderRadius:200
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