
import{ NavLink } from "react-router-dom";
import { calculateAverage } from "../../utils";

const FicResults = ({fics}) => {

    const sortList = (list) => {
        return list.sort((ficA, ficB) => {
            const A = calculateAverage(ficA);
             const B = calculateAverage(ficB);
             return B - A;
        }).map((fic) => fic);
      };

    if (!fics.length) {
        return (
            <div>
                <p>Sorry, no fanfiction matches that criteria.</p>
            </div>
        )
    }

    return (
        <div>

        {sortList(fics).map((fic) => {
            return(<p><NavLink key={fic.id} to={`/fics/${fic.id}`}>{fic.title}<br /></NavLink> Average Rating: {calculateAverage(fic)}</p>)}
    )}
    </div>)
}

export default FicResults;
