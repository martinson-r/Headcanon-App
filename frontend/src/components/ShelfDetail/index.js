import { useParams, Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneShelf, deleteShelf, getShelf, editShelfName } from "../../store/shelves";
import DeleteFicFromShelf from "../DeleteFicFromShelf";
import UpdateReadStatus from "../UpdateReadStatus";
import { calculateAverage } from "../../utils";

const ShelfDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { shelfId } = useParams();
    const shelf = useSelector(state => state.shelves[shelfId]);
    const fics = useSelector(state => state.shelves.ficlist[0]);
    const [shelfName, setShelfName] = useState('');
    const updateShelfName = (e) => setShelfName(e.target.value);

    useEffect(() => {
        dispatch(getOneShelf(shelfId));
      }, [dispatch, shelfId]);

    //   useEffect(() => {
    //     if (shelf) {
    //         setShelfName(shelf.shelfName);
    //     }
    // },[shelf.shelfName]);


      const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {shelfId};
        dispatch(deleteShelf(payload));
        history.push("/");
    }

    const changeShelfNameSubmit = async (e) => {
        console.log('shelfName', shelfName);
        e.preventDefault();
        const payload = {shelfId, shelfName};
        dispatch(editShelfName(payload));
    }

    if (!fics){
        return (
            <div>
                 <form onSubmit={changeShelfNameSubmit}>
                <p>Edit shelf name:</p>
                <label htmlFor="changeShelfName">Change Shelf Name:</label>
                <input type="text" value={shelfName} name="changeShelfName" onChange={updateShelfName}></input>
                <button type="submit">Submit</button>
            </form>
                <p>It looks like there aren't any fics on this shelf! Better get going!</p>
                <form onSubmit={handleSubmit}><button type="submit">Remove This Shelf</button></form>
            </div>
        )
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
            <form onSubmit={changeShelfNameSubmit}>
                <p>Edit shelf name:</p>
                <label htmlFor="changeShelfName">Change Shelf Name:</label>
                <input type="text" value={shelfName} name="changeShelfName" onChange={updateShelfName}></input>
                <button type="submit">Submit</button>
            </form>
            <h2>FICS ON THIS SHELF</h2>
            <h2>{shelf.shelfName}</h2>
            <form onSubmit={handleSubmit}><button type="submit">Remove This Shelf</button></form>
            {fics.Fics.length && fics.Fics.map(fic => <div key={fic.id}><Link to={`/fics/${fic.id}`}>{fic.title}</Link> Rating: {calculateAverage(fic)} Read Status: {readStatus(fic)}<UpdateReadStatus fic={fic}/><DeleteFicFromShelf fic={fic} /></div>)}
            {/* Add logic so remove shelf button does not appear on Read/Unread shelves when they are added later, which should not be deletable */}
        </div>
    );
}
export default ShelfDetail;
