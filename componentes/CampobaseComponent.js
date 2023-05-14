import React, { Component } from 'react';
import Constants from 'expo-constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, StyleSheet, Image, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { Platform } from 'react-native';

import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';

import Calendario from './CalendarioComponent';
import Contacto from './ContactoComponent.js';
import DetalleExcursion from './DetalleExcursionComponent';
import Home from './HomeComponent';
import QuienesSomos from './QuienesSomosComponent.js';
import Login from './LoginComponent.js';
import MapsComponent from './MapsComponent';
import EventComponent from './EventComponent';
import CameraComponent from './CameraComponent';

import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    cabeceras: state.cabeceras,
    actividades: state.actividades
  }
}
const mapDispatchToProps = dispatch => ({
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchComentarios: () => dispatch(fetchComentarios()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
})

function HomeNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff', alignItems: 'center', },
        headerTitleAlign: 'center',
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >

      <Stack.Screen
        name="Etxea"
        component={Home}
        options={{
          title: 'Campo Base',
        }}
      />
    </Stack.Navigator>
  );
}

function CalendarioNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      headerMode="float"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Calendario1" //En el guion esta puesto "Calendario"
        component={Calendario}
        options={{
          title: 'Excursiones Gaztaroa',
          headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',
        }}
      />
    </Stack.Navigator>
  );
}

function ContactoNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Contacto"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >

      <Stack.Screen
        name="Etxea"
        component={Contacto}
        options={{
          title: 'Contacto',
        }}
      />
    </Stack.Navigator>
  );
}


function QuienesSomosNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Quiénes Somos"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >

      <Stack.Screen
        name="Etxea"
        component={QuienesSomos}
        options={{
          title: 'Quiénes Somos',
        }}
      />
    </Stack.Navigator>
  );
}

function LoginNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >

      <Stack.Screen
        name="Etxea"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
    </Stack.Navigator>
  );
}

function MapsNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="¿Te has perdido?"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >

      <Stack.Screen
        name="mapa"
        component={MapsComponent}
        options={{
          title: '¿Te has perdido?',
        }}
      />
    </Stack.Navigator>
  );
}

function EventNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Eventos"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="Etxea"
        component={EventComponent}
        options={{
          title: 'Eventos',
        }}
      />
    </Stack.Navigator>
  );
}

function CameraNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Camera"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="Etxea"
        component={CameraComponent}
        options={{
          title: 'Camera',
        }}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colorGaztaroaClaro,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Excursiones" component={CalendarioNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              // name='calendar'
              name='search'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Contacto" component={ContactoNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='address-card'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Quiénes Somos" component={QuienesSomosNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='info-circle'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="¿Te has perdido?" component={MapsNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='map'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Eventos" component={EventNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='bell'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Camera" component={CameraNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='camera'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Login" component={LoginNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='sign-in'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />

    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

class Campobase extends Component {

  componentDidMount() {
    this.props.fetchExcursiones();
    this.props.fetchComentarios();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }

  render() {
    return (
      <NavigationContainer>
        <View style={{
          flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
        }}>
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);
