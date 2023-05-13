import React, { Component, useState } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { Card, Icon, Input } from '@rneui/themed';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { baseUrl } from '../comun/comun';

import { connect } from 'react-redux';

import { fetchComentarios, postFavorito } from '../redux/ActionCreators';

import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';

import { postComentario } from '../redux/ActionCreators';
import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario)),
})

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title: {
        color: 'white',
        padding: 10,
        fontSize: 20,
        position: 'absolute',
        left: 0,
        padding: 10,
        fontSize: 30,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
    },
    card: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
});

function RenderComentario(props) {

    const comentarios = props.comentarios;

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            {comentarios.map((item, index) => (
                <>
                    <Text>{item.comentario}</Text>
                    <Text>{item.valoracion} Stars</Text>
                    <Text>--{item.autor}, {item.dia}</Text>
                    <Text></Text>

                </>
            ))}
        </Card>
    );
}


function RenderExcursion(props) {

    const excursion = props.excursion;

    const modal = props.modal;

    if (excursion != null) {
        return (
            <Card>
                <Card.Title>{excursion.nombre}</Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: excursion.imagen }}></Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <View style={{ flexDirection: 'row', justiftyContent: "center", alignItems: "center" }}>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#0000ff'
                        onPress={() => props.onPress2()}
                    />
                </View>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class DetalleExcursion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valoracion: 3,
            autor: '',
            comentario: 'a',
            showModal: false
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    resetForm() {
        this.setState({
            valoracion: 3,
            autor: '',
            comentario: '',
            dia: '',
            showModal: false
        });

    }

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    gestionarComentario(excursionId, valoracion, autor, comentario) {
        console.log(JSON.stringify(this.state));
        this.props.postComentario(excursionId, valoracion, autor, comentario);
        this.toggleModal();
    }

    render() {
        const { excursionId } = this.props.route.params;

        // Verificar si el usuario está logeado
        AsyncStorage.getItem('login').then((loginValue) => {
            if (loginValue === 'true') {
                this.setState({ isLoggedIn: true });
            } else {
                this.setState({ isLoggedIn: false });
            }
        });

        // // Obtener el valor del correo electrónico almacenado en AsyncStorage
        // AsyncStorage.getItem('email').then((emailValue) => {
        //     if (emailValue) {
        //         // Si el valor existe, establecerlo como valor predeterminado para el Input de autor
        //         this.setState({ autor: emailValue });
        //     }
        // });

        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={(this.props.favoritos.favoritos).some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    onPress2={() => {
                        if (this.state.isLoggedIn) {
                            this.toggleModal();
                        } else {
                            Alert.alert(
                                'Acción no disponible',
                                'Necesitas iniciar sesión para comentar',
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false }
                            );
                        }
                    }}
                    modal={this.state.showModal}
                />
                {this.state.isLoggedIn && (
                    <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={this.state.showModal}
                        onDismiss={() => this.toggleModal}
                        onRequestClose={() => this.toggleModal}
                    >
                        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", marginTop: 50 }}>
                            {/* <Text style={{ textAlign: 'center' }}>Rating {this.state.valoracion}/{5}</Text> */}
                            <Rating
                                showRating
                                startingValue={3}
                                onFinishRating={rating => { this.setState({ valoracion: rating }) }}
                                style={{ paddingVertical: 10 }}
                            />
                            <Input
                                placeholder="  Autor"
                                leftIcon={{ type: 'font-awesome', name: 'user' }}
                                onChangeText={value => this.setState({ autor: value })}
                            />
                            {/* Input de autor con el valor predeterminado establecido
                            <Input
                                placeholder="  Autor"
                                leftIcon={{ type: 'font-awesome', name: 'user' }}
                                onChangeText={value => this.setState({ autor: value })}
                                value={this.state.autor} // Establecer el valor predeterminado
                            /> */}
                            <Input
                                placeholder="  Comentario"
                                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                                onChangeText={value => this.setState({ comentario: value })}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Button
                                    color={colorGaztaroaOscuro}
                                    title="ENVIAR"
                                    onPress={() => { this.gestionarComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario); this.resetForm(); }}
                                />
                                <View style={{ width: 10 }} />
                                <Button
                                    color={colorGaztaroaClaro}
                                    title="CANCELAR"
                                    onPress={() => { this.toggleModal(); this.resetForm() }}
                                />
                            </View>
                        </View>
                    </Modal>
                )}

                <RenderComentario
                    comentarios={Object.keys(this.props.comentarios.comentarios).filter((key) => this.props.comentarios.comentarios[key].excursionId === excursionId).map((i) => {
                        return this.props.comentarios.comentarios[i]
                    })}
                />
            </ScrollView>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
