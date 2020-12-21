import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getShelf, editShelf } from "../../store/shelves";

const AddFicToList = ({fic}) => {
    //const { ficId } = useParams();
    const ficId = fic.id;
    const dispatch = useDispatch();
    const shelves = useSelector(state => state.shelves.shelf.data);
    console.log('shelves', shelves);
    const [listName, setListName] = useState(shelves);
    //const [shelf, setShelf] = useState(shelf.shelfName);
    const updateShelfName = (e) => setListName(e.target.value);
    console.log('List name', listName);

    useEffect(() => {
        dispatch(getShelf());
      }, [dispatch]);

      useEffect(() => {
        if (shelves.length && !listName) {
          setListName(listName[0]);
        }
      }, [listName, shelves]);



      const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
          listName,
          ficId
        };

        console.log('Payload, front end', payload);

        dispatch(editShelf(payload));

        // let updatedShelf;
        // if (updatedShelf) {
        //   history.push(`/shelves/${updateShelf.id}`);
        // }

      };


     return (
        <form onSubmit={handleSubmit}>
            <p>Placeholder</p>
            <select onChange={updateShelfName} value={listName}>
            {shelves.map(shelfName =>
            <option key={shelfName.listName}>{shelfName.listName}</option>
            )}
             </select>
        <button type="submit">Add To Shelf</button>
    </form>
     )
}

export default AddFicToList;
