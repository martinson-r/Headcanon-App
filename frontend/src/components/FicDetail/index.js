import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneFic, markRead, markUnread } from "../../store/fics";
import AddFicToList from "../AddFicToList";
import AddReview from "../AddReview";
import EditReview from "../EditReview";


const FicDetail = ({ficState}) => {
    const dispatch = useDispatch();
    const { ficId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    console.log('SESSION USER', sessionUser);
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
      if (!fic || !fic.title || !fic.Reviews) {
        return null;
    }

    return (
        <div className="fics">
            <h2>FIC DETAILS</h2>
            <p>{fic.title}</p>
            <p>Published: {fic.datePublished}</p>
            <p>Authors: {fic.Authors.map((author) => <span key={author.id}>{author.authorName}</span>)}</p>
            {fic.LinkLists.map((website) => <p key={website.id}><a target="_blank" href={website.link}>{website.link}</a></p>)}
            <p>{fic.synopsis}</p>
            <AddFicToList fic={fic} />
            <p>Reviews:</p>
            <AddReview fic={fic}/>
            {fic.Reviews && fic.Reviews.map(review => <div key={review.id}><p>{review.User.username}: {review.rating} stars</p><p>"{review.review}"
            </p>{sessionUser && sessionUser.id === review.User.id && <Link to={`/review/edit/${review.id}`}>Edit Review</Link>}</div>)}

        </div>
    );
}
export default FicDetail;
