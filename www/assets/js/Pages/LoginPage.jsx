import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AuthApi from '../Services/AuthApi';

const LoginPage = ({onLogin, history}) => {
    const [credentials, setCredentials] = useState({
        'username' : '',
        'password' : ''
    });

    const [error, setError] = useState('');

    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        
        setCredentials({...credentials, [name] : value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await AuthApi.authenticate(credentials);
            setError("");
            onLogin(true);
            history.replace('/customers');
        } catch (error) {
            setError("Infos incorrects");
        }
    }

    return (
        <>
            <div className="row">
                <fieldset className="col-6 offset-3">
                    <legend>Formulaire de connexion</legend>
                    <div className="form-group">
                        <input type="email" name="username" className={"form-control" + (error && " is-invalid")} value={credentials.username} onChange={handleChange} placeholder="Email" />
                        {error && <div className='invalid-feedback'>{error}</div>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" value={credentials.password} onChange={handleChange} placeholder="Mot de passe" />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={handleSubmit} className="btn btn-success">Connexion</button>
                    </div>
                </fieldset>
            </div>
        </>
    );

}

export default LoginPage;