import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { homePressed } from '../actions'

export default class Home extends React.Component {

  buttonPress() {
    return Actions.login
  }

  renderButton(){
    return (
      <Button onPress={ this.buttonPress() }>
        Begin!
      </Button>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{ height: 400, width: 400}} source={require('../../public/BCH.png')} />
        <View style={styles.viewStyle}>
          { this.renderButton() }
        </View>
      </View>
    )
  }
}

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles

  return (
    <TouchableOpacity style={ buttonStyle } onPress={ onPress }>
      <Text style={ textStyle }>
        {children}
      </Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#244865',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#244865',
    fontSize: 40,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#98cb51',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: 75,
    marginRight: 75
  },
  viewStyle:{
    marginTop:5,
    marginBottom:5,
    paddingTop: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    marginLeft:25,
    marginRight:25
  }
})
