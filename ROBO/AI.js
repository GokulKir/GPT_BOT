import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  NativeEventEmitter,
  LogBox,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Voice from '@react-native-community/voice';
import {ScrollView} from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import axios from 'axios';
import {Modal, Portal, Button, Provider, Snackbar} from 'react-native-paper';
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
import {GiftedChat} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  TextAnimationFadeIn,
  TextAnimationZoom,
  TextAnimationRain,
  TextAnimationSlideDown,
  TextAnimationSlideUp,
  TextAnimationSlideLeft,
  TextAnimationSlideRight,
  TextAnimationShake,
  TextAnimationReverse,
  TextAnimationDeZoom,
} from 'react-native-text-effects';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import AnswerAI from './AnswerAI';
import useDeviceVolume from './customhook/useDeviceVolume';

import {
  Collection,
  KeyCollection,
  TriggerWord,
} from './customhook/BackendServer';
import AnimateTriggerText from './AnimateTriggerText';
import useMQTT from './customhook/useMQTT';

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
    Tts.addEventListener;
    Voice.destroy();
    Tts.stop();
  };

  const NetworkError = () => {};

  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); // Ignore all log notifications

  const {width, height} = useWindowDimensions();
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [recognized, setRecognized] = useState('');
  const [message, setMessage] = useState([]);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState();
  const [IsRecording, setIsRecording] = useState('');
  const [IsSpeak, setIsSpeak] = useState('');
  const [IsTriger, setIsTriger] = useState(false);
  const [assestant, setAssistanc] = useState(false);
  const [subTrigger, setSubtrigger] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState('The output message');
  const [IsOrNot, setIsOrNot] = useState(false);
  const [StartT, setStartT] = useState(false);
  const [WelcomSp, setWelcomSp] = useState('');
  const [secondS, setSecondS] = useState(false);
  const [API_KEY, SET_API_KEY] = useState();
  const [MQTT, setMQTT] = useState("Trigger Not Detected")
  const [text, setText] = useState('connected');
  const [client, publishMessage] = useMQTT('mqtt://sonic.domainenroll.com:1883', 'domainenroll:de120467', '/data', text);


  // const mqttClient = useMQTT('mqtt://sonic.domainenroll.com:1883', 'domainenroll:de120467');
  const [startTime, setstartTime] = useState(new Date());
  const {volume, increaseFullDeviceVolume, decreaseFullDeviceVolume} =
    useDeviceVolume();
  const [name, setName] = useState('Sonic');

  // console.log(mqttClient,"mqttClient");

  const setRecodingResult = data => {
    setResult(data);
  };
  

  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = err => setError(err.error);
  Voice.onSpeechResults = result => setRecodingResult(result.value[0]);

useEffect(() => {
  const timeDifference = new Date() - startTime;
console.log("timeDifference > 000 ",timeDifference > 200000,result.length <= 0 ,assestant );
    if (timeDifference > 100000 && result.length <= 0 && assestant) {
      assistanceTrigger(false);
    }
},)


  const handleButtonClick = () => {
    publishMessage(text);
  };

  useEffect(() => {
    handleButtonClick()
  }, [text])
  
  // Start recording //

  const startRecording = async () => {
    decreaseFullDeviceVolume();
    // Voice.onSpeechRecognized((res)=>console.log(res))
    console.log('====================================');
    console.log('Recoding voice', IsTriger);
    console.log('====================================');
    await Voice.start('en-US');
  };

  useEffect(() => {
   

    TriggerWord.get().then(data =>
      data.forEach(doc => {
        console.log(doc.id, ' => ', doc.data().triggerName);
        let triggerName = doc.data().triggerName;
        setName(triggerName);
      }),
    );

    let key = '';
    KeyCollection.get().then(data =>
      data.forEach(doc => {
        console.log(doc.id, ' => ', doc.data()?.DevBotKey);
        key = doc.data()?.DevBotKey;
        SET_API_KEY(key);
      }),
    );
  }, []);

  // Start recording //

  //Stop recording //

  const stopRecording = async () => {
    console.log('stpo recoding*****');
    setStarted(false);
    setLoading(false);
    setIsOrNot(true);
    await Voice.stop();
  };

  /**
   * Gokul code
   */
  function stop() {
    Tts.stop();
    Voice.destroy();
    setSecondS(false);
  }

const setTextVale = useCallback(
  (data) =>{
    setText(data)
  },
  [setText],
)




  //Stop recording //

  // jestin xavier
  useEffect(() => {
    if (!IsTriger) {
     
      startRecording();
    } else {
      stopRecording();
     
    }
  }, [startRecording, IsTriger]);

  const TextToSpeech = data => {
    increaseFullDeviceVolume();
    // console.log(IsTriger,'text to speech');
    // if(IsTriger){

    Tts.addEventListener('tts-finish', () => {
      console.log('Speech finished');
      setTextVale("Speech Ented");
      triggerGenerate(false);
    });
    Tts.speak(data, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
    //  }
  };

  /**
   *
   * @param {boolean} boolean
   * this function is used to controll the trigger of the mic when it start to speaking
   */
  const triggerGenerate = useCallback(
    data => {
      setIsTriger(data);
      if (!data) {
        Responcenavigate(false);
      }
    },
    [setIsTriger],
  );

  const initialSetResult = useCallback(() => {
    setResult('');
  }, [setResult]);

  const assistanceTrigger = useCallback(
    data => {
      setAssistanc(data);
      setstartTime(new Date())
    },

    [setAssistanc],
  );

  useEffect(() => {
    console.log(
      result,
      result === 'Alexa' || result === 'hi Alexa' || result === 'hey Alexa',
      '******hey dana*****',
    );

    // if (result === "Dana" || result === "hi Dana" || result === "hey Dana" || result == "hi Dyna" || result === "hi Diana"  ) {

    if (
      (result === name ||
        result === `hi ${name}` ||
        result === `hey ${name}` ||
        result.includes(name)) &&
      !assestant
    ) {
      setTextVale("Trigger Word Dectected");
      triggerGenerate(true);
      initialSetResult();
     
      TextToSpeech(`HI i am ${name} from Devlacus`);
      assistanceTrigger(true);
    }

//     const timeDifference = new Date() - startTime;
// console.log("timeDifference > 15000 ",timeDifference > 15000 );
//     if (timeDifference > 15000 && result.length <= 0 && assestant) {
//       assistanceTrigger(true);
//     }
  }, [result]);

  const Responcenavigate = data => {
    if(secondS){
    setTextVale("Speech Ented");
    }
    setSecondS(data);
  };

  useEffect(() => {
    if (secondS) {
      setRecodingResult('');
    }
  }, [secondS]);

  useEffect(() => {
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    if (result.length > 0) {
      // VoiceController(true)
     
      let regex = new RegExp(name, 'gi');
      let FilterData = result.replace(regex, '');
      // let FilterData = result.replace(/diya/gi, "");
      if (!IsTriger && assestant) {
        triggerGenerate(true);
        console.log(API_KEY, '=====================axios call===============');
       
        axios({
          method: 'post',
          url: 'https://api.openai.com/v1/chat/completions',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          data: {
            messages: [{role: 'user', content: FilterData}],
            model: 'gpt-3.5-turbo',
          },
        })
          .then(res => {
            console.log(res.data);
            const message = res.data?.choices[0]?.message?.content;
            console.log(message);

            setIsSpeak(message?.trim());
            increaseFullDeviceVolume();
            setTextVale("Speech Started");
            TextToSpeech(message);

            Responcenavigate(true);
            setstartTime(new Date())
            // setIsSpeak(res.data?.choices[0].message?.content.trim());
            // TextToSpeech(res.data?.choices[0].message?.content);
            Collection.add({
              Qa: result,
              Ans: message,
              createAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            }).then(res => {
              console.log('Data added');
            });
          })
          .catch(error => {
            console.error(error);
            showModal();
          });
      }
    }
    // if (!IsTriger && assestant) {
    //   triggerGenerate(true);
    //   console.log('=====================fetch call===============');

    //   fetch("https://api.openai.com/v1/chat/completions", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": "Bearer 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"
    //     },
    //     body: JSON.stringify({
    //       messages: [{ role: "user", content: FilterData }],
    //       model: "gpt-3.5-turbo"
    //     })
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     const message = data?.choices[0]?.message?.content;
    //     console.log(message);

    //     setIsSpeak(message?.trim());
    //     increaseFullDeviceVolume();
    //     TextToSpeech(message);

    //     Responcenavigate(true);

    //     setIsSpeak(data?.choices[0].message?.content.trim());
    //     TextToSpeech(data?.choices[0].message?.content);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     showModal();
    //   });
    // }
  }, [result]);
  /**
   * The DistroySpeech function is used to distroy the text to speech and it will navigate to home screen
   */
  const DistroySpeech = () => {
    Tts.addEventListener;
    // Voice.destroy()
    Tts.stop();
    Responcenavigate(false);
    startRecording();
    triggerGenerate(false);
    setResult('');
  };

  const Dimention = useWindowDimensions();

  useEffect(() => {
    console.log('====================================');
    console.log(result);
    console.log('====================================');
  });

  return (
    <View style={styles.container}>
      {!secondS ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{top: 40, display: 'flex', flexDirection: 'column'}}>
            <View style={{alignItems:'center' }}>
            {visible == true ? (
              <View
                style={{
                  width: responsiveWidth(50),
                  height: responsiveHeight(70),
                  backgroundColor: '#000',
                  elevation: 3,
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: '#DDD',
                }}>
                <Provider>
                  <Button style={{marginTop: 30}} onPress={showModal}>
                    Go back
                  </Button>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      top: 30,
                    }}>
                    <Image
                      style={{width: 120, height: 120}}
                      source={require('../assets/server.png')}
                    />

                    <View style={{top: 10}}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 19,
                          fontWeight: '400',
                        }}>
                        Network error
                      </Text>
                    </View>
                  </View>
                </Provider>
              </View>
            ) : (
              <ImageBackground
                style={{
                  height: responsiveWidth(30),
                  width: responsiveWidth(30),
                }}
                imageStyle={{borderRadius: 200, flex: 1}}
                source={ require('../assets/jasmin.gif')}></ImageBackground>
            )}
          </View> 
            <View style={{alignItems: 'center', flex: 1,}}>
              {/* <View style={{ width: 244, height: 244, backgroundColor: '#000', alignItems: 'center' }}>

              <Text style={{ color: '#fff', fontSize: 25, fontWeight: '200' }}>{result}</Text>

            </View> */}

              <View style={{alignItems: 'center'}}>
                {assestant ? (
                  result.length > 0 ? (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: responsiveFontSize(2.5),
                        fontWeight: '300',
                      }}> 
                      {result}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: responsiveFontSize(2.5),
                        fontWeight: '300',
                      }}>
                      Listening....
                    </Text>
                  )
                ) : (
                  <AnimateTriggerText text={name} duration={1500} delay={500} />
                )}
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => startRecording()}
            onLongPress={()=> assistanceTrigger(false)}
            style={styles.floatingButton}>
            <View style={styles.buttonContainer}>
              {result == false ? (
                <ImageBackground
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  imageStyle={{borderRadius: 200, elevation: 4}}
                  source={
                    require('../assets/gradientBlue.jpeg')
                  }>
                  <Image
                    style={{
                      width: responsiveWidth(2),
                      height: responsiveWidth(2),
                    }}
                    source={require('../assets/Mic.png')}
                  />
                </ImageBackground>
              ) : (
                // <TouchableOpacity style={{alignItems:'center' , justifyContent:'center'}} onPress={() => stop()}>

                //   <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 200, elevation: 4, }} source={require('../assets/But.png')}>

                //   </ImageBackground>
                // </TouchableOpacity>
                <ImageBackground
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#19ecf7',
                    borderRadius: 200,
                  }}
                  imageStyle={{borderRadius: 200, elevation: 4}}
                  source={
                    require('../assets/gradientBlue.jpeg')
                  }>
                  <Image
                    style={{
                      width: responsiveWidth(2),
                      height: responsiveWidth(2),
                    }}
                    source={require('../assets/Mic.png')}
                  />
                </ImageBackground>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <AnswerAI Data={IsSpeak} stop={DistroySpeech} />
      )}
    </View>
  );
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 200,
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
});
