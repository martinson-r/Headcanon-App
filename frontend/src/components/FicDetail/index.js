import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneFic, markRead, markUnread } from "../../store/fics";
import AddFicToList from "../AddFicToList";
import AddReview from "../AddReview";

const FicDetail = ({ficState}) => {
    const dispatch = useDispatch();
    const { ficId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const fic = useSelector(state => state.fics[ficId]);

    const [readStatus, setReadStatus] = useState(false);

    useEffect(() => {
        dispatch(getOneFic(ficId));
      }, [dispatch, ficId]);

      useEffect(() => {
        dispatch(getOneFic(ficId));
      }, [dispatch, ficState]);

    const handleClick = async (e) => {
        e.preventDefault();
        setReadStatus(!readStatus);
    }
      if (!fic || !fic.title) {
        return null;
    }

    return (
        <div class="fics">
            <h2>FIC DETAILS</h2>
            <p>{fic.title}</p>
            <p>Published: {fic.datePublished}</p>
            <p>Authors: {fic.Authors.map((author) => <span key={author.id}>{author.authorName}</span>)}</p>
            {fic.LinkLists.map((website) => <p key={website.id}><a target="_blank" href={website.link}>{website.link}</a></p>)}
            <p>{fic.synopsis}</p>
            <AddFicToList fic={fic} />
            <p>Reviews:</p>
            <AddReview fic={fic}/>
            {fic.Reviews && fic.Reviews.map(review => <div key={review.id}><p>{review.User.username}: {review.rating} stars</p><p>"{review.review}"</p></div>)}

        </div>
    );
}
export default FicDetail;
