import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getShelf, editShelf } from "../../store/shelves";

const AddFicToList = ({fic}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShelf());
  }, [dispatch]);

    const ficId = fic.id;

    const updateShelfName = (e) => setListName(e.target.value);
      const shelves = useSelector(state => state.shelves.shelf.data);
      console.log('shelves', shelves)
      const [listName, setListName] = useState(shelves);
      console.log('List name', listName);

      useEffect(() => {

        if (!shelves) {
          return null;
        }

        if (shelves.length && !listName) {
          setListName(shelves[0].listName);
        }
      }, [listName, shelves]);


      if (!shelves) {
        return null;
      }

      const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
          listName,
          ficId
        };

        dispatch(editShelf(payload));

      };


     return (
        <form onSubmit={handleSubmit}>
            <p>Placeholder</p>
            <select onChange={updateShelfName} value={listName}>
                <option>Select a shelf:</option>
            {shelves.length && shelves.map(shelfName =>
            <option key={shelfName.listName}>{shelfName.listName}</option>
            )}
             </select>
        <button type="submit">Add To Shelf</button>
    </form>
     )
}

export default AddFicToList;
