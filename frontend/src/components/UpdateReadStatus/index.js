import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toggleReadStatus } from "../../store/fics";

const UpdateReadStatus = ({fic}) => {
    const readStatus = fic.ListJoin.readStatus;
    const dispatch = useDispatch();


    const readStatusText = (readStatus) => {
        if (readStatus === true ) {
            return "Read";
        } else {
            return "Unread";
        }
    }

const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        id: fic.id,
        readStatus: !fic.ListJoin.readStatus
    }
    dispatch(toggleReadStatus(payload));
}

return (
    <form onSubmit={handleSubmit}>
        <button type="submit">Mark {readStatusText(!fic.ListJoin.readStatus)}</button>
    </form>
)

}

export default UpdateReadStatus;
