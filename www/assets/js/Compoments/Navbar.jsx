import React from 'react';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#"><i className="fab fa-symfony"></i> + <i className="fab fa-react"></i></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/#/customers">Clients <i className="fas fa-user-friends"></i></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Factures <i className="fas fa-file-invoice-dollar"></i></a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <a className="nav-link" href="#"><button className="btn btn-dark">Inscription <i className="fas fa-sign-in-alt"></i></button></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><button className="btn btn-success">Connexion <i className="fas fa-unlock-alt"></i></button></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><button className="btn btn-danger">Deconnexion <i className="fas fa-sign-out-alt"></i></button></a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
