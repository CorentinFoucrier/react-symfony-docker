import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route,withRouter,Redirect} from 'react-router-dom';
import Navbar from './Compoments/Navbar';
import HomePage from './Compoments/HomePage';
import CustomersPage from './Pages/CustomersPage';
import InvoicesPage from './Pages/InvoicesPage';
import LoginPage from './Pages/LoginPage';
import AuthApi from './Services/AuthApi';

require('../css/app.css');

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated)
    const NavbarWithRouter = withRouter(Navbar);

    const PrivateRoute = ({path, isAuthenticated, component}) => isAuthenticated ? (<Route path={path} component={component} />) : (<Redirect to="/login" />);

    return (
        <HashRouter>
            <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
            <div className="container p-5">
                <Switch>
                    <PrivateRoute path='/customers' isAuthenticated={isAuthenticated} component={CustomersPage} />
                    <PrivateRoute path='/invoices' isAuthenticated={isAuthenticated} component={InvoicesPage} />
                    <Route path='/login' render={ props => <LoginPage onLogin={setIsAuthenticated} {...props} /> } />
                    <Route path='/' component={HomePage} />
                </Switch>
            </div>
        </HashRouter>
    );
}
// Va chercher la div id="app" dans le DOM
const rootElement = document.querySelector('#app');

//Rends la vue dans la div id="app"
ReactDOM.render(
    <App />, rootElement
);