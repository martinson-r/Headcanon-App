import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getShelf, editShelf } from "../../store/shelves";

const AddFicToList = ({fic}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getShelf());
  }, [dispatch]);
    const ficId = fic.id;

    const updateShelfName = (e) => {
      setshelfName(e.target.value);
    };
      const shelves = useSelector(state => state.shelves.shelf);
      const [shelfName, setshelfName] = useState(shelves);

      useEffect(() => {

        if (!shelves.length) {
          return null;
        }

        if (shelves.length && !shelfName) {
          setshelfName(shelves[0].shelfName);
        }
      }, [shelfName, shelves]);


      if (!shelves) {
        return null;
      }

      const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
          shelfName,
          ficId
        };

        dispatch(editShelf(payload));
        history.push(`/`)
      };


     return (
        <form onSubmit={handleSubmit}>
            <select onChange={updateShelfName} value={shelfName.shelfName}>
                <option>Select a shelf:</option>
            {shelves.length && shelves.map(shelf =>
            <option key={shelf.shelfName}>{shelf.shelfName}</option>
            )}
             </select>
        <button type="submit">Add To Shelf</button>
    </form>
     )
}

export default AddFicToList;
