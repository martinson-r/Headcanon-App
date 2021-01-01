import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getShelf } from "../../store/shelves";

const BookShelf = () => {
    const dispatch = useDispatch();
    const shelves = useSelector(state => state.shelves.shelf);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getShelf());

            if (!shelves.length) {
                return <p><Link to={`/shelf/add`}>Add a Book Shelf</Link></p>
            }

        }
      }, [dispatch, sessionUser]);



    if (!sessionUser) {
        return (
            <p>Welcome to HeadCanonDB!</p>
        )
    }

    return (
        <div className="grid-container-shelves">
        <h2>SHELVES</h2>
           {shelves.map((shelf) => <p key={shelf.id}>
            <Link to={`/shelves/${shelf.id}`}>{shelf.shelfName}</Link>
            </p>)}
            <p><Link to={`/shelf/add`}>Add a Book Shelf</Link></p>
    </div>
    )


}


export default BookShelf;
