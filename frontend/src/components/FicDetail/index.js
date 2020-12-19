import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneFic } from "../../store/fics";

const FicDetail = () => {
    const dispatch = useDispatch();
    const {ficId} = useParams();
    console.log(ficId);
    const fic = useSelector(state => state.fics[ficId]);
    console.log('fic?', fic);
    console.log('FicDetail', fic);

    useEffect(() => {
        console.log('useeffect');
        dispatch(getOneFic(ficId));
      }, [dispatch, ficId]);

      if (!fic || !fic.title) {
        return null;
    }
    return (
        <div>
            <p>{fic.title}</p>
            <p>Published: {fic.datePublished}</p>
            <p>Authors: {fic.Authors.map((author) => author.authorName)}</p>
            <p>{fic.synopsis}</p>
        </div>
    );
}
export default FicDetail
