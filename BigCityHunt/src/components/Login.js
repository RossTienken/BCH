import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import firebase from 'firebase'

const provider = new firebase.auth.FacebookAuthProvider();

export default class Login extends React.Component {

  renderFBButton() {
   return (
      <TouchableOpacity
        style={styles.FBbutton}
        onPress={this.onFBButtonPress}
        title="Continue with Facebook"
      >
        <Text style={styles.FBbuttonText}>
           Continue with Facebook
        </Text>
      </TouchableOpacity>
    );
  }
  onFBButtonPress = () => {
    firebase.auth().signInWithRedirect(provider);
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Login or Signup!</Text>
        <View>
          { this.renderFBButton() }
        </View>
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
