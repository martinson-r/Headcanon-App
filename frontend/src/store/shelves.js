import Cookies from 'js-cookie';

export const LOAD_USER_SHELF = "./shelves/LOAD_USER_SHELF";
export const LOAD_USER_BOOKS = "./shelves/LOAD_USER_BOOKS";
export const ADD_SHELF = "./shelves/ADD_SHELF";
export const UPDATE_SHELF = "./shelves/UPDATE_SHELF";
export const DELETE_SHELF = "./shelves/DELETE_SHELF";

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

  const remove = (listId) => ({
    type: DELETE_SHELF,
    listId,
  });

  export const getShelf = () => async dispatch => {
    const res = await fetch(`/api/shelves`);

    if (res.ok) {
      const shelf = await res.json();
      dispatch(loadMainShelf(shelf));
    }
  };

  export const getOneShelf = (id) => async dispatch => {
    const res = await fetch(`/api/shelves/${id.toString()}`);
    if (res.ok) {
      const oneShelf = await res.json();
      dispatch(loadAllBooks(oneShelf));
    }
  };

  export const createShelf = (payload) => async dispatch => {
        const { listName } = payload;

        const response = await fetch(`/api/shelves/create`, {
            method: 'POST',
                    headers: { "Content-Type": "application/json", "XSRF-Token": Cookies.get('XSRF-TOKEN') },
                    body: JSON.stringify({
                      listName
                    }),
                  });
        if (response.ok) {
            const createShelf = await response.json();
            dispatch(addOneShelf(createShelf));
        }

  }

 export const deleteShelf = (payload) => async dispatch => {
    const { shelfId } = payload;
    const id = shelfId;

    const response = await fetch(`/api/shelves/${id.toString()}`, {
        method: 'DELETE',
                headers: { "Content-Type": "application/json", "XSRF-Token": Cookies.get('XSRF-TOKEN') },
                body: JSON.stringify({
                  id
                }),
              });
              dispatch(remove(id));
}

  export const editShelf = (data) => async dispatch => {
    const { ficId, shelfName } = data;
    const res = await fetch(`/api/fics/${ficId.toString()}/addtoshelf`, {
      method: "POST",
      headers: { "Content-Type": "application/json",  "XSRF-Token": Cookies.get('XSRF-TOKEN') },
      body: JSON.stringify({
        ficId, shelfName
      })
    });
    if (res.ok) {
      const updateShelf = await res.json();
      dispatch(update(updateShelf));
    }
  }

  const initialState = {
    shelf: [],
    ficlist: []
  };

  const shelfReducer= (state = initialState, action) => {
    switch (action.type) {
      case LOAD_USER_SHELF: {
      const allShelves = {};
      action.shelf.forEach((shelf) => {
        allShelves[shelf.id] = shelf;
      });
       return {
         ...allShelves,
         ...state,
         shelf: action.shelf
       }
      }
      case ADD_SHELF: {

        if (!state[action.shelf.id]) {
            const newState = {
              ...state,
              [action.shelf.id]: action.shelf
            };
            const shelfList = newState.shelf.map(item => newState[item.id]);
            shelfList.push(action.shelf);
            newState.shelf = shelfList;
            return newState;
          }
          return {
            ...state,
            [action.shelf.id]: {
              ...state[action.shelf.id],
              ...action.shelf,
            }
          };

      }
      case LOAD_USER_BOOKS: {
      return {
        ...state,
        ficlist: action.ficlist,
      };
      }
      case UPDATE_SHELF: {
        return {
          ...state,
          [action.shelf.id]: action.shelf,
        };
      }
      case DELETE_SHELF: {
        const newState = { ...state, shelves: { ...state.shelves } };
        const listId = action.listId;
        delete newState[action.listId];

        newState.shelf = newState.shelf.filter(item => item.id !== parseInt(listId));

        return newState;
      }
      default:
        return state;
    }
  }

  export default shelfReducer;
