const AddFicToDatabase = () => {
    return (
        <div>
             <p>Add a Fanfic to the Database:</p>
        <form>
            <label htmlFor="title">Title</label>
            <input name="title" type="text"></input>
            <label htmlFor="author">Authors:</label>
            {/* add logic so additional author fields appear as you input authors */}
            <input name="author" type="text"></input>
            <label htmlFor="link">Link</label>
            <input name="link" type="text"></input>
            <button type="submit">Add Fanfic</button>
        </form>
        </div>

    )
}

export default AddFicToDatabase;
