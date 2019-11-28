import Axios from 'axios';
import jwtDecode from 'jwt-decode';

function setAxiosToken() {
    Axios.defaults.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('authToken');
}

function setup() {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            setAxiosToken();
        } else {
            logout();
        }
    } else {
        logout();
    }
}

function authenticate(credentials) {
    return Axios.post('http://localhost:8282/api/login_check', credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem('authToken', token);
            setAxiosToken();
            return true;
        });
}

function isAuthenticated() {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function logout() {
    window.localStorage.removeItem('authToken');
    delete Axios.defaults.headers['Authorization'];
}

export default { authenticate, logout, setup, isAuthenticated }