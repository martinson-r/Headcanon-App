import { fetch } from './csrf.js';

const LOAD = "./fics/LOAD";

const ADD_OR_LOAD_SINGLE = "./fics/ADD_OR_LOAD_SINGLE";

const DELETE_FIC = "./fics/DELETE_FIC";

const load = list => ({
    type: LOAD,
    list,
  });

  const loadSingle = fic => ({
    type: ADD_OR_LOAD_SINGLE,
    fic,
  })

  const remove = fic => ({
    type: DELETE_FIC,
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
    const oneFic = await fetch(`/api/fics/${id.toString()}`);

    if (oneFic.ok) {
      dispatch(loadSingle(oneFic));
    }
  };

  export const deleteFicFromShelf = (payload) => async dispatch => {
    const {ficId, listId} = payload;
    console.log('ficId', ficId)
    await fetch(`/api/fics/${ficId.toString()}`, {
      method: 'DELETE',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ficId,
                listId
              }),
            });
            dispatch(remove(ficId));
  }

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
        console.log('action fic id', action.fic.data.id);
        if (!state[action.fic.data.id]) {
          const newState = {
            ...state,
            [action.fic.data.id]: action.fic.data
          };
          //for sorting, later
          // const ficList = newState.list.map(id => newState[id]);
          // ficList.push(action.fic);
          //newState.list = sortList(ficList);
          return newState;
        }
        return {
          ...state,
          //before I can retrieve the fic, it has to be added to the state in the first place
          //remember that state is immutable
          [action.fic.data.id]: {
            ...state[action.fic.data.id],
            ...action.fic.data,
          }
        };
      }
      case DELETE_FIC: {
        const newState = { ...state }
      }
      default:
        return state;
    }
  }

  export default ficReducer;
