import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginForm = () => {
    const [isLoginVisible, setIsLoginVisible] = useState(true);
    const [loginData, setLoginData] = useState({});
    const [registerData, setRegisterData] = useState({});

    const handleLoginPress = () => {
        setIsLoginVisible(true);
    };

    const handleRegisterPress = () => {
        setIsLoginVisible(false);
    };

    const handleLogin = () => {
        console.log('Inicio de sesión:', loginData);

        axios
            .post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9dF-o2cOD0nOwSN9pgO3F25s8b-JKP2g',
                { ...loginData, returnSecureToken: true }
            )
            .then(response => {
                console.log(response.data);
                alert('El usuario se ha logueado correctamente');
                //setLoggedIn(true);
            }).catch((error) => {
                alert('No se ha encontrado el usuario');
            })
        clearLoginData();
    };

    const handleRegister = () => {
        console.log('Registro:', registerData);
        // Guardar registerData en un archivo JSON aquí
    };

    const handleLoginInputChange = (name, value) => {
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegisterInputChange = (name, value) => {
        setRegisterData({ ...registerData, [name]: value });
    };

    const clearLoginData = () => {
        setLoginData({});
        setRegisterData({});
    };

    return (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
            {isLoginVisible ? (
                /* Formulario de inicio de sesión */
                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Inicio de sesión</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        onChangeText={(text) => handleLoginInputChange('email', text)}
                        value={loginData.email || ''}
                    />
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
                        placeholder='Contraseña'
                        secureTextEntry={true}
                        onChangeText={(text) => handleLoginInputChange('password', text)}
                        value={loginData.password || ''}
                    />
                    <TouchableOpacity
                        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                        onPress={handleLogin}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                /* Formulario de registro */
                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Registro</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        onChangeText={(text) => handleRegisterInputChange('email', text)}
                        value={registerData.email || ''}
                    />
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
                        placeholder='Contraseña'
                        secureTextEntry={true}
                        onChangeText={(text) => handleRegisterInputChange('password', text)}
                        value={registerData.password || ''}
                    />
                    <TouchableOpacity
                        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                        onPress={handleRegister}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Botones para seleccionar formulario */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <TouchableOpacity onPress={handleLoginPress}>
                    <Text style={{ color: isLoginVisible ? 'blue' : 'black', fontWeight: 'bold' }}>Iniciar sesión {'   '}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRegisterPress}>
                    <Text style={{ color: !isLoginVisible ? 'blue' : 'black', fontWeight: 'bold' }}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginForm;

