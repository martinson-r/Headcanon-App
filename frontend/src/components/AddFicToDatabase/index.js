import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFic } from "../../store/fics"
import { useHistory } from "react-router-dom";
import { getShelf } from "../../store/shelves";

const AddFicToDatabase = () => {
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [link, setLink] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const history = useHistory();
    const ficState = useSelector(state => state.fics);
    const lastTitle = ficState.list[ficState.list.length-1].title;
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (lastTitle === title) {
            const id = ficState.list[ficState.list.length-1].id;
            history.push(`/fics/${id}`)
        }
    },[ficState])

    const updateTitle = (e) => setTitle(e.target.value);
    const updateAuthorName = (e) => setAuthorName(e.target.value);
    const updateLink = (e) => setLink(e.target.value);
    const updateSynopsis = (e) => setSynopsis(e.target.value);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            title,
            authorName,
            link,
            synopsis
        }
        return dispatch(addFic(payload))
        .catch((res) => {
            console.log('res', res);
            if (res.data && res.data.errors) {
                setErrors(res.data.errors);
            }
          });
    }

    return (
        <div>
             <p>Add a Fanfic to the Database:</p>
        <form onSubmit={handleSubmit}>
        {console.log('ERRORS', errors)}
            <ul>
            {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            </ul>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" onChange={updateTitle} value={title}></input>
            <label htmlFor="author">Author:</label>
            {/* add logic so additional author fields appear as you input authors */}
            <input name="author" type="text" onChange={updateAuthorName} value={authorName}></input>
            {/* add logic so additional link fields appear as you input authors */}
            <label htmlFor="link">Link</label>
            <input name="link" placeholder="ex: http://www.fanfiction.net" type="text"onChange={updateLink} value={link}></input>
            <label htmlFor="synopsis">Synopsis</label>
            <textarea name="synopsis" placeholder="Less than 1000 characters and more than 25 characters, please!" rows="8" cols="50" type="text"onChange={updateSynopsis} value={synopsis}></textarea>
            <button type="submit">Add Fanfic</button>
        </form>
        </div>

    )
}

export default AddFicToDatabase;
