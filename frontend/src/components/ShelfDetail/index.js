import {useParams, Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneShelf } from "../../store/shelves";

const ShelfDetail = () => {
    const dispatch = useDispatch();
    const { shelfId } = useParams();
    console.log('shelfId', shelfId);
    const shelf = useSelector(state => state.shelves[shelfId]);
    const fics = useSelector(state => state.shelves.ficlist.data)
    console.log('ficsstate', fics);
    console.log('shelf?', shelf);

    useEffect(() => {
        dispatch(getOneShelf(shelfId));
      }, [dispatch, shelfId]);

      if (!shelf || !fics) {
        return null;
    }
    return (
        <div>
            <h2>{shelf.shelfName}</h2>

            {fics.Fics.map((fic) => <Link to={`/fics/${fic.id}`}><p>{fic.title}</p></Link>)}

        </div>
    );
}
export default ShelfDetail;
