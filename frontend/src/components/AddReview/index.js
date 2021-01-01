import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addReview } from "../../store/fics";

const AddReview = ({fic}) => {
    const dispatch = useDispatch();
    const id = fic.id;
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const sessionUser = useSelector((state) => state.session.user);

    const updateRating = (e) => setRating(e.target.value);
    const updateReview = (e) => setReview(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
          id,
          rating,
          review
        };
        dispatch(addReview(payload));
      };

      if (sessionUser) {
        return (
          <div>
              <p>Review this Fic:</p>
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
  return (
    <p>You must be logged in to leave a review.</p>
  )
      }


export default AddReview;
