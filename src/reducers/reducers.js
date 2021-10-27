import { combineReducers } from 'redux';

// import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';
import { SET_FILTER, SET_MOVIES } from '../actions/actions';


// the first two functions are called reducers

// state is string bc it will return true or false so either show movie or hide movie
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}
// you could be switching btwn set_movies, add_movies, etc (which are action.type 's) hence switch 
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

// function user(state = '', action) {
//   switch (action.type) {
//     case SET_USER:
//       return action.value;
//     default:
//       return state;
//   }
// }


// func below is called a combined reducer - groups all the reducers together
// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   }
// }

// better version of combined reducer above
const moviesApp = combineReducers({
  visibilityFilter,
  movies
  // user
});


export default moviesApp;
