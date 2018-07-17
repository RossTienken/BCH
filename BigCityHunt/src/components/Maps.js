import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { toLogin } from '../actions'


class Maps extends React.Component {

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
            title={marker.hunt_id}
          />
        ))}
        </MapView>
      </View>
    )
  }
}

mapStateToProps = state => {
  const { hunts } = state
  return {
    hunts
  }
}
export default connect(mapStateToProps, { toLogin })(Maps)


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
  }
})
