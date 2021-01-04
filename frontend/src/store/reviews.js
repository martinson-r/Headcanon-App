// import { fetch } from './csrf.js';
import Cookies from 'js-cookie';
import { fetch } from './csrf.js';

const LOAD_REVIEW = "./reviews/LOAD_REVIEW";


const loadSingleReview = review => ({
    type: LOAD_REVIEW,
    review,
  })


  export const getOneReview = (id) => async dispatch => {;
    const res = await fetch(`/api/reviews/${id.toString()}`);
    if (res.ok) {
      dispatch(loadSingleReview(res.data));
    }
  }

  const initialState = {};

  const reviewReducer= (state = initialState, action) => {
    switch (action.type) {
    case LOAD_REVIEW: {
        state[action.review.id] = action.review;
        return {
            ...state,
          };
    }
      default:
        return state;
    }
  }

  export default reviewReducer;
