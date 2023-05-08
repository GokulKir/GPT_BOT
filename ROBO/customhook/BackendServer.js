
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export const Collection = firestore().collection('Devbot');
export const KeyCollection = firestore().collection('ApiKey');
export const TriggerWord = firestore().collection('TriggerWord');





