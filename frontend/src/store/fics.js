import Cookies from 'js-cookie';

const LOAD = "./fics/LOAD";

const ADD_OR_LOAD_SINGLE = "./fics/ADD_OR_LOAD_SINGLE";

const DELETE_FIC = "./fics/DELETE_FIC";

const TOGGLE_READ_STATUS = "./fics/TOGGLE_READ_STATUS";

const load = list => ({
    type: LOAD,
    list,
  });

  const toggle = fic => ({
    type: TOGGLE_READ_STATUS,
    fic,
  })

  // const add = fic => ({
  //   type: ADD_FIC,
  //   fic,
  // })

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
    const { title, authorName, link, synopsis } = payload;
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
            if (response.ok) {
              const singleFic = await response.json();
              // console.log('Current single fic', singleFic)
              dispatch(loadSingle(singleFic));
            }

  }

  export const toggleReadStatus = (payload) => async dispatch => {
    const { id, readStatus } = payload;
    const res = await fetch(`/api/fics/${id.toString()}/edit`, {
      method: 'PUT',
              headers: { "Content-Type": "application/json", "XSRF-Token": Cookies.get('XSRF-TOKEN') },
              body: JSON.stringify({
                readStatus: readStatus
              }),
            });
            if (res.ok) {
              const singleFic = await res.json();
              console.log('singlefic', singleFic)
              dispatch(loadSingle(singleFic));
            }

  }

  export const addReview = (payload) => async dispatch => {
    const { review, rating, id } = payload;
    const res = await fetch(`/api/reviews/${id.toString()}/addreview`, {
      method: 'POST',
              headers: { "Content-Type": "application/json", "XSRF-Token": Cookies.get('XSRF-TOKEN') },
              body: JSON.stringify({
                review,
                rating,
              }),
            });
            if (res.ok) {
              const singleFic = await res.json();
              dispatch(loadSingle(singleFic));
            }
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
        if (!state[action.fic.id]) {
          const newState = {
            ...state,
            [action.fic.id]: action.fic,
            list: [...state.list, action.fic]
          };
          return newState;
        }
        return {
          ...state,
          //before I can retrieve the fic, it has to be added to the state in the first place
          //remember that state is immutable
          [action.fic.id]: {
            ...state[action.fic.id],
            ...action.fic,
          },
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
