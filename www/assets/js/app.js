import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route,withRouter} from 'react-router-dom';
/* Services */
import AuthApi from './Services/AuthApi';
/* Components */
import PrivateRoute from './Components/PrivateRoute';
import Navbar from './Components/Navbar';
/* Pages */
import CustomersPage from './Pages/CustomersPage';
import InvoicesPage from './Pages/InvoicesPage';
import CustomerPage from './Pages/CustomerPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
/* Contexts */
import AuthContext from './Contexts/AuthContext';

require('../css/app.css');

AuthApi.setup();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated);
    const NavbarWithRouter = withRouter(Navbar);

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated
    }

    return (
        <AuthContext.Provider value={contextValue}>
            <HashRouter>
                <NavbarWithRouter />
                <div className="container p-5">
                    <Switch>
                        <PrivateRoute path='/customers' component={CustomersPage} />
                        <PrivateRoute path='/customer/:id' component={CustomerPage} />
                        <PrivateRoute path='/invoices' component={InvoicesPage} />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/' component={HomePage} />
                    </Switch>
                </div>
            </HashRouter>
        </AuthContext.Provider>
    );
}
// Va chercher la div id="app" dans le DOM
const rootElement = document.querySelector('#app');

//Rends la vue dans la div id="app"
ReactDOM.render(
    <App />, rootElement
);