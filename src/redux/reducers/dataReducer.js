import {
  SET_DROPS,
  LIKE_DROP,
  UNLIKE_DROP,
  LOADING_DATA,
  DELETE_DROP,
  POST_DROP,
  SET_DROP,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  drops: [],
  drop: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_DROPS:
      return {
        ...state,
        drops: action.payload,
        loading: false
      };
    case SET_DROP:
      return {
        ...state,
        drop: action.payload
      };
    case LIKE_DROP:
    case UNLIKE_DROP:
      let index = state.drops.findIndex(
        (drop) => drop.dropId === action.payload.dropId
      );
      state.drops[index] = action.payload;
      if (state.drop.dropId === action.payload.dropId) {
        state.drop = action.payload;
      }
      return {
        ...state
      };
    case DELETE_DROP:
      index = state.drops.findIndex(
        (drop) => drop.dropId === action.payload
      );
      state.drops.splice(index, 1);
      return {
        ...state
      };
    case POST_DROP:
      return {
        ...state,
        drops: [action.payload, ...state.drops]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        drop: {
          ...state.drop,
          comments: [action.payload, ...state.drop.comments]
        }
      };
    default:
      return state;
  }
}