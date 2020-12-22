import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getShelf } from "../../store/shelves";

const BookShelf = () => {
    const dispatch = useDispatch();
    const shelves = useSelector(state => state.shelves.shelf.data);

    useEffect(() => {
        dispatch(getShelf());
      }, [dispatch]);

      if (!shelves) {
          return null;
      }

    return (
        <div>
            <p>SHELVES</p>
            {shelves.map((shelf) => <p key={shelf.id}>
                <Link to={`/shelves/${shelf.id}`}>{shelf.listName}</Link>
                </p>)}
                <p><Link to={`/shelf/add`}>Add a Book Shelf</Link></p>
        </div>
    )
}

export default BookShelf;
