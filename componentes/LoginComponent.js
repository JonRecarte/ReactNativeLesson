import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginForm() {
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    const [loginData, setLoginData] = useState({});
    const [registerData, setRegisterData] = useState({});

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [authToken, setAuthToken] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const checkLogin = async () => {
            const loginValue = await AsyncStorage.getItem('login');
            if (loginValue === 'true') {
                setIsLoggedIn(true);
            }
            else {
                setIsLoggedIn(false);
            }
            // Recuperar datos
            AsyncStorage.getItem('login').then((login_cache) => {
                AsyncStorage.getItem('authToken').then((authToken_cache) => {
                    AsyncStorage.getItem('email').then((email_cache) => {
                        console.log(login_cache);
                        console.log(authToken_cache);
                        console.log(email_cache);
                    })
                })
            })
        };
        checkLogin();
    }, [setIsLoggedIn]);

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
                //console.log(response.data);
                setIsLoggedIn(true);
                setAuthToken(response.data.idToken);
                setEmail(response.data.email);

                // Guardar datos
                AsyncStorage.setItem('login', 'true');
                AsyncStorage.setItem('authToken', response.data.idToken);
                AsyncStorage.setItem('email', response.data.email);

                alert('El usuario se ha logueado correctamente');
                clearLoginData();

            }).catch((error) => {
                console.log(error.response)
                clearLoginData();
                alert('No se ha encontrado el usuario');
            })
    };

    const handleRegister = () => {
        console.log('Registro:', registerData);
        // Guardar registerData en un archivo JSON aquí

        axios
            .post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9dF-o2cOD0nOwSN9pgO3F25s8b-JKP2g',
                { ...registerData, returnSecureToken: true }
            ).then(response => {

                setIsLoggedIn(true);
                setAuthToken(response.data.idToken);
                setEmail(response.data.email);

                // Guardar datos
                AsyncStorage.setItem('login', 'true');
                AsyncStorage.setItem('authToken', response.data.idToken);
                AsyncStorage.setItem('email', response.data.email);

                alert('El usuario se ha registrado correctamente');
                clearLoginData();

            }).catch((error) => {
                console.log(error.response)
                clearLoginData();
                alert('Error de registro');
            })
    };

    const handleLogout = () => {

        setIsLoggedIn(false);
        setAuthToken('');
        setEmail('');

        AsyncStorage.setItem('login', 'false');
        AsyncStorage.setItem('authToken', '');
        AsyncStorage.setItem('email', '');
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
            {isLoggedIn ? (
                /* Vista de usuario autenticado */
                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>¡Bienvenido!</Text>
                    <TouchableOpacity
                        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                        onPress={handleLogout}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                /* Formulario de inicio de sesión o registro */
                <View style={{ width: '80%' }}>
                    {isLoginVisible ? (
                        /* Formulario de inicio de sesión */
                        <>
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
                        </>
                    ) : (
                        /* Formulario de registro */
                        <>
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
                        </>
                    )}
                </View>
            )}

            {/* Botones para seleccionar formulario */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                {isLoggedIn ? (
                    // Código a ejecutar si isLoggedIn es verdadero
                    null
                ) : (
                    <>
                        <TouchableOpacity onPress={handleLoginPress}>
                            <Text style={{ color: isLoginVisible ? 'blue' : 'black', fontWeight: 'bold' }}>Iniciar sesión {'   '}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRegisterPress}>
                            <Text style={{ color: !isLoginVisible ? 'blue' : 'black', fontWeight: 'bold' }}>Registrarse</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

export default LoginForm;

