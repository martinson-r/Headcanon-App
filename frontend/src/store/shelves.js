import { fetch } from './csrf.js';

export const LOAD_USER_SHELF = "./shelves/LOAD_USER_SHELF";
export const LOAD_USER_BOOKS = "./shelves/LOAD_USER_BOOKS";
export const ADD_SHELF = "./shelves/ADD_SHELF";
export const UPDATE_SHELF = "./shelves/UPDATE_SHELF";

// This is confusing, but this is the main bookshelf that contains all the ficlists of books
  const loadAllBooks = ficlist => ({
    type: LOAD_USER_BOOKS,
    ficlist,
  });

  //   This is confusing, but these are the individual shelves (ficlists of books)
const loadMainShelf = shelf => ({
    type: LOAD_USER_SHELF,
    shelf,
  });

  const addOneShelf = shelf => ({
      type: ADD_SHELF,
      shelf,
  });

  const update = (shelf) => ({
    type: UPDATE_SHELF,
    shelf,
  });

  export const getShelf = () => async dispatch => {
    const shelf = await fetch(`/api/shelves`);

    if (shelf.ok) {
      console.log(shelf);
      dispatch(loadMainShelf(shelf));
    }
  };

  export const getOneShelf = (id) => async dispatch => {
    const oneShelf = await fetch(`/api/shelves/${id.toString()}`);
    console.log('getOneShelf', oneShelf);

    if (oneShelf.ok) {
      dispatch(loadAllBooks(oneShelf));
    }
  };

  export const createShelf = (payload) => async dispatch => {
        const { listName } = payload;

        const response = await fetch(`/api/shelves/create`, {
            method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      listName
                    }),
                  });
                  dispatch(addOneShelf(response));

  }

  export const editShelf = (data) => async dispatch => {
    const { ficId, listName } = data;
    const response = await fetch(`/api/fics/${ficId.toString()}/addtoshelf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ficId, listName
      })
    });
    dispatch(update(response));
  }

  const initialState = {
    shelf: [],
    ficlist: [],
    types: []
  };

  const shelfReducer= (state = initialState, action) => {
    switch (action.type) {
      case LOAD_USER_SHELF: {
          console.log('Load user shelf');
        const allShelves = {};
        action.shelf.data.forEach(shelf => {
          allShelves[shelf.id] = shelf;
        });
        return {
          ...allShelves,
          ...state,
          shelf: action.shelf,
        };
      }
      case ADD_SHELF: {
        console.log('Add shelf');
        if (!state[action.shelf.data.id]) {
            console.log("Action data", action.shelf.data)
            console.log("Action id", action.shelf.data.id)
            console.log("Action shelf", action.shelf)
            const newState = {
              ...state,
              [action.shelf.data.id]: action.shelf.data
            };
            console.log('New State', newState);
            const shelfList = newState.shelf.data.map(item => newState[item.id]);
            console.log('New State 2', newState)
            console.log('Shelf List', shelfList);
            shelfList.push(action.shelf.data);
            newState.shelf.data = shelfList;
            return newState;
          }
          return {
            ...state,
            //before I can retrieve the shelf, it has to be added to the state in the first place
            //remember that state is immutable, even when you are just
            [action.shelf.data.id]: {
              ...state[action.shelf.data.id],
              ...action.shelf.data,
            }
          };

      }
      case LOAD_USER_BOOKS: {
        const allFics = {};
        action.ficlist.data.Fics.forEach(fic => {
        allFics[fic.id] = fic;
      });
      return {
        ...allFics,
        ...state,
        ficlist: action.ficlist,
      };
      }
      case UPDATE_SHELF: {
        return {
          ...state,
          [action.shelf.data.id]: action.shelf.data,
        };
      }
      default:
        return state;
    }
  }

  export default shelfReducer;
