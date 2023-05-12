import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import { useState } from 'react';

export default function MapsComponent() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    (async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log("esta es la loc" + location.coords.longitude)
        setLocation(location);
    })();

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coordslongitude,
        };
    }

    const region = region;

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                showsUserLocation={true}
                followUserLocation={true}
            >
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});