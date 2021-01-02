
import{ NavLink } from "react-router-dom";
import { calculateAverage } from "../../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPaginatedFics } from "../../store/fics";

const FicResults = ({fics}) => {

    const dispatch = useDispatch();
    const [page, setPage] = useState(3);

    const submitLast = () => {
        if (page !== 0) {
            setPage(page-3);
            const size = 3;
            const payload = {page, size}
            dispatch(getPaginatedFics(payload));
        }

    }

    const submitNext = () => {
            setPage(page+3);
            console.log(page)
            const size = 3;
            const payload = {page, size}
            dispatch(getPaginatedFics(payload));
        }

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
    {page !==0 && <button onClick={submitLast}>Last</button>}
    <button onClick={submitNext}>Next</button>
    </div>)
}

export default FicResults;
