import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { editReview } from "../../store/fics"
import { getOneReview } from "../../store/reviews";

const EditReview = () => {
    const { id } = useParams();
    const reviewId = id;
    const dispatch = useDispatch();
    const singleReview = useSelector(state => state.reviews[id]);
    const history = useHistory();
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    useEffect(() => {
        dispatch(getOneReview(id));
      }, [dispatch, id]);

    useEffect(() => {
        if (singleReview) {
            setRating(singleReview.rating);
            setReview(singleReview.review);
        }
    },[singleReview]);

    const updateRating = (e) => setRating(e.target.value);
    const updateReview = (e) => setReview(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
          id,
          rating,
          review
        };
        dispatch(editReview(payload));
        // push them back to the original fic page
        history.push(`/fics/${singleReview.ficId}`);
      };

      if (!singleReview) {
          return null;
      }

    return (
        <div>
            <p>PLACEHOLDER</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="rating">Rating:</label>
                <input type="number" name="rating" value={rating} onChange={updateRating}></input>
                <label htmlFor="review">Review:</label>
                <textarea name="review" value={review} onChange={updateReview}></textarea>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    )
}

export default EditReview;
