import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import firebase from 'firebase'

const provider = new firebase.auth.FacebookAuthProvider();

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Login or Signup!</Text>
        <Button
          onPress={() => console.log('dsa')}
          title="Sign in with facebook"
          color="#3c50e8"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#244865',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    flex: 1,
    color: '#98cb51',
    fontSize: 45,
    textAlign: 'center',
    position: 'absolute',
    top: 25
  }
})
