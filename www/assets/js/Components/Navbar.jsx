import React, {useContext} from 'react';
import AuthApi from '../Services/AuthApi';
import { NavLink } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        history.replace('/');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <NavLink className="navbar-brand" to="/"><i className="fab fa-symfony"></i> + <i className="fab fa-react"></i></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Clients <i className="fas fa-user-friends"></i></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Factures <i className="fas fa-file-invoice-dollar"></i></NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
            {!isAuthenticated &&
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register"><button className="btn btn-dark">Inscription <i className="fas fa-sign-in-alt"></i></button></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login"><button className="btn btn-success">Connexion <i className="fas fa-unlock-alt"></i></button></NavLink>
                    </li>
                </> ||
                    <li className="nav-item">
                        <div className="nav-link"><button className="btn btn-danger" onClick={handleLogout}>Deconnexion <i className="fas fa-sign-out-alt"></i></button></div>
                    </li>
            }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
