import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneFic } from "../../store/fics";
import AddFicToList from "../AddFicToList";

const FicDetail = () => {
    const dispatch = useDispatch();
    const { ficId } = useParams();
    console.log('ficId', ficId);
    const fic = useSelector(state => state.fics[ficId]);
    console.log('fic?', fic);
    console.log('FicDetail', fic);

    useEffect(() => {
        dispatch(getOneFic(ficId));
      }, [dispatch, ficId]);

      if (!fic || !fic.title) {
        return null;
    }
    return (
        <div>
            <p>FIC DETAILS</p>
            <p>{fic.title}</p>
            <p>Published: {fic.datePublished}</p>
            <p>Authors: {fic.Authors.map((author) => <span key={author.id}>{author.authorName}</span>)}</p>
            {fic.Websites.map((website) => <p key={website.LinkList.id}>{website.LinkList.link}</p>)}
            <p>{fic.synopsis}</p>
            <AddFicToList fic={fic}/>
        </div>
    );
}
export default FicDetail;
