import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthConext from '../Contexts/AuthConext';

const PrivateRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthConext);

    return isAuthenticated
    ? ( <Route path={path} component={component} /> )
    : ( <Redirect to="/login" /> )
}

export default PrivateRoute;