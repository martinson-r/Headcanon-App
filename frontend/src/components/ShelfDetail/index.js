import {useParams, Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneShelf, deleteShelf, getShelf } from "../../store/shelves";
import DeleteFicFromShelf from "../DeleteFicFromShelf";

const ShelfDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { shelfId } = useParams();
    console.log('shelfId', shelfId);
    const shelf = useSelector(state => state.shelves[shelfId]);
    const fics = useSelector(state => state.shelves.ficlist.data)
    console.log('ficsstate', fics);
    console.log('shelf?', shelf);

    useEffect(() => {
        dispatch(getOneShelf(shelfId));
      }, [dispatch, shelfId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {shelfId};
        dispatch(deleteShelf(payload));
        history.push("/");
    }

      if (!shelf || !fics) {
        return null;
    }
    return (
        <div>
            <p>FICS ON THIS SHELF</p>
            <h2>{shelf.shelfName}</h2>
            <form onSubmit={handleSubmit}><button type="submit">Remove This Shelf</button></form>
            {fics.Fics.map((fic) => <div><p><Link key={fic.id} to={`/fics/${fic.id}`}>{fic.title}</Link></p><DeleteFicFromShelf fic={fic} listId={shelfId}/></div>)}
            {/* Add logic so button does not appear on Read/Unread shelves, which should not be deletable */}

        </div>
    );
}
export default ShelfDetail;
