import { useParams, Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneShelf, deleteShelf, getShelf } from "../../store/shelves";
import DeleteFicFromShelf from "../DeleteFicFromShelf";
import UpdateReadStatus from "../UpdateReadStatus";

const ShelfDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { shelfId } = useParams();
    const shelf = useSelector(state => state.shelves[shelfId]);
    const fics = useSelector(state => state.shelves.ficlist[0]);

    useEffect(() => {
        dispatch(getOneShelf(shelfId));
      }, [dispatch, shelfId]);



      const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {shelfId};
        dispatch(deleteShelf(payload));
        history.push("/");
    }

    if (!fics){
        return (
            <div>
                <p>It looks like there aren't any fics on this shelf! Better get going!</p>
                <form onSubmit={handleSubmit}><button type="submit">Remove This Shelf</button></form>
            </div>
        )
    }

    const calculateAverage = (fic) => {
        if (fic) {
            const reviewsArray = fic.Reviews;
            const mappedReviews = reviewsArray.map(review => review.rating)

            if (fic.Reviews.length) {
                let total = 0
            for(let i = 0; i < mappedReviews.length; i++) {
                total += mappedReviews[i];
            }
            let average = total / mappedReviews.length;
            // setAverage(average);
            return average;
            } else {
                return "No reviews yet!";
            }           }
    }

    const readStatus = (fic) => {
        const readStatus = fic.ListJoin.readStatus;
        if (readStatus === true ) {
            return "Read";
        } else {
            return "Unread";
        }
    }

      if (!shelf || !fics ) {
        return null;
    }

    return (
        <div className="fics">
            <h2>FICS ON THIS SHELF</h2>
            <h2>{shelf.shelfName}</h2>
            <form onSubmit={handleSubmit}><button type="submit">Remove This Shelf</button></form>
            {fics.Fics.length && fics.Fics.map(fic => <div key={fic.id}><Link to={`/fics/${fic.id}`}>{fic.title}</Link> Rating: {calculateAverage(fic)} Read Status: {readStatus(fic)}<UpdateReadStatus fic={fic}/><DeleteFicFromShelf fic={fic} /></div>)}
            {/* Add logic so remove shelf button does not appear on Read/Unread shelves when they are added later, which should not be deletable */}
        </div>
    );
}
export default ShelfDetail;
