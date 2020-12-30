import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toggleReadStatus } from "../../store/fics";
import { getOneShelf } from "../../store/shelves";

const UpdateReadStatus = ({fic}) => {
    console.log('FIC NOW', fic)
    //Should I be doing this with useState?
    const thisFicsReadStatus = fic.ListJoin.readStatus
    const [readStatus, setReadStatus] = useState(thisFicsReadStatus);
    const dispatch = useDispatch();
    const { shelfId } = useParams();


    useEffect(() => {
        dispatch(getOneShelf(shelfId));
      }, [dispatch, thisFicsReadStatus]);

    const readStatusText = (thisFicsReadStatus) => {
        if (thisFicsReadStatus === true ) {
            return "Read";
        } else {
            return "Unread";
        }
    }

const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        id: fic.id,
        readStatus: !thisFicsReadStatus
    }
    dispatch(toggleReadStatus(payload));
    setReadStatus(thisFicsReadStatus)
}

return (
    <form onSubmit={handleSubmit}>
        <button type="submit">Mark {readStatusText(!thisFicsReadStatus)}</button>
    </form>
)

}

export default UpdateReadStatus;
