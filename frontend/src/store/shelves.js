import { fetch } from './csrf.js';

const LOAD_USER_SHELF = "./shelves/LOAD_USER_SHELF";
const LOAD_USER_BOOKS = "./shelves/LOAD_USER_BOOKS";

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
      case LOAD_USER_BOOKS: {
        // console.log('Load user books');
        // console.log('ficlist state', action.ficlist.data.Fics);
        // console.log('fic id', action.ficlist.data.Fics.id);
        // console.log('action shelf', action.ficlist.data.id);
        // if (!state[action.ficlist.data.Fics.id]) {
        //   const newState = {
        //     ...state,
        //     [action.ficlist.data.Fics.id]: action.ficlist.Fics
        //   };
        //   //for sorting, later
        //   // const ficficList = newState.ficlist.map(id => newState[id]);
        //   // ficficList.push(action.fic);
        //   //newState.ficlist = sortficList(ficficList);
        //   return newState;
        // }
        // return {
        //   ...state,
        //   //before I can retrieve the fic, it has to be added to the state in the first place
        //   //remember that state is immutable
        //   [action.ficlist.data.Fics.id]: {
        //     ...state[action.ficlist.data.Fics.id],
        //     ...action.ficlist.data.Fics,
        //   }
        // };

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
      default:
        return state;
    }
  }

  export default shelfReducer;
