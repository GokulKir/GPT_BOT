import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Text } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const TextAutoScroll = ({ text, delay = 1500 }) => {
  const [chunks, setChunks] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    const words = text.split(' '); // split text into words
    const splitText = [];
    let chunk = '';
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (chunk.length + word.length <= 200) { // check if the current chunk + the next word exceeds 20 characters
        chunk += `${word} `;
      } else {
        splitText.push(chunk.trim()); 
        chunk = `${word} `;
      }
    }
    if (chunk.length > 0) { // push the last chunk into the array
      splitText.push(chunk.trim());
    }
    setChunks(splitText);
  }, [text]);
  

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      scrollViewRef.current.scrollTo({ y: index * 200, animated: true }); 
      index++;
      if (index === chunks.length) {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [delay, chunks]);

  return (
    <ScrollView ref={scrollViewRef}>
      {chunks.map((chunk, index) => (
        <Text style={{color:'#fff',fontSize:responsiveFontSize(2),textAlign:'center'}} key={index}>{chunk}</Text>
      ))}
    </ScrollView>
  );
};

export default TextAutoScroll;
