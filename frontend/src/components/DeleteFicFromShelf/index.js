import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteFicFromShelf } from "../../store/fics";

const DeleteFicFromShelf = ({fic, listId}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ficId = fic.id.toString();
        console.log('ficId', ficId)
        console.log('listId', listId);
        const payload = {ficId,
        listId};
        dispatch(deleteFicFromShelf(payload));
        history.push("/");
    }
    return (
        <div>
             <p>{fic.title}</p>
             <form onSubmit={handleSubmit}>
             <button type="submit">Delete from this shelf</button>
             </form>

        </div>

    )

}

export default DeleteFicFromShelf;
