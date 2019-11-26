import Axios from 'axios';

function authenticate(credentials) {
    return Axios.post('http://localhost:8282/api/login_check', credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem('authToken', token);
            Axios.defaults.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('authToken');

            return true;
        });
}

export default { authenticate }