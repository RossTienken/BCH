import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'firebase';



export default class login extends Component {
    state = {
        logged: false,
        animating: false
    }

    handleLogin = () => {
        if (!this.state.logged) {
            LoginManager.logInWithPublishPermissions()
                .then((result) => {
                    if (result.isCancelled) {
                        alert('Cancel login');
                    }

                    this.setState({ logged: true });
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            // alert(data.accessToken.toString())
                        }
                    ).catch(error => alert(error));
                })
                .catch(error => console.log(error));
        } else {
            this.setState({ logged: false });
            LoginManager.logOut();
        }
    }

    onLogin = async () => {
        try {
            this.setState({
                animating: true
            });
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
            const tokenData = await AccessToken.getCurrentAccessToken();
            const token = tokenData.accessToken.toString();
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const user = await firebase.auth().signInWithCredential(credential);
            firebase.database().ref(`/users/${user.uid}/profile`).set({
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
            });
            this.setState({
                animating: false
            });
        } catch (error) {
            this.setState({
                animating: false
            });
            console.log(error.message);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={this.state.animating}
                    color="#ddd"
                    size="large"
                />
                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("login has error: " + result.error);
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        // alert(data.accessToken.toString())
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('login', () => login);
