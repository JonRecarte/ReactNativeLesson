import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { baseUrl } from '../comun/comun';

import { connect } from 'react-redux';

import { postFavorito } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
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

    if (excursion != null) {
        return (
            <Card containerStyle={styles.card} >
                <View style={styles.imageContainer}>
                    <Card.Image
                        source={{ uri: baseUrl + excursion.imagen }}
                        style={styles.image}
                    ></Card.Image>
                    <Text style={styles.title}>{excursion.nombre}</Text>
                    <Text style={{ margin: 20 }}>
                        {excursion.descripcion}
                    </Text>
                </View>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class DetalleExcursion extends Component {

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={(this.props.favoritos.favoritos).some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
