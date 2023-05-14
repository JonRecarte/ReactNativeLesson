// import * as ActionTypes from './ActionTypes';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const favoritos = (state = { favoritos: [] }, action) => {

//     switch (action.type) {

//         case ActionTypes.ADD_FAVORITO:
//             if ((state.favoritos.some(el => el === action.payload))) {// Exist
//                 return state;
//             } else {

//                 console.log(state.favoritos.concat(action.payload))
//                 AsyncStorage.setItem('favoritos', JSON.stringify(state.favoritos.concat(action.payload)));

//                 return {
//                     ...state,
//                     favoritos: state.favoritos.concat(action.payload)
//                 }
//             }

//         default:
//             return state;
//     }
// }