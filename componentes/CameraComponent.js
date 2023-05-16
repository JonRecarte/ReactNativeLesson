import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function CameraComponent() {

    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [isVisible, setIsVisible] = useState(true); // Nuevo estado para detectar cambios

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus === 'granted');

            const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
        })();
    }, []);

    useEffect(() => {
        return async () => {
            if (cameraRef) {
                await cameraRef.pausePreview();
            }
        }
    }, [cameraRef]);

    // Nuevo useEffect para detectar cambios y forzar la actualización
    useEffect(() => {
        setIsVisible(true);
    }, [isVisible]);

    const handleTakePhoto = async () => {
        if (cameraRef && hasMediaLibraryPermission) {
            const photo = await cameraRef.takePictureAsync({ quality: 1 });
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            setPhoto(photo);
            setIsVisible(false); // Ocultar el componente de la cámara al tomar una foto
        }
    };

    const handleFlipCamera = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
        return <View />;
    } else if (hasCameraPermission === false) {
        return <Text>Sin acceso a la cámara</Text>;
    } else if (hasMediaLibraryPermission === false) {
        return <Text>Se requiere el permiso de la biblioteca de medios para guardar en la galería.</Text>;
    } else {
        console.log('Camera activa');
    }

    return (
        <View style={[styles.container, { display: isVisible ? 'flex' : 'none' }]}> 
            {photo && (
                <View style={styles.preview}>
                    <Image
                        source={{ uri: photo.uri }}
                        style={styles.previewImage}
                        resizeMode="contain"
                    />
                    <TouchableOpacity onPress={() => setPhoto(null)}>
                        <Text style={styles.previewCloseButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Camera
                style={styles.camera}
                type={type}
                ref={(ref) => setCameraRef(ref)}
            >
                <View style={styles.cameraButtons}>
                    <TouchableOpacity onPress={handleFlipCamera}>
                        <Text style={styles.cameraButtonText}>Girar{'   '}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleTakePhoto}>
                        <Text style={styles.cameraButtonText}>Tomar Foto</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cameraButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cameraButtonText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
    },
    preview: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    previewCloseButtonText: {
        fontSize: 24,
        color: 'white',
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
});