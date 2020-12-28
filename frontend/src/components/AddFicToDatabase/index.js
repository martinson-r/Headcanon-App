import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFic } from "../../store/fics"

const AddFicToDatabase = () => {
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [link, setLink] = useState('');
    const [synopsis, setSynopsis] = useState('');

    const updateTitle = (e) => setTitle(e.target.value);
    const updateAuthorName = (e) => setAuthorName(e.target.value);
    const updateLink = (e) => setLink(e.target.value);
    const updateSynopsis = (e) => setSynopsis(e.target.value);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            authorName,
            link,
            synopsis
        }

        console.log( 'payload', payload
        )

dispatch(addFic(payload));

    }

    return (
        <div>
             <p>Add a Fanfic to the Database:</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" onChange={updateTitle} value={title}></input>
            <label htmlFor="author">Authors:</label>
            {/* add logic so additional author fields appear as you input authors */}
            <input name="author" type="text" onChange={updateAuthorName} value={authorName}></input>
            {/* add logic so additional link fields appear as you input authors */}
            <label htmlFor="link">Link</label>
            <input name="link" type="text"onChange={updateLink} value={link}></input>
            <label htmlFor="synopsis">Synopsis</label>
            <textarea name="synopsis" type="text"onChange={updateSynopsis} value={synopsis}></textarea>
            <button type="submit">Add Fanfic</button>
        </form>
        </div>

    )
}

export default AddFicToDatabase;
