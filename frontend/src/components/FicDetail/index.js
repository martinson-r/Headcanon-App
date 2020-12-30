import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneFic, markRead, markUnread } from "../../store/fics";
import AddFicToList from "../AddFicToList";
import AddReview from "../AddReview";

const FicDetail = () => {
    const dispatch = useDispatch();
    const { ficId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const fic = useSelector(state => state.fics[ficId]);

    const [readStatus, setReadStatus] = useState(false);



    // This results in infinite loop? Why?
    // if (fic.ReadStatuses !== undefined && fic.ReadStatuses[0].readStatus) {
    //     setReadStatus(fic.ReadStatuses[0].readStatus);
    // }

    useEffect(() => {
        dispatch(getOneFic(ficId));
      }, [dispatch, ficId]);

    const handleClick = async (e) => {
        e.preventDefault();
        setReadStatus(!readStatus);
    }
      if (!fic || !fic.title) {
        return null;
    }

    return (
        <div>
            <p>FIC DETAILS</p>
            <p>{fic.title}</p>
            <p>Published: {fic.datePublished}</p>
            <p>Authors: {fic.Authors.map((author) => <span key={author.id}>{author.authorName}</span>)}</p>
            {fic.LinkLists.map((website) => <p key={website.id}>{website.link}</p>)}
            <p>{fic.synopsis}</p>
            <AddFicToList fic={fic} />
            <p>Reviews:</p>
            <AddReview fic={fic}/>
            {fic.Reviews.map(review => <p key={review.id}>{review.review}</p>)}

        </div>
    );
}
export default FicDetail;
