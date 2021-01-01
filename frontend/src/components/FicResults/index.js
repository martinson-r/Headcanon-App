
import{ NavLink } from "react-router-dom";

const FicResults = ({fics}) => {

    if (!fics.length) {
        return (
            <div>
                <p>Sorry, no fanfiction matches that criteria.</p>
            </div>
        )
    }

    return (
        <div>
        {fics.map((fic) => {
            return(<NavLink key={fic.id} to={`/fics/${fic.id}`}>{fic.title}<br /></NavLink>)}
    )}
    </div>)
}

export default FicResults;
