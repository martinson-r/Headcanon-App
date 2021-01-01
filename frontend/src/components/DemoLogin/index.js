import { useDispatch, useSelector } from "react-redux";
import { Redirect }  from "react-router-dom";
import { useState } from "react"
import * as sessionActions from "../../store/session";
import '../LoginFormModal/LoginForm.css'

const DemoLogin = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" })).catch(
      (res) => {
        console.log('login response', res);
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <button className="navigation-button" style={{fontSize: "1.5em"}}>
            Demo Login
          </button>
        </form>
        </>
      )

}

export default DemoLogin;
