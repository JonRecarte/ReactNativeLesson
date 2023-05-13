import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:

      let id = state.comentarios.length + 1;

      const newComment = {
        id: id,
        excursionId: action.excursionId,
        valoracion: action.valoracion,
        autor: action.autor,
        comentario: action.comentario,
        dia: action.dia
      };

      AsyncStorage.getItem('authToken').then(authToken => {
        axios.post('https://react-native-appgaztaroa-635e4-default-rtdb.europe-west1.firebasedatabase.app/COMENTARIOS.json?auth=' + authToken, newComment)
          .then(response => {

            alert('El comentario ha sido insertado entre nuestras opiniones, mila esker :)');

          })
          .catch(error => {
            alert('No has iniciado sesión');
            return;
          });
      });

      state.comentarios[id] = newComment
      return { ...state, errMess: null, comentarios: state.comentarios };

    default:
      return state;
  }
};
