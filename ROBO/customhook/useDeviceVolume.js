import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import SystemSetting from 'react-native-system-setting';
import firestore from '@react-native-firebase/firestore';

const useDeviceVolume = () => {


  const [volume, setVolume] = useState(0);
  const [sound , setSound] = useState(0.5)
  const [soundR , setSoundR] = useState()


  useEffect(()=> {

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

       
        setSoundR(Voice)

        console.log(soundR);
    
  
      }

     
   
    },[soundR]);

  })


  useEffect(() => {
    // Load saved volume level from AsyncStorage on component mount
    AsyncStorage.getItem('volumeLevel').then(volumeLevel => {
      if (volumeLevel !== null) {
        
        setSound(parseFloat(volumeLevel));
        console.log(parseFloat(volumeLevel));
         
        SystemSetting.setVolume(parseFloat(volumeLevel));
      }
    });
  }, []);



  function handleVolumeChange(value) {
    setVolume(value);
    setSound(value)
    SystemSetting.setVolume(value);
    // Save current volume level to AsyncStorage
    AsyncStorage.setItem('volumeLevel', value.toString());

    firestore()
  .collection('Sound')
  .doc("DEVBOTSOUND")
  .set({
    Voice : sound
  })
  .then(() => {
    console.log('User added!',value);
  });
  }


  useEffect(() => {
    SystemSetting.getVolume().then((vol) => {
      setVolume(vol);
    });
  }, []);

  const setDeviceVolume = (vol) => {
    SystemSetting.setVolume(vol);
    setVolume(vol);
  };

  const decreaseDeviceVolume = () => {
    const newVol = Math.max(volume - 0.1, 0);
    setDeviceVolume(newVol);
  };

  const decreaseFullDeviceVolume = () => {
    console.log("decrease volume");
    setDeviceVolume(0);
  };
  const increaseFullDeviceVolume = () => {
    console.log("increase volume"+soundR);
    setDeviceVolume(soundR);
  };

  const increaseDeviceVolume = () => {
    const newVol = Math.min(sound);
    setDeviceVolume(sound);
  };

  return {
    volume,
    setDeviceVolume,
    decreaseDeviceVolume,
    decreaseFullDeviceVolume,
    increaseFullDeviceVolume,
    increaseDeviceVolume,
    handleVolumeChange
  };
};

export default useDeviceVolume;
