import { fetch } from './csrf.js';
const LOAD_REVIEW = "./reviews/LOAD_REVIEW";


const loadSingleReview = review => ({
    type: LOAD_REVIEW,
    review,
  })


  export const getOneReview = (id) => async dispatch => {
    console.log('GET ONE REVIEW');
    const res = await fetch(`/api/reviews/${id.toString()}`);
    console.log('RES', res.data)
    if (res.ok) {
      dispatch(loadSingleReview(res.data));
    }
  }

  const initialState = {};

  const reviewReducer= (state = initialState, action) => {
      console.log('ACTION REVIEW', action.review)
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
