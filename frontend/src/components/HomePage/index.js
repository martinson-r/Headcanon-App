import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFics } from "../../store/fics";
import { NavLink, Route } from "react-router-dom";
import FicDetail from "../FicDetail";

const HomePage = () => {
    const dispatch = useDispatch();
    const fics = useSelector(state => state.fics.list.data);
    console.log('FICS', fics);

    useEffect(() => {
      dispatch(getFics());
    }, [dispatch]);

    if (!fics) {
      return null;
    }

    return (
        <div>
            {fics.map((fic) => {
            return(<NavLink key={fic.id} to={`/fics/${fic.id}`}>{fic.title}</NavLink>)
        })}
        </div>
    )
}

export default HomePage;
