import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { toLogin, reviewText, submitReview, currentUser } from '../actions'


class Maps extends React.Component {

  state = {
    toggleMain: false,
    toggleReview: false,
    selectedHunt: null
  }

  handleReviewText(text){
    this.props.reviewText(text)
  }


  toggleMain = (hunt) => {
    this.setState(previousState => {
      let selected = !this.state.selectedHunt ? hunt : null
      return {  toggleMain: !previousState.toggleMain,
                selectedHunt: selected}
    })
    this.mainModal()
  }

  toggleReview = () => {
    this.setState(previousState => {
      return { toggleReview: !previousState.toggleReview }
    })
    this.reviewModal(this.state.selectedHunt)
  }

  submitReview = () => {
    let { review, userID } = this.props
    this.props.submitReview(review, this.state.selectedHunt.hunt_id, userID)
    this.toggleReview()
  }

  mainModal = () => {
    console.log(this.props)
    if(this.state.toggleMain) {
      let hunt = this.state.selectedHunt
      return (
        <Card>
          <CardSection style={{width:300, height:300, borderTopLeftRadius:10, borderTopRightRadius:10}}>
          <Image style={{ height: 80, width: 80, borderRadius: 40}} source={{uri: hunt.huntPhotoURL}} />
            <Text style={styles.descStyle}> {hunt.description} </Text>
          </CardSection>
          <CardSection style={{paddingBottom:15, shadowOffset: {width: 0, height:0},
            shadowColor: '#36454f',
            shadowOpacity: 0,
            shadowRadius: 0,
          borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
            <Button onPress={()=> this.toggleReview()}>Leave Review</Button>
            <Button onPress={()=> this.toggleMain()}>Close</Button>
        </CardSection>
      </Card>
      )
    }
  }

  reviewModal = () => {
    if(this.state.toggleReview) {
      return (
        <Card>
          <CardSection style={{width:300, height:80, borderTopLeftRadius:10, borderTopRightRadius:10}}>
            <TextInput
              style={{width:275}}
              multiline={true}
              maxLength = {126}
              placeholder='Leave a review'
              onChangeText= {this.handleReviewText.bind(this)}
            />
            </CardSection>
            <CardSection style={{paddingBottom:15, shadowOffset: {width: 0, height:0},
              shadowColor: '#36454f',
              shadowOpacity: 0,
              shadowRadius: 0,
            borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
              <Button onPress={()=> this.submitReview()}>Submit</Button>
              <Button onPress={()=> this.toggleReview()}>Cancel</Button>
          </CardSection>
      </Card>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 39.747725,
            longitude:  -104.988957,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        {this.props.hunts.map(marker => (
          <Marker
            coordinate={{ latitude: parseFloat(marker.lat),
                          longitude: parseFloat(marker.long) }}
            title={marker.name}
            onPress={() => this.toggleMain(marker)}
          />
        ))}
        </MapView>
        <Card>
          {this.mainModal()}
        </Card>
        <Card>
          {this.reviewModal()}
        </Card>
      </View>
    )
  }
}

mapStateToProps = state => {
  const { hunts, review, userID } = state
  return {
    hunts,
    review,
    userID
  }
}
export default connect(mapStateToProps, { toLogin, reviewText, submitReview, currentUser})(Maps)


const Button =({onPress, children })=>{
  const { buttonStyle, textStyle }= styles
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} >
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const Card = (props) => {
  return (
    <View style={styles.cardStyle}>
      {props.children}
    </View>
  )
}

const CardSection = (props)=>{
  return (
    <View style={[styles.cardSectionStyle, props.style]}>
      {props.children}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  descStyle:{
    color:'black',
    fontSize:16,
    fontWeight:'600',
    paddingTop:18,
    paddingBottom:12,
  },
  textStyle:{
    color:'white',
    fontSize:16,
    fontWeight:'600',
    paddingTop:18,
    paddingBottom:12,
  },
  buttonStyle:{
    alignItems:'center',
    flex:1,
    alignSelf:'stretch',
    backgroundColor:'#36454f',
    borderRadius: 5,
    marginLeft:5,
    marginRight:5,
    borderRadius:50
  },
  cardStyle:{
    elevation: 1,
    marginTop:5,
    marginBottom:1,
    marginLeft:5,
    marginRight:5,
  },
  cardSectionStyle : {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    shadowOffset: {width: -8, height:3},
    shadowColor: '#36454f',
    shadowOpacity: 0.4,
    shadowRadius: 8,
  }
})
