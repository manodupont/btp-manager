/* eslint-disable object-curly-spacing,semi */
import React, {Component} from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import {Container, Content, Text, H1, H2, H3, Button} from 'native-base';
// import Spacer from './Spacer';
import {Constants, Location, Permissions, MapView} from 'expo';

class About extends Component {
  constructor() {
    super();

    this.state = {
      location: null,
      errorMessage: null,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  async _getLocationAsync() {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({location});
  }

  setMarkers() {
    const {location} = this.state;

    return (
      <MapView.Marker
        key={1}
        coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}
        title="Me"
        description="Current Position"
      />);
  }

  render() {
    return (
      <Container>
        {this.state.location && this.state.location.coords &&
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsMyLocationButton={true}
          showsUserLocation={true}
        />
        }
      </Container>
    );
  }
}

export default About;
