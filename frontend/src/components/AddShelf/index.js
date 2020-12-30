import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createShelf } from  "../../store/shelves";

const AddShelf = () => {
    const [listName, setListName] = useState('');
    const history = useHistory();
    const updateListName = (e) => setListName(e.target.value);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            listName
        }
        dispatch(createShelf(payload));

        //How do I send them to shelves/:shelfid? This doesn't work.
        let createdShelf;
        if (createdShelf) {
            history.push(`/shelves/${createdShelf.id}`);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={listName} onChange={updateListName}></input>
            <button type="submit">Add Book Shelf</button>
        </form>
    )
}

export default AddShelf;
