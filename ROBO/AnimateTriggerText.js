import React, { useState, useEffect } from 'react';
import { Text, Animated } from 'react-native';
import {
  responsiveFontSize, responsiveHeight
} from "react-native-responsive-dimensions";

const AnimateTriggerText = ({ text, duration = 100, delay = 200 }) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [textArray, setTextArray] = useState([]);

  useEffect(() => {
    const textWithPrefix = `Call me ${text}`;
    setTextArray(textWithPrefix.split(''));
  }, [text]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, duration, delay]);



  return (
    <Animated.View style={{ opacity: animatedValue, display: 'flex', flexDirection: 'row' }}>

      {textArray.map((letter, index) => (
        <Animated.Text
          key={index}
          style={[{ opacity: animatedValue }, { color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '300' }]}
        >
          {letter}
        </Animated.Text>
      ))}
    </Animated.View>
  );
};

export default AnimateTriggerText;




