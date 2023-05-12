import React, { Component, useState } from 'react';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginForm = () => {
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    const handleLoginPress = () => {
        setIsLoginVisible(true);
    };

    const handleRegisterPress = () => {
        setIsLoginVisible(false);
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
                    />
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
                        placeholder='Contraseña'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                        onPress={() => console.log('Inicio de sesión')}
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
                        placeholder='Nombre de usuario'
                    />
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                    />
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
                        placeholder='Contraseña'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                        onPress={() => console.log('Registro')}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Botones para seleccionar formulario */ }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <TouchableOpacity onPress={handleLoginPress}>
                    <Text style={{ color: isLoginVisible ? 'blue' : 'black', fontWeight: 'bold' }}>Iniciar sesión{'   '}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleRegisterPress}>
                    <Text style={{ color: !isLoginVisible ? 'blue' : 'black', fontWeight: 'bold' }}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginForm;


