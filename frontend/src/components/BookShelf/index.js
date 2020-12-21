import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getShelf } from "../../store/shelves";

const BookShelf = () => {
    const dispatch = useDispatch();
    const shelves = useSelector(state => state.shelves.shelf.data);
    console.log('Shelves frontend', shelves);

    useEffect(() => {
        dispatch(getShelf());
      }, [dispatch]);

      if (!shelves) {
          return null;
      }

    return (
        <div>
            <p>SHELVES</p>
            {shelves.map((shelf) => <p>
                <Link key={shelf.id} to={`/shelves/${shelf.id}`}>{shelf.listName}</Link>
                </p>)}
                <p><Link to={`/shelf/add`}>Add a Book Shelf</Link></p>
        </div>
    )
}

export default BookShelf;
