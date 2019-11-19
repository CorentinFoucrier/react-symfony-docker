import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route} from 'react-router-dom';
import Navbar from './Compoments/Navbar';
import HomePage from './Compoments/HomePage';
import CustomersPage from './Pages/CustomersPage';

require('../css/app.css');

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            <div className="container p-5">
                <Switch>
                    <Route path='/customers' component={CustomersPage} />
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