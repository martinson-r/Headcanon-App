import Cookies from 'js-cookie';

const LOAD = "./fics/LOAD";

const ADD_OR_LOAD_SINGLE = "./fics/ADD_OR_LOAD_SINGLE";

const DELETE_FIC = "./fics/DELETE_FIC";

const ADD_FIC = "./fics/ADD_FIC";

const TOGGLE_READ_STATUS = "./fics/TOGGLE_READ_STATUS";

const load = list => ({
    type: LOAD,
    list,
  });

  const toggle = fic => ({
    type: TOGGLE_READ_STATUS,
    fic,
  })

  const add = fic => ({
    type: ADD_FIC,
    fic,
  })

  const loadSingle = fic => ({
    type: ADD_OR_LOAD_SINGLE,
    fic,
  })

  const remove = fic => ({
    type: DELETE_FIC,
    fic,
  })

  export const getFics = () => async dispatch => {
    const res = await fetch(`/api/fics`);
    if (res.ok) {
      const fics = await res.json();
      dispatch(load(fics));
    }
  };

  export const getOneFic = (id) => async dispatch => {
    const data = await fetch(`/api/fics/${id.toString()}`);
    if (data.ok) {
      const oneFic = await data.json();
      dispatch(loadSingle(oneFic));
    }
  }

  export const deleteFicFromShelf = (payload) => async dispatch => {
    const {ficId, listId} = payload;
    await fetch(`/api/fics/${ficId.toString()}`, {
      method: 'DELETE',
              headers: { "Content-Type": "application/json", "XSRF-Token": Cookies.get('XSRF-TOKEN') },
              body: JSON.stringify({
                ficId,
                listId
              }),
            });
            dispatch(remove(ficId));
  }

  export const addFic = (payload) => async dispatch => {
    const {title, authorName, link, synopsis} = payload;
    const response = await fetch(`/api/fics/create`, {
      method: 'POST',
              headers: { "Content-Type": "application/json", "XSRF-Token": Cookies.get('XSRF-TOKEN') },
              body: JSON.stringify({
                title,
                authorName,
                link,
                synopsis
              }),
            });
            dispatch(add(response));
  }

  export const toggleReadStatus = (payload) => async dispatch => {
    const { id, readStatus } = payload;
    const response = await fetch(`/api/fics/${id.toString()}/edit`, {
      method: 'PUT',
              headers: { "Content-Type": "application/json", "XSRF-Token": Cookies.get('XSRF-TOKEN') },
              body: JSON.stringify({
                readStatus: readStatus
              }),
            });
            dispatch(loadSingle(response));
  }

  const initialState = {
    fic: [],
    list: []
  };

  const ficReducer= (state = initialState, action) => {
    switch (action.type) {
      case LOAD: {
        const allFics = {};
      action.list.forEach((fic) => {
        allFics[fic.id] = fic;
      });
       return {
         ...allFics,
         ...state,
         list: action.list
       }
      }
      case ADD_OR_LOAD_SINGLE: {
        // if (!state[action.list.id]) {
        //   const newState = {
        //     ...state,
        //     [action.list.id]: action.list
        //   };
        //   return newState;
        // }
        // return {
        //   ...state,
        //   //before I can retrieve the fic, it has to be added to the state in the first place
        //   //remember that state is immutable
        //   [action.list.id]: {
        //     ...state[action.list.id],
        //     ...action.list,
        //   }
        // };
      }
      case DELETE_FIC: {
        const newState = { ...state }
      }
      default:
        return state;
    }
  }

  export default ficReducer;
