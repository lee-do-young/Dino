

import React from 'react';
import { Text, View } from 'react-native';
import { API, graphqlOperation} from 'aws-amplify'
import { createTodo, updateTodo, deleteTodo } from '../../graphql/mutations';


export default function Main() {
  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
