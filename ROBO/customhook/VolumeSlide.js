import SystemSetting from 'react-native-system-setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState , useEffect} from 'react-native' 

const ChangeDeviceVolume = () => {
    const [volume , setVolume] = useState()

    useEffect(() => {
        // Load saved volume level from AsyncStorage on component mount
        AsyncStorage.getItem('volumeLevel').then(volumeLevel => {
          if (volumeLevel !== null) {
            
            setVolume(parseFloat(volumeLevel));
            console.log(parseFloat(volumeLevel));

            SystemSetting.setVolume(parseFloat(volumeLevel));
          }
        });
      }, []);



      function handleVolumeChange(value) {
        setVolume(value);
        SystemSetting.setVolume(value);
        // Save current volume level to AsyncStorage
        AsyncStorage.setItem('volumeLevel', value.toString());
      }


      return {
        handleVolumeChange
      }
    


}

export default ChangeDeviceVolume 