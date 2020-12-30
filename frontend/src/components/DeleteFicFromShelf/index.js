import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteFicFromShelf } from "../../store/fics";

const DeleteFicFromShelf = ({fic}) => {
    console.log('delete page fic', fic)
    const history = useHistory();
    const dispatch = useDispatch();
    const listId = fic.ListJoin.ficListId;
    console.log('listId', listId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ficId = fic.id.toString();
        const payload = {ficId,
        listId};
        dispatch(deleteFicFromShelf(payload));
        history.push("/");
    }
    return (
        <div>
             <form onSubmit={handleSubmit}>
             <button type="submit">Delete from this shelf</button>
             </form>

        </div>

    )

}

export default DeleteFicFromShelf;
