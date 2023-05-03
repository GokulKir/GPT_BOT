import { useState, useEffect } from 'react';
import SystemSetting from 'react-native-system-setting';

const useDeviceVolume = () => {
  const [volume, setVolume] = useState(0);

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
    console.log("increase volume");
    setDeviceVolume(1);
  };

  const increaseDeviceVolume = () => {
    const newVol = Math.min(volume + 1);
    setDeviceVolume(newVol);
  };

  return {
    volume,
    setDeviceVolume,
    decreaseDeviceVolume,
    decreaseFullDeviceVolume,
    increaseFullDeviceVolume,
    increaseDeviceVolume,
  };
};

export default useDeviceVolume;
