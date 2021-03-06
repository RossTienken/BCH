import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput} from 'react-native'
import firebase from 'firebase'
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import { currentUser } from '../actions'



class Login extends Component {
  constructor(props) {
      super(props)
      this.unsubscriber = null
      this.state = {
          isAuthenticated: false,
          typedEmail: '',
          typedPassword: '',
          user: null,
      }
  }
  componentDidMount() {
      this.unsubscriber = firebase.auth().onAuthStateChanged((changedUser) => {
          this.setState({ user: changedUser })
          this.props.currentUser(changedUser.uid)
          console.log(this.props.userID)

      })
      GoogleSignin.configure({
          iosClientId: '346398669245-f7pt9kffmulri60iukdmklt9gv3tibjg.apps.googleusercontent.com',
      })
      .then(() => {
      })
  }
  componentWillUnmount() {
      if (this.unsubscriber) {
          this.unsubscriber()
      }
  }
  onAnonymousLogin = () => {
      firebase.auth().signInAnonymously()
          .then(() => {
              this.loginSuccess()
              this.setState({
                  isAuthenticated: true,
              })
          })
          .catch((error) => {
              console.log(`Login failed. Error = ${error}`)
          })
  }
  onRegister = () => {
      firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
          .then((loggedInUser) => {
              this.setState({ user: loggedInUser })
              this.loginSuccess()
          }).catch((error) => {
              console.log(`Register fail with error: ${error}`)
          })
  }
  onLogin = () => {
      firebase.auth().signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
          .then((loggedInUser) => {
              this.loginSuccess()
          }).catch((error) => {
              console.log(`Login fail with error: ${error}`)
          })
  }
  onLoginFacebook = () => {
      LoginManager
          .logInWithReadPermissions(['public_profile', 'email'])
          .then((result) => {
              if (result.isCancelled) {
                  return Promise.reject(new Error('The user cancelled the request'))
              }
              // get the access token
              return AccessToken.getCurrentAccessToken()
          })
          .then(data => {
              const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
              return firebase.auth().signInWithCredential(credential)
          })
          .then((currentUser) => {
              this.loginSuccess()
          })
          .catch((error) => {
              console.log(`Facebook login fail with error: ${error}`)
          })
  }
  onLoginGoogle = () => {
      GoogleSignin
          .signIn()
          .then((data) => {
              // create a new firebase credential with the token
              const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
              // login with credential
              return firebase.auth().signInWithCredential(credential)
          })
          .then((currentUser) => {
              this.loginSuccess()
          })
          .catch((error) => {
              console.log(`Login fail with error: ${error}`)
          })
  }

  loginSuccess = () => {
    return Actions.maps()
  }

  render() {
      return (
          <View
              style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: Platform.OS === 'ios' ? 30 : 0,
              }}
          >
              <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  margin: 40
              }}>Login with Firebase </Text>
              <Button containerStyle={{
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: 'rgb(226,161,184)'
              }}
                  style={{ fontSize: 18, color: 'white' }}
                  onPress={this.onAnonymousLogin}
              >Login anonymous</Button>
              <Text style={{ margin: 20, fontSize: 15, }}>{this.state.isAuthenticated == true ? 'Logged in anonymous' : ''}</Text>
              <TextInput style={{
                  height: 40,
                  width: 200,
                  margin: 10,
                  padding: 10,
                  borderColor: 'gray',
                  borderWidth: 1,
                  color: 'black'
              }}
                  keyboardType='email-address'
                  placeholder='Enter your email'
                  autoCapitalize='none'
                  onChangeText={
                      (text) => {
                          this.setState({ typedEmail: text })
                      }
                  }
              />
              <TextInput
                  style={{
                      height: 40,
                      width: 200,
                      margin: 10,
                      padding: 10,
                      borderColor: 'gray',
                      borderWidth: 1,
                      color: 'black'
                  }}
                  keyboardType='default'
                  placeholder='Enter your password'
                  secureTextEntry={true}
                  onChangeText={
                      (text) => {
                          this.setState({ typedPassword: text })
                      }
                  }
              />

              <View style={{ flexDirection: 'row' }}>
                  <Button containerStyle={{
                      padding: 10,
                      borderRadius: 4,
                      margin: 10,
                      backgroundColor: 'green'
                  }}
                      style={{ fontSize: 17, color: 'white' }}
                      onPress={this.onRegister}
                  >Register</Button>
                  <Button containerStyle={{
                      padding: 10,
                      margin: 10,
                      borderRadius: 4,
                      backgroundColor: 'blue'
                  }}
                      style={{ fontSize: 17, color: 'white' }}
                      onPress={this.onLogin}
                  >Login</Button>
              </View>
              <Button containerStyle={{
                  padding: 10,
                  width: 150,
                  margin: 20,
                  borderRadius: 4,
                  backgroundColor: 'rgb(73,104,173)'
              }}
                  style={{ fontSize: 18, color: 'white' }}
                  onPress={this.onLoginFacebook}
              >Login Facebook</Button>
              <Button containerStyle={{
                  padding: 10,
                  width: 150,
                  margin: 20,
                  borderRadius: 4,
                  backgroundColor: 'rgb(204,84,65)'
              }}
                  style={{ fontSize: 18, color: 'white' }}
                  onPress={this.onLoginGoogle}
              >Login Google</Button>
          </View>
      )
  }
}

mapStateToProps = state => {
  const { userID } = state
  return {
    userID
  }
}
export default connect(mapStateToProps, { currentUser })(Login)
