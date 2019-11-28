import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route,withRouter} from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import CustomersPage from './Pages/CustomersPage';
import InvoicesPage from './Pages/InvoicesPage';
import LoginPage from './Pages/LoginPage';
import AuthApi from './Services/AuthApi';
import AuthContext from './Contexts/AuthConext';
import PrivateRoute from './Components/PrivateRoute';

require('../css/app.css');

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