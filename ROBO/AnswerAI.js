import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AnswerAI() {
  return (
    <View style={styles.container}>
      <Text style={{color:'#fff'}}>AnswerAI</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        backgroundColor:'#000'
    }
})