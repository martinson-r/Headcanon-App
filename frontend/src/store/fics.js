import { fetch } from './csrf.js';

const LOAD = "./fics/LOAD";

const ADD_OR_LOAD_SINGLE = "./fics/ADD_OR_LOAD_SINGLE";

const load = list => ({
    type: LOAD,
    list,
  });

  const loadSingle = fic => ({
    type: ADD_OR_LOAD_SINGLE,
    fic,
  })

  export const getFics = () => async dispatch => {
    const list = await fetch(`/api/fics`);
    console.log('LIST', list);

    if (list.ok) {
      console.log(list);
      dispatch(load(list));
    }
  };

  export const getOneFic = (id) => async dispatch => {
    const oneFic = await fetch(`/api/fics/${id}`);
    console.log("Fetch single fic");

    if (oneFic.ok) {
      console.log('OneFic', oneFic);
      dispatch(loadSingle(oneFic));
    }
  };

  const initialState = {
    list: [],
    types: []
  };


  const ficReducer= (state = initialState, action) => {
    switch (action.type) {
      case LOAD: {
        const allFics = {};
        action.list.data.forEach(fic => {
          allFics[fic.id] = fic;
        });
        return {
          ...allFics,
          ...state,
          list: action.list,
        };
      }
      case ADD_OR_LOAD_SINGLE: {
        if (!state[action.fic.id]) {
          const singleFic = {
            ...state,
            [action.fic.id]: action.fic
          };
          const ficList = singleFic.list.map(id => singleFic.id);
          ficList.push(action.fic);
          singleFic.list = ficList;
          return singleFic;
        }
        return {
          ...state,
          //before I can retrieve the fic, it has to be added to the state in the first place
          //remember that state is immutable, even when you are just
          [action.fic.id]: {
            ...state[action.fic.id],
            ...action.fic,
          }
        };
      }
      default:
        return state;
    }
  }

  export default ficReducer;
